"""Pembuat halaman "Alur Redaksi Sinyal AI" (diagram alur redaksi, tabel aturan, status tinjauan).

Pemakaian:  python3 docs/alur-redaksi/generate.py docs/alur-redaksi/v0.8.0.html

Hasilnya satu berkas HTML mandiri yang bisa dibuka langsung di browser (memuat font dari
Google Fonts bila online). Untuk memperbarui: ubah isi di bawah (figs, rules, issues, teks
pengantar), jalankan skrip dengan nama berkas versi baru, lalu catat di README.md.
"""
import html
import sys
E=html.escape
def txt(x,y,lines,cls='t',anchor='middle',lh=16):
    n=len(lines); y0=y-(n-1)*lh/2
    out=''
    for i,l in enumerate(lines):
        c=cls if i==0 or cls!='t' else 'ts'
        if cls=='t' and i==0 and n>1: c='tb'
        out+=f'<text x="{x}" y="{y0+i*lh+4.5}" text-anchor="{anchor}" class="{c}">{E(l)}</text>'
    return out
def box(x,y,w,h,lines,kind='n'):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" class="{kind}"/>'+txt(x+w/2,y+h/2,lines)
def pill(x,y,w,h,lines,kind='rej'):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{h/2 if h<40 else 10}" class="{kind}"/>'+txt(x+w/2,y+h/2,lines,cls='tr' if kind=='rej' else 't')
def dia(cx,cy,w,h,lines):
    p=f'{cx},{cy-h/2} {cx+w/2},{cy} {cx},{cy+h/2} {cx-w/2},{cy}'
    return f'<polygon points="{p}" class="d"/>'+txt(cx,cy,lines,cls='td',lh=15)
def arr(pts,label=None,lx=0,ly=0,cls='a',anchor='middle'):
    p=' '.join(f'{a},{b}' for a,b in pts)
    o=f'<polyline points="{p}" class="{cls}" marker-end="url(#h)"/>'
    if label: o+=f'<text x="{lx}" y="{ly}" text-anchor="{anchor}" class="lab">{E(label)}</text>'
    return o
def note(x,y,w,h,lines):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" class="nt"/>'+txt(x+12,y+h/2,lines,cls='tn',anchor='start',lh=15)
def svg(w,h,label,body):
    return f'<svg viewBox="0 0 {w} {h}" width="{w}" role="img" aria-label="{E(label)}"><defs><marker id="h" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,1 L9,5 L0,9 z" fill="currentColor"/></marker></defs>{body}</svg>'

# ---- FIG A: pemicu
b=''
b+=box(20,10,230,44,['Jadwal pagi','10.35 WIB (03.35 UTC)'])
b+=box(20,68,230,44,['Jadwal malam','22.05 WIB (15.05 UTC)'])
b+=box(20,126,230,44,['Manual (workflow_dispatch)','edisi · limit · dry run'])
b+=box(310,55,240,70,['Job “Generate News & Deploy”','auto-news.yml','checkout · Node 22 · npm ci'],'n hi')
b+=box(595,52,165,76,['generate-news.mjs','--limit=3','--max-age-days=7'])
for cy in (32,90,148):
    b+=arr([(250,cy),(280,cy),(280,90),(310,90)] if cy!=90 else [(250,90),(310,90)])
b+=arr([(550,90),(595,90)])
FA=svg(770,180,'Tiga pemicu (jadwal pagi, jadwal malam, manual) masuk ke satu job yang menjalankan generate-news.mjs',b)

