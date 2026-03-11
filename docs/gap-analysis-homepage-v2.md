# GAP Analysis v2 — Frontend HomePage: Yucca.co.za vs Alfa Beauty

> **Scope**: Header → Footer, setiap elemen homepage secara teknis mendalam  
> **Baseline (Reference)**: yucca.co.za (WordPress + GSAP 3 + Barba.js + Lenis, by Zulik Digital)  
> **Subject (Project)**: Alfa Beauty (Next.js 16 + Framer Motion 12 + Tailwind CSS 4 + Lenis)  
> **Date**: March 2026  
> **Metodologi**: Studi langsung dist/main.js Yucca + full source-read 60+ file Alfa Beauty  

---

## Daftar Isi

1. [Site Header — Arsitektur Teknis & Mekanisme Animasi](#1-site-header)
2. [Mega-Menu Desktop — Panel System & Interaction Model](#2-mega-menu-desktop)
3. [Mobile Navigation — Off-Canvas Architecture](#3-mobile-navigation)
4. [Preloader / Brand Reveal — Cinematic Sequence](#4-preloader--brand-reveal)
5. [Page Transition — Route-Level Orchestration](#5-page-transition)
6. [Hero Section — Visual Depth & Content Choreography](#6-hero-section)
7. [Marquee / Infinite Scroll Band — Typographic Rhythm](#7-marquee--infinite-scroll-band)
8. [About / Company Section — Counter & Image Treatment](#8-about--company-section)
9. [Brand Carousel — Scroll Engine & Card Interaction](#9-brand-carousel)
10. [Feature Split (Education) — Asymmetric Layout & Cascade](#10-feature-split)
11. [Partnership Section — Atmospheric Cards & CTA Strategy](#11-partnership-section)
12. [Mega Footer — Scroll-Reveal Architecture](#12-mega-footer)
13. [Smooth Scroll Engine (Lenis) — Configuration & Integration](#13-smooth-scroll-engine)
14. [Animation Engine — Library & Variant Architecture](#14-animation-engine)
15. [CSS Architecture & Design Token System](#15-css-architecture--design-tokens)
16. [Typography System — Scale & Fluid Mechanics](#16-typography-system)
17. [Performance & Rendering Pipeline](#17-performance--rendering)
18. [Accessibility (a11y) — Compliance & Gaps](#18-accessibility)
19. [State Management & Frontend Logic](#19-state-management)
20. [Summary Matrix — Consolidated Gap Table](#20-summary-matrix)

---

## 1. Site Header

### 1.1 Struktur Arsitektur (DOM & Markup)

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Semantic container** | `<header>` → `<nav>` nested, with `.notice-bar` announcement strip above | `<header>` direct, no `<nav>` wrapper — nav logic delegated to Radix `NavigationMenu` composite component | ⚠️ **GAP**: Alfa tidak punya `<nav>` semantic wrapper eksplisit — `NavigationMenu` dari Radix sudah inject `role="navigation"` secara implicit via primitives, tapi ini hidden implementation. Yucca lebih explicit. |
| **Component partitioning** | 3 zona: Brand Identity (logo SVG icon + "YUCCA" + "PACKAGING" text parts), Primary Navigation (mega-menu triggers), Utility Nodes (search icon, cart icon+count badge, account icon, hamburger) | 3 zona: Logo Zone (`alfa-beauty-mark.svg` + `SITE_SHORT_NAME` text), Navigation Hub (6 NavigationMenuItem triggers — 4 mega-menu + 2 direct links), Action Zone (WhatsApp CTA button + mobile hamburger) | ⚠️ **GAP-HEADER-01**: Yucca punya **3 utility icons** (search, cart, account) — Alfa hanya punya 1 CTA (WhatsApp). Secara *information architecture*, Alfa kehilangan: (a) **Search** — zero content discovery mechanism, (b) **Account portal** — N/A untuk business model Alfa, (c) Cart — N/A |
| **Notification/Announcement bar** | ✅ Ada — `.notice-bar` di atas header, dismissible, berisi promo/announcement text | ❌ Tidak ada | 🔴 **GAP-HEADER-02**: Alfa kehilangan announcement bar — critical untuk promosi produk baru, event education, seasonal campaigns |
| **Grid layout system** | CSS Flexbox (`display: flex; align-items: center; justify-content: space-between`) | CSS Grid: `grid-cols-[1fr_auto_1fr]` inside `max-w-[1400px]` — 3-column precision layout | ✅ **Alfa leads** — CSS Grid lebih presisi untuk centering nav group di tengah, Flexbox Yucca bergantung pada space-between |
| **Aksesibilitas (a11y)** | `aria-expanded` pada dropdown triggers, `aria-hidden` pada dekoratif | Radix primitives auto-inject `aria-expanded`, `aria-haspopup`, plus custom `aria-label="Open menu"` pada hamburger, `SheetTitle className="sr-only"` untuk mobile | ✅ **Alfa leads** — Radix primitives memberikan a11y compliance yang lebih comprehensive secara default |

### 1.2 Teknologi Komposisi Visual (Styling & Layouting)

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Background state machine** | Binary: transparent (top) ↔ solid (scrolled). Class toggling: `.scrolled` adds background | **Multi-state computed property**: `isSolid = solid \|\| scrolled \|\| menuOpen \|\| headerHovered \|\| menuClosing`. 5 boolean inputs resolve ke 1 visual state. Transitions: `bg-background border-b border-border-warm/60` (solid) vs `bg-transparent border-b border-white/10` (transparent) | ✅ **Alfa leads** — lebih granular state awareness (hover + closing state + menu state) |
| **Transition properties** | CSS transition on background-color (~300ms) | Inline `style` object: `border-color .5s, background-color .5s, translate .7s, box-shadow .5s` — semua menggunakan `var(--ease)` custom cubic-bezier | ✅ **Alfa leads** — per-property timing control |
| **Elevation shadow** | None visible | `shadow-warm-sm` conditionally applied saat `scrolled && !menuOpen` — warm brand-tinted shadow `0 1px 2px rgba(102,7,8,0.04)` | ✅ **Alfa leads** — Yucca punya hard border, Alfa punya warm shadow |
| **Nav trigger typography** | `~14-16px, medium, uppercase tracking` | `text-[11px] font-semibold uppercase tracking-[0.2em]` — lebih kecil, lebih tight | ≈ **Stylistic difference** — keduanya uppercase tracking, Alfa lebih compact |
| **Indicator bar (active state)** | CSS underline garis bawah sederhana pada nav item aktif | Custom `::before` pseudo-element: `scaleY(0)→scaleY(1)` via `transform`, `h-[0.35rem]`, `rounded-t-[0.35rem]`, warna reaktif terhadap `isSolid` (foreground vs white), `duration-[500ms] ease-[var(--ease)]` | ✅ **Alfa leads** — animated indicator bar yang state-aware |

### 1.3 Engine Animasi & Interaktivitas Header

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Scroll-Triggered State (hide/show)** | Class-based: `scrolled-down` (hide) / `scrolled-up` (show). Scroll direction detected via comparison `scrollY > lastScrollY`. Basic implementation — no jitter prevention | **Framer Motion pipeline**: `useScroll()` → `useMotionValueEvent(scrollY, "change")` → `requestAnimationFrame` gated → 12px deadzone untuk noise filtering. Translate: `-translate-y-[102%]` with 700ms ease. Menggunakan `cancelAnimationFrame()` untuk prevent stacking | ✅ **Alfa leads** — rAF-throttled + 12px deadzone = zero jitter |
| **Hardware acceleration** | CSS transitions melibatkan `background-color` (triggers paint) | Combined: `translate` (GPU-composited) untuk hide/show + `background-color`, `border-color`, `box-shadow` (paint-trigger) via `transition` inline style | ≈ **Parity** — keduanya mix compositor+paint properties. Yucca bisa sedikit lebih performant karena hanya toggle class (repaint sekali) vs Alfa yang animates multiple properties |
| **Menu overlay** | Dark overlay (flat `background-color` only, no blur) | `bg-foreground/60 backdrop-blur-[6px]` with Framer Motion `AnimatePresence` fade: `opacity: 0→1→0` over `0.65s smoothEase`. Elemen `aria-hidden="true"` | ✅ **Alfa leads** — cinematic backdrop-blur overlay vs flat overlay Yucca |
| **Hover state timing** | 100-150ms debounce timer (`mouseenter`/`mouseleave`) untuk anti-flicker pada submenu | React `useCallback` memoisasi `setHeaderHovered(true/false)` — no debounce, tapi Radix NavigationMenu internals menangani submenu timing | ≈ **Neutral** — Radix handles timing internally, tapi Yucca's explicit debounce lebih controllable |
| **Lenis integration** | `lenis.stop()` saat menu/overlay terbuka, `lenis.start()` saat ditutup | Tidak terdeteksi Lenis stop/start saat mega-menu terbuka | ⚠️ **GAP-HEADER-03**: Alfa TIDAK stop Lenis saat mega-menu terbuka — user masih bisa scroll di belakang overlay. Yucca explicitly stops scroll |
| **Menu close detection** | Hanya `mouseenter`/`mouseleave` tracking | `menuClosing` state + `menuWasOpen` ref + 800ms timeout — sophisticated close-transition tracking untuk prevent visual artifacts & pointer-events blocking | ✅ **Alfa leads** — cleaner close transition handling |

### 1.4 Integrasi State Management

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **State pattern** | Vanilla JS class (`Header`) — scroll position tracked via `onScroll()` method, CSS class toggling (`scrolled`, `scrolled-up`, `scrolled-down`, `header-active`, `header-hovered`) | React `useState` × 7: `scrolled`, `menuOpen`, `mobileOpen`, `headerHovered`, `justOpened`, `menuClosing` + `useRef` × 3: `menuWasOpen`, `lastScrollY`, `rafId`. Derived: `isSolid`, `isHidden`, `hasElevation`, `contentEntrance` | ✅ **Alfa leads** — 7 state atoms + 4 derived computations vs 5 CSS classes. Lebih expressive tapi juga lebih complex |
| **Cart state hydration** | WooCommerce REST API → cart count badge updated reactively | N/A — no cart, WhatsApp-based business model | — |
| **Search integration** | WordPress built-in search, search icon in header | ❌ Zero search — no search icon, no search functionality | 🔴 **GAP-HEADER-04**: Alfa punya 35+ products + 10 events + 5 articles tapi ZERO search. Users tidak bisa search apapun |

### 1.5 Logo System

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Construction** | SVG icon + separated text parts ("YUCCA" + "PACKAGING"), CSS `mix-blend-mode` pada dark background | SVG mark (`alfa-beauty-mark.svg`) 28×28 + `<span>` text "ALFA BEAUTY". Filter: `invert brightness-200` (transparent) ↔ `invert-0` (solid) | ≈ Parity — both use mark + text, different inversion techniques |
| **Hover interaction** | No visible hover | `group-hover:scale-108` on mark with 500ms ease | ✅ **Alfa leads** — micro-delight hover |
| **Preloader integration** | Logo di preloader punya entrance animation (scale 0→1 + text slide up) | Logo di preloader: breathe `scale [1→1.05→1]` infinite + wordmark fade-in | ≈ Parity — different approaches, both premium |

---

## 2. Mega-Menu Desktop

### 2.1 Panel Reveal Mechanism

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Viewport animation** | GSAP `clipPath: "inset(0% 0% 100% 0%)"` → `"inset(0% 0% 0% 0%)"` dengan `power3.inOut`, durasi ~0.6s | CSS `clip-path: inset(0 0 100% 0)` → `inset(0 0 0% 0)` via `data-[state=open]` attr, `transition-[clip-path]` durasi ~800ms (open) / ~500ms (close), ease `--ease-menu-open` / `--ease-menu-close` + `will-change-[clip-path]` GPU hint | ✅ **Alfa leads** — `will-change` hint untuk GPU promotion, asymmetric open/close timing (open más slow, close más fast = premium feel) |
| **Content entrance** | GSAP `createCardTl()` — per-card timeline: bg clipPath + media scale 1.4→1 + text lines `yPercent: 100→0` stagger + border `scaleX: 0→1` + link slide up — semua orchestrated dalam timeline presisi | CSS keyframe `mega-content-in`: `opacity 0→1, translateY 14px→0, blur 3px→0` (0.55s, 0.14s delay) + Framer Motion `megaMenuStagger` (staggerChildren: 0.06s) + `megaMenuItemReveal` (opacity + y:14 + scale:0.97 + blur:3px → visible) | ⚠️ **GAP-MEGA-01**: Yucca punya **per-element timeline** yang lebih presisi: bg reveals terpisah dari media, text per-line stagger, border grow, link slide — 5 distinct phases. Alfa menggunakan 1 uniform entrance keyframe untuk semua content + basic stagger. Kurang granular |
| **Panel swap behavior** | Instant content swap (no crossfade antar panel) | Instant content swap — Radix `NavigationMenuContent` swap berdasarkan `value` state change | ✅ Parity |
| **Hover intent debounce** | 100-150ms `setTimeout` pada mouseenter — prevents accidental trigger | Radix `NavigationMenu` internal: `skipDelayDuration` + `delayDuration` props (default 200ms) | ≈ Parity — both implement hover debounce |

### 2.2 Panel Content Architecture

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Shop panel** | Full-width: product categories (Coffee, Smoothies, Deli, Takeout, Cutlery, Bags, Extras) sebagai card items DENGAN image per category + CTA card "Looking for something specific?" + loyalty promo card | **ProductsPanel**: 2-column — Left: featured showcase (dark bg, "Explore Our Product Collection" CTA), Right: 6 categories dalam 2×3 grid TANPA product image per category, hanya icon/text | ⚠️ **GAP-MEGA-02**: Yucca's Shop panel menampilkan **product imagery** di setiap category card. Alfa's ProductsPanel hanya text-based. Visual product discovery lebih lemah |
| **Industry/Brand panel** | Packaging Solutions panel: 3 industry cards (Food Service, Food Processing, Agriculture) DENGAN hero image per industry + description + CTA. Plus side cards untuk special features | **BrandsPanel**: 4-column grid of BRANDS, each card punya: full-height dark bg + brand image (opacity 15→20% hover) + 5-layer gradient + logo + origin flag + "Explore Brand" CTA + bottom accent line | ✅ **Alfa leads** — BrandsPanel lebih kaya secara visual (dark bg, multi-gradient, accent line animation) |
| **Resources panel** | Special behavior: hover pada menu items → swap gambar di panel kanan (`images[item.dataset.index].classList.add('active')`) | **EducationPanel**: 2-column — Left: 4 education items (2×2 grid), Right: CTA column. Tidak ada image swap on hover | ⚠️ **GAP-MEGA-03**: Yucca punya **hover-triggered image swap** pattern di Resources panel — interactive visual feedback. Alfa's EducationPanel statik |
| **CTA card in panel** | Multiple promo cards embedded dalam panel: "Looking for something specific?" → Custom Solutions, "Join loyalty programme 5% back" → Programmes | Embedded CTA di ProductsPanel (featured showcase) dan EducationPanel ("Explore Programs") — tapi lebih subtle, tidak ada promo/urgency messaging | ⚠️ **GAP-MEGA-04**: Yucca meng-embed **promotional messaging** dalam mega-menu (loyalty program, custom solutions) — cross-selling opportunity. Alfa's panels purely navigational |

### 2.3 Animation Detail Comparison

| Phase | Yucca (GSAP `createCardTl`) | Alfa (Framer Motion + CSS) | GAP |
|-------|----------------------------|----------------------------|-----|
| **Background** | `clipPath: "inset(0% 0% 100% 0%)" → "inset(0% 0% 0% 0%)"` (0.6s power3.inOut) per card bg | No per-card bg clipPath — entire panel uses single viewport clipPath | ⚠️ **GAP**: Per-card background clipPath reveal tidak ada di Alfa |
| **Media image** | `scale: 1.4 → 1` (0.8s power2.out), stagger dari bg reveal | Brand image fixed opacity 15% → hover 20%, no scale entrance | ⚠️ **GAP**: Image scale-down entrance tidak ada |
| **Text lines** | `yPercent: 100 → 0` per line, `stagger: 0.04` (0.5s power2.out) | `megaMenuItemReveal`: opacity + y:14 + scale:0.97 + blur → visible. Uniform, bukan per-line | ⚠️ **GAP**: Per-line text stagger tidak ada, replaced by per-item stagger |
| **Border/divider** | `scaleX: 0 → 1, transformOrigin: "left"` (0.5s power2.out) | CSS `w-0 → w-full` on hover only — no entrance animation | ⚠️ **GAP**: Border entrance animation hanya on hover, bukan saat panel opens |
| **Link CTA** | `yPercent: 100 → 0` slide up (0.4s power2.out) | Static text, translate-x-0.5 on hover only | ⚠️ **GAP**: CTA entrance animation tidak ada |

**Verdict GAP-MEGA-05**: Yucca memiliki **5-phase choreographed timeline** per card di mega-menu (bg → media → text lines → border → link). Alfa memiliki **2-phase approach** (viewport clipPath → uniform item stagger). Secara keseluruhan, Yucca's mega-menu animation **lebih presisi dan editorial** meskipun teknis lebih simple (GSAP), karena setiap elemen punya timing-nya sendiri.

---

## 3. Mobile Navigation

### 3.1 Off-Canvas Architecture

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Breakpoint** | `≤1100px` (dideteksi via `window.innerWidth`) | `lg:hidden` (Tailwind v4 default: `1024px`) | ≈ Parity — ~76px difference |
| **Panel pattern** | Full-screen overlay (`position: fixed; inset: 0`) dengan slide-in panel | Radix `Sheet` component, `side="right"`, `max-w-sm`, `border-l border-border-warm/40` | ⚠️ **GAP-MOBILE-01**: Yucca full-screen overlay lebih immersive. Alfa's side-sheet max-width `max-w-sm` (~384px) — konten di belakang masih visible |
| **Submenu pattern** | GSAP `height` animation — accordion expand/collapse per sub-group | Custom accordion: `max-h-0 → max-h-[500px]` CSS transition + `ChevronRight` rotasi 90° | ≈ Parity — similar accordion, different techniques |
| **Item entrance** | None specified — likely instant | `mobileMenuStagger` (0.05s stagger, 0.1s delay) + `mobileMenuItemFade` (blur 4px + x:20 → visible, 0.4s) | ✅ **Alfa leads** — cascading blur entrance per menu item |
| **Cart badge** | Visible pada hamburger/menu area — cart count tetap terbaca | N/A | — |
| **Close mechanism** | Tap overlay / close button | `onClose()` callback + Sheet close mechanism | ≈ Parity |

---

## 4. Preloader / Brand Reveal

### 4.1 Konstruksi Teknis

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Core approach** | **Image sequence** — 5 WebP frames (`loader/1.webp→5.webp`) cycling dengan opacity flip | **Motion choreography** — Framer Motion multi-phase: progress counter + logo breathe + split-wipe exit | Berbeda paradigma — keduanya premium |
| **Animation phases** | 4 phases: (1) Logo icon scale 0→1 (power2.inOut) + text "yucca"/"packaging" y:80→0, (2) Logo+text pack-up y→-120 (power2.inOut), (3) Image sequence 5 frames (0.2s each), (4) Background autoAlpha→0 | 3 phases: (1) Logo breathe scale [1→1.05→1] infinite + wordmark fade-in + progress 0→100% (quintic ease-out, 1.6s), (2) Exit trigger at 1.8s — split-wipe top/bottom scaleY→0 (0.9s cinematicEase), (3) Container opacity→0 at 2.6s | ≈ **Comparable** — Yucca's image sequence lebih visual-rich, Alfa's split-wipe lebih cinematic |
| **Progress indication** | None — visual animation only, user waits blind | ✅ Animated % counter (0→100, quintic ease-out) + shimmer loading bar with glow shadow + scaleX progress | ✅ **Alfa leads** — user gets progress feedback, reduces perceived wait time |
| **Duration** | ~2.5-3s (estimated) | Precisely `PRELOADER_DURATION = 2.6`s | ✅ **Alfa leads** — engineered timing dengan constant |
| **Hero orchestration** | `afterEnter()` callback dari Barba.js → page class init → animations start individually | `HERO_TIMING` constants: `eyebrow: 2.75s`, `heading: 2950ms`, `body: 3.45s`, `cta: 3.7s`, `scroll: 4.2s` — preloader seamlessly chains into hero | ✅ **Alfa leads** — mathematically orchestrated handoff |
| **Repeat visit handling** | Always plays (full preloader on every visit) | Always plays (no session check) | ⚠️ **GAP-PRELOADER-01**: Keduanya SELALU play preloader. Best practice: skip/shorten preloader on subsequent visits (cookie/sessionStorage check) |
| **Content loading** | `autoAlpha` (GSAP) — sets `visibility: hidden` saat alpha=0 untuk paint optimization | `AnimatePresence` exit → `opacity: 0` + React unmount | ≈ Parity — GSAP autoAlpha sedikit lebih optimal (visibility:hidden removes from accessibility tree immediately), tapi Framer Motion unmount is cleaner |

### 4.2 Unique Yucca Elements Missing

| Missing Element | Impact | Priority |
|----------------|--------|----------|
| **Image sequence animation** — 5-frame stop-motion style brand reel | Lebih kaya secara visual; menampilkan produk/brand imagery selama loading | 🟡 MEDIUM — Alfa's progress counter approach sudah effective |
| **Logo entrance animation** — scale 0→1 dramatic | Alfa hanya punya breathe (1→1.05→1) — logo sudah visible from start, kurang dramatis | 🟢 LOW — matter of taste |
| **Multi-part text entrance** — "YUCCA" dan "PACKAGING" animated separately | Alfa hanya punya satu `SITE_SHORT_NAME` text — kurang dynamic | 🟢 LOW |

---

## 5. Page Transition

### 5.1 Route-Level Transition Architecture

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Engine** | **Barba.js** (`sync: true`) — SPA-like, old + new page overlap during transition. Leave: `autoAlpha 0→1` fade-in overlay (0.5s). Enter: overlay `autoAlpha 1→0` (0.5s). `afterEnter`: init new page class, scroll reset, Refresh ScrollTrigger, reinit LazyLoad | **Framer Motion `AnimatePresence`** (`mode="wait"`) — key: pathname. Enter: `opacity 0→1, y 14→0, blur 8→0, scale 0.988→1` (0.55s cinematicEase). Exit: `opacity 1→0, y 0→-16, blur 0→8` (0.55s) | ✅ **Alfa leads** — multi-property transition (blur+scale+y) vs simple overlay fade |
| **DOM strategy** | Old + new page co-exist (`sync: true`), content container swapped | React re-render — new route component replaces old | ✅ **Alfa leads** — React's reconciliation cleaner than DOM swapping |
| **Scroll reset** | Manual `window.scrollTo(0,0)` di `afterEnter` | Next.js App Router auto scroll reset | ✅ **Alfa leads** — built-in |
| **Plugin refresh** | Manual: `ScrollTrigger.refresh()`, `LazyLoad.update()`, `lenis.stop/start()` | Automatic via React lifecycle + Framer Motion layout animations | ✅ **Alfa leads** — no manual refresh needed |
| **SPA-like behavior** | True SPA via Barba.js — no full page reload, header/footer persistent | App Router — persistent layout, only page content changes | ✅ Parity — both avoid full reloads |

### 5.2 Gaps

| GAP | Detail | Priority |
|-----|--------|----------|
| **GAP-TRANSITION-01** | Yucca's `sync: true` memungkinkan smooth crossfade between old+new content (visual overlap). Alfa's `mode="wait"` harus EXIT dulu sebelum ENTER — ada brief gap/flash. | 🟡 MEDIUM |
| **GAP-TRANSITION-02** | Tidak ada route-level **prefetch visual indicator** — user tidak tahu apakah Next.js sedang prefetching route saat hover | 🟢 LOW |

---

## 6. Hero Section

### 6.1 Background & Media Architecture

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Media type** | Static hero image (product/brand photography), large resolution | `<video>` background — `autoPlay muted loop playsInline`, lazy `IntersectionObserver`-loaded, poster fallback (`hero-poster.jpg`) | ✅ **Alfa leads** — dynamic video vs static image |
| **Parallax system** | None pada hero background | **5 scroll-linked transforms**: `videoY` (0 → PARALLAX.hero×500, ~75px), `videoScale` (1→1.18), `contentOpacity` (1→0 at 35% scroll), `contentY` (0→-120px), `contentBlur` (0→10px) — all via `useScroll`/`useTransform` | ✅ **Alfa leads** — deep 5-layer parallax |
| **Video performance** | N/A | `IntersectionObserver` threshold 0.1 — video src dynamically set, `video.load()` + `play()` hanya saat visible. `preload="none"`, `disablePictureInPicture`, `disableRemotePlayback` | ✅ Well-optimized |
| **Overlay compositing** | Simple gradient overlay (generally 1-2 layers) | **5-layer gradient system**: (1) `from-black/75 via-black/40 to-transparent` (left), (2) `from-black/35 via-transparent to-black/65` (top-bottom), (3) `from-brand-dark/30 via-transparent` (diagonal warm), (4) `.vignette-warm` (CSS radial), (5) `radial-gradient(ellipse_80%_60%_at_50%_40%, transparent_50%, rgba(0,0,0,0.35)_100%)` (edge darkening) | ✅ **Alfa leads** — 5 layers vs ~2 |
| **Grain texture** | None pada hero | `.grain-overlay-strong` — SVG noise filter (`baseFrequency: 5, numOctaves: 5`) dengan `mix-blend-mode: overlay`, animated 8s grain shift | ✅ **Alfa leads** |
| **Section bleed** | Hard edge transition ke section berikutnya | `h-56` gradient `from-background via-background/40 to-transparent` — delayed entrance (`HERO_TIMING.eyebrow + 0.2`, 1.4s cinematicEase) | ✅ **Alfa leads** — seamless bleed |

### 6.2 Content Choreography (Orchestrated Timing)

| Phase | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Eyebrow** | Appears with section (CSS transition) | `FadeIn delay={2.75s} blur scale` — blur(4px→0) + scale(0.96→1) | ✅ **Alfa leads** — delayed, blurred entrance |
| **Headline** | CSS opacity/transform transition on scroll-in. Potentially GSAP SplitText lines | `TextReveal split="char" blur` — per-character stagger (35ms intervals), `translateY(110%)→0`, blur variant (4px→0), CSS-driven with IntersectionObserver. Delay: `2950ms` from page load | ✅ **Alfa leads** — per-char stagger (higher granularity than per-line) |
| **Body text** | Appears with section | `FadeIn delay={3.45s} blur` — blur entrance | ✅ **Alfa leads** — orchestrated delay |
| **CTAs** | Standard buttons, appear together | Staggered: primary CTA at `3.7s`, secondary CTA at `3.82s` (+0.12s) — each with `FadeIn direction="up" blur` | ✅ **Alfa leads** — staggered CTA reveal |
| **Scroll indicator** | Mouse/arrow icon, appears with page | Custom `ScrollIndicator`: "Scroll" label + vertical line with glow pulse (`y: [-100%, 100%]` 2.2s infinite + `box-shadow` glow), entrance delay `4.2s` | ✅ **Alfa leads** — unique glow-pulse indicator |

### 6.3 Layout & CTA Architecture

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Content positioning** | Headline + 3 industry pillar CTA cards side-by-side below | Headline + body paragraph + 2 CTA buttons (primary + outline), max-w-3xl, left-aligned | ⚠️ **GAP-HERO-01**: Yucca's hero menampilkan **3 pillar CTA cards** (Food Service, Food Processing, Agriculture) yang langsung mengarahkan user ke 3 value proposition. Alfa hanya punya 2 generic CTAs ("Explore Our Brands" + "Partner With Us"). Yucca's model lebih efektif untuk directional navigation |
| **Pillar CTAs** | 3 cards: "Food Service — Simplifying Large-scale Supply", "Food Processing — Engineered to preserve.", "Agriculture — Your harvest is handled with care." | None — single row of 2 buttons | 🔴 **GAP-HERO-02**: Alfa kehilangan **pillar card navigation pattern** di hero — missed opportunity untuk menampilkan business verticals (Brands, Products, Education, Partnership) sebagai visual cards dari hero |
| **Marquee di hero** | 4 marquee strips running simultaneously di area hero (forward + reverse, industry keywords) | Marquee di section TERPISAH setelah hero (bukan di hero) | ⚠️ **GAP-HERO-03**: Yucca integrasikan marquee DALAM hero section (di belakang content). Alfa memisahkan marquee sebagai section sendiri. Yucca's approach memberikan lebih banyak visual density |
| **Hero content variability** | Potentially CMS-managed — dapat diubah tanpa code | Hardcoded di component file | ⚠️ **GAP-HERO-04**: No CMS — hero content memerlukan code deploy untuk berubah |
| **Background fallback** | Image always available (no lazy load issue) | Poster `hero-poster.jpg` sebagai fallback saat video loading — saat poster missing, background hitam flat | ≈ Neutral — different tradeoffs |

---

## 7. Marquee / Infinite Scroll Band

### 7.1 Technical Comparison

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Instance count (homepage)** | **4 marquee strips** di hero section, berjalan bersamaan (2 forward + 2 reverse) | **1 marquee instance** di section terpisah (10 keyword items, speed=45s) | ⚠️ **GAP-MARQUEE-01**: Yucca punya 4 simultaneous marquee strips untuk depth. Alfa hanya 1 instance. Bisa tambah dual-row (`rows={2}`) yang sudah disupport oleh Marquee component |
| **Multi-row support** | Multiple `<div>` strips stacked, alternate directions | `rows` prop (1 atau 2) — built-in dengan reverse direction | ✅ **Alfa leads** — componentized, tapi belum digunakan (rows={1} default) |
| **Content** | Industry-specific keywords: "Hotels · Restaurants · Event Caterers · Takeout · Delis · Bakeries..." | Brand + value keywords: "Innovation · Alfaparf Milano · Education · Farmavita · Partnership..." | ≈ Stylistic difference |
| **Entrance animation** | None — marquee selalu visible, langsung scroll | `blur(6px)→0 + y:16→0 + scale(0.98)→1` (0.9s cinematicEase) | ✅ **Alfa leads** — section-level entrance |
| **Item hover** | No individual item hover | `scale(1.06) + brightness(1.1)` per item, 300ms transition | ✅ **Alfa leads** — micro-interaction |
| **Pause on hover** | Yes | Yes (CSS `animation-play-state: paused`) | ✅ Parity |
| **Edge masking** | CSS gradient masks | `.fade-mask-x` — `mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent)` | ✅ Parity |
| **Accessibility** | None observed | `role="marquee"`, `aria-label="Scrolling keywords"`, duplicate items `aria-hidden="true"` | ✅ **Alfa leads** |
| **Typography** | Standard body/heading size | `text-h4 font-bold tracking-tight` = fluid `clamp(1.25rem, 1rem + 1vw, 2rem)` | ✅ Alfa — fluid type |

---

## 8. About / Company Section

### 8.1 Layout Architecture

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Grid system** | Single-column or simple 2-col, content-driven layout | `grid-cols-12` — image (5 cols) + content (7 cols), dengan `gap-16`, responsive fallback | ✅ **Alfa leads** — more precise grid |
| **Section scope** | "Designing the Future of Packaging" — mission + vision text, stats | "18+ Years of Professional Excellence" — body paragraphs + LineGrow + 3 counters + CTA | ≈ Comparable scope |

### 8.2 Image Treatment

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Reveal** | Fade-in or scroll trigger class toggle | **clipPath vertical wipe**: `inset(100% 0% 0% 0%)` → `inset(0% 0% 0% 0%)` (1.5s cinematicEase) | ✅ **Alfa leads** — dramatic wipe |
| **Parallax** | None | `imageY` (±default×100) + `imageScale` (1.14→1.08→1.02) | ✅ **Alfa leads** — combined parallax + scale |
| **Ken Burns** | None | `.ken-burns` CSS class — pan & zoom ambient animation | ✅ **Alfa leads** |
| **Glass badge** | None | `glassBadgeReveal`: opacity 0→1, y:14→0, blur 8px→0, scale 0.92→1, delay 0.7s — "Since 2007" text on `glass-strong` backdrop | ✅ **Alfa leads** |
| **Grain** | None | `.grain-overlay` on image container — SVG noise filter | ✅ **Alfa leads** |
| **Gradient overlay** | None | Dual: `bg-gradient-to-t from-black/40 via-black/10 to-transparent` + `bg-gradient-to-br from-brand-dark/15 via-transparent to-transparent` | ✅ **Alfa leads** |

### 8.3 Counter System

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Implementation** | Static numbers or basic jQuery counter (no rAF, no easing) | `useCountUp` hook: IntersectionObserver trigger → `requestAnimationFrame` loop → quintic ease-out `(1−(1−t)⁵)`, locale formatting, decimal support, `onComplete` callback | ✅ **Alfa leads** |
| **Completion effect** | None | `counter-glow` CSS class: `drop-shadow-[0_0_12px_rgba(164,22,26,0.3)]` + CSS animation `counter-pulse-glow` (keyframe 0→0.6→0 box-shadow, 2s) | ✅ **Alfa leads** |
| **Stagger** | None | `counterStagger` variant: 180ms between children, 150ms delay | ✅ **Alfa leads** |
| **Dividers** | Static borders | `LineGrow` component: scroll-linked `scaleX 0→1` via `useTransform` + `StatDivider` vertical line | ✅ **Alfa leads** |

### 8.4 GAPs

| GAP | Detail | Priority |
|-----|--------|----------|
| **GAP-ABOUT-01** | Yucca menampilkan **embedded video atau animated diagram** di industry pages — Alfa hanya static image | 🟡 MEDIUM |
| **GAP-ABOUT-02** | Yucca's about section links ke full `/about` page with CTA — Alfa juga punya ini (`AnimatedButton href="/about"`) | ✅ Parity |

---

## 9. Brand Carousel

### 9.1 Scroll Engine Comparison

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Library** | Custom JS carousel atau Swiper | **Embla Carousel 8.6** + Autoplay plugin | ≈ Parity — mature solutions |
| **Loop** | Unknown | `loop: true`, `containScroll: "trimSnaps"`, `dragFree: false` | ✅ |
| **Autoplay** | Unknown | 5s delay, `stopOnInteraction: true`, `stopOnMouseEnter: true` | ✅ |
| **Keyboard nav** | Unknown | `ArrowLeft`/`ArrowRight` keydown listener on `#brands` section | ✅ **Alfa leads** |
| **Progress indicator** | Pagination dots | **Dual**: (1) scroll progress bar (`scaleX` linked to `scrollProgress()`), (2) expandable dots (active: `w-8 scale-y-110`, inactive: `w-1.5`) | ✅ **Alfa leads** — dual indicator system |
| **Slide counter** | None visible | `{selectedIndex + 1} / {BRANDS.length}` — numeric counter | ✅ **Alfa leads** |
| **Edge masking** | Unknown | `.fade-mask-x-subtle` (3%→97% gradient mask) | ✅ |
| **Drag feedback** | Unknown | `.cursor-grab-active` — `cursor: grab` default, `cursor: grabbing` on active | ✅ **Alfa leads** |

### 9.2 Card Interaction Depth

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Card structure** | Product cards: image + title + price, basic hover | Brand cards: logo + origin flag + name + description — editorial/portfolio style | Different intent |
| **Hover layers** | 1-2 layers (shadow + transform) | **6+ layers**: (1) `-translate-y-1.5`, (2) `shadow-warm-lg`, (3) `border-charcoal/20`, (4) glassmorphism gradient `to-white/30 opacity 0→1`, (5) logo `scale-110 + opacity 0.8→1`, (6) accent line `w-0→w-full` (900ms) | ✅ **Alfa leads** — dramatically deeper hover |
| **Entrance** | Basic fade or slide | `cardFadeScale`: opacity 0→1, y:32→0, scale 0.96→1, blur 4px→0 (0.85s cinematicEase) with `cardStagger` (140ms) | ✅ **Alfa leads** |

### 9.3 GAPs

| GAP | Detail | Priority |
|-----|--------|----------|
| **GAP-CAROUSEL-01** | Yucca carousel menampilkan **product prices** + "Add to Cart" buttons → transactional. Alfa carousel hanya brand showcase → navigational | — N/A (different business model) |
| **GAP-CAROUSEL-02** | Yucca punya **category filtering** pada product carousel — Alfa carousel hanya brand-only (4 items, no filter needed) | 🟢 LOW |
| **GAP-CAROUSEL-03** | Alfa carousel hanya punya **4 items** — jumlah sangat sedikit, entire carousel bisa visible sekaligus di large desktop. Secara UX, 4-item carousel terasa under-populated | 🟡 MEDIUM — consider adding Alfaparf Milano & Farmavita products |

---

## 10. Feature Split

### 10.1 Layout Architecture

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Grid** | Simple 2-col (image + text) | `grid-cols-2` dengan `gap-0` — true edge-to-edge split | ✅ **Alfa leads** — zero-gap asymmetric |
| **Padding asymmetry** | Constrained container both sides | Image side `p-0` (full-bleed), text side `p-10 lg:p-16 xl:p-24` — dramatic contrast | ✅ **Alfa leads** |
| **Direction** | Sometimes alternating (image left→right→left for variety) | Single direction only (image left, text right) | ⚠️ **GAP-SPLIT-01**: Yucca alternates split direction for visual variety. Alfa fixed ke satu arah |

### 10.2 Image Treatment

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Reveal** | Fade or basic transition | **Horizontal clipPath**: `inset(0% 0% 0% 100%)` → `inset(0% 0% 0% 0%)` — left-to-right wipe (1.5s cinematicEase) | ✅ **Alfa leads** |
| **Glass badge** | None | `glassBadgeReveal` — "Education & Training" on `glass-strong` | ✅ **Alfa leads** |
| **Parallax + scale** | None | `imageY` (±default×100) + `imageScale` (1.18→1.08→1.02) + `.ken-burns` | ✅ **Alfa leads** |

### 10.3 Text Cascade

| Phase | Yucca | Alfa | GAP |
|-------|-------|------|-----|
| 1 | Fade in | Eyebrow `FadeIn right blur scale` (delay 0.2s) | ✅ Alfa |
| 2 | CSS transition | `TextReveal word blur` ("More Than a Distributor") | ✅ Alfa |
| 3 | None | `LineGrow` separator | ✅ Alfa |
| 4 | Basic text reveal | `FadeIn right blur` body paragraph | ✅ Alfa |
| 5 | Standard bullets | `listStagger` + `listItemFadeIn` (blur 3px + x:16), numbered, hover border-brand-crimson | ✅ Alfa |
| 6 | None | Italic quote `FadeIn dramatic` (cinematicEase 0.9s) | ✅ Alfa |
| 7 | Standard button | `AnimatedButton` fill-sweep CTA | ✅ Alfa |

**7-stage cascade** vs Yucca's ≈2-3 phases. ✅ **Alfa leads significantly**.

### 10.4 GAPs

| GAP | Detail | Priority |
|-----|--------|----------|
| **GAP-SPLIT-01** | *(Repeated)* Tidak ada alternating layout direction | 🟡 MEDIUM |
| **GAP-SPLIT-02** | Yucca's food service section kadang includes **embedded video** di split layout | 🟡 MEDIUM |

---

## 11. Partnership Section

### 11.1 Atmospheric Background System

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Background** | Solid color atau simple gradient | **3-layer atmospheric**: (1) Parallax image at 4% opacity + grain + ken-burns, (2) `bg-gradient-to-br from-surface via-surface-elevated/30 to-surface`, (3) `bg-gradient-to-t from-surface/60 via-transparent to-surface/40` | ✅ **Alfa leads** — cinematic depth |
| **BG parallax** | None | `bgY` (±subtle×100) + `bgScale` (1.14→1.08→1.02) | ✅ **Alfa leads** |

### 11.2 Partner Card Design

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Numbered badge** | None | 64px font-bold number ("01", "02"), `text-border-warm/60`, transitions to `text-border-warm` on hover | ✅ **Alfa leads** — editorial |
| **Card hover** | Basic shadow/transform | `-translate-y-3` + `shadow-warm-lg` + `border-charcoal/30` + gradient overlay + accent line `w-0→w-full` (800ms) + `grain-overlay-subtle` | ✅ **Alfa leads** — 6-layer hover |
| **List animations** | Static | `listStagger` + `listItemFadeIn` (blur + slide) + `border-l-2` hover accent | ✅ **Alfa leads** |

### 11.3 CTA Strategy Comparison

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Primary CTA** | Single "Enquire Now" button | `AnimatedButton` "Become a Partner" (crimson fill → white text sweep) | ✅ Parity |
| **Secondary CTA** | "Not sure what's possible? Get in touch." — rotating marquee CTA | `WhatsAppCTA` outline — "Consult via WhatsApp" with `trackEvent` analytics | ≈ **Different approach** — Yucca's marquee secondary CTA lebih creative, Alfa's WhatsApp lebih functional |
| **Tertiary** | None | None | — |
| **Pre-footer CTA banner** | ✅ "Brands that thrive invest in custom..." + "Enquire now" + rotating marquee — appears on nearly EVERY page | ❌ Alfa has no recurring pre-footer CTA banner | 🔴 **GAP-CTA-01**: Alfa kehilangan **pre-footer CTA banner** — Yucca uses this as "last chance" conversion point on every single page. This is a significant conversion optimization gap |

---

## 12. Mega Footer

### 12.1 Scroll-Reveal Architecture

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Reveal pattern** | `position: fixed; bottom: 0` behind page — page slides away | Exact same: `fixed inset-x-0 bottom-0 z-0` footer, main `relative z-10 bg-background`, spacer `div` with dynamic height | ✅ **Parity** — Alfa faithfully adapted pattern |
| **Height tracking** | Fixed or CSS calc | Dynamic `ResizeObserver` → `footerHeight` state → spacer height | ✅ **Alfa leads** — handles dynamic content |
| **Background** | Dark bg (near black) | `bg-surface` (warm off-white #f6f5f0) + `.vignette-warm` | Different aesthetic choice |

### 12.2 Content Structure

| Element | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|---------|----------|----------------|-----|
| **Headline** | Large text: "Innovated for Industry Leaders" | `TextReveal word blur`: "Innovated for Salon & Barber Professionals." | ✅ Parity — both have animated headline |
| **Brand wordmark** | Large Yucca logo/icon | `WordmarkParallax` — SVG logo with `useParallax` scroll-linked Y offset | ✅ **Alfa leads** — parallax on wordmark |
| **Pillar cards** | 3 cards: Food Service / Food Processing / Agriculture — with image + hover | 3 cards: Products / Education / Partnership — numbered (01/02/03), `grain-overlay-subtle`, gradient hover, accent line grow (800ms), "Explore" CTA reveal on hover, `cardFadeScale` entrance | ✅ **Alfa leads** — deeper hover micro-interactions |
| **Certification badges** | ✅ 14 certification badges displayed | ❌ None | 🔴 **GAP-FOOTER-01**: Alfa has NO certification/trust badges. Yucca displays 14 certifications (FDA, EU, BRCGS, FSC, ISO 9001, etc.) in footer. Trust signal sangat lemah |
| **Social links** | Facebook + Instagram + LinkedIn (3 platforms) | Instagram + WhatsApp only (2) | ⚠️ **GAP-FOOTER-02**: 1 fewer social platform. Missing LinkedIn/TikTok/Facebook |
| **Newsletter** | ✅ "Credit Application" download CTA + implied email capture | ❌ No newsletter/email capture | ⚠️ **GAP-FOOTER-03**: No email marketing capture point |
| **Sitemap links** | Full page list: Shop, Company, Contact, all categories | Minimal: only 3 pillar cards + legal links | ⚠️ **GAP-FOOTER-04**: Minimal footer navigation — no full sitemap |
| **WhatsApp FAB** | WhatsApp green FAB, fixed bottom-right | ✅ Same — `fixed bottom-6 right-6 z-50`, `floatingFadeIn` entrance, glow hover (`shadow: 0 0 20px rgba(37,211,102,0.35)`), analytics tracking | ✅ Parity (Alfa adds glow + tracking) |

### 12.3 Footer Version Gap

**MegaFooter V5** vs semua homepage section yang sudah **V8**. Ini berarti footer belum di-upgrade dengan pola V8:
- Missing: Ken Burns ambient pada pillar card images
- Missing: Enhanced glassmorphism overlays
- Missing: Deeper parallax scale ranges

⚠️ **GAP-FOOTER-05**: MegaFooter internal version behind — V5 vs V8 sections.

---

## 13. Smooth Scroll Engine

### 13.1 Lenis Configuration

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Easing** | Quintic ease-out: `(e) => 1 - Math.pow(1-e, 5)` | Exponential decay: `(e) => 1.001 - Math.pow(2, -10 * e)` → `≈ 1 − 2^(−10t)` | ≈ **Different character** — Yucca's quintic (polynomial) has softer tail, Alfa's exponential has sharper stop. Both are premium |
| **Duration** | Not specified (default Lenis ~1.0-1.2s) | `duration: 1.4` — explicitly slower for luxury feel | ✅ **Alfa leads** — intentionally tuned |
| **Lerp** | Not specified | `lerp: 0.1` — low interpolation for silky smooth | ✅ |
| **Touch multiplier** | `touchMultiplier: 2` (dari kode) | `touchMultiplier: 2.0` + `wheelMultiplier: 1.0` | ✅ Parity |
| **Menu integration** | `lenis.stop()` saat menu/modal/overlay terbuka, `lenis.start()` saat ditutup | **Tidak terdeteksi** Lenis stop/start pada mega-menu | 🔴 **GAP-SCROLL-01**: Alfa DOES NOT stop Lenis saat mega-menu terbuka — scroll continues behind overlay |
| **Barba.js integration** | Lenis stopped sebelum transition, restarted setelah | N/A — Framer Motion handles transitions | — |
| **ScrollTrigger integration** | `lenis.on('scroll', ScrollTrigger.update)` — proxied | Framer Motion `useScroll` reads scroll position natively — no proxy needed | ✅ **Alfa leads** — cleaner integration |
| **Reduced motion** | Unknown | `prefers-reduced-motion` check — Lenis disabled | ✅ **Alfa leads** |
| **Context exposure** | Direct lenis instance reference | React Context: `useLenis()` hook | ✅ **Alfa leads** — framework-integrated |

---

## 14. Animation Engine

### 14.1 Library Architecture

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Primary engine** | **GSAP 3** — GreenSock Animation Platform | **Framer Motion 12** — React-native animation library | Fundamental difference — GSAP is imperative timeline-based, FM is declarative variant-based |
| **Plugins** | `ScrollTrigger` (scroll-linked), `SplitText` (text splitting), `Observer` (gesture) | None needed — Framer Motion has `useScroll`, `useTransform`, `AnimatePresence` built-in. Text splitting done via custom `TextReveal` component | ≈ Different ecosystem — GSAP plugins are paid, FM is open-source |
| **CSS animations** | CSS transitions for hover/micro, GSAP for entrances | **Hybrid**: Framer Motion for page-level + section-level, CSS `@keyframes` for low-level (marquee, grain, shimmer, ken-burns, counter-pulse) | ✅ **Alfa leads** — cost-effective hybrid (CSS for repetitive, FM for orchestrated) |
| **Timeline orchestration** | GSAP `timeline()` — precise position parameters (`"<0.1"`, `"-=0.6"`) memungkinkan exact frame timing | Framer Motion `staggerChildren` + `delayChildren` in `Variants` — timing is arithmetic (delay = index × stagger), kurang presisi dibanding timeline position | ⚠️ **GAP-ANIM-01**: GSAP timeline memberikan **frame-accurate orchestration** yang Framer Motion tidak bisa match. FM stagger model assumes uniform delay pattern — no label-based positioning |
| **Scroll-linked animation** | `ScrollTrigger` — `scrub: true` links animation progress to scroll position. Supports `pin`, `snap`, `markers` | `useScroll()` + `useTransform()` — maps scroll progress to any value. No built-in pin/snap | ⚠️ **GAP-ANIM-02**: Alfa tidak punya **scroll-pinning** capability. Yucca's ScrollTrigger can pin sections while scrolling, creating immersive full-viewport takeover effects. Framer Motion cannot do this natively |
| **Text splitting** | `SplitText` plugin — splits into lines, words, chars. Paid GSAP plugin, production-grade | Custom `TextReveal` component — CSS-based splitting via `<span>` wrapping with `--word-index` CSS variables + IntersectionObserver trigger | ✅ **Alfa leads** — achieves same result without paid plugin, CSS-driven is more performant |

### 14.2 Easing Vocabulary

| Yucca Easing | Code | Alfa Beauty Equivalent | Match |
|-------------|------|----------------------|-------|
| `power2.inOut` | Quadratic ease-in-out | `smoothEase [0.22,1,0.36,1]` — close but extended | ≈ |
| `power2.out` | Quadratic ease-out | `decelerateEase [0,0,0.2,1]` | ≈ |
| `power3.inOut` | Cubic ease-in-out, premium | `cinematicEase [0.16,1,0.3,1]` | ✅ Match |
| `power3.out` | Cubic ease-out, hero | `cinematicEase` (reused) | ≈ |
| Custom quintic | `1-Math.pow(1-e,5)`, Lenis | Similar but exponential decay `1.001-2^(-10e)` | ≈ |
| — | — | `snappyEase [0.25,0.1,0.25,1]` — no Yucca equivalent | ✅ Alfa exclusive |
| — | — | `anticipateEase [0.36,0,0.66,-0.56]` — pullback | ✅ Alfa exclusive |
| — | — | `exitEase [0.4,0,0.7,0.2]` — exit-specific | ✅ Alfa exclusive |
| — | — | `elasticSettle [0.175,0.885,0.32,1.1]` — overshoot | ✅ Alfa exclusive |

**Verdict**: Alfa has **7 named easing curves** vs Yucca's **~4-5 GSAP easings**. ✅ **Alfa leads** in easing vocabulary richness.

### 14.3 Variant Library Comparison

| Category | Yucca (GSAP) | Alfa (Framer Motion) | GAP |
|----------|-------------|---------------------|-----|
| **Stagger orchestration** | ❌ No centralized system — each component creates its own timeline | ✅ **26 named variants** in centralized `motion.ts` — 16 sections covering stagger/fade/card/list/panel/mobile/slide/clipPath/image/glass/counter/divider/float/mega/hero/scroll | ✅ **Alfa leads** — centralized, composable, reusable |
| **ClipPath reveals** | ✅ All 4 directions | ✅ All 4 directions (`clipRevealUp/Left/Right/Down`) | ✅ Parity |
| **Image scale+reveal** | `scale 1.4→1` + parent clipPath | `imageRevealContainer` (clip+scale composite), `imageRevealHorizontal` | ✅ Parity |
| **Glass entrance** | ❌ None | ✅ `glassBadgeReveal` (blur 8px + scale 0.92 + y:14) | ✅ **Alfa leads** |
| **Counter animations** | ❌ None | ✅ `counterStagger` + `counterFadeUp` + `counterPulse` | ✅ **Alfa leads** |
| **Floating elements** | ❌ None | ✅ `floatingFadeIn` (blur 4px + scale 0.8) | ✅ **Alfa leads** |
| **Per-card timeline** | ✅ `createCardTl()` — 5-phase per-card: bg→media→text→border→link | ❌ Uniform card stagger only | ⚠️ **GAP-ANIM-03**: Yucca's per-card 5-phase timeline is more granular |

### 14.4 Animation Gaps Summary

| GAP ID | Description | Priority | Effort |
|--------|-------------|----------|--------|
| **GAP-ANIM-01** | No GSAP-style timeline positioning — FM cannot do label-based `"<0.1"` offsets | 🟢 LOW — FM stagger model is sufficient for most use cases |
| **GAP-ANIM-02** | No scroll-pinning (ScrollTrigger `pin`) — cannot create full-viewport takeover sections | 🟡 MEDIUM — could use `framer-motion-scroll-pin` or CSS `scroll-snap` |
| **GAP-ANIM-03** | No per-element sub-timeline in cards — mega-menu lacks the 5-phase card entrance Yucca has | 🟡 MEDIUM — implementable via nested `motion.div` with manual delays |
| **GAP-ANIM-04** | `filter: blur()` transitions NOT GPU-composited — triggers paint on every frame. Alfa uses blur extensively (fade entrances, panel entrances, hero blur on scroll). Missing `will-change: filter` hints | 🟡 MEDIUM — performance impact on lower-end devices |

---

## 15. CSS Architecture & Design Tokens

### 15.1 Framework Comparison

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **CSS approach** | Custom `style.css` — likely SCSS/PostCSS via WP build | **Tailwind CSS 4** JIT + `@theme inline` tokenization + shadcn/ui | ✅ **Alfa leads** — utility-first, tree-shaking, JIT-compiled |
| **Component library** | None — custom markup | **shadcn/ui** — Radix primitives (NavigationMenu, Sheet, Accordion, Button) | ✅ **Alfa leads** — accessible-by-default |
| **Token architecture** | CSS Custom Properties in `:root` | `@theme inline {}` block: 30+ brand colors, 10 semantic status, warm shadow system, 3 easing vars, header height, font | ✅ **Alfa leads** — more comprehensive tokenization |
| **Utility classes** | Standard CSS classes | Extended: `.btn-animated`, `.link-animated`, `.img-zoom-wrapper`, `.grain-overlay` (3 levels), `.glass` (5 variants), `.fade-mask-x`, `.reveal-text`, `.reveal-text-v3`, `.border-grow-x/y`, `.shimmer-bar`, `.shadow-warm-*` (4 tiers), `.vignette-warm`, `.ken-burns`, `.counter-glow`, `.menu-img-zoom`, `.scrollbar-hide` | ✅ **Alfa leads** — significantly richer utility library |

### 15.2 Design Token Gaps

| GAP | Detail | Priority |
|-----|--------|----------|
| **GAP-CSS-01** | Yucca uses `rgba(0,0,0,0.08)` neutral borders — Alfa uses warm-tinted `--border-warm: #e8e4df` + brand-tinted shadows. Both valid but different personality | ≈ Stylistic |
| **GAP-CSS-02** | No dark mode support in Alfa — single theme only | 🟢 LOW (target audience doesn't need dark mode) |
| **GAP-CSS-03** | Alfa's `filter: blur()` in Framer Motion variants is NOT tokenized in CSS — inconsistent with CSS blur values. Some use 3px, some 4px, some 6px, some 8px | 🟢 LOW — internal consistency issue |

---

## 16. Typography System

### 16.1 Scale Architecture

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Font** | Custom unnamed sans-serif (possibly optimized Inter or similar) | **Montserrat** 300-700 via `next/font/google`, `display: swap` | ≈ Comparable — both quality sans-serif |
| **Scale model** | Static `rem`/`em` values with media query breakpoints | **10-level fluid scale** using `clamp()`: from `display-xl` (2.5rem→4.5rem) to `tiny` (0.6875rem→0.75rem) — NO media queries for font size | ✅ **Alfa leads** — smoother responsive typography |
| **Body weight** | Normal (400) | Light (300) — elegant, editorial feel. Bold (700) for headings | ✅ **Alfa leads** — intentional hierarchy |
| **Tracking** | Standard (no extreme tracking observed) | Aggressive tracking on UI text: `tracking-[0.2em]` on nav, `tracking-[0.25em]` on logo text, `tracking-[0.15em]` on eyebrows | ✅ **Alfa leads** — refined typographic micro-spacing |
| **Legacy alias system** | None (direct classes) | `.eyebrow`, `.heading-display`, `.heading-section`, `.body-prose` — semantic aliases that map to fluid scale + add leading/tracking | ✅ **Alfa leads** — semantic control |

### 16.2 Text Splitting / Reveal

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Engine** | GSAP `SplitText` — paid plugin ($99/yr), splits into lines/chars natively | Custom `TextReveal` (V5) — CSS-driven, 3 modes (line/word/char), `IntersectionObserver` trigger, CSS vars `--word-index` + `--stagger-ms` | ✅ **Alfa leads** — zero-cost, CSS-performant, no JS computation for animation |
| **Blur variant** | Not observed with SplitText | `blur` prop: adds `.reveal-blur` class → `filter: blur(4px) → blur(0px)` stagger with translate | ✅ **Alfa leads** |
| **Accessibility** | Unknown | `<span className="sr-only">{lines.join(" ")}</span>` — full text accessible to screen readers while visual version is split | ✅ **Alfa leads** |

---

## 17. Performance & Rendering

### 17.1 Bundle & Delivery

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Bundle strategy** | **Single JS bundle** (`dist/main.js`) — all pages, all animations, all logic in one file | **Per-route code splitting** — Next.js App Router auto-splits at page boundaries. `"use client"` boundary-aware | ✅ **Alfa leads** — only loads what's needed |
| **Image optimization** | WordPress responsive sizes (300, 768, 1024, 1200, 1536px), WebP where configured | Next.js `<Image>` — automatic AVIF/WebP, `sizes` hints, `priority` flag for LCP | ✅ **Alfa leads** — AVIF support, automatic |
| **Font loading** | `@font-face` in CSS (potentially render-blocking) | `next/font/google` — `display: swap`, variable CSS, single optimized request | ✅ **Alfa leads** |
| **Animation bundle** | Zero JS animation overhead (CSS-only) + GSAP (~30KB gzipped runtime) | Framer Motion (~30-40KB gzipped) + CSS hybrid | ≈ **Parity** — similar bundle cost, different capabilities |
| **Lazy loading (images)** | `vanilla-lazyload` (third-party JS) | Native Next.js `<Image>` lazy loading | ✅ **Alfa leads** — framework-native |
| **Video** | No video on homepage | IO-based lazy video loading, `preload="none"` | ✅ Alfa — well-optimized |

### 17.2 Rendering Concerns

| Concern | Detail | Severity |
|---------|--------|----------|
| **GAP-PERF-01** | Alfa uses `filter: blur()` extensively in Framer Motion variants — NOT GPU-composited by default. Each blur transition triggers paint on main thread. Yucca avoids blur entirely (GSAP animate `clipPath` + `transform` + `opacity` only — all compositor-thread) | 🟡 MEDIUM |
| **GAP-PERF-02** | Alfa's `useTransform` with `filter` template literal: `useTransform(contentBlur, (v) => \`blur(${v}px)\`)` creates new string every frame — garbage collection pressure | 🟢 LOW |
| **GAP-PERF-03** | No `will-change` hints on elements that transition `filter` property | 🟡 MEDIUM |
| **GAP-PERF-04** | Missing scroll-jank prevention: no `content-visibility: auto` on below-fold sections | 🟢 LOW |

---

## 18. Accessibility (a11y)

### 18.1 Compliance Matrix

| Feature | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|---------|----------|----------------|-----|
| **Skip navigation** | Unknown | ✅ "Skip to content" link — `sr-only focus:not-sr-only focus:fixed z-[100]` | ✅ **Alfa leads** |
| **Semantic landmarks** | `<header>`, `<main>`, `<footer>` | `<header>`, `<main id="main-content">`, `<section id="...">`, `<footer>`, implicit `<nav>` via Radix | ✅ **Alfa leads** |
| **ARIA on marquee** | None | `role="marquee"`, `aria-label`, items `aria-hidden` | ✅ **Alfa leads** |
| **Screen reader text** | Unknown | `TextReveal` sr-only full text fallback | ✅ **Alfa leads** |
| **Focus indicators** | Unknown | `focus-visible:outline` + `focus-visible:ring-2 ring-ring` | ✅ **Alfa leads** |
| **Reduced motion** | Unknown | `@media (prefers-reduced-motion: reduce)` — disables ALL transitions/animations + Lenis respects | ✅ **Alfa leads** |
| **Carousel keyboard** | Unknown | `ArrowLeft`/`ArrowRight` keybinding on brands carousel | ✅ **Alfa leads** |
| **Color contrast** | Unknown | Brand crimson (#a4161a) on white: ~5.5:1 (passes WCAG AA) | ✅ Alfa passes |

### 18.2 Remaining a11y Gaps

| GAP | Detail | Priority |
|-----|--------|----------|
| **GAP-A11Y-01** | Carousel pagination dots have NO visible focus indicator — keyboard users can tab but see no ring | 🟡 MEDIUM |
| **GAP-A11Y-02** | During preloader (2.6s), keyboard users CANNOT interact — no `aria-busy` or loading state announced | 🟡 MEDIUM |
| **GAP-A11Y-03** | No `aria-live` region untuk dynamic content (counter completion, carousel slide change) | 🟡 MEDIUM |
| **GAP-A11Y-04** | Video hero has no transcript/captions — decorative but `aria-hidden="true"` is present, so OK for WCAG | 🟢 LOW |

---

## 19. State Management & Frontend Logic

### 19.1 Architecture Pattern

| Aspek | Yucca 🌿 | Alfa Beauty 💈 | GAP |
|-------|----------|----------------|-----|
| **Pattern** | **Class-based ES6**. Setiap halaman adalah JS class (`class Home {}`, `class About {}`). Setiap class punya `init()` dan `destroy()` lifecycle. State = class properties | **React Hooks**. State atoms via `useState`, side effects via `useEffect`, scroll integration via `useScroll`/`useMotionValueEvent`. No external state library (no Redux/Zustand) | ✅ **Alfa leads** — modern, declarative, automatic cleanup |
| **Global state** | Barba.js manages routing state. Header/Nav class instances persist across navigations. WooCommerce API untuk cart state | No global state library. Config imported from `config.ts`. Analytics via `trackEvent()` function. Lenis via `React.Context` | ≈ Comparable — both minimal global state |
| **Form state** | WooCommerce checkout forms — plugin-managed | React Hook Form pattern (controlled inputs) + Zod server-side validation + rate limiting + honeypot | ✅ **Alfa leads** — OWASP-compliant pipeline |
| **Scroll state** | `IntersectionObserver` + scroll class toggling (`.scrolled`, `.scrolled-up`, `.scrolled-down`) | `useScroll()` → `useTransform()` for continuous values + `useMotionValueEvent` for threshold detection | ✅ **Alfa leads** — continuous (not binary) scroll state |

### 19.2 Content Management Gap

| GAP | Detail | Priority |
|-----|--------|----------|
| **GAP-STATE-01** | Yucca's content is CMS-managed (WordPress + ACF) — 35+ FAQ items, blog posts, product listings, team members all editable via admin panel. Alfa's content is **100% hardcoded** in TypeScript files (`config.ts`, `product-data.ts`, `education-data.ts`) — every content change requires code deploy | 🔴 **CRITICAL** |
| **GAP-STATE-02** | No real-time data — Alfa doesn't fetch any data via API at runtime. Everything is statically generated | 🟡 MEDIUM |

---

## 20. Summary Matrix

### A. Alfa Beauty WINS (Superior to Yucca) ✅

| # | Feature | Detail teknis |
|---|---------|------|
| 1 | **Animation variant library** | 26 named variants in centralized `motion.ts` vs Yucca's per-component ad-hoc timelines |
| 2 | **Easing vocabulary** | 7 named curves + 3 CSS ease vars vs Yucca's ~4 GSAP presets |
| 3 | **Parallax system** | 5 intensity levels, scroll-continuous values via `useTransform` vs Yucca's basic/no parallax |
| 4 | **Text reveal** | Per-char + per-word + per-line with blur, CSS-driven, zero plugin cost vs GSAP SplitText ($99/yr) |
| 5 | **Hero section** | Video bg + 5 parallax transforms + 5 gradient layers + grain + orchestrated 5-step content timing |
| 6 | **Card hover depth** | 6-7 layer hover (translate, shadow, border, glass, logo-scale, accent line, grain) vs 1-2 layers |
| 7 | **Preloader** | Cinematic split-wipe + progress counter + hero handoff timing vs simple image sequence |
| 8 | **CSS utility library** | 3-level grain, 5 glass variants, 4-tier warm shadows, shimmer, animated dividers, ken-burns, counter-glow |
| 9 | **Type safety** | Full TypeScript strict vs zero type checking (vanilla JS) |
| 10 | **Accessibility** | Skip-nav, ARIA marquee, sr-only text, focus-visible, reduced-motion, Radix primitives |
| 11 | **Performance architecture** | Per-route code splitting, RSC, AVIF/WebP, `next/font`, IO-based video lazy load |
| 12 | **Analytics depth** | GA4 + FB Pixel + Microsoft Clarity + custom `trackEvent()` vs GA only |
| 13 | **Security** | Nonce-based CSP, OWASP-compliant forms, rate limit, honeypot vs standard WP plugins |
| 14 | **Fluid typography** | 10-level `clamp()` scale, no media query dependencies |
| 15 | **Design tokens** | 30+ brand colors, warm shadows, mood vars, semantics — comprehensive `@theme` system |

### B. Yucca WINS (Alfa Is Missing) 🔴⚠️

| # | GAP ID | Feature Missing | Priority | Impact | Effort |
|---|--------|----------------|----------|--------|--------|
| 1 | **GAP-HEADER-02** | **Announcement/Notification bar** — dismissible strip above header for promos, events, campaigns | 🔴 HIGH | Marketing, conversion | Low |
| 2 | **GAP-HEADER-04** | **Search functionality** — zero search across 35+ products, 10 events, 5 articles | 🔴 HIGH | Content discovery | Medium-High |
| 3 | **GAP-STATE-01** | **CMS integration** — all content hardcoded, no admin panel for non-developer updates | 🔴 CRITICAL | Content agility, scalability | High |
| 4 | **GAP-CTA-01** | **Pre-footer CTA banner** — recurring "last chance" conversion section before footer on every page | 🔴 HIGH | Conversion rate | Low |
| 5 | **GAP-FOOTER-01** | **Certification/Trust badges** — no brand/product certifications displayed | 🔴 HIGH | Trust signal | Low |
| 6 | **GAP-HERO-02** | **Pillar/Value proposition cards in hero** — Yucca shows 3 industry pillars directly in hero for instant navigation | 🟡 MEDIUM | Navigation clarity | Medium |
| 7 | **GAP-MEGA-01** | **Per-element timeline** in mega-menu — Yucca's 5-phase card choreography (bg→media→text→border→link) | 🟡 MEDIUM | Animation polish | Medium |
| 8 | **GAP-MEGA-02** | **Product imagery in mega-menu panels** — Yucca shows category images | 🟡 MEDIUM | Visual navigation | Low |
| 9 | **GAP-MEGA-03** | **Hover-triggered image swap** in panel (Resources hover pattern) | 🟡 MEDIUM | Interactive delight | Medium |
| 10 | **GAP-MEGA-04** | **Promotional messaging in mega-menu** — cross-sell CTAs embedded in nav panels | 🟡 MEDIUM | Cross-selling | Low |
| 11 | **GAP-SCROLL-01** | **Lenis stop on mega-menu** — scroll continues behind overlay | 🟡 MEDIUM | UX polish | Low |
| 12 | **GAP-HEADER-01** | **Utility icons** in header (search icon, secondary CTA) | 🟡 MEDIUM | Functionality | Medium |
| 13 | **GAP-MARQUEE-01** | **Multiple simultaneous marquee strips** (4 vs 1) for visual depth | 🟡 MEDIUM | Visual variety | Low |
| 14 | **GAP-HERO-03** | **Marquee integrated IN hero** (not separate section) | 🟡 MEDIUM | Visual density | Low |
| 15 | **GAP-SPLIT-01** | **Alternating split layout direction** (left-right-left) untuk variety | 🟡 MEDIUM | Visual variety | Low |
| 16 | **GAP-FOOTER-02** | **More social links** (LinkedIn/Facebook/TikTok) | 🟢 LOW | Presence | Trivial |
| 17 | **GAP-FOOTER-03** | **Newsletter/email capture** di footer | 🟡 MEDIUM | Marketing | Low-Medium |
| 18 | **GAP-FOOTER-04** | **Full sitemap links** in footer | 🟢 LOW | Navigation, SEO | Low |
| 19 | **GAP-ANIM-02** | **Scroll pinning** (ScrollTrigger `pin` equivalent) | 🟡 MEDIUM | Immersive sections | High |
| 20 | **GAP-CAROUSEL-03** | **Carousel under-populated** (4 items only) | 🟡 MEDIUM | Content density | Content-dependent |
| 21 | **GAP-PRELOADER-01** | **Skip preloader on repeat visits** | 🟢 LOW | UX | Low |
| 22 | **GAP-TRANSITION-01** | **Crossfade transition** (Barba `sync: true` overlap) vs wait-mode gap | 🟡 MEDIUM | Polish | Medium |
| 23 | **GAP-PERF-01** | **blur() not GPU-composited** — missing `will-change` hints | 🟡 MEDIUM | Performance | Low |
| 24 | **GAP-MOBILE-01** | **Full-screen mobile overlay** vs partial side-sheet | 🟢 LOW | Immersion | Low |
| 25 | **GAP-FOOTER-05** | **MegaFooter version** behind (V5 vs V8 sections) | 🟡 MEDIUM | Consistency | Medium |

### C. Architecture Comparison At a Glance

```
┌──────────────────────────┬────────────────────────┬────────────────────────┐
│ Dimension                │ Yucca 🌿                │ Alfa Beauty 💈          │
├──────────────────────────┼────────────────────────┼────────────────────────┤
│ Framework                │ WordPress + PHP         │ Next.js 16 + React 19  │
│ Type Safety              │ None (vanilla JS)       │ TypeScript strict       │
│ Styling                  │ Custom SCSS             │ Tailwind CSS 4 + JIT   │
│ Components               │ PHP templates           │ React + shadcn/ui      │
│ Animation Engine         │ GSAP 3 (timeline)       │ Framer Motion 12 (var) │
│ Animation Orchestration  │ ★★★★★ (GSAP timeline)  │ ★★★★☆ (stagger model)  │
│ Animation Depth/Richness │ ★★★☆☆                  │ ★★★★★                  │
│ Smooth Scroll            │ Lenis (quintic)         │ Lenis (exponential)    │
│ Page Transitions         │ Barba.js (sync)         │ Framer Motion (wait)   │
│ State Management         │ Class-based properties  │ React hooks            │
│ CMS / Content            │ WordPress + ACF ★★★★★  │ ❌ Hardcoded ★☆☆☆☆     │
│ E-commerce               │ WooCommerce ★★★★★      │ ❌ WhatsApp-based       │
│ Search                   │ WP search ★★★☆☆        │ ❌ None ★☆☆☆☆           │
│ Announcement Bar         │ ✅ Notice bar            │ ❌ None                 │
│ Pre-footer CTA           │ ✅ Every page            │ ❌ None                 │
│ Trust Badges             │ ✅ 14 certifications     │ ❌ None                 │
│ Newsletter               │ ✅ Implied               │ ❌ None                 │
│ Analytics                │ GA only ★★☆☆☆          │ GA+Clarity+Pixel ★★★★★│
│ SEO                      │ Yoast SEO v27           │ Next.js metadata API   │
│ a11y                     │ Basic ★★☆☆☆            │ Comprehensive ★★★★☆   │
│ Security                 │ WordPress plugins       │ OWASP-compliant ★★★★★ │
│ Performance (estimated)  │ ~70-80 (WP overhead)    │ ~90-95 (RSC, splitting)│
│ Hosting                  │ Traditional LAMP        │ Vercel/Edge (modern)   │
└──────────────────────────┴────────────────────────┴────────────────────────┘
```

### D. Priority Action Items (Recommended Sequence)

```
Phase 1 — Quick Wins (Low Effort, High Impact):
  ├─ [GAP-HEADER-02] Add Announcement/Notification bar component
  ├─ [GAP-CTA-01]    Add Pre-footer CTA banner (recurring section)
  ├─ [GAP-FOOTER-01] Add Certification/Trust badge section
  ├─ [GAP-SCROLL-01] Stop Lenis on mega-menu open
  └─ [GAP-PERF-01]   Add will-change: filter hints

Phase 2 — Medium Effort, High Impact:
  ├─ [GAP-MEGA-01]   Enhance mega-menu card timeline (5-phase)
  ├─ [GAP-HERO-02]   Add pillar CTA cards to hero
  ├─ [GAP-MEGA-02]   Add product imagery to mega-menu panels
  ├─ [GAP-FOOTER-05] Upgrade MegaFooter to V8
  ├─ [GAP-MARQUEE-01]Use dual-row marquee (rows={2})
  └─ [GAP-FOOTER-03] Add newsletter email capture

Phase 3 — High Effort, Critical:
  ├─ [GAP-STATE-01]  Integrate headless CMS (Sanity/Strapi)
  ├─ [GAP-HEADER-04] Implement search functionality
  └─ [GAP-ANIM-02]   Implement scroll-pinning for immersive sections
```

---

> **Conclusion**: Alfa Beauty's frontend secara teknis **superior** dalam animation depth, CSS architecture, type safety, accessibility, security, dan modern rendering (RSC, code-splitting, AVIF). GAP utama terletak pada **content management** (no CMS), **content discovery** (no search), dan **conversion optimization** (no announcement bar, no pre-footer CTA, no trust badges). Pada level animasi, Yucca's GSAP timeline orchestration memberikan **frame-precision choreography** yang Framer Motion's stagger model tidak bisa fully replicate — khususnya pada mega-menu card entrance sequences. Ini adalah GAP teknis yang paling nuanced dan paling sulit ditutup.
