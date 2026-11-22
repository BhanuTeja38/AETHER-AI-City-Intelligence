import React, { useState, useMemo } from 'react';
import { 
  Cpu, 
  Battery, 
  Activity, 
  AlertTriangle, 
  Droplets, 
  CloudRain, 
  Car, 
  AlertOctagon, 
  Flame, 
  Search, 
  Filter, 
  Radio, 
  Wifi, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MapPin, 
  ArrowRight,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import { useCity } from '../context/CityContext';
import { Badge } from '../components/common/Badge';
import { KpiCard } from '../components/common/KpiCard';
import { IoTSensor, SensorType, SensorStatus } from '../types';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export const SensorMonitoring: React.FC = () => {
  const { sensors, setSelectedSensor, simulation } = useCity();

  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Fleet stats
  const totalSensors = sensors.length;
  const onlineSensors = sensors.filter(s => s.status === 'Online').length;
  const warningSensors = sensors.filter(s => s.status === 'Warning').length;
  const offlineSensors = sensors.filter(s => s.status === 'Offline').length;
  const healthPercentage = Math.round((onlineSensors / totalSensors) * 100);

  // Filtered list
  const filteredSensors = useMemo(() => {
    return sensors.filter(sensor => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches = 
          sensor.id.toLowerCase().includes(q) ||
          sensor.name.toLowerCase().includes(q) ||
          sensor.locationName.toLowerCase().includes(q) ||
          sensor.type.toLowerCase().includes(q);
        if (!matches) return false;
      }

      if (selectedType !== 'All' && sensor.type !== selectedType) return false;
      if (selectedStatus !== 'All' && sensor.status !== selectedStatus) return false;

      return true;
    });
  }, [sensors, searchQuery, selectedType, selectedStatus]);

  const getSensorIcon = (type: SensorType) => {
    switch (type) {
      case 'Water Level': return Droplets;
      case 'Rainfall': return CloudRain;
      case 'Traffic Density': return Car;
      case 'Road Blockage': return AlertOctagon;
      case 'Emergency Acoustic/Optical': return Flame;
      default: return Cpu;
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto pb-16">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
              Telemetry Grid
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Mesh Protocol: <span className="text-emerald-400 font-bold">LoRa LPWAN 915MHz</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
            Smart City IoT Sensor Monitoring Fleet
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time multi-spectral sensor telemetry mesh with dynamic threshold alert processing
          </p>
        </div>

        {/* Live Simulation Ticking Pill */}
        <div className="flex items-center gap-2 self-start md:self-center">
          <div className="glass-panel px-3.5 py-2 rounded-xl border border-cyan-500/30 flex items-center gap-2 text-xs font-mono text-cyan-300">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Telemetry Ingestion: <span className="text-white font-bold">{simulation.isRunning ? 'Active Stream' : 'Stationary'}</span></span>
          </div>
        </div>
      </div>

      {/* IoT Fleet KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <KpiCard
          title="Total Sensors"
          value={totalSensors}
          subtitle="24 Active Mesh Nodes"
          icon={Cpu}
          variant="cyan"
        />
        <KpiCard
          title="Online Sensors"
          value={onlineSensors}
          subtitle="Nominal Heartbeat"
          icon={CheckCircle2}
          variant="emerald"
        />
        <KpiCard
          title="Warning Sensors"
          value={warningSensors}
          subtitle="Threshold Exceeded"
          icon={AlertTriangle}
          variant="amber"
          glow={warningSensors > 0}
        />
        <KpiCard
          title="Offline Nodes"
          value={offlineSensors}
          subtitle="Maintenance Required"
          icon={XCircle}
          variant="purple"
        />
        <KpiCard
          title="Fleet Health"
          value={`${healthPercentage}%`}
          subtitle="Precision Tolerance"
          icon={Activity}
          variant="blue"
        />
        <KpiCard
          title="Telemetry Cycles"
          value={`T+${simulation.tick}`}
          subtitle={`${simulation.speed}x Ingest Speed`}
          icon={RefreshCw}
          variant="cyan"
        />
      </div>

      {/* Simulated Hardware Disclaimer Banner */}
      <div className="p-3.5 rounded-xl bg-navy-900/80 border border-slate-800 text-xs text-slate-400 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            ℹ️
          </span>
          <span>
            <strong className="text-slate-200">Demonstration Architecture Notice:</strong> IoT telemetry is dynamically modeled via the local mathematical physics engine. Real-world edge hardware (MQTT/REST/CoAP) connects via standard API abstraction adapters.
          </span>
        </div>
        <span className="font-mono text-cyan-400 text-[11px] shrink-0 hidden sm:inline">
          Ready for Hardware Hook
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-cyan-500/20 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search sensors by ID, location, or telemetry type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-navy-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
          />
        </div>

        {/* Filter by Type */}
        <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-cyan-400"
          >
            <option value="All">All Sensor Types</option>
            <option value="Water Level">Water Level (m)</option>
            <option value="Rainfall">Rainfall (mm/h)</option>
            <option value="Traffic Density">Traffic Density (%)</option>
            <option value="Road Blockage">Road Blockage</option>
            <option value="Emergency Acoustic/Optical">Emergency / Hazards</option>
          </select>

          {/* Filter by Status */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-cyan-400"
          >
            <option value="All">All Connection States</option>
            <option value="Online">Online Only</option>
            <option value="Warning">Warning (Threshold Crossed)</option>
            <option value="Offline">Offline Only</option>
          </select>
        </div>
      </div>

      {/* Sensor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSensors.map((sensor) => {
          const Icon = getSensorIcon(sensor.type);
          const isWarning = sensor.status === 'Warning';
          const isOffline = sensor.status === 'Offline';

          return (
            <div
              key={sensor.id}
              onClick={() => setSelectedSensor(sensor)}
              className={`glass-panel rounded-2xl p-5 border transition-all cursor-pointer hover:-translate-y-1 group flex flex-col justify-between ${
                isWarning 
                  ? 'border-amber-500/40 bg-amber-950/10 shadow-glow-amber' 
                  : isOffline 
                    ? 'border-slate-800 opacity-60 hover:opacity-100' 
                    : 'border-slate-800 hover:border-cyan-500/40'
              }`}
            >
              <div>
                {/* Card Top: ID & Badges */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg border ${
                      isWarning ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                      isOffline ? 'bg-slate-800 text-slate-400 border-slate-700' :
                      'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-mono text-xs font-bold text-cyan-400">{sensor.id}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{sensor.type}</div>
                    </div>
                  </div>

                  <Badge type="sensorStatus" value={sensor.status} size="sm" withPulse={isWarning} />
                </div>

                {/* Name & Location */}
                <h3 className="text-sm font-bold text-white mt-3 group-hover:text-cyan-300 transition-colors">
                  {sensor.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                  <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span className="truncate">{sensor.locationName}</span>
                </div>

                {/* Reading display */}
                <div className="mt-4 p-3 rounded-xl bg-navy-950/80 border border-slate-800/80 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-mono block">Current Metric</span>
                    <div className={`text-2xl font-bold font-mono ${
                      isWarning ? 'text-amber-400' : isOffline ? 'text-slate-500' : 'text-cyan-300'
                    }`}>
                      {sensor.currentReading} <span className="text-xs font-normal text-slate-400">{sensor.unit}</span>
                    </div>
                  </div>

                  <div className="text-right text-[11px] font-mono text-slate-400 space-y-0.5">
                    <div>Warn: <span className="text-amber-400 font-bold">{sensor.warningThreshold}</span></div>
                    <div>Crit: <span className="text-red-400 font-bold">{sensor.criticalThreshold}</span></div>
                  </div>
                </div>

                {/* Live Sparkline preview */}
                <div className="h-16 w-full mt-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sensor.readingHistory}>
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke={isWarning ? '#F59E0B' : '#00F0FF'} 
                        strokeWidth={2} 
                        dot={false} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Battery className={`w-3.5 h-3.5 ${sensor.batteryLevel > 50 ? 'text-emerald-400' : 'text-amber-400'}`} />
                  {sensor.batteryLevel}% Battery
                </span>
                <span className="text-cyan-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Telemetry Stream <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
