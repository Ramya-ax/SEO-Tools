import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://148.113.16.40:3014',
        changeOrigin: true,
        timeout: 300000, // 5 minutes
        proxyTimeout: 300000, // 5 minutes
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
