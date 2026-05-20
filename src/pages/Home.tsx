import React, { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';
import { TrendingUp, TrendingDown, Activity, Zap, GraduationCap,
  Heart, Wifi, Train, Map, Globe2, Rocket, ArrowUpRight } from 'lucide-react';
import { useTimelineStore } from '../store';
import { NATIONAL_METRICS } from '../data/nationalMetrics';
import { GEOPOLITICAL_EVENTS } from '../data/geopoliticalEvents';
import { PRIME_MINISTERS } from '../data/primeMinisters';

// Helper: get metric for a given year (interpolated)
function getMetricForYear(year: number) {
  const data = NATIONAL_METRICS;
  const exact = data.find(d => d.year === year);
  if (exact) return exact;
  const before = [...data].reverse().find(d => d.year <= year);
  const after = data.find(d => d.year > year);
  if (!before) return data[0];
  if (!after) return before;
  const t = (year - before.year) / (after.year - before.year);
  const lerp = (a: number, b: number) => a + (b - a) * t;
  return {
    year,
    gdp_usd_billion: lerp(before.gdp_usd_billion, after.gdp_usd_billion),
    gdp_inr_crore: lerp(before.gdp_inr_crore, after.gdp_inr_crore),
    gdp_growth_pct: lerp(before.gdp_growth_pct, after.gdp_growth_pct),
    population_million: lerp(before.population_million, after.population_million),
    literacy_pct: lerp(before.literacy_pct, after.literacy_pct),
    life_expectancy: lerp(before.life_expectancy, after.life_expectancy),
    infant_mortality: lerp(before.infant_mortality, after.infant_mortality),
    electricity_access_pct: lerp(before.electricity_access_pct, after.electricity_access_pct),
    internet_penetration_pct: lerp(before.internet_penetration_pct, after.internet_penetration_pct),
    urbanization_pct: lerp(before.urbanization_pct, after.urbanization_pct),
    exports_usd_billion: lerp(before.exports_usd_billion, after.exports_usd_billion),
    railway_km: lerp(before.railway_km, after.railway_km),
    highway_km: lerp(before.highway_km, after.highway_km),
    power_capacity_gw: lerp(before.power_capacity_gw, after.power_capacity_gw),
    forex_reserves_usd_billion: lerp(before.forex_reserves_usd_billion, after.forex_reserves_usd_billion),
    inflation_cpi_pct: lerp(before.inflation_cpi_pct, after.inflation_cpi_pct),
  };
}

const fmt = (n: number, decimals = 1) => n.toFixed(decimals);
const fmtB = (n: number) => n >= 1000 ? `$${(n/1000).toFixed(2)}T` : `$${n.toFixed(0)}B`;

const AnimatedCount = ({ value, duration = 800 }: { value: string; duration?: number }) => {
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    const matches = value.match(/[\d.]+/);
    if (!matches) {
      setDisplayValue(value);
      return;
    }
    const target = parseFloat(matches[0]);
    const prefix = value.substring(0, value.indexOf(matches[0]));
    const suffix = value.substring(value.indexOf(matches[0]) + matches[0].length);

    let start = 0;
    const startTime = performance.now();
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress); // Ease out quad
      const current = start + easeProgress * (target - start);

      const decimals = matches[0].includes('.') ? matches[0].split('.')[1].length : 0;
      setDisplayValue(`${prefix}${current.toFixed(decimals)}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration]);

  return <span>{displayValue}</span>;
};

interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
  icon: React.ReactNode;
  color: string;
  subtext?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, change, positive, icon, color, subtext }) => (
  <motion.div
    className="glass rounded-xl p-4 hover-lift cursor-default"
    style={{ borderColor: `${color}20` }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div className="flex items-start justify-between mb-2">
      <div className="p-2 rounded-lg" style={{ background: `${color}15` }}>
        <div style={{ color }}>{icon}</div>
      </div>
      {change && (
        <div className={`flex items-center gap-0.5 text-xs font-mono font-semibold px-1.5 py-0.5 rounded
          ${positive ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'}`}>
          {positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {change}
        </div>
      )}
    </div>
    <div className="metric-number text-xl font-bold text-slate-900 dark:text-white mt-1">
      <AnimatedCount value={value} />
    </div>
    <div className="text-sm text-slate-500 dark:text-white/50 mt-0.5">{label}</div>
    {subtext && <div className="text-xs text-slate-400 dark:text-white/25 mt-0.5 font-mono">{subtext}</div>}
  </motion.div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const event = GEOPOLITICAL_EVENTS.find(e => e.year === Number(label));
  return (
    <div className="bg-white border-slate-200 dark:bg-[#0a0f1e] dark:border-white/12 border rounded-xl p-3 shadow-2xl min-w-[180px]">
      <div className="font-mono font-bold text-saffron text-sm mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-500 dark:text-white/60">{p.name}:</span>
          <span className="font-mono font-semibold text-slate-900 dark:text-white">{typeof p.value === 'number' ? p.value.toFixed(1) : p.value}</span>
        </div>
      ))}
      {event && (
        <div className="mt-2 pt-2 border-t border-slate-200 dark:border-white/10">
          <div className="text-xs text-saffron font-semibold">{event.name}</div>
          <div className="text-xs text-slate-500 dark:text-white/50 mt-0.5 line-clamp-2">{event.description.slice(0, 80)}…</div>
        </div>
      )}
    </div>
  );
};

