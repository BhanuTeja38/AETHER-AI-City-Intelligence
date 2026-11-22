import { Incident, IoTSensor, AlertNotification, SimulationScenario, AiCityAnalysis } from '../types';

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'INC-2041',
    category: 'Flood',
    title: 'Canal Basin Surge & Flash Flooding',
    locationName: 'South Canal Basin & Pier 38 Lowlands',
    coordinates: { lat: 37.7712, lng: -122.3985 },
    severity: 'Critical',
    status: 'Responding',
    reportedTime: '12 mins ago',
    description: 'Tidal surge combined with stormwater runoff caused canal retaining wall overflow. Water level measured +42cm above safe embankment threshold.',
    affectedRadiusMeters: 450,
    relatedSensorIds: ['SENS-WL-01', 'SENS-RF-01', 'SENS-WL-02'],
    recommendedAction: 'Deploy flood barriers, activate Canal Pump Station #3, reroute low-lying transit corridors to 4th Street elevated bypass.',
    responseTeamsAssigned: ['City Flood Battalion #4', 'Civil Defense Engineering'],
    impactMetrics: {
      affectedCitizensEstimated: 4200,
      trafficDelayMinutes: 35,
      floodDepthCm: 48,
    },
    detourRoute: [
      { lat: 37.7680, lng: -122.4080 },
      { lat: 37.7760, lng: -122.4040 },
      { lat: 37.7810, lng: -122.3990 }
    ],
    evacuationZone: [
      { lat: 37.7740, lng: -122.4020 },
      { lat: 37.7725, lng: -122.3940 },
      { lat: 37.7685, lng: -122.3960 },
      { lat: 37.7700, lng: -122.4040 }
    ]
  },
  {
    id: 'INC-2042',
    category: 'Traffic Congestion',
    title: 'Central Viaduct Gridlock & Stalled Multi-Axle Carrier',
    locationName: 'Central Viaduct & Highway 101 Junction',
    coordinates: { lat: 37.7645, lng: -122.4220 },
    severity: 'High',
    status: 'Investigating',
    reportedTime: '24 mins ago',
    description: 'Multi-vehicle collision and cargo stall blocking three outbound express lanes. Queue length exceeding 3.8 kilometers with ripple delays into Tech Corridor.',
    affectedRadiusMeters: 380,
    relatedSensorIds: ['SENS-TR-01', 'SENS-TR-03'],
    recommendedAction: 'Reroute traffic via 16th Street and Potrero Ave. Switch arterial traffic lights to 90s priority green waves.',
    responseTeamsAssigned: ['Metro Highway Patrol Unit 12'],
    impactMetrics: {
      affectedCitizensEstimated: 12500,
      trafficDelayMinutes: 42,
      congestionPercentage: 88,
    },
    detourRoute: [
      { lat: 37.7599, lng: -122.4148 },
      { lat: 37.7620, lng: -122.4080 },
      { lat: 37.7680, lng: -122.4080 }
    ]
  },
  {
    id: 'INC-2043',
    category: 'Road Blockage',
    title: 'North Tunnel Crossing Structural Debris',
    locationName: 'North Tunnel Crossing, Upper Inbound Portal',
    coordinates: { lat: 37.7989, lng: -122.4098 },
    severity: 'Moderate',
    status: 'Open',
    reportedTime: '38 mins ago',
    description: 'Vibration sensors detected concrete spalling and barrier dislodgement near tunnel entrance. Lane 1 and 2 temporarily barricaded for safety verification.',
    affectedRadiusMeters: 250,
    relatedSensorIds: ['SENS-RB-01', 'SENS-TR-02'],
    recommendedAction: 'Dispatch structural inspector drone fleet. Divert heavy commercial vehicles around tunnel through Columbus Avenue arterial.',
    responseTeamsAssigned: ['Municipal Infrastructure Inspection Team #2'],
    impactMetrics: {
      affectedCitizensEstimated: 3100,
      trafficDelayMinutes: 18,
      congestionPercentage: 62,
    },
    detourRoute: [
      { lat: 37.7940, lng: -122.4150 },
      { lat: 37.7910, lng: -122.4060 },
      { lat: 37.7960, lng: -122.3990 }
    ]
  },
  {
    id: 'INC-2044',
    category: 'Emergency',
    title: 'Substation Transformer Fire & Power Failure',
    locationName: 'Bayview Industrial Park - Grid Station 7',
    coordinates: { lat: 37.7410, lng: -122.3890 },
    severity: 'Critical',
    status: 'Responding',
    reportedTime: '8 mins ago',
    description: 'High-voltage transformer oil fire resulting in localized 12kV grid drop and thick toxic smoke plume drifting toward southern residential belt.',
    affectedRadiusMeters: 600,
    relatedSensorIds: ['SENS-EM-01', 'SENS-EM-02'],
    recommendedAction: 'Establish 500m containment perimeter. Dispatch HazMat Engine 9 and foam suppression units. Issue shelter-in-place advisory for Sector 4.',
    responseTeamsAssigned: ['HazMat Unit 9', 'Emergency Medical Rescue 3', 'Power Grid Rapid Repair'],
    impactMetrics: {
      affectedCitizensEstimated: 8500,
      trafficDelayMinutes: 25,
    },
    evacuationZone: [
      { lat: 37.7450, lng: -122.3850 },
      { lat: 37.7430, lng: -122.3940 },
      { lat: 37.7370, lng: -122.3920 },
      { lat: 37.7380, lng: -122.3830 }
    ]
  },
  {
    id: 'INC-2045',
    category: 'Flood',
    title: 'Embarcadero Marina Overflow',
    locationName: 'Waterfront Promenade & Pier 14 Basin',
    coordinates: { lat: 37.7955, lng: -122.3937 },
    severity: 'Moderate',
    status: 'Investigating',
    reportedTime: '45 mins ago',
    description: 'High king tide backed up through storm drains onto pedestrian promenade and transit tram tracks.',
    affectedRadiusMeters: 220,
    relatedSensorIds: ['SENS-WL-03', 'SENS-RF-03'],
    recommendedAction: 'Temporarily halt Historic Tram Line F. Deploy automated floodgates on promenade sub-grade vents.',
    impactMetrics: {
      affectedCitizensEstimated: 1800,
      trafficDelayMinutes: 12,
      floodDepthCm: 18,
    }
  },
  {
    id: 'INC-2046',
    category: 'Traffic Congestion',
    title: 'Financial Core Peak Jam',
    locationName: 'Market Street & Montgomery Corridor',
    coordinates: { lat: 37.7885, lng: -122.4015 },
    severity: 'Low',
    status: 'Open',
    reportedTime: '1 hr ago',
    description: 'Delivery vehicle double-parking and pedestrian surge creating bottlenecks along key transit intersections.',
    affectedRadiusMeters: 180,
    relatedSensorIds: ['SENS-TR-04'],
    recommendedAction: 'Dynamic curb pricing adjustment and automated parking enforcement alert dispatch.',
    impactMetrics: {
      affectedCitizensEstimated: 2900,
      trafficDelayMinutes: 9,
      congestionPercentage: 54,
    }
  },
  {
    id: 'INC-2047',
    category: 'Road Blockage',
    title: 'Fallen High-Voltage Utility Pole',
    locationName: 'Mission Valley Lowlands - 18th & Harrison',
    coordinates: { lat: 37.7599, lng: -122.4148 },
    severity: 'High',
    status: 'Responding',
    reportedTime: '18 mins ago',
    description: 'High winds caused damaged utility pole to snap, downing live wires across both lanes. Street fully cordoned off.',
    affectedRadiusMeters: 150,
    relatedSensorIds: ['SENS-RB-03', 'SENS-EM-03'],
    recommendedAction: 'Utility crew on scene for line grounding. Local traffic diverted via 19th Street.',
    responseTeamsAssigned: ['Municipal Power Utility #1', 'Police Traffic Division'],
    impactMetrics: {
      affectedCitizensEstimated: 1400,
      trafficDelayMinutes: 20,
    }
  },
  {
    id: 'INC-2048',
    category: 'Emergency',
    title: 'Hospital District Power Surge Warning',
    locationName: 'Metro Hospital & Emergency Trauma Hub',
    coordinates: { lat: 37.7845, lng: -122.4330 },
    severity: 'Low',
    status: 'Resolved',
    reportedTime: '2 hrs ago',
    description: 'Minor voltage fluctuation triggered secondary emergency diesel generators. System stabilized; city grid sync restored.',
    affectedRadiusMeters: 100,
    relatedSensorIds: ['SENS-EM-04'],
    recommendedAction: 'Routine sensor log audit; generator reserve fuel replenished.',
    responseTeamsAssigned: ['Hospital Facility Engineering'],
    impactMetrics: {
      affectedCitizensEstimated: 0,
      trafficDelayMinutes: 0,
    }
  }
];

