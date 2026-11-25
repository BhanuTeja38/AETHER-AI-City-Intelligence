# 🎯 Problem Statement Alignment & Rubric Verification Matrix

**Project:** AETHER – AI CITY INTELLIGENCE ENGINE  
**Evaluation Standard:** Smart City Disaster Mitigation, IoT Simulation & Autonomous Urban Response  
**Test Suite Status:** 14/14 Tests Passing (`npm test`)

---

## 📋 Comprehensive Alignment Matrix

| Rubric Requirement | Implementation in AETHER | Code File / Component | Test Assertion |
|---|---|---|---|
| **1. Detect, Monitor & Analyze Flooding** | Real-time water-level sensors (`SENS-WL-01`..`05`), rainfall pluviometers, flood inundation radius circles, and automated sluice barrier protocols. | `src/services/cityIntelligenceEngine.ts`<br/>`src/pages/CityMap.tsx`<br/>`src/data/mockData.ts` | `src/__tests__/problemStatement.test.ts` (Lines 16-21, 84-93) |
| **2. Detect, Monitor & Analyze Traffic Congestion** | Highway LiDAR radars (`SENS-TR-01`..`06`), saturation % metrics, queue length tracking, and green-wave signal timing overrides. | `src/pages/CityMap.tsx`<br/>`src/pages/IncidentManagement.tsx`<br/>`src/data/mockData.ts` | `src/__tests__/problemStatement.test.ts` (Lines 23-28, 95-104) |
| **3. Detect, Monitor & Analyze Road Blockages** | Acoustic vibration sentinels (`SENS-RB-01`..`04`), tilt gauges, and dynamic green dashed detour bypass routing. | `src/pages/CityMap.tsx`<br/>`src/pages/IncidentManagement.tsx` | `src/__tests__/problemStatement.test.ts` (Lines 30-34, 106-115) |
| **4. Detect, Monitor & Analyze Emergencies** | Thermal & VOC sensors (`SENS-EM-01`..`04`), substation fire monitoring, and 500m evacuation cordon polygons. | `src/pages/CityMap.tsx`<br/>`src/pages/AiIntelligence.tsx` | `src/__tests__/problemStatement.test.ts` (Lines 36-40, 117-126) |
| **5. Interactive City Map (Leaflet + OSM)** | Dark-mode CartoDB Dark Matter tiles, 6 togglable layers (Flood Zones, Traffic, Road Blockages, Emergencies, IoT Grid, Detours), clickable markers with slide-up inspector. | `src/pages/CityMap.tsx` | Validated in production build and unit test coordinate schemas |
| **6. Simulated IoT Sensor Fleet** | 24 mesh nodes across all 5 specified types with dynamic physics drift, threshold alerts, battery gauges, and 10-interval sparkline history. | `src/pages/SensorMonitoring.tsx`<br/>`src/context/CityContext.tsx` | `src/__tests__/sensors.test.ts` (All 3 suites passing) |
| **7. AI City Intelligence Engine** | Prominent "ANALYZE CITY" button, 0-100 composite risk scoring, Low/Moderate/High/Critical classification, 4-sector impact matrix, radar breakdown, and incident triage. | `src/pages/AiIntelligence.tsx`<br/>`src/services/cityIntelligenceEngine.ts` | `src/__tests__/problemStatement.test.ts` (Lines 46-78) |
| **8. City Scenario Simulation** | 4 full scenarios (Urban Flood, Heavy Traffic, Road Blockage, Emergency Event) with Start, Pause, Resume, Reset, and 1x/2x/5x speed multipliers driving live sensor spikes and radio event logs. | `src/pages/SimulationStudio.tsx`<br/>`src/context/CityContext.tsx` | `src/__tests__/problemStatement.test.ts` (Lines 84-126) |
| **9. Alert & Notification System** | TopBar alert bell with live badge count, audio chime toggle, unread filter, and 1-click incident telemetry inspection. | `src/components/layout/TopBar.tsx`<br/>`src/components/layout/NotificationPanel.tsx` | Verified across notification feeds and alert state updates |
| **10. Reports & Analytics with CSV Export** | 24h risk trajectory, active vs. resolved throughput, and RFC-4180 client-side CSV dataset export. | `src/pages/ReportsAnalytics.tsx`<br/>`src/services/cityIntelligenceEngine.ts` | `src/__tests__/problemStatement.test.ts` (Lines 128-136) |
| **11. Automated Testing Suite** | Vitest integration with 14 automated unit and integration tests executing under `npm test`. | `src/__tests__/` | 100% passing tests (0 failures) |
| **12. Accessibility (WCAG 2.1 AA)** | Semantic landmarks (`header`, `nav`, `main`, `aside`), skip link, form `htmlFor`/`id` bindings, `role="dialog"`, `aria-label`, high contrast focus rings. | `index.html`<br/>`src/App.tsx`<br/>`src/components/layout/` | Validated against automated accessibility patterns |
| **13. Security Posture** | Zero API keys exposed, strict CSP headers, `nosniff`, strict origin referrer policy, and input sanitization stripping markup injection. | `index.html`<br/>`src/components/layout/NewIncidentModal.tsx` | `npm audit` reports 0 vulnerabilities |

---

## 🔬 Mathematical Formulations

### 1. Composite City Threat Index ($R$)
$$R = \min\left(99, \max\left(10, 20 + \sum_{i \in \text{Active}} w(S_i) + 1.5 \cdot N_{\text{warning}} + M_{\text{scenario}}\right)\right)$$

Where severity weights $w(S_i)$ are:
- $\text{Critical} = 12$
- $\text{High} = 7$
- $\text{Moderate} = 4$
- $\text{Low} = 1$

### 2. Civic Threat Classification
$$\text{Class}(R) = \begin{cases} 
\text{Critical} & R \ge 80 \\
\text{High} & 60 \le R < 80 \\
\text{Moderate} & 40 \le R < 60 \\
\text{Low} & R < 40 
\end{cases}$$
