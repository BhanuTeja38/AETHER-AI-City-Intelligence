import React, { useState } from 'react';
import { 
  FileBarChart2, 
  Download, 
  Printer, 
  Calendar, 
  Filter, 
  CheckCircle2, 
  ShieldAlert, 
  Activity, 
  Cpu, 
  Layers, 
  TrendingUp, 
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';
import { useCity } from '../context/CityContext';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export const ReportsAnalytics: React.FC = () => {
  const { incidents, sensors, kpis, aiAnalysis, selectedCity } = useCity();

  const [dateRange, setDateRange] = useState('24h');
  const [reportType, setReportType] = useState('full');

  // Category summary data
  const categoryStats = [
    { category: 'Flood', active: incidents.filter(i => i.category === 'Flood' && i.status !== 'Resolved').length, resolved: incidents.filter(i => i.category === 'Flood' && i.status === 'Resolved').length },
    { category: 'Traffic Congestion', active: incidents.filter(i => i.category === 'Traffic Congestion' && i.status !== 'Resolved').length, resolved: incidents.filter(i => i.category === 'Traffic Congestion' && i.status === 'Resolved').length },
    { category: 'Road Blockage', active: incidents.filter(i => i.category === 'Road Blockage' && i.status !== 'Resolved').length, resolved: incidents.filter(i => i.category === 'Road Blockage' && i.status === 'Resolved').length },
    { category: 'Emergency', active: incidents.filter(i => i.category === 'Emergency' && i.status !== 'Resolved').length, resolved: incidents.filter(i => i.category === 'Emergency' && i.status === 'Resolved').length }
  ];

  // 24-hour hourly risk index mock trend
  const historicalTrend = [
    { hour: '00:00', risk: 32, incidents: 2 },
    { hour: '03:00', risk: 28, incidents: 1 },
    { hour: '06:00', risk: 45, incidents: 3 },
    { hour: '09:00', risk: 68, incidents: 5 },
    { hour: '12:00', risk: 62, incidents: 4 },
    { hour: '15:00', risk: 74, incidents: 7 },
    { hour: '18:00', risk: kpis.cityRiskScore, incidents: kpis.activeIncidentsCount },
  ];

  // CSV Export logic
  const handleExportCsv = () => {
    const headers = ['Incident_ID', 'Category', 'Title', 'Location', 'Severity', 'Status', 'Reported_Time', 'Citizens_Affected', 'Delay_Minutes'];
    const rows = incidents.map(i => [
      i.id,
      `"${i.category}"`,
      `"${i.title.replace(/"/g, '""')}"`,
      `"${i.locationName.replace(/"/g, '""')}"`,
      i.severity,
      i.status,
      `"${i.reportedTime}"`,
      i.impactMetrics.affectedCitizensEstimated,
      i.impactMetrics.trafficDelayMinutes
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `AETHER_City_Intelligence_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header and Export Tools */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
              Executive Analytics
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Target: <span className="text-white font-bold">{selectedCity}</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
            Urban Resilience & Incident Analytics Reports
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Post-incident reviews, risk factor correlation, sensor fleet health, and data export
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleExportCsv}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-bold text-xs font-mono transition-all flex items-center gap-2 shadow-glow-cyan"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV Dataset</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-200 font-mono text-xs border border-slate-700 transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Report Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-4 border border-cyan-500/20">
          <div className="text-xs font-mono text-slate-400">Total Incidents Evaluated</div>
          <div className="text-3xl font-bold font-mono text-white mt-1">{incidents.length}</div>
          <div className="text-[11px] text-emerald-400 mt-1">
            {incidents.filter(i => i.status === 'Resolved').length} Resolved ({Math.round((incidents.filter(i => i.status === 'Resolved').length / incidents.length) * 100)}%)
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-cyan-500/20">
          <div className="text-xs font-mono text-slate-400">Total Citizens Impacted</div>
          <div className="text-3xl font-bold font-mono text-cyan-400 mt-1">
            {incidents.reduce((sum, i) => sum + i.impactMetrics.affectedCitizensEstimated, 0).toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Across 4 municipal sectors</div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-cyan-500/20">
          <div className="text-xs font-mono text-slate-400">Average Congestion Delay</div>
          <div className="text-3xl font-bold font-mono text-amber-400 mt-1">
            +{Math.round(incidents.reduce((sum, i) => sum + i.impactMetrics.trafficDelayMinutes, 0) / incidents.length)}m
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Per outbound arterial route</div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-cyan-500/20">
          <div className="text-xs font-mono text-slate-400">IoT Fleet Sensor Reliability</div>
          <div className="text-3xl font-bold font-mono text-emerald-400 mt-1">
            {kpis.sensorFleetHealthPercentage}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1">24 nodes reporting packets</div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incident Resolution Status by Category */}
        <div className="glass-panel rounded-2xl p-6 border border-cyan-500/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Active vs. Resolved by Vector</h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Municipal recovery throughput</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Active
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Resolved
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryStats}>
                <XAxis dataKey="category" stroke="#475569" fontSize={11} tickLine={false} />
                <YAxis stroke="#475569" fontSize={11} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0D1326', borderColor: '#00F0FF', borderRadius: '8px', fontSize: '11px' }} />
                <Bar dataKey="active" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Active" />
                <Bar dataKey="resolved" fill="#10B981" radius={[4, 4, 0, 0]} name="Resolved" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 24-Hour City Risk Trend */}
        <div className="glass-panel rounded-2xl p-6 border border-cyan-500/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">24-Hour Risk Index Trajectory</h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Historical telemetry aggregation</p>
            </div>
            <span className="text-xs font-mono text-cyan-400">Past 24 Hours</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalTrend}>
                <XAxis dataKey="hour" stroke="#475569" fontSize={11} tickLine={false} />
                <YAxis stroke="#475569" fontSize={11} tickLine={false} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#0D1326', borderColor: '#00F0FF', borderRadius: '8px', fontSize: '11px' }} />
                <Line type="monotone" dataKey="risk" stroke="#EF4444" strokeWidth={2.5} dot={{ r: 4, fill: '#EF4444' }} name="Risk Score (/100)" />
                <Line type="monotone" dataKey="incidents" stroke="#00F0FF" strokeWidth={2} dot={{ r: 3, fill: '#00F0FF' }} name="Active Incidents" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Comprehensive Incident Log Table */}
      <div className="glass-panel rounded-2xl p-6 border border-cyan-500/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white">Full Incident Audit Trail</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Exportable official registry</p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {incidents.length} Records In Registry
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                <th className="py-2.5 px-3">ID</th>
                <th className="py-2.5 px-3">Title</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Severity</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Citizens Affected</th>
                <th className="py-2.5 px-3">Delay Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {incidents.map((inc) => (
                <tr key={inc.id} className="hover:bg-navy-900/50">
                  <td className="py-2.5 px-3 text-cyan-400 font-bold">{inc.id}</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">{inc.title}</td>
                  <td className="py-2.5 px-3 text-slate-300">{inc.category}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                      inc.severity === 'Critical' ? 'text-red-400 bg-red-500/10' :
                      inc.severity === 'High' ? 'text-amber-400 bg-amber-500/10' :
                      inc.severity === 'Moderate' ? 'text-yellow-400 bg-yellow-500/10' :
                      'text-cyan-400 bg-cyan-500/10'
                    }`}>
                      {inc.severity}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">{inc.status}</td>
                  <td className="py-2.5 px-3 text-slate-200">
                    {inc.impactMetrics.affectedCitizensEstimated.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-amber-400">
                    +{inc.impactMetrics.trafficDelayMinutes} mins
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
