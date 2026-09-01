import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, Cpu, Flame, MapPin, BarChart2 } from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Analyzing demand & traffic signals...', icon: Flame },
  { id: 2, title: 'Evaluating geospatial coverage gaps...', icon: MapPin },
  { id: 3, title: 'Calculating grid headroom & accessibility...', icon: Cpu },
  { id: 4, title: 'Running MCLP greedy marginal selection...', icon: Loader2 },
  { id: 5, title: 'Synthesizing recommendations & lift metrics...', icon: BarChart2 }
];

export default function OptimizationProgressModal({ isOpen, onComplete, cityData, objectiveName, stationCount }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 350);
          return prev;
        }
      });
    }, 280);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-dark-900 border border-emerald-500/40 rounded-2xl shadow-2xl p-6 relative overflow-hidden">
        {/* Glow Header */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-400 animate-pulse" />
        
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 text-emerald-400 shadow-glow-emerald">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
          </div>
          <h3 className="text-base font-extrabold text-slate-100">ChargeOpt Optimization Engine</h3>
          <p className="text-xs text-slate-400 mt-1">
            Computing optimal {stationCount} stations in <span className="text-emerald-300 font-semibold">{cityData.name}</span> ({objectiveName})
          </p>
        </div>

        {/* Step List */}
        <div className="space-y-3">
          {STEPS.map((step, idx) => {
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 shadow-sm'
                    : isDone
                    ? 'bg-dark-850/40 border-slate-800 text-slate-400'
                    : 'opacity-40 border-transparent text-slate-600'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-emerald-400 animate-spin flex-shrink-0" />
                ) : (
                  <Icon className="w-4 h-4 text-slate-600 flex-shrink-0" />
                )}
                <span className="text-xs font-medium font-mono">{step.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