# ---- FIG B: kumpul & saring
b=''
b+=box(20,114,150,104,['8 feed RSS','OpenAI · Anthropic','NVIDIA · Microsoft','Google ×2 · xAI · Meta'])
b+=note(20,244,170,50,['Feed gagal ditarik:','peringatan, sumber dilewati'])
b+=box(400,12,350,48,['Lolos → hitung skor prioritas','model 50 · fitur 45 · produk 40 · mitra 40'],'n hi')
b+=dia(290,166,150,76,['Kata','kecualian?'])
b+=dia(480,166,150,76,['Sumber','aiFocused?'])
b+=dia(670,166,150,76,['Ada sinyal AI?','kata kunci / URL'])
b+=arr([(170,166),(215,166)],'item',192,158)
b+=arr([(365,166),(405,166)],'tidak',385,158)
b+=arr([(555,166),(595,166)],'tidak',575,158)
b+=arr([(480,128),(480,60)],'ya',492,100,anchor='start')
b+=arr([(670,128),(670,60)],'ya',682,100,anchor='start')
b+=arr([(290,204),(290,250)],'ya',302,232,anchor='start')
b+=arr([(670,204),(670,250)],'tidak',682,232,anchor='start')
b+=pill(225,250,130,34,['Dibuang'])
b+=pill(605,250,130,34,['Dibuang'])
FB=svg(770,310,'Tiap item feed melewati tiga pemeriksaan: kata kecualian, sumber khusus AI, lalu kata kunci AI; yang lolos diberi skor',b)

# ---- FIG C: seleksi
b=''
filters=[('URL valid (http/https)?','Dibuang: URL tidak valid'),
 ('Tanggal valid dan ≤ 7 hari?','Dibuang: terlalu lama / tanpa tanggal'),
 ('URL belum ada di repo?','Dibuang: URL sudah ada (termasuk arsip)')]
for i,(s,r) in enumerate(filters):
    y=10+i*72
    b+=box(20,y,380,44,[s],'n')
    b+=pill(470,y+5,280,34,[r])
    b+=arr([(400,y+22),(470,y+22)],'tidak',435,y+14)
    b+=arr([(210,y+44),(210,y+72)],'ya',222,y+62,anchor='start')
# skor efektif (y=226)
b+=box(20,226,380,44,['Hitung skor efektif','skor + bonus edisi − penalti keseimbangan kategori'],'n hi')
b+=note(470,214,280,68,['Bonus: pagi → model, produk, mitra.','Malam → fitur, studi kasus, riset.','Penalti: kategori dominan 24 artikel terakhir.'])
b+=arr([(210,270),(210,298)])
b+=box(20,298,380,44,['Topik belum sama dengan yang lain?'],'n')
b+=pill(470,303,280,34,['Dibuang: topik sama dengan artikel lain'])
b+=arr([(400,320),(470,320)],'tidak',435,312)
b+=arr([(210,342),(210,370),(110,370),(110,386)],'ya',222,362,anchor='start')
b+=arr([(210,370),(310,370),(310,386)])
b+=box(15,386,190,52,['Hari ini','≤ 24 jam / tanggal UTC sama'],'n')
b+=box(215,386,190,52,['Hari sebelumnya','sampai 7 hari'],'n')
b+=note(470,372,280,64,['Topik sama = kata kunci judul dan slug','URL (nama produk, versi) cocok dengan','artikel ada atau kandidat berskor lebih tinggi.'])
b+=arr([(110,438),(110,458),(210,458),(210,474)])
b+=arr([(310,438),(310,458),(210,458)])
b+=box(20,474,380,56,['Urut: skor efektif tertinggi, lalu paling baru','isi dari Hari ini dulu, sisa slot dari Sebelumnya'],'n')
b+=arr([(210,530),(210,556)])
b+=box(20,556,380,56,['Maks 1 kandidat per perusahaan','kurang dari kuota → isi kandidat terbaik berikutnya'],'n')
b+=arr([(210,612),(210,638)])
b+=pill(70,638,280,36,['Daftar kandidat = 2 × kuota (6)'],'ok')
FC=svg(770,690,'Kandidat difilter tiga kali, diberi skor efektif, dibuang jika topiknya kembar, dibagi menurut usia, diurutkan, lalu dipilih maksimal satu per perusahaan',b)