export const INITIAL_SENSORS: IoTSensor[] = [
  // Water Level
  {
    id: 'SENS-WL-01',
    name: 'Canal Basin Embankment Sensor #1',
    type: 'Water Level',
    locationName: 'South Canal Basin',
    coordinates: { lat: 37.7712, lng: -122.3985 },
    currentReading: 2.84,
    unit: 'meters',
    status: 'Warning',
    batteryLevel: 94,
    lastUpdateTime: 'Just now',
    warningThreshold: 2.40,
    criticalThreshold: 3.10,
    readingHistory: [
      { timestamp: '10m ago', value: 1.95 },
      { timestamp: '8m ago', value: 2.10 },
      { timestamp: '6m ago', value: 2.35 },
      { timestamp: '4m ago', value: 2.65 },
      { timestamp: '2m ago', value: 2.80 },
      { timestamp: 'Now', value: 2.84 }
    ]
  },
  {
    id: 'SENS-WL-02',
    name: 'Mission Creek Sluice Gate Monitor',
    type: 'Water Level',
    locationName: 'Mission Creek Estuary',
    coordinates: { lat: 37.7680, lng: -122.4020 },
    currentReading: 2.15,
    unit: 'meters',
    status: 'Online',
    batteryLevel: 88,
    lastUpdateTime: '1m ago',
    warningThreshold: 2.50,
    criticalThreshold: 3.20,
    readingHistory: [
      { timestamp: '10m ago', value: 1.60 },
      { timestamp: '8m ago', value: 1.75 },
      { timestamp: '6m ago', value: 1.88 },
      { timestamp: '4m ago', value: 2.00 },
      { timestamp: '2m ago', value: 2.10 },
      { timestamp: 'Now', value: 2.15 }
    ]
  },
  {
    id: 'SENS-WL-03',
    name: 'Pier 14 Promenade Tide Sensor',
    type: 'Water Level',
    locationName: 'Embarcadero Waterfront',
    coordinates: { lat: 37.7955, lng: -122.3937 },
    currentReading: 3.22,
    unit: 'meters',
    status: 'Warning',
    batteryLevel: 79,
    lastUpdateTime: 'Just now',
    warningThreshold: 3.00,
    criticalThreshold: 3.60,
    readingHistory: [
      { timestamp: '10m ago', value: 2.70 },
      { timestamp: '8m ago', value: 2.85 },
      { timestamp: '6m ago', value: 3.05 },
      { timestamp: '4m ago', value: 3.15 },
      { timestamp: '2m ago', value: 3.20 },
      { timestamp: 'Now', value: 3.22 }
    ]
  },
  {
    id: 'SENS-WL-04',
    name: 'North Bay Wharf Flood Gauge',
    type: 'Water Level',
    locationName: 'Fisherman Wharf Marine Station',
    coordinates: { lat: 37.8080, lng: -122.4177 },
    currentReading: 1.45,
    unit: 'meters',
    status: 'Online',
    batteryLevel: 91,
    lastUpdateTime: '3m ago',
    warningThreshold: 2.60,
    criticalThreshold: 3.30,
    readingHistory: [
      { timestamp: '10m ago', value: 1.30 },
      { timestamp: '8m ago', value: 1.35 },
      { timestamp: '6m ago', value: 1.40 },
      { timestamp: '4m ago', value: 1.42 },
      { timestamp: '2m ago', value: 1.44 },
      { timestamp: 'Now', value: 1.45 }
    ]
  },
  {
    id: 'SENS-WL-05',
    name: 'Islais Creek Culvert Telemetry',
    type: 'Water Level',
    locationName: 'South Harbor Industrial Channel',
    coordinates: { lat: 37.7475, lng: -122.3920 },
    currentReading: 1.88,
    unit: 'meters',
    status: 'Online',
    batteryLevel: 62,
    lastUpdateTime: '2m ago',
    warningThreshold: 2.40,
    criticalThreshold: 3.00,
    readingHistory: [
      { timestamp: '10m ago', value: 1.60 },
      { timestamp: '8m ago', value: 1.65 },
      { timestamp: '6m ago', value: 1.72 },
      { timestamp: '4m ago', value: 1.80 },
      { timestamp: '2m ago', value: 1.85 },
      { timestamp: 'Now', value: 1.88 }
    ]
  },

  // Rainfall
  {
    id: 'SENS-RF-01',
    name: 'Downtown Weather Radar & Pluviometer',
    type: 'Rainfall',
    locationName: 'Civic Center Rooftop Station',
    coordinates: { lat: 37.7790, lng: -122.4170 },
    currentReading: 48.5,
    unit: 'mm/h',
    status: 'Warning',
    batteryLevel: 98,
    lastUpdateTime: 'Just now',
    warningThreshold: 35.0,
    criticalThreshold: 60.0,
    readingHistory: [
      { timestamp: '10m ago', value: 12.0 },
      { timestamp: '8m ago', value: 24.5 },
      { timestamp: '6m ago', value: 36.0 },
      { timestamp: '4m ago', value: 42.0 },
      { timestamp: '2m ago', value: 46.5 },
      { timestamp: 'Now', value: 48.5 }
    ]
  },
  {
    id: 'SENS-RF-02',
    name: 'Twin Peaks Highland Rain Gauge',
    type: 'Rainfall',
    locationName: 'Twin Peaks Weather Mast',
    coordinates: { lat: 37.7544, lng: -122.4477 },
    currentReading: 55.2,
    unit: 'mm/h',
    status: 'Warning',
    batteryLevel: 85,
    lastUpdateTime: '1m ago',
    warningThreshold: 35.0,
    criticalThreshold: 60.0,
    readingHistory: [
      { timestamp: '10m ago', value: 18.0 },
      { timestamp: '8m ago', value: 28.0 },
      { timestamp: '6m ago', value: 40.0 },
      { timestamp: '4m ago', value: 49.0 },
      { timestamp: '2m ago', value: 53.0 },
      { timestamp: 'Now', value: 55.2 }
    ]
  },
  {
    id: 'SENS-RF-03',
    name: 'Bayfront Harbor Meteorological Pod',
    type: 'Rainfall',
    locationName: 'Port Terminal 46',
    coordinates: { lat: 37.7735, lng: -122.3880 },
    currentReading: 38.0,
    unit: 'mm/h',
    status: 'Warning',
    batteryLevel: 90,
    lastUpdateTime: 'Just now',
    warningThreshold: 35.0,
    criticalThreshold: 60.0,
    readingHistory: [
      { timestamp: '10m ago', value: 10.0 },
      { timestamp: '8m ago', value: 18.5 },
      { timestamp: '6m ago', value: 27.0 },
      { timestamp: '4m ago', value: 32.5 },
      { timestamp: '2m ago', value: 36.0 },
      { timestamp: 'Now', value: 38.0 }
    ]
  },
  {
    id: 'SENS-RF-04',
    name: 'Presidio North Ridge Precipitation Barometer',
    type: 'Rainfall',
    locationName: 'Presidio Heights',
    coordinates: { lat: 37.7915, lng: -122.4550 },
    currentReading: 22.4,
    unit: 'mm/h',
    status: 'Online',
    batteryLevel: 76,
    lastUpdateTime: '4m ago',
    warningThreshold: 35.0,
    criticalThreshold: 60.0,
    readingHistory: [
      { timestamp: '10m ago', value: 8.0 },
      { timestamp: '8m ago', value: 12.0 },
      { timestamp: '6m ago', value: 16.5 },
      { timestamp: '4m ago', value: 19.0 },
      { timestamp: '2m ago', value: 21.0 },
      { timestamp: 'Now', value: 22.4 }
    ]
  },

  // Traffic Density
  {
    id: 'SENS-TR-01',
    name: 'Central Viaduct Overhead LiDAR Radar',
    type: 'Traffic Density',
    locationName: 'Central Viaduct Highway Ramp',
    coordinates: { lat: 37.7645, lng: -122.4220 },
    currentReading: 89,
    unit: '% saturation',
    status: 'Warning',
    batteryLevel: 99,
    lastUpdateTime: 'Just now',
    warningThreshold: 75,
    criticalThreshold: 90,
    readingHistory: [
      { timestamp: '10m ago', value: 45 },
      { timestamp: '8m ago', value: 62 },
      { timestamp: '6m ago', value: 74 },
      { timestamp: '4m ago', value: 83 },
      { timestamp: '2m ago', value: 87 },
      { timestamp: 'Now', value: 89 }
    ]
  },
  {
    id: 'SENS-TR-02',
    name: 'North Broadway Tunnel Inbound Sensor',
    type: 'Traffic Density',
    locationName: 'Broadway Tunnel Portal',
    coordinates: { lat: 37.7960, lng: -122.4110 },
    currentReading: 72,
    unit: '% saturation',
    status: 'Online',
    batteryLevel: 87,
    lastUpdateTime: 'Just now',
    warningThreshold: 75,
    criticalThreshold: 90,
    readingHistory: [
      { timestamp: '10m ago', value: 38 },
      { timestamp: '8m ago', value: 50 },
      { timestamp: '6m ago', value: 61 },
      { timestamp: '4m ago', value: 68 },
      { timestamp: '2m ago', value: 70 },
      { timestamp: 'Now', value: 72 }
    ]
  },
  {
    id: 'SENS-TR-03',
    name: 'Bay Bridge Skyway Outbound Cam Array',
    type: 'Traffic Density',
    locationName: 'Bay Bridge Incline Approach',
    coordinates: { lat: 37.7885, lng: -122.3900 },
    currentReading: 84,
    unit: '% saturation',
    status: 'Warning',
    batteryLevel: 95,
    lastUpdateTime: '1m ago',
    warningThreshold: 75,
    criticalThreshold: 90,
    readingHistory: [
      { timestamp: '10m ago', value: 55 },
      { timestamp: '8m ago', value: 68 },
      { timestamp: '6m ago', value: 76 },
      { timestamp: '4m ago', value: 80 },
      { timestamp: '2m ago', value: 82 },
      { timestamp: 'Now', value: 84 }
    ]
  },
  {
    id: 'SENS-TR-04',
    name: 'Market Street Commercial Transit Node',
    type: 'Traffic Density',
    locationName: 'Market & 4th Street',
    coordinates: { lat: 37.7860, lng: -122.4050 },
    currentReading: 68,
    unit: '% saturation',
    status: 'Online',
    batteryLevel: 82,
    lastUpdateTime: '2m ago',
    warningThreshold: 75,
    criticalThreshold: 90,
    readingHistory: [
      { timestamp: '10m ago', value: 52 },
      { timestamp: '8m ago', value: 58 },
      { timestamp: '6m ago', value: 62 },
      { timestamp: '4m ago', value: 65 },
      { timestamp: '2m ago', value: 67 },
      { timestamp: 'Now', value: 68 }
    ]
  },
  {
    id: 'SENS-TR-05',
    name: 'Mission Street Boulevard Loop Sensor',
    type: 'Traffic Density',
    locationName: 'Mission & 16th Street',
    coordinates: { lat: 37.7650, lng: -122.4190 },
    currentReading: 61,
    unit: '% saturation',
    status: 'Online',
    batteryLevel: 71,
    lastUpdateTime: ' Just now',
    warningThreshold: 75,
    criticalThreshold: 90,
    readingHistory: [
      { timestamp: '10m ago', value: 44 },
      { timestamp: '8m ago', value: 49 },
      { timestamp: '6m ago', value: 53 },
      { timestamp: '4m ago', value: 57 },
      { timestamp: '2m ago', value: 60 },
      { timestamp: 'Now', value: 61 }
    ]
  },
  {
    id: 'SENS-TR-06',
    name: 'Port Logistics Arterial Sensor #4',
    type: 'Traffic Density',
    locationName: 'Illinois Street Cargo Route',
    coordinates: { lat: 37.7550, lng: -122.3875 },
    currentReading: 42,
    unit: '% saturation',
    status: 'Online',
    batteryLevel: 93,
    lastUpdateTime: '5m ago',
    warningThreshold: 75,
    criticalThreshold: 90,
    readingHistory: [
      { timestamp: '10m ago', value: 39 },
      { timestamp: '8m ago', value: 40 },
      { timestamp: '6m ago', value: 41 },
      { timestamp: '4m ago', value: 41 },
      { timestamp: '2m ago', value: 42 },
      { timestamp: 'Now', value: 42 }
    ]
  },

  // Road Blockage
  {
    id: 'SENS-RB-01',
    name: 'Tunnel Inbound Structural Acoustic Monitor',
    type: 'Road Blockage',
    locationName: 'North Tunnel Crossing',
    coordinates: { lat: 37.7989, lng: -122.4098 },
    currentReading: 82,
    unit: 'vibration index',
    status: 'Warning',
    batteryLevel: 96,
    lastUpdateTime: 'Just now',
    warningThreshold: 65,
    criticalThreshold: 85,
    readingHistory: [
      { timestamp: '10m ago', value: 15 },
      { timestamp: '8m ago', value: 22 },
      { timestamp: '6m ago', value: 48 },
      { timestamp: '4m ago', value: 76 },
      { timestamp: '2m ago', value: 80 },
      { timestamp: 'Now', value: 82 }
    ]
  },
  {
    id: 'SENS-RB-02',
    name: 'South Underpass Laser Obstruction Detector',
    type: 'Road Blockage',
    locationName: 'King Street Underpass',
    coordinates: { lat: 37.7765, lng: -122.3940 },
    currentReading: 12,
    unit: 'clearance index',
    status: 'Online',
    batteryLevel: 89,
    lastUpdateTime: '2m ago',
    warningThreshold: 50,
    criticalThreshold: 75,
    readingHistory: [
      { timestamp: '10m ago', value: 10 },
      { timestamp: '8m ago', value: 11 },
      { timestamp: '6m ago', value: 12 },
      { timestamp: '4m ago', value: 11 },
      { timestamp: '2m ago', value: 12 },
      { timestamp: 'Now', value: 12 }
    ]
  },
  {
    id: 'SENS-RB-03',
    name: 'Mission Valley Utility Tilt & Strain Gauge',
    type: 'Road Blockage',
    locationName: '18th & Harrison Intersection',
    coordinates: { lat: 37.7599, lng: -122.4148 },
    currentReading: 91,
    unit: 'tilt degrees',
    status: 'Warning',
    batteryLevel: 78,
    lastUpdateTime: 'Just now',
    warningThreshold: 35,
    criticalThreshold: 60,
    readingHistory: [
      { timestamp: '10m ago', value: 5 },
      { timestamp: '8m ago', value: 12 },
      { timestamp: '6m ago', value: 35 },
      { timestamp: '4m ago', value: 72 },
      { timestamp: '2m ago', value: 88 },
      { timestamp: 'Now', value: 91 }
    ]
  },
  {
    id: 'SENS-RB-04',
    name: 'Industrial Overpass Clearance Sentinel',
    type: 'Road Blockage',
    locationName: 'Cesar Chavez Flyover',
    coordinates: { lat: 37.7505, lng: -122.4040 },
    currentReading: 14,
    unit: 'clearance index',
    status: 'Online',
    batteryLevel: 0, // Simulated offline node demonstration!
    lastUpdateTime: '1 hr ago',
    warningThreshold: 50,
    criticalThreshold: 75,
    readingHistory: [
      { timestamp: '10m ago', value: 14 },
      { timestamp: '8m ago', value: 14 },
      { timestamp: '6m ago', value: 14 },
      { timestamp: '4m ago', value: 14 },
      { timestamp: '2m ago', value: 14 },
      { timestamp: 'Now', value: 14 }
    ]
  },

  // Emergency Acoustic / Optical
  {
    id: 'SENS-EM-01',
    name: 'Grid Substation Thermal & Smoke Detector',
    type: 'Emergency Acoustic/Optical',
    locationName: 'Bayview Substation 7',
    coordinates: { lat: 37.7410, lng: -122.3890 },
    currentReading: 165,
    unit: '°C hotspot',
    status: 'Warning',
    batteryLevel: 92,
    lastUpdateTime: 'Just now',
    warningThreshold: 85,
    criticalThreshold: 120,
    readingHistory: [
      { timestamp: '10m ago', value: 42 },
      { timestamp: '8m ago', value: 78 },
      { timestamp: '6m ago', value: 125 },
      { timestamp: '4m ago', value: 154 },
      { timestamp: '2m ago', value: 162 },
      { timestamp: 'Now', value: 165 }
    ]
  },
  {
    id: 'SENS-EM-02',
    name: 'South Harbor Industrial Air Quality / VOC',
    type: 'Emergency Acoustic/Optical',
    locationName: 'Harbor Perimeter Post #3',
    coordinates: { lat: 37.7440, lng: -122.3840 },
    currentReading: 215,
    unit: 'AQI (Particulate)',
    status: 'Warning',
    batteryLevel: 81,
    lastUpdateTime: 'Just now',
    warningThreshold: 150,
    criticalThreshold: 200,
    readingHistory: [
      { timestamp: '10m ago', value: 45 },
      { timestamp: '8m ago', value: 68 },
      { timestamp: '6m ago', value: 110 },
      { timestamp: '4m ago', value: 172 },
      { timestamp: '2m ago', value: 204 },
      { timestamp: 'Now', value: 215 }
    ]
  },
  {
    id: 'SENS-EM-03',
    name: 'Mission Emergency Audio Acoustic Triangulation',
    type: 'Emergency Acoustic/Optical',
    locationName: '16th Street Transit Plaza',
    coordinates: { lat: 37.7648, lng: -122.4195 },
    currentReading: 88,
    unit: 'dBA decibels',
    status: 'Online',
    batteryLevel: 84,
    lastUpdateTime: '1m ago',
    warningThreshold: 90,
    criticalThreshold: 110,
    readingHistory: [
      { timestamp: '10m ago', value: 72 },
      { timestamp: '8m ago', value: 74 },
      { timestamp: '6m ago', value: 82 },
      { timestamp: '4m ago', value: 85 },
      { timestamp: '2m ago', value: 87 },
      { timestamp: 'Now', value: 88 }
    ]
  },
  {
    id: 'SENS-EM-04',
    name: 'Civic Center Public Safety Acoustic Pod',
    type: 'Emergency Acoustic/Optical',
    locationName: 'Civic Center Plaza',
    coordinates: { lat: 37.7795, lng: -122.4175 },
    currentReading: 65,
    unit: 'dBA decibels',
    status: 'Online',
    batteryLevel: 94,
    lastUpdateTime: '2m ago',
    warningThreshold: 90,
    criticalThreshold: 110,
    readingHistory: [
      { timestamp: '10m ago', value: 62 },
      { timestamp: '8m ago', value: 64 },
      { timestamp: '6m ago', value: 65 },
      { timestamp: '4m ago', value: 63 },
      { timestamp: '2m ago', value: 65 },
      { timestamp: 'Now', value: 65 }
    ]
  }
];

