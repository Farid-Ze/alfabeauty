# 📱 Mobile UX Enhancement Audit — Alfa Beauty Cosmetica

**Tanggal:** 11 Maret 2026  
**Fokus:** Konten diperkecil, disesuaikan handphone, tidak terlalu panjang dan membosankan  
**Target:** iPhone SE (375×667), iPhone 14 (390×844), Galaxy S21 (360×800)  
**Baseline:** Post-Sprint 1+2 (commit `91cf165`) — touch targets, overflow, dvh, basic spacing sudah selesai

---

## EXECUTIVE SUMMARY

| Metrik | iPhone SE (375×667) | iPhone 14 (390×844) |
|---|---|---|
| **Total scroll homepage** | **~7,544px** | **~7,721px** |
| **Layar yang harus di-scroll** | **~10.3 layar** | **~8.1 layar** |
| **Rekomendasi maksimal** | 5–6 layar | 5–6 layar |
| **Verdict** | ❌ **Terlalu panjang** | ⚠️ **Agak panjang** |

**3 Masalah Utama:**
1. **Padding bloat** — 6 section pakai `py-24` (192px total padding per section). Ini saja membuang ~1,152px (~1.7 layar iPhone SE).
2. **Visual monotony** — 7 dari 10 section homepage punya layout yang sama: eyebrow → heading → body → CTA. Tidak ada variasi.
3. **Dead space** — Mobile fallback image di About & FeatureSplit membuang 400px untuk konten kosong.

---

## SPRINT 3 — HOMEPAGE: Konten Lebih Ringkas

### S3-01: Universal Padding Reduction (6 Sections)
**Severity:** 🔴 CRITICAL | **Impact:** -448px scroll | **Effort:** 10 menit

Semua section homepage menggunakan padding yang sama besarnya untuk mobile maupun desktop:

| Section | File | Current | Fix |
|---------|------|---------|-----|
| About | `sections/about.tsx` L81 | `py-24 lg:py-32` | `py-12 sm:py-16 lg:py-32` |
| BrandCarousel | `sections/brand-carousel.tsx` L108 | `py-24 lg:py-32` | `py-12 sm:py-16 lg:py-32` |
| Partnership | `sections/partnership-highlight.tsx` L102 | `py-24 lg:py-32` | `py-12 sm:py-16 lg:py-32` |
| FAQ | `sections/faq-section.tsx` L113 | `py-24 lg:py-32` | `py-12 sm:py-16 lg:py-32` |
| CertBadges | `sections/certification-badges.tsx` L54 | `py-16 lg:py-20` | `py-8 sm:py-12 lg:py-20` |
| PreFooterCTA | `sections/pre-footer-cta.tsx` (sudah diperbaiki Sprint 2) | ✅ | — |

### S3-02: Remove/Shrink Dead Mobile Fallbacks
**Severity:** 🔴 CRITICAL | **Impact:** -400px scroll | **Effort:** 15 menit

| Section | File | Current | Rekomendasi |
|---------|------|---------|-------------|
| About | `sections/about.tsx` L143 | `min-h-[200px]` grey box "Since 2007" | Hapus sepenuhnya, ganti accent bar 8px |
| FeatureSplit | `sections/feature-split.tsx` L85 | `min-h-[200px]` grey box "Education" | Hapus sepenuhnya, ganti accent bar 8px |

### S3-03: BrandCarousel Card Height Reduction
**Severity:** ⚠️ HIGH | **Impact:** -120px scroll | **Effort:** 5 menit

Card `min-h-[420px]` terlalu tinggi — konten riil hanya ~150px (logo + origin + nama + deskripsi), sisa 270px kosong.

| File | Current | Fix |
|------|---------|-----|
| `sections/brand-carousel.tsx` L168 | `min-h-[420px]` | `min-h-[300px] sm:min-h-[360px] lg:min-h-[420px]` |

### S3-04: Partnership Section — Card Density
**Severity:** ⚠️ HIGH | **Impact:** -350px scroll | **Effort:** 10 menit

Section terpanjang di homepage (~1,263px). Dua card besar menumpuk vertikal.

| Item | File/Line | Current | Fix |
|------|-----------|---------|-----|
| Card padding | L51 | `p-8 lg:p-12` | `p-5 sm:p-8 lg:p-12` |
| Decorative number | L55 | `text-[64px]` | `text-[36px] sm:text-[48px] lg:text-[64px]` |
| Gap heading→cards | L117 | `mt-16` | `mt-8 sm:mt-12 lg:mt-16` |
| BG image mobile | L103–110 | Loads on all viewports | Tambah `hidden lg:block` pada wrapper Image |

