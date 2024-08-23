import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all addresses
    port: 5173,      // Default port
  },
  build: {
    outDir: 'vite-build'  // Set your desired output directory here
  }
})
