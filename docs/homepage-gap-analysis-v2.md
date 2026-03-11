# Homepage Frontend GAP Analysis: Yucca vs Alfa Beauty

> **Tanggal**: Januari 2026  
> **Scope**: Frontend technical implementation — Header → Footer, section demi section  
> **Fokus**: Arsitektur DOM/markup, CSS composition, animation engine, state management  
> **BUKAN**: Gap bisnis/konten. Murni perbandingan engineering frontend  
> **Referensi**: `yucca-deep-study-v4.md` (23 sections) + `frontend-deep-study-v2.md` (26 sections) + source code langsung

---

## Daftar Isi

1. [Ringkasan Eksekutif GAP](#1-ringkasan-eksekutif-gap)
2. [Architecture Foundation GAP](#2-architecture-foundation-gap)
3. [Preloader GAP](#3-preloader-gap)
4. [Header & Mega-Menu GAP](#4-header--mega-menu-gap)
5. [Hero Section GAP](#5-hero-section-gap)
6. [Marquee Band GAP](#6-marquee-band-gap)
7. [About Section GAP](#7-about-section-gap)
8. [Brand Carousel / Product Carousel GAP](#8-brand-carousel--product-carousel-gap)
9. [Feature Split / "More Than Distributor" GAP](#9-feature-split--more-than-distributor-gap)
10. [Partnership Section GAP](#10-partnership-section-gap)
11. [Pre-Footer CTA GAP](#11-pre-footer-cta-gap)
12. [Mega Footer GAP](#12-mega-footer-gap)
13. [Shared Components GAP](#13-shared-components-gap)
14. [Animation Engine Perbandingan Menyeluruh](#14-animation-engine-perbandingan-menyeluruh)
15. [Prioritas Implementasi](#15-prioritas-implementasi)

---

## 1. Ringkasan Eksekutif GAP

### Stack Perbandingan

| Layer | Yucca | Alfa Beauty |
|-------|-------|-------------|
| **Rendering** | WordPress PHP SSR + Barba.js SPA overlay | Next.js 16 React Server Components + client hydration |
| **Animation** | GSAP 3 (ScrollTrigger, SplitText, Observer) | Framer Motion 12.34 + pure CSS + IntersectionObserver |
| **Smooth Scroll** | Lenis (quintic `1-pow(1-e,5)`) | Lenis 1.3.18 (same core, tighter integration via React context) |
| **Page Transitions** | Barba.js sync: overlay → XHR → DOM swap → reveal (~1s) | Framer Motion AnimatePresence `mode="wait"` on pathname key (~0.45s) |
| **Styling** | Custom CSS classes in theme bundle | Tailwind CSS 4 + CSS custom properties + shadcn/ui primitives |
| **Build** | Webpack → single `dist/main.js` | Next.js Turbopack → route-based code splitting |
| **JS Pattern** | Class-based ES6+ (per-page modules) | React functional components + hooks |

### Skor GAP per Section (0 = identical, 5 = fundamental gap)

| Section | Skor | Ringkasan |
|---------|------|-----------|
| Preloader | 2 | Alfa punya preloader, tapi beda mekanisme (counter vs image sequence) |
| Header | 1.5 | Sangat comparable. Alfa bahkan lebih advance di beberapa area |
| Mega-Menu | 2 | Alfa punya 5-phase, tapi missing hover-image-swap + CTA cards in menu |
| Hero | 2 | Alfa video-based (lebih premium), tapi missing floating product cutout |
| Marquee | 1.5 | Alfa punya 2-row, Yucca punya 4-row |
| About | 1 | Sangat comparable. Alfa punya counter + parallax yang lebih advanced |
| Brand Carousel | 2 | Alfa punya Embla carousel, Yucca punya product carousel. Beda intent |
| Feature Split | 1 | Sangat comparable. Kedua situs pakai split layout + clipPath |
| Partnership | 1 | Comparable. Alfa punya card + WhatsApp CTA, Yucca punya feature cards |
| Pre-Footer CTA | 1.5 | Comparable. Keduanya punya rolling marquee. Yucca muncul di SETIAP page |
| Footer | 1 | Sangat comparable. Keduanya pakai fixed reveal + pillar cards |
| **MISSING SECTIONS** | **4-5** | FAQ inline, Certification badges, Cookie consent, Product carousel pricing |

---

## 2. Architecture Foundation GAP

### 2.1 DOM Rendering Model

**Yucca:**
```
WordPress PHP → Full HTML SSR → Barba.js intercepts clicks
→ XHR fetch → DOM swap inner container → Re-init GSAP/Lenis
→ User sees: instant "SPA-like" with loader overlay (~1s)
```
- Pro: Full HTML on first load (SEO perfect)
- Con: Entire animation library reinitializes on every "navigation"
- Con: Single monolith `dist/main.js` — no code splitting

**Alfa Beauty:**
```
Next.js RSC → Server renders HTML shell → Client hydrates
→ useRouter navigation → React reconciliation → AnimatePresence transition
→ User sees: crossfade with blur (0.45s)
```
- Pro: Route-based code splitting (smaller per-page JS)
- Pro: React Server Components reduce client JS for static content
- Pro: No manual teardown/reinit of scroll/animation state
- Con: Hydration overhead on initial load

**GAP**: Alfa Beauty **lebih modern** di sini. Yucca harus manually manage ScrollTrigger lifecycle (`kill` + `create` on Barba transition). Alfa cukup pakai React lifecycle + AnimatePresence.

### 2.2 State Management Architecture

**Yucca:**
```javascript
// Class-based per-page architecture
class Home {
  constructor() { this.initHero(); this.initMarquee(); ... }
  initHero() { gsap.timeline()...; }
  destroy() { ScrollTrigger.getAll().forEach(t => t.kill()); }
}
// Barba dispatches: new Home() on enter, home.destroy() on leave
```
- Imperative lifecycle management
- Manual cleanup required — miss one `kill()` → memory leak

**Alfa Beauty:**
```tsx
// React hooks-based
function HeroSection() {
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: [...] });
  const videoY = useTransform(scrollYProgress, [0, 1], [0, value]);
  // Auto-cleanup via React fiber teardown
}
```
- Declarative — Framer Motion handles lifecycle
- `useScroll` auto-cleans on unmount
- No manual ScrollTrigger management needed

**GAP**: Alfa Beauty **menang** di DX (developer experience) dan reliability. Tidak ada risiko orphaned ScrollTrigger instances.

### 2.3 CSS Architecture

**Yucca:**
- Custom CSS di theme bundle
- Class-based composition (`is-scrolled`, `is-open`, `is-hidden`)
- GSAP inline styles for animations (writes to `element.style`)
- No utility framework — hand-written media queries

**Alfa Beauty:**
- Tailwind CSS 4 utility-first + CSS custom properties
- State via `cn()` conditional class merging
- Framer Motion inline styles for animated values
- CSS-driven animations for non-scroll elements (marquee, grain, ken-burns, shimmer)
- CSS `@property` for typed custom properties

**GAP**: Pendekatan berbeda tapi setara. Alfa Beauty _lebih maintainable_ karena Tailwind + design token system.

---

## 3. Preloader GAP

### 3.1 DOM/Markup Architecture

**Yucca Preloader:**
```
<div.intro> (fixed, z:9999)
├── <div.intro__logo>
│   ├── <img.intro__icon> (logo-icon.svg)
│   ├── <span.intro__text1> "YUCCA"
│   └── <span.intro__text2> "PACKAGING"
├── <div.intro__images>
│   ├── <img> frame 1.webp
│   ├── <img> frame 2.webp
│   ├── <img> frame 3.webp
│   ├── <img> frame 4.webp
│   └── <img> frame 5.webp
└── <div.intro__bg> (background layer)
```
- 5 preloaded product image frames
- Logo icon + dual wordmark text
- Background layer for split-wipe exit

**Alfa Beauty Preloader:**
```tsx
<motion.div> (fixed, z:200)
├── <motion.div> top-half bg-foreground (scaleY wipe)
├── <motion.div> bottom-half bg-foreground (scaleY wipe)
└── <motion.div> center content
    ├── <motion.div> breathing-scale logo container
    │   └── <Image> alfa-beauty-mark.svg (invert brightness)
    ├── <motion.span> "ALFA BEAUTY" wordmark (uppercase tracking)
    ├── <motion.span> progress counter "0%" → "100%"
    └── <motion.div> loading bar with shimmer
        └── <motion.div> progress fill (scaleX 0→0.7→1)
```
- No product image sequence
- Progress counter (0→100%) with quintic ease-out front-loading
- Split-wipe exit (top half scaleY→0, bottom half scaleY→0)
- Shimmer effect on loading bar

### 3.2 Animation Timeline Comparison

| Phase | Yucca (~3s total) | Alfa Beauty (~2.6s total) |
|-------|-------------------|--------------------------|
| **1. Brand Entrance** | Logo scale:0→1 (1.2s, power2.inOut) + text y:80→0 (0.8s) | Logo opacity:0→1 + scale:0.9→1 (0.8s) + breathing scale loop |
| **2. Brand Hold** | Logo + text pack up y→-120 (0.6s) | Wordmark fade-in y:8→0 (0.6s, delay 0.5) |
| **3. Content Layer** | 5 product image rapid crossfade (0.2s each) | Progress counter 0→100 (1.6s quintic) + shimmer bar |
| **4. Exit** | Background autoAlpha→0 (0.8s) | Split-wipe scaleY→0 (0.9s cinematic) + content scale 1→1.06 fade |

### 3.3 Session Handling

| Aspect | Yucca | Alfa Beauty |
|--------|-------|-------------|
| **Skip mechanism** | None — plays every page load | `sessionStorage` check — skip on repeat visits |
| **Internal navigation** | Barba.js transition overlay instead | AnimatePresence crossfade (0.45s) |
| **Duration** | ~3s always | ~2.6s first visit, 0s repeat visits |

### 3.4 Technical GAPs

| GAP ID | Deskripsi | Severity |
|--------|-----------|----------|
| **GAP-PRE-01** | Yucca punya **5-frame product image sequence** yang menciptakan "flash montage" produk sebelum reveal. Alfa hanya punya counter + shimmer bar. Tidak ada product imagery. | Medium |
| **GAP-PRE-02** | Yucca logo entrance menggunakan `scale:0→1` 1.2s — lebih dramatic dibanding Alfa `scale:0.9→1` 0.8s | Low |
| **GAP-PRE-03** | ✅ Alfa **unggul** — session skip mechanism lebih user-friendly. Yucca forces preloader setiap kali. | Alfa Wins |

---

## 4. Header & Mega-Menu GAP

### 4.1 Header DOM Architecture

**Yucca Header:**
```
<header.header> (fixed, z:topmost)
├── <div.header__top> (utility bar — always visible)
│   ├── <a> "Home"
│   ├── <a.header__cart-icon> cart icon + badge count
│   └── <a> "Account"
├── <div.header__main> (primary nav row)
│   ├── <div.header__logo>
│   │   └── <a><img> logo-full.svg (wordmark + icon)
│   ├── <nav.header__nav>
│   │   ├── <a.header__link> "Shop" (mega-trigger)
│   │   ├── <a.header__link> "Packaging Solutions" (mega-trigger)
│   │   ├── <a.header__link> "Resources" (mega-trigger)
│   │   ├── <a.header__link> "About" (direct)
│   │   └── <a.header__link> "Contact" (direct)
│   └── <button.header__hamburger> (mobile)
└── <div.header__mega-panels> (3 panels, absolutely positioned)
    ├── <div.mega-panel--shop>
    ├── <div.mega-panel--solutions>
    └── <div.mega-panel--resources>
```

**Alfa Beauty Header:**
```tsx
<> (Fragment)
├── <AnimatePresence> overlay
│   └── <motion.div> (fixed inset-0 z-40, blur+warm tint)
│       ├── <div> bg-foreground/60 backdrop-blur-[8px]
│       └── <div> gradient-to-b warm tint
├── <header> (fixed top-0 z-50)
│   └── <div> (CSS Grid 3-col: [1fr auto 1fr])
│       ├── <Link> logo (Image + span wordmark)
│       ├── <NavigationMenu> (Radix-based, hidden lg:flex)
│       │   └── <NavigationMenuList>
│       │       ├── <NavigationMenuItem value="products">
│       │       │   ├── <NavigationMenuTrigger> "Products"
│       │       │   └── <NavigationMenuContent>
│       │       │       └── <ProductsPanel/> (5-phase animated)
│       │       ├── <NavigationMenuItem value="brands">
│       │       ├── <NavigationMenuItem value="education">
│       │       ├── <NavigationMenuItem value="partnership">
│       │       ├── <NavigationMenuItem> "About" (direct)
│       │       └── <NavigationMenuItem> "Contact" (direct)
│       └── <div> right actions (WhatsApp + mobile trigger)
│           ├── <a> WhatsApp icon
│           └── <Sheet> (mobile drawer)
│               └── <MobileMenu/>
```

### 4.2 Header State Machine Comparison

**Yucca Header States:**
```
┌─ TRANSPARENT ─┐     scroll > threshold
│ bg: none      │ ──────────────────────→ ┌─ SOLID ──────┐
│ text: white   │                          │ bg: cream     │
│ border: none  │ ←────────────────────── │ text: dark    │
└───────────────┘     scroll ≤ threshold   │ border: warm  │
        │                                  └───────┬───────┘
        │ scroll down > 12px delta                 │
        ▼                                          ▼
┌─ HIDDEN ──────┐                         ┌─ HIDDEN ──────┐
│ translateY:   │                          │ translateY:   │
│ -102%         │                          │ -102%         │
└───────┬───────┘                         └───────┬───────┘
        │ scroll up > 12px delta                   │
        ▼                                          ▼
┌─ VISIBLE ─────┐                         ┌─ VISIBLE ─────┐
│ translateY: 0 │                          │ translateY: 0 │
│ solid bg      │                          │ solid bg      │
└───────────────┘                         └───────────────┘
        │
        │ mega-menu hover/click
        ▼
┌─ MEGA-OPEN ───┐
│ bg: solid     │
│ panel visible │
│ overlay active│
│ lenis.stop()  │
└───────────────┘
```

**Alfa Beauty Header States:**
```
States computed from 6 booleans:
  solid (pathname !== "/"), scrolled (>40px), menuOpen,
  headerHovered, menuClosing (800ms grace), scrollDirection

isSolid = solid || scrolled || menuOpen || headerHovered || menuClosing
isHidden = scrollDirection==="down" && scrolled && !menuOpen && !mobileOpen && !menuClosing
hasElevation = scrolled && !menuOpen

Transitions:
  ┌─ TRANSPARENT ─┐  (only on "/" + !scrolled + !hovered + !menuOpen)
  │ bg-transparent │
  │ text-white     │
  │ border-white/10│
  └───────┬────────┘
          │ any isSolid trigger
          ▼
  ┌─ SOLID ────────┐
  │ bg-background  │
  │ text-foreground│
  │ border-warm/60 │
  └───────┬────────┘
          │ scrollDirection=down + scrolled + !menuOpen
          ▼
  ┌─ HIDDEN ───────┐
  │ -translate-y-  │
  │ [102%]         │
  └───────┬────────┘
          │ scroll up (delta >12px via RAF debounce)
          ▼
  ┌─ VISIBLE ──────┐
  └────────────────┘
          │ menuOpen=true (NavigationMenu onValueChange)
          ▼
  ┌─ MEGA-OPEN ────┐
  │ overlay blur+   │
  │ warm tint       │
  │ lenis.stop()    │
  │ menuClosing     │
  │ grace (800ms)   │
  └─────────────────┘
```

### 4.3 Header CSS Composition

**Yucca:**
- Direct class toggling (`is-scrolled`, `is-open`, `is-hidden`)
- CSS transitions via theme stylesheet
- GSAP overrides for mega-menu panel animations
- No RAF debounce on scroll — direct scroll event handler

**Alfa Beauty:**
- `cn()` (clsx + tailwind-merge) conditional class composition
- `useMemo` memoized class strings (triggerClasses, directLinkClasses, indicatorBar)
- RAF-debounced scroll detection via `useMotionValueEvent` + `requestAnimationFrame`
- Inline `style` object for multi-property transitions (border, bg, translate, box-shadow)
- CSS custom property `var(--ease)` for consistent easing across CSS transitions

```tsx
// Alfa Beauty — memoized indicator bar (Yucca's border scaleX grow equivalent)
const indicatorBar = React.useMemo(() => [
    "before:content-[''] before:absolute before:bottom-[-1px]",
    "before:left-[1.6rem] before:right-[1.6rem]",
    "before:h-[0.35rem] before:rounded-t-[0.35rem]",
    "before:origin-bottom before:[transform:scaleY(0)]",
    "before:transition-[transform,background-color] before:duration-[500ms]",
    isSolid ? "before:bg-foreground" : "before:bg-white",
].join(" "), [isSolid]);
```
vs Yucca's:
```css
.header__link::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 1.6rem; right: 1.6rem;
  height: 0.35rem;
  transform-origin: bottom;
  transform: scaleY(0);
  transition: transform 500ms var(--ease);
}
.header__link:hover::after { transform: scaleY(1); }
```

### 4.4 Mega-Menu Panel Animation Comparison

**Yucca 5-Phase (GSAP Timeline per card):**
```
Phase 1: clipPath inset(0% 0% 100% 0%) → inset(0% 0% 0% 0%)      | 0.6s power3.inOut
Phase 2: image scale 1.4 → 1                                        | 0.8s power2.out +0.1s
Phase 3: text lines yPercent 100→0, stagger 0.04                    | 0.5s power2.out +0.2s
Phase 4: border scaleX 0→1, origin:left                             | 0.5s power2.out +0.1s
Phase 5: link CTA yPercent 100→0                                    | 0.4s power2.out +0.1s
Total per card: ~1.4-1.8s
```

**Alfa Beauty 5-Phase (Framer Motion Variants):**
```
Stagger container: delayChildren 0.08, staggerChildren 0.12

Phase 1 (megaMenuCardBgReveal): clipPath inset(100% 0 0 0) → inset(0)    | 0.65s cinematicEase
Phase 2 (megaMenuCardMediaScale): scale 1.4→1, opacity 0→1              | 0.8s cinematicEase +0.08s
Phase 3 (megaMenuCardTextStagger+Line): y 20→0, opacity 0→1, stagger    | 0.5s smoothEase
Phase 4 (megaMenuCardBorderGrow): scaleX 0→1, origin left               | 0.55s smoothEase +0.15s
Phase 5 (megaMenuCardLinkSlide): y 12→0, opacity 0→1                    | 0.45s smoothEase +0.1s
Total per card: ~1.5-2s
```

### 4.5 Header Technical GAPs

| GAP ID | Feature | Yucca | Alfa Beauty | Severity |
|--------|---------|-------|-------------|----------|
| **GAP-HDR-01** | **Utility bar (Home/Cart/Account)** | ✅ Persistent top bar di atas header dengan cart icon + account link | ❌ Tidak ada utility bar, tidak ada cart/account | Medium |
| **GAP-HDR-02** | **Image swap on hover** | ✅ Panel 2 & 3: featured image berubah saat item di-hover | ❌ Panels tidak memiliki hover-reactive image swap | Medium |
| **GAP-HDR-03** | **CTA cards in mega-menu** | ✅ "Looking for something specific?" + loyalty CTA langsung di panel | ❌ Panels berisi navigasi items saja, no embedded CTAs | High |
| **GAP-HDR-04** | **Hover debounce** | ✅ 100-150ms hover debounce mencegah accidental open | ⚠️ Radix NavigationMenu handles via `delayDuration` prop, tapi Alfa tidak set custom value | Low |
| **GAP-HDR-05** | **Scroll lock** | ✅ `lenis.stop()` on menu open | ✅ `lenisStop()` via React context on menuOpen/mobileOpen | Parity ✅ |
| **GAP-HDR-06** | **Menu closing grace period** | ⚠️ Not explicit in study | ✅ Alfa 800ms `menuClosing` state + `pointer-events-none` | Alfa Wins |
| **GAP-HDR-07** | **Dark overlay** | ✅ Dark overlay below header | ✅ AnimatePresence overlay with blur + warm gradient (more cinematic) | Alfa Wins |
| **GAP-HDR-08** | **RAF scroll debounce** | ❌ Direct scroll handler | ✅ `requestAnimationFrame` wrap in `useMotionValueEvent` | Alfa Wins |
| **GAP-HDR-09** | **Indicator scaleY animation** | ✅ CSS `::after` pseudo-element scaleY(0→1) | ✅ Tailwind `before:` pseudo scaleY(0→1) — identical pattern | Parity ✅ |
| **GAP-HDR-10** | **Mobile menu** | ✅ Hamburger → full-screen overlay + accordion | ✅ Sheet → slide-in drawer + accordion + WhatsApp CTA + pillar links | Parity ✅ |

---

## 5. Hero Section GAP

### 5.1 DOM/Markup Architecture

**Yucca Hero:**
```
<section.hero>
├── <div.hero__bg>
│   └── <picture>
│       ├── <source media="(max-width:768px)" srcset="hero_mobile.jpg">
│       └── <img src="hero_desktop.jpg"> (iced coffee cups on pedestal)
├── <div.hero__floating-product>
│   └── <img> (plastic tray cutout — floats above BG)
├── <div.hero__content>
│   ├── <h1.hero__headline> SplitText stagger per line
│   │   └── "Packaging that Performs. Innovated for Industry Leaders."
│   └── <div.hero__cards> (3 pillar cards — clipPath stagger reveal)
│       ├── <a> Food Service → /food-service
│       ├── <a> Food Processing → /food-processing
│       └── <a> Agriculture → /agriculture
└── (no CTA buttons — cards ARE the CTAs)
```

**Alfa Beauty Hero:**
```tsx
<section ref={sectionRef}> (min-h-screen, bg-foreground, grain-overlay-strong)
├── <motion.div> video container (parallax y + scale)
│   └── <video> (lazy IntersectionObserver, poster, muted loop playsInline)
├── <motion.div> 5-layer gradient overlay (opacity tied to scroll)
│   ├── <div> gradient left→right (from-black/75 via-black/40 to-transparent)
│   ├── <div> gradient top→bottom (from-black/35 via-transparent to-black/65)
│   ├── <div> gradient brand-dark/30
│   ├── <div> vignette-warm (radial)
│   └── <div> atmospheric edge darkening (radial-gradient ellipse)
├── <motion.div> content (parallax opacity + y + blur on scroll)
│   ├── <FadeIn> eyebrow "Established since 2007"
│   ├── <TextReveal> h1 (split="char", blur, 3 lines)
│   ├── <FadeIn> body paragraph
│   ├── <FadeIn> CTA: AnimatedButton "Explore Our Brands" (fill animation)
│   ├── <FadeIn> CTA: Button outline "Partner With Us"
│   └── <motion.div> 3 pillar CTA cards (glass style, stagger reveal)
│       ├── Products (link → /products)
│       ├── Education (link → /education)
│       └── Partnership (link → /partnership)
├── <motion.div> bottom gradient bleed (into next section)
└── <ScrollIndicator/>
```

### 5.2 Visual Strategy Comparison

| Aspect | Yucca | Alfa Beauty |
|--------|-------|-------------|
| **Background** | Static hero image (JPG, responsive crops) | Auto-playing video (MP4, lazy-loaded via IntersectionObserver) |
| **Background motion** | GSAP ScrollTrigger parallax y:-20% | Framer Motion `useTransform` parallax y + scale(1→1.18) |
| **Floating product** | ✅ Product cutout image "floats" above BG | ❌ No floating product element |
| **Overlay** | Simple dark gradient (1-2 layers) | 5-layer gradient system (directional + brand + vignette + atmo) |
| **Headline animation** | GSAP SplitText per line + yPercent stagger | CSS IntersectionObserver `TextReveal` per char + blur |
| **CTA approach** | Cards ARE the CTAs (no explicit buttons) | Buttons (primary + outline) + pillar cards below |
| **Grain overlay** | None on hero | `grain-overlay-strong` CSS pseudo-element |
| **Content scroll effect** | Basic fade-out | Parallax opacity + y translation + blur(0→10px) on content |
| **Scroll indicator** | None visible | ✅ `ScrollIndicator` animated element at bottom |
| **Section transition** | Hard edge to marquee | Gradient bleed `from-background` into next section |

### 5.3 Animation Engine Comparison

**Yucca Hero Animation (GSAP):**
```javascript
// Phase 1: Headline SplitText
const split = new SplitText('.hero__headline', { type: 'lines' });
gsap.from(split.lines, {
  yPercent: 100,
  stagger: 0.04,
  duration: 0.8,
  ease: 'power3.out',
  delay: PRELOADER_DURATION
});

// Phase 2: Pillar cards clipPath stagger
gsap.from('.hero__cards a', {
  clipPath: 'inset(0% 0% 100% 0%)',
  stagger: 0.08,
  duration: 0.6,
  ease: 'power3.inOut',
  delay: PRELOADER_DURATION + 0.3
});

// Phase 3: Background parallax (scrub)
ScrollTrigger.create({
  trigger: '.hero',
  start: 'top top',
  end: 'bottom top',
  scrub: true,
  animation: gsap.to('.hero__bg', { y: '-20%', ease: 'none' })
});
```

**Alfa Beauty Hero Animation (Framer Motion):**
```tsx
// Scroll-linked transforms
const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
const videoY = useTransform(scrollYProgress, [0, 1], [0, PARALLAX.hero * 100 * 5]);  // ~175px
const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
const contentY = useTransform(scrollYProgress, [0, 0.35], [0, -120]);
const contentBlur = useTransform(scrollYProgress, [0, 0.35], [0, 10]);
const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);

// Headline: TextReveal (pure CSS + IntersectionObserver)
<TextReveal split="char" blur delay={HERO_TIMING.heading} />
// heading delay = PRELOADER_DURATION * 1000 + 300 = 2900ms

// CTA buttons: FadeIn cascaded
<FadeIn delay={HERO_TIMING.cta} />           // cta = 2.6 + 1.1 = 3.7s
<FadeIn delay={HERO_TIMING.cta + 0.12} />    // +120ms stagger

// Pillar cards: Framer Motion variants
<motion.div variants={pillarCardStagger} initial="hidden" animate="visible">
  {PILLARS.map(p => <motion.div variants={pillarCardReveal}>...)}
```

### 5.4 Parallax Depth Comparison

| Layer | Yucca | Alfa Beauty |
|-------|-------|-------------|
| **Background** | y: 0 → -20% (linear scrub) | y: 0 → ~175px + scale: 1→1.18 |
| **Content** | Static (no content parallax) | opacity: 1→0, y: 0→-120, blur: 0→10px (all at 35% scroll) |
| **Overlay** | Static gradient | opacity: 1→0.6 (at 50% scroll) |
| **Total layers** | 1 (background only) | 4 (video y + video scale + content fade/translate + overlay fade) |

**GAP**: Alfa Beauty **lebih dalam** pada parallax depth. Yucca hanya parallax background; Alfa parallax 4 independent layers menciptakan "peeling away" effect yang lebih cinematic.

### 5.5 Hero Technical GAPs

| GAP ID | Feature | Yucca | Alfa Beauty | Severity |
|--------|---------|-------|-------------|----------|
| **GAP-HERO-01** | **Floating product cutout** | ✅ Product image "floats" di hero (studio shot on transparent bg) | ❌ No floating product element | Medium |
| **GAP-HERO-02** | **Video background** | ❌ Static image (JPG) | ✅ Auto-play video + poster fallback + IntersectionObserver lazy | Alfa Wins |
| **GAP-HERO-03** | **Responsive hero image** | ✅ `<picture>` with mobile/desktop srcset | ⚠️ Single video, no responsive crops | Low |
| **GAP-HERO-04** | **Grain overlay** | ❌ None on hero | ✅ `grain-overlay-strong` pseudo-element | Alfa Wins |
| **GAP-HERO-05** | **Content scroll-away** | ❌ Content remains static | ✅ Content fades + translates + blurs on scroll (3 transforms) | Alfa Wins |
| **GAP-HERO-06** | **Headline tech** | GSAP SplitText (JS-driven per line) | CSS + IntersectionObserver per char with blur (pure CSS perf) | Different Approach |
| **GAP-HERO-07** | **Section transition** | Hard edge to marquee | Gradient bleed into next section (smoother) | Alfa Wins |
| **GAP-HERO-08** | **Scroll indicator** | ❌ None | ✅ Animated scroll indicator | Alfa Wins |
| **GAP-HERO-09** | **Overlay complexity** | 1-2 gradient layers | 5 gradient layers (directional + brand + vignette + atmospheric) | Alfa Wins |

---

## 6. Marquee Band GAP

### 6.1 Architecture Comparison

**Yucca Marquee:**
```
<section.marquee-band>
├── <div.marquee-row> direction: → right
│   └── [4× duplicated content] "Yucca Rewards · Yucca Direct (B2B)"
├── <div.marquee-row> direction: ← left
│   └── [4× duplicated content] "Quality · Branding"
├── <div.marquee-row> direction: → right
│   └── [4× duplicated content] "Custom Packaging · Sustainable"
└── <div.marquee-row> direction: ← left
    └── [4× duplicated content] "Innovation · Partnerships"
```
- 4 rows
- Alternating left/right direction (→←→←)
- Content: value propositions + programme promotion
- CSS infinite animation, 4× duplicate for seamless loop
- Speed: moderate (~60-80px/s estimated)

**Alfa Beauty Marquee:**
```tsx
<section> (border-y border-border-warm/40 bg-surface py-5)
└── <Marquee speed={45} gap={3} rows={2} pauseOnHover>
    ├── Row 1 (direction="left")
    │   └── [2× duplicated content]
    │       "Innovation · Alfaparf Milano · Education · Farmavita ·
    │        Partnership · Montibello · Quality · Gamma+ Professional ·
    │        Distribution · Excellence"
    └── Row 2 (direction="right", mt-3)
        └── [2× duplicated content] (reverse of row 1)
```
- 2 rows
- Alternating left/right (→←)
- Content: brand names interspersed with value keywords
- CSS `marquee-track` + `marquee-track-reverse` animation
- Speed prop: `--marquee-duration: 45s`
- `pauseOnHover` via CSS `animation-play-state: paused`
- `fade-mask-x` edge fade on container
- Entrance animation: blur(6px)→0 + y:16→0 + scale(0.98)→1

### 6.2 Technical GAPs

| GAP ID | Feature | Yucca | Alfa Beauty | Severity |
|--------|---------|-------|-------------|----------|
| **GAP-MRQ-01** | **Row count** | 4 rows (denser "wall of text" effect) | 2 rows (lighter) | Medium |
| **GAP-MRQ-02** | **Content duplication** | 4× per track (more seamless at high speed) | 2× per track (may show gap at slow speed?) | Low |
| **GAP-MRQ-03** | **Pause on hover** | ❌ No pause mechanism | ✅ CSS `animation-play-state: paused` | Alfa Wins |
| **GAP-MRQ-04** | **Edge fade mask** | ❌ Hard edges | ✅ `fade-mask-x` gradient on both sides | Alfa Wins |
| **GAP-MRQ-05** | **Entrance animation** | ❌ Static (appears with page) | ✅ Framer Motion blur+y+scale entrance on viewport | Alfa Wins |
| **GAP-MRQ-06** | **Item hover micro-interaction** | ❌ No item-level hover | ✅ `hover:scale-[1.06] hover:brightness-110` per item | Alfa Wins |
| **GAP-MRQ-07** | **Alternating direction** | ✅ →←→← pattern creates visual tension | ✅ →← pattern (same concept, less intense) | Parity ✅ |

---

## 7. About Section GAP

### 7.1 Architecture Comparison

**Yucca About (Homepage Section):**
```
<section.about-intro>
├── <h2> "Committed to Excellence, always Innovating" (SplitText)
├── <p> Body copy
├── <a> "About us" CTA → /about
├── <div.mission-card>
│   └── Mission text + icon
└── <div.vision-card>
    └── Vision text + icon
```
- Headline + body + link
- 2 cards (Mission, Vision) — same style as About page for visual consistency
- No statistics/counters
- No image

**Alfa Beauty About (Homepage Section):**
```tsx
<section id="about" py-24>
├── <div> grid 12-col (5/7 split)
│   ├── <div> col-span-5 (image side)
│   │   ├── <FadeIn> eyebrow "About Us"
│   │   ├── <TextReveal> h2 "18+ Years of Professional Excellence"
│   │   ├── <div> image container
│   │   │   ├── <motion.div> clipPath inset reveal (bottom→top)
│   │   │   │   └── <motion.div> parallax y + scale + ken-burns
│   │   │   │       ├── <Image> product image (fill, object-cover)
│   │   │   │       ├── <div> gradient-to-t overlay
│   │   │   │       └── <div> brand gradient overlay
│   │   │   └── <motion.div> glass badge "Since 2007" (glassBadgeReveal)
│   │   └── <div> mobile fallback
│   └── <div> col-span-7 (text side)
│       ├── <FadeIn> paragraph 1
│       ├── <FadeIn> paragraph 2
│       ├── <LineGrow> divider
│       ├── <motion.div> 3 counters + 2 dividers
│       │   ├── Counter(18+, "Years of Experience") — countUp animation
│       │   ├── StatDivider (scaleY reveal)
│       │   ├── Counter(4, "International Brands")
│       │   ├── StatDivider
│       │   └── Counter(34, "Provinces Reached")
│       └── <FadeIn> AnimatedButton "Learn More About Us"
```

### 7.2 Technical GAPs

| GAP ID | Feature | Yucca | Alfa Beauty | Severity |
|--------|---------|-------|-------------|----------|
| **GAP-ABT-01** | **Mission/Vision cards** | ✅ 2 dedicated cards (consistent with About page) | ❌ No mission/vision cards on homepage | Medium |
| **GAP-ABT-02** | **Counter animation** | ❌ No counters on homepage about | ✅ 3 animated countUp counters with glow-on-complete | Alfa Wins |
| **GAP-ABT-03** | **Image + clipPath reveal** | ❌ No image in homepage about | ✅ Image with clipPath inset + parallax + scale + ken-burns + glass badge | Alfa Wins |
| **GAP-ABT-04** | **Stat dividers** | ❌ N/A | ✅ Animated scaleY dividers between counters | Alfa Wins |
| **GAP-ABT-05** | **Section depth** | Simple headline + body + 2 cards | 2-column grid with image + text + counters + dividers + CTA | Alfa Wins |

---

## 8. Brand Carousel / Product Carousel GAP

### 8.1 Architecture Comparison

**Yucca "New Products" Carousel:**
```
<section.products-carousel>
├── <h2> (SplitText reveal)
├── <div.carousel-track> (CSS/GSAP-driven slider)
│   ├── <div.product-card>
│   │   ├── <img> product on white bg (1:1 ratio)
│   │   ├── <h3> product name
│   │   ├── <span.badge> "NEW"
│   │   └── <span.price> "From R1.09 incl. vat"
│   ├── <div.product-card> (×3 more)
│   └── Navigation arrows
└── (4 products total)
```
- Product-focused (actual products with pricing)
- White background product photography (1:1 ratio)
- Price displayed ("From R X.XX incl. vat")
- NEW badge on products
- E-commerce intent (leads to product purchase)

**Alfa Beauty Brand Carousel:**
```tsx
<section id="brands" py-24>
├── <div> header row (eyebrow + title + body + arrows + counter)
│   ├── <TextReveal> "Global Professional Brands"
│   ├── Arrows (prev/next with disabled states)
│   └── Counter "1 / 4"
├── <LineGrow> divider
├── <div> Embla viewport (loop, autoplay 5s, dragFree:false)
│   └── <motion.div> flex container (cardStagger)
│       ├── <motion.div> brand card (min-h-[420px])
│       │   ├── Glassmorphism hover overlay
│       │   ├── Brand logo (h-14, object-contain, opacity transition)
│       │   ├── Origin text + flag
│       │   ├── Brand name
│       │   ├── Description
│       │   └── Hover accent line (w:0→100%, 900ms)
│       ├── (×N more brand cards)
├── Scroll progress bar (scaleX based on emblaApi.scrollProgress())
└── Pagination dots (w-1.5 → w-8 active, 600ms ease)
```
- Brand-focused (brand presentation, not individual products)
- Brand logos, not product photos
- No pricing
- Brand awareness intent (leads to brand exploration)
- Embla Carousel engine (loop, autoplay, drag, keyboard nav)

### 8.2 Technical GAPs

| GAP ID | Feature | Yucca | Alfa Beauty | Severity |
|--------|---------|-------|-------------|----------|
| **GAP-CRL-01** | **Carousel engine** | GSAP/CSS custom slider | Embla Carousel 8.6 (loop, snap, autoplay, drag, keyboard) | Alfa Wins |
| **GAP-CRL-02** | **Pricing display** | ✅ "From R1.09 incl. vat" per product | ❌ No pricing (brand cards, not product cards) | Different Intent |
| **GAP-CRL-03** | **Product photography** | ✅ White bg product shots (1:1 ratio) | ❌ Brand logos only (no product shots) | Medium |
| **GAP-CRL-04** | **NEW/Stock badges** | ✅ "NEW" + "OUT OF STOCK" visual badges | ❌ No badges on brand cards | Low |
| **GAP-CRL-05** | **Drag interaction** | ⚠️ Touch slide only | ✅ `cursor-grab/grabbing` + `isDragging` feedback (scale 0.995) | Alfa Wins |
| **GAP-CRL-06** | **Progress indicator** | ❌ No visible progress | ✅ Scroll progress bar (scaleX) + pagination dots | Alfa Wins |
| **GAP-CRL-07** | **Autoplay** | ⚠️ Unknown | ✅ Autoplay 5s + stop on interaction/mouse enter | Alfa Wins |
| **GAP-CRL-08** | **Keyboard navigation** | ❌ Unknown | ✅ ArrowLeft/ArrowRight when section focused | Alfa Wins |
| **GAP-CRL-09** | **Inline Rewards CTA** | ✅ "Get 5% back" card appears mid-grid | ❌ No inline CTA in carousel | Medium |
| **GAP-CRL-10** | **Card hover depth** | Basic hover state | 7-layer depth (translate + shadow + border + glass + logo scale + accent line + grain) | Alfa Wins |

---

## 9. Feature Split / "More Than Distributor" GAP

### 9.1 Architecture Comparison

Yucca doesn't have a single "Feature Split" section — however, the concept maps to sections in Industry Pillar pages ("Your Product, Our Protection" split layouts). The homepage equivalent is the About Intro + Product Carousel combination.

**Yucca Equivalent (Industry Pillar page split):**
```
<section.feature>
├── <div.feature__image> (full-height, clipPath reveal)
│   └── <img> product/factory photography
├── <div.feature__content>
│   ├── <h2> SplitText
│   ├── <p> body copy
│   ├── <ul> feature list (slide-up stagger)
│   └── <a> CTA
└── (No alternating layout — always image left, text right)
```

**Alfa Beauty FeatureSplit:**
```tsx
<section id="education" py-0>
├── <div> 2-col grid (reversible via RTL trick)
│   ├── <div> image side (min-h-[650px])
│   │   ├── <motion.div> horizontal clipPath reveal (direction based on `reverse`)
│   │   │   └── <motion.div> parallax y + scale + ken-burns
│   │   │       ├── <Image> fill object-cover
│   │   │       ├── gradient top overlay
│   │   │       └── gradient brand overlay
│   │   ├── <motion.div> glass badge "Education & Training"
│   │   └── mobile fallback
│   └── <div> text side (p-10 lg:p-16 xl:p-24, bg-surface)
│       ├── <FadeIn direction="right"> eyebrow
│       ├── <TextReveal> h2
│       ├── <LineGrow> divider
│       ├── <FadeIn> body paragraph
│       ├── <motion.ul> numbered list items (border-l-2 hover effect)
│       ├── <FadeIn> italic quote
│       └── <FadeIn> AnimatedButton
```

### 9.2 Technical GAPs

| GAP ID | Feature | Yucca | Alfa Beauty | Severity |
|--------|---------|-------|-------------|----------|
| **GAP-SPL-01** | **Reverse layout** | ❌ Always image-left, text-right | ✅ `reverse` prop using CSS `direction: rtl` trick | Alfa Wins |
| **GAP-SPL-02** | **ClipPath direction** | Left→right reveal only | ✅ Dynamic direction based on `reverse` prop (left or right) | Alfa Wins |
| **GAP-SPL-03** | **Glass badge** | ❌ No badge on image | ✅ Floating glass badge with enhanced blur | Alfa Wins |
| **GAP-SPL-04** | **Numbered list** | ⚠️ Basic bullet list | ✅ Numbered (01, 02, 03) + border-l-2 hover color change | Alfa Wins |
| **GAP-SPL-05** | **Quote text** | ❌ No pull-quote | ✅ Italic pull-quote "We believe long-term..." | Alfa Wins |
| **GAP-SPL-06** | **Ken Burns** | ❌ Static image in clip | ✅ CSS `ken-burns` ambient drift class | Alfa Wins |

---

## 10. Partnership Section GAP

### 10.1 Architecture Comparison

Yucca doesn't have a dedicated "Partnership" section on the homepage — its closest equivalent is the "Why choose Yucca" feature cards on Industry Pillar pages (4-6 cards with icons + text).

**Yucca "Why Choose" Pattern (Pillar Pages):**
```
<section.why-choose>
├── <h2> "Why choose Yucca"
└── <div.card-grid> (4-6 cards)
    └── <div.feature-card>
        ├── icon/badge
        ├── <h3> feature title
        └── <p> description
```
- No numbered badge
- No hover animation depth (basic hover state)
- No WhatsApp CTA integration

**Alfa Beauty PartnershipSection:**
```tsx
<section ref={bgRef} id="partnership" overflow-hidden bg-surface>
├── <motion.div> background image (parallax y + scale + ken-burns + grain)
├── <div> dual gradient overlay
├── <div> content
│   ├── eyebrow + TextReveal heading
│   ├── <motion.div> 2-col card grid
│   │   ├── PartnerCard "01" (For International Principals)
│   │   │   ├── giant "01" number (64px, border-warm color)
│   │   │   ├── accent-colored eyebrow
│   │   │   ├── title + LineGrow
│   │   │   ├── numbered list items (border-l-2 hover)
│   │   │   └── bottom accent line (w:0→100%)
│   │   └── PartnerCard "02" (For Professional Salons)
│   └── CTA row: AnimatedButton + WhatsAppCTA
```

### 10.2 Technical GAPs

| GAP ID | Feature | Yucca | Alfa Beauty | Severity |
|--------|---------|-------|-------------|----------|
| **GAP-PTR-01** | **Background image parallax** | ❌ No background image on card sections | ✅ Parallax + scale + ken-burns + grain + dual gradient | Alfa Wins |
| **GAP-PTR-02** | **Giant number watermark** | ❌ No numbered badge | ✅ 64px "01"/"02" as visual anchor | Alfa Wins |
| **GAP-PTR-03** | **WhatsApp CTA** | ❌ Only floating FAB | ✅ Inline WhatsApp button alongside primary CTA | Alfa Wins |
| **GAP-PTR-04** | **Dual-audience cards** | ❌ Single audience focus per page | ✅ Explicit dual-audience (Principals + Salons) | Alfa Wins |
| **GAP-PTR-05** | **Card hover depth** | Basic hover | translate-y-3 + shadow-warm-lg + border-charcoal/30 + gradient reveal + accent line | Alfa Wins |

---

## 11. Pre-Footer CTA GAP

### 11.1 Architecture Comparison

**Yucca Pre-Footer CTA (Every Page):**
```
<section.pre-footer-cta>
├── <h2> "Brands that thrive invest in custom-designed packaging.
│         Let us help bring your vision to life."
├── <a.btn> "Enquire now" → /contact
└── <div.marquee> rolling text
    └── [4× repeated] "Not sure what's possible? Get in touch to find out."
```
- **Appears on EVERY page** (homepage, about, all pillar pages, shop, product detail, blog, FAQ)
- Dark background
- Single CTA button → /contact
- Rolling marquee at bottom with FAQ-style question
- Contextual headline (same text everywhere)

**Alfa Beauty PreFooterCTA (Homepage Only):**
```tsx
<section class="pre-footer-cta" py-32 bg-foreground text-background overflow-hidden>
├── <div> grain-overlay-strong
├── <div> warm vignette (radial-gradient with black/40%)
├── <div> brand warm radial glow (brand-crimson/08%)
├── <div> rolling marquee band (opacity 4%, 8-12rem text, 30s duration)
│   └── [16 words ×2 track] "Professional Innovation Excellence Partnership..."
├── <div> content (z-20, max-w-4xl, text-center)
│   ├── <FadeIn> eyebrow "Ready to Transform Your Salon?"
│   ├── <TextReveal> h2 "Elevate Your Craft With Premium Professional Products"
│   ├── <FadeIn> body paragraph
│   └── <motion.div> 2 CTAs
│       ├── "Explore Products" → /products (solid bg)
│       └── "Become a Partner" → /partnership (outline border)
```

### 11.2 Technical GAPs

| GAP ID | Feature | Yucca | Alfa Beauty | Severity |
|--------|---------|-------|-------------|----------|
| **GAP-CTA-01** | **Page persistence** | ✅ Appears on **EVERY single page** across entire site | ❌ Only on homepage | **High** |
| **GAP-CTA-02** | **Contextual CTA** | "Enquire now" → /contact (always same) | Dual-CTA: Products + Partnership (homepage-specific) | Different Approach |
| **GAP-CTA-03** | **Marquee content** | FAQ-style question marquee "Not sure what's possible?" | Brand keyword marquee "Professional Innovation Excellence..." | Low |
| **GAP-CTA-04** | **Atmospheric layers** | Simple dark bg | 3 layers (grain + vignette + brand glow) + rolling text bg at 4% opacity | Alfa Wins |
| **GAP-CTA-05** | **Rolling marquee scale** | Moderate text size, full opacity | Giant 8-12rem text at 4% opacity (background texture effect) | Alfa Wins |

**Critical GAP-CTA-01**: Yucca's pre-footer CTA appearing on every single page is a **conversion architecture** decision, not just a component decision. It means every page exit passes through a conversion touchpoint. Alfa Beauty currently only has this on the homepage.

---

## 12. Mega Footer GAP

### 12.1 Architecture Comparison

**Yucca Mega Footer:**
```
<footer.footer> (static, end-of-page)
├── <div.footer__headline>
│   └── "Innovated for Industry Leaders."
│   └── [product images ×2]
├── <div.footer__pillars> (3 cards)
│   ├── Food Service → /food-service
│   ├── Food Processing → /food-processing
│   └── Agriculture → /agriculture
├── <div.footer__legal>
│   ├── <img> Yucca large logo
│   ├── "Yucca 2026. All Rights Reserved"
│   ├── Social icons: Facebook, Instagram, LinkedIn
│   └── Links: Contact Us | Privacy Policy | T&C
└── <div.footer__links>
    └── Credit Application | Shop | Company | Contact Us
```
- Static position (normal document flow)
- Product imagery in header area
- 3 pillar cards (same as header, creating bookend consistency)
- Social: 3 channels (Facebook, Instagram, LinkedIn)
- Additional links section (credit application PDF)

**Alfa Beauty Mega Footer:**
```tsx
<> (Fragment)
├── <div> spacer (height = footerHeight via ResizeObserver)
├── <footer> (position:fixed bottom-0 z-0, min-h-[520px], bg-surface)
│   ├── <div> warm vignette atmosphere
│   ├── <div> brand radial glow (crimson/03%)
│   ├── <div> headline area
│   │   ├── <TextReveal> "Innovated for Salon & Barber Professionals."
│   │   └── scroll-to-top button (hover rotate + shadow)
│   ├── <LineGrow> animated divider
│   ├── <div> main area (logo wordmark + 3 pillar cards)
│   │   ├── WordmarkParallax (parallax y on logo)
│   │   └── 3 pillar cards (cardFadeScale variants)
│   │       └── each card:
│   │           ├── background product image (opacity 0 → 0.06 on hover)
│   │           ├── gradient overlay on hover
│   │           ├── numbered index (01, 02, 03)
│   │           ├── title + description
│   │           ├── animated divider (w:0→100% on hover)
│   │           ├── "Explore" CTA (translate-y + opacity reveal on hover)
│   │           └── bottom accent line (w:0→100%)
│   ├── <FadeIn> trust badges (4 items)
│   ├── <FadeIn> bottom bar (border-t bg-surface-elevated/60)
│   │   ├── copyright + social icons (Instagram, WhatsApp)
│   │   └── legal links (Privacy, Terms)
│   └── (no additional links section)
├── <motion.a> Floating WhatsApp FAB (fixed bottom-6 right-6 z-50)
```

### 12.2 Reveal Mechanism

**Yucca:**
- Standard footer at end of document flow
- No "reveal underneath" pattern
- Content scrolls past, footer appears naturally

**Alfa Beauty:**
- `position: fixed; bottom: 0; z-index: 0` — footer sits BEHIND all content
- `<div>` spacer matches footer height (ResizeObserver-driven)
- Content scrolls away, footer "reveals from underneath" — cinematic effect
- Same technique used by Apple, Stripe, Linear

### 12.3 Technical GAPs

| GAP ID | Feature | Yucca | Alfa Beauty | Severity |
|--------|---------|-------|-------------|----------|
| **GAP-FTR-01** | **Reveal mechanism** | Standard flow (no reveal) | ✅ Fixed position + spacer = "reveal underneath" effect | Alfa Wins |
| **GAP-FTR-02** | **Scroll-to-top** | ❌ No scroll-to-top button | ✅ Animated button (hover rotate + shadow, fade based on scroll position) | Alfa Wins |
| **GAP-FTR-03** | **Pillar card depth** | Basic cards with link | 7-layer hover (bg image reveal + gradient + numbered + divider anim + CTA slide + accent line + grain) | Alfa Wins |
| **GAP-FTR-04** | **Logo parallax** | Static logo | ✅ `useParallax` hook on WordmarkParallax component | Alfa Wins |
| **GAP-FTR-05** | **Trust badges** | ❌ Not in footer (badges are elsewhere) | ✅ 4 trust badges in footer ("Official Distributor", "100% Authentic", etc.) | Alfa Wins |
| **GAP-FTR-06** | **Atmospheric depth** | Basic dark background | Warm vignette + brand radial glow + grain overlay | Alfa Wins |
| **GAP-FTR-07** | **Social channels** | ✅ 3 channels (Facebook, Instagram, LinkedIn) | ⚠️ 2 channels (Instagram, WhatsApp) — no Facebook/LinkedIn | Low GAP |
| **GAP-FTR-08** | **Product images in header** | ✅ 2 product images next to headline | ❌ Text headline only | Low |
| **GAP-FTR-09** | **Additional links** | ✅ Credit Application PDF, Shop, Company links | ❌ Only legal links | Low |
| **GAP-FTR-10** | **WhatsApp FAB** | ✅ Fixed bottom-right (all pages) | ✅ Fixed bottom-right (all pages) + analytics tracking | Parity ✅ |

---

## 13. Shared Components GAP

### 13.1 Components per Page — Yucca vs Alfa Beauty

**Yucca (6 shared components on EVERY page):**

| Component | Every Page? | Alfa Beauty Equivalent | Status |
|-----------|-------------|----------------------|--------|
| Header + Mega-Menu | ✅ | ✅ SiteHeader + 4 nav panels | ✅ Implemented |
| Pre-Footer CTA | ✅ Every page | ❌ Homepage only | **GAP** |
| FAQ Section (contextual) | ✅ Every page (3-7 questions) | ❌ Tidak ada FAQ di halaman manapun | **Major GAP** |
| WhatsApp FAB | ✅ Every page | ✅ In MegaFooter (all pages) | ✅ Parity |
| Mega Footer | ✅ Every page | ✅ MegaFooter on all pages | ✅ Parity |
| Cookie Consent | ✅ Every page | ❌ Tidak ada cookie consent | **GAP** |

**Ada juga komponen yang muncul di MULTIPLE pages (bukan semua):**

| Component | Yucca Pages | Alfa Beauty | Status |
|-----------|-------------|-------------|--------|
| Certification/Standards Badges (14) | Homepage, 3 Pillar, Custom Solutions | ❌ Hanya 4 trust badges di footer | **Major GAP** |
| Product Carousel (pricing) | Homepage, 3 Pillar pages | ❌ Brand carousel (no pricing) | **GAP** |
| Marquee Band | Homepage(4), About(values), 3 Pillar(subs), Custom(subs) | Homepage only (2 rows) | **GAP** |
| "Our 5 Step Process" reference | 3 Pillar pages, Custom Solutions | ❌ None | **GAP** |

### 13.2 Critical Missing Patterns

| GAP ID | Pattern | Impact | Deskripsi |
|--------|---------|--------|-----------|
| **GAP-SHARED-01** | **FAQ inline di setiap halaman** | **High** | Yucca menampilkan 3-7 FAQ kontekstual di SETIAP halaman + master hub /faq (35 Q&A). Alfa Beauty tidak memiliki FAQ di halaman manapun. Ini mengurangi trust dan SEO potential (FAQ rich snippet). |
| **GAP-SHARED-02** | **Certification badge row** | **High** | Yucca menampilkan 14 certification badges (FDA, EU, ISO, FSC, dll.) di Homepage, semua Pillar pages, Custom Solutions. Alfa Beauty hanya punya 4 text-only trust badges di footer. Sertifikasi dari brand partners (Alfaparf, Montibello, Gamma+) bisa di-showcase: BPOM, Halal, Made in Italy, dermatologist tested, dll. |
| **GAP-SHARED-03** | **Cookie consent banner** | **Medium** | Yucca punya GDPR-style cookie consent (Accept All / Customise / Reject All). Alfa Beauty tidak ada. Ini bisa jadi legal requirement tergantung target pasar. |
| **GAP-SHARED-04** | **Pre-footer CTA persistence** | **High** | Sudah dibahas di GAP-CTA-01. Yucca's CTA di setiap halaman = consistent conversion pressure. |

---

## 14. Animation Engine Perbandingan Menyeluruh

### 14.1 Core Library Comparison

| Aspect | Yucca (GSAP 3) | Alfa Beauty (Framer Motion 12) |
|--------|-----------------|-------------------------------|
| **Bundle size** | ~43KB (core) + ~20KB (ScrollTrigger) + ~8KB (SplitText) | ~35KB (Framer Motion) |
| **Paradigm** | Imperative timeline-based | Declarative variant-based (React) |
| **Scroll linking** | ScrollTrigger (scrub, pin, snap) | `useScroll` + `useTransform` (spring-based) |
| **Text splitting** | SplitText plugin (GSAP) | Pure CSS + IntersectionObserver (TextReveal) |
| **Easing model** | Named strings ("power2.inOut", "power3.out") | Cubic bezier arrays ([0.22, 1, 0.36, 1]) |
| **Lifecycle** | Manual create/destroy per Barba transition | React fiber auto-cleanup |
| **CSS integration** | GSAP writes inline styles | Framer Motion inline + CSS animations for ambient |
| **Page transitions** | Barba.js (XHR + DOM swap, ~1s) | AnimatePresence mode="wait" (0.45s) |

### 14.2 Yucca's 6 Signature Patterns → Alfa Beauty Mapping

| # | Yucca Pattern | GSAP Implementation | Alfa Beauty Equivalent | Status |
|---|---------------|---------------------|----------------------|--------|
| 1 | **ClipPath Inset Reveal** | `clipPath: inset(100% 0 0 0) → inset(0)`, power3.inOut, 0.6-0.8s | `initial={{ clipPath: "inset(100%...)" }} whileInView={{ clipPath: "inset(0%..." }}` cinematicEase, 1.5s | ✅ Implemented (longer duration, smoother) |
| 2 | **SplitText Stagger** | GSAP SplitText → yPercent per line, power2.out, stagger 0.04 | CSS `TextReveal` — per word/char, IntersectionObserver, CSS transition stagger | ✅ Implemented (CSS-driven, no JS animation library dependency) |
| 3 | **Scale + Parent Clip Image** | Parent clipPath + child scale 1.4→1 simultaneously | motion.div clipPath + inner motion.div scale 1.14→1.02 + ken-burns CSS | ✅ Implemented (added ken-burns ambient drift) |
| 4 | **Border ScaleX Grow** | `scaleX: 0→1, origin:left`, power2.out, 0.5s | `<LineGrow>` component — IntersectionObserver + CSS transform scaleX, 0.8s | ✅ Implemented |
| 5 | **yPercent Slide Up** | `yPercent: 100→0`, stagger 0.04-0.08 | `<FadeIn direction="up">` — y:32→0 + opacity, smoothEase, 0.7s | ✅ Implemented (added blur + scale options) |
| 6 | **ScrollTrigger Parallax** | `y: "-20%"`, scrub:true, linear | `useTransform(scrollYProgress, ...)` — multi-layer (y + scale + opacity + blur) | ✅ Implemented (MORE layers than Yucca) |

### 14.3 Easing Comparison

| Yucca Easing | Cubic Bezier (approx) | Alfa Beauty Equivalent | Match? |
|-------------|----------------------|----------------------|--------|
| `power2.inOut` | [0.455, 0.03, 0.515, 0.955] | `smoothEase` [0.22, 1, 0.36, 1] | ⚠️ Not exact — Alfa's is faster-out |
| `power2.out` | [0.0, 0.0, 0.58, 1.0] | `decelerateEase` [0.0, 0.0, 0.2, 1] | ~Close |
| `power3.inOut` | [0.645, 0.045, 0.355, 1] | `cinematicEase` [0.16, 1, 0.3, 1] | ⚠️ Not exact — Alfa's is more aggressive |
| `power3.out` | [0.0, 0.0, 0.2, 1.0] | `decelerateEase` [0.0, 0.0, 0.2, 1] | ✅ Very close |
| quintic (Lenis) | `1-pow(1-e,5)` | Same Lenis library | ✅ Identical |

### 14.4 Alfa Beauty Unique Animation Patterns (Not in Yucca)

| Pattern | Deskripsi | Komponen |
|---------|-----------|----------|
| **Content blur on scroll** | `filter: blur(0→10px)` linked to scrollYProgress | HeroSection |
| **Counter glow pulse** | CSS `counter-glow` class + `drop-shadow` on completion | AboutSection counters |
| **Breathing scale loop** | `scale: [1, 1.05, 1]` repeat Infinity, 2.4s | Preloader logo |
| **Shimmer bar** | CSS `shimmer-bar` animation on loading bar | Preloader |
| **Ken Burns ambient** | CSS `ken-burns` infinite subtle pan/zoom | AboutSection, FeatureSplit, PartnershipSection images |
| **Pillar card glass** | `pillar-card` class with backdrop-blur + bg-white/5 | HeroSection pillar cards |
| **Split-wipe exit** | Dual scaleY(1→0) from top+bottom origins | Preloader exit |
| **AnimatedButton fill** | Track-mouse fill SVG + color swap on hover | CTAs throughout |
| **5-phase mega-menu** | 5 sequential Framer Motion variants (bg→media→text→border→link) | All 4 nav panels |

---

## 15. Prioritas Implementasi

### Tier 1 — Critical GAPs (Conversion Architecture)

| # | GAP | Effort | Impact |
|---|-----|--------|--------|
| 1 | **GAP-SHARED-01**: FAQ inline di setiap halaman | High | Sangat tinggi — trust signal + SEO rich snippet + user self-service |
| 2 | **GAP-CTA-01**: PreFooterCTA di SETIAP halaman | Low | Tinggi — consistent conversion pressure, already built as component |
| 3 | **GAP-SHARED-02**: Certification/trust badge row di key pages | Medium | Tinggi — visual trust engineering, brand partner certifications |

### Tier 2 — Navigation & Discovery Enhancement

| # | GAP | Effort | Impact |
|---|-----|--------|--------|
| 4 | **GAP-HDR-03**: CTA cards embedded in mega-menu panels | Medium | Medium-High — turns navigation into selling tool |
| 5 | **GAP-HDR-02**: Image swap on hover in mega-menu panels | Medium | Medium — enhances discovery UX |
| 6 | **GAP-HDR-01**: Utility bar (cart/account if e-commerce planned) | Low | Low for now — only relevant if e-commerce added |

### Tier 3 — Visual Polish

| # | GAP | Effort | Impact |
|---|-----|--------|--------|
| 7 | **GAP-HERO-01**: Floating product cutout in hero | Low | Medium — adds product visibility at first impression |
| 8 | **GAP-MRQ-01**: Expand to 4 marquee rows | Low | Low — minor visual density increase |
| 9 | **GAP-PRE-01**: Product image sequence in preloader | Medium | Low — preloader already solid |
| 10 | **GAP-ABT-01**: Mission/Vision cards on homepage about | Low | Low — counters already provide stat density |

### Tier 4 — Nice-to-Have

| # | GAP | Effort | Impact |
|---|-----|--------|--------|
| 11 | **GAP-SHARED-03**: Cookie consent banner | Medium | Low-Medium — depends on legal requirements |
| 12 | **GAP-FTR-08**: Product images in footer headline area | Low | Low |
| 13 | **GAP-HERO-03**: Responsive video (mobile-specific) | Medium | Low — single video works fine |

---

## Summary: Skor Akhir

### Alfa Beauty MENANG di:
- Parallax depth (4 layers vs 1)
- Scroll-driven content effects (blur, translate, opacity)
- Carousel engine (Embla > GSAP slider)
- Card hover interaction depth (7-layer)
- Footer reveal mechanism (fixed + spacer)
- Ken Burns ambient motion
- Grain overlay system
- Session-aware preloader
- RAF-debounced scroll handling
- Developer experience (React lifecycle > manual GSAP cleanup)
- Code splitting (route-based vs monolith bundle)

### Yucca MENANG di:
- **Conversion architecture** (CTA + FAQ di SETIAP halaman)
- **Trust engineering** (14 certification badges prominent)
- **Navigation-as-sales-tool** (CTA cards + image swap in mega-menu)
- **Content density** (4-row marquee, more sections per page)
- **Floating product imagery** (hero cutout, footer product images)
- **E-commerce integration** (product carousel with pricing)

### Kesimpulan Arsitektural
Alfa Beauty secara teknis **lebih advanced** pada animation depth, modern architecture (RSC, route splitting), dan micro-interaction polish. Namun Yucca **lebih efektif secara konversi** karena architectural decisions yang menempatkan conversion touchpoints (FAQ, CTA, badges, CTA-in-nav) di **setiap halaman** secara konsisten. 

Gap terbesar bukan pada teknologi atau animasi (Alfa sudah comparable atau bahkan unggul), melainkan pada **conversion pattern distribution** — seberapa banyak touchpoint konversi dan trust signal yang tersebar merata di seluruh situs.
