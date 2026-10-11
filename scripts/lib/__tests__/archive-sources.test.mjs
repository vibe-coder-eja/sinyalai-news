import path from "node:path";
import { describe, it, expect } from "vitest";
import { loadExistingArticles, normalizeUrl } from "../dedupe.mjs";

describe("arsip berita", () => {
  it("tidak ada dua artikel tayang dengan URL sumber yang sama", async () => {
    const { entries } = await loadExistingArticles(path.resolve(process.cwd(), "src/content/news"));
    const bySource = new Map();
    for (const e of entries) {
      if (e.draft || e.archived) continue;
      const key = normalizeUrl(e.source);
      if (!key) continue;
      bySource.set(key, [...(bySource.get(key) || []), e.slug]);
    }
    const dupes = [...bySource.entries()].filter(([, slugs]) => slugs.length > 1);
    expect(dupes).toEqual([]);
  });
});
