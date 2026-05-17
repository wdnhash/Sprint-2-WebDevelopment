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
        sans: ['Roboto', 'system-ui', 'sans-serif'],
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
      },
      keyframes: {
        popIn: {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
