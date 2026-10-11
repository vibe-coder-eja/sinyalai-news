import { describe, it, expect } from "vitest";
import { dateWindow, filterToWindow, withoutArchived } from "../backfill.mjs";
import { archiveMarkdown } from "../archive.mjs";
import { normalizeUrl } from "../dedupe.mjs";

describe("dateWindow", () => {
  const now = new Date("2026-10-11T12:00:00Z");
  it("memberi satu hari UTC penuh untuk tanggal lampau", () => {
    const w = dateWindow("2026-10-09", now);
    expect(w.start.toISOString()).toBe("2026-10-09T00:00:00.000Z");
    expect(w.end.toISOString()).toBe("2026-10-10T00:00:00.000Z");
  });
  it("memotong batas akhir ke sekarang untuk hari berjalan", () => {
    expect(dateWindow("2026-10-11", now).end.toISOString()).toBe(now.toISOString());
  });
  it("menolak format tanggal yang salah", () => {
    expect(() => dateWindow("9 Oktober", now)).toThrow();
    expect(() => dateWindow("2026-13-40", now)).toThrow();
  });
});

describe("filterToWindow", () => {
  it("hanya menyisakan rilis di dalam jendela, tanpa tanggal dibuang", () => {
    const w = dateWindow("2026-10-09", new Date("2026-10-11T00:00:00Z"));
    const mk = (iso) => ({ item: { publishedAt: iso ? new Date(iso) : null } });
    const kept = filterToWindow(
      [mk("2026-10-08T23:59:59Z"), mk("2026-10-09T00:00:00Z"), mk("2026-10-09T23:59:59Z"), mk("2026-10-10T00:00:00Z"), mk(null)],
      w,
    );
    expect(kept.length).toBe(2);
  });
});

describe("withoutArchived", () => {
  it("mengabaikan arsip tetapi tetap menghitung artikel tayang", () => {
    const r = withoutArchived(
      {
        entries: [
          { source: "https://a.com/x", archived: true },
          { source: "https://b.com/y", archived: false },
        ],
      },
      normalizeUrl,
    );
    expect([...r.sources]).toEqual(["b.com/y"]);
    expect(r.entries.length).toBe(1);
  });
});

describe("archiveMarkdown", () => {
  it("menyisipkan archived: true setelah draft", () => {
    const out = archiveMarkdown('---\ntitle: "A"\ndraft: false\n---\n\nIsi\n');
    expect(out).toBe('---\ntitle: "A"\ndraft: false\narchived: true\n---\n\nIsi\n');
  });
  it("idempoten dan tidak menyentuh berkas tanpa front matter", () => {
    const once = archiveMarkdown("---\ndraft: false\n---\nx");
    expect(archiveMarkdown(once)).toBe(once);
    expect(archiveMarkdown("tanpa fm")).toBe("tanpa fm");
  });
  it("mengubah archived: false menjadi true", () => {
    expect(archiveMarkdown("---\ndraft: false\narchived: false\n---\nx")).toContain("archived: true");
  });
});