### S3-05: About Section — Counter Horizontal + Spacing
**Severity:** ⚠️ HIGH | **Impact:** -380px scroll | **Effort:** 10 menit

| Item | Current | Fix |
|------|---------|-----|
| Counter grid | `grid-cols-1 gap-8` | `grid-cols-3 gap-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:gap-6` |
| Counter margin | `mt-12` (2×) | `mt-6 sm:mt-12` |
| Section gap | `gap-12 lg:gap-16` | `gap-6 sm:gap-8 lg:gap-16` |
| FAQ gap | `gap-12` | `gap-6 sm:gap-8 lg:gap-16` |

### S3-06: Hero Tightening
**Severity:** ⚠️ HIGH | **Impact:** CTA visible above fold | **Effort:** 5 menit

| Item | File/Line | Current | Fix |
|------|-----------|---------|-----|
| Bottom gradient | L141 | `h-56` | `h-32 sm:h-56` |
| CTA margin | L113 | `mt-10` | `mt-6 sm:mt-10` |
| Body margin | L103 | `mt-8` | `mt-4 sm:mt-8` |
| Body contrast | L104 | `text-white/50` | `text-white/70` (WCAG fix) |

### S3-07: CertBadges — Compact + Premium Icons
**Severity:** ⚠️ MEDIUM | **Impact:** -220px + brand quality | **Effort:** 15 menit

| Item | Current | Fix |
|------|---------|-----|
| Badge padding | `p-6` | `p-4 sm:p-6` |
| Heading gap | `mb-10` | `mb-6 sm:mb-10` |
| Icons | Emoji (🛡️ ✓ 🇮🇹) | Ganti Lucide icons (Shield, CheckCircle, etc.) |
| Layout | `grid-cols-2` | `grid-cols-3 gap-3 sm:grid-cols-2 sm:gap-4` |

### S3-08: Footer — Tighter on Mobile
**Severity:** ⚠️ MEDIUM | **Impact:** -200px scroll | **Effort:** 5 menit

| Item | Current | Fix |
|------|---------|-----|
| Footer min-height | `min-h-[520px]` | `min-h-[420px] sm:min-h-[520px]` |
| Pillar cards | `min-h-[100px]` | Sudah fixed Sprint 2: `min-h-[140px] sm:min-h-[200px]` ✅ |
| Gap | `gap-8` | `gap-4 sm:gap-8 lg:gap-12` |
| WhatsApp FAB | `bottom-6` | `bottom-16 sm:bottom-6` (avoid overlap bottom bar) |

### S3-09: Visual Monotony Breaker
**Severity:** ⚠️ MEDIUM | **Impact:** Better engagement | **Effort:** 20 menit

Masalah: Setiap section pola sama → eyebrow → TextReveal h2 → body → CTA. Rekomendasi:
- **About:** Pindahkan counter ke ATAS body text (data-first pattern)
- **FeatureSplit:** Lead dengan numbered list, bukan body text
- **CertBadges:** Ganti emoji dengan Lucide icons + 3-col mobile layout
- ✅ BrandCarousel sudah break pattern via carousel
- ✅ PreFooterCTA sudah break via dark background inversion

### S3-10: Thumb-Zone CTA Optimization
**Severity:** ⚡ LOW | **Impact:** Better one-handed UX | **Effort:** 10 menit

CTAs yang left-aligned di mobile sulit dijangkau ibu jari kanan:

| Section | Current | Fix |
|---------|---------|-----|
| Hero CTA | `flex-col gap-4` | Tambah `w-full sm:w-auto` pada buttons |
| About CTA | Left-aligned | `text-center sm:text-left` wrapper |
| FeatureSplit CTA | Left-aligned | `w-full sm:w-auto` |

---

## SPRINT 4 — SUBPAGES: Ringkas & Efisien

### S4-01: Universal Subpage Padding Reduction
**Severity:** ⚠️ HIGH | **Impact:** -280px per page (7 sections avg) | **Effort:** 15 menit

Semua subpage menggunakan `py-20 lg:py-28` → ganti `py-14 sm:py-20 lg:py-28`

Pages terdampak: About, Education, Partnership, Contact

