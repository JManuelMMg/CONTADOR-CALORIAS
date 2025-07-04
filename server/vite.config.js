import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3001,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: false,
    target: 'esnext',
  },
})
