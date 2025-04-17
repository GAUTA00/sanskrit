/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',     // Add the index.html file
    './src/**/*.{js,ts,jsx,tsx}', // Include all relevant source files
  ],
  theme: {
    extend: {
      fontFamily: {
        mukta: ['Mukta', 'sans-serif'],
        khand: ['Khand', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
