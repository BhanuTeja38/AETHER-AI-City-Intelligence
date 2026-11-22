import React from 'react';
import { Severity, IncidentStatus, SensorStatus, IncidentCategory } from '../../types';

interface BadgeProps {
  type: 'severity' | 'status' | 'sensorStatus' | 'category' | 'priority';
  value: string;
  size?: 'sm' | 'md' | 'lg';
  withPulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ type, value, size = 'md', withPulse = false }) => {
  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5 font-medium'
  }[size];

  let colorClasses = 'bg-slate-800 text-slate-300 border-slate-700';
  let pulseColor = 'bg-slate-400';

  if (type === 'severity') {
    const sev = value as Severity;
    switch (sev) {
      case 'Critical':
        colorClasses = 'bg-red-500/15 text-red-400 border-red-500/40 shadow-glow-red';
        pulseColor = 'bg-red-500 animate-ping';
        break;
      case 'High':
        colorClasses = 'bg-amber-500/15 text-amber-400 border-amber-500/40 shadow-glow-amber';
        pulseColor = 'bg-amber-500';
        break;
      case 'Moderate':
        colorClasses = 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30';
        pulseColor = 'bg-yellow-400';
        break;
      case 'Low':
        colorClasses = 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
        pulseColor = 'bg-cyan-400';
        break;
    }
  } else if (type === 'status') {
    const stat = value as IncidentStatus;
    switch (stat) {
      case 'Open':
        colorClasses = 'bg-rose-500/15 text-rose-300 border-rose-500/40';
        pulseColor = 'bg-rose-500';
        break;
      case 'Investigating':
        colorClasses = 'bg-amber-500/15 text-amber-300 border-amber-500/40';
        pulseColor = 'bg-amber-400';
        break;
      case 'Responding':
        colorClasses = 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40 shadow-glow-cyan';
        pulseColor = 'bg-cyan-400 animate-ping';
        break;
      case 'Resolved':
        colorClasses = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40';
        pulseColor = 'bg-emerald-500';
        break;
    }
  } else if (type === 'sensorStatus') {
    const sStat = value as SensorStatus;
    switch (sStat) {
      case 'Online':
        colorClasses = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40';
        pulseColor = 'bg-emerald-400';
        break;
      case 'Warning':
        colorClasses = 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-glow-amber';
        pulseColor = 'bg-amber-400 animate-ping';
        break;
      case 'Offline':
        colorClasses = 'bg-slate-700/40 text-slate-400 border-slate-600/40';
        pulseColor = 'bg-slate-500';
        break;
    }
  } else if (type === 'category') {
    const cat = value as IncidentCategory;
    switch (cat) {
      case 'Flood':
        colorClasses = 'bg-blue-500/15 text-blue-300 border-blue-500/30';
        break;
      case 'Traffic Congestion':
        colorClasses = 'bg-amber-500/15 text-amber-300 border-amber-500/30';
        break;
      case 'Road Blockage':
        colorClasses = 'bg-purple-500/15 text-purple-300 border-purple-500/30';
        break;
      case 'Emergency':
        colorClasses = 'bg-red-500/15 text-red-300 border-red-500/40';
        break;
    }
  }

  return (
    <span className={`inline-flex items-center gap-1.5 font-mono tracking-wider uppercase rounded-md border ${colorClasses} ${sizeClasses}`}>
      {withPulse && (
        <span className="relative flex h-2 w-2">
          <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${pulseColor}`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${pulseColor.replace(' animate-ping', '')}`} />
        </span>
      )}
      {value}
    </span>
  );
};
