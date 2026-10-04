#!/usr/bin/env node
/**
 * Automated News Generator for Sinyal AI News
 * - Fetches official AI releases from configured sources (OpenAI, Anthropic, Google, Microsoft, NVIDIA, xAI).
 * - Applies AI relevance filtering and cross-article deduplication.
 * - Rewrites signals into professional Indonesian journalistic articles using OpenRouter (Minimax M3).
 * - Implements Humanizer standards (no AI slop, no fake claims, facts first).
 * - Authors articles under 'Redaktur Sinyal AI News (RSAIN)'.
 */

import fs from "node:fs";
import path from "node:path";
import { fetchFeed } from "./lib/rss.mjs";
import { checkRelevance, getEditorialPriority } from "./lib/relevance.mjs";
import { loadExistingArticles, normalizeUrl } from "./lib/dedupe.mjs";
import { slugify } from "./lib/slug.mjs";
import { writePublishedArticle, toIsoDate } from "./lib/markdown.mjs";
import { generateArticleWithAI } from "./lib/ai-writer.mjs";

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
const maxPerSource = parseInt(args.find((a) => a.startsWith("--limit="))?.split("=")[1] || "1", 10);

// Determine broadcast edition (Pagi: 10.30 WIB / 03:30 UTC, Malam: 22.00 WIB / 15:00 UTC)
const currentUtcHour = new Date().getUTCHours();
const defaultEdition = currentUtcHour < 12 ? "pagi" : "malam";
const edition = args.find((a) => a.startsWith("--edition="))?.split("=")[1] || defaultEdition;
const editionLabel = edition === "pagi" ? "Edisi Pagi (10:30 WIB)" : "Edisi Malam (22:00 WIB)";

async function main() {
  console.log(`\n======================================================`);
  console.log(`🤖 Sinyal AI News — Generator Otomatis (${editionLabel})`);
  console.log(`======================================================`);
  console.log(`Model: ${MODEL}`);
  console.log(`Target Direktori: ${CONTENT_DIR}`);
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
  const { sources: existingUrls } = await loadExistingArticles(CONTENT_DIR);
  console.log(`Terdeteksi ${existingUrls.size} URL rilis resmi yang sudah ada sebelumnya.\n`);

  let totalPublished = 0;

  for (const src of sources) {
    console.log(`\n📡 Memeriksa sumber: ${src.company} (${src.id})...`);
    let feedItems = [];

    try {
      feedItems = await fetchFeed(src.url, 15000);
      console.log(`   Ditemukan ${feedItems.length} entri feed dari ${src.url}`);
    } catch (err) {
      console.warn(`   ⚠️ Gagal menarik feed ${src.id}: ${err.message}`);
      continue;
    }

    let publishedFromSource = 0;

    // Filter and score candidate fresh items according to Editorial Priorities
    const candidates = [];
    for (const item of feedItems) {
      const normUrl = normalizeUrl(item.link);
      if (!normUrl || existingUrls.has(normUrl)) {
        continue;
      }

      const relevance = checkRelevance(item, src);
      if (!relevance.keep) {
        continue;
      }

      const priority = getEditorialPriority(item);
      candidates.push({ item, normUrl, priority });
    }

    // Sort by priorityScore descending (Rilis Model, Fitur/Skills, Produk, Kerjasama first),
    // then by pubDate descending (newest first)
    candidates.sort((a, b) => {
      if (b.priority.priorityScore !== a.priority.priorityScore) {
        return b.priority.priorityScore - a.priority.priorityScore;
      }
      const dateA = a.item.date ? new Date(a.item.date).getTime() : 0;
      const dateB = b.item.date ? new Date(b.item.date).getTime() : 0;
      return dateB - dateA;
    });

    for (const candidate of candidates) {
      if (publishedFromSource >= maxPerSource) {
        break;
      }

      const { item, normUrl, priority } = candidate;
      const priorityTag = priority.categories.join(", ");
      console.log(`   ✨ Memproses sinyal [${priorityTag} | Skor: ${priority.priorityScore}]: "${item.title}"`);
      console.log(`      Sumber: ${item.link}`);

      try {
        console.log(`      🧠 Menjalankan AI rewrite (Humanizer & Redaktur RSAIN)...`);
        const aiArticle = await generateArticleWithAI({
          title: item.title,
          summary: item.summary || "",
          company: src.company,
          sourceUrl: item.link,
          apiKey: API_KEY,
          model: MODEL,
        });

        const slug = slugify(aiArticle.title, src.company);
        const publishedDate = item.date && !Number.isNaN(item.date.valueOf()) ? item.date : new Date();

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
          dryRun,
        });

        console.log(`      ✅ Berhasil diterbitkan: ${result.outPath}`);
        existingUrls.add(normUrl);
        publishedFromSource++;
        totalPublished++;
      } catch (err) {
        console.error(`      ❌ Gagal memproses artikel "${item.title}": ${err.message}`);
      }
    }

    if (publishedFromSource === 0) {
      console.log(`   ℹ️ Tidak ada sinyal baru yang belum terbit dari ${src.company}.`);
    }
  }

  console.log(`\n======================================================`);
  console.log(`🎉 Selesai! Total ${totalPublished} berita baru berhasil diproduksi.`);
  console.log(`======================================================\n`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
