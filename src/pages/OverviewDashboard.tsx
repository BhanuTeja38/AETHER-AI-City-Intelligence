import React from 'react';
import { 
  AlertTriangle, 
  Droplets, 
  Car, 
  ShieldAlert, 
  Cpu, 
  TrendingUp, 
  BrainCircuit, 
  Sparkles, 
  Activity, 
  ArrowRight, 
  Play, 
  Radio, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Layers,
  Flame,
  AlertOctagon
} from 'lucide-react';
import { useCity } from '../context/CityContext';
import { KpiCard } from '../components/common/KpiCard';
import { Badge } from '../components/common/Badge';
import { DemoModeBanner } from '../components/common/DemoModeBanner';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  LineChart, 
  Line 
} from 'recharts';
import { NavPage } from '../components/layout/Sidebar';

interface OverviewDashboardProps {
  onNavigate: (page: NavPage) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({ onNavigate }) => {
  const { 
    kpis, 
    incidents, 
    sensors, 
    alerts, 
    aiAnalysis, 
    triggerAiAnalysis, 
    isAiAnalyzing, 
    setSelectedIncident, 
    setSelectedSensor,
    simulation,
    startSimulation
  } = useCity();

  // Category breakdown for chart
  const categoryData = [
    { name: 'Flood', count: incidents.filter(i => i.category === 'Flood').length, fill: '#38BDF8' },
    { name: 'Traffic', count: incidents.filter(i => i.category === 'Traffic Congestion').length, fill: '#F59E0B' },
    { name: 'Road Block', count: incidents.filter(i => i.category === 'Road Blockage').length, fill: '#A855F7' },
    { name: 'Emergency', count: incidents.filter(i => i.category === 'Emergency').length, fill: '#EF4444' }
  ];

  // Severity distribution for chart
  const severityData = [
    { name: 'Critical', value: incidents.filter(i => i.severity === 'Critical').length, color: '#EF4444' },
    { name: 'High', value: incidents.filter(i => i.severity === 'High').length, color: '#F59E0B' },
    { name: 'Moderate', value: incidents.filter(i => i.severity === 'Moderate').length, color: '#EAB308' },
    { name: 'Low', value: incidents.filter(i => i.severity === 'Low').length, color: '#00F0FF' }
  ];

  // Simulated city risk trend over time
  const riskTrendData = [
    { time: 'T-50m', score: 42, traffic: 54, flood: 30 },
    { time: 'T-40m', score: 48, traffic: 58, flood: 38 },
    { time: 'T-30m', score: 56, traffic: 66, flood: 45 },
    { time: 'T-20m', score: 65, traffic: 74, flood: 58 },
    { time: 'T-10m', score: 72, traffic: 80, flood: 70 },
    { time: 'Now', score: kpis.cityRiskScore, traffic: kpis.trafficCongestionIndex, flood: Math.min(95, kpis.floodRiskZonesCount * 28 + 25) }
  ];

  // Active warning sensors
  const warningSensors = sensors.filter(s => s.status === 'Warning' || s.status === 'Offline');

  // Recent incidents (top 5)
  const recentIncidents = [...incidents].slice(0, 5);

  return (
    <div className="space-y-6 pb-12">
      {/* Demo Mode Sub-header */}
      <DemoModeBanner />

      <div className="px-4 sm:px-6 space-y-6 max-w-7xl mx-auto">
        {/* City Alert & Urgent Action Banner */}
        {kpis.cityRiskScore >= 70 && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/40 via-navy-900 to-navy-900 border border-red-500/40 shadow-glow-red flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-red-400 tracking-wider uppercase">
                    ELEVATED CIVIC THREAT LEVEL: {kpis.cityRiskScore}/100
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40">
                    High Readiness Required
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  {aiAnalysis.situationSummary}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
              <button
                onClick={() => onNavigate('ai')}
                className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-mono font-bold text-xs transition-colors flex items-center gap-1.5 shadow-glow-cyan"
              >
                <BrainCircuit className="w-4 h-4" />
                <span>AI Action Room</span>
              </button>
              <button
                onClick={() => onNavigate('map')}
                className="px-3.5 py-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-200 font-mono text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <span>Live Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* 6 Top KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <KpiCard
            title="Active Incidents"
            value={kpis.activeIncidentsCount}
            subtitle={`${incidents.filter(i => i.severity === 'Critical').length} Critical`}
            icon={AlertTriangle}
            variant="red"
            glow={kpis.activeIncidentsCount > 5}
            onClick={() => onNavigate('incidents')}
          />
          <KpiCard
            title="Flood Risk Zones"
            value={kpis.floodRiskZonesCount}
            unit="zones"
            subtitle="Basin overflow active"
            icon={Droplets}
            variant="blue"
            onClick={() => onNavigate('map')}
          />
          <KpiCard
            title="Traffic Congestion"
            value={kpis.trafficCongestionIndex}
            unit="%"
            subtitle="Average saturation"
            icon={Car}
            variant="amber"
            trend={{ value: '14%', isUpward: true, isPositive: false }}
            onClick={() => onNavigate('map')}
          />
          <KpiCard
            title="Road Blockages"
            value={kpis.roadBlockagesCount}
            unit="arterials"
            subtitle="Detours active"
            icon={AlertOctagon}
            variant="purple"
            onClick={() => onNavigate('incidents')}
          />
          <KpiCard
            title="Connected IoT"
            value={`${kpis.connectedSensorsCount}/${kpis.totalSensorsCount}`}
            subtitle={`${kpis.sensorFleetHealthPercentage}% Fleet Online`}
            icon={Cpu}
            variant="cyan"
            onClick={() => onNavigate('sensors')}
          />
          <KpiCard
            title="City Risk Score"
            value={kpis.cityRiskScore}
            unit="/100"
            subtitle={aiAnalysis.riskClassification + ' Risk'}
            icon={ShieldAlert}
            variant={kpis.cityRiskScore > 75 ? 'red' : kpis.cityRiskScore > 50 ? 'amber' : 'cyan'}
            glow={true}
            onClick={() => onNavigate('ai')}
          />
        </div>

        {/* Main Grid: Visual Charts & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Risk Trend Chart (2 cols) */}
          <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20 lg:col-span-2 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  City Multi-Vector Risk Trends
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Synchronous simulation dynamics over past operational intervals
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-red-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Composite Risk
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Traffic
                </span>
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Flood
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={riskTrendData}>
                  <defs>
                    <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="trafficGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="floodGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#00F0FF" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#475569" fontSize={11} tickLine={false} />
                  <YAxis stroke="#475569" fontSize={11} domain={[0, 100]} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0D1326', 
                      borderColor: '#00F0FF', 
                      borderRadius: '8px', 
                      fontSize: '12px' 
                    }} 
                  />
                  <Area type="monotone" dataKey="score" stroke="#EF4444" strokeWidth={2.5} fillOpacity={1} fill="url(#riskGrad)" name="City Risk" />
                  <Area type="monotone" dataKey="traffic" stroke="#F59E0B" strokeWidth={2} fillOpacity={1} fill="url(#trafficGrad)" name="Traffic %" />
                  <Area type="monotone" dataKey="flood" stroke="#00F0FF" strokeWidth={2} fillOpacity={1} fill="url(#floodGrad)" name="Flood Index" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">Dynamic AI Projection: Peak stabilization in ~18m</span>
              <button 
                onClick={() => onNavigate('simulation')}
                className="text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1 transition-colors"
              >
                Adjust Simulation Dynamics <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* AI Intelligence Snapshot (1 col) */}
          <div className="glass-panel rounded-2xl p-5 border border-purple-500/30 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-mono">
                  <BrainCircuit className="w-3 h-3 text-purple-400" />
                  NEURAL TRIAGE
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Updated: {aiAnalysis.analyzedAt}
                </span>
              </div>