### S4-02: Products Page — Grid & Search Fix
**Severity:** 🔴 CRITICAL | **Impact:** Density + iOS zoom | **Effort:** 10 menit

| Item | File/Line | Current | Fix |
|------|-----------|---------|-----|
| Product grid | L429 | `grid-cols-1 sm:grid-cols-2` | `grid-cols-2 sm:grid-cols-2` |
| Product image | L511 | `aspect-square` | `aspect-[4/5] sm:aspect-square` |
| Search input | L136 | `text-[14px]` | `text-base` (16px, prevents iOS zoom) |
| Header padding | L125 | `pb-8 pt-14` | `pb-6 pt-8 sm:pb-8 sm:pt-14` |
| Bottom CTA | L481 | `py-14` | `py-10 sm:py-14` |

### S4-03: Product Detail — Hero Image + Spacing
**Severity:** 🔴 CRITICAL | **Impact:** Info visible above fold | **Effort:** 5 menit

| Item | File/Line | Current | Fix |
|------|-----------|---------|-----|
| Hero image | L30 | `aspect-square` | `aspect-[3/4] sm:aspect-square lg:aspect-[4/5]` |
| Grid gap | L28 | `gap-12 lg:gap-20` | `gap-6 sm:gap-12 lg:gap-20` |
| Detail padding | L49 | `py-8` | `py-4 sm:py-8` |
| Info slides | L94 | `py-20 mt-20` | `py-12 mt-12 sm:py-20 sm:mt-20` |
| Slide width | L100 | `w-[280px]` | `w-[75vw] max-w-[320px]` |

### S4-04: About Page — Section Density (8 Sections Problem)
**Severity:** ⚠️ HIGH | **Impact:** -1000px+ scroll | **Effort:** 15 menit

About page: ~5,500px+ scroll di mobile (8 sections!).

| Item | File/Line | Current | Fix |
|------|-----------|---------|-----|
| Hero padding | L131 | `py-20 lg:py-28` | `py-12 sm:py-20 lg:py-28` |
| Stats padding | L159 | `py-14` | `py-8 sm:py-14` |
| Timeline gaps | L201 | `space-y-12` | `space-y-8 sm:space-y-12 lg:space-y-0` |
| Pillar cards | L288 | `p-8 lg:p-10` | `p-6 sm:p-8 lg:p-10` |
| Brand logos | L420 | `aspect-[3/1]` | `aspect-[5/2] sm:aspect-[3/1]` |
| Team grid | L468 | `grid-cols-1 gap-6` | `grid-cols-2 gap-4 sm:gap-6` |

### S4-05: Education Page — Image Placeholders + Spacing
**Severity:** ⚠️ HIGH | **Impact:** -300px scroll | **Effort:** 10 menit

| Item | File/Line | Current | Fix |
|------|-----------|---------|-----|
| Hero image | L82 | `aspect-[4/3]` | `aspect-[16/9] sm:aspect-[4/3]` |
| Featured event | L144 | `aspect-[16/10]` | `aspect-[16/9] sm:aspect-[16/10]` |
| Featured info | L165 | `p-8 lg:p-12` | `p-5 sm:p-8 lg:p-12` |
| Event detail image | event-detail L87 | `aspect-square` | `aspect-[4/3] sm:aspect-square` |

### S4-06: Contact Page — Info Ordering + Form Padding
**Severity:** ⚠️ HIGH | **Impact:** Better mobile flow | **Effort:** 10 menit

Masalah: Di mobile, form muncul duluan sebelum info kontak (WhatsApp/telepon). User harus scroll 800px untuk melihat info penting.

| Item | File/Line | Current | Fix |
|------|-----------|---------|-----|
| Info ordering | L84 | stacked without order | Tambah `order-first lg:order-last` pada "Meet Us" div |
| Form padding | L100 | `p-8 lg:p-10` | `p-5 sm:p-8 lg:p-10` |
| FAQ gap | L176 | `gap-12` | `gap-8 sm:gap-12` |

### S4-07: Partnership Page — Form Section Tightening
**Severity:** ⚠️ MEDIUM | **Impact:** -300px scroll | **Effort:** 10 menit

