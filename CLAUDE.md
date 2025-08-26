# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

All commands are run from the root directory:

- `npm run dev` - Start local development server at `localhost:4321`
- `npm run build` - Build production site to `./dist/`
- `npm run preview` - Preview production build locally
- `npm run astro` - Run Astro CLI commands

## Architecture

This is an Astro-based portfolio website with the following structure:

### Core Framework
- **Astro 5.13.3** - Static site generator with component islands
- **TypeScript** - Uses strict configuration extending `astro/tsconfigs/strict`
- **ESM** - Module type project with modern ES modules

### Directory Structure
- `src/layouts/` - Page layouts (Layout.astro provides base HTML structure)
- `src/pages/` - File-based routing (index.astro is the homepage)
- `src/components/` - Reusable Astro components
- `src/assets/` - Static assets (images, SVGs)
- `public/` - Static files served directly
- `dist/` - Build output directory (excluded from TypeScript)

### Component Architecture
- **Layout.astro** - Base HTML layout with meta tags, viewport, and global styles
- **Welcome.astro** - Main landing page component with hero section and styling
- **index.astro** - Homepage that imports and renders the Welcome component within Layout

### Styling Approach
- Component-scoped CSS using Astro's `<style>` blocks
- Global reset styles in Layout.astro
- Responsive design with mobile-first approach
- CSS custom properties and modern features (backdrop-filter, gradients)