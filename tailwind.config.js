/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: [
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'monospace',
        ],
        sans: [
          '"Pretendard"',
          'system-ui',
          '-apple-system',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      colors: {
        // Editorial light tokens (CSS vars)
        bg: 'var(--bg)',
        'bg-2': 'var(--bg-2)',
        'bg-card': 'var(--bg-card)',
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        muted: 'var(--muted)',
        'muted-2': 'var(--muted-2)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
      },
      maxWidth: {
        container: '1240px',
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
      boxShadow: {
        // keep slot for any future usage
      },
    },
  },
  plugins: [],
}
