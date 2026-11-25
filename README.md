# AETHER – AI City Intelligence Engine

Next-Generation Smart-City Threat Monitoring, IoT Sensor Simulation & AI Strategic Response Platform. Built for rapid civic decision-making, flood mitigation, traffic optimization, and disaster containment.

---

## Project Overview

**AETHER** is a smart-city command and intelligence center designed for municipal operators, civil protection forces, and urban planners. It continuously ingests simulated IoT sensor telemetry across urban domains—hydrological water levels, precipitation pluviometers, LiDAR traffic saturation, structural acoustic sensors, and hazardous event detectors—to dynamically evaluate city vulnerability, project crisis propagation, and formulate actionable AI response directives.

```
       ┌────────────────────────────────────────────────────────┐
       │                AETHER COMMAND KERNEL                   │
       └──────────────────────────┬─────────────────────────────┘
                                  │
         ┌────────────────────────┼────────────────────────┐
         ▼                        ▼                        ▼
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│   IoT SENSORS    │    │   GEO-SPATIAL    │    │  NEURAL AI CORE  │
│  24 Mesh Nodes   │───▶│   LEAFLET MAP    │◀───│  Deterministic   │
│ Floods/Traffic/  │    │ Multi-layer Heat │    │  Triage Engine   │
│ HazMat Telemetry │    │ Detours/Cordon   │    │  Directives      │
└──────────────────┘    └──────────────────┘    └──────────────────┘
         │                        │                        │
         └────────────────────────┼────────────────────────┘
                                  ▼
       ┌────────────────────────────────────────────────────────┐
       │               DYNAMIC SCENARIO SIMULATOR               │
       │   [Urban Flood] [Heavy Traffic] [Roadblock] [HazMat]   │
       └────────────────────────────────────────────────────────┘
```

The system provides complete operational visibility across 7 integrated modules:
1. **Overview Dashboard**: High-level KPIs, multi-vector risk charts, and fleet telemetry health.
2. **City Map**: Leaflet interactive geo-spatial map with CartoDB Dark Matter styling, dynamic radius circles, and detour routes.
3. **Incidents**: Real-time incident management, status lifecycles, filtering, and reporting modal.
4. **IoT Sensors**: Fleet telemetry grid with historical sparklines, threshold monitors, and deep-dive analytics.
5. **AI Intelligence**: Automated city risk scoring (0–100), sector impact analysis, radar breakdown, and one-click field directives.
6. **Simulation**: Dynamic scenario studio to simulate urban crises with speed multipliers and radio dispatch feeds.
7. **Reports**: Audit logging, incident resolution metrics, and client-side RFC-4180 CSV dataset export.

---

## Problem Statement

Modern metropolitan areas face cascading urban crises where one localized disruption rapidly compounds another:
- **Hydrological Inundation:** Heavy rainfall inundates stormwater canals, cresting embankments and flooding lowlands.
- **Arterial Gridlock:** Flooded or blocked roads push excess traffic onto secondary transit corridors, creating gridlock that hinders emergency services.
- **Sensor Blindness:** Traditional cities operate with fragmented sensor silos that lack unified risk aggregation.
- **Delayed Response:** Manual cross-agency triage wastes vital minutes during the golden hour of crisis mitigation.

Cities require an autonomous intelligence platform that correlates real-time IoT feeds, models cascading failures, and provides actionable recommendations before crises overwhelm civil infrastructure.

---

## Proposed Solution

AETHER provides a single unified command platform that:
1. **Aggregates Multi-Domain IoT Telemetry:** Continuously monitors hydrological, traffic, structural, and hazard sensors in real time.
2. **Calculates a Dynamic City Risk Score (0–100):** Uses a deterministic, multi-factor weighting algorithm to classify city risk from Low to Critical.
3. **Provides Interactive Geo-Spatial Visualization:** Maps all incidents, affected radii, smart detour corridors, evacuation cordons, and sensor nodes using Leaflet.
4. **Simulates Urban Crises:** Enables operators to simulate urban floods, heavy traffic, road blockages, and emergency events to stress-test response capabilities.
5. **Generates Automated AI Recommendations:** Formulates prioritized operational directives with one-click deployment workflows.
6. **Operates 100% Client-Side Without External API Keys:** Ensures reliable offline deployment for emergency centers with zero external dependencies.

---

## Features

### 1. Overview Dashboard
- **6 Real-Time KPI Cards:** Active Incidents, Flood Risk Zones, Traffic Congestion %, Road Blockages, Connected IoT Sensors, and City Risk Score (0–100).
- **Responsive Dynamic Charts (Recharts):**
  - City Multi-Vector Risk Trends (time-series area projections)
  - Incidents by Urban Vector (Flood, Traffic Congestion, Road Blockage, Emergency)
  - Severity Distribution Breakdown (Critical, High, Moderate, Low)
  - IoT Sensor Network Fleet Health indicator
- **Emergency Dispatch Ticker:** Synchronous radio dispatch feeds and telemetry logs updated in real-time.

### 2. Interactive City Map
- **Leaflet & CartoDB Dark Matter Engine:** Dark cyber styling with fluid panning, zooming, and zero tile artifacts.
- **Interactive Layers & Toggles:**
  - **Flood Zones:** Dynamic SVG radius circles representing flood water expansion.
  - **Traffic:** Color-coded saturation corridors.
  - **Road Blockages:** Infrastructure hazards with automated detour paths.
  - **Emergency Incidents:** Containment cordons and evacuation polygon perimeters.
  - **IoT Sensors:** Live interactive sensor pins with threshold indicators.
- **Slide-Up Telemetry Inspector:** Click any incident or sensor on the map to inspect real-time metrics, update incident statuses, or deploy protocols.

### 3. Incident Management Center
- **Tabular & Card View Layouts:** Switch seamlessly between a high-density operations table and rich metric cards.
- **Multi-Vector Filtering & Search:** Filter by category, severity (Critical to Low), status (Open, Investigating, Responding, Resolved), or search by keyword and location.
- **Live Status Control:** Transition incidents through Open ➔ Investigating ➔ Responding ➔ Resolved, accompanied by celebratory resolution feedback.
- **Report / Inject Incident Modal:** Allows operators to create and dispatch custom incidents into the live simulation.

### 4. IoT Sensor Monitoring Fleet
- **Simulated 24-Node Mesh:**
  1. *Water-Level Sensors (meters)* – Embankments, sluice gates, and tidal basins.
  2. *Rainfall Pluviometers (mm/h)* – Downtown rooftops, weather masts, and port stations.
  3. *Traffic Density Radars (% saturation)* – Viaduct ramps, bridges, and commercial avenues.
  4. *Road Blockage & Tilt Sentinels* – Acoustic tunnel strain, flyover clearance, and utility tilt.
  5. *Emergency Optical / Acoustic Pods* – Transformer thermal hotspots, VOC particulate AQI, and acoustic triangulation.
- **Dynamic Telemetry Stream:** Readings organically fluctuate with simulated urban physics and spike during active crisis scenarios.
- **Historical Sparklines & Modal:** Click any sensor to inspect a 10-cycle telemetry area chart and calibration specifications.

### 5. AI City Intelligence Engine
- **Prominent "Analyze City" Control:** Triggers multi-stage neural diagnostic synthesis.
- **Structured Analysis Output (Sections A through I):**
  - **A. City Risk Score:** Composite 0–100 risk index.
  - **B. Risk Classification:** Low, Moderate, High, or Critical.
  - **C. Situation Summary:** Executive briefing of compounding civic issues.
  - **D. Affected Areas:** Tagged districts and sectors requiring attention.
  - **E. Potential Impact:** Projected impacts on Traffic, Citizens, Infrastructure, and Emergency Response.
  - **F. Priority Actions:** Numbered operational field orders.
  - **G. Recommendations:** Prioritized response directives with one-click deployment.
  - **H. Risk Analysis:** Radar chart and mathematical weight breakdown.
  - **I. Incident-Specific Analysis:** Deep-dive triage and targeted remediation for individual incidents.

### 6. Dynamic Scenario Simulation Studio
- **4 Built-in Crisis Scenarios:** Urban Flood, Heavy Traffic, Road Blockage, and Emergency Event.
- **Simulation Controls:** Start, Pause, Resume, Reset, and Simulation speed multipliers (1x, 2x, 5x).
- **Phased Event Log:** Dynamic radio transmissions from patrol units and autonomous telemetry relays.

### 7. Executive Reports & CSV Export
- Complete audit trail of all recorded civic emergencies.
- 24-hour historical risk trajectory chart.
- Incident recovery throughput (Active vs. Resolved).
- **1-Click CSV Export:** Generates an official, comma-separated dataset download instantly in the browser following RFC-4180 standards.

---

## Technology Stack

