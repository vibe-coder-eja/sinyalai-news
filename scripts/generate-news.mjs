#!/usr/bin/env node
/**
 * Automated News Generator for Sinyal AI News
 * - Fetches official AI releases from configured sources (OpenAI, Anthropic, Google, Microsoft, NVIDIA, xAI).
 * - Applies AI relevance filtering and cross-article deduplication.
 * - Rewrites signals into Indonesian straight-news articles (inverted pyramid, source by line,
 *   neutral, with relevant background) using OpenRouter (Minimax M3). Rules live in lib/ai-writer.mjs.
 * - Authors articles under 'Redaktur Sinyal AI News (RSAIN)'.
 */

import fs from "node:fs";
import path from "node:path";
import { fetchFeed } from "./lib/rss.mjs";
import { checkRelevance, getEditorialPriority } from "./lib/relevance.mjs";
import { loadExistingArticles, normalizeUrl } from "./lib/dedupe.mjs";
import { slugify } from "./lib/slug.mjs";
import { writePublishedArticle, toIsoDate } from "./lib/markdown.mjs";
import { formatDayMonth } from "./lib/text.mjs";
import { selectEditorialEdition, isToday, DEFAULT_MAX_AGE_DAYS } from "./lib/editor.mjs";
import { getEdition } from "./lib/editions.mjs";
import { generateArticleWithAI } from "./lib/ai-writer.mjs";
import { fetchSourceText } from "./lib/source-context.mjs";

/**
 * Basic .env loader (without external dependencies)
 */
