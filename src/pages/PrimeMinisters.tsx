import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { Award, Calendar, BookOpen, Globe, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { PRIME_MINISTERS } from '../data/primeMinisters';
import { GEOPOLITICAL_EVENTS } from '../data/geopoliticalEvents';

const PARTY_COLORS: Record<string, string> = {
  INC: '#138808', BJP: '#FF9933', JP: '#8B4513', 'Janata Party': '#8B4513'
};

const ScoreBar = ({ score, max = 25, color }: { score: number; max?: number; color: string }) => (
  <div className="flex items-center gap-2">
    <div className="flex-1 h-1.5 rounded-full bg-slate-200 dark:bg-white/10">
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: `${(score / max) * 100}%` }}
        transition={{ duration: 1, delay: 0.3 }}
      />
    </div>
    <span className="text-sm font-mono text-slate-500 dark:text-white/60 w-10 text-right">{score}/{max}</span>
  </div>
);

const PMCard: React.FC<{ pm: typeof PRIME_MINISTERS[0]; expanded: boolean; onToggle: () => void }> = ({ pm, expanded, onToggle }) => {
  const partyColor = PARTY_COLORS[pm.party_abbr] || PARTY_COLORS[pm.party] || '#FF9933';
  const pmEvents = GEOPOLITICAL_EVENTS.filter(e => e.pm_id === pm.id);

  const radarData = [
    { subject: 'Economic', A: pm.economic_score, fullMark: 25 },
    { subject: 'Social', A: pm.social_score, fullMark: 25 },
    { subject: 'Foreign Policy', A: pm.foreign_score, fullMark: 25 },
    { subject: 'Governance', A: pm.governance_score, fullMark: 25 },
  ];

  const gdpData = [
    { label: 'Start', gdp: pm.gdp_start_usd },
    { label: 'End', gdp: pm.gdp_end_usd },
  ];

  return (
    <motion.div
      className="glass rounded-2xl overflow-hidden hover-lift"
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
            className="w-16 h-16 rounded-xl object-cover object-top"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(pm.name)}&background=1a2540&color=FF9933&size=80`;
            }}
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: partyColor }}
          >
            {pm.id}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display font-bold text-slate-900 dark:text-white text-base md:text-lg">{pm.name}</h3>
              <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                <span className="text-xs px-1.5 py-0.5 rounded font-bold border"
                  style={{ color: partyColor, borderColor: `${partyColor}40`, background: `${partyColor}15` }}>
                  {pm.party_abbr}
                </span>
                <span className="text-xs text-slate-700 dark:text-white/60 font-medium">{pm.coalition}</span>
                {!pm.majority && <span className="text-xs px-1 py-0.5 rounded bg-orange-500/15 text-orange-400 border border-orange-500/20 font-semibold">Coalition</span>}
              </div>
              <div className="flex items-center gap-1.5 mt-1.5 text-sm text-slate-700 dark:text-white/60">
                <Calendar size={12} className="text-slate-500 dark:text-white/40" />
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
                  <span className="text-xs text-slate-400 dark:text-white/30">/ 100</span>
                </div>
              </div>
              <div className="text-xs text-slate-700 dark:text-white/50 font-bold mt-0.5">Legacy</div>
            </div>
          </div>

          {/* Quick metrics */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="glass-saffron rounded-lg p-2 text-center">
              <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-base md:text-lg">{pm.avg_gdp_growth}%</div>
              <div className="text-xs md:text-sm text-slate-700 dark:text-white/60 font-semibold">Avg Growth</div>
            </div>
            <div className="glass rounded-lg p-2 text-center" style={{ background: `${partyColor}10` }}>
              <div className="font-mono font-bold text-slate-900 dark:text-white text-base md:text-lg">${pm.gdp_end_usd}B</div>
              <div className="text-xs md:text-sm text-slate-700 dark:text-white/60 font-semibold">Exit GDP</div>
            </div>
            <div className="glass rounded-lg p-2 text-center">
              <div className="font-mono font-bold text-blue-600 dark:text-blue-400 text-base md:text-lg">{pm.inflation_avg}%</div>
              <div className="text-xs md:text-sm text-slate-700 dark:text-white/60 font-semibold">Avg CPI</div>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-center gap-1 py-2 text-sm text-slate-500 hover:text-slate-900 dark:text-white/30 dark:hover:text-white/60 border-t border-slate-200 dark:border-white/5 transition-colors"
      >
        {expanded ? <><ChevronUp size={12} /> Hide Details</> : <><ChevronDown size={12} /> Full Report Card</>}
      </button>

      {/* Expanded Details */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border-t border-slate-200 dark:border-white/5 p-4 space-y-4"
        >
          {/* Score breakdown */}
          <div>
            <div className="text-sm font-semibold text-slate-500 dark:text-white/60 mb-2 flex items-center gap-1.5">
              <Award size={12} /> Legacy Score Breakdown
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-xs text-slate-500 dark:text-white/40 mb-1">Economic Management</div>
                <ScoreBar score={pm.economic_score} color="#10B981" />
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-white/40 mb-1">Social Development</div>
                <ScoreBar score={pm.social_score} color="#06B6D4" />
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-white/40 mb-1">Foreign Policy</div>
                <ScoreBar score={pm.foreign_score} color="#8B5CF6" />
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-white/40 mb-1">Governance Quality</div>
                <ScoreBar score={pm.governance_score} color="#F59E0B" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Radar Chart */}
            <div>
              <div className="text-sm font-semibold text-slate-500 dark:text-white/60 mb-2">Performance Radar</div>
              <ResponsiveContainer width="100%" height={160}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="currentColor" className="text-slate-200 dark:text-white/5" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/50" />
                  <Radar dataKey="A" stroke={partyColor} fill={partyColor} fillOpacity={0.2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* GDP start vs end */}
            <div>
              <div className="text-sm font-semibold text-slate-500 dark:text-white/60 mb-2">GDP During Tenure (USD B)</div>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={gdpData}>
                  <XAxis dataKey="label" tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" />
                  <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" />
                  <Tooltip contentStyle={{ background: 'var(--im-bg-2)', border: '1px solid var(--im-border)', borderRadius: 8 }} />
                  <Bar dataKey="gdp" fill={partyColor} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Major Policies */}
          <div>
            <div className="text-sm font-semibold text-slate-500 dark:text-white/60 mb-2 flex items-center gap-1.5">
              <BookOpen size={12} /> Major Policies & Landmarks
            </div>
            <div className="flex flex-wrap gap-1.5">
              {pm.major_policies.map(p => (
                <span key={p} className="text-xs px-2 py-0.5 rounded-full glass border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/60">{p}</span>
              ))}
            </div>
          </div>

          {/* Wars/Events */}
          {pm.wars_conflicts.length > 0 && (
            <div>
              <div className="text-sm font-semibold text-slate-500 dark:text-white/60 mb-2 flex items-center gap-1.5">
                <Shield size={12} className="text-red-400" /> Wars & Major Conflicts
              </div>
              <div className="space-y-1">
                {pm.wars_conflicts.map(w => (
                  <div key={w} className="text-sm text-red-300 bg-red-400/10 border border-red-400/15 rounded-lg px-2.5 py-1.5">{w}</div>
                ))}
              </div>
            </div>
          )}

          {/* Nuclear & Space */}
          {(pm.nuclear_milestones.length > 0 || pm.space_milestones.length > 0) && (
            <div className="grid grid-cols-2 gap-3">
              {pm.nuclear_milestones.length > 0 && (
                <div>
                  <div className="text-sm font-semibold text-slate-500 dark:text-white/60 mb-1.5">☢️ Nuclear</div>
                  {pm.nuclear_milestones.map(n => (
                    <div key={n} className="text-xs text-purple-600 bg-purple-100 border border-purple-200 dark:text-purple-300 dark:bg-purple-400/10 dark:border-purple-400/15 rounded px-2 py-1 mb-1">{n}</div>
                  ))}
                </div>
              )}
              {pm.space_milestones.length > 0 && (
                <div>
                  <div className="text-sm font-semibold text-slate-500 dark:text-white/60 mb-1.5">🚀 Space</div>
                  {pm.space_milestones.map(s => (
                    <div key={s} className="text-xs text-blue-600 bg-blue-100 border border-blue-200 dark:text-blue-300 dark:bg-blue-400/10 dark:border-blue-400/15 rounded px-2 py-1 mb-1">{s}</div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Legacy Note */}
          <div className="glass-saffron rounded-xl p-3">
            <div className="text-xs font-semibold text-saffron mb-1.5">📋 Historical Assessment</div>
            <p className="text-sm text-slate-700 dark:text-white/60 leading-relaxed">{pm.legacy_note}</p>
          </div>

          {/* Geopolitical Events during tenure */}
          {pmEvents.length > 0 && (
            <div>
              <div className="text-sm font-semibold text-slate-500 dark:text-white/60 mb-2 flex items-center gap-1.5">
                <Globe size={12} /> Key Events During Tenure
              </div>
              <div className="space-y-2">
                {pmEvents.map(ev => (
                  <div key={ev.id} className={`event-${ev.type} rounded-lg px-3 py-2 bg-slate-100 dark:bg-transparent`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">{ev.name}</span>
                      <span className="text-xs font-mono text-slate-500 dark:text-white/40">{ev.year}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-white/50 mt-0.5 line-clamp-2">{ev.description.slice(0, 120)}…</p>
                    {ev.gdp_impact_pct && (
                      <span className={`text-xs font-mono ${ev.gdp_impact_pct < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
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
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'INC' | 'BJP' | 'other'>('all');

  const filtered = PRIME_MINISTERS.filter(pm => {
    if (filter === 'all') return true;
    if (filter === 'INC') return pm.party_abbr === 'INC';
    if (filter === 'BJP') return pm.party_abbr === 'BJP';
    return pm.party_abbr !== 'INC' && pm.party_abbr !== 'BJP';
  });

  // Comparison chart data
  const compareData = PRIME_MINISTERS.map(pm => ({
    name: pm.name.split(' ').slice(-1)[0],
    displayName: `${pm.name.split('(')[0].trim()} (${pm.start_year}-${pm.end_year === 2026 ? 'Present' : pm.end_year})`,
    fullName: pm.name.split('(')[0].trim(),
    growth: pm.avg_gdp_growth,
    legacy: pm.legacy_score,
    party: pm.party_abbr,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass rounded-2xl p-6 border-l-4 border-saffron flex flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-1">Prime Minister Report Cards</h1>
          <p className="text-slate-500 dark:text-white/50 text-sm">Data-driven governance analysis for all 15 Prime Ministers · 1947–2026</p>
          <div className="mt-2 text-xs font-mono text-slate-400 dark:text-white/30">
            Legacy scores based on: Economic management (25pts) + Social development (25pts) + Foreign policy (25pts) + Governance quality (25pts)
          </div>
        </div>
        <img src="/ashoka_stumbha.png" alt="Ashoka Stumbha" className="h-16 object-contain flex-shrink-0 opacity-80 dark:invert" />
      </div>

      {/* Comparison Bar Chart */}
      <div className="glass rounded-2xl p-4">
        <h2 className="font-display font-semibold text-slate-900 dark:text-white text-sm mb-3 flex items-center justify-between">
          <span>Average GDP Growth Rate by PM Tenure</span>
          <span className="text-xs font-normal text-slate-500 dark:text-white/40 flex gap-3">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#FF9933]"></span> BJP</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#138808]"></span> INC</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#8B4513]"></span> Janata Party / Others</span>
          </span>
        </h2>
        <ResponsiveContainer width="100%" height={450}>
          <BarChart data={compareData} layout="vertical" margin={{ left: 10, right: 30, top: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" horizontal={false} />
            <XAxis type="number" tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" domain={[-2, 10]} />
            <YAxis type="category" dataKey="displayName" tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-700 dark:text-white/60" width={180} />
            <Tooltip
              formatter={(value) => [`${value}%`, 'Avg GDP Growth']}
              contentStyle={{ background: 'var(--im-bg-2)', border: '1px solid var(--im-border)', borderRadius: 8 }}
            />
            <Bar dataKey="growth" radius={[0, 4, 4, 0]}
              label={{ position: 'right', fill: 'currentColor', fontSize: 12, className: 'text-slate-500 dark:text-white/60 font-mono', formatter: (v: any) => ` ${v}%` }}
            >
              {compareData.map((entry, index) => {
                const color = PARTY_COLORS[entry.party] || PARTY_COLORS['Janata Party'] || '#8B4513';
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="text-xs font-mono text-slate-400 dark:text-white/25 mt-1">Source: MOSPI National Accounts Statistics · Note: MMS (2004-14) includes 2008 GFC period · Modi era includes COVID-19 contraction</div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-500 dark:text-white/40">Filter:</span>
        {(['all', 'INC', 'BJP', 'other'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-sm px-3 py-1 rounded-lg border transition-all font-medium
              ${filter === f ? 'bg-saffron/20 border-saffron/40 text-saffron' : 'glass border-slate-200 text-slate-500 hover:text-slate-900 dark:border-white/10 dark:text-white/40 dark:hover:text-white/70'}`}
          >
            {f === 'all' ? 'All PMs' : f === 'other' ? 'Regional/Others' : f}
          </button>
        ))}
        <span className="text-xs font-mono text-slate-400 dark:text-white/20 ml-auto">{filtered.length} Prime Ministers</span>
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
