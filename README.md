# ⚡ CHARGEOPT AI
### Intelligent EV Charging Station Placement & Infrastructure Planning

> **Theme:** Transportation & Logistics  
> **Problem:** Optimal Placement of EV Charging Stations  
> **Core Question:** *"Where should the next EV charging station be built, and why?"*

---

## 🚀 Overview

**ChargeOpt AI** is a geospatial decision-support platform designed for EV charging point operators (CPOs), state transport agencies, and urban planners. Instead of simply mapping existing charging stations, ChargeOpt AI evaluates population density, geospatial coverage voids, arterial road accessibility, grid substation headroom, and regional demand proxies to recommend, score, and simulate optimal new charging locations.

---

## 🌟 Key Features

1. **Deterministic MCLP-Inspired Optimization Engine**
   - Implements a demand-weighted greedy coverage scoring algorithm with spatial decay to eliminate charger clustering and fleet cannibalization.
   - Configurable planning objectives:
     - **Maximum Coverage:** Prioritizes unserved zones and maximizes geographic reach.
     - **Maximum Utilization:** Prioritizes dense corridors with high daily charging turnover.
     - **Balanced Optimization:** Harmonizes demand, coverage, road access, and grid stability.
     - **High Demand Intensity:** Targets peak EV traffic hubs.

2. **Benchmarked Datasets (Phase 2 Prototype Validated)**
   - **Bengaluru:** Anchored around the **Marathahalli Junction** benchmark (*Composite Score: 90/100, Demand Index: 94, Coverage Lift: +13.4%, Modeled Utilization: 81%*).
   - **Mumbai:** Anchored around the **Goregaon Link Road** benchmark (*Composite Score: 87/100, Demand Index: 92, Coverage Lift: +12.2%, Modeled Utilization: 77%*).
   - **Delhi NCR:** Cyber Hub Gurugram (*Score: 89/100, +12.8% lift*), Noida Sector 62.

3. **Interactive Dark-Mode Command Center (Leaflet.js + CartoDB)**
   - Multi-layer geospatial controls: Existing Fast Chargers, Demand Heatmaps, Coverage Void Perimeters, Candidate Rank Badges (#1, #2, #3), 2.5km Coverage Radii, and Substation Grid Capacities.

4. **Transparent Explainability ("Why This Site?")**
   - Mathematical factor decomposition into Demand, Coverage Gap, Road Accessibility, Substation Grid Fit, and Asset Utilization with plain-language rationale and suggested hardware specifications.

5. **"What-If?" Infrastructure Simulator & Comparison**
   - Dynamic station addition slider with live Before vs. After network telemetry (+% coverage lift, demand captured, daily sessions).
   - Multi-candidate side-by-side comparison matrix with automated winner allocations.

6. **AI Planning Assistant & Official Reporting**
   - Integrated Gemini 1.5 Assistant for operator summaries and tradeoff inquiries, backed by a 100% reliable offline deterministic fallback.
   - Printable PDF Planning Report generator and CSV dataset export.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Lucide Icons
- **Geospatial & Maps:** Leaflet.js, CartoDB Dark Matter, Custom Canvas/SVG layers
- **Optimization:** Deterministic Greedy Maximal Covering Location Problem (MCLP)
- **AI & Analytics:** Gemini API (with deterministic fallback engine)

---

## 📦 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- npm or yarn

### 2. Installation
```bash
git clone https://github.com/YOUR_USERNAME/chargeopt-ai.git
cd chargeopt-ai
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run preview
```

---

## 📋 Methodology & Data Sources

- **OpenStreetMap (OSM):** Road networks, arterial corridors, and transit hubs.
- **State DISCOMs / Grid Topology:** Substation capacities and feeder headroom estimates.
- **Regional EV Demographics:** Vehicle registration statistics and commercial fleet density curves.

*Disclaimer: All scoring, coverage gains, and utilization estimates are decision-support modeled estimates.*
