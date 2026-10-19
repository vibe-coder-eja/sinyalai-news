import { describe, it, expect, vi } from "vitest";
import { selectActiveSources, fetchSourceItems } from "../sources.mjs";

describe("selectActiveSources", () => {
  const sources = [
    { id: "a", type: "rss", enabled: true },
    { id: "b", type: "html", enabled: true },
    { id: "c", type: "page", enabled: true },
    { id: "d", type: "rss", enabled: false },
    { id: "e" },
    { id: "f", type: "updates", enabled: true },
  ];

  it("keeps rss, html, and updates sources, and treats a missing type as rss", () => {
    const { active } = selectActiveSources(sources);
    expect(active.map((s) => s.id)).toEqual(["a", "b", "e", "f"]);
  });

  it("reports why the others were skipped", () => {
    const { skipped } = selectActiveSources(sources);
    expect(skipped.map((s) => s.source.id)).toEqual(["c", "d"]);
    expect(skipped[0].reason).toMatch(/page/);
    expect(skipped[1].reason).toMatch(/enabled: false/);
  });
});

describe("fetchSourceItems", () => {
  it("routes html sources to the HTML listing parser and the rest to the feed parser", async () => {
    const fetchFeed = vi.fn().mockResolvedValue(["feed"]);
    const fetchHtmlListing = vi.fn().mockResolvedValue(["html"]);
    expect(await fetchSourceItems({ type: "html", url: "https://a.example/news" }, { fetchFeed, fetchHtmlListing }, 5)).toEqual(["html"]);
    expect(await fetchSourceItems({ type: "rss", url: "https://b.example/feed" }, { fetchFeed, fetchHtmlListing }, 5)).toEqual(["feed"]);
    expect(await fetchSourceItems({ url: "https://c.example/feed" }, { fetchFeed, fetchHtmlListing })).toEqual(["feed"]);
    expect(fetchHtmlListing).toHaveBeenCalledWith("https://a.example/news", 5);
    expect(fetchFeed).toHaveBeenCalledTimes(2);
  });

  it("routes updates sources to the release-notes parser", async () => {
    const fetchFeed = vi.fn();
    const fetchHtmlListing = vi.fn();
    const fetchUpdates = vi.fn().mockResolvedValue(["updates"]);
    const fetchers = { fetchFeed, fetchHtmlListing, fetchUpdates };
    expect(await fetchSourceItems({ type: "updates", url: "https://d.example/notes.md" }, fetchers, 7)).toEqual(["updates"]);
    expect(fetchUpdates).toHaveBeenCalledWith("https://d.example/notes.md", 7);
    expect(fetchFeed).not.toHaveBeenCalled();
    expect(fetchHtmlListing).not.toHaveBeenCalled();
  });
});
