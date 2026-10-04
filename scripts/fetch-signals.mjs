#!/usr/bin/env node
/**
 * Sinyal AI — fetch rilis dari sumber RSS → draft Markdown.
 *
 * Usage:
 *   node scripts/fetch-signals.mjs
 *   node scripts/fetch-signals.mjs --dry-run
 *   node scripts/fetch-signals.mjs --limit 2
 *   node scripts/fetch-signals.mjs --source nvidia-blog
 *
 * Draft ditulis ke src/content/news/ dengan draft: true
 * (tidak tampil di site sampai di-set draft: false).
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fetchFeed } from "./lib/rss.mjs";
import { buildDraftBody, writeDraftArticle } from "./lib/markdown.mjs";
import { slugify, uniqueSlug } from "./lib/slug.mjs";
import { checkRelevance } from "./lib/relevance.mjs";
import { loadExistingArticles, normalizeUrl } from "./lib/dedupe.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const sourcesPath = path.join(__dirname, "sources.json");
const templatePath = path.join(__dirname, "templates", "article.md");
const outDir = path.join(root, "src", "content", "news");

function parseArgs(argv) {
  const args = {
    dryRun: false,
    limit: 3,
    source: null,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--dry-run") args.dryRun = true;
    else if (a === "--limit") args.limit = Number(argv[++i] || 3);
    else if (a === "--source") args.source = argv[++i] || null;
    else if (a === "--help" || a === "-h") args.help = true;
  }

  if (!Number.isFinite(args.limit) || args.limit < 1) args.limit = 3;
  return args;
}

function printHelp() {
  console.log(`
Sinyal AI — fetch-signals

  npm run fetch:signals
  npm run fetch:signals -- --dry-run
  npm run fetch:signals -- --limit 2
  npm run fetch:signals -- --source nvidia-blog

Opsi:
  --dry-run     Jangan tulis file, hanya log
  --limit N     Maks item baru per sumber (default: 3)
  --source ID   Hanya satu sumber (id di scripts/sources.json)
  --help        Tampilkan bantuan
`);
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    process.exit(0);
  }

  const config = JSON.parse(await readFile(sourcesPath, "utf8"));
  let sources = config.sources.filter((s) => s.enabled !== false);

  if (args.source) {
    const selected = sources.find((s) => s.id === args.source);
    if (!selected) {
      const configured = config.sources.find((s) => s.id === args.source);
      console.error(
        configured
          ? `Sumber dinonaktifkan: ${args.source}`
          : `Sumber tidak ditemukan: ${args.source}`,
      );
      process.exit(1);
    }
    sources = [selected];
  }

  const { slugs: existing, sources: existingSources } = await loadExistingArticles(outDir);
  const stats = { sources: 0, fetched: 0, written: 0, skipped: 0, filtered: 0, errors: 0 };
  let templateContent = "";
  try {
    templateContent = await readFile(templatePath, "utf8");
  } catch (err) {
    console.error(`Gagal membaca template: ${err.message}`);
    process.exit(1);
  }

  console.log(`Sinyal AI fetch · dryRun=${args.dryRun} limit=${args.limit}`);
  console.log(`Output: ${outDir}\n`);

  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    stats.sources += 1;

    if (source.type !== "rss") {
      console.log(`• [${source.id}] skip (type=${source.type}) — ${source.notes || "manual"}`);
      continue;
    }

    process.stdout.write(`• [${source.id}] fetch ${source.url} ... `);

    try {
      const items = await fetchFeed(source.url);
      console.log(`${items.length} item`);
      stats.fetched += items.length;

      // Safe sorting that handles null dates by moving them to the bottom
      const sorted = items
        .slice()
        .sort((a, b) => {
          const dateA = a.publishedAt ? a.publishedAt.getTime() : 0;
          const dateB = b.publishedAt ? b.publishedAt.getTime() : 0;
          return dateB - dateA;
        });

      // Filter for AI relevance before applying the limit, so off-topic
      // posts don't consume the per-source quota.
      const newest = [];
      for (const item of sorted) {
        if (newest.length >= args.limit) break;
        const relevance = checkRelevance(item, source);
        if (!relevance.keep) {
          console.log(`  - filter (${relevance.reason}): ${item.title}`);
          stats.filtered += 1;
          continue;
        }
        newest.push(item);
      }

      for (const item of newest) {
        const baseSlug = slugify(item.title, source.company);
        const sourceKey = normalizeUrl(item.link);

        if (sourceKey && existingSources.has(sourceKey)) {
          console.log(`  - skip (sumber sudah ada): ${item.link}`);
          stats.skipped += 1;
          continue;
        }

        if (existing.has(baseSlug)) {
          console.log(`  - skip (sudah ada): ${baseSlug}`);
          stats.skipped += 1;
          continue;
        }

        const slug = uniqueSlug(baseSlug, existing);
        const dateMissing = !item.publishedAt;
        if (dateMissing) {
          console.log(`  ! tanggal tidak tersedia di feed, diisi tanggal hari ini: ${item.title}`);
        }

        const body = buildDraftBody({
          title: item.title,
          summary: item.summary,
          company: source.company,
          link: item.link,
          dateMissing,
        });

        const result = await writeDraftArticle({
          templatePath,
          templateContent,
          outDir,
          slug,
          title: item.title,
          summary: item.summary,
          company: source.company,
          source: item.link,
          publishedAt: item.publishedAt,
          body,
          dryRun: args.dryRun,
        });

        existing.add(slug);
        existing.add(baseSlug);
        if (sourceKey) existingSources.add(sourceKey);
        stats.written += 1;
        console.log(
          `  - ${args.dryRun ? "draft?" : "wrote"} ${path.relative(root, result.outPath)}`,
        );
      }
    } catch (err) {
      stats.errors += 1;
      console.log("ERROR");
      console.error(`  ! ${err instanceof Error ? err.message : err}`);
    }

    if (i < sources.length - 1) {
      await delay(500);
    }
  }

  console.log("\nSelesai.");
  console.log(
    `sources=${stats.sources} fetched_items=${stats.fetched} written=${stats.written} skipped=${stats.skipped} filtered=${stats.filtered} errors=${stats.errors}`,
  );
  console.log(
    "\nLangkah berikutnya: review file draft:true → edit ringkasan → set draft: false → npm run build",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
