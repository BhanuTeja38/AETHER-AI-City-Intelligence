import { describe, it, expect } from 'vitest';
import { 
  detectUrbanProblems, 
  calculateCityRiskScore, 
  classifyRiskLevel, 
  generateAIRecommendations,
  simulateUrbanFlood,
  simulateHeavyTraffic,
  simulateRoadBlockage,
  simulateEmergencyEvent,
  formatIncidentReportCSV
} from '../services/cityIntelligenceEngine';
import { INITIAL_INCIDENTS, INITIAL_SENSORS, SIMULATION_SCENARIOS } from '../data/mockData';
import { Incident, IoTSensor } from '../types';

describe('Problem Statement Alignment: Urban Crisis Detection & Monitoring', () => {
  it('should detect and categorize all 4 core urban problem types: flooding, traffic, road blockages, and emergencies', () => {
    const problems = detectUrbanProblems(INITIAL_INCIDENTS, INITIAL_SENSORS);

    // Problem 1: Flooding
    expect(problems.flooding.activeCount).toBeGreaterThan(0);
    expect(problems.flooding.peakWaterLevelMeters).toBeGreaterThan(0);
    expect(['Low', 'Moderate', 'High', 'Critical']).toContain(problems.flooding.highestSeverity);
    expect(problems.flooding.affectedDistricts.length).toBeGreaterThan(0);

    // Problem 2: Traffic Congestion
    expect(problems.trafficCongestion.activeCount).toBeGreaterThan(0);
    expect(problems.trafficCongestion.averageSaturationPercent).toBeGreaterThan(0);
    expect(['Low', 'Moderate', 'High', 'Critical']).toContain(problems.trafficCongestion.highestSeverity);
    expect(problems.trafficCongestion.affectedCorridors.length).toBeGreaterThan(0);

    // Problem 3: Road Blockages
    expect(problems.roadBlockages.activeCount).toBeGreaterThan(0);
    expect(['Low', 'Moderate', 'High', 'Critical']).toContain(problems.roadBlockages.highestSeverity);
    expect(problems.roadBlockages.blockedLocations.length).toBeGreaterThan(0);

    // Problem 4: Emergencies
    expect(problems.emergencies.activeCount).toBeGreaterThan(0);
    expect(['Low', 'Moderate', 'High', 'Critical']).toContain(problems.emergencies.highestSeverity);
    expect(problems.emergencies.activeHazards.length).toBeGreaterThan(0);

    // Total active problems tracked
    expect(problems.totalActiveProblems).toBeGreaterThan(0);
  });

  it('should calculate city risk score bounded strictly between 0 and 100', () => {
    const normalScore = calculateCityRiskScore(INITIAL_INCIDENTS, INITIAL_SENSORS);
    expect(normalScore).toBeGreaterThanOrEqual(0);
    expect(normalScore).toBeLessThanOrEqual(100);

    // Empty incidents baseline
    const emptyScore = calculateCityRiskScore([], INITIAL_SENSORS);
    expect(emptyScore).toBeGreaterThanOrEqual(0);
    expect(emptyScore).toBeLessThanOrEqual(100);

    // Heavy crisis score
    const crisisScore = calculateCityRiskScore(INITIAL_INCIDENTS, INITIAL_SENSORS, 12);
    expect(crisisScore).toBeGreaterThan(normalScore);
    expect(crisisScore).toBeLessThanOrEqual(100);
  });

  it('should classify risk score into Low, Moderate, High, or Critical severity tiers', () => {
    expect(classifyRiskLevel(95)).toBe('Critical');
    expect(classifyRiskLevel(80)).toBe('Critical');
    expect(classifyRiskLevel(75)).toBe('High');
    expect(classifyRiskLevel(60)).toBe('High');
    expect(classifyRiskLevel(50)).toBe('Moderate');
    expect(classifyRiskLevel(40)).toBe('Moderate');
    expect(classifyRiskLevel(25)).toBe('Low');
    expect(classifyRiskLevel(0)).toBe('Low');
  });

  it('should generate intelligent recommendations tailored to active crisis vectors', () => {
    const problems = detectUrbanProblems(INITIAL_INCIDENTS, INITIAL_SENSORS);
    const recommendations = generateAIRecommendations(problems, 78);

    expect(recommendations.length).toBeGreaterThan(0);
    expect(recommendations.some(r => r.category === 'Flood')).toBe(true);
    expect(recommendations.some(r => r.category === 'Traffic Congestion')).toBe(true);
    expect(recommendations.some(r => r.category === 'Road Blockage')).toBe(true);
    expect(recommendations.some(r => r.category === 'Emergency')).toBe(true);

    recommendations.forEach(r => {
      expect(['Immediate', 'High', 'Medium', 'Routine']).toContain(r.priority);
      expect(r.action.length).toBeGreaterThan(10);
      expect(r.rationale.length).toBeGreaterThan(10);
      expect(r.status).toBe('Pending');
    });
  });

  it('should simulate Urban Flood scenario by increasing water levels and triggering warning thresholds', () => {
    const initialWaterSensors = INITIAL_SENSORS.filter(s => s.type === 'Water Level');
    const updated = simulateUrbanFlood(INITIAL_SENSORS);
    const updatedWaterSensors = updated.filter(s => s.type === 'Water Level');

    for (let i = 0; i < updatedWaterSensors.length; i++) {
      expect(updatedWaterSensors[i].currentReading).toBeGreaterThan(initialWaterSensors[i].currentReading);
    }
  });

  it('should simulate Heavy Traffic scenario by escalating traffic density radars', () => {
    const initialTraffic = INITIAL_SENSORS.filter(s => s.type === 'Traffic Density');
    const updated = simulateHeavyTraffic(INITIAL_SENSORS);
    const updatedTraffic = updated.filter(s => s.type === 'Traffic Density');

    for (let i = 0; i < updatedTraffic.length; i++) {
      expect(updatedTraffic[i].currentReading).toBeGreaterThan(initialTraffic[i].currentReading);
    }
  });

  it('should simulate Road Blockage scenario by escalating structural strain readings', () => {
    const initialBlockage = INITIAL_SENSORS.filter(s => s.type === 'Road Blockage');
    const updated = simulateRoadBlockage(INITIAL_SENSORS);
    const updatedBlockage = updated.filter(s => s.type === 'Road Blockage');

    for (let i = 0; i < updatedBlockage.length; i++) {
      expect(updatedBlockage[i].currentReading).toBeGreaterThan(initialBlockage[i].currentReading);
    }
  });

  it('should simulate Emergency Event scenario by spiking thermal/hazard sensors', () => {
    const initialEmergency = INITIAL_SENSORS.filter(s => s.type === 'Emergency Acoustic/Optical');
    const updated = simulateEmergencyEvent(INITIAL_SENSORS);
    const updatedEmergency = updated.filter(s => s.type === 'Emergency Acoustic/Optical');

    for (let i = 0; i < updatedEmergency.length; i++) {
      expect(updatedEmergency[i].currentReading).toBeGreaterThan(initialEmergency[i].currentReading);
    }
  });

  it('should format clean RFC-4180 CSV export containing all incident fields', () => {
    const csv = formatIncidentReportCSV(INITIAL_INCIDENTS);
    expect(csv).toContain('Incident_ID,Category,Title,Location,Severity,Status');
    expect(csv).toContain('INC-2041');
    expect(csv).toContain('INC-2042');
    expect(csv).toContain('INC-2044');
    const lines = csv.split('\n');
    expect(lines.length).toBe(INITIAL_INCIDENTS.length + 1);
  });
});
