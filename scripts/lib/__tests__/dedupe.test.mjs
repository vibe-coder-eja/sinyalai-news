import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { normalizeUrl, readSourceFromFrontmatter, loadExistingArticles } from "../dedupe.mjs";

describe("normalizeUrl", () => {
  it("treats protocol, www, trailing slash and fragment as equivalent", () => {
    const a = normalizeUrl("https://www.example.com/news/post/#section");
    const b = normalizeUrl("http://example.com/news/post");
    expect(a).toBe("example.com/news/post");
    expect(b).toBe(a);
  });

  it("strips tracking parameters but keeps meaningful ones", () => {
    expect(normalizeUrl("https://example.com/p?utm_source=rss&id=42&fbclid=x")).toBe(
      "example.com/p?id=42",
    );
  });

  it("sorts remaining query parameters", () => {
    expect(normalizeUrl("https://example.com/p?b=2&a=1")).toBe(normalizeUrl("https://example.com/p?a=1&b=2"));
  });

  it("lowercases the host but not the path", () => {
    expect(normalizeUrl("https://Example.COM/Path")).toBe("example.com/Path");
  });

  it("rejects invalid or non-web URLs", () => {
    expect(normalizeUrl("not a url")).toBeNull();
    expect(normalizeUrl("javascript:alert(1)")).toBeNull();
    expect(normalizeUrl("")).toBeNull();
    expect(normalizeUrl(undefined)).toBeNull();
  });
});

describe("readSourceFromFrontmatter", () => {
  it("reads quoted and unquoted source values", () => {
    expect(readSourceFromFrontmatter('---\ntitle: "x"\nsource: "https://a.com/1"\n---\nbody')).toBe(
      "https://a.com/1",
    );
    expect(readSourceFromFrontmatter("---\r\nsource: https://a.com/2\r\n---\r\n")).toBe("https://a.com/2");
  });

  it("ignores source lines outside front matter", () => {
    expect(readSourceFromFrontmatter("---\ntitle: x\n---\nsource: https://a.com/3")).toBeNull();
  });
});

describe("loadExistingArticles", () => {
  let dir;

  beforeAll(async () => {
    dir = await mkdtemp(path.join(tmpdir(), "sinyal-dedupe-"));
    await writeFile(
      path.join(dir, "edited-title.md"),
      '---\ntitle: "Judul sudah diedit"\nsource: "https://openai.com/index/some-launch/"\n---\n',
    );
    await writeFile(path.join(dir, "no-source.md"), "---\ntitle: x\n---\n");
    await writeFile(path.join(dir, "notes.txt"), "ignored");
  });

  afterAll(async () => {
    await rm(dir, { recursive: true, force: true });
  });

  it("collects slugs and normalized sources from Markdown files in root and subfolders", async () => {
    const subDir = path.join(dir, "2026-10-04");
    const { mkdir } = await import("node:fs/promises");
    await mkdir(subDir, { recursive: true });
    await writeFile(
      path.join(subDir, "nested-article.md"),
      '---\ntitle: "Subfolder Article"\nsource: "https://anthropic.com/news/nested"\n---\n',
    );

    const { slugs, sources } = await loadExistingArticles(dir);
    expect(slugs.has("edited-title")).toBe(true);
    expect(slugs.has("nested-article")).toBe(true);
    expect(slugs.has("2026-10-04/nested-article")).toBe(true);
    expect(sources.has(normalizeUrl("https://anthropic.com/news/nested"))).toBe(true);
  });

  it("returns empty sets for a missing directory", async () => {
    const { slugs, sources } = await loadExistingArticles(path.join(dir, "missing"));
    expect(slugs.size).toBe(0);
    expect(sources.size).toBe(0);
  });
});
