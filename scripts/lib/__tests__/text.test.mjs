import { describe, it, expect } from "vitest";
import { truncateAtWord, ELLIPSIS } from "../text.mjs";

describe("truncateAtWord", () => {
  it("returns short text unchanged", () => {
    expect(truncateAtWord("Halo dunia", 50)).toBe("Halo dunia");
  });

  it("cuts at a word boundary and appends an ellipsis", () => {
    const out = truncateAtWord("The quick brown fox jumps over the lazy dog", 20);
    expect(out).toBe(`The quick brown fox${ELLIPSIS}`);
    expect(out.length).toBeLessThanOrEqual(20);
  });

  it("never ends mid-word", () => {
    const text = "bringing dedicated high performance in the cloud closer to members";
    const out = truncateAtWord(text, 40);
    const withoutEllipsis = out.slice(0, -ELLIPSIS.length);
    expect(text.startsWith(withoutEllipsis)).toBe(true);
    expect(text[withoutEllipsis.length]).toBe(" ");
  });

  it("strips dangling punctuation before the ellipsis", () => {
    expect(truncateAtWord("Alpha, beta, gamma delta epsilon", 14)).toBe(`Alpha, beta${ELLIPSIS}`);
  });

  it("hard-cuts a single very long word", () => {
    const out = truncateAtWord("a".repeat(50), 10);
    expect(out).toBe(`${"a".repeat(9)}${ELLIPSIS}`);
  });

  it("handles empty and non-string input", () => {
    expect(truncateAtWord("", 10)).toBe("");
    expect(truncateAtWord(undefined, 10)).toBe("");
  });
});
