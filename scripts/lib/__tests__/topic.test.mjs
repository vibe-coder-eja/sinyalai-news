import { describe, it, expect } from "vitest";
import { buildTopic, makeWeigher, findSameTopic, slugTextFromUrl, topicTokens, variantNames, hasVariantConflict } from "../topic.mjs";

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

describe("GitHub release tags", () => {
  const url = (tag) => `https://github.com/NousResearch/hermes-agent/releases/tag/${tag}`;
  const entryFor = (tag) => ({ topic: buildTopic({ title: tag, link: url(tag) }), company: "Nous Research", label: tag });

  it("treats rc.8, rc.9, and the stable tag of one version as the same topic", () => {
    const pool = [entryFor("abandoned-rc.8-v0.21.7")];
    const cand = entryFor("rc.9-v0.21.7");
    const weight = makeWeigher([...pool.map((e) => e.topic), cand.topic]);
    expect(findSameTopic(cand, pool, weight)?.label).toBe("abandoned-rc.8-v0.21.7");
    const stable = entryFor("v0.21.7");
    expect(findSameTopic(stable, pool, makeWeigher([...pool.map((e) => e.topic), stable.topic]))).not.toBeNull();
  });

  it("keeps different versions of the same repo apart", () => {
    const pool = [entryFor("v0.21.7")];
    const cand = entryFor("v0.21.8");
    expect(findSameTopic(cand, pool, makeWeigher([...pool.map((e) => e.topic), cand.topic]))).toBeNull();
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

describe("variantNames", () => {
  it("reads the variant that follows a family name and version number", () => {
    expect([...variantNames("Gemini 4 Carbon: Our next frontier model")]).toEqual([["4", "carbon"]]);
    expect([...variantNames("OpenAI Rilis GPT-6.1 Sol, Model dengan Tarif Token Lebih Murah")]).toEqual([["6_1", "sol"]]);
  });

  it("reads a slug the same way as a dotted title version", () => {
    expect(variantNames("gpt 6 1 terra").get("6_1")).toBe("terra");
    expect(variantNames("Introducing GPT-6.1 Terra").get("6_1")).toBe("terra");
  });

  it("ignores subtitles after punctuation, years, generic words, and versions without a variant", () => {
    expect(variantNames("Gemini 3.5: frontier intelligence with action").size).toBe(0);
    expect(variantNames("Meta Networking at the OCP Summit 2026 networks").size).toBe(0);
    expect(variantNames("Gemini 4 is here").size).toBe(0);
    expect(variantNames("Introducing Mistral Large 4").size).toBe(0);
  });
});

describe("variant conflicts", () => {
  const argon = [
    entry(
      "Google DeepMind Kenalkan Gemini 4 Argon untuk Coding dan Pertahanan Siber",
      "https://deepmind.google/blog/gemini-4-argon-our-next-era-of-frontier-intelligence/",
      "Google",
    ),
  ];
  const run = (title, link, company, pool) => {
    const cand = { topic: buildTopic({ title, link }), company };
    return findSameTopic(cand, pool, makeWeigher([...pool.map((e) => e.topic), cand.topic]));
  };

  it("keeps Gemini 4 Carbon apart from Gemini 4 Argon despite the shared words", () => {
    expect(run("Gemini 4 Carbon: Our next frontier model", "https://deepmind.google/blog/gemini-4-carbon-our-next-frontier-model/", "Google", argon)).toBeNull();
  });

  it("keeps GPT-6.1 Terra apart from GPT-6.1 Sol", () => {
    const sol = [entry("OpenAI Rilis GPT-6.1 Sol, Model dengan Tarif Token Lebih Murah", "https://openai.com/index/gpt-6-1-sol/", "OpenAI")];
    expect(run("Introducing GPT-6.1 Terra", "https://openai.com/index/introducing-gpt-6-1-terra/", "OpenAI", sol)).toBeNull();
  });

  it("still treats the same variant on another domain as the same topic", () => {
    const pool = [entry("Gemini 4 Carbon: our next frontier model", "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/", "Google")];
    const match = run("Gemini 4 Carbon: Our next frontier model", "https://deepmind.google/blog/gemini-4-carbon-our-next-frontier-model/", "Google", pool);
    expect(match).not.toBeNull();
    expect(match.shared).toEqual(expect.arrayContaining(["gemini", "carbon"]));
  });

  it("does not let a slug add a variant that the title leaves out", () => {
    const pool = [entry("Google DeepMind Tambahkan Computer Use ke Gemini 3.5 Flash", "https://deepmind.google/blog/gemini-3-5-flash-computer-use/", "Google")];
    const cand = { topic: buildTopic({ title: "Gemini 3.5: frontier intelligence with action", link: "https://blog.google/gemini-3-5-frontier-intelligence-with-action/" }), company: "Google" };
    expect(cand.topic.variants.size).toBe(0);
    expect(pool[0].topic.variants.get("3_5")).toBe("flash");
  });

  it("reports a conflict only when both sides name different variants of the same version", () => {
    const carbon = buildTopic({ title: "Gemini 4 Carbon: our next frontier model", link: "https://blog.google/gemini-4-carbon/" });
    const argon = buildTopic({ title: "Gemini 4 Argon: built to solve your hardest problems", link: "https://blog.google/gemini-4-argon/" });
    const unnamed = buildTopic({ title: "Gemini 4 launches with improved coding", link: "https://blog.google/gemini-4-launch/" });
    const otherVersion = buildTopic({ title: "Gemini 5 Argon arrives", link: "https://blog.google/gemini-5-argon/" });
    expect(hasVariantConflict(carbon, argon)).toBe(true);
    expect(hasVariantConflict(carbon, unnamed)).toBe(false);
    expect(hasVariantConflict(carbon, otherVersion)).toBe(false);
    expect(hasVariantConflict(carbon, new Set(["gemini", "4"]))).toBe(false);
  });
});
