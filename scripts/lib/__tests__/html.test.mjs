import { describe, expect, it } from "vitest";
import { parseListing, parseListingDate } from "../html.mjs";

const BASE = "https://www.anthropic.com/news";

const featured = `<a href="/news/a" class="x"><div><span>Announcements</span><time>Oct 6, 2026</time></div><h4>Judul &amp; A</h4><p class="b">Ringkasan A.</p></a>`;
const listItem = (href, date, title) =>
  `<a href="${href}" class="l"><div><time>${date}</time><span class="subject">Announcements</span></div><span class="PublicationList__title body-3"> ${title}</span></a>`;

describe("parseListingDate", () => {
  it("membaca format 'Oct 7, 2026' sebagai UTC", () => {
    expect(parseListingDate("Oct 7, 2026")?.toISOString()).toBe("2026-10-07T00:00:00.000Z");
  });
  it("membaca '7 October 2026' dan ISO", () => {
    expect(parseListingDate("7 October 2026")?.toISOString()).toBe("2026-10-07T00:00:00.000Z");
    expect(parseListingDate("2026-10-07")?.toISOString()).toBe("2026-10-07T00:00:00.000Z");
  });
  it("mengembalikan null untuk teks tak dikenal", () => {
    expect(parseListingDate("kemarin")).toBeNull();
    expect(parseListingDate("")).toBeNull();
  });
});

describe("parseListing", () => {
  it("mengekstrak judul heading, ringkasan, tanggal, dan link absolut", () => {
    const [item] = parseListing(featured, BASE);
    expect(item).toMatchObject({
      title: "Judul & A",
      link: "https://www.anthropic.com/news/a",
      summary: "Ringkasan A.",
    });
    expect(item.publishedAt?.toISOString()).toBe("2026-10-06T00:00:00.000Z");
  });

  it("mengekstrak judul dari elemen ber-class title", () => {
    const [item] = parseListing(listItem("/news/b", "Oct 8, 2026", "Judul B"), BASE);
    expect(item.title).toBe("Judul B");
    expect(item.summary).toBe("");
  });

  it("mengabaikan anchor tanpa <time> atau tanpa judul", () => {
    const html = `<a href="/about">Tentang</a><a href="/news/c"><time>Oct 1, 2026</time></a>`;
    expect(parseListing(html, BASE)).toEqual([]);
  });

  it("menggabungkan duplikat dan mempertahankan yang berringkasan", () => {
    const html = listItem("/news/a", "Oct 6, 2026", "Judul A") + featured;
    const items = parseListing(html, BASE);
    expect(items).toHaveLength(1);
    expect(items[0].summary).toBe("Ringkasan A.");
  });

  it("menolak link non-HTTPS", () => {
    const html = listItem("http://example.com/x", "Oct 6, 2026", "X");
    expect(parseListing(html, BASE)).toEqual([]);
  });
});

describe("parseListing (kartu overlay)", () => {
  it("membaca kartu dengan anchor overlay aria-label dan card-date", () => {
    const html = `
      <div class="menu-card"><a href="/blog/kimi-k3" aria-label="Kimi K3" class="absolute inset-0"></a>
        <h4 class="card-title">Kimi K3</h4><p class="card-date">2026-07-16</p></div>
      <div class="menu-card"><a href="/blog/agent-swarm" aria-label="Agent Swarm" class="absolute"></a>
        <h4 class="card-title">Agent Swarm</h4><p class="card-date">2026-02-09</p></div>`;
    const items = parseListing(html, "https://www.kimi.ai/blog/");
    expect(items).toHaveLength(2);
    expect(items[0].title).toBe("Kimi K3");
    expect(items[0].link).toBe("https://www.kimi.ai/blog/kimi-k3");
    expect(items[1].publishedAt?.toISOString()).toBe("2026-02-09T00:00:00.000Z");
  });
});
