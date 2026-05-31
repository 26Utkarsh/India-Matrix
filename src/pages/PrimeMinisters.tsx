import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { Award, Calendar, BookOpen, Globe, Shield, ChevronDown, ChevronUp, MapPin, Compass } from 'lucide-react';
import { PRIME_MINISTERS } from '../data/primeMinisters';
import { GEOPOLITICAL_EVENTS } from '../data/geopoliticalEvents';
import { useTimelineStore } from '../store';

const PARTY_COLORS: Record<string, string> = {
  INC: '#138808', BJP: '#FF9933', JP: '#8B4513', 'Janata Party': '#8B4513'
};

const PARTY_GRADIENTS: Record<string, string> = {
  INC: 'url(#incGrad)',
  BJP: 'url(#bjpGrad)',
  JP: 'url(#otherGrad)',
  'Janata Party': 'url(#otherGrad)'
};

const ScoreBar = ({ score, max = 25, color }: { score: number; max?: number; color: string }) => (
  <div className="flex items-center gap-2">
    <div className="flex-1 h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ 
          background: `linear-gradient(90deg, ${color}, ${color}dd)` 
        }}
        initial={{ width: 0 }}
        animate={{ width: `${(score / max) * 100}%` }}
        transition={{ duration: 1, delay: 0.3 }}
      />
    </div>
    <span className="text-xs font-mono text-slate-500 dark:text-white/60 w-10 text-right">{score}/{max}</span>
  </div>
);

