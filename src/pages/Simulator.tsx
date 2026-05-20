import { useState, useMemo } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { Sliders, Sparkles, TrendingUp, Zap, GraduationCap, Wifi } from 'lucide-react';

export default function SimulatorPage() {
  // Simulator parameters (sliders)
  const [infraCapex, setInfraCapex] = useState<number>(3.5); // % of GDP
  const [solarGw, setSolarGw] = useState<number>(300); // Solar GW target
  const [eduSpend, setEduSpend] = useState<number>(3.1); // % of GDP
  const [digitalPush, setDigitalPush] = useState<number>(3); // Scale 1 to 5

  // Projections calculations (years 2026 to 2047)
  const chartData = useMemo(() => {
    const data = [];
    const baseGdpGrowth = 0.065; // Baseline 6.5% average GDP growth
    
    // Growth multiplier determined by sliders
    // Higher capex boosts GDP growth (+0.1% growth per 0.5% capex above 3.5%)
    // Digital push boosts GDP growth (+0.15% per level above 3)
    const simulatedGdpGrowth = baseGdpGrowth 
      + (infraCapex - 3.5) * 0.002
      + (digitalPush - 3) * 0.0015;

    let baseGdp = 4000; // $4 Trillion baseline in 2026
    let simGdp = 4000;

    let baseLiteracy = 78;
    let simLiteracy = 78;

    let basePower = 180;
    let simPower = 180;

    for (let year = 2026; year <= 2047; year += 3) {
      if (year > 2026) {
        const yearsDiff = 3;
        // GDP
        baseGdp = baseGdp * Math.pow(1 + baseGdpGrowth, yearsDiff);
        simGdp = simGdp * Math.pow(1 + simulatedGdpGrowth, yearsDiff);

        // Literacy
        // Education spending boosts literacy growth (limit at 99%)
        const baseLitInc = 1.2 * yearsDiff;
        const simLitInc = (eduSpend / 3.1) * 1.5 * yearsDiff;
        baseLiteracy = Math.min(99, baseLiteracy + baseLitInc);
        simLiteracy = Math.min(99, simLiteracy + simLitInc);

        // Power
        // Renewable targets increase clean power GW capacity
        const basePowerInc = 25 * yearsDiff;
        const simPowerInc = (solarGw / 300) * 35 * yearsDiff;
        basePower = basePower + basePowerInc;
        simPower = simPower + simPowerInc;
      }

      data.push({
        year,
        'Base GDP ($B)': Math.round(baseGdp),
        'Simulated GDP ($B)': Math.round(simGdp),
        'Base Literacy %': parseFloat(baseLiteracy.toFixed(1)),
        'Simulated Literacy %': parseFloat(simLiteracy.toFixed(1)),
        'Base Clean Power (GW)': Math.round(basePower),
        'Simulated Clean Power (GW)': Math.round(simPower),
      });
    }

    return data;
  }, [infraCapex, solarGw, eduSpend, digitalPush]);

  // Outcomes evaluation based on settings
  const evaluation = useMemo(() => {
    const finalGdp = chartData[chartData.length - 1]['Simulated GDP ($B)'];
    const finalLit = chartData[chartData.length - 1]['Simulated Literacy %'];
    const finalPower = chartData[chartData.length - 1]['Simulated Clean Power (GW)'];

    let status = "Middle-Income Path";
    let statusColor = "text-sky-500 bg-sky-500/10 border-sky-500/20";
    let desc = "India continues to grow steadily, remaining a major global player but faces challenges transitioning fully to a developed economy due to bottlenecked investments.";

    if (finalGdp >= 30000 && finalLit >= 95 && finalPower >= 700) {
      status = "Viksit Bharat (Superpower)";
      statusColor = "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
      desc = "Incredible! High capex, strong social infrastructure, digital leadership, and renewable energy propel India into a fully developed superpower before 2047.";
    } else if (finalGdp >= 25000 && finalPower >= 600) {
      status = "Industrial Giant";
      statusColor = "text-amber-500 bg-amber-500/10 border-amber-500/20";
      desc = "Strong physical infrastructure and clean energy make India the manufacturing hub of the world. However, literacy and skill levels limit the growth of high-value service sectors.";
    } else if (finalLit >= 92 && finalGdp >= 22000) {
      status = "Knowledge & Service Hub";
      statusColor = "text-purple-500 bg-purple-500/10 border-purple-500/20";
      desc = "Heavy investments in education and digital public goods create an ultra-skilled workforce. Services boom, but grid limitations and energy bottlenecks slow manufacturing.";
    } else if (finalGdp < 16000) {
      status = "Stagnated Trap";
      statusColor = "text-red-500 bg-red-500/10 border-red-500/20";
      desc = "Low infrastructure capex and education spending leads to low productivity growth, locking the economy into a structural slowdown.";
    }

    return {
      finalGdp,
      finalLit,
      finalPower,
      status,
      statusColor,
      desc
    };
  }, [chartData]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="glass rounded-2xl p-6 border-l-4 border-sky-400 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/ashoka_stumbha.png" alt="Ashoka Stumbha Logo" className="h-14 w-auto object-contain flex-shrink-0 dark:invert" />
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-1">Vision 2047 Policy Simulator</h1>
            <p className="text-slate-500 dark:text-white/50 text-sm">Tune national policy levers and see how your decisions shape India's economic, energy, and social trajectories up to the centenary.</p>
          </div>
        </div>
        <div className="p-3 bg-sky-400/10 rounded-xl text-sky-400 flex-shrink-0">
          <Sliders size={28} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sliders Panel */}
        <div className="glass rounded-2xl p-6 border border-slate-200 dark:border-white/10 space-y-6 lg:col-span-1">
          <div className="flex items-center gap-2 mb-2 pb-3 border-b border-slate-200 dark:border-white/5">
            <Sliders size={18} className="text-sky-400" />
            <h2 className="font-display font-semibold text-slate-900 dark:text-white text-sm">Policy Control Levers</h2>
          </div>

          {/* Slider 1: Infra Capex */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700 dark:text-white/70 flex items-center gap-1.5">
                <TrendingUp size={12} className="text-sky-400" /> Infrastructure Budget
              </span>
              <span className="font-mono text-sky-400 font-bold">{infraCapex}% of GDP</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={infraCapex}
              onChange={e => setInfraCapex(parseFloat(e.target.value))}
              className="w-full h-1 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-sky-400"
            />
            <p className="text-xs text-slate-500 dark:text-white/30">Determines high-speed rail, expressways, ports, and industrial corridors. Boosts nominal GDP multiplier.</p>
          </div>

          {/* Slider 2: Solar Target */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700 dark:text-white/70 flex items-center gap-1.5">
                <Zap size={12} className="text-amber-400" /> Renewable Subsidies
              </span>
              <span className="font-mono text-amber-400 font-bold">{solarGw} GW Target</span>
            </div>
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={solarGw}
              onChange={e => setSolarGw(parseInt(e.target.value))}
              className="w-full h-1 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <p className="text-xs text-slate-500 dark:text-white/30">Grants and solar grid subsidies to fast-track non-fossil capacity and hydrogen parks.</p>
          </div>

          {/* Slider 3: Education */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700 dark:text-white/70 flex items-center gap-1.5">
                <GraduationCap size={12} className="text-emerald-400" /> Education Spend
              </span>
              <span className="font-mono text-emerald-400 font-bold">{eduSpend}% of GDP</span>
            </div>
            <input
              type="range"
              min="1.5"
              max="8"
              step="0.1"
              value={eduSpend}
              onChange={e => setEduSpend(parseFloat(e.target.value))}
              className="w-full h-1 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <p className="text-xs text-slate-500 dark:text-white/30">Public funding for school infrastructure, digital skill centers, and higher research grants. Accelerates literacy rate.</p>
          </div>

          {/* Slider 4: Digital Push */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700 dark:text-white/70 flex items-center gap-1.5">
                <Wifi size={12} className="text-purple-400" /> Digital Stack Push
              </span>
              <span className="font-mono text-purple-400 font-bold">Level {digitalPush} / 5</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={digitalPush}
              onChange={e => setDigitalPush(parseInt(e.target.value))}
              className="w-full h-1 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-400"
            />
            <p className="text-xs text-slate-500 dark:text-white/30">Expansion of UPI, ONDC, AI governance stacks, and rural broadband links. Enhances transaction speeds and efficiency.</p>
          </div>
        </div>

        {/* Results & Charts Panel */}
        <div className="space-y-6 lg:col-span-2">
          {/* Projections Assessment Card */}
          <div className="glass rounded-2xl p-6 border border-slate-200 dark:border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs uppercase font-bold text-slate-400">
                <Sparkles size={12} className="text-sky-400" /> Projected Scenario Outcomes
              </div>
              <div className={`inline-block border px-3 py-1 rounded-lg text-xs font-bold ${evaluation.statusColor}`}>
                {evaluation.status}
              </div>
              <p className="text-xs text-slate-600 dark:text-white/60 leading-relaxed">
                {evaluation.desc}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="glass p-3 rounded-xl border border-slate-100 dark:border-white/5 flex flex-col justify-between">
                <span className="text-xs uppercase text-slate-400 font-bold">GDP 2047</span>
                <span className="text-base font-bold font-mono text-sky-400">${(evaluation.finalGdp / 1000).toFixed(1)}T</span>
              </div>
              <div className="glass p-3 rounded-xl border border-slate-100 dark:border-white/5 flex flex-col justify-between">
                <span className="text-xs uppercase text-slate-400 font-bold">Literacy 2047</span>
                <span className="text-base font-bold font-mono text-emerald-400">{evaluation.finalLit}%</span>
              </div>
              <div className="glass p-3 rounded-xl border border-slate-100 dark:border-white/5 flex flex-col justify-between">
                <span className="text-xs uppercase text-slate-400 font-bold">Clean GW</span>
                <span className="text-base font-bold font-mono text-amber-400">{evaluation.finalPower} GW</span>
              </div>
            </div>
          </div>

          {/* Line Chart Projections */}
          <div className="glass rounded-2xl p-6 border border-slate-200 dark:border-white/10 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-display font-semibold text-slate-900 dark:text-white text-sm">Simulated GDP Growth Trajectory (Nominal USD)</h2>
              <span className="text-xs font-mono text-slate-400 dark:text-white/20">Compared to baseline 6.5% trajectory</span>
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" />
                <XAxis dataKey="year" tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" />
                <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500 dark:text-white/40" unit="B" />
                <Tooltip contentStyle={{ background: 'var(--im-bg-2)', border: '1px solid var(--im-border)', borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="Base GDP ($B)" stroke="#94A3B8" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                <Line type="monotone" dataKey="Simulated GDP ($B)" stroke="#38BDF8" strokeWidth={2.5} activeDot={{ r: 6 }} dot={true} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Secondary: Literacy */}
             <div className="glass rounded-2xl p-4 border border-slate-200 dark:border-white/10 space-y-2">
                <h3 className="text-xs font-semibold text-slate-800 dark:text-white/80">Literacy Progress Rate %</h3>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={chartData}>
                    <XAxis dataKey="year" tick={{ fill: 'currentColor', fontSize: 9 }} className="text-slate-500 dark:text-white/30" />
                    <YAxis tick={{ fill: 'currentColor', fontSize: 9 }} className="text-slate-500 dark:text-white/30" domain={[70, 100]} />
                    <Line type="monotone" dataKey="Base Literacy %" stroke="#94A3B8" strokeWidth={1} dot={false} />
                    <Line type="monotone" dataKey="Simulated Literacy %" stroke="#34D399" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
             </div>

             {/* Secondary: Power */}
             <div className="glass rounded-2xl p-4 border border-slate-200 dark:border-white/10 space-y-2">
                <h3 className="text-xs font-semibold text-slate-800 dark:text-white/80">Clean Energy Capacity (GW)</h3>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={chartData}>
                    <XAxis dataKey="year" tick={{ fill: 'currentColor', fontSize: 9 }} className="text-slate-500 dark:text-white/30" />
                    <YAxis tick={{ fill: 'currentColor', fontSize: 9 }} className="text-slate-500 dark:text-white/30" />
                    <Line type="monotone" dataKey="Base Clean Power (GW)" stroke="#94A3B8" strokeWidth={1} dot={false} />
                    <Line type="monotone" dataKey="Simulated Clean Power (GW)" stroke="#FBBF24" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
