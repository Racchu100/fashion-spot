import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#121212',
          soft: '#1e1e1e',
          card: '#1a1a1a',
          border: '#2a2a2a',
        },
        burgundy: {
          DEFAULT: '#6B1420',
          light: '#8B1A28',
          dark: '#4A0E16',
        },
        gold: {
          DEFAULT: '#C9A24B',
          light: '#D4B06A',
          dark: '#A07828',
        },
        ivory: {
          DEFAULT: '#F3ECE0',
          muted: '#DDD5C8',
        },
        rose: {
          DEFAULT: '#E8D5D0',
          muted: '#C4A49E',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease both',
        float: 'float 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 12s linear infinite',
        shimmer: 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        gold: '0 0 20px rgba(201, 162, 75, 0.3)',
        burgundy: '0 20px 40px rgba(107, 20, 32, 0.3)',
        card: '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
};

export default config;
