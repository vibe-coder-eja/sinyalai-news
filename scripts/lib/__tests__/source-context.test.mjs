import { describe, it, expect, vi, afterEach } from "vitest";
import { htmlToContextText, fetchSourceText, MAX_CONTEXT_CHARS } from "../source-context.mjs";

describe("htmlToContextText", () => {
  it("keeps article paragraphs and drops scripts, nav, and short UI lines", () => {
    const html = `<html><body><nav>Menu utama situs</nav><script>alert(1)</script>
      <article><h1>Judul</h1>
      <p>Perusahaan mengumumkan model baru dengan kemampuan penalaran yang ditingkatkan.</p>
      <p>Tombol</p>
      <p>Model tersedia melalui API mulai hari ini &amp; di aplikasi web resmi.</p></article>
      <footer>Hak cipta</footer></body></html>`;
    const text = htmlToContextText(html);
    expect(text).toContain("model baru dengan kemampuan penalaran");
    expect(text).toContain("API mulai hari ini & di aplikasi");
    expect(text).not.toMatch(/alert|Menu utama|Tombol|Hak cipta/);
  });

  it("truncates to the context limit", () => {
    const long = `<article><p>${"kalimat panjang berisi fakta rilis resmi. ".repeat(500)}</p></article>`;
    expect(htmlToContextText(long).length).toBeLessThanOrEqual(MAX_CONTEXT_CHARS);
  });

  it("returns empty string for empty input", () => {
    expect(htmlToContextText("")).toBe("");
  });
});

describe("fetchSourceText", () => {
  afterEach(() => vi.restoreAllMocks());

  it("never fetches non-https, credentialed, or internal URLs", async () => {
    const fetchMock = vi.fn();
    globalThis.fetch = fetchMock;
    for (const url of [
      "http://openai.com/x",
      "https://user:pw@openai.com/x",
      "https://localhost/x",
      "https://169.254.169.254/latest/meta-data",
      "https://[::1]/x",
      "not a url",
    ]) {
      expect(await fetchSourceText(url)).toBe("");
    }
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns empty string on HTTP errors and network failures", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: false, status: 403 });
    expect(await fetchSourceText("https://openai.com/x")).toBe("");
    globalThis.fetch = vi.fn().mockRejectedValue(new Error("boom"));
    expect(await fetchSourceText("https://openai.com/x")).toBe("");
  });

  it("extracts text from an HTML response", async () => {
    const html = "<article><p>Rilis resmi memuat detail ketersediaan model di API dan aplikasi web.</p></article>";
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      url: "https://openai.com/x",
      headers: new Headers({ "content-type": "text/html; charset=utf-8" }),
      body: new Response(html).body,
    });
    expect(await fetchSourceText("https://openai.com/x")).toContain("detail ketersediaan model");
  });

  it("ignores non-text content types", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      url: "https://openai.com/x.pdf",
      headers: new Headers({ "content-type": "application/pdf" }),
      body: new Response("%PDF").body,
    });
    expect(await fetchSourceText("https://openai.com/x.pdf")).toBe("");
  });
});
