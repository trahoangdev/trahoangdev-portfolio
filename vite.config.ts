import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split vendor chunks for better caching
          if (id.includes('node_modules')) {
            // React and React DOM must be in the same chunk to avoid context issues
            if (id.includes('react/') || id.includes('react-dom/') || id.includes('scheduler/')) {
              return 'vendor-react';
            }
            // Radix UI components
            if (id.includes('@radix-ui')) {
              return 'vendor-radix';
            }
            // Other large libraries
            if (id.includes('@tanstack') || id.includes('react-query')) {
              return 'vendor-query';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            // All other node_modules
            return 'vendor';
          }
        },
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      },
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    },
  },
}));
