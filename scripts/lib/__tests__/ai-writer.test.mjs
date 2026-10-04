import { describe, it, expect, vi, afterEach } from "vitest";
import { parseAIJsonResponse, generateArticleWithAI, SYSTEM_PROMPT } from "../ai-writer.mjs";

describe("parseAIJsonResponse", () => {
  it("parses clean JSON string", () => {
    const raw = JSON.stringify({
      title: "OpenAI Rilis Model Baru",
      summary: "OpenAI memperkenalkan pembaruan sistem.",
      body: "OpenAI resmi merilis model generasi baru.",
    });
    const parsed = parseAIJsonResponse(raw);
    expect(parsed.title).toBe("OpenAI Rilis Model Baru");
    expect(parsed.summary).toBe("OpenAI memperkenalkan pembaruan sistem.");
    expect(parsed.body).toBe("OpenAI resmi merilis model generasi baru.");
  });

  it("handles markdown code fences ```json ... ```", () => {
    const raw = "```json\n{\n  \"title\": \"Anthropic Perluas Claude\",\n  \"summary\": \"Claude kini mendukung pemanggilan API baru.\",\n  \"body\": \"Anthropic mengumumkan ketersediaan fitur ini.\"\n}\n```";
    const parsed = parseAIJsonResponse(raw);
    expect(parsed.title).toBe("Anthropic Perluas Claude");
    expect(parsed.summary).toBe("Claude kini mendukung pemanggilan API baru.");
  });

  it("throws when title or required fields are missing", () => {
    const raw = JSON.stringify({ summary: "Hanya summary", body: "Isi berita" });
    expect(() => parseAIJsonResponse(raw)).toThrow(/missing 'title'/);
  });

  it("throws when output is not valid JSON", () => {
    expect(() => parseAIJsonResponse("Ini bukan json sama sekali")).toThrow();
  });
});

describe("generateArticleWithAI", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("throws immediately if apiKey is missing", async () => {
    await expect(
      generateArticleWithAI({
        title: "Test",
        summary: "Summary",
        company: "OpenAI",
        sourceUrl: "https://openai.com/news",
        apiKey: "",
      }),
    ).rejects.toThrow(/API key is required/);
  });

  it("calls OpenRouter and returns parsed result on successful fetch", async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content: JSON.stringify({
              title: "xAI Hadirkan Fitur Baru",
              summary: "xAI merilis kapabilitas penulisan kode.",
              body: "xAI mengintegrasikan model Grok ke ekosistem koding.",
            }),
          },
        },
      ],
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });
    globalThis.fetch = fetchMock;

    const result = await generateArticleWithAI({
      title: "xAI Announces Grok",
      summary: "Official release",
      company: "xAI",
      sourceUrl: "https://x.ai/news",
      apiKey: "sk-test-key",
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(result.title).toBe("xAI Hadirkan Fitur Baru");
    expect(result.summary).toBe("xAI merilis kapabilitas penulisan kode.");
  });

  it("throws error when HTTP status is not ok", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      text: async () => "Unauthorized API key",
    });
    globalThis.fetch = fetchMock;

    await expect(
      generateArticleWithAI({
        title: "Test",
        summary: "Summary",
        company: "Google",
        sourceUrl: "https://deepmind.google/news",
        apiKey: "sk-invalid",
      }),
    ).rejects.toThrow(/HTTP 401/);
  });
});
