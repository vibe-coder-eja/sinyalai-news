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
    expect(findArticleProblems(ok, ctx).join()).toMatch(/by line kurang tegas: tanggal rilis "\(07\/10\)"/);
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

describe("by line strength", () => {
  const ctx = { company: "OpenAI", releaseDate: "07/10" };
  const withLead = (lead) => ({ ...ok, body: lead + "\n\n" + body });

  it("accepts the date right next to the source name", () => {
    expect(findArticleProblems(withLead("Berdasarkan rilis resmi OpenAI (07/10), model baru dirilis."), ctx)).toEqual([]);
    expect(findArticleProblems(withLead("Dalam tulisan di blognya, OpenAI (07/10) menjelaskan pembaruan."), ctx)).toEqual([]);
  });

  it("rejects a date tucked at the end of a long sentence away from the source name", () => {
    const weak = "OpenAI mengumumkan perluasan program yang memberikan akses ke kemampuan lanjutan dengan pengaman yang lebih longgar bagi banyak organisasi besar dan kecil (07/10).";
    expect(findArticleProblems(withLead(weak), ctx).join()).toMatch(/by line kurang tegas/);
  });

  it("only looks at the first two paragraphs", () => {
    const late = { ...ok, body: "Satu tanpa tanggal.\n\nDua tanpa tanggal.\n\nBerdasarkan rilis resmi OpenAI (07/10), terlambat." };
    expect(findArticleProblems(late, ctx).join()).toMatch(/by line kurang tegas/);
  });

  it("handles company names with regex characters (Z.ai)", () => {
    const art = { title: "Z.ai Rilis Model", summary, body: "Berdasarkan rilis resmi Z.ai (07/10), model baru dirilis." };
    expect(findArticleProblems(art, { company: "Z.ai", releaseDate: "07/10" })).toEqual([]);
  });
});

describe("boilerplate closing about Indonesia", () => {
  it("rejects the stock sentence that the release does not mention Indonesia", () => {
    const p = findArticleProblems(
      { ...ok, body: body + "\n\nRilis resmi ini tidak menyebutkan ketersediaan program di Indonesia maupun aturan lokal." },
      { company: "OpenAI" },
    );
    expect(p.join()).toMatch(/penutup baku/);
  });

  it("allows mentioning Indonesia when the source does", () => {
    expect(findArticleProblems({ ...ok, body: body + "\n\nLayanan ini tersedia di Indonesia sejak hari peluncuran." }, { company: "OpenAI" })).toEqual([]);
  });
});

describe("automatic style rules", () => {
  const ctx = { company: "OpenAI" };
  const withBody = (extra) => ({ ...ok, body: body + "\n\n" + extra });

  it("rejects the 'bukan sekadar X melainkan Y' contrast formula", () => {
    const p = findArticleProblems(withBody("Rilis ini bukan sekadar pembaruan, melainkan perubahan besar."), ctx);
    expect(p.join()).toMatch(/formula kontras/);
  });

  it("rejects cliche phrases and evaluative adjectives", () => {
    expect(findArticleProblems(withBody("OpenAI menyebut ini lompatan revolusioner."), ctx).join()).toMatch(/lompatan revolusioner/);
    expect(findArticleProblems(withBody("Hasilnya sangat mengesankan bagi pengembang."), ctx).join()).toMatch(/kata sifat penilai/);
    expect(findArticleProblems({ ...ok, summary: summary + " Ini game-changer." }, ctx).join()).toMatch(/summary melanggar aturan gaya/);
  });

  it("does not flag neutral wording or attributed claims", () => {
    expect(findArticleProblems(withBody("Menurut OpenAI, tarif input turun 40 persen."), ctx)).toEqual([]);
  });

  it("rejects untranslated English passages but tolerates a stray word", () => {
    const english = "The model is available from the API and that is what the company said about this release.";
    expect(findArticleProblems(withBody(english), ctx).join()).toMatch(/berbahasa Inggris/);
    expect(findArticleProblems(withBody("Fitur ini memakai arsitektur with unik."), ctx)).toEqual([]);
  });
});

describe("assertValidArticle", () => {
  it("returns the article when valid and throws otherwise", () => {
    expect(assertValidArticle(ok, { company: "OpenAI" })).toBe(ok);
    expect(() => assertValidArticle({ ...ok, summary: "x" }, { company: "OpenAI" })).toThrow(/Validasi artikel gagal/);
  });
});
