import { defineConfig } from 'astro/config';

export default defineConfig({
  // Configuración para GitHub Pages
  site: 'https://marclopez23.github.io',
  base: '/portfolio',
  
  // Configuración para optimizar la build
  build: {
    assets: 'assets'
  },
  
  // Configuración para desarrollo
  server: {
    port: 4321,
    host: true
  }
});