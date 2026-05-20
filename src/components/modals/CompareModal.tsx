import React, { useState } from 'react';
import { X, Globe, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useUIStore } from '../../store';
import { PRIME_MINISTERS } from '../../data/primeMinisters';

export const CompareModal: React.FC = () => {
  const { activeModal, setActiveModal } = useUIStore();
  const isOpen = activeModal === 'compare';

  // Default to Jawaharlal Nehru (1) and Narendra Modi (10) for a stark comparison
  const [pm1Id, setPm1Id] = useState<number>(1);
  const [pm2Id, setPm2Id] = useState<number>(10);

  if (!isOpen) return null;

  const pm1 = PRIME_MINISTERS.find(p => p.id === pm1Id) || PRIME_MINISTERS[0];
  const pm2 = PRIME_MINISTERS.find(p => p.id === pm2Id) || PRIME_MINISTERS[PRIME_MINISTERS.length - 1];

  const partyColors: Record<string, string> = {
    INC: '#138808', BJP: '#FF9933', JP: '#8B4513'
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
    { metric: 'Avg GDP Growth %', [pm1.name]: pm1.avg_gdp_growth, [pm2.name]: pm2.avg_gdp_growth },
    { metric: 'Avg Inflation %', [pm1.name]: pm1.inflation_avg, [pm2.name]: pm2.inflation_avg },
    { metric: 'Legacy Score', [pm1.name]: pm1.legacy_score, [pm2.name]: pm2.legacy_score },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-5xl bg-white dark:bg-[#0a0f1e] border border-slate-200 dark:border-white/12 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-white/5">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <Globe size={20} />
                <h2 className="font-display font-bold text-lg">Compare Prime Ministers</h2>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 border-b border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#070c1a] grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-slate-500 dark:text-white/40 mb-1">Prime Minister 1</label>
                <select 
                  value={pm1Id}
                  onChange={e => setPm1Id(Number(e.target.value))}
                  className="w-full bg-white dark:bg-[#0a0f1e] border border-slate-300 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500"
                >
                  {PRIME_MINISTERS.map(pm => (
                    <option key={pm.id} value={pm.id}>{pm.name} ({pm.start_year}-{pm.end_year === 2026 ? 'Present' : pm.end_year})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase font-bold text-slate-500 dark:text-white/40 mb-1">Prime Minister 2</label>
                <select 
                  value={pm2Id}
                  onChange={e => setPm2Id(Number(e.target.value))}
                  className="w-full bg-white dark:bg-[#0a0f1e] border border-slate-300 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500"
                >
                  {PRIME_MINISTERS.map(pm => (
                    <option key={pm.id} value={pm.id}>{pm.name} ({pm.start_year}-{pm.end_year === 2026 ? 'Present' : pm.end_year})</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {/* Header Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-6">
                {/* PM 1 Stats */}
                <div className="glass p-4 rounded-xl border border-slate-200 dark:border-white/10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full border-2 mb-3 overflow-hidden" style={{ borderColor: color1 }}>
                    <img src={pm1.image_url} alt={pm1.name} className="w-full h-full object-cover object-top" 
                          onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(pm1.name)}&background=1a2540&color=fff&size=100` }} />
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">{pm1.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded font-bold text-white mt-1" style={{ background: color1 }}>{pm1.party_abbr}</span>
                  <div className="text-sm text-slate-500 dark:text-white/50 mt-2">{pm1.start_date} - {pm1.end_date}</div>
                </div>

                {/* PM 2 Stats */}
                <div className="glass p-4 rounded-xl border border-slate-200 dark:border-white/10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full border-2 mb-3 overflow-hidden" style={{ borderColor: color2 }}>
                    <img src={pm2.image_url} alt={pm2.name} className="w-full h-full object-cover object-top" 
                          onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(pm2.name)}&background=1a2540&color=fff&size=100` }} />
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">{pm2.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded font-bold text-white mt-1" style={{ background: color2 }}>{pm2.party_abbr}</span>
                  <div className="text-sm text-slate-500 dark:text-white/50 mt-2">{pm2.start_date} - {pm2.end_date}</div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart2 size={16} className="text-slate-400" />
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Legacy & Score Breakdown</h4>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="currentColor" className="text-slate-200 dark:text-white/10" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor', fontSize: window.innerWidth < 640 ? 10 : 12 }} className="text-slate-500 dark:text-white/50" />
                      <Tooltip contentStyle={{ background: 'var(--im-bg-2)', border: '1px solid var(--im-border)', borderRadius: 8 }} />
                      <Radar name={pm1.name} dataKey="A" stroke={color1} fill={color1} fillOpacity={0.4} />
                      <Radar name={pm2.name} dataKey="B" stroke={color2} fill={color2} fillOpacity={0.4} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart2 size={16} className="text-slate-400" />
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Key Economic Indicators</h4>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={barData} layout="vertical" margin={{ left: window.innerWidth < 640 ? 5 : 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" horizontal={false} />
                      <XAxis type="number" tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" />
                      <YAxis type="category" dataKey="metric" tick={{ fill: 'currentColor', fontSize: window.innerWidth < 640 ? 10 : 12 }} className="text-slate-500 dark:text-white/60" width={window.innerWidth < 640 ? 95 : 120} />
                      <Tooltip contentStyle={{ background: 'var(--im-bg-2)', border: '1px solid var(--im-border)', borderRadius: 8 }} />
                      <Bar dataKey={pm1.name} fill={color1} radius={[0, 4, 4, 0]} />
                      <Bar dataKey={pm2.name} fill={color2} radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center gap-6">
                 <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-sm" style={{ background: color1 }}></div>
                   <span className="text-xs text-slate-600 dark:text-white/60">{pm1.name}</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-sm" style={{ background: color2 }}></div>
                   <span className="text-xs text-slate-600 dark:text-white/60">{pm2.name}</span>
                 </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
