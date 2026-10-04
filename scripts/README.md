# Pipeline otomatisasi — Sinyal AI

Tujuan: mengambil rilis dari perusahaan AI → membuat **draft** artikel Markdown → review manual → publish.

```text
sources.json  →  fetch RSS  →  draft .md (draft: true)  →  editorial review  →  draft: false  →  site build
```

## File penting

| Path | Fungsi |
|------|--------|
| `scripts/sources.json` | Daftar perusahaan + URL RSS/page |
| `scripts/templates/article.md` | Template frontmatter + body |
| `scripts/fetch-signals.mjs` | CLI fetch → tulis draft |
| `scripts/lib/rss.mjs` | Parser RSS/Atom minimal |
| `scripts/lib/markdown.mjs` | Writer draft + skeleton body |
| `scripts/lib/slug.mjs` | Pembuat slug aman |
| `scripts/lib/relevance.mjs` | Penyaring relevansi AI untuk feed umum |
| `scripts/lib/dedupe.mjs` | Deduplikasi URL sumber & slug |
| `scripts/lib/text.mjs` | Pemotongan teks batas kata (*word-boundary*) |
| `src/content/news/` | Artikel (termasuk draft) |

## Menjalankan

Dari root project:

```bash
# Dry-run (tidak menulis file)
npm run fetch:signals -- --dry-run

# Ambil max 2 item baru per sumber
npm run fetch:signals -- --limit 2

# Satu sumber saja
npm run fetch:signals -- --source nvidia-blog

# Fetch + tulis draft
npm run fetch:signals
```

Di Windows PowerShell, jika `npm` diblokir policy, gunakan:

```powershell
npm.cmd run fetch:signals -- --dry-run
```

## Alur editorial

1. Jalankan `fetch:signals`.
2. Buka file baru di `src/content/news/*.md` (frontmatter `draft: true`).
3. Perbaiki judul, summary, dan body (netral + sitasi sumber).
4. Set `draft: false`.
5. `npm run build` / `npm run dev` — artikel muncul di site.

Artikel dengan `draft: true` **tidak** ditampilkan di halaman (difilter di `src/lib/news.ts`).

## Menambah sumber

Edit `scripts/sources.json`:

```json
{
  "id": "cohere",
  "company": "Cohere",
  "type": "rss",
  "url": "https://example.com/feed.xml",
  "home": "https://example.com",
  "enabled": true
}
```

- `type: "rss"` — di-fetch otomatis  
- `type: "page"` — placeholder manual (skip fetch)  
- `enabled: false` — diabaikan  

## Roadmap AI rewrite

Saat ini body draft masih **template** (`buildDraftBody` di `lib/markdown.mjs`).

Langkah berikutnya yang disarankan:

1. Panggil API LLM (mis. xAI Grok) dengan prompt editorial Sinyal AI.
2. Input: judul + summary feed + URL sumber.
3. Output: ringkasan netral 2–4 paragraf + bullet “mengapa penting”.
4. Tetap simpan `source` URL resmi; jangan republish full press release.

## Catatan

- Beberapa feed bisa down, redirect, atau memblokir bot — script melanjutkan sumber berikutnya.
- Hormati `robots.txt` / ToS situs sumber.
- Feed mirror komunitas (jika ada) harus diverifikasi ke domain resmi sebelum publish.
