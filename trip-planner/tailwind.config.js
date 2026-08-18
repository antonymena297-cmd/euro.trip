/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        night:  { DEFAULT: '#0F1B2D', 2: '#132436', 3: '#1A2E44' },
        pine:   { DEFAULT: '#1F3A34', light: '#2C5049' },
        frost:  { DEFAULT: '#EAF2F3', dim: '#D3E1E4' },
        amber:  { DEFAULT: '#E3A857', dark: '#B9822F' },
        ember:  { DEFAULT: '#C1523B', dark: '#98392A' },
        slate2: { DEFAULT: '#8CA0AE', dark: '#5B6B7A' }
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      backgroundImage: {
        ridge: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120' preserveAspectRatio='none'%3E%3Cpath d='M0,120 L0,60 L120,20 L240,70 L360,10 L480,55 L600,25 L720,80 L840,15 L960,65 L1080,30 L1200,75 L1320,20 L1440,60 L1440,120 Z' fill='%23132436'/%3E%3C/svg%3E\")"
      },
      boxShadow: {
        lodge: '0 1px 0 rgba(234,242,243,.06), 0 12px 30px -14px rgba(0,0,0,.55)'
      }
    }
  },
  plugins: []
}
