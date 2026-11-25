import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Layers, 
  MapPin, 
  AlertTriangle, 
  Droplets, 
  Car, 
  Cpu, 
  AlertOctagon, 
  Flame, 
  Shield, 
  Navigation, 
  Maximize2, 
  Filter, 
  CheckCircle, 
  Clock, 
  X,
  Radio,
  Eye,
  EyeOff
} from 'lucide-react';
import { useCity } from '../context/CityContext';
import { Incident, IoTSensor, Severity, IncidentCategory, IncidentStatus } from '../types';
import { Badge } from '../components/common/Badge';

export const CityMap: React.FC = () => {
  const { 
    incidents, 
    sensors, 
    mapLayers, 
    toggleMapLayer, 
    selectedIncident, 
    setSelectedIncident, 
    selectedSensor, 
    setSelectedSensor,
    updateIncidentStatus 
  } = useCity();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersGroupRef = useRef<{
    floodCircles: L.Circle[];
    incidents: L.Marker[];
    sensors: L.Marker[];
    routes: L.Polyline[];
    polygons: L.Polygon[];
  }>({
    floodCircles: [],
    incidents: [],
    sensors: [],
    routes: [],
    polygons: []
  });

  const [activeTab, setActiveTab] = useState<'legend' | 'layers'>('layers');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [activeInspectorItem, setActiveInspectorItem] = useState<{
    type: 'incident' | 'sensor';
    data: Incident | IoTSensor;
  } | null>(null);

  // Initialize Map Once
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Centered at Metro Bay / San Francisco urban core
    const map = L.map(mapContainerRef.current, {
      center: [37.7749, -122.4194],
      zoom: 13,
      zoomControl: false,
      attributionControl: true
    });

    // Dark cyber CartoDB tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);

    // Zoom control in bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    mapInstanceRef.current = map;

    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    const handleResize = () => {
      map.invalidateSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Map Markers & Overlays whenever data or layers change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear previous layers
    layersGroupRef.current.floodCircles.forEach(c => c.remove());
    layersGroupRef.current.incidents.forEach(m => m.remove());
    layersGroupRef.current.sensors.forEach(m => m.remove());
    layersGroupRef.current.routes.forEach(r => r.remove());
    layersGroupRef.current.polygons.forEach(p => p.remove());

    layersGroupRef.current = {
      floodCircles: [],
      incidents: [],
      sensors: [],
      routes: [],
      polygons: []
    };

    // Filter incidents
    const filteredIncidents = incidents.filter(inc => {
      if (severityFilter !== 'all' && inc.severity !== severityFilter) return false;
      if (inc.category === 'Flood' && !mapLayers.floodZones) return false;
      if (inc.category === 'Traffic Congestion' && !mapLayers.trafficCongestion) return false;
      if (inc.category === 'Road Blockage' && !mapLayers.roadBlockages) return false;
      if (inc.category === 'Emergency' && !mapLayers.emergencyIncidents) return false;
      return true;
    });

    // 1. Draw Affected Radius Circles & Polygons
    filteredIncidents.forEach(inc => {
      let circleColor = '#EF4444';
      if (inc.category === 'Flood') circleColor = '#00F0FF';
      else if (inc.category === 'Traffic Congestion') circleColor = '#F59E0B';
      else if (inc.category === 'Road Blockage') circleColor = '#A855F7';

      const circle = L.circle([inc.coordinates.lat, inc.coordinates.lng], {
        radius: inc.affectedRadiusMeters,
        color: circleColor,
        fillColor: circleColor,
        fillOpacity: 0.18,
        weight: 1.5,
        dashArray: '4, 4'
      }).addTo(map);

      layersGroupRef.current.floodCircles.push(circle);

      // Draw Detour routes if enabled
      if (mapLayers.alternativeRoutes && inc.detourRoute && inc.detourRoute.length > 0) {
        const polylinePoints = inc.detourRoute.map(pt => [pt.lat, pt.lng] as [number, number]);
        const route = L.polyline(polylinePoints, {
          color: '#10B981',
          weight: 4,
          opacity: 0.85,
          dashArray: '8, 8'
        }).addTo(map);

        route.bindTooltip(`Bypass Route: ${inc.title}`, { className: 'leaflet-tooltip-dark' });
        layersGroupRef.current.routes.push(route);
      }

      // Draw Evacuation polygon if exists
      if (inc.evacuationZone && inc.evacuationZone.length > 0) {
        const polygonPoints = inc.evacuationZone.map(pt => [pt.lat, pt.lng] as [number, number]);
        const poly = L.polygon(polygonPoints, {
          color: '#EF4444',
          fillColor: '#EF4444',
          fillOpacity: 0.22,
          weight: 2
        }).addTo(map);

        poly.bindTooltip(`Evacuation Cordon: ${inc.title}`, { className: 'leaflet-tooltip-dark' });
        layersGroupRef.current.polygons.push(poly);
      }

      // 2. Add Incident Markers
      const isCritical = inc.severity === 'Critical';
      const markerHtml = `
        <div class="relative flex items-center justify-center cursor-pointer group" style="width: 38px; height: 38px;">
          <div class="absolute inset-0 rounded-full ${isCritical ? 'critical-ring' : 'radar-ring'} opacity-80" style="background-color: ${circleColor}33;"></div>
          <div class="relative w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2" 
               style="background-color: #090D1A; border-color: ${circleColor};">
            <span style="color: ${circleColor}; font-size: 14px; font-weight: bold;">
              ${inc.category === 'Flood' ? '💧' : inc.category === 'Traffic Congestion' ? '🚗' : inc.category === 'Road Blockage' ? '⛔' : '🔥'}
            </span>
          </div>
          <div class="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-black ${
            isCritical ? 'bg-red-500 animate-ping' : inc.severity === 'High' ? 'bg-amber-400' : 'bg-cyan-400'
          }"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'incident-map-marker',
        iconSize: [38, 38],
        iconAnchor: [19, 19]
      });

      const marker = L.marker([inc.coordinates.lat, inc.coordinates.lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setActiveInspectorItem({ type: 'incident', data: inc });
        setSelectedIncident(inc);
      });

      marker.bindTooltip(`
        <div style="font-family: 'Inter', sans-serif; font-size: 12px; color: #fff;">
          <div style="font-weight: bold; color: ${circleColor};">${inc.id} [${inc.severity}]</div>
          <div>${inc.title}</div>
          <div style="color: #94a3b8; font-size: 10px;">${inc.locationName}</div>
        </div>
      `, {
        direction: 'top',
        offset: [0, -18],
        className: 'leaflet-popup-dark'
      });

      layersGroupRef.current.incidents.push(marker);
    });

    // 3. Add IoT Sensors if enabled
    if (mapLayers.iotSensors) {
      sensors.forEach(sensor => {
        const isWarning = sensor.status === 'Warning';
        const isOffline = sensor.status === 'Offline';
        const sensorColor = isOffline ? '#64748B' : isWarning ? '#F59E0B' : '#10B981';

        const sensorHtml = `
          <div class="relative flex items-center justify-center cursor-pointer" style="width: 24px; height: 24px;">
            ${isWarning ? `<div class="absolute inset-0 rounded-full animate-ping opacity-75" style="background-color: ${sensorColor};"></div>` : ''}
            <div class="w-5 h-5 rounded-md flex items-center justify-center border" 
                 style="background-color: #0D1326; border-color: ${sensorColor};">
              <span style="font-size: 10px;">📡</span>
            </div>
          </div>
        `;

        const sensorIcon = L.divIcon({
          html: sensorHtml,
          className: 'sensor-map-marker',
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        const sensorMarker = L.marker([sensor.coordinates.lat, sensor.coordinates.lng], { icon: sensorIcon }).addTo(map);

        sensorMarker.on('click', () => {
          setActiveInspectorItem({ type: 'sensor', data: sensor });
          setSelectedSensor(sensor);
        });

        sensorMarker.bindTooltip(`
          <div style="font-family: monospace; font-size: 11px;">
            <span style="color: #00F0FF; font-weight: bold;">${sensor.id}</span> [${sensor.status}]<br/>
            <span>${sensor.name}</span><br/>
            <span style="color: #F59E0B;">Reading: ${sensor.currentReading} ${sensor.unit}</span>
          </div>
        `, {
          direction: 'top',
          offset: [0, -12]
        });

        layersGroupRef.current.sensors.push(sensorMarker);
      });
    }

  }, [incidents, sensors, mapLayers, severityFilter]);

  // Center on selected incident from context if triggered externally
  useEffect(() => {
    if (selectedIncident && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(
        [selectedIncident.coordinates.lat, selectedIncident.coordinates.lng],
        15,
        { duration: 1.2 }
      );
      setActiveInspectorItem({ type: 'incident', data: selectedIncident });
    }
  }, [selectedIncident]);

  return (
    <div className="relative h-[calc(100vh-64px)] w-full overflow-hidden flex flex-col">
      {/* Map Header Floating Overlay */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 flex-wrap pointer-events-auto">
        <div className="glass-panel rounded-xl px-4 py-2 border border-cyan-500/30 flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span className="font-bold">METRO GEO-SPATIAL MESH</span>
          </div>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">
            Active Pins: <span className="text-white font-bold">{incidents.length} Incidents</span>,{' '}
            <span className="text-cyan-400 font-bold">{sensors.length} Sensors</span>
          </span>
        </div>

        {/* Severity Filter Dropdown */}
        <div className="glass-panel rounded-xl px-3 py-1.5 border border-slate-700 flex items-center gap-2 text-xs font-mono">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="all" className="bg-navy-900">All Severities</option>
            <option value="Critical" className="bg-navy-900 text-red-400">Critical Only</option>
            <option value="High" className="bg-navy-900 text-amber-400">High Only</option>
            <option value="Moderate" className="bg-navy-900 text-yellow-400">Moderate Only</option>
            <option value="Low" className="bg-navy-900 text-cyan-400">Low Only</option>
          </select>
        </div>

        {/* Reset View */}
        <button
          onClick={() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.flyTo([37.7749, -122.4194], 13);
            }
          }}
          className="glass-panel hover:bg-navy-800 text-slate-300 rounded-xl px-3 py-2 border border-slate-700 text-xs font-mono transition-colors flex items-center gap-1.5"
          title="Reset Map Center"
        >
          <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Reset Extent</span>
        </button>
      </div>

      {/* Layer Controls Panel (Top Right Floating) */}
      <div className="absolute top-4 right-4 z-20 w-72 max-w-[calc(100vw-32px)] glass-panel rounded-2xl border border-cyan-500/30 shadow-2xl overflow-hidden pointer-events-auto">
        <div className="flex border-b border-slate-800 bg-navy-950/60 text-xs font-mono">
          <button
            onClick={() => setActiveTab('layers')}
            className={`flex-1 py-2.5 px-3 flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'layers' ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold bg-cyan-500/10' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Map Layers</span>
          </button>
          <button
            onClick={() => setActiveTab('legend')}
            className={`flex-1 py-2.5 px-3 flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'legend' ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold bg-cyan-500/10' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Legend</span>
          </button>
        </div>

        <div className="p-3.5 space-y-2 text-xs">
          {activeTab === 'layers' ? (
            <div className="space-y-2">
              <label className="flex items-center justify-between p-2 rounded-lg bg-navy-900/60 hover:bg-navy-900 cursor-pointer border border-slate-800/80 transition-colors">
                <span className="flex items-center gap-2 text-slate-200">
                  <Droplets className="w-3.5 h-3.5 text-blue-400" />
                  <span>Flood Zones</span>
                </span>
                <input
                  type="checkbox"
                  checked={mapLayers.floodZones}
                  onChange={() => toggleMapLayer('floodZones')}
                  className="rounded border-slate-700 bg-navy-950 text-cyan-400 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-lg bg-navy-900/60 hover:bg-navy-900 cursor-pointer border border-slate-800/80 transition-colors">
                <span className="flex items-center gap-2 text-slate-200">
                  <Car className="w-3.5 h-3.5 text-amber-400" />
                  <span>Traffic</span>
                </span>
                <input
                  type="checkbox"
                  checked={mapLayers.trafficCongestion}
                  onChange={() => toggleMapLayer('trafficCongestion')}
                  className="rounded border-slate-700 bg-navy-950 text-cyan-400 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-lg bg-navy-900/60 hover:bg-navy-900 cursor-pointer border border-slate-800/80 transition-colors">
                <span className="flex items-center gap-2 text-slate-200">
                  <AlertOctagon className="w-3.5 h-3.5 text-purple-400" />
                  <span>Road Blockages</span>
                </span>
                <input
                  type="checkbox"
                  checked={mapLayers.roadBlockages}
                  onChange={() => toggleMapLayer('roadBlockages')}
                  className="rounded border-slate-700 bg-navy-950 text-cyan-400 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-lg bg-navy-900/60 hover:bg-navy-900 cursor-pointer border border-slate-800/80 transition-colors">
                <span className="flex items-center gap-2 text-slate-200">
                  <Flame className="w-3.5 h-3.5 text-red-400" />
                  <span>Emergency Incidents</span>
                </span>
                <input
                  type="checkbox"
                  checked={mapLayers.emergencyIncidents}
                  onChange={() => toggleMapLayer('emergencyIncidents')}
                  className="rounded border-slate-700 bg-navy-950 text-cyan-400 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-lg bg-navy-900/60 hover:bg-navy-900 cursor-pointer border border-slate-800/80 transition-colors">
                <span className="flex items-center gap-2 text-slate-200">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>IoT Sensors</span>
                </span>
                <input
                  type="checkbox"
                  checked={mapLayers.iotSensors}
                  onChange={() => toggleMapLayer('iotSensors')}
                  className="rounded border-slate-700 bg-navy-950 text-cyan-400 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-lg bg-navy-900/60 hover:bg-navy-900 cursor-pointer border border-slate-800/80 transition-colors">
                <span className="flex items-center gap-2 text-slate-200">
                  <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Smart Detour Corridors</span>
                </span>
                <input
                  type="checkbox"
                  checked={mapLayers.alternativeRoutes}
                  onChange={() => toggleMapLayer('alternativeRoutes')}
                  className="rounded border-slate-700 bg-navy-950 text-cyan-400 focus:ring-0"
                />
              </label>
            </div>
          ) : (
            <div className="space-y-2.5 font-mono text-[11px] text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center text-[8px] font-bold text-red-400">!</span>
                <span>Critical Incident (Immediate Response)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center text-[8px] font-bold text-amber-400">▲</span>
                <span>High Severity / Traffic Saturation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center text-[8px] font-bold text-cyan-400">💧</span>
                <span>Water Level / Flood Inundation Area</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-sm bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-[8px] font-bold text-emerald-400">📡</span>
                <span>IoT Telemetry Node (Online)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-1 border-b-2 border-emerald-400 border-dashed" />
                <span>Smart Reroute / Detour Bypass</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Slide-Up Inspector Card when a marker is clicked */}
      {activeInspectorItem && (
        <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:w-[450px] z-20 glass-panel rounded-2xl p-5 border border-cyan-500/40 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom duration-200">
          <div className="flex items-start justify-between">
            {activeInspectorItem.type === 'incident' ? (
              <div className="space-y-1">
                {(() => {
                  const inc = activeInspectorItem.data as Incident;
                  return (
                    <>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-cyan-400">{inc.id}</span>
                        <Badge type="category" value={inc.category} size="sm" />
                        <Badge type="severity" value={inc.severity} size="sm" withPulse />
                        <Badge type="status" value={inc.status} size="sm" />
                      </div>
                      <h3 className="text-base font-bold text-white mt-1">{inc.title}</h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        <span>{inc.locationName}</span>
                      </p>
                      <p className="text-xs text-slate-300 pt-2 leading-relaxed">{inc.description}</p>
                      
                      <div className="mt-3 p-2.5 rounded-lg bg-navy-900/80 border border-cyan-500/20 text-xs text-cyan-200">
                        <span className="font-mono font-bold text-cyan-400">Action:</span> {inc.recommendedAction}
                      </div>

                      {/* Quick Status Bar */}
                      <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between gap-1 flex-wrap">
                        <span className="text-[11px] font-mono text-slate-400">Quick Status:</span>
                        {(['Open', 'Investigating', 'Responding', 'Resolved'] as IncidentStatus[]).map((st) => (
                          <button
                            key={st}
                            onClick={() => {
                              updateIncidentStatus(inc.id, st);
                              setActiveInspectorItem({
                                type: 'incident',
                                data: { ...inc, status: st }
                              });
                            }}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors border ${
                              inc.status === st 
                                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold' 
                                : 'bg-navy-950 text-slate-400 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="space-y-1">
                {(() => {
                  const sensor = activeInspectorItem.data as IoTSensor;
                  return (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-cyan-400">{sensor.id}</span>
                        <Badge type="sensorStatus" value={sensor.status} size="sm" withPulse />
                        <span className="font-mono text-[10px] text-slate-400">{sensor.type}</span>
                      </div>
                      <h3 className="text-base font-bold text-white mt-1">{sensor.name}</h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        <span>{sensor.locationName}</span>
                      </p>
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-2xl font-bold font-mono text-cyan-400">
                          {sensor.currentReading}
                        </span>
                        <span className="text-xs font-mono text-slate-300">{sensor.unit}</span>
                        <span className="text-[11px] text-slate-500 ml-auto">
                          Threshold: {sensor.warningThreshold}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-2 font-mono">
                        Battery: {sensor.batteryLevel}% • Last packet: {sensor.lastUpdateTime}
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            <button
              onClick={() => setActiveInspectorItem(null)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
