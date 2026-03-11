# Mobile Responsive Deep Audit — Alfa Beauty Cosmetica

> **Tanggal**: 11 Maret 2026
> **Target Devices**: iPhone SE (375×667), iPhone 14 (390×844), iPhone 14 Pro Max (428×926)
> **Breakpoints**: sm=640px, md=768px, lg=1024px, xl=1280px
> **File yang diaudit**: 40+ komponen

---

## Executive Summary

Ditemukan **68 issues** dari audit mendalam terhadap seluruh file frontend:

| Severity | Jumlah | Keterangan |
|----------|--------|------------|
| **CRITICAL** | 12 | Layout rusak, aksesibilitas gagal, iOS Safari bug |
| **HIGH** | 22 | UX buruk, touch target terlalu kecil, konten terpotong |
| **MEDIUM** | 23 | Kosmetik, spacing berlebih, hover-only interactions |
| **LOW** | 11 | Minor, edge case |

---

## PHASE 1 — CRITICAL (Harus Diperbaiki Segera)

### C-01: Body Missing `overflow-x: hidden`

| | |
|---|---|
| **File** | `globals.css` / `layout.tsx` |
| **Problem** | Tidak ada `overflow-x: hidden` pada `<body>` atau `<html>`. Viewport mega-menu `w-screen`, `FadeIn direction="left/right"`, dan grain overlay `inset: -50%` bisa menyebabkan horizontal scroll pada mobile. |
| **Impact** | Horizontal scroll pada 375px mengganggu seluruh UX situs |
| **Fix** | Tambah `overflow-x: hidden` pada body di `globals.css` |

### C-02: iOS Safari Auto-Zoom pada Form Input

| | |
|---|---|
| **File** | `form-field.tsx` (L57) |
| **Problem** | Input menggunakan `text-sm` (14px). iOS Safari otomatis zoom halaman ketika user fokus ke input dengan font-size < 16px. |
| **Impact** | Viewport rusak setiap kali user mengisi form (Contact, Partnership, Products filter) |
| **Fix** | Ubah ke `text-base` (16px) pada mobile, atau tambah `@supports` rule |

### C-03: Button Touch Target di Bawah Minimum (44px)

| | |
|---|---|
| **File** | `button.tsx` (L22-33) |
| **Problem** | Semua ukuran button di bawah 44px: `default`=36px, `sm`=32px, `xs`=24px, `lg`=40px, `icon`=36px |
| **Impact** | Seluruh situs melanggar Apple HIG & WCAG 2.5.8 touch target minimum |
| **Fix** | Tambah minimum `min-h-11` (44px) pada variant default, atau buat sistem responsive size |

### C-04: Hamburger Button Touch Target (36px)

| | |
|---|---|
| **File** | `site-header.tsx` (L194) |
| **Problem** | Hamburger button `size="icon"` = 36×36px, dengan `p-1`. Di bawah 44px minimum. |
| **Impact** | User mobile kesulitan menekan tombol navigasi utama |
| **Fix** | Tambah `min-h-11 min-w-11` pada hamburger button |

### C-05: Mobile Menu Close Button (36px)

| | |
|---|---|
| **File** | `mobile-menu.tsx` (L76-81) |
| **Problem** | Close button `h-9 w-9` = 36×36px |
| **Fix** | Perbesar ke `h-11 w-11` (44px) |

### C-06: Mobile Menu Pillar Links (~28px)

| | |
|---|---|
| **File** | `mobile-menu.tsx` (L149-156) |
| **Problem** | Pillar grid links `py-2 text-[10px]` dalam `grid-cols-3`. Touch target ~28px tinggi, ~100px lebar. |
| **Fix** | Perbesar padding `py-3.5`, tingkatkan font ke `text-xs` |

### C-07: Checkbox Touch Target (16px)

| | |
|---|---|
| **File** | `checkbox.tsx` (L14) |
| **Problem** | Checkbox `size-4` = 16×16px. Kritis untuk form Partnership yang menggunakan checkbox. |
| **Fix** | Bungkus dengan label yang punya `min-h-11 min-w-11`, atau tambah `p-3` pada checkbox wrapper |

### C-08: Products Filter Tidak Bisa Diakses di Mobile

| | |
|---|---|
| **File** | `products-page-content.tsx` (L222) |
| **Problem** | Sidebar filter menggunakan `hidden lg:block`. Di bawah 1024px, filter sama sekali tidak terlihat. Tombol "Show Filters" ada tapi tidak berfungsi karena CSS override. |
| **Impact** | User mobile tidak bisa filter produk berdasarkan brand, audience, atau kategori. |
| **Fix** | Implementasi Sheet/Drawer untuk filter di mobile. Toggle button membuka Sheet instead of showing sidebar. |

