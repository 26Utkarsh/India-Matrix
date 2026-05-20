/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // India Matrix Design System
        'im-bg': '#050810',
        'im-bg-2': '#0a0f1e',
        'im-bg-3': '#0d1525',
        'im-surface': 'rgba(255,255,255,0.04)',
        'im-border': 'rgba(255,255,255,0.08)',
        'saffron': '#FF9933',
        'saffron-light': '#FFB366',
        'saffron-dark': '#CC7A29',
        'electric-blue': '#00D4FF',
        'electric-blue-dark': '#0099BB',
        'emerald-im': '#00FF88',
        'emerald-dark': '#00CC6A',
        'gold-im': '#FFD700',
        'crimson-im': '#DC143C',
        'purple-im': '#6B21A8',
        'purple-light': '#9333EA',
        // Party colors
        'inc-green': '#138808',
        'bjp-saffron': '#FF9933',
        'cpm-red': '#FF0000',
        'tmc-green': '#45B649',
        'aap-blue': '#0066B3',
      },
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'hindi': ['Noto Sans Devanagari', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-saffron': 'linear-gradient(135deg, #FF9933, #FF6600)',
        'gradient-blue': 'linear-gradient(135deg, #00D4FF, #0066FF)',
        'gradient-emerald': 'linear-gradient(135deg, #00FF88, #00CC6A)',
        'hero-grid': 'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
      boxShadow: {
        'glow-saffron': '0 0 20px rgba(255,153,51,0.3), 0 0 60px rgba(255,153,51,0.1)',
        'glow-blue': '0 0 20px rgba(0,212,255,0.3), 0 0 60px rgba(0,212,255,0.1)',
        'glow-emerald': '0 0 20px rgba(0,255,136,0.3), 0 0 60px rgba(0,255,136,0.1)',
        'glow-gold': '0 0 20px rgba(255,215,0,0.3), 0 0 60px rgba(255,215,0,0.1)',
        'glass': 'inset 0 0 0 1px rgba(255,255,255,0.08)',
      },
      backdropBlur: {
        'glass': '12px',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'ticker': 'ticker 30s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'count-up': 'count-up 1.5s ease-out forwards',
        'slide-up': 'slide-up 0.4s ease-out forwards',
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'draw-line': 'draw-line 2s ease-out forwards',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.02)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'ticker': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'draw-line': {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
}
