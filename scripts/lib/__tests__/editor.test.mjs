import { describe, it, expect } from "vitest";
import { isFreshEnough, isToday, sortCandidatesByPriority, selectEditorialEdition } from "../editor.mjs";

describe("isToday", () => {
  it("detects same ISO calendar date as today", () => {
    const ref = new Date("2026-10-04T10:30:00Z");
    const d = new Date("2026-10-04T02:00:00Z");
    expect(isToday(d, ref)).toBe(true);
  });

  it("handles 24h timezone shift as today", () => {
    const ref = new Date("2026-10-04T03:30:00Z"); // Pagi WIB
    const releaseNightBefore = new Date("2026-10-03T21:00:00Z"); // 6.5 hours earlier in US
    expect(isToday(releaseNightBefore, ref)).toBe(true);
  });

  it("identifies older dates as not today", () => {
    const ref = new Date("2026-10-04T10:30:00Z");
    const d = new Date("2026-10-01T10:00:00Z");
    expect(isToday(d, ref)).toBe(false);
  });

  it("handles null or invalid dates gracefully", () => {
    expect(isToday(null)).toBe(false);
    expect(isToday(new Date("invalid"))).toBe(false);
  });
});

describe("sortCandidatesByPriority", () => {
  it("sorts by priorityScore descending, then by date descending", () => {
    const items = [
      { item: { publishedAt: new Date("2026-10-04T05:00:00Z") }, priority: { priorityScore: 10 } },
      { item: { publishedAt: new Date("2026-10-04T08:00:00Z") }, priority: { priorityScore: 50 } },
      { item: { publishedAt: new Date("2026-10-04T07:00:00Z") }, priority: { priorityScore: 40 } },
      { item: { publishedAt: new Date("2026-10-04T06:00:00Z") }, priority: { priorityScore: 40 } },
    ];

    const sorted = sortCandidatesByPriority(items);
    expect(sorted[0].priority.priorityScore).toBe(50);
    expect(sorted[1].priority.priorityScore).toBe(40);
    expect(sorted[1].item.publishedAt.toISOString()).toBe("2026-10-04T07:00:00.000Z");
    expect(sorted[2].item.publishedAt.toISOString()).toBe("2026-10-04T06:00:00.000Z");
    expect(sorted[3].priority.priorityScore).toBe(10);
  });
});

describe("selectEditorialEdition", () => {
  const refDate = new Date("2026-10-04T10:30:00Z");

  it("selects exactly 3 articles when today has sufficient candidates", () => {
    const candidates = [
      {
        source: { company: "OpenAI" },
        item: { link: "https://openai.com/1", title: "GPT-6 Release", publishedAt: new Date("2026-10-04T08:00:00Z") },
        priority: { priorityScore: 50, categories: ["Rilis Model"] },
      },
      {
        source: { company: "Anthropic" },
        item: { link: "https://anthropic.com/2", title: "Claude Skills", publishedAt: new Date("2026-10-04T07:30:00Z") },
        priority: { priorityScore: 45, categories: ["Fitur & Skills"] },
      },
      {
        source: { company: "Meta" },
        item: { link: "https://meta.com/3", title: "SAM Audio Model", publishedAt: new Date("2026-10-04T07:00:00Z") },
        priority: { priorityScore: 50, categories: ["Rilis Model"] },
      },
      {
        source: { company: "Google" },
        item: { link: "https://google.com/4", title: "General Update", publishedAt: new Date("2026-10-04T06:00:00Z") },
        priority: { priorityScore: 10, categories: ["Standar Publikasi"] },
      },
    ];

    const selected = selectEditorialEdition({
      allFeedItems: candidates,
      existingUrls: new Set(),
      limit: 3,
      referenceDate: refDate,
    });

    expect(selected.length).toBe(3);
    // Should choose the two score 50 and one score 45
    expect(selected.map((s) => s.source.company)).toEqual(["OpenAI", "Meta", "Anthropic"]);
  });

  it("falls back to previous day backlog if today has fewer than 3 releases", () => {
    const candidates = [
      {
        source: { company: "OpenAI" },
        item: { link: "https://openai.com/today-1", title: "Today 1", publishedAt: new Date("2026-10-04T08:00:00Z") },
        priority: { priorityScore: 50, categories: ["Rilis Model"] },
      },
      // Previous days (unreleased backlog)
      {
        source: { company: "Anthropic" },
        item: { link: "https://anthropic.com/prev-1", title: "Prev 1", publishedAt: new Date("2026-10-03T12:00:00Z") },
        priority: { priorityScore: 45, categories: ["Fitur & Skills"] },
      },
      {
        source: { company: "xAI" },
        item: { link: "https://x.ai/prev-2", title: "Prev 2", publishedAt: new Date("2026-10-02T12:00:00Z") },
        priority: { priorityScore: 40, categories: ["Produk Baru"] },
      },
      {
        source: { company: "Google" },
        item: { link: "https://google.com/prev-3", title: "Prev 3", publishedAt: new Date("2026-10-01T12:00:00Z") },
        priority: { priorityScore: 10, categories: ["Standar Publikasi"] },
      },
    ];

    const selected = selectEditorialEdition({
      allFeedItems: candidates,
      existingUrls: new Set(),
      limit: 3,
      referenceDate: refDate,
    });

    expect(selected.length).toBe(3);
    expect(selected[0].item.title).toBe("Today 1");
    expect(selected[1].item.title).toBe("Prev 1");
    expect(selected[2].item.title).toBe("Prev 2");
  });

  it("filters out existing published URLs (anti-duplication)", () => {
    const existingUrls = new Set(["openai.com/already-published"]);

    const candidates = [
      {
        source: { company: "OpenAI" },
        item: { link: "https://openai.com/already-published", title: "Dup", publishedAt: new Date("2026-10-04T08:00:00Z") },
        priority: { priorityScore: 50 },
      },
      {
        source: { company: "Meta" },
        item: { link: "https://meta.com/fresh-release", title: "Fresh", publishedAt: new Date("2026-10-04T08:00:00Z") },
        priority: { priorityScore: 45 },
      },
    ];

    const selected = selectEditorialEdition({
      allFeedItems: candidates,
      existingUrls,
      limit: 3,
      referenceDate: refDate,
    });

    expect(selected.length).toBe(1);
    expect(selected[0].source.company).toBe("Meta");
  });

  it("diversifies companies before taking a second article from the same company", () => {
    const candidates = [
      {
        source: { company: "OpenAI" },
        item: { link: "https://openai.com/1", title: "OpenAI 1", publishedAt: new Date("2026-10-04T08:00:00Z") },
        priority: { priorityScore: 50 },
      },
      {
        source: { company: "OpenAI" },
        item: { link: "https://openai.com/2", title: "OpenAI 2", publishedAt: new Date("2026-10-04T07:00:00Z") },
        priority: { priorityScore: 45 },
      },
      {
        source: { company: "Anthropic" },
        item: { link: "https://anthropic.com/1", title: "Anthropic 1", publishedAt: new Date("2026-10-04T06:00:00Z") },
        priority: { priorityScore: 40 },
      },
      {
        source: { company: "Google" },
        item: { link: "https://google.com/1", title: "Google 1", publishedAt: new Date("2026-10-04T05:00:00Z") },
        priority: { priorityScore: 40 },
      },
    ];

    const selected = selectEditorialEdition({
      allFeedItems: candidates,
      existingUrls: new Set(),
      limit: 3,
      referenceDate: refDate,
    });

    expect(selected.length).toBe(3);
    const companies = selected.map((s) => s.source.company);
    expect(companies).toContain("OpenAI");
    expect(companies).toContain("Anthropic");
    expect(companies).toContain("Google");
  });
});

