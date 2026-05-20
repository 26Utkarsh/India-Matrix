import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Layers, Activity, Globe, Eye, EyeOff, Sun, Moon } from 'lucide-react';
import { useUIStore, useTimelineStore } from '../../store';
import { PRIME_MINISTERS } from '../../data/primeMinisters';

export const Topbar: React.FC = () => {
  const navigate = useNavigate();
  const { setSidebarOpen, activeModal, setActiveModal, theme, toggleTheme } = useUIStore();
  const { currentYear, setYear, activePMId, setActivePM, pmEraMode, setPmEraMode } = useTimelineStore();

  const currentPM = PRIME_MINISTERS.find(pm => 
    pm.start_year <= currentYear && (pm.end_year >= currentYear || pm.end_year === 2026)
  ) || PRIME_MINISTERS[PRIME_MINISTERS.length - 1];

  const partyColors: Record<string, string> = {
    INC: '#138808', BJP: '#FF9933', JP: '#8B4513'
  };
  const pmColor = partyColors[currentPM.party_abbr] || '#FF9933';

  return (
    <header className="fixed top-0 left-0 right-0 h-[60px] z-30 glass border-b border-slate-200 dark:border-white/5 flex items-center lg:pl-[240px]">
      <div className="flex items-center gap-3 px-4 w-full">
        {/* Menu toggle (mobile) */}
        <button 
          onClick={() => setSidebarOpen(true)} 
          className="lg:hidden text-slate-500 hover:text-slate-900 dark:text-white/60 dark:hover:text-white p-1"
        >
          <Menu size={20} />
        </button>
        <img src="/india_matrix_logo.png?v=4" alt="India Matrix Logo" className="h-7 w-auto object-cover rounded-md lg:hidden" />

        {/* Current PM Badge */}
        <div 
          className={`flex items-center gap-1.5 xs:gap-2 glass rounded-lg px-2 py-1 xs:px-3 xs:py-1.5 transition-all ${pmEraMode ? 'border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : ''}`}
          style={{ borderColor: pmEraMode ? '#A855F7' : `${pmColor}30` }}
        >
          <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full animate-pulse shrink-0" style={{ background: pmColor }} />
          <span className="hidden xs:inline text-xs xs:text-sm text-slate-500 dark:text-white/60">Era:</span>
          <select 
            className="bg-transparent text-xs xs:text-sm font-semibold text-slate-900 dark:text-white outline-none cursor-pointer max-w-[90px] xs:max-w-none"
            value={activePMId || ''}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '') {
                setActivePM(null);
                setPmEraMode(false);
              } else {
                const pm = PRIME_MINISTERS.find(p => p.id === parseInt(val));
                if (pm) {
                  setActivePM(pm.id);
                  setPmEraMode(true);
                  // Snap timeline to middle of their tenure
                  const midYear = Math.floor((pm.start_year + (pm.end_year === 2026 ? 2024 : pm.end_year)) / 2);
                  setYear(midYear);
                  navigate('/prime-ministers');
                }
              }
            }}
          >
            <option value="" className="bg-white text-slate-900 dark:bg-[#070c1a] dark:text-white">Live Timeline</option>
            {PRIME_MINISTERS.map(pm => {
              const lastName = pm.name.split('(')[0].trim().split(' ').slice(-1)[0];
              const displayLabel = `${lastName} (${pm.start_year}-${pm.end_year === 2026 ? 'Pres' : String(pm.end_year).slice(-2)})`;
              return (
                <option key={pm.id} value={pm.id} className="bg-white text-slate-900 dark:bg-[#070c1a] dark:text-white">
                  {displayLabel}
                </option>
              );
            })}
          </select>
          {!pmEraMode && (
            <span 
              className="hidden xs:inline text-[10px] xs:text-xs px-1 xs:px-1.5 py-0.5 rounded font-mono font-bold shrink-0"
              style={{ background: `${pmColor}20`, color: pmColor }}
            >
              {currentPM.party_abbr}
            </span>
          )}
        </div>

        {/* Year display */}
        <div className="flex items-center gap-2 glass rounded-lg px-3 py-1.5">
          <Activity size={12} className="text-saffron" />
          <span className="font-mono font-bold text-saffron text-sm">{currentYear}</span>
        </div>

        <div className="flex-1" />

        {/* Ticker — milestone facts */}
        <div className="hidden md:block flex-1 max-w-sm overflow-hidden">
          <div className="ticker-wrap">
            <div className="ticker-content text-sm text-slate-500 dark:text-white/30 font-mono">
              🇮🇳 GDP: $4.27T &nbsp;&nbsp;•&nbsp;&nbsp; Population: 1.44B &nbsp;&nbsp;•&nbsp;&nbsp; Literacy: 80% &nbsp;&nbsp;•&nbsp;&nbsp; Solar Capacity: 100GW+ &nbsp;&nbsp;•&nbsp;&nbsp; UPI: 100B+ txns &nbsp;&nbsp;•&nbsp;&nbsp; Chandrayaan-3: Lunar South Pole &nbsp;&nbsp;•&nbsp;&nbsp; Railway: 68,700 km &nbsp;&nbsp;•&nbsp;&nbsp; Highways: 1.52 Lakh km &nbsp;&nbsp;•&nbsp;&nbsp; Unicorns: 100+ &nbsp;&nbsp;•&nbsp;&nbsp; ISRO missions: 50+ &nbsp;&nbsp;•&nbsp;&nbsp;
              🇮🇳 GDP: $4.27T &nbsp;&nbsp;•&nbsp;&nbsp; Population: 1.44B &nbsp;&nbsp;•&nbsp;&nbsp; Literacy: 80% &nbsp;&nbsp;•&nbsp;&nbsp; Solar Capacity: 100GW+ &nbsp;&nbsp;•&nbsp;&nbsp;
            </div>
          </div>
        </div>

        {/* Toggle buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveModal(activeModal === 'political' ? null : 'political')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium border transition-all
              ${activeModal === 'political'
                ? 'bg-purple-100 border-purple-200 text-purple-700 dark:bg-purple-500/20 dark:border-purple-500/40 dark:text-purple-300' 
                : 'glass border-slate-200 text-slate-500 hover:text-slate-800 dark:border-white/10 dark:text-white/50 dark:hover:text-white/80'}`}
          >
            <Layers size={12} />
            <span className="hidden sm:inline">Political</span>
          </button>
          <button
            onClick={() => setActiveModal(activeModal === 'events' ? null : 'events')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium border transition-all
              ${activeModal === 'events'
                ? 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-saffron/20 dark:border-saffron/40 dark:text-saffron' 
                : 'glass border-slate-200 text-slate-500 hover:text-slate-800 dark:border-white/10 dark:text-white/50 dark:hover:text-white/80'}`}
          >
            {activeModal === 'events' ? <Eye size={12} /> : <EyeOff size={12} />}
            <span className="hidden sm:inline">Events</span>
          </button>
          <button 
            onClick={() => setActiveModal(activeModal === 'compare' ? null : 'compare')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium border transition-all
              ${activeModal === 'compare'
                ? 'bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-500/20 dark:border-blue-500/40 dark:text-blue-300' 
                : 'glass border-slate-200 text-slate-500 hover:text-slate-800 dark:border-white/10 dark:text-white/50 dark:hover:text-white/80'}`}
          >
            <Globe size={12} />
            <span className="hidden sm:inline">Compare</span>
          </button>
          <button 
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium glass border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-800 dark:text-white/50 dark:hover:text-white/80 transition-all"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </div>
    </header>
  );
};
