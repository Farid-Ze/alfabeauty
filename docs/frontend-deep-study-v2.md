# Alfa Beauty Frontend — Deep Study v2

> **Generated**: Phase 14 — Full frontend codebase analysis  
> **Codebase**: `frontend/` directory, Next.js 16 App Router  
> **Scope**: 62 TSX/TS source files, ~7,500+ lines of application code  
> **Build**: ✅ 0 errors, 74/74 static pages

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Technology Stack](#2-technology-stack)
3. [File Structure & Inventory](#3-file-structure--inventory)
4. [Routing & Pages](#4-routing--pages)
5. [Layout System](#5-layout-system)
6. [Design System — CSS](#6-design-system--css)
7. [Motion System — Framer Motion](#7-motion-system--framer-motion)
8. [Motion System — CSS Animations](#8-motion-system--css-animations)
9. [Component Catalog — Sections](#9-component-catalog--sections)
10. [Component Catalog — Nav Panels (Mega-Menu)](#10-component-catalog--nav-panels)
11. [Component Catalog — Page Content](#11-component-catalog--page-content)
12. [Component Catalog — Motion Wrappers](#12-component-catalog--motion-wrappers)
13. [Component Catalog — Providers](#13-component-catalog--providers)
14. [Component Catalog — UI Primitives](#14-component-catalog--ui-primitives)
15. [Component Catalog — Hooks](#15-component-catalog--hooks)
16. [Data Layer](#16-data-layer)
17. [Server Actions & Backend](#17-server-actions--backend)
18. [Forms & Validation](#18-forms--validation)
19. [Analytics & Tracking](#19-analytics--tracking)
20. [Security](#20-security)
21. [SEO & Metadata](#21-seo--metadata)
22. [Accessibility](#22-accessibility)
23. [Performance & Optimization](#23-performance--optimization)
24. [Public Assets](#24-public-assets)
25. [Component Statistics](#25-component-statistics)
26. [Architecture Patterns Summary](#26-architecture-patterns-summary)

---

## 1. Architecture Overview

### Core Architecture Pattern

```
Next.js 16 App Router (RSC-first)
├── Server Components (default) → page shells, data fetching, SEO
├── Client Components ("use client") → interactivity, animation, forms
├── Server Actions → form submissions, Supabase writes
└── Static Generation (SSG) → all 74 pages fully pre-rendered at build
```

### Component Hierarchy

```
RootLayout (Server)
├── LenisProvider (Client) — smooth scroll context
│   └── Preloader (Client) — cinematic brand reveal, session-gated
│       ├── Skip-to-content link
│       ├── AnnouncementBar (Client) — dismissible, session-persisted
│       ├── SiteHeader (Client) — fixed, scroll-aware, mega-menu
│       ├── PageTransition (Client) — AnimatePresence crossfade
│       │   └── {Page Content}
│       └── MegaFooter (Client) — fixed reveal-underneath pattern
├── GoogleAnalytics
└── FB Pixel noscript fallback
```

### Rendering Strategy

| Strategy | Where |
|----------|-------|
| **Static (SSG)** | ALL 74 pages — no ISR, no SSR |
| **Server Components** | Page shells, page content components (About, Contact, Education, etc.) |
| **Client Components** | Interactive sections (Hero, Header, Footer, Carousels, Forms, Filters) |
| **Dynamic Imports** | `ContactForm`, `PartnershipForm` — lazy-loaded with skeleton fallbacks |
| **Edge Runtime** | `opengraph-image.tsx` only |

---

## 2. Technology Stack

### Core Framework

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.1.6 | App Router, RSC, SSG, Image Optimization |
| React | 19.2.3 | UI runtime (RC → latest stable) |
| TypeScript | 5.x | Type safety |
| Turbopack | built-in | Dev server bundler (root `..`) |

### Styling & Design

| Technology | Version | Purpose |
|-----------|---------|---------|
| Tailwind CSS | 4.x | Utility-first styling |
| tw-animate-css | latest | Tailwind animation utilities |
| shadcn/ui | new-york style | Component primitives (Radix-based) |
| CSS Custom Properties | — | Design tokens, fluid type, easing curves |

### Animation

| Technology | Version | Purpose |
|-----------|---------|---------|
| Framer Motion | 12.34.x | Scroll-linked, variant-based animations |
| Lenis | 1.3.18 | Smooth scroll engine |
| CSS Keyframes | — | Marquee, grain, Ken Burns, shimmer, counters |
| IntersectionObserver | native | TextReveal, counter triggering, video lazy-load |

### Data & Backend

| Technology | Version | Purpose |
|-----------|---------|---------|
| Supabase | @supabase/supabase-js | Database (contacts, leads tables) |
| Resend | latest | Transactional email notifications |
| Zod | 4.x | Schema validation (client + server) |

### Other

| Technology | Purpose |
|-----------|---------|
| Embla Carousel 8.6 | Brand carousel with autoplay |
| Lucide React | Icon library |
| Sharp | Build-time image optimization |
| next/font | Montserrat font (weights 300-700) |

### Dev Tooling

| Tool | Purpose |
|------|---------|
| ESLint | next core-web-vitals + typescript + jsx-a11y |
| TypeScript strict mode | `noEmit`, bundler resolution |
| `@/*` path alias | Maps to `./src/*` |

---

## 3. File Structure & Inventory

```
frontend/src/
├── middleware.ts                          # CSP nonce generation
├── app/
│   ├── layout.tsx                        # Root layout (Server)
│   ├── page.tsx                          # Homepage (Server)
│   ├── globals.css                       # Design system (~900 lines)
│   ├── error.tsx                         # Error boundary (Client)
│   ├── loading.tsx                       # Loading skeleton (Server)
│   ├── not-found.tsx                     # 404 page (Server)
│   ├── manifest.ts                       # PWA manifest
│   ├── robots.ts                         # robots.txt
│   ├── sitemap.ts                        # XML sitemap
│   ├── opengraph-image.tsx               # Dynamic OG image (Edge)
│   ├── about/page.tsx                    # About page
│   ├── contact/page.tsx                  # Contact page
│   ├── education/page.tsx                # Education hub
│   ├── education/events/[id]/page.tsx    # Event detail (SSG)
│   ├── education/articles/[id]/page.tsx  # Article detail (SSG)
│   ├── partnership/page.tsx              # Partnership page
│   ├── privacy/page.tsx                  # Privacy policy
│   ├── products/page.tsx                 # Product catalog
│   ├── products/[id]/page.tsx            # Product detail (SSG)
│   ├── terms/page.tsx                    # Terms & conditions
│   └── api/leads/export/route.ts         # CSV export endpoint
├── actions/
│   ├── submit-contact.ts                 # Contact form → Supabase + Email
│   └── submit-lead.ts                    # Partnership lead → Supabase + Email
├── components/
│   ├── about/about-page-content.tsx      # ~390 lines, 8 sections
│   ├── contact/
│   │   ├── contact-page-content.tsx      # ~245 lines, 4 sections
│   │   └── contact-form.tsx              # ~292 lines, Zod + honeypot
│   ├── education/
│   │   ├── education-page-content.tsx    # ~310 lines, 7 sections
│   │   ├── education-events-filter.tsx   # ~185 lines, search + filter
│   │   ├── article-detail-content.tsx    # ~190 lines, prose layout
│   │   ├── event-detail-content.tsx      # ~305 lines, sticky sidebar
│   │   ├── education-data.ts             # ~350 lines, 10 events + 5 articles
│   │   └── education-constants.ts        # ~26 lines, EventType filters
│   ├── legal/
│   │   ├── privacy-page-content.tsx      # ~73 lines
│   │   └── terms-page-content.tsx        # ~68 lines
│   ├── motion/
│   │   ├── fade-in.tsx                   # ~107 lines, scroll-reveal wrapper
│   │   └── text-reveal.tsx               # ~163 lines, CSS word/char stagger
│   ├── partnership/
│   │   ├── partnership-page-content.tsx   # ~240 lines, 5 sections
│   │   └── partnership-form.tsx           # ~530 lines, 13-field lead form
│   ├── products/
│   │   ├── products-page-content.tsx      # ~310 lines, multi-filter grid
│   │   ├── product-detail-content.tsx     # ~162 lines (Server)
│   │   ├── product-whatsapp-cta.tsx       # ~28 lines (Server)
│   │   └── product-data.ts               # ~650 lines, 45 products
│   ├── providers/
│   │   ├── lenis-provider.tsx             # ~83 lines, smooth scroll
│   │   ├── preloader.tsx                  # ~131 lines, brand intro
│   │   └── page-transition.tsx            # ~35 lines, route crossfade
│   ├── sections/
│   │   ├── hero.tsx                       # ~210 lines, video parallax
│   │   ├── site-header.tsx                # ~230 lines, mega-menu
│   │   ├── mega-footer.tsx                # ~240 lines, reveal-underneath
│   │   ├── announcement-bar.tsx           # ~65 lines, dismissible
│   │   ├── about.tsx                      # ~175 lines, counters + clipPath
│   │   ├── brand-carousel.tsx             # ~225 lines, Embla + autoplay
│   │   ├── feature-split.tsx              # ~165 lines, reversible 2-col
│   │   ├── partnership.tsx                # ~175 lines, benefit cards
│   │   ├── pre-footer-cta.tsx             # ~105 lines, dark CTA band
│   │   ├── marquee.tsx                    # ~100 lines, reusable CSS scroll
│   │   └── nav/
│   │       ├── products-panel.tsx         # ~107 lines, 5-phase animation
│   │       ├── brands-panel.tsx           # ~96 lines, 4-col cards
│   │       ├── education-panel.tsx        # ~107 lines, 2×2 grid + sidebar
│   │       ├── partnership-panel.tsx      # ~85 lines, 3-col cards
│   │       └── mobile-menu.tsx            # ~143 lines, accordion nav
│   └── ui/
│       ├── animated-button.tsx            # ~96 lines, fill-sweep hover
│       ├── whatsapp-cta.tsx               # ~85 lines, tracked WA link
│       ├── form-field.tsx                 # ~62 lines, label + error wrapper
│       ├── button.tsx                     # shadcn
│       ├── badge.tsx                      # shadcn
│       ├── accordion.tsx                  # shadcn
│       ├── checkbox.tsx                   # shadcn
│       ├── navigation-menu.tsx            # shadcn (Radix)
│       ├── select.tsx                     # shadcn
│       ├── separator.tsx                  # shadcn
│       └── sheet.tsx                      # shadcn (mobile menu drawer)
├── hooks/
│   └── use-animations.tsx                 # ~194 lines, 6 animation hooks
└── lib/
    ├── analytics.ts                       # ~57 lines, GA4 + FB + Clarity
    ├── config.ts                          # ~200 lines, site constants
    ├── email.ts                           # ~81 lines, Resend wrapper
    ├── logger.ts                          # ~28 lines, structured logging
    ├── motion.ts                          # ~730 lines, 30 variant sections
    ├── rate-limit.ts                      # ~43 lines, sliding window IP
    ├── supabase.ts                        # ~37 lines, admin client
    ├── utils.ts                           # ~30 lines, cn() + formatDate()
    └── validations/
        ├── contact.ts                     # ~68 lines, contact schema
        ├── lead.ts                        # ~103 lines, lead schema
        └── validation-utils.ts            # ~33 lines, phone/error utils
```

**Total**: 62 TSX/TS files, ~7,500+ lines of application code

---

## 4. Routing & Pages

### Static Routes (8)

| Route | Page | Sections |
|-------|------|----------|
| `/` | Homepage | Hero → Marquee → About → BrandCarousel → FeatureSplit → Partnership → PreFooterCTA |
| `/products` | Product Catalog | Filter toolbar + sidebar + 3-4 col product grid |
| `/education` | Education Hub | Hero → Stats → Featured Event → Upcoming → Past → Articles → CTA |
| `/partnership` | Partnership | Hero → Dual Benefits → 3-Step Process → Form → Quote |
| `/about` | About Us | Hero → Stats → Timeline → Pillars → Mission/Vision → Brands → Team → CTA |
| `/contact` | Contact | Hero → Form + Info Cards → FAQ Accordion → CTA |
| `/privacy` | Privacy Policy | Single-column prose |
| `/terms` | Terms & Conditions | Single-column prose |

### Dynamic Routes (3, SSG via generateStaticParams)

| Route | Items | Data Source |
|-------|-------|-------------|
| `/products/[id]` | 45 products | `product-data.ts` → `getAllProductIds()` |
| `/education/events/[id]` | 10 events | `education-data.ts` → `getAllEventIds()` |
| `/education/articles/[id]` | 5 articles | `education-data.ts` → `getAllArticleIds()` |

### API Route (1)

| Route | Method | Purpose | Auth |
|-------|--------|---------|------|
| `/api/leads/export` | GET | CSV export of leads | Token-based (`timingSafeEqual`) |

### Special Pages

| Page | Type | Behavior |
|------|------|----------|
| `error.tsx` | Client | Error boundary: "Try Again" + "Back to Home" |
| `not-found.tsx` | Server | 404: "Back to Home" + "Browse Products" |
| `loading.tsx` | Server | Minimal pulse skeleton |

---

## 5. Layout System

### Root Layout (`layout.tsx`)

```
<html lang="id">
  <head>
    JSON-LD (Organization schema)
    Microsoft Clarity (conditional)
    Facebook Pixel (conditional)
  </head>
  <body className={montserrat.variable}>
    <LenisProvider>
      <Preloader>
        <a href="#main-content"> (skip link)
        <AnnouncementBar />
        <SiteHeader />
        <PageTransition>{children}</PageTransition>
        <MegaFooter />
      </Preloader>
    </LenisProvider>
    <GoogleAnalytics />
    <noscript>FB Pixel</noscript>
  </body>
</html>
```

### Font System

- **Primary**: Montserrat (Google Fonts via `next/font`)
- **Weights**: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **CSS Variable**: `--font-montserrat`
- **Loading**: Font swap, preloaded

### Spacing & Container

- **Max-width**: `1400px` (consistent across all sections)
- **Horizontal padding**: `px-6 sm:px-8 lg:px-12`
- **Section vertical spacing**: `py-24 sm:py-32 lg:py-40` (varies)
- **Header height**: CSS variable `--header-height`

---

## 6. Design System — CSS

`globals.css` contains ~900 lines organized into 15 numbered sections.

### §1 Design Tokens

**Colors (Brand)**
```css
--brand-crimson: #a4161a   /* Primary red */
--brand-dark: #660708      /* Deep burgundy */
--surface: #f6f5f0         /* Warm cream background */
--charcoal: #333333        /* Text body */
--whatsapp: #25d366        /* WhatsApp green */
```

**Brand Gradient Stops**: Each of the 4 brands (Alfaparf, Farmavita, Montibello, Gamma+) has unique gradient-start and gradient-end colors for card backgrounds.

**Shadows (Warm-tinted)**:
- `--shadow-warm-sm` through `--shadow-warm-xl` — all use `rgba(102, 7, 8, ...)` for burgundy-tinted depth

**Status Colors**: success, warning, info, error

**Easing Curves**:
```css
--ease: cubic-bezier(0.25, 0.1, 0.25, 1)
--ease-menu-open: cubic-bezier(0.22, 1, 0.36, 1)
--ease-menu-close: cubic-bezier(0.42, 0, 0.58, 1)
```

**Border Radius** (Sharp system — "Aesop brutalism"):
```css
--radius-xs: 0px
--radius-sm: 1px
--radius-md: 2px
--radius-lg: 3px
--radius-xl: 4px
```

### §1b Fluid Type Scale

10 levels using `clamp()` for viewport-responsive sizing:

| Token | Min | Preferred | Max |
|-------|-----|-----------|-----|
| `--fluid-display-xl` | 3rem | 6vw | 5.5rem |
| `--fluid-display` | 2.5rem | 5vw | 4.5rem |
| `--fluid-h1` | 2rem | 3.5vw | 3rem |
| `--fluid-h2` | 1.5rem | 2.5vw | 2.25rem |
| `--fluid-h3` | 1.25rem | 2vw | 1.75rem |
| `--fluid-body` | 0.9375rem | 1.1vw | 1.0625rem |
| `--fluid-sm` | 0.8125rem | 0.95vw | 0.9375rem |
| `--fluid-xs` | 0.6875rem | 0.8vw | 0.8125rem |
| `--fluid-tiny` | 0.625rem | 0.7vw | 0.75rem |

**Legacy Utility Classes**: `.eyebrow`, `.heading-display`, `.heading-section`, `.body-prose` (used throughout all components)

### §2–§15 CSS Utility Classes

| Section | Class(es) | Purpose |
|---------|-----------|---------|
| §2 | `.btn-animated`, `.btn-fill` | Button fill-sweep hover (translateY 104%→0%) |
| §3 | `.reveal-text` | Line-by-line text reveal with IntersectionObserver |
| §3b | `.reveal-text-v3`, `.reveal-word` | Word-by-word reveal with `--stagger-ms` CSS var |
| §4 | `.link-animated` | Underline grow-from-left on hover |
| §5 | `.img-zoom-wrapper` | Image scale(1.06) + brightness on hover |
| §5b | `.grain-overlay[-strong|-subtle]` | Noise texture via SVG filter (`feTurbulence`) at 3 intensities |
| §5c | `.fade-mask-x[-subtle]` | Horizontal edge fade for carousels |
| §6 | `.shadow-warm-{sm,md,lg,xl}` | Warm-tinted box shadows |
| §6b | `.glass[-dark,-surface,-warm,-strong]` | 5 glassmorphism variants (backdrop-filter blur) |
| §6c | `.border-grow-x`, `.border-grow-y` | Animated border line growth |
| §6d | shimmer bar | Progress bar shimmer animation |
| §6e | `.fade-mask-y` | Vertical edge fade |
| §7 | `.marquee-track[-reverse]` | CSS infinite horizontal scroll |
| §8 | `prefers-reduced-motion` | Disables all animation/transition |
| §9 | `.vignette-warm`, `.ken-burns`, `.cursor-grab-active`, `.counter-glow`, `.menu-img-zoom`, `.snap-x-mandatory` | Cinematic atmosphere utilities |
| §10 | `.announcement-bar` | Top banner gradient styling |
| §11 | `.pre-footer-cta` | Dual radial warm glow + edge darkening |
| §12 | `.mega-card-5phase` | Mega-menu orchestrated card hover glow |
| §13 | `.pillar-card` | Hero glass cards with hover lift |
| §14 | `.will-change-filter/clip/backdrop` | Performance hints |
| §15 | `.trust-badge` | Pill-style trust indicator |

### Keyframes

| Keyframe | Purpose |
|----------|---------|
| `mega-content-in` | Mega-menu panel entrance |
| `shimmer` | Loading bar sweep |
| `grain` | Noise texture movement |
| `marquee` | Horizontal scroll left |
| `marquee-reverse` | Horizontal scroll right |
| `ken-burns-pan` | Slow ambient image movement |
| `counter-pulse-glow` | Counter completion pulse |

---

## 7. Motion System — Framer Motion

`motion.ts` contains **730+ lines** organized into **30 numbered sections** of Framer Motion `Variants`.

### §1 Easing Curves (7)

| Name | Type | Feel |
|------|------|------|
| `smoothEase` | cubic-bezier | Smooth decelerate |
| `cinematicEase` | cubic-bezier | Dramatic slow-in |
| `snappyEase` | cubic-bezier | Quick response |
| `decelerateEase` | cubic-bezier | Gentle stop |
| `anticipateEase` | cubic-bezier | Wind-up micro-dip |
| `exitEase` | cubic-bezier | Clean exit |
| `elasticSettle` | spring | Bounce settle |

### §2 Parallax Constants

| Level | Amount | Use Case |
|-------|--------|----------|
| `micro` | 0.04 | Subtle depth |
| `subtle` | 0.08 | Background elements |
| `default` | 0.15 | Standard parallax |
| `strong` | 0.25 | Emphasis |
| `hero` | 0.35 | Hero video |

### §3 Orchestration Timing

```
PRELOADER_DURATION = 2.6s
HERO_TIMING:
  eyebrowDelay  = preloader + 0.15
  headlineDelay = preloader + 0.30
  bodyDelay     = preloader + 0.55
  ctaDelay      = preloader + 0.70
  pillarDelay   = preloader + 0.90
```

### §4–§30 Variant Catalog

| Section | Variant(s) | Used By | Pattern |
|---------|-----------|---------|---------|
| §4 | `staggerContainer`, `fadeInUp`, `fadeInScale`, `fadeIn`, `fadeInBlur` | General page content | Container + children stagger |
| §5 | `cardStagger`, `cardFadeUp`, `cardFadeScale` | BrandCarousel, Partnership, MegaFooter | Card grid reveals |
| §6 | `listStagger`, `listItemFadeIn` | FeatureSplit, Partnership, MegaFooter | Bulleted lists |
| §7 | `panelStagger`, `panelFadeUp`, `panelFadeScale`, `panelFadeOnly`, `panelItemSlide` | Mega-menu panels | Overlay panels |
| §7b | `mobileMenuStagger`, `mobileMenuItemFade` | MobileMenu | Accordion nav |
| §8 | `slideInLeft`, `slideInRight` | Section transitions | Horizontal wipes |
| §9 | `clipRevealUp/Left/Right/Down` | Various | ClipPath reveals (4 directions) |
| §10 | `imageRevealContainer`, `imageRevealInner`, `imageRevealHorizontal` | Image sections | Composite image unveils |
| §11 | `scaleIn` | General | Scale 0.85→1 entrance |
| §12 | `glassBadgeReveal` | About, FeatureSplit | Floating glass badges |
| §13 | `counterStagger`, `counterFadeUp` | About section | Animated counters |
| §14 | `dividerReveal` | About section | ScaleY line separators |
| §15 | `staggerFast/Medium/Slow` | Various | Reusable stagger presets |
| §16 | `floatingFadeIn` | MegaFooter | Delayed floating elements |
| §17 | `numberedIndexReveal` | Various | Number + underline reveal |
| §18 | `megaMenuStagger`, `megaMenuItemReveal` | Nav panels | Enhanced stagger |
| §19 | `heroCharStagger`, `heroCharReveal` | Hero | Character-level stagger |
| §20 | `scrollIndicatorReveal` | Hero | Pulsing scroll hint |
| §21 | `counterPulse` | About | Scale + text-shadow pulse |
| §22 | `kenBurnsVariant` | Images | 20s infinite pan loop |
| §23 | `carouselCardHover` | BrandCarousel | y:-8, scale:1.015 on hover |
| §24 | `glassPanelReveal` | Glass elements | Blur→clear + backdrop-filter |
| §25 | `ctaDramaticReveal` | CTA buttons | y:24→0, scale:0.92→1, blur |
| §26 | `splitImageReveal`, `splitTextCascade`, `splitTextItem` | FeatureSplit | Asymmetric left/right wipe |
| §27 | `megaMenuCard*` (7 variants) | Nav panels | **5-phase orchestrated timeline** (Yucca pattern): BgReveal → MediaScale → TextLine → BorderGrow → LinkSlide |
| §28 | `announcementSlide` | AnnouncementBar | Slide-down entrance |
| §29 | `preFooterReveal` | PreFooterCTA | y:60→0, scale:0.95→1 |
| §30 | `pillarCardStagger`, `pillarCardReveal` | Hero | Glass card depth reveals |

---

## 8. Motion System — CSS Animations

### TextReveal (Pure CSS + IntersectionObserver, no Framer Motion)

```
Three split modes: line | word | char
├── CSS variables: --word-index, --stagger-ms (default 50ms)
├── States: translateY(110%) → translateY(0%) on .is-visible
├── Optional blur: filter: blur(4px) → blur(0px)
├── IntersectionObserver: threshold 0.15, rootMargin -60px
└── Accessibility: sr-only span for screen readers, aria-hidden on visual
```

### Marquee (Pure CSS)

```
Two variants: .marquee-track | .marquee-track-reverse
├── Duration: CSS variable --marquee-duration (default 40s)
├── Loop: Duplicate children, translateX(0% → -50%)
├── Pause on hover via animation-play-state: paused
└── Edge fading via .fade-mask-x class
```

### Preloader (Framer Motion + requestAnimationFrame)

```
Phase 1: Progress counter 0→100% (quintic ease, 1.6s)
Phase 2: Shimmer bar fills (scaleX 0→1)
Phase 3: Split-wipe exit (top half scaleY→0 upward, bottom half scaleY→0 downward)
Duration: ~2.6s total
Session-gated: Skip on return visits (sessionStorage)
```

---

## 9. Component Catalog — Sections

### HeroSection (`hero.tsx`) — ~210 lines, Client

**Architecture**: Video background → 5-layer gradient overlay → Content → Pillar cards → ScrollIndicator

**Video System**:
- Lazy-loaded via IntersectionObserver (only loads when visible)
- `hero-bg.mp4` with `hero-poster.jpg` fallback
- Scroll parallax: videoY (0→120px), videoScale (1→1.18), contentOpacity (1→0 at 35%), contentY (0→-120), contentBlur (0→10px)

**5-Layer Overlay**:
1. Left→right black gradient (opacity 0.65)
2. Top→bottom black gradient (opacity 0.45)
3. Brand-dark diagonal gradient (opacity 0.3)
4. Warm radial vignette
5. Atmospheric horizontal edge darkening

**Content (orchestrated timing from HERO_TIMING)**:
- Eyebrow: "Established since 2007" — FadeIn
- H1: "Connecting Global / Hair Innovation to / Indonesia's Professionals" — TextReveal char split + blur
- Body paragraph — FadeIn
- 2 CTA buttons (Explore Our Brands + Partner With Us)
- 3 Pillar CTA cards (Products 01, Education 02, Partnership 03) — glass cards

---

### SiteHeader (`site-header.tsx`) — ~230 lines, Client

**Architecture**: Fixed header with 3-column CSS grid (1fr auto 1fr)

**Behavior States**:
1. **Transparent** (top of page, homepage) → glass overlay
2. **Solid** (scrolled / non-homepage) → white background with shadow
3. **Hidden** (scrolling down) → translateY(-100%)
4. **Visible** (scrolling up / hovering) → translateY(0)
5. **Mega-menu open** → dark overlay, Lenis scroll lock

**Navigation**: 6 items
- Products → mega-menu ProductsPanel
- Brands → mega-menu BrandsPanel
- Education → mega-menu EducationPanel
- Partnership → mega-menu PartnershipPanel
- About → direct link
- Contact → direct link

**Mobile**: Sheet drawer with MobileMenu component (accordion navigation)

---

### MegaFooter (`mega-footer.tsx`) — ~240 lines, Client

**Pattern**: "Reveal underneath" — footer is `position: fixed`, content scrolls away to reveal it. `ResizeObserver` dynamically sizes a spacer div.

**Sections**:
1. Headline + scroll-to-top button
2. Animated separator line
3. Logo wordmark (parallax) + 3 pillar cards grid
4. Trust badges row
5. Bottom bar (copyright + social icons + legal links)
6. Floating WhatsApp FAB (bottom-right)

---

### AboutSection (`about.tsx`) — ~175 lines, Client

**Key Features**:
- Image with vertical clipPath reveal (`inset(100% 0% 0% 0%)` → `inset(0%)`) + parallax + Ken Burns
- Glass badge overlay
- 3 animated counters (years, brands, provinces) with useCountUp + completion glow
- Stat dividers with scaleY reveal

---

### BrandCarousel (`brand-carousel.tsx`) — ~225 lines, Client

**Key Features**:
- Embla Carousel with autoplay (5s delay), loop, snap-mandatory
- Slide basis: 85% → 60% → 45% → 30% (responsive)
- Drag feedback (container scales to 0.995)
- Scroll progress bar (scaleX transform)
- Keyboard navigation (ArrowLeft/Right)
- Pagination dots

---

### FeatureSplit (`feature-split.tsx`) — ~165 lines, Client

**Key Features**:
- Reversible 2-column layout via `reverse` prop (RTL direction trick)
- Horizontal clipPath image reveal (direction flips with reverse)
- Glass badge, Ken Burns background
- 3-item numbered capability list
- Italic pull quote

---

### PartnershipSection (`partnership.tsx`) — ~175 lines, Client

**Key Features**:
- Parallax background image at 4% opacity with Ken Burns
- 2 PartnerCard sub-components (Principal / Salon) with accent colors
- Large typographic numbered badges (01, 02)
- Dual CTA: AnimatedButton + WhatsAppCTA

---

### Others

| Component | Lines | Key Feature |
|-----------|-------|-------------|
| `PreFooterCTA` | ~105 | Dark inverted section, CSS marquee at 4% opacity, 3-layer atmosphere |
| `Marquee` | ~100 | Reusable CSS scroll, configurable speed/gap/rows/direction, `role="marquee"` |
| `AnnouncementBar` | ~65 | Dismissible (sessionStorage), AnimatePresence slide |

---

## 10. Component Catalog — Nav Panels

All 4 desktop mega-menu panels share the **5-phase orchestrated animation** pattern (inspired by Yucca's `createCardTl`):

```
Phase 1: megaMenuCardBgReveal   — clipPath inset(100%) → inset(0%)
Phase 2: megaMenuCardMediaScale  — scale 1.35→1
Phase 3: megaMenuCardTextLine    — y: 100%→0% (staggered per line)
Phase 4: megaMenuCardBorderGrow  — scaleX: 0→1
Phase 5: megaMenuCardLinkSlide   — y: 100%→0%
```

| Panel | Layout | Content |
|-------|--------|---------|
| **ProductsPanel** | 2-col (1.1fr 1fr) | Featured product card + 6 category grid |
| **BrandsPanel** | 4-col | 4 brand cards with logo, origin, flag |
| **EducationPanel** | 2-col (1fr auto) | 2×2 education items + CTA sidebar |
| **PartnershipPanel** | 3-col with gap-px | 3 partnership type cards |
| **MobileMenu** | Full-height flex column | Accordion sections + WhatsApp CTA |

---

## 11. Component Catalog — Page Content

### Products Page (`products-page-content.tsx`) — ~310 lines, Client

**Features**:
- Multi-filter system: brand + audience + category + text search
- Sort: latest, name A-Z/Z-A, brand
- Sidebar filters (checkboxes, desktop-only, sticky)
- Dynamic grid: 3-col (with filters) / 4-col (without)
- Promo banner card + Partnership CTA card interspersed in grid
- Empty state with WhatsApp CTA
- Brand-specific gradient backgrounds on cards without images

### Product Detail (`product-detail-content.tsx`) — ~162 lines, Server (!)

- Server component — zero client JS
- Breadcrumb → 2-col hero (image + details) → Info slides (horizontal scroll) → Gallery grid → Application + Recommendations
- WhatsApp CTA with pre-filled product inquiry message

### About Page (`about-page-content.tsx`) — ~390 lines, Server

- 8 sections: Hero → Stats → Timeline (5 milestones, alternating) → Pillars (3 cards) → Mission/Vision (2 cards) → Brand Portfolio (4 cards) → Team (4 placeholders) → CTA

### Contact Page (`contact-page-content.tsx`) — ~245 lines, Server

- Dynamic import of ContactForm with skeleton
- 3 info cards (address, phone/email, hours) + WhatsApp CTA
- FAQ accordion (6 Q&As)

### Education Page (`education-page-content.tsx`) — ~310 lines, Server

- Featured event (large 2-col card) → Upcoming events (delegated to EducationEventsFilter client component) → Past events (compact list) → Articles grid (3-col)

### Partnership Page (`partnership-page-content.tsx`) — ~240 lines, Server

- Dual benefit cards (Principal vs Salon) → 3-step process → Form section (dynamic import) with WhatsApp sidebar

### Legal Pages — ~70 lines each, Server, static prose

---

## 12. Component Catalog — Motion Wrappers

### FadeIn (`fade-in.tsx`) — ~107 lines, Client

```typescript
Props: {
  direction?: "up" | "down" | "left" | "right" | "none"  // default "up"
  blur?: boolean      // 6px→0px blur reveal
  scale?: boolean     // 0.96→1 scale entrance
  dramatic?: boolean  // cinematicEase, 0.9s duration
  stagger?: number    // index × 0.08s delay
  amount?: number     // IntersectionObserver threshold
  offset?: number     // translate distance (default 32px)
}
```
- Uses `whileInView` with `viewport.once = true`, margin `-60px`
- 2 ease modes: drama tic → `cinematicEase` 0.9s / standard → `smoothEase` 0.6s

### TextReveal (`text-reveal.tsx`) — ~163 lines, Client

```typescript
Props: {
  children: string | ReactNode
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"   // default "h2"
  split?: "line" | "word" | "char"                   // default "word"
  staggerMs?: number       // CSS variable --stagger-ms (default 50ms)
  blur?: boolean           // enable blur reveal
  threshold?: number       // IntersectionObserver (default 0.15)
  rootMargin?: string      // default "-60px"
  delay?: number           // ms delay before triggering
  className?: string
}
```
- Pure CSS animation (no Framer Motion!)
- Uses IntersectionObserver, CSS variable-driven stagger
- Accessibility: `sr-only` full text + `aria-hidden` visual elements

---

## 13. Component Catalog — Providers

### LenisProvider (`lenis-provider.tsx`) — ~83 lines

**Config**: duration 1.4, easing `1.001 - 2^(-10t)`, touchMultiplier 2.0, wheelMultiplier 1.0  
**Exports**: `useLenis()` — get instance, `useLenisControl()` — `{ stop(), start() }`  
**Respects** `prefers-reduced-motion`  
**RAF loop**: `requestAnimationFrame` for Lenis tick

### Preloader (`preloader.tsx`) — ~131 lines

**Phases**: Logo fade-in → Progress counter 0→100% (quintic ease, 1.6s) → Shimmer bar → Split-wipe exit  
**Duration**: ~2.6s  
**Gate**: `sessionStorage("preloader-seen")` — skip on return visits  
**Elements**: Brand mark SVG, site short name, animated progress, shimmer bar

### PageTransition (`page-transition.tsx`) — ~35 lines

**Pattern**: Framer Motion `AnimatePresence` with `mode="wait"`  
**Animation**: Crossfade — enter `opacity:0, y:10, blur:6px` → visible; exit mirrors with `y:-12`  
**Duration**: 0.45s, `cinematicEase`  
**Key**: `usePathname()` for route change detection

---

## 14. Component Catalog — UI Primitives

### AnimatedButton (`animated-button.tsx`) — ~96 lines

- Fill-sweep hover animation (CSS `.btn-fill` slides up)
- Renders `<Link>` (if href) or `<button>` — NOT wrapping shadcn Button
- Props: `fillClass`, `fillTextClass`, `external`

### WhatsAppCTA (`whatsapp-cta.tsx`) — ~85 lines

- Constructs WhatsApp URL: `WHATSAPP_URL + ?text=encoded_message`
- Fires `trackEvent("cta_whatsapp_click")` on click
- Props: `location`, `productName?`, `message?`, `variant`, `size`
- Default message: Indonesian ("Halo, saya tertarik dengan produk profesional...")

### FormField (`form-field.tsx`) — ~62 lines

- Label + error message wrapper
- Auto-generates ID via `React.useId()`
- Injects `id` and `aria-describedby` onto child via `React.cloneElement`

### shadcn/ui Components

| Component | Base |
|-----------|------|
| Button | Radix Slot, CVA variants |
| Badge | CVA variants |
| Accordion | Radix Accordion |
| Checkbox | Radix Checkbox |
| NavigationMenu | Radix NavigationMenu |
| Select | Radix Select |
| Separator | Radix Separator |
| Sheet | Radix Dialog (as drawer) |

---

## 15. Component Catalog — Hooks

### `use-animations.tsx` — ~194 lines, 6 exports

| Hook/Component | Purpose | Implementation |
|---------------|---------|----------------|
| `useParallax({ speed })` | Scroll-linked Y transform + opacity | `useScroll` + `useTransform` (Framer Motion) |
| `Parallax` | Declarative parallax wrapper | Wraps `useParallax` in a `motion.div` |
| `useScrollProgress()` | Global page scroll 0→1 | `useScroll` → `scrollYProgress` |
| `useCountUp({ target, duration, suffix, prefix, decimals, onComplete })` | Animated counter | IntersectionObserver trigger + quintic easing RAF loop |
| `useLineGrow({ vertical })` / `LineGrow` | Animated line that grows on scroll | `whileInView` scaleX/scaleY 0→1 with `cinematicEase` |
| `ScrollIndicator` | "Scroll" label + vertical line | `scrollIndicatorReveal` variant + CSS pulsing glow |

---

## 16. Data Layer

### Product Data (`product-data.ts`) — ~650 lines

- **45 products** across 3 brands (CORE, Montibello, Gamma+)
- **No pricing data** — WhatsApp inquiry model
- **Rich data per product**: id, name, brand, category, audience, description, image, variants[], gallery[], infoSlides[], keyBenefits[], howToUse?, recommendedFor[], isNew?
- **7 categories**: Hair Color, Hair Care, Hair Styling, Barber Tools, Hair Treatment, Barber Accessories, Salon Products
- **3 brand filters**: CORE, Montibello, Gamma+ Professional
- **Audience filters**: Salon Professional, Barber Professional, Both
- Helper functions: `getProductById()`, `getAllProductIds()`

### Education Data (`education-data.ts`) — ~350 lines

- **10 events** (5 upcoming + 5 past) across all brands
- **5 articles** covering product knowledge, maintenance, clean beauty, scalp health, education culture
- **Event types**: masterclass, workshop, training, event
- Helper functions: `getEventById`, `getArticleById`, `getUpcomingEvents`, `getPastEvents`, `getFeaturedEvent`, `getRelatedEvents`

### Education Constants (`education-constants.ts`) — ~26 lines

- Lightweight client-safe constants (extracted to avoid pulling full data into client bundle)
- `EventType`, `eventTypeFilters` (5), `getEventTypeLabel()`

### Configuration (`config.ts`) — ~200 lines

- Company: `SITE_NAME`, `SITE_SHORT_NAME`, `SITE_DOMAIN`, `ESTABLISHED_YEAR`, `YEARS_OF_EXPERIENCE`
- Contact: `WHATSAPP_NUMBER`, `WHATSAPP_URL`, `CONTACT_EMAIL`, `INSTAGRAM_URL`
- Navigation: `NAV_LINKS` (8 routes with labels/descriptions)
- Brands: 4 brands (Alfaparf Milano, Farmavita, Montibello, Gamma+ Professional) with logo, origin, flag
- `PRODUCT_CATEGORIES`: 6 categories
- `PILLARS`: Products, Education, Partnership
- `LEGAL_LINKS`, `OPERATING_HOURS`, `SITE_ADDRESS`

---

## 17. Server Actions & Backend

### Contact Flow (`submit-contact.ts`)

```
Client form → submitContact(formData)
  ├── Rate limit check (5/min per IP)
  ├── Honeypot check (company field)  → silent success
  ├── Zod validation (contactSchema)
  ├── Supabase insert → contacts table
  ├── Resend email notification
  └── Return { success, errors?, message? }
```

### Lead Flow (`submit-lead.ts`)

```
Client form → submitLead(formData)
  ├── Rate limit check (5/min per IP)
  ├── Honeypot check (company field) → silent success
  ├── Zod validation (leadSchema)
  ├── Supabase insert → leads table (14 columns)
  ├── Resend email notification (rich HTML with profiling)
  └── Return { success, errors?, message? }
```

### CSV Export (`api/leads/export/route.ts`)

```
GET /api/leads/export?token=<CSV_EXPORT_TOKEN>
  ├── Token auth (timingSafeEqual, constant-time)
  ├── Supabase query → all leads, ordered by created_at desc
  ├── CSV generation (17 columns, proper escaping)
  └── Downloadable attachment (Content-Disposition)
```

### Backend Stack

| Service | Purpose | Auth |
|---------|---------|------|
| Supabase | Database (contacts, leads tables) | Service role key, server-only |
| Resend | Email notifications to admin | API key, lazy singleton |
| Rate Limiter | In-memory sliding window | 5 req/60s per IP, auto-cleanup every 5min |

---

## 18. Forms & Validation

### Contact Form (`contact-form.tsx`) — ~292 lines

**Fields**: name, email, phone (optional), subject (6-option Select), message, consent  
**Anti-spam**: Honeypot (`company` field, hidden)  
**Validation**: Zod `contactSchema` (client-side) → server action `submitContact`  
**Success state**: Confirmation message + "Continue on WhatsApp" button  
**GA4**: `lead_form_submit` event

### Partnership Form (`partnership-form.tsx`) — ~530 lines

**Fields (13)**: business_name, salon_type (5 types), city, contact_name, phone_whatsapp, email (optional), + progressive disclosure: chair_count, monthly_spend_range (5 ranges), specialization, current_brands_used, message, consent  
**Anti-spam**: Honeypot + URL tracking (page_url_initial, page_url_current)  
**Validation**: Zod `leadSchema` (client + server)  
**Success state**: Confirmation + pre-filled WhatsApp message in Indonesian  
**GA4**: `lead_form_submit` with salon_type + city

### Shared Validation Infrastructure

- `validation-utils.ts`: `normalizePhone()` (0→+62 prefix), `flattenErrors()` (Zod→Record)
- `contact.ts`: 7-field schema with 6-value subject enum
- `lead.ts`: 15-field schema with salon type + spend range enums

---

## 19. Analytics & Tracking

### Multi-Platform Analytics

| Platform | Method | Trigger |
|----------|--------|---------|
| Google Analytics (GA4) | `next/third-parties` | Auto + `trackEvent()` |
| Microsoft Clarity | Script injection (nonce) | Auto session recording |
| Facebook Pixel | Script injection (nonce) | PageView + `trackEvent()` |

### Custom Events

| Event | Trigger Locations | Params |
|-------|------------------|--------|
| `cta_whatsapp_click` | WhatsAppCTA, SiteHeader, MegaFooter, MobileMenu | `location`, `product_name?` |
| `lead_form_submit` | ContactForm, PartnershipForm | `salon_type`, `city` |

### Configuration

All analytics IDs are environment-variable controlled:
- `NEXT_PUBLIC_GA_ID` → Google Analytics
- `NEXT_PUBLIC_CLARITY_ID` → Microsoft Clarity
- `NEXT_PUBLIC_FB_PIXEL_ID` → Facebook Pixel

Graceful no-ops when SDKs not loaded.

---

## 20. Security

### Content Security Policy (CSP) — `middleware.ts`

- Per-request nonce via `crypto.randomUUID()`
- CSP directives cover: default-src, script-src (nonce + GA + Clarity + FB), style-src, img-src, font-src, connect-src, frame-src, object-src none, base-uri self, form-action self

### Security Headers — `next.config.ts`

| Header | Value |
|--------|-------|
| X-Content-Type-Options | nosniff |
| X-Frame-Options | DENY |
| Referrer-Policy | strict-origin-when-cross-origin |
| Permissions-Policy | camera=(), microphone=(), geolocation=() |
| Strict-Transport-Security | max-age=63072000; includeSubDomains; preload |

### Application Security

| Measure | Where |
|---------|-------|
| Rate limiting (5/min/IP) | Server actions |
| Honeypot anti-spam | Both forms |
| HTML escaping | Email templates |
| `import "server-only"` | supabase.ts, email.ts, rate-limit.ts, logger.ts |
| `timingSafeEqual` | CSV export token auth |
| Zod validation | Client + server (dual validation) |
| No pricing data exposed | WhatsApp inquiry model |

---

## 21. SEO & Metadata

### Root Metadata (`layout.tsx`)

- Title template: `%s | PT Alfa Beauty Cosmetica`
- Description: Comprehensive company description
- OpenGraph: type "website", locale "id_ID"
- Twitter: card "summary_large_image"
- JSON-LD: Organization schema with sameAs social links

### Per-Page Metadata

Every page exports `metadata: Metadata` with unique title, description, and canonical URL.

### Dynamic SEO Files

| File | Generated |
|------|-----------|
| `manifest.ts` | PWA manifest (standalone, crimson theme) |
| `robots.ts` | Allow all, sitemap link |
| `sitemap.ts` | 8 static + 60 dynamic routes with priorities |
| `opengraph-image.tsx` | 1200×630 Edge-generated OG image |

### OG Image

Dynamic generation via `next/og` ImageResponse on Edge runtime. Black background, crimson company name, headline text. No external images — pure JSX rendering.

---

## 22. Accessibility

### Implemented A11y Features

| Feature | Implementation |
|---------|---------------|
| Skip to content | `<a href="#main-content">` with sr-only focus styles |
| Reduced motion | `prefers-reduced-motion` media query disables all animations |
| Semantic HTML | `<header>`, `<main id="main-content">`, `<footer>`, `<section>`, `<nav>` |
| ARIA labels | All interactive elements (buttons, links, FABs) |
| ARIA hidden | All decorative elements (overlays, parallax backgrounds, marquee duplicates) |
| Focus visible | `focus-visible:ring-2` on all interactive elements |
| Screen reader text | TextReveal: `sr-only` full text + `aria-hidden` visual split |
| Keyboard navigation | BrandCarousel: ArrowLeft/Right scoped to section |
| Form accessibility | `FormField`: auto-generated IDs, `aria-describedby` for errors |
| Lang attribute | `<html lang="id">` (Indonesian) |
| Alt text | All meaningful images have descriptive alt text |
| Marquee role | `role="marquee"` with `aria-label` |

### ESLint A11y

- `eslint-plugin-jsx-a11y` (recommended) configured in ESLint

---

## 23. Performance & Optimization

### Build-Time Optimization

| Strategy | Implementation |
|----------|----------------|
| Static Generation (SSG) | All 74 pages pre-rendered at build time |
| Turbopack | Dev server bundler |
| Image formats | AVIF → WebP fallback chain (`next/image`) |
| Font optimization | `next/font/google` (Montserrat, display swap) |
| Tree shaking | Server components = zero client JS |
| Dynamic imports | Forms lazy-loaded with `next/dynamic` |
| Code splitting | Per-route automatic |

### Runtime Optimization

| Strategy | Implementation |
|----------|----------------|
| Lenis smooth scroll | `requestAnimationFrame` loop, respects reduced-motion |
| Lazy video | IntersectionObserver defers hero video load |
| `viewport.once` | All `whileInView` animations fire once — no repeat calculations |
| CSS animations | Marquee, grain, Ken Burns — no JS tick |
| `will-change` hints | `.will-change-filter`, `.will-change-clip`, `.will-change-backdrop` |
| Singleton patterns | Supabase client, Resend client, rate limiter |
| Memoization | SiteHeader uses `useMemo`/`useCallback` for class computation |

### Image Strategy

| Pattern | Where |
|---------|-------|
| `next/image` with AVIF/WebP | All product images, brand logos |
| `priority` loading | Hero poster, above-fold images |
| Responsive `sizes` | Per-component (`25vw`, `(max-width: 768px) 100vw, 50vw`, etc.) |
| `object-contain p-8` | Product images (clean photography) |
| `object-cover` | Background/lifestyle images |
| SVG placeholders | Category/type icons, brand-specific product placeholders |

---

## 24. Public Assets

### Directory Structure

```
public/
├── images/
│   ├── brands/           # 5 brand images (webp)
│   │   ├── alfaparf-milano.webp
│   │   ├── core.webp
│   │   ├── farmavita.webp
│   │   ├── gamma-plus.webp
│   │   └── montibello.webp
│   ├── logo/             # 4 logo variants (SVG)
│   │   ├── alfa-beauty-full-dark.svg
│   │   ├── alfa-beauty-full-light.svg
│   │   ├── alfa-beauty-mark.svg
│   │   └── alfa-beauty-text.svg
│   ├── products/         # Product photography
│   │   ├── core/         # 3 product folders
│   │   ├── gamma-plus/   # 19 product folders
│   │   ├── montibello-gold-oil/  # 2 product folders
│   │   └── montibello-hop/       # 21 product folders
│   └── ui/               # 5 SVG placeholder assets
│       ├── megamenu-product-placeholder.svg
│       └── product-placeholder-{brand}.svg (4)
└── videos/
    ├── hero-bg.mp4       # Hero background video
    └── hero-poster.jpg   # Hero video poster/fallback
```

### Asset Count Summary

| Category | Count |
|----------|-------|
| Brand lifestyle images | 5 (WebP) |
| Logo variants | 4 (SVG) |
| Product photography folders | 45 |
| UI placeholder SVGs | 5 |
| Video assets | 2 (MP4 + JPG poster) |

---

## 25. Component Statistics

### By Type

| Type | Count | Purpose |
|------|-------|---------|
| Server Components | 15 | Page shells, content, SEO |
| Client Components | 25 | Interactivity, animation, forms |
| Server Actions | 2 | Form submission pipelines |
| API Routes | 1 | CSV export |
| Hooks | 6 | Animation, scroll, counter |
| Utility Modules | 9 | Config, utils, validation, analytics |
| Data Modules | 3 | Products, events, articles |

### By Size (Top 10)

| Component | Lines | Type |
|-----------|-------|------|
| `motion.ts` | ~730 | Framer Motion variants library |
| `product-data.ts` | ~650 | 45 products catalog |
| `partnership-form.tsx` | ~530 | 13-field lead form |
| `about-page-content.tsx` | ~390 | 8-section company profile |
| `education-data.ts` | ~350 | 10 events + 5 articles |
| `products-page-content.tsx` | ~310 | Multi-filter product grid |
| `education-page-content.tsx` | ~310 | Education hub |
| `event-detail-content.tsx` | ~305 | Event detail with sticky sidebar |
| `contact-form.tsx` | ~292 | Zod + server action + honeypot |
| `contact-page-content.tsx` | ~245 | Contact + FAQ accordion |

### Client/Server Ratio

```
Client Components: 25 (62.5%)  → interactivity required
Server Components: 15 (37.5%)  → zero client JS shipped
```

---

## 26. Architecture Patterns Summary

### Design Patterns

| Pattern | Description | Where Used |
|---------|-------------|------------|
| **RSC-first** | Server components by default, `"use client"` only when needed | All pages |
| **Section-based composition** | Pages compose ordered section components | Homepage, content pages |
| **Dynamic imports** | Forms lazy-loaded with skeleton fallbacks | ContactForm, PartnershipForm |
| **Config centralization** | All site constants from single `config.ts` | Everywhere |
| **Dual validation** | Zod schemas shared between client + server | Both forms |
| **Honeypot anti-spam** | Hidden `company` field, silent success if filled | Both forms |
| **WhatsApp-first CTA** | Pre-filled Indonesian messages on every conversion point | All pages |
| **Reveal underneath footer** | Fixed footer revealed as content scrolls away | MegaFooter |
| **5-phase card animation** | Orchestrated: BgReveal → MediaScale → TextLine → BorderGrow → LinkSlide | All mega-menu panels |
| **Session-gated preloader** | Cinematic brand intro on first visit only | Preloader |
| **Scroll-direction header** | Auto-hide on scroll-down, reappear on scroll-up | SiteHeader |
| **Lenis scroll lock** | Stop smooth scroll when mega-menu/mobile opens | SiteHeader |
| **Parallax depth system** | 5-level parallax constants (micro→hero) | Hero, About, Feature, Partnership, Footer |
| **Orchestrated timing** | Component entrance delays relative to preloader duration | Hero sequence |

### Animation Philosophy

1. **Motion as narrative** — Animations tell a story (preloader → hero reveal → section by section)
2. **Viewport-triggered, fire-once** — `whileInView` with `viewport.once` for all scroll reveals
3. **Progressive complexity** — Simple fadeIn for text, 5-phase orchestration for key UI elements
4. **CSS for infinite loops** — Marquee, grain, Ken Burns are pure CSS (no JS tick)
5. **Framer Motion for scroll-linked** — Parallax, sticky transforms, entrance sequences
6. **Performance-conscious** — `will-change` hints, `requestAnimationFrame`, memoized classes
7. **Accessible** — Full `prefers-reduced-motion` support, `sr-only` alternatives

### Content Architecture

- **Zero CMS** — All data hardcoded in TypeScript files
- **45 products** across 3 brands (CORE, Montibello, Gamma+) — Alfaparf Milano and Farmavita exist as brands but have no products yet
- **10 education events** (5 upcoming + 5 past) with full detail pages
- **5 articles** with related articles logic
- **No pricing** — WhatsApp inquiry model for all conversions
- **Indonesian market** — Indonesian WhatsApp messages, `lang="id"`, Indonesian legal compliance

### Technology Architecture

```
┌─────────────────────────────────────────────────┐
│                    Frontend                       │
│  Next.js 16 (App Router, SSG)                    │
│  React 19 + TypeScript 5                         │
│  Tailwind CSS 4 + shadcn/ui                      │
│  Framer Motion 12 + Lenis 1.3                    │
├─────────────────────────────────────────────────┤
│                  Server Actions                   │
│  Zod Validation → Rate Limit → Honeypot Check   │
├──────────────────────┬──────────────────────────┤
│    Supabase          │       Resend              │
│  (contacts, leads)   │  (email notifications)    │
└──────────────────────┴──────────────────────────┘
│                  Analytics                        │
│  GA4 + Microsoft Clarity + Facebook Pixel        │
└─────────────────────────────────────────────────┘
```

---

*End of Frontend Deep Study v2 — Phase 14*
