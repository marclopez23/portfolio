import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://marclopez23.github.io',
  base: '/portfolio',
  
  build: {
    assets: 'assets'
  },
  
  server: {
    port: 4321,
    host: true
  }
});