export const INITIAL_ALERTS: AlertNotification[] = [
  {
    id: 'ALT-901',
    type: 'Critical Water Level',
    title: 'Canal Embankment Overflow Warning',
    message: 'Sensor SENS-WL-01 measured water level 2.84m approaching critical flood limit of 3.10m. Rapid evacuation alert triggered for lowlands.',
    severity: 'Critical',
    timestamp: '2 mins ago',
    isRead: false,
    relatedEntityId: 'INC-2041',
    actionRequired: 'Inspect Canal Pump Station #3 and close flood barriers.'
  },
  {
    id: 'ALT-902',
    type: 'Emergency Incident',
    title: 'Transformer Fire with Dense Plume',
    message: 'Thermal sensor SENS-EM-01 flagged 165°C hotspot at Grid Station 7. HazMat response active.',
    severity: 'Critical',
    timestamp: '7 mins ago',
    isRead: false,
    relatedEntityId: 'INC-2044',
    actionRequired: 'Maintain 500m perimeter and reroute traffic around Sector 4.'
  },
  {
    id: 'ALT-903',
    type: 'Traffic Congestion',
    title: 'Central Viaduct Saturation Exceeded 85%',
    message: 'Congestion radar SENS-TR-01 reports 89% saturation with persistent queue formation toward Highway 101.',
    severity: 'High',
    timestamp: '15 mins ago',
    isRead: false,
    relatedEntityId: 'INC-2042',
    actionRequired: 'Trigger arterial green-wave diversion along Potrero Ave.'
  },
  {
    id: 'ALT-904',
    type: 'Road Blockage',
    title: 'North Tunnel Crossing Structural Debris Warning',
    message: 'Acoustic vibration sensor SENS-RB-01 triggered warning state (82 index). Inbound lanes 1 & 2 cordoned.',
    severity: 'Moderate',
    timestamp: '32 mins ago',
    isRead: true,
    relatedEntityId: 'INC-2043',
    actionRequired: 'Drone inspection squad clearance required.'
  },
  {
    id: 'ALT-905',
    type: 'Sensor Offline',
    title: 'Telemetry Lost: Cesar Chavez Flyover Sentinel',
    message: 'Sensor SENS-RB-04 failed to report heartbeat for >60 minutes. Battery depletion detected.',
    severity: 'Low',
    timestamp: '58 mins ago',
    isRead: true,
    relatedEntityId: 'SENS-RB-04',
    actionRequired: 'Schedule maintenance field technician battery swap.'
  }
];

