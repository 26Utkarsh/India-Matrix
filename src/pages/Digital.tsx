import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wifi, Smartphone, Globe, Code } from 'lucide-react';
import { MilestonesAccordion } from '../components/ui/MilestonesAccordion';
import { useTimelineStore } from '../store';
import { PRIME_MINISTERS } from '../data/primeMinisters';

const DIGITAL_DATA = [
  { year: 1947, internet_users_m: 0, it_exports_b: 0, upi_vol_b: 0, milestone: 'Pre-digital era' },
  { year: 1980, internet_users_m: 0, it_exports_b: 0.01, upi_vol_b: 0, milestone: 'Early computing era' },
  { year: 1990, internet_users_m: 0, it_exports_b: 0.1, upi_vol_b: 0 },
  { year: 1995, internet_users_m: 0.25, it_exports_b: 0.5, upi_vol_b: 0 },
  { year: 2000, internet_users_m: 5.5, it_exports_b: 4.8, upi_vol_b: 0 },
  { year: 2005, internet_users_m: 25, it_exports_b: 17.7, upi_vol_b: 0 },
  { year: 2010, internet_users_m: 92, it_exports_b: 50, upi_vol_b: 0 },
  { year: 2015, internet_users_m: 320, it_exports_b: 108, upi_vol_b: 0 },
  { year: 2016, internet_users_m: 390, it_exports_b: 115, upi_vol_b: 0.002 },
  { year: 2018, internet_users_m: 560, it_exports_b: 136, upi_vol_b: 3.8 },
  { year: 2020, internet_users_m: 750, it_exports_b: 150, upi_vol_b: 18.8 },
  { year: 2022, internet_users_m: 880, it_exports_b: 194, upi_vol_b: 74 },
  { year: 2024, internet_users_m: 950, it_exports_b: 200, upi_vol_b: 117 },
  { year: 2025, internet_users_m: 1000, it_exports_b: 210, upi_vol_b: 150 },
  { year: 2026, internet_users_m: 1050, it_exports_b: 225, upi_vol_b: 190 },
];

export default function DigitalPage() {
  const { currentYear, pmEraMode, activePMId } = useTimelineStore();
  
  let data = DIGITAL_DATA;
  if (pmEraMode && activePMId) {
    const pm = PRIME_MINISTERS.find(p => p.id === activePMId);
    if (pm) {
      data = DIGITAL_DATA.filter(d => d.year <= pm.end_year);
    }
  } else {
    data = DIGITAL_DATA.filter(d => d.year <= currentYear);
  }

  const currentMetric = data[data.length - 1] || DIGITAL_DATA[0];

  return (
    <div className="space-y-6 pb-20">
      <div className="glass rounded-2xl p-6 border-l-4 border-l-cyan-600 dark:border-l-cyan-400 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Globe size={120} />
        </div>
        <div className="relative z-10 flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Wifi size={28} className="text-cyan-600 dark:text-cyan-400" />
            <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Digital India & IT Revolution</h1>
          </div>
          <p className="text-slate-600 dark:text-white/50 text-sm max-w-3xl">
            From the Y2K boom establishing India's IT services dominance, to the Jio revolution making data cheapest in the world, to the UPI establishing the global gold standard in digital public infrastructure.
          </p>
        </div>
        <img src="/ashoka_stumbha.png" alt="Ashoka Stumbha" className="h-12 sm:h-16 object-contain flex-shrink-0 opacity-80 relative z-10 dark:invert hidden xs:block" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Internet Users', value: `${currentMetric.internet_users_m}M`, icon: <Wifi size={16} /> },
          { label: 'IT Exports (USD)', value: `$${currentMetric.it_exports_b}B`, icon: <Code size={16} /> },
          { label: 'UPI Annual Vol.', value: `${currentMetric.upi_vol_b}B txns`, icon: <Smartphone size={16} /> },
        ].map((stat, i) => (
          <motion.div key={stat.label} className="glass rounded-xl p-5 border border-slate-200 dark:border-white/5"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="flex items-center gap-2 mb-3 text-cyan-500 dark:text-cyan-400">
              {stat.icon}
              <div className="text-xs uppercase tracking-wider font-bold">{stat.label}</div>
            </div>
            <div className="text-2xl md:text-3xl font-mono font-bold text-slate-900 dark:text-white">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-5 border border-slate-200 dark:border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-slate-900 dark:text-white">Internet Penetration (Millions)</h2>
            <div className="text-xs px-2 py-1 bg-cyan-100 text-cyan-700 dark:bg-cyan-400/20 dark:text-cyan-400 rounded">
              {pmEraMode ? 'PM Era Filtered' : `1990–${currentYear}`}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="internetColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--im-border)" />
              <XAxis dataKey="year" tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" />
              <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" />
              <Tooltip contentStyle={{ background: 'var(--im-bg)', border: '1px solid var(--im-border)', borderRadius: 8, color: 'var(--im-text)' }} />
              <Area type="monotone" dataKey="internet_users_m" stroke="#22D3EE" strokeWidth={3} fill="url(#internetColor)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-2xl p-5 border border-slate-200 dark:border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-slate-900 dark:text-white">UPI Transactions (Billions)</h2>
            <Smartphone size={16} className="text-emerald-500 dark:text-emerald-400" />
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data.filter(d => d.year >= 2016)}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--im-border)" vertical={false} />
              <XAxis dataKey="year" tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" />
              <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" />
              <Tooltip cursor={{ fill: 'rgba(150,150,150,0.1)' }} contentStyle={{ background: 'var(--im-bg)', border: '1px solid var(--im-border)', borderRadius: 8, color: 'var(--im-text)' }} />
              <Bar dataKey="upi_vol_b" fill="#34D399" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <MilestonesAccordion category="digital" />
    </div>
  );
}
