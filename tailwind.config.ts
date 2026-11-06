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
        gold: { DEFAULT: v('gold'), dim: v('gold-dim') },
        /** Text on accent buttons: dark on gold at night, white on black by day. */
        onaccent: v('onaccent'),
        lcd: { DEFAULT: v('lcd'), ground: '#1c2410', ink: '#d9ec9c' },
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
