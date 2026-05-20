import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Map, Globe2, Home, Factory, 
  Wheat, Zap, GraduationCap, Heart, Wifi, Rocket, Shield, 
  TrendingUp, Leaf, Users2, BookOpen, Brain, X, ChevronRight,
  Mountain, Train, Gamepad2, Sliders, Compass
} from 'lucide-react';
import { useUIStore } from '../../store';

const navItems = [
  { path: '/', label: 'Home Dashboard', icon: LayoutDashboard },
  { path: '/founding-fathers', label: 'Founding Fathers', icon: Compass },
  { path: '/prime-ministers', label: 'Prime Ministers', icon: Users },
  { path: '/geopolitical', label: 'Geopolitical Events', icon: Globe2 },
  { path: '/rural', label: 'Rural India', icon: Home },
  { path: '/urban', label: 'Urban India', icon: Mountain },
  { path: '/agriculture', label: 'Agriculture & Dairy', icon: Wheat },
  { path: '/industry', label: 'Industry & Mfg', icon: Factory },
  { path: '/steel', label: 'Steel & Coal', icon: Factory },
  { path: '/infrastructure', label: 'Infrastructure', icon: Map },
  { path: '/transport', label: 'Transportation', icon: Train },
  { path: '/energy', label: 'Energy', icon: Zap },
  { path: '/education', label: 'Education', icon: GraduationCap },
  { path: '/healthcare', label: 'Healthcare', icon: Heart },
  { path: '/digital', label: 'Digital India & IT', icon: Wifi },
  { path: '/space', label: 'Space & Science', icon: Rocket },
  { path: '/defense', label: 'Defense Industry', icon: Shield },
  { path: '/economy', label: 'Economy & Trade', icon: TrendingUp },
  { path: '/environment', label: 'Environment', icon: Leaf },
  { path: '/demographics', label: 'Demographics', icon: Users2 },
  { path: '/states', label: 'State Analytics', icon: Map },
  { path: '/decades', label: 'India by Decades', icon: BookOpen },
  { path: '/quiz', label: 'Matrix Quiz Game', icon: Gamepad2 },
  { path: '/simulator', label: '2047 Policy Simulator', icon: Sliders },
  { path: '/ai-insights', label: 'AI Insights Engine', icon: Brain },
];

export const Sidebar: React.FC = () => {
  const { sidebarOpen, setSidebarOpen, theme } = useUIStore();
  const isDark = theme === 'dark';

  const getSidebarColor = (path: string, dark: boolean) => {
    const colorMap: Record<string, { dark: string; light: string }> = {
      '/': { dark: '#FF9933', light: '#ea580c' },
      '/founding-fathers': { dark: '#FF9933', light: '#ea580c' },
      '/prime-ministers': { dark: '#FFD700', light: '#b45309' },
      '/geopolitical': { dark: '#DC143C', light: '#be123c' },
      '/rural': { dark: '#4ADE80', light: '#15803d' },
      '/urban': { dark: '#60A5FA', light: '#1d4ed8' },
      '/agriculture': { dark: '#86EFAC', light: '#047857' },
      '/industry': { dark: '#F97316', light: '#c2410c' },
      '/steel': { dark: '#94A3B8', light: '#475569' },
      '/infrastructure': { dark: '#A78BFA', light: '#6d28d9' },
      '/transport': { dark: '#34D399', light: '#0f766e' },
      '/energy': { dark: '#FACC15', light: '#b45309' },
      '/education': { dark: '#818CF8', light: '#4338ca' },
      '/healthcare': { dark: '#F472B6', light: '#be185d' },
      '/digital': { dark: '#00D4FF', light: '#0369a1' },
      '/space': { dark: '#C084FC', light: '#6d28d9' },
      '/defense': { dark: '#6B7280', light: '#374151' },
      '/economy': { dark: '#00FF88', light: '#15803d' },
      '/environment': { dark: '#22D3EE', light: '#0369a1' },
      '/demographics': { dark: '#FB923C', light: '#c2410c' },
      '/states': { dark: '#A3E635', light: '#4d7c0f' },
      '/decades': { dark: '#FBBF24', light: '#b45309' },
      '/quiz': { dark: '#F472B6', light: '#db2777' },
      '/simulator': { dark: '#38BDF8', light: '#0284c7' },
      '/ai-insights': { dark: '#E879F9', light: '#a21caf' },
    };
    return colorMap[path]?.[dark ? 'dark' : 'light'] || '#FF9933';
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed left-0 top-0 h-full z-50 transition-transform duration-300
        w-[240px] bg-white dark:bg-[#070c1a] border-r border-slate-200 dark:border-white/5
        flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-white/5 shrink-0">
          <div className="flex items-center gap-2">
            <img src="/india_matrix_logo.png?v=4" alt="India Matrix Logo" className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
            <div>
              <div className="font-display font-bold text-sm text-slate-900 dark:text-white leading-tight">INDIA MATRIX</div>
              <div className="text-xs text-slate-500 dark:text-white/40 font-mono">1947 — 2026</div>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-500 hover:text-slate-800 dark:text-white/40 dark:hover:text-white">
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-2 px-2">
          {navItems.map(({ path, label, icon: Icon }) => {
            const color = getSidebarColor(path, isDark);
            return (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={({ isActive }) =>
                  `sidebar-link flex items-center gap-2.5 px-3 py-2 rounded-md mb-0.5 text-xs font-medium transition-all duration-200
                  ${isActive ? 'font-semibold shadow-sm' : 'text-slate-600 dark:text-white/50'}`
                }
                style={{ '--color': color, '--color-bg': `${color}15` } as React.CSSProperties}
              >
                {({ isActive }) => (
                  <>
                    <Icon size={14} style={{ color: isActive ? color : 'inherit' }} />
                    <span>{label}</span>
                    {isActive && <ChevronRight size={12} className="ml-auto opacity-60" />}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-slate-200 dark:border-white/5 shrink-0">
          <div className="glass rounded-lg p-2.5 text-center">
            <div className="text-xs text-slate-500 dark:text-white/30 font-mono">DATA SOURCES</div>
            <div className="text-xs text-slate-400 dark:text-white/20 mt-0.5">MOSPI · RBI · World Bank · Census</div>
          </div>
        </div>
      </aside>
    </>
  );
};
