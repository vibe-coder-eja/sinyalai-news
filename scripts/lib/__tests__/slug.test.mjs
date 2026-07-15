import { describe, it, expect } from "vitest";
import { slugify, uniqueSlug } from "../slug.mjs";

describe("slugify", () => {
  it("converts basic title and company to slug", () => {
    expect(slugify("Product Updates", "OpenAI")).toBe("openai-product-updates");
  });

  it("handles empty company", () => {
    expect(slugify("Only Title")).toBe("only-title");
  });

  it("handles & character", () => {
    expect(slugify("Research & Development", "Google")).toBe("google-research-and-development");
  });

  it("normalizes unicode/diacritics", () => {
    expect(slugify("Météo", "Café")).toBe("cafe-meteo");
  });

  it("truncates at word/dash boundary when too long", () => {
    const longTitle = "nvidia-geforce-now-turns-up-the-heat-with-new-geforce-rtx-5080-powered-toronto-servers";
    const slug = slugify(longTitle);
    expect(slug.length).toBeLessThanOrEqual(80);
    expect(slug.endsWith("-")).toBe(false);
    expect(slug).toBe("nvidia-geforce-now-turns-up-the-heat-with-new-geforce-rtx-5080-powered-toronto");
  });

  it("returns fallback for non-alphanumeric text", () => {
    expect(slugify("!!!")).toBe("sinyal");
  });
});

describe("uniqueSlug", () => {
  it("returns original slug if no collision", () => {
    const existing = new Set(["other-slug"]);
    expect(uniqueSlug("my-slug", existing)).toBe("my-slug");
  });

  it("appends counter on collision", () => {
    const existing = new Set(["my-slug"]);
    expect(uniqueSlug("my-slug", existing)).toBe("my-slug-2");
  });

  it("appends higher counter if multiple collisions", () => {
    const existing = new Set(["my-slug", "my-slug-2", "my-slug-3"]);
    expect(uniqueSlug("my-slug", existing)).toBe("my-slug-4");
  });

  it("stops incrementing at limit of 100", () => {
    const existing = new Set();
    existing.add("my-slug");
    for (let i = 2; i <= 105; i++) {
      existing.add(`my-slug-${i}`);
    }
    expect(uniqueSlug("my-slug", existing)).toBe("my-slug-100");
  });
});
