import { describe, it, expect } from "vitest";
import { isFreshEnough, isToday, sortCandidatesByPriority, selectEditorialEdition, computeCategoryShares, effectiveScore } from "../editor.mjs";
import { EDITIONS, getEdition, editionBoost } from "../editions.mjs";

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


describe("topic de-duplication in selection", () => {
  const ref = new Date("2026-10-08T03:35:00Z");
  const cand = (company, title, link, score, hoursAgo = 3, categories = ["Rilis Model"]) => ({
    source: { company },
    item: { link, title, publishedAt: new Date(ref.getTime() - hoursAgo * 3600 * 1000) },
    priority: { priorityScore: score, categories },
  });

  it("drops a candidate whose topic matches an existing article under a different URL", () => {
    const skipped = [];
    const selected = selectEditorialEdition({
      allFeedItems: [
        cand("Google", "Introducing Gemma 4 12B, a unified multimodal model", "https://deepmind.google/blog/introducing-gemma-4-12b/", 50),
        cand("Meta", "Meta releases Llama 5 Scout", "https://ai.meta.com/blog/llama-5-scout/", 45),
      ],
      existingEntries: [
        { title: "Google Rilis Gemma 4 12B, Model Multimodal Terpadu", sourceTitle: "", company: "Google", source: "https://blog.google/technology/ai/introducing-gemma-4-12b-a-unified-model/", categories: [] },
      ],
      limit: 3,
      referenceDate: ref,
      onSkip: (info) => skipped.push(info),
    });
    expect(selected.map((s) => s.source.company)).toEqual(["Meta"]);
    expect(skipped).toHaveLength(1);
    expect(skipped[0].reason).toBe("topik sama");
    expect(skipped[0].candidate.item.title).toMatch(/Gemma 4 12B/);
  });

  it("keeps only the higher-priority candidate when two feeds carry the same story", () => {
    const selected = selectEditorialEdition({
      allFeedItems: [
        cand("Google", "Gemini 4 Argon: our next era of frontier intelligence", "https://blog.google/technology/ai/gemini-4-argon/", 40),
        cand("Google", "Gemini 4 Argon our next era of frontier intelligence", "https://deepmind.google/blog/gemini-4-argon-our-next-era-of-frontier-intelligence/", 50),
      ],
      limit: 3,
      referenceDate: ref,
    });
    expect(selected).toHaveLength(1);
    expect(selected[0].priority.priorityScore).toBe(50);
  });
});

describe("edition focus and category balance", () => {
  const ref = new Date("2026-10-08T03:35:00Z");
  const cand = (company, title, score, categories) => ({
    source: { company },
    item: { link: `https://${company.toLowerCase()}.com/${title.replace(/\W+/g, "-")}`, title, publishedAt: new Date(ref.getTime() - 3600 * 1000) },
    priority: { priorityScore: score, categories },
  });

  it("gives different editions different boosts", () => {
    expect(getEdition("pagi").id).toBe("pagi");
    expect(getEdition("malam").id).toBe("malam");
    expect(editionBoost(EDITIONS.pagi, ["Rilis Model"])).toBe(10);
    expect(editionBoost(EDITIONS.malam, ["Rilis Model"])).toBe(0);
    expect(editionBoost(EDITIONS.malam, ["Penerapan Industri", "Standar Umum"])).toBe(10);
  });

  it("lets the evening edition prefer a customer story over a slightly higher model release", () => {
    const items = [
      cand("OpenAI", "Alpha model release", 50, ["Rilis Model"]),
      cand("Anthropic", "Customer case study", 45, ["Penerapan Industri"]),
    ];
    const pagi = selectEditorialEdition({ allFeedItems: items, limit: 1, referenceDate: ref, edition: EDITIONS.pagi });
    const malam = selectEditorialEdition({ allFeedItems: items, limit: 1, referenceDate: ref, edition: EDITIONS.malam });
    expect(pagi[0].source.company).toBe("OpenAI");
    expect(malam[0].source.company).toBe("Anthropic");
  });

  it("computes category shares only once enough categorized history exists", () => {
    const at = (day, categories, extra = {}) => ({ categories, publishedAt: new Date(`2026-10-${day}T00:00:00Z`), ...extra });
    expect(computeCategoryShares([at("01", ["Rilis Model"])])).toEqual({});
    const history = [
      at("01", ["Rilis Model"]), at("02", ["Rilis Model"]), at("03", ["Rilis Model"]),
      at("04", ["Rilis Model", "Produk Baru"]), at("05", ["Fitur & Skills"]), at("06", ["Penerapan Industri"]),
      at("07", ["Rilis Model"], { archived: true }),
    ];
    const shares = computeCategoryShares(history);
    expect(shares["Rilis Model"]).toBeCloseTo(4 / 6);
    expect(shares["Produk Baru"]).toBeCloseTo(1 / 6);
  });

  it("lowers the score of a dominant category so other categories can surface", () => {
    const shares = { "Rilis Model": 0.8, "Fitur & Skills": 0.1 };
    const model = effectiveScore({ priorityScore: 50, categories: ["Rilis Model"] }, { shares });
    const feature = effectiveScore({ priorityScore: 45, categories: ["Fitur & Skills"] }, { shares });
    expect(model).toBe(26);
    expect(feature).toBe(42);
    expect(feature).toBeGreaterThan(model);
    expect(effectiveScore({ priorityScore: 50, categories: ["Rilis Model"] }, {})).toBe(50);
  });
});


describe("GitHub release tags in selection", () => {
  const ref = new Date("2026-10-10T03:35:00Z");
  const tagUrl = (tag) => `https://github.com/NousResearch/hermes-agent/releases/tag/${tag}`;
  const cand = (tag) => ({
    source: { company: "Nous Research" },
    item: { link: tagUrl(tag), title: tag, publishedAt: new Date(ref.getTime() - 3600 * 1000) },
    priority: { priorityScore: 10, categories: ["Standar Umum"] },
  });

  it("drops a stable tag whose version already has a published stable article", () => {
    const skipped = [];
    const selected = selectEditorialEdition({
      allFeedItems: [cand("v0.21.7")],
      existingEntries: [{ title: "Nous Research Rilis Hermes Agent 0.21.7", sourceTitle: "v0.21.7", company: "Nous Research", source: tagUrl("v0.21.7"), categories: [] }],
      limit: 3,
      referenceDate: ref,
      onSkip: (i) => skipped.push(i),
    });
    expect(selected).toHaveLength(0);
    expect(skipped[0].reason).toBe("topik sama");
  });

  it("does not let an old release-candidate article block the stable release", () => {
    const selected = selectEditorialEdition({
      allFeedItems: [cand("v0.21.7")],
      existingEntries: [{ title: "Nous Research Tandai Kandidat Rilis 0.21.7", sourceTitle: "rc.9-v0.21.7", company: "Nous Research", source: tagUrl("rc.9-v0.21.7"), categories: [] }],
      limit: 3,
      referenceDate: ref,
    });
    expect(selected).toHaveLength(1);
  });
});
