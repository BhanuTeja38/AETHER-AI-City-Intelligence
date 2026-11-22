import React, { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
import { 
  Incident, 
  IoTSensor, 
  AlertNotification, 
  SimulationScenarioId, 
  SimulationEventLog, 
  AiCityAnalysis, 
  MapLayerVisibility, 
  CityKpis, 
  IncidentStatus, 
  Severity 
} from '../types';
import { 
  INITIAL_INCIDENTS, 
  INITIAL_SENSORS, 
  INITIAL_ALERTS, 
  BASELINE_AI_ANALYSIS, 
  SIMULATION_SCENARIOS 
} from '../data/mockData';
import confetti from 'canvas-confetti';

interface CityContextType {
  incidents: Incident[];
  sensors: IoTSensor[];
  alerts: AlertNotification[];
  aiAnalysis: AiCityAnalysis;
  isAiAnalyzing: boolean;
  aiAnalysisStep: string;
  triggerAiAnalysis: () => Promise<void>;
  executeRecommendation: (recId: string) => void;
  
  // Incident & Sensor selection
  selectedIncident: Incident | null;
  selectedSensor: IoTSensor | null;
  setSelectedIncident: (inc: Incident | null) => void;
  setSelectedSensor: (sensor: IoTSensor | null) => void;
  updateIncidentStatus: (id: string, status: IncidentStatus) => void;
  addNewIncident: (newInc: Omit<Incident, 'id'>) => void;
  
  // Simulation
  simulation: {
    activeScenario: SimulationScenarioId;
    isRunning: boolean;
    speed: number;
    tick: number;
    eventLogs: SimulationEventLog[];
  };
  startSimulation: () => void;
  pauseSimulation: () => void;
  resumeSimulation: () => void;
  resetSimulation: () => void;
  setSimulationScenario: (scenario: SimulationScenarioId) => void;
  setSimulationSpeed: (speed: number) => void;
  
  // Alerts
  unreadAlertsCount: number;
  markAlertAsRead: (id: string) => void;
  clearAllAlerts: () => void;
  
  // Map layers
  mapLayers: MapLayerVisibility;
  toggleMapLayer: (layer: keyof MapLayerVisibility) => void;
  
  // KPIs & City
  kpis: CityKpis;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [sensors, setSensors] = useState<IoTSensor[]>(INITIAL_SENSORS);
  const [alerts, setAlerts] = useState<AlertNotification[]>(INITIAL_ALERTS);
  const [aiAnalysis, setAiAnalysis] = useState<AiCityAnalysis>(BASELINE_AI_ANALYSIS);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiAnalysisStep, setAiAnalysisStep] = useState('');
  
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [selectedSensor, setSelectedSensor] = useState<IoTSensor | null>(null);
  
  const [selectedCity, setSelectedCity] = useState('Neo-Metropolis (Metro Bay)');
  const [searchQuery, setSearchQuery] = useState('');

  // Map layer toggles
  const [mapLayers, setMapLayers] = useState<MapLayerVisibility>({
    floodZones: true,
    trafficCongestion: true,
    roadBlockages: true,
    emergencyIncidents: true,
    iotSensors: true,
    alternativeRoutes: true,
  });

  // Simulation State
  const [activeScenario, setActiveScenario] = useState<SimulationScenarioId>('baseline');
  const [isSimRunning, setIsSimRunning] = useState(false);
  const [simSpeed, setSimSpeed] = useState<number>(1);
  const [simTick, setSimTick] = useState(0);
  const [eventLogs, setEventLogs] = useState<SimulationEventLog[]>([
    {
      id: 'log-0',
      tick: 0,
      timestamp: new Date().toLocaleTimeString(),
      level: 'info',
      source: 'AETHER Kernel',
      message: 'Telemetry synchronization initialized. 24 sensor nodes reporting nominal intervals.'
    }
  ]);

  // Map layer toggle handler
  const toggleMapLayer = (layer: keyof MapLayerVisibility) => {
    setMapLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  // Alert handlers
  const markAlertAsRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, isRead: true } : a));
  };

  const clearAllAlerts = () => {
    setAlerts([]);
  };

  const unreadAlertsCount = useMemo(() => alerts.filter(a => !a.isRead).length, [alerts]);

  // Update incident status
  const updateIncidentStatus = (id: string, status: IncidentStatus) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === id) {
        return { ...inc, status };
      }
      return inc;
    }));

    // If status resolved, trigger celebration confetti
    if (status === 'Resolved') {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#00F0FF', '#10B981', '#38BDF8']
        });
      } catch (e) {
        // Safe fallback
      }
    }

    // Add to event logs
    setEventLogs(prev => [
      {
        id: `log-status-${Date.now()}`,
        tick: simTick,
        timestamp: new Date().toLocaleTimeString(),
        level: status === 'Resolved' ? 'success' : 'info',
        source: 'Incident Ops',
        message: `Incident ${id} updated to status [${status.toUpperCase()}].`
      },
      ...prev.slice(0, 49)
    ]);
  };

  // Add new incident
  const addNewIncident = (newInc: Omit<Incident, 'id'>) => {
    const newId = `INC-${Math.floor(2050 + Math.random() * 900)}`;
    const fullIncident: Incident = {
      ...newInc,
      id: newId,
    };
    setIncidents(prev => [fullIncident, ...prev]);

    // Create corresponding alert
    setAlerts(prev => [
      {
        id: `ALT-${Date.now()}`,
        type: newInc.category === 'Flood' ? 'Flood Warning' : 
              newInc.category === 'Traffic Congestion' ? 'Traffic Congestion' : 
              newInc.category === 'Road Blockage' ? 'Road Blockage' : 'Emergency Incident',
        title: `New Incident Reported: ${newInc.title}`,
        message: newInc.description,
        severity: newInc.severity,
        timestamp: 'Just now',
        isRead: false,
        relatedEntityId: newId,
        actionRequired: newInc.recommendedAction
      },
      ...prev
    ]);

    setEventLogs(prev => [
      {
        id: `log-new-${Date.now()}`,
        tick: simTick,
        timestamp: new Date().toLocaleTimeString(),
        level: 'warning',
        source: 'Public Safety Dispatch',
        message: `New incident registered: ${newId} (${newInc.category}) at ${newInc.locationName}.`
      },
      ...prev.slice(0, 49)
    ]);
  };

  // Calculate dynamic KPIs
  const kpis: CityKpis = useMemo(() => {
    const active = incidents.filter(i => i.status !== 'Resolved');
    const floodCount = active.filter(i => i.category === 'Flood').length;
    const roadBlockCount = active.filter(i => i.category === 'Road Blockage').length;
    const trafficIncidents = active.filter(i => i.category === 'Traffic Congestion');
    
    // Average traffic congestion percentage
    const avgCongestion = trafficIncidents.length > 0
      ? Math.round(trafficIncidents.reduce((sum, i) => sum + (i.impactMetrics.congestionPercentage || 65), 0) / trafficIncidents.length)
      : 48;

    const onlineSensors = sensors.filter(s => s.status !== 'Offline').length;
    const sensorHealth = Math.round((onlineSensors / sensors.length) * 100);

    // Compute dynamic city risk score (0 - 100)
    let score = 30; // base risk
    active.forEach(inc => {
      if (inc.severity === 'Critical') score += 16;
      else if (inc.severity === 'High') score += 10;
      else if (inc.severity === 'Moderate') score += 6;
      else score += 2;
    });

    const warningSensors = sensors.filter(s => s.status === 'Warning').length;
    score += warningSensors * 2;
    if (activeScenario !== 'baseline') score += 12;

    const clampedScore = Math.min(Math.max(score, 12), 98);

    return {
      activeIncidentsCount: active.length,
      floodRiskZonesCount: floodCount,
      trafficCongestionIndex: avgCongestion,
      roadBlockagesCount: roadBlockCount,
      connectedSensorsCount: onlineSensors,
      totalSensorsCount: sensors.length,
      cityRiskScore: clampedScore,
      sensorFleetHealthPercentage: sensorHealth
    };
  }, [incidents, sensors, activeScenario]);

  // Execute recommendation action
  const executeRecommendation = (recId: string) => {
    setAiAnalysis(prev => ({
      ...prev,
      recommendations: prev.recommendations.map(r => 
        r.id === recId ? { ...r, status: 'Executing' } : r
      )
    }));

    setEventLogs(prev => [
      {
        id: `log-exec-${Date.now()}`,
        tick: simTick,
        timestamp: new Date().toLocaleTimeString(),
        level: 'success',
        source: 'Autonomous AI Dispatch',
        message: `Recommendation ${recId} executed: Automated field team directives broadcasted.`
      },
      ...prev.slice(0, 49)
    ]);

    // After 2.5 seconds, set to completed
    setTimeout(() => {
      setAiAnalysis(prev => ({
        ...prev,
        recommendations: prev.recommendations.map(r => 
          r.id === recId ? { ...r, status: 'Completed' } : r
        )
      }));
    }, 2500);
  };

  // AI City Intelligence trigger
  const triggerAiAnalysis = async () => {
    setIsAiAnalyzing(true);
    setAiAnalysisStep('Ingesting 24 IoT telemetry streams & spatial vectors...');
    
    await new Promise(r => setTimeout(r, 700));
    setAiAnalysisStep('Cross-referencing civil infrastructure bottlenecks & incident clusters...');
    
    await new Promise(r => setTimeout(r, 800));
    setAiAnalysisStep('Computing neural multi-agency dispatch & traffic diversion topologies...');

    await new Promise(r => setTimeout(r, 600));
    setAiAnalysisStep('Synthesizing executive contingency recommendations...');

    await new Promise(r => setTimeout(r, 500));

    // Dynamic generation based on current state
    const currentScore = kpis.cityRiskScore;
    const severityClassification: Severity = 
      currentScore >= 80 ? 'Critical' :
      currentScore >= 65 ? 'High' :
      currentScore >= 45 ? 'Moderate' : 'Low';

    const activeList = incidents.filter(i => i.status !== 'Resolved');
    const dynamicDistricts = Array.from(new Set(activeList.map(i => i.locationName))).slice(0, 5);

    const generatedAnalysis: AiCityAnalysis = {
      analyzedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      riskScore: currentScore,
      riskClassification: severityClassification,
      situationSummary: `AETHER AI Engine synthesized data across ${sensors.length} sensors and ${activeList.length} active urban incidents. Multi-vector stress detected in ${dynamicDistricts.slice(0, 2).join(' and ')}, presenting a composite threat level of ${severityClassification.toUpperCase()} (${currentScore}/100).`,
      affectedDistricts: dynamicDistricts.length > 0 ? dynamicDistricts : ['Downtown Financial Core', 'South Canal Basin'],
      potentialImpact: {
        traffic: `Estimated arterial delay indexed at ${Math.round(currentScore * 0.55)} minutes across main outbound expressways. Secondary queue accumulation imminent.`,
        citizens: `Approximately ${(activeList.length * 4800).toLocaleString()} residents residing within active alert radii or detour perimeters.`,
        infrastructure: activeScenario === 'urban_flood' 
          ? 'Drainage culverts and sluice valves experiencing near-capacity hydrostatic pressure.' 
          : 'High electrical load combined with arterial congestion stressing central service grid.',
        emergencyServices: `${Math.min(95, 45 + activeList.length * 10)}% of primary response crews engaged in containment and traffic triage.`
      },
      priorityActions: [
        'Prioritize automated perimeter isolation on highest severity incident vectors.',
        'Synchronize arterial traffic signal cycles along designated diversion bypasses.',
        'Activate real-time public guidance broadcasts across civic mobile notification hubs.',
        'Command UAV drone swarm for continuous photogrammetry and damage assessment.'
      ],
      recommendations: [
        {
          id: `REC-${Math.floor(10 + Math.random() * 89)}`,
          priority: currentScore > 75 ? 'Immediate' : 'High',
          category: activeScenario === 'urban_flood' ? 'Flood' : 'Public Safety',
          title: activeScenario === 'urban_flood' 
            ? 'Deploy Modular Barrier Wall & Auxiliary Sump Pumps' 
            : 'Autonomous Emergency Corridor Clearance',
          action: 'Lock high-priority emergency transit corridor; engage automated barrier gates.',
          rationale: `Telemetry spike correlates with active scenario ${activeScenario.toUpperCase()} risk profile.`,
          estimatedResolutionTime: '12 mins',
          status: 'Pending'
        },
        {
          id: `REC-${Math.floor(20 + Math.random() * 79)}`,
          priority: 'High',
          category: 'Traffic Congestion',
          title: 'Adaptive Green Wave Signal Timing Override',
          action: 'Extend outbound arterial green windows by 55 seconds across adjacent bypass nodes.',
          rationale: 'Mitigates queue propagation into secondary residential districts.',
          estimatedResolutionTime: '6 mins',
          status: 'Pending'
        },
        {
          id: `REC-${Math.floor(30 + Math.random() * 69)}`,
          priority: 'Medium',
          category: 'Infrastructure',
          title: 'IoT Sensor Mesh Diagnostic & Heartbeat Calibration',
          action: 'Run frequency sweep on battery-low and warning sensor nodes to ensure fault resilience.',
          rationale: 'Maintains 99.8% precision telemetry during escalating urban event cycles.',
          estimatedResolutionTime: '20 mins',
          status: 'Pending'
        }
      ],
      riskFactorBreakdown: [
        {
          name: 'Hydrological & Environmental Hazard',
          score: activeScenario === 'urban_flood' ? 92 : 68,
          weight: 0.35,
          impactDescription: 'Water levels and stormwater saturation across canal basins and lowlands.'
        },
        {
          name: 'Urban Mobility & Gridlock Factor',
          score: activeScenario === 'heavy_traffic' ? 95 : 74,
          weight: 0.25,
          impactDescription: 'Arterial expressway throughput degradation and bottleneck clustering.'
        },
        {
          name: 'Critical Infrastructure & Public Safety',
          score: activeScenario === 'emergency_event' ? 96 : 70,
          weight: 0.25,
          impactDescription: 'Structural integrity, fire hazard hotspots, and toxic plume perimeters.'
        },
        {
          name: 'IoT Sensor Mesh Health & Telemetry Precision',
          score: 28,
          weight: 0.15,
          impactDescription: 'Sensor connectivity, threshold warnings, and battery longevity metrics.'
        }
      ]
    };

    setAiAnalysis(generatedAnalysis);
    setIsAiAnalyzing(false);
    setAiAnalysisStep('');
  };

  // Simulation controls
  const startSimulation = () => {
    setIsSimRunning(true);
    setEventLogs(prev => [
      {
        id: `log-sim-start-${Date.now()}`,
        tick: simTick,
        timestamp: new Date().toLocaleTimeString(),
        level: 'info',
        source: 'Simulation Kernel',
        message: `Simulation started under scenario [${activeScenario.toUpperCase()}] at ${simSpeed}x speed.`
      },
      ...prev.slice(0, 49)
    ]);
  };

  const pauseSimulation = () => {
    setIsSimRunning(false);
    setEventLogs(prev => [
      {
        id: `log-sim-pause-${Date.now()}`,
        tick: simTick,
        timestamp: new Date().toLocaleTimeString(),
        level: 'info',
        source: 'Simulation Kernel',
        message: `Simulation paused at tick ${simTick}.`
      },
      ...prev.slice(0, 49)
    ]);
  };

  const resumeSimulation = () => {
    setIsSimRunning(true);
  };

  const resetSimulation = () => {
    setIsSimRunning(false);
    setSimTick(0);
    setActiveScenario('baseline');
    setIncidents(INITIAL_INCIDENTS);
    setSensors(INITIAL_SENSORS);
    setAlerts(INITIAL_ALERTS);
    setAiAnalysis(BASELINE_AI_ANALYSIS);
    setEventLogs([
      {
        id: `log-reset-${Date.now()}`,
        tick: 0,
        timestamp: new Date().toLocaleTimeString(),
        level: 'info',
        source: 'Simulation Kernel',
        message: 'City state reset to baseline benchmark. All parameters stabilized.'
      }
    ]);
  };

  const setSimulationScenario = (scenario: SimulationScenarioId) => {
    setActiveScenario(scenario);
    setSimTick(0);
    const scenMeta = SIMULATION_SCENARIOS.find(s => s.id === scenario);

    setEventLogs(prev => [
      {
        id: `log-scenario-${Date.now()}`,
        tick: 0,
        timestamp: new Date().toLocaleTimeString(),
        level: 'warning',
        source: 'Scenario Controller',
        message: `Scenario switched to [${scenMeta?.name || scenario}]. Telemetry dynamics updated.`
      },
      ...prev.slice(0, 49)
    ]);

    // Apply immediate scenario influence to incidents and sensors
    if (scenario === 'urban_flood') {
      setSensors(prev => prev.map(s => {
        if (s.type === 'Water Level') {
          return { ...s, currentReading: Number((s.currentReading + 0.6).toFixed(2)), status: 'Warning' };
        }
        if (s.type === 'Rainfall') {
          return { ...s, currentReading: Number((s.currentReading + 25).toFixed(1)), status: 'Warning' };
        }
        return s;
      }));

      setIncidents(prev => prev.map(i => {
        if (i.category === 'Flood') {
          return { ...i, severity: 'Critical', affectedRadiusMeters: 550, impactMetrics: { ...i.impactMetrics, floodDepthCm: 68 } };
        }
        return i;
      }));
    } else if (scenario === 'heavy_traffic') {
      setSensors(prev => prev.map(s => {
        if (s.type === 'Traffic Density') {
          return { ...s, currentReading: Math.min(98, s.currentReading + 18), status: 'Warning' };
        }
        return s;
      }));

      setIncidents(prev => prev.map(i => {
        if (i.category === 'Traffic Congestion') {
          return { ...i, severity: 'Critical', affectedRadiusMeters: 480, impactMetrics: { ...i.impactMetrics, trafficDelayMinutes: 58 } };
        }
        return i;
      }));
    } else if (scenario === 'road_blockage') {
      setSensors(prev => prev.map(s => {
        if (s.type === 'Road Blockage') {
          return { ...s, currentReading: Math.min(95, s.currentReading + 22), status: 'Warning' };
        }
        return s;
      }));
    } else if (scenario === 'emergency_event') {
      setSensors(prev => prev.map(s => {
        if (s.type === 'Emergency Acoustic/Optical') {
          return { ...s, currentReading: s.currentReading + 45, status: 'Warning' };
        }
        return s;
      }));

      setIncidents(prev => prev.map(i => {
        if (i.category === 'Emergency') {
          return { ...i, severity: 'Critical', affectedRadiusMeters: 750 };
        }
        return i;
      }));
    }
  };

  const setSimulationSpeed = (speed: number) => {
    setSimSpeed(speed);
  };

  // Simulation tick loop (runs every 2 seconds when active, adjusted by speed)
  useEffect(() => {
    if (!isSimRunning) return;

    const intervalTime = Math.max(500, Math.round(2000 / simSpeed));
    const timer = setInterval(() => {
      setSimTick(prev => prev + 1);

      // Mutate sensor readings realistically
      setSensors(prevSensors => {
        return prevSensors.map(sensor => {
          let delta = (Math.random() - 0.48) * 0.05; // tiny organic fluctuation
          let nextVal = sensor.currentReading;

          if (activeScenario === 'urban_flood' && (sensor.type === 'Water Level' || sensor.type === 'Rainfall')) {
            delta = Math.random() * 0.08 + 0.02;
            nextVal = Number((sensor.currentReading + delta).toFixed(2));
          } else if (activeScenario === 'heavy_traffic' && sensor.type === 'Traffic Density') {
            delta = Math.random() * 2 + 0.5;
            nextVal = Math.min(99, Math.round(sensor.currentReading + delta));
          } else if (activeScenario === 'road_blockage' && sensor.type === 'Road Blockage') {
            delta = (Math.random() - 0.3) * 1.5;
            nextVal = Math.min(99, Math.round(sensor.currentReading + delta));
          } else if (activeScenario === 'emergency_event' && sensor.type === 'Emergency Acoustic/Optical') {
            delta = Math.random() * 3 + 1;
            nextVal = Math.round(sensor.currentReading + delta);
          } else {
            // Baseline organic drift
            if (sensor.unit === 'meters') {
              nextVal = Number(Math.max(0.5, sensor.currentReading + (Math.random() - 0.5) * 0.02).toFixed(2));
            } else if (sensor.unit.includes('%') || sensor.unit.includes('index')) {
              nextVal = Math.min(100, Math.max(10, Math.round(sensor.currentReading + (Math.random() - 0.5) * 3)));
            } else {
              nextVal = Number(Math.max(5, sensor.currentReading + (Math.random() - 0.5) * 1.5).toFixed(1));
            }
          }

          const isWarning = nextVal >= sensor.warningThreshold;
          const status = sensor.status === 'Offline' ? 'Offline' : (isWarning ? 'Warning' : 'Online');

          // Append to history
          const updatedHistory = [
            ...sensor.readingHistory.slice(-9),
            { timestamp: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }), value: nextVal }
          ];

          return {
            ...sensor,
            currentReading: nextVal,
            status,
            lastUpdateTime: 'Just now',
            readingHistory: updatedHistory,
          };
        });
      });

      // Periodically generate simulated radio event log
      const randomRadioEvent = Math.random();
      if (randomRadioEvent > 0.65) {
        const events = [
          { src: 'Canal Hydro-Telemetry', msg: 'Retention pump relay cycling at 92% continuous duty.' },
          { src: 'Traffic Drone #8', msg: 'Potrero Ave diversion clearing slow queue; velocity +14 km/h.' },
          { src: 'Structural Sentinel Mesh', msg: 'Micro-seismic vibration stable within safe tolerance margins.' },
          { src: 'Civil Emergency Net', msg: 'HazMat drone reports boundary particulate containment holding steady.' },
          { src: 'Acoustic Triangulation', msg: 'Urban ambient acoustic levels normalized at 67 dBA.' }
        ];
        const pick = events[Math.floor(Math.random() * events.length)];
        setEventLogs(prev => [
          {
            id: `log-auto-${Date.now()}`,
            tick: simTick + 1,
            timestamp: new Date().toLocaleTimeString(),
            level: 'info',
            source: pick.src,
            message: pick.msg
          },
          ...prev.slice(0, 49)
        ]);
      }

    }, intervalTime);

    return () => clearInterval(timer);
  }, [isSimRunning, simSpeed, activeScenario, simTick]);

  return (
    <CityContext.Provider value={{
      incidents,
      sensors,
      alerts,
      aiAnalysis,
      isAiAnalyzing,
      aiAnalysisStep,
      triggerAiAnalysis,
      executeRecommendation,
      selectedIncident,
      selectedSensor,
      setSelectedIncident,
      setSelectedSensor,
      updateIncidentStatus,
      addNewIncident,
      simulation: {
        activeScenario,
        isRunning: isSimRunning,
        speed: simSpeed,
        tick: simTick,
        eventLogs,
      },
      startSimulation,
      pauseSimulation,
      resumeSimulation,
      resetSimulation,
      setSimulationScenario,
      setSimulationSpeed,
      unreadAlertsCount,
      markAlertAsRead,
      clearAllAlerts,
      mapLayers,
      toggleMapLayer,
      kpis,
      selectedCity,
      setSelectedCity,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
};
