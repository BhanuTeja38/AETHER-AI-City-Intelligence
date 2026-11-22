import React from 'react';
import { Radio, Sparkles, Play, ShieldAlert, Cpu } from 'lucide-react';
import { useCity } from '../../context/CityContext';
import { SimulationScenarioId } from '../../types';

export const DemoModeBanner: React.FC = () => {
  const { simulation, setSimulationScenario, startSimulation, pauseSimulation } = useCity();

  return (
    <div className="bg-gradient-to-r from-navy-900/90 via-navy-850/90 to-navy-900/90 border-y border-cyan-500/20 px-4 py-2 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 text-xs">
        <div className="flex items-center gap-2.5 flex-wrap justify-center md:justify-start">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-mono font-medium">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
            SIMULATED DEMO ENVIRONMENT
          </span>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <span className="text-slate-300 flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            Local Telemetry Engine: <span className="text-emerald-400 font-mono">Synced</span>
          </span>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <span className="text-slate-400 text-[11px]">
            No cloud API keys required. Realistic urban physics model running locally.
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-400 font-mono text-[11px] hidden lg:inline">Quick Scenario Inject:</span>
          
          {(['urban_flood', 'heavy_traffic', 'road_blockage', 'emergency_event'] as SimulationScenarioId[]).map((scenId) => {
            const labels: Record<string, string> = {
              urban_flood: 'Flood',
              heavy_traffic: 'Traffic Jam',
              road_blockage: 'Roadblock',
              emergency_event: 'HazMat Fire'
            };
            const isActive = simulation.activeScenario === scenId;
            return (
              <button
                key={scenId}
                onClick={() => {
                  setSimulationScenario(scenId);
                  if (!simulation.isRunning) startSimulation();
                }}
                className={`px-2 py-1 rounded text-[11px] font-mono transition-all border ${
                  isActive 
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-glow-cyan' 
                    : 'bg-navy-800 text-slate-400 border-slate-700 hover:text-slate-200 hover:border-slate-600'
                }`}
              >
                {isActive && <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 mr-1 animate-ping" />}
                {labels[scenId]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
