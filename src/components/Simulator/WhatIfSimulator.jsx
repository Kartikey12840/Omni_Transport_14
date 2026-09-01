import React, { useState } from 'react';
import { Play, TrendingUp, Zap, Radio, CheckSquare, Square, Save, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { simulateCustomDeployment } from '../../utils/optimizer.js';

export default function WhatIfSimulator({
  cityData,
  optimizationResult,
  onApplySimulation,
  onSaveScenario
}) {
  const [stationCountSlider, setStationCountSlider] = useState(
    optimizationResult ? optimizationResult.selectedCandidates.length : 3
  );

  // Allow custom toggle of specific candidate sites
  const [selectedIds, setSelectedIds] = useState(
    optimizationResult
      ? optimizationResult.selectedCandidates.map(c => c.id)
      : cityData.candidateSites.slice(0, 3).map(c => c.id)
  );

  const simResult = simulateCustomDeployment(cityData, selectedIds);

  const toggleSite = (id) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        if (prev.length >= 8) return prev; // max 8 sites
        return [...prev, id];
      }
    });
  };

  const handleSliderChange = (newCount) => {
    setStationCountSlider(newCount);
    // pick top N candidates from city data
    const topIds = cityData.candidateSites.slice(0, newCount).map(c => c.id);
    setSelectedIds(topIds);
  };

  return (
    <div className="bg-dark-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-cyan-400">Interactive Simulation</span>
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 mt-0.5">
            <Radio className="w-4 h-4 text-cyan-400" />
            "What-If?" Infrastructure Deployment Simulator
          </h3>
        </div>
        <span className="text-xs bg-cyan-950 text-cyan-300 font-mono font-bold px-2 py-0.5 rounded border border-cyan-800">
          {selectedIds.length} Stations Active
        </span>
      </div>

      {/* Interactive Slider */}
      <div className="space-y-2 bg-dark-850 p-3.5 rounded-xl border border-slate-800">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-300 font-semibold">Simulate Station Additions:</span>
          <span className="font-mono font-bold text-emerald-400 text-sm">{selectedIds.length} New Hubs</span>
        </div>
        <input
          type="range"
          min="1"
          max={Math.min(8, cityData.candidateSites.length)}
          value={selectedIds.length}
          onChange={(e) => handleSliderChange(parseInt(e.target.value))}
          className="w-full accent-emerald-500 cursor-pointer h-2 bg-dark-950 rounded-lg"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>1 Hub</span>
          <span>3 Hubs (Standard)</span>
          <span>5 Hubs (Expanded)</span>
          <span>8 Hubs (Max Citywide)</span>
        </div>
      </div>

      {/* BEFORE VS AFTER IMPACT TELEMETRY */}
      <div className="grid grid-cols-2 gap-3">
        {/* CURRENT NETWORK (BEFORE) */}
        <div className="bg-dark-850 p-3.5 rounded-xl border border-slate-800 text-xs">
          <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-2 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>Baseline Network</span>
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-slate-500 text-[10px] block">Coverage</span>
              <strong className="text-slate-200 font-mono text-base">{cityData.baselineCoverage}%</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">Demand Served</span>
              <strong className="text-slate-200 font-mono text-base">{cityData.baselineDemandServed}%</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">Existing Stations</span>
              <strong className="text-slate-200 font-mono text-base">{cityData.existingStationsCount || cityData.existingStations.length}</strong>
            </div>
          </div>
        </div>

        {/* WITH NEW CHARGERS (AFTER) */}
        <div className="bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-500/50 text-xs shadow-glow-emerald">
          <div className="text-emerald-400 text-[10px] uppercase font-bold tracking-wider mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Projected Network</span>
            </span>
            <span className="text-[10px] bg-emerald-500 text-dark-950 font-bold px-1.5 py-0.2 rounded font-mono">
              +{simResult.coverageLift}%
            </span>
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-emerald-300 text-[10px] block">New Coverage</span>
              <strong className="text-emerald-400 font-mono text-base">{simResult.projectedCoverage}%</strong>
            </div>
            <div>
              <span className="text-emerald-300 text-[10px] block">New Demand Served</span>
              <strong className="text-emerald-400 font-mono text-base">{simResult.projectedDemandServed}%</strong>
            </div>
            <div>
              <span className="text-emerald-300 text-[10px] block">Est. Daily Sessions</span>
              <strong className="text-emerald-400 font-mono text-base">~{simResult.sessions} / day</strong>
            </div>
          </div>
        </div>
      </div>

      {/* MULTI-SITE SELECTOR CHECKLIST */}
      <div className="space-y-2 pt-2 border-t border-slate-800">
        <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span>Active Sites in Simulation</span>
          <span className="text-[10px] text-slate-500">Toggle individual candidate sites</span>
        </label>
        <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
          {cityData.candidateSites.map((cand) => {
            const isChecked = selectedIds.includes(cand.id);
            return (
              <div
                key={cand.id}
                onClick={() => toggleSite(cand.id)}
                className={`flex items-center justify-between p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-dark-800 border-emerald-500/60 text-emerald-200'
                    : 'bg-dark-850/40 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isChecked ? (
                    <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Square className="w-3.5 h-3.5 text-slate-500" />
                  )}
                  <span className="font-medium text-xs line-clamp-1">{cand.name}</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                  +{cand.estimated_coverage_lift}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
        <button
          type="button"
          onClick={() => onApplySimulation(selectedIds)}
          className="py-2.5 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-dark-950 font-extrabold text-xs transition-all shadow-glow-cyan flex items-center justify-center gap-1.5"
        >
          <Play className="w-3.5 h-3.5 fill-dark-950" />
          <span>Apply to Map</span>
        </button>

        <button
          type="button"
          onClick={() => onSaveScenario({ selectedIds, simResult })}
          className="py-2.5 px-3 rounded-xl bg-dark-850 hover:bg-slate-800 text-emerald-400 border border-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Scenario</span>
        </button>
      </div>
    </div>
  );
}
