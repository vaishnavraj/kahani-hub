/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream:        { DEFAULT: '#fdf7ec', soft: '#fffaf5', dark: '#f5eed9' },
        forest:       { DEFAULT: '#285943', deep: '#163020', light: '#3a7a5c' },
        gold:         { DEFAULT: '#d4a017', soft: '#f3e0a2', dark: '#b8880e' },
        ink:          { DEFAULT: '#16221e', light: '#2d3e37' },
        // dark-mode surface palette
        slate:        { DEFAULT: '#0f1c17', card: '#162419', raised: '#1d3127' },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft:    '0 4px 24px rgba(0,0,0,0.06)',
        card:    '0 8px 32px rgba(0,0,0,0.08)',
        glow:    '0 0 40px rgba(212,160,23,0.15)',
      },
      keyframes: {
        'fade-in-up': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-down': {
          '0%':   { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up':  'fade-in-up 0.5s ease-out both',
        'fade-in':     'fade-in 0.4s ease-out both',
        'slide-down':  'slide-down 0.3s ease-out both',
      },
    },
  },
  plugins: [],
};
