import { bengaluruData } from './bengaluru.js';
import { mumbaiData } from './mumbai.js';
import { delhiData } from './delhi.js';

export const CITIES_MAP = {
  bengaluru: bengaluruData,
  mumbai: mumbaiData,
  delhi: delhiData,
};

export const CITIES_LIST = [
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    tagline: 'Silicon Valley of India — High EV Fleet & Tech Corridor',
    benchmarkCandidate: 'Marathahalli Junction',
    benchmarkScore: 90,
    benchmarkLift: '+13.4%',
    stationsCount: bengaluruData.existingStations.length,
    candidatesCount: bengaluruData.candidateSites.length,
    isDemoPrimary: true,
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    tagline: 'Financial Capital — Dense Suburban & Commercial Arteries',
    benchmarkCandidate: 'Goregaon Link Road',
    benchmarkScore: 87,
    benchmarkLift: '+12.2%',
    stationsCount: mumbaiData.existingStations.length,
    candidatesCount: mumbaiData.candidateSites.length,
    isDemoPrimary: true,
  },
  {
    id: 'delhi',
    name: 'Delhi NCR',
    state: 'Delhi / Haryana / UP',
    tagline: 'National Capital Region — High Commuter Volume & Expressways',
    benchmarkCandidate: 'Cyber Hub Gurugram',
    benchmarkScore: 89,
    benchmarkLift: '+12.8%',
    stationsCount: delhiData.existingStations.length,
    candidatesCount: delhiData.candidateSites.length,
    isDemoPrimary: false,
  },
];

export function getCityData(cityId = 'bengaluru') {
  return CITIES_MAP[cityId] || CITIES_MAP['bengaluru'];
}
