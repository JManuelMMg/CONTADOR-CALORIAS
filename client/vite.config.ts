import tailwindcss from '@tailwindcss/vite'
import reactSWC from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactSWC(),
    tailwindcss(),
  ],
  server: {
    host: true,
    port: 3000,
    // Configuración del proxy para las llamadas a la API
    proxy: {
      '/api': {
        target: 'http://server:3001',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  // Optimizaciones para el build
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    // Configuración de terser para la minificación
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
})
