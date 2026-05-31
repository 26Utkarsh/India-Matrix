import React, { useState } from 'react';
import { X, Eye, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../../store';
import { GEOPOLITICAL_EVENTS } from '../../data/geopoliticalEvents';

export const EventsModal: React.FC = () => {
  const { activeModal, setActiveModal } = useUIStore();
  const isOpen = activeModal === 'events';
  const [filter, setFilter] = useState<'all' | 'war' | 'reform' | 'crisis' | 'milestone' | 'nuclear' | 'space' | 'diplomatic'>('all');

  if (!isOpen) return null;

  const filteredEvents = GEOPOLITICAL_EVENTS.filter(e => filter === 'all' || e.type === filter);

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
            className="w-full max-w-4xl bg-white dark:bg-[#0a0f1e] border border-slate-200 dark:border-white/12 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-white/5">
              <div className="flex items-center gap-2 text-amber-600 dark:text-saffron">
                <Eye size={20} />
                <h2 className="font-display font-bold text-lg">Geopolitical & Major Events</h2>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 border-b border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-[#070c1a] flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2 flex-shrink-0">
                <Filter size={14} className="text-slate-400" />
                <span className="text-sm text-slate-500 dark:text-white/40 font-medium">Filter by category:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(['all', 'war', 'reform', 'crisis', 'milestone', 'diplomatic', 'nuclear', 'space'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-full border transition-all capitalize
                      ${filter === f 
                        ? 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-saffron/20 dark:border-saffron/40 dark:text-saffron' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-transparent dark:border-white/10 dark:text-white/60 dark:hover:text-white/90'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredEvents.map(ev => (
                  <div key={ev.id} className="glass rounded-xl p-4 border border-slate-200 dark:border-white/10 hover:border-amber-300 dark:hover:border-saffron/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{ev.name}</span>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-white/70">
                        {ev.year}
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full uppercase tracking-wider font-bold
                        ${ev.type === 'war' ? 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-300' : 
                          ev.type === 'reform' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300' : 
                          ev.type === 'crisis' ? 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300' :
                          'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300'}`}
                      >
                        {ev.type}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-white/60 leading-relaxed mb-3">
                      {ev.description}
                    </p>
                    {ev.gdp_impact_pct && (
                      <div className="mt-auto pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <span className="text-xs text-slate-400 dark:text-white/40">GDP Impact:</span>
                        <span className={`text-sm font-mono font-bold ${ev.gdp_impact_pct < 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                          {ev.gdp_impact_pct > 0 ? '+' : ''}{ev.gdp_impact_pct}%
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