# ---- FIG D: penulisan
b=''
b+=box(10,40,175,60,['Ambil halaman sumber','HTTPS · ≤ 2 MB · 6.000 huruf'])
b+=dia(290,70,150,76,['Konteks','cukup?'])
b+=box(200,170,180,60,['Minta AI menulis','minimax-m3 · suhu 0,2 · JSON'],'n hi')
b+=dia(500,200,130,76,['Lolos','validasi?'])
b+=box(600,170,150,60,['Simpan artikel','draft: false'],'n hi')
b+=dia(500,330,130,76,['Percobaan','< 3?'])
b+=box(215,308,150,46,['Kirim daftar masalah','ke AI'],'n')
b+=dia(675,330,130,76,['Kuota 3','penuh?'])
b+=pill(430,404,140,36,['Kandidat dilewati'])
b+=pill(430,50,140,40,['Dilewati','konteks tipis'])
b+=pill(610,404,140,36,['Lanjut ke penerbitan'],'ok')
b+=arr([(185,70),(215,70)])
b+=arr([(365,70),(430,70)],'tidak',398,62)
b+=arr([(290,108),(290,170)],'ya',302,142,anchor='start')
b+=arr([(380,200),(435,200)])
b+=arr([(565,200),(600,200)],'ya',582,192)
b+=arr([(500,238),(500,292)],'tidak',512,268,anchor='start')
b+=arr([(435,330),(365,330)],'ya',400,322)
b+=arr([(290,308),(290,230)])
b+=arr([(500,368),(500,404)],'tidak',512,392,anchor='start')
b+=arr([(675,230),(675,292)])
b+=arr([(675,368),(675,404)],'ya',687,392,anchor='start')
b+=arr([(740,330),(762,330),(762,22),(97,22),(97,40)],'tidak: ambil kandidat berikutnya',430,15)
b+='<text x="751" y="348" text-anchor="middle" class="lab">tidak</text>'
b=b.replace('x="600" y="306"','x="745" y="318" ') if False else b
FD=svg(770,460,'Setiap kandidat diambil halaman sumbernya, ditulis AI, divalidasi dengan hingga tiga percobaan, lalu disimpan sampai kuota terpenuhi',b)

# ---- FIG E: penerbitan
b=''
b+=box(20,30,100,60,['npm test'])
b+=box(145,30,100,60,['npm build'])
b+=dia(335,60,120,76,['Dry run?'])
b+=box(450,30,140,60,['Commit & push ke','main [skip ci]','jika ada artikel baru'],'n hi')
b+=box(612,30,140,60,['Unggah & deploy','GitHub Pages'],'n hi')
b+=arr([(120,60),(145,60)])
b+=arr([(245,60),(275,60)])
b+=arr([(395,60),(450,60)],'tidak',422,52)
b+=arr([(590,60),(612,60)])
b+=arr([(335,98),(335,150)],'ya',347,128,anchor='start')
b+=pill(245,150,180,34,['Selesai tanpa menyimpan'],'ok')
b+=arr([(70,90),(70,150)])
b+=arr([(195,90),(195,120),(150,120),(150,150)],'gagal',172,112)
b+=pill(20,150,200,44,['Test atau build gagal:','job berhenti, tidak ada commit'])
FE=svg(770,215,'Test dan build dijalankan dulu; baru jika lolos dan bukan dry run, artikel di-commit ke main dan situs di-deploy',b)

# ---- FIG F: jalur manual dan rilis
b=''
labels=[['Perubahan di','branch kerja'],['Pull request','dibuka'],['ci.yml','test + build'],['Merge ke main','(manual)'],['deploy.yml','test, build, deploy']]
for i,l in enumerate(labels):
    x=10+i*155
    b+=box(x,20,130,56,l,'n hi' if i==3 else 'n')
    if i<4: b+=arr([(x+130,48),(x+155,48)])
b+=arr([(540,76),(540,104),(385,104),(385,124)],'rilis versi baru',470,98)
b+=box(320,124,130,56,['Tag vX.Y.Z','di main'])
b+=box(475,124,130,56,['release.yml','ambil CHANGELOG'])
b+=box(630,124,130,56,['GitHub Release','terbit otomatis'],'n hi')
b+=arr([(450,152),(475,152)])
b+=arr([(605,152),(630,152)])
FF=svg(770,200,'Jalur perubahan manual: branch, pull request, CI, merge ke main, lalu deploy; untuk rilis versi baru, tag di main memicu GitHub Release',b)

