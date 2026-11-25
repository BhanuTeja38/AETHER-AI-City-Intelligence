/**
 * AETHER – AI City Intelligence Engine
 * Core Domain Service: Problem Statement Alignment & City Intelligence Algorithms
 * 
 * Provides verifiable algorithms for:
 * 1. Urban Problem Detection (Flooding, Traffic Congestion, Road Blockages, Emergencies)
 * 2. IoT Sensor Telemetry Processing & Anomaly Threshold Detection
 * 3. Composite City Risk Scoring (0 - 100 Index with Low/Moderate/High/Critical classification)
 * 4. AI Strategic Recommendations & Multi-Agency Response Synthesis
 * 5. Scenario Simulation Physics & Dynamic Urban Stress Modeling
 * 6. Report Generation & CSV Dataset Serialization
 */

import { Incident, IoTSensor, Severity, IncidentCategory, IncidentStatus, AiCityAnalysis, AiRecommendation, CityRiskFactor } from '../types';

/**
 * 1. URBAN PROBLEM DETECTION
 * Analyzes active incidents and returns categorized city threat vectors
 */
export interface DetectedUrbanProblems {
  flooding: {
    activeCount: number;
    peakWaterLevelMeters: number;
    highestSeverity: Severity;
    affectedDistricts: string[];
  };
  trafficCongestion: {
    activeCount: number;
    averageSaturationPercent: number;
    highestSeverity: Severity;
    affectedCorridors: string[];
  };
  roadBlockages: {
    activeCount: number;
    highestSeverity: Severity;
    blockedLocations: string[];
  };
  emergencies: {
    activeCount: number;
    highestSeverity: Severity;
    activeHazards: string[];
  };
  totalActiveProblems: number;
}

export function detectUrbanProblems(incidents: Incident[], sensors: IoTSensor[]): DetectedUrbanProblems {
  const activeIncidents = incidents.filter(i => i.status !== 'Resolved');

  // Flood detection
  const floodIncidents = activeIncidents.filter(i => i.category === 'Flood');
  const waterSensors = sensors.filter(s => s.type === 'Water Level');
  const peakWater = waterSensors.length > 0 
    ? Math.max(...waterSensors.map(s => s.currentReading)) 
    : 0;

  // Traffic detection
  const trafficIncidents = activeIncidents.filter(i => i.category === 'Traffic Congestion');
  const trafficSensors = sensors.filter(s => s.type === 'Traffic Density');
  const avgTraffic = trafficSensors.length > 0
    ? Math.round(trafficSensors.reduce((sum, s) => sum + s.currentReading, 0) / trafficSensors.length)
    : 50;

  // Road blockage detection
  const blockageIncidents = activeIncidents.filter(i => i.category === 'Road Blockage');

  // Emergency detection
  const emergencyIncidents = activeIncidents.filter(i => i.category === 'Emergency');

  const getHighestSeverity = (list: Incident[]): Severity => {
    if (list.some(i => i.severity === 'Critical')) return 'Critical';
    if (list.some(i => i.severity === 'High')) return 'High';
    if (list.some(i => i.severity === 'Moderate')) return 'Moderate';
    if (list.some(i => i.severity === 'Low')) return 'Low';
    return 'Low';
  };

  return {
    flooding: {
      activeCount: floodIncidents.length,
      peakWaterLevelMeters: peakWater,
      highestSeverity: getHighestSeverity(floodIncidents),
      affectedDistricts: floodIncidents.map(i => i.locationName)
    },
    trafficCongestion: {
      activeCount: trafficIncidents.length,
      averageSaturationPercent: avgTraffic,
      highestSeverity: getHighestSeverity(trafficIncidents),
      affectedCorridors: trafficIncidents.map(i => i.locationName)
    },
    roadBlockages: {
      activeCount: blockageIncidents.length,
      highestSeverity: getHighestSeverity(blockageIncidents),
      blockedLocations: blockageIncidents.map(i => i.locationName)
    },
    emergencies: {
      activeCount: emergencyIncidents.length,
      highestSeverity: getHighestSeverity(emergencyIncidents),
      activeHazards: emergencyIncidents.map(i => i.title)
    },
    totalActiveProblems: activeIncidents.length
  };
}

