import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  icon: LucideIcon;
  variant?: 'cyan' | 'red' | 'amber' | 'blue' | 'purple' | 'emerald';
  trend?: {
    value: string;
    isUpward: boolean;
    isPositive: boolean;
  };
  glow?: boolean;
  badge?: string;
  onClick?: () => void;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  unit,
  subtitle,
  icon: Icon,
  variant = 'cyan',
  trend,
  glow = false,
  badge,
  onClick
}) => {
  const colorMap = {
    cyan: {
      border: 'border-cyan-500/20 hover:border-cyan-500/50',
      iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      glowClass: glow ? 'shadow-glow-cyan' : '',
      accent: 'text-cyan-400',
    },
    red: {
      border: 'border-red-500/30 hover:border-red-500/60',
      iconBg: 'bg-red-500/10 text-red-400 border-red-500/30',
      glowClass: glow ? 'shadow-glow-red' : '',
      accent: 'text-red-400',
    },
    amber: {
      border: 'border-amber-500/20 hover:border-amber-500/50',
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      glowClass: glow ? 'shadow-glow-amber' : '',
      accent: 'text-amber-400',
    },
    blue: {
      border: 'border-blue-500/20 hover:border-blue-500/50',
      iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      glowClass: glow ? 'shadow-glow-blue' : '',
      accent: 'text-blue-400',
    },
    purple: {
      border: 'border-purple-500/20 hover:border-purple-500/50',
      iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      glowClass: '',
      accent: 'text-purple-400',
    },
    emerald: {
      border: 'border-emerald-500/20 hover:border-emerald-500/50',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      glowClass: '',
      accent: 'text-emerald-400',
    }
  };

  const style = colorMap[variant];

  return (
    <div
      onClick={onClick}
      className={`glass-panel rounded-xl p-4 sm:p-5 transition-all duration-300 relative overflow-hidden group ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''
      } ${style.border} ${style.glowClass}`}
    >
      {/* Background ambient gradient */}
      <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 rounded-full bg-cyan-500/5 blur-2xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none" />

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 tracking-wider uppercase">{title}</span>
            {badge && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {badge}
              </span>
            )}
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white group-hover:text-cyan-100 transition-colors">
              {value}
            </span>
            {unit && <span className="text-sm font-mono text-slate-400">{unit}</span>}
          </div>
        </div>

        <div className={`p-2.5 sm:p-3 rounded-lg border ${style.iconBg} transition-transform group-hover:scale-110 duration-200`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          {subtitle && <span className="text-slate-400 truncate max-w-[200px]">{subtitle}</span>}
          {trend && (
            <span className={`font-mono font-medium flex items-center gap-1 ${
              trend.isPositive ? 'text-emerald-400' : 'text-amber-400'
            }`}>
              {trend.isUpward ? '↑' : '↓'} {trend.value}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
