import rss from '@astrojs/rss';
import { getPublishedNews } from '../lib/news';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const news = await getPublishedNews();
  return rss({
    title: 'Sinyal AI',
    description: 'Sinyal Akal Imitasi — Ringkasan berita AI resmi dari industri teknologi.',
    site: context.site || 'https://sinyalai.vercel.app',
    items: news.map((item) => ({
      title: item.data.title,
      pubDate: item.data.publishedAt,
      description: item.data.summary,
      link: `/berita/${item.id}/`,
    })),
    customData: `<language>id-id</language>`,
  });
};
