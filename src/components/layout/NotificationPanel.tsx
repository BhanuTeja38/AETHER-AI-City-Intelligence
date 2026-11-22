import React, { useState } from 'react';
import { Bell, CheckCheck, Trash2, X, AlertTriangle, ShieldAlert, Radio, ArrowRight } from 'lucide-react';
import { useCity } from '../../context/CityContext';
import { Badge } from '../common/Badge';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const { alerts, markAlertAsRead, clearAllAlerts, setSelectedIncident, incidents } = useCity();
  const [filterUnreadOnly, setFilterUnreadOnly] = useState(false);

  if (!isOpen) return null;

  const displayedAlerts = filterUnreadOnly ? alerts.filter(a => !a.isRead) : alerts;

  const handleAlertClick = (alert: any) => {
    markAlertAsRead(alert.id);
    if (alert.relatedEntityId) {
      const matchInc = incidents.find(i => i.id === alert.relatedEntityId);
      if (matchInc) {
        setSelectedIncident(matchInc);
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-navy-900/95 border-l border-cyan-500/30 shadow-2xl backdrop-blur-xl flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-navy-950/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Emergency Dispatch Feed</h3>
            <p className="text-xs text-slate-400 font-mono">
              {alerts.filter(a => !a.isRead).length} unacknowledged alerts
            </p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Action Filters Bar */}
      <div className="px-4 py-2.5 bg-navy-850/60 border-b border-slate-800 flex items-center justify-between text-xs">
        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
          <input
            type="checkbox"
            checked={filterUnreadOnly}
            onChange={(e) => setFilterUnreadOnly(e.target.checked)}
            className="rounded border-slate-700 bg-navy-900 text-cyan-500 focus:ring-0"
          />
          <span>Unread only</span>
        </label>

        <div className="flex items-center gap-2">
          <button
            onClick={clearAllAlerts}
            className="flex items-center gap-1 text-slate-400 hover:text-red-400 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Alert List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {displayedAlerts.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <Radio className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No alerts currently active</p>
            <p className="text-xs text-slate-600 mt-1">All telemetry sensors within safe bounds</p>
          </div>
        ) : (
          displayedAlerts.map(alert => (
            <div
              key={alert.id}
              onClick={() => handleAlertClick(alert)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer group ${
                alert.isRead 
                  ? 'bg-navy-900/40 border-slate-800/80 opacity-70 hover:opacity-100' 
                  : alert.severity === 'Critical' 
                    ? 'bg-red-950/20 border-red-500/40 shadow-glow-red' 
                    : 'bg-navy-900/90 border-cyan-500/30'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge type="severity" value={alert.severity} size="sm" withPulse={!alert.isRead} />
                  <span className="text-[11px] font-mono text-cyan-400">{alert.type}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 shrink-0">{alert.timestamp}</span>
              </div>

              <h4 className="text-sm font-semibold text-white mt-1.5 group-hover:text-cyan-300 transition-colors">
                {alert.title}
              </h4>

              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {alert.message}
              </p>

              {alert.actionRequired && (
                <div className="mt-2 text-[11px] text-amber-300/90 font-mono bg-amber-500/10 p-1.5 rounded border border-amber-500/20">
                  <span className="font-bold">Directive:</span> {alert.actionRequired}
                </div>
              )}

              <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 group-hover:text-cyan-400 flex items-center gap-1 transition-colors">
                  Inspect incident telemetry <ArrowRight className="w-3 h-3" />
                </span>
                {!alert.isRead && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markAlertAsRead(alert.id);
                    }}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Mark read
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
