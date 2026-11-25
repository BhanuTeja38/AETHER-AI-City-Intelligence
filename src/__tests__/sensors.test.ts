import { describe, it, expect } from 'vitest';
import { INITIAL_SENSORS } from '../data/mockData';
import { SensorType, SensorStatus } from '../types';

describe('IoT Sensor Fleet Monitoring System', () => {
  it('should maintain sensors across all 5 specified smart-city types', () => {
    const requiredTypes: SensorType[] = [
      'Water Level',
      'Rainfall',
      'Traffic Density',
      'Road Blockage',
      'Emergency Acoustic/Optical'
    ];

    requiredTypes.forEach(type => {
      const matching = INITIAL_SENSORS.filter(s => s.type === type);
      expect(matching.length).toBeGreaterThan(0);
    });
  });

  it('should validate sensor fields: id, name, location, coordinates, reading, unit, thresholds, battery', () => {
    INITIAL_SENSORS.forEach(sensor => {
      expect(sensor.id).toMatch(/^SENS-[A-Z]+-\d+$/);
      expect(sensor.name.length).toBeGreaterThan(3);
      expect(sensor.locationName.length).toBeGreaterThan(3);
      expect(sensor.coordinates.lat).toBeGreaterThan(30);
      expect(sensor.coordinates.lng).toBeLessThan(-100);
      expect(sensor.currentReading).toBeTypeOf('number');
      expect(sensor.unit.length).toBeGreaterThan(0);
      expect(['Online', 'Warning', 'Offline']).toContain(sensor.status);
      expect(sensor.batteryLevel).toBeGreaterThanOrEqual(0);
      expect(sensor.batteryLevel).toBeLessThanOrEqual(100);
      expect(sensor.warningThreshold).toBeLessThanOrEqual(sensor.criticalThreshold);
      expect(sensor.readingHistory.length).toBeGreaterThanOrEqual(5);
    });
  });

  it('should correctly flag sensors that exceed warning threshold', () => {
    const warningSensors = INITIAL_SENSORS.filter(s => s.status === 'Warning');
    expect(warningSensors.length).toBeGreaterThan(0);
    warningSensors.forEach(sensor => {
      expect(sensor.currentReading).toBeGreaterThanOrEqual(sensor.warningThreshold);
    });
  });
});
