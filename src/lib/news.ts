import { getCollection, type CollectionEntry } from "astro:content";

export type NewsEntry = CollectionEntry<"news">;

export async function getPublishedNews(): Promise<NewsEntry[]> {
  const entries = await getCollection("news", ({ data }) => data.draft !== true);
  return entries.sort((a, b) => {
    // 1. Urutkan berdasarkan waktu rilis (tanggal, hari, jam) descending (terbaru lebih dulu)
    const timeDiff = b.data.publishedAt.getTime() - a.data.publishedAt.getTime();
    if (timeDiff !== 0) {
      return timeDiff;
    }
    // 2. Jika waktu rilis sama: urutkan secara alfabetis berdasarkan judul berita (A-Z)
    return a.data.title.localeCompare(b.data.title, "id-ID", { sensitivity: "base" });
  });
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