figs=[
 ('1','Pemicu','Tiga pintu masuk, satu job. Edisi pagi dan malam punya fokus berbeda: pagi untuk kabar besar semalam, malam untuk bacaan yang lebih mendalam.',FA),
 ('2','Kumpul dan saring sinyal','Delapan feed RSS ditarik satu per satu. Hanya item yang lolos tiga pemeriksaan ini yang dihitung skornya.',FB),
 ('3','Seleksi Pemimpin Redaksi','Dari semua item yang lolos, kandidat disaring, diberi skor efektif, dicek kembar topik, lalu dipilih. Hasilnya dua kali kuota agar ada cadangan.',FC),
 ('4','Penulisan oleh AI','Berjalan per kandidat sampai tiga artikel terbit. Validasi kini juga memeriksa by line (sumber dan tanggal rilis). Kandidat yang gagal atau dilewati digantikan kandidat berikutnya.',FD),
 ('5','Penerbitan','Artikel baru baru masuk ke repo setelah test dan build lolos.',FE),
]
figs_html=''
for n,t,c,f in figs:
    figs_html+=f'<section class="stage" id="t{n}"><h2><span class="num">{n}</span>{t}</h2><p class="cap">{c}</p><div class="scroll"><figure>{f}</figure></div></section>'

rules=[
 ('Jadwal','10.35 dan 22.05 WIB, setiap hari','auto-news.yml'),
 ('Kuota per edisi','3 artikel (bisa diubah saat run manual)','generate-news.mjs'),
 ('Batas usia rilis','7 hari; tanpa tanggal valid tidak tayang; toleransi masa depan 24 jam','editor.mjs'),
 ('Kelompok “Hari ini”','selisih ≤ 24 jam atau tanggal UTC sama','editor.mjs'),
 ('Sumber','8 feed RSS aktif; semua tayang otomatis (tanda trusted dihapus)','sources.json'),
 ('Relevansi AI','sumber aiFocused lolos; lainnya perlu kata kunci AI; kata kecualian selalu menggugurkan','relevance.mjs'),
 ('Skor prioritas','model 50, fitur 45, produk 40, kemitraan 40, penerapan 35, riset & kebijakan 35, umum 10; kategori tertinggi + 5 per kategori tambahan (maks +10)','relevance.mjs'),
 ('Fokus edisi','pagi: bonus model +10, produk +10, kemitraan +5; malam: bonus fitur, penerapan, riset & kebijakan +10','editions.mjs'),
 ('Keseimbangan kategori','kategori dominan 24 artikel terakhir dikurangi hingga 30 poin; aktif setelah ≥ 6 artikel berkategori','editor.mjs'),
 ('Keberagaman','maks 1 artikel per perusahaan, sisa slot diisi kandidat terbaik','editor.mjs'),
 ('Duplikasi URL','URL sumber dinormalisasi (tracking dibuang), termasuk draft dan arsip','dedupe.mjs'),
 ('Duplikasi topik','kata kunci judul + slug URL berbobot kelangkaan; perusahaan sama ≥ 0,6 (min 2 kata), beda perusahaan ≥ 0,85 (min 3 kata)','topic.mjs'),
 ('Konteks sumber','halaman HTTPS, maks 2 MB, 6.000 huruf; ditolak jika < 300 huruf halaman dan < 120 huruf cuplikan','source-context.mjs'),
 ('Penulis AI','OpenRouter, minimax-m3, suhu 0,2, keluaran JSON, maks 3 percobaan dengan umpan balik','ai-writer.mjs'),
 ('Gaya tulis','straight news, piramida terbalik, netral, konteks pendamping, bercerita tanpa hiperbola (sejak 10 Okt 2026)','ai-writer.mjs'),
 ('Validasi judul','maks 120 huruf, memuat nama perusahaan','validate.mjs'),
 ('Validasi ringkasan','40–400 huruf (tidak lagi dipotong saat disimpan)','validate.mjs · markdown.mjs'),
 ('Validasi isi','tanpa batas huruf atau paragraf; tidak boleh kosong','validate.mjs'),
 ('By line sumber','isi wajib menyebut nama sumber dan tanggal rilis dd/mm, misalnya “OpenAI (07/10)”','validate.mjs'),
 ('Teks terlarang','aksara non-Latin, teks placeholder, klise, kata sifat penilai, kalimat Inggris belum diterjemahkan','validate.mjs'),
 ('Push ke main','pull --rebase lalu push, ulangi 3 kali; situs dibangun ulang dari main hasil sinkronisasi','auto-news.yml'),
 ('Tanggal tayang','mengikuti tanggal rilis sumber, tidak pernah di masa depan','generate-news.mjs'),
 ('Slug URL','dari judul saja, tanpa awalan perusahaan (sejak PR #5); URL lama dialihkan','slug.mjs · astro.config.mjs'),
 ('Rilis versi','tag vX.Y.Z di main membuat GitHub Release; catatan diambil dari bagian versi di CHANGELOG.md','release.yml'),
 ('Mesin pencari','Search Console (properti Domain, DNS) dan Bing (BingSiteAuth.xml) terverifikasi; sitemap-index.xml tercantum di robots.txt','public/'),
]
rows=''.join(f'<tr><th scope="row">{E(a)}</th><td>{E(b)}</td><td class="mono">{E(c)}</td></tr>' for a,b,c in rules)

