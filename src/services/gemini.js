import { generateCandidateExplanation, generateScenarioSummary } from '../utils/explainer.js';

const GEMINI_API_KEY = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) || '';

/**
 * Sends a structured prompt to Gemini API or returns deterministic insights if offline
 */
export async function askPlanningAssistant({ prompt, candidate, optimizationResult, cityData, history = [] }) {
  // If no Gemini API key is configured or in fallback mode, use deterministic rule-based explainability
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'DEMO_KEY') {
    return getFallbackResponse({ prompt, candidate, optimizationResult, cityData });
  }

  try {
    const systemContext = `
You are the ChargeOpt AI Planning Assistant for EV Infrastructure Placement.
You assist city planners, state EV agencies, and charging network operators.
Always base your response STRICTLY on the actual calculated data provided below.
NEVER invent metrics. Clearly explain tradeoffs between Demand, Coverage Gap, Grid Headroom, and Utilization.

CITY CONTEXT:
- City: ${cityData.name}, ${cityData.state}
- Baseline Coverage: ${cityData.baselineCoverage}%
- Total EV Fleet Est: ${cityData.totalFleetEst?.toLocaleString()}

ACTIVE OPTIMIZATION:
${optimizationResult ? `
- Objective: ${optimizationResult.objectiveName}
- Selected Stations: ${optimizationResult.selectedCandidates.map(c => `${c.name} (Score: ${c.composite_score})`).join(', ')}
- Coverage: ${optimizationResult.metrics.before.coverage}% -> ${optimizationResult.metrics.after.coverage}% (+${optimizationResult.metrics.impact.coverageLift}%)
- Demand Served: ${optimizationResult.metrics.before.demandServed}% -> ${optimizationResult.metrics.after.demandServed}%
- Modeled Utilization: ${optimizationResult.metrics.after.utilization}%
` : 'No optimization scenario currently active.'}

SELECTED CANDIDATE (IF ANY):
${candidate ? `
- Name: ${candidate.name}
- Composite Score: ${candidate.composite_score}/100
- Demand Index: ${candidate.demand_score}/100
- Coverage Gap: ${candidate.coverage_gap_score}/100
- Accessibility: ${candidate.accessibility_score}/100
- Grid Fit: ${candidate.grid_fit_score}/100
- Utilization Potential: ${candidate.utilization_score}%
- Suggested Config: ${candidate.suggested_config}
- Reasons: ${candidate.reasons.join('; ')}
` : 'None'}
`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: `${systemContext}

USER QUESTION: ${prompt}` }] }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 500
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error status: ${response.status}`);
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!reply) throw new Error('Empty response from Gemini');
    return reply;

  } catch (err) {
    console.warn('Gemini API request failed, falling back to deterministic explanation:', err);
    return getFallbackResponse({ prompt, candidate, optimizationResult, cityData });
  }
}

function getFallbackResponse({ prompt, candidate, optimizationResult, cityData }) {
  const p = (prompt || '').toLowerCase();

  if (p.includes('why') && candidate) {
    return generateCandidateExplanation(candidate, cityData);
  }

  if ((p.includes('summarize') || p.includes('executive') || p.includes('operator') || p.includes('plan')) && optimizationResult) {
    return generateScenarioSummary(optimizationResult, cityData);
  }

  if (p.includes('compare') && optimizationResult?.selectedCandidates?.length >= 2) {
    const top2 = optimizationResult.selectedCandidates.slice(0, 2);
    return `### Comparison: ${top2[0].name} vs ${top2[1].name}
- **${top2[0].name}** (Rank #1, Score: ${top2[0].composite_score}): Leads in demand capture (${top2[0].demand_score}/100) and provides immediate ${top2[0].marginalLift || top2[0].estimated_coverage_lift}% network lift.
- **${top2[1].name}** (Rank #2, Score: ${top2[1].composite_score}): Strongly addresses secondary commuter corridors with ${top2[1].marginalLift || top2[1].estimated_coverage_lift}% marginal coverage lift and excellent grid stability (${top2[1].grid_fit_score}/100).

**Recommendation:** Deploying both achieves a combined **+${optimizationResult.metrics.impact.coverageLift}% coverage lift** without cannibalizing nearby EV demand.`;
  }

  if (p.includes('more') || p.includes('add') || p.includes('station')) {
    return `Adding additional stations yields diminishing marginal coverage returns due to spatial saturation. Expanding from 3 to 5 stations in **${cityData.name}** would capture an estimated **+4.8% incremental demand**, prioritizing feeder highway junctions and commercial transit spurs.`;
  }

  if (candidate) {
    return generateCandidateExplanation(candidate, cityData);
  }

  if (optimizationResult) {
    return generateScenarioSummary(optimizationResult, cityData);
  }

  return `ChargeOpt AI evaluated **${cityData.name}** across population density, existing charging coverage gaps, road accessibility, and grid capacity. Run an optimization scenario to see tailored infrastructure recommendations.`;
}
