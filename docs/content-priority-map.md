# Content Priority Map — Alfa Beauty Website

> Dokumen ini memetakan **semua konten yang dibutuhkan** berdasarkan prioritas dan strategi penanganan.
> Tujuan: menentukan mana yang bisa dimulai dengan placeholder, mana yang harus ada dari perusahaan.
>
> **Last updated:** 12 Februari 2026 (setelah audit `materi/`)

---

## Legenda

| Label | Arti |
|-------|------|
| 🔴 **Blocker** | Harus ada dari perusahaan sebelum halaman bisa dibangun |
| 🟡 **Needed** | Diperlukan, tapi bisa pakai placeholder sementara |
| 🟢 **Deferrable** | Bisa ditunda / di-generate oleh vendor |
| ✅ **Ready** | Sudah tersedia di `reference.md` atau di folder `materi/` |

---

## Per Halaman

### Homepage

| Konten | Prioritas | Status | Catatan |
|--------|-----------|--------|---------|
| Hero tagline & sub-headline | ✅ Ready | Di `reference.md` §4.1 | Bilingual EN/ID |
| CTA text | ✅ Ready | Di `reference.md` §4.1 | "Explore Our Brands / Partner With Us" |
| About Us blurb | ✅ Ready | Di `reference.md` §4.2 | — |
| Our Role section | ✅ Ready | Di `reference.md` §4.3 | — |
| Brand list (4 brand) | ✅ Ready | Di `reference.md` §3 | Teks + logo tersedia |
| Brand logos | ✅ Ready | **Ada di `materi/LOGO ALL BRANDS/`** | 8 brand lengkap (PNG), termasuk 4 brand utama |
| Company logo | ✅ Ready | **Ada di `materi/LOGO SVG/` & `materi/LOGO PNG/`** | 4 varian SVG + 4 varian PNG |
| Hero image/video | ✅ Ready | **Ada di `public/videos/`** | `hero-bg.mp4` + `hero-poster.jpg` |
| Education highlight | 🟡 Needed | Belum ada | Bisa pakai dummy data |
| WhatsApp CTA | ✅ Ready | Nomor final ada | Prefill message TBD |

### Products Overview

| Konten | Prioritas | Status | Catatan |
|--------|-----------|--------|---------|
| Kategori produk | ✅ Ready | **Bisa derive dari `materi/`** | CORE, Montibello GOLD OIL, Montibello HOP |
| Data produk (nama, deskripsi) | ⚠️ Partial | **4/6 brand ada gambar** | CORE (9), Montibello GOLD OIL (11), Montibello HOP (112), Gamma+ (135) |
| Foto produk (Main) | ⚠️ Partial | **34/54 produk ada** | Alfaparf (13) & Farmavita (5) **kosong**. Perlu placeholder. |
| Foto produk (Detail) | 🔴 Blocker | **0/54 produk** | **Fitur 'Info Slides' & 'Gallery' belum aktif.** 200+ gambar detail (Gamma+, HOP, dll) belum dipasang di kode. |
| Filter taxonomy | 🟡 Needed | Bisa derive dari folder struktur | Sub-line: Blonde, Color, Curl, Length, Repair, Scalp, Volume |

### Product Detail

| Konten | Prioritas | Status | Catatan |
|--------|-----------|--------|---------|
| Deskripsi lengkap | 🔴 Blocker | Belum ada | Per produk — perlu dari perusahaan |
| Key benefits | 🟡 Needed | Belum ada | Bisa placeholder |
| How to use | 🟢 Deferrable | Belum ada | Opsional |
| Gallery (multi-foto) | ⚠️ Partial | **Ada untuk 3 brand** | Belum untuk Alfaparf, FarmaVita, Gamma+ |

### Education & Events

| Konten | Prioritas | Status | Catatan |
|--------|-----------|--------|---------|
| Data event/training | 🟡 Needed | Belum ada | Bisa pakai contoh data |
| Foto event | 🟡 Needed | Belum ada | Bisa generate atau stock photo |
| Artikel edukasi | 🟢 Deferrable | Belum ada | Bisa ditambah post-launch |

### Partnership / Become Partner

| Konten | Prioritas | Status | Catatan |
|--------|-----------|--------|---------|
| "Why Partner With Us" copy | ✅ Ready | Di `reference.md` §4.6 | Bilingual |
| Kriteria partner | 🟡 Needed | Belum ada | Bisa generic sementara |
| Benefits detail | 🟡 Needed | Belum ada | Sebagian ada di copy |
| Form fields | ✅ Ready | Di `paket-a.md` §5 | Sudah didefinisikan |

### About

| Konten | Prioritas | Status | Catatan |
|--------|-----------|--------|---------|
| Company description | ✅ Ready | Di `reference.md` §4.2 | — |
| Company history / timeline | 🟡 Needed | Belum ada | Bisa singkat |
| Team photos | 🟡 Needed | Belum ada | Perlu dari owner |
| Visi & misi | 🟡 Needed | Belum ada | — |
| Brand logos di grid | ✅ Ready | **Ada di `materi/LOGO ALL BRANDS/`** | 8 brand tersedia |

### Contact

