# Alfa Beauty Frontend — Comprehensive Architecture Study

> **Author:** Copilot (Phase 6)  
> **Date:** 2025-07  
> **Scope:** Full analysis of the `frontend/` directory — every file, every pattern.  
> **Files analysed:** 60+ source files read in full.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Technology Stack](#2-technology-stack)
3. [Project Structure](#3-project-structure)
4. [Design System & Tokens](#4-design-system--tokens)
5. [Typography System](#5-typography-system)
6. [Animation & Motion System](#6-animation--motion-system)
7. [Layout Architecture](#7-layout-architecture)
8. [Routing & Pages](#8-routing--pages)
9. [Homepage Sections (Deep Analysis)](#9-homepage-sections-deep-analysis)
10. [Navigation System](#10-navigation-system)
11. [Inner Page Content Components](#11-inner-page-content-components)
12. [Product System](#12-product-system)
13. [Education & Events System](#13-education--events-system)
14. [Form Pipeline & Server Actions](#14-form-pipeline--server-actions)
15. [Reusable UI Components](#15-reusable-ui-components)
16. [Motion Components](#16-motion-components)
17. [Hooks & Utilities](#17-hooks--utilities)
18. [Providers](#18-providers)
19. [Analytics System](#19-analytics-system)
20. [Security Architecture](#20-security-architecture)
21. [SEO & Metadata](#21-seo--metadata)
22. [Performance Strategy](#22-performance-strategy)
23. [Component Version History](#23-component-version-history)
24. [Current Gaps & Recommendations](#24-current-gaps--recommendations)

---

## 1. Executive Summary

Alfa Beauty's frontend is a **Next.js 16 App Router** application built with **React 19**, **TypeScript 5**, **Tailwind CSS 4**, and **Framer Motion 12**. The site serves as a corporate + product catalog for PT Alfa Beauty Cosmetica, Indonesia's professional haircare distributor representing 4 international brands.

**Key architectural decisions:**
- **RSC-first** — all pages are Server Components by default; `"use client"` is used only for interactive sections
- **Centralized motion system** — 600-line `motion.ts` with 26 variant sections and 7 custom easing curves
- **CSS-only design system** — 850-line `globals.css` with @theme inline tokens, 10-level fluid type scale, 5 glassmorphism variants, 3 grain overlay levels
- **Yucca-inspired patterns** — clipPath mega-menu, split-wipe preloader, Ken Burns parallax, cinematic hero overlays
- **OWASP-compliant** — nonce-based CSP, honeypot + rate-limit anti-spam, server-side Zod validation, escapeHtml for emails

**Scale:** ~35 products across 3 brands (CORE, Montibello, Gamma+ Professional), 10 education events, 5 articles, 7 pages, 6 homepage sections, 4 mega-menu panels, 1 mobile menu.

---

## 2. Technology Stack

### Core Framework
| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.1.6 | App Router, RSC, Turbopack |
| React | 19.2.3 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Utility-first CSS |
| shadcn/ui | new-york style | Component library base |

### Animation & Interaction
| Technology | Version | Purpose |
|---|---|---|
| Framer Motion | 12.34 | Primary animation engine |
| Lenis | 1.3.18 | Smooth scrolling |
| Embla Carousel | 8.6 | Brand carousel |

### Backend Services
| Technology | Version | Purpose |
|---|---|---|
| Supabase | 2.95.3 | Database (leads, contacts) |
| Resend | 6.9.2 | Email delivery |
| Zod | 4.3.6 | Schema validation |

### Other
| Technology | Purpose |
|---|---|
| Sharp 0.34.5 | Image optimization |
| Lucide React 0.563 | Icon system |
| class-variance-authority | Button/component variants |
| radix-ui (via shadcn) | Accessible primitives |

### Analytics
- **Google Analytics 4** (gtag)
- **Facebook Pixel** (fbq)
- **Microsoft Clarity** (behavioral/heatmaps)

---

## 3. Project Structure

```
frontend/
├── next.config.ts          # Turbopack, AVIF/WebP, security headers
├── middleware.ts            # Nonce-based CSP per request
├── components.json          # shadcn config (new-york, neutral, rsc)
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root: metadata, JSON-LD, analytics, providers
│   │   ├── page.tsx         # Homepage composition
│   │   ├── globals.css      # Design system (850 lines)
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── education/page.tsx
│   │   ├── partnership/page.tsx
│   │   ├── products/page.tsx
│   │   ├── products/[id]/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   └── api/leads/       # API route
│   ├── actions/
│   │   ├── submit-lead.ts   # Partnership form → Supabase + Resend
│   │   └── submit-contact.ts # Contact form → Supabase + Resend
│   ├── components/
│   │   ├── sections/        # Homepage sections + nav panels
│   │   │   ├── hero.tsx
│   │   │   ├── about.tsx
│   │   │   ├── brand-carousel.tsx
│   │   │   ├── feature-split.tsx
│   │   │   ├── partnership.tsx
│   │   │   ├── mega-footer.tsx
│   │   │   ├── marquee.tsx
│   │   │   ├── site-header.tsx
│   │   │   └── nav/         # 4 desktop panels + mobile menu
│   │   ├── motion/          # FadeIn, TextReveal
│   │   ├── providers/       # Lenis, Preloader, PageTransition
│   │   ├── ui/              # 11 shadcn components + AnimatedButton + WhatsAppCTA
│   │   ├── about/           # AboutPageContent
│   │   ├── contact/         # ContactPageContent, ContactForm
│   │   ├── education/       # EducationPageContent, data, events filter
│   │   ├── partnership/     # PartnershipPageContent, PartnershipForm
│   │   ├── products/        # ProductsPageContent, ProductDetailContent, ProductData
│   │   └── legal/           # PrivacyPageContent, TermsPageContent
│   ├── hooks/
│   │   └── use-animations.tsx # useParallax, useCountUp, useLineGrow, ScrollIndicator
│   └── lib/
│       ├── config.ts        # Site constants, brands, nav links
│       ├── motion.ts        # 600 lines, 26 motion variant sections
│       ├── utils.ts         # cn(), formatDate()
│       ├── analytics.ts     # trackEvent() → GA4 + FB Pixel + Clarity
│       ├── supabase.ts      # Service-role admin client
│       ├── email.ts         # Resend wrapper + escapeHtml
│       ├── rate-limit.ts    # IP-based sliding window (5 req/min)
│       ├── logger.ts        # Structured JSON logging
│       └── validations/     # Zod schemas (lead, contact)
```

---

## 4. Design System & Tokens

### Color Palette (`globals.css` @theme inline)

**Brand Colors:**
| Token | Value | Usage |
|---|---|---|
| `--color-brand-crimson` | `#a4161a` | Primary accent |
| `--color-brand-dark` | `#660708` | Deep accent |
| `--color-brand-light` | `#f6e1e1` | Subtle accent bg |

**Surface Colors:**
| Token | Value | Usage |
|---|---|---|
| `--color-surface` | `#f6f5f0` | Secondary bg (warm off-white) |
| `--color-surface-elevated` | `#eeedea` | Card/elevated surfaces |
| `--color-charcoal` | `#1a1a1a` | Dark elements |
| `--color-foreground` | `#0a0a0a` | Primary text + dark UI |
| `--color-background` | `#ffffff` | Main canvas |

**Mood/Depth Variables:**
| Token | Value | Purpose |
|---|---|---|
| `--warm-overlay` | `rgba(10,10,10,0.5)` | Overlay backdrop |
| `--warm-shadow` | `rgba(10,10,10,0.06)` | Warm shadow base |
| `--border-warm` | `#e5e3de` | Warm border color |
| `--text-muted` | `#6b6b6b` | Muted text |

**Depth Shadows:** `--depth-shadow-sm` → `--depth-shadow-xl` (4 levels)

### Easing Curves
| Custom Property | Value | Usage |
|---|---|---|
| `--ease` | `cubic-bezier(0.22, 1, 0.36, 1)` | Default smooth |
| `--ease-menu-open` | `cubic-bezier(0.16, 1, 0.3, 1)` | Mega-menu open |
| `--ease-menu-close` | `cubic-bezier(0.4, 0, 0.2, 1)` | Mega-menu close |

### Sharp Edges
- `--radius-sm`: 2px  
- `--radius-md`: 4px  
- `--radius-lg`: 4px  
- Almost everything is `0px` or `2–4px` (sharp Yucca aesthetic)

### Header Height
- `--header-height`: `56px` (default) → `72px` (`lg:`)

---

## 5. Typography System

**Font:** Montserrat (300, 400, 500, 600, 700) via `next/font/google`  
**CSS Variable:** `--font-sans: var(--font-montserrat)`

### 10-Level Fluid Type Scale

| Class | Range (min → max) | Usage |
|---|---|---|
| `.text-display-xl` | `clamp(2.5rem, 2rem + 2.5vw, 4.5rem)` | Hero display |
| `.text-display` | `clamp(2rem, 1.5rem + 2vw, 3.5rem)` | Page titles |
| `.text-heading-xl` | `clamp(1.75rem, 1.375rem + 1.5vw, 2.75rem)` | Section headers |
| `.text-heading` | `clamp(1.375rem, 1.125rem + 1vw, 2rem)` | Subsection headers |
| `.text-heading-sm` | `clamp(1.125rem, 1rem + 0.5vw, 1.5rem)` | Card headings |
| `.text-subheading` | `clamp(1rem, 0.9375rem + 0.25vw, 1.25rem)` | Sub-headers |
| `.text-body-lg` | `clamp(0.9375rem, 0.875rem + 0.25vw, 1.125rem)` | Large body |
| `.text-body` | `clamp(0.875rem, 0.84375rem + 0.125vw, 0.9375rem)` | Default body |
| `.text-caption` | `0.8125rem` (fixed) | Captions, labels |
| `.text-tiny` | `clamp(0.6875rem, 0.65rem + 0.15vw, 0.75rem)` | Fine print |

### Legacy Aliases
| Class | Maps to | Additional styles |
|---|---|---|
| `.eyebrow` | `text-tiny` | uppercase, tracking-[0.2em], font-semibold |
| `.heading-display` | `text-display` | font-bold, leading-[1.1], tracking-[-0.025em] |
| `.heading-section` | `text-heading-xl` | font-bold, leading-[1.15], tracking-[-0.02em] |
| `.body-prose` | `text-body` | leading-[1.85], text-charcoal |

---

## 6. Animation & Motion System

### motion.ts — 600 Lines, 26 Sections

#### §1 Easing Curves (7 curves)
```ts
smoothEase     = [0.22, 1, 0.36, 1]     // Default — matches --ease
cinematicEase  = [0.16, 1, 0.3, 1]     // Premium reveals
snappyEase     = [0.25, 1, 0.5, 1]     // Interactive feedback
decelerateEase = [0, 0, 0.2, 1]        // Natural landing
anticipateEase = [0.38, -0.05, 0.26, 1] // Slight pullback
exitEase       = [0.4, 0, 1, 1]        // Exit transitions
elasticSettle  = { type: "spring", stiffness: 300, damping: 20 }
```

#### §2 Parallax Constants
```ts
PARALLAX = { micro: 0.02, gentle: 0.04, default: 0.06, strong: 0.10, hero: 0.15 }
```

#### §3 Timing Constants
```ts
PRELOADER_DURATION = 2.6  // seconds
HERO_TIMING = { eyebrow: 2.8, heading: 2.95, body: 3.35, cta: 3.55, scroll: 3.9 }
```

#### §4–§26 Variant Categories

| Section | Variants | Used By |
|---|---|---|
| §4 Stagger/Fade | `staggerContainer`, `fadeInUp`, `fadeInScale`, `fadeInBlur` | General sections |
| §5 Card | `cardStagger`, `cardFadeUp`, `cardFadeScale` | Brand carousel, partnership |
| §6 List | `listStagger`, `listItemFadeIn` | Feature split, partnership cards |
| §7 Panel | `panelStagger`, `panelFadeUp`, `panelFadeScale`, `panelFadeOnly`, `panelItemSlide` | Mega-menu panels |
| §7b Mobile | `mobileMenuStagger`, `mobileMenuItemFade` | Mobile menu |
| §8 Slide | `slideInLeft`, `slideInRight` | Section entrances |
| §9 ClipPath | `clipRevealUp`, `clipRevealLeft`, `clipRevealRight`, `clipRevealDown` | Image reveals |
| §10 Image Reveal | `imageRevealContainer`, `imageRevealInner`, `imageRevealHorizontal` | About, feature-split |
| §11 Scale | `scaleIn` | Icons, badges |
| §12 Glass | `glassBadgeReveal` | "Since 2007" badge |
| §13 Counter | `counterStagger`, `counterFadeUp`, `counterPulse` | About counters |
| §14 Divider | `dividerReveal` | LineGrow |
| §15 Stagger Presets | `staggerFast` (0.06s), `staggerMedium` (0.1s), `staggerSlow` (0.15s) | General |
| §16 Float | `floatingFadeIn` | WhatsApp FAB |
| §17 Numbered | `numberedIndexReveal` | Partnership cards |
| §18 Mega Menu | `megaMenuStagger`, `megaMenuItemReveal` | Nav panels |
| §19 Hero Chars | `heroCharStagger`, `heroCharReveal` | Hero h1 split |
| §20 Scroll | `scrollIndicatorReveal` | Hero bottom |
| §21 Counter Pulse | `counterPulse` | Counter glow |
| §22 Ken Burns | `kenBurnsVariant` | Background images |
| §23 Carousel | `carouselCardHover` | Brand carousel cards |
| §24 Glass Panel | `glassPanelReveal` | Glass overlays |
| §25 CTA | `ctaDramaticReveal` | CTA sections |
| §26 Split | `splitImageReveal`, `splitTextCascade`, `splitTextItem` | Feature split |

### CSS Animations (globals.css)

| Utility | Effect |
|---|---|
| `.btn-animated` + `.btn-fill` | Sweep-fill hover (translateY 104%→0%) |
| `.reveal-text` + `.reveal-line` | Per-line stagger reveal (6 lines max) |
| `.reveal-text-v3` + `.reveal-word` | Per-word/char stagger (CSS var --word-index, --stagger-ms) |
| `.link-animated` | Underline grow via scaleX |
| `.img-zoom-wrapper` | Hover zoom 1→1.04 |
| `.grain-overlay` (3 levels) | Film grain effect (normal, strong, subtle) |
| `.fade-mask-x` + `.fade-mask-x-subtle` | Horizontal gradient fade edges |
| `.glass` (5 variants) | Glassmorphism with backdrop-blur |
| `.border-grow-x` / `.border-grow-y` | Animated border expansion |
| `.shimmer-bar` | Loading shimmer |
| `.marquee-track` + `.marquee-track-reverse` | Infinite scroll marquee |
| `.shadow-warm-sm/md/lg/xl` | Warm depth shadows |
| `.vignette-warm` | Radial vignette overlay |
| `.ken-burns` | Pan & zoom background animation |
| `.counter-glow` | Pulsing glow on counter completion |
| `.menu-img-zoom` | Mega-menu image hover zoom |

---

## 7. Layout Architecture

### Root Layout (`layout.tsx`)

```
<html>
  <body>
    <Preloader>           // 2.6s cinematic brand reveal
      <PageTransition>    // Route-level blur+fade+scale
        <LenisProvider>   // Smooth scroll context
          <SiteHeader />  // Fixed header with mega-menu
          {children}      // Page content
          <MegaFooter />  // Fixed footer with scroll reveal
        </LenisProvider>
      </PageTransition>
    </Preloader>
  </body>
</html>
```

**Provider wrapping order:** Preloader → PageTransition → LenisProvider

### Preloader (V5)
- Split-wipe reveal (top/bottom halves scale to 0)
- Logo breathe animation (1→1.05 loop)
- Quintic ease-out progress counter (0→100% over 1.6s)
- Loading bar with shimmer glow
- Total duration: 2.6s

### PageTransition (V5)
- `AnimatePresence mode="wait"`
- Key: pathname
- Enter: opacity 0→1, y 14→0, blur 8→0, scale 0.988→1
- Exit: opacity 1→0, y 0→-16, blur 0→8
- Duration: 0.55s with cinematicEase

### LenisProvider (V4)
- Smooth scroll: duration 1.4, lerp 0.1
- Easing: `1.001 - 2^(-10t)` (exponential decay)
- Touch multiplier: 2.0, wheel: 1.0
- Respects `prefers-reduced-motion`
- Exposes Lenis instance via React context (`useLenis` hook)

---

## 8. Routing & Pages

| Route | Component | Type |
|---|---|---|
| `/` | `page.tsx` | Homepage (composition) |
| `/about` | `AboutPageContent` | Company profile |
| `/contact` | `ContactPageContent` | Contact form + FAQ |
| `/products` | `ProductsPageContent` | Product catalog with filters |
| `/products/[id]` | `ProductDetailContent` | Individual product |
| `/education` | `EducationPageContent` | Education hub + events |
| `/education/articles/[id]` | `ArticleDetailContent` | Article page |
| `/education/events/[id]` | `EventDetailContent` | Event page |
| `/partnership` | `PartnershipPageContent` | Partnership info + form |
| `/privacy` | `PrivacyPageContent` | Privacy policy |
| `/terms` | `TermsPageContent` | Terms of service |

**SEO files:** `robots.ts`, `sitemap.ts`, `manifest.ts`, `opengraph-image.tsx`

---

## 9. Homepage Sections (Deep Analysis)

### Section Composition (`app/page.tsx`)
```tsx
<main className="relative z-10 bg-background">
  <HeroSection />
  <Marquee speed={45} gap={3}> {10 keyword items} </Marquee>
  <AboutSection />
  <BrandCarousel />
  <FeatureSplit />
  <PartnershipSection />
</main>
```

### 9.1 HeroSection (V8)

**Architecture:** Full-viewport cinematic hero with video background.

**Video System:**
- Source: `/videos/hero-bg.mp4`
- Lazy loading via IntersectionObserver (loads when section enters viewport)
- `autoPlay muted loop playsInline` — autoplays silently

**5-Layer Parallax System** (useScroll + useTransform):
| Layer | Property | Range |
|---|---|---|
| videoY | translateY | 0 → window.innerHeight * PARALLAX.hero |
| videoScale | scale | 1 → 1.18 |
| contentOpacity | opacity | 1 → 0 |
| contentY | translateY | 0 → -120 |
| contentBlur | filter blur | 0px → 10px |

**5-Layer Gradient Overlay:**
1. Left-to-right: `black/75 → transparent` (60%)
2. Top-to-bottom: `black/35 → transparent` (50%)
3. Diagonal: `brand-dark/30 → transparent`
4. CSS: `vignette-warm`
5. Radial: transparent center → `black/30` edges

**Content Orchestration** (HERO_TIMING):
1. Eyebrow: "Official Distributor" (delay 2.8s, fadeInBlur)
2. H1: TextReveal char-split "Connecting Global Hair Innovation to Indonesia's Professionals"
3. Body: fadeInBlur (delay 3.35s)
4. CTAs: stagger (delay 3.55s) — AnimatedButton "Explore Our Brands" + outline "Partner With Us"
5. ScrollIndicator: glowing line pulse (delay 3.9s)

**Grain:** `.grain-overlay-strong` over entire section.
**Bottom bleed:** `h-56` gradient from transparent → background color.

### 9.2 Marquee (V5)

- Dual-row support (row 2 runs reverse)
- Hover pause via CSS animation-play-state
- Items: micro-scale 1.06 + brightness-110 on hover
- Entrance: blur(6px)→0, y:16→0, scale 0.98→1
- CSS: `.fade-mask-x` for edge gradient
- Homepage: 10 items, speed=45s, gap=3rem

### 9.3 AboutSection (V8)

**Layout:** 12-column grid (5 + 7 cols)

**Left Column (Image):**
- clipPath horizontal reveal via `imageRevealHorizontal`
- Ken Burns animation (1.14→1.02 scale + parallax translateY)
- `glass-strong` badge: "Since 2007" with `glassBadgeReveal`

**Right Column (Content):**
- Body prose paragraph
- LineGrow divider (scroll-linked scaleX from 0→1)
- 3 StatCounters:
  1. `{yearsNum}+` — Years of Experience
  2. `4` — International Brands
  3. `34` — Provinces Reached
- Each counter uses `useCountUp` (quintic ease-out, IO trigger)
- StatDividers between counters (vertical line 1px)
- Counter glow (`.counter-glow`) animation on completion via `onComplete` callback
- AnimatedButton → "/about"

### 9.4 BrandCarousel (V8)

**Engine:** Embla Carousel with autoplay plugin (5s interval, stop on interaction + mouseenter)

**Layout:**
- Eyebrow + TextReveal heading "Global Professional Brands" + body text
- Arrow buttons with slide counter (e.g., "01 / 04")
- LineGrow animated horizontal divider

**Cards:** 4 BRANDS mapped to cards
- Entrance: `cardFadeScale` variant
- Hover: `shadow-warm-lg`, `-translate-y-1.5`, glass overlay on logo, logo scale 1.1, accent line grows from 0→full width
- Each card: brand logo, origin flag, tagline, "Explore Brand" CTA

**Progress:** Scroll progress bar (bg-brand-crimson, width = scrollProgress) + pagination dots (4 dots, active dot scales up)

**Viewport:** `.fade-mask-x-subtle` edges, `.cursor-grab-active` drag cursor

### 9.5 FeatureSplit (V8)

**Layout:** 2-column grid, no gap

**Left Column (Image):**
- clipPath horizontal reveal (`imageRevealHorizontal`)
- Ken Burns (scale 1.14→1.02 + parallax)
- `glass-strong` badge: "Education & Training"

**Right Column (Content):**
- Eyebrow + TextReveal "More Than a Distributor"
- LineGrow divider
- Body paragraph
- 3 numbered list items (capabilities) with `listStagger`:
  - `border-l-2` that changes to `brand-crimson` on hover
  - Italic quote: "We believe long-term success is built on knowledge..."
- AnimatedButton "Explore Education" → `/education`

### 9.6 PartnershipSection (V8)

**Background:** Ken Burns parallax image (opacity 0.04) + grain-overlay + gradient overlays

**Content:**
- Eyebrow + TextReveal heading
- 2 PartnerCards side by side:
  1. **01 — For International Principals**: numbered badge, list of 3 benefits, hover accent line
  2. **02 — For Professional Salons**: same structure

**CTAs:** Dual — AnimatedButton "Become a Partner" + WhatsAppCTA

---

## 10. Navigation System

### SiteHeader (V5)

**Behavior:**
- Fixed top `z-50`
- Transparent on homepage (top), solid bg everywhere else
- Hide on scroll-down (translate-y-102%), show on scroll-up
- Scroll detection: 40px threshold, 12px direction change deadzone
- Menu overlay: `bg-foreground/60 backdrop-blur-[6px]`, 0.65s fade

**Layout:** 3-column CSS grid (`1fr auto 1fr`)
- **Left:** Logo (mark + "ALFA BEAUTY" wordmark), hover scale 1.08
- **Center:** 6 nav items (Products, Brands, Education, Partnership + About, Contact)
  - Products/Brands/Education/Partnership → mega-menu panels (NavigationMenuTrigger)
  - About/Contact → direct links
- **Right:** WhatsApp CTA button + mobile hamburger (lg: breakpoint)

**Trigger Styling:**
- 11px uppercase, tracking 0.2em, font-semibold
- Indicator bar: `before:` pseudo-element, `h-0.35rem`, `scaleY(0→1)` on hover/open
- Color: white (transparent header) ↔ foreground (solid header)

**Mobile:** Sheet (shadcn, right side, max-w-sm) → MobileMenu component

### Mega-Menu Panels

**Viewport:** Full-width clipPath reveal:
- Open: `clip-path: inset(0 0 0% 0)` over 800ms with `--ease-menu-open`
- Close: `clip-path: inset(0 0 100% 0)` over 500ms with `--ease-menu-close`
- Instant content swap (no crossfade between panels — Yucca pattern)

**BrandsPanel:** 4-column grid of BRANDS, each card has:
- Full-height dark background with brand image (opacity 15→20% on hover)
- 5-layer gradient overlay, brand logo, origin flag, "Explore Brand" CTA
- Bottom accent line (brand-crimson, grows on hover)
- Animation: `megaMenuStagger` + `megaMenuItemReveal`

**ProductsPanel:** 2-column layout:
- Left: Featured showcase (dark bg, "Explore Our Product Collection", "View All Products" CTA)
- Right: 6 categories in 2×3 grid with category thumbnails, "Browse" CTA, accent line

**EducationPanel:** 2-column layout:
- Left: 4 education items (2×2 grid) — Training, Product Knowledge, Business Development, Events
- Right: CTA column — "Alfa Beauty Academy", "Elevate Your Craft", "Explore Programs"

**PartnershipPanel:** 3-column grid:
- Salon Partnership, Distribution, Education Partner
- Each with icon, description, "Learn More" CTA, accent line

### MobileMenu

- Accordion-style nav sections (Products expands to categories, Brands expands to brand list)
- Animation: `mobileMenuStagger` + `mobileMenuItemFade`
- ChevronRight rotates 90° on expand
- Bottom: WhatsApp CTA button + 3 pillar links (Products, Education, Partnership)

---

## 11. Inner Page Content Components

### AboutPageContent (8 sections)
1. **Hero** — 2-column (text + body prose with quote)
2. **Stats Strip** — 3 stats (Years, Brands, Nationwide)
3. **Journey Timeline** — 5 milestones (2007→2025), alternating left/right on desktop, vertical line
4. **Our Role** — "More Than a Distributor", 3 pillar cards (icons + descriptions)
5. **Mission & Vision** — 2 cards side by side
6. **Brand Portfolio** — 4 brand cards with logos, origin, category, description
7. **Meet the Team** — 4 team departments (placeholder)
8. **CTA Band** — "Let's Work Together"

### ContactPageContent (4 sections)
1. **Hero** — Centered text
2. **Form + Meet Us** — 2-column: ContactForm (left) + info cards (Address, Phone/Email, Operating Hours, WhatsApp button)
3. **FAQ** — 6 questions in Accordion (left heading + right accordion)
4. **CTA Band** — "Ready to elevate your salon?" with WhatsApp + "Become a Partner"

### EducationPageContent (7 sections)
1. **Hero** — 2-column with image placeholder
2. **Stats Strip** — 3 stats
3. **Featured Event** — Full-width featured event card
4. **Upcoming Events Grid** — `EducationEventsFilter` component
5. **Past Events** — Table-like list with date/title/brand/location
6. **Articles & Insights** — 3-column card grid
7. **CTA Band** — "Want to host a training session?"

### PartnershipPageContent (5 sections)
1. **Hero** — Centered text
2. **Dual Benefits Cards** — International Principals vs. Professional Salons
3. **How It Works** — 3-step process (Enquire → Consultation → Partnership)
4. **Become Partner Form** — `PartnershipForm` (dynamically imported)
5. **Closing Statement** — Italic quote

---

## 12. Product System

### Product Data (`product-data.ts`)

**Type Definition:**
```ts
type Product = {
  id: string; name: string; brand: string;
  category: string; audience: "salon" | "barber" | "both";
  description: string; variants?: string[]; isNew?: boolean;
  image?: string; gallery?: string[]; infoSlides?: InfoSlide[];
  heroImage?: string; longDescription?: string;
  keyBenefits?: string[]; howToUse?: string;
  recommendedFor?: string[]; relatedIds?: string[];
}
```

**Current Inventory:** ~35 products
- **CORE** (3): Control Base, Core Heat Perm, Alkali Remover
- **Montibello Gold Oil** (2): Gold Oil Essence Amber, Gold Oil Essence Pink
- **Montibello HOP** (8): Blonde Glow Shampoo/Mask, Colour Last Rinse/Mask/Shampoo, Purifying Balance Shampoo/Treatment, Smooth Hydration Rinse/Mask/Shampoo
- **Gamma+ Professional** (22): Clippers (XCELL, Shorty, Boosted Up, Absolute Alpha), Trimmers (XCELL, Boosted, Absolute Hitter), Shavers (XCELL, Boosted, Absolute Zero), Dryers (X-Horizon, XCELL S, X-Hybrid Compact, IES Light, Plasma, L'Italiano), Styling Tools (Donna+ Keratin, Keratin Glory, Iron Bubble Rainbow)

**Categories:** All, Hair Colour, Hair Care, Styling, Treatments, Tools & Equipment, Barber Essentials

**Brand Filters:** CORE, Montibello, Gamma+ Professional

### Products Page (`ProductsPageContent`)

**Features:**
- Search bar (toggle open/close)
- Category tabs with item counts
- Sidebar filters: Brand checkboxes, Audience checkboxes (Salon/Barber), Category checklist
- Toggle sidebar visibility
- Sort: Latest, Name A–Z, Name Z–A, Brand
- 3-column grid (with sidebar) or 4-column (without)
- Promo banner card ("Free consultation & product demos")
- Partnership rewards card (after 5+ products)
- Empty state with WhatsApp CTA

### Product Detail (`ProductDetailContent`)

**Sections:**
1. Breadcrumb / Back to Products
2. Hero: Main image (object-contain) + Details (brand badge, category badge, h1, description, key benefits list, WhatsApp CTA)
3. Info Slides: Horizontal scroll strip of feature/technology images with type labels
4. Gallery Grid: 2–4 column, hover zoom effect
5. Application & Recommendations

### ProductWhatsAppCTA
- Pre-fills WhatsApp message: "Saya tertarik dengan produk {productName}"
- Tracks: `cta_whatsapp_click` with `product_name`

---

## 13. Education & Events System

### Event Data (`education-data.ts`)

**Type:** `EducationEvent` with id, title, type, brand, audience, date, location, description, longDescription, highlights, instructor, duration, capacity, isUpcoming, isFeatured, relatedIds

**Event Types:** masterclass, workshop, training, seminar

**10 Events:**
- 5 upcoming (2026): Alfaparf Colour Masterclass (featured), SDL Care Workshop, Farmavita Colour Training, Gamma+ Barber Tools, Montibello Clean Beauty
- 5 past: Barbershop Business Workshop, Alfaparf Colour Pop-Up, Farmavita Scalp Treatment, Digital Marketing, Gamma+ Tools Launch

**5 Articles** with category, readTime, excerpt, full content, tags

### Education Events Filter
- Client-side filtering by event type
- Tab-based filter UI

---

## 14. Form Pipeline & Server Actions

### Architecture
```
Client Form → Server Action → Rate Limit → Honeypot → Zod Validation → Supabase Insert → Resend Email → Response
```

### submit-lead.ts (Partnership Form)
1. **Rate limit:** IP-based sliding window (5 req/min)
2. **Honeypot:** Hidden `company` field — if filled, silently returns success (fools bots)
3. **Zod validation:** Server-side schema (`leadSchema`)
4. **Supabase insert:** `leads` table with business_name, contact_name, phone_whatsapp, email, city, salon_type, consent, chair_count, specialization, current_brands_used, monthly_spend_range, message, page_url_initial, page_url_current, ip_address
5. **Email notification:** Resend to internal inbox, HTML body uses `escapeHtml()`
6. **Error handling:** Structured `SubmitLeadResult` union type

### submit-contact.ts (Contact Form)
Same pipeline, simpler: name, email, phone, subject, message, consent

### Security Compliance
| OWASP ASVS | Measure |
|---|---|
| V2.2.1 | Positive validation (Zod allowlist) |
| V2.2.2 | Server-side enforcement |
| V2.4.1 | Anti-automation (rate limit + honeypot) |
| XSS prevention | `escapeHtml()` for email body |

---

## 15. Reusable UI Components

### AnimatedButton (V2)
- Yucca-style fill-sweep hover effect
- CSS: `.btn-animated` → `.btn-fill` (translateY slides from 104→0%) → `.btn-label` (text color transitions via `--btn-fill-text`)
- Renders own `<a>` (Link) or `<button>` — no Radix Slot nesting
- Props: `href`, `fillClass`, `fillTextClass`, `external`

### WhatsAppCTA
- Unified WhatsApp button with configurable message
- Auto-constructs URL: `WHATSAPP_URL?text={encoded message}`
- Default: "Saya tertarik dengan produk {productName}" or "Hi, saya ingin konsultasi..."
- Tracks `cta_whatsapp_click` event with location + product_name
- Wraps shadcn Button (asChild pattern)

### Button (shadcn)
- 6 variants: default, destructive, outline, secondary, ghost, link
- 8 sizes: default, xs, sm, lg, icon, icon-xs, icon-sm, icon-lg

### NavigationMenu (customized shadcn)
- Custom fullWidth mode for Yucca-style mega-menu
- ClipPath viewport animation (not opacity/height)
- hideChevron prop on trigger
- Transition durations: 600ms

### Other UI: Accordion, Badge, Checkbox, Form Field, Select, Separator, Sheet

---

## 16. Motion Components

### FadeIn (V3)
- Scroll-reveal wrapper using Framer Motion `whileInView`
- Props: direction (up/down/left/right/none), blur, scale, dramatic, stagger, amount, once, offset
- Default: 32px offset, -60px viewport margin, 0.7s duration
- Dramatic mode: cinematicEase + 0.9s
- Stagger: each child adds 0.08s delay

### TextReveal (V5)
- 3 split modes: line, word, char
- IntersectionObserver triggers `.is-visible` class (CSS-driven animation)
- Per-word/char: uses CSS variables `--word-index` and `--stagger-ms`
- CSS classes: `.reveal-text-v3`, `.reveal-line-v3`, `.reveal-word`
- Blur-in support via `.reveal-blur` class
- Accessible: `sr-only` full text for screen readers

---

## 17. Hooks & Utilities

### useParallax (V4)
- Scroll-linked translateY + opacity fade at section edges
- Uses `useScroll` (target ref, offset "start end" to "end start")
- Returns: ref, y, opacity, scrollYProgress

### Parallax (component wrapper)
- Declarative wrapper using `useParallax`
- Optional `fade` prop for edge opacity

### useCountUp (V4)
- IO-triggered counter animation (quintic ease-out)
- Props: target, duration (2.4s), suffix, prefix, delay, format (locale), decimals, onComplete
- Returns: ref + display string

### useLineGrow (V4)
- Scroll-linked scale animation (0→1) for horizontal/vertical dividers
- Offset: "start 0.9" to "start 0.5"

### LineGrow (component)
- Declarative wrapper for useLineGrow
- Default: `h-px bg-border-warm`

### ScrollIndicator (V4)
- Animated "Scroll" label + vertical line with glow pulse
- Line animates y: -100% → 100% (2.2s infinite loop)
- Entrance: delay = HERO_TIMING.scroll (3.9s)

### Utility Functions
- `cn()` — clsx + tailwind-merge
- `formatDate()` — locale-formatted date string

---

## 18. Providers

### Preloader (V5) — see §7
### PageTransition (V5) — see §7
### LenisProvider (V4) — see §7

---

## 19. Analytics System

### trackEvent (`analytics.ts`)

```ts
function trackEvent(name: AnalyticsEvent, params: Record<string, string>)
```

**Targets:**
1. **GA4:** `window.gtag("event", name, params)`
2. **Facebook Pixel:** `window.fbq("trackCustom", name, params)`
3. **Microsoft Clarity:** `window.clarity("set", name, Object.values(params).join(","))`

**Event Types:**
| Event | Params | Trigger |
|---|---|---|
| `cta_whatsapp_click` | location, product_name? | Any WhatsApp CTA |
| `lead_form_submit` | salon_type, city | Partnership form success |

---

## 20. Security Architecture

### CSP (middleware.ts)
- Per-request nonce via `crypto.randomUUID()`
- `script-src 'nonce-{nonce}' 'strict-dynamic'` + GA/GTM/Clarity domains
- `frame-ancestors 'none'`
- `base-uri 'none'`
- `object-src 'none'`
- `upgrade-insecure-requests`

### Security Headers (next.config.ts)
| Header | Value |
|---|---|
| X-Content-Type-Options | nosniff |
| X-Frame-Options | DENY |
| Strict-Transport-Security | max-age=63072000; includeSubDomains; preload |
| Permissions-Policy | camera=(), microphone=(), geolocation=() |

### Server-Side Protection
- **Supabase:** service-role key via `server-only` import guard
- **Rate Limit:** IP-based sliding window (5 req/60s), periodic cleanup
- **Honeypot:** Hidden `company` field in forms
- **Validation:** Server-side Zod schemas, never trust client
- **Email XSS:** `escapeHtml()` for all user data in email HTML

---

## 21. SEO & Metadata

### Root Layout Metadata
- Title template: `%s | PT Alfa Beauty Cosmetica`
- Description: Professional haircare distribution company
- OG image: `/images/og-image.jpg`
- Twitter card: `summary_large_image`
- Robots: index, follow, max-image-preview: large
- JSON-LD: `Organization` schema (name, url, logo, contactPoint, sameAs)

### Per-Page
- Each page exports `metadata` object
- `robots.ts` generates robots.txt
- `sitemap.ts` generates XML sitemap (all pages + dynamic product/event routes)
- `manifest.ts` generates PWA manifest
- `opengraph-image.tsx` generates dynamic OG images

---

## 22. Performance Strategy

### Image Optimization
- Next.js Image with `sizes` prop on all images
- AVIF + WebP formats (next.config.ts)
- Priority loading on hero/logo images

### Code Splitting
- **Dynamic imports:** PartnershipForm, ContactForm (with loading skeletons)
- **RSC by default:** Only "use client" for interactive sections
- All server actions are `"use server"` with `server-only` guards

### Animation Performance
- `will-change` hints on mega-menu viewport
- CSS-only animations where possible (marquee, grain, shimmer)
- `IntersectionObserver` for lazy triggers (video, counters, text reveals)
- RAF-throttled scroll handlers
- `prefers-reduced-motion` respected

### Scroll Performance
- Lenis smooth scroll (RAF-based, not scroll events)
- Passive scroll listeners
- `overflow: hidden` on parallax containers

---

## 23. Component Version History

| Component | Current | Key Upgrades |
|---|---|---|
| SiteHeader | V5 | Deeper mega-menu blur (6px), overlay 0.6 opacity |
| HeroSection | V8 | 5-layer parallax, char-split TextReveal, video IO loading |
| AboutSection | V8 | clipPath image reveal, counter glow, glass-strong badge |
| BrandCarousel | V8 | Embla autoplay, cardFadeScale, progress bar + dots |
| FeatureSplit | V8 | Horizontal reveal, Ken Burns, glass badge, numbered list |
| PartnershipSection | V8 | Ken Burns bg, numbered PartnerCards, dual CTA |
| MegaFooter | V6 | Fixed reveal pattern, ResizeObserver spacer, WordmarkParallax |
| Marquee | V5 | Dual-row, hover-pause, scale entrance |
| Preloader | V5 | Split wipe, progress counter, shimmer bar |
| PageTransition | V5 | Deep blur 8px, scale 0.988, exit y -16 |
| LenisProvider | V4 | Context exposure, useLenis hook |
| FadeIn | V3 | Stagger prop, amount, once, offset |
| TextReveal | V5 | Char split, blur, scaleWords |
| useParallax | V4 | Opacity fade at edges |
| useCountUp | V4 | Decimals, onComplete, configurable threshold |
| useLineGrow | V4 | Vertical support, tighter scroll offset |
| ScrollIndicator | V4 | Glow pulse on line segment |
| AnimatedButton | V2 | Direct <a>/<button>, no Radix Slot nesting |

---

## 24. Current Gaps & Recommendations

### Content Gaps
1. **Image placeholders** — Education page hero, event images, article images all show placeholder icons
2. **Team section** — AboutPageContent §7 "Meet the Team" has placeholder department names, no photos
3. **Product descriptions** — Many products have Indonesian-language descriptions that are image captions, not marketing copy (e.g., "Botol putih di atas podium silinder (Hero Image)")
4. **longDescription/keyBenefits/howToUse** — These fields are empty for all products; detail pages show only the short description
5. **Alfaparf Milano & Farmavita products** — Not in product-data.ts despite being listed as BRANDS in config.ts (only CORE, Montibello, Gamma+ are present)

### Technical Gaps
6. **MegaFooter at V6** while all homepage sections are V8 — potential for upgrade
7. **SiteHeader at V5** — could be aligned with section V8 patterns
8. **No dark mode** — design system is light-only
9. **No i18n** — content is mixed English/Indonesian; no formal localization system
10. **No CMS integration** — all content is hardcoded in TypeScript files (product-data.ts, education-data.ts)
11. **Education events filter** — client-side only; if events grow, server-side pagination would be needed

### Animation/UX Gaps
12. **No loading states** on product images — no skeleton/blur placeholder
13. **No lightbox** for product gallery images — clicking does nothing
14. **No "back to top" button** on inner pages — only mega-footer has one
15. **Carousel** — only 4 items; if brands grow, UI pattern remains suitable but autoplay may need tuning

### Architecture Considerations
16. **Product data size** — 35+ products all in a single TypeScript file (~500 lines); suitable for now but will need CMS/API if catalog grows
17. **Rate limiter** — in-memory (resets on deploy/cold start); consider Redis for production scale
18. **Analytics** — only 2 event types tracked; could be expanded for product views, scroll depth, form abandonment

---

*End of study. This document serves as the single source of truth for the Alfa Beauty frontend architecture.*
