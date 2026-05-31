import React, { useState } from 'react';
import { X, Award, BookOpen, Compass, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useUIStore } from '../../store';
import { PRIME_MINISTERS } from '../../data/primeMinisters';

export const CompareModal: React.FC = () => {
  const { activeModal, setActiveModal } = useUIStore();
  const isOpen = activeModal === 'compare';

  // Default: Nehru (1) vs Modi (18)
  const [pm1Id, setPm1Id] = useState<number>(1);
  const [pm2Id, setPm2Id] = useState<number>(18);

  if (!isOpen) return null;

  const pm1 = PRIME_MINISTERS.find(p => p.id === pm1Id) || PRIME_MINISTERS[0];
  const pm2 = PRIME_MINISTERS.find(p => p.id === pm2Id) || PRIME_MINISTERS[PRIME_MINISTERS.length - 1];

  const partyColors: Record<string, string> = {
    INC: '#138808', BJP: '#FF9933', JP: '#8B4513', 'Janata Party': '#8B4513'
  };

  const color1 = partyColors[pm1.party_abbr] || '#00D4FF';
  const color2 = partyColors[pm2.party_abbr] || '#9333EA';

  const radarData = [
    { subject: 'Economic', A: pm1.economic_score, B: pm2.economic_score, fullMark: 25 },
    { subject: 'Social', A: pm1.social_score, B: pm2.social_score, fullMark: 25 },
    { subject: 'Foreign Policy', A: pm1.foreign_score, B: pm2.foreign_score, fullMark: 25 },
    { subject: 'Governance', A: pm1.governance_score, B: pm2.governance_score, fullMark: 25 },
  ];

  const barData = [
    { metric: 'GDP Growth %', [pm1.name]: pm1.avg_gdp_growth, [pm2.name]: pm2.avg_gdp_growth },
    { metric: 'Avg Inflation %', [pm1.name]: pm1.inflation_avg, [pm2.name]: pm2.inflation_avg },
    { metric: 'Legacy Score', [pm1.name]: pm1.legacy_score, [pm2.name]: pm2.legacy_score },
  ];

  const formatGdp = (gdp: number) => {
    return gdp >= 1000 ? `$${(gdp / 1000).toFixed(2)}T` : `$${gdp}B`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/75 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-5xl bg-white dark:bg-[#0a0f1e] border border-slate-200 dark:border-white/12 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-white/5">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚔️</span>
                <div>
                  <h2 className="font-display font-bold text-base text-slate-900 dark:text-white leading-tight">Side-by-Side Comparison Matrix</h2>
                  <p className="text-[10px] font-mono text-slate-500 dark:text-white/30">Head-to-head leaders audit</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Select Dropdowns */}
            <div className="p-4 border-b border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#070c1a] grid grid-cols-2 gap-3 sm:gap-4 shrink-0">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 dark:text-white/30 mb-1 font-mono">Leader 1</label>
                <select 
                  value={pm1Id}
                  onChange={e => setPm1Id(Number(e.target.value))}
                  className="w-full bg-white dark:bg-[#0a0f1e] border border-slate-300 dark:border-white/10 rounded-lg px-2.5 py-2 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-orange-500 font-medium"
                >
                  {PRIME_MINISTERS.map(pm => (
                    <option key={pm.id} value={pm.id}>{pm.name} ({pm.start_year}-{pm.end_year === 2026 ? 'Present' : pm.end_year})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 dark:text-white/30 mb-1 font-mono">Leader 2</label>
                <select 
                  value={pm2Id}
                  onChange={e => setPm2Id(Number(e.target.value))}
                  className="w-full bg-white dark:bg-[#0a0f1e] border border-slate-300 dark:border-white/10 rounded-lg px-2.5 py-2 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-orange-500 font-medium"
                >
                  {PRIME_MINISTERS.map(pm => (
                    <option key={pm.id} value={pm.id}>{pm.name} ({pm.start_year}-{pm.end_year === 2026 ? 'Present' : pm.end_year})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Scrollable Container */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-8 custom-scrollbar">
              
              {/* Profile Showcase Cards */}
              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                {/* PM 1 Card */}
                <div className="glass p-4 rounded-2xl border flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left transition-all"
                  style={{ borderColor: `${color1}30` }}>
                  <div className="relative shrink-0 w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shadow">
                    <img src={pm1.image_url} alt={pm1.name} className="w-full h-full object-cover object-top" 
                          onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(pm1.name)}&background=1a2540&color=fff&size=100` }} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] px-2 py-0.5 rounded font-extrabold text-white uppercase tracking-wider" style={{ background: color1 }}>
                      {pm1.party_abbr}
                    </span>
                    <h3 className="font-display font-extrabold text-sm sm:text-base text-slate-900 dark:text-white mt-1.5 leading-tight truncate">{pm1.name.split('(')[0].trim()}</h3>
                    <div className="text-[10px] font-mono text-slate-500 dark:text-white/40 mt-1 leading-relaxed">
                      {pm1.start_date} - {pm1.end_date}
                    </div>
                  </div>
                </div>

                {/* PM 2 Card */}
                <div className="glass p-4 rounded-2xl border flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left transition-all"
                  style={{ borderColor: `${color2}30` }}>
                  <div className="relative shrink-0 w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shadow">
                    <img src={pm2.image_url} alt={pm2.name} className="w-full h-full object-cover object-top" 
                          onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(pm2.name)}&background=1a2540&color=fff&size=100` }} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] px-2 py-0.5 rounded font-extrabold text-white uppercase tracking-wider" style={{ background: color2 }}>
                      {pm2.party_abbr}
                    </span>
                    <h3 className="font-display font-extrabold text-sm sm:text-base text-slate-900 dark:text-white mt-1.5 leading-tight truncate">{pm2.name.split('(')[0].trim()}</h3>
                    <div className="text-[10px] font-mono text-slate-500 dark:text-white/40 mt-1 leading-relaxed">
                      {pm2.start_date} - {pm2.end_date}
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Visualization Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                {/* Radar Chart */}
                <div className="glass p-4 rounded-2xl border border-slate-200 dark:border-white/10">
                  <h4 className="font-semibold text-xs text-slate-900 dark:text-white mb-4 uppercase tracking-wider flex items-center gap-1.5">
                    <Award size={13} className="text-saffron" /> Legacy Vectors Comparison
                  </h4>
                  <ResponsiveContainer width="100%" height={230}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="currentColor" className="text-slate-200 dark:text-white/5" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor', fontSize: 9, className: 'font-display font-semibold' }} className="text-slate-500 dark:text-white/50" />
                      <Tooltip contentStyle={{ background: 'var(--im-bg-2)', border: '1px solid var(--im-border)', borderRadius: 8, fontSize: 10 }} />
                      <Radar name={pm1.name.split('(')[0].trim()} dataKey="A" stroke={color1} fill={color1} fillOpacity={0.25} />
                      <Radar name={pm2.name.split('(')[0].trim()} dataKey="B" stroke={color2} fill={color2} fillOpacity={0.25} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Economic Comparison Bar Chart */}
                <div className="glass p-4 rounded-2xl border border-slate-200 dark:border-white/10">
                  <h4 className="font-semibold text-xs text-slate-900 dark:text-white mb-4 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen size={13} className="text-blue-400" /> Economic Metrics Comparison
                  </h4>
                  <ResponsiveContainer width="100%" height={230}>
                    <BarChart data={barData} layout="vertical" margin={{ left: -15, right: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" horizontal={false} />
                      <XAxis type="number" tick={{ fill: 'currentColor', fontSize: 10 }} className="text-slate-500 dark:text-white/40" />
                      <YAxis type="category" dataKey="metric" tick={{ fill: 'currentColor', fontSize: 9, className: 'font-mono' }} className="text-slate-500 dark:text-white/60" width={110} />
                      <Tooltip contentStyle={{ background: 'var(--im-bg-2)', border: '1px solid var(--im-border)', borderRadius: 8, fontSize: 10 }} />
                      <Bar dataKey={pm1.name} name={pm1.name.split('(')[0].trim()} fill={color1} radius={[0, 4, 4, 0]} />
                      <Bar dataKey={pm2.name} name={pm2.name.split('(')[0].trim()} fill={color2} radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Head-to-Head Comparison Matrix Table */}
              <div className="glass rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
                <div className="p-3.5 bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <h4 className="font-display font-extrabold text-xs uppercase tracking-wider text-slate-700 dark:text-white/80">Audit Comparison Matrix</h4>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-white/30">Side-by-side core ledger</span>
                </div>
                
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-center">
                    <thead>
                      <tr className="bg-slate-100/50 dark:bg-[#070c1a]/60 border-b border-slate-200 dark:border-white/10 font-mono text-[10px] text-slate-500 dark:text-white/30">
                        <th className="px-4 py-2 font-medium w-5/12">{pm1.name.split('(')[0].trim()}</th>
                        <th className="px-4 py-2 font-medium w-2/12 border-x border-slate-200 dark:border-white/10">Metric</th>
                        <th className="px-4 py-2 font-medium w-5/12">{pm2.name.split('(')[0].trim()}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-xs">
                      
                      {/* Political Details */}
                      <tr className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/3 transition-colors">
                        <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-white/80">{pm1.party}</td>
                        <td className="px-4 py-2.5 text-[9px] uppercase font-extrabold tracking-wider text-slate-400 dark:text-white/20 border-x border-slate-100 dark:border-white/5 font-mono">Party</td>
                        <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-white/80">{pm2.party}</td>
                      </tr>

                      <tr className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/3 transition-colors">
                        <td className="px-4 py-2.5">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${pm1.majority ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'}`}>
                            {pm1.majority ? 'Absolute Majority' : 'Coalition'}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-[9px] uppercase font-extrabold tracking-wider text-slate-400 dark:text-white/20 border-x border-slate-100 dark:border-white/5 font-mono">Government type</td>
                        <td className="px-4 py-2.5">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${pm2.majority ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'}`}>
                            {pm2.majority ? 'Absolute Majority' : 'Coalition'}
                          </span>
                        </td>
                      </tr>

                      {/* Economic Records */}
                      <tr className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/3 transition-colors">
                        <td className="px-4 py-2.5 font-bold font-mono text-slate-900 dark:text-white">{pm1.avg_gdp_growth}% <span className="text-[9px] font-normal text-slate-400">(MoSPI)</span></td>
                        <td className="px-4 py-2.5 text-[9px] uppercase font-extrabold tracking-wider text-slate-400 dark:text-white/20 border-x border-slate-100 dark:border-white/5 font-mono">Avg GDP Growth</td>
                        <td className="px-4 py-2.5 font-bold font-mono text-slate-900 dark:text-white">{pm2.avg_gdp_growth}% <span className="text-[9px] font-normal text-slate-400">(MoSPI)</span></td>
                      </tr>

                      <tr className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/3 transition-colors">
                        <td className="px-4 py-2.5 font-bold font-mono text-slate-900 dark:text-white">{pm1.inflation_avg}% <span className="text-[9px] font-normal text-slate-400">(RBI)</span></td>
                        <td className="px-4 py-2.5 text-[9px] uppercase font-extrabold tracking-wider text-slate-400 dark:text-white/20 border-x border-slate-100 dark:border-white/5 font-mono">Avg CPI Inflation</td>
                        <td className="px-4 py-2.5 font-bold font-mono text-slate-900 dark:text-white">{pm2.inflation_avg}% <span className="text-[9px] font-normal text-slate-400">(RBI)</span></td>
                      </tr>

                      <tr className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/3 transition-colors">
                        <td className="px-4 py-2.5 font-mono text-slate-700 dark:text-white/70">{formatGdp(pm1.gdp_start_usd)} → {formatGdp(pm1.gdp_end_usd)} <span className="text-[9px] font-normal text-slate-400">(WB)</span></td>
                        <td className="px-4 py-2.5 text-[9px] uppercase font-extrabold tracking-wider text-slate-400 dark:text-white/20 border-x border-slate-100 dark:border-white/5 font-mono">GDP Trajectory</td>
                        <td className="px-4 py-2.5 font-mono text-slate-700 dark:text-white/70">{formatGdp(pm2.gdp_start_usd)} → {formatGdp(pm2.gdp_end_usd)} <span className="text-[9px] font-normal text-slate-400">(WB)</span></td>
                      </tr>

                      <tr className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/3 transition-colors">
                        <td className={`px-4 py-2.5 font-mono font-bold ${pm1.poverty_change_pct <= pm2.poverty_change_pct ? 'text-emerald-500' : 'text-slate-600 dark:text-white/50'}`}>
                          {pm1.poverty_change_pct}% <span className="text-[9px] font-normal text-slate-400">(NITI)</span>
                        </td>
                        <td className="px-4 py-2.5 text-[9px] uppercase font-extrabold tracking-wider text-slate-400 dark:text-white/20 border-x border-slate-100 dark:border-white/5 font-mono">Poverty Shift</td>
                        <td className={`px-4 py-2.5 font-mono font-bold ${pm2.poverty_change_pct < pm1.poverty_change_pct ? 'text-emerald-500' : 'text-slate-600 dark:text-white/50'}`}>
                          {pm2.poverty_change_pct}% <span className="text-[9px] font-normal text-slate-400">(NITI)</span>
                        </td>
                      </tr>

                      <tr className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/3 transition-colors">
                        <td className={`px-4 py-2.5 font-mono font-bold ${pm1.literacy_change_pct >= pm2.literacy_change_pct ? 'text-emerald-500' : 'text-slate-600 dark:text-white/50'}`}>
                          +{pm1.literacy_change_pct}% <span className="text-[9px] font-normal text-slate-400">(Census)</span>
                        </td>
                        <td className="px-4 py-2.5 text-[9px] uppercase font-extrabold tracking-wider text-slate-400 dark:text-white/20 border-x border-slate-100 dark:border-white/5 font-mono">Literacy growth</td>
                        <td className={`px-4 py-2.5 font-mono font-bold ${pm2.literacy_change_pct > pm1.literacy_change_pct ? 'text-emerald-500' : 'text-slate-600 dark:text-white/50'}`}>
                          +{pm2.literacy_change_pct}% <span className="text-[9px] font-normal text-slate-400">(Census)</span>
                        </td>
                      </tr>

                      {/* Achievements */}
                      <tr className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/3 transition-colors">
                        <td className="px-4 py-2.5 font-bold font-mono text-slate-800 dark:text-white/80">{pm1.major_policies.length} Policies</td>
                        <td className="px-4 py-2.5 text-[9px] uppercase font-extrabold tracking-wider text-slate-400 dark:text-white/20 border-x border-slate-100 dark:border-white/5 font-mono">Policy Count</td>
                        <td className="px-4 py-2.5 font-bold font-mono text-slate-800 dark:text-white/80">{pm2.major_policies.length} Policies</td>
                      </tr>

                      <tr className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/3 transition-colors">
                        <td className="px-4 py-2.5 font-mono text-slate-700 dark:text-white/70">{pm1.space_milestones.length > 0 ? `${pm1.space_milestones.length} (🚀)` : 'None'}</td>
                        <td className="px-4 py-2.5 text-[9px] uppercase font-extrabold tracking-wider text-slate-400 dark:text-white/20 border-x border-slate-100 dark:border-white/5 font-mono">Space Landmarks</td>
                        <td className="px-4 py-2.5 font-mono text-slate-700 dark:text-white/70">{pm2.space_milestones.length > 0 ? `${pm2.space_milestones.length} (🚀)` : 'None'}</td>
                      </tr>

                      <tr className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/3 transition-colors">
                        <td className="px-4 py-2.5 font-mono text-slate-700 dark:text-white/70">{pm1.nuclear_milestones.length > 0 ? `${pm1.nuclear_milestones.length} (☢️)` : 'None'}</td>
                        <td className="px-4 py-2.5 text-[9px] uppercase font-extrabold tracking-wider text-slate-400 dark:text-white/20 border-x border-slate-100 dark:border-white/5 font-mono">Nuclear Landmarks</td>
                        <td className="px-4 py-2.5 font-mono text-slate-700 dark:text-white/70">{pm2.nuclear_milestones.length > 0 ? `${pm2.nuclear_milestones.length} (☢️)` : 'None'}</td>
                      </tr>

                      <tr className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/3 transition-colors">
                        <td className="px-4 py-2.5 font-mono text-slate-700 dark:text-white/70">{pm1.wars_conflicts.length > 0 ? `${pm1.wars_conflicts.length} (⚔️)` : 'None'}</td>
                        <td className="px-4 py-2.5 text-[9px] uppercase font-extrabold tracking-wider text-slate-400 dark:text-white/20 border-x border-slate-100 dark:border-white/5 font-mono">Military Conflicts</td>
                        <td className="px-4 py-2.5 font-mono text-slate-700 dark:text-white/70">{pm2.wars_conflicts.length > 0 ? `${pm2.wars_conflicts.length} (⚔️)` : 'None'}</td>
                      </tr>

                      {/* Legacy score */}
                      <tr className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/3 transition-colors">
                        <td className={`px-4 py-3 font-mono font-bold text-sm`} style={{ color: color1 }}>{pm1.legacy_score} / 100</td>
                        <td className="px-4 py-3 text-[9px] uppercase font-extrabold tracking-wider text-slate-400 dark:text-white/20 border-x border-slate-100 dark:border-white/5 font-mono">Legacy Rating</td>
                        <td className={`px-4 py-3 font-mono font-bold text-sm`} style={{ color: color2 }}>{pm2.legacy_score} / 100</td>
                      </tr>

                      {/* Bio Details */}
                      <tr className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/3 transition-colors">
                        <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-white/70 text-left sm:text-center"><MapPin size={12} className="inline mr-1" />{pm1.constituency}</td>
                        <td className="px-4 py-2.5 text-[9px] uppercase font-extrabold tracking-wider text-slate-400 dark:text-white/20 border-x border-slate-100 dark:border-white/5 font-mono">Constituency</td>
                        <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-white/70 text-left sm:text-center"><MapPin size={12} className="inline mr-1" />{pm2.constituency}</td>
                      </tr>

                      <tr className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/3 transition-colors">
                        <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-white/70 text-left sm:text-center"><Compass size={12} className="inline mr-1" />{pm1.education}</td>
                        <td className="px-4 py-2.5 text-[9px] uppercase font-extrabold tracking-wider text-slate-400 dark:text-white/20 border-x border-slate-100 dark:border-white/5 font-mono">Education</td>
                        <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-white/70 text-left sm:text-center"><Compass size={12} className="inline mr-1" />{pm2.education}</td>
                      </tr>

                      <tr className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/3 transition-colors">
                        <td className="px-4 py-2.5 text-left text-slate-600 dark:text-white/60 leading-relaxed font-medium">
                          {pm1.ideology.map(i => (
                            <span key={i} className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 mr-1 mb-1 font-semibold">{i}</span>
                          ))}
                        </td>
                        <td className="px-4 py-2.5 text-[9px] uppercase font-extrabold tracking-wider text-slate-400 dark:text-white/20 border-x border-slate-100 dark:border-white/5 font-mono">Ideology</td>
                        <td className="px-4 py-2.5 text-left text-slate-600 dark:text-white/60 leading-relaxed font-medium">
                          {pm2.ideology.map(i => (
                            <span key={i} className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 mr-1 mb-1 font-semibold">{i}</span>
                          ))}
                        </td>
                      </tr>

                      {/* historical Assessment */}
                      <tr className="hover:bg-slate-50/50 dark:hover:bg-white/3 transition-colors">
                        <td className="px-4 py-3 text-left text-slate-600 dark:text-white/60 leading-relaxed font-medium text-[11px]">
                          {pm1.legacy_note}
                        </td>
                        <td className="px-4 py-3 text-[9px] uppercase font-extrabold tracking-wider text-slate-400 dark:text-white/20 border-x border-slate-100 dark:border-white/5 font-mono">Assessment Summary</td>
                        <td className="px-4 py-3 text-left text-slate-600 dark:text-white/60 leading-relaxed font-medium text-[11px]">
                          {pm2.legacy_note}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
