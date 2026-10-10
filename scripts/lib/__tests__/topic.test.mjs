import { describe, it, expect } from "vitest";
import { buildTopic, makeWeigher, findSameTopic, slugTextFromUrl, topicTokens } from "../topic.mjs";

const entry = (title, link, company, label = title) => ({ topic: buildTopic({ title, link }), company, label });

describe("topicTokens", () => {
  it("keeps product names and versions, drops stopwords and company names", () => {
    const t = topicTokens("Introducing Gemma 4 12B: a unified model from Google");
    expect(t.has("gemma")).toBe(true);
    expect(t.has("12b")).toBe(true);
    expect(t.has("google")).toBe(false);
    expect(t.has("introducing")).toBe(false);
  });

  it("keeps a dotted version as one token", () => {
    expect(topicTokens("GPT-6.1 Sol").has("6_1")).toBe(true);
  });
});

describe("slugTextFromUrl", () => {
  it("turns the last path segment into words", () => {
    expect(slugTextFromUrl("https://deepmind.google/blog/gemini-4-argon/")).toBe("gemini 4 argon");
    expect(slugTextFromUrl("not a url")).toBe("");
  });
});

describe("findSameTopic", () => {
  const existing = [
    entry("Google Rilis Gemma 4 12B, Model Multimodal Terpadu", "https://blog.google/technology/ai/introducing-gemma-4-12b-a-unified-model/", "Google", "Gemma 4 12B"),
    entry("OpenAI Rilis GPT-6 Astra, Model dengan Kemampuan Computer Use", "https://openai.com/index/gpt-6-astra", "OpenAI", "GPT-6 Astra"),
    entry("Anthropic Komitmenkan 150 Juta Dolar", "https://www.anthropic.com/news/genesis-mission-commitment", "Anthropic", "Genesis"),
    entry("xAI Rilis Grok 4.5 untuk Coding", "https://x.ai/news/grok-4-5", "xAI", "Grok 4.5"),
  ];
  const candidateOf = (title, link, company) => ({ topic: buildTopic({ title, link }), company });
  const run = (cand) => {
    const weight = makeWeigher([...existing.map((e) => e.topic), cand.topic]);
    return findSameTopic(cand, existing, weight);
  };

  it("matches the same release on another domain by title and slug", () => {
    const match = run(candidateOf("Introducing Gemma 4 12B: a unified, encoder-free multimodal model", "https://deepmind.google/blog/introducing-gemma-4-12b/", "Google"));
    expect(match?.label).toBe("Gemma 4 12B");
    expect(match.shared).toEqual(expect.arrayContaining(["gemma", "12b"]));
  });

  it("matches an English title against an Indonesian title through product names", () => {
    const match = run(candidateOf("GPT-6 Astra is here with computer use", "https://openai.com/blog/astra-launch", "OpenAI"));
    expect(match?.label).toBe("GPT-6 Astra");
  });

  it("does not match different releases that share one generic word", () => {
    expect(run(candidateOf("Gemini 3.5 Flash adds computer use", "https://deepmind.google/blog/gemini-3-5-flash-computer-use", "Google"))).toBeNull();
    expect(run(candidateOf("Grok 4 adds tool use", "https://x.ai/news/grok-4", "xAI"))).toBeNull();
  });

  it("is stricter across companies (different angle on the same release)", () => {
    expect(run(candidateOf("How NVIDIA GPUs accelerate OpenAI's GPT-6 Astra", "https://blogs.nvidia.com/blog/gpus-openai-gpt-6-astra", "NVIDIA"))).toBeNull();
  });

  it("returns null for an empty pool", () => {
    const cand = candidateOf("Anything new", "https://example.com/x", "Google");
    expect(findSameTopic(cand, [], makeWeigher([cand.topic]))).toBeNull();
  });
});
