import type { APIRoute } from "astro";
import { formatDate, getPublishedNews, toIsoDate } from "../../lib/news";
import type { SearchEntry } from "../../lib/news-search";
import { withBase } from "../../lib/url";

/**
 * Indeks pencarian statis untuk halaman /berita. Dimuat skrip klien saat pembaca
 * pertama kali mencari atau memilih perusahaan, bukan di setiap halaman.
 */
export const GET: APIRoute = async () => {
  const articles = await getPublishedNews();
  const entries: SearchEntry[] = articles.map((article) => ({
    href: withBase(`/berita/${article.id}`),
    title: article.data.title,
    summary: article.data.summary,
    company: article.data.company,
    date: toIsoDate(article.data.publishedAt),
    dateLabel: formatDate(article.data.publishedAt),
  }));

  return new Response(JSON.stringify(entries), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