| Layer | Technologies |
|---|---|
| **Core Framework** | React 18, TypeScript 5, Vite 6 |
| **Styling & Theme** | Tailwind CSS, Futuristic Glassmorphism, Cyber Dark Navy Theme |
| **Icons & Visuals** | Lucide React |
| **Data Visualizations** | Recharts (Area, Bar, Pie, Line, Radar charts) |
| **Spatial Mapping** | Leaflet 1.9, CartoDB Dark Matter tiles, Custom HTML DivIcons |
| **State & Physics** | React Context + Custom Reducer Engine, Local Simulated Physics Loop |
| **Testing Suite** | Vitest 3.0, TypeScript typecheck |
| **Celebratory Feedback** | Canvas Confetti, Web Audio API synthesis |

---

## System Architecture

```
[ User Interaction / Command Center UI ]
                     │
     ┌───────────────┼───────────────┐
     ▼               ▼               ▼
[ TopBar & Nav ] [ Pages (7) ] [ Modals & Alerts ]
     │               │               │
     └───────────────┬───────────────┘
                     │
        [ useCity() State Hook ]
                     │
         [ CityContext Provider ]
                     │
      ┌──────────────┴──────────────┐
      │                             │
[ Live Data Store ]        [ Simulation Kernel ]
- Incidents Registry       - Clock & Ticks (T+N)
- 24 IoT Sensor Nodes      - Speed Multiplier (1x/2x/5x)
- Alert Feeds (Unread)     - Scenario Physics Drivers:
- AI Intelligence Cache      • Urban Flood: Rising H2O & Pluviometers
- Map Layer Visibilities     • Heavy Traffic: Saturation Escalation
- City Risk Scoring          • Road Blockage: Strain & Detours
                             • Emergency Event: Thermal & Evacuation
```

---

## IoT Simulation Explanation

AETHER includes a realistic mathematical simulation engine that emulates physical IoT hardware:
- **Telemetry Loop:** Every 2 seconds (divided by the speed multiplier: 1x, 2x, 5x), sensors fluctuate organically within realistic Gaussian noise parameters.
- **Threshold Tripping:** Each sensor defines a `warningThreshold` and a `criticalThreshold`. When a reading exceeds the warning threshold, its status flips from `Online` to `Warning`, triggering UI alerts and incrementing city risk.
- **Scenario Coupling:** When a crisis scenario is active, relevant sensor types experience compounding scalar trends:
  - *Urban Flood:* Water-level sensors increase by +0.12m per cycle; rainfall pluviometers increase by +3.5 mm/h.
  - *Heavy Traffic:* Traffic density radars surge by +4.5% saturation per cycle.
  - *Road Blockage:* Structural strain and tilt sensors spike toward critical limits.
  - *Emergency Event:* Thermal and acoustic sensors surge, simulating fire and structural anomalies.
- **Zero API Keys Required:** All physics, sensor dynamics, and map rendering run entirely locally in the browser with zero cloud costs or API keys.

---

## AI Analysis Explanation

The AI City Intelligence Engine computes composite threat scores using a deterministic weighted matrix:

$$\text{City Risk Score} = 30 + (\text{Active Incident Weight}) + (\text{Sensor Warning Penalties}) + (\text{Scenario Strain})$$

### Risk Classification Thresholds
- **Critical (Score 80–100):** Red ambient alert. Imminent multi-sector collapse.
- **High (Score 60–79):** Amber alert. Significant arterial disruptions and severe weather.
- **Moderate (Score 40–59):** Yellow alert. Localized containment required.
- **Low (Score 0–39):** Cyan nominal baseline. Standard municipal equilibrium.

### Factor Breakdown & Weights
- **Hydrological & Flood Severity (35% weight):** Canal levels, pluviometer rates, and tidal crests.
- **Mobility & Arterial Gridlock (25% weight):** Traffic saturation, bottleneck congestion, and road blockages.
- **Critical Infrastructure & Fire Hazard (25% weight):** Thermal hotspots, structural acoustic anomalies, and VOC drift.
- **IoT Sensor Fleet Reliability (15% weight):** Offline sensor penalties and battery health.

---

## Simulation Scenarios

AETHER provides 4 distinct urban crisis scenarios:

1. **Urban Flood**
   - *Focus:* Water Level Sensors & Canal Embankments.
   - *Impact:* Simulates torrential rainfall (60+ mm/h), storm surge in coastal canals, rising retention basins, and road inundation.
   - *Expected Peak Risk:* ~88/100.

2. **Heavy Traffic**
   - *Focus:* Traffic Radar Nodes & Arterial Signal Timing.
   - *Impact:* Simulates evening rush hour amplified by multi-vehicle collisions on key bridge & viaduct bottlenecks.
   - *Expected Peak Risk:* ~79/100.

