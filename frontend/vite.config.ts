import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // target: 'http://148.113.16.40:3014', // Production URL
        target: 'http://localhost:8000', // Development URL
        changeOrigin: true,
        timeout: 600000, // 10 minutes
        proxyTimeout: 600000, // 10 minutes
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  preview: {
    host: '0.0.0.0',                   // allow external access
    port: 3000,                        // Vite preview port
    allowedHosts: ['traffic.bdcode.in'] // add your domain here
  }
})
