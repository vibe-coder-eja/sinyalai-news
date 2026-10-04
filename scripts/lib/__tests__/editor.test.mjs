import { describe, it, expect } from "vitest";
import { isToday, sortCandidatesByPriority, selectEditorialEdition } from "../editor.mjs";

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
      { item: { date: new Date("2026-10-04T05:00:00Z") }, priority: { priorityScore: 10 } },
      { item: { date: new Date("2026-10-04T08:00:00Z") }, priority: { priorityScore: 50 } },
      { item: { date: new Date("2026-10-04T07:00:00Z") }, priority: { priorityScore: 40 } },
      { item: { date: new Date("2026-10-04T06:00:00Z") }, priority: { priorityScore: 40 } },
    ];

    const sorted = sortCandidatesByPriority(items);
    expect(sorted[0].priority.priorityScore).toBe(50);
    expect(sorted[1].priority.priorityScore).toBe(40);
    expect(sorted[1].item.date.toISOString()).toBe("2026-10-04T07:00:00.000Z");
    expect(sorted[2].item.date.toISOString()).toBe("2026-10-04T06:00:00.000Z");
    expect(sorted[3].priority.priorityScore).toBe(10);
  });
});

describe("selectEditorialEdition", () => {
  const refDate = new Date("2026-10-04T10:30:00Z");

  it("selects exactly 3 articles when today has sufficient candidates", () => {
    const candidates = [
      {
        source: { company: "OpenAI" },
        item: { link: "https://openai.com/1", title: "GPT-6 Release", date: new Date("2026-10-04T08:00:00Z") },
        priority: { priorityScore: 50, categories: ["Rilis Model"] },
      },
      {
        source: { company: "Anthropic" },
        item: { link: "https://anthropic.com/2", title: "Claude Skills", date: new Date("2026-10-04T07:30:00Z") },
        priority: { priorityScore: 45, categories: ["Fitur & Skills"] },
      },
      {
        source: { company: "Meta" },
        item: { link: "https://meta.com/3", title: "SAM Audio Model", date: new Date("2026-10-04T07:00:00Z") },
        priority: { priorityScore: 50, categories: ["Rilis Model"] },
      },
      {
        source: { company: "Google" },
        item: { link: "https://google.com/4", title: "General Update", date: new Date("2026-10-04T06:00:00Z") },
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
        item: { link: "https://openai.com/today-1", title: "Today 1", date: new Date("2026-10-04T08:00:00Z") },
        priority: { priorityScore: 50, categories: ["Rilis Model"] },
      },
      // Previous days (unreleased backlog)
      {
        source: { company: "Anthropic" },
        item: { link: "https://anthropic.com/prev-1", title: "Prev 1", date: new Date("2026-10-03T12:00:00Z") },
        priority: { priorityScore: 45, categories: ["Fitur & Skills"] },
      },
      {
        source: { company: "xAI" },
        item: { link: "https://x.ai/prev-2", title: "Prev 2", date: new Date("2026-10-02T12:00:00Z") },
        priority: { priorityScore: 40, categories: ["Produk Baru"] },
      },
      {
        source: { company: "Google" },
        item: { link: "https://google.com/prev-3", title: "Prev 3", date: new Date("2026-10-01T12:00:00Z") },
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
        item: { link: "https://openai.com/already-published", title: "Dup", date: new Date("2026-10-04T08:00:00Z") },
        priority: { priorityScore: 50 },
      },
      {
        source: { company: "Meta" },
        item: { link: "https://meta.com/fresh-release", title: "Fresh", date: new Date("2026-10-04T08:00:00Z") },
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
        item: { link: "https://openai.com/1", title: "OpenAI 1", date: new Date("2026-10-04T08:00:00Z") },
        priority: { priorityScore: 50 },
      },
      {
        source: { company: "OpenAI" },
        item: { link: "https://openai.com/2", title: "OpenAI 2", date: new Date("2026-10-04T07:00:00Z") },
        priority: { priorityScore: 45 },
      },
      {
        source: { company: "Anthropic" },
        item: { link: "https://anthropic.com/1", title: "Anthropic 1", date: new Date("2026-10-04T06:00:00Z") },
        priority: { priorityScore: 40 },
      },
      {
        source: { company: "Google" },
        item: { link: "https://google.com/1", title: "Google 1", date: new Date("2026-10-04T05:00:00Z") },
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
