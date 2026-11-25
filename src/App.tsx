import React, { useState } from 'react';
import { CityProvider } from './context/CityContext';
import { Sidebar, NavPage } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { OverviewDashboard } from './pages/OverviewDashboard';
import { CityMap } from './pages/CityMap';
import { IncidentManagement } from './pages/IncidentManagement';
import { SensorMonitoring } from './pages/SensorMonitoring';
import { AiIntelligence } from './pages/AiIntelligence';
import { SimulationStudio } from './pages/SimulationStudio';
import { ReportsAnalytics } from './pages/ReportsAnalytics';
import { IncidentDetailModal } from './components/layout/IncidentDetailModal';
import { SensorDetailModal } from './components/layout/SensorDetailModal';

export const MainLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<NavPage>('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-navy-950 text-slate-100 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        currentPage={currentPage}
        onSelectPage={(page) => setCurrentPage(page)}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Top Bar */}
        <TopBar
          onMobileMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        {/* Scrollable Page Body (or full-height map) */}
        <main 
          id="main-content" 
          role="main" 
          tabIndex={-1} 
          aria-label="Operations Center Content"
          className={`flex-1 overflow-x-hidden focus:outline-none ${currentPage === 'map' ? 'overflow-y-hidden' : 'overflow-y-auto'}`}
        >
          {currentPage === 'overview' && <OverviewDashboard onNavigate={setCurrentPage} />}
          {currentPage === 'map' && <CityMap />}
          {currentPage === 'incidents' && <IncidentManagement />}
          {currentPage === 'sensors' && <SensorMonitoring />}
          {currentPage === 'ai' && <AiIntelligence />}
          {currentPage === 'simulation' && <SimulationStudio />}
          {currentPage === 'reports' && <ReportsAnalytics />}
        </main>
      </div>

      {/* Global Modals for Incident & Sensor Inspection */}
      <IncidentDetailModal />
      <SensorDetailModal />
    </div>
  );
};

export function App() {
  return (
    <CityProvider>
      <MainLayout />
    </CityProvider>
  );
}

export default App;
