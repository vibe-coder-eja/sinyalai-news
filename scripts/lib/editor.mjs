/**
 * Pemimpin Redaksi Sinyal AI News (Chief Editorial Selector)
 *
 * Mengelola seleksi berita terbaik per edisi tayang (pagi: 3 berita, malam: 3 berita):
 * 1. Mencegah duplikasi dengan memfilter URL yang sudah pernah diterbitkan.
 * 2. Memprioritaskan rilis "Hari Ini" (terkini).
 * 3. Jika rilis hari ini belum memenuhi kuota (3 berita), melakukan kurasi mundur
 *    ke "Hari Sebelumnya" (backlog yang belum pernah dirilis).
 * 4. Mengurutkan berdasarkan skor prioritas editorial:
 *    - Rilis Model Terbaru (50)
 *    - Fitur & Skills (45)
 *    - Produk Baru & Infrastruktur (40)
 *    - Kerjasama / Kemitraan Industri (40)
 *    - Standar Umum (10)
 * 5. Menjaga keberagaman industri (diversifikasi perusahaan/sumber) dalam satu edisi tayang.
 * 6. Menyetel skor otomatis: bonus fokus edisi (editions.mjs) dan penalti keseimbangan
 *    kategori, yaitu kategori yang sudah mendominasi artikel terbaru diturunkan skornya.
 * 7. Membuang berita yang topiknya sama dengan artikel yang sudah ada atau kandidat
 *    lain yang lebih tinggi (topic.mjs), walaupun URL sumbernya berbeda.
 */

import { normalizeUrl } from "./dedupe.mjs";
import { editionBoost } from "./editions.mjs";
import { buildTopic, makeWeigher, findSameTopic } from "./topic.mjs";
import { releaseSkipReason } from "./release-tags.mjs";

/** Batas usia rilis yang layak tayang (hari). */
export const DEFAULT_MAX_AGE_DAYS = 7;

/** Toleransi selisih jam untuk tanggal sumber yang sedikit di masa depan (beda zona waktu). */
const FUTURE_TOLERANCE_HOURS = 24;

/**
 * Cek apakah tanggal rilis sumber masih layak tayang: valid, tidak lebih tua dari
 * `maxAgeDays`, dan tidak berada jauh di masa depan. Tanpa tanggal valid → tidak layak.
 * @param {Date | null | undefined} date
 * @param {Date} referenceDate
 * @param {number} maxAgeDays
 * @returns {boolean}
 */
export function isFreshEnough(date, referenceDate = new Date(), maxAgeDays = DEFAULT_MAX_AGE_DAYS) {
  if (!(date instanceof Date) || Number.isNaN(date.valueOf())) return false;
  const diffHours = (referenceDate.getTime() - date.getTime()) / (1000 * 60 * 60);
  return diffHours >= -FUTURE_TOLERANCE_HOURS && diffHours <= maxAgeDays * 24;
}

/**
 * Cek apakah tanggal rilis masuk kategori "Hari Ini".
 * @param {Date | null | undefined} date
 * @param {Date} referenceDate
 * @returns {boolean}
 */
export function isToday(date, referenceDate = new Date()) {
  if (!date || Number.isNaN(date.valueOf())) return false;
  
  // Format YYYY-MM-DD
  const dateIso = date.toISOString().slice(0, 10);
  const refIso = referenceDate.toISOString().slice(0, 10);
  if (dateIso === refIso) return true;

  // Toleransi 24 jam (karena perbedaan zona waktu US rilis sore/malam vs WIB pagi)
  const diffHours = (referenceDate.getTime() - date.getTime()) / (1000 * 60 * 60);
  return diffHours >= 0 && diffHours <= 24;
}

/**
 * Mengurutkan kandidat berdasarkan skor prioritas editorial (descending),
 * lalu berdasarkan tanggal rilis terbaru (descending).
 * @param {Array<object>} items
 * @returns {Array<object>}
 */
