import React from 'react';
import { 
  Zap, 
  MapPin, 
  Sliders, 
  BarChart3, 
  BookmarkCheck, 
  FileText, 
  BookOpen, 
  Sparkles,
  Download,
  Share2
} from 'lucide-react';
import { CITIES_LIST } from '../../data/cities.js';
import Badge from './Badge.jsx';

export default function Navbar({
  activeView,
  setActiveView,
  currentCityId,
  onCityChange,
  activeScenarioName,
  optimizationResult,
  onOpenExport,
  onOpenMethodology,
  onToggleAI
}) {
  return (
    <header className="h-16 bg-dark-900/95 backdrop-blur-md border-b border-slate-800/80 px-4 flex items-center justify-between z-30 select-none">
      {/* Brand & City Selector */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setActiveView('landing')}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-cyan-500 p-0.5 shadow-glow-emerald flex items-center justify-center group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-dark-950 rounded-[10px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-white font-mono">CHARGEOPT</span>
              <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1 rounded">AI</span>
            </div>
            <p className="text-[10px] text-slate-400 -mt-0.5 hidden sm:block">Intelligent EV Placement</p>
          </div>
        </button>

        <div className="h-6 w-px bg-slate-800 hidden md:block" />

        {/* City Dropdown */}
        <div className="relative flex items-center gap-2 bg-dark-850 border border-slate-700/60 rounded-xl px-3 py-1.5">
          <MapPin className="w-4 h-4 text-emerald-400" />
          <select
            value={currentCityId}
            onChange={(e) => onCityChange(e.target.value)}
            className="bg-transparent text-sm font-semibold text-slate-100 focus:outline-none cursor-pointer pr-1"
          >
            {CITIES_LIST.map(city => (
              <option key={city.id} value={city.id} className="bg-dark-900 text-slate-200">
                {city.name} {city.isDemoPrimary ? '★' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Active Scenario Pill */}
        {activeScenarioName && (
          <div className="hidden lg:flex items-center gap-2 bg-dark-850/60 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">Plan:</span>
            <span className="font-medium text-emerald-300 truncate max-w-[160px]">{activeScenarioName}</span>
          </div>
        )}
      </div>

      {/* Center Navigation Links */}
      <nav className="hidden md:flex items-center gap-1 bg-dark-950/60 p-1 rounded-xl border border-slate-800/80">
        <button
          onClick={() => setActiveView('planning')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeView === 'planning'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Planning</span>
        </button>

        <button
          onClick={() => setActiveView('analytics')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeView === 'analytics'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Analytics</span>
        </button>

        <button
          onClick={() => setActiveView('scenarios')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeView === 'scenarios'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <BookmarkCheck className="w-3.5 h-3.5" />
          <span>Scenarios</span>
        </button>
      </nav>

      {/* Right Quick Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleAI}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 text-xs font-semibold shadow-glow-emerald transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span className="hidden sm:inline">Ask AI</span>
        </button>

        <button
          onClick={onOpenMethodology}
          title="View Methodology & Formula"
          className="p-2 rounded-xl bg-dark-850 hover:bg-slate-800 text-slate-300 border border-slate-700/60 text-xs transition-colors hidden sm:flex items-center gap-1.5"
        >
          <BookOpen className="w-4 h-4 text-slate-400" />
          <span className="hidden xl:inline">Methodology</span>
        </button>

        <button
          onClick={onOpenExport}
          title="Export Planning Report"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Export Report</span>
        </button>
      </div>
    </header>
  );
}
