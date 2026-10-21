import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite sirve el cliente en 5173 y reenvía /api al servidor Express durante desarrollo.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        // Si cambia el puerto de Express, actualiza esta URL.
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist'
  }
});