| Konten | Prioritas | Status | Catatan |
|--------|-----------|--------|---------|
| Email | ✅ Ready | `alfabeautycosmeticaa@gmail.com` | — |
| WhatsApp | ✅ Ready | `+628151168745` | — |
| Instagram | 🟡 Needed | Handle TBD | — |
| Alamat kantor | 🟡 Needed | Belum ada | — |
| Google Maps embed | 🟢 Deferrable | Belum ada | Perlu alamat dulu |
| Jam operasional | 🟢 Deferrable | Belum ada | — |

### Legal (Privacy + Terms)

| Konten | Prioritas | Status | Catatan |
|--------|-----------|--------|---------|
| Privacy Policy | ✅ Ready | **Sudah dibuat** | Stub page tersedia di `/privacy` |
| Terms of Service | ✅ Ready | **Sudah dibuat** | Stub page tersedia di `/terms` |

### 404

| Konten | Prioritas | Status | Catatan |
|--------|-----------|--------|---------|
| 404 copy | 🟢 Deferrable | Belum ada | Vendor bisa buat |

---

## Ringkasan (Setelah Audit)

| Prioritas | Jumlah item | Status |
|-----------|-------------|--------|
| ✅ Ready | **17** | Sudah tersedia — naik dari 9 setelah audit `materi/` |
| ⚠️ Partial | **2** | Sebagian tersedia (produk 4 dari 6 brand) |
| 🟡 Needed | **10** | Bisa pakai placeholder, idealnya diisi perusahaan |
| 🔴 Blocker | **1** | Deskripsi lengkap per produk |
| 🟢 Deferrable | **4** | Vendor bisa handle / post-launch |

> [!IMPORTANT]
> Setelah audit folder `materi/`, jumlah **Blocker** berkurang drastis dari 6 menjadi 1.
> Logo perusahaan, brand logos, dan sebagian besar foto produk **sudah tersedia** dan siap diintegrasikan.

---

## Aset Tersedia (Hasil Audit `materi/`)

### Logo Perusahaan (8 file)

| Varian | SVG | PNG | Keterangan |
|--------|-----|-----|------------|
| **01** — Full (hitam di putih) | ✅ | ✅ | "Alfa Beauty" + tagline + butterfly mark |
| **02** — Full (putih di hitam) | ✅ | ✅ | Untuk background gelap |
| **03** — Text-only | ✅ | ✅ | Wordmark + tagline, tanpa mark |
| **04** — Mark-only | ✅ | ✅ | Butterfly icon saja |

### Brand Logos (10+ file, 8 brand)

| Brand | Format | Keterangan |
|-------|--------|------------|
| Alfaparf Milano | Black + White PNG | Wordmark bersih |
| Blonde Bar | 1 PNG | Monogram emas, "a vegan salon" |
| CORE | 1 PNG | Bold black wordmark |
| FarmaVita | Color + White PNG | Crest "since 1950" |
| Gamma+ | CMYK + Negative PNG | Aksen bendera Italia |
| Montibello | 6 PNG (H/V × B/W) | "Beyond Beauty" |
| SMOOVEE | 4 color PNG | "Hair & Body Care" |
| Alfa Beauty ProStore | 1 PNG | Toko retail |

### Foto Produk (Audit Detail)

| Brand | Status Aset | Status Implementasi Code | Gap Analysis |
|-------|-------------|--------------------------|--------------|
| **CORE** | ✅ 9 foto tersedia | ⚠️ Partial (3 mapped) | **6 foto detail** (info/features) belum termap ke slider/gallery. |
| **Montibello GOLD OIL** | ✅ 11 foto tersedia | ⚠️ Partial (2 mapped) | **9 foto detail** belum termap. |
| **Montibello HOP** | ✅ 112 foto tersedia | ⚠️ Partial (17 mapped) | **~90 foto detail** belum termap. Struktur 1 Hero + 4-6 Details per produk belum di-coding. |
| **Gamma+** | ✅ 135 foto tersedia | ⚠️ Partial (15 mapped) | **~120 foto detail** belum termap. Pola *Hero -> Info -> Gallery* belum diimplementasi. |
| **Alfaparf Milano** | ❌ **0 foto** | ❌ **Not Implemented** | **Blocker:** 13 produk tidak memiliki gambar sama sekali. Perlu placeholder/assets. |
| **Farmavita** | ❌ **0 foto** | ❌ **Not Implemented** | **Blocker:** 5 produk tidak memiliki gambar sama sekali. Perlu placeholder/assets. |

> **Rekomendasi:** Prioritas utama adalah mapping **infoSlides** & **gallery** untuk brand yang asetnya lengkap (Gamma+, HOP, dll) agar halaman produk tidak terlihat sepi. Untuk Alfaparf/Farmavita, gunakan placeholder sementara.

---

## Rekomendasi Strategi Implementasi (Direvisi)

1. **Fase 1 — Logo & Branding (segera):** Integrasikan logo perusahaan + brand logos ke header, footer, carousel, dan About page
2. **Fase 2 — Produk (prioritas tinggi):** Map 132+ foto produk ke katalog; mulai dengan CORE + Montibello yang sudah lengkap
3. **Fase 3 — Edukasi & Konten (sedang):** Generate/source foto event; isi placeholder edukasi
4. **Fase 4 — Tim & About (ditunda):** Tunggu foto tim dari owner

> **Kesimpulan:** Mayoritas aset visual **sudah tersedia**. Yang paling kritis sekarang adalah **deskripsi produk** dan **foto produk untuk 2 brand** (Alfaparf, FarmaVita) yang perlu dari perusahaan.
