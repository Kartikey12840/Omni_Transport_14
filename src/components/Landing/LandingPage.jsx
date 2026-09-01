import React from 'react';
import { 
  Zap, 
  MapPin, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Compass, 
  Cpu, 
  BarChart3,
  Layers,
  CheckCircle2
} from 'lucide-react';
import Badge from '../Common/Badge.jsx';
import { CITIES_LIST } from '../../data/cities.js';

export default function LandingPage({ onStartPlanning, onExploreDemo }) {
  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient Glow Backdrops */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[250px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-glow-emerald animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>  • Intelligent Geospatial Optimization</span>
          </div>

          {/* Main Title & Tagline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
              Smarter EV Charging.<br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Better Locations.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              Find where the next EV charging station should go — using demand, coverage gaps, road accessibility, and grid intelligence.
            </p>
          </div>

          {/* Primary & Secondary Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onExploreDemo}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-dark-950 font-extrabold text-sm shadow-glow-emerald transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Explore Demo (Bengaluru)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onStartPlanning}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-dark-850 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Start Planning Dashboard</span>
            </button>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 max-w-4xl mx-auto">
            <div className="bg-dark-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-mono font-extrabold text-emerald-400">+13.4%</div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold mt-1">Projected Coverage Lift</div>
            </div>

            <div className="bg-dark-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-mono font-extrabold text-cyan-400">90 / 100</div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold mt-1">Marathahalli Benchmark</div>
            </div>

            <div className="bg-dark-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-mono font-extrabold text-amber-400">MCLP</div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold mt-1">Greedy Optimization</div>
            </div>

            <div className="bg-dark-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-mono font-extrabold text-purple-400">100%</div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold mt-1">Explainable Factors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem vs Solution Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 bg-dark-900/40">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <Badge variant="emerald">THE INFRASTRUCTURE CHALLENGE</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
              Not Just Finding Chargers — Deciding Where to Build Next
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
              EV adoption is compounding across Indian metros, yet operators risk underutilized capital by building in oversaturated corridors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Old Way */}
            <div className="bg-dark-850 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="text-rose-400 text-xs font-bold uppercase tracking-wider">Traditional Guesswork</div>
              <h3 className="text-base font-bold text-slate-200">The Black-Box Pitfalls</h3>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Deploying chargers based on anecdotal intuition or land availability alone.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Severe clustering causing cannibalization of nearby charging revenues.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Overlooking transformer substation headroom until construction begins.</span>
                </li>
              </ul>
            </div>

            {/* The ChargeOpt AI Way */}
            <div className="bg-dark-850 border border-emerald-500/40 rounded-2xl p-6 space-y-4 shadow-glow-emerald">
              <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider">ChargeOpt AI Approach</div>
              <h3 className="text-base font-bold text-slate-100">Scientific Infrastructure Planning</h3>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>MCLP Greedy Selection:</strong> Maximizes marginal uncovered demand at each step.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Explainable Scoring:</strong> Transparent factor decomposition (Demand, Gap, Access, Grid).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Interactive Simulation:</strong> Test "What-If" scenarios before committing capital.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Cities Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-slate-100">Supported Demo Metros</h3>
            <p className="text-xs text-slate-400 mt-1">Pre-seeded with real-world geospatial corridors and benchmark scores</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CITIES_LIST.map((city) => (
              <div
                key={city.id}
                className="bg-dark-900 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-slate-100">{city.name}</h4>
                    {city.isDemoPrimary && (
                      <span className="text-[10px] bg-emerald-950 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-800">
                        Primary Demo
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{city.tagline}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Key Benchmark:</span>
                    <strong className="text-slate-200">{city.benchmarkCandidate}</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Score / Lift:</span>
                    <span className="text-emerald-400 font-mono font-bold">{city.benchmarkScore}/100 ({city.benchmarkLift})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={onExploreDemo}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-dark-950 font-extrabold text-xs shadow-glow-emerald transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Launch Bengaluru Benchmark Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
