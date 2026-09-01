/**
 * Export and Reporting Utilities (CSV & Printable Planning Reports)
 */

export function downloadScenarioCSV(optimizationResult, cityData) {
  if (!optimizationResult) return;

  const headers = [
    'Rank',
    'Candidate Name',
    'City',
    'Latitude',
    'Longitude',
    'Composite Score',
    'Demand Score',
    'Coverage Gap Score',
    'Accessibility Score',
    'Grid Fit Score',
    'Utilization Score',
    'Est Coverage Lift (%)',
    'Est Utilization (%)',
    'Suggested Config',
    'Priority'
  ];

  const rows = optimizationResult.selectedCandidates.map((c, idx) => [
    idx + 1,
    `"${c.name}"`,
    `"${cityData.name}"`,
    c.lat,
    c.lng,
    c.composite_score,
    c.demand_score,
    c.coverage_gap_score,
    c.accessibility_score,
    c.grid_fit_score,
    c.utilization_score,
    c.marginalLift || c.estimated_coverage_lift,
    c.estimated_utilization,
    `"${c.suggested_config || ''}"`,
    c.priority
  ]);

  const lines = [
    `# ChargeOpt AI — Infrastructure Planning Report`,
    `# City: ${cityData.name}`,
    `# Objective: ${optimizationResult.objectiveName}`,
    `# Baseline Coverage: ${optimizationResult.metrics.before.coverage}% -> Projected: ${optimizationResult.metrics.after.coverage}% (+${optimizationResult.metrics.impact.coverageLift}%)`,
    `# Modeled Estimates Only — OpenStreetMap & Geospatial Signals`,
    headers.join(','),
    ...rows.map(r => r.join(','))
  ];

  const csvContent = lines.join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `ChargeOpt_Plan_${cityData.name}_${optimizationResult.objective}_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function printScenarioReport(optimizationResult, cityData) {
  if (!optimizationResult) return;

  const win = window.open('', '_blank');
  if (!win) return;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>ChargeOpt AI Planning Report — ${cityData.name}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #1e293b; padding: 40px; max-width: 900px; margin: 0 auto; line-height: 1.5; }
          .header { border-bottom: 3px solid #059669; padding-bottom: 20px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
          .title { font-size: 26px; font-weight: 800; color: #0f172a; margin: 0; }
          .subtitle { color: #64748b; font-size: 14px; margin-top: 4px; }
          .badge { background: #d1fae5; color: #065f46; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 700; }
          .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin: 24px 0; }
          .metric-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; text-align: center; }
          .metric-val { font-size: 24px; font-weight: 800; color: #0f172a; }
          .metric-lift { color: #059669; font-weight: 700; font-size: 14px; }
          .metric-label { font-size: 12px; color: #64748b; text-transform: uppercase; margin-top: 4px; }
          table { width: 100%; border-collapse: collapse; margin-top: 24px; font-size: 13px; }
          th { background: #f1f5f9; text-align: left; padding: 10px; border-bottom: 2px solid #cbd5e1; font-weight: 700; }
          td { padding: 10px; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
          .score-pill { display: inline-block; background: #ecfdf5; color: #047857; font-weight: 700; padding: 2px 8px; border-radius: 4px; }
          .disclaimer { margin-top: 40px; padding: 16px; background: #fffbeb; border-left: 4px solid #f59e0b; font-size: 12px; color: #92400e; }
          @media print { body { padding: 0; } button { display: none; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="title">⚡ CHARGEOPT AI — EV Infrastructure Deployment Plan</div>
            <div class="subtitle">Generated for City of <strong>${cityData.name}</strong> • Objective: <strong>${optimizationResult.objectiveName}</strong></div>
          </div>
          <div>
            <span class="badge">OFFICIAL RECOMMENDATION</span>
          </div>
        </div>

        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-val">${optimizationResult.metrics.after.coverage}%</div>
            <div class="metric-lift">+${optimizationResult.metrics.impact.coverageLift}% Lift</div>
            <div class="metric-label">Projected Coverage</div>
          </div>
          <div class="metric-card">
            <div class="metric-val">${optimizationResult.metrics.after.demandServed}%</div>
            <div class="metric-lift">+${optimizationResult.metrics.impact.additionalDemandServedPct}% Gain</div>
            <div class="metric-label">Demand Served</div>
          </div>
          <div class="metric-card">
            <div class="metric-val">${optimizationResult.metrics.after.utilization}%</div>
            <div class="metric-lift">High Efficiency</div>
            <div class="metric-label">Modeled Utilization</div>
          </div>
          <div class="metric-card">
            <div class="metric-val">${optimizationResult.selectedCandidates.length} Sites</div>
            <div class="metric-lift">+${optimizationResult.metrics.impact.totalNewFastPlugs} Plugs</div>
            <div class="metric-label">Deployment Scope</div>
          </div>
        </div>

        <h3>Ranked Candidate Recommendations</h3>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Location & Candidate Site</th>
              <th>Score</th>
              <th>Demand</th>
              <th>Coverage Gap</th>
              <th>Grid Fit</th>
              <th>Recommended Configuration</th>
            </tr>
          </thead>
          <tbody>
            ${optimizationResult.selectedCandidates.map((c, i) => `
              <tr>
                <td><strong>#${i + 1}</strong></td>
                <td>
                  <strong>${c.name}</strong><br/>
                  <small style="color: #64748b;">${c.lat.toFixed(4)}, ${c.lng.toFixed(4)}</small>
                </td>
                <td><span class="score-pill">${c.composite_score}/100</span></td>
                <td>${c.demand_score}</td>
                <td>${c.coverage_gap_score}</td>
                <td>${c.grid_fit_score}</td>
                <td>${c.suggested_config || '4x 120kW DC Fast'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="disclaimer">
          <strong>Methodology & Data Disclaimer:</strong> All scores, utilization figures, and coverage gains are generated via ChargeOpt AI's deterministic Demand-Weighted Greedy Coverage Optimization (MCLP-inspired model). Demographics and points of interest are sourced from OpenStreetMap and regional mobility patterns. These are decision-support modeled estimates and should be complemented by local site utility surveys.
        </div>

        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
    </html>
  `;

  win.document.write(html);
  win.document.close();
}
