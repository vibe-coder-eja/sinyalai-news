import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Escape string for YAML double-quoted scalars.
 * @param {string} value
 */
const MAX_SUMMARY_LENGTH = 220;

/**
 * Escape string for YAML double-quoted scalars.
 * @param {string} value
 */
export function yamlQuote(value) {
  if (typeof value !== "string") return "";
  return value
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r/g, "")
    .replace(/\n/g, " ")
    .replace(/\t/g, " ")
    .replace(/[\x00-\x1f\x7f-\x9f]/g, "")
    .trim();
}

/**
 * @param {unknown} value
 */
function isSecureUrl(value) {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password;
  } catch {
    return false;
  }
}

/**
 * Truncate text at the last word boundary before the limit.
 * @param {string} text
 * @param {number} limit
 */
function truncateAtWord(text, limit) {
  if (!text) return "";
  if (text.length <= limit) return text;
  const truncated = text.slice(0, limit);
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > 0) {
    return truncated.slice(0, lastSpace).trim() + "...";
  }
  return truncated.trim() + "...";
}

/**
 * @param {Date} date
 */
export function toIsoDate(date) {
  if (!date || Number.isNaN(date.valueOf())) {
    return new Date().toISOString().slice(0, 10);
  }
  return date.toISOString().slice(0, 10);
}

/**
 * Skeleton “rewrite” — nanti diganti LLM (xAI/Grok API, dll.).
 * @param {{ title: string, summary: string, company: string, link: string }} item
 */
export function buildDraftBody(item) {
  const blurb =
    item.summary ||
    "Ringkasan otomatis belum tersedia. Silakan baca sumber resmi.";

  const safeLink = isSecureUrl(item.link) ? item.link : "#";

  return [
    `> Draft otomatis dari pipeline Sinyal AI. **Belum di-review editorial.**`,
    ``,
    `${item.company} merilis pembaruan terkait: **${item.title}**.`,
    ``,
    blurb,
    ``,
    `## Yang perlu diverifikasi`,
    ``,
    `- Detail teknis dan klaim di sumber resmi`,
    `- Tanggal rilis dan ketersediaan produk/API`,
    `- Apakah ini sinyal penting bagi pembaca Indonesia / builder`,
    ``,
    `## Sumber`,
    ``,
    `[Buka pengumuman resmi](${safeLink})`,
    ``,
    `---`,
    ``,
    `_TODO: ganti blok ini dengan rewrite AI (ringkas, netral, sitasi sumber)._`,
    ``,
  ].join("\n");
}

/**
 * @param {object} params
 * @param {string} params.templatePath
 * @param {string} params.outDir
 * @param {string} params.slug
 * @param {string} params.title
 * @param {string} params.summary
 * @param {string} params.company
 * @param {string} params.source
 * @param {Date} params.publishedAt
 * @param {string} params.body
 * @param {boolean} params.dryRun
 * @param {string} [params.templateContent] - Optional cached template
 */
export async function writeDraftArticle(params) {
  if (!isSecureUrl(params.source)) {
    throw new Error("Article source URL must use HTTPS and must not contain credentials");
  }

  const template = params.templateContent || await readFile(params.templatePath, "utf8");

  const summaryRaw = params.summary || `Sinyal otomatis: ${params.title} (${params.company}).`;
  const summary = truncateAtWord(summaryRaw, MAX_SUMMARY_LENGTH);

  const markdown = template
    .replaceAll("{{title}}", yamlQuote(params.title))
    .replaceAll("{{summary}}", yamlQuote(summary))
    .replaceAll("{{company}}", yamlQuote(params.company))
    .replaceAll("{{source}}", yamlQuote(params.source))
    .replaceAll("{{publishedAt}}", toIsoDate(params.publishedAt))
    .replaceAll("{{body}}", params.body);

  const outPath = path.join(params.outDir, `${params.slug}.md`);

  if (params.dryRun) {
    return { outPath, written: false, markdown };
  }

  await mkdir(params.outDir, { recursive: true });
  await writeFile(outPath, markdown, "utf8");
  return { outPath, written: true, markdown };
}
