# Frontend GAP Analysis: Yucca vs Alfa Beauty — Homepage (Header → Footer)

> **Tanggal**: Januari 2026  
> **Scope**: Purely FRONTEND engineering gaps — DOM/markup, CSS architecture, animation engine, state management, interaction design, component composition  
> **Referensi Yucca**: `docs/yucca-deep-study-v3.md` (22 sections, ~1600 lines)  
> **Referensi Alfa Beauty**: Direct source code analysis — semua file components/sections/ + globals.css  
> **Disclaimer**: Ini bukan analisis bisnis — murni arsitektur frontend dan implementasi teknis

---

## Daftar Isi

1. [Executive Summary — Section Inventory Comparison](#1-executive-summary)
2. [GAP #1 — Cookie Consent / GDPR Banner](#2-gap-1--cookie-consent)
3. [GAP #2 — Preloader & Brand Reveal](#3-gap-2--preloader)
4. [GAP #3 — Site Header Architecture](#4-gap-3--site-header)
5. [GAP #4 — Hero Section](#5-gap-4--hero)
6. [GAP #5 — Marquee System](#6-gap-5--marquee)
7. [GAP #6 — About / Introduction Section](#7-gap-6--about)
8. [GAP #7 — Product Showcase Section](#8-gap-7--product-showcase)
9. [GAP #8 — Brand Carousel vs Yucca Products](#9-gap-8--brand-carousel)
10. [GAP #9 — Feature Split / Education Section](#10-gap-9--feature-split)
11. [GAP #10 — Partnership Section](#11-gap-10--partnership)
12. [GAP #11 — Pre-Footer CTA Banner](#12-gap-11--pre-footer-cta)
13. [GAP #12 — Factory & Product Standards / Trust Certification](#13-gap-12--trust-certification)
14. [GAP #13 — FAQ Accordion Section](#14-gap-13--faq-accordion)
15. [GAP #14 — Mega Footer](#15-gap-14--mega-footer)
16. [GAP #15 — WhatsApp FAB & Floating Elements](#16-gap-15--whatsapp-fab)
17. [GAP #16 — Animation Engine Comparison (GSAP vs Framer Motion)](#17-gap-16--animation-engine)
18. [GAP #17 — CSS Architecture & Design Token Comparison](#18-gap-17--css-architecture)
19. [GAP #18 — State Management & Interaction Patterns](#19-gap-18--state-management)
20. [GAP #19 — Performance & Loading Strategy](#20-gap-19--performance)
21. [Consolidated Priority Matrix](#21-consolidated-priority-matrix)

---

## 1. Executive Summary

### Homepage Section Inventory — Side-by-Side

| # | Yucca Homepage Section | Alfa Beauty Homepage Section | Status |
|---|----------------------|---------------------------|--------|
| 0 | Cookie Consent Banner (GDPR) | — | ❌ **MISSING** |
| 1 | Preloader (5-frame product sequence, ~3s) | Preloader (logo scale + word reveal, session-skip) | ⚠️ Exists, different approach |
| 2 | Announcement/Notification Bar | AnnouncementBar (dismissible, sessionStorage) | ✅ Parity |
| 3 | Header (Search + Nav + Cart + Account + 3-panel mega-menu) | SiteHeader (Nav + WhatsApp + 4-panel mega-menu) | ⚠️ **Feature gap** |
| 4 | Hero (static image, 3 pillar links, 2-line headline) | Hero (video bg, 3 glass cards, per-char headline, scroll indicator) | ✅ Alfa leads |
| 5 | Marquee × 4 rows (programme + capability keywords) | Marquee × 2 rows (brand + capability keywords) | ⚠️ **Density gap** |
| 6 | About Intro + Mission/Vision dual cards | About (clipPath image, counters, body copy) | ⚠️ **Missing Mission/Vision** |
| 7 | New Products Carousel (4 priced items + NEW badges) | — | ❌ **MISSING** |
| 8 | — | BrandCarousel (Embla, 4 brand cards, autoplay) | ✅ Alfa exclusive |
| 9 | — | FeatureSplit ("More Than a Distributor", capabilities) | ✅ Alfa exclusive |
| 10 | — | PartnershipSection (2 numbered cards, dual CTAs) | ✅ Alfa exclusive |
| 11 | Pre-Footer CTA (rolling marquee "Not sure what's possible?") | PreFooterCTA (static text, grain + vignette, dual CTAs) | ⚠️ **Missing rolling marquee** |
| 12 | Factory & Product Standards (14 certification badges) | — | ❌ **MISSING** |
| 13 | FAQ Accordion (5 questions + "View all" → /faq) | — | ❌ **MISSING** |
| 14 | WhatsApp FAB (fixed bottom-right) | WhatsApp FAB (fixed bottom-right, MegaFooter) | ✅ Parity |
| 15 | Mega Footer (headline + 3 pillar image cards + cert badges + social) | MegaFooter (headline + 3 pillar text cards + text trust badges + social) | ⚠️ **Feature gap** |

### Score Summary

| Category | Yucca Sections | Alfa Sections | Overlap | Alfa Only | Yucca Only (Missing) |
|----------|---------------|--------------|---------|-----------|-------------------|
| **Total homepage sections** | 12 distinct | 10 distinct | 7 shared | 3 | 4 |
| **Missing entirely in Alfa** | — | — | — | — | Cookie, Products, Standards, FAQ |
| **Alfa leads Yucca** | — | — | — | Hero, BrandCarousel, FeatureSplit, Partnership | — |

---

## 2. GAP #1 — Cookie Consent

### Yucca Implementation
```
┌──────────────────────────────────────────────────────────────────┐
│ DOM: Fixed overlay, z-index top-level, covers viewport          │
│ Structure: Banner at bottom with 3 action buttons               │
│   [Accept All] [Customise] [Reject All]                         │
│ State: Cookie-based persistence (not sessionStorage)            │
│ Behavior: Blocks interaction until accepted, GDPR-compliant    │
│ Animation: Slide up on page load, fade out on accept            │
└──────────────────────────────────────────────────────────────────┘
```

### Alfa Beauty Implementation
**TIDAK ADA** — Zero cookie consent mechanism.

### Technical GAP Detail

| Aspect | Yucca | Alfa Beauty |
|--------|-------|-------------|
| **DOM Element** | `<div class="cookie-consent">` fixed overlay | None |
| **Persistence** | Cookie-based (`document.cookie`) | N/A |
| **Granularity** | 3 tiers: Accept All, Customise, Reject All | N/A |
| **Animation** | Slide-up entrance, fade-out exit | N/A |
| **Z-index Layer** | Top-most (above header overlay) | N/A |
| **Mobile Layout** | Stacked buttons, full-width | N/A |
| **Compliance** | GDPR / POPIA (South African) | N/A |

### Impact
- **Legal**: Indonesia saat ini belum memiliki ketatnya regulasi GDPR, tapi UU PDP (Perlindungan Data Pribadi) sudah berlaku. Cookie consent akan dibutuhkan terutama jika menggunakan analytics tracking.
- **Frontend**: Memerlukan komponen baru + persistence layer + conditional script loading.

### Priority: **MEDIUM** (legal compliance tergantung penggunaan cookies/analytics)

---

## 3. GAP #2 — Preloader

### Yucca Implementation

```
Timeline: ~2.5-3 detik, 4 fase
┌──────────────────────────────────────────────────────┐
│ Phase 1 (0s → 1.5s): Logo Entrance                  │
│   gsap.fromTo(logoIcon, { scale: 0 }, { scale: 1 }) │
│   gsap.fromTo("YUCCA", { y: 80 }, { y: 0 })        │
│   gsap.fromTo("PACKAGING", { y: 80 }, { y: 0 })     │
│                                                       │
│ Phase 2 (1.5s → 2.1s): Logo Pack Up                 │
│   Logo + text → y: -100/-120 (move up & out)         │
│                                                       │
│ Phase 3 (2.1s → 3.1s): Product Image Sequence       │
│   5 .webp frames crossfade (0.2s per frame)          │
│   Frame 1→2→3→4→5 (opacity swap)                     │
│                                                       │
│ Phase 4 (3.1s → 3.9s): Exit                         │
│   Background: autoAlpha 1 → 0 (0.8s, power2.inOut)  │
│   Container: display: none                            │
└──────────────────────────────────────────────────────┘

Engine: GSAP gsap.timeline() — tightly orchestrated
Assets: 5 product .webp frames + logo SVG
Session: NO skip — runs on every page load
         (Barba.js prevents re-trigger on internal nav)
```

### Alfa Beauty Implementation

```
Engine: Framer Motion (AnimatePresence + motion.div)
Duration: ~2s (logo scale + text reveal)
Session: sessionStorage-based skip (class "preloader-done")
Assets: Logo SVG only — no product frame sequence
Animation: Logo scale entrance + word stagger reveal
Exit: Framer Motion exit animation (opacity 0, y -20)
```

### Technical GAP Detail

| Aspect | Yucca | Alfa Beauty | GAP |
|--------|-------|-------------|-----|
| **Engine** | GSAP `gsap.timeline()` | Framer Motion `AnimatePresence` | Different paradigm |
| **Duration** | ~3s (4 phases) | ~2s (2 phases) | Alfa shorter |
| **Phases** | 4 distinct (logo→pack→frames→exit) | 2 (logo+text→exit) | ⚠️ Alfa simpler |
| **Product showcase** | 5-frame image crossfade sequence | None | ❌ Missing |
| **Visual richness** | Product photography integration | Logo + text only | ⚠️ Less impactful |
| **Session handling** | No skip (Barba.js handles) | sessionStorage skip | ✅ Alfa smarter |
| **Orchestration** | GSAP master timeline with overlap offsets | Sequential FM variants | Different |
| **Assets size** | 5× .webp images (~50-100KB total) | 0 extra assets | ✅ Alfa lighter |

### What Alfa Beauty Lacks
1. **Product frame sequence** — Yucca menggunakan 5-frame crossfade yang menampilkan produk-produk showcase selama preloader. Ini berfungsi sebagai "commercial" mini yang membangun anticipation. Alfa hanya menampilkan logo.
2. **Multi-phase orchestration** — Yucca's preloader memiliki 4 fase berbeda dengan timing yang sangat terkontrol via GSAP timeline. Alfa menggunakan approach yang lebih sederhana.

### What Alfa Beauty Leads
1. **Session-aware skip** — Alfa skip preloader on return visit (sessionStorage). Yucca tidak.
2. **Lighter payload** — Tidak perlu load 5 images tambahan.

### Priority: **LOW** (current implementation functional, product frames = nice-to-have)

---

## 4. GAP #3 — Site Header Architecture

### 4.1 DOM / Markup Comparison

**Yucca Header DOM:**
```html
<header class="header [scrolled-down|scrolled-up|header-active]">
  <!-- Top utility bar -->
  <div class="header-top-bar">
    <a href="/">Home</a>
    <a href="/cart">Cart <span class="badge">3</span></a>
    <a href="/my-account">Account</a>
  </div>
  
  <!-- Main navigation bar -->
  <div class="header-main">
    <a class="logo" href="/">
      <img src="logo-icon.svg" />
      <span>YUCCA</span>
    </a>
    
    <nav class="main-nav">
      <ul>
        <li data-panel="shop">Shop</li>
        <li data-panel="solutions">Packaging Solutions</li>
        <li data-panel="resources">Resources</li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
    
    <div class="header-actions">
      <button class="search-toggle">🔍</button>
      <a href="/cart" class="cart-icon"><span class="badge-count">3</span></a>
      <a href="/my-account" class="account-icon">👤</a>
    </div>
  </div>
  
  <!-- Mega-menu panels (3) -->
  <div class="mega-menu">
    <div class="panel panel-shop">...</div>
    <div class="panel panel-solutions">...</div>
    <div class="panel panel-resources">...</div>
  </div>
</header>
```

**Alfa Beauty Header DOM (from `site-header.tsx`):**
```html
<!-- Overlay backdrop (separate from header) -->
<motion.div class="fixed inset-0 z-40 bg-foreground/60 backdrop-blur-[6px]" />

<header class="fixed top-0 left-0 right-0 z-50 [bg-background|bg-transparent]">
  <div class="mx-auto grid h-[var(--header-height)] max-w-[1400px] grid-cols-[1fr_auto_1fr]">
    <!-- Logo (left) -->
    <Link href="/" class="group flex items-center gap-3">
      <Image src="alfa-beauty-mark.svg" width={28} height={28} />
      <span class="text-[11px] font-bold uppercase tracking-[0.25em]">
        ALFA BEAUTY
      </span>
    </Link>
    
    <!-- Desktop Navigation (center) — Radix NavigationMenu -->
    <NavigationMenu class="hidden lg:flex h-[var(--header-height)]">
      <NavigationMenuList>
        <NavigationMenuItem value="products">  <!-- Mega panel -->
        <NavigationMenuItem value="brands">     <!-- Mega panel -->
        <NavigationMenuItem value="education">  <!-- Mega panel -->
        <NavigationMenuItem value="partnership"> <!-- Mega panel -->
        <NavigationMenuItem> About (direct link)
        <NavigationMenuItem> Contact (direct link)
      </NavigationMenuList>
    </NavigationMenu>
    
    <!-- Right actions -->
    <div>
      <a href="WhatsApp" class="hidden lg:inline-flex">
        <MessageCircle /> WhatsApp
      </a>
      <Sheet> <!-- Mobile menu trigger -->
        <SheetTrigger><Menu /></SheetTrigger>
        <SheetContent><MobileMenu /></SheetContent>
      </Sheet>
    </div>
  </div>
</header>
```

### 4.2 Structural GAP Analysis

| Aspect | Yucca | Alfa Beauty | GAP Type |
|--------|-------|-------------|----------|
| **Top utility bar** | Home, Cart (badge), Account — always visible | None | ❌ **MISSING** |
| **Search icon** | ✅ Search button in header actions | None | ❌ **MISSING** |
| **Cart icon + badge** | ✅ Cart with live item count badge | None | ❌ **MISSING** |
| **Account icon** | ✅ User account link | None | ❌ **MISSING** |
| **Grid layout** | 2-tier (utility bar + main bar) | Single tier, 3-col grid (1fr auto 1fr) | Different |
| **Logo** | SVG logomark + "YUCCA" text | SVG mark + "ALFA BEAUTY" uppercase | ✅ Parity |
| **Nav items** | 5 (Shop, Solutions, Resources, About, Contact) | 6 (Products, Brands, Education, Partnership, About, Contact) | ✅ Alfa has more |
| **Mega-menu panels** | 3 (Shop, Packaging Solutions, Resources) | 4 (Products, Brands, Education, Partnership) | ✅ Alfa has more |
| **Right actions** | Search + Cart + Account | WhatsApp button only | ⚠️ **Less utility** |
| **CTA button** | None in header | WhatsApp button (branded) | ✅ Alfa has CTA |

### 4.3 Mega-Menu Panel Animation Comparison

**Yucca: GSAP `createCardTl` — 5-phase per-card timeline:**
```
Phase 1: Background   → clipPath inset(0% 0% 100% 0%) → inset(0%) [0.6s, power3.inOut]
Phase 2: Media         → scale 1.4 → 1                 [0.8s, power2.out]   overlap <0.1
Phase 3: Text lines    → yPercent 100 → 0, stagger 0.04 [0.5s, power2.out]  overlap <0.2
Phase 4: Border        → scaleX 0 → 1                  [0.5s, power2.out]   overlap <0.1
Phase 5: Link CTA      → yPercent 100 → 0              [0.4s, power2.out]   overlap <0.1
```
Each card in the mega-menu gets its OWN 5-phase GSAP timeline. Cards enter one-by-one with stagger.

**Alfa Beauty: CSS keyframe + Framer Motion stagger:**
```
Panel container: CSS animation `mega-content-in` 0.55s with 0.14s delay
  @keyframes mega-content-in {
    0%   { opacity: 0; transform: translateY(6px); }
    100% { opacity: 1; transform: translateY(0); }
  }

Items inside: Framer Motion variants
  megaMenuStagger: { staggerChildren: 0.06 }
  megaMenuItemReveal: { opacity 0→1, y 8→0, filter blur(3px)→0 }
```
The entire panel uses a SINGLE CSS entrance keyframe + items stagger with simple opacity/y/blur.

### 4.4 Mega-Menu Animation Depth GAP

| Animation Aspect | Yucca (GSAP) | Alfa (FM + CSS) | GAP |
|-----------------|--------------|-----------------|-----|
| **Per-card phases** | 5 distinct phases | 1 phase (fade+slide) | ⚠️ **Much simpler** |
| **ClipPath bg reveal** | ✅ inset reveal per card background | ❌ None | ❌ Missing |
| **Media scale settle** | ✅ 1.4→1 zoom-in | ❌ No media in most panels | ❌ Missing |
| **Text line stagger** | ✅ yPercent stagger per line | Simple opacity+y | ⚠️ Less refined |
| **Border scaleX grow** | ✅ Horizontal border animation | ❌ None (accent line is CSS transition) | ❌ Missing |
| **Link CTA slide** | ✅ Separate yPercent entrance | Part of general stagger | ⚠️ Generic |
| **Master timeline** | GSAP `gsap.timeline()` with precise overlap | CSS + FM (no overlapping phases) | ⚠️ Less orchestrated |
| **Perceived richness** | Cinematic, multi-layered | Clean, functional, fast | Tradeoff |

### 4.5 Menu UX / Interaction GAP

| UX Pattern | Yucca | Alfa Beauty | GAP |
|-----------|-------|-------------|-----|
| **Hover debounce** | 100-150ms intentional delay | No explicit debounce (Radix default ~200ms) | ⚠️ Different |
| **Mouse area tracking** | ✅ Panel stays open while cursor in nav area | Radix `NavigationMenu` handles this natively | ✅ Handled |
| **Image swap on hover** | ✅ Resource panel swaps featured image per item | ❌ None — no featured image panel | ❌ Missing |
| **Cross-selling CTAs** | ✅ "Looking for something specific?" + "Join loyalty" | ❌ Only CTA column in some panels | ⚠️ Less conversion-focused |
| **Overlay** | Background darkening (CSS class toggle) | `backdrop-blur-[6px]` + `bg-foreground/60` | ✅ Alfa enhanced |
| **Scroll lock** | `lenis.stop()` on open | `lenisStop()` on open (same pattern) | ✅ Parity |
| **Close guard** | Not documented | `menuClosing` state + `pointer-events-none` | ✅ Alfa guards clicks |
| **Indicator bar** | CSS border/underline | `before:` pseudo + `scaleY(0)→scaleY(1)` | ✅ Alfa animated |

### 4.6 Header Scroll Behavior Comparison

| Behavior | Yucca | Alfa Beauty | GAP |
|----------|-------|-------------|-----|
| **Initial state** | Transparent on homepage | Transparent on `/`, solid elsewhere | ✅ Same |
| **On scroll down** | `translateY(-100%)` hide | `-translate-y-[102%]` via `isHidden` state | ✅ Same pattern |
| **On scroll up** | `translateY(0)` reveal (sticky) | Reveal when `scrollDirection === "up"` | ✅ Same pattern |
| **Scroll threshold** | Not documented precisely | `latest > 40` for scrolled, `Math.abs > 12` for direction | ✅ Alfa precise |
| **Hover restore** | Not documented | `headerHovered` forces solid + visible | ✅ Alfa extra state |
| **Transition CSS** | GSAP-driven or CSS class toggle | Inline `style` with multi-property transition (0.5-0.7s) | ✅ Alfa explicit |
| **Background state** | Class toggle `scrolled-down`/`scrolled-up` | Computed `isSolid` boolean → conditional classes | ✅ Alfa reactive |
| **Elevation shadow** | Not documented | `shadow-warm-sm` when `scrolled && !menuOpen` | ✅ Alfa has shadow |

### 4.7 Summary of Header GAPs

**Missing from Alfa:**
1. ❌ Top utility bar (Search, Cart badge, Account)
2. ❌ Search functionality
3. ❌ Cart icon with live badge count
4. ❌ Account/user icon
5. ❌ Mega-menu per-card multi-phase animation (GSAP 5-phase vs single-phase)
6. ❌ Featured image panel that swaps on hover (Yucca's Resource panel)
7. ❌ Cross-selling CTA cards within mega-menu panels

**Alfa Leads Yucca:**
1. ✅ More mega-menu panels (4 vs 3)
2. ✅ Backdrop blur overlay (more modern)
3. ✅ `menuClosing` pointer-events guard (prevents accidental re-open)
4. ✅ Animated indicator bar (scaleY pseudo-element)
5. ✅ `headerHovered` state for force-solid
6. ✅ WhatsApp CTA in header

### Priority: **HIGH** (search, cart, account are fundamental e-commerce/utility features)

---

## 5. GAP #4 — Hero Section

### 5.1 Visual Composition Comparison

**Yucca Hero:**
```
┌─────────────────────────────────────────────────────┐
│ Background: Static product photo (desktop/mobile)    │
│ Layout: Text left, hero image right (split)          │
│ Headline: "Packaging that Performs."                  │
│           "Innovated for Industry Leaders."           │
│ CTA: 3 pillar links as full card layout              │
│   [Food Service] [Food Processing] [Agriculture]     │
│ Animation: GSAP SplitText + clipPath reveals         │
│ Media: Static .jpg (separate desktop/mobile crops)   │
│ Scroll effect: ScrollTrigger parallax on background  │
└─────────────────────────────────────────────────────┘
```

**Alfa Beauty Hero (`hero.tsx` V9):**
```
┌─────────────────────────────────────────────────────┐
│ Background: Video (lazy IntersectionObserver)        │
│ Layout: Text left-aligned, full-width video          │
│ Headline: "Connecting Global" / "Hair Innovation to" │
│           "Indonesia's Professionals" (per-char)     │
│ Overlay: 5-layer gradient (directional + vignette)   │
│ CTA: 2 buttons + 3 glassmorphism pillar cards        │
│   [Explore Our Brands] [Partner With Us]             │
│   [01 Products] [02 Education] [03 Partnership]      │
│ Animation: Framer Motion orchestrated w/ HERO_TIMING │
│ Scroll: Parallax y + scale 1→1.18 + opacity + blur  │
│ Extra: ScrollIndicator at bottom                     │
└─────────────────────────────────────────────────────┘
```

### 5.2 Technical GAP Matrix

| Aspect | Yucca | Alfa Beauty | Who Leads |
|--------|-------|-------------|-----------|
| **Background media** | Static .jpg (2 crops) | Video .mp4 (lazy-loaded) | ✅ **Alfa** |
| **Headline animation** | GSAP SplitText (line stagger) | TextReveal per-char split + blur | ✅ **Alfa** (char-level) |
| **Gradient overlay** | Simple dark gradient | 5-layer (directional + radial vignette + brand tint) | ✅ **Alfa** |
| **Pillar CTA layout** | Full card layout (linked cards) | Glass cards with numbered labels (01/02/03) | ✅ **Alfa** |
| **Scroll transforms** | GSAP ScrollTrigger parallax | Framer `useTransform` (y, scale, opacity, blur) | ✅ **Alfa** (4 properties) |
| **Content blur on scroll** | Not documented | `contentBlur` transform → `filter: blur(Xpx)` | ✅ **Alfa** |
| **Lazy video loading** | N/A (static image) | IntersectionObserver, `preload="none"` | ✅ **Alfa** |
| **Scroll indicator** | Not present | `<ScrollIndicator />` bouncing at bottom | ✅ **Alfa** |
| **Eyebrow text** | Not visible | "Established since 2007" with FadeIn blur+scale | ✅ **Alfa** |
| **Responsive media** | Separate desktop/mobile image crops | Single video, responsive via `object-cover` | Yucca more granular |
| **Grain texture** | Not on hero | `grain-overlay-strong` CSS class | ✅ **Alfa** |
| **Poster fallback** | N/A | `poster="/videos/hero-poster.jpg"` | ✅ **Alfa** |

### 5.3 Hero Orchestration Timing

**Yucca (GSAP):**
```
ScrollTrigger: start "top 80%"
Master timeline offset formula:
  a. Container clipPath reveal (0s)
  b. Headline SplitText per line (+0.1s)
  c. Body text yPercent slide (+0.2s)
  d. Pillar cards stagger (+0.3s)
  Total: ~1.0s
```

**Alfa Beauty (Framer Motion):**
```javascript
HERO_TIMING = {
  eyebrow: delay,    // first element
  heading: delay,    // TextReveal per-char
  body: delay,       // FadeIn with blur
  cta: delay,        // Buttons stagger +0.12s
  pillars: delay,    // pillarCardStagger after CTA +0.4s
}
// Total cascade: ~1.5-2.0s
```

### 5.4 Summary
**Alfa Beauty LEADS Yucca on hero.** The hero is the one section where Alfa is definitively more advanced: video background, 5-layer overlay, per-character headline split, multi-property scroll transforms (y + scale + opacity + blur), glassmorphism pillar cards, scroll indicator, and grain texture overlay.

### Priority: **NONE** (Alfa already superior)

---

## 6. GAP #5 — Marquee System

### 6.1 Structural Comparison

**Yucca: 4 rows, alternating directions:**
```
Row 1 →: "Yucca Rewards" · "Yucca Direct (B2B)"     [programme]
Row 2 ←: "Quality" · "Branding"                       [capability]
Row 3 →: "Custom Packaging" · "Sustainable"            [value prop]
Row 4 ←: "Innovation" · "Partnerships"                 [positioning]

Each row repeats content 4× for seamless loop.
Alternating left→right creates visual tension.
```

**Alfa Beauty: 2 rows, dual-direction (`marquee.tsx` V5):**
```
Row 1 →: Innovation · Alfaparf Milano · Education · Farmavita · Partnership ·
          Montibello · Quality · Gamma+ Professional · Distribution · Excellence
Row 2 ←: (same content, reversed direction)

Content repeats 2× per track (CSS animation).
```

### 6.2 Technical GAP Matrix

| Aspect | Yucca | Alfa Beauty | GAP |
|--------|-------|-------------|-----|
| **Row count** | 4 rows | 2 rows | ⚠️ **Alfa has fewer** |
| **Direction** | Alternating (→←→←) | Dual (row1→, row2←) | Similar pattern |
| **Content strategy** | 4 distinct keyword categories | 1 mixed set (brands + capabilities) | ⚠️ **Less strategic** |
| **Content types** | Programme names + Capabilities + Values + Positioning | Brand names + Generic adjectives | ⚠️ **Less varied** |
| **Engine** | CSS `@keyframes` (marquee-forward/reverse) | CSS `@keyframes` (marquee-track/reverse) | ✅ Same |
| **Hover behavior** | Not documented | `pauseOnHover` (animation-play-state: paused) | ✅ Alfa has |
| **Item hover** | Not documented | `hover:scale-[1.06] hover:brightness-110` | ✅ Alfa has |
| **Entrance animation** | ScrollTrigger-based | Framer `whileInView` (opacity, y, blur, scale) | ✅ Same approach |
| **Edge mask** | Not documented | `fade-mask-x` CSS gradient mask | ✅ Alfa has |
| **Separator** | `·` dot separator | `·` dot separator | ✅ Same |

### 6.3 Content Strategy GAP

Yucca's 4-row marquee is deliberately segmented:
- **Row 1**: Self-promotion (programmes)
- **Row 2**: Quality messaging
- **Row 3**: Service differentiation
- **Row 4**: Strategic positioning

Alfa's 2-row marquee mixes everything into one stream. This is less intentional — brand names (Alfaparf Milano, Farmavita, Montibello, Gamma+) sit alongside generic keywords (Innovation, Quality, Excellence). There's no thematic separation.

### Recommendation
- Tambah 2 baris lagi (total 4)
- Buat pemisahan tematik: Row 1 = Brand names, Row 2 = Capabilities, Row 3 = Values, Row 4 = Services

### Priority: **LOW** (Functional, needs content strategy refinement only)

---

## 7. GAP #6 — About / Introduction Section

### 7.1 Content Composition Comparison

**Yucca About Section on Homepage:**
```
┌─────────────────────────────────────────────────────┐
│ Headline: "Committed to Excellence, always Innovating"│
│ Body: "Remarkable packaging is our promise..."       │
│ CTA: "About us" → /about                            │
│                                                       │
│ ┌──────────────┐  ┌──────────────┐                   │
│ │ OUR MISSION  │  │ OUR VISION   │                   │
│ │ We provide   │  │ To be the    │                   │
│ │ world-class, │  │ trusted,     │                   │
│ │ compliant    │  │ industry-    │                   │
│ │ packaging... │  │ leading...   │                   │
│ └──────────────┘  └──────────────┘                   │
└─────────────────────────────────────────────────────┘
```

**Alfa Beauty About Section (`about.tsx` V8):**
```
┌─────────────────────────────────────────────────────┐
│ Layout: 2-column (5/12 image + 7/12 text)            │
│                                                       │
│ LEFT COLUMN:                                          │
│   Eyebrow: "About Us"                                │
│   Heading: "18+ Years of Professional Excellence"     │
│   Image: clipPath inset(100% 0 0 0) → reveal         │
│         + Ken Burns + parallax + grain overlay         │
│   Glass badge: "Since 2007"                           │
│                                                       │
│ RIGHT COLUMN:                                         │
│   Body: 2 paragraphs about distribution + education  │
│   LineGrow separator                                  │
│   Counters: [18+] [4] [34]                           │
│             Years  Brands  Provinces                  │
│   CTA: "Learn More About Us" → /about                │
│                                                       │
│ ❌ NO Mission/Vision cards                            │
└─────────────────────────────────────────────────────┘
```

### 7.2 Technical GAP Matrix

| Aspect | Yucca | Alfa Beauty | GAP |
|--------|-------|-------------|-----|
| **Layout** | Single column (text + 2 cards below) | 2-column grid (12-col split) | ✅ Alfa richer layout |
| **Image** | None on homepage about section | clipPath reveal + Ken Burns + parallax | ✅ **Alfa leads** |
| **Mission/Vision cards** | ✅ Dual cards — Mission + Vision statements | ❌ None | ❌ **MISSING** |
| **Counters/stats** | None on homepage | 3 animated counters (Years, Brands, Provinces) | ✅ **Alfa leads** |
| **Counter animation** | N/A | `useCountUp` hook (quintic ease + glow on complete) | ✅ **Alfa leads** |
| **Glass badge** | None | `glass-strong` badge ("Since 2007") on image | ✅ **Alfa leads** |
| **Stat dividers** | None | `StatDivider` (animated `h-16 w-px`, `dividerReveal` variant) | ✅ **Alfa leads** |
| **Grain overlay** | None on this section | `grain-overlay` class on image container | ✅ **Alfa leads** |
| **CTA** | "About us" → /about | "Learn More About Us" → /about | ✅ Parity |

### 7.3 Key Missing Element: Mission & Vision

Yucca memiliki 2 distinct cards yang menampilkan Mission dan Vision statements secara eksplisit di homepage. Ini memberikan visitors immediate clarity tentang perusahaan.

Alfa Beauty hanya memiliki 2 paragraf body text — tidak ada Mission/Vision statement yang jelas dan terpisah. Mission/Vision perlu ditambahkan sebagai cards atau dedicated elements.

### Priority: **MEDIUM** (Mission/Vision adalah brand messaging fundamental)

---

## 8. GAP #7 — Product Showcase Section

### Yucca Implementation
```
┌─────────────────────────────────────────────────────┐
│ Section: "New Products"                              │
│                                                       │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│ │ [IMAGE] │ │ [IMAGE] │ │ [IMAGE] │ │ [IMAGE] │   │
│ │  [NEW]  │ │  [NEW]  │ │  [NEW]  │ │  [NEW]  │   │
│ │ Matte   │ │ Paper   │ │ Dessert │ │ Dessert │   │
│ │ Black   │ │ Pulp    │ │ Cup     │ │ Flat    │   │
│ │ Coffee  │ │ Cup     │ │ (90mm)  │ │ Lid     │   │
│ │ Cup     │ │ Holder  │ │         │ │ (90mm)  │   │
│ │ R1.09   │ │ R1.55   │ │ R1.38   │ │ R0.63   │   │
│ │  incl.  │ │  incl.  │ │  incl.  │ │  incl.  │   │
│ │  vat    │ │  vat    │ │  vat    │ │  vat    │   │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘   │
│                                                       │
│ Product image: 1:1, white background                 │
│ "NEW" badge: green overlay                           │
│ Price: "From RX.XX incl. vat"                        │
│ Link: → /product/[slug]                              │
│ Carousel: Swipeable, auto-advancing                  │
└─────────────────────────────────────────────────────┘
```

### Alfa Beauty Implementation
**TIDAK ADA** — Homepage tidak memiliki section yang menampilkan produk individual. BrandCarousel menampilkan brand-level cards (Alfaparf Milano, Farmavita, Montibello, Gamma+) — bukan produk spesifik.

### Technical GAP

| Aspect | Yucca | Alfa Beauty |
|--------|-------|-------------|
| **Individual product cards** | ✅ 4 products with image, title, price, badge | ❌ None |
| **Product imagery** | 1:1 ratio, white bg, product photography | N/A |
| **Pricing display** | "From RX.XX incl. vat" | N/A |
| **NEW/status badges** | Green "NEW" overlay | N/A |
| **Link to detail page** | `/product/[slug]` | N/A |
| **Carousel behavior** | Swipeable, possibly auto-advancing | N/A |

### Context Note
Alfa Beauty bukan e-commerce site — mereka distributor B2B. Product showcase pada homepage akan berfungsi sebagai catalog teaser, bukan direct purchase. Tetap saja, menampilkan featured products dari brand-brand yang didistribusikan akan meningkatkan credibility dan memberikan concrete examples.

### Priority: **MEDIUM** (product showcase tanpa e-commerce = catalog teaser, masih bernilai untuk credibility)

---

## 9. GAP #8 — Brand Carousel vs Yucca Products

Ini adalah section dimana Alfa Beauty memiliki sesuatu yang Yucca TIDAK punya di homepage:

**Alfa Beauty BrandCarousel (`brand-carousel.tsx` V8):**
```
Engine: Embla Carousel + Autoplay plugin
Cards: 4 brand cards (Alfaparf Milano, Farmavita, Montibello, Gamma+)
Features:
  - Loop, autoplay 5s, stop on interaction/mouse enter
  - Drag feedback: scale(0.995) on dragging
  - Keyboard nav (ArrowLeft/Right)
  - Scroll progress bar (scaleX transform)
  - Pagination dots (active: w-8, inactive: w-1.5)
  - 7-layer card hover depth
  - Card: logo + origin flag + name + description + accent line
  - Glassmorphism hover overlay
  - Counter display: "2 / 4"
  - Edge fade mask
```

**Yucca:**
Memiliki product carousel tetapi TIDAK memiliki brand portfolio carousel. Yucca hanya menjual produk sendiri (bukan multi-brand distributor).

### Assessment
Alfa Beauty BrandCarousel adalah salah satu section TERBAIK dan tidak perlu perubahan. Embla integration, keyboard nav, progress bar, drag feedback — semua sudah production-quality.

### Priority: **NONE** (Alfa already superior, unique to its business model)

---

## 10. GAP #9 — Feature Split / Education Section

### Comparison
Yucca TIDAK memiliki "Feature Split" section di homepage. Yucca memiliki "Why Choose Yucca" feature cards di pillar pages (bukan homepage).

Alfa Beauty's `FeatureSplit` V9 mengisi gap ini sendiri — horizontal clipPath reveal, reverse layout support, numbered capabilities list, parallax + Ken Burns. Ini adalah Alfa-exclusive section.

### Priority: **NONE** (Alfa already has this, Yucca doesn't)

---

## 11. GAP #10 — Partnership Section

### Comparison
Yucca TIDAK memiliki dedicated partnership section di homepage. Partnership content ada di `/programmes` page.

Alfa Beauty's `PartnershipSection` V8 is unique — Ken Burns background, 2 numbered PartnerCards (01 For Principals / 02 For Salons), dual CTAs (Become a Partner + WhatsApp), accent line hover.

### Priority: **NONE** (Alfa already has this, Yucca doesn't)

---

## 12. GAP #11 — Pre-Footer CTA Banner

### 12.1 Structure Comparison

**Yucca Pre-Footer CTA:**
```
┌─────────────────────────────────────────────────────┐
│ Static headline:                                      │
│ "Brands that thrive invest in custom-designed         │
│  packaging. Let us help bring your vision to life."   │
│                                                       │
│ [Enquire now] → /contact                              │
│                                                       │
│ ← Rolling marquee (infinite):                         │
│   "Not sure what's possible? Get in touch to find    │
│    out." × 4 repeats                                  │
│                                                       │
│ Background: Image or gradient, dark mood              │
└─────────────────────────────────────────────────────┘
```

**Alfa Beauty Pre-Footer CTA (`pre-footer-cta.tsx` V1):**
```
┌─────────────────────────────────────────────────────┐
│ Eyebrow: "Ready to Transform Your Salon?"            │
│                                                       │
│ Headline (TextReveal word split):                     │
│ "Elevate Your Craft With                              │
│  Premium Professional Products"                       │
│                                                       │
│ Body copy (FadeIn):                                   │
│ "Join hundreds of salon professionals..."             │
│                                                       │
│ 2 CTA buttons (stagger):                              │
│ [Explore Products] [Become a Partner]                 │
│                                                       │
│ Background: bg-foreground (dark)                      │
│ Overlays: grain + radial vignette                     │
│ ❌ NO rolling marquee                                 │
└─────────────────────────────────────────────────────┘
```

### 12.2 Technical GAP Matrix

| Aspect | Yucca | Alfa Beauty | GAP |
|--------|-------|-------------|-----|
| **Rolling marquee** | ✅ Infinite scrolling "Not sure what's possible?" × 4 | ❌ None | ❌ **MISSING** |
| **Background** | Image-based or gradient with dark mood | `bg-foreground` solid + grain + vignette | ⚠️ Different |
| **Headline** | Static text | TextReveal word split animation | ✅ **Alfa** |
| **CTA count** | 1 button ("Enquire now") | 2 buttons (Products + Partner) | ✅ **Alfa** |
| **Body copy** | None | Full paragraph with FadeIn | ✅ **Alfa** |
| **Eyebrow** | None | "Ready to Transform Your Salon?" | ✅ **Alfa** |
| **Grain overlay** | Not documented | `grain-overlay` | ✅ **Alfa** |
| **Vignette** | Not documented | Radial gradient vignette | ✅ **Alfa** |
| **Stagger animation** | Not documented | `staggerMedium` + `fadeInUp` variants | ✅ **Alfa** |

### 12.3 Key Missing: Rolling Marquee within CTA

Yucca's pre-footer CTA includes a rolling marquee that continuously scrolls "Not sure what's possible? Get in touch to find out." This creates:
- Visual dynamism within an otherwise static CTA section
- Urgency through repetition
- A softer, question-based CTA alternative alongside the direct button

Alfa Beauty's pre-footer is MORE POLISHED (grain, vignette, TextReveal, dual CTAs, body copy), but LESS DYNAMIC (no rolling element).

### Priority: **LOW** (Alfa's implementation is already strong, rolling marquee = enhancement)

---

## 13. GAP #12 — Factory & Product Standards / Trust Certification

### Yucca Implementation
```
Section: "Our partners share our commitment to responsible practices..."

14 Certification Badges (horizontal scroll):
┌────┬──────────┬───────┬─────┬─────┬─────┐
│FDA │EU 10/2011│ BRCGS │ FSC │ GRS │ BPI │
├────┼──────────┼───────┼─────┼─────┼─────┤
│DIN │TÜV Home  │TÜV Ind│ISO  │ISO  │ISO  │
│CERT│Compost   │Compost│9001 │14001│22000│
├────┼──────────┼───────┼─────┼─────┼─────┤
│ISO │FSSC      │       │     │     │     │
│45001│22000    │       │     │     │     │
└────┴──────────┴───────┴─────┴─────┴─────┘

Appears on: Homepage + Food Service + Food Processing + Agriculture + Custom Solutions
                                                                      (5 pages)
Animation: ScrollTrigger entrance, horizontal scroll on mobile
```

### Alfa Beauty Implementation
**TIDAK ADA dedicated section.** Hanya ada text-only trust badges di MegaFooter:

```javascript
const TRUST_BADGES = [
  "Official Distributor",
  "100% Authentic Products",
  "Professional Grade",
  "18+ Years Experience",
];
```
Ditampilkan sebagai: `<span class="trust-badge">` dengan red dot indicator.

### Technical GAP

| Aspect | Yucca | Alfa Beauty | GAP |
|--------|-------|-------------|-----|
| **Dedicated section** | ✅ Own section on homepage | ❌ None (only footer badges) | ❌ **MISSING** |
| **Real certifications** | 14 verifiable standards (FDA, ISO, BRCGS, FSC, etc.) | 4 generic claims (text-only) | ❌ **CRITICAL** |
| **Visual format** | Image badges (logos/icons) | Text + red dot | ⚠️ Less credible |
| **Repetition** | 5 pages | Footer only (all pages but small) | ⚠️ Less visible |
| **Horizontal scroll** | ✅ On mobile | N/A | N/A |
| **Credibility impact** | HIGH — verifiable third-party certifications | LOW — self-asserted claims | ❌ **MAJOR GAP** |

### Impact Analysis
Ini adalah salah satu GAP paling signifikan dari perspective trust/conversion. Yucca menampilkan 14 real third-party certification logos (FDA, ISO, BRCGS, FSC) — ini adalah verifiable proof dari external authorities. Alfa Beauty hanya menampilkan self-asserted text claims ("100% Authentic", "Professional Grade").

Untuk industri distribusi produk profesional, brand principals akan mengharapkan melihat:
- BPOM registration
- Brand authorization certificates
- Halal certification (applicable in Indonesia)
- Original product guarantees

### Priority: **HIGH** (critical for trust/conversion, especially in B2B context)

---

## 14. GAP #13 — FAQ Accordion Section

### Yucca Implementation
```
Homepage: 5 FAQ items in accordion format
Konten:
  1. What types of packaging do you offer?
  2. Do you deliver nationwide?
  3. Do you deliver globally?
  4. How do I place an order?
  5. Do you offer sustainable options?

CTA: "View all" → /faq

Full FAQ hub at /faq:
  7 category tabs, ~35 total questions
  Accordion expand/collapse (GSAP height animation)

Distribution: FAQ accordion appears on 7 of 10 major pages
```

### Alfa Beauty Implementation
**TIDAK ADA** — Zero FAQ content on homepage or anywhere else. No `/faq` route exists.

### Technical GAP

| Aspect | Yucca | Alfa Beauty | GAP |
|--------|-------|-------------|-----|
| **Homepage FAQ** | ✅ 5 items accordion | ❌ None | ❌ **MISSING** |
| **Dedicated /faq page** | ✅ 7-tab, 35+ questions | ❌ No route | ❌ **MISSING** |
| **Per-page contextual FAQ** | ✅ On 7 of 10 pages | ❌ None | ❌ **MISSING** |
| **Accordion animation** | GSAP height reveal | N/A | N/A |
| **SEO impact** | HIGH (FAQ schema → rich snippets) | ZERO | ❌ **MISSING SEO** |
| **User support** | Self-serve answers | Must contact directly | ❌ **Worse UX** |

### Impact Analysis
FAQ is both a UX tool and a powerful SEO asset:
1. **SEO**: FAQ structured data → rich snippets in Google
2. **User support**: Reduces friction for common questions
3. **Content density**: More indexable text on pages Yucca puts FAQ on 7 of 10 pages
4. **Cross-linking**: Each page FAQ links to `/faq` hub = strong internal link structure

### Priority: **HIGH** (combined SEO + UX + trust impact)

---

## 15. GAP #14 — Mega Footer

### 15.1 Structure Comparison

**Yucca Mega Footer:**
```
┌─────────────────────────────────────────────────────┐
│ Headline: "Innovated for Industry Leaders."          │
│ [Yucca Logo — large]                                 │
│ [14 Certification Badges — horizontal row]           │
├──────────────────┬──────────────┬────────────────────┤
│  Food Service    │ Food Process │ Agriculture        │
│  [BACKGROUND     │ [BACKGROUND  │ [BACKGROUND        │
│   IMAGE CARD]    │  IMAGE CARD] │  IMAGE CARD]       │
│  → /food-service │ → /food-proc │ → /agriculture     │
├──────────────────┴──────────────┴────────────────────┤
│ [Facebook] [Instagram] [LinkedIn]                     │
│ © Yucca 2026. All Rights Reserved                     │
│ Contact Us · Privacy Policy · Terms & Conditions      │
│ Credit Application (PDF download)                     │
└─────────────────────────────────────────────────────┘
```

**Alfa Beauty MegaFooter (`mega-footer.tsx` V8):**
```
┌─────────────────────────────────────────────────────┐
│ Headline (TextReveal): "Innovated for Salon          │
│   & Barber Professionals."        [↑ Scroll to top]  │
│ LineGrow separator                                    │
├─────────────────────────────────────────────────────┤
│ [Alfa Beauty Logo  │ 3 Pillar CARDS:                 │
│  (parallax)]       │                                  │
│ ALFA BEAUTY ®      │  ┌─────────┐ ┌─────────┐ ┌────┐│
│                     │  │01 Produk│ │02 Edu   │ │03  ││
│                     │  │ Text    │ │ Text    │ │Part││
│                     │  │ only    │ │ only    │ │ner ││
│                     │  │ [hover  │ │ [hover  │ │[ho]││
│                     │  │  CTA]   │ │  CTA]   │ │    ││
│                     │  └─────────┘ └─────────┘ └────┘│
├─────────────────────────────────────────────────────┤
│ [Trust Badges — text only]:                           │
│ • Official Distributor  • 100% Authentic Products     │
│ • Professional Grade    • 18+ Years Experience        │
├─────────────────────────────────────────────────────┤
│ © 2026 Alfa Beauty. All Rights Reserved | [IG] [WA] │
│ Privacy Policy · Terms of Service                     │
└─────────────────────────────────────────────────────┘
```

### 15.2 Technical GAP Matrix

| Aspect | Yucca | Alfa Beauty | GAP |
|--------|-------|-------------|-----|
| **Footer positioning** | Standard (in document flow) | `position: fixed` + spacer (ResizeObserver) | ✅ **Alfa more modern** |
| **Headline animation** | Static rendered | TextReveal word split + blur | ✅ **Alfa leads** |
| **Scroll-to-top** | Not visible on homepage | Arrow-up button with hover rotate + shadow | ✅ **Alfa leads** |
| **Logo parallax** | Static logo placement | `WordmarkParallax` with `useParallax` hook | ✅ **Alfa leads** |
| **Pillar card images** | ✅ Background photography per card | ❌ Text-only cards | ❌ **MISSING** |
| **Card hover CTA** | Direct link always visible | Hover-reveal "Explore" + arrow (opacity 0→1) | ✅ **Alfa refined** |
| **Certification badges** | ✅ 14 real badge logos (image-based) | ❌ 4 text-only generic claims | ❌ **MAJOR GAP** |
| **Social channels** | Facebook, Instagram, LinkedIn (3) | Instagram, WhatsApp (2) | ⚠️ Fewer channels |
| **Downloadable resource** | ✅ "Credit Application" PDF link | ❌ None | ❌ **MISSING** |
| **Card entrance** | GSAP stagger | `cardFadeScale` Framer Motion variants | ✅ Similar |
| **Grain/vignette** | Not documented for footer | `grain-overlay-subtle` + `vignette-warm` | ✅ **Alfa** |
| **Accent line on cards** | Not documented | `h-0.5 w-0 bg-brand-crimson → w-full` on hover | ✅ **Alfa** |
| **Numbered indices** | Not present | `01`, `02`, `03` per card | ✅ **Alfa** |

### 15.3 Key Missing Elements

1. **Pillar card background images** — Yucca's footer cards have full background photography (product shots). Alfa's cards are text-only with gradient hover overlays.
2. **Real certification badges** — 14 vs 4 text claims (see GAP #12).
3. **Facebook/LinkedIn social** — Alfa only has Instagram + WhatsApp. LinkedIn is important for B2B (brand principal relationships).
4. **Downloadable resource** — Yucca has "Credit Application" PDF download. Alfa could have partnership application, price list request, or catalog download.

### Priority: **MEDIUM** (footer images + LinkedIn + downloadable resource would add depth)

---

## 16. GAP #15 — WhatsApp FAB & Floating Elements

### Comparison

| Aspect | Yucca | Alfa Beauty | GAP |
|--------|-------|-------------|-----|
| **WhatsApp FAB** | ✅ Fixed bottom-right, green brand color | ✅ Fixed bottom-right, `bg-whatsapp`, hover glow | ✅ Parity |
| **Icon** | WhatsApp logo (brand) | `<MessageCircle>` (Lucide generic) | ⚠️ Alfa uses generic icon |
| **Shadow** | Subtle drop shadow | `shadow-lg` + hover `shadow-[0_0_20px_rgba(37,211,102,0.35)]` | ✅ Alfa has glow |
| **Hover** | Basic hover state | `hover:scale-110` + green glow shadow | ✅ Alfa more polished |
| **Analytics** | Not documented | `trackEvent("cta_whatsapp_click", { location })` | ✅ Alfa tracks |
| **Accessibility** | Not documented | `aria-label`, `focus-visible:ring-2` | ✅ Alfa accessible |
| **Entry animation** | Not documented | `floatingFadeIn` variant (delayed entrance) | ✅ Alfa animated |

### Assessment
Alfa Beauty's WhatsApp FAB is equal or better than Yucca's. The only minor difference is using a generic `MessageCircle` icon instead of the official WhatsApp logo — this could be intentional to avoid brand trademark issues.

### Priority: **NONE** (at parity)

---

## 17. GAP #16 — Animation Engine Comparison

### 17.1 Engine Architecture

| Aspect | Yucca (GSAP 3) | Alfa Beauty (Framer Motion 12.34) |
|--------|----------------|-----------------------------------|
| **Library** | GreenSock (GSAP) + ScrollTrigger + SplitText + Observer | Framer Motion (React-native) |
| **Paradigm** | Imperative (timeline.play(), gsap.fromTo) | Declarative (variants, whileInView) |
| **Bundle** | ~40-60KB (GSAP core + plugins, single file) | ~35-45KB (FM core, tree-shakeable) |
| **Scroll linking** | ScrollTrigger (scrub, pin, trigger points) | `useScroll` + `useTransform` |
| **Text splitting** | SplitText plugin (native GSAP) | Custom `TextReveal` component (CSS-based) |
| **Page transitions** | Barba.js (`sync: true`) | Next.js `PageTransition` component (AnimatePresence) |
| **Smooth scroll** | Lenis (quintic ease) | Lenis 1.3.18 (same library) | 
| **Timeline** | `gsap.timeline()` (master + nested) | Variant orchestration (staggerChildren) |
| **Kill/cleanup** | ScrollTrigger.kill() on Barba leave | React useEffect cleanup, `viewport: once` |
| **Performance** | will-change via ScrollTrigger, requestAnimationFrame | CSS will-change hints in globals.css |

### 17.2 Six Signature Patterns — Cross-Reference

| # | Yucca Pattern (GSAP) | Alfa Beauty Equivalent | Implementation Quality |
|---|---------------------|----------------------|----------------------|
| 1 | **ClipPath inset reveal** `inset(0% 0% 100% 0%)→inset(0%)` | `initial={{ clipPath: "inset(100% 0% 0% 0%)" }}` `whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}` | ✅ Full parity (about.tsx, feature-split.tsx) |
| 2 | **SplitText line stagger** `yPercent 100→0, stagger 0.04` | `TextReveal` component (CSS `.text-reveal-line` + `.text-reveal-word` stagger via animation-delay) | ⚠️ CSS-based, less fine-grained than GSAP SplitText |
| 3 | **Scale 1.4→1 image reveal** + parent clip | `imageScale useTransform [1.14, 1.08, 1.02]` + parent `clipPath` + Ken Burns class | ✅ Full parity (implemented differently) |
| 4 | **Border scaleX grow** | `LineGrow` component + card accent lines `w-0→w-full` | ✅ Full parity |
| 5 | **yPercent slide up stagger** | `fadeInUp`, `listItemFadeIn`, `counterFadeUp` variants | ✅ Full parity |
| 6 | **ScrollTrigger parallax** | `useScroll` + `useTransform` + `PARALLAX` constants | ✅ Full parity |

### 17.3 Animation GAPs

| What Yucca Has | What Alfa Lacks |
|----------------|-----------------|
| GSAP master timelines with precise overlap offsets (`<0.1`, `<0.2`) | FM stagger is sequential, no overlap phase timing |
| Per-card multi-phase animation in mega-menu (5 phases) | Single-phase entrance (opacity + y + blur) |
| $Observer$ plugin for swipe/gesture detection | Not using Observer equivalent |
| Barba.js full SPA-like transitions with XHR prefetch | Next.js App Router handles this natively |
| Lenis `touchMultiplier` explicit config | Lenis config not inspected (likely default) |

### 17.4 What Alfa Does Better

| What Alfa Has | What Yucca Lacks |
|---------------|-----------------|
| `will-change-filter` CSS hint for blur transforms | Not documented |
| `contentBlur` scroll-linked blur (hero) | No blur-on-scroll |
| `counter-glow` completion animation | No counter animations |
| Per-char headline split (hero) | Per-line split only |
| `animate-presence` for exit animations | GSAP `autoAlpha` for exits |
| Declarative variants (easier maintenance) | Imperative timelines (more complex) |
| 5-layer gradient overlay system | Simpler gradients |
| Ken Burns CSS class (simpler) | Scale 1.4→1 (imperative) |

### Priority: **LOW** (both engines achieve same visual results through different means)

---

## 18. GAP #17 — CSS Architecture & Design Token Comparison

### 18.1 Design Token Comparison

| Token Category | Yucca | Alfa Beauty | GAP |
|----------------|-------|-------------|-----|
| **Primary color** | Deep forest green `~#1a3a2a` | Crimson `#a4161a` (brand-crimson) | Different brand |
| **Accent** | Gold/brass `~#c4a146` | Brand-dark `#1b1b1b` | Different |
| **Background** | Warm cream `~#f5f2ed` | Surface `#f6f5f0` (surface) | ✅ Similar warm |
| **Text** | Dark `~#3a3a3a` | Charcoal `#2d2d2d` | ✅ Similar |
| **Font family** | Sans-serif (brand specific) | Montserrat 300-700 | Both sans-serif |
| **Display size** | ~60-80px fixed | `clamp()` fluid (heading-display) | ✅ Alfa responsive |
| **Border radius** | 0-8px (minimal, sharp) | 0 (sharp edges everywhere) | ✅ Similar |
| **Max-width** | ~1200-1400px | 1400px (`max-w-[1400px]`) | ✅ Same |
| **Section padding** | ~120-160px desktop | `py-24 lg:py-32` (~96-128px) | ⚠️ Alfa slightly less |

### 18.2 CSS Feature Comparison

| CSS Feature | Yucca | Alfa Beauty | GAP |
|-------------|-------|-------------|-----|
| **Fluid typography** | Fixed px values | `clamp()` scale (caption→display) | ✅ **Alfa leads** |
| **CSS custom properties** | Basic WordPress theme vars | 50+ tokens (`--ease`, `--header-height`, etc.) | ✅ **Alfa leads** |
| **Utility classes** | Bootstrap/custom mix | Tailwind CSS v4 + custom utilities | ✅ **Alfa leads** |
| **Glassmorphism** | Not present | 5 variants (glass, glass-subtle, glass-strong, glass-muted, glass-dark) | ✅ **Alfa leads** |
| **Grain overlay** | Not documented | 3 levels (grain-overlay, -subtle, -strong) | ✅ **Alfa leads** |
| **Vignette** | Not documented | `vignette-warm` (radial gradient) | ✅ **Alfa leads** |
| **Gradient masks** | Not documented | `fade-mask-x`, `fade-mask-x-subtle` | ✅ **Alfa leads** |
| **Shadow system** | Basic shadows | Warm shadow tokens (sm, md, lg) | ✅ **Alfa leads** |
| **Ken Burns** | GSAP scale animation | CSS class `ken-burns` (transform + animation) | Both, different |
| **Reduced motion** | Not documented | `@media (prefers-reduced-motion)` | ✅ **Alfa accessible** |
| **Button animation** | Basic hover | `btn-fill-sweep` (::before pseudo scale) | ✅ **Alfa leads** |
| **Link underline** | Basic | `link-animated` (::after scaleX from left) | ✅ **Alfa leads** |
| **`will-change` hints** | ScrollTrigger manages | Explicit `will-change: transform, opacity, filter` | ✅ Both handle |

### 18.3 Summary
Alfa Beauty's CSS architecture is significantly more sophisticated than Yucca's. The Tailwind v4 + custom utility layer provides:
- Fluid responsive typography
- 5-tier glassmorphism
- 3-tier grain system
- Warm shadow tokens
- Comprehensive reduced-motion support
- Rich hover/interaction micro-animations

Yucca relies more on GSAP for visual effects, while Alfa bakes them into CSS.

### Priority: **NONE** (Alfa already superior in CSS architecture)

---

## 19. GAP #18 — State Management & Interaction Patterns

### 19.1 Header State Machine Comparison

**Yucca Header States:**
```
States: 4 CSS classes
  - default (transparent)
  - scrolled-down (hide: translateY -100%)
  - scrolled-up (reveal: translateY 0)
  - header-active (mega-menu open)

Scroll detection: imperative JS (scroll event listener)
Menu state: class toggle (active/inactive)
Lenis control: stop/start on menu open/close
```

**Alfa Beauty Header States:**
```
States: 9 React state variables
  - scrolled (boolean, threshold 40px)
  - menuOpen (boolean, from NavigationMenu onValueChange)
  - mobileOpen (boolean, from Sheet)
  - headerHovered (boolean, mouse enter/leave)
  - justOpened (boolean, 900ms timer after menu open)
  - menuClosing (boolean, 800ms timer after menu close)
  - scrollDirection ("up" | "down", threshold 12px delta)
  - menuWasOpen (ref, tracks previous state)
  - rafId (ref, requestAnimationFrame debounce)

Computed states:
  - isSolid = solid || scrolled || menuOpen || headerHovered || menuClosing
  - isHidden = scrollDirection "down" && scrolled && !menuOpen && !mobileOpen && !menuClosing
  - hasElevation = scrolled && !menuOpen
  - contentEntrance = justOpened ? CSS animation class : ""
```

### 19.2 State Complexity Comparison

| Aspect | Yucca | Alfa Beauty |
|--------|-------|-------------|
| **State variables** | ~4 CSS classes | 9 state + 2 refs + 4 computed |
| **Direction detection** | Class-based | `scrollDirection` state + 12px threshold |
| **Hover awareness** | Not documented | `headerHovered` → force solid |
| **Close guard** | Not documented | `menuClosing` + `pointer-events-none` |
| **RAF debounce** | Not documented | `requestAnimationFrame` for scroll handler |
| **Memo optimization** | N/A (vanilla JS) | `useMemo` for trigger/directLink classes, `useCallback` for handlers |
| **Timer cleanup** | Not documented | `clearTimeout` in useEffect cleanup |
| **Lenis integration** | `lenis.stop()/start()` | `useLenisControl()` hook (stop/start) |

### Assessment
Alfa Beauty's header has SIGNIFICANTLY more sophisticated state management — more states, more edge case handling, RAF debouncing, computed state derivation, and React hooks optimization. This is a direct result of using React (declarative state) vs vanilla JS (imperative class toggling).

### Priority: **NONE** (Alfa already more sophisticated)

---

## 20. GAP #19 — Performance & Loading Strategy

### 20.1 Comparison

| Aspect | Yucca | Alfa Beauty | Who Benefits |
|--------|-------|-------------|-------------|
| **Rendering** | PHP server-rendered + GSAP hydration | Next.js SSG (static generation at build) | ✅ **Alfa** (zero server) |
| **JS bundle** | Single `dist/main.js` (no code splitting) | Next.js automatic code splitting | ✅ **Alfa** |
| **Image format** | .webp (loader), .jpg/.png (content) | next/Image (auto optimization, WebP/AVIF) | ✅ **Alfa** |
| **Image lazy load** | vanilla-lazyload library | next/Image native lazy + IntersectionObserver (hero) | ✅ **Alfa** |
| **Video loading** | N/A (no video) | IntersectionObserver, `preload="none"`, poster | ✅ **Alfa** |
| **Font loading** | WordPress default | Next.js `next/font` (likely) | ✅ **Alfa** typically |
| **Internal navigation** | Barba.js XHR prefetch (SPA-like, ~1s) | Next.js Link prefetch (native) | Similar |
| **Smooth scroll** | Lenis | Lenis 1.3.18 | ✅ Same |
| **Reduced motion** | Not documented | `@media (prefers-reduced-motion)` resets | ✅ **Alfa** |
| **CSS** | Theme CSS + custom | Tailwind CSS v4 (tree-shaken, minimal output) | ✅ **Alfa** |
| **Analytics** | Not documented | Custom `trackEvent` utility | ✅ **Alfa** |

### Assessment
Alfa Beauty's tech stack (Next.js SSG + Tailwind + tree-shaking) is inherently more performant than Yucca's WordPress + single-bundle approach.

### Priority: **NONE** (Alfa already leads)

---

## 21. Consolidated Priority Matrix

### ❌ MISSING Sections (Must Add)

| # | GAP | What's Missing | Yucca Reference | Effort | Priority |
|---|-----|---------------|----------------|--------|----------|
| **G-12** | Trust Certification Section | Dedicated homepage section with real certification badges (BPOM, Halal, brand auth) | 14 badge logos on 5 pages | Medium | **HIGH** |
| **G-13** | FAQ Accordion on Homepage | 3-5 FAQ items + "View all" → /faq page | 5 items + /faq hub with 35 Qs | High | **HIGH** |
| **G-07** | Product Showcase | Featured products carousel on homepage (even without e-commerce) | 4 new products with imagery and pricing | Medium | **MEDIUM** |
| **G-01** | Cookie Consent | GDPR/UU PDP compliance banner | Accept All / Customise / Reject All | Low | **MEDIUM** |

### ⚠️ Feature GAPs (Enhance Existing)

| # | GAP | What's Missing | Current State | Effort | Priority |
|---|-----|---------------|--------------|--------|----------|
| **G-03a** | Header Utility Bar | Search, Cart badge, Account icons | Only WhatsApp button | Medium | **HIGH** (if e-commerce planned) / **LOW** (if not) |
| **G-03b** | Mega-Menu Multi-Phase Animation | Per-card 5-phase GSAP-like entrance | Single CSS keyframe + FM stagger | High | **LOW** |
| **G-03c** | Mega-Menu Cross-Selling CTAs | "Looking for something specific?" cards | CTA column in some panels | Low | **MEDIUM** |
| **G-06** | Mission/Vision Cards | Explicit Mission + Vision statements on homepage about | Body copy only, no dedicated cards | Low | **MEDIUM** |
| **G-11** | Pre-Footer Rolling Marquee | Infinite scrolling question text within CTA | Static text only | Low | **LOW** |
| **G-14a** | Footer Pillar Card Images | Background photography in footer pillar cards | Text-only cards | Low | **LOW** |
| **G-14b** | LinkedIn Social | LinkedIn icon in footer (B2B important) | Only Instagram + WhatsApp | Trivial | **LOW** |
| **G-14c** | Downloadable Resource | PDF download link in footer (catalog, price list) | None | Low | **LOW** |
| **G-05** | Marquee Row Count | 4 rows with thematic separation | 2 mixed rows | Low | **LOW** |

### ✅ Alfa Beauty LEADS (No Action Needed)

| Section | Why Alfa Leads |
|---------|---------------|
| **Hero** | Video bg, 5-layer overlay, per-char split, 4-property scroll transform, glass cards |
| **About image** | clipPath reveal, Ken Burns, parallax, glass badge, animated counters |
| **Brand Carousel** | Embla engine, drag feedback, keyboard nav, progress bar, 7-layer hover |
| **Feature Split** | Horizontal clipPath, reverse layout, numbered list, parallax |
| **Partnership** | Ken Burns bg, numbered partner cards, dual CTAs |
| **CSS Architecture** | Fluid type, 5-tier glassmorphism, 3-tier grain, warm shadows, reduced motion |
| **State Management** | 9 reactive states, RAF debounce, computed derivation, memo optimization |
| **Performance** | SSG, code splitting, tree-shaking, next/Image optimization |
| **WhatsApp FAB** | Glow effect, analytics tracking, floatingFadeIn, a11y |
| **Footer** | Fixed position + ResizeObserver, TextReveal, scroll-to-top, parallax wordmark |

### Top 5 Action Items (Prioritized)

| Rank | GAP ID | Action | Impact |
|------|--------|--------|--------|
| **1** | G-12 | Build `TrustCertification` component — real badge images, horizontal scroll, add to homepage + key pages | Trust + Conversion |
| **2** | G-13 | Build `FAQAccordion` component + `/faq` route — contextual FAQ data per page, accordion animation | SEO + UX |
| **3** | G-06 | Add Mission/Vision cards to `AboutSection` or as separate sub-section | Brand Messaging |
| **4** | G-07 | Build `FeaturedProducts` component — product cards with imagery (catalog-style, no prices needed) | Credibility |
| **5** | G-03c | Add cross-selling CTA cards within mega-menu panels | Conversion |

---

*Document generated from source code analysis of all `frontend/src/components/sections/` files + `globals.css` + `page.tsx` cross-referenced against `docs/yucca-deep-study-v3.md` (22 sections, 1600+ lines).*
