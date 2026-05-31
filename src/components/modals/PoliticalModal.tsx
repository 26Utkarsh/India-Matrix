import React from 'react';
import { X, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../../store';
import { PRIME_MINISTERS } from '../../data/primeMinisters';

export const PoliticalModal: React.FC = () => {
  const { activeModal, setActiveModal } = useUIStore();
  const isOpen = activeModal === 'political';

  if (!isOpen) return null;

  const partyColors: Record<string, string> = {
    INC: '#138808', BJP: '#FF9933', JP: '#8B4513'
  };

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
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <Layers size={20} />
                <h2 className="font-display font-bold text-lg">Political Landscape (1947-Present)</h2>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              <div className="text-slate-600 dark:text-white/60 text-sm mb-6">
                A chronological breakdown of India's ruling parties and coalitions at the center.
              </div>

              <div className="relative border-l-2 border-slate-200 dark:border-white/10 ml-4 space-y-8 pb-4">
                {PRIME_MINISTERS.map((pm) => {
                  const partyColor = partyColors[pm.party_abbr] || '#64748b';
                  return (
                    <div key={pm.id} className="relative pl-6">
                      <div 
                        className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-white dark:border-[#0a0f1e]"
                        style={{ backgroundColor: partyColor }}
                      />
                      <div className="glass rounded-xl p-4 border" style={{ borderColor: `${partyColor}30` }}>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-display font-bold text-slate-900 dark:text-white">{pm.name}</h3>
                          <span className="text-sm font-mono text-slate-500 dark:text-white/50">{pm.start_date} - {pm.end_date}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs px-2 py-0.5 rounded font-bold text-white" style={{ background: partyColor }}>
                            {pm.party_abbr}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-white/60">{pm.party}</span>
                          {!pm.majority && (
                            <span className="text-xs px-2 py-0.5 rounded bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300 border border-orange-200 dark:border-orange-500/30">
                              Coalition: {pm.coalition}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-white/70">{pm.legacy_note}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
