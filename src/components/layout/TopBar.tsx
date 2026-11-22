import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Globe2, 
  ShieldAlert, 
  Plus, 
  Radio, 
  Volume2, 
  VolumeX, 
  User,
  Clock
} from 'lucide-react';
import { useCity } from '../../context/CityContext';
import { NotificationPanel } from './NotificationPanel';
import { NewIncidentModal } from './NewIncidentModal';

interface TopBarProps {
  onMobileMenuToggle: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMobileMenuToggle }) => {
  const { 
    kpis, 
    unreadAlertsCount, 
    selectedCity, 
    setSelectedCity,
    searchQuery,
    setSearchQuery,
    simulation
  } = useCity();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isNewIncidentOpen, setIsNewIncidentOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const riskColor = 
    kpis.cityRiskScore >= 80 ? 'text-red-400 border-red-500/40 bg-red-500/10 shadow-glow-red' :
    kpis.cityRiskScore >= 60 ? 'text-amber-400 border-amber-500/40 bg-amber-500/10 shadow-glow-amber' :
    kpis.cityRiskScore >= 40 ? 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10' :
    'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-navy-900/90 border-b border-cyan-500/20 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & City Selector */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuToggle}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 lg:hidden transition-colors"
            aria-label="Toggle navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* City Selector */}
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-cyan-400 hidden sm:block" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-navy-950/80 border border-slate-700/80 rounded-lg text-xs font-mono text-cyan-300 px-2.5 py-1.5 focus:outline-none focus:border-cyan-400 transition-colors"
            >
              <option value="Neo-Metropolis (Metro Bay)">Neo-Metropolis (Metro Bay)</option>
              <option value="Pacific Central Coast">Pacific Central Coast</option>
              <option value="Tokyo Harbor District">Tokyo Harbor District</option>
            </select>
          </div>

          {/* Live Clock */}
          <div className="hidden xl:flex items-center gap-1.5 text-xs font-mono text-slate-400 pl-2 border-l border-slate-800">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{currentTime}</span>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search incidents, sensors, or districts (e.g. SENS-WL, Canal, Pier)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-navy-950/70 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all font-mono"
            />
          </div>
        </div>

        {/* Right: City Risk Score, Simulation Pill, Notifications, Quick Action */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* City Risk Score Pill */}
          <div className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono ${riskColor}`}>
            <ShieldAlert className="w-3.5 h-3.5" />
            <span className="font-semibold">THREAT: {kpis.cityRiskScore}/100</span>
          </div>

          {/* Simulation Status */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-navy-950 border border-slate-800 text-[11px] font-mono">
            <Radio className={`w-3 h-3 ${simulation.isRunning ? 'text-cyan-400 animate-pulse' : 'text-slate-500'}`} />
            <span className="text-slate-400">SIM:</span>
            <span className={simulation.isRunning ? 'text-cyan-300 font-bold' : 'text-slate-400'}>
              {simulation.isRunning ? `ACTIVE [T+${simulation.tick}]` : 'PAUSED'}
            </span>
          </div>

          {/* Quick Add Incident */}
          <button
            onClick={() => setIsNewIncidentOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-medium transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Report Incident</span>
          </button>

          {/* Audio Chime Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Mute Alert Chimes' : 'Unmute Alert Chimes'}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Notification Bell */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-navy-800 transition-colors"
            aria-label="Alerts"
          >
            <Bell className="w-4 h-4 text-slate-300" />
            {unreadAlertsCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-mono font-bold text-white shadow-glow-red animate-pulse">
                {unreadAlertsCount}
              </span>
            )}
          </button>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white font-mono text-xs font-bold ring-1 ring-cyan-400/50">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden 2xl:block text-left text-[11px] leading-tight">
              <div className="font-semibold text-slate-200">Director Vance</div>
              <div className="text-cyan-400 font-mono text-[9px]">AETHER OPERATIVE</div>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-out & Modals */}
      <NotificationPanel 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />
      <NewIncidentModal
        isOpen={isNewIncidentOpen}
        onClose={() => setIsNewIncidentOpen(false)}
      />
    </>
  );
};
