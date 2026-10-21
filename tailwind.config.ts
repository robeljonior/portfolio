import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ground: '#0a0d0d',
        panel: '#0f1414',
        raised: '#141b1b',
        rule: '#1f2929',
        'rule-strong': '#2c3a3a',
        ink: '#e9ece8',
        muted: '#97a3a0',
        faint: '#6b7774',
        gold: { DEFAULT: '#e6c669', dim: '#b8952e' },
        lcd: { DEFAULT: '#b9d27a', ground: '#1c2410', ink: '#d9ec9c' },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: { column: '760px' },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        blink: { '50%': { opacity: '0' } },
        pulse: { '0%,100%': { opacity: '1' }, '50%': { opacity: '.35' } },
      },
      animation: {
        rise: 'rise 500ms cubic-bezier(0.23, 1, 0.32, 1) both',
        blink: 'blink 1s steps(1) infinite',
        pulse: 'pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
