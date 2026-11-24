import type { Config } from 'tailwindcss';

const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Theme colours come from CSS variables (globals.css), so light/dark is one switch.
        ground: v('ground'),
        panel: v('panel'),
        raised: v('raised'),
        rule: v('rule'),
        'rule-strong': v('rule-strong'),
        ink: v('ink'),
        muted: v('muted'),
        faint: v('faint'),
        /** Overlay tint: white on dark, black on light. */
        veil: v('veil'),
        mint: v('mint'),
        /** Backwards-compatible alias for the old secondary accent. */
        gold: v('gold'),
        /** Text on lime controls. */
        onaccent: v('onaccent'),
        lcd: v('lcd'),
        error: v('error'),
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Arial', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        display: ['var(--font-display)', 'Arial Narrow', 'sans-serif'],
      },
      maxWidth: { page: '1180px' },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
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