const TODAY_IN_HISTORY = [
  "1947: India gains independence — Nehru's 'Tryst with Destiny' speech",
  "1974: India conducts Pokhran-I nuclear test — 'Smiling Buddha'",
  "1991: Manmohan Singh presents historic liberalization budget",
  "1998: Operation Shakti — India declared nuclear weapons state",
  "2008: Chandrayaan-1 discovers water on Moon",
  "2014: India's Mars Orbiter Mission (Mangalyaan) enters orbit — cheapest ever at $73M",
  "2023: Chandrayaan-3 lands near lunar south pole — India becomes 4th nation on Moon",
  "1971: Simla Agreement signed after Bangladesh liberation",
  "1975: ARYABHATA — India's first satellite launched from Soviet Kapustin Yar",
  "1999: Kargil War — Operation Vijay recaptures strategic Himalayan peaks",
];

export default function HomePage() {
  const { currentYear } = useTimelineStore();
  const [todayFact, setTodayFact] = useState(TODAY_IN_HISTORY[0]);
  const metric = useMemo(() => getMetricForYear(currentYear), [currentYear]);
  const prevMetric = useMemo(() => getMetricForYear(currentYear - 1), [currentYear]);

  useEffect(() => {
    const idx = Math.floor(Math.random() * TODAY_IN_HISTORY.length);
    setTodayFact(TODAY_IN_HISTORY[idx]);
  }, [currentYear]);

  const [activeTab, setActiveTab] = useState<'economy' | 'infra' | 'social'>('economy');

  const currentPM = PRIME_MINISTERS.find(pm =>
    pm.start_year <= currentYear && (pm.end_year >= currentYear || pm.end_year === 2026)
  ) || PRIME_MINISTERS[PRIME_MINISTERS.length - 1];

  // Chart data — GDP growth + events + infrastructure + social
  const chartData = NATIONAL_METRICS.map(d => ({
    year: d.year,
    'GDP (USD B)': d.gdp_usd_billion,
    'Growth %': d.gdp_growth_pct,
    'Literacy %': d.literacy_pct,
    'Power GW': d.power_capacity_gw,
    'Exports (USD B)': d.exports_usd_billion,
    'Forex Reserves (USD B)': d.forex_reserves_usd_billion,
    'Highways (K km)': d.highway_km / 1000,
    'Railways (K km)': d.railway_km / 1000,
    'Internet Users %': d.internet_penetration_pct,
    'Life Expectancy (yrs)': d.life_expectancy,
    'Population (Millions)': d.population_million,
    'Infant Mortality (per 1000)': d.infant_mortality,
  }));

  const eventYears = new Set(GEOPOLITICAL_EVENTS.map(e => e.year));

  const partyColor: Record<string, string> = { INC: '#138808', BJP: '#FF9933', JP: '#8B4513' };
  const pmColor = partyColor[currentPM.party_abbr] || '#FF9933';

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden glass border border-slate-200 dark:border-white/5 p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 space-y-5 max-w-2xl z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-saffron/20 text-saffron border border-saffron/30">
              LIVE — YEAR {currentYear}
            </span>
            <span className="text-xs font-mono text-slate-400 dark:text-white/30">भारत मैट्रिक्स</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="font-display text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
              India <span className="text-gradient-saffron">Matrix</span>
            </h1>
            <img src="/ashoka_stumbha.png" alt="Ashoka Stumbha Logo" className="h-12 w-auto object-contain flex-shrink-0 dark:invert" />
          </div>
          <p className="text-slate-600 dark:text-white/60 text-xs lg:text-sm leading-relaxed mt-1">
            Visualizing India's transformation — 1947 to 2026. Every metric. Every leader. Every decade.
          </p>

          {/* Dynamic History Highlight for current year */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 border-l-2 border-l-saffron flex items-start gap-2.5">
            <span className="text-sm mt-0.5">📜</span>
            <div>
              <div className="text-xs font-mono text-saffron font-bold">TIMELINE MILESTONE · {currentYear}</div>
              <div className="text-xs text-slate-700 dark:text-white/70 leading-relaxed mt-0.5">{todayFact}</div>
            </div>
          </div>

          {/* Quick Stats Grid inside the Hero */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-white/5">
            <div>
              <span className="text-xs uppercase font-bold text-slate-400 dark:text-white/30 block mb-0.5">GDP (Nominal)</span>
              <span className="text-sm lg:text-base font-bold font-mono text-saffron">
                {metric.gdp_usd_billion >= 1000 ? `$${(metric.gdp_usd_billion/1000).toFixed(2)}T` : `$${metric.gdp_usd_billion.toFixed(0)}B`}
              </span>
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-slate-400 dark:text-white/30 block mb-0.5">Population</span>
              <span className="text-sm lg:text-base font-bold font-mono text-slate-900 dark:text-white">
                {(metric.population_million / 1000).toFixed(2)}B
              </span>
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-slate-400 dark:text-white/30 block mb-0.5">Literacy Rate</span>
              <span className="text-sm lg:text-base font-bold font-mono text-emerald-500">
                {metric.literacy_pct.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Right side container: Landmark Image + PM info stacked */}
        <div className="flex flex-col gap-4 items-stretch w-full md:w-[320px] lg:w-[350px] shrink-0 z-10">
          {/* Landmark Image Frame (Large & Majestic) */}
          <div className="relative w-full h-[180px] lg:h-[210px] rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop" 
              alt="Taj Mahal" 
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-3">
              <div className="text-white">
                <span className="text-xs font-bold tracking-wide block">Taj Mahal, Agra</span>
                <span className="text-xs opacity-75 font-mono">Iconic Symbol of India's Heritage</span>
              </div>
            </div>
          </div>

          {/* PM Card (Matches the width) */}
          <div 
            className="glass rounded-xl p-3 border w-full"
            style={{ borderColor: `${pmColor}30` }}
          >
            <div className="text-xs text-slate-500 dark:text-white/40 mb-1">PRIME MINISTER · {currentYear}</div>
            <div className="flex items-center gap-3">
              <img 
                src={currentPM.image_url} 
                alt={currentPM.name}
                className="w-11 h-11 rounded-lg object-cover object-top border border-slate-200 dark:border-white/10"
                onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentPM.name)}&background=1a2540&color=FF9933&size=80`; }}
              />
              <div className="flex-1">
                <div className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">{currentPM.name.split('(')[0].trim()}</div>
                <div className="text-xs font-semibold mt-0.5" style={{ color: pmColor }}>{currentPM.party_abbr} · {currentPM.coalition}</div>
                <div className="text-xs text-slate-700 dark:text-white/40 mt-0.5">{currentPM.start_year}–{currentPM.end_year === 2026 ? 'Present' : currentPM.end_year}</div>
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-white/40">Average GDP Growth</span>
              <span className="text-xs font-mono font-bold text-emerald-400">{currentPM.avg_gdp_growth}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* At A Glance Development Milestones */}
      <div className="glass rounded-2xl p-5 border border-slate-200 dark:border-white/10 space-y-4">
        <h2 className="font-display font-semibold text-slate-900 dark:text-white text-sm flex items-center gap-2">
          <Activity size={14} className="text-saffron" />
          Development Highlights (1947 vs {currentYear})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-xl flex items-center justify-between border border-slate-100 dark:border-white/5">
            <div>
              <span className="text-xs uppercase font-bold text-slate-400">Economy Multiplier</span>
              <div className="text-2xl font-bold font-mono text-emerald-400">
                {(metric.gdp_usd_billion / 3.7).toFixed(0)}x
              </div>
              <span className="text-xs text-slate-500 dark:text-white/30">Nominal USD Growth</span>
            </div>
            <span className="text-3xl">📈</span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-xl space-y-2 border border-slate-100 dark:border-white/5">
            <div className="flex justify-between text-xs uppercase font-bold text-slate-400">
              <span>Literacy Expansion</span>
              <span className="text-purple-400 font-mono font-bold">{metric.literacy_pct}%</span>
            </div>
            <div className="h-2 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-purple-400" style={{ width: `${metric.literacy_pct}%` }}></div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 dark:text-white/30 font-mono">
              <span>1947: 18%</span>
              <span>Target: 100%</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-xl space-y-2 border border-slate-100 dark:border-white/5">
            <div className="flex justify-between text-xs uppercase font-bold text-slate-400">
              <span>Life Expectancy Gain</span>
              <span className="text-rose-400 font-mono font-bold">{metric.life_expectancy} yrs</span>
            </div>
            <div className="h-2 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-rose-400" style={{ width: `${(metric.life_expectancy / 80) * 100}%` }}></div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 dark:text-white/30 font-mono">
              <span>1947: 32 yrs</span>
              <span>Max Cap: 80 yrs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div>
        <h2 className="font-display font-semibold text-slate-900 dark:text-white text-sm mb-3 flex items-center gap-2">
          <Activity size={14} className="text-saffron" />
          National Metrics · {currentYear}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          <MetricCard label="GDP" value={fmtB(metric.gdp_usd_billion)} icon={<TrendingUp size={16} />} color="#00FF88"
            change={`${metric.gdp_growth_pct > 0 ? '+' : ''}${fmt(metric.gdp_growth_pct)}%`}
            positive={metric.gdp_growth_pct > 0}
            subtext={`₹${(metric.gdp_inr_crore/100000).toFixed(1)}L Cr`} />
          <MetricCard label="Population" value={`${fmt(metric.population_million, 0)}M`} icon={<Globe2 size={16} />} color="#00D4FF"
            subtext="Census + UNFPA proj." />
          <MetricCard label="Literacy Rate" value={`${fmt(metric.literacy_pct, 0)}%`} icon={<GraduationCap size={16} />} color="#9333EA"
            change={`+${fmt(metric.literacy_pct - prevMetric.literacy_pct, 1)}%`} positive />
          <MetricCard label="Life Expectancy" value={`${fmt(metric.life_expectancy, 1)} yrs`} icon={<Heart size={16} />} color="#F43F5E"
            change={`+${fmt(metric.life_expectancy - 32, 0)} since '47`} positive />
          <MetricCard label="Power Capacity" value={`${fmt(metric.power_capacity_gw, 0)} GW`} icon={<Zap size={16} />} color="#FFD700"
            change={`${fmt(metric.electricity_access_pct, 0)}% access`} positive />
          <MetricCard label="Internet Users" value={`${fmt(metric.internet_penetration_pct, 0)}%`} icon={<Wifi size={16} />} color="#00D4FF"
            subtext="of population" />
          <MetricCard label="Railway Network" value={`${(metric.railway_km/1000).toFixed(1)}K km`} icon={<Train size={16} />} color="#FB923C"
            subtext="route km" />
          <MetricCard label="Exports" value={fmtB(metric.exports_usd_billion)} icon={<ArrowUpRight size={16} />} color="#4ADE80"
            subtext="goods + services" />
          <MetricCard label="Highways" value={`${(metric.highway_km/1000).toFixed(0)}K km`} icon={<Map size={16} />} color="#A78BFA"
            subtext="national highways" />
          <MetricCard label="Infant Mortality" value={`${fmt(metric.infant_mortality, 0)}`} icon={<Heart size={16} />} color="#F97316"
            change={`-${(178 - metric.infant_mortality).toFixed(0)} since '47`} positive
            subtext="per 1000 live births" />
        </div>
      </div>

      {/* Interactive Charts Dashboard Section */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-3">
          <div>
            <h2 className="font-display font-semibold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Activity size={16} className="text-saffron animate-pulse" />
              National Development Dashboard (1947–2026)
            </h2>
            <p className="text-sm text-slate-500 dark:text-white/40">Select a tab to view historical metrics in multiple sectors</p>
          </div>
          
          <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl border border-slate-200 dark:border-white/10 self-start md:self-auto">
            {(['economy', 'infra', 'social'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 capitalize
                  ${activeTab === tab 
                    ? 'bg-saffron text-white shadow-md' 
                    : 'text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white/80'}`}
              >
                {tab === 'economy' ? 'Macro-Economy' : tab === 'infra' ? 'Infra & Tech' : 'Social Indicators'}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Economy */}
        {activeTab === 'economy' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* GDP Trajectory */}
            <div className="glass rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-semibold text-slate-900 dark:text-white text-xs">GDP Trajectory (USD Billion)</h3>
                  <span className="text-xs font-mono text-slate-500 dark:text-white/30">MOSPI · World Bank</span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="gdpGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00FF88" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#00FF88" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" />
                    <XAxis dataKey="year" tick={{ fill: 'currentColor', fontSize: 9, fontFamily: 'JetBrains Mono' }} className="text-slate-500 dark:text-white/40" />
                    <YAxis tick={{ fill: 'currentColor', fontSize: 9, fontFamily: 'JetBrains Mono' }} className="text-slate-500 dark:text-white/40" />
                    <Tooltip content={<CustomTooltip />} />
                    {Array.from(eventYears).map(yr => (
                      <ReferenceLine key={yr} x={yr} stroke="rgba(255,153,51,0.2)" strokeDasharray="3 3" />
                    ))}
                    <ReferenceLine x={currentYear} stroke="#FF9933" strokeWidth={2} />
                    <Area type="monotone" dataKey="GDP (USD B)" stroke="#00FF88" strokeWidth={2} fill="url(#gdpGrad)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="text-xs text-slate-500 dark:text-white/30 font-mono mt-2 flex items-center justify-between">
                <span>🟠 Events marked</span>
                <span>🟢 Year: {currentYear}</span>
              </div>
            </div>

            {/* GDP Growth Rate */}
            <div className="glass rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-semibold text-slate-900 dark:text-white text-xs">Annual GDP Growth Rate (%)</h3>
                  <span className="text-xs font-mono text-slate-500 dark:text-white/30">MOSPI</span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" />
                    <XAxis dataKey="year" tick={{ fill: 'currentColor', fontSize: 9, fontFamily: 'JetBrains Mono' }} className="text-slate-500 dark:text-white/40" />
                    <YAxis tick={{ fill: 'currentColor', fontSize: 9, fontFamily: 'JetBrains Mono' }} className="text-slate-500 dark:text-white/40" />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine y={0} stroke="rgba(255,255,255,0.2)" />
                    <ReferenceLine x={1991} stroke="#FFD700" strokeDasharray="3 3" label={{ value: 'LPG', fill: '#FFD700', fontSize: 8 }} />
                    <ReferenceLine x={2020} stroke="#DC143C" strokeDasharray="3 3" label={{ value: 'COVID', fill: '#DC143C', fontSize: 8 }} />
                    <ReferenceLine x={currentYear} stroke="#FF9933" strokeWidth={2} />
                    <Line type="monotone" dataKey="Growth %" stroke="#00D4FF" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="text-xs text-slate-500 dark:text-white/30 font-mono mt-2">
                <span>Historic LPG Liberalization (1991) & COVID Dip (2020)</span>
              </div>
            </div>

            {/* Trade & Forex */}
            <div className="glass rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-semibold text-slate-900 dark:text-white text-xs">Exports & Forex Reserves (USD B)</h3>
                  <span className="text-xs font-mono text-slate-500 dark:text-white/30">RBI · Commerce Ministry</span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" />
                    <XAxis dataKey="year" tick={{ fill: 'currentColor', fontSize: 9, fontFamily: 'JetBrains Mono' }} className="text-slate-500 dark:text-white/40" />
                    <YAxis tick={{ fill: 'currentColor', fontSize: 9, fontFamily: 'JetBrains Mono' }} className="text-slate-500 dark:text-white/40" />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine x={currentYear} stroke="#FF9933" strokeWidth={2} />
                    <Line type="monotone" dataKey="Exports (USD B)" stroke="#10B981" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="Forex Reserves (USD B)" stroke="#A78BFA" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="text-xs text-slate-500 dark:text-white/30 font-mono mt-2 flex justify-between">
                <span className="text-emerald-400 font-bold">🟢 Exports</span>
                <span className="text-purple-400 font-bold">🟣 Forex Reserves</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Infrastructure & Digital */}
        {activeTab === 'infra' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Installed Power Capacity */}
            <div className="glass rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-semibold text-slate-900 dark:text-white text-xs">Installed Power Capacity (GW)</h3>
                  <span className="text-xs font-mono text-slate-500 dark:text-white/30">Ministry of Power</span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="powerGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FFD700" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#FFD700" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" />
                    <XAxis dataKey="year" tick={{ fill: 'currentColor', fontSize: 9 }} className="text-slate-500 dark:text-white/40" />
                    <YAxis tick={{ fill: 'currentColor', fontSize: 9 }} className="text-slate-500 dark:text-white/40" />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine x={currentYear} stroke="#FF9933" strokeWidth={2} />
                    <Area type="monotone" dataKey="Power GW" stroke="#FFD700" strokeWidth={2} fill="url(#powerGrad)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="text-xs text-slate-500 dark:text-white/30 font-mono mt-2">
                <span>1.4 GW (1947) → {metric.power_capacity_gw.toFixed(0)} GW ({currentYear})</span>
              </div>
            </div>

            {/* Transport Network */}
            <div className="glass rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-semibold text-slate-900 dark:text-white text-xs">Highways & Railways (Thousand km)</h3>
                  <span className="text-xs font-mono text-slate-500 dark:text-white/30">NHAI · Indian Railways</span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" />
                    <XAxis dataKey="year" tick={{ fill: 'currentColor', fontSize: 9 }} className="text-slate-500 dark:text-white/40" />
                    <YAxis tick={{ fill: 'currentColor', fontSize: 9 }} className="text-slate-500 dark:text-white/40" />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine x={currentYear} stroke="#FF9933" strokeWidth={2} />
                    <Line type="monotone" dataKey="Highways (K km)" stroke="#F59E0B" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="Railways (K km)" stroke="#3B82F6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="text-xs text-slate-500 dark:text-white/30 font-mono mt-2 flex justify-between">
                <span className="text-amber-500 font-bold">🟡 Highways</span>
                <span className="text-blue-500 font-bold">🔵 Railways</span>
              </div>
            </div>

            {/* Digital Connectivity */}
            <div className="glass rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-semibold text-slate-900 dark:text-white text-xs">Internet Penetration Rate (%)</h3>
                  <span className="text-xs font-mono text-slate-500 dark:text-white/30">TRAI Reports</span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="internetGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" />
                    <XAxis dataKey="year" tick={{ fill: 'currentColor', fontSize: 9 }} className="text-slate-500 dark:text-white/40" />
                    <YAxis domain={[0, 100]} tick={{ fill: 'currentColor', fontSize: 9 }} className="text-slate-500 dark:text-white/40" />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine x={currentYear} stroke="#FF9933" strokeWidth={2} />
                    <Area type="monotone" dataKey="Internet Users %" stroke="#06B6D4" strokeWidth={2} fill="url(#internetGrad)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="text-xs text-slate-500 dark:text-white/30 font-mono mt-2">
                <span>Explosive digital transformation after Jio launch (2016)</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Social Indicators */}
        {activeTab === 'social' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Literacy Rate */}
            <div className="glass rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-semibold text-slate-900 dark:text-white text-xs">Literacy Rate Transformation (%)</h3>
                  <span className="text-xs font-mono text-slate-500 dark:text-white/30">Census of India</span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="litGrad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9333EA" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#9333EA" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" />
                    <XAxis dataKey="year" tick={{ fill: 'currentColor', fontSize: 9 }} className="text-slate-500 dark:text-white/40" />
                    <YAxis domain={[0, 100]} tick={{ fill: 'currentColor', fontSize: 9 }} className="text-slate-500 dark:text-white/40" />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine x={currentYear} stroke="#FF9933" strokeWidth={2} />
                    <Area type="monotone" dataKey="Literacy %" stroke="#9333EA" strokeWidth={2} fill="url(#litGrad2)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="text-xs text-slate-500 dark:text-white/30 font-mono mt-2">
                <span>12% (1947) → {metric.literacy_pct.toFixed(0)}% ({currentYear})</span>
              </div>
            </div>

            {/* Life Expectancy */}
            <div className="glass rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-semibold text-slate-900 dark:text-white text-xs">Life Expectancy (Years)</h3>
                  <span className="text-xs font-mono text-slate-500 dark:text-white/30">UN Population Division</span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" />
                    <XAxis dataKey="year" tick={{ fill: 'currentColor', fontSize: 9 }} className="text-slate-500 dark:text-white/40" />
                    <YAxis domain={[30, 80]} tick={{ fill: 'currentColor', fontSize: 9 }} className="text-slate-500 dark:text-white/40" />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine x={currentYear} stroke="#FF9933" strokeWidth={2} />
                    <Line type="monotone" dataKey="Life Expectancy (yrs)" stroke="#EF4444" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="text-xs text-slate-500 dark:text-white/30 font-mono mt-2 flex justify-between">
                <span>32 Yrs (1947) → {metric.life_expectancy.toFixed(1)} Yrs ({currentYear})</span>
              </div>
            </div>

            {/* Infant Mortality */}
            <div className="glass rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-semibold text-slate-900 dark:text-white text-xs">Infant Mortality Rate (per 1000)</h3>
                  <span className="text-xs font-mono text-slate-500 dark:text-white/30">SRS Bulletin</span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="mortalityGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" />
                    <XAxis dataKey="year" tick={{ fill: 'currentColor', fontSize: 9 }} className="text-slate-500 dark:text-white/40" />
                    <YAxis tick={{ fill: 'currentColor', fontSize: 9 }} className="text-slate-500 dark:text-white/40" />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine x={currentYear} stroke="#FF9933" strokeWidth={2} />
                    <Area type="monotone" dataKey="Infant Mortality (per 1000)" stroke="#F97316" strokeWidth={2} fill="url(#mortalityGrad)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="text-xs text-slate-500 dark:text-white/30 font-mono mt-2">
                <span>Declined from 178 (1947) down to {metric.infant_mortality.toFixed(0)} ({currentYear})</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Module Navigation Grid */}
      <div>
        <h2 className="font-display font-semibold text-slate-900 dark:text-white text-sm mb-3 flex items-center gap-2">
          <Rocket size={14} className="text-saffron" />
          Explore All 24 Modules
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
          {[
            { label: 'PM Report Cards', path: '/prime-ministers', icon: '🏛️', color: '#FFD700' },
            { label: 'Geopolitical Events', path: '/geopolitical', icon: '⚔️', color: '#DC143C' },
            { label: 'Rural India', path: '/rural', icon: '🌾', color: '#4ADE80' },
            { label: 'Urban India', path: '/urban', icon: '🏙️', color: '#60A5FA' },
            { label: 'Agriculture', path: '/agriculture', icon: '🌱', color: '#86EFAC' },
            { label: 'Industry', path: '/industry', icon: '🏭', color: '#F97316' },
            { label: 'Infrastructure', path: '/infrastructure', icon: '🛣️', color: '#A78BFA' },
            { label: 'Energy', path: '/energy', icon: '⚡', color: '#FDE68A' },
            { label: 'Education', path: '/education', icon: '📚', color: '#93C5FD' },
            { label: 'Healthcare', path: '/healthcare', icon: '🏥', color: '#F43F5E' },
            { label: 'Digital India', path: '/digital', icon: '📱', color: '#00D4FF' },
            { label: 'Space & Science', path: '/space', icon: '🚀', color: '#C084FC' },
            { label: 'Defense', path: '/defense', icon: '🛡️', color: '#6B7280' },
            { label: 'Economy', path: '/economy', icon: '💰', color: '#00FF88' },
            { label: 'Environment', path: '/environment', icon: '🌿', color: '#22D3EE' },
            { label: 'Demographics', path: '/demographics', icon: '👥', color: '#FB923C' },
            { label: 'State Analytics', path: '/states', icon: '📊', color: '#A3E635' },
            { label: 'AI Insights', path: '/ai-insights', icon: '🤖', color: '#E879F9' },
            { label: 'India by Decades', path: '/decades', icon: '📖', color: '#FBBF24' },
          ].map(({ label, path, icon, color }) => (
            <a
              key={path}
              href={path}
              className="glass rounded-xl p-3 hover-lift flex flex-col items-center gap-1.5 text-center group"
              style={{ borderColor: `${color}15` }}
              onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', path); window.dispatchEvent(new PopStateEvent('popstate')); }}
            >
              <span className="text-xl group-hover:scale-125 transition-transform duration-200">{icon}</span>
              <span className="text-xs text-slate-600 dark:text-white/50 group-hover:text-slate-900 dark:group-hover:text-white/80 transition-colors leading-tight">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