| Item | File/Line | Current | Fix |
|------|-----------|---------|-----|
| Benefit cards | L119 | `p-8 lg:p-12` | `p-6 sm:p-8 lg:p-12` |
| Process steps gap | L173 | `mt-14 gap-8` | `mt-10 gap-6 sm:mt-14 sm:gap-8` |
| Form gap | L198 | `gap-12` | `gap-8 sm:gap-12` |
| Form padding | L225 | `p-8 lg:p-12` | `p-5 sm:p-8 lg:p-12` |
| Form spacing | partnership-form.tsx L207 | `space-y-10` | `space-y-7 sm:space-y-10` |

### S4-08: Form UX — `inputMode` + `autoComplete`
**Severity:** ⚠️ MEDIUM | **Impact:** Better mobile keyboard | **Effort:** 10 menit

Tidak ada `autoComplete` atau `inputMode` yang benar di form fields:

| Form | Field | Tambahkan |
|------|-------|-----------|
| Contact | name | `autoComplete="name"` |
| Contact | email | `autoComplete="email"` |
| Contact | phone | `inputMode="tel" autoComplete="tel"` |
| Partnership | contact_name | `autoComplete="name"` |
| Partnership | email | `autoComplete="email"` |
| Partnership | phone | `inputMode="tel" autoComplete="tel"` |
| Partnership | chairs | `inputMode="numeric"` |

### S4-09: Form Input Height — 44px Compliance
**Severity:** ⚡ LOW | **Impact:** Touch target compliance | **Effort:** 5 menit

`fieldClass` di `form-field.tsx` menggunakan `py-2.5` yang menghasilkan tinggi ~42px, sedikit di bawah 44px minimum.

| File | Current | Fix |
|------|---------|-----|
| `form-field.tsx` L67 | `px-4 py-2.5` | `px-4 py-3 sm:py-2.5` |

---

## SPRINT 5 — PERFORMANCE & POLISH

### S5-01: Disable Blur Animation on Mobile
**Severity:** ⚠️ MEDIUM | **Impact:** Smoother scrolling | **Effort:** 20 menit

Setiap section menggunakan `FadeIn` dengan `blur` + `scale` yang memicu `filter: blur()` + compositor layer promotion. Di Android mid-range, ini menyebabkan **jank saat scroll cepat**.

Rekomendasi:
- Prop `blur` di `FadeIn` harus respect `(prefers-reduced-motion)` dan `(max-width: 640px)`
- Gunakan `split="word"` bukan `split="char"` pada mobile untuk `TextReveal`
- Kurangi stagger delay (0.08 × N items = animasi terlalu lama)

### S5-02: Marquee Font Size Reduction
**Severity:** ⚡ LOW | **Impact:** Better content density | **Effort:** 2 menit

| File/Line | Current | Fix |
|-----------|---------|-----|
| `page.tsx` L36 | `text-h4 font-bold` | `text-base sm:text-h4 font-semibold` |

---

## SCROLL BUDGET PROJECTION

### Homepage (iPhone SE 375×667)

| Section | Current | After Sprint 3 | Δ |
|---------|---------|----------------|---|
| Hero | 667px | 667px | 0 |
| Marquee | 104px | 104px | 0 |
| About | 1,208px | ~828px | **-380px** |
| BrandCarousel | 915px | ~690px | **-225px** |
| FeatureSplit | 824px | ~588px | **-236px** |
| Partnership | 1,263px | ~913px | **-350px** |
| FAQ | 739px | ~601px | **-138px** |
| CertBadges | 611px | ~391px | **-220px** |
| PreFooterCTA | 493px | ~448px | **-45px** |
| MegaFooter | 720px | ~520px | **-200px** |
| **TOTAL** | **7,544px** | **~5,750px** | **-1,794px** |
| **Layar scroll** | **10.3** | **~7.6** | **-2.7 layar** |

### Untuk mencapai target 5-6 layar:
- Collapse Partnership menjadi tabbed accordion → hemat ~400px
- Pindahkan CertBadges ke About page → hemat ~391px
- Total: **~4,960px / ~6.6 layar** — dalam range yang baik

---

## IMPLEMENTATION ROADMAP

| Sprint | Fokus | Issue Count | Est. Scroll Savings |
|--------|-------|-------------|---------------------|
| **Sprint 3** | Homepage padding + dead space + card density | 10 items | **-1,794px** |
| **Sprint 4** | Subpage padding + grid density + form UX | 9 items | **-2,000px+** (across all pages) |
| **Sprint 5** | Performance + animation + polish | 2 items | Smoother experience |

**Total estimasi: ~48 file changes, -3,800px+ scroll reduction keseluruhan**
