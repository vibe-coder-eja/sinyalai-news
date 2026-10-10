/**
 * AI-relevance filter for general-purpose feeds (e.g. corporate blogs that
 * mix AI news with gaming, policy, or HR posts).
 *
 * Sources flagged `aiFocused: true` in sources.json skip the keyword check
 * but still honour `excludeKeywords`.
 */

/**
 * Case-insensitive keyword patterns. Kept as regex so short tokens like
 * "LLM" or "GPT" only match as whole words.
 */
const AI_PATTERNS = [
  /\bartificial intelligence\b/i,
  /\bgenerative\b/i,
  /\bgen ?ai\b/i,
  /\bmachine learning\b/i,
  /\bdeep learning\b/i,
  /\bneural (?:network|net)s?\b/i,
  /\b(?:large )?language models?\b/i,
  /\bfoundation models?\b/i,
  /\breasoning models?\b/i,
  /\bLLMs?\b/i,
  /\bSLMs?\b/i,
  /\bGPT(?:-?\d[\w.]*)?\b/i,
  /\bChatGPT\b/i,
  /\bSora\b/i,
  /\bCodex\b/i,
  /\bClaude\b/i,
  /\bGemini\b/i,
  /\bGemma\b/i,
  /\bDeepMind\b/i,
  /\bCopilot\b/i,
  /\bLlama\b/i,
  /\bGrok\b/i,
  /\bagentic\b/i,
  /\bAI agents?\b/i,
  /\bchatbots?\b/i,
  /\binference\b/i,
  /\bfine-?tun(?:e|ed|ing)\b/i,
  /\bembeddings?\b/i,
  /\btransformers?\b/i,
  /\bdiffusion\b/i,
  /\bNIM\b/,
  /\bAI factor(?:y|ies)\b/i,
  /\bsupercomput(?:er|ers|ing)\b/i,
];

/**
 * "AI" on its own is matched case-sensitively so words like "said" or
 * "Taiwan" never trigger it, while "AI-powered" and "AI," still do.
 */
const UPPERCASE_AI = /(?:^|[^A-Za-z])AI(?:[^A-Za-z]|$)/;

/** URL path segments that strongly signal an AI article. */
const AI_URL_SEGMENT = /\/(?:ai|artificial-intelligence|machine-learning|generative-ai)(?:\/|-|$)/i;

/**
 * @param {string} text
 * @param {string[]} keywords
 */
function containsAny(text, keywords) {
  const haystack = text.toLowerCase();
  return keywords.some((k) => k && haystack.includes(k.toLowerCase()));
}

/**
 * @param {{ title?: string, summary?: string, link?: string }} item
 * @returns {boolean}
 */
export function hasAiSignal(item) {
  const text = `${item.title || ""} ${item.summary || ""}`;
  if (UPPERCASE_AI.test(text)) return true;
  if (AI_PATTERNS.some((re) => re.test(text))) return true;
  if (item.link) {
    try {
      if (AI_URL_SEGMENT.test(new URL(item.link).pathname)) return true;
    } catch {
      /* ignore malformed links; parseFeed already validates them */
    }
  }
  return false;
}

/**
 * Decide whether a feed item should become a draft.
 *
 * @param {{ title?: string, summary?: string, link?: string }} item
 * @param {{ aiFocused?: boolean, excludeKeywords?: string[] }} source
 * @returns {{ keep: boolean, reason: string }}
 */
export function checkRelevance(item, source = {}) {
  const text = `${item.title || ""} ${item.summary || ""}`;
  const excludes = Array.isArray(source.excludeKeywords) ? source.excludeKeywords : [];

  if (excludes.length && containsAny(text, excludes)) {
    return { keep: false, reason: "excluded keyword" };
  }
  if (source.aiFocused) {
    return { keep: true, reason: "ai-focused source" };
  }
  if (hasAiSignal(item)) {
    return { keep: true, reason: "ai keyword" };
  }
  return { keep: false, reason: "no AI signal" };
}

