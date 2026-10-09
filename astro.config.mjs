// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import legacyRedirects from './src/data/legacy-redirects.json' with { type: 'json' };

// https://astro.build/config
export default defineConfig({
  site: 'https://sinyalai.xyz',
  base: '/',
  // URL lama (sumber-judul) dialihkan ke URL baru (judul saja).
  redirects: legacyRedirects,
  integrations: [sitemap()],
});
