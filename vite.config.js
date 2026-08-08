import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * SECURITY posture for this config:
 *
 *  1. `server.host: '127.0.0.1'`
 *     The dev server binds only to loopback. Anyone on the same Wi-Fi could
 *     otherwise hit our LAN IP, fetch /gitme/src/App.jsx, and grep out the
 *     inlined `VITE_GITHUB_TOKEN` / `VITE_OPENROUTER_API_KEY`. Explicitly
 *     opt in with `HOST=0.0.0.0 npm run dev` when you actually need LAN
 *     access (mobile testing), and only over a network you trust.
 *
 *  2. `server.strictPort: true`
 *     If port 3000 is in use, fail loudly instead of silently binding a
 *     different port that might not be firewalled.
 *
 *  3. `server.fs.strict: true` + `server.fs.deny`
 *     Vite already blocks `.env` / dotfiles, but we widen the deny list to
 *     also cover project docs an attacker with LAN access would use for
 *     reconnaissance (llm.txt, README, package.json, scripts/**).
 */
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this as a project page under /portfolio.dev/, so the
  // Pages workflow sets VITE_BASE_PATH explicitly. Vercel serves from the
  // domain root, so the default here is '/'.
  base: process.env.VITE_BASE_PATH || '/',
  server: {
    port: 3000,
    open: true,
    strictPort: true,
    host: process.env.HOST || '127.0.0.1',
    watch: {
      usePolling: true,
    },
    fs: {
      strict: true,
      // Wildcards are picomatch — anywhere in the served tree.
      deny: [
        '.env',
        '.env.*',
        '**/.env',
        '**/.env.*',
        'llm.txt',
        '**/llm.txt',
        'README.md',
        '**/README.md',
        'CODE_OF_CONDUCT.md',
        '**/CODE_OF_CONDUCT.md',
        'CONTRIBUTING.md',
        '**/CONTRIBUTING.md',
        'LICENSE',
        '**/LICENSE',
        'SECURITY.md',
        '**/SECURITY.md',
        'scripts/**',
        '**/scripts/**',
        '.github/**',
        '**/.github/**',
        'package.json',
        '**/package.json',
        'package-lock.json',
        '**/package-lock.json',
        'vite.config.*',
        '**/vite.config.*',
        'tailwind.config.*',
        '**/tailwind.config.*',
        'postcss.config.*',
        '**/postcss.config.*',
        // NB: userConfig.js is NOT denied — it's an ES module the app
        // imports at runtime. In dev, it's still exposed via loopback
        // only (server.host). In production, its PII fields are baked
        // into the bundle regardless, so denying wouldn't help.
      ],
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'markdown': ['react-markdown', 'remark-gfm', 'rehype-raw'],
          'lucide': ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
})
