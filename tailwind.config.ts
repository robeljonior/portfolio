import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f4f0e6',
        ink: '#172d33',
        teal: { deep: '#183c43', mid: '#1f5960', line: '#31565b' },
        gold: { DEFAULT: '#d9a52f', bright: '#e6c669', dim: '#b3760e' },
        sand: '#e9e7dc',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Manrope', 'sans-serif'],
        mono: ['var(--font-mono)', 'DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
