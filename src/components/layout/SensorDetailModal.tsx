import React from 'react';
import { X, Battery, Wifi, Activity, AlertTriangle, Clock, MapPin } from 'lucide-react';
import { useCity } from '../../context/CityContext';
import { Badge } from '../common/Badge';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const SensorDetailModal: React.FC = () => {
  const { selectedSensor, setSelectedSensor } = useCity();

  if (!selectedSensor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="glass-panel w-full max-w-xl rounded-2xl border border-cyan-500/30 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-start justify-between bg-navy-900/60">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                {selectedSensor.id}
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-navy-800 text-slate-300 border border-slate-700">
                {selectedSensor.type}
              </span>
              <Badge type="sensorStatus" value={selectedSensor.status} withPulse />
            </div>
            <h2 className="text-lg font-bold text-white">
              {selectedSensor.name}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{selectedSensor.locationName}</span>
              <span>•</span>
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Last update: {selectedSensor.lastUpdateTime}</span>
            </div>
          </div>

          <button
            onClick={() => setSelectedSensor(null)}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Key telemetry stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-navy-900/70 border border-slate-800">
              <div className="text-xs text-slate-400 font-mono">Current Reading</div>
              <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">
                {selectedSensor.currentReading}
                <span className="text-xs text-slate-400 ml-1 font-normal">{selectedSensor.unit}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-navy-900/70 border border-slate-800">
              <div className="text-xs text-slate-400 font-mono flex items-center gap-1">
                <Battery className="w-3 h-3 text-emerald-400" />
                Battery Level
              </div>
              <div className={`text-2xl font-bold font-mono mt-1 ${
                selectedSensor.batteryLevel > 50 ? 'text-emerald-400' : 
                selectedSensor.batteryLevel > 20 ? 'text-amber-400' : 'text-red-400'
              }`}>
                {selectedSensor.batteryLevel}%
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-navy-900/70 border border-slate-800">
              <div className="text-xs text-slate-400 font-mono flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-400" />
                Thresholds
              </div>
              <div className="text-xs font-mono text-slate-300 mt-1.5 space-y-0.5">
                <div>Warn: <span className="text-amber-400 font-bold">{selectedSensor.warningThreshold}</span></div>
                <div>Crit: <span className="text-red-400 font-bold">{selectedSensor.criticalThreshold}</span></div>
              </div>
            </div>
          </div>

          {/* Historical readings chart */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                Real-Time Telemetry Stream
              </h4>
              <span className="text-[11px] font-mono text-cyan-400">Live 10-cycle interval</span>
            </div>

            <div className="h-44 w-full bg-navy-900/80 border border-slate-800/80 rounded-xl p-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={selectedSensor.readingHistory}>
                  <defs>
                    <linearGradient id="sensorStreamGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#00F0FF" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="timestamp" 
                    stroke="#475569" 
                    fontSize={10} 
                    tickLine={false} 
                  />
                  <YAxis 
                    stroke="#475569" 
                    fontSize={10} 
                    tickLine={false} 
                    domain={['auto', 'auto']}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0D1326', 
                      borderColor: '#00F0FF', 
                      borderRadius: '8px', 
                      fontSize: '11px' 
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#00F0FF" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#sensorStreamGrad)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Telemetry metadata */}
          <div className="p-3 rounded-lg bg-navy-900/50 border border-slate-800 text-xs text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Geo-Coordinates:</span>
              <span className="font-mono text-slate-300">{selectedSensor.coordinates.lat.toFixed(4)}, {selectedSensor.coordinates.lng.toFixed(4)}</span>
            </div>
            <div className="flex justify-between">
              <span>Sensor Mesh Protocol:</span>
              <span className="font-mono text-emerald-400">LoRaWAN LPWAN (915MHz) Encrypted</span>
            </div>
            <div className="flex justify-between">
              <span>Telemetry Calibration:</span>
              <span className="font-mono text-slate-300">ISO-9001 Self-Calibrated (0.02% margin)</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-navy-900/70 flex justify-end">
          <button
            onClick={() => setSelectedSensor(null)}
            className="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-medium text-xs font-mono transition-colors border border-cyan-500/40"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
