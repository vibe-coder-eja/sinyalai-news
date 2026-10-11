#!/usr/bin/env node
/**
 * Arsipkan seluruh artikel tayang (archived: true). Berkas tetap ada di repo, hanya tidak
 * tampil di situs. Dipakai oleh workflow reset-konten sebelum menulis ulang berita.
 *
 * Pemakaian: node scripts/archive-all.mjs [--dry-run]
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { archiveMarkdown } from "./lib/archive.mjs";

const DIR = path.resolve(process.cwd(), "src/content/news");
const dryRun = process.argv.includes("--dry-run");

let changed = 0;
for (const file of await readdir(DIR, { recursive: true })) {
  if (!/\.mdx?$/i.test(file)) continue;
  const full = path.join(DIR, file);
  const raw = await readFile(full, "utf8");
  const next = archiveMarkdown(raw);
  if (next === raw) continue;
  changed++;
  if (!dryRun) await writeFile(full, next, "utf8");
}
console.log(`${dryRun ? "[dry run] " : ""}${changed} artikel diarsipkan.`);
