/**
 * AI Writer Module using OpenRouter and Minimax M3.
 * Adheres strictly to Humanizer writing rules and Indonesian journalistic standards.
 */

const OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "minimax/minimax-m3";

export const SYSTEM_PROMPT = `Anda adalah Redaktur Sinyal AI News (RSAIN).
Tugas Anda adalah menulis artikel berita ringkas dan faktual berdasarkan rilis resmi industri kecerdasan buatan.

PEDOMAN JURNALISTIK & PRINSIP HUMANIZER (ANTI-AI SLOP):
1. Gaya Bahasa: Bahasa Indonesia ragam jurnalistik teknologi — lugas, netral, presisi, aktif, dan enak dibaca.
2. Hindari Pola Klise AI:
   - DILARANG menggunakan formula kontras "bukan sekadar X melainkan Y" atau "bukan hanya..., tapi juga...". Langsung nyatakan faktanya.
   - DILARANG menggunakan kata hiperbola klise: "lompatan revolusioner", "merombak lanskap", "game-changer", "menandai era baru", "tonggak penting", "pada intinya", "di era sekarang", "tak dapat dimungkiri".
   - DILARANG membuat kalimat penutup dramatis satu baris ("Ini adalah kemenangan sejati.", "Langkah ini membuktikan komitmen perusahaan.").
   - DILARANG menggelembungkan klaim biasa menjadi sesuatu yang historis atau berlebihan.
   - DILARANG menggunakan penomoran berlebihan (bold beruntun di tiap kalimat).
3. Akurasi Fakta Resmi:
   - Hanya gunakan data, angka, nama produk, benchmark, dan fitur yang benar-benar ada di sumber rilis. Dilarang berhalusinasi atau mengarang detail baru.
4. Struktur Output:
   - title: Judul berita ringkas (maks 100 karakter), informatif, memuat nama perusahaan dan nama produk/inovasi, tanpa sensasionalisme.
   - summary: Ringkasan 1-2 kalimat padat fakta untuk lead berita (antara 100 - 200 karakter).
   - body: Isi artikel dalam format Markdown (2 hingga 4 paragraf mengalir).
     * Paragraf 1: Apa yang diumumkan/dirilis oleh perusahaan.
     * Paragraf 2: Rincian teknis, kapabilitas utama, arsitektur, atau spesifikasi.
     * Paragraf 3: Ketersediaan (availability), aksesibilitas (API/web/lokal), atau implikasi praktis bagi pengembang/pengguna.

FORMAT KELUARAN:
Keluarkan HANYA teks JSON valid tanpa pembungkus teks tambahan, dengan skema:
{
  "title": "string",
  "summary": "string",
  "body": "string"
}`;

/**
 * Extracts and parses JSON from raw LLM output, handling markdown code fences.
 * @param {string} rawText
 * @returns {{ title: string, summary: string, body: string }}
 */
export function parseAIJsonResponse(rawText) {
  if (typeof rawText !== "string") {
    throw new Error("Invalid LLM response: empty or non-string output");
  }

  // Remove markdown code fences like ```json ... ``` or ``` ... ```
  let cleaned = rawText.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  }

  // If there are leading/trailing characters outside the outermost braces:
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }

  const parsed = JSON.parse(cleaned);

  if (!parsed.title || typeof parsed.title !== "string") {
    throw new Error("AI output missing 'title' string");
  }
  if (!parsed.summary || typeof parsed.summary !== "string") {
    throw new Error("AI output missing 'summary' string");
  }
  if (!parsed.body || typeof parsed.body !== "string") {
    throw new Error("AI output missing 'body' string");
  }

  return {
    title: parsed.title.trim(),
    summary: parsed.summary.trim(),
    body: parsed.body.trim(),
  };
}

/**
 * Calls OpenRouter to write an article with Minimax M3 adhering to Humanizer standards.
 * @param {object} params
 * @param {string} params.title - Original source title
 * @param {string} params.summary - Original source snippet
 * @param {string} params.company - Company name
 * @param {string} params.sourceUrl - Official URL
 * @param {string} params.apiKey - OpenRouter API key
 * @param {string} [params.model] - Model ID (default minimax/minimax-m3)
 * @param {number} [params.timeoutMs=45000] - Request timeout
 * @returns {Promise<{ title: string, summary: string, body: string }>}
 */
export async function generateArticleWithAI({
  title,
  summary,
  company,
  sourceUrl,
  apiKey,
  model = DEFAULT_MODEL,
  timeoutMs = 45000,
}) {
  if (!apiKey) {
    throw new Error("OpenRouter API key is required");
  }

  const prompt = [
    `Perusahaan: ${company}`,
    `Judul Rilis Resmi: ${title}`,
    `URL Sumber: ${sourceUrl}`,
    `Ringkasan/Cuplikan Asli: ${summary || "Tidak ada cuplikan tambahan. Kembangkan dari judul rilis resmi di atas."}`,
  ].join("\n");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(OPENROUTER_ENDPOINT, {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://vibe-coder-eja.github.io/sinyalai-news/",
        "X-Title": "Sinyal AI News",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt },
        ],
        temperature: 0.2,
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      throw new Error(`OpenRouter API error (HTTP ${res.status}): ${errText.slice(0, 300)}`);
    }

    const data = await res.json();
    const rawContent = data.choices?.[0]?.message?.content;

    if (!rawContent) {
      throw new Error("Empty response choice received from OpenRouter");
    }

    return parseAIJsonResponse(rawContent);
  } finally {
    clearTimeout(timer);
  }
}
