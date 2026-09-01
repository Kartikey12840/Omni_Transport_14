import React from 'react';
import { 
  CheckCircle, 
  Sparkles, 
  MapPin, 
  Zap, 
  TrendingUp, 
  Activity, 
  Building2, 
  Play, 
  Scale, 
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { generateCandidateExplanation } from '../../utils/explainer.js';
import Badge from '../Common/Badge.jsx';

export default function SiteDetailPanel({
  candidate,
  cityData,
  objectiveId = 'max_coverage',
  onSimulate,
  onAskAI,
  onOpenCompare,
  isCompared,
  onToggleCompare
}) {
  if (!candidate) {
    return (
      <div className="bg-dark-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-center text-slate-400 flex flex-col items-center justify-center min-h-[320px]">
        <MapPin className="w-10 h-10 text-slate-600 mb-3" />
        <h4 className="text-sm font-bold text-slate-200">No Candidate Site Selected</h4>
        <p className="text-xs text-slate-500 mt-1 max-w-xs">
          Click any candidate marker on the map or select from the list to view its deep explainability signals and score breakdown.
        </p>
      </div>
    );
  }

  const explanation = generateCandidateExplanation(candidate, cityData, objectiveId);

  return (
    <div className="bg-dark-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-mono font-bold bg-emerald-500 text-dark-950 px-2 py-0.5 rounded">
              Rank #{candidate.rank || 1}
            </span>
            <Badge variant={candidate.priority === 'HIGH' ? 'emerald' : 'amber'}>
              {candidate.priority} PRIORITY
            </Badge>
          </div>
          <h3 className="text-base font-bold text-slate-100 mt-1">{candidate.name}</h3>
          <p className="text-xs text-slate-400">{candidate.city} • Coords: {candidate.lat.toFixed(4)}, {candidate.lng.toFixed(4)}</p>
        </div>

        <div className="text-right">
          <div className="text-2xl font-mono font-extrabold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-xl shadow-glow-emerald inline-block">
            {candidate.composite_score}<span className="text-xs text-slate-400 font-normal">/100</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-0.5">Composite Suitability</p>
        </div>
      </div>

      {/* WHY THIS SITE? Multi-Signal Visual Indicators */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            Why This Site? — Factor Decomposition
          </h4>
          <span className="text-[10px] text-slate-500">Modeled Signals</span>
        </div>

        <div className="space-y-2 text-xs">
          {/* Demand */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400 font-medium">EV Demand Intensity</span>
              <strong className="text-rose-400 font-mono">{candidate.demand_score} / 100</strong>
            </div>
            <div className="w-full bg-dark-800 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-rose-500 to-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${candidate.demand_score}%` }}
              />
            </div>
          </div>

          {/* Coverage Gap */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400 font-medium">Geospatial Coverage Gap</span>
              <strong className="text-amber-400 font-mono">{candidate.coverage_gap_score} / 100</strong>
            </div>
            <div className="w-full bg-dark-800 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${candidate.coverage_gap_score}%` }}
              />
            </div>
          </div>

          {/* Road Accessibility */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400 font-medium">Arterial Road Accessibility</span>
              <strong className="text-cyan-400 font-mono">{candidate.accessibility_score} / 100</strong>
            </div>
            <div className="w-full bg-dark-800 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${candidate.accessibility_score}%` }}
              />
            </div>
          </div>

          {/* Grid Fit */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400 font-medium">Substation Grid Headroom</span>
              <strong className="text-purple-400 font-mono">{candidate.grid_fit_score} / 100</strong>
            </div>
            <div className="w-full bg-dark-800 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${candidate.grid_fit_score}%` }}
              />
            </div>
          </div>

          {/* Modeled Utilization */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400 font-medium">Modeled Asset Utilization</span>
              <strong className="text-emerald-400 font-mono">{candidate.utilization_score}%</strong>
            </div>
            <div className="w-full bg-dark-800 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500 shadow-glow-emerald"
                style={{ width: `${candidate.utilization_score}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Key Calculated Reasons */}
      <div className="space-y-2 pt-2 border-t border-slate-800/80">
        <h5 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Key Decisive Factors</h5>
        <ul className="space-y-1.5 text-xs text-slate-300">
          {candidate.reasons.map((reason, idx) => (
            <li key={idx} className="flex items-start gap-2 bg-dark-850/60 p-2 rounded-lg border border-slate-800">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span className="text-slate-300 leading-snug">{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Suggested Hardware & Nearby POIs */}
      <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800/80">
        <div className="bg-dark-850 p-2.5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-semibold mb-1">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Recommended Plugs</span>
          </div>
          <p className="font-bold text-slate-200 text-xs">{candidate.suggested_config || '4x 120kW DC Fast'}</p>
        </div>

        <div className="bg-dark-850 p-2.5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-semibold mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Coverage Lift</span>
          </div>
          <p className="font-mono font-extrabold text-emerald-400 text-sm">+{candidate.marginalLift || candidate.estimated_coverage_lift}% Lift</p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2 pt-2">
        <button
          type="button"
          onClick={() => onSimulate(candidate)}
          className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-dark-950 font-extrabold text-xs transition-all shadow-glow-emerald flex items-center justify-center gap-1.5"
        >
          <Play className="w-3.5 h-3.5 fill-dark-950" />
          <span>Simulate Site</span>
        </button>

        <button
          type="button"
          onClick={() => onAskAI(candidate)}
          className="py-2.5 px-3 rounded-xl bg-dark-850 hover:bg-slate-800 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span>Explain with AI</span>
        </button>
      </div>
    </div>
  );
}
