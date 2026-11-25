import { describe, it, expect } from 'vitest';
import { INITIAL_INCIDENTS } from '../data/mockData';
import { IncidentCategory, Severity, IncidentStatus } from '../types';

describe('Incident Management System', () => {
  it('should include incidents covering all 4 categories and all 4 severity levels', () => {
    const categories: IncidentCategory[] = ['Flood', 'Traffic Congestion', 'Road Blockage', 'Emergency'];
    const severities: Severity[] = ['Critical', 'High', 'Moderate', 'Low'];
    const statuses: IncidentStatus[] = ['Open', 'Investigating', 'Responding', 'Resolved'];

    categories.forEach(cat => {
      expect(INITIAL_INCIDENTS.some(i => i.category === cat)).toBe(true);
    });

    severities.forEach(sev => {
      expect(INITIAL_INCIDENTS.some(i => i.severity === sev)).toBe(true);
    });

    statuses.forEach(stat => {
      expect(INITIAL_INCIDENTS.some(i => i.status === stat)).toBe(true);
    });
  });

  it('should contain valid geographic coordinates and impact metrics for each incident', () => {
    INITIAL_INCIDENTS.forEach(inc => {
      expect(inc.id).toMatch(/^INC-\d+$/);
      expect(inc.coordinates.lat).toBeGreaterThan(30);
      expect(inc.coordinates.lng).toBeLessThan(-100);
      expect(inc.affectedRadiusMeters).toBeGreaterThan(50);
      expect(inc.impactMetrics.affectedCitizensEstimated).toBeGreaterThanOrEqual(0);
      expect(inc.impactMetrics.trafficDelayMinutes).toBeGreaterThanOrEqual(0);
      expect(inc.recommendedAction.length).toBeGreaterThan(15);
    });
  });
});
