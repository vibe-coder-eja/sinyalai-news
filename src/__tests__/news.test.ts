import { vi, describe, it, expect } from "vitest";

vi.mock("astro:content", () => ({
  getCollection: vi.fn(),
}));

import { formatDate, toIsoDate } from "../lib/news";

describe("formatDate", () => {
  it("formats Date objects into Indonesian locale date string", () => {
    const d = new Date("2026-07-15T12:00:00.000Z");
    expect(formatDate(d)).toBe("15 Juli 2026");
  });
});

describe("toIsoDate", () => {
  it("formats Date objects into standard ISO date string (YYYY-MM-DD)", () => {
    const d = new Date("2026-07-15T12:00:00.000Z");
    expect(toIsoDate(d)).toBe("2026-07-15");
  });
});

describe("getPublishedNews", () => {
  it("sorts articles primarily by release timestamp descending, then alphabetically by title", async () => {
    const { getCollection } = await import("astro:content");
    const mockEntries = [
      {
        id: "2",
        data: {
          title: "Zeta Model Release",
          publishedAt: new Date("2026-10-04T10:30:00Z"),
          draft: false,
        },
      },
      {
        id: "1",
        data: {
          title: "Alpha Model Release",
          publishedAt: new Date("2026-10-04T10:30:00Z"),
          draft: false,
        },
      },
      {
        id: "3",
        data: {
          title: "Beta Model Evening Release",
          publishedAt: new Date("2026-10-04T22:05:00Z"),
          draft: false,
        },
      },
      {
        id: "4",
        data: {
          title: "Alpha Model Evening Release",
          publishedAt: new Date("2026-10-04T22:05:00Z"),
          draft: false,
        },
      },
      {
        id: "5",
        data: {
          title: "Draft Story",
          publishedAt: new Date("2026-10-05T00:00:00Z"),
          draft: true,
        },
      },
      {
        id: "6",
        data: {
          title: "Archived Story",
          publishedAt: new Date("2026-10-06T00:00:00Z"),
          draft: false,
          archived: true,
        },
      },
    ];

    vi.mocked(getCollection).mockImplementation(async (_name: any, filter?: any) => {
      return mockEntries.filter(filter || (() => true)) as any;
    });

    const { getPublishedNews } = await import("../lib/news");
    const sorted = await getPublishedNews();

    expect(sorted.map((s) => s.data.title)).toEqual([
      "Alpha Model Evening Release",
      "Beta Model Evening Release",
      "Alpha Model Release",
      "Zeta Model Release",
    ]);
  });
});
