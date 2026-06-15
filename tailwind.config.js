/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cq: {
          primary: '#1C9770',
          'primary-light': '#27ce99',
          secondary: '#93CB52',
          'accent-1': '#7AD180',
          'accent-2': '#7AD1C3',
          text: '#141414',
          'text-muted': '#6B6B6B',
          bg: '#F5F7FA',
          surface: '#FFFFFF',
          error: '#E53935',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Bricolage Grotesque', 'DM Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.1)',
        shell: '0 0 20px rgba(0,0,0,0.05)',
      },
      maxWidth: {
        shell: '768px',
      },
      animation: {
        'pop-in': 'popIn 0.3s ease-out',
        'streak-pulse': 'streakPulse 2.5s ease-in-out infinite',
        shimmer: 'shimmer 2.5s ease-in-out infinite',
      },
      keyframes: {
        popIn: {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        streakPulse: {
          '0%, 100%': { boxShadow: '0 4px 12px rgba(245,73,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.15)' },
          '50%': { boxShadow: '0 6px 20px rgba(245,73,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.25)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100px)', opacity: '0' },
          '30%': { opacity: '1' },
          '100%': { transform: 'translateX(0)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
