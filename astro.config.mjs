// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://vibe-coder-eja.github.io',
  base: '/sinyalai-news',
  integrations: [sitemap()],
});