/**
 * 2. COMPOSITE CITY RISK SCORING (0 to 100)
 * Evaluates multi-vector incident severity, warning sensor ratios, and scenario strain
 */
export function calculateCityRiskScore(
  incidents: Incident[], 
  sensors: IoTSensor[], 
  scenarioStrainModifier: number = 0
): number {
  const active = incidents.filter(i => i.status !== 'Resolved');
  let score = 20; // baseline urban activity index

  active.forEach(inc => {
    switch (inc.severity) {
      case 'Critical': score += 12; break;
      case 'High': score += 7; break;
      case 'Moderate': score += 4; break;
      case 'Low': score += 1; break;
    }
  });

  const warningSensors = sensors.filter(s => s.status === 'Warning').length;
  score += warningSensors * 1.5;

  score += scenarioStrainModifier;

  return Math.min(Math.max(Math.round(score), 10), 99);
}

/**
 * 3. RISK CLASSIFICATION
 * Maps a numerical risk score (0-100) to standard civic risk tiers
 */
export function classifyRiskLevel(riskScore: number): Severity {
  if (riskScore >= 80) return 'Critical';
  if (riskScore >= 60) return 'High';
  if (riskScore >= 40) return 'Moderate';
  return 'Low';
}

/**
 * 4. AI STRATEGIC RECOMMENDATIONS GENERATOR
 * Generates prioritized directives based on real-time detected urban stress
 */
export function generateAIRecommendations(
  detected: DetectedUrbanProblems, 
  riskScore: number
): AiRecommendation[] {
  const recs: AiRecommendation[] = [];

  if (detected.flooding.activeCount > 0 || detected.flooding.peakWaterLevelMeters > 2.5) {
    recs.push({
      id: 'REC-FLD-01',
      priority: detected.flooding.highestSeverity === 'Critical' ? 'Immediate' : 'High',
      category: 'Flood',
      title: 'Canal Embankment Sluice Activation & Barrier Deployment',
      action: 'Engage auxiliary stormwater pumps and seal low-lying retention gates.',
      rationale: `Peak water level measured at ${detected.flooding.peakWaterLevelMeters}m across ${detected.flooding.activeCount} flood zones.`,
      estimatedResolutionTime: '15 mins',
      status: 'Pending'
    });
  }

  if (detected.trafficCongestion.activeCount > 0 || detected.trafficCongestion.averageSaturationPercent > 75) {
    recs.push({
      id: 'REC-TRF-02',
      priority: detected.trafficCongestion.averageSaturationPercent > 85 ? 'Immediate' : 'High',
      category: 'Traffic Congestion',
      title: 'Arterial Green-Wave Synchronization & Detour Rerouting',
      action: 'Extend outbound traffic light green cycles by 45s along designated bypass corridors.',
      rationale: `Average arterial saturation at ${detected.trafficCongestion.averageSaturationPercent}% across key highway viaducts.`,
      estimatedResolutionTime: '8 mins',
      status: 'Pending'
    });
  }

  if (detected.roadBlockages.activeCount > 0) {
    recs.push({
      id: 'REC-BLK-03',
      priority: 'High',
      category: 'Road Blockage',
      title: 'Structural Clearance Inspection & Dynamic Detour Clearance',
      action: 'Deploy drone photogrammetry team and divert commercial vehicles around obstruction.',
      rationale: `${detected.roadBlockages.activeCount} active road blockages reported in civic arteries.`,
      estimatedResolutionTime: '20 mins',
      status: 'Pending'
    });
  }

  if (detected.emergencies.activeCount > 0) {
    recs.push({
      id: 'REC-EMG-04',
      priority: 'Immediate',
      category: 'Emergency',
      title: 'HazMat Containment Perimeter & Multi-Agency Dispatch',
      action: 'Enforce 500m safety cordon and deploy unmanned thermal suppression robotic squad.',
      rationale: `Active emergency hazard detected with potential atmospheric / power grid threat.`,
      estimatedResolutionTime: '30 mins',
      status: 'Pending'
    });
  }

  if (recs.length === 0) {
    recs.push({
      id: 'REC-NOM-05',
      priority: 'Routine',
      category: 'Infrastructure',
      title: 'IoT Sensor Mesh Routine Health Check',
      action: 'Maintain automated telemetry heartbeat polling and sensor battery monitoring.',
      rationale: 'All municipal parameters operating within normal safety tolerances.',
      estimatedResolutionTime: 'Ongoing',
      status: 'Pending'
    });
  }

  return recs;
}