export const SIMULATION_SCENARIOS: SimulationScenario[] = [
  {
    id: 'urban_flood',
    name: 'Urban Flood & Storm Surge',
    description: 'Simulates heavy rainfall (60+ mm/h), storm surge in coastal canals, rising retention basins, and road inundation.',
    icon: 'Droplets',
    targetFocus: 'Water Level Sensors & Canal Embankments',
    simulatedDurationMinutes: 15,
    expectedRiskPeak: 88,
  },
  {
    id: 'heavy_traffic',
    name: 'Rush Hour Gridlock & Highway Collapse',
    description: 'Simulates evening rush hour amplified by multi-vehicle collisions on key bridge & viaduct bottlenecks.',
    icon: 'Car',
    targetFocus: 'Traffic Radar Nodes & Arterial Signal Timing',
    simulatedDurationMinutes: 20,
    expectedRiskPeak: 79,
  },
  {
    id: 'road_blockage',
    name: 'Structural Failure & Underground Sinkhole',
    description: 'Simulates sudden tunnel debris spalling and underground water main rupture leading to major road closures.',
    icon: 'AlertOctagon',
    targetFocus: 'Acoustic Strain Sensors & Smart Detours',
    simulatedDurationMinutes: 12,
    expectedRiskPeak: 74,
  },
  {
    id: 'emergency_event',
    name: 'Industrial HazMat & Substation Blaze',
    description: 'Simulates critical electrical grid failure, chemical air pollution plume, and multi-agency emergency cordon.',
    icon: 'Flame',
    targetFocus: 'Thermal Sensors, Air Quality & Response Units',
    simulatedDurationMinutes: 25,
    expectedRiskPeak: 95,
  }
];