issues=[
 ('Selesai','Aturan gaya divalidasi otomatis.','Formula “bukan sekadar”, klise, kata sifat penilai, dan kalimat Inggris yang belum diterjemahkan kini membuat artikel ditolak dan penulis diminta mengulang.','Netralitas dan batas informasi pendamping masih hanya dijaga prompt.'),
 ('Selesai','Pembanding topik ditambahkan.','Berita bertopik sama dengan artikel yang ada, atau dengan kandidat berskor lebih tinggi, dibuang walau URL berbeda. Yang dibuang dicatat di log beserta kata yang cocok.','Bila ada berita sah yang ikut terbuang, ambang di topic.mjs bisa dilonggarkan.'),
 ('Selesai','Skor “Rilis Model” dipersempit dan disetel otomatis.','Pola “model” saja tidak lagi cukup. Skor tidak dijumlahkan penuh. Kategori dominan di 24 artikel terakhir otomatis diturunkan skornya.','Penyetelan berjalan dari data artikel berkategori, jadi baru terasa setelah beberapa edisi.'),
 ('Selesai','Edisi pagi dan malam punya fokus berbeda.','Pagi untuk kabar besar semalam, malam untuk bacaan lebih mendalam. Fokus penulisan edisi ikut dikirim ke penulis AI.','Setelah beberapa edisi, nilai bonus bisa disetel ulang.'),
 ('Selesai','Push ke main memakai rebase dan ulangi.','Edisi tidak lagi hilang bila main berubah saat job berjalan. Situs dibangun ulang dari main hasil sinkronisasi sebelum deploy.',''),
 ('Selesai','Tanda trusted dihapus.','Tiga sumber itu tetap tayang otomatis, sama seperti sebelumnya.',''),
 ('Selesai','Rilis v0.7.0 terbit.','Catatan versi, nomor versi, dan workflow rilis sudah di main. Tag tidak bisa didorong dari sesi Kay (koneksi git terputus), jadi Release ditulis manual di halaman Releases.',''),
 ('Diputuskan','Tidak ada tinjauan manusia sebelum tayang.','Prinsip utama Sinyal AI News: loop otomatis sederhana. Pagar satu-satunya adalah validasi otomatis di atas.',''),
 ('Diputuskan','Informasi pendamping dari pengetahuan model.','Diterima. Letaknya di paragraf terakhir atau dua kalimat terakhir, sesuai kaidah piramida terbalik.',''),
 ('Terbuka','Prompt baru belum diuji ke model sungguhan.','Semua pengujian memakai jaringan tiruan. Kualitas tulisan, kepatuhan by line, dan frekuensi penolakan validator baru terlihat setelah dijalankan.','Jalankan auto-news manual dengan dryRun dan baca artikel di log.'),
 ('Terbuka','release.yml gagal jika Release dibuat manual.','Menerbitkan Release lewat halaman GitHub membuat tag, sehingga workflow ikut berjalan lalu gagal karena Release sudah ada. Tidak mengganggu situs, hanya menambah tanda merah.','Ubah workflow agar melewati Release yang sudah ada.'),
 ('Terbuka','Pembandingan lintas bahasa masih heuristik.','Artikel lama hanya punya judul Indonesia, jadi pencocokan dengan judul Inggris hanya lewat nama produk dan angka. Artikel baru menyimpan judul asli sumber sehingga akurasinya naik seiring waktu.','Perlu dipantau lewat log “Dilewati (topik sama)”.'),
 ('Terbuka','Penyetelan otomatis belum belajar dari respons pembaca.','Situs belum mengukur klik atau waktu baca. Penyetelan hanya memakai komposisi kategori artikel yang sudah terbit.','Putuskan apakah perlu pengukuran pembaca sebagai sinyal tambahan.'),
]
tagcls={'Selesai':'dec','Diputuskan':'inf','Terbuka':'warn'}
iss=''.join(f'<li class="issue"><span class="tag {tagcls[t]}">{t}</span><div><h3>{E(h)}</h3><p>{E(d)}</p>{('<p class="ask">'+E(q)+'</p>') if q else ''}</div></li>' for t,h,d,q in issues)

