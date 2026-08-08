/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#c9d1d9',
            maxWidth: 'none',
            hr: { borderColor: '#30363d' },
            'h1, h2, h3, h4': {
              color: '#c9d1d9',
              fontWeight: '600',
              lineHeight: '1.25',
            },
            h1: { fontSize: '2.25rem', marginBottom: '1rem' },
            h2: { fontSize: '1.5rem', borderBottom: '1px solid #30363d', paddingBottom: '0.3rem', marginTop: '1.5rem' },
            h3: { fontSize: '1.35rem', marginTop: '1.5rem' },
            a: {
              color: '#58a6ff',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            code: {
              color: '#c9d1d9',
              backgroundColor: '#161b22',
              padding: '2px 4px',
              borderRadius: '4px',
              fontWeight: '400',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            blockquote: {
              color: '#8b949e',
              borderLeftColor: '#30363d',
            },
            ul: {
              listStyleType: 'disc',
            },
            'ul > li::marker': {
              color: '#8b949e',
            },
            li: {
              marginTop: '0.25rem',
              marginBottom: '0.25rem',
            },
            img: {
              borderRadius: '6px',
            },
          },
        },
      },
      colors: {
        github: {
          bg: {
            DEFAULT: 'rgb(var(--gh-bg) / <alpha-value>)',
            secondary: 'rgb(var(--gh-bg-secondary) / <alpha-value>)',
            tertiary: 'rgb(var(--gh-bg-tertiary) / <alpha-value>)'
          },
          border: {
            DEFAULT: 'rgb(var(--gh-border) / <alpha-value>)',
            muted: 'rgb(var(--gh-border-muted) / <alpha-value>)'
          },
          text: {
            DEFAULT: 'rgb(var(--gh-text) / <alpha-value>)',
            secondary: 'rgb(var(--gh-text-secondary) / <alpha-value>)',
            link: 'rgb(var(--gh-text-link) / <alpha-value>)'
          },
          accent: {
            DEFAULT: 'rgb(var(--gh-accent) / <alpha-value>)',
            success: 'rgb(var(--gh-accent-success) / <alpha-value>)',
            danger: 'rgb(var(--gh-accent-danger) / <alpha-value>)',
            purple: 'rgb(var(--gh-accent-purple) / <alpha-value>)'
          },
          status: {
            open: 'rgb(var(--gh-status-open) / <alpha-value>)',
            closed: 'rgb(var(--gh-status-closed) / <alpha-value>)',
            merged: 'rgb(var(--gh-status-merged) / <alpha-value>)',
            draft: 'rgb(var(--gh-status-draft) / <alpha-value>)'
          }
        },
        brand: {
          action: '#06B6D4',
          surface: 'rgb(var(--gh-bg-secondary) / <alpha-value>)',
          ai: '#8957e5'
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
