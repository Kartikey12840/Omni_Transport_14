/**
 * Delhi NCR EV Geospatial Planning Dataset (Additional Demo Dataset)
 */

export const delhiData = {
  id: 'delhi',
  name: 'Delhi NCR',
  state: 'Delhi / Haryana / UP',
  center: [28.6139, 77.2090],
  zoom: 11,
  bounds: [
    [28.4000, 76.9500],
    [28.8500, 77.4500]
  ],
  baselineCoverage: 69.2,
  baselineDemandServed: 66.0,
  baselineAvgUtilization: 68.0,
  totalFleetEst: 210000,
  existingStationsCount: 16,

  existingStations: [
    {
      id: 'del-stn-1',
      name: 'EESL Hub — Connaught Place Inner Circle',
      lat: 28.6328,
      lng: 77.2197,
      charger_type: 'DC Fast (60kW)',
      power_kw: 60,
      ports: 6,
      status: 'Operational',
      operator: 'EESL / Statiq',
      address: 'Block B, Inner Circle, Connaught Place',
      city: 'Delhi NCR'
    },
    {
      id: 'del-stn-2',
      name: 'Statiq Hub — Cyber Hub Gurugram Gate 2',
      lat: 28.4950,
      lng: 77.0880,
      charger_type: 'Ultra-Fast DC (120kW)',
      power_kw: 120,
      ports: 4,
      status: 'Operational',
      operator: 'Statiq',
      address: 'DLF Cyber City, Phase 2, Gurugram',
      city: 'Delhi NCR'
    },
    {
      id: 'del-stn-3',
      name: 'Tata Power — Aerocity Hospitality District',
      lat: 28.5520,
      lng: 77.1210,
      charger_type: 'Ultra-Fast DC (150kW)',
      power_kw: 150,
      ports: 6,
      status: 'Operational',
      operator: 'Tata Power EZ Charge',
      address: 'Asset Area 4, Aerocity, IGI Airport',
      city: 'Delhi NCR'
    },
    {
      id: 'del-stn-4',
      name: 'Kazam Hub — Noida Sector 62 Metro',
      lat: 28.6270,
      lng: 77.3620,
      charger_type: 'DC Fast (60kW)',
      power_kw: 60,
      ports: 4,
      status: 'Operational',
      operator: 'Kazam EV',
      address: 'Sector 62 Metro Station Parking, Noida',
      city: 'Delhi NCR'
    },
    {
      id: 'del-stn-5',
      name: 'Jio-bp pulse — South Extension Part 2',
      lat: 28.5680,
      lng: 77.2210,
      charger_type: 'DC Fast (60kW)',
      power_kw: 60,
      ports: 4,
      status: 'Operational',
      operator: 'Jio-bp pulse',
      address: 'Ring Road, South Extension Part 2',
      city: 'Delhi NCR'
    }
  ],

  demandZones: [
    {
      id: 'del-zone-cyberhub',
      name: 'DLF Cyber City & Golf Course Road Hub',
      lat: 28.4920,
      lng: 77.0900,
      polygon: [
        [28.5100, 77.0700],
        [28.5110, 77.1100],
        [28.4750, 77.1090],
        [28.4740, 77.0690]
      ],
      demand_index: 93,
      population_density: 15200,
      commercial_index: 97,
      ev_density_index: 93,
      category: 'High Commercial / Tech Corridor',
      initially_covered: false
    },
    {
      id: 'del-zone-noida62',
      name: 'Noida Sector 62 & Electronic City Expressway',
      lat: 28.6250,
      lng: 77.3650,
      polygon: [
        [28.6400, 77.3450],
        [28.6410, 77.3850],
        [28.6100, 77.3840],
        [28.6090, 77.3440]
      ],
      demand_index: 88,
      population_density: 16800,
      commercial_index: 91,
      ev_density_index: 87,
      category: 'High Commercial / Tech Corridor',
      initially_covered: false
    }
  ],

  candidateSites: [
    {
      id: 'del-cand-1',
      name: 'Cyber Hub Gurugram Highway Corridor',
      lat: 28.4960,
      lng: 77.0920,
      city: 'Delhi NCR',
      demand_score: 93,
      coverage_gap_score: 87,
      accessibility_score: 92,
      grid_fit_score: 84,
      utilization_score: 80,
      composite_score: 89,
      rank: 1,
      priority: 'HIGH',
      reasons: [
        'Major corporate and tech capital of NCR with over 150,000 corporate workforce',
        'Immediate access to NH-48 and Rapid Metro network',
        'DHBVN 33kV dedicated supply line available'
      ],
      estimated_coverage_lift: 12.8,
      estimated_utilization: 80.0,
      suggested_config: '6x 120kW Dual-Gun DC Fast',
      nearby_amenities: ['Cyber Hub Dining Walk', 'DLF Phase 2 Rapid Metro', 'NH-48 Service Road'],
      is_modeled: true
    },
    {
      id: 'del-cand-2',
      name: 'Noida Sector 62 Expressway Node',
      lat: 28.6290,
      lng: 77.3680,
      city: 'Delhi NCR',
      demand_score: 88,
      coverage_gap_score: 85,
      accessibility_score: 88,
      grid_fit_score: 86,
      utilization_score: 76,
      composite_score: 85,
      rank: 2,
      priority: 'HIGH',
      reasons: [
        'Extensive IT and educational park cluster',
        'Direct connection to Delhi-Meerut Expressway and Blue Line Metro',
        'Substantial parking space with high power availability'
      ],
      estimated_coverage_lift: 11.1,
      estimated_utilization: 76.0,
      suggested_config: '4x 120kW DC Fast',
      nearby_amenities: ['Sector 62 Metro Terminal', 'Fortis Hospital Noida', 'IT Complex'],
      is_modeled: true
    }
  ],

  gridSubstations: [
    { id: 'del-sub-1', name: 'Gurugram Sector 29 66/11kV Substation', lat: 28.4700, lng: 77.0650, capacity_mva: '60 MVA', headroom_mw: 3.8, voltage_kv: '66/11', status: 'Optimal' },
    { id: 'del-sub-2', name: 'Noida Sector 62 132/33kV Substation', lat: 28.6300, lng: 77.3600, capacity_mva: '80 MVA', headroom_mw: 4.6, voltage_kv: '132/33', status: 'Optimal' }
  ]
};
