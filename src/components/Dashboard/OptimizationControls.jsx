import React from 'react';
import { Zap, ShieldCheck, Flame, Compass, Play, Sparkles, Sliders } from 'lucide-react';
import { OBJECTIVES } from '../../data/types.js';

export default function OptimizationControls({
  objectiveId,
  setObjectiveId,
  stationCount,
  setStationCount,
  onRunOptimization,
  isRunning,
  cityData,
  onResetDemo
}) {
  const objectiveList = Object.values(OBJECTIVES);

  const getObjectiveIcon = (id) => {
    switch (id) {
      case 'max_coverage': return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'max_utilization': return <Zap className="w-4 h-4 text-cyan-400" />;
      case 'balanced': return <Compass className="w-4 h-4 text-amber-400" />;
      case 'high_demand': return <Flame className="w-4 h-4 text-rose-400" />;
      default: return <Sparkles className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="bg-dark-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-400">Step 1 — Configure</span>
          <h2 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 mt-0.5">
            <Sliders className="w-4 h-4 text-emerald-400" />
            Optimization Parameters
          </h2>
        </div>
        <button
          onClick={onResetDemo}
          className="text-[11px] text-slate-400 hover:text-emerald-400 transition-colors"
          title="Reset back to Phase 2 default demo values"
        >
          Reset Demo
        </button>
      </div>

      {/* Objective Cards */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">Planning Goal / Objective</label>
        <div className="grid grid-cols-1 gap-2">
          {objectiveList.map((obj) => {
            const isSelected = objectiveId === obj.id;
            return (
              <button
                key={obj.id}
                type="button"
                onClick={() => setObjectiveId(obj.id)}
                className={`w-full p-2.5 rounded-xl text-left transition-all border ${
                  isSelected
                    ? 'bg-emerald-950/40 border-emerald-500/80 shadow-glow-emerald ring-1 ring-emerald-500/40'
                    : 'bg-dark-850/60 border-slate-800 hover:border-slate-700 hover:bg-dark-800/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getObjectiveIcon(obj.id)}
                    <span className="text-xs font-bold text-slate-100">{obj.name}</span>
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                      ACTIVE
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">{obj.shortDesc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stations to Add Selector */}
      <div className="space-y-2 pt-2 border-t border-slate-800/60">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300">Stations to Add</label>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-dark-800 px-2 py-0.5 rounded border border-slate-700">
            {stationCount} {stationCount === 1 ? 'Station' : 'Stations'}
          </span>
        </div>

        {/* Segmented Count Buttons */}
        <div className="grid grid-cols-5 gap-1.5">
          {[1, 2, 3, 5, 8].map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => setStationCount(count)}
              className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-all border ${
                stationCount === count
                  ? 'bg-emerald-500 text-dark-950 border-emerald-400 shadow-md'
                  : 'bg-dark-850 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              {count}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-slate-500 italic">
          MCLP-Greedy algorithm allocates stations sequentially to maximize marginal demand capture.
        </p>
      </div>

      {/* Run Optimization Primary CTA */}
      <button
        type="button"
        disabled={isRunning}
        onClick={onRunOptimization}
        className="w-full py-3 px-4 rounded-xl font-extrabold text-sm text-dark-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:opacity-95 shadow-glow-emerald active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer disabled:opacity-50"
      >
        <Play className="w-4 h-4 fill-dark-950" />
        <span>Run Optimization Engine</span>
      </button>
    </div>
  );
}
