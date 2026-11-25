import React, { useState } from 'react';
import { X, PlusCircle } from 'lucide-react';
import { useCity } from '../../context/CityContext';
import { IncidentCategory, Severity } from '../../types';

interface NewIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewIncidentModal: React.FC<NewIncidentModalProps> = ({ isOpen, onClose }) => {
  const { addNewIncident } = useCity();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<IncidentCategory>('Flood');
  const [locationName, setLocationName] = useState('');
  const [severity, setSeverity] = useState<Severity>('High');
  const [description, setDescription] = useState('');
  const [recommendedAction, setRecommendedAction] = useState('');

  if (!isOpen) return null;

  const sanitizeInput = (str: string) => str.replace(/[<>]/g, '').trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTitle = sanitizeInput(title);
    const cleanLocation = sanitizeInput(locationName);
    if (!cleanTitle || !cleanLocation) return;

    // Default coordinates in city area
    const offsetLat = (Math.random() - 0.5) * 0.04;
    const offsetLng = (Math.random() - 0.5) * 0.04;

    addNewIncident({
      title: cleanTitle,
      category,
      locationName: cleanLocation,
      coordinates: {
        lat: 37.7749 + offsetLat,
        lng: -122.4194 + offsetLng,
      },
      severity,
      status: 'Open',
      reportedTime: 'Just now',
      description: sanitizeInput(description) || 'Autonomous sensor anomaly correlation detected potential civic disruption.',
      affectedRadiusMeters: severity === 'Critical' ? 500 : severity === 'High' ? 350 : 200,
      relatedSensorIds: ['SENS-WL-01', 'SENS-TR-01'],
      recommendedAction: sanitizeInput(recommendedAction) || 'Deploy nearest field patrol unit and establish initial monitoring cordon.',
      impactMetrics: {
        affectedCitizensEstimated: Math.floor(1000 + Math.random() * 4000),
        trafficDelayMinutes: Math.floor(10 + Math.random() * 25),
      }
    });

    // Reset & close
    setTitle('');
    setLocationName('');
    setDescription('');
    setRecommendedAction('');
    onClose();
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-incident-heading"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div 
        className="glass-panel w-full max-w-lg rounded-2xl border border-cyan-500/30 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-navy-900/60">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-cyan-400" aria-hidden="true" />
            <h2 id="new-incident-heading" className="text-lg font-bold text-white">Report / Simulate Incident</h2>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="p-1.5 text-slate-400 hover:text-white rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="incident-title" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1">
              Incident Title <span className="text-red-400">*</span>
            </label>
            <input
              id="incident-title"
              type="text"
              required
              maxLength={120}
              placeholder="e.g. Waterfront Storm Overflow"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="incident-category" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1">
                Category
              </label>
              <select
                id="incident-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as IncidentCategory)}
                className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              >
                <option value="Flood">Flood</option>
                <option value="Traffic Congestion">Traffic Congestion</option>
                <option value="Road Blockage">Road Blockage</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>

            <div>
              <label htmlFor="incident-severity" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1">
                Severity
              </label>
              <select
                id="incident-severity"
                value={severity}
                onChange={(e) => setSeverity(e.target.value as Severity)}
                className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Moderate">Moderate</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="incident-location" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1">
              Location Name / District <span className="text-red-400">*</span>
            </label>
            <input
              id="incident-location"
              type="text"
              required
              maxLength={120}
              placeholder="e.g. Marina District Pier 39 Corridor"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </div>

          <div>
            <label htmlFor="incident-description" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1">
              Description
            </label>
            <textarea
              id="incident-description"
              rows={2}
              maxLength={500}
              placeholder="Provide situational context and field observations..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </div>

          <div>
            <label htmlFor="incident-protocol" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1">
              Recommended Protocol
            </label>
            <input
              id="incident-protocol"
              type="text"
              maxLength={200}
              placeholder="e.g. Deploy water pumps, activate local detour route."
              value={recommendedAction}
              onChange={(e) => setRecommendedAction(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-700 focus:ring-2 focus:ring-slate-400 focus:outline-none transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-bold text-sm shadow-glow-cyan focus:ring-2 focus:ring-cyan-300 focus:outline-none transition-colors"
            >
              Dispatch Incident
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
