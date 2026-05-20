import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, LineChart, Line,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, Globe2, ArrowUpRight } from 'lucide-react';
import { NATIONAL_METRICS } from '../data/nationalMetrics';
import { MilestonesAccordion } from '../components/ui/MilestonesAccordion';

const gdpData = NATIONAL_METRICS.map(d => ({
  year: d.year,
  'GDP USD B': d.gdp_usd_billion,
  'Growth %': d.gdp_growth_pct,
  'Exports B': d.exports_usd_billion,
  'Forex B': d.forex_reserves_usd_billion,
  'Inflation %': d.inflation_cpi_pct,
}));

const sensexData = [
  { year: 1990, value: 1000 }, { year: 1995, value: 3000 }, { year: 2000, value: 5000 },
  { year: 2005, value: 9397 }, { year: 2008, value: 8000 }, { year: 2010, value: 20509 },
  { year: 2014, value: 26630 }, { year: 2017, value: 34057 }, { year: 2019, value: 41254 },
  { year: 2020, value: 47751 }, { year: 2021, value: 58254 }, { year: 2022, value: 61337 },
  { year: 2023, value: 72240 }, { year: 2025, value: 82000 }, { year: 2026, value: 85000 }
];

const fdiData = [
  { year: 2000, fdi: 3.6 }, { year: 2005, fdi: 7.6 }, { year: 2008, fdi: 43.4 },
  { year: 2010, fdi: 27.4 }, { year: 2012, fdi: 25.5 }, { year: 2014, fdi: 34.6 },
  { year: 2016, fdi: 60.1 }, { year: 2018, fdi: 42.3 }, { year: 2020, fdi: 81.9 },
  { year: 2022, fdi: 84.8 }, { year: 2023, fdi: 70.9 }, { year: 2024, fdi: 67.0 },
  { year: 2026, fdi: 74.2 }
];

const sectorComposition = [
  { name: 'Services', value: 55.4, color: '#00D4FF' },
  { name: 'Industry', value: 25.8, color: '#FF9933' },
  { name: 'Agriculture', value: 18.8, color: '#00FF88' },
];

const rupeeData = [
  { year: 1947, rate: 3.31 }, { year: 1960, rate: 4.76 }, { year: 1966, rate: 7.5 },
  { year: 1975, rate: 8.4 }, { year: 1980, rate: 7.9 }, { year: 1985, rate: 12.4 },
  { year: 1990, rate: 17.5 }, { year: 1991, rate: 24.5 }, { year: 1995, rate: 35.5 },
  { year: 2000, rate: 45.1 }, { year: 2005, rate: 44.1 }, { year: 2010, rate: 45.7 },
  { year: 2014, rate: 62.3 }, { year: 2016, rate: 67.2 }, { year: 2020, rate: 74.1 },
  { year: 2022, rate: 79.8 }, { year: 2024, rate: 83.6 }, { year: 2026, rate: 84.2 }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border-slate-200 dark:bg-[#0a0f1e] dark:border-white/12 border rounded-xl p-3 shadow-2xl">
      <div className="font-mono font-bold text-saffron text-sm mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color || p.stroke }} />
          <span className="text-slate-500 dark:text-white/60">{p.name}:</span>
          <span className="font-mono text-slate-900 dark:text-white">{typeof p.value === 'number' ? p.value.toLocaleString() : p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function EconomyPage() {
  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 border-l-4 flex flex-row items-center justify-between gap-4" style={{ borderLeftColor: '#00FF88' }}>
        <div className="flex-1">
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-1">Economy, Trade & Finance</h1>
          <p className="text-slate-600 dark:text-white/50 text-sm">From $32B (1947) to $4.58T (2026) — India's 143× economic expansion</p>
          <div className="text-xs font-mono text-slate-500 dark:text-white/25 mt-1">Sources: MOSPI · RBI Handbook of Statistics · World Bank · IMF WEO</div>
        </div>
        <img src="/ashoka_stumbha.png" alt="Ashoka Stumbha" className="h-16 object-contain flex-shrink-0 opacity-80 dark:invert" />
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'GDP (USD)', value: '$4.20T', sub: '#5 globally', color: '#00FF88', icon: <TrendingUp size={16} /> },
          { label: 'GDP (₹ Crore)', value: '₹350L Cr', sub: 'FY2025-26', color: '#FFD700', icon: <DollarSign size={16} /> },
          { label: 'Exports', value: '$845B', sub: 'goods + services', color: '#00D4FF', icon: <ArrowUpRight size={16} /> },
          { label: 'Forex Reserves', value: '$710B', sub: '3rd largest Asia', color: '#9333EA', icon: <Globe2 size={16} /> },
        ].map(({ label, value, sub, color, icon }) => (
          <motion.div key={label} className="glass rounded-xl p-4 hover-lift" style={{ borderColor: `${color}20` }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg" style={{ background: `${color}15`, color }}>{icon}</div>
            </div>
            <div className="font-mono font-bold text-xl text-slate-900 dark:text-white">{value}</div>
            <div className="text-sm text-slate-500 dark:text-white/50 mt-0.5">{label}</div>
            <div className="text-xs text-slate-400 dark:text-white/25 font-mono">{sub}</div>
          </motion.div>
        ))}
      </div>

      {/* GDP + Growth Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-4">
          <h2 className="font-display font-semibold text-slate-900 dark:text-white text-sm mb-3">GDP — 1947 to 2026 (USD Billion)</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={gdpData}>
              <defs>
                <linearGradient id="gdpAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00FF88" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00FF88" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" />
              <XAxis dataKey="year" tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" />
              <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="GDP USD B" stroke="#00FF88" fill="url(#gdpAreaGrad)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-2xl p-4">
          <h2 className="font-display font-semibold text-slate-900 dark:text-white text-sm mb-3">Annual GDP Growth Rate (%)</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={gdpData.filter(d => d['Growth %'] !== undefined)}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" />
              <XAxis dataKey="year" tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" />
              <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="Growth %" radius={[2, 2, 0, 0]}
                fill="#00D4FF"
                label={{ position: 'top', fill: 'var(--im-text-muted)', fontSize: 8 }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sensex + FDI + Rupee + Sector Mix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-4">
          <h2 className="font-display font-semibold text-slate-900 dark:text-white text-sm mb-3">BSE Sensex (1990–2025)</h2>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={sensexData}>
              <defs>
                <linearGradient id="sensexGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFD700" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FFD700" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" />
              <XAxis dataKey="year" tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" />
              <YAxis tick={{ fill: 'currentColor', fontSize: 9 }} className="text-slate-500 dark:text-white/40" />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" name="Sensex" stroke="#FFD700" fill="url(#sensexGrad)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="text-xs font-mono text-slate-500 dark:text-white/25 mt-1">Source: BSE · 1,000 (1990) → 82,000 (2025) = 82× growth</div>
        </div>

        <div className="glass rounded-2xl p-4">
          <h2 className="font-display font-semibold text-slate-900 dark:text-white text-sm mb-3">FDI Inflows (USD Billion)</h2>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={fdiData}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" />
              <XAxis dataKey="year" tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" />
              <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="fdi" name="FDI USD B" fill="#9333EA" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="text-xs font-mono text-slate-500 dark:text-white/25 mt-1">Source: DPIIT · Pre-LPG (negligible) → $84B peak (2021-22)</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-4">
          <h2 className="font-display font-semibold text-slate-900 dark:text-white text-sm mb-3">₹/USD Exchange Rate (1947–2026)</h2>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={rupeeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" />
              <XAxis dataKey="year" tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" />
              <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="rate" name="₹ per $" stroke="#DC143C" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div className="text-xs font-mono text-slate-500 dark:text-white/25 mt-1">₹3.31 (1947) → ₹84.2 (2026) · Major devaluations: 1966, 1991</div>
        </div>

        <div className="glass rounded-2xl p-4">
          <h2 className="font-display font-semibold text-slate-900 dark:text-white text-sm mb-3">GDP Sector Composition (2026)</h2>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="55%" height={180}>
              <PieChart>
                <Pie data={sectorComposition} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value"
                  labelLine={false} label={({ percent }: any) => percent ? `${(percent * 100).toFixed(0)}%` : ''}>
                  {sectorComposition.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {sectorComposition.map(s => (
                <div key={s.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ background: s.color }} />
                  <div>
                    <div className="text-xs text-slate-900 dark:text-white font-medium">{s.name}</div>
                    <div className="text-sm font-mono text-slate-500 dark:text-white/60">{s.value}% of GDP</div>
                  </div>
                </div>
              ))}
              <div className="text-xs text-slate-500 dark:text-white/25 font-mono">Source: MOSPI 2026</div>
            </div>
          </div>
        </div>
      </div>

      {/* Exports breakdown */}
      <div className="glass rounded-2xl p-4">
        <h2 className="font-display font-semibold text-slate-900 dark:text-white text-sm mb-3">Export Growth (USD Billion)</h2>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={gdpData}>
            <defs>
              <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" />
            <XAxis dataKey="year" tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" />
            <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="Exports B" stroke="#00D4FF" fill="url(#expGrad)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="text-xs font-mono text-slate-500 dark:text-white/25 mt-1">$1.2B (1947) → $845B (2026) · Includes IT/software services · Source: Commerce Ministry, RBI</div>
      </div>

      <MilestonesAccordion category="economy" />
    </div>
  );
}
