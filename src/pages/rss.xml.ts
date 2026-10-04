import rss from '@astrojs/rss';
import { getPublishedNews } from '../lib/news';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const news = await getPublishedNews();
  const siteUrl = context.site
    ? new URL(import.meta.env.BASE_URL, context.site).toString()
    : 'https://vibe-coder-eja.github.io/sinyalai-news/';

  const baseSubpath = (import.meta.env.BASE_URL ?? '/').replace(/^\/+|\/+$/g, '');
  const itemPrefix = baseSubpath ? `${baseSubpath}/` : '';

  return rss({
    title: 'Sinyal AI News',
    description: 'Berita Terkini Dunia AI (Akal Imitasi) — Ringkasan berita AI resmi dari industri teknologi.',
    site: siteUrl,
    items: news.map((item) => ({
      title: item.data.title,
      pubDate: item.data.publishedAt,
      description: item.data.summary,
      link: `${itemPrefix}berita/${item.id}/`,
    })),
    customData: `<language>id-id</language>`,
  });
};
