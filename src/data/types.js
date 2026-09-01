export const OBJECTIVES = {
  max_coverage: {
    id: 'max_coverage',
    name: 'Maximum Coverage',
    description: 'Prioritizes unserved zones and maximizes the geographic reach of chargers.',
    shortDesc: 'Expand coverage to underserved areas',
    weights: { demand: 0.30, coverageGap: 0.40, accessibility: 0.15, gridFit: 0.10, utilization: 0.05 },
    color: 'emerald'
  },
  max_utilization: {
    id: 'max_utilization',
    name: 'Maximum Utilization',
    description: 'Prioritizes high-density zones with maximum expected daily charging sessions and fleet revenue.',
    shortDesc: 'Maximize charger usage & ROI',
    weights: { demand: 0.40, coverageGap: 0.05, accessibility: 0.10, gridFit: 0.10, utilization: 0.35 },
    color: 'cyan'
  },
  balanced: {
    id: 'balanced',
    name: 'Balanced Optimization',
    description: 'Evenly balances coverage expansion, commercial demand, grid stability, and accessibility.',
    shortDesc: 'Optimal multi-factor balance',
    weights: { demand: 0.25, coverageGap: 0.25, accessibility: 0.20, gridFit: 0.15, utilization: 0.15 },
    color: 'amber'
  },
  high_demand: {
    id: 'high_demand',
    name: 'High Demand Intensity',
    description: 'Focuses strictly on areas with the highest concentrated EV fleet and traffic proxies.',
    shortDesc: 'Target highest traffic corridors',
    weights: { demand: 0.55, coverageGap: 0.10, accessibility: 0.15, gridFit: 0.05, utilization: 0.15 },
    color: 'rose'
  }
};
