/**
 * Vite build configuration for the portfolio.
 * Beyond the defaults it does two jobs: pin the deploy base path, and split
 * heavy third-party code into its own chunks.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Root-relative asset URLs, which is what Vercel and Netlify serve from.
  // On GitHub Pages this would have to become '/<repo-name>/', since that serves from a subpath.
  base: '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // GSAP and the React runtime change far less often than application code, so
        // separate chunks let a returning visitor reuse them from cache after an app-only
        // redeploy. It also keeps the application entry chunk small.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // GSAP plus ScrollTrigger is the largest dependency here and is used by nearly
            // every section, so it is isolated instead of inlined alongside app code.
            if (id.includes('gsap')) {
              return 'gsap'
            }
            // Catches react, react-dom, react-router-dom and lucide-react. The 'react'
            // test already matches 'lucide-react', so the second half is redundant but
            // harmless — kept for explicitness.
            if (id.includes('react') || id.includes('lucide-react')) {
              return 'vendor'
            }
          }
          // Falling through returns undefined on purpose: Vite's default chunking stays
          // in charge of every remaining module.
        }
      }
    }
  }
})
