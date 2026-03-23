/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        // Brand palette
        brand: {
          50:  '#eefff9',
          100: '#c6fff0',
          200: '#8effdf',
          300: '#45f9ca',
          400: '#00e5ad',
          500: '#00c993',
          600: '#00a278',
          700: '#007d61',
          800: '#005f4e',
          900: '#003d33',
        },
        // Background tokens
        dark: {
          900: '#050c15',
          800: '#0a1628',
          700: '#0f2040',
          600: '#142b55',
        },
        // Accent
        accent: {
          cyan:   '#00e5ad',
          purple: '#8b5cf6',
          amber:  '#f59e0b',
        },
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300e5ad' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in':       'fadeIn 0.5s ease-out',
        'slide-up':      'slideUp 0.6s ease-out',
        'glow-pulse':    'glowPulse 2s ease-in-out infinite',
        'float':         'float 3s ease-in-out infinite',
        'scan-line':     'scanLine 4s linear infinite',
        'typing':        'typing 2s steps(40) forwards',
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0' },                to: { opacity: '1' } },
        slideUp:   { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        glowPulse: { '0%,100%': { boxShadow: '0 0 5px rgba(0,229,173,0.3)' }, '50%': { boxShadow: '0 0 20px rgba(0,229,173,0.8)' } },
        float:     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        scanLine:  { from: { top: '0%' }, to: { top: '100%' } },
        typing:    { from: { width: '0' }, to: { width: '100%' } },
      },
      boxShadow: {
        'glow-sm':  '0 0 10px rgba(0,229,173,0.2)',
        'glow-md':  '0 0 20px rgba(0,229,173,0.4)',
        'glow-lg':  '0 0 40px rgba(0,229,173,0.6)',
        'glow-purple': '0 0 20px rgba(139,92,246,0.4)',
      },
    },
  },
  plugins: [],
};
