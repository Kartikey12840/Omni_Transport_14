/**
 * Mumbai Metropolitan EV Geospatial Planning Dataset
 * Anchored around Goregaon Link Road Junction (Phase 2 benchmark)
 */

export const mumbaiData = {
  id: 'mumbai',
  name: 'Mumbai',
  state: 'Maharashtra',
  center: [19.0760, 72.8777],
  zoom: 11,
  bounds: [
    [18.9000, 72.7700],
    [19.2800, 73.0500]
  ],
  baselineCoverage: 64.5,
  baselineDemandServed: 61.8,
  baselineAvgUtilization: 65.0,
  totalFleetEst: 168000,
  existingStationsCount: 16,

  existingStations: [
    {
      id: 'mum-stn-1',
      name: 'Tata Power — BKC G Block Hub',
      lat: 19.0665,
      lng: 72.8685,
      charger_type: 'Ultra-Fast DC (120kW)',
      power_kw: 120,
      ports: 6,
      status: 'Operational',
      operator: 'Tata Power EZ Charge',
      address: 'G Block, Bandra Kurla Complex, Bandra East',
      city: 'Mumbai'
    },
    {
      id: 'mum-stn-2',
      name: 'Jio-bp pulse — Andheri East MIDC',
      lat: 19.1197,
      lng: 72.8690,
      charger_type: 'DC Fast (60kW Dual)',
      power_kw: 60,
      ports: 4,
      status: 'Operational',
      operator: 'Jio-bp pulse',
      address: 'Central Road, MIDC, Andheri East',
      city: 'Mumbai'
    },
    {
      id: 'mum-stn-3',
      name: 'Statiq Hub — Lower Parel Phoenix Palladium',
      lat: 18.9950,
      lng: 72.8255,
      charger_type: 'DC Fast (60kW)',
      power_kw: 60,
      ports: 4,
      status: 'Operational',
      operator: 'Statiq',
      address: 'Senapati Bapat Marg, Lower Parel',
      city: 'Mumbai'
    },
    {
      id: 'mum-stn-4',
      name: 'Adani Electricity — Chembur Diamond Garden',
      lat: 19.0550,
      lng: 72.8980,
      charger_type: 'DC Fast (50kW)',
      power_kw: 50,
      ports: 2,
      status: 'Operational',
      operator: 'Adani EV',
      address: 'Sion-Trombay Road, Chembur',
      city: 'Mumbai'
    },
    {
      id: 'mum-stn-5',
      name: 'Fortum Charge — Powai Hiranandani Galleria',
      lat: 19.1180,
      lng: 72.9090,
      charger_type: 'DC Fast (60kW)',
      power_kw: 60,
      ports: 4,
      status: 'Operational',
      operator: 'Fortum',
      address: 'Galleria Mall, Hiranandani Gardens, Powai',
      city: 'Mumbai'
    },
    {
      id: 'mum-stn-6',
      name: 'Tata Power — Worli Sea Face Plaza',
      lat: 19.0150,
      lng: 72.8180,
      charger_type: 'DC Fast (50kW)',
      power_kw: 50,
      ports: 2,
      status: 'Operational',
      operator: 'Tata Power EZ Charge',
      address: 'Dr Annie Besant Rd, Worli',
      city: 'Mumbai'
    },
    {
      id: 'mum-stn-7',
      name: 'Zeon Charging — Navi Mumbai Vashi Inorbit',
      lat: 19.0650,
      lng: 72.9980,
      charger_type: 'DC Fast (60kW)',
      power_kw: 60,
      ports: 4,
      status: 'Operational',
      operator: 'Zeon Charging',
      address: 'Inorbit Mall, Sector 30A, Vashi',
      city: 'Mumbai'
    },
    {
      id: 'mum-stn-8',
      name: 'Kazam Hub — Borivali West Link Road',
      lat: 19.2300,
      lng: 72.8450,
      charger_type: 'DC Fast (50kW)',
      power_kw: 50,
      ports: 2,
      status: 'Operational',
      operator: 'Kazam EV',
      address: 'New Link Road, Borivali West',
      city: 'Mumbai'
    },
    {
      id: 'mum-stn-9',
      name: 'Jio-bp pulse — Thane Majiwada Junction',
      lat: 19.2150,
      lng: 72.9800,
      charger_type: 'DC Fast (60kW)',
      power_kw: 60,
      ports: 4,
      status: 'Operational',
      operator: 'Jio-bp pulse',
      address: 'Eastern Express Highway, Majiwada, Thane',
      city: 'Mumbai'
    },
    {
      id: 'mum-stn-10',
      name: 'Tata Power — Nariman Point Air India Bldg',
      lat: 18.9280,
      lng: 72.8240,
      charger_type: 'DC Fast (50kW)',
      power_kw: 50,
      ports: 2,
      status: 'Operational',
      operator: 'Tata Power EZ Charge',
      address: 'Marine Drive, Nariman Point',
      city: 'Mumbai'
    }
  ],

  demandZones: [
    {
      id: 'mum-zone-goregaon',
      name: 'Goregaon — Western Express & Link Road Corridor',
      lat: 19.1650,
      lng: 72.8480,
      polygon: [
        [19.1800, 72.8300],
        [19.1810, 72.8680],
        [19.1500, 72.8670],
        [19.1490, 72.8290]
      ],
      demand_index: 92,
      population_density: 22400,
      commercial_index: 94,
      ev_density_index: 90,
      category: 'High Commercial / Tech Corridor',
      initially_covered: false
    },
    {
      id: 'mum-zone-bkc',
      name: 'BKC — Bandra Kurla Financial Hub',
      lat: 19.0660,
      lng: 72.8670,
      polygon: [
        [19.0780, 72.8500],
        [19.0790, 72.8850],
        [19.0520, 72.8840],
        [19.0510, 72.8490]
      ],
      demand_index: 95,
      population_density: 18200,
      commercial_index: 98,
      ev_density_index: 94,
      category: 'High Commercial / Tech Corridor',
      initially_covered: true
    },
    {
      id: 'mum-zone-andheri',
      name: 'Andheri East — MIDC & Airport Belt',
      lat: 19.1200,
      lng: 72.8680,
      polygon: [
        [19.1350, 72.8500],
        [19.1360, 72.8880],
        [19.1020, 72.8870],
        [19.1010, 72.8490]
      ],
      demand_index: 90,
      population_density: 24800,
      commercial_index: 92,
      ev_density_index: 88,
      category: 'High Commercial / Tech Corridor',
      initially_covered: true
    },
    {
      id: 'mum-zone-powai',
      name: 'Powai — Hiranandani & JVLR Tech Spine',
      lat: 19.1200,
      lng: 72.9080,
      polygon: [
        [19.1350, 72.8900],
        [19.1360, 72.9250],
        [19.1050, 72.9240],
        [19.1040, 72.8890]
      ],
      demand_index: 84,
      population_density: 16500,
      commercial_index: 87,
      ev_density_index: 83,
      category: 'Dense Residential',
      initially_covered: true
    },
    {
      id: 'mum-zone-vashi',
      name: 'Vashi — Palm Beach & APMC Market',
      lat: 19.0720,
      lng: 72.9980,
      polygon: [
        [19.0900, 72.9780],
        [19.0910, 73.0180],
        [19.0550, 73.0170],
        [19.0540, 72.9770]
      ],
      demand_index: 86,
      population_density: 14200,
      commercial_index: 88,
      ev_density_index: 85,
      category: 'Transit Hub',
      initially_covered: true
    },
    {
      id: 'mum-zone-thane',
      name: 'Thane — Majiwada & Ghodbunder Corridor',
      lat: 19.2200,
      lng: 72.9750,
      polygon: [
        [19.2400, 72.9550],
        [19.2410, 72.9950],
        [19.2000, 72.9940],
        [19.1990, 72.9540]
      ],
      demand_index: 81,
      population_density: 19800,
      commercial_index: 80,
      ev_density_index: 81,
      category: 'Highway Interchange',
      initially_covered: true
    }
  ],

  candidateSites: [
    {
      id: 'mum-cand-1',
      name: 'Goregaon Link Road Junction',
      lat: 19.1648,
      lng: 72.8485,
      city: 'Mumbai',
      demand_score: 92,
      coverage_gap_score: 86,
      accessibility_score: 89,
      grid_fit_score: 85,
      utilization_score: 77,
      composite_score: 87,
      rank: 1,
      priority: 'HIGH',
      reasons: [
        'Strategic nexus between Western Express Highway and Link Road commercial arteries',
        'Large coverage void for high-density suburban EV commuters',
        'Direct access to Adani Electricity 33kV distribution network with high headroom',
        'Surrounded by major mall clusters and high-density commercial tech parks'
      ],
      estimated_coverage_lift: 12.2,
      estimated_utilization: 77.0,
      suggested_config: '6x 120kW Dual-Gun DC Fast + 2x 22kW AC Backup',
      nearby_amenities: ['Inorbit Mall / Oberoi Mall Spine', 'Goregaon Station Road', 'NESCO IT Exhibition Center'],
      is_modeled: true
    },
    {
      id: 'mum-cand-2',
      name: 'Andheri-Kurla Road Junction (Saki Naka)',
      lat: 19.1090,
      lng: 72.8820,
      city: 'Mumbai',
      demand_score: 90,
      coverage_gap_score: 83,
      accessibility_score: 91,
      grid_fit_score: 82,
      utilization_score: 75,
      composite_score: 85,
      rank: 2,
      priority: 'HIGH',
      reasons: [
        'High-density commercial spine connecting Metro Line 1 with Chhatrapati Shivaji Airport cargo zone',
        'High commercial EV fleet turnover (last-mile logistics and app cabs)',
        '3.4km gap to nearest dedicated multi-gun fast charging plaza'
      ],
      estimated_coverage_lift: 10.9,
      estimated_utilization: 75.0,
      suggested_config: '4x 120kW DC Fast + 2x 22kW AC',
      nearby_amenities: ['Saki Naka Metro Hub', 'International Airport Cargo Gate', 'Hotel Corridor'],
      is_modeled: true
    },
    {
      id: 'mum-cand-3',
      name: 'Vashi Palm Beach Commercial Hub',
      lat: 19.0725,
      lng: 73.0040,
      city: 'Mumbai',
      demand_score: 86,
      coverage_gap_score: 84,
      accessibility_score: 87,
      grid_fit_score: 80,
      utilization_score: 73,
      composite_score: 82,
      rank: 3,
      priority: 'HIGH',
      reasons: [
        'Scenic, wide arterial road carrying heavy daily commuter traffic between Mumbai and Navi Mumbai',
        'Underserved luxury and private EV segment in Vashi and Sanpada',
        'Substantial parking apron space available'
      ],
      estimated_coverage_lift: 9.7,
      estimated_utilization: 73.0,
      suggested_config: '4x 60kW DC Fast',
      nearby_amenities: ['Palm Beach High Street', 'Vashi APMC Market', 'Sanpada Flyover'],
      is_modeled: true
    },
    {
      id: 'mum-cand-4',
      name: 'Powai JVLR Central Interchange',
      lat: 19.1245,
      lng: 72.9015,
      city: 'Mumbai',
      demand_score: 84,
      coverage_gap_score: 81,
      accessibility_score: 85,
      grid_fit_score: 83,
      utilization_score: 71,
      composite_score: 80,
      rank: 4,
      priority: 'HIGH',
      reasons: [
        'Critical East-West corridor connecting Western and Eastern Express Highways',
        'High residential tech demographic in Hiranandani & Chandivali',
        'Good substation feeder headroom near IIT Bombay grid'
      ],
      estimated_coverage_lift: 8.8,
      estimated_utilization: 71.0,
      suggested_config: '4x 60kW DC Fast + 2x 22kW AC',
      nearby_amenities: ['JVLR Flyover Node', 'Hiranandani Corporate Park', 'IIT Bombay Gate'],
      is_modeled: true
    },
    {
      id: 'mum-cand-5',
      name: 'Thane Majiwada Golden Triangle',
      lat: 19.2185,
      lng: 72.9780,
      city: 'Mumbai',
      demand_score: 81,
      coverage_gap_score: 85,
      accessibility_score: 84,
      grid_fit_score: 79,
      utilization_score: 69,
      composite_score: 78,
      rank: 5,
      priority: 'MEDIUM',
      reasons: [
        'Key junction for Mumbai, Nashik, and Ghodbunder traffic convergence',
        'High intercity EV travel node requiring high-power quick top-ups',
        'Moderate grid expansion planned by MSEDCL'
      ],
      estimated_coverage_lift: 8.1,
      estimated_utilization: 69.0,
      suggested_config: '4x 120kW DC Fast Hub',
      nearby_amenities: ['Viviana Mall Axis', 'Ghodbunder Entry', 'Eastern Express Highway Toll'],
      is_modeled: true
    }
  ],

  gridSubstations: [
    { id: 'mum-sub-1', name: 'Aarey/Goregaon 220/33kV Substation', lat: 19.1620, lng: 72.8600, capacity_mva: '80 MVA', headroom_mw: 4.2, voltage_kv: '220/33', status: 'Optimal' },
    { id: 'mum-sub-2', name: 'BKC 110/33kV Substation', lat: 19.0680, lng: 72.8620, capacity_mva: '60 MVA', headroom_mw: 3.5, voltage_kv: '110/33', status: 'Optimal' },
    { id: 'mum-sub-3', name: 'Vashi 100/22kV Substation', lat: 19.0750, lng: 73.0020, capacity_mva: '50 MVA', headroom_mw: 2.8, voltage_kv: '100/22', status: 'Adequate' }
  ]
};
