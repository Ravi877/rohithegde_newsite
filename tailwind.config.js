// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Define the custom color palette from your design
      colors: {
        'dark-navy': '#1a202c',      // The main dark background color
        'bright-blue': '#00bfff',    // The CTA button and accent color
        'accent-red': '#ff4136',     // The red circle behind the person
        'light-slate': '#a0aec0',   // Lighter text color for paragraphs
        'lightest-slate': '#cbd5e0', // Main heading text color
      },
      // Define animations for the background blobs
      animation: {
        blob: 'blob 7s infinite',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
      },
    },
  },
  // Add the typography plugin for beautiful blog post styling
  plugins: [require('@tailwindcss/typography')],
};