import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Users, TrendingUp, Shield, Activity, ArrowRight, ArrowLeft } from 'lucide-react';
import { GEOPOLITICAL_EVENTS } from '../data/geopoliticalEvents';
import { NATIONAL_METRICS } from '../data/nationalMetrics';
import { PRIME_MINISTERS } from '../data/primeMinisters';

const EVENT_TYPE_COLORS: Record<string, string> = {
  war: '#DC143C', reform: '#00FF88', crisis: '#FF6600',
  milestone: '#FFD700', nuclear: '#9333EA', space: '#00D4FF',
  election: '#FF9933', diplomatic: '#60A5FA'
};

const EVENT_ICONS: Record<string, string> = {
  war: '⚔️', reform: '📜', crisis: '⚡', milestone: '🏆',
  nuclear: '☢️', space: '🚀', election: '🗳️', diplomatic: '🤝'
};

export default function DecadesPage() {
  const [selectedEventId, setSelectedEventId] = useState<number>(10); // Default to 1991 reforms (id: 10)
  const timelineRef = useRef<HTMLDivElement>(null);

  const selectedEvent = useMemo(() => {
    return GEOPOLITICAL_EVENTS.find(e => e.id === selectedEventId) || GEOPOLITICAL_EVENTS[0];
  }, [selectedEventId]);

  const pmForSelectedEvent = useMemo(() => {
    if (!selectedEvent) return null;
    return PRIME_MINISTERS.find(pm => pm.id === selectedEvent.pm_id) || null;
  }, [selectedEvent]);

  // Dynamic GDP Backdrop chart data
  const chartData = useMemo(() => {
    return NATIONAL_METRICS.map(d => ({
      year: d.year,
      'GDP (USD B)': d.gdp_usd_billion,
      'Growth %': d.gdp_growth_pct,
      'Inflation %': d.inflation_cpi_pct,
    }));
  }, []);

  // Sorted list of timeline events
  const timelineEvents = useMemo(() => {
    return [...GEOPOLITICAL_EVENTS].sort((a, b) => a.year - b.year);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!timelineRef.current) return;
    const offset = direction === 'left' ? -350 : 350;
    timelineRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const CustomChartTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    const ev = GEOPOLITICAL_EVENTS.find(e => e.year === Number(label));
    return (
      <div className="bg-white border-slate-200 dark:bg-[#0a0f1e] dark:border-white/12 border rounded-xl p-3 shadow-2xl text-xs font-mono">
        <div className="font-bold text-saffron mb-1 text-sm">{label}</div>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2 mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
            <span className="text-slate-500 dark:text-white/60">{p.name}:</span>
            <span className="font-bold text-slate-900 dark:text-white">{p.value.toFixed(1)}{p.name.includes('%') ? '%' : 'B'}</span>
          </div>
        ))}
        {ev && (
          <div className="mt-2 pt-2 border-t border-slate-200 dark:border-white/10 font-sans text-xs">
            <div className="font-bold text-saffron flex items-center gap-1">
              <span>{EVENT_ICONS[ev.type] || '•'}</span> {ev.name}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Title Header */}
      <div className="glass rounded-2xl p-6 border-l-4 border-l-purple-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs uppercase tracking-wider font-bold text-purple-500 font-mono">Interactive Historical Ledger</div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">India Timeline & Milestone Tracker</h1>
          <p className="text-slate-600 dark:text-white/50 text-xs sm:text-sm">
            Scroll horizontally to navigate from 1947 to 2026. Audit major geopolitical turning points mapped over macro-growth indexes.
          </p>
        </div>
        <img src="/ashoka_stumbha.png" alt="Ashoka Stumbha" className="h-12 sm:h-16 object-contain flex-shrink-0 opacity-80 dark:invert hidden xs:block" />
      </div>

      {/* Backdrop Chart - Economic Trajectory & References */}
      <div className="glass rounded-2xl p-4 border border-slate-200 dark:border-white/10 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <h2 className="font-display font-semibold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <Activity size={14} className="text-purple-500" />
            Macro Economic Context Backdrop (1947–2026)
          </h2>
          <div className="flex gap-4 text-[10px] font-mono font-bold text-slate-500 dark:text-white/40 uppercase">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-500/20 border border-emerald-500" /> GDP ($B)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-cyan-400" /> GDP Growth %</span>
          </div>
        </div>

        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="timelineGdp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" />
              <XAxis dataKey="year" tick={{ fill: 'currentColor', fontSize: 10, fontFamily: 'JetBrains Mono' }} className="text-slate-500 dark:text-white/40" />
              <YAxis tick={{ fill: 'currentColor', fontSize: 9, fontFamily: 'JetBrains Mono' }} className="text-slate-500 dark:text-white/40" />
              <Tooltip content={<CustomChartTooltip />} />
              <Area type="monotone" dataKey="GDP (USD B)" stroke="#10B981" fill="url(#timelineGdp)" strokeWidth={1.5} dot={false} />
              <Line type="monotone" dataKey="Growth %" stroke="#22D3EE" strokeWidth={2} dot={false} />
              
              {/* Plot a vertical reference line at the selected event's year */}
              {selectedEvent && (
                <ReferenceLine 
                  x={selectedEvent.year} 
                  stroke={EVENT_TYPE_COLORS[selectedEvent.type] || '#FF9933'} 
                  strokeWidth={2} 
                  strokeDasharray="4 4"
                  label={{ value: String(selectedEvent.year), fill: 'currentColor', fontSize: 10, className: 'font-mono font-bold text-slate-900 dark:text-white' }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="text-[9px] font-mono text-slate-400 dark:text-white/20 mt-1 flex justify-between">
          <span>Source: MoSPI & World Bank WDI</span>
          <span>🟢 GDP Trajectory | 🔵 Growth Rate</span>
        </div>
      </div>

      {/* Horizontal Scroll Timeline Path */}
      <div className="relative group">
        {/* Navigation arrows */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-white shadow hover:scale-105 transition-transform"
        >
          <ArrowLeft size={16} />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-white shadow hover:scale-105 transition-transform"
        >
          <ArrowRight size={16} />
        </button>

        {/* Timeline Horizontal Grid */}
        <div 
          ref={timelineRef}
          className="overflow-x-auto py-4 px-12 flex gap-4 min-h-[170px] custom-scrollbar pointer-events-auto snap-x select-none"
        >
          {timelineEvents.map(event => {
            const color = EVENT_TYPE_COLORS[event.type] || '#FF9933';
            const isSelected = selectedEventId === event.id;

            return (
              <div 
                key={event.id}
                onClick={() => setSelectedEventId(event.id)}
                className={`snap-center flex-shrink-0 w-[240px] glass rounded-2xl border p-4 cursor-pointer transition-all duration-300 hover-lift select-none relative
                  ${isSelected 
                    ? 'shadow-lg scale-102 bg-slate-50/80 dark:bg-white/5 border-l-4 border-l-lime-500' 
                    : 'border-slate-200/80 dark:border-white/5 opacity-70 hover:opacity-100'}`}
                style={{ borderColor: isSelected ? undefined : `${color}25` }}
              >
                {/* Year Marker Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-extrabold text-sm" style={{ color: isSelected ? undefined : color }}>{event.year}</span>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded"
                    style={{ background: `${color}15`, color }}>
                    {event.type}
                  </span>
                </div>
                
                <h3 className="font-display font-extrabold text-xs text-slate-900 dark:text-white line-clamp-1 flex items-center gap-1.5">
                  <span>{EVENT_ICONS[event.type]}</span>
                  {event.name}
                </h3>
                
                <p className="text-[10px] text-slate-500 dark:text-white/40 mt-1 line-clamp-2 leading-relaxed">
                  {event.description}
                </p>

                {/* GDP Impact Tag */}
                {event.gdp_impact_pct && (
                  <div className={`mt-2 font-mono text-[10px] font-bold ${event.gdp_impact_pct < 0 ? 'text-red-500' : 'text-emerald-400'}`}>
                    GDP Impact: {event.gdp_impact_pct > 0 ? '+' : ''}{event.gdp_impact_pct}%
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Event Deep-Dive Panel */}
      <AnimatePresence mode="wait">
        {selectedEvent && (
          <motion.div
            key={selectedEvent.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-2xl border p-5 sm:p-6 shadow-lg space-y-5"
            style={{ borderLeft: `4px solid ${EVENT_TYPE_COLORS[selectedEvent.type] || '#FF9933'}` }}
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3.5 gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{EVENT_ICONS[selectedEvent.type]}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-base sm:text-lg" style={{ color: EVENT_TYPE_COLORS[selectedEvent.type] }}>{selectedEvent.year}</span>
                    <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded"
                      style={{ background: `${EVENT_TYPE_COLORS[selectedEvent.type]}20`, color: EVENT_TYPE_COLORS[selectedEvent.type] }}>
                      {selectedEvent.type}
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900 dark:text-white leading-tight mt-0.5">{selectedEvent.name}</h3>
                </div>
              </div>

              {/* Economic stats right */}
              {selectedEvent.gdp_impact_pct && (
                <div className="flex gap-6 shrink-0 bg-slate-50 dark:bg-white/3 px-4 py-2.5 rounded-xl border border-slate-100 dark:border-white/5">
                  <div>
                    <div className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 dark:text-white/20 font-mono">GDP Impact</div>
                    <div className={`font-mono text-sm font-bold ${selectedEvent.gdp_impact_pct < 0 ? 'text-red-500' : 'text-emerald-400'}`}>
                      {selectedEvent.gdp_impact_pct > 0 ? '+' : ''}{selectedEvent.gdp_impact_pct}%
                    </div>
                  </div>
                  {pmForSelectedEvent && (
                    <div className="border-l border-slate-200 dark:border-white/5 pl-4">
                      <div className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 dark:text-white/20 font-mono">PM in Office</div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{pmForSelectedEvent.name.split('(')[0].trim()}</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 dark:text-white/20 font-mono">Event Summary</h4>
              <p className="text-sm text-slate-700 dark:text-white/80 leading-relaxed font-medium">
                {selectedEvent.description}
              </p>
            </div>

            {/* Sub details grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              {/* Leaders block */}
              <div className="space-y-1.5">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 dark:text-white/20 font-mono flex items-center gap-1.5">
                  <Users size={12} className="text-purple-400" /> Key Figures
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedEvent.leaders.map(l => (
                    <span key={l} className="text-xs px-2.5 py-0.5 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/60 font-semibold">{l}</span>
                  ))}
                </div>
              </div>

              {/* Economic impact block */}
              <div className="space-y-1.5">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 dark:text-white/20 font-mono flex items-center gap-1.5">
                  <TrendingUp size={12} className="text-emerald-400" /> Immediate Economic Consequence
                </h4>
                <p className="text-xs text-slate-600 dark:text-white/60 leading-relaxed font-medium">{selectedEvent.economic_impact} <span className="font-mono text-[8.5px] text-slate-500 opacity-75">(Historical reports)</span></p>
              </div>

              {/* Long term block */}
              <div className="space-y-1.5">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 dark:text-white/20 font-mono flex items-center gap-1.5">
                  <Shield size={12} className="text-blue-400" /> Long-Term Geopolitical Impact
                </h4>
                <p className="text-xs text-slate-600 dark:text-white/60 leading-relaxed font-medium">{selectedEvent.long_term_impact}</p>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
