import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { truncateAtWord } from "./text.mjs";

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
 * Falls back to today's date when the feed item has no valid date.
 * Callers should flag such drafts (see `buildDraftBody({ dateMissing })`).
 * @param {Date | null | undefined} date
 */
export function toIsoDate(date) {
  if (!date || Number.isNaN(date.valueOf())) {
    return new Date().toISOString().slice(0, 10);
  }
  return date.toISOString().slice(0, 10);
}

/**
 * Skeleton “rewrite” — nanti diganti LLM (xAI/Grok API, dll.).
 * @param {{ title: string, summary: string, company: string, link: string, dateMissing?: boolean }} item
 */
export function buildDraftBody(item) {
  const blurb =
    item.summary ||
    "Ringkasan otomatis belum tersedia. Silakan baca sumber resmi.";

  const safeLink = isSecureUrl(item.link) ? item.link : "#";

  const checks = [
    `- Detail teknis dan klaim di sumber resmi`,
    `- Tanggal rilis dan ketersediaan produk/API`,
    `- Apakah ini sinyal penting bagi pembaca Indonesia / builder`,
  ];
  if (item.dateMissing) {
    checks.unshift(
      `- **⚠️ Feed tidak menyertakan tanggal terbit.** \`publishedAt\` diisi tanggal fetch — wajib dikoreksi.`,
    );
  }

  return [
    `> Draft otomatis dari pipeline Sinyal AI. **Belum di-review editorial.**`,
    ``,
    `${item.company} merilis pembaruan terkait: **${item.title}**.`,
    ``,
    blurb,
    ``,
    `## Yang perlu diverifikasi`,
    ``,
    ...checks,
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
 * @param {Date | null} params.publishedAt
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

  const targetDir = params.dateFolder ? path.join(params.outDir, params.dateFolder) : params.outDir;
  const outPath = path.join(targetDir, `${params.slug}.md`);

  if (params.dryRun) {
    return { outPath, written: false, markdown };
  }

  await mkdir(targetDir, { recursive: true });
  await writeFile(outPath, markdown, "utf8");
  return { outPath, written: true, markdown };
}

/**
 * Writes a final published article (draft: false) authored by RSAIN.
 * @param {object} params
 * @param {string} params.outDir
 * @param {string} [params.dateFolder]
 * @param {string} params.slug
 * @param {string} params.title
 * @param {string} params.summary
 * @param {string} params.company
 * @param {string} params.source
 * @param {string} [params.author]
 * @param {Date | null} [params.publishedAt]
 * @param {string} params.body
 * @param {boolean} [params.dryRun]
 */
export async function writePublishedArticle(params) {
  if (!isSecureUrl(params.source)) {
    throw new Error("Article source URL must use HTTPS and must not contain credentials");
  }

  const author = params.author || "Redaktur Sinyal AI News (RSAIN)";
  const summaryRaw = params.summary || `Sinyal resmi: ${params.title} (${params.company}).`;
  const summary = truncateAtWord(summaryRaw, MAX_SUMMARY_LENGTH);
  const publishedAt = toIsoDate(params.publishedAt);

  const markdown = [
    `---`,
    `title: "${yamlQuote(params.title)}"`,
    `summary: "${yamlQuote(summary)}"`,
    `company: "${yamlQuote(params.company)}"`,
    `source: "${yamlQuote(params.source)}"`,
    `author: "${yamlQuote(author)}"`,
    `publishedAt: ${publishedAt}`,
    `draft: false`,
    `---`,
    ``,
    params.body.trim(),
    ``,
  ].join("\n");

  const targetDir = params.dateFolder ? path.join(params.outDir, params.dateFolder) : params.outDir;
  const outPath = path.join(targetDir, `${params.slug}.md`);

  if (params.dryRun) {
    return { outPath, written: false, markdown };
  }

  await mkdir(targetDir, { recursive: true });
  await writeFile(outPath, markdown, "utf8");
  return { outPath, written: true, markdown };
}

