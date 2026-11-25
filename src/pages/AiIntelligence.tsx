import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  Activity, 
  Layers, 
  AlertTriangle, 
  ArrowRight, 
  Users, 
  Car, 
  Building2, 
  Radio, 
  Clock, 
  Play, 
  RotateCw,
  Cpu,
  Check,
  Compass
} from 'lucide-react';
import { useCity } from '../context/CityContext';
import { Badge } from '../components/common/Badge';
import { Incident } from '../types';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';

export const AiIntelligence: React.FC = () => {
  const { 
    aiAnalysis, 
    triggerAiAnalysis, 
    isAiAnalyzing, 
    aiAnalysisStep, 
    executeRecommendation,
    incidents,
    sensors,
    kpis 
  } = useCity();

  const [selectedIncidentForTriage, setSelectedIncidentForTriage] = useState<string>(incidents[0]?.id || '');

  const activeIncident = incidents.find(i => i.id === selectedIncidentForTriage);

  // Radar chart data for risk factor breakdown
  const radarData = aiAnalysis.riskFactorBreakdown.map(factor => ({
    subject: factor.name.split(' ')[0] + ' ' + (factor.name.split(' ')[1] || ''),
    score: factor.score,
    fullMark: 100
  }));

  const riskColor = 
    aiAnalysis.riskScore >= 80 ? 'text-red-400 border-red-500/40 bg-red-500/10' :
    aiAnalysis.riskScore >= 60 ? 'text-amber-400 border-amber-500/40 bg-amber-500/10' :
    aiAnalysis.riskScore >= 40 ? 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10' :
    'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-cyan-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center gap-1.5">
                <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />
                NEURAL CITY ADVISOR
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Model: <span className="text-white font-bold">AETHER Intelligent Core (Deterministic Local Engine)</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI City Intelligence & Strategic Response Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Synthesizes real-time sensor streams, active incident topologies, and predictive urban physics to recommend optimal civic containment directives.
            </p>
          </div>

          {/* Prominent Analyze City Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={triggerAiAnalysis}
              disabled={isAiAnalyzing}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-navy-950 font-mono font-bold text-sm transition-all shadow-glow-cyan flex items-center justify-center gap-2.5 disabled:opacity-50"
            >
              {isAiAnalyzing ? (
                <>
                  <span className="w-4 h-4 border-2 border-navy-950 border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing Telemetry...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-navy-950" />
                  <span>Analyze City</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading Progress State */}
        {isAiAnalyzing && (
          <div className="mt-5 pt-4 border-t border-cyan-500/20 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-300 mb-1.5">
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400 animate-spin" />
                {aiAnalysisStep}
              </span>
              <span>Running Neural Simulation...</span>
            </div>
            <div className="w-full bg-navy-950 h-2 rounded-full overflow-hidden border border-cyan-500/30">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-3/4 animate-pulse rounded-full" />
            </div>
          </div>
        )}
      </div>

      {/* Main Score & Situation Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Score & Classification Gauge (1 col) */}
        <div className="glass-panel rounded-2xl p-6 border border-cyan-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                A. City Risk Score
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                Updated: {aiAnalysis.analyzedAt}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative flex items-center justify-center w-40 h-40">
                {/* Outer Ring */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="68"
                    stroke="#1E293B"
                    strokeWidth="12"
                    fill="transparent"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="68"
                    stroke={
                      aiAnalysis.riskScore >= 80 ? '#EF4444' :
                      aiAnalysis.riskScore >= 60 ? '#F59E0B' : '#00F0FF'
                    }
                    strokeWidth="12"
                    strokeDasharray={427}
                    strokeDashoffset={427 - (427 * aiAnalysis.riskScore) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>

                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-4xl font-extrabold font-mono text-white tracking-tight">
                    {aiAnalysis.riskScore}
                  </span>
                  <span className="text-xs font-mono text-slate-400 uppercase">/ 100</span>
                </div>
              </div>

              {/* B. Risk Classification */}
              <div className={`mt-4 px-4 py-1.5 rounded-full border text-xs font-mono font-bold uppercase tracking-wider ${riskColor}`}>
                B. Risk Classification: {aiAnalysis.riskClassification}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 text-center font-mono">
            {aiAnalysis.riskScore > 75 
              ? 'Multi-vector crisis active. Direct response required.' 
              : 'Urban systems operating under elevated monitored load.'}
          </div>
        </div>

        {/* C. Situation Summary & D. Affected Areas (2 cols) */}
        <div className="glass-panel rounded-2xl p-6 border border-cyan-500/20 lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-bold text-white">C. Situation Summary</h2>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed p-4 rounded-xl bg-navy-900/80 border border-slate-800 font-sans">
              {aiAnalysis.situationSummary}
            </p>

            {/* D. Affected Areas */}
            <div className="mt-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                D. Affected Areas:
              </span>
              <div className="flex flex-wrap gap-2">
                {aiAnalysis.affectedDistricts.map((dist, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-navy-900 border border-cyan-500/30 text-xs font-mono text-cyan-300 flex items-center gap-1.5"
                  >
                    <Compass className="w-3.5 h-3.5 text-cyan-400" />
                    {dist}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* F. Priority Actions */}
          <div className="mt-5 pt-4 border-t border-slate-800">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block mb-2">
              F. Priority Actions:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {aiAnalysis.priorityActions.map((action, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="w-4 h-4 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* E. Potential Impact */}
      <div>
        <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          E. Potential Impact
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel rounded-2xl p-5 border border-amber-500/20">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold mb-2">
              <Car className="w-4 h-4" />
              <span>Traffic</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {aiAnalysis.potentialImpact.traffic}
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-blue-500/20">
            <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-bold mb-2">
              <Users className="w-4 h-4" />
              <span>Citizens</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {aiAnalysis.potentialImpact.citizens}
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-purple-500/20">
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold mb-2">
              <Building2 className="w-4 h-4" />
              <span>Infrastructure</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {aiAnalysis.potentialImpact.infrastructure}
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-red-500/20">
            <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold mb-2">
              <Radio className="w-4 h-4" />
              <span>Emergency Response</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {aiAnalysis.potentialImpact.emergencyServices}
            </p>
          </div>
        </div>
      </div>

      {/* G. Recommendations */}
      <div className="glass-panel rounded-2xl p-6 border border-cyan-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              G. Recommendations
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Direct field deployment commands synthesized by local triage algorithms
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400">
            {aiAnalysis.recommendations.filter(r => r.status === 'Completed').length}/{aiAnalysis.recommendations.length} Directives Deployed
          </span>
        </div>

        <div className="space-y-3">
          {aiAnalysis.recommendations.map((rec) => {
            const isCompleted = rec.status === 'Completed';
            const isExecuting = rec.status === 'Executing';

            return (
              <div
                key={rec.id}
                className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  isCompleted 
                    ? 'bg-emerald-950/20 border-emerald-500/30' 
                    : isExecuting
                      ? 'bg-cyan-950/30 border-cyan-400 shadow-glow-cyan'
                      : 'bg-navy-900/70 border-slate-800 hover:border-cyan-500/40'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-lg border shrink-0 mt-0.5 ${
                    rec.priority === 'Immediate' ? 'bg-red-500/15 text-red-400 border-red-500/30' :
                    rec.priority === 'High' ? 'bg-amber-500/15 text-amber-400 border-amber-500/30' :
                    'bg-cyan-500/15 text-cyan-400 border-cyan-500/30'
                  }`}>
                    <ShieldAlert className="w-4 h-4" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-cyan-400">{rec.id}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {rec.category}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        rec.priority === 'Immediate' ? 'bg-red-500/20 text-red-300 border-red-500/40' :
                        'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}>
                        {rec.priority} Priority
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white mt-1">
                      {rec.title}
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      {rec.action}
                    </p>
                    <div className="text-[11px] text-slate-400 mt-1 font-mono">
                      <span className="text-cyan-400">Rationale:</span> {rec.rationale} • <span className="text-slate-500">Est. Time: {rec.estimatedResolutionTime}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-auto shrink-0 flex justify-end">
                  <button
                    onClick={() => executeRecommendation(rec.id)}
                    disabled={isCompleted || isExecuting}
                    className={`w-full md:w-auto px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      isCompleted 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default'
                        : isExecuting 
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 animate-pulse'
                          : 'bg-cyan-500 hover:bg-cyan-400 text-navy-950 shadow-glow-cyan'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Deployed & Active</span>
                      </>
                    ) : isExecuting ? (
                      <>
                        <RotateCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Broadcasting...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>Deploy Protocol</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Risk Breakdown & Incident-Specific Triage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* H. Risk Analysis */}
        <div className="glass-panel rounded-2xl p-6 border border-cyan-500/20 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-1">
              H. Risk Analysis
            </h3>
            <p className="text-xs text-slate-400 font-mono mb-4">
              Vector factor weights and explanation for why the {aiAnalysis.riskScore}/100 score was calculated
            </p>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" stroke="#94A3B8" fontSize={10} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={9} />
                  <Radar name="Threat Factor" dataKey="score" stroke="#00F0FF" fill="#00F0FF" fillOpacity={0.4} />
                  <Tooltip contentStyle={{ backgroundColor: '#0D1326', borderColor: '#00F0FF', borderRadius: '8px', fontSize: '11px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 mt-2">
              {aiAnalysis.riskFactorBreakdown.map((f, i) => (
                <div key={i} className="p-2 rounded-lg bg-navy-900/60 border border-slate-800 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-200">{f.name}</span>
                    <p className="text-[11px] text-slate-400">{f.impactDescription}</p>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold text-cyan-400">{f.score}</span>
                    <span className="text-[10px] text-slate-500 ml-1">({Math.round(f.weight * 100)}% wt)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Incident-Specific AI Analysis Deep Dive */}
        <div className="glass-panel rounded-2xl p-6 border border-cyan-500/20 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-1">
              I. Incident-Specific Analysis
            </h3>
            <p className="text-xs text-slate-400 font-mono mb-3">
              Inspect any active incident for targeted AI diagnostic recommendations
            </p>

            {/* Selector */}
            <select
              value={selectedIncidentForTriage}
              onChange={(e) => setSelectedIncidentForTriage(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400 mb-4"
            >
              {incidents.map((inc) => (
                <option key={inc.id} value={inc.id}>
                  {inc.id} – {inc.title} ({inc.severity})
                </option>
              ))}
            </select>

            {activeIncident && (
              <div className="p-4 rounded-xl bg-navy-900/90 border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge type="category" value={activeIncident.category} size="sm" />
                    <Badge type="severity" value={activeIncident.severity} size="sm" />
                  </div>
                  <Badge type="status" value={activeIncident.status} size="sm" />
                </div>

                <div className="font-bold text-white text-sm">{activeIncident.title}</div>
                <div className="text-slate-400">{activeIncident.locationName}</div>

                <div className="p-3 rounded-lg bg-navy-950 border border-slate-800/80 text-slate-300 leading-relaxed">
                  <strong className="text-cyan-400 block mb-1">AI Operational Diagnosis:</strong>
                  {activeIncident.description}
                </div>

                <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/30 text-cyan-200">
                  <strong className="text-cyan-400 block mb-1">Prescribed Action:</strong>
                  {activeIncident.recommendedAction}
                </div>

                <div className="grid grid-cols-2 gap-2 text-slate-400 font-mono text-[11px] pt-1">
                  <div>Affected Population: <span className="text-white">{activeIncident.impactMetrics.affectedCitizensEstimated.toLocaleString()}</span></div>
                  <div>Delay Factor: <span className="text-amber-400">+{activeIncident.impactMetrics.trafficDelayMinutes} mins</span></div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
            Autonomous rule-based correlation updated every simulation tick.
          </div>
        </div>
      </div>
    </div>
  );
};
