import { getCollection, type CollectionEntry } from "astro:content";

export type NewsEntry = CollectionEntry<"news">;

export async function getPublishedNews(): Promise<NewsEntry[]> {
  const entries = await getCollection("news", ({ data }) => data.draft !== true);
  return entries.sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );
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