              <h3 className="text-base font-bold text-white tracking-tight">
                AI Strategic Directives
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {aiAnalysis.priorityActions[0] || 'Autonomous risk mitigation active.'}
              </p>

              {/* High-priority AI recommendations */}
              <div className="mt-4 space-y-2">
                {aiAnalysis.recommendations.slice(0, 2).map((rec) => (
                  <div key={rec.id} className="p-2.5 rounded-xl bg-navy-900/80 border border-slate-800 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-cyan-400 font-bold text-[11px]">{rec.id}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                        {rec.priority}
                      </span>
                    </div>
                    <div className="font-semibold text-white mt-1 text-[12px]">{rec.title}</div>
                    <p className="text-slate-400 text-[11px] mt-0.5 line-clamp-1">{rec.action}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={triggerAiAnalysis}
                disabled={isAiAnalyzing}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-navy-950 font-mono font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-glow-cyan"
              >
                {isAiAnalyzing ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-navy-950 border-t-transparent rounded-full animate-spin" />
                    <span>Neural Triage In Progress...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run Full AI City Assessment</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Charts: Category Breakdown & Severity Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Incidents by Category */}
          <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20">
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Incidents by Urban Vector
            </h3>
            <p className="text-xs text-slate-400 font-mono mb-4">Distribution across key crisis categories</p>
            
            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <XAxis dataKey="name" stroke="#475569" fontSize={11} tickLine={false} />
                  <YAxis stroke="#475569" fontSize={11} tickLine={false} allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0D1326', 
                      borderColor: '#00F0FF', 
                      borderRadius: '8px', 
                      fontSize: '12px' 
                    }} 
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Incident Severity Distribution */}
          <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Severity Tier Breakdown
              </h3>
              <p className="text-xs text-slate-400 font-mono mb-2">Real-time triage classification</p>

              <div className="h-44 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={severityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {severityData.map((entry, index) => (
                        <Cell key={`pie-cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0D1326', 
                        borderColor: '#00F0FF', 
                        borderRadius: '8px', 
                        fontSize: '12px' 
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-1 text-center pt-2 border-t border-slate-800">
              {severityData.map((s) => (
                <div key={s.name}>
                  <div className="text-xs font-mono font-bold" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-[10px] text-slate-400 truncate">{s.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* IoT Sensor Fleet Health */}
          <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  IoT Sensor Network Health
                </h3>
                <span className="font-mono text-xs text-emerald-400">
                  {kpis.sensorFleetHealthPercentage}% Operational
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mb-4">
                Telemetry nodes streaming over LPWAN mesh
              </p>

              {/* Progress bar */}
              <div className="w-full bg-navy-950 h-3 rounded-full overflow-hidden flex border border-slate-800 mb-4">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-500" 
                  style={{ width: `${(sensors.filter(s => s.status === 'Online').length / sensors.length) * 100}%` }} 
                  title="Online"
                />
                <div 
                  className="bg-amber-400 h-full transition-all duration-500" 
                  style={{ width: `${(sensors.filter(s => s.status === 'Warning').length / sensors.length) * 100}%` }} 
                  title="Warning Threshold"
                />
                <div 
                  className="bg-slate-700 h-full transition-all duration-500" 
                  style={{ width: `${(sensors.filter(s => s.status === 'Offline').length / sensors.length) * 100}%` }} 
                  title="Offline"
                />
              </div>

              {/* Sensor Alert Items */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Attention Required ({warningSensors.length} Nodes):
                </div>
                {warningSensors.slice(0, 2).map((s) => (
                  <div 
                    key={s.id}
                    onClick={() => setSelectedSensor(s)}
                    className="p-2 rounded-lg bg-navy-900/60 border border-amber-500/30 hover:border-amber-500/60 transition-colors cursor-pointer flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-mono text-cyan-300 font-semibold">{s.id}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[150px]">{s.name}</div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-amber-400 font-bold">{s.currentReading} {s.unit}</div>
                      <span className="text-[9px] text-slate-500">Threshold: {s.warningThreshold}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-400 font-mono">24/24 Nodes Calibrated</span>
              <button 
                onClick={() => onNavigate('sensors')}
                className="text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1"
              >
                Fleet Telemetry <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Split: Recent Active Incidents Table & Live Event Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Incidents List (2 cols) */}
          <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-cyan-400" />
                  Active Civic Incidents
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Real-time field response units & priority triage
                </p>
              </div>

              <button
                onClick={() => onNavigate('incidents')}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
              >
                View All ({incidents.length}) <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {recentIncidents.map((incident) => (
                <div
                  key={incident.id}
                  onClick={() => setSelectedIncident(incident)}
                  className="p-3.5 rounded-xl bg-navy-900/60 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all hover:bg-navy-900/90 group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg border shrink-0 mt-0.5 ${
                      incident.category === 'Flood' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                      incident.category === 'Traffic Congestion' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                      incident.category === 'Road Blockage' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' :
                      'bg-red-500/10 text-red-400 border-red-500/30'
                    }`}>
                      {incident.category === 'Flood' && <Droplets className="w-4 h-4" />}
                      {incident.category === 'Traffic Congestion' && <Car className="w-4 h-4" />}
                      {incident.category === 'Road Blockage' && <AlertOctagon className="w-4 h-4" />}
                      {incident.category === 'Emergency' && <Flame className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-cyan-400">{incident.id}</span>
                        <Badge type="category" value={incident.category} size="sm" />
                        <Badge type="severity" value={incident.severity} size="sm" />
                        <Badge type="status" value={incident.status} size="sm" />
                      </div>
                      <h4 className="text-sm font-semibold text-white mt-1 group-hover:text-cyan-300 transition-colors">
                        {incident.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        <span>{incident.locationName}</span>
                        <span>•</span>
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{incident.reportedTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <div className="text-right font-mono text-xs">
                      <div className="text-slate-300">
                        {incident.impactMetrics.affectedCitizensEstimated.toLocaleString()} citizens
                      </div>
                      <div className="text-amber-400">+{incident.impactMetrics.trafficDelayMinutes}m delay</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-Time Event & Radio Stream (1 col) */}
          <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                  AETHER Telemetry Stream
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Kernel Active
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mb-3">
                Synchronized telemetry & autonomous event logging
              </p>

              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {simulation.eventLogs.slice(0, 7).map((log) => (
                  <div key={log.id} className="p-2.5 rounded-lg bg-navy-900/60 border border-slate-800 text-xs">
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="text-cyan-400 font-semibold">{log.source}</span>
                      <span className="text-slate-500">{log.timestamp}</span>
                    </div>
                    <p className={`text-slate-300 leading-relaxed ${
                      log.level === 'warning' ? 'text-amber-300' :
                      log.level === 'critical' ? 'text-red-300' :
                      log.level === 'success' ? 'text-emerald-300' : ''
                    }`}>
                      {log.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-500 font-mono">T+{simulation.tick} Cycles Logged</span>
              <button
                onClick={() => onNavigate('simulation')}
                className="text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1"
              >
                Open Studio <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
