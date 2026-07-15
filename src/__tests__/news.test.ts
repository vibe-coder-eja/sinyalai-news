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
