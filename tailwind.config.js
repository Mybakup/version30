/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'mybakup-coral': '#FF6B6B',
        'mybakup-blue': '#2D3748'
      }
    },
  },
  plugins: [],
};