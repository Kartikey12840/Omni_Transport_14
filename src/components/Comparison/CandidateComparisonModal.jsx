import React from 'react';
import { Scale, CheckCircle2, Award, Zap, ShieldAlert, Activity, ArrowRight } from 'lucide-react';
import Modal from '../Common/Modal.jsx';
import { compareCandidates } from '../../utils/explainer.js';

export default function CandidateComparisonModal({
  isOpen,
  onClose,
  candidates = [],
  onSelectCandidateForScenario
}) {
  if (candidates.length < 2) return null;

  const comparison = compareCandidates(candidates);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Multi-Candidate Site Comparison"
      subtitle={`Side-by-side evaluation of ${candidates.length} shortlisted locations`}
      maxWidth="max-w-4xl"
    >
      {/* Winner Summary Badges */}
      {comparison && (
        <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-3.5 text-xs text-slate-200">
          <div className="flex items-center gap-2 font-bold text-emerald-400 mb-1.5">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Optimal Factor Allocations</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{comparison.summary}</p>
        </div>
      )}

      {/* Comparison Grid Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-dark-850">
              <th className="p-3 text-slate-400 font-semibold uppercase text-[10px]">Factor / Metric</th>
              {candidates.map((cand) => (
                <th key={cand.id} className="p-3 font-bold text-slate-100 text-xs min-w-[160px]">
                  <div className="flex items-center justify-between gap-1">
                    <span className="line-clamp-1">{cand.name}</span>
                    <span className="font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800 text-[10px]">
                      {cand.composite_score}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {/* Priority */}
            <tr>
              <td className="p-3 text-slate-400 font-medium">Priority Tier</td>
              {candidates.map(c => (
                <td key={c.id} className="p-3 font-bold text-emerald-400">{c.priority}</td>
              ))}
            </tr>

            {/* Demand Score */}
            <tr>
              <td className="p-3 text-slate-400 font-medium">Demand Index</td>
              {candidates.map(c => {
                const isMax = Math.max(...candidates.map(x => x.demand_score)) === c.demand_score;
                return (
                  <td key={c.id} className={`p-3 font-mono font-bold ${isMax ? 'text-rose-400 bg-rose-950/20' : ''}`}>
                    {c.demand_score} / 100 {isMax && '★'}
                  </td>
                );
              })}
            </tr>

            {/* Coverage Gap */}
            <tr>
              <td className="p-3 text-slate-400 font-medium">Coverage Gap Void</td>
              {candidates.map(c => {
                const isMax = Math.max(...candidates.map(x => x.coverage_gap_score)) === c.coverage_gap_score;
                return (
                  <td key={c.id} className={`p-3 font-mono font-bold ${isMax ? 'text-amber-400 bg-amber-950/20' : ''}`}>
                    {c.coverage_gap_score} / 100 {isMax && '★'}
                  </td>
                );
              })}
            </tr>

            {/* Road Access */}
            <tr>
              <td className="p-3 text-slate-400 font-medium">Road Accessibility</td>
              {candidates.map(c => {
                const isMax = Math.max(...candidates.map(x => x.accessibility_score)) === c.accessibility_score;
                return (
                  <td key={c.id} className={`p-3 font-mono font-bold ${isMax ? 'text-cyan-400 bg-cyan-950/20' : ''}`}>
                    {c.accessibility_score} / 100 {isMax && '★'}
                  </td>
                );
              })}
            </tr>

            {/* Grid Fit */}
            <tr>
              <td className="p-3 text-slate-400 font-medium">Grid Fit & Headroom</td>
              {candidates.map(c => {
                const isMax = Math.max(...candidates.map(x => x.grid_fit_score)) === c.grid_fit_score;
                return (
                  <td key={c.id} className={`p-3 font-mono font-bold ${isMax ? 'text-purple-400 bg-purple-950/20' : ''}`}>
                    {c.grid_fit_score} / 100 {isMax && '★'}
                  </td>
                );
              })}
            </tr>

            {/* Est Utilization */}
            <tr>
              <td className="p-3 text-slate-400 font-medium">Modeled Utilization</td>
              {candidates.map(c => (
                <td key={c.id} className="p-3 font-mono font-bold text-emerald-300">{c.utilization_score}%</td>
              ))}
            </tr>

            {/* Coverage Lift */}
            <tr>
              <td className="p-3 text-slate-400 font-medium">Est. Network Lift</td>
              {candidates.map(c => (
                <td key={c.id} className="p-3 font-mono font-extrabold text-emerald-400">+{c.estimated_coverage_lift}%</td>
              ))}
            </tr>

            {/* Suggested Hardware */}
            <tr>
              <td className="p-3 text-slate-400 font-medium">Suggested Plugs</td>
              {candidates.map(c => (
                <td key={c.id} className="p-3 text-slate-300 text-[11px]">{c.suggested_config}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-end pt-3 border-t border-slate-800">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
        >
          Close Comparison
        </button>
      </div>
    </Modal>
  );
}