page=f'''<title>Alur Redaksi Sinyal AI</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
/* Layout: kolom baca tunggal; tiap tahap satu gambar yang bisa digulir mendatar di layar sempit. Gaya mengikuti situs (DM Sans, IBM Plex Mono, aksen hijau). */
:root{{--bg:#f6f8f7;--surface:#ffffff;--fg:#14211b;--muted:#5a6b63;--line:#cfd9d4;--accent:#0d8a4e;--accent-soft:#e0f3e8;--stop:#b4412f;--stop-soft:#f9e6e2;--note:#eef2f0;--warn:#9a6700;--font:"DM Sans","Segoe UI",system-ui,sans-serif;--mono:"IBM Plex Mono",ui-monospace,Consolas,monospace}}
@media (prefers-color-scheme:dark){{:root:not([data-theme="light"]){{--bg:#07090c;--surface:#10151c;--fg:#eef3f9;--muted:#93a4b8;--line:#2c3a4d;--accent:#3dff9a;--accent-soft:#12301f;--stop:#ff8b78;--stop-soft:#2c1814;--note:#151d27;--warn:#f0c14b;color-scheme:dark}}}}
:root[data-theme="dark"]{{--bg:#07090c;--surface:#10151c;--fg:#eef3f9;--muted:#93a4b8;--line:#2c3a4d;--accent:#3dff9a;--accent-soft:#12301f;--stop:#ff8b78;--stop-soft:#2c1814;--note:#151d27;--warn:#f0c14b;color-scheme:dark}}
body{{background:var(--bg);color:var(--fg);font-family:var(--font);font-size:16px;line-height:1.6;padding-inline:16px}}
.wrap{{max-width:860px;margin-inline:auto;padding-block:32px 64px}}
h1{{font-size:clamp(1.7rem,4.5vw,2.3rem);line-height:1.15;margin:0 0 .5rem;text-wrap:balance}}
h2{{font-size:1.25rem;margin:0;display:flex;gap:.6rem;align-items:baseline;text-wrap:balance}}
h3{{font-size:1rem;margin:0 0 .25rem}}
.lead{{color:var(--muted);max-width:65ch;margin:0 0 1.5rem}}
.eyebrow{{font:500 .75rem var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--accent);margin:0 0 .5rem}}
.facts{{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:.75rem;margin:0 0 2rem;padding:0;list-style:none}}
.facts li{{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:.7rem .9rem}}
.facts b{{display:block;font:500 1.25rem var(--mono);font-variant-numeric:tabular-nums}}
.facts span{{font-size:.8rem;color:var(--muted)}}
nav.idx{{display:flex;flex-wrap:wrap;gap:.5rem;margin:0 0 2.5rem}}
nav.idx a{{font:500 .8rem var(--mono);color:var(--fg);text-decoration:none;border:1px solid var(--line);border-radius:999px;padding:.3rem .75rem;background:var(--surface)}}
nav.idx a:hover,nav.idx a:focus-visible{{border-color:var(--accent);outline:none}}
.stage{{margin-bottom:2.75rem}}
.num{{font:500 .8rem var(--mono);color:var(--accent);border:1px solid var(--accent);border-radius:999px;min-width:1.6rem;height:1.6rem;display:inline-grid;place-items:center;flex:none}}
.cap{{color:var(--muted);margin:.35rem 0 .9rem;max-width:65ch}}
.scroll{{overflow-x:auto;background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:12px}}
figure{{margin:0}}
svg{{display:block;min-width:700px;max-width:100%;height:auto;color:var(--fg)}}
svg .n{{fill:var(--surface);stroke:var(--line);stroke-width:1.5}}
svg .n.hi{{fill:var(--accent-soft);stroke:var(--accent)}}
svg .d{{fill:var(--surface);stroke:var(--fg);stroke-width:1.3}}
svg .rej{{fill:var(--stop-soft);stroke:var(--stop);stroke-width:1.3}}
svg .ok{{fill:var(--accent-soft);stroke:var(--accent);stroke-width:1.3}}
svg .nt{{fill:var(--note);stroke:var(--line);stroke-dasharray:4 3}}
svg .a{{fill:none;stroke:currentColor;stroke-width:1.4;stroke-linejoin:round}}
svg text{{font-family:var(--font);font-size:13px;fill:var(--fg)}}
svg .tb{{font-weight:700}}
svg .ts,svg .tn{{fill:var(--muted);font-size:12px}}
svg .td{{font-size:12.5px;font-weight:500}}
svg .tr{{fill:var(--stop);font-size:12.5px}}
svg .lab{{font-family:var(--mono);font-size:11px;fill:var(--muted)}}
h2.sec{{font-size:1.25rem;margin:3rem 0 .4rem}}
.tablewrap{{overflow-x:auto;border:1px solid var(--line);border-radius:12px;background:var(--surface)}}
table{{border-collapse:collapse;width:100%;min-width:640px;font-size:.9rem}}
th,td{{text-align:left;padding:.55rem .8rem;border-bottom:1px solid var(--line);vertical-align:top}}
tr:last-child th,tr:last-child td{{border-bottom:0}}
thead th{{font:500 .72rem var(--mono);letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}}
tbody th{{white-space:nowrap;font-weight:700}}
.mono{{font-family:var(--mono);font-size:.78rem;color:var(--muted)}}
ol.issues{{list-style:none;margin:1rem 0 0;padding:0;display:grid;gap:.75rem}}
.issue{{display:grid;grid-template-columns:5.6rem 1fr;gap:.9rem;background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:.9rem 1rem}}
.issue p{{margin:0 0 .35rem;font-size:.92rem}}
.issue .ask{{color:var(--accent);font-weight:500}}
.tag{{font:500 .72rem var(--mono);letter-spacing:.05em;text-transform:uppercase;height:max-content;padding:.2rem .5rem;border-radius:6px;text-align:center;border:1px solid currentColor}}
.tag.warn{{color:var(--warn)}}.tag.risk{{color:var(--stop)}}.tag.dec{{color:var(--accent)}}.tag.tun{{color:var(--muted)}}.tag.inf{{color:var(--muted)}}
.legend{{display:flex;flex-wrap:wrap;gap:.4rem 1.2rem;font-size:.82rem;color:var(--muted);margin:0 0 2rem}}
.legend i{{display:inline-block;width:.85rem;height:.85rem;border-radius:3px;vertical-align:-.1rem;margin-right:.35rem;border:1.5px solid}}
.legend .k1{{background:var(--accent-soft);border-color:var(--accent)}}.legend .k2{{background:var(--stop-soft);border-color:var(--stop)}}.legend .k3{{background:var(--surface);border-color:var(--fg);transform:rotate(45deg) scale(.8)}}
@media (max-width:520px){{.issue{{grid-template-columns:1fr}}.tag{{justify-self:start}}}}
</style>
<main class="wrap">
<p class="eyebrow">Sinyal AI News · tinjauan aturan redaksi</p>
<h1>Alur Redaksi Sinyal AI</h1>
<p class="lead">Dari jadwal otomatis sampai artikel tayang di sinyalai.xyz, sesuai kode di cabang main pada rilis v0.7.0 (10 Oktober 2026), termasuk aturan penulisan baru, seleksi redaksi yang disetel, dan jalur rilis. Setiap kotak keputusan di bawah adalah aturan yang bisa Mas Reza setujui atau ubah.</p>
<ul class="facts">
<li><b>2×/hari</b><span>10.35 (pagi) dan 22.05 (malam) WIB</span></li>
<li><b>3</b><span>artikel per edisi</span></li>
<li><b>7 hari</b><span>usia rilis maksimum</span></li>
<li><b>3×</b><span>percobaan tulis per artikel</span></li>
<li><b>v0.7.0</b><span>rilis terbaru, 10 Okt 2026</span></li>
</ul>
<p class="legend"><span><i class="k1"></i>langkah yang menghasilkan atau menerbitkan</span><span><i class="k2"></i>dibuang atau dilewati</span><span><i class="k3"></i>keputusan ya/tidak</span></p>
<nav class="idx" aria-label="Tahap">
<a href="#t1">1 Pemicu</a><a href="#t2">2 Saring</a><a href="#t3">3 Seleksi</a><a href="#t4">4 Penulisan</a><a href="#t5">5 Penerbitan</a><a href="#jalur">Jalur manual</a><a href="#aturan">Tabel aturan</a><a href="#catatan">Status tinjauan</a>
</nav>
{figs_html}
<section class="stage" id="jalur"><h2><span class="num">+</span>Jalur perubahan manual</h2><p class="cap">Di luar pipeline berita. Kode dan fitur situs lewat jalur ini. Deploy dan pipeline berita berbagi grup <span class="mono">pages</span>, jadi dua deploy tidak berjalan bersamaan. Rilis versi baru memakai tag <span class="mono">vX.Y.Z</span> yang memicu <span class="mono">release.yml</span>.</p><div class="scroll"><figure>{FF}</figure></div></section>
<h2 class="sec" id="aturan">Tabel aturan teknis saat ini</h2>
<p class="cap">Nilai diambil dari kode, bukan dari dokumen. Kolom kanan menunjuk berkas tempat aturan itu diubah.</p>
<div class="tablewrap"><table><thead><tr><th>Aturan</th><th>Nilai sekarang</th><th>Berkas</th></tr></thead><tbody>{rows}</tbody></table></div>
<h2 class="sec" id="catatan">Status tinjauan</h2>
<p class="cap">Delapan butir hasil tinjauan Mas Reza pada 10 Oktober 2026, rilis v0.7.0, dan catatan yang masih terbuka.</p>
<ol class="issues">{iss}</ol>
</main>
'''
head, _, body = page.partition("<main")
standalone = (
    '<!doctype html>\n<html lang="id">\n<head>\n<meta charset="utf-8">\n'
    '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
    '<style>html{color-scheme:light}body{margin:0}</style>\n'
    + head + "</head>\n<body>\n<main" + body + "</body>\n</html>\n"
)
out = sys.argv[1] if len(sys.argv) > 1 else "alur-redaksi.html"
with open(out, "w", encoding="utf-8") as f:
    f.write(standalone)
print(f"Ditulis: {out} ({len(standalone)} karakter)")
