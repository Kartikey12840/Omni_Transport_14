import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issues in bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function MapEngine({
  cityData,
  selectedCandidate,
  onSelectCandidate,
  optimizationResult,
  layers,
  customSelectedIds = []
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupsRef = useRef({
    existing: null,
    demand: null,
    gaps: null,
    candidates: null,
    grid: null,
    radius: null
  });

  // 1. Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: cityData.center,
        zoom: cityData.zoom,
        zoomControl: false,
        attributionControl: true
      });

      // Add CartoDB Dark Matter tile layer for a sleek dark GIS aesthetic
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Create LayerGroups
      layerGroupsRef.current.demand = L.layerGroup().addTo(map);
      layerGroupsRef.current.gaps = L.layerGroup().addTo(map);
      layerGroupsRef.current.radius = L.layerGroup().addTo(map);
      layerGroupsRef.current.existing = L.layerGroup().addTo(map);
      layerGroupsRef.current.grid = L.layerGroup().addTo(map);
      layerGroupsRef.current.candidates = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;
    }

    // Fly to city center on city switch
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(cityData.center, cityData.zoom, { duration: 1.2 });
    }

    return () => {
      // Clean up on component unmount if needed
    };
  }, [cityData.id]);

  // 2. Pan/zoom to selected candidate
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedCandidate) return;
    mapInstanceRef.current.flyTo([selectedCandidate.lat, selectedCandidate.lng], 14, {
      duration: 1.0,
      easeLinearity: 0.25
    });
  }, [selectedCandidate?.id]);

  // 3. Render Layers whenever data, optimization result, or layers toggle changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const { existing, demand, gaps, candidates, grid, radius } = layerGroupsRef.current;

    // Clear all layer groups
    existing.clearLayers();
    demand.clearLayers();
    gaps.clearLayers();
    candidates.clearLayers();
    grid.clearLayers();
    radius.clearLayers();

    // A. Render Demand Heatmap / Zones
    if (layers.showDemand && cityData.demandZones) {
      cityData.demandZones.forEach(zone => {
        const demandRatio = (zone.demand_index - 70) / 30; // 0 to 1
        const fillColor = demandRatio > 0.7 ? '#f43f5e' : demandRatio > 0.4 ? '#f59e0b' : '#3b82f6';
        
        const polygon = L.polygon(zone.polygon, {
          color: fillColor,
          weight: 1.5,
          opacity: 0.8,
          fillColor: fillColor,
          fillOpacity: 0.22,
          dashArray: zone.initially_covered ? null : '4, 4'
        });

        polygon.bindTooltip(`
          <div class="font-sans text-xs">
            <strong class="text-slate-100">${zone.name}</strong><br/>
            <span class="text-emerald-400 font-semibold">Demand Index: ${zone.demand_index}/100</span><br/>
            <span class="text-slate-400">Pop Density: ${zone.population_density.toLocaleString()}/sq km</span>
          </div>
        `, { sticky: true, className: 'leaflet-dark-tooltip' });

        polygon.addTo(demand);
      });
    }

    // B. Render Coverage Gaps
    if (layers.showGaps && cityData.demandZones) {
      cityData.demandZones
        .filter(z => !z.initially_covered)
        .forEach(zone => {
          const circle = L.circle([zone.lat, zone.lng], {
            radius: 2200,
            color: '#f59e0b',
            weight: 2,
            dashArray: '6, 8',
            fillColor: '#f59e0b',
            fillOpacity: 0.12
          });

          circle.bindTooltip(`
            <div class="font-sans text-xs">
              <strong class="text-amber-300">⚠️ High-Demand Coverage Gap</strong><br/>
              <span class="text-slate-300">${zone.name}</span><br/>
              <span class="text-slate-400">No public fast charger within 3.5km</span>
            </div>
          `, { sticky: true });

          circle.addTo(gaps);
        });
    }

    // C. Render Existing Stations
    if (layers.showExisting && cityData.existingStations) {
      cityData.existingStations.forEach(stn => {
        const iconHtml = `
          <div class="relative flex items-center justify-center w-7 h-7 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-950/80 cursor-pointer hover:scale-110 transition-transform">
            <span class="text-xs font-bold">⚡</span>
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: 'custom-station-icon',
          iconSize: [28, 28],
          iconAnchor: [14, 14],
          popupAnchor: [0, -14]
        });

        const marker = L.marker([stn.lat, stn.lng], { icon: customIcon });
        
        marker.bindPopup(`
          <div class="p-3 font-sans text-xs min-w-[210px]">
            <div class="flex items-center justify-between gap-2 mb-1">
              <span class="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                ${stn.operator}
              </span>
              <span class="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                ● ${stn.status}
              </span>
            </div>
            <h4 class="font-bold text-sm text-slate-100 my-1">${stn.name}</h4>
            <p class="text-slate-400 text-[11px] mb-2">${stn.address}</p>
            <div class="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-700/60 text-[11px]">
              <div><span class="text-slate-500">Power:</span> <strong class="text-slate-200">${stn.power_kw} kW</strong></div>
              <div><span class="text-slate-500">Ports:</span> <strong class="text-slate-200">${stn.ports} Plugs</strong></div>
            </div>
          </div>
        `);

        marker.addTo(existing);
      });
    }

    // D. Render Grid Substations
    if (layers.showGrid && cityData.gridSubstations) {
      cityData.gridSubstations.forEach(sub => {
        const iconHtml = `
          <div class="flex items-center justify-center w-6 h-6 rounded bg-purple-950 border border-purple-400 text-purple-200 shadow text-[10px] font-bold">
            ⚙
          </div>
        `;
        const icon = L.divIcon({
          html: iconHtml,
          className: 'custom-grid-icon',
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        const marker = L.marker([sub.lat, sub.lng], { icon });
        marker.bindTooltip(`
          <div class="font-sans text-xs">
            <strong class="text-purple-300">Substation: ${sub.name}</strong><br/>
            <span>Voltage: ${sub.voltage_kv} kV</span> | <span>Capacity: ${sub.capacity_mva}</span><br/>
            <span class="text-emerald-400">Headroom: +${sub.headroom_mw} MW Available</span>
          </div>
        `);
        marker.addTo(grid);
      });
    }

    // E. Render Candidate Sites & Recommended Coverage Radii
    if (layers.showCandidates && cityData.candidateSites) {
      const candidatesToRender = optimizationResult?.allCandidatesScored || cityData.candidateSites;
      const selectedIds = optimizationResult
        ? optimizationResult.selectedCandidates.map(c => c.id)
        : (customSelectedIds.length > 0 ? customSelectedIds : (selectedCandidate ? [selectedCandidate.id] : []));

      candidatesToRender.forEach(cand => {
        const isSelected = selectedCandidate?.id === cand.id;
        const isRecommended = selectedIds.includes(cand.id);
        const rankIndex = optimizationResult?.selectedCandidates?.findIndex(c => c.id === cand.id);
        const displayRank = rankIndex !== undefined && rankIndex !== -1 ? rankIndex + 1 : cand.rank;

        // Visual treatment
        const size = isSelected ? 36 : isRecommended ? 32 : 26;
        const bgColor = isRecommended ? 'bg-emerald-500 text-dark-950 font-extrabold' : 'bg-dark-800 text-slate-200 border border-slate-600';
        const shadowClass = isRecommended ? 'shadow-glow-emerald ring-2 ring-emerald-300' : 'shadow-md';
        const pulseEffect = (isSelected || (isRecommended && displayRank === 1)) ? `
          <div class="absolute inset-0 -m-2 rounded-full border-2 border-emerald-400 animate-pulse-ring pointer-events-none"></div>
        ` : '';

        const iconHtml = `
          <div class="relative flex items-center justify-center cursor-pointer transition-all hover:scale-115">
            ${pulseEffect}
            <div class="w-[${size}px] h-[${size}px] rounded-lg ${bgColor} ${shadowClass} flex items-center justify-center text-xs font-mono font-bold">
              ${isRecommended ? `#${displayRank}` : cand.composite_score}
            </div>
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: 'custom-candidate-icon',
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2]
        });

        const marker = L.marker([cand.lat, cand.lng], { icon: customIcon, zIndexOffset: isRecommended ? 500 : 100 });

        marker.on('click', () => {
          onSelectCandidate(cand);
        });

        marker.bindTooltip(`
          <div class="p-1 font-sans text-xs">
            <div class="flex items-center gap-2 mb-1">
              <span class="font-mono font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800">
                Score ${cand.composite_score}/100
              </span>
              ${isRecommended ? '<span class="text-xs text-emerald-300 font-bold">RECOMMENDED</span>' : ''}
            </div>
            <strong class="text-slate-100">${cand.name}</strong><br/>
            <span class="text-slate-400">Demand: ${cand.demand_score} • Gap: ${cand.coverage_gap_score} • Lift: +${cand.estimated_coverage_lift}%</span>
          </div>
        `, { sticky: true });

        marker.addTo(candidates);

        // F. Render 2.5km Coverage Radius if recommended or selected or radius toggled
        if (layers.showRadius || isRecommended || isSelected) {
          const circleColor = isRecommended ? '#10b981' : '#06b6d4';
          const radiusCircle = L.circle([cand.lat, cand.lng], {
            radius: 2500,
            color: circleColor,
            weight: isSelected ? 2.5 : 1.5,
            dashArray: isRecommended ? null : '4, 6',
            fillColor: circleColor,
            fillOpacity: isSelected ? 0.18 : 0.08
          });

          radiusCircle.addTo(radius);
        }
      });
    }

  }, [cityData, selectedCandidate, optimizationResult, layers, customSelectedIds]);

  return (
    <div className="relative w-full h-full bg-dark-950">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
}
