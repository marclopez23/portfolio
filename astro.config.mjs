import { defineConfig } from 'astro/config';

export default defineConfig({
  // CAMBIAR ESTAS LÍNEAS:
  site: 'https://marclopez.design',  
  base: '/',                         
  
  build: {
    assets: 'assets'
  },
  
  server: {
    port: 4321,
    host: true
  }
});