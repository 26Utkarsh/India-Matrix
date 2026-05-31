import { create } from 'zustand';

interface TimelineState {
  currentYear: number;
  isPlaying: boolean;
  playbackSpeed: number;
  compareMode: boolean;
  compareYear: number;
  activePMId: number | null;
  pmEraMode: boolean;
  setYear: (year: number) => void;
  setPlaying: (playing: boolean) => void;
  setSpeed: (speed: number) => void;
  toggleCompare: () => void;
  setCompareYear: (year: number) => void;
  setActivePM: (pmId: number | null) => void;
  setPmEraMode: (active: boolean) => void;
}

export const useTimelineStore = create<TimelineState>((set) => ({
  currentYear: 2026,
  isPlaying: false,
  playbackSpeed: 1,
  compareMode: false,
  compareYear: 1991,
  activePMId: null,
  pmEraMode: false,
  setYear: (year) => set({ currentYear: Math.max(1947, Math.min(2026, year)) }),
  setPlaying: (playing) => set({ isPlaying: playing }),
  setSpeed: (speed) => set({ playbackSpeed: speed }),
  toggleCompare: () => set((s) => ({ compareMode: !s.compareMode })),
  setCompareYear: (year) => set({ compareYear: year }),
  setActivePM: (pmId) => set({ activePMId: pmId }),
  setPmEraMode: (active) => set({ pmEraMode: active }),
}));

interface UIState {
  sidebarOpen: boolean;
  activeModule: string;
  politicalOverlay: boolean;
  eventMarkersVisible: boolean;
  activeModal: 'political' | 'events' | 'compare' | null;
  theme: 'dark' | 'light';
  setSidebarOpen: (open: boolean) => void;
  setActiveModule: (mod: string) => void;
  togglePoliticalOverlay: () => void;
  toggleEventMarkers: () => void;
  setActiveModal: (modal: 'political' | 'events' | 'compare' | null) => void;
  toggleTheme: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: typeof window !== 'undefined' ? window.innerWidth >= 1024 : false,
  activeModule: 'home',
  politicalOverlay: false,
  eventMarkersVisible: true,
  activeModal: null,
  theme: 'light',
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActiveModule: (mod) => set({ activeModule: mod }),
  togglePoliticalOverlay: () => set((s) => ({ politicalOverlay: !s.politicalOverlay })),
  toggleEventMarkers: () => set((s) => ({ eventMarkersVisible: !s.eventMarkersVisible })),
  setActiveModal: (modal) => set({ activeModal: modal }),
  toggleTheme: () => set((s) => {
    const newTheme = s.theme === 'dark' ? 'light' : 'dark';
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { theme: newTheme };
  }),
}));
