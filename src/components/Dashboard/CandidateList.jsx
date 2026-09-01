import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckSquare, Square, Layers, SlidersHorizontal, Flame, Radio } from 'lucide-react';
import Badge from '../Common/Badge.jsx';

export default function CandidateList({
  candidates = [],
  selectedCandidate,
  onSelectCandidate,
  optimizationResult,
  onSimulateCandidate,
  onOpenCompare,
  compareList = [],
  onToggleCompare
}) {
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [sortBy, setSortBy] = useState('score');

  const selectedIds = optimizationResult
    ? optimizationResult.selectedCandidates.map(c => c.id)
    : [];

  let filtered = candidates.filter(c => {
    if (filterPriority === 'ALL') return true;
    return c.priority === filterPriority;
  });

  filtered.sort((a, b) => {
    if (sortBy === 'score') return b.composite_score - a.composite_score;
    if (sortBy === 'demand') return b.demand_score - a.demand_score;
    if (sortBy === 'gap') return b.coverage_gap_score - a.coverage_gap_score;
    if (sortBy === 'util') return b.utilization_score - a.utilization_score;
    return 0;
  });

  return (
    <div className="bg-dark-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col space-y-3">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Ranked Candidate Locations
            </h3>
            <span className="text-[10px] bg-emerald-950 text-emerald-300 font-mono font-bold px-2 py-0.5 rounded border border-emerald-800">
              {filtered.length} Sites
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {optimizationResult ? 'MCLP-Greedy optimal selection' : 'Ranked by composite suitability score'}
          </p>
        </div>

        {compareList.length >= 2 && (
          <button
            onClick={onOpenCompare}
            className="flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-500 text-dark-950 font-extrabold text-[11px] px-2.5 py-1 rounded-lg shadow-glow-cyan transition-all"
          >
            <span>Compare ({compareList.length})</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Filter / Sort Pills */}
      <div className="flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1 bg-dark-850 p-1 rounded-lg border border-slate-800">
          {['ALL', 'HIGH', 'MEDIUM'].map(p => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                filterPriority === p ? 'bg-emerald-500 text-dark-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="bg-dark-850 border border-slate-700 text-slate-300 text-[11px] rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
        >
          <option value="score">Sort by Score</option>
          <option value="demand">Sort by Demand</option>
          <option value="gap">Sort by Coverage Gap</option>
          <option value="util">Sort by Utilization</option>
        </select>
      </div>

      {/* Scrollable Candidate Cards */}
      <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
        {filtered.map((cand, idx) => {
          const isSelected = selectedCandidate?.id === cand.id;
          const isRecommended = selectedIds.includes(cand.id);
          const isCompared = compareList.some(c => c.id === cand.id);
          const rankNum = isRecommended 
            ? selectedIds.indexOf(cand.id) + 1 
            : idx + 1;

          return (
            <div
              key={cand.id}
              onClick={() => onSelectCandidate(cand)}
              className={`p-3 rounded-xl border transition-all cursor-pointer relative group ${
                isSelected
                  ? 'bg-emerald-950/40 border-emerald-400 shadow-glow-emerald ring-1 ring-emerald-400/50'
                  : isRecommended
                  ? 'bg-dark-850/90 border-emerald-500/50 hover:border-emerald-400'
                  : 'bg-dark-850/50 border-slate-800 hover:border-slate-700 hover:bg-dark-800/60'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  {/* Rank Badge */}
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-extrabold text-xs flex-shrink-0 ${
                      isRecommended
                        ? 'bg-emerald-500 text-dark-950 shadow-glow-emerald'
                        : 'bg-dark-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    #{rankNum}
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-100 group-hover:text-emerald-300 transition-colors line-clamp-1">
                      {cand.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                      {cand.suggested_config || '4x 120kW Dual-Gun DC Fast'}
                    </p>
                  </div>
                </div>

                {/* Score Pill */}
                <div className="text-right flex-shrink-0">
                  <div className="text-xs font-mono font-extrabold text-emerald-400 bg-emerald-950/90 border border-emerald-800/80 px-2 py-0.5 rounded-lg">
                    {cand.composite_score}<span className="text-[9px] text-slate-400 font-normal">/100</span>
                  </div>
                </div>
              </div>

              {/* Factor Breakdown Mini-Bar Grid */}
              <div className="grid grid-cols-4 gap-2 mt-2.5 pt-2 border-t border-slate-800/60 text-[10px]">
                <div>
                  <span className="text-slate-500 block">Demand</span>
                  <strong className="text-slate-200 font-mono">{cand.demand_score}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Coverage Gap</span>
                  <strong className="text-slate-200 font-mono">{cand.coverage_gap_score}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Access</span>
                  <strong className="text-slate-200 font-mono">{cand.accessibility_score}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Est. Lift</span>
                  <strong className="text-emerald-400 font-mono">+{cand.marginalLift || cand.estimated_coverage_lift}%</strong>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-800/40 text-[11px]">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleCompare(cand);
                  }}
                  className={`flex items-center gap-1 text-[10px] transition-colors ${
                    isCompared ? 'text-cyan-400 font-bold' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {isCompared ? <CheckSquare className="w-3 h-3" /> : <Square className="w-3 h-3" />}
                  <span>Compare</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSimulateCandidate(cand);
                  }}
                  className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span>Simulate Impact</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
