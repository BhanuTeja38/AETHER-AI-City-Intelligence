export type Severity = 'Low' | 'Moderate' | 'High' | 'Critical';

export type IncidentCategory = 'Flood' | 'Traffic Congestion' | 'Road Blockage' | 'Emergency';

export type IncidentStatus = 'Open' | 'Investigating' | 'Responding' | 'Resolved';

export type SensorType = 
  | 'Water Level' 
  | 'Rainfall' 
  | 'Traffic Density' 
  | 'Road Blockage' 
  | 'Emergency Acoustic/Optical';

export type SensorStatus = 'Online' | 'Warning' | 'Offline';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Incident {
  id: string;
  category: IncidentCategory;
  title: string;
  locationName: string;
  coordinates: Coordinates;
  severity: Severity;
  status: IncidentStatus;
  reportedTime: string; // ISO string or human formatted
  description: string;
  affectedRadiusMeters: number;
  relatedSensorIds: string[];
  recommendedAction: string;
  responseTeamsAssigned?: string[];
  detourRoute?: Coordinates[];
  evacuationZone?: Coordinates[];
  impactMetrics: {
    affectedCitizensEstimated: number;
    trafficDelayMinutes: number;
    floodDepthCm?: number;
    congestionPercentage?: number;
  };
}

export interface SensorReadingHistory {
  timestamp: string;
  value: number;
}

export interface IoTSensor {
  id: string;
  name: string;
  type: SensorType;
  locationName: string;
  coordinates: Coordinates;
  currentReading: number;
  unit: string;
  status: SensorStatus;
  batteryLevel: number; // 0 - 100
  lastUpdateTime: string;
  warningThreshold: number;
  criticalThreshold: number;
  readingHistory: SensorReadingHistory[];
}

export type AlertType = 
  | 'Flood Warning' 
  | 'Critical Water Level' 
  | 'Traffic Congestion' 
  | 'Road Blockage' 
  | 'Sensor Offline' 
  | 'Emergency Incident' 
  | 'City Risk Alert';

export interface AlertNotification {
  id: string;
  type: AlertType;
  title: string;
  message: string;
  severity: Severity;
  timestamp: string;
  isRead: boolean;
  relatedEntityId?: string;
  actionRequired?: string;
}

export type SimulationScenarioId = 'urban_flood' | 'heavy_traffic' | 'road_blockage' | 'emergency_event' | 'baseline';

export interface SimulationScenario {
  id: SimulationScenarioId;
  name: string;
  description: string;
  icon: string;
  targetFocus: string;
  simulatedDurationMinutes: number;
  expectedRiskPeak: number;
}

export interface SimulationEventLog {
  id: string;
  tick: number;
  timestamp: string;
  level: 'info' | 'warning' | 'critical' | 'success';
  source: string;
  message: string;
}

export interface CityRiskFactor {
  name: string;
  score: number; // 0 - 100
  weight: number; // 0 - 1
  impactDescription: string;
}

export interface AiRecommendation {
  id: string;
  priority: 'Immediate' | 'High' | 'Medium' | 'Routine';
  title: string;
  category: IncidentCategory | 'Infrastructure' | 'Public Safety';
  action: string;
  rationale: string;
  estimatedResolutionTime: string;
  status: 'Pending' | 'Executing' | 'Completed';
}

export interface AiCityAnalysis {
  analyzedAt: string;
  riskScore: number; // 0 - 100
  riskClassification: Severity;
  situationSummary: string;
  affectedDistricts: string[];
  potentialImpact: {
    traffic: string;
    citizens: string;
    infrastructure: string;
    emergencyServices: string;
  };
  priorityActions: string[];
  recommendations: AiRecommendation[];
  riskFactorBreakdown: CityRiskFactor[];
}

export interface MapLayerVisibility {
  floodZones: boolean;
  trafficCongestion: boolean;
  roadBlockages: boolean;
  emergencyIncidents: boolean;
  iotSensors: boolean;
  alternativeRoutes: boolean;
}

export interface CityKpis {
  activeIncidentsCount: number;
  floodRiskZonesCount: number;
  trafficCongestionIndex: number; // 0 - 100%
  roadBlockagesCount: number;
  connectedSensorsCount: number;
  totalSensorsCount: number;
  cityRiskScore: number; // 0 - 100
  sensorFleetHealthPercentage: number;
}
