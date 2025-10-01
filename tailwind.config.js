// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-navy': '#0a192f',
        'bright-blue': '#00bfff',
        'light-slate': '#a0aec0',
        'lightest-slate': '#ccd6f6',
        'glow-blue': 'rgba(0, 191, 255, 0.5)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'typing': 'typing 2s steps(40, end), blink-caret .75s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'blink-caret': {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#00bfff' },
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0px)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};