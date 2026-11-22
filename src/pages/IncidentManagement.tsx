import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Plus, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Droplets, 
  Car, 
  AlertOctagon, 
  Flame, 
  LayoutGrid, 
  Table as TableIcon,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { useCity } from '../context/CityContext';
import { Badge } from '../components/common/Badge';
import { Incident, IncidentCategory, Severity, IncidentStatus } from '../types';
import { NewIncidentModal } from '../components/layout/NewIncidentModal';

export const IncidentManagement: React.FC = () => {
  const { incidents, updateIncidentStatus, setSelectedIncident, searchQuery } = useCity();

  const [localSearch, setLocalSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'severity' | 'time' | 'citizens' | 'delay'>('severity');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('table');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const effectiveSearch = localSearch || searchQuery;

  // Filter & Sort
  const filteredIncidents = useMemo(() => {
    return incidents.filter(inc => {
      // Search match
      if (effectiveSearch) {
        const query = effectiveSearch.toLowerCase();
        const matches = 
          inc.id.toLowerCase().includes(query) ||
          inc.title.toLowerCase().includes(query) ||
          inc.locationName.toLowerCase().includes(query) ||
          inc.description.toLowerCase().includes(query);
        if (!matches) return false;
      }

      // Category match
      if (selectedCategory !== 'All' && inc.category !== selectedCategory) return false;

      // Severity match
      if (selectedSeverity !== 'All' && inc.severity !== selectedSeverity) return false;

      // Status match
      if (selectedStatus !== 'All' && inc.status !== selectedStatus) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'severity') {
        const rank: Record<Severity, number> = { Critical: 4, High: 3, Moderate: 2, Low: 1 };
        return rank[b.severity] - rank[a.severity];
      }
      if (sortBy === 'citizens') {
        return b.impactMetrics.affectedCitizensEstimated - a.impactMetrics.affectedCitizensEstimated;
      }
      if (sortBy === 'delay') {
        return b.impactMetrics.trafficDelayMinutes - a.impactMetrics.trafficDelayMinutes;
      }
      return 0; // time default
    });
  }, [incidents, effectiveSearch, selectedCategory, selectedSeverity, selectedStatus, sortBy]);

  const severityCount = {
    Critical: incidents.filter(i => i.severity === 'Critical').length,
    High: incidents.filter(i => i.severity === 'High').length,
    Moderate: incidents.filter(i => i.severity === 'Moderate').length,
    Low: incidents.filter(i => i.severity === 'Low').length,
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Header & Metrics Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/30 uppercase tracking-wider">
              Emergency Registry
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Total Recorded: <span className="text-white font-bold">{incidents.length}</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
            Urban Incident Management Center
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time incident dispatch, status tracking, multi-agency triage and impact mitigation
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-bold text-xs font-mono transition-all flex items-center gap-2 shadow-glow-cyan"
          >
            <Plus className="w-4 h-4" />
            <span>Report Incident</span>
          </button>
        </div>
      </div>

      {/* Quick Severity Stat Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div 
          onClick={() => setSelectedSeverity(selectedSeverity === 'Critical' ? 'All' : 'Critical')}
          className={`p-3 rounded-xl border transition-all cursor-pointer ${
            selectedSeverity === 'Critical' 
              ? 'bg-red-500/20 border-red-500 shadow-glow-red' 
              : 'bg-navy-900/60 border-slate-800 hover:border-red-500/40'
          }`}
        >
          <div className="text-[11px] font-mono text-red-400 uppercase">Critical Priority</div>
          <div className="text-2xl font-bold font-mono text-white mt-1">{severityCount.Critical}</div>
        </div>

        <div 
          onClick={() => setSelectedSeverity(selectedSeverity === 'High' ? 'All' : 'High')}
          className={`p-3 rounded-xl border transition-all cursor-pointer ${
            selectedSeverity === 'High' 
              ? 'bg-amber-500/20 border-amber-500 shadow-glow-amber' 
              : 'bg-navy-900/60 border-slate-800 hover:border-amber-500/40'
          }`}
        >
          <div className="text-[11px] font-mono text-amber-400 uppercase">High Priority</div>
          <div className="text-2xl font-bold font-mono text-white mt-1">{severityCount.High}</div>
        </div>

        <div 
          onClick={() => setSelectedSeverity(selectedSeverity === 'Moderate' ? 'All' : 'Moderate')}
          className={`p-3 rounded-xl border transition-all cursor-pointer ${
            selectedSeverity === 'Moderate' 
              ? 'bg-yellow-500/20 border-yellow-500' 
              : 'bg-navy-900/60 border-slate-800 hover:border-yellow-500/40'
          }`}
        >
          <div className="text-[11px] font-mono text-yellow-300 uppercase">Moderate</div>
          <div className="text-2xl font-bold font-mono text-white mt-1">{severityCount.Moderate}</div>
        </div>

        <div 
          onClick={() => setSelectedSeverity(selectedSeverity === 'Low' ? 'All' : 'Low')}
          className={`p-3 rounded-xl border transition-all cursor-pointer ${
            selectedSeverity === 'Low' 
              ? 'bg-cyan-500/20 border-cyan-500 shadow-glow-cyan' 
              : 'bg-navy-900/60 border-slate-800 hover:border-cyan-500/40'
          }`}
        >
          <div className="text-[11px] font-mono text-cyan-400 uppercase">Low / Monitored</div>
          <div className="text-2xl font-bold font-mono text-white mt-1">{severityCount.Low}</div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-cyan-500/20 space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search Field */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by incident ID, title, keyword, or district..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-navy-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          {/* Filters Row */}
          <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="All">All Categories</option>
              <option value="Flood">Flood</option>
              <option value="Traffic Congestion">Traffic Congestion</option>
              <option value="Road Blockage">Road Blockage</option>
              <option value="Emergency">Emergency</option>
            </select>

            {/* Severity Filter */}
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="All">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Moderate">Moderate</option>
              <option value="Low">Low</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="Investigating">Investigating</option>
              <option value="Responding">Responding</option>
              <option value="Resolved">Resolved</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="severity">Sort: Severity</option>
              <option value="citizens">Sort: Citizens Affected</option>
              <option value="delay">Sort: Traffic Delay</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex rounded-xl bg-navy-950 border border-slate-800 p-0.5">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-white'}`}
                title="Table View"
              >
                <TableIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'cards' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-white'}`}
                title="Cards View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Indicators */}
        {(selectedCategory !== 'All' || selectedSeverity !== 'All' || selectedStatus !== 'All' || effectiveSearch) && (
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono pt-1">
            <span>Filtered ({filteredIncidents.length} results):</span>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedSeverity('All');
                setSelectedStatus('All');
                setLocalSearch('');
              }}
              className="text-cyan-400 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Main Incidents Display: Table or Card Grid */}
      {viewMode === 'table' ? (
        <div className="glass-panel rounded-2xl border border-cyan-500/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-navy-900/80 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-4">Incident ID & Title</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Severity</th>
                  <th className="py-3.5 px-4">Status & Action</th>
                  <th className="py-3.5 px-4">Impact Scope</th>
                  <th className="py-3.5 px-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {filteredIncidents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500 font-mono">
                      No incidents matching current criteria
                    </td>
                  </tr>
                ) : (
                  filteredIncidents.map((incident) => (
                    <tr
                      key={incident.id}
                      onClick={() => setSelectedIncident(incident)}
                      className="hover:bg-navy-900/60 cursor-pointer transition-colors group"
                    >
                      {/* ID & Title */}
                      <td className="py-3.5 px-4">
                        <div className="font-mono font-bold text-cyan-400 group-hover:text-cyan-300">
                          {incident.id}
                        </div>
                        <div className="text-white font-semibold mt-0.5 max-w-xs truncate">
                          {incident.title}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                          {incident.reportedTime}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <Badge type="category" value={incident.category} size="sm" />
                      </td>

                      {/* Location */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span className="truncate max-w-[180px]">{incident.locationName}</span>
                        </div>
                      </td>

                      {/* Severity */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <Badge type="severity" value={incident.severity} size="sm" withPulse={incident.severity === 'Critical'} />
                      </td>

                      {/* Status & Quick Change */}
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {(['Open', 'Investigating', 'Responding', 'Resolved'] as IncidentStatus[]).map((st) => (
                            <button
                              key={st}
                              onClick={() => updateIncidentStatus(incident.id, st)}
                              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors border ${
                                incident.status === st
                                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold'
                                  : 'bg-navy-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </td>

                      {/* Impact */}
                      <td className="py-3.5 px-4 font-mono text-[11px] whitespace-nowrap">
                        <div className="text-slate-200">
                          {incident.impactMetrics.affectedCitizensEstimated.toLocaleString()} citizens
                        </div>
                        <div className="text-amber-400">
                          +{incident.impactMetrics.trafficDelayMinutes}m delay
                        </div>
                      </td>

                      {/* Details Action */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedIncident(incident)}
                          className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-cyan-400 transition-colors"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIncidents.map((incident) => (
            <div
              key={incident.id}
              onClick={() => setSelectedIncident(incident)}
              className="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all hover:-translate-y-0.5 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-400">{incident.id}</span>
                    <Badge type="category" value={incident.category} size="sm" />
                  </div>
                  <Badge type="severity" value={incident.severity} size="sm" withPulse={incident.severity === 'Critical'} />
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {incident.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{incident.locationName}</span>
                </div>

                <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed">
                  {incident.description}
                </p>

                <div className="mt-3 p-2.5 rounded-lg bg-navy-900/80 border border-cyan-500/20 text-xs text-cyan-200">
                  <span className="font-mono font-bold text-cyan-400">Action:</span> {incident.recommendedAction}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <Badge type="status" value={incident.status} size="sm" />
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  Inspect Telemetry <ArrowRight className="w-3 h-3 text-cyan-400" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Incident Modal */}
      <NewIncidentModal 
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
      />
    </div>
  );
};
