import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  AlertTriangle, 
  Cpu, 
  BrainCircuit, 
  PlayCircle, 
  FileBarChart2, 
  Radio, 
  Activity,
  Layers,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useCity } from '../../context/CityContext';

export type NavPage = 'overview' | 'map' | 'incidents' | 'sensors' | 'ai' | 'simulation' | 'reports';

interface SidebarProps {
  currentPage: NavPage;
  onSelectPage: (page: NavPage) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onSelectPage,
  isMobileOpen,
  onMobileClose,
}) => {
  const { kpis, incidents, sensors } = useCity();

  const warningSensorsCount = sensors.filter(s => s.status === 'Warning').length;

  const navItems: { id: NavPage; label: string; icon: React.FC<{ className?: string }>; badge?: string | number; badgeColor?: string }[] = [
    { 
      id: 'overview', 
      label: 'Overview Command', 
      icon: LayoutDashboard 
    },
    { 
      id: 'map', 
      label: 'Interactive City Map', 
      icon: Map, 
      badge: 'Live',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
    },
    { 
      id: 'incidents', 
      label: 'Incident Manager', 
      icon: AlertTriangle, 
      badge: kpis.activeIncidentsCount,
      badgeColor: 'bg-red-500/20 text-red-300 border-red-500/40'
    },
    { 
      id: 'sensors', 
      label: 'IoT Sensor Fleet', 
      icon: Cpu, 
      badge: warningSensorsCount > 0 ? `${warningSensorsCount} alert` : undefined,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
    },
    { 
      id: 'ai', 
      label: 'AI Intelligence Engine', 
      icon: BrainCircuit, 
      badge: 'Neural',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40'
    },
    { 
      id: 'simulation', 
      label: 'Scenario Studio', 
      icon: PlayCircle, 
      badge: 'Sim',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40'
    },
    { 
      id: 'reports', 
      label: 'Reports & Analytics', 
      icon: FileBarChart2 
    },
  ];

  const handleNavClick = (pageId: NavPage) => {
    onSelectPage(pageId);
    onMobileClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={onMobileClose}
          className="fixed inset-0 z-40 bg-navy-950/80 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        aria-label="Main Command Center Navigation"
        className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-navy-950 border-r border-cyan-500/20 
        transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static
        flex flex-col justify-between
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Top: Brand Header */}
        <div>
          <div className="h-16 px-5 border-b border-cyan-500/20 flex items-center gap-3 bg-navy-900/60">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-400 shadow-glow-cyan" aria-hidden="true">
              <Layers className="w-5 h-5 text-cyan-400" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            </div>
            <div>
              <div className="font-mono text-base font-extrabold tracking-wider text-white flex items-center gap-1.5">
                AETHER
                <span className="text-[10px] font-normal px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                  AI v2.4
                </span>
              </div>
              <div className="text-[10px] font-mono text-cyan-400/80 tracking-widest uppercase">
                City Intelligence
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav aria-label="Operations Rooms" className="p-3 space-y-1.5">
            <div className="px-3 py-2 text-[10px] font-mono tracking-widest uppercase text-slate-500">
              Operations Center
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium font-sans
                    transition-all duration-200 group text-left focus:ring-2 focus:ring-cyan-400 focus:outline-none
                    ${isActive 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan font-semibold' 
                      : 'text-slate-400 hover:text-white hover:bg-navy-900/80 border border-transparent'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                    <span>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    {item.badge && (
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md border ${item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'}`}>
                        {item.badge}
                      </span>
                    )}
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Telemetry Pulse */}
        <div className="p-4 border-t border-slate-800/80 bg-navy-900/40">
          <div className="p-3 rounded-xl bg-navy-900/80 border border-slate-800 text-xs">
            <div className="flex items-center justify-between text-slate-300 font-mono text-[11px] mb-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Mesh Security
              </span>
              <span className="text-emerald-400">NOMINAL</span>
            </div>

            <div className="space-y-1.5 font-mono text-[10px] text-slate-400">
              <div className="flex justify-between">
                <span>Sensor Health:</span>
                <span className="text-cyan-300">{kpis.sensorFleetHealthPercentage}%</span>
              </div>
              <div className="flex justify-between">
                <span>Telemetry Ingest:</span>
                <span className="text-slate-300">24 Nodes (12ms)</span>
              </div>
              <div className="flex justify-between">
                <span>Active City Threat:</span>
                <span className={kpis.cityRiskScore > 70 ? 'text-red-400 font-bold' : 'text-amber-400'}>
                  {kpis.cityRiskScore}/100
                </span>
              </div>
            </div>

            {/* Pulse Indicator */}
            <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Kernel Synchronized
              </span>
              <span className="font-mono text-cyan-400">LIVE</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
