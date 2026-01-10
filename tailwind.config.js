/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',     // Add the index.html file
    './src/**/*.{js,ts,jsx,tsx}', // Include all relevant source files
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2F5D71',  // Deep Teal/Blue
        secondary: '#F18056', // Saffron/Orange
        accent: '#E3DBC2',    // Cream/Beige
        background: '#F7F7F7', // Off-white
        surface: '#ffffff',
      },
      fontFamily: {
        mukta: ['Mukta', 'sans-serif'],
        khand: ['Khand', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
