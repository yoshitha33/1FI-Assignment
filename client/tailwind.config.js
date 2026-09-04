/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        mist: '#f8fafc',
        accent: '#2563eb',
        accentSoft: '#dbeafe',
        gold: '#b45309',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.08)',
      },
      backgroundImage: {
        'hero-grid': 'radial-gradient(circle at 1px 1px, rgba(37, 99, 235, 0.14) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
};