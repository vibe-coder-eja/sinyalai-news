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

  it("accepts a flexible summary between 40 and 400 characters", () => {
    expect(findArticleProblems({ ...ok, summary: "x".repeat(40) }, { company: "OpenAI" })).toEqual([]);
    expect(findArticleProblems({ ...ok, summary: "x".repeat(400) }, { company: "OpenAI" })).toEqual([]);
  });

  it("rejects a summary outside 40-400 characters", () => {
    expect(findArticleProblems({ ...ok, summary: "Terlalu pendek." }, { company: "OpenAI" }).join()).toMatch(/summary/);
    expect(findArticleProblems({ ...ok, summary: "x".repeat(401) }, { company: "OpenAI" }).join()).toMatch(/summary/);
  });

  it("puts no minimum on body length or paragraph count", () => {
    expect(findArticleProblems({ ...ok, body: "OpenAI merilis pembaruan." }, { company: "OpenAI" })).toEqual([]);
  });

  it("rejects an empty body", () => {
    expect(findArticleProblems({ ...ok, body: "   " }, { company: "OpenAI" }).join()).toMatch(/body kosong/);
  });

  it("requires the source company to be named in the body", () => {
    const p = findArticleProblems({ ...ok, body: "Model baru dirilis untuk coding dan penggunaan komputer." }, { company: "OpenAI" });
    expect(p.join()).toMatch(/tidak menyebut sumber "OpenAI"/);
  });

  it("requires the release date (dd/mm) in the body when one is given", () => {
    const ctx = { company: "OpenAI", releaseDate: "07/10" };
    expect(findArticleProblems(ok, ctx).join()).toMatch(/tanggal rilis sumber "07\/10"/);
    const withByline = { ...ok, body: "Berdasarkan rilis resmi OpenAI (07/10), model baru dirilis.\n\n" + body };
    expect(findArticleProblems(withByline, ctx)).toEqual([]);
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
