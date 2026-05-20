import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Train, Plane, Map as MapIcon, Activity } from 'lucide-react';
import { useTimelineStore } from '../store';
import { PRIME_MINISTERS } from '../data/primeMinisters';

const INFRASTRUCTURE_DATA = [
  { year: 1947, highway_km: 19000, rail_electrified_km: 300, airports: 12 },
  { year: 1950, highway_km: 19811, rail_electrified_km: 388, airports: 15 },
  { year: 1960, highway_km: 23798, rail_electrified_km: 748, airports: 20 },
  { year: 1970, highway_km: 28819, rail_electrified_km: 3706, airports: 35 },
  { year: 1980, highway_km: 31671, rail_electrified_km: 5345, airports: 45 },
  { year: 1990, highway_km: 33612, rail_electrified_km: 10809, airports: 50 },
  { year: 2000, highway_km: 52010, rail_electrified_km: 16279, airports: 50 },
  { year: 2010, highway_km: 70934, rail_electrified_km: 18927, airports: 75 },
  { year: 2014, highway_km: 97991, rail_electrified_km: 21614, airports: 74 },
  { year: 2020, highway_km: 136440, rail_electrified_km: 45881, airports: 100 },
  { year: 2024, highway_km: 146145, rail_electrified_km: 61508, airports: 149 },
  { year: 2025, highway_km: 148000, rail_electrified_km: 65000, airports: 150 },
  { year: 2026, highway_km: 162000, rail_electrified_km: 68000, airports: 155 },
];

export default function InfrastructurePage() {
  const { currentYear, pmEraMode, activePMId } = useTimelineStore();
  
  let data = INFRASTRUCTURE_DATA;
  if (pmEraMode && activePMId) {
    const pm = PRIME_MINISTERS.find(p => p.id === activePMId);
    if (pm) {
      data = INFRASTRUCTURE_DATA.filter(d => d.year <= pm.end_year);
    }
  } else {
    data = INFRASTRUCTURE_DATA.filter(d => d.year <= currentYear);
  }

  const currentMetric = data[data.length - 1] || INFRASTRUCTURE_DATA[0];

  return (
    <div className="space-y-6 pb-20">
      <div className="glass rounded-2xl p-6 border-l-4 flex flex-row items-center justify-between gap-4" style={{ borderLeftColor: '#F59E0B' }}>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <MapIcon size={28} className="text-amber-500" />
            <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Infrastructure & Mega Projects</h1>
          </div>
          <p className="text-slate-600 dark:text-white/50 text-sm max-w-3xl">
            Visualizing the expansion of India's arteries: National Highways, Railway Electrification, and Aviation infrastructure from 1950 to {currentYear}.
          </p>
        </div>
        <img src="/ashoka_stumbha.png" alt="Ashoka Stumbha" className="h-16 object-contain flex-shrink-0 opacity-80 dark:invert" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'National Highways', value: `${currentMetric.highway_km.toLocaleString()} km`, icon: <MapIcon size={16} /> },
          { label: 'Railway Electrified', value: `${currentMetric.rail_electrified_km.toLocaleString()} km`, icon: <Train size={16} /> },
          { label: 'Operational Airports', value: currentMetric.airports, icon: <Plane size={16} /> },
        ].map((stat, i) => (
          <motion.div key={stat.label} className="glass rounded-xl p-5 border border-slate-200 dark:border-white/5"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="flex items-center gap-2 mb-3 text-amber-600 dark:text-amber-500">
              {stat.icon}
              <div className="text-xs uppercase tracking-wider font-bold">{stat.label}</div>
            </div>
            <div className="text-3xl font-mono font-bold text-slate-900 dark:text-white">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-5 border border-slate-200 dark:border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-slate-900 dark:text-white">Highway Expansion (km)</h2>
            <div className="text-xs px-2 py-1 bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 rounded">
              {pmEraMode ? 'PM Era Filtered' : `1950–${currentYear}`}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="highwayColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--im-border)" />
              <XAxis dataKey="year" tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" />
              <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" />
              <Tooltip contentStyle={{ background: 'var(--im-bg)', border: '1px solid var(--im-border)', borderRadius: 8, color: 'var(--im-text)' }} />
              <Area type="monotone" dataKey="highway_km" stroke="#F59E0B" strokeWidth={3} fill="url(#highwayColor)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-2xl p-5 border border-slate-200 dark:border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-slate-900 dark:text-white">Railway Electrification (km)</h2>
            <Activity size={16} className="text-blue-500 dark:text-blue-400" />
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--im-border)" vertical={false} />
              <XAxis dataKey="year" tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" />
              <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" />
              <Tooltip cursor={{ fill: 'rgba(150,150,150,0.1)' }} contentStyle={{ background: 'var(--im-bg)', border: '1px solid var(--im-border)', borderRadius: 8, color: 'var(--im-text)' }} />
              <Bar dataKey="rail_electrified_km" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
