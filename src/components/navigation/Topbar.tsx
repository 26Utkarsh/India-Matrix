import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Layers, Activity, Globe, Eye, EyeOff, Sun, Moon, Search } from 'lucide-react';
import { useUIStore, useTimelineStore } from '../../store';
import { PRIME_MINISTERS } from '../../data/primeMinisters';
import { GEOPOLITICAL_EVENTS } from '../../data/geopoliticalEvents';

export const Topbar: React.FC = () => {
  const navigate = useNavigate();
  const { setSidebarOpen, activeModal, setActiveModal, theme, toggleTheme } = useUIStore();
  const { currentYear, setYear, activePMId, setActivePM, pmEraMode, setPmEraMode } = useTimelineStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const currentPM = PRIME_MINISTERS.find(pm => 
    pm.start_year <= currentYear && (pm.end_year >= currentYear || pm.end_year === 2026)
  ) || PRIME_MINISTERS[PRIME_MINISTERS.length - 1];

  const partyColors: Record<string, string> = {
    INC: '#138808', BJP: '#FF9933', JP: '#8B4513'
  };
  const pmColor = partyColors[currentPM.party_abbr] || '#FF9933';

  // Master lookup table for search autocomplete
  const searchItems = useMemo(() => {
    const items: any[] = [];
    
    // Add PMs
    PRIME_MINISTERS.forEach(pm => {
      items.push({
        type: 'pm',
        title: pm.name.split('(')[0].trim(),
        subtitle: `Prime Minister (${pm.start_year}-${pm.end_year === 2026 ? 'Present' : pm.end_year})`,
        handler: () => {
          setActivePM(pm.id);
          setPmEraMode(true);
          const midYear = Math.floor((pm.start_year + (pm.end_year === 2026 ? 2024 : pm.end_year)) / 2);
          setYear(midYear);
          navigate('/prime-ministers');
        }
      });
    });

    // Add States
    const statesList = ['Maharashtra', 'Tamil Nadu', 'Karnataka', 'Gujarat', 'Uttar Pradesh', 'West Bengal', 'Kerala'];
    statesList.forEach(state => {
      items.push({
        type: 'state',
        title: state,
        subtitle: 'State Analytics Profile',
        handler: () => {
          navigate(`/states?state=${state}`);
        }
      });
    });

    // Add Geopolitical Events
    GEOPOLITICAL_EVENTS.forEach(ev => {
      items.push({
        type: 'event',
        title: ev.name,
        subtitle: `Geopolitical Event (${ev.year})`,
        handler: () => {
          navigate(`/geopolitical?id=${ev.id}`);
        }
      });
    });

    // Add Years
    const yearsList = [1947, 1950, 1962, 1965, 1971, 1974, 1975, 1991, 1998, 1999, 2008, 2016, 2017, 2020, 2023, 2026];
    yearsList.forEach(yr => {
      items.push({
        type: 'year',
        title: `Year ${yr}`,
        subtitle: `Jump timeline to ${yr}`,
        handler: () => {
          setYear(yr);
          setPmEraMode(false);
          setActivePM(null);
          navigate('/');
        }
      });
    });

    return items;
  }, [navigate, setActivePM, setPmEraMode, setYear]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (!val.trim()) {
      setSuggestions([]);
      return;
    }
    const filtered = searchItems.filter(item => 
      item.title.toLowerCase().includes(val.toLowerCase()) || 
      item.subtitle.toLowerCase().includes(val.toLowerCase())
    ).slice(0, 5);
    setSuggestions(filtered);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-[9980] glass border-b border-slate-200 dark:border-white/5 flex items-center lg:pl-[240px]">
      <div className="flex items-center gap-1.5 sm:gap-3 px-2 sm:px-4 w-full">
        {/* Menu toggle (mobile) */}
        <button 
          onClick={() => setSidebarOpen(true)} 
          className="lg:hidden text-slate-500 hover:text-slate-900 dark:text-white/60 dark:hover:text-white p-1"
        >
          <Menu size={18} />
        </button>
        <img src="/india_matrix_logo.png?v=4" alt="India Matrix Logo" className="h-7 w-auto object-cover rounded-md hidden xs:inline lg:hidden" />

        {/* Current PM Badge */}
        <div 
          className={`flex items-center gap-1 xs:gap-1.5 glass rounded-lg px-1.5 py-1 xs:px-2.5 xs:py-1.5 transition-all ${pmEraMode ? 'border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : ''}`}
          style={{ borderColor: pmEraMode ? '#A855F7' : `${pmColor}30` }}
        >
          <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full animate-pulse shrink-0" style={{ background: pmColor }} />
          <span className="hidden sm:inline text-xs text-slate-500 dark:text-white/60">Era:</span>
          <select 
            className="bg-transparent text-[11px] xs:text-xs sm:text-sm font-semibold text-slate-900 dark:text-white outline-none cursor-pointer max-w-[70px] xs:max-w-[90px] sm:max-w-none"
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
              className="hidden xs:inline text-[9px] xs:text-[10px] px-1 py-0.5 rounded font-mono font-bold shrink-0"
              style={{ background: `${pmColor}20`, color: pmColor }}
            >
              {currentPM.party_abbr}
            </span>
          )}
        </div>

        {/* Year display */}
        <div className="flex items-center gap-1 sm:gap-2 glass rounded-lg px-1.5 py-1 sm:px-3 sm:py-1.5 shrink-0">
          <Activity size={11} className="text-saffron hidden xs:inline" />
          <span className="font-mono font-bold text-saffron text-xs sm:text-sm">{currentYear}</span>
        </div>

        {/* Global Auto-complete Search Input (desktop/tablet) */}
        <div className="relative hidden md:block max-w-[200px] lg:max-w-xs w-full ml-4 pointer-events-auto">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400 dark:text-white/20">
            <Search size={12} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={e => handleSearchChange(e.target.value)}
            placeholder="Search PMs, states, events..."
            className="w-full bg-white dark:bg-[#070c1a] border border-slate-200 dark:border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-saffron/40 placeholder-slate-400 dark:placeholder-white/25 shadow-inner"
          />
          
          {/* Suggestions Dropdown panel */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#0a0f1e] border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl z-50 divide-y divide-slate-100 dark:divide-white/5 overflow-hidden">
              {suggestions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    item.handler();
                    setSearchQuery('');
                    setSuggestions([]);
                  }}
                  className="w-full text-left px-3 py-2.5 text-xs hover:bg-slate-50 dark:hover:bg-white/3 flex flex-col gap-0.5 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="text-xs">
                      {item.type === 'pm' ? '🏛️' : item.type === 'state' ? '📊' : item.type === 'event' ? '⚔️' : '⏳'}
                    </span>
                    {item.title}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-white/20 font-medium">{item.subtitle}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0" />

        {/* Toggle buttons */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            onClick={() => setActiveModal(activeModal === 'political' ? null : 'political')}
            className={`flex items-center gap-1 px-1.5 py-1 sm:px-2.5 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium border transition-all
              ${activeModal === 'political'
                ? 'bg-purple-100 border-purple-200 text-purple-700 dark:bg-purple-500/20 dark:border-purple-500/40 dark:text-purple-300' 
                : 'glass border-slate-200 text-slate-500 hover:text-slate-800 dark:border-white/10 dark:text-white/50 dark:hover:text-white/80'}`}
          >
            <Layers size={13} className="sm:size-[14px]" />
            <span className="hidden sm:inline">Political</span>
          </button>
          <button
            onClick={() => setActiveModal(activeModal === 'events' ? null : 'events')}
            className={`flex items-center gap-1 px-1.5 py-1 sm:px-2.5 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium border transition-all
              ${activeModal === 'events'
                ? 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-saffron/20 dark:border-saffron/40 dark:text-saffron' 
                : 'glass border-slate-200 text-slate-500 hover:text-slate-800 dark:border-white/10 dark:text-white/50 dark:hover:text-white/80'}`}
          >
            {activeModal === 'events' ? <Eye size={13} className="sm:size-[14px]" /> : <EyeOff size={13} className="sm:size-[14px]" />}
            <span className="hidden sm:inline">Events</span>
          </button>
          <button 
            onClick={() => setActiveModal(activeModal === 'compare' ? null : 'compare')}
            className={`flex items-center gap-1 px-1.5 py-1 sm:px-2.5 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium border transition-all
              ${activeModal === 'compare'
                ? 'bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-500/20 dark:border-blue-500/40 dark:text-blue-300' 
                : 'glass border-slate-200 text-slate-500 hover:text-slate-800 dark:border-white/10 dark:text-white/50 dark:hover:text-white/80'}`}
          >
            <Globe size={13} className="sm:size-[14px]" />
            <span className="hidden sm:inline">Compare</span>
          </button>
          <button 
            onClick={toggleTheme}
            className="flex items-center justify-center p-1 sm:px-2.5 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium glass border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-800 dark:text-white/50 dark:hover:text-white/80 transition-all w-7 h-7 sm:w-auto sm:h-auto shrink-0"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun size={13} className="sm:size-[14px]" /> : <Moon size={13} className="sm:size-[14px]" />}
          </button>
        </div>
      </div>
    </header>
  );
};
