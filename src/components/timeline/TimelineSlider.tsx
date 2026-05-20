import React, { useCallback } from 'react';
import { useTimelineStore } from '../../store';
import { GEOPOLITICAL_EVENTS } from '../../data/geopoliticalEvents';

const MIN_YEAR = 1947;
const MAX_YEAR = 2026;

const EVENT_ICONS: Record<string, string> = {
  war: '⚔️', reform: '📜', crisis: '⚡', milestone: '🏆', 
  nuclear: '☢️', space: '🚀', election: '🗳️', diplomatic: '🤝'
};

export const TimelineSlider: React.FC = () => {
  const { currentYear, setYear } = useTimelineStore();
  const trackRef = React.useRef<HTMLDivElement>(null);

  const pct = ((currentYear - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;

  // Autoplay functionality removed per user request

  const handleTrackClick = useCallback((e: React.MouseEvent) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setYear(Math.round(MIN_YEAR + ratio * (MAX_YEAR - MIN_YEAR)));
  }, [setYear]);

  const eventsOnTimeline = GEOPOLITICAL_EVENTS.filter(e => e.year >= MIN_YEAR && e.year <= MAX_YEAR);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-[#050810]/95 backdrop-blur-md border-t border-slate-200 dark:border-white/10 lg:pl-[240px] shadow-lg">
      <div className="px-4 py-2">
        {/* Event markers row */}
        <div className="relative h-4 mb-1" ref={trackRef} onClick={handleTrackClick} style={{ cursor: 'crosshair' }}>
          {eventsOnTimeline.map(event => {
            const pos = ((event.year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;
            return (
              <div
                key={event.id}
                className="absolute -translate-x-1/2 group cursor-pointer"
                style={{ left: `${pos}%`, top: 0 }}
                title={`${event.year}: ${event.name}`}
              >
                <div className="text-xs select-none text-slate-500 hover:text-saffron dark:text-white/60 dark:hover:text-saffron transition-colors">
                  {EVENT_ICONS[event.type] || '•'}
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white dark:bg-[#0a0f1e] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-800 dark:text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
                  <div className="font-bold text-saffron">{event.year}</div>
                  <div className="text-slate-600 dark:text-white/80 max-w-[180px] truncate">{event.name}</div>
                </div>
              </div>
            );
          })}
        </div>
 
        {/* Track */}
        <div className="relative" onClick={handleTrackClick} style={{ cursor: 'crosshair' }}>
          <div className="timeline-track w-full relative bg-slate-200 dark:bg-slate-800">
            {/* Progress fill */}
            <div 
              className="absolute left-0 top-0 h-full rounded-l-full bg-saffron/30 dark:bg-saffron/40 transition-none"
              style={{ width: `${pct}%` }}
            />
            {/* Playhead */}
            <div
              className="timeline-thumb absolute -translate-x-1/2 -translate-y-1/2 top-1/2 border-white dark:border-[#050810]"
              style={{ left: `${pct}%` }}
            />
          </div>
        </div>
 
        {/* Year markers */}
        <div className="flex justify-between text-xs font-mono text-slate-500 dark:text-white/40 mt-1.5 select-none">
          {[1947,1960,1975,1991,2000,2010,2014,2016,2020,2026].map(y => (
            <button 
              key={y}
              onClick={(e) => { e.stopPropagation(); setYear(y); }}
              className={`hover:text-saffron transition-colors ${currentYear === y ? 'text-saffron font-bold' : ''}`}
            >
              {y}
            </button>
          ))}
        </div>
 
        {/* Controls row */}
        <div className="flex items-center gap-3 mt-1.5">
          {/* Current Year big display */}
          <div className="font-display font-bold text-xl text-slate-900 dark:text-white metric-number tracking-tight">
            {currentYear}
          </div>
          
          <div className="ml-auto" />
 
          {/* Decade jumps */}
          <div className="hidden sm:flex items-center gap-1">
            {['50s','60s','70s','80s','90s','00s','10s','20s'].map((decade, i) => {
              const year = 1950 + i * 10;
              return (
                <button
                  key={decade}
                  onClick={() => setYear(year)}
                  className="text-xs font-mono px-1.5 py-0.5 rounded border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/40 hover:border-saffron/40 hover:text-saffron hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                >
                  {decade}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
