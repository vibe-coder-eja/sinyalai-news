import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { parseFeed, fetchFeed } from "../rss.mjs";

describe("parseFeed", () => {
  it("parses RSS 2.0 format", () => {
    const xml = `
      <rss>
        <channel>
          <item>
            <title>Test Title</title>
            <link>https://example.com/1</link>
            <description>Test Description</description>
            <pubDate>Wed, 15 Jul 2026 12:00:00 GMT</pubDate>
          </item>
        </channel>
      </rss>
    `;
    const items = parseFeed(xml);
    expect(items.length).toBe(1);
    expect(items[0].title).toBe("Test Title");
    expect(items[0].link).toBe("https://example.com/1");
    expect(items[0].summary).toBe("Test Description");
    expect(items[0].publishedAt).toBeInstanceOf(Date);
    expect(items[0].publishedAt.toISOString()).toBe("2026-07-15T12:00:00.000Z");
  });

  it("parses Atom format", () => {
    const xml = `
      <feed xmlns="http://www.w3.org/2005/Atom">
        <entry>
          <title>Atom Title</title>
          <link href="https://example.com/2"/>
          <summary>Atom Summary</summary>
          <published>2026-07-15T10:00:00Z</published>
        </entry>
      </feed>
    `;
    const items = parseFeed(xml);
    expect(items.length).toBe(1);
    expect(items[0].title).toBe("Atom Title");
    expect(items[0].link).toBe("https://example.com/2");
    expect(items[0].summary).toBe("Atom Summary");
    expect(items[0].publishedAt.toISOString()).toBe("2026-07-15T10:00:00.000Z");
  });

  it("handles CDATA sections", () => {
    const xml = `
      <rss>
        <channel>
          <item>
            <title><![CDATA[Title with CDATA]]></title>
            <link>https://example.com/3</link>
            <description><![CDATA[Description with <p>HTML</p> CDATA]]></description>
          </item>
        </channel>
      </rss>
    `;
    const items = parseFeed(xml);
    expect(items.length).toBe(1);
    expect(items[0].title).toBe("Title with CDATA");
    expect(items[0].summary).toBe("Description with HTML CDATA");
  });

  it("returns null date for invalid pubDate", () => {
    const xml = `
      <rss>
        <channel>
          <item>
            <title>Title</title>
            <link>https://example.com/4</link>
            <pubDate>not-a-date</pubDate>
          </item>
        </channel>
      </rss>
    `;
    const items = parseFeed(xml);
    expect(items[0].publishedAt).toBeNull();
  });

  it("prioritizes an Atom alternate link regardless of attribute order", () => {
    const xml = `
      <feed><entry>
        <title>Title</title>
        <link href="https://example.com/self" rel="self" />
        <link href="https://example.com/article" rel="alternate" />
      </entry></feed>
    `;
    expect(parseFeed(xml)[0].link).toBe("https://example.com/article");
  });

  it("drops feed items with insecure article links", () => {
    const xml = `
      <rss><channel><item>
        <title>Unsafe</title>
        <link>http://example.com/article</link>
      </item></channel></rss>
    `;
    expect(parseFeed(xml)).toEqual([]);
  });
});

describe("fetchFeed", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("enforces HTTPS scheme", async () => {
    await expect(fetchFeed("http://example.com/feed.xml")).rejects.toThrow("URL must use HTTPS");
  });

  it("successfully fetches and parses HTTPS url", async () => {
    const mockXml = `
      <rss><channel><item>
        <title>Ok</title>
        <link>https://example.com/ok</link>
      </item></channel></rss>
    `;

    const mockResponse = {
      ok: true,
      body: {
        getReader() {
          let readCount = 0;
          return {
            read() {
              if (readCount === 0) {
                readCount++;
                return Promise.resolve({ done: false, value: new TextEncoder().encode(mockXml) });
              }
              return Promise.resolve({ done: true, value: undefined });
            },
            releaseLock() {}
          };
        }
      }
    };

    fetch.mockResolvedValue(mockResponse);
    const items = await fetchFeed("https://example.com/feed.xml");
    expect(items.length).toBe(1);
    expect(items[0].title).toBe("Ok");
  });

  it("rejects response larger than MAX_RESPONSE_SIZE (5MB)", async () => {
    const mockResponse = {
      ok: true,
      body: {
        getReader() {
          return {
            read() {
              return Promise.resolve({ done: false, value: new Uint8Array(6 * 1024 * 1024) });
            },
            releaseLock() {}
          };
        }
      }
    };
    fetch.mockResolvedValue(mockResponse);
    await expect(fetchFeed("https://example.com/huge.xml")).rejects.toThrow("Response size exceeded limit");
  });
});
