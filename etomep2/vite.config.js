import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // This specifies that the build files should be output to the 'dist' directory
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});
