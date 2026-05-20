import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GEOPOLITICAL_EVENTS } from '../data/geopoliticalEvents';

const EVENT_TYPE_COLORS: Record<string, string> = {
  war: '#DC143C', reform: '#00FF88', crisis: '#FF6600',
  milestone: '#FFD700', nuclear: '#9333EA', space: '#00D4FF',
  election: '#FF9933', diplomatic: '#60A5FA'
};

const EVENT_ICONS: Record<string, string> = {
  war: '⚔️', reform: '📜', crisis: '⚡', milestone: '🏆',
  nuclear: '☢️', space: '🚀', election: '🗳️', diplomatic: '🤝'
};

export default function GeopoliticalPage() {
  const [filter, setFilter] = useState<string>('all');
  const [selected, setSelected] = useState<typeof GEOPOLITICAL_EVENTS[0] | null>(null);

  const types = ['all', 'war', 'reform', 'crisis', 'milestone', 'nuclear', 'space', 'diplomatic'];
  const filtered = GEOPOLITICAL_EVENTS.filter(e => filter === 'all' || e.type === filter)
    .sort((a, b) => a.year - b.year);

  const impactData = GEOPOLITICAL_EVENTS
    .filter(e => e.gdp_impact_pct)
    .map(e => ({ year: e.year, impact: e.gdp_impact_pct, name: e.name, type: e.type }));

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 border-l-4 border-rose-600 dark:border-rose-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-1">Geopolitical Events Engine</h1>
          <p className="text-slate-500 dark:text-white/50 text-sm">Wars, reforms, crises, milestones — and their economic impact on India's trajectory</p>
        </div>
        <img src="/ashoka_stumbha.png" alt="Ashoka Stumbha" className="h-12 sm:h-16 object-contain flex-shrink-0 opacity-80 dark:invert hidden xs:block" />
      </div>
 
      {/* GDP Impact Chart */}
      <div className="glass rounded-2xl p-4">
        <h2 className="font-display font-semibold text-slate-900 dark:text-white text-sm mb-3">GDP Impact of Major Events</h2>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={impactData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--im-border)" />
            <XAxis dataKey="year" tick={{ fill: 'var(--im-text-muted)', fontSize: 12 }} />
            <YAxis tick={{ fill: 'var(--im-text-muted)', fontSize: 12 }} />
            <Tooltip
              contentStyle={{ background: 'var(--im-bg-2)', border: '1px solid var(--im-border)', borderRadius: 8, color: 'var(--im-text)' }}
              formatter={(v: any, _n: any, props: any) => [`${v}%`, props?.payload?.name]}
            />
            <Bar dataKey="impact" radius={[4, 4, 0, 0]}
              fill="#FF9933"
              label={{ position: 'top', fill: 'var(--im-text-muted)', fontSize: 9, formatter: (v: any) => `${v}%` }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
 
      {/* Type Filter */}
      <div className="flex overflow-x-auto pb-2 scrollbar-none gap-2 flex-nowrap -mx-4 px-4 lg:mx-0 lg:px-0 lg:flex-wrap">
        {types.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border transition-all font-medium capitalize shrink-0
              glass border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-800 dark:text-white/40 dark:hover:text-white/70"
            style={filter === t ? { background: `${EVENT_TYPE_COLORS[t] || '#FF9933'}20`, borderColor: `${EVENT_TYPE_COLORS[t] || '#FF9933'}40`, color: EVENT_TYPE_COLORS[t] || '#FF9933' } : {}}
          >
            {t !== 'all' && EVENT_ICONS[t]} {t === 'all' ? 'All Events' : t}
          </button>
        ))}
      </div>
 
      {/* Events List */}
      <div className="space-y-3">
        {filtered.map(event => {
          const color = EVENT_TYPE_COLORS[event.type] || '#FF9933';
          const isSelected = selected?.id === event.id;
          return (
            <motion.div
              key={event.id}
              className={`glass rounded-xl overflow-hidden cursor-pointer transition-all hover-lift`}
              style={{ borderColor: `${color}25`, borderLeftColor: color, borderLeftWidth: 3 }}
              onClick={() => setSelected(isSelected ? null : event)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="text-xl flex-shrink-0">{EVENT_ICONS[event.type]}</div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-mono font-bold text-sm" style={{ color }}>{event.year}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded font-medium capitalize"
                          style={{ background: `${color}15`, color }}>
                          {event.type}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-slate-900 dark:text-white text-sm">{event.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-white/50 mt-0.5 line-clamp-2">{event.description}</p>
                    </div>
                  </div>
                  {event.gdp_impact_pct && (
                    <div className={`text-center shrink-0 font-mono text-sm font-bold ${event.gdp_impact_pct < 0 ? 'text-rose-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                      {event.gdp_impact_pct > 0 ? '+' : ''}{event.gdp_impact_pct}%
                      <div className="text-xs text-slate-400 dark:text-white/30 font-normal">GDP impact</div>
                    </div>
                  )}
                </div>
              </div>
 
              {isSelected && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="border-t px-4 py-3 space-y-2 border-slate-100 dark:border-white/5"
                  style={{ borderColor: `${color}20` }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs font-semibold text-slate-400 dark:text-white/40 mb-1">Leaders Involved</div>
                      <div className="flex flex-wrap gap-1">
                        {event.leaders.map(l => (
                          <span key={l} className="text-xs px-2 py-0.5 rounded-full glass border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/60">{l}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-400 dark:text-white/40 mb-1">Economic Impact</div>
                      <p className="text-sm text-slate-600 dark:text-white/60">{event.economic_impact}</p>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 dark:text-white/40 mb-1">Long-Term Impact</div>
                    <p className="text-sm text-slate-600 dark:text-white/60">{event.long_term_impact}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
