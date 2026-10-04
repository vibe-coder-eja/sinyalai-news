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