export function sortCandidatesByPriority(items) {
  return items.slice().sort((a, b) => {
    const scoreA = a.effectiveScore ?? a.priority?.priorityScore ?? 10;
    const scoreB = b.effectiveScore ?? b.priority?.priorityScore ?? 10;
    if (scoreB !== scoreA) {
      return scoreB - scoreA;
    }
    const timeA = a.item?.publishedAt ? new Date(a.item.publishedAt).getTime() : 0;
    const timeB = b.item?.publishedAt ? new Date(b.item.publishedAt).getTime() : 0;
    return timeB - timeA;
  });
}

/**
 * Memilih item dengan preferensi diversifikasi sumber (maks 1 per perusahaan di putaran pertama).
 * @param {Array<object>} candidates
 * @param {number} quota
 * @param {Set<string>} chosenCompanies
 * @returns {Array<object>}
 */
function pickDiverse(candidates, quota, chosenCompanies) {
  const selected = [];
  const remaining = [];

  for (const cand of candidates) {
    if (selected.length >= quota) {
      remaining.push(cand);
      continue;
    }
    const company = cand.source?.company || cand.item?.company || "unknown";
    if (!chosenCompanies.has(company)) {
      selected.push(cand);
      chosenCompanies.add(company);
    } else {
      remaining.push(cand);
    }
  }

  // Jika kuota belum terpenuhi dari perusahaan yang berbeda, ambil sisa kandidat terbaik
  for (const cand of remaining) {
    if (selected.length >= quota) break;
    selected.push(cand);
  }

  return selected;
}

/** Banyaknya artikel terbaru yang dipakai untuk membaca keseimbangan kategori. */
export const BALANCE_WINDOW = 24;
/** Penalti maksimum (poin) jika satu kategori menguasai seluruh artikel terbaru. */
export const BALANCE_PENALTY = 30;
/** Jumlah minimum artikel berkategori sebelum penyetelan keseimbangan aktif. */
export const BALANCE_MIN_HISTORY = 6;

/**
 * Porsi tiap kategori pada artikel tayang terbaru (hanya yang menyimpan `categories`).
 * @param {Array<{ categories?: string[], publishedAt?: Date | null, draft?: boolean, archived?: boolean }>} entries
 * @returns {Record<string, number>} porsi 0..1; kosong jika riwayat belum cukup
 */
export function computeCategoryShares(entries = [], { window = BALANCE_WINDOW, minHistory = BALANCE_MIN_HISTORY } = {}) {
  const recent = entries
    .filter((e) => !e.draft && !e.archived && e.categories?.length && e.publishedAt instanceof Date && !Number.isNaN(e.publishedAt.valueOf()))
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, window);
  if (recent.length < minHistory) return {};
  const counts = {};
  for (const e of recent) for (const c of new Set(e.categories)) counts[c] = (counts[c] || 0) + 1;
  return Object.fromEntries(Object.entries(counts).map(([c, n]) => [c, n / recent.length]));
}

/**
 * Skor efektif = skor dasar + bonus edisi - penalti keseimbangan kategori.
 * Penalti = BALANCE_PENALTY x porsi kategori terbesar milik kandidat.
 */
export function effectiveScore(priority, { edition, shares = {} } = {}) {
  const base = priority?.priorityScore ?? 10;
  const cats = priority?.categories || [];
  const boost = editionBoost(edition, cats);
  const penalty = BALANCE_PENALTY * cats.reduce((max, c) => Math.max(max, shares[c] || 0), 0);
  return Math.round((base + boost - penalty) * 10) / 10;
}

/**
 * Seleksi Pemimpin Redaksi untuk 1 jadwal tayang (default: 3 berita).
 *
 * @param {object} params
 * @param {Array<object>} params.allFeedItems - Seluruh entri rilis yang relevan dari semua sumber
 * @param {Set<string>} params.existingUrls - Set URL yang sudah dinormalisasi dan pernah diterbitkan
 * @param {number} [params.limit=3] - Target kuota edisi (pagi: 3, malam: 3)
 * @param {Date} [params.referenceDate] - Waktu acuan sekarang (default: new Date())
 * @param {number} [params.maxAgeDays=7] - Rilis lebih tua dari ini atau tanpa tanggal tidak tayang
 * @param {object} [params.edition] - Profil edisi (editions.mjs) untuk bonus skor
 * @param {Array<object>} [params.existingEntries] - Metadata artikel yang sudah ada (dedupe.mjs `entries`)
 * @param {(info: { reason: string, candidate: object, match?: object }) => void} [params.onSkip]
 * @returns {Array<object>} Kandidat terpilih yang layak tayang
 */
