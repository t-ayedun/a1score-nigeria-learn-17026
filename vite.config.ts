import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],

          // UI framework (Radix UI components)
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-label',
            '@radix-ui/react-popover',
            '@radix-ui/react-progress',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-separator',
            '@radix-ui/react-slider',
            '@radix-ui/react-switch',
          ],

          // Charts and animations
          'charts-vendor': ['recharts', 'framer-motion'],

          // i18n
          'i18n-vendor': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],

          // Supabase and backend
          'supabase-vendor': ['@supabase/supabase-js', '@tanstack/react-query'],

          // Forms and validation
          'forms-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],

          // Icons
          'icons-vendor': ['lucide-react'],

          // Utilities
          'utils-vendor': ['date-fns', 'clsx', 'class-variance-authority', 'tailwind-merge'],
        },
      },
    },
    // Increase chunk size warning limit (we're code-splitting now)
    chunkSizeWarningLimit: 1000,
    // Enable source maps for production debugging (optional, increases build size)
    sourcemap: false,
  },
}));
