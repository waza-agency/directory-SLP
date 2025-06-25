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
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'serif': ['Crimson Pro', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        'display': ['Crimson Pro', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#FFCB05', // Bright yellow/gold
          dark: '#E6B800',
          light: '#FFD633',
          50: '#FFFEF0',
          100: '#FFFACC',
          200: '#FFF599',
          300: '#FFED66',
          400: '#FFE033',
          500: '#FFCB05',
          600: '#E6B800',
          700: '#CC9900',
          800: '#B37A00',
          900: '#996600',
        },
        secondary: {
          DEFAULT: '#00007A',  // Deep royal blue
          light: '#0000B3',
          50: '#F0F0FF',
          100: '#E0E0FF',
          200: '#C7C7FF',
          300: '#A3A3FF',
          400: '#7A7AFF',
          500: '#5050FF',
          600: '#0000B3',
          700: '#00007A',
          800: '#000066',
          900: '#000052',
        },
        background: {
          DEFAULT: '#FAFBFC',
          alt: '#F4F6F8',
          paper: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#FFCB05',  // Same as primary for consistency
        },
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1.1' }],
        '9xl': ['8rem', { lineHeight: '1.1' }],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      boxShadow: {
        'elegant': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.06)',
        'button': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'button-hover': '0 4px 8px rgba(0, 0, 0, 0.15)',
        'inner-light': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shine': 'shine 2s linear infinite',
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'retro-strobe': 'retroStrobe 4s linear infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
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
        slideUp: {
          '0%': {
            transform: 'translateY(20px)',
            opacity: 0
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1
          },
        },
        scaleIn: {
          '0%': {
            transform: 'scale(0.95)',
            opacity: 0
          },
          '100%': {
            transform: 'scale(1)',
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
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
};