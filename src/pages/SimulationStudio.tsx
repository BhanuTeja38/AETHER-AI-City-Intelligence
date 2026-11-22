import React from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  FastForward, 
  Droplets, 
  Car, 
  AlertOctagon, 
  Flame, 
  Radio, 
  Clock, 
  ShieldAlert, 
  Activity, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Cpu,
  Sparkles
} from 'lucide-react';
import { useCity } from '../context/CityContext';
import { SIMULATION_SCENARIOS } from '../data/mockData';
import { SimulationScenarioId } from '../types';
import { KpiCard } from '../components/common/KpiCard';

export const SimulationStudio: React.FC = () => {
  const { 
    simulation, 
    startSimulation, 
    pauseSimulation, 
    resumeSimulation, 
    resetSimulation, 
    setSimulationScenario, 
    setSimulationSpeed,
    kpis,
    sensors,
    incidents 
  } = useCity();

  const getScenarioIcon = (id: SimulationScenarioId) => {
    switch (id) {
      case 'urban_flood': return Droplets;
      case 'heavy_traffic': return Car;
      case 'road_blockage': return AlertOctagon;
      case 'emergency_event': return Flame;
      default: return Activity;
    }
  };

  const activeScenarioMeta = SIMULATION_SCENARIOS.find(s => s.id === simulation.activeScenario);

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
              Urban Physics Emulator
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Engine Status:{' '}
              <span className={`font-bold ${simulation.isRunning ? 'text-emerald-400 animate-pulse' : 'text-slate-400'}`}>
                {simulation.isRunning ? 'Ticking Live' : 'Suspended'}
              </span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
            Dynamic City Scenario Simulation Studio
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Test urban resilience, flood gate automation, detour bypasses, and emergency responses under crisis stress
          </p>
        </div>

        {/* Master Control Bar */}
        <div className="glass-panel p-2 rounded-2xl border border-cyan-500/30 flex items-center gap-2 shadow-2xl flex-wrap">
          {!simulation.isRunning ? (
            <button
              onClick={startSimulation}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-bold text-xs font-mono transition-all flex items-center gap-1.5 shadow-glow-cyan"
            >
              <Play className="w-4 h-4 fill-navy-950" />
              <span>{simulation.tick > 0 ? 'Resume' : 'Start Simulation'}</span>
            </button>
          ) : (
            <button
              onClick={pauseSimulation}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-xs font-mono transition-all flex items-center gap-1.5"
            >
              <Pause className="w-4 h-4 fill-navy-950" />
              <span>Pause</span>
            </button>
          )}

          <button
            onClick={resetSimulation}
            className="px-3.5 py-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-300 font-mono text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
            title="Reset to Baseline City State"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>

          {/* Speed Selectors */}
          <div className="flex items-center gap-1 pl-2 border-l border-slate-800 text-xs font-mono">
            {[1, 2, 5].map((spd) => (
              <button
                key={spd}
                onClick={() => setSimulationSpeed(spd)}
                className={`px-2 py-1 rounded-lg transition-colors border ${
                  simulation.speed === spd 
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold' 
                    : 'bg-navy-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Simulation KPIs Ticker */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard
          title="Elapsed Sim Cycles"
          value={`T+${simulation.tick}`}
          subtitle={`${Math.round(simulation.tick * 2)} simulated seconds`}
          icon={Clock}
          variant="cyan"
        />
        <KpiCard
          title="Active Scenario"
          value={activeScenarioMeta ? activeScenarioMeta.name.split(' ')[0] : 'Baseline'}
          subtitle={activeScenarioMeta ? activeScenarioMeta.targetFocus : 'Standard city equilibrium'}
          icon={Activity}
          variant="blue"
        />
        <KpiCard
          title="Current Risk Peak"
          value={`${kpis.cityRiskScore}/100`}
          subtitle={`Scenario target: ~${activeScenarioMeta?.expectedRiskPeak || 50}`}
          icon={ShieldAlert}
          variant={kpis.cityRiskScore > 75 ? 'red' : 'amber'}
          glow={kpis.cityRiskScore > 75}
        />
        <KpiCard
          title="Sensors in Alert"
          value={sensors.filter(s => s.status === 'Warning').length}
          subtitle={`Across ${sensors.length} total nodes`}
          icon={Cpu}
          variant="purple"
        />
      </div>

      {/* 4 Interactive Scenario Cards */}
      <div>
        <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          Select Urban Crisis Scenario
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SIMULATION_SCENARIOS.map((scenario) => {
            const Icon = getScenarioIcon(scenario.id);
            const isSelected = simulation.activeScenario === scenario.id;

            return (
              <div
                key={scenario.id}
                onClick={() => {
                  setSimulationScenario(scenario.id);
                  if (!simulation.isRunning) startSimulation();
                }}
                className={`glass-panel rounded-2xl p-5 border transition-all cursor-pointer group flex flex-col justify-between ${
                  isSelected 
                    ? 'border-cyan-400 bg-cyan-950/20 shadow-glow-cyan -translate-y-1' 
                    : 'border-slate-800 hover:border-cyan-500/40 hover:-translate-y-0.5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl border ${
                      isSelected ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400' : 'bg-navy-900 text-slate-400 border-slate-800'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {isSelected ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400 animate-pulse">
                        ACTIVE RUNNER
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500">
                        Peak: {scenario.expectedRiskPeak}
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {scenario.name}
                  </h4>

                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {scenario.description}
                  </p>

                  <div className="mt-3 p-2 rounded-lg bg-navy-950/80 border border-slate-800/80 text-[11px] font-mono text-slate-400">
                    <span className="text-cyan-400">Telemetry Target:</span> {scenario.targetFocus}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Duration: ~{scenario.simulatedDurationMinutes}m</span>
                  <span className={`flex items-center gap-1 ${isSelected ? 'text-cyan-300 font-bold' : 'text-slate-500 group-hover:text-slate-300'}`}>
                    {isSelected ? 'Simulating' : 'Deploy Scenario'} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulation Timeline & Radio Dispatch Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline Visualization (1 col) */}
        <div className="glass-panel rounded-2xl p-6 border border-cyan-500/20 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-1">
              Simulation Phasing & Trajectory
            </h3>
            <p className="text-xs text-slate-400 font-mono mb-4">
              Step-by-step crisis escalation progression
            </p>

            <div className="space-y-4 relative pl-4 border-l border-cyan-500/30">
              <div className="relative">
                <span className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-navy-950 ${
                  simulation.tick >= 0 ? 'bg-cyan-400 ring-2 ring-cyan-400/50' : 'bg-slate-700'
                }`} />
                <div className="text-xs font-mono font-bold text-white">Phase 1: Initial Trigger</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Hydrological / congestion anomaly detected.</div>
              </div>

              <div className="relative">
                <span className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-navy-950 ${
                  simulation.tick >= 5 ? 'bg-cyan-400 ring-2 ring-cyan-400/50' : 'bg-slate-700'
                }`} />
                <div className="text-xs font-mono font-bold text-white">Phase 2: Arterial Propagation</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Sensor thresholds breached; warning alerts dished.</div>
              </div>

              <div className="relative">
                <span className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-navy-950 ${
                  simulation.tick >= 12 ? 'bg-red-400 ring-2 ring-red-400/50' : 'bg-slate-700'
                }`} />
                <div className="text-xs font-mono font-bold text-white">Phase 3: Peak Crisis Saturation</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Emergency teams deployed; bypass routes active.</div>
              </div>

              <div className="relative">
                <span className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-navy-950 ${
                  simulation.tick >= 25 ? 'bg-emerald-400 ring-2 ring-emerald-400/50' : 'bg-slate-700'
                }`} />
                <div className="text-xs font-mono font-bold text-white">Phase 4: Stabilization & Clearance</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Pump drawdown & traffic clearing restored.</div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>Tick Interval: {Math.round(2000 / simulation.speed)}ms</span>
            <span className="text-cyan-400">Step {simulation.tick % 30}/30</span>
          </div>
        </div>

        {/* Real-Time Scenario Dispatch Log (2 cols) */}
        <div className="glass-panel rounded-2xl p-6 border border-cyan-500/20 lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
                <h3 className="text-base font-bold text-white">Real-Time Simulation Event Log</h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                {simulation.eventLogs.length} Events Logged
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mb-4">
              Autonomous telemetry telemetry transmissions, public safety radio logs, and AI actuators
            </p>

            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-2">
              {simulation.eventLogs.map((log) => (
                <div
                  key={log.id}
                  className={`p-3 rounded-xl border text-xs transition-colors ${
                    log.level === 'critical' ? 'bg-red-950/20 border-red-500/40 text-red-300' :
                    log.level === 'warning' ? 'bg-amber-950/20 border-amber-500/40 text-amber-300' :
                    log.level === 'success' ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300' :
                    'bg-navy-900/60 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                    <span className="font-bold text-cyan-400">{log.source}</span>
                    <span className="text-slate-500">{log.timestamp} • [T+{log.tick}]</span>
                  </div>
                  <p className="leading-relaxed">{log.message}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono">Live event ring buffer: 50 items capacity</span>
            <span className="text-cyan-400 font-mono">Stream Synchronized</span>
          </div>
        </div>
      </div>
    </div>
  );
};
