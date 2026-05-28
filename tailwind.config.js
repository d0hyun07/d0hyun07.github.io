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
          '"Noto Sans KR"',
          'system-ui',
          '-apple-system',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      colors: {
        // 디자인 시스템 색상 — CSS 변수를 Tailwind 유틸리티로 노출.
        // 충돌 방지를 위해 'border' 키는 매핑하지 않고, 필요 시 bg-[var(--color-border)] 형태로 사용.
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-2': 'var(--color-surface-2)',
        primary: 'var(--color-primary)',
        'primary-dim': 'var(--color-primary-dim)',
        secondary: 'var(--color-secondary)',
        'text-base': 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        'text-dim': 'var(--color-text-dim)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
      },
      maxWidth: {
        container: '1200px',
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(0, 212, 255, 0.25)',
      },
    },
  },
  plugins: [],
}
