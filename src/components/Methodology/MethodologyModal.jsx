import React from 'react';
import { BookOpen, Layers, CheckCircle, Cpu, Radio, Award } from 'lucide-react';
import Modal from '../Common/Modal.jsx';

export default function MethodologyModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Methodology & Algorithmic Foundation"
      subtitle="How ChargeOpt AI evaluates and ranks EV charging station candidate sites"
      maxWidth="max-w-3xl"
    >
      <div className="space-y-4 text-xs text-slate-300">
        {/* Step-by-Step Optimization Workflow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-dark-850 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-bold text-emerald-400 font-mono">01 — Geospatial Signal Fusion</span>
            <h4 className="text-xs font-bold text-slate-100">Multi-Signal Extraction</h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Extracts arterial road networks, commercial POIs, population density, and existing charging stations from OpenStreetMap and demographic surveys.
            </p>
          </div>

          <div className="bg-dark-850 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-bold text-cyan-400 font-mono">02 — Demand & Gap Surface Modeling</span>
            <h4 className="text-xs font-bold text-slate-100">Coverage Void Analysis</h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Computes a continuous demand surface and identifies high-density EV corridors situated beyond a 2.5km radius from existing high-power chargers.
            </p>
          </div>

          <div className="bg-dark-850 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-bold text-amber-400 font-mono">03 — Normalized Scoring Matrix</span>
            <h4 className="text-xs font-bold text-slate-100">Multi-Criteria Evaluation</h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Scores candidate points across Demand ($w_1$), Coverage Gap ($w_2$), Accessibility ($w_3$), Grid Fit ($w_4$), and Utilization ($w_5$) based on chosen objective.
            </p>
          </div>

          <div className="bg-dark-850 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-bold text-purple-400 font-mono">04 — MCLP Greedy Selection</span>
            <h4 className="text-xs font-bold text-slate-100">Marginal Return Allocation</h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Sequentially selects the candidate offering highest marginal demand coverage, applying spatial decay to prevent cannibalization between adjacent hubs.
            </p>
          </div>
        </div>

        {/* Mathematical Formula Preview */}
        <div className="bg-dark-950 p-3.5 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-300">
          <div className="text-slate-400 text-[10px] mb-1 font-sans">Composite Suitability Formula:</div>
          <code>
            Score = (w_d · Demand) + (w_g · CoverageGap) + (w_a · Access) + (w_e · GridFit) + (w_u · Utilization)
          </code>
        </div>

        {/* Data Sources Disclosure */}
        <div className="bg-dark-850 p-3.5 rounded-xl border border-slate-800 space-y-2 text-[11px]">
          <h5 className="font-bold text-slate-200 uppercase text-[10px]">Data Sources & Grounding</h5>
          <ul className="space-y-1 text-slate-400">
            <li>• <strong>OpenStreetMap (OSM):</strong> Road hierarchy, highways, and public transit nodes.</li>
            <li>• <strong>State DISCOM / Utility Topologies:</strong> Substation capacities and distribution transformer headroom estimates.</li>
            <li>• <strong>Regional EV Adoption Curves:</strong> Modeled fleet registration statistics for Bengaluru, Mumbai, and Delhi NCR.</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-end pt-3 border-t border-slate-800">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
        >
          Got it
        </button>
      </div>
    </Modal>
  );
}