3. **Road Blockage**
   - *Focus:* Acoustic Strain Sensors & Smart Detours.
   - *Impact:* Simulates sudden tunnel debris spalling and underground water main rupture leading to major road closures.
   - *Expected Peak Risk:* ~74/100.

4. **Emergency Event**
   - *Focus:* Thermal Sensors, Air Quality & Response Units.
   - *Impact:* Simulates critical electrical grid failure, chemical air pollution plume, and multi-agency emergency cordon.
   - *Expected Peak Risk:* ~95/100.

---

## Setup Instructions

Follow these instructions to run the project locally on your machine:

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher

---

## Installation Commands

Clone the repository and install all dependencies:

```bash
# Clone the repository
git clone https://github.com/akkideveloper-lab/AETHER-AI-City-Intelligence.git

# Navigate into project directory
cd AETHER-AI-City-Intelligence

# Install dependencies
npm install
```

---

## Run Commands

### Development Server
Start the local development server with hot-module replacement:

```bash
npm run dev
```

The application will be live at:
```
http://localhost:3000
```
*(or port 5173 if port 3000 is occupied)*

### Run Automated Tests
Execute the full Vitest automated test suite:

```bash
npm test
```

### Production Build
Compile TypeScript and bundle optimized production assets:

```bash
npm run build
```

### Production Preview
Locally preview the production build:

```bash
npm run preview
```

---

## Demo Flow

For evaluators and judges reviewing AETHER, follow this 3-minute walkthrough:

1. **Overview Dashboard (`/overview`):**
   - View live ticking clock, 6 KPI cards, and dynamic risk projection charts.
   - Observe live radio dispatch ticker.

2. **City Map (`/map`):**
   - Inspect dark CartoDB Leaflet map.
   - Toggle layers: `Flood Zones`, `Traffic`, `Road Blockages`, `Emergency Incidents`, and `IoT Sensors`.
   - Click on any incident circle to view detour paths and affected radius.

3. **Simulation Studio (`/simulation`):**
   - Open **Scenario selector** and choose **Urban Flood**.
   - Click **Start** and select **2x** simulation speed.
   - Watch the cycle timer increment, water sensor values increase, and radio logs update in real time.
   - Click **Pause**, **Resume**, or **Reset**.

4. **AI Intelligence Engine (`/ai`):**
   - Click **Analyze City** to trigger the neural diagnostic sequence.
   - Review sections A through I: Risk Score, Classification, Situation Summary, Affected Areas, Impact, Priority Actions, Recommendations, Risk Analysis, and Incident-Specific Analysis.
   - Click **Deploy Protocol** on any recommendation.

5. **Incident Management (`/incidents`):**
   - Filter incidents by severity and status.
   - Change an incident status to **Resolved** to trigger celebratory confetti feedback.
   - Click **Report Incident** to inject a custom civic issue.

6. **Reports & Analytics (`/reports`):**
   - Review historical 24h risk trend charts.
   - Click **Export CSV Dataset** to download the clean RFC-4180 incident report.

---

## Future Scope

- **Hardware Edge Ingestion:** Native MQTT broker integration to connect real ESP32, Raspberry Pi, and LoRaWAN gateways.
- **Satellite & Drone Computer Vision:** Webhook ingestion of drone video feeds for automated pothole, debris, and smoke detection.
- **Citizen Mobile PWA:** Real-time push notification system allowing residents to receive localized detour and flood alerts.
- **Predictive Hydrodynamic ML:** Machine learning inference models to forecast flood inundation 6 hours in advance based on rainfall gradients.

---

## Screenshots

The application features a modern futuristic cyber-command aesthetic with glassmorphic panels, animated radar charts, dynamic map overlays, and telemetry monitors:

- **Overview Dashboard:** Multi-vector charts, fleet health, and active incident metrics.
- **Interactive City Map:** Leaflet dark tiles, flood radius circles, arterial detours, and IoT pins.
- **AI Intelligence Suite:** Neural scanning sequence, 0–100 risk scoring, and one-click field orders.
- **Scenario Simulation Studio:** Crisis physics controls, speed multipliers, and radio dispatches.
- **Fleet Telemetry Monitor:** 24-sensor LPWAN mesh with historical sparklines.
- **Reports & Export:** RFC-4180 CSV export and executive audit logging.

---

## License & Hackathon Attribution

Developed for the Smart City Hackathon 2026. Open-source under the MIT License.
