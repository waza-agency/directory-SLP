/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shine': 'shine 2s linear infinite',
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'retro-strobe': 'retroStrobe 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        shine: {
          '0%': { 
            backgroundPosition: '200% center',
            opacity: 0.9,
          },
          '100%': { 
            backgroundPosition: '-200% center',
            opacity: 1,
          },
        },
        slideIn: {
          '0%': { 
            transform: 'translateY(10px)',
            opacity: 0 
          },
          '100%': { 
            transform: 'translateY(0)',
            opacity: 1 
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        retroStrobe: {
          '0%, 100%': { 
            textShadow: '2px 2px 0px #FFB6C1, -2px -2px 0px #4169E1',
            transform: 'translate(0)',
          },
          '25%': { 
            textShadow: '-2px 2px 0px #4169E1, 2px -2px 0px #FFB6C1',
            transform: 'translate(-1px, 1px)',
          },
          '50%': { 
            textShadow: '-2px -2px 0px #FFB6C1, 2px 2px 0px #4169E1',
            transform: 'translate(1px, -1px)',
          },
          '75%': { 
            textShadow: '2px -2px 0px #4169E1, -2px 2px 0px #FFB6C1',
            transform: 'translate(-1px, -1px)',
          }
        },
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'shadow': 'box-shadow, text-shadow',
      },
    },
  },
  plugins: [],
}; 