import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Database, Layers, BarChart3 } from 'lucide-react';
import { MilestonesAccordion } from '../components/ui/MilestonesAccordion';
import { useTimelineStore } from '../store';
import { PRIME_MINISTERS } from '../data/primeMinisters';

interface PlaceholderProps {
  id: string;
  title: string;
  icon: string;
  description: string;
  color?: string;
  stats?: { label: string; value: string }[];
}

const UNSPLASH_IMAGES: Record<string, string> = {
  rural: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=1200&auto=format&fit=crop",
  urban: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?q=80&w=1200&auto=format&fit=crop",
  agriculture: "https://images.unsplash.com/photo-1592997572594-34be01bc36c7?q=80&w=1200&auto=format&fit=crop",
  industry: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=1200&auto=format&fit=crop",
  steel: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1200&auto=format&fit=crop",
  transport: "https://images.unsplash.com/photo-1541417904950-b855846fe074?q=80&w=1200&auto=format&fit=crop",
  energy: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
  education: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
  healthcare: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop",
  defense: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1200&auto=format&fit=crop",
  environment: "https://images.unsplash.com/photo-1581888227599-779811939961?q=80&w=1200&auto=format&fit=crop",
  demographics: "https://images.pexels.com/photos/1446161/pexels-photo-1446161.jpeg?auto=compress&cs=tinysrgb&w=800",
  decades: "https://images.unsplash.com/photo-1473163928189-364b2c4e1135?q=80&w=1200&auto=format&fit=crop"
};

const renderCustomInfographic = (id: string) => {
  switch (id) {
    case 'rural':
      return (
        <div className="glass p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
          <h3 className="font-semibold text-xs text-slate-800 dark:text-white/80">Sanitation & Water Access Milestone</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-white/5 rounded-xl">
              <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 flex items-center justify-center font-bold text-xs font-mono">100%</div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">11.7 Crore Toilets Built</div>
                <div className="text-xs text-slate-500 dark:text-white/40">Clean India Mission (Swachh Bharat)</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-white/5 rounded-xl">
              <div className="w-12 h-12 rounded-full border-4 border-blue-500/20 border-t-blue-500 flex items-center justify-center font-bold text-xs font-mono">82%</div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">15.2 Crore Tap Connections</div>
                <div className="text-xs text-slate-500 dark:text-white/40">Jal Jeevan Mission (Rural Water Grid)</div>
              </div>
            </div>
          </div>
        </div>
      );
    case 'energy':
      return (
        <div className="glass p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
          <h3 className="font-semibold text-xs text-slate-800 dark:text-white/80">Renewable Energy Capacity Split</h3>
          <div className="flex items-center gap-6 p-4 bg-slate-50 dark:bg-white/5 rounded-xl">
             <div className="flex-1 space-y-2">
                <div className="flex justify-between text-sm font-mono">
                  <span className="text-slate-500 dark:text-white/60">Solar & Wind Power</span>
                  <span className="font-bold text-amber-400">220 GW</span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400" style={{ width: '46%' }}></div>
                </div>
                <div className="flex justify-between text-sm font-mono">
                  <span className="text-slate-500 dark:text-white/60">Thermal & Fossil Power</span>
                  <span className="font-bold text-slate-400">265 GW</span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-400" style={{ width: '54%' }}></div>
                </div>
             </div>
          </div>
        </div>
      );
    case 'transport':
      return (
        <div className="glass p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
          <h3 className="font-semibold text-xs text-slate-800 dark:text-white/80">National Infrastructure Construction Pace</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-xl text-center space-y-1 border border-slate-100 dark:border-white/5">
              <span className="text-2xl font-bold font-mono text-saffron">37 km / day</span>
              <div className="text-xs uppercase font-bold text-slate-500 dark:text-white/40">Highway Construction Speed</div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-xl text-center space-y-1 border border-slate-100 dark:border-white/5">
              <span className="text-2xl font-bold font-mono text-emerald-400">100%</span>
              <div className="text-xs uppercase font-bold text-slate-500 dark:text-white/40">Broad Gauge Railway Electrified</div>
            </div>
          </div>
        </div>
      );
    case 'environment':
      return (
        <div className="glass p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
          <h3 className="font-semibold text-xs text-slate-800 dark:text-white/80">Project Tiger Wild Population Growth</h3>
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
             <div className="space-y-1">
                <span className="text-sm font-bold text-slate-900 dark:text-white">3,682 Wild Tigers</span>
                <p className="text-xs text-slate-500 dark:text-white/40">Home to over 75% of the world's wild tiger population, doubling counts since 2006.</p>
             </div>
             <span className="text-3xl">🐅</span>
          </div>
        </div>
      );
    default:
      return null;
  }
};

const generateSimpleMockTimeseries = (baseValue: number, currentYear: number, pmEraMode: boolean, activePMId: number | null) => {
  let startYear = 1947;
  let endYear = 2026;
  
  if (pmEraMode && activePMId) {
    const pm = PRIME_MINISTERS.find(p => p.id === activePMId);
    if (pm) {
      startYear = pm.start_year;
      endYear = pm.end_year;
    }
  }

  const data = [];
  for (let year = startYear; year <= endYear; year++) {
    const progress = Math.max(0.01, (year - 1947) / (2026 - 1947));
    const baseCurve = baseValue * Math.pow(progress, 2);
    
    const isFuture = !pmEraMode && year > currentYear;
    
    data.push({ 
      year, 
      volume: isFuture ? null : Math.round(baseCurve * (0.8 + Math.random() * 0.4)),
      efficiency: isFuture ? null : Math.round(baseCurve * (0.5 + Math.random() * 0.2)),
    });
  }
  return data;
};

const GenericDashboard: React.FC<PlaceholderProps> = ({ id, title, icon, description, color = '#FF9933', stats }) => {
  const { currentYear, pmEraMode, activePMId } = useTimelineStore();
  
  const chartData = useMemo(() => generateSimpleMockTimeseries(1000, currentYear, pmEraMode, activePMId), [currentYear, pmEraMode, activePMId]);
  
  const barData = useMemo(() => {
    return stats?.map((s, i) => ({
      name: s.label.split(' ')[0],
      value: 20 + i * 15 + Math.random() * 20
    })) || [];
  }, [stats]);

  const imageUrl = UNSPLASH_IMAGES[id] || UNSPLASH_IMAGES.rural;

  return (
    <div className="space-y-6 pb-20">
      {/* Immersive Header Card with Banner Image */}
      <div className="glass rounded-2xl overflow-hidden shadow-md flex flex-col md:flex-row border border-slate-200 dark:border-white/12">
        <div className="w-full md:w-1/3 h-48 md:h-auto min-h-[160px] relative overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#ffffff]/10 dark:to-[#0a0f1e]/15"></div>
        </div>
        <div className="flex-1 p-6 flex flex-row items-center justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{icon}</span>
              <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{title}</h1>
              {pmEraMode && (
                <span className="px-2 py-0.5 text-xs font-mono rounded bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
                  PM ERA FILTER
                </span>
              )}
            </div>
            <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed max-w-2xl">{description}</p>
          </div>
          <img src="/ashoka_stumbha.png" alt="Ashoka Stumbha" className="h-16 object-contain flex-shrink-0 opacity-80 dark:invert" />
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ label, value }) => (
            <motion.div key={label} className="glass rounded-xl p-4 hover-lift"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                <div className="text-xs text-slate-500 dark:text-white/50 uppercase tracking-wider font-bold">{label}</div>
              </div>
              <div className="font-mono font-bold text-xl text-slate-900 dark:text-white">{value}</div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Sector-Specific Custom Infographic Panel */}
      {renderCustomInfographic(id)}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Simple Area Chart */}
        <div className="glass rounded-2xl p-5 lg:col-span-2 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-slate-800 dark:text-white text-sm flex items-center gap-2">
              <Layers size={16} style={{ color }} /> Historical Trajectory
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`colorVolume-${id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" vertical={false} />
              <XAxis dataKey="year" tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ background: 'var(--im-bg-2)', border: `1px solid ${color}40`, borderRadius: 8, color: 'var(--im-text)' }}
                itemStyle={{ fontSize: 12, fontFamily: 'monospace' }}
              />
              <Area type="monotone" dataKey="volume" name="Core Volume" stroke={color} strokeWidth={2.5} fill={`url(#colorVolume-${id})`} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Simple Bar Chart */}
        <div className="glass rounded-2xl p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-slate-800 dark:text-white text-sm flex items-center gap-2">
              <BarChart3 size={16} style={{ color }} /> Sector Composition
            </h2>
          </div>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" horizontal={false} />
                <XAxis type="number" tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-600 dark:text-white/60" axisLine={false} tickLine={false} width={80} />
                <Tooltip 
                  cursor={{ fill: 'rgba(150,150,150,0.1)' }}
                  contentStyle={{ background: 'var(--im-bg-2)', border: '1px solid var(--im-border)', borderRadius: 8, color: 'var(--im-text)' }}
                />
                <Bar dataKey="value" fill={color} radius={[0, 4, 4, 0]}>
                  {barData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={color} opacity={0.6 + (index * 0.1)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Clean Data Ledger */}
        <div className="glass rounded-2xl lg:col-span-3 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-white/5">
            <h2 className="font-display font-semibold text-slate-800 dark:text-white text-sm flex items-center gap-2">
              <Database size={16} className="text-slate-400" /> Data Ledger
            </h2>
            <span className="text-xs text-slate-500 dark:text-white/40 font-mono">{chartData.length} Records</span>
          </div>
          <div className="overflow-x-auto max-h-[250px] overflow-y-auto custom-scrollbar">
            <table className="w-full text-left text-sm font-mono">
              <thead className="sticky top-0 bg-slate-100 dark:bg-[#0a0f1e]/90 backdrop-blur-md text-slate-600 dark:text-white/40 border-b border-slate-200 dark:border-white/10 z-10">
                <tr>
                  <th className="px-5 py-3 font-medium">Fiscal Year</th>
                  <th className="px-5 py-3 font-medium text-right">Core Volume</th>
                  <th className="px-5 py-3 font-medium text-right">Efficiency Index</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {[...chartData].reverse().map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-white/70 transition-colors">
                    <td className="px-5 py-2.5 font-bold text-slate-900 dark:text-white/90">{row.year}</td>
                    <td className="px-5 py-2.5 text-right">{row.volume !== null ? row.volume.toLocaleString() : '-'}</td>
                    <td className="px-5 py-2.5 text-right">{row.efficiency !== null ? row.efficiency.toLocaleString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <MilestonesAccordion category={id} />
    </div>
  );
};

export const RuralPage = () => <GenericDashboard id="rural" title="Rural India" icon="🌾" color="#4ADE80" description="Village electrification, PMGSY roads, drinking water, MNREGA, rural poverty, digital connectivity across 6.4 lakh villages"
  stats={[ { label: 'Villages Electrified', value: '99.9%' }, { label: 'Rural Internet %', value: '40%' }, { label: 'ODF Villages', value: '6.2 L' }, { label: 'MNREGA Person-Days', value: '2.5B' } ]} />;

export const UrbanPage = () => <GenericDashboard id="urban" title="Urban India" icon="🏙️" color="#60A5FA" description="Urbanization from 17% (1947) to 38.5% (2026). Smart Cities, Metro networks, startup hubs, AQI trends across 20+ major cities"
  stats={[ { label: 'Urban Population', value: '555M' }, { label: 'Metro Network', value: '1,020 km+' }, { label: 'Smart Cities', value: '100' }, { label: 'Internet Penetration', value: '78%' } ]} />;

export const AgriculturePage = () => <GenericDashboard id="agriculture" title="Agriculture & Food" icon="🌱" color="#A3E635" description="From ship-to-mouth (1960s) to food surplus (2026). Green Revolution, White Revolution, crop yields, MSP trends, export volumes"
  stats={[ { label: 'Foodgrain Prod', value: '345M Tonnes' }, { label: 'Milk Production', value: '255M Tonnes' }, { label: 'Agri Exports', value: '$55B' }, { label: 'Kisan Credit Cards', value: '75M' } ]} />;

export const IndustryPage = () => <GenericDashboard id="industry" title="Industry & Manufacturing" icon="🏭" color="#F87171" description="Make in India, PLI schemes, automobile manufacturing, electronics assembly, pharma exports, industrial index"
  stats={[ { label: 'Manufacturing GDP', value: '17.8%' }, { label: 'Auto Market Rank', value: '3rd Global' }, { label: 'FDI in Mfg', value: '$24B' }, { label: 'Mobile Mfg', value: '380M Units' } ]} />;

export const SteelPage = () => <GenericDashboard id="steel" title="Steel & Infrastructure" icon="🏗️" color="#94A3B8" description="Crude steel production capacity, cement output, massive capital expenditure pushes over 7 decades"
  stats={[ { label: 'Steel Prod', value: '145M Tonnes' }, { label: 'Global Rank', value: '2nd' }, { label: 'Cement Prod', value: '425M Tonnes' }, { label: 'Capex (FY26)', value: '₹11.1 Lakh Cr' } ]} />;

export const TransportPage = () => <GenericDashboard id="transport" title="Transport Networks" icon="🚄" color="#FBBF24" description="Railways electrification, Vande Bharat, National Highways pace (37 km/day), dedicated freight corridors, aviation growth"
  stats={[ { label: 'Rail Electrified', value: '100%' }, { label: 'Highways Pace', value: '37 km/day' }, { label: 'Airports Active', value: '155' }, { label: 'Port Capacity', value: '2750 MTPA' } ]} />;

export const EnergyPage = () => <GenericDashboard id="energy" title="Energy & Power" icon="⚡" color="#FACC15" description="Coal dependence vs Renewable surge. 500GW non-fossil target by 2030, solar capacity, nuclear output, per capita consumption"
  stats={[ { label: 'Total Capacity', value: '485 GW' }, { label: 'Renewables', value: '220 GW' }, { label: 'Solar Capacity', value: '100 GW' }, { label: 'Access to Power', value: '100%' } ]} />;

export const EducationPage = () => <GenericDashboard id="education" title="Education & Skills" icon="📚" color="#818CF8" description="Literacy rate (18% to 79.5%), Gross Enrolment Ratio, IITs/IIMs expansion, RTE Act impact, skill development"
  stats={[ { label: 'Literacy Rate', value: '79.5%' }, { label: 'Universities', value: '1,250' }, { label: 'STEM Grads', value: '2.9M/yr' }, { label: 'Female Literacy', value: '72.5%' } ]} />;

export const HealthcarePage = () => <GenericDashboard id="healthcare" title="Healthcare & HDI" icon="🏥" color="#F472B6" description="Life expectancy (32 to 71.2 years), infant mortality rate drops, Ayushman Bharat coverage, generic medicine exports, COVID vaccination drive"
  stats={[ { label: 'Life Expectancy', value: '71.2 yrs' }, { label: 'IMR', value: '25/1000' }, { label: 'Ayushman Cards', value: '350M+' }, { label: 'Medical Colleges', value: '730' } ]} />;

export const DefensePage = () => <GenericDashboard id="defense" title="Defense & Military" icon="🛡️" color="#475569" description="Defense budget, indigenous manufacturing (Tejas, INS Vikrant), arms imports vs exports, nuclear triad"
  stats={[ { label: 'Defense Budget', value: '$82B' }, { label: 'Global Rank', value: '4th Strongest' }, { label: 'Defense Exports', value: '₹22,000 Cr' }, { label: 'Active Personnel', value: '1.45M' } ]} />;

export const EnvironmentPage = () => <GenericDashboard id="environment" title="Environment & Climate" icon="🌲" color="#10B981" description="Forest cover growth, carbon emission intensity, tiger population, EV adoption, clean cooking fuel (Ujjwala)"
  stats={[ { label: 'Forest Cover', value: '24.8%' }, { label: 'Tiger Pop.', value: '3,682' }, { label: 'EV Sales (2025)', value: '2.1M' }, { label: 'Emission Drop', value: '-35% vs 2005' } ]} />;

export const DemographicsPage = () => <GenericDashboard id="demographics" title="Demographics" icon="👥" color="#E879F9" description="World's most populous nation (1.45B). Demographic dividend, median age 28.2, fertility rates, labor force participation"
  stats={[ { label: 'Total Population', value: '1.45B' }, { label: 'Median Age', value: '28.2 yrs' }, { label: 'Working Age', value: '68%' }, { label: 'Fertility Rate', value: '2.0' } ]} />;

export const DecadesPage = () => <GenericDashboard id="decades" title="Decade Comparisons" icon="⏳" color="#D946EF" description="Compare key macro-economic and social indicators across the 1960s, 80s, 00s, and 20s"
  stats={[ { label: '1960s Growth', value: '4.1%' }, { label: '1980s Growth', value: '5.6%' }, { label: '2000s Growth', value: '6.9%' }, { label: '2020s Growth', value: '7.1%' } ]} />;
