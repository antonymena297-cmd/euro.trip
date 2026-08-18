import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// IMPORTANT: change "base" to match your repo name for GitHub Pages,
// e.g. if your repo is github.com/tuusuario/ruta-invernal, base must be "/ruta-invernal/"
export default defineConfig({
  base: '/ruta-invernal/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Ruta Invernal · Trip Planner',
        short_name: 'Ruta Invernal',
        description: 'Planificador de viaje y ahorro para Alemania, Chequia y Suiza',
        theme_color: '#0F1B2D',
        background_color: '#0F1B2D',
        display: 'standalone',
        start_url: '/ruta-invernal/',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ]
})