export const BASELINE_AI_ANALYSIS: AiCityAnalysis = {
  analyzedAt: 'Just now',
  riskScore: 78,
  riskClassification: 'High',
  situationSummary: 'City is currently experiencing compounding urban strain. Severe canal overflow in South Basin interacts with Central Viaduct traffic congestion, while an industrial electrical incident in Sector 4 demands dedicated HazMat resources.',
  affectedDistricts: [
    'South Canal Basin (Sector 2)',
    'Central Viaduct Arterial (Sector 1)',
    'North Tunnel Portal (Sector 3)',
    'Bayview Industrial Complex (Sector 4)'
  ],
  potentialImpact: {
    traffic: 'Projected 42-minute average delay across outbound highways; secondary arterial gridlock likely if evening rush hour begins before Viaduct clearance.',
    citizens: 'Approximately 27,000 citizens directly impacted by road closures, flash flood zones, or smoke advisory perimeters.',
    infrastructure: 'Canal retaining walls nearing peak capacity; localized 12kV electrical feed instability in Sector 4.',
    emergencyServices: '68% of frontline civil defense and HazMat battalions are actively committed. Response reserve at moderate readiness.'
  },
  priorityActions: [
    'Activate Canal Basin Pump Station #3 auxiliary turbines and close automated sluice gates.',
    'Implement dynamic detour routing via 4th Street elevated viaduct to relieve stalled highway lanes.',
    'Issue real-time mobile push advisory for Bayview Sector 4 to close windows against smoke particulate.',
    'Dispatch municipal structural drone swarm to certify North Tunnel Portal integrity.'
  ],
  recommendations: [
    {
      id: 'REC-01',
      priority: 'Immediate',
      category: 'Flood',
      title: 'Canal Basin Automated Floodgate Seal',
      action: 'Engage mechanical flood barriers on South Embankment and redirect stormwater toward deep storage caverns.',
      rationale: 'Sensor SENS-WL-01 reading (2.84m) is within 26cm of uncontained overflow.',
      estimatedResolutionTime: '15 mins',
      status: 'Pending'
    },
    {
      id: 'REC-02',
      priority: 'Immediate',
      category: 'Emergency',
      title: '500m Industrial HazMat Cordon & Foam Quench',
      action: 'Establish thermal isolation perimeter and deploy unmanned suppression robot to transformer core.',
      rationale: 'Thermal telemetry SENS-EM-01 measured 165°C with high VOC particulate drift.',
      estimatedResolutionTime: '25 mins',
      status: 'Pending'
    },
    {
      id: 'REC-03',
      priority: 'High',
      category: 'Traffic Congestion',
      title: 'Dynamic Traffic Light Synchronization (Green Wave)',
      action: 'Override traffic light controllers on Potrero and 16th Street to extend outbound green cycles by 45 seconds.',
      rationale: 'Viaduct saturation at 89% with 3.8km backline queue.',
      estimatedResolutionTime: '8 mins',
      status: 'Pending'
    },
    {
      id: 'REC-04',
      priority: 'Medium',
      category: 'Infrastructure',
      title: 'North Tunnel Secondary Acoustic Scan',
      action: 'Run automated LiDAR deflection survey to confirm concrete ceiling stability.',
      rationale: 'Acoustic vibration anomaly detected at tunnel portal.',
      estimatedResolutionTime: '30 mins',
      status: 'Pending'
    }
  ],
  riskFactorBreakdown: [
    {
      name: 'Hydrological & Flood Severity',
      score: 84,
      weight: 0.35,
      impactDescription: 'Heavy rainfall (48.5 mm/h) and rising tidal surge threatening low-lying drainage canals.'
    },
    {
      name: 'Mobility & Arterial Gridlock',
      score: 81,
      weight: 0.25,
      impactDescription: 'Severe congestion index on Central Viaduct with ripple blockage on key evacuation routes.'
    },
    {
      name: 'Critical Infrastructure & Fire Hazard',
      score: 88,
      weight: 0.25,
      impactDescription: 'High-temperature industrial fire with toxic smoke drift in southern sector.'
    },
    {
      name: 'IoT Sensor Fleet Reliability',
      score: 32,
      weight: 0.15,
      impactDescription: '94% sensor online health, 1 offline sensor detected on Cesar Chavez overpass.'
    }
  ]
};
