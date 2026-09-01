import React from 'react';
import { BarChart3, TrendingUp, Zap, ShieldCheck, PieChart, Activity, Sliders, ArrowUpRight } from 'lucide-react';
import Badge from '../Common/Badge.jsx';

export default function NetworkAnalyticsView({
  cityData,
  optimizationResult,
  onOpenPlanning
}) {
  const beforeCoverage = optimizationResult?.metrics.before.coverage || cityData.baselineCoverage;
  const afterCoverage = optimizationResult?.metrics.after.coverage || +(cityData.baselineCoverage + 13.4).toFixed(1);
  const lift = optimizationResult?.metrics.impact.coverageLift || 13.4;
  const demandServed = optimizationResult?.metrics.after.demandServed || +(cityData.baselineDemandServed + 12.0).toFixed(1);
  const avgUtil = optimizationResult?.metrics.after.utilization || 79;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="emerald">METRIC INTELLIGENCE</Badge>
            <span className="text-xs text-slate-400">City: <strong className="text-slate-200">{cityData.name}</strong></span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">Network Capacity & Coverage Analytics</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Geospatial demand signal distribution, charging void reduction, and ROI projection modeling
          </p>
        </div>

        <button
          onClick={onOpenPlanning}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-dark-950 font-extrabold text-xs shadow-glow-emerald transition-all"
        >
          <Sliders className="w-4 h-4" />
          <span>Launch Planning Dashboard</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Coverage Lift Card */}
        <div className="bg-dark-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>Projected Network Coverage</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-mono font-extrabold text-slate-100">{afterCoverage}%</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              +{lift}% Lift
            </span>
          </div>
          <div className="w-full bg-dark-800 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${afterCoverage}%` }} />
          </div>
          <p className="text-[10px] text-slate-500 mt-2">Baseline was {beforeCoverage}%</p>
        </div>

        {/* Demand Captured */}
        <div className="bg-dark-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>Demand Served</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-mono font-extrabold text-cyan-400">{demandServed}%</span>
            <span className="text-xs font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
              +12.8% Capture
            </span>
          </div>
          <div className="w-full bg-dark-800 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${demandServed}%` }} />
          </div>
          <p className="text-[10px] text-slate-500 mt-2">High-traffic corridors addressed</p>
        </div>

        {/* Modeled Asset Utilization */}
        <div className="bg-dark-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>Modeled Utilization</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-mono font-extrabold text-amber-400">{avgUtil}%</span>
            <span className="text-xs font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
              High Efficiency
            </span>
          </div>
          <div className="w-full bg-dark-800 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: `${avgUtil}%` }} />
          </div>
          <p className="text-[10px] text-slate-500 mt-2">~38 charging sessions/station/day</p>
        </div>

        {/* Total Plugs Added */}
        <div className="bg-dark-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>Fast Charger Deployment</span>
            <Zap className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-mono font-extrabold text-purple-400">
              {optimizationResult ? optimizationResult.metrics.impact.totalNewFastPlugs : 12}
            </span>
            <span className="text-xs font-bold text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
              120kW+ DC
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-3 font-medium">Dual-gun CCS2 & CHAdeMO fast plugs</p>
          <p className="text-[10px] text-slate-500 mt-1">Grid connected at 11kV/33kV</p>
        </div>
      </div>

      {/* Visual Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coverage Lift Progression Chart */}
        <div className="bg-dark-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              Coverage Lift by Sequential Station Deployment
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">MCLP Marginal Diminishing Returns</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { station: '#1 Hub (e.g. Marathahalli)', lift: 13.4, total: 81.4, width: '100%' },
              { station: '#2 Hub (e.g. Bellandur)', lift: 10.5, total: 84.8, width: '78%' },
              { station: '#3 Hub (e.g. Whitefield)', lift: 8.2, total: 87.5, width: '61%' },
              { station: '#4 Hub (e.g. E-City)', lift: 6.4, total: 89.5, width: '48%' },
              { station: '#5 Hub (e.g. Hebbal)', lift: 4.8, total: 91.2, width: '36%' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">{item.station}</span>
                  <span className="font-mono text-emerald-400 font-bold">+{item.lift}% marginal → {item.total}% total</span>
                </div>
                <div className="w-full bg-dark-800 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full transition-all" style={{ width: item.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demand Zones & Coverage Status Table */}
        <div className="bg-dark-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Zone Demand Index vs Initial Coverage
            </h3>
            <span className="text-[10px] text-slate-500">{cityData.demandZones.length} Key Zones</span>
          </div>

          <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1 text-xs">
            {cityData.demandZones.map((zone) => (
              <div key={zone.id} className="flex items-center justify-between p-2.5 rounded-xl bg-dark-850/60 border border-slate-800">
                <div>
                  <div className="font-bold text-slate-200 line-clamp-1">{zone.name}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{zone.category} • {zone.population_density.toLocaleString()} /sq km</div>
                </div>
                <div className="text-right flex items-center gap-2">
                  <span className="font-mono font-bold text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800 text-[11px]">
                    Demand {zone.demand_index}
                  </span>
                  <Badge variant={zone.initially_covered ? 'slate' : 'amber'} size="xs">
                    {zone.initially_covered ? 'Covered' : 'Gap Zone'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
