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
  it("membaca waktu ISO tanpa zona sebagai UTC, dan menghormati zona bila ada", () => {
    expect(parseListingDate("2026-10-12T09:00:00")?.toISOString()).toBe("2026-10-12T09:00:00.000Z");
    expect(parseListingDate("2026-10-12T09:00:00+07:00")?.toISOString()).toBe("2026-10-12T02:00:00.000Z");
  });
});

describe("parseListing: blok <article> (tautan judul dan <time> bersaudara)", () => {
  const amd = (href, iso, label, title) => `<article class="media"><div class="row"><div class="media-body">
    <div class="media-heading"><a href="${href}">
      ${title}   </a></div>
    <div class="date"><time datetime="${iso}">${label}</time></div></div></div></article>`;
  const base = "https://ir.amd.com/news-events/press-releases";

  it("membaca judul dari teks tautan, tanggal dari datetime, dan tautan absolut", () => {
    const html = amd("https://ir.amd.com/news-events/press-releases/detail/1301/helion", "2026-10-12T09:00:00", "Oct 12, 2026 9:00 am EDT", "Introducing AMD Helion &amp; Co");
    const [item] = parseListing(html, base);
    expect(item).toMatchObject({
      title: "Introducing AMD Helion & Co",
      link: "https://ir.amd.com/news-events/press-releases/detail/1301/helion",
      summary: "",
    });
    expect(item.publishedAt?.toISOString()).toBe("2026-10-12T09:00:00.000Z");
  });

  it("memakai teks tanggal bila datetime tidak ada, dan melewati blok tanpa tautan atau tanggal", () => {
    const html = [
      amd("/detail/2/b", "", "Oct 6, 2026 4:15 pm EDT", "Judul B"),
      `<article><time datetime="2026-10-01">Oct 1, 2026</time></article>`,
      `<article><a href="/detail/3/c">Judul C</a></article>`,
    ].join("\n");
    const items = parseListing(html, base);
    expect(items.map((i) => i.title)).toEqual(["Judul B"]);
    expect(items[0].link).toBe("https://ir.amd.com/detail/2/b");
    expect(items[0].publishedAt?.toISOString()).toBe("2026-10-06T00:00:00.000Z");
  });

  it("tidak dipakai bila pola <a><time> sudah menemukan artikel", () => {
    const items = parseListing(`<article>${featured}</article>`, BASE);
    expect(items.map((i) => i.link)).toEqual(["https://www.anthropic.com/news/a"]);
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

describe("parseListing (tanggal tanpa <time>)", () => {
  it("membaca tanggal dari span teks dan ringkasan dari <p> terpanjang", () => {
    const html = `
      <a class="item" href="/en/news/v4-preview/"><p><span>News</span><span>April 24, 2026</span></p>
        <h3>DeepSeek-V4 Preview</h3><p>Model baru dengan konteks 1 juta token resmi dirilis.</p></a>
      <a href="/en/news/"><span>News</span></a>`;
    const items = parseListing(html, "https://www.deepseek.com/en/news/");
    expect(items).toHaveLength(1);
    expect(items[0].title).toBe("DeepSeek-V4 Preview");
    expect(items[0].publishedAt?.toISOString()).toBe("2026-04-24T00:00:00.000Z");
    expect(items[0].summary).toContain("konteks 1 juta token");
  });
});

describe("parseListing: tautan berdiri sendiri (ai.meta.com/blog)", () => {
  const META = "https://ai.meta.com/blog/";
  const card = (date, title, href) =>
    `<div><div class="c"><p>Blog</p><div><p>${date}</p></div><h4>${title}</h4><div><p>${date}</p><a href="${href}"><span>Learn More</span></a></div></div></div>`;
  const page =
    `<nav><a href="/blog/">Blog</a><a href="https://ai.meta.com/blog/?page=2">2</a></nav>` +
    card("April 08, 2026", "Introducing Muse Spark: Scaling Towards Personal Superintelligence ", "https://ai.meta.com/blog/introducing-muse-spark-msl/") +
    card("July 27, 2026", "Reimagining Independence", "/blog/pittsburgh-sam-dino/");

  it("mengambil judul dan tanggal dari kartu sebelum tautan", () => {
    const items = parseListing(page, META);
    expect(items).toHaveLength(2);
    expect(items[0].title).toBe("Introducing Muse Spark: Scaling Towards Personal Superintelligence");
    expect(items[0].link).toBe("https://ai.meta.com/blog/introducing-muse-spark-msl/");
    expect(items[0].publishedAt?.toISOString()).toBe("2026-04-08T00:00:00.000Z");
    expect(items[1].link).toBe("https://ai.meta.com/blog/pittsburgh-sam-dino/");
    expect(items[1].publishedAt?.toISOString()).toBe("2026-07-27T00:00:00.000Z");
  });

  it("mengabaikan navigasi, paginasi, dan tautan luar", () => {
    const items = parseListing(page + `<a href="https://example.com/blog/x/">x</a>`, META);
    expect(items.map((i) => i.link)).not.toContain("https://example.com/blog/x/");
    expect(items.every((i) => !i.link.includes("page="))).toBe(true);
  });

  it("tidak mengganggu pola <a><time> yang sudah ada", () => {
    expect(parseListing(featured, BASE)).toHaveLength(1);
  });
});
