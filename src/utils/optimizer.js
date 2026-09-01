import { OBJECTIVES } from '../data/types.js';
import { calculateHaversineDistance } from './geo.js';

const STANDARD_COVERAGE_RADIUS_KM = 2.5;

/**
 * Calculates dynamic candidate composite score based on current objective weights
 */
export function calculateCandidateScore(candidate, objectiveId = 'max_coverage') {
  const objective = OBJECTIVES[objectiveId] || OBJECTIVES.max_coverage;
  const { weights } = objective;

  const score =
    candidate.demand_score * weights.demand +
    candidate.coverage_gap_score * weights.coverageGap +
    candidate.accessibility_score * weights.accessibility +
    candidate.grid_fit_score * weights.gridFit +
    candidate.utilization_score * weights.utilization;

  return Math.round(score);
}

/**
 * Executes Deterministic MCLP-Inspired Greedy Optimization
 * Selects k best stations, adjusting marginal coverage returns to avoid cannibalization
 */
export function runOptimization({
  cityData,
  objectiveId = 'max_coverage',
  stationCount = 3,
  candidateList = null
}) {
  const objective = OBJECTIVES[objectiveId] || OBJECTIVES.max_coverage;
  const candidates = (candidateList || cityData.candidateSites).map(c => ({ ...c }));
  const demandZones = cityData.demandZones.map(z => ({ ...z, coveredWeight: z.initially_covered ? 0.8 : 0 }));

  // Score all candidates under selected objective
  candidates.forEach(c => {
    c.composite_score = calculateCandidateScore(c, objectiveId);
  });

  const selectedCandidates = [];
  const remainingCandidates = [...candidates];
  let cumulativeCoverage = cityData.baselineCoverage;
  let cumulativeDemandServed = cityData.baselineDemandServed;
  let totalLift = 0;

  const targetCount = Math.min(stationCount, remainingCandidates.length);

  for (let step = 1; step <= targetCount; step++) {
    // Recalculate marginal value for remaining candidates
    let bestCandidate = null;
    let bestMarginalScore = -1;
    let bestIndex = -1;

    remainingCandidates.forEach((cand, idx) => {
      // Calculate how much unserved demand this candidate reaches within coverage radius
      let reachableUncoveredDemand = 0;
      let zonesInReach = 0;

      demandZones.forEach(zone => {
        const dist = calculateHaversineDistance(cand.lat, cand.lng, zone.lat, zone.lng);
        if (dist <= STANDARD_COVERAGE_RADIUS_KM * 1.5) {
          const unservedFraction = Math.max(0, 1 - zone.coveredWeight);
          reachableUncoveredDemand += (zone.demand_index / 100) * unservedFraction;
          zonesInReach++;
        }
      });

      // Marginal multiplier decays if candidate overlaps with already selected stations
      let overlapPenalty = 0;
      selectedCandidates.forEach(sel => {
        const distToSel = calculateHaversineDistance(cand.lat, cand.lng, sel.lat, sel.lng);
        if (distToSel < STANDARD_COVERAGE_RADIUS_KM * 1.6) {
          overlapPenalty += (1 - distToSel / (STANDARD_COVERAGE_RADIUS_KM * 1.6)) * 18;
        }
      });

      const marginalScore = Math.max(10, cand.composite_score + reachableUncoveredDemand * 4 - overlapPenalty);

      if (marginalScore > bestMarginalScore) {
        bestMarginalScore = marginalScore;
        bestCandidate = cand;
        bestIndex = idx;
      }
    });

    if (bestCandidate && bestIndex !== -1) {
      // Marginal lift calculation: top benchmark candidate preserves realistic prototype values
      let stepLift = bestCandidate.estimated_coverage_lift;
      if (step > 1) {
        stepLift = +(stepLift * Math.pow(0.78, step - 1)).toFixed(1);
      }

      const selected = {
        ...bestCandidate,
        stepSelected: step,
        rank: step,
        marginalLift: stepLift
      };

      selectedCandidates.push(selected);
      remainingCandidates.splice(bestIndex, 1);
      totalLift += stepLift;

      // Update covered demand weights in zones
      demandZones.forEach(zone => {
        const dist = calculateHaversineDistance(selected.lat, selected.lng, zone.lat, zone.lng);
        if (dist <= STANDARD_COVERAGE_RADIUS_KM * 1.5) {
          zone.coveredWeight = Math.min(1, zone.coveredWeight + 0.65);
        }
      });
    }
  }

  // Calculate network after metrics
  const projectedCoverage = Math.min(96.5, +(cityData.baselineCoverage + totalLift).toFixed(1));
  const projectedDemandServed = Math.min(95.0, +(cityData.baselineDemandServed + totalLift * 0.92).toFixed(1));
  
  const avgUtilization = selectedCandidates.length > 0
    ? Math.round(selectedCandidates.reduce((acc, c) => acc + c.estimated_utilization, 0) / selectedCandidates.length)
    : cityData.baselineAvgUtilization;

  return {
    objective: objectiveId,
    objectiveName: objective.name,
    stationCount: targetCount,
    selectedCandidates,
    allCandidatesScored: candidates.sort((a, b) => b.composite_score - a.composite_score),
    metrics: {
      before: {
        coverage: cityData.baselineCoverage,
        demandServed: cityData.baselineDemandServed,
        utilization: cityData.baselineAvgUtilization,
        existingStations: cityData.existingStationsCount || cityData.existingStations.length
      },
      after: {
        coverage: projectedCoverage,
        demandServed: projectedDemandServed,
        utilization: avgUtilization,
        totalStations: (cityData.existingStationsCount || cityData.existingStations.length) + targetCount
      },
      impact: {
        coverageLift: +totalLift.toFixed(1),
        additionalDemandServedPct: +(projectedDemandServed - cityData.baselineDemandServed).toFixed(1),
        avgCandidateScore: Math.round(
          selectedCandidates.reduce((sum, c) => sum + c.composite_score, 0) / Math.max(1, selectedCandidates.length)
        ),
        estDailySessionsPerStation: Math.round(avgUtilization * 0.55 * 8), // ~32-45 sessions/day
        totalNewFastPlugs: targetCount * 4
      }
    }
  };
}

/**
 * Simulates arbitrary set of candidate sites (What-If engine)
 */
export function simulateCustomDeployment(cityData, selectedIds = []) {
  const candidates = cityData.candidateSites.filter(c => selectedIds.includes(c.id));
  if (candidates.length === 0) {
    return {
      coverageLift: 0,
      projectedCoverage: cityData.baselineCoverage,
      projectedDemandServed: cityData.baselineDemandServed,
      utilization: cityData.baselineAvgUtilization,
      sessions: 0
    };
  }

  let totalLift = 0;
  candidates.forEach((cand, idx) => {
    const decay = Math.pow(0.82, idx);
    totalLift += cand.estimated_coverage_lift * decay;
  });

  const projectedCoverage = Math.min(96.5, +(cityData.baselineCoverage + totalLift).toFixed(1));
  const projectedDemandServed = Math.min(95.0, +(cityData.baselineDemandServed + totalLift * 0.9).toFixed(1));
  const avgUtilization = Math.round(
    candidates.reduce((sum, c) => sum + c.estimated_utilization, 0) / candidates.length
  );

  return {
    coverageLift: +totalLift.toFixed(1),
    projectedCoverage,
    projectedDemandServed,
    utilization: avgUtilization,
    sessions: Math.round(avgUtilization * 0.52 * 8 * candidates.length),
    selectedCandidates: candidates
  };
}
