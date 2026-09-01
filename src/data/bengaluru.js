/**
 * Bengaluru EV Geospatial Planning Dataset
 * Anchored around Marathahalli Junction (Phase 2 benchmark)
 */

export const bengaluruData = {
  id: 'bengaluru',
  name: 'Bengaluru',
  state: 'Karnataka',
  center: [12.9716, 77.5946],
  zoom: 12,
  bounds: [
    [12.8200, 77.4500],
    [13.1200, 77.7800]
  ],
  baselineCoverage: 68.0,
  baselineDemandServed: 64.5,
  baselineAvgUtilization: 62.0,
  totalFleetEst: 145000,
  existingStationsCount: 18,

  existingStations: [
    {
      id: 'blr-stn-1',
      name: 'Tata Power — Indiranagar 100ft Rd',
      lat: 12.9784,
      lng: 77.6408,
      charger_type: 'DC Fast (CCS2 60kW)',
      power_kw: 60,
      ports: 4,
      status: 'Operational',
      operator: 'Tata Power EZ Charge',
      address: '100 Feet Rd, HAL 2nd Stage, Indiranagar',
      city: 'Bengaluru'
    },
    {
      id: 'blr-stn-2',
      name: 'Ather Space — Koramangala 80ft Rd',
      lat: 12.9352,
      lng: 77.6245,
      charger_type: 'DC Fast (50kW Dual)',
      power_kw: 50,
      ports: 3,
      status: 'Operational',
      operator: 'Ather Grid',
      address: '80 Feet Rd, 4th Block, Koramangala',
      city: 'Bengaluru'
    },
    {
      id: 'blr-stn-3',
      name: 'Shell Recharge — Whitefield Main Rd',
      lat: 12.9698,
      lng: 77.7499,
      charger_type: 'Ultra-Fast DC (120kW)',
      power_kw: 120,
      ports: 4,
      status: 'Operational',
      operator: 'Shell Recharge',
      address: 'ITPL Main Road, Whitefield',
      city: 'Bengaluru'
    },
    {
      id: 'blr-stn-4',
      name: 'BESCOM Fast Charger — HSR Layout BDA',
      lat: 12.9116,
      lng: 77.6389,
      charger_type: 'DC Fast (50kW Dual Gun)',
      power_kw: 50,
      ports: 2,
      status: 'Operational',
      operator: 'BESCOM EV',
      address: 'BDA Complex, Sector 6, HSR Layout',
      city: 'Bengaluru'
    },
    {
      id: 'blr-stn-5',
      name: 'Jio-bp pulse — Hebbal Flyover North',
      lat: 13.0358,
      lng: 77.5970,
      charger_type: 'DC Fast (60kW CCS2)',
      power_kw: 60,
      ports: 4,
      status: 'Operational',
      operator: 'Jio-bp pulse',
      address: 'Bellary Road, Near Esteem Mall, Hebbal',
      city: 'Bengaluru'
    },
    {
      id: 'blr-stn-6',
      name: 'Zeon Charging — Electronic City Phase 1',
      lat: 12.8452,
      lng: 77.6602,
      charger_type: 'DC Fast (50kW)',
      power_kw: 50,
      ports: 2,
      status: 'Operational',
      operator: 'Zeon Charging',
      address: 'Velankani Tech Park, E-City Phase 1',
      city: 'Bengaluru'
    },
    {
      id: 'blr-stn-7',
      name: 'Statiq Hub — MG Road Metro Station',
      lat: 12.9756,
      lng: 77.6066,
      charger_type: 'Dual Gun DC (60kW)',
      power_kw: 60,
      ports: 4,
      status: 'Operational',
      operator: 'Statiq',
      address: 'MG Road Metro Parking, Central CBD',
      city: 'Bengaluru'
    },
    {
      id: 'blr-stn-8',
      name: 'Tata Power — Jayanagar 4th Block',
      lat: 12.9299,
      lng: 77.5824,
      charger_type: 'DC Fast (30kW)',
      power_kw: 30,
      ports: 2,
      status: 'Operational',
      operator: 'Tata Power EZ Charge',
      address: '11th Main Road, 4th Block, Jayanagar',
      city: 'Bengaluru'
    },
    {
      id: 'blr-stn-9',
      name: 'Kazam Hub — JP Nagar 24th Main',
      lat: 12.9063,
      lng: 77.5855,
      charger_type: 'AC Type 2 (22kW) + DC (30kW)',
      power_kw: 52,
      ports: 4,
      status: 'Operational',
      operator: 'Kazam EV',
      address: '24th Main Road, JP Nagar 5th Phase',
      city: 'Bengaluru'
    },
    {
      id: 'blr-stn-10',
      name: 'Ather Grid — Malleshwaram 8th Cross',
      lat: 13.0031,
      lng: 77.5702,
      charger_type: 'Fast AC/DC (25kW)',
      power_kw: 25,
      ports: 2,
      status: 'Operational',
      operator: 'Ather Grid',
      address: 'Margosa Road, Malleshwaram',
      city: 'Bengaluru'
    },
    {
      id: 'blr-stn-11',
      name: 'Jio-bp pulse — Manyata Tech Park Gate 1',
      lat: 13.0489,
      lng: 77.6215,
      charger_type: 'Ultra-Fast DC (120kW)',
      power_kw: 120,
      ports: 4,
      status: 'Operational',
      operator: 'Jio-bp pulse',
      address: 'Outer Ring Road, Nagavara',
      city: 'Bengaluru'
    },
    {
      id: 'blr-stn-12',
      name: 'Tata Power — Peenya 1st Stage',
      lat: 13.0285,
      lng: 77.5185,
      charger_type: 'DC Fast (50kW)',
      power_kw: 50,
      ports: 2,
      status: 'Operational',
      operator: 'Tata Power EZ Charge',
      address: 'Peenya Industrial Area, Stage 1',
      city: 'Bengaluru'
    }
  ],

  demandZones: [
    {
      id: 'blr-zone-marathahalli',
      name: 'Marathahalli — ORR Tech Corridor',
      lat: 12.9560,
      lng: 77.7010,
      polygon: [
        [12.9680, 77.6850],
        [12.9690, 77.7180],
        [12.9430, 77.7170],
        [12.9420, 77.6840]
      ],
      demand_index: 94,
      population_density: 16800,
      commercial_index: 96,
      ev_density_index: 92,
      category: 'High Commercial / Tech Corridor',
      initially_covered: false
    },
    {
      id: 'blr-zone-bellandur',
      name: 'Bellandur — Outer Ring Road Tech Hub',
      lat: 12.9260,
      lng: 77.6760,
      polygon: [
        [12.9400, 77.6620],
        [12.9390, 77.6920],
        [12.9130, 77.6910],
        [12.9140, 77.6610]
      ],
      demand_index: 92,
      population_density: 15400,
      commercial_index: 95,
      ev_density_index: 91,
      category: 'High Commercial / Tech Corridor',
      initially_covered: false
    },
    {
      id: 'blr-zone-whitefield',
      name: 'Whitefield — ITPL & Hope Farm Hub',
      lat: 12.9750,
      lng: 77.7500,
      polygon: [
        [12.9900, 77.7300],
        [12.9910, 77.7700],
        [12.9600, 77.7690],
        [12.9590, 77.7290]
      ],
      demand_index: 88,
      population_density: 13200,
      commercial_index: 91,
      ev_density_index: 87,
      category: 'High Commercial / Tech Corridor',
      initially_covered: true
    },
    {
      id: 'blr-zone-ecity',
      name: 'Electronic City — Phase 1 & 2',
      lat: 12.8420,
      lng: 77.6650,
      polygon: [
        [12.8580, 77.6450],
        [12.8590, 77.6850],
        [12.8250, 77.6840],
        [12.8240, 77.6440]
      ],
      demand_index: 86,
      population_density: 11800,
      commercial_index: 88,
      ev_density_index: 84,
      category: 'High Commercial / Tech Corridor',
      initially_covered: true
    },
    {
      id: 'blr-zone-hebbal',
      name: 'Hebbal — Manyata & Airport Gateway',
      lat: 13.0400,
      lng: 77.6050,
      polygon: [
        [13.0580, 77.5850],
        [13.0590, 77.6250],
        [13.0220, 77.6240],
        [13.0210, 77.5840]
      ],
      demand_index: 85,
      population_density: 14500,
      commercial_index: 89,
      ev_density_index: 82,
      category: 'Transit Hub',
      initially_covered: true
    },
    {
      id: 'blr-zone-hsr',
      name: 'HSR Layout — Startup Hub & Residential',
      lat: 12.9120,
      lng: 77.6420,
      polygon: [
        [12.9250, 77.6280],
        [12.9260, 77.6580],
        [12.8980, 77.6570],
        [12.8970, 77.6270]
      ],
      demand_index: 83,
      population_density: 17200,
      commercial_index: 82,
      ev_density_index: 86,
      category: 'Dense Residential',
      initially_covered: true
    },
    {
      id: 'blr-zone-indiranagar',
      name: 'Indiranagar — CBD East & Commercial',
      lat: 12.9750,
      lng: 77.6410,
      polygon: [
        [12.9880, 77.6260],
        [12.9890, 77.6560],
        [12.9620, 77.6550],
        [12.9610, 77.6250]
      ],
      demand_index: 81,
      population_density: 18100,
      commercial_index: 86,
      ev_density_index: 80,
      category: 'High Commercial / Tech Corridor',
      initially_covered: true
    },
    {
      id: 'blr-zone-peenya',
      name: 'Peenya Industrial Estate & Logistics',
      lat: 13.0300,
      lng: 77.5150,
      polygon: [
        [13.0480, 77.4950],
        [13.0490, 77.5350],
        [13.0120, 77.5340],
        [13.0110, 77.4940]
      ],
      demand_index: 78,
      population_density: 9800,
      commercial_index: 84,
      ev_density_index: 75,
      category: 'Highway Interchange',
      initially_covered: true
    },
    {
      id: 'blr-zone-krpuram',
      name: 'KR Puram — Railway Hub & Bypass',
      lat: 13.0030,
      lng: 77.7000,
      polygon: [
        [13.0180, 77.6820],
        [13.0190, 77.7180],
        [12.9880, 77.7170],
        [12.9870, 77.6810]
      ],
      demand_index: 74,
      population_density: 15600,
      commercial_index: 72,
      ev_density_index: 71,
      category: 'Transit Hub',
      initially_covered: false
    }
  ],

  candidateSites: [
    {
      id: 'blr-cand-1',
      name: 'Marathahalli Junction (ORR Bypass)',
      lat: 12.9562,
      lng: 77.7011,
      city: 'Bengaluru',
      demand_score: 94,
      coverage_gap_score: 89,
      accessibility_score: 91,
      grid_fit_score: 86,
      utilization_score: 81,
      composite_score: 90,
      rank: 1,
      priority: 'HIGH',
      reasons: [
        'High modeled charging demand along the Outer Ring Road (ORR) high-traffic tech corridor',
        'Significant coverage gap (4.2km from nearest high-speed 120kW+ fast charger)',
        'Superior road accessibility at intersection of ORR and Old Airport Road',
        'Robust 11kV feeder proximity with 1.8MW available transformer headroom'
      ],
      estimated_coverage_lift: 13.4,
      estimated_utilization: 81.0,
      suggested_config: '6x 120kW Dual-Gun DC Fast + 2x 22kW AC Backup',
      nearby_amenities: ['ORR Tech Corridor Hub', 'Marathahalli Bridge Transit Stop', 'Multiplex & Food Court Complex'],
      is_modeled: true
    },
    {
      id: 'blr-cand-2',
      name: 'Bellandur Ecospace Outer Ring Road',
      lat: 12.9265,
      lng: 77.6762,
      city: 'Bengaluru',
      demand_score: 92,
      coverage_gap_score: 85,
      accessibility_score: 90,
      grid_fit_score: 84,
      utilization_score: 79,
      composite_score: 87,
      rank: 2,
      priority: 'HIGH',
      reasons: [
        'Dense commercial IT park cluster with over 65,000 tech workforce and high private EV adoption',
        'Substantial 3.8km gap to dedicated public ultra-fast hubs',
        'Direct multi-lane arterial road access with dedicated slip road parking space'
      ],
      estimated_coverage_lift: 11.8,
      estimated_utilization: 79.0,
      suggested_config: '4x 120kW Dual-Gun DC Fast + 4x 22kW AC Type 2',
      nearby_amenities: ['RGA / Ecospace Tech Parks', 'Sarjapur Junction Slip Rd', 'Retail Hypermarket'],
      is_modeled: true
    },
    {
      id: 'blr-cand-3',
      name: 'Whitefield Hope Farm Junction',
      lat: 12.9835,
      lng: 77.7520,
      city: 'Bengaluru',
      demand_score: 88,
      coverage_gap_score: 86,
      accessibility_score: 85,
      grid_fit_score: 80,
      utilization_score: 76,
      composite_score: 84,
      rank: 3,
      priority: 'HIGH',
      reasons: [
        'Critical commuter transit node connecting Kadugodi Metro Terminal and ITPL',
        'High weekend fleet and intercity EV travel towards Hoskote corridor',
        'Moderate grid substation headroom at Kadugodi 66kV substation'
      ],
      estimated_coverage_lift: 10.2,
      estimated_utilization: 76.0,
      suggested_config: '4x 60kW DC Fast + 2x 22kW AC',
      nearby_amenities: ['Kadugodi Metro Interchange', 'ITPL East Gate', 'Commercial Shopping Hub'],
      is_modeled: true
    },
    {
      id: 'blr-cand-4',
      name: 'Electronic City Toll Plaza Hub',
      lat: 12.8398,
      lng: 77.6720,
      city: 'Bengaluru',
      demand_score: 86,
      coverage_gap_score: 83,
      accessibility_score: 88,
      grid_fit_score: 82,
      utilization_score: 74,
      composite_score: 82,
      rank: 4,
      priority: 'HIGH',
      reasons: [
        'High commercial EV fleet density (EV cabs and delivery vans operating in E-City)',
        'Elevated highway exit ramp provides direct access for northbound commuters',
        'Reliable industrial power line feeder available'
      ],
      estimated_coverage_lift: 9.5,
      estimated_utilization: 74.0,
      suggested_config: '4x 120kW DC Fast Hub',
      nearby_amenities: ['Hosur Road Highway Ramp', 'Phase 2 Industrial Gate', 'Fuel Station Complex'],
      is_modeled: true
    },
    {
      id: 'blr-cand-5',
      name: 'Hebbal Esteem Mall / Flyover Underpass',
      lat: 13.0365,
      lng: 77.5935,
      city: 'Bengaluru',
      demand_score: 85,
      coverage_gap_score: 79,
      accessibility_score: 92,
      grid_fit_score: 78,
      utilization_score: 73,
      composite_score: 80,
      rank: 5,
      priority: 'MEDIUM',
      reasons: [
        'Gateway bottleneck for North Bengaluru and Kempegowda International Airport traffic',
        'High visibility and smooth turn-in lanes from Bellary Road',
        'Serves high throughput airport taxi fleets'
      ],
      estimated_coverage_lift: 8.9,
      estimated_utilization: 73.0,
      suggested_config: '4x 60kW DC Fast + 2x 150kW Ultra-Fast',
      nearby_amenities: ['Airport Expressway Entry', 'Esteem Mall Plaza', 'Manyata North Access'],
      is_modeled: true
    },
    {
      id: 'blr-cand-6',
      name: 'HSR Layout 27th Main Commercial Spine',
      lat: 12.9102,
      lng: 77.6515,
      city: 'Bengaluru',
      demand_score: 83,
      coverage_gap_score: 75,
      accessibility_score: 86,
      grid_fit_score: 85,
      utilization_score: 72,
      composite_score: 78,
      rank: 6,
      priority: 'MEDIUM',
      reasons: [
        'Vibrant startup hub with dense 2-wheeler and 4-wheeler EV ownership',
        'Solid local grid reliability with BESCOM underground cabling network',
        'High dwell-time retail and dining environment'
      ],
      estimated_coverage_lift: 7.8,
      estimated_utilization: 72.0,
      suggested_config: '3x 60kW DC + 4x 11kW AC Destination Chargers',
      nearby_amenities: ['27th Main High Street', 'HSR Club', 'Startup Coworking Hubs'],
      is_modeled: true
    },
    {
      id: 'blr-cand-7',
      name: 'Peenya Metro & Industrial Depot',
      lat: 13.0325,
      lng: 77.5210,
      city: 'Bengaluru',
      demand_score: 78,
      coverage_gap_score: 82,
      accessibility_score: 80,
      grid_fit_score: 88,
      utilization_score: 67,
      composite_score: 74,
      rank: 7,
      priority: 'MEDIUM',
      reasons: [
        'Heavy industrial logistics park with growing commercial EV delivery fleet',
        'Excellent high-voltage grid infrastructure with high transformer headroom',
        'Immediate proximity to Tumkur Road highway exit'
      ],
      estimated_coverage_lift: 7.2,
      estimated_utilization: 67.0,
      suggested_config: '4x 60kW DC Commercial Dual Gun',
      nearby_amenities: ['Peenya Metro Station', 'Industrial Logistics Depot', 'Tumkur Highway Tollway'],
      is_modeled: true
    },
    {
      id: 'blr-cand-8',
      name: 'KR Puram Multi-Modal Transit Hub',
      lat: 13.0045,
      lng: 77.6910,
      city: 'Bengaluru',
      demand_score: 74,
      coverage_gap_score: 76,
      accessibility_score: 82,
      grid_fit_score: 74,
      utilization_score: 63,
      composite_score: 70,
      rank: 8,
      priority: 'MODERATE',
      reasons: [
        'Interchange connecting metro, suburban rail, and Old Madras Road highway',
        'High intercity transit volume towards Kolar / Chennai highway',
        'Challenging road congestion during peak hours'
      ],
      estimated_coverage_lift: 6.1,
      estimated_utilization: 63.0,
      suggested_config: '3x 60kW DC Fast',
      nearby_amenities: ['KR Puram Railway Station', 'Purple Line Metro Interchange', 'Tin Factory Junction'],
      is_modeled: true
    }
  ],

  gridSubstations: [
    { id: 'blr-sub-1', name: 'HAL 66/11kV Substation', lat: 12.9550, lng: 77.6800, capacity_mva: '40 MVA', headroom_mw: 2.8, voltage_kv: '66/11', status: 'Optimal' },
    { id: 'blr-sub-2', name: 'Kadugodi 220/66kV Substation', lat: 12.9890, lng: 77.7610, capacity_mva: '100 MVA', headroom_mw: 4.5, voltage_kv: '220/66', status: 'Optimal' },
    { id: 'blr-sub-3', name: 'HSR 66/11kV Substation', lat: 12.9150, lng: 77.6350, capacity_mva: '30 MVA', headroom_mw: 1.6, voltage_kv: '66/11', status: 'Adequate' },
    { id: 'blr-sub-4', name: 'Nagavara 66/11kV Substation', lat: 13.0420, lng: 77.6180, capacity_mva: '50 MVA', headroom_mw: 3.2, voltage_kv: '66/11', status: 'Optimal' },
    { id: 'blr-sub-5', name: 'Peenya 220/66kV Substation', lat: 13.0300, lng: 77.5100, capacity_mva: '120 MVA', headroom_mw: 6.0, voltage_kv: '220/66', status: 'Optimal' }
  ]
};
