import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { withBase } from "../lib/url";

describe("withBase", () => {
  const originalBase = import.meta.env.BASE_URL;

  afterEach(() => {
    // @ts-expect-error test cleanup
    import.meta.env.BASE_URL = originalBase;
  });

  it("handles empty or root path when BASE_URL is default '/'", () => {
    // @ts-expect-error override for test
    import.meta.env.BASE_URL = "/";
    expect(withBase("/")).toBe("/");
    expect(withBase("")).toBe("/");
  });

  it("prepends root path properly when BASE_URL is default '/'", () => {
    // @ts-expect-error override for test
    import.meta.env.BASE_URL = "/";
    expect(withBase("/berita")).toBe("/berita");
    expect(withBase("berita")).toBe("/berita");
    expect(withBase("/rss.xml")).toBe("/rss.xml");
  });

  it("handles subpath properly when BASE_URL is '/sinyalai-news/'", () => {
    // @ts-expect-error override for test
    import.meta.env.BASE_URL = "/sinyalai-news/";
    expect(withBase("/")).toBe("/sinyalai-news/");
    expect(withBase("")).toBe("/sinyalai-news/");
    expect(withBase("/berita")).toBe("/sinyalai-news/berita");
    expect(withBase("berita")).toBe("/sinyalai-news/berita");
    expect(withBase("/berita/grok")).toBe("/sinyalai-news/berita/grok");
    expect(withBase("/favicon.svg")).toBe("/sinyalai-news/favicon.svg");
  });

  it("handles subpath without trailing slash when BASE_URL is '/sinyalai-news'", () => {
    // @ts-expect-error override for test
    import.meta.env.BASE_URL = "/sinyalai-news";
    expect(withBase("/")).toBe("/sinyalai-news/");
    expect(withBase("/tentang")).toBe("/sinyalai-news/tentang");
  });
});