describe("isFreshEnough", () => {
  const ref = new Date("2026-10-07T03:35:00Z");

  it("accepts releases within 7 days", () => {
    expect(isFreshEnough(new Date("2026-10-01T03:36:00Z"), ref)).toBe(true);
  });

  it("rejects releases older than 7 days", () => {
    expect(isFreshEnough(new Date("2026-09-30T03:34:00Z"), ref)).toBe(false);
  });

  it("rejects missing or invalid dates", () => {
    expect(isFreshEnough(null, ref)).toBe(false);
    expect(isFreshEnough(undefined, ref)).toBe(false);
    expect(isFreshEnough(new Date("invalid"), ref)).toBe(false);
  });

  it("rejects dates far in the future but tolerates small timezone skew", () => {
    expect(isFreshEnough(new Date("2026-10-07T20:00:00Z"), ref)).toBe(true);
    expect(isFreshEnough(new Date("2026-10-10T03:35:00Z"), ref)).toBe(false);
  });

  it("honours a custom maxAgeDays", () => {
    expect(isFreshEnough(new Date("2026-10-03T03:35:00Z"), ref, 3)).toBe(false);
  });
});

describe("selectEditorialEdition freshness", () => {
  const refDate = new Date("2026-10-07T03:35:00Z");
  const make = (company, link, publishedAt) => ({
    source: { company },
    item: { link, title: link, publishedAt },
    priority: { priorityScore: 50 },
  });

  it("drops stale and undated releases (no backlog older than 7 days)", () => {
    const selected = selectEditorialEdition({
      allFeedItems: [
        make("Meta", "https://meta.com/old-llama", new Date("2026-04-05T00:00:00Z")),
        make("OpenAI", "https://openai.com/undated", null),
        make("Google", "https://google.com/fresh", new Date("2026-10-06T12:00:00Z")),
      ],
      existingUrls: new Set(),
      limit: 3,
      referenceDate: refDate,
    });
    expect(selected.map((s) => s.source.company)).toEqual(["Google"]);
  });

  it("treats a release from the last 24h as today (priority bucket)", () => {
    const selected = selectEditorialEdition({
      allFeedItems: [
        make("Anthropic", "https://anthropic.com/backlog", new Date("2026-10-03T00:00:00Z")),
        make("xAI", "https://x.ai/today", new Date("2026-10-06T20:00:00Z")),
      ],
      existingUrls: new Set(),
      limit: 1,
      referenceDate: refDate,
    });
    expect(selected[0].source.company).toBe("xAI");
  });
});