/**
 * 5. SCENARIO SIMULATION MUTATORS
 * Realistic deterministic state transitions for the 4 core scenarios
 */
export function simulateUrbanFlood(sensors: IoTSensor[]): IoTSensor[] {
  return sensors.map(sensor => {
    if (sensor.type === 'Water Level') {
      const nextReading = Number((sensor.currentReading + 0.45).toFixed(2));
      return {
        ...sensor,
        currentReading: nextReading,
        status: nextReading >= sensor.warningThreshold ? 'Warning' : sensor.status,
        lastUpdateTime: 'Just now'
      };
    }
    if (sensor.type === 'Rainfall') {
      const nextReading = Number((sensor.currentReading + 18).toFixed(1));
      return {
        ...sensor,
        currentReading: nextReading,
        status: nextReading >= sensor.warningThreshold ? 'Warning' : sensor.status,
        lastUpdateTime: 'Just now'
      };
    }
    return sensor;
  });
}

export function simulateHeavyTraffic(sensors: IoTSensor[]): IoTSensor[] {
  return sensors.map(sensor => {
    if (sensor.type === 'Traffic Density') {
      const nextReading = Math.min(99, sensor.currentReading + 15);
      return {
        ...sensor,
        currentReading: nextReading,
        status: nextReading >= sensor.warningThreshold ? 'Warning' : sensor.status,
        lastUpdateTime: 'Just now'
      };
    }
    return sensor;
  });
}

export function simulateRoadBlockage(sensors: IoTSensor[]): IoTSensor[] {
  return sensors.map(sensor => {
    if (sensor.type === 'Road Blockage') {
      const nextReading = Math.min(98, sensor.currentReading + 25);
      return {
        ...sensor,
        currentReading: nextReading,
        status: nextReading >= sensor.warningThreshold ? 'Warning' : sensor.status,
        lastUpdateTime: 'Just now'
      };
    }
    return sensor;
  });
}

export function simulateEmergencyEvent(sensors: IoTSensor[]): IoTSensor[] {
  return sensors.map(sensor => {
    if (sensor.type === 'Emergency Acoustic/Optical') {
      const nextReading = sensor.currentReading + 40;
      return {
        ...sensor,
        currentReading: nextReading,
        status: nextReading >= sensor.warningThreshold ? 'Warning' : sensor.status,
        lastUpdateTime: 'Just now'
      };
    }
    return sensor;
  });
}

/**
 * 6. CSV DATASET EXPORT FORMATTER
 * Converts incident and telemetry records into standard RFC-4180 compliant CSV
 */
export function formatIncidentReportCSV(incidents: Incident[]): string {
  const headers = [
    'Incident_ID',
    'Category',
    'Title',
    'Location',
    'Severity',
    'Status',
    'Reported_Time',
    'Citizens_Affected',
    'Traffic_Delay_Minutes',
    'Recommended_Action'
  ];

  const escapeCSV = (str: string) => `"${str.replace(/"/g, '""')}"`;

  const rows = incidents.map(i => [
    i.id,
    escapeCSV(i.category),
    escapeCSV(i.title),
    escapeCSV(i.locationName),
    i.severity,
    i.status,
    escapeCSV(i.reportedTime),
    i.impactMetrics.affectedCitizensEstimated,
    i.impactMetrics.trafficDelayMinutes,
    escapeCSV(i.recommendedAction)
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}
