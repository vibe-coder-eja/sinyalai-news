import { describe, it, expect } from "vitest";
import { yamlQuote, toIsoDate, buildDraftBody, writeDraftArticle } from "../markdown.mjs";

describe("yamlQuote", () => {
  it("escapes backslash and double quotes", () => {
    expect(yamlQuote('Hello "World" \\')).toBe('Hello \\"World\\" \\\\');
  });

  it("replaces newlines with spaces", () => {
    expect(yamlQuote("Line1\nLine2\r\nLine3")).toBe("Line1 Line2 Line3");
  });

  it("replaces tabs with spaces", () => {
    expect(yamlQuote("Word1\tWord2")).toBe("Word1 Word2");
  });

  it("strips control characters", () => {
    expect(yamlQuote("Hello\x00World")).toBe("HelloWorld");
  });

  it("handles non-string types gracefully", () => {
    expect(yamlQuote(null)).toBe("");
    expect(yamlQuote(undefined)).toBe("");
  });
});

describe("toIsoDate", () => {
  it("returns standard YYYY-MM-DD format", () => {
    const d = new Date("2026-07-15T12:00:00.000Z");
    expect(toIsoDate(d)).toBe("2026-07-15");
  });

  it("handles invalid date fallback", () => {
    expect(toIsoDate(new Date("invalid"))).toBe(new Date().toISOString().slice(0, 10));
    expect(toIsoDate(null)).toBe(new Date().toISOString().slice(0, 10));
  });
});

describe("buildDraftBody", () => {
  it("generates markdown layout with link", () => {
    const item = {
      title: "Title",
      summary: "Summary",
      company: "Company",
      link: "https://example.com/news"
    };
    const body = buildDraftBody(item);
    expect(body).toContain("Company merilis pembaruan terkait: **Title**");
    expect(body).toContain("Summary");
    expect(body).toContain("[Buka pengumuman resmi](https://example.com/news)");
  });

  it("sanitizes insecure link protocols to #", () => {
    const item = {
      title: "Title",
      summary: "Summary",
      company: "Company",
      link: "javascript:alert(1)"
    };
    const body = buildDraftBody(item);
    expect(body).toContain("[Buka pengumuman resmi](#)");
  });

  it("rejects plain HTTP links", () => {
    const body = buildDraftBody({
      title: "Title",
      summary: "Summary",
      company: "Company",
      link: "http://example.com/news"
    });
    expect(body).toContain("[Buka pengumuman resmi](#)");
  });

  it("flags drafts whose feed item had no publish date", () => {
    const base = { title: "T", summary: "S", company: "C", link: "https://example.com/n" };
    expect(buildDraftBody({ ...base, dateMissing: true })).toContain("Feed tidak menyertakan tanggal terbit");
    expect(buildDraftBody(base)).not.toContain("Feed tidak menyertakan tanggal terbit");
  });
});

describe("writeDraftArticle", () => {
  it("returns rendered markdown in dry-run mode", async () => {
    const params = {
      templateContent: "---\ntitle: \"{{title}}\"\nsummary: \"{{summary}}\"\ncompany: \"{{company}}\"\nsource: \"{{source}}\"\npublishedAt: {{publishedAt}}\ndraft: true\n---\n\n{{body}}",
      templatePath: "dummy",
      outDir: "dummy",
      slug: "test-article",
      title: "API Update",
      summary: "This is a summary of the API update.",
      company: "OpenAI",
      source: "https://openai.com/blog",
      publishedAt: new Date("2026-07-15"),
      body: "Test content body",
      dryRun: true
    };
    const result = await writeDraftArticle(params);
    expect(result.written).toBe(false);
    expect(result.markdown).toContain('title: "API Update"');
    expect(result.markdown).toContain('summary: "This is a summary of the API update."');
    expect(result.markdown).toContain('company: "OpenAI"');
    expect(result.markdown).toContain('source: "https://openai.com/blog"');
    expect(result.markdown).toContain('publishedAt: 2026-07-15');
    expect(result.markdown).toContain('Test content body');
  });

  it("rejects an insecure source before writing", async () => {
    await expect(writeDraftArticle({
      templateContent: "{{source}}",
      templatePath: "dummy",
      outDir: "dummy",
      slug: "test-article",
      title: "Title",
      summary: "Summary",
      company: "Company",
      source: "http://example.com/news",
      publishedAt: new Date("2026-07-15"),
      body: "Body",
      dryRun: true
    })).rejects.toThrow("Article source URL must use HTTPS");
  });
});

describe("writePublishedArticle", () => {
  it("formats published frontmatter with RSAIN author and draft: false", async () => {
    const { writePublishedArticle } = await import("../markdown.mjs");
    const result = await writePublishedArticle({
      outDir: "dummy",
      slug: "rsain-news",
      title: "Grok 3 Rilis Resmi",
      summary: "xAI merilis model penalaran Grok 3.",
      company: "xAI",
      source: "https://x.ai/blog/grok-3",
      publishedAt: new Date("2026-10-04T12:00:00Z"),
      body: "Paragraf berita resmi.",
      dryRun: true,
    });

    expect(result.written).toBe(false);
    expect(result.markdown).toContain('title: "Grok 3 Rilis Resmi"');
    expect(result.markdown).toContain('author: "Redaktur Sinyal AI News (RSAIN)"');
    expect(result.markdown).toContain("draft: false");
    expect(result.markdown).toContain("Paragraf berita resmi.");
  });
});