### C-09: Privacy & Terms Header Overlap

| | |
|---|---|
| **File** | `privacy-page-content.tsx`, `terms-page-content.tsx` (L5) |
| **Problem** | Tidak ada `pt-[var(--header-height)]`. Heading "Privacy Policy" / "Terms of Service" tertutup fixed header. |
| **Fix** | Tambah `pt-[calc(var(--header-height)+2rem)]` |

### C-10: Hero Heading Overflow pada 375px

| | |
|---|---|
| **File** | `hero.tsx` (L89) |
| **Problem** | `heading-display` (min 2.25rem = 36px bold) dengan teks "Indonesia's Professionals" pada 327px usable width kemungkinan overflow atau line-break buruk. |
| **Fix** | Turunkan clamp min untuk mobile, atau tambah `text-balance` |

### C-11: Brand Carousel Pagination Dots (6×6px)

| | |
|---|---|
| **File** | `brand-carousel.tsx` (L181-192) |
| **Problem** | Pagination dots `h-1.5 w-1.5` (6×6px) dan `w-8` (active). Tidak bisa ditekan pada touchscreen. |
| **Fix** | Bungkus dots dengan button `min-h-11 min-w-11` sebagai hit area |

### C-12: Footer Social Icon Touch Target (16px)

| | |
|---|---|
| **File** | `mega-footer.tsx` (L173-183) |
| **Problem** | Social icons `h-4 w-4` (16×16px) tanpa padding pada `<a>` wrapper. |
| **Fix** | Tambah `p-3` pada `<a>` wrapper agar hit area = 40px+ |

---

## PHASE 2 — HIGH (UX Buruk, Prioritas Tinggi)

### H-01: `vh` Units Tanpa `dvh` Fallback

| | |
|---|---|
| **File** | `error.tsx` (L14), `not-found.tsx` (L8), `loading.tsx` (L3) |
| **Problem** | `min-h-[80vh]` / `min-h-screen` menggunakan `vh`. iOS Safari menghitung `vh` termasuk address bar, sehingga konten lebih tinggi dari yang terlihat. |
| **Fix** | Ganti ke `min-h-dvh` / `min-h-[80dvh]` |

### H-02: Hero CTA Below Fold pada iPhone SE

| | |
|---|---|
| **File** | `hero.tsx` (L80) |
| **Problem** | `min-h-screen` + `items-center` + `pt-[var(--header-height)]`. Pada 375×667, heading besar + body text + 2 CTA buttons mungkin terpotong di bawah fold. |
| **Fix** | Gunakan `min-h-dvh`, kurangi spacing pada mobile, atau ubah ke `justify-end pb-16` pada mobile |

### H-03: About Section Mobile Fallback 350px Kosong

| | |
|---|---|
| **File** | `about.tsx` (L126-128) |
| **Problem** | Mobile fallback image area `min-h-[350px]` hanya menampilkan teks "Since 2007". 350px ruang kosong pada 667px viewport = 52% viewport terbuang. |
| **Fix** | Kurangi `min-h-[200px]` atau tampilkan gambar actual pada mobile |

### H-04: Feature-Split Mobile Fallback 350px Kosong

| | |
|---|---|
| **File** | `feature-split.tsx` (L75-77) |
| **Problem** | Sama dengan about.tsx — `min-h-[350px]` untuk placeholder kosong. |
| **Fix** | Sama — kurangi height atau tampilkan gambar |

### H-05: Feature-Split Text Terlalu Sempit (295px)

| | |
|---|---|
| **File** | `feature-split.tsx` (L80) |
| **Problem** | `p-10` (40px all sides). Pada 375px, content area = 375 - 80 = 295px. Sangat sempit untuk body text + list items. |
| **Fix** | Ubah ke `p-6 sm:p-8 lg:p-16` |

### H-06: Pre-Footer Padding Berlebih (256px)

| | |
|---|---|
| **File** | `pre-footer-cta.tsx` (L32) |
| **Problem** | `py-32` = 128px atas + 128px bawah = 256px padding murni pada 667px viewport. |
| **Fix** | Ubah ke `py-16 sm:py-24 lg:py-32` |

### H-07: Font Size `text-display-xl` Min 56px

| | |
|---|---|
| **File** | `globals.css` (L152-157) |
| **Problem** | Clamp min `3.5rem` (56px) terlalu besar untuk 375px screen. |
| **Fix** | Turunkan min ke `2.5rem` atau `2rem` |

### H-08: Brand Carousel No Mobile Navigation

| | |
|---|---|
| **File** | `brand-carousel.tsx` (L117-133) |
| **Problem** | Arrow navigation `hidden lg:flex`. Mobile hanya bisa swipe + dots (C-11). Tidak ada indikasi visual bahwa carousel bisa di-swipe. |
| **Fix** | Tampilkan arrows kecil pada mobile, atau tambah swipe hint animation |

### H-09: FAQ Toggle Button 32px

| | |
|---|---|
| **File** | `faq-section.tsx` (L75) |
| **Problem** | `h-8 w-8` (32×32px) toggle button |
| **Fix** | Perbesar ke `h-11 w-11` (44px) |

### H-10: Mobile Menu Sub-Links 36px

| | |
|---|---|
| **File** | `mobile-menu.tsx` (L113-118) |
| **Problem** | `py-2.5 text-[12px]` = ~34px touch target |
| **Fix** | Tambah `py-3.5` untuk minimum 44px |

### H-11: Mobile Menu No `overscroll-behavior-contain`

| | |
|---|---|
| **File** | `mobile-menu.tsx` (L65) |
| **Problem** | Scroll dalam mobile menu bisa chain-scroll ke body (iOS Safari rubber-band). |
| **Fix** | Tambah `overscroll-behavior-contain` pada scrollable container |

### H-12: Select Component Touch Target

| | |
|---|---|
| **File** | `select.tsx` (L40-45, L108-117) |
| **Problem** | Trigger `h-9`/`h-8` (36/32px). Item options `py-1.5` (~30px). |
| **Fix** | Tambah `min-h-11` pada trigger, `min-h-10` pada items |

### H-13: WhatsApp CTA Inherits Small Size

| | |
|---|---|
| **File** | `whatsapp-cta.tsx` (L56-60) |
| **Problem** | Inherits Button default `h-9` (36px). Sebagai primary action button, terlalu kecil. |
| **Fix** | Default ke `size="lg"` atau tambah `min-h-11` |

### H-14: No Mobile WhatsApp Shortcut in Header

| | |
|---|---|
| **File** | `site-header.tsx` (L174-180) |
| **Problem** | Desktop WhatsApp CTA `hidden lg:inline-flex`. Mobile user harus buka menu drawer untuk menemukan WhatsApp. |
| **Fix** | Tambah icon WhatsApp kecil di header mobile (sebelah hamburger) |

### H-15: Footer Pillar Cards >1000px pada Mobile

| | |
|---|---|
| **File** | `mega-footer.tsx` (L135-140) |
| **Problem** | `grid-cols-1 sm:grid-cols-3`. Pada mobile: 3 cards × `min-h-[200px]` = 600px + header + bottom bar + padding = footer >1000px. |
| **Fix** | Ubah cards ke horizontal scroll pada mobile, atau kurangi `min-h` |

### H-16: Event Detail Grid Never Collapses

| | |
|---|---|
| **File** | `event-detail-content.tsx` (L129) |
| **Problem** | `grid-cols-2 gap-4` untuk date/location/duration/capacity. Pada 375px: ~155px per card, content area ~115px. |
| **Fix** | Ubah ke `grid-cols-1 sm:grid-cols-2` |

### H-17: Education Filter Buttons Touch Target (~36px)

| | |
|---|---|
| **File** | `education-events-filter.tsx` (L82-91) |
| **Problem** | `px-5 py-2 text-[11px]` = ~36px height. |
| **Fix** | Tambah `py-2.5` minimum, atau `min-h-10` |

### H-18: Products Category Tab Touch Target (~30px)

| | |
|---|---|
| **File** | `products-page-content.tsx` (L169-181) |
| **Problem** | `px-4 py-1.5 text-[11px]` = ~30px. |
| **Fix** | Tambah `py-2.5` untuk 44px+ target |

### H-19: Products Filter Toggle Misleading

| | |
|---|---|
| **File** | `products-page-content.tsx` (L152-159) |
| **Problem** | "Show Filters" button visible di mobile tapi sidebar tetap `hidden lg:block`. Button tidak berguna. |
| **Fix** | Hubungkan button ke Sheet/Drawer (bagian dari C-08) |

### H-20: Sheet Default Close Button Small

| | |
|---|---|
| **File** | `sheet.tsx` (L73) |
| **Problem** | Close icon `size-4` (16px). Clickable area ~16×16px. |
| **Fix** | Tambah `p-3` atau explicit sizing `h-11 w-11` |

### H-21: Brands Panel Cramped at lg (1024px)

| | |
|---|---|
| **File** | `brands-panel.tsx` (L12) |
| **Problem** | 5-column grid hardcoded. Pada 1024px, brand cards ~160px each, sangat sempit. |
| **Fix** | Tambah responsive column count: `lg:grid-cols-3 xl:grid-cols-[1fr_1fr_1fr_1fr_220px]` |

### H-22: Grain Overlay Horizontal Overflow

| | |
|---|---|
| **File** | `globals.css` (L390-407) |
| **Problem** | `.grain-overlay::after` menggunakan `inset: -50%` dengan `width: 200%; height: 200%`. Jika parent tidak punya `overflow: hidden`, ini menyebabkan horizontal scroll. |
| **Fix** | Pastikan semua parent grain-overlay punya `overflow: hidden`, atau ubah ke ` inset: 0` |

---

## PHASE 3 — MEDIUM (Cosmetic & UX Polish)

### M-01 s/d M-23

| ID | File | Issue |
|----|------|-------|
| M-01 | `mega-footer.tsx` | Footer `min-h-[520px]` fills almost entire iPhone SE screen |
| M-02 | `mega-footer.tsx` | Header heading + scroll-top button crowded pada 375px |
| M-03 | `hero.tsx` | Gradient overlay lemah di sisi kanan, teks putih sulit dibaca |
| M-04 | `hero.tsx` | CTA button height inconsistency (AnimatedButton vs Button) |
| M-05 | `brand-carousel.tsx` | Fade mask mengurangi readability slide pertama |
| M-06 | `brand-carousel.tsx` | Card `min-h-[420px]` boros vertical space pada mobile |
| M-07 | `feature-split.tsx` | List items cramped pada 295px content width |
| M-08 | `pre-footer-cta.tsx` | Heading wrapping pada 327px |
| M-09 | `partnership.tsx` | Card number badge `text-[64px]` terlalu besar untuk mobile |
| M-10 | `faq-section.tsx` | Answer text `pr-12` (48px) membatasi content width ke 279px |
| M-11 | `certification-badges.tsx` | Badge text cramped di 2-column pada 375px |
| M-12 | `about-page-content.tsx` | "Our Role" pillars 3-col pada sm (640px) cramped |
| M-13 | `partnership-page-content.tsx` | "How It Works" 3-col pada sm cramped |
| M-14 | `education-page-content.tsx` | Past event badges may overflow dengan brand/location panjang |
| M-15 | `article-detail-content.tsx` | Breadcrumb truncation `max-w-[200px]` could be tight |
| M-16 | `event-detail-content.tsx` | Breadcrumb same issue + square aspect ratio berlebih |
| M-17 | `product-detail-content.tsx` | `scrollbar-hide` menghilangkan scroll cue |
| M-18 | `animated-button.tsx` | `.btn-fill` hover sweep tidak kerja pada mobile touch |
| M-19 | `mobile-menu.tsx` | Section buttons + top-level links hover-only feedback |
| M-20 | `fade-in.tsx` | No `prefers-reduced-motion` check |
| M-21 | `text-reveal.tsx` | No `prefers-reduced-motion` check |
| M-22 | `page-transition.tsx` | No `prefers-reduced-motion` check |
| M-23 | `lenis-provider.tsx` | `touchMultiplier: 1.5` feels too fast on iOS |

---

## PHASE 4 — LOW (Minor Issues)

| ID | File | Issue |
|----|------|-------|
| L-01 | `site-header.tsx` | Header scroll-hide no `prefers-reduced-motion` |
| L-02 | `education-panel.tsx` | Tight columns between lg-xl |
| L-03 | `partnership-panel.tsx` | Minor layout tightness at lg |
| L-04 | `sheet.tsx` | `h-full` vs `h-dvh` on iOS Safari |
| L-05 | `navigation-menu.tsx` | Trigger default `h-9` (desktop-only) |
| L-06 | `accordion.tsx` | `hover:underline` no touch feedback |
| L-07 | `products-panel.tsx` | Mouse-only image swap (desktop only, acceptable) |
| L-08 | `products-page-content.tsx` | Sort dropdown fixed `w-[120px]` |
| L-09 | `partnership-form.tsx` | "Additional Details" toggle small touch target |
| L-10 | `product-detail-content.tsx` | `gap-12` generous on mobile |
| L-11 | `lenis-provider.tsx` | iOS Safari elastic scrolling conflict |

---

## Implementation Roadmap

### Sprint 1 — Foundation & Critical Fixes (12 items)

**Estimasi: 12 CRITICAL issues**

