import React, { useState, useEffect } from 'react';
import { BookmarkCheck, Play, Trash2, Copy, Plus, Download, Share2, Sparkles, Sliders } from 'lucide-react';
import Badge from '../Common/Badge.jsx';

const DEFAULT_SCENARIOS = [
  {
    id: 'scen-1',
    name: 'Bengaluru — Maximum Coverage (3 Stations)',
    cityId: 'bengaluru',
    cityName: 'Bengaluru',
    objective: 'max_coverage',
    objectiveName: 'Maximum Coverage',
    stationCount: 3,
    coverageLift: 13.4,
    projectedCoverage: 81.4,
    stationsList: ['Marathahalli Junction', 'Bellandur Ecospace', 'Whitefield Hope Farm'],
    createdAt: '2026-09-01'
  },
  {
    id: 'scen-2',
    name: 'Mumbai — Balanced Suburban Expansion (3 Stations)',
    cityId: 'mumbai',
    cityName: 'Mumbai',
    objective: 'balanced',
    objectiveName: 'Balanced Optimization',
    stationCount: 3,
    coverageLift: 12.2,
    projectedCoverage: 76.7,
    stationsList: ['Goregaon Link Road', 'Andheri-Kurla Road', 'Vashi Palm Beach'],
    createdAt: '2026-09-01'
  }
];

export default function ScenarioManager({
  onLoadScenario,
  onOpenPlanning,
  currentCityId
}) {
  const [scenarios, setScenarios] = useState(() => {
    try {
      const saved = localStorage.getItem('chargeopt_saved_scenarios');
      return saved ? JSON.parse(saved) : DEFAULT_SCENARIOS;
    } catch {
      return DEFAULT_SCENARIOS;
    }
  });

  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('chargeopt_saved_scenarios', JSON.stringify(scenarios));
    } catch (e) {
      console.error(e);
    }
  }, [scenarios]);

  const handleDelete = (id) => {
    setScenarios(prev => prev.filter(s => s.id !== id));
  };

  const handleDuplicate = (scenario) => {
    const newScen = {
      ...scenario,
      id: `scen-${Date.now()}`,
      name: `${scenario.name} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setScenarios(prev => [newScen, ...prev]);
  };

  const handleShare = (id) => {
    const url = `${window.location.origin}?scenario=${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="emerald">PORTFOLIO PLANNING</Badge>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">Saved Planning Scenarios</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage, duplicate, compare, and share multi-station infrastructure deployment plans
          </p>
        </div>

        <button
          onClick={onOpenPlanning}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-dark-950 font-extrabold text-xs shadow-glow-emerald transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Scenario</span>
        </button>
      </div>

      {/* Scenario Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scenarios.map((scen) => (
          <div
            key={scen.id}
            className="bg-dark-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider font-mono">
                    {scen.cityName || scen.cityId} • {scen.objectiveName || scen.objective}
                  </span>
                  <h3 className="text-base font-bold text-slate-100 mt-0.5 group-hover:text-emerald-300 transition-colors">
                    {scen.name}
                  </h3>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-xs font-mono font-extrabold text-emerald-400 bg-emerald-950 px-2 py-1 rounded-lg border border-emerald-800">
                    +{scen.coverageLift}% Lift
                  </span>
                </div>
              </div>

              {/* Station List Preview */}
              <div className="my-3 space-y-1 bg-dark-850 p-2.5 rounded-xl border border-slate-800 text-xs">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Allocated Candidate Hubs:</span>
                <div className="text-slate-300 font-medium line-clamp-2">
                  {scen.stationsList ? scen.stationsList.join(', ') : `${scen.stationCount} Stations Allocated`}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Created: {scen.createdAt}</span>
                <span>Projected Coverage: <strong className="text-slate-300">{scen.projectedCoverage}%</strong></span>
              </div>
            </div>

            {/* Actions Toolbar */}
            <div className="flex items-center justify-between pt-3 mt-4 border-t border-slate-800/80 text-xs">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleDuplicate(scen)}
                  title="Duplicate Scenario"
                  className="p-2 rounded-lg bg-dark-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleShare(scen.id)}
                  title="Copy Share Link"
                  className="p-2 rounded-lg bg-dark-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  {copiedId === scen.id && <span className="text-[10px] text-emerald-400">Copied!</span>}
                </button>
                <button
                  onClick={() => handleDelete(scen.id)}
                  title="Delete Scenario"
                  className="p-2 rounded-lg bg-dark-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => onLoadScenario(scen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold transition-all"
              >
                <Play className="w-3 h-3 fill-emerald-300" />
                <span>Open Plan</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
