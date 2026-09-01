import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Search, 
  Sliders, 
  Layers, 
  Radio, 
  TrendingUp, 
  ShieldCheck, 
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import MapEngine from '../Map/MapEngine.jsx';
import MapLayerControl from '../Map/MapLayerControl.jsx';
import MapLegend from '../Map/MapLegend.jsx';
import OptimizationControls from './OptimizationControls.jsx';
import OptimizationProgressModal from './OptimizationProgressModal.jsx';
import CandidateList from './CandidateList.jsx';
import SiteDetailPanel from './SiteDetailPanel.jsx';
import WhatIfSimulator from '../Simulator/WhatIfSimulator.jsx';
import CandidateComparisonModal from '../Comparison/CandidateComparisonModal.jsx';
import AIAssistantDrawer from '../AI/AIAssistantDrawer.jsx';
import { runOptimization } from '../../utils/optimizer.js';
import { OBJECTIVES } from '../../data/types.js';

export default function PlanningDashboard({
  cityData,
  optimizationResult,
  setOptimizationResult,
  selectedCandidate,
  setSelectedCandidate,
  onSaveScenario,
  isAIOpen,
  setIsAIOpen
}) {
  // Navigation tabs inside right sidebar
  const [rightTab, setRightTab] = useState('recommendations'); // 'recommendations' | 'details' | 'simulator'

  // Map layer states
  const [layers, setLayers] = useState({
    showExisting: true,
    showDemand: true,
    showGaps: true,
    showCandidates: true,
    showGrid: false,
    showRadius: true,
  });

  // Optimization control states
  const [objectiveId, setObjectiveId] = useState('max_coverage');
  const [stationCount, setStationCount] = useState(3);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [compareList, setCompareList] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [customSimSelectedIds, setCustomSimSelectedIds] = useState([]);

  // Auto-select candidate if none selected
  useEffect(() => {
    if (cityData?.candidateSites?.length > 0 && !selectedCandidate) {
      setSelectedCandidate(cityData.candidateSites[0]);
    }
  }, [cityData]);

  // Handle Layer Toggle
  const handleToggleLayer = (layerKey) => {
    setLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  // Run Optimization Trigger
  const handleStartOptimization = () => {
    setIsOptimizing(true);
  };

  // Complete Optimization
  const handleOptimizationComplete = () => {
    setIsOptimizing(false);
    const result = runOptimization({
      cityData,
      objectiveId,
      stationCount
    });

    setOptimizationResult(result);
    if (result.selectedCandidates.length > 0) {
      setSelectedCandidate(result.selectedCandidates[0]);
    }
    setRightTab('recommendations');
  };

  // Reset back to benchmark demo
  const handleResetDemo = () => {
    setObjectiveId('max_coverage');
    setStationCount(3);
    const result = runOptimization({
      cityData,
      objectiveId: 'max_coverage',
      stationCount: 3
    });
    setOptimizationResult(result);
    if (result.selectedCandidates.length > 0) {
      setSelectedCandidate(result.selectedCandidates[0]);
    }
  };

  // Handle Search Filter
  const filteredCandidates = (optimizationResult?.allCandidatesScored || cityData.candidateSites).filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle Compare Candidate
  const handleToggleCompare = (cand) => {
    setCompareList((prev) => {
      const exists = prev.some((c) => c.id === cand.id);
      if (exists) {
        return prev.filter((c) => c.id !== cand.id);
      } else {
        if (prev.length >= 3) return prev; // max 3
        return [...prev, cand];
      }
    });
  };

  const handleSimulateCandidate = (cand) => {
    setSelectedCandidate(cand);
    setRightTab('simulator');
  };

  const counts = {
    existing: cityData.existingStations?.length || 0,
    demandZones: cityData.demandZones?.length || 0,
    candidates: cityData.candidateSites?.length || 0,
    grid: cityData.gridSubstations?.length || 0
  };

  return (
    <div className="relative flex-1 flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden bg-dark-950">
      {/* 1. LEFT SIDEBAR: Controls & Map Layer Controls */}
      <aside className="w-full lg:w-80 xl:w-96 p-3 lg:p-4 overflow-y-auto space-y-4 border-r border-slate-800 bg-dark-900/60 backdrop-blur-md flex-shrink-0 z-10">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidate locations..."
            className="w-full bg-dark-850 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Optimization Controls */}
        <OptimizationControls
          objectiveId={objectiveId}
          setObjectiveId={setObjectiveId}
          stationCount={stationCount}
          setStationCount={setStationCount}
          onRunOptimization={handleStartOptimization}
          isRunning={isOptimizing}
          cityData={cityData}
          onResetDemo={handleResetDemo}
        />

        {/* Floating Map Layer Toggles widget */}
        <MapLayerControl
          layers={layers}
          onToggleLayer={handleToggleLayer}
          counts={counts}
        />
      </aside>

      {/* 2. CENTER: Interactive Geospatial Leaflet Map */}
      <main className="flex-1 relative h-[450px] lg:h-full bg-dark-950">
        <MapEngine
          cityData={cityData}
          selectedCandidate={selectedCandidate}
          onSelectCandidate={(cand) => {
            setSelectedCandidate(cand);
            setRightTab('details');
          }}
          optimizationResult={optimizationResult}
          layers={layers}
          customSelectedIds={customSimSelectedIds}
        />

        {/* Map Header Overlay Pill */}
        <div className="absolute top-4 left-4 z-[400] flex items-center gap-2 bg-dark-900/90 backdrop-blur-md border border-slate-700/70 rounded-xl px-3 py-1.5 shadow-xl text-xs text-slate-200">
          <MapPin className="w-4 h-4 text-emerald-400" />
          <span className="font-bold">{cityData.name}</span>
          <span className="text-slate-500">•</span>
          <span className="text-emerald-400 font-mono font-semibold">
            {optimizationResult ? `${optimizationResult.selectedCandidates.length} Hubs Recommended` : 'Interactive Mode'}
          </span>
        </div>

        {/* Floating Bottom Left Legend */}
        <div className="absolute bottom-6 left-4 z-[400] hidden sm:block max-w-xs">
          <MapLegend layers={layers} hasOptimization={!!optimizationResult} />
        </div>
      </main>

      {/* 3. RIGHT SIDEBAR: Multi-Tab Intelligence Panel */}
      <aside className="w-full lg:w-96 xl:w-[420px] p-3 lg:p-4 overflow-y-auto border-l border-slate-800 bg-dark-900/80 backdrop-blur-md flex-shrink-0 z-10 space-y-3">
        {/* Right Tab Selector */}
        <div className="flex items-center gap-1 bg-dark-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setRightTab('recommendations')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
              rightTab === 'recommendations'
                ? 'bg-emerald-500 text-dark-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Ranked Sites
          </button>
          <button
            onClick={() => setRightTab('details')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
              rightTab === 'details'
                ? 'bg-emerald-500 text-dark-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Why This Site?
          </button>
          <button
            onClick={() => setRightTab('simulator')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
              rightTab === 'simulator'
                ? 'bg-emerald-500 text-dark-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            What-If?
          </button>
        </div>

        {/* Active Tab View */}
        {rightTab === 'recommendations' && (
          <CandidateList
            candidates={filteredCandidates}
            selectedCandidate={selectedCandidate}
            onSelectCandidate={(c) => {
              setSelectedCandidate(c);
              setRightTab('details');
            }}
            optimizationResult={optimizationResult}
            onSimulateCandidate={handleSimulateCandidate}
            onOpenCompare={() => setIsCompareOpen(true)}
            compareList={compareList}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {rightTab === 'details' && (
          <SiteDetailPanel
            candidate={selectedCandidate}
            cityData={cityData}
            objectiveId={objectiveId}
            onSimulate={handleSimulateCandidate}
            onAskAI={() => setIsAIOpen(true)}
            onOpenCompare={() => setIsCompareOpen(true)}
            isCompared={compareList.some(c => c.id === selectedCandidate?.id)}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {rightTab === 'simulator' && (
          <WhatIfSimulator
            cityData={cityData}
            optimizationResult={optimizationResult}
            onApplySimulation={(selectedIds) => {
              setCustomSimSelectedIds(selectedIds);
            }}
            onSaveScenario={onSaveScenario}
          />
        )}
      </aside>

      {/* 4. MODALS & DRAWERS */}
      <OptimizationProgressModal
        isOpen={isOptimizing}
        onComplete={handleOptimizationComplete}
        cityData={cityData}
        objectiveName={OBJECTIVES[objectiveId]?.name || 'Maximum Coverage'}
        stationCount={stationCount}
      />

      <CandidateComparisonModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        candidates={compareList}
      />

      <AIAssistantDrawer
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        selectedCandidate={selectedCandidate}
        optimizationResult={optimizationResult}
        cityData={cityData}
      />
    </div>
  );
}
