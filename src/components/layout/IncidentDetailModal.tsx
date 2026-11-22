import React from 'react';
import { X, MapPin, Clock, AlertTriangle, Activity, CheckCircle, Shield, Navigation, Users, ArrowRight } from 'lucide-react';
import { useCity } from '../../context/CityContext';
import { Badge } from '../common/Badge';
import { IncidentStatus } from '../../types';

export const IncidentDetailModal: React.FC = () => {
  const { 
    selectedIncident, 
    setSelectedIncident, 
    updateIncidentStatus, 
    sensors, 
    setSelectedSensor 
  } = useCity();

  if (!selectedIncident) return null;

  const relatedSensors = sensors.filter(s => selectedIncident.relatedSensorIds.includes(s.id));

  const statusOptions: IncidentStatus[] = ['Open', 'Investigating', 'Responding', 'Resolved'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="glass-panel w-full max-w-2xl rounded-2xl border border-cyan-500/30 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-start justify-between bg-navy-900/60">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                {selectedIncident.id}
              </span>
              <Badge type="category" value={selectedIncident.category} />
              <Badge type="severity" value={selectedIncident.severity} withPulse />
              <Badge type="status" value={selectedIncident.status} />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {selectedIncident.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{selectedIncident.locationName}</span>
              <span>•</span>
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Reported {selectedIncident.reportedTime}</span>
            </div>
          </div>

          <button
            onClick={() => setSelectedIncident(null)}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Incident Description */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Situation Description</h4>
            <div className="p-3.5 rounded-lg bg-navy-900/80 border border-slate-800 text-sm text-slate-200 leading-relaxed">
              {selectedIncident.description}
            </div>
          </div>

          {/* Impact Metrics Grid */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Estimated Impact</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-navy-900/60 border border-slate-800/80">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Affected Citizens</span>
                </div>
                <div className="text-lg font-bold font-mono text-white mt-1">
                  {selectedIncident.impactMetrics.affectedCitizensEstimated.toLocaleString()}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-navy-900/60 border border-slate-800/80">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Traffic Delay</span>
                </div>
                <div className="text-lg font-bold font-mono text-amber-300 mt-1">
                  +{selectedIncident.impactMetrics.trafficDelayMinutes} mins
                </div>
              </div>

              {selectedIncident.impactMetrics.floodDepthCm !== undefined && (
                <div className="p-3 rounded-lg bg-navy-900/60 border border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Activity className="w-3.5 h-3.5 text-blue-400" />
                    <span>Flood Depth</span>
                  </div>
                  <div className="text-lg font-bold font-mono text-blue-300 mt-1">
                    {selectedIncident.impactMetrics.floodDepthCm} cm
                  </div>
                </div>
              )}

              {selectedIncident.impactMetrics.congestionPercentage !== undefined && (
                <div className="p-3 rounded-lg bg-navy-900/60 border border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Navigation className="w-3.5 h-3.5 text-purple-400" />
                    <span>Congestion Index</span>
                  </div>
                  <div className="text-lg font-bold font-mono text-purple-300 mt-1">
                    {selectedIncident.impactMetrics.congestionPercentage}%
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AI Recommended Action */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              Recommended Protocol Action
            </h4>
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-sm text-cyan-100 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 mt-0.5 shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="leading-relaxed">{selectedIncident.recommendedAction}</p>
                {selectedIncident.responseTeamsAssigned && selectedIncident.responseTeamsAssigned.length > 0 && (
                  <div className="mt-2.5 pt-2.5 border-t border-cyan-500/20 flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-slate-400">Active Units:</span>
                    {selectedIncident.responseTeamsAssigned.map((unit, idx) => (
                      <span key={idx} className="text-xs font-mono px-2 py-0.5 rounded bg-navy-900 text-cyan-300 border border-cyan-500/30">
                        {unit}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Related IoT Sensor Readings */}
          {relatedSensors.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Connected Sensor Telemetry</h4>
              <div className="space-y-2">
                {relatedSensors.map(sensor => (
                  <div 
                    key={sensor.id}
                    onClick={() => {
                      setSelectedIncident(null);
                      setSelectedSensor(sensor);
                    }}
                    className="p-3 rounded-lg bg-navy-900/60 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-cyan-400 font-semibold">{sensor.id}</span>
                        <span className="text-xs text-slate-300">{sensor.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{sensor.locationName}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-mono font-bold text-white text-sm">
                          {sensor.currentReading} <span className="text-xs text-slate-400">{sensor.unit}</span>
                        </div>
                        <Badge type="sensorStatus" value={sensor.status} size="sm" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Incident Status Management Controls */}
          <div className="pt-2 border-t border-slate-800">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Update Incident Status</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {statusOptions.map(stat => {
                const isActive = selectedIncident.status === stat;
                return (
                  <button
                    key={stat}
                    onClick={() => updateIncidentStatus(selectedIncident.id, stat)}
                    className={`py-2 px-3 rounded-lg text-xs font-mono font-medium transition-all border ${
                      isActive 
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-glow-cyan' 
                        : 'bg-navy-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {isActive && <CheckCircle className="w-3.5 h-3.5 inline mr-1 text-cyan-400" />}
                    {stat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-navy-900/70 flex justify-between items-center text-xs text-slate-400">
          <span>Lat: {selectedIncident.coordinates.lat.toFixed(4)}, Lng: {selectedIncident.coordinates.lng.toFixed(4)}</span>
          <button
            onClick={() => setSelectedIncident(null)}
            className="px-4 py-2 rounded-lg bg-navy-800 hover:bg-navy-700 text-white font-medium transition-colors"
          >
            Close Telemetry
          </button>
        </div>
      </div>
    </div>
  );
};
