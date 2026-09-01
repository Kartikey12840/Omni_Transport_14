import React from 'react';
import { Layers, Zap, Flame, ShieldAlert, Sparkles, Cpu, Radio } from 'lucide-react';

export default function MapLayerControl({ layers, onToggleLayer, counts }) {
  return (
    <div className="bg-dark-900/90 backdrop-blur-md border border-slate-700/60 rounded-xl p-3 shadow-2xl text-xs w-64">
      <div className="flex items-center gap-2 font-semibold text-slate-200 mb-2.5 pb-2 border-b border-slate-800">
        <Layers className="w-4 h-4 text-emerald-400" />
        <span>Map Intelligence Layers</span>
      </div>

      <div className="space-y-1.5">
        <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-800/60 cursor-pointer transition-colors">
          <div className="flex items-center gap-2 text-slate-300">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Existing Chargers</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded font-mono">
              {counts.existing || 0}
            </span>
            <input
              type="checkbox"
              checked={layers.showExisting}
              onChange={() => onToggleLayer('showExisting')}
              className="accent-emerald-500 rounded cursor-pointer"
            />
          </div>
        </label>

        <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-800/60 cursor-pointer transition-colors">
          <div className="flex items-center gap-2 text-slate-300">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>Demand Heatmap</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded font-mono">
              {counts.demandZones || 0}
            </span>
            <input
              type="checkbox"
              checked={layers.showDemand}
              onChange={() => onToggleLayer('showDemand')}
              className="accent-emerald-500 rounded cursor-pointer"
            />
          </div>
        </label>

        <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-800/60 cursor-pointer transition-colors">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Coverage Gaps</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={layers.showGaps}
              onChange={() => onToggleLayer('showGaps')}
              className="accent-emerald-500 rounded cursor-pointer"
            />
          </div>
        </label>

        <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-800/60 cursor-pointer transition-colors">
          <div className="flex items-center gap-2 text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Candidate Sites</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded font-mono">
              {counts.candidates || 0}
            </span>
            <input
              type="checkbox"
              checked={layers.showCandidates}
              onChange={() => onToggleLayer('showCandidates')}
              className="accent-emerald-500 rounded cursor-pointer"
            />
          </div>
        </label>

        <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-800/60 cursor-pointer transition-colors">
          <div className="flex items-center gap-2 text-slate-300">
            <Radio className="w-3.5 h-3.5 text-emerald-300" />
            <span>Coverage Radius (2.5km)</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={layers.showRadius}
              onChange={() => onToggleLayer('showRadius')}
              className="accent-emerald-500 rounded cursor-pointer"
            />
          </div>
        </label>

        <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-800/60 cursor-pointer transition-colors">
          <div className="flex items-center gap-2 text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>Grid Substations</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded font-mono">
              {counts.grid || 0}
            </span>
            <input
              type="checkbox"
              checked={layers.showGrid}
              onChange={() => onToggleLayer('showGrid')}
              className="accent-emerald-500 rounded cursor-pointer"
            />
          </div>
        </label>
      </div>
    </div>
  );
}
