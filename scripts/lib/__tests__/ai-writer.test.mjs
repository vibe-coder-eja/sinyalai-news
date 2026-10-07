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

const VALID_SUMMARY =
  "xAI merilis kapabilitas penulisan kode yang terintegrasi langsung dengan ekosistem koding terbuka.";
const VALID_BODY = [
  "xAI mengintegrasikan model Grok ke ekosistem koding sumber terbuka sehingga pengguna dapat memakai langganan yang sudah ada.",
  "Integrasi ini berjalan lokal dan memungkinkan agen menjalankan tugas pemrograman tanpa kunci API terpisah bagi pengguna.",
  "Fitur tersedia bagi pelanggan yang memenuhi syarat melalui pengaturan akun di situs resmi xAI dan dokumentasi pengembang.",
  "Pengguna dapat mengaktifkannya dari menu pengaturan tanpa instalasi tambahan dan tanpa biaya tambahan di luar langganan.",
].join("\n\n");

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
              summary: VALID_SUMMARY,
              body: VALID_BODY,
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
    expect(result.summary).toBe(VALID_SUMMARY);
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

describe("generateArticleWithAI validation and context", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const reply = (article) => ({
    ok: true,
    json: async () => ({ choices: [{ message: { content: JSON.stringify(article) } }] }),
  });
  const params = {
    title: "xAI Announces Grok",
    summary: "Official release",
    company: "xAI",
    sourceUrl: "https://x.ai/news",
    apiKey: "sk-test-key",
  };

  it("retries once when the first output fails validation, then succeeds", async () => {
    const bad = { title: "xAI 公布 Fitur", summary: VALID_SUMMARY, body: VALID_BODY };
    const good = { title: "xAI Hadirkan Fitur Baru", summary: VALID_SUMMARY, body: VALID_BODY };
    const fetchMock = vi.fn().mockResolvedValueOnce(reply(bad)).mockResolvedValueOnce(reply(good));
    globalThis.fetch = fetchMock;

    const result = await generateArticleWithAI(params);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(result.title).toBe("xAI Hadirkan Fitur Baru");
  });

  it("throws when both attempts fail validation", async () => {
    const bad = { title: "Fitur Baru", summary: "Pendek.", body: "Terlalu pendek." };
    globalThis.fetch = vi.fn().mockResolvedValue(reply(bad));
    await expect(generateArticleWithAI(params)).rejects.toThrow(/Validasi artikel gagal/);
  });

  it("sends source text inside <sumber> tags", async () => {
    const good = { title: "xAI Hadirkan Fitur Baru", summary: VALID_SUMMARY, body: VALID_BODY };
    const fetchMock = vi.fn().mockResolvedValue(reply(good));
    globalThis.fetch = fetchMock;

    await generateArticleWithAI({ ...params, sourceText: "Teks resmi dari halaman sumber." });
    const sent = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sent.messages[1].content).toContain("<sumber>\nTeks resmi dari halaman sumber.\n</sumber>");
    expect(sent.messages[0].content).toContain("DATA dari halaman web");
  });
});
