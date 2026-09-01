import React, { useState, useEffect } from 'react';
import Navbar from './components/Common/Navbar.jsx';
import LandingPage from './components/Landing/LandingPage.jsx';
import PlanningDashboard from './components/Dashboard/PlanningDashboard.jsx';
import NetworkAnalyticsView from './components/Analytics/NetworkAnalyticsView.jsx';
import ScenarioManager from './components/Scenarios/ScenarioManager.jsx';
import ExportReportModal from './components/Reports/ExportReportModal.jsx';
import MethodologyModal from './components/Methodology/MethodologyModal.jsx';
import { getCityData, CITIES_MAP } from './data/cities.js';
import { runOptimization } from './utils/optimizer.js';

export default function App() {
  const [activeView, setActiveView] = useState('landing'); // 'landing' | 'planning' | 'analytics' | 'scenarios'
  const [currentCityId, setCurrentCityId] = useState('bengaluru');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [optimizationResult, setOptimizationResult] = useState(null);
  const [activeScenarioName, setActiveScenarioName] = useState('Bengaluru Benchmark Plan');
  
  // Modals state
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);

  const cityData = getCityData(currentCityId);

  // Initialize with benchmark optimization result
  useEffect(() => {
    const defaultResult = runOptimization({
      cityData,
      objectiveId: 'max_coverage',
      stationCount: 3
    });
    setOptimizationResult(defaultResult);
    if (defaultResult.selectedCandidates.length > 0) {
      setSelectedCandidate(defaultResult.selectedCandidates[0]);
    }
  }, [currentCityId]);

  // Handle City Change
  const handleCityChange = (newCityId) => {
    setCurrentCityId(newCityId);
    const newCityData = getCityData(newCityId);
    const newResult = runOptimization({
      cityData: newCityData,
      objectiveId: 'max_coverage',
      stationCount: 3
    });
    setOptimizationResult(newResult);
    if (newResult.selectedCandidates.length > 0) {
      setSelectedCandidate(newResult.selectedCandidates[0]);
    }
    setActiveScenarioName(`${newCityData.name} Standard Expansion`);
  };

  // Trigger Explore Demo (Fast 1-click entry)
  const handleExploreDemo = () => {
    handleCityChange('bengaluru');
    setActiveView('planning');
  };

  // Handle Load Saved Scenario
  const handleLoadScenario = (scenario) => {
    if (scenario.cityId && scenario.cityId !== currentCityId) {
      setCurrentCityId(scenario.cityId);
    }
    const targetCity = getCityData(scenario.cityId || currentCityId);
    const res = runOptimization({
      cityData: targetCity,
      objectiveId: scenario.objective || 'max_coverage',
      stationCount: scenario.stationCount || 3
    });
    setOptimizationResult(res);
    if (res.selectedCandidates.length > 0) {
      setSelectedCandidate(res.selectedCandidates[0]);
    }
    setActiveScenarioName(scenario.name);
    setActiveView('planning');
  };

  // Handle Save Scenario
  const handleSaveScenario = (customData) => {
    const name = prompt('Enter a name for this planning scenario:', `${cityData.name} — ${optimizationResult?.objectiveName || 'Coverage'} Plan`);
    if (!name) return;

    const newScenario = {
      id: `scen-${Date.now()}`,
      name,
      cityId: currentCityId,
      cityName: cityData.name,
      objective: optimizationResult?.objective || 'max_coverage',
      objectiveName: optimizationResult?.objectiveName || 'Maximum Coverage',
      stationCount: optimizationResult?.stationCount || 3,
      coverageLift: optimizationResult?.metrics?.impact?.coverageLift || 13.4,
      projectedCoverage: optimizationResult?.metrics?.after?.coverage || 81.4,
      stationsList: optimizationResult?.selectedCandidates?.map(c => c.name) || [],
      createdAt: new Date().toISOString().split('T')[0]
    };

    try {
      const existing = JSON.parse(localStorage.getItem('chargeopt_saved_scenarios') || '[]');
      localStorage.setItem('chargeopt_saved_scenarios', JSON.stringify([newScenario, ...existing]));
      alert('Scenario successfully saved!');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col font-sans">
      {/* Top Universal Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        currentCityId={currentCityId}
        onCityChange={handleCityChange}
        activeScenarioName={activeScenarioName}
        optimizationResult={optimizationResult}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        onToggleAI={() => setIsAIOpen(prev => !prev)}
      />

      {/* Main View Router */}
      <main className="flex-1 flex flex-col">
        {activeView === 'landing' && (
          <LandingPage
            onStartPlanning={() => setActiveView('planning')}
            onExploreDemo={handleExploreDemo}
          />
        )}

        {activeView === 'planning' && (
          <PlanningDashboard
            cityData={cityData}
            optimizationResult={optimizationResult}
            setOptimizationResult={setOptimizationResult}
            selectedCandidate={selectedCandidate}
            setSelectedCandidate={setSelectedCandidate}
            onSaveScenario={handleSaveScenario}
            isAIOpen={isAIOpen}
            setIsAIOpen={setIsAIOpen}
          />
        )}

        {activeView === 'analytics' && (
          <NetworkAnalyticsView
            cityData={cityData}
            optimizationResult={optimizationResult}
            onOpenPlanning={() => setActiveView('planning')}
          />
        )}

        {activeView === 'scenarios' && (
          <ScenarioManager
            onLoadScenario={handleLoadScenario}
            onOpenPlanning={() => setActiveView('planning')}
            currentCityId={currentCityId}
          />
        )}
      </main>

      {/* Universal Modals */}
      <ExportReportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        optimizationResult={optimizationResult}
        cityData={cityData}
      />

      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />
    </div>
  );
}
