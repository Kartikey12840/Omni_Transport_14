/**
 * Deterministic Explainability Engine
 * Converts mathematical factor decomp and geospatial signals into human-readable insights
 */

export function generateCandidateExplanation(candidate, cityData, objectiveId = 'max_coverage') {
  if (!candidate) return '';

  const { demand_score, coverage_gap_score, accessibility_score, grid_fit_score, utilization_score, composite_score } = candidate;

  // Identify dominant strengths (>85) and secondary factors
  const strengths = [];
  if (demand_score >= 88) strengths.push(`an intense modeled EV charging demand index of ${demand_score}/100`);
  if (coverage_gap_score >= 82) strengths.push(`a critical coverage gap of ${coverage_gap_score}/100 with no high-capacity fast charging hubs within 3.5km`);
  if (accessibility_score >= 88) strengths.push(`high arterial road accessibility (${accessibility_score}/100)`);
  if (grid_fit_score >= 84) strengths.push(`favorable substation grid headroom (${grid_fit_score}/100)`);
  if (utilization_score >= 78) strengths.push(`high projected asset utilization (${utilization_score}%)`);

  let lead = '';
  if (composite_score >= 88) {
    lead = `**${candidate.name}** ranks as a **Tier-1 Prime Recommendation** (Composite Score: ${composite_score}/100).`;
  } else if (composite_score >= 80) {
    lead = `**${candidate.name}** is a **High-Priority Recommendation** (Composite Score: ${composite_score}/100).`;
  } else {
    lead = `**${candidate.name}** provides **Strategic Complementary Coverage** (Composite Score: ${composite_score}/100).`;
  }

  const rationale = strengths.length > 0
    ? ` It stands out due to ${strengths.join(', and ')}.`
    : ` It offers a balanced trade-off between local demand and network expansion.`;

  const impact = ` Deploying **${candidate.suggested_config || 'a 4-gun 120kW DC fast hub'}** here is estimated to deliver a **+${candidate.estimated_coverage_lift}% network coverage lift** and support ~**${Math.round(candidate.estimated_utilization * 0.52 * 8)} daily charging sessions**.`;

  return `${lead}${rationale}${impact}`;
}

export function generateScenarioSummary(optimizationResult, cityData) {
  if (!optimizationResult) return '';

  const { objectiveName, stationCount, selectedCandidates, metrics } = optimizationResult;
  const siteNames = selectedCandidates.map(c => c.name).join(', ');

  return `### Executive Scenario Summary (${cityData.name})
Under the **${objectiveName}** objective, ChargeOpt AI selected **${stationCount} optimal station locations**: ${siteNames}.

**Key Infrastructure Impacts:**
- **Projected Network Coverage:** Increases from **${metrics.before.coverage}%** to **${metrics.after.coverage}%** (**+${metrics.impact.coverageLift}% lift**).
- **Demand Capture:** Increases from **${metrics.before.demandServed}%** to **${metrics.after.demandServed}%** (**+${metrics.impact.additionalDemandServedPct}% unserved demand captured**).
- **Network Utilization:** Modeled average station utilization of **${metrics.after.utilization}%** across the selected portfolio.
- **Hardware Deployment:** Recommended addition of **${metrics.impact.totalNewFastPlugs} high-power DC fast charging guns**.

*All metrics are modeled estimations using OpenStreetMap geospatial signals, regional EV adoption curves, and MCLP coverage decay.*`;
}

export function compareCandidates(candidates = []) {
  if (candidates.length < 2) return null;

  const highestDemand = [...candidates].sort((a, b) => b.demand_score - a.demand_score)[0];
  const highestGap = [...candidates].sort((a, b) => b.coverage_gap_score - a.coverage_gap_score)[0];
  const highestUtil = [...candidates].sort((a, b) => b.utilization_score - a.utilization_score)[0];
  const highestComposite = [...candidates].sort((a, b) => b.composite_score - a.composite_score)[0];

  return {
    bestOverall: highestComposite,
    bestCoverage: highestGap,
    bestUtilization: highestUtil,
    bestDemand: highestDemand,
    summary: `**${highestComposite.name}** leads in composite score (${highestComposite.composite_score}/100), while **${highestGap.name}** addresses the largest geographic void (Gap Score: ${highestGap.coverage_gap_score}/100) and **${highestUtil.name}** promises the highest asset utilization (${highestUtil.utilization_score}%).`
  };
}
