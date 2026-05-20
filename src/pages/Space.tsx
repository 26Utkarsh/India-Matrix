import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Rocket, Satellite, Activity } from 'lucide-react';
import { useTimelineStore } from '../store';
import { PRIME_MINISTERS } from '../data/primeMinisters';
import { MilestonesAccordion } from '../components/ui/MilestonesAccordion';

const ISRO_DATA = [
  { year: 1969, budget_cr: 1, satellites: 0, missions: 0 },
  { year: 1975, budget_cr: 10, satellites: 1, missions: 1 }, // Aryabhata
  { year: 1980, budget_cr: 50, satellites: 3, missions: 2 }, // SLV-3
  { year: 1990, budget_cr: 300, satellites: 10, missions: 5 },
  { year: 2000, budget_cr: 2000, satellites: 25, missions: 12 },
  { year: 2008, budget_cr: 4000, satellites: 45, missions: 20, milestone: 'Chandrayaan-1' },
  { year: 2014, budget_cr: 6000, satellites: 74, missions: 35, milestone: 'Mangalyaan' },
  { year: 2019, budget_cr: 11000, satellites: 110, missions: 50, milestone: 'Chandrayaan-2' },
  { year: 2023, budget_cr: 12500, satellites: 124, missions: 60, milestone: 'Chandrayaan-3 & Aditya L1' },
  { year: 2025, budget_cr: 13000, satellites: 140, missions: 70, milestone: 'Gaganyaan Uncrewed Flight' },
  { year: 2026, budget_cr: 13500, satellites: 152, missions: 76, milestone: 'Gaganyaan H1 Crewed & Chandrayaan-4 prep' },
];

export default function SpacePage() {
  const { currentYear, pmEraMode, activePMId } = useTimelineStore();
  
  let data = ISRO_DATA;
  if (pmEraMode && activePMId) {
    const pm = PRIME_MINISTERS.find(p => p.id === activePMId);
    if (pm) {
      data = ISRO_DATA.filter(d => d.year >= pm.start_year && d.year <= pm.end_year);
    }
  } else {
    data = ISRO_DATA.filter(d => d.year <= currentYear);
  }
  
  const currentMetric = data[data.length - 1] || ISRO_DATA[0];

  return (
    <div className="space-y-6 pb-20">
      <div className="glass rounded-2xl p-6 border-l-4 border-l-purple-500 relative overflow-hidden flex flex-row items-center justify-between gap-4">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Rocket size={120} />
        </div>
        <div className="relative z-10 flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Rocket size={28} className="text-purple-400" />
            <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Space & Science (ISRO)</h1>
          </div>
          <p className="text-slate-600 dark:text-white/50 text-sm max-w-3xl">
            From transporting rockets on bicycles in 1963 to landing on the lunar south pole in 2023. Tracking the meteoric rise of the Indian Space Research Organisation.
          </p>
        </div>
        <img src="/ashoka_stumbha.png" alt="Ashoka Stumbha" className="h-16 object-contain flex-shrink-0 opacity-80 relative z-10 dark:invert" />
      </div>

      <MilestonesAccordion category="space" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Annual Budget', value: `₹${currentMetric.budget_cr.toLocaleString()} Cr`, icon: <Activity size={16} /> },
          { label: 'Satellites Launched', value: currentMetric.satellites, icon: <Satellite size={16} /> },
          { label: 'Latest Milestone', value: currentMetric.milestone || 'N/A', icon: <Rocket size={16} /> },
        ].map((stat, i) => (
          <motion.div key={stat.label} className="glass rounded-xl p-5 border border-slate-200 dark:border-white/5"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="flex items-center gap-2 mb-3 text-purple-600 dark:text-purple-400">
              {stat.icon}
              <div className="text-xs uppercase tracking-wider font-bold">{stat.label}</div>
            </div>
            <div className="text-xl md:text-2xl font-mono font-bold text-slate-900 dark:text-white truncate font-sans whitespace-pre-wrap">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl p-5 border border-slate-200 dark:border-white/5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-semibold text-slate-900 dark:text-white">ISRO Budget Growth (₹ Crores)</h2>
          <div className="text-xs px-2 py-1 bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400 rounded">
            {pmEraMode ? 'PM Era Filtered' : `1969–${currentYear}`}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--im-border)" />
            <XAxis dataKey="year" tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" />
            <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" />
            <Tooltip contentStyle={{ background: 'var(--im-bg)', border: '1px solid var(--im-border)', borderRadius: 8, color: 'var(--im-text)' }} />
            <Line type="monotone" dataKey="budget_cr" stroke="#A855F7" strokeWidth={3} dot={{ fill: '#A855F7', r: 4 }} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
