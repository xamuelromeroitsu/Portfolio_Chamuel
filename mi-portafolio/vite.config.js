import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite sirve la aplicación React durante el desarrollo.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist'
  }
});