export function selectEditorialEdition(params) {
  const {
    allFeedItems = [],
    existingUrls = new Set(),
    limit = 3,
    referenceDate = new Date(),
    maxAgeDays = DEFAULT_MAX_AGE_DAYS,
    edition,
    existingEntries = [],
    onSkip = () => {},
  } = params;

  // 1. Saring kandidat: buang duplikasi dengan arsip dan URL yang tidak valid
  const seenUrlsInRun = new Set();
  const validCandidates = [];

  for (const entry of allFeedItems) {
    const link = entry.item?.link;
    const normUrl = normalizeUrl(link);
    if (!normUrl) continue;
    if (!isFreshEnough(entry.item?.publishedAt, referenceDate, maxAgeDays)) continue;
    if (existingUrls.has(normUrl)) continue;
    if (seenUrlsInRun.has(normUrl)) continue;

    seenUrlsInRun.add(normUrl);
    validCandidates.push({
      ...entry,
      normUrl,
    });
  }

  // 2. Setel skor (bonus edisi, keseimbangan kategori), lalu buang topik kembar:
  //    pembanding adalah artikel yang sudah ada dan kandidat dengan skor lebih tinggi.
  const shares = computeCategoryShares(existingEntries);
  for (const cand of validCandidates) {
    cand.effectiveScore = effectiveScore(cand.priority, { edition, shares });
  }
  const ranked = sortCandidatesByPriority(validCandidates);

  const topicOf = (cand) => ({
    topic: buildTopic({ title: cand.item?.title, link: cand.item?.link }),
    company: cand.source?.company || "",
  });
  // Artikel lama dari tag kandidat (rc, beta, ...) tidak memblokir rilis stabilnya.
  const existingTopics = existingEntries
    .filter((e) => (e.title || e.sourceTitle) && !releaseSkipReason({ link: e.source }))
    .map((e) => ({
      topic: buildTopic({ title: e.sourceTitle || e.title, link: e.source }),
      company: e.company,
      label: e.title || e.sourceTitle,
    }));
  const rankedTopics = ranked.map(topicOf);
  const weight = makeWeigher([...existingTopics.map((e) => e.topic), ...rankedTopics.map((r) => r.topic)]);

  const keptPool = [];
  const dedupedCandidates = [];
  ranked.forEach((cand, i) => {
    const current = rankedTopics[i];
    const match = findSameTopic(current, [...existingTopics, ...keptPool], weight);
    if (match) {
      onSkip({ reason: "topik sama", candidate: cand, match });
      return;
    }
    keptPool.push({ ...current, label: cand.item?.title || cand.normUrl });
    dedupedCandidates.push(cand);
  });

  // 3. Pisahkan ke dalam 2 bucket: "Hari Ini" vs "Hari Sebelumnya (Backlog)"
  const todayCandidates = [];
  const previousDaysCandidates = [];

  for (const cand of dedupedCandidates) {
    if (isToday(cand.item.publishedAt, referenceDate)) {
      todayCandidates.push(cand);
    } else {
      previousDaysCandidates.push(cand);
    }
  }

  // 4. Urutkan masing-masing bucket berdasarkan prioritas editorial
  const sortedToday = sortCandidatesByPriority(todayCandidates);
  const sortedPrevious = sortCandidatesByPriority(previousDaysCandidates);

  const selected = [];
  const chosenCompanies = new Set();

  // 5. Ambil dari rilis Hari Ini terlebih dahulu (dengan diversifikasi sumber)
  const pickedToday = pickDiverse(sortedToday, limit, chosenCompanies);
  selected.push(...pickedToday);

  // 6. Jika rilis Hari Ini < limit, kurasi mundur ke rilis Hari Sebelumnya (tetap berprioritas & anti-duplikat)
  const slotsRemaining = limit - selected.length;
  if (slotsRemaining > 0) {
    const pickedPrevious = pickDiverse(sortedPrevious, slotsRemaining, chosenCompanies);
    selected.push(...pickedPrevious);
  }

  return selected;
}