function loadLocalEnv() {
  const envPath = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const raw = fs.readFileSync(envPath, "utf-8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        let val = trimmed.slice(idx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadLocalEnv();

const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = process.env.OPENROUTER_MODEL || "minimax/minimax-m3";
const CONTENT_DIR = path.resolve(process.cwd(), "src/content/news");
const SOURCES_PATH = path.resolve(process.cwd(), "scripts/sources.json");

// CLI arguments parsing
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const sourceFilter = args.find((a) => a.startsWith("--source="))?.split("=")[1];
// Default quota: 3 articles per edition (Pagi: 3, Malam: 3)
const maxAgeDays = parseInt(args.find((a) => a.startsWith("--max-age-days="))?.split("=")[1] || String(DEFAULT_MAX_AGE_DAYS), 10);
const editionQuota = parseInt(args.find((a) => a.startsWith("--limit="))?.split("=")[1] || "3", 10);

// Determine broadcast edition (Pagi: 10:35 WIB / 03:35 UTC, Malam: 22:05 WIB / 15:05 UTC)
const currentUtcHour = new Date().getUTCHours();
const defaultEdition = currentUtcHour < 12 ? "pagi" : "malam";
const edition = args.find((a) => a.startsWith("--edition="))?.split("=")[1] || defaultEdition;
const editionProfile = getEdition(edition);
const editionLabel = editionProfile.label;

async function main() {
  console.log(`\n======================================================`);
  console.log(`🤖 Sinyal AI News — Pemimpin Redaksi (${editionLabel})`);
  console.log(`======================================================`);
  console.log(`Model: ${MODEL}`);
  console.log(`Target Direktori: ${CONTENT_DIR}`);
  console.log(`Target Kuota Tayang: ${editionQuota} berita`);
  console.log(`Fokus edisi: ${editionProfile.focus}`);
  console.log(`Batas usia rilis: ${maxAgeDays} hari (tanggal tayang mengikuti tanggal sumber)`);
  console.log(`Dry run: ${dryRun ? "YA (tidak menyimpan file)" : "TIDAK (publikasi langsung)"}`);

  if (!API_KEY) {
    console.error(`\n❌ Error: OPENROUTER_API_KEY tidak ditemukan.`);
    console.error(`Pastikan file .env lokal atau GitHub Repository Secrets telah terpasang.\n`);
    process.exit(1);
  }

  if (!fs.existsSync(SOURCES_PATH)) {
    console.error(`\n❌ Error: File sumber ${SOURCES_PATH} tidak ditemukan.\n`);
    process.exit(1);
  }

  const rawSources = JSON.parse(fs.readFileSync(SOURCES_PATH, "utf-8"));
  let sources = rawSources.sources || [];

  if (sourceFilter) {
    sources = sources.filter((s) => s.id === sourceFilter || s.company.toLowerCase() === sourceFilter.toLowerCase());
  }

  // Load existing published URLs for deduplication
  const { sources: existingUrls, entries: existingEntries } = await loadExistingArticles(CONTENT_DIR);
  console.log(`Terdeteksi ${existingUrls.size} URL rilis resmi yang sudah ada sebelumnya.\n`);

  // 1. Fetch and pool candidate signals from all sources
  console.log(`🔍 Mengumpulkan sinyal rilis dari ${sources.length} sumber resmi...`);
  const allFeedItems = [];

  for (const src of sources) {
    try {
      const feedItems = await fetchFeed(src.url, 15000);
      let relevantCount = 0;
      for (const item of feedItems) {
        const relevance = checkRelevance(item, src);
        if (!relevance.keep) continue;
        const priority = getEditorialPriority(item);
        allFeedItems.push({ item, source: src, priority });
        relevantCount++;
      }
      console.log(`   • [${src.company}] ${feedItems.length} entri (${relevantCount} sinyal relevan)`);
    } catch (err) {
      console.warn(`   ⚠️ Gagal menarik feed ${src.id}: ${err.message}`);
    }
  }

  // 2. Chief Editor Selection (Prioritas, Hari Ini > Hari Sebelumnya, Anti-Duplikasi, Diversifikasi)
  const selectedArticles = selectEditorialEdition({
    allFeedItems,
    existingUrls,
    // Ambil kandidat cadangan: yang gagal validasi/konteks tipis digantikan kandidat berikutnya.
    limit: editionQuota * 2,
    referenceDate: new Date(),
    maxAgeDays,
    edition: editionProfile,
    existingEntries,
    onSkip: ({ reason, candidate, match }) => {
      console.log(
        `   ⏭️ Dilewati (${reason}): "${candidate.item.title}"` +
          (match ? ` mirip dengan "${match.label}" (kecocokan ${Math.round(match.score * 100)}%, kata: ${match.shared.join(", ")})` : ""),
      );
    },
  });

  console.log(`\n📋 Hasil Kurasi Pemimpin Redaksi (${selectedArticles.length} kandidat untuk ${editionQuota} slot tayang):`);
  if (selectedArticles.length === 0) {
    console.log(`   ℹ️ Tidak ada rilis baru yang layak tayang saat ini.`);
    console.log(`\n======================================================\n`);
    return;
  }

  selectedArticles.forEach((cand, idx) => {
    const isCurToday = isToday(cand.item.publishedAt);
    const tag = cand.priority.categories.join(", ");
    console.log(`   ${idx + 1}. [${isCurToday ? "HARI INI" : "HARI SEBELUMNYA"} | ${cand.source.company} | ${tag} (Skor: ${cand.priority.priorityScore}, efektif: ${cand.effectiveScore})]:`);
    console.log(`      "${cand.item.title}"`);
    console.log(`      Sumber: ${cand.item.link}`);
  });

  // 3. Process and write only the chosen articles (strictly saving API tokens)
  console.log(`\n✍️ Memulai penulisan berita dengan AI (Maksimal ${selectedArticles.length} artikel)...`);
  let totalPublished = 0;

  for (const candidate of selectedArticles) {
    if (totalPublished >= editionQuota) break;
    const { item, source: src, normUrl, priority } = candidate;
    console.log(`\n   🧠 Menjalankan AI rewrite (Humanizer & Redaktur RSAIN) untuk [${src.company}]: "${item.title}"...`);

    try {
      const sourceText = await fetchSourceText(item.link);
      console.log(
        `      📄 Konteks: halaman sumber ${sourceText.length} karakter, cuplikan feed ${(item.summary || "").length} karakter`,
      );
      const hasEnoughContext = sourceText.length >= 300 || (item.summary || "").length >= 120;
      if (!hasEnoughContext) {
        console.warn(`      ⏭️ Dilewati: konteks sumber terlalu tipis, berisiko halusinasi.`);
        continue;
      }

      // Tanggal tayang mengikuti tanggal rilis sumber (tidak pernah di masa depan).
      const now = new Date();
      const sourceDate = item.publishedAt;
      const publishedDate = sourceDate.getTime() > now.getTime() ? now : sourceDate;

      const aiArticle = await generateArticleWithAI({
        title: item.title,
        summary: item.summary || "",
        company: src.company,
        sourceUrl: item.link,
        sourceText,
        // Atribusi sumber di isi artikel memakai tanggal ini (dd/mm).
        releaseDate: formatDayMonth(publishedDate),
        editionFocus: editionProfile.writerFocus,
        apiKey: API_KEY,
        model: MODEL,
      });

      // Judul sudah memuat nama perusahaan (divalidasi), jadi slug cukup dari judul.
      const slug = slugify(aiArticle.title);

      const result = await writePublishedArticle({
        outDir: CONTENT_DIR,
        dateFolder: toIsoDate(publishedDate),
        slug,
        title: aiArticle.title,
        summary: aiArticle.summary,
        company: src.company,
        source: item.link,
        author: "Redaktur Sinyal AI News (RSAIN)",
        publishedAt: publishedDate,
        body: aiArticle.body,
        sourceTitle: item.title,
        categories: priority.categories,
        dryRun,
      });

      console.log(
        dryRun
          ? `      ✅ Lolos validasi (dry run, tidak disimpan): ${result.outPath}`
          : `      ✅ Berhasil diterbitkan: ${result.outPath}`,
      );
      if (dryRun) {
        // Tampilkan hasil tulisan agar redaksi bisa menilai gaya dan isinya tanpa menerbitkan.
        console.log(`\n----- ${result.outPath} -----\n${result.markdown}\n----- selesai -----\n`);
      }
      existingUrls.add(normUrl);
      totalPublished++;
    } catch (err) {
      console.error(`      ❌ Gagal memproses artikel "${item.title}": ${err.message}`);
    }
  }

  console.log(`\n======================================================`);
  console.log(`🎉 Selesai! Total ${totalPublished} berita resmi berhasil diproduksi untuk ${editionLabel}.`);
  console.log(`======================================================\n`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
