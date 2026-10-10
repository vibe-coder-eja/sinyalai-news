import { describe, it, expect } from "vitest";
import {
  parseGithubReleaseUrl,
  isPrereleaseTag,
  releaseSkipReason,
  releaseTopicTokens,
  MIN_RELEASE_NOTES_CHARS,
} from "../release-tags.mjs";

const rc8 = "https://github.com/NousResearch/hermes-agent/releases/tag/abandoned-rc.8-v0.21.7";
const rc9 = "https://github.com/NousResearch/hermes-agent/releases/tag/rc.9-v0.21.7";
const stable = "https://github.com/NousResearch/hermes-agent/releases/tag/v0.21.7";

describe("parseGithubReleaseUrl", () => {
  it("reads owner, repo, and tag from a release link", () => {
    expect(parseGithubReleaseUrl(rc9)).toEqual({ owner: "NousResearch", repo: "hermes-agent", tag: "rc.9-v0.21.7" });
  });

  it("returns null for other links", () => {
    expect(parseGithubReleaseUrl("https://github.com/NousResearch/hermes-agent")).toBeNull();
    expect(parseGithubReleaseUrl("https://openai.com/index/gpt-6")).toBeNull();
    expect(parseGithubReleaseUrl("not a url")).toBeNull();
  });
});

describe("isPrereleaseTag", () => {
  it("flags release candidates and other pre-release markers", () => {
    for (const tag of ["abandoned-rc.8-v0.21.7", "rc.9-v0.21.7", "v1.2.3-beta.1", "v2.0.0-preview", "v1.0.0-dev", "v3.1.0-alpha", "nightly-2026-10-09"]) {
      expect(isPrereleaseTag(tag), tag).toBe(true);
    }
  });

  it("leaves stable tags alone", () => {
    for (const tag of ["v0.21.7", "v2.0.0", "2026.10.9", "release-2026.10.9", "device-pre-check"]) {
      expect(isPrereleaseTag(tag), tag).toBe(false);
    }
  });
});

describe("releaseSkipReason", () => {
  it("skips pre-release GitHub tags only", () => {
    expect(releaseSkipReason({ link: rc8 })).toMatch(/kandidat\/pra-rilis/);
    expect(releaseSkipReason({ link: stable })).toBeNull();
    expect(releaseSkipReason({ link: "https://openai.com/index/rc-1" })).toBeNull();
    expect(releaseSkipReason({})).toBeNull();
  });
});

describe("releaseTopicTokens", () => {
  it("gives every tag of one version the same tokens", () => {
    const a = releaseTopicTokens(parseGithubReleaseUrl(rc8));
    const b = releaseTopicTokens(parseGithubReleaseUrl(rc9));
    const c = releaseTopicTokens(parseGithubReleaseUrl(stable));
    expect([...a].sort()).toEqual(["0_21_7", "agent", "hermes"]);
    expect([...b].sort()).toEqual([...a].sort());
    expect([...c].sort()).toEqual([...a].sort());
  });

  it("uses cleaned tag words when the tag has no version number", () => {
    expect([...releaseTopicTokens({ repo: "tool", tag: "nightly-spring" })].sort()).toEqual(["spring", "tool"]);
  });

  it("exposes the minimum release-notes length", () => {
    expect(MIN_RELEASE_NOTES_CHARS).toBe(120);
  });
});