/** Skor dasar tiap kategori editorial. */
export const CATEGORY_SCORES = {
  "Rilis Model": 50,
  "Fitur & Skills": 45,
  "Produk Baru": 40,
  "Kerjasama Industri": 40,
  "Penerapan Industri": 35,
  "Riset & Kebijakan": 35,
  "Standar Umum": 10,
};

/** Bonus kecil untuk tiap kategori tambahan di luar yang tertinggi, dibatasi agar skor tidak menumpuk. */
const EXTRA_CATEGORY_BONUS = 5;
const MAX_EXTRA_BONUS = 10;

/**
 * Kata kunci per kategori. Pola "Rilis Model" sengaja sempit: kata "model" saja
 * terlalu umum ("business model", "model guide") sehingga hampir semua berita menyala.
 * Rilis model dikenali dari nama keluarga model atau frasa "new/frontier/... model".
 */
const CATEGORY_PATTERNS = {
  "Rilis Model": [
    /\b(?:new|frontier|foundation|reasoning|open(?:-weight)?|multimodal|language|embedding|speech|vision|video|image) models?\b/i,
    /\b(?:gpt-?\d[\w.-]*|claude|gemini|gemma|grok|llama|deepseek|qwen|mistral|nemotron|sora|o1|o3|o4)\b/i,
    /\b(?:weights|checkpoints?)\b/i,
  ],
  "Fitur & Skills": [
    /\bskills?\b/i,
    /\b(?:features?|capabilities|tool use|computer use|code execution|agentic|ai agents?)\b/i,
    /\b(?:workflows?|prompt caching|voice mode|multimodal)\b/i,
  ],
  "Produk Baru": [
    /\b(?:introducing|announcing|launch(?:ing|ed|es)?|new product|hardware|dgx|blackwell|tpu|chip|copilot)\b/i,
    /\b(?:api availability|sdk|workstation|supercomputing)\b/i,
  ],
  "Kerjasama Industri": [
    /\b(?:partners?|partnerships?|collaborat(?:e|ion|ing)|alliance|agreements?|joint|invest(?:ment|s|ing)?|enterprise deal)\b/i,
  ],
  "Penerapan Industri": [
    /\b(?:customers?|case study|startups?|enterprises?)\b/i,
    /\b(?:scales?|scaling|cuts?|halves|saves?|speeds? up|accelerates?|streamlines?)\b.*\b(?:with|using|on)\b/i,
  ],
  "Riset & Kebijakan": [
    /\b(?:research|study|studies|paper|safety|security|policy|regulations?|governance|alignment|evaluations?|benchmarks?|risks?)\b/i,
  ],
};

/**
 * Hitung skor prioritas editorial dari judul dan cuplikan.
 *
 * Skor = skor kategori tertinggi + 5 per kategori tambahan (maks +10). Skor tidak
 * lagi dijumlahkan penuh, agar satu berita tidak mengungguli yang lain hanya karena
 * menyentuh banyak kata kunci. Penyetelan lanjutan (bonus edisi, keseimbangan kategori)
 * dilakukan saat seleksi di editor.mjs.
 *
 * @param {{ title?: string, summary?: string, link?: string }} item
 * @returns {{ priorityScore: number, categories: string[], isTopPriority: boolean }}
 */
export function getEditorialPriority(item) {
  const text = `${item.title || ""} ${item.summary || ""}`.toLowerCase();
  const categories = Object.keys(CATEGORY_PATTERNS).filter((name) =>
    CATEGORY_PATTERNS[name].some((re) => re.test(text)),
  );

  if (categories.length === 0) {
    return { priorityScore: CATEGORY_SCORES["Standar Umum"], categories: ["Standar Umum"], isTopPriority: false };
  }

  const scores = categories.map((c) => CATEGORY_SCORES[c]).sort((x, y) => y - x);
  const extra = Math.min(MAX_EXTRA_BONUS, (scores.length - 1) * EXTRA_CATEGORY_BONUS);
  const priorityScore = scores[0] + extra;

  return {
    priorityScore,
    categories,
    isTopPriority: priorityScore >= 40,
  };
}
