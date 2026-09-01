import React from 'react';
import { Download, Printer, FileText, CheckCircle2 } from 'lucide-react';
import Modal from '../Common/Modal.jsx';
import { downloadScenarioCSV, printScenarioReport } from '../../utils/export.js';

export default function ExportReportModal({
  isOpen,
  onClose,
  optimizationResult,
  cityData
}) {
  if (!optimizationResult) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Export Infrastructure Planning Report"
      subtitle={`Comprehensive deployment roadmap for ${cityData.name}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4 text-xs text-slate-300">
        {/* Executive Card */}
        <div className="bg-dark-850 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-emerald-400 font-bold uppercase text-[10px] tracking-wider">Report Summary</span>
            <span className="font-mono text-slate-400 text-[10px]">Objective: {optimizationResult.objectiveName}</span>
          </div>
          <h4 className="text-sm font-bold text-slate-100">
            {cityData.name} — {optimizationResult.stationCount} Station Deployment Plan
          </h4>
          <p className="text-slate-400 text-xs">
            Projected network coverage expands from <strong className="text-slate-200">{optimizationResult.metrics.before.coverage}%</strong> to <strong className="text-emerald-400">{optimizationResult.metrics.after.coverage}%</strong> (+{optimizationResult.metrics.impact.coverageLift}% lift), capturing {optimizationResult.metrics.after.demandServed}% total EV demand.
          </p>
        </div>

        {/* Candidate List Table Preview */}
        <div className="border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-dark-850 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="p-2.5">Rank</th>
                <th className="p-2.5">Location</th>
                <th className="p-2.5">Score</th>
                <th className="p-2.5">Demand</th>
                <th className="p-2.5">Lift</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {optimizationResult.selectedCandidates.map((c, i) => (
                <tr key={c.id}>
                  <td className="p-2.5 font-mono font-bold text-emerald-400">#{i + 1}</td>
                  <td className="p-2.5 font-medium text-slate-200">{c.name}</td>
                  <td className="p-2.5 font-mono font-bold">{c.composite_score}/100</td>
                  <td className="p-2.5 font-mono text-rose-400">{c.demand_score}</td>
                  <td className="p-2.5 font-mono text-emerald-400">+{c.marginalLift || c.estimated_coverage_lift}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-amber-950/20 border border-amber-500/30 p-3 rounded-xl text-[11px] text-amber-200/90 leading-snug">
          <strong>Notice:</strong> This report is intended for infrastructure planning decision support. All values are calculated from OpenStreetMap geospatial layers and demand density proxies.
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
        <button
          onClick={() => downloadScenarioCSV(optimizationResult, cityData)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-dark-850 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download CSV</span>
        </button>

        <button
          onClick={() => printScenarioReport(optimizationResult, cityData)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-dark-950 font-extrabold text-xs shadow-glow-emerald transition-all"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / Save PDF</span>
        </button>
      </div>
    </Modal>
  );
}
