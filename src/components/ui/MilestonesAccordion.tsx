import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Newspaper,
  Rocket, Coins, Cpu, Wifi, Globe, Map, 
  Shield, Leaf, GraduationCap, Heart, Milestone,
  Sparkle
} from 'lucide-react';
import { MILESTONES_DATA } from '../../data/achievementsAndNews';

interface Props {
  category: string;
}

// Smart helper to get dynamic icons for milestones based on keywords
const getMilestoneIcon = (title: string, category: string, isNews: boolean) => {
  const t = title.toLowerCase();
  const cat = category.toLowerCase();

  if (isNews) {
    if (t.includes('5g') || t.includes('internet') || t.includes('rural internet')) return <Wifi size={16} className="text-cyan-500" />;
    if (t.includes('ai') || t.includes('semiconductor') || t.includes('compute')) return <Cpu size={16} className="text-pink-500" />;
    if (t.includes('global') || t.includes('export') || t.includes('trade')) return <Globe size={16} className="text-teal-500" />;
    if (t.includes('solar') || t.includes('hydrogen') || t.includes('renewables')) return <Sparkle size={16} className="text-amber-500" />;
    if (t.includes('bullet') || t.includes('metro') || t.includes('expressway') || t.includes('port')) return <Milestone size={16} className="text-blue-500" />;
    if (t.includes('defense') || t.includes('tejas') || t.includes('missile')) return <Shield size={16} className="text-slate-500" />;
    return <Newspaper size={16} className="text-blue-500 dark:text-blue-400" />;
  }

  // Categories specific
  if (cat.includes('space') || t.includes('moon') || t.includes('mars') || t.includes('satellite') || t.includes('rocket')) {
    return <Rocket size={18} className="text-purple-500 dark:text-purple-400" />;
  }
  if (cat.includes('economy') || t.includes('upi') || t.includes('gst') || t.includes('fdi') || t.includes('gdp') || t.includes('rupee') || t.includes('bank')) {
    return <Coins size={18} className="text-emerald-500 dark:text-emerald-400" />;
  }
  if (cat.includes('digital') || t.includes('biometric') || t.includes('aadhaar') || t.includes('digilocker') || t.includes('app') || t.includes('online')) {
    return <Cpu size={18} className="text-cyan-500 dark:text-cyan-400" />;
  }
  if (cat.includes('defense') || cat.includes('military') || t.includes('ins') || t.includes('nuclear') || t.includes('army') || t.includes('deterrence')) {
    return <Shield size={18} className="text-slate-500 dark:text-slate-400" />;
  }
  if (cat.includes('environment') || t.includes('forest') || t.includes('tiger') || t.includes('wetland') || t.includes('carbon')) {
    return <Leaf size={18} className="text-green-500 dark:text-green-400" />;
  }
  if (cat.includes('education') || t.includes('school') || t.includes('literacy') || t.includes('iit') || t.includes('nep')) {
    return <GraduationCap size={18} className="text-indigo-500 dark:text-indigo-400" />;
  }
  if (cat.includes('healthcare') || t.includes('vaccine') || t.includes('polio') || t.includes('hospital') || t.includes('health')) {
    return <Heart size={18} className="text-rose-500 dark:text-rose-400" />;
  }
  if (cat.includes('transport') || t.includes('highway') || t.includes('rail') || t.includes('airport') || t.includes('road')) {
    return <Milestone size={18} className="text-amber-500 dark:text-amber-400" />;
  }
  if (cat.includes('urban') || t.includes('city') || t.includes('smart') || t.includes('slum')) {
    return <Globe size={18} className="text-blue-500 dark:text-blue-400" />;
  }
  if (cat.includes('rural') || t.includes('village') || t.includes('rural') || t.includes('mgnrega')) {
    return <Map size={18} className="text-lime-600 dark:text-lime-400" />;
  }

  return <Trophy size={18} className="text-amber-500 dark:text-saffron" />;
};

