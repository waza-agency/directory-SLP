/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Montserrat', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'serif': ['Playfair Display', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#FFCB05', // Bright yellow/gold
          dark: '#E6B800',
          light: '#FFD633',
        },
        secondary: {
          DEFAULT: '#00007A',  // Deep royal blue
          light: '#0000B3',
        },
        background: {
          DEFAULT: '#FFFFFF',
          alt: '#F8F8F8',
        },
        accent: {
          DEFAULT: '#FFCB05',  // Same as primary for consistency
        },
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}; 