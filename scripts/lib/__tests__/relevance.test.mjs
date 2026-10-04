import { describe, it, expect } from "vitest";
import { checkRelevance, hasAiSignal } from "../relevance.mjs";

describe("hasAiSignal", () => {
  it.each([
    "Microsoft expands Copilot to more enterprise customers",
    "NVIDIA unveils new AI factory blueprint",
    "AI-powered tools for small businesses",
    "Scaling inference for large language models",
    "Gemini 3 arrives in Workspace",
    "What's new in GPT-5 for developers",
  ])("detects AI content: %s", (title) => {
    expect(hasAiSignal({ title })).toBe(true);
  });

  it.each([
    "GeForce NOW Turns Up the Heat With New Toronto Server",
    "Microsoft announces quarterly dividend",
    "Our commitment to Taiwan and the region", // contains 'ai' inside a word
    "She said the new campus opens in spring",
  ])("ignores non-AI content: %s", (title) => {
    expect(hasAiSignal({ title })).toBe(false);
  });

  it("does not match lowercase 'ai' inside words", () => {
    expect(hasAiSignal({ title: "Maintaining trails in Spain" })).toBe(false);
  });

  it("uses AI-specific URL path segments as a signal", () => {
    expect(
      hasAiSignal({ title: "Building the future", link: "https://blogs.microsoft.com/ai/building-the-future/" }),
    ).toBe(true);
  });

  it("also inspects the summary", () => {
    expect(
      hasAiSignal({ title: "Announcing our new platform", summary: "Powered by machine learning." }),
    ).toBe(true);
  });
});

describe("checkRelevance", () => {
  const gaming = {
    title: "GFN Thursday: AI-enhanced graphics arrive in the cloud",
    summary: "GeForce NOW members get DLSS.",
  };

  it("drops items matching excludeKeywords even if they mention AI", () => {
    const result = checkRelevance(gaming, { excludeKeywords: ["GFN Thursday"] });
    expect(result).toEqual({ keep: false, reason: "excluded keyword" });
  });

  it("matches excludeKeywords case-insensitively", () => {
    expect(checkRelevance(gaming, { excludeKeywords: ["geforce now"] }).keep).toBe(false);
  });

  it("keeps every item from aiFocused sources", () => {
    expect(checkRelevance({ title: "Our new office in London" }, { aiFocused: true }).keep).toBe(true);
  });

  it("filters general sources without an AI signal", () => {
    expect(checkRelevance({ title: "Quarterly earnings recap" }, {})).toEqual({
      keep: false,
      reason: "no AI signal",
    });
  });

  it("keeps general-source items with an AI signal", () => {
    expect(checkRelevance({ title: "New Copilot features for Teams" }, {}).keep).toBe(true);
  });
});

describe("getEditorialPriority", () => {
  it("prioritizes new AI models (e.g. GPT-5, Grok, reasoning model)", async () => {
    const { getEditorialPriority } = await import("../relevance.mjs");
    const item = {
      title: "OpenAI announces GPT-5 reasoning model release",
      summary: "Weights and benchmarks available.",
    };
    const res = getEditorialPriority(item);
    expect(res.isTopPriority).toBe(true);
    expect(res.categories).toContain("Rilis Model");
    expect(res.priorityScore).toBeGreaterThanOrEqual(50);
  });

  it("prioritizes AI features and agent skills", async () => {
    const { getEditorialPriority } = await import("../relevance.mjs");
    const item = {
      title: "Grok introduces persistent Skills for desktop agentic workflows",
      summary: "New capabilities for tool use.",
    };
    const res = getEditorialPriority(item);
    expect(res.isTopPriority).toBe(true);
    expect(res.categories).toContain("Fitur & Skills");
  });

  it("prioritizes new hardware products and infrastructure", async () => {
    const { getEditorialPriority } = await import("../relevance.mjs");
    const item = {
      title: "NVIDIA launches DGX Blackwell AI supercomputing workstation",
      summary: "New hardware announced.",
    };
    const res = getEditorialPriority(item);
    expect(res.isTopPriority).toBe(true);
    expect(res.categories).toContain("Produk Baru");
  });

  it("prioritizes industry partnerships and investments", async () => {
    const { getEditorialPriority } = await import("../relevance.mjs");
    const item = {
      title: "Anthropic signs strategic partnership with AWS for frontier compute",
      summary: "Major enterprise collaboration agreement.",
    };
    const res = getEditorialPriority(item);
    expect(res.isTopPriority).toBe(true);
    expect(res.categories).toContain("Kerjasama Industri");
  });

  it("falls back to standard publish priority for generic articles", async () => {
    const { getEditorialPriority } = await import("../relevance.mjs");
    const item = {
      title: "Quarterly review of computational biology research",
      summary: "An overview of scientific publications and domain observations.",
    };
    const res = getEditorialPriority(item);
    expect(res.isTopPriority).toBe(false);
    expect(res.categories).toContain("Standar Umum");
    expect(res.priorityScore).toBe(10);
  });
});