// Dynamic helper to match title or category to a stunning local image URL
const getMilestoneImage = (title: string, category: string, returnDefault = true): string | undefined => {
  const t = title.toLowerCase();
  const cat = category.toLowerCase();

  // Restrict milestone images ONLY to the space category as requested by the user
  if (cat !== 'space') {
    return undefined;
  }

  // Custom high-quality local assets for space milestones
  if (t.includes('chandrayaan-3') || t.includes('chandrayaan 3') || (t.includes('chandrayaan') && t.includes('lander'))) {
    return '/chandrayaan3_lander.png';
  }
  if (t.includes('mangalyaan') || t.includes('mars')) {
    return '/mangalyaan.png';
  }
  if (t.includes('rakesh sharma') || t.includes('sharma') || t.includes('astronaut')) {
    return '/rakesh_sharma.png';
  }
  if (t.includes('gaganyaan') || t.includes('crewed') || t.includes('crew escape') || t.includes('spaceflight')) {
    return '/gaganyaan.png';
  }
  if (t.includes('pslv') || t.includes('gslv') || t.includes('rocket') || t.includes('launch') || t.includes('isro formed') || t.includes('satellites') || t.includes('slv-3') || t.includes('aryabhata')) {
    return '/pslv_rocket.png';
  }
  if (t.includes('aditya') || t.includes('solar') || t.includes('halo')) {
    return '/mangalyaan.png';
  }

  if (returnDefault) {
    return '/mangalyaan.png';
  }
  return undefined;
};

