import React from 'react';

export default function MapLegend({ layers, hasOptimization }) {
  return (
    <div className="bg-dark-900/90 backdrop-blur-md border border-slate-700/60 rounded-xl p-3 shadow-2xl text-[11px] text-slate-300 space-y-2">
      <div className="font-semibold text-slate-200 border-b border-slate-800 pb-1.5">Map Legend</div>
      
      {layers.showExisting && (
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-500 border border-cyan-300 flex items-center justify-center text-[8px] text-white">⚡</div>
          <span>Existing Fast Charger</span>
        </div>
      )}

      {layers.showCandidates && (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-emerald-500 text-white font-bold flex items-center justify-center text-[9px] shadow-glow-emerald">#1</div>
          <span>Recommended Candidate ({hasOptimization ? 'Optimized' : 'Ranked'})</span>
        </div>
      )}

      {layers.showDemand && (
        <div className="space-y-1">
          <div className="text-[10px] text-slate-400">Demand Intensity:</div>
          <div className="h-2 w-full rounded bg-gradient-to-r from-blue-500 via-amber-500 to-rose-500" />
          <div className="flex justify-between text-[9px] text-slate-500">
            <span>Moderate (70)</span>
            <span>High (95+)</span>
          </div>
        </div>
      )}

      {layers.showGaps && (
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded border border-dashed border-amber-400 bg-amber-500/20" />
          <span>High Demand Gap Zone</span>
        </div>
      )}

      {layers.showGrid && (
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-purple-600 text-white flex items-center justify-center text-[8px]">⚙</div>
          <span>Grid Substation</span>
        </div>
      )}
    </div>
  );
}
