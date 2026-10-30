import { describe, it, expect } from "vitest";
import { buildCompanyOptions, filterEntries, normalizeText, type SearchEntry } from "../lib/news-search";

const entry = (overrides: Partial<SearchEntry>): SearchEntry => ({
  href: "/berita/2026-10-01/contoh",
  title: "Judul contoh",
  summary: "Ringkasan contoh.",
  company: "OpenAI",
  date: "2026-10-01",
  dateLabel: "1 Oktober 2026",
  ...overrides,
});

const entries: SearchEntry[] = [
  entry({
    href: "/berita/a",
    title: "Anthropic buka akses Claude untuk ilmuwan",
    summary: "Program baru untuk riset ilmu hayati.",
    company: "Anthropic",
  }),
  entry({
    href: "/berita/b",
    title: "NVIDIA rilis Nemotron 3.5 Super VL",
    summary: "Model multimodal untuk agen khusus.",
    company: "NVIDIA",
  }),
  entry({
    href: "/berita/c",
    title: "AWS jelaskan Claude di Amazon Bedrock",
    summary: "Dukungan structured outputs untuk model Anthropic Claude.",
    company: "AWS",
  }),
  entry({
    href: "/berita/d",
    title: "OpenAI perkuat keamanan",
    summary: "Langkah pengamanan lingkungan pelatihan.",
    company: "OpenAI",
  }),
];

describe("normalizeText", () => {
  it("lowercases, strips accents, and collapses whitespace", () => {
    expect(normalizeText("  Café   AI\tNews ")).toBe("cafe ai news");
  });
});

describe("buildCompanyOptions", () => {
  it("counts companies and sorts them alphabetically ignoring case", () => {
    const options = buildCompanyOptions(["OpenAI", "nvidia", "AWS", "OpenAI", "Anthropic", "OpenAI"]);
    expect(options).toEqual([
      { name: "Anthropic", count: 1 },
      { name: "AWS", count: 1 },
      { name: "nvidia", count: 1 },
      { name: "OpenAI", count: 3 },
    ]);
  });

  it("returns an empty list when there are no companies", () => {
    expect(buildCompanyOptions([])).toEqual([]);
  });
});

describe("filterEntries", () => {
  it("returns everything when query and company are empty", () => {
    expect(filterEntries(entries, { query: "", company: "" })).toHaveLength(4);
    expect(filterEntries(entries, { query: "   ", company: "" })).toHaveLength(4);
  });

  it("matches keywords in title, summary, and company name, case-insensitively", () => {
    const byTitle = filterEntries(entries, { query: "nemotron", company: "" });
    expect(byTitle.map((e) => e.href)).toEqual(["/berita/b"]);

    const bySummary = filterEntries(entries, { query: "STRUCTURED OUTPUTS", company: "" });
    expect(bySummary.map((e) => e.href)).toEqual(["/berita/c"]);

    const byCompany = filterEntries(entries, { query: "openai", company: "" });
    expect(byCompany.map((e) => e.href)).toEqual(["/berita/d"]);
  });

  it("requires every keyword to match (AND) and ignores word order", () => {
    expect(filterEntries(entries, { query: "claude anthropic", company: "" }).map((e) => e.href)).toEqual([
      "/berita/a",
      "/berita/c",
    ]);
    expect(filterEntries(entries, { query: "ilmuwan nvidia", company: "" })).toEqual([]);
    expect(filterEntries(entries, { query: "anthropic claude", company: "" })).toHaveLength(2);
  });

  it("filters by exact company", () => {
    expect(filterEntries(entries, { query: "", company: "NVIDIA" }).map((e) => e.href)).toEqual(["/berita/b"]);
    expect(filterEntries(entries, { query: "", company: "Nvidia" })).toEqual([]);
  });

  it("combines keyword and company filters", () => {
    expect(filterEntries(entries, { query: "claude", company: "AWS" }).map((e) => e.href)).toEqual(["/berita/c"]);
    expect(filterEntries(entries, { query: "claude", company: "NVIDIA" })).toEqual([]);
  });

  it("preserves the original (newest-first) order", () => {
    const result = filterEntries(entries, { query: "claude", company: "" });
    expect(result.map((e) => e.href)).toEqual(["/berita/a", "/berita/c"]);
  });
});
