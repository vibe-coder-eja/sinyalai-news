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

/**
 * Priority patterns based on editorial guidelines:
 * 1. Rilis Model Terbaru
 * 2. Fitur dan Skills
 * 3. Produk Terbaru / Hardware / API
 * 4. Kerjasama & Kemitraan Industri AI
 * 5. Standar Publish Umum
 *
 * @param {{ title?: string, summary?: string, link?: string }} item
 * @returns {{ priorityScore: number, categories: string[], isTopPriority: boolean }}
 */
export function getEditorialPriority(item) {
  const text = `${item.title || ""} ${item.summary || ""}`.toLowerCase();
  let score = 0;
  const categories = [];

  // 1. Rilis Model Terbaru
  const modelPatterns = [
    /\b(?:new |frontier |foundation |reasoning )?models?\b/i,
    /\b(?:gpt-[456]\w*|claude|gemini|grok|llama|deepseek|o1|o3)\b/i,
    /\b(?:weights|checkpoints?|fine-tuning model)\b/i,
  ];
  if (modelPatterns.some((re) => re.test(text))) {
    score += 50;
    categories.push("Rilis Model");
  }

  // 2. Fitur & Skills
  const skillPatterns = [
    /\bskills?\b/i,
    /\b(?:features?|capabilities|tool use|computer use|code execution|agentic|ai agents?)\b/i,
    /\b(?:workflows?|prompt caching|voice mode|multimodal)\b/i,
  ];
  if (skillPatterns.some((re) => re.test(text))) {
    score += 45;
    categories.push("Fitur & Skills");
  }

  // 3. Produk Terbaru & Hardware
  const productPatterns = [
    /\b(?:introducing|announcing|launch(?:ing|ed|es)?|new product|hardware|dgx|blackwell|tpu|chip|copilot)\b/i,
    /\b(?:api availability|sdk|workstation|supercomputing)\b/i,
  ];
  if (productPatterns.some((re) => re.test(text))) {
    score += 40;
    categories.push("Produk Baru");
  }

  // 4. Kerjasama & Kemitraan Industri
  const partnershipPatterns = [
    /\b(?:partners?|partnerships?|collaborat(?:e|ion|ing)|alliance|agreements?|joint|invest(?:ment|s|ing)?|enterprise deal)\b/i,
  ];
  if (partnershipPatterns.some((re) => re.test(text))) {
    score += 40;
    categories.push("Kerjasama Industri");
  }

  // Default baseline for general AI signals
  if (score === 0) {
    score = 10;
    categories.push("Standar Umum");
  }

  return {
    priorityScore: score,
    categories,
    isTopPriority: score >= 40,
  };
}