export const MilestonesAccordion: React.FC<Props> = ({ category }) => {
  const [activeTab, setActiveTab] = useState<'achievements' | 'news'>('achievements');
  
  const data = MILESTONES_DATA[category.toLowerCase()];
  
  if (!data) return null;

  const items = activeTab === 'achievements' ? data.achievements : data.news;
  
  // Highlight the top recent item (index 0)
  const featuredItem = items[0];
  const regularItems = items.slice(1);

  return (
    <div className="space-y-6 mt-8">
      {/* Premium Header Card */}
      <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-white/5 relative overflow-hidden">
        {/* Glow Decors */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-saffron/10 dark:bg-saffron/5 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-saffron dark:text-saffron bg-saffron/10 px-2 py-0.5 rounded-full">
                Ledger Hub
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/20" />
              <span className="text-xs font-mono text-slate-500 dark:text-white/40">
                Verified Reports
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white capitalize tracking-tight">
              {category} Development Log
            </h2>
            <p className="text-slate-600 dark:text-white/60 text-xs mt-1 max-w-xl leading-relaxed">
              Browse through the major legal enactments, system launches, policy achievements, and real-time bulletins shaping the {category} sector.
            </p>
          </div>

          {/* Styled Tab Toggles - No Numbers */}
          <div className="flex bg-slate-100/80 dark:bg-white/5 p-1 rounded-2xl border border-slate-200/50 dark:border-white/5 self-start md:self-auto shrink-0 shadow-inner">
            <button
              onClick={() => setActiveTab('achievements')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300
                ${activeTab === 'achievements' 
                  ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-md border border-slate-200/40 dark:border-white/5' 
                  : 'text-slate-600 hover:text-slate-900 dark:text-white/40 dark:hover:text-white/80'}`}
            >
              <Trophy size={14} className={activeTab === 'achievements' ? 'text-amber-500' : ''} />
              Achievements
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300
                ${activeTab === 'news' 
                  ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-md border border-slate-200/40 dark:border-white/5' 
                  : 'text-slate-600 hover:text-slate-900 dark:text-white/40 dark:hover:text-white/80'}`}
            >
              <Newspaper size={14} className={activeTab === 'news' ? 'text-blue-500' : ''} />
              Latest News
            </button>
          </div>
        </div>
      </div>

      {/* Hero featured card (Wide split card layout with dynamic pictures in the "big box") */}
      {featuredItem && (() => {
        const featuredImg = getMilestoneImage(featuredItem.title, category);
        return (
          <motion.div 
            key={featuredItem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden glass rounded-3xl border border-slate-200 dark:border-white/10 flex flex-col lg:grid lg:grid-cols-5 h-auto lg:h-[300px] group shadow-lg"
          >
            {/* Saffron & Green Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-saffron via-white to-emerald-500 z-20" />

            {/* Left Text Block */}
            <div className={`${featuredImg ? 'lg:col-span-3' : 'lg:col-span-5'} p-6 md:p-8 flex flex-col justify-between relative z-10`}>
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-500/10 dark:bg-saffron/10 blur-2xl rounded-full pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-extrabold px-3 py-1 bg-amber-100 text-amber-800 dark:bg-saffron/20 dark:text-saffron rounded-full border border-amber-200/50 dark:border-saffron/30 shadow-sm">
                    {featuredItem.year}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-white dark:bg-white/5 shadow flex items-center justify-center border border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-white">
                    {getMilestoneIcon(featuredItem.title, category, activeTab === 'news')}
                  </div>
                </div>

                <h3 className="font-display font-extrabold text-xl md:text-2xl text-slate-900 dark:text-white leading-tight group-hover:text-amber-600 dark:group-hover:text-saffron transition-colors">
                  {featuredItem.title}
                </h3>

                <p className="text-slate-600 dark:text-white/70 text-xs md:text-sm mt-3 leading-relaxed">
                  {featuredItem.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center gap-2 mt-6 lg:mt-0">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-slate-500 dark:text-white/40 uppercase tracking-wider font-bold">Featured Peak Breakthrough</span>
              </div>
            </div>

            {/* Right Image Block */}
            {featuredImg && (
              <div className="lg:col-span-2 relative overflow-hidden h-[200px] lg:h-full bg-slate-900">
                <img 
                  src={featuredImg} 
                  alt={featuredItem.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Soft gradient overlay on top of the image */}
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900/80 lg:from-slate-900/30 via-transparent to-transparent pointer-events-none" />
              </div>
            )}
          </motion.div>
        );
      })()}

      {/* Regular items grid layout (no numbers) */}
      <div className="space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-white/30 px-1">
          Historical Ledger
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {regularItems.map((item, idx) => {
              const imgUrl = getMilestoneImage(item.title, category, false);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ delay: Math.min(idx * 0.02, 0.3) }}
                  className="group relative glass rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-white/5 hover:border-amber-300 dark:hover:border-saffron/20 transition-all duration-300 flex items-start gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  {/* Accent Side Line Indicator */}
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-slate-200 dark:bg-white/5 rounded-l-2xl group-hover:bg-amber-500 dark:group-hover:bg-saffron transition-colors" />

                  {/* Left Side Icon and Year */}
                  <div className="flex flex-col gap-2 items-center shrink-0 w-16">
                    <span className="font-mono font-extrabold text-sm text-slate-800 dark:text-white px-2 py-0.5 bg-slate-100 dark:bg-white/5 rounded border border-slate-200/50 dark:border-white/10 text-center w-full shadow-sm">
                      {item.year}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 flex items-center justify-center text-slate-700 dark:text-white/80 shadow-sm">
                      {getMilestoneIcon(item.title, category, activeTab === 'news')}
                    </div>
                  </div>

                  {/* Right Side Description */}
                  <div className="flex-1 space-y-1">
                    <h4 className="font-display font-bold text-slate-900 dark:text-white text-xs md:text-sm group-hover:text-amber-600 dark:group-hover:text-saffron transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-slate-600 dark:text-white/60 text-xs leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Optional Right Thumbnail Image */}
                  {imgUrl && (
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200/50 dark:border-white/10 hidden sm:block shadow-inner bg-slate-950">
                      <img 
                        src={imgUrl} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