| Order | Task | Files |
|-------|------|-------|
| 1.1 | Tambah `overflow-x: hidden` pada body | `globals.css` |
| 1.2 | Fix form input font-size (iOS zoom) | `form-field.tsx` |
| 1.3 | Redesign button sizing system (`min-h-11` default) | `button.tsx` |
| 1.4 | Fix hamburger touch target | `site-header.tsx` |
| 1.5 | Fix mobile menu touch targets (close, sub-links, pillars) | `mobile-menu.tsx` |
| 1.6 | Fix checkbox touch target | `checkbox.tsx` |
| 1.7 | Implement mobile filter drawer untuk Products | `products-page-content.tsx` |
| 1.8 | Fix Privacy/Terms header overlap | `privacy-page-content.tsx`, `terms-page-content.tsx` |
| 1.9 | Fix hero heading overflow | `hero.tsx`, `globals.css` |
| 1.10 | Fix carousel pagination dot touch targets | `brand-carousel.tsx` |
| 1.11 | Fix footer social icon touch targets | `mega-footer.tsx` |

### Sprint 2 — High Priority UX Fixes (22 items)

| Order | Task | Files |
|-------|------|-------|
| 2.1 | Replace `vh` → `dvh` everywhere | `error.tsx`, `not-found.tsx`, `loading.tsx` |
| 2.2 | Mobile-optimize hero (CTA above fold) | `hero.tsx` |
| 2.3 | Reduce mobile fallback empty space | `about.tsx`, `feature-split.tsx` |
| 2.4 | Reduce feature-split mobile padding | `feature-split.tsx` |
| 2.5 | Reduce pre-footer mobile padding | `pre-footer-cta.tsx` |
| 2.6 | Fix fluid typography min sizes | `globals.css` |
| 2.7 | Add mobile carousel navigation | `brand-carousel.tsx` |
| 2.8 | Fix FAQ toggle touch target | `faq-section.tsx` |
| 2.9 | Fix mobile menu overscroll | `mobile-menu.tsx` |
| 2.10 | Fix select component touch targets | `select.tsx` |
| 2.11 | Fix WhatsApp CTA default size | `whatsapp-cta.tsx` |
| 2.12 | Add mobile WhatsApp header icon | `site-header.tsx` |
| 2.13 | Fix footer pillar cards mobile height | `mega-footer.tsx` |
| 2.14 | Fix event detail grid collapse | `event-detail-content.tsx` |
| 2.15 | Fix education filter button targets | `education-events-filter.tsx` |
| 2.16 | Fix products category tab targets | `products-page-content.tsx` |
| 2.17 | Fix sheet close button size | `sheet.tsx` |
| 2.18 | Fix brands panel responsive columns | `brands-panel.tsx` |
| 2.19 | Fix grain overlay overflow | `globals.css` |

### Sprint 3 — Polish & Accessibility (23 MEDIUM + 11 LOW)

| Order | Task | Files |
|-------|------|-------|
| 3.1 | Add `prefers-reduced-motion` to motion components | `fade-in.tsx`, `text-reveal.tsx`, `page-transition.tsx` |
| 3.2 | Add touch/active states to replace hover-only | Multiple files |
| 3.3 | Optimize mobile spacing (footer height, section padding) | Multiple files |
| 3.4 | Reduce Lenis touchMultiplier on mobile | `lenis-provider.tsx` |
| 3.5 | Fix cosmetic issues (cramped grids, badge sizes, etc.) | Multiple files |

---

## Referensi Device Matrix

| Device | Width | Height | Status Saat Ini |
|--------|-------|--------|-----------------|
| iPhone SE (3rd gen) | 375px | 667px | BANYAK ISSUE — CTA below fold, heading overflow, excess spacing |
| iPhone 14 | 390px | 844px | MODERATE — spacing issues, heading tight |
| iPhone 14 Pro Max | 428px | 926px | MINOR — mostly spacing polish |
| Samsung Galaxy S21 | 360px | 800px | BANYAK ISSUE — narrower than iPhone SE |
| iPad Mini (portrait) | 768px | 1024px | MODERATE — falls between sm and lg breakpoints |

---

## Key Design Principles untuk Fix

1. **Touch Target Minimum 44×44px** — Apple HIG & WCAG 2.5.8
2. **Font Size Minimum 16px pada Input** — Mencegah iOS Safari auto-zoom
3. **Gunakan `dvh` bukan `vh`** — Dynamic viewport height untuk iOS Safari
4. **`overflow-x: hidden` pada body** — Mencegah horizontal scroll
5. **Mobile-first responsive** — Padding, font size, dan grid harus mulai dari mobile
6. **Touch feedback** — Semua interactive element harus punya `:active` state
7. **Content harus accessible** — Tidak ada fitur `hidden` tanpa alternatif mobile
