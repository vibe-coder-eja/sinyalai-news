import { describe, it, expect } from "vitest";
import { findArticleProblems, assertValidArticle } from "../validate.mjs";

const summary =
  "OpenAI memperkenalkan GPT-6.1 Sol, model untuk coding dan penggunaan komputer dengan tarif API lebih rendah.";
const body = [
  "OpenAI resmi memperkenalkan GPT-6.1 Sol, model bahasa yang dirancang untuk coding, computer use, dan pekerjaan profesional di berbagai bidang.",
  "Model ini diposisikan sebagai opsi menengah-atas dengan tarif input dan output token yang lebih rendah dibanding lini model andalan perusahaan.",
  "Akses tersedia melalui API dan ChatGPT, lengkap dengan dokumentasi teknis serta panduan integrasi bagi pengembang yang ingin mengadopsinya.",
].join("\n\n");
const ok = { title: "OpenAI Rilis GPT-6.1 Sol dengan Tarif Lebih Murah", summary, body };

describe("findArticleProblems", () => {
  it("accepts a well-formed article", () => {
    expect(findArticleProblems(ok, { company: "OpenAI" })).toEqual([]);
  });

  it("rejects CJK token leaks in any field", () => {
    const p = findArticleProblems({ ...ok, body: body + " 公布" }, { company: "OpenAI" });
    expect(p.join()).toMatch(/body memuat aksara non-Latin/);
  });

  it("rejects a title without the company name", () => {
    const p = findArticleProblems({ ...ok, title: "Model Baru dengan Tarif Lebih Murah" }, { company: "OpenAI" });
    expect(p.join()).toMatch(/nama perusahaan/);
  });

  it("matches the company name case-insensitively", () => {
    expect(findArticleProblems({ ...ok, title: "openai rilis model" }, { company: "OpenAI" })).toEqual([]);
  });

  it("rejects out-of-range summary length", () => {
    expect(findArticleProblems({ ...ok, summary: "Terlalu pendek." }, { company: "OpenAI" }).join()).toMatch(/summary/);
    expect(findArticleProblems({ ...ok, summary: "x".repeat(301) }, { company: "OpenAI" }).join()).toMatch(/summary/);
  });

  it("rejects a short or single-paragraph body", () => {
    const p = findArticleProblems({ ...ok, body: "Satu paragraf saja." }, { company: "OpenAI" });
    expect(p.join()).toMatch(/body terlalu pendek/);
    expect(p.join()).toMatch(/1 paragraf/);
  });

  it("rejects leftover placeholder text", () => {
    const p = findArticleProblems({ ...ok, body: body + "\n\n_TODO: ganti blok ini_" }, { company: "OpenAI" });
    expect(p.join()).toMatch(/placeholder/);
  });

  it("rejects an overly long title", () => {
    const p = findArticleProblems({ ...ok, title: "OpenAI " + "x".repeat(130) }, { company: "OpenAI" });
    expect(p.join()).toMatch(/title terlalu panjang/);
  });
});

describe("assertValidArticle", () => {
  it("returns the article when valid and throws otherwise", () => {
    expect(assertValidArticle(ok, { company: "OpenAI" })).toBe(ok);
    expect(() => assertValidArticle({ ...ok, summary: "x" }, { company: "OpenAI" })).toThrow(/Validasi artikel gagal/);
  });
});