const PMCard: React.FC<{ pm: typeof PRIME_MINISTERS[0]; expanded: boolean; onToggle: () => void }> = ({ pm, expanded, onToggle }) => {
  const partyColor = PARTY_COLORS[pm.party_abbr] || PARTY_COLORS[pm.party] || '#FF9933';
  const partyGradient = PARTY_GRADIENTS[pm.party_abbr] || partyColor;
  const pmEvents = GEOPOLITICAL_EVENTS.filter(e => e.pm_id === pm.id);

  const radarData = [
    { subject: 'Economic', A: pm.economic_score, fullMark: 25 },
    { subject: 'Social', A: pm.social_score, fullMark: 25 },
    { subject: 'Foreign', A: pm.foreign_score, fullMark: 25 },
    { subject: 'Governance', A: pm.governance_score, fullMark: 25 },
  ];

  const gdpData = [
    { label: 'Start', gdp: pm.gdp_start_usd },
    { label: 'End', gdp: pm.gdp_end_usd },
  ];

  return (
    <motion.div
      id={`pm-card-${pm.id}`}
      className="glass rounded-2xl overflow-hidden hover-lift border transition-all duration-300 shadow-sm"
      style={{ borderColor: `${partyColor}20` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Card Header */}
      <div className="p-4 flex gap-4">
        <div className="relative shrink-0">
          <img
            src={pm.image_url}
            alt={pm.name}
            className="w-16 h-16 rounded-xl object-cover object-top border border-slate-200 dark:border-white/10 shadow-sm"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(pm.name)}&background=1a2540&color=FF9933&size=80`;
            }}
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm"
            style={{ background: partyColor }}
          >
            {pm.id}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display font-bold text-slate-900 dark:text-white text-base md:text-lg tracking-tight">{pm.name}</h3>
              <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                <span className="text-[10px] px-1.5 py-0.5 rounded font-bold border"
                  style={{ color: partyColor, borderColor: `${partyColor}30`, background: `${partyColor}12` }}>
                  {pm.party_abbr}
                </span>
                <span className="text-xs text-slate-700 dark:text-white/60 font-medium">{pm.coalition}</span>
                {!pm.majority && <span className="text-[10px] px-1 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold">Coalition</span>}
              </div>
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-500 dark:text-white/50">
                <Calendar size={11} className="text-slate-400 dark:text-white/30" />
                <span className="font-medium">{pm.start_date} — {pm.end_date}</span>
              </div>
            </div>

            {/* Legacy Score */}
            <div className="text-center shrink-0">
              <div className="relative w-14 h-14">
                <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="24" fill="none" stroke="currentColor" className="text-slate-200 dark:text-white/5" strokeWidth="4" />
                  <circle cx="28" cy="28" r="24" fill="none" stroke={partyColor} strokeWidth="4"
                    strokeDasharray={`${(pm.legacy_score / 100) * 150.8} 150.8`}
                    strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm font-bold font-mono" style={{ color: partyColor }}>{pm.legacy_score}</span>
                  <span className="text-[9px] text-slate-400 dark:text-white/20">/ 100</span>
                </div>
              </div>
              <div className="text-[10px] text-slate-500 dark:text-white/40 font-bold mt-0.5">Legacy</div>
            </div>
          </div>

          {/* Quick metrics with real sourcing labels */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="bg-slate-50 dark:bg-white/3 p-2 rounded-xl text-center border border-slate-100 dark:border-white/3 hover-lift">
              <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm md:text-base">{pm.avg_gdp_growth}%</div>
              <div className="text-[9px] text-slate-500 dark:text-white/40 font-bold">Avg Growth</div>
              <div className="text-[7px] text-slate-400 dark:text-white/20 font-mono tracking-tighter">Source: MoSPI</div>
            </div>
            <div className="bg-slate-50 dark:bg-white/3 p-2 rounded-xl text-center border border-slate-100 dark:border-white/3 hover-lift">
              <div className="font-mono font-bold text-slate-900 dark:text-white text-xs sm:text-sm md:text-base">${pm.gdp_end_usd}B</div>
              <div className="text-[9px] text-slate-500 dark:text-white/40 font-bold">Exit GDP</div>
              <div className="text-[7px] text-slate-400 dark:text-white/20 font-mono tracking-tighter">Source: World Bank</div>
            </div>
            <div className="bg-slate-50 dark:bg-white/3 p-2 rounded-xl text-center border border-slate-100 dark:border-white/3 hover-lift">
              <div className="font-mono font-bold text-blue-600 dark:text-blue-400 text-xs sm:text-sm md:text-base">{pm.inflation_avg}%</div>
              <div className="text-[9px] text-slate-500 dark:text-white/40 font-bold">Avg CPI</div>
              <div className="text-[7px] text-slate-400 dark:text-white/20 font-mono tracking-tighter">Source: RBI</div>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-white/40 dark:hover:text-white border-t border-slate-200 dark:border-white/5 transition-colors bg-slate-50/50 dark:bg-[#0c1328]/30"
      >
        {expanded ? <><ChevronUp size={14} /> Hide Details</> : <><ChevronDown size={14} /> Full Report Card</>}
      </button>

      {/* Expanded Details */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border-t border-slate-200 dark:border-white/5 p-4 space-y-4 bg-white/40 dark:bg-black/10"
        >
          {/* Prime Minister Portrait & Biographical Info */}
          <div className="flex flex-col sm:flex-row gap-4 items-center bg-slate-50/50 dark:bg-white/3 p-4 rounded-xl border border-slate-200/50 dark:border-white/5">
            <div className="relative shrink-0 group overflow-hidden rounded-xl shadow-md border border-slate-200 dark:border-white/10 w-24 h-28 xs:w-28 xs:h-36">
              <img
                src={pm.image_url}
                alt={pm.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(pm.name)}&background=1a2540&color=FF9933&size=120`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-2">
                <span className="text-[9px] text-white font-mono uppercase tracking-wider">{pm.party_abbr} Cabinet Leader</span>
              </div>
            </div>
            <div className="flex-1 space-y-2 text-center sm:text-left min-w-0">
              <div className="text-[10px] font-mono uppercase tracking-wider text-saffron font-bold">Cabinet Profile</div>
              <h4 className="font-display font-extrabold text-slate-900 dark:text-white text-base leading-tight">{pm.name.split('(')[0].trim()}</h4>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-600 dark:text-white/60 font-medium">
                <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                  <MapPin size={12} className="text-saffron" />
                  <span className="truncate"><strong>Constituency:</strong> {pm.constituency}</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                  <Compass size={12} className="text-saffron" />
                  <span className="truncate"><strong>Education:</strong> {pm.education}</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center sm:justify-start xs:col-span-2 mt-1">
                  <span>💡</span>
                  <span className="line-clamp-1"><strong>Ideology:</strong> {pm.ideology.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Score breakdown */}
          <div>
            <div className="text-xs font-bold text-slate-500 dark:text-white/40 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
              <Award size={12} className="text-saffron" /> Legacy Score Breakdown
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-[10px] text-slate-400 dark:text-white/30 mb-0.5 font-medium">Economic Management</div>
                <ScoreBar score={pm.economic_score} color="#10B981" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 dark:text-white/30 mb-0.5 font-medium">Social Development</div>
                <ScoreBar score={pm.social_score} color="#06B6D4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 dark:text-white/30 mb-0.5 font-medium">Foreign Policy</div>
                <ScoreBar score={pm.foreign_score} color="#8B5CF6" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 dark:text-white/30 mb-0.5 font-medium">Governance Quality</div>
                <ScoreBar score={pm.governance_score} color="#F59E0B" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Radar Chart */}
            <div className="bg-slate-50 dark:bg-[#070c1a] p-3 rounded-xl border border-slate-100 dark:border-white/5">
              <div className="text-xs font-bold text-slate-500 dark:text-white/40 mb-2 uppercase tracking-wider">Performance Radar</div>
              <ResponsiveContainer width="100%" height={160}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="currentColor" className="text-slate-200 dark:text-white/5" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor', fontSize: 9, className: 'font-display font-semibold' }} className="text-slate-500 dark:text-white/50" />
                  <Radar dataKey="A" stroke={partyColor} fill={partyGradient} fillOpacity={0.25} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* GDP start vs end */}
            <div className="bg-slate-50 dark:bg-[#070c1a] p-3 rounded-xl border border-slate-100 dark:border-white/5">
              <div className="text-xs font-bold text-slate-500 dark:text-white/40 mb-2 uppercase tracking-wider">GDP During Tenure (USD B)</div>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={gdpData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <XAxis dataKey="label" tick={{ fill: 'currentColor', fontSize: 10, className: 'font-mono' }} className="text-slate-500 dark:text-white/40" />
                  <YAxis tick={{ fill: 'currentColor', fontSize: 10, className: 'font-mono' }} className="text-slate-500 dark:text-white/40" />
                  <Tooltip 
                    contentStyle={{ background: 'var(--im-bg-2)', border: '1px solid var(--im-border)', borderRadius: 8, fontSize: 11 }}
                    formatter={(value) => [`$${value} Billion`, 'GDP']}
                  />
                  <Bar dataKey="gdp" fill={partyGradient} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Major Policies */}
          <div>
            <div className="text-xs font-bold text-slate-500 dark:text-white/40 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
              <BookOpen size={12} className="text-blue-400" /> Major Policies & Landmarks
            </div>
            <div className="flex flex-wrap gap-1.5">
              {pm.major_policies.map(p => (
                <span key={p} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/60 font-semibold">{p}</span>
              ))}
            </div>
          </div>

          {/* Wars/Events */}
          {pm.wars_conflicts.length > 0 && (
            <div>
              <div className="text-xs font-bold text-slate-500 dark:text-white/40 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                <Shield size={12} className="text-red-400" /> Wars & Major Conflicts
              </div>
              <div className="space-y-1">
                {pm.wars_conflicts.map(w => (
                  <div key={w} className="text-xs text-red-500 dark:text-red-400 bg-red-400/10 border border-red-500/15 rounded-lg px-2.5 py-1.5 font-semibold">{w}</div>
                ))}
              </div>
            </div>
          )}

          {/* Nuclear & Space */}
          {(pm.nuclear_milestones.length > 0 || pm.space_milestones.length > 0) && (
            <div className="grid grid-cols-2 gap-3">
              {pm.nuclear_milestones.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-500 dark:text-white/40 mb-1.5 uppercase tracking-wider">☢️ Nuclear</div>
                  {pm.nuclear_milestones.map(n => (
                    <div key={n} className="text-[10px] text-purple-600 bg-purple-100 border border-purple-200 dark:text-purple-300 dark:bg-purple-400/10 dark:border-purple-400/15 rounded px-2 py-1 mb-1 font-semibold">{n}</div>
                  ))}
                </div>
              )}
              {pm.space_milestones.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-500 dark:text-white/40 mb-1.5 uppercase tracking-wider">🚀 Space</div>
                  {pm.space_milestones.map(s => (
                    <div key={s} className="text-[10px] text-blue-600 bg-blue-100 border border-blue-200 dark:text-blue-300 dark:bg-blue-400/10 dark:border-blue-400/15 rounded px-2 py-1 mb-1 font-semibold">{s}</div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Legacy Note */}
          <div className="glass-saffron rounded-xl p-3 border border-saffron/10">
            <div className="text-[10px] font-bold text-saffron mb-1.5 uppercase tracking-wider">📋 Historical Assessment</div>
            <p className="text-xs text-slate-700 dark:text-white/70 leading-relaxed font-medium">{pm.legacy_note}</p>
          </div>

          {/* Geopolitical Events during tenure */}
          {pmEvents.length > 0 && (
            <div>
              <div className="text-xs font-bold text-slate-500 dark:text-white/40 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                <Globe size={12} className="text-indigo-400" /> Key Events During Tenure
              </div>
              <div className="space-y-2">
                {pmEvents.map(ev => (
                  <div key={ev.id} className={`event-${ev.type} rounded-xl px-3 py-2 bg-slate-50/50 dark:bg-[#070c1a]/50 border border-slate-100 dark:border-white/5`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-slate-900 dark:text-white">{ev.name}</span>
                      <span className="text-[10px] font-mono text-slate-500 dark:text-white/30 font-bold">{ev.year}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-white/40 mt-0.5 line-clamp-2 leading-relaxed">{ev.description}</p>
                    {ev.gdp_impact_pct && (
                      <span className={`text-[10px] font-mono font-bold mt-1 inline-block ${ev.gdp_impact_pct < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                        GDP Impact: {ev.gdp_impact_pct > 0 ? '+' : ''}{ev.gdp_impact_pct}%
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default function PrimeMinistersPage() {
  const { activePMId } = useTimelineStore();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'INC' | 'BJP' | 'other'>('all');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (activePMId !== null) {
      setFilter('all');
      setExpandedId(activePMId);
      
      const timer = setTimeout(() => {
        const element = document.getElementById(`pm-card-${activePMId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [activePMId]);

  const filtered = PRIME_MINISTERS.filter(pm => {
    if (filter === 'all') return true;
    if (filter === 'INC') return pm.party_abbr === 'INC';
    if (filter === 'BJP') return pm.party_abbr === 'BJP';
    return pm.party_abbr !== 'INC' && pm.party_abbr !== 'BJP';
  });

  const compareData = PRIME_MINISTERS.map(pm => {
    const lastName = pm.name.split('(')[0].trim().split(' ').slice(-1)[0];
    const startYearShort = String(pm.start_year).slice(-2);
    const endYearShort = pm.end_year === 2026 ? 'Pres' : String(pm.end_year).slice(-2);
    return {
      name: lastName,
      displayName: `${pm.name.split('(')[0].trim()} (${pm.start_year}-${pm.end_year === 2026 ? 'Present' : pm.end_year})`,
      shortDisplayName: `${lastName} (${startYearShort}-${endYearShort})`,
      fullName: pm.name.split('(')[0].trim(),
      growth: pm.avg_gdp_growth,
      legacy: pm.legacy_score,
      party: pm.party_abbr,
    };
  });

  return (
    <div className="space-y-6">
      {/* SVG Defs for gradients */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="incGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#138808" />
            <stop offset="100%" stopColor="#3cd030" />
          </linearGradient>
          <linearGradient id="bjpGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FF9933" />
            <stop offset="100%" stopColor="#FFCC66" />
          </linearGradient>
          <linearGradient id="otherGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8B4513" />
            <stop offset="100%" stopColor="#d2793c" />
          </linearGradient>
        </defs>
      </svg>

      {/* Header */}
      <div className="glass rounded-2xl p-6 border-l-4 border-saffron flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-1">Prime Minister Report Cards</h1>
          <p className="text-slate-500 dark:text-white/50 text-sm">Data-driven governance analysis for all 15 Prime Ministers · 1947–2026</p>
          <div className="mt-2 text-xs font-mono text-slate-400 dark:text-white/30">
            Legacy scores based on: Economic management (25pts) + Social development (25pts) + Foreign policy (25pts) + Governance quality (25pts)
          </div>
        </div>
        <img src="/ashoka_stumbha.png" alt="Ashoka Stumbha" className="h-12 sm:h-16 object-contain flex-shrink-0 opacity-80 dark:invert hidden xs:block animate-float" />
      </div>

      {/* Comparison Bar Chart */}
      <div className="glass rounded-2xl p-4 border border-slate-200 dark:border-white/10">
        <h2 className="font-display font-bold text-slate-900 dark:text-white text-sm mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>Average GDP Growth Rate by PM Tenure <span className="font-mono text-[9px] text-slate-400 dark:text-white/20">(Source: MoSPI GDP back-series)</span></span>
          <span className="text-[10px] font-bold text-slate-500 dark:text-white/40 flex gap-3 uppercase tracking-wider">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#FF9933]"></span> BJP</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#138808]"></span> INC</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#8B4513]"></span> Others</span>
          </span>
        </h2>
        <ResponsiveContainer width="100%" height={450}>
          <BarChart data={compareData} layout="vertical" margin={{ left: isMobile ? -25 : -10, right: 30, top: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" horizontal={false} />
            <XAxis type="number" tick={{ fill: 'currentColor', fontSize: 10, className: 'font-mono' }} className="text-slate-500 dark:text-white/40" domain={[-6, 10]} />
            <YAxis 
              type="category" 
              dataKey={isMobile ? "shortDisplayName" : "displayName"} 
              tick={{ fill: 'currentColor', fontSize: 9, className: 'font-display font-semibold' }} 
              className="text-slate-700 dark:text-white/60" 
              width={isMobile ? 85 : 155} 
            />
            <Tooltip
              formatter={(value) => [`${value}%`, 'Avg GDP Growth']}
              contentStyle={{ background: 'var(--im-bg-2)', border: '1px solid var(--im-border)', borderRadius: 8, fontSize: 11 }}
            />
            <Bar dataKey="growth" radius={[0, 6, 6, 0]}
              label={{ position: 'right', fill: 'currentColor', fontSize: 10, className: 'text-slate-500 dark:text-white/50 font-mono font-bold', formatter: (v: any) => ` ${v}%` }}
            >
              {compareData.map((entry, index) => {
                const grad = PARTY_GRADIENTS[entry.party] || PARTY_GRADIENTS['Janata Party'] || '#8B4513';
                return <Cell key={`cell-${index}`} fill={grad} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="text-[10px] font-mono text-slate-400 dark:text-white/20 mt-1.5 leading-relaxed">Source: MOSPI National Accounts Statistics · Note: MMS (2004-14) UPA average includes 2008 global financial crisis · Modi (2014-26) average includes COVID-19 lockdown recession</div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Filter:</span>
        {(['all', 'INC', 'BJP', 'other'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs px-3.5 py-1.5 rounded-xl border transition-all font-semibold uppercase tracking-wider
              ${filter === f ? 'bg-saffron/15 border-saffron/30 text-saffron' : 'glass border-slate-200 text-slate-500 hover:text-slate-900 dark:border-white/10 dark:text-white/40 dark:hover:text-white/70'}`}
          >
            {f === 'all' ? 'All PMs' : f === 'other' ? 'Regional/Others' : f}
          </button>
        ))}
        <span className="text-xs font-mono font-bold text-slate-400 dark:text-white/20 ml-auto">{filtered.length} Prime Ministers</span>
      </div>

      {/* PM Cards Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {filtered.map(pm => (
          <PMCard
            key={pm.id}
            pm={pm}
            expanded={expandedId === pm.id}
            onToggle={() => setExpandedId(expandedId === pm.id ? null : pm.id)}
          />
        ))}
      </div>
    </div>
  );
}
