# Frontend Deep Study — PT Alfa Beauty Cosmetica

> **Document Version:** 1.0  
> **Scope:** Complete frontend codebase analysis of `frontend/` directory  
> **Stack:** Next.js 16.1.6 · React 19.2.3 · TypeScript 5 · Tailwind CSS 4 · Framer Motion 12.34  
> **Live site:** https://alfabeauty.co.id (under maintenance at time of study)

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Technology Stack & Dependencies](#2-technology-stack--dependencies)
3. [Project Structure](#3-project-structure)
4. [Design System & Visual Language](#4-design-system--visual-language)
5. [Typography System](#5-typography-system)
6. [Color System & Tokens](#6-color-system--tokens)
7. [Animation Architecture](#7-animation-architecture)
8. [Component Hierarchy](#8-component-hierarchy)
9. [Layout & Composition Layer](#9-layout--composition-layer)
10. [Homepage Breakdown](#10-homepage-breakdown)
11. [Navigation System](#11-navigation-system)
12. [Page-by-Page Analysis](#12-page-by-page-analysis)
13. [Product Catalog System](#13-product-catalog-system)
14. [Education & Content System](#14-education--content-system)
15. [Form & Lead Generation System](#15-form--lead-generation-system)
16. [Motion & Scroll Behavior](#16-motion--scroll-behavior)
17. [Performance Patterns](#17-performance-patterns)
18. [SEO & Metadata Strategy](#18-seo--metadata-strategy)
19. [Security Architecture](#19-security-architecture)
20. [Backend Integration](#20-backend-integration)
21. [CSS Architecture (globals.css)](#21-css-architecture-globalscss)
22. [Configuration & Constants](#22-configuration--constants)
23. [Strengths](#23-strengths)
24. [Weaknesses & Gaps](#24-weaknesses--gaps)
25. [Summary Statistics](#25-summary-statistics)

---

## 1. Architecture Overview

The frontend follows a **Next.js App Router** architecture with full static generation (SSG). Every public route is pre-rendered at build time. There is **no client-side data fetching** — all content is hardcoded in TypeScript data files.

### Rendering Strategy

| Strategy | Routes |
|----------|--------|
| **Static (SSG)** | `/`, `/about`, `/products`, `/education`, `/partnership`, `/contact`, `/privacy`, `/terms` |
| **Dynamic SSG** (`generateStaticParams`) | `/products/[id]`, `/education/articles/[id]`, `/education/events/[id]` |
| **API Route** | `/api/leads/export` (GET, token-protected CSV) |
| **Edge Runtime** | `opengraph-image.tsx` (OG image generation) |

### Key Architectural Decisions

1. **No CMS** — All content in TypeScript files (`product-data.ts`, `education-data.ts`, `config.ts`)
2. **Server Components by default** — Client components only where interactivity is needed (forms, animations, scroll)
3. **Centralized configuration** — `lib/config.ts` is the single source of truth for all constants
4. **Centralized motion** — `lib/motion.ts` defines ALL animation variants (30 sections, ~300 lines)
5. **Form submission via Server Actions** — `submitLead()` and `submitContact()` with full pipeline (validation → rate limit → honeypot → Supabase → email → response)

### Component Architecture Pattern

```
Route page (Server Component)
  └── *PageContent (Client or Server Component)
        ├── FadeIn / TextReveal (motion wrappers)
        ├── shadcn primitives (Button, Input, etc.)
        └── Custom UI (AnimatedButton, WhatsAppCTA, etc.)
```

Every route follows the pattern: `app/[route]/page.tsx` → exports metadata + renders a `*PageContent` component from `components/[domain]/`.

---

## 2. Technology Stack & Dependencies

### Core Framework

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.1.6 | App Router, SSG, API Routes, Middleware |
| `react` | 19.2.3 | UI library |
| `typescript` | 5.x | Type safety |

### Styling

| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | 4.x | Utility CSS |
| `tw-animate-css` | 1.4 | Tailwind animation utilities |
| `class-variance-authority` | 0.7.1 | Variant-based component styling |
| `clsx` + `tailwind-merge` | — | Conditional className merging |

### Animation

| Package | Version | Purpose |
|---------|---------|---------|
| `framer-motion` | 12.34 | Scroll reveals, page transitions, parallax |
| `lenis` | 1.3.18 | Smooth scrolling |

### UI Components

| Package | Version | Purpose |
|---------|---------|---------|
| `@radix-ui/*` | 1.x | Headless UI primitives (Navigation Menu, Sheet, Accordion, Select, Checkbox) |
| `lucide-react` | 0.513 | Icon library |
| `embla-carousel-react` | 8.6 | Brand carousel |
| `embla-carousel-autoplay` | 8.6 | Carousel auto-play |

### Backend & Data

| Package | Version | Purpose |
|---------|---------|---------|
| `@supabase/supabase-js` | 2.95.3 | Database (leads/contacts) |
| `resend` | 6.9.2 | Email notifications |
| `zod` | 4.3.6 | Form validation |

### Other

| Package | Version | Purpose |
|---------|---------|---------|
| `sharp` | 0.34.5 | Image optimization |
| `@next/third-parties` | 16.1.6 | GA4 SDK |
| `server-only` | 0.0.1 | Prevent client import of server modules |

---

## 3. Project Structure

```
src/
├── middleware.ts                    # CSP nonce + security headers
├── app/
│   ├── layout.tsx                   # Root layout (font, analytics, providers)
│   ├── page.tsx                     # Homepage
│   ├── globals.css                  # ~850 lines, 15+ design system sections
│   ├── manifest.ts                  # PWA manifest
│   ├── robots.ts                    # robots.txt
│   ├── sitemap.ts                   # Dynamic sitemap
│   ├── opengraph-image.tsx          # Edge OG image
│   ├── loading.tsx / error.tsx / not-found.tsx
│   ├── about/                       # Static pages
│   ├── products/ + [id]/            # Product catalog + detail
│   ├── education/ + articles/[id] + events/[id]
│   ├── partnership/
│   ├── contact/
│   ├── privacy/ + terms/
│   └── api/leads/export/            # CSV export endpoint
├── components/
│   ├── sections/                    # 10 section components + nav/ (5 panels)
│   ├── motion/                      # FadeIn, TextReveal
│   ├── providers/                   # LenisProvider, PageTransition, Preloader
│   ├── ui/                          # 11 shadcn/custom UI primitives
│   ├── about/                       # AboutPageContent
│   ├── products/                    # Product catalog + detail + data
│   ├── education/                   # Education page + data + filters
│   ├── partnership/                 # Partnership form + page
│   ├── contact/                     # Contact form + page
│   └── legal/                       # Privacy + Terms
├── hooks/
│   └── use-animations.tsx           # useParallax, useCountUp, LineGrow, ScrollIndicator
├── lib/
│   ├── config.ts                    # All constants (SSoT)
│   ├── motion.ts                    # 30 sections of Framer Motion variants
│   ├── analytics.ts                 # GA4 + FB Pixel + Clarity event tracking
│   ├── utils.ts                     # cn(), formatDate()
│   ├── supabase.ts                  # Server-only Supabase admin client
│   ├── email.ts                     # Resend email sender + HTML escaper
│   ├── rate-limit.ts                # In-memory sliding window rate limiter
│   ├── logger.ts                    # Structured server-side logging
│   └── validations/                 # Zod schemas for lead + contact forms
└── actions/
    ├── submit-lead.ts               # Partnership form server action
    └── submit-contact.ts            # Contact form server action
```

**Total file count:** ~65 source files  
**Build output:** 74 static pages (0 errors)

---

## 4. Design System & Visual Language

### Design Philosophy

The design follows a **Yucca-inspired cinematic editorial** aesthetic — a dark/neutral-tone palette with warm accents, generous whitespace, and layered depth effects (glassmorphism, grain overlays, parallax, vignettes).

### Key Characteristics

1. **Editorial typography** — Montserrat 300–700; fluid scales via `clamp()`; uppercase eyebrows with wide letter-spacing
2. **Warm neutrals** — Surface #f6f5f0, border-warm, charcoal overlays; never stark white
3. **Crimson accent** — Brand crimson #a4161a is used sparingly for CTAs, counters, accent lines
4. **Layered depth** — 5-layer gradient overlays on hero, grain textures (3 levels), glassmorphism (5 variants), warm-tinted shadows
5. **Cinematic motion** — Scroll-triggered reveals, blur-to-sharp transitions, parallax, clipPath wipe animations
6. **No rounded corners** — Square/angular aesthetic throughout (0 border-radius except buttons with rounded-sm)
7. **Numbered elements** — "01", "02" editorial numbering on cards/sections (Yucca pattern)

### CSS Utility Classes

| Class | Purpose |
|-------|---------|
| `.eyebrow` | 10px uppercase semibold tracking-[0.2em] text-foreground/40 |
| `.heading-display` | Display sizes: clamp(2.8rem, 5vw, 4.5rem) |
| `.heading-section` | Section heading: clamp(1.8rem, 3.5vw, 2.8rem) |
| `.body-prose` | 14px leading-[1.85] text-charcoal |
| `.btn-animated` | Fill-sweep hover effect container |
| `.glass` / `.glass-strong` | Glassmorphism variants |
| `.grain-overlay` / `.grain-overlay-strong` / `.grain-overlay-subtle` | Film grain texture (::after pseudo) |
| `.vignette-warm` | Radial gradient vignette |
| `.ken-burns` | Slow ambient image drift |
| `.link-animated` | Underline grow-from-left on hover |
| `.marquee-track` / `.marquee-track-reverse` | CSS infinite scroll |
| `.shadow-warm-*` | Warm-tinted box shadows (sm/md/lg/xl) |
| `.pillar-card` | Glassmorphism card for hero section |
| `.trust-badge` | Inline badge with crimson dot |

---

## 5. Typography System

### Font

**Montserrat** (Google Fonts) — weights 300, 400, 500, 600, 700. Loaded via `next/font/google` with `swap` display strategy.

### Fluid Type Scale

10 levels defined via CSS `clamp()` functions:

| Class | Min | Fluid | Max |
|-------|-----|-------|-----|
| `.text-display-xl` | 3rem | 6vw | 5.5rem |
| `.text-display` | 2.8rem | 5vw | 4.5rem |
| `.text-h1` | 2.2rem | 4vw | 3.5rem |
| `.text-h2` | 1.8rem | 3.5vw | 2.8rem |
| `.text-h3` | 1.4rem | 2.5vw | 2rem |
| `.text-h4` | 1.15rem | 2vw | 1.5rem |
| `.text-h5` | 1rem | 1.4vw | 1.15rem |
| `.text-body-lg` | 1rem | 1.2vw | 1.15rem |
| `.text-body` | 0.875rem | 1vw | 1rem |
| `.text-tiny` | 0.75rem | 0.8vw | 0.8125rem |

### Semantic Typography Tokens

| Token | Size | Weight | Tracking | Color |
|-------|------|--------|----------|-------|
| `eyebrow` | 10px | 600 | 0.2em | foreground/40 |
| `heading-display` | display scale | 700 | -0.02em | foreground |
| `heading-section` | h2 scale | 700 | -0.02em | foreground |
| `body-prose` | 14px | 300 | normal | charcoal |
| Button labels | 11px | 700 | 0.15em–0.2em | varies |
| Nav links | 11px | 600 | 0.2em | foreground/white |

---

## 6. Color System & Tokens

### Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--brand-crimson` | #a4161a | Primary accent — CTAs, counters, accent lines |
| `--brand-dark` | #660708 | Dark crimson variant |
| `--brand-deep` | #330404 | Deepest crimson |

### Surface & Neutral Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--background` | #ffffff | Page background |
| `--foreground` | #000000 | Text, dark sections |
| `--surface` | #f6f5f0 | Warm off-white sections |
| `--surface-elevated` | #eeeee8 | Elevated surface (cards, hover) |
| `--charcoal` | #3c3c3c | Body text |
| `--border-warm` | #d6d3cb | Warm borders |
| `--text-muted` | #6b6b6b | Secondary text |
| `--whatsapp` | #25d366 | WhatsApp brand green |

### Gradients

| Name | Value |
|------|-------|
| `--gradient-warm` | linear-gradient(135deg, #a4161a, #660708) |
| `--gradient-dark` | linear-gradient(135deg, #000, #1a1a1a) |
| `--gradient-surface` | linear-gradient(180deg, #f6f5f0, #eeeee8) |

### Shadow System (Warm-tinted)

```css
--shadow-warm-sm:  0 1px 3px rgba(60,48,40,0.06), 0 1px 2px rgba(60,48,40,0.04)
--shadow-warm-md:  0 4px 12px rgba(60,48,40,0.07), 0 2px 4px rgba(60,48,40,0.04)
--shadow-warm-lg:  0 10px 30px rgba(60,48,40,0.08), 0 4px 8px rgba(60,48,40,0.04)
--shadow-warm-xl:  0 20px 50px rgba(60,48,40,0.10), 0 8px 16px rgba(60,48,40,0.05)
```

---

## 7. Animation Architecture

### Motion Library (`lib/motion.ts`)

Centralized Framer Motion variant definitions — 30 named sections covering:

| Section | Variants | Purpose |
|---------|----------|---------|
| §1 Easing Curves | 7 curves | `smoothEase`, `cinematicEase`, `snappyEase`, `decelerateEase`, `anticipateEase`, `exitEase`, `elasticSettle` |
| §2 Parallax | 5 speeds | micro 0.04 → hero 0.35 |
| §3 Orchestration | Hero timing | Eyebrow → heading → body → CTA → scroll indicator delays |
| §4 Page stagger | `fadeInUp`, `fadeInScale`, `fadeInBlur` | Section-level reveals |
| §5 Card stagger | `cardFadeScale`, `cardFadeUp` | Grid/carousel cards |
| §6 List stagger | `listItemFadeIn` | Bullet lists with blur |
| §7 Panels | `panelFadeScale`, `panelItemSlide` | Mega-menu panels |
| §7b Mobile menu | `mobileMenuItemFade` | Mobile nav items |
| §8 Section slides | `slideInLeft`, `slideInRight` | Full-bleed sections |
| §9 ClipPath | 4 directions | Wipe animations |
| §10 Image reveal | Container + inner + horizontal | Composite clip+scale |
| §11 Scale in | `scaleIn` | Button/icon entrance |
| §12 Glass badge | `glassBadgeReveal` | Glassmorphism badge |
| §13 Counter | `counterStagger`, `counterFadeUp` | Stat counters |
| §14 Divider | `dividerReveal` | Line separator animation |
| §15 Stagger presets | Fast/Medium/Slow | Named timing presets |
| §16 Floating | `floatingFadeIn` | FAB, tooltips |
| §17 Numbered index | `numberedIndexReveal` | Editorial numbers |
| §18 Mega-menu items | `megaMenuItemReveal` | Menu item-level stagger |
| §19 Hero char | `heroCharReveal` | Per-character headline |
| §20 Scroll indicator | Pulsing + glow | Bottom scroll cue |
| §21 Counter pulse | `counterPulse` | Completion glow |
| §22 Ken Burns | `kenBurnsVariant` | Slow ambient drift |
| §23 Carousel depth | `carouselCardHover` | Drag feedback |
| §24 Glass panel | `glassPanelReveal` | Frosted glass |
| §25 CTA dramatic | `ctaDramaticReveal` | Button entrance |
| §26 Split section | `splitImageReveal`, `splitTextCascade` | Two-column wipe |
| §27 Mega-menu 5-phase | Card bg → media → text → border → link | Yucca createCardTl |
| §28 Announcement | `announcementSlide` | Top bar slide |
| §29 Pre-footer | `preFooterReveal` | CTA section |
| §30 Pillar cards | `pillarCardReveal` | Hero pillar cards |

### Motion Components

| Component | File | Behavior |
|-----------|------|----------|
| `FadeIn` | `motion/fade-in.tsx` | Directional scroll-reveal wrapper with blur, scale, stagger props |
| `TextReveal` | `motion/text-reveal.tsx` | Per-line, per-word, or per-char stagger reveal using IntersectionObserver + CSS |
| `PageTransition` | `providers/page-transition.tsx` | AnimatePresence crossfade (0.45s blur+scale) between routes |
| `Preloader` | `providers/preloader.tsx` | Split-wipe brand reveal with progress counter; session-skip |

### Hooks

| Hook | Purpose |
|------|---------|
| `useParallax` | Scroll-linked Y offset + opacity fade |
| `useCountUp` | IntersectionObserver-triggered counter with quintic easing |
| `useLineGrow` | Scroll-linked scaleX/scaleY line animation |
| `useScrollProgress` | Global page scroll 0→1 |

### Animation Budget

Every scroll-triggered element uses `viewport={{ once: true }}` — animations fire once and never replay. This is intentional for performance and cinematic feel.

---

## 8. Component Hierarchy

### Provider Stack (layout.tsx)

```
<LenisProvider>                     ← Smooth scroll (1.4s duration, custom easing)
  <Preloader>                       ← Brand reveal (2.6s, session-skip)
    <AnnouncementBar />             ← Dismissible top notification
    <SiteHeader />                  ← Fixed header with mega-menu
    <PageTransition>                ← AnimatePresence crossfade
      {children}                    ← Route content
    </PageTransition>
    <MegaFooter />                  ← Fixed footer (reveal-underneath pattern)
  </Preloader>
</LenisProvider>
```

### Component Count by Directory

| Directory | Count | Type |
|-----------|-------|------|
| `sections/` | 10 | Major page sections |
| `sections/nav/` | 5 | Mega-menu panels + mobile |
| `ui/` | 11 | shadcn + custom primitives |
| `motion/` | 2 | Animation wrappers |
| `providers/` | 3 | App-level providers |
| `products/` | 4 | Product catalog system |
| `education/` | 6 | Education content system |
| `partnership/` | 2 | Partnership form + page |
| `contact/` | 2 | Contact form + page |
| `about/` | 1 | About page content |
| `legal/` | 2 | Privacy + Terms |
| **Total** | **~48** | |

---

## 9. Layout & Composition Layer

### Root Layout (`layout.tsx`)

**156 lines.** Responsibilities:

1. **Font loading** — Montserrat 300–700 via `next/font/google`
2. **Metadata** — Title template, description, OG image, locale id_ID
3. **JSON-LD** — Organization structured data (name, URL, logo, contactPoint, sameAs)
4. **Analytics** — GA4 (`@next/third-parties`), Microsoft Clarity, Facebook Pixel — all nonce-gated
5. **CSP nonce** — Read from `x-nonce` header (set by middleware)
6. **Viewport** — `themeColor: "#a4161a"`

### Global CSS (`globals.css`)

**~850 lines** organized into 15 numbered sections. Key design tokens:

- **§theme**: Brand colors, gradients, mood shadows, status colors, easing curves, border-radius
- **§:root**: Shadcn-compatible CSS variables (light mode only — no dark mode)
- **§1**: Fluid type scale (10 levels)
- **§2**: Button fill-sweep animation
- **§3/3b**: Text reveal (line-by-line + word-by-word stagger)
- **§5/5b/5c**: Image zoom, grain overlays (3 intensities), gradient fade masks
- **§6/6b/6c/6d/6e**: Shadows, glassmorphism (5 variants), border grow, shimmer bar
- **§7**: Marquee tracks
- **§8**: `prefers-reduced-motion` support
- **§9**: Enhanced mood effects (vignette, ken-burns, cursor-grab, counter-glow)
- **§10-15**: Component-specific styles (announcement bar, pre-footer CTA, mega-menu, pillar cards, will-change hints, trust badges)

### Header Height

CSS variable `--header-height` controls header spacing. All page content uses `pt-[var(--header-height)]` to clear the fixed header.

---

## 10. Homepage Breakdown

**Section order:**

| # | Component | Type | Description |
|---|-----------|------|-------------|
| 1 | `HeroSection` | Full-viewport cinematic | Video bg + parallax + 5-layer gradient + heading (per-char reveal) + 2 CTAs + 3 pillar cards (glass) + scroll indicator |
| 2 | `Marquee` | Dual-row keyword strip | 10 keywords, speed 45s, pause-on-hover, fade-mask edges, hover micro-scale |
| 3 | `AboutSection` | Two-column with stats | Image (clipPath reveal + Ken Burns + grain) + glass badge + body copy + 3 animated counters with dividers |
| 4 | `BrandCarousel` | Embla carousel | 4 brand cards with drag, autoplay 5s, keyboard nav, progress bar, pagination dots, 7-layer card hover |
| 5 | `FeatureSplit` | Image/text split | Horizontal clipPath + parallax + numbered capabilities list + CTA |
| 6 | `PartnershipSection` | Background image + cards | 2 numbered partner cards (Principal/Salon) with benefit lists + dual CTAs (AnimatedButton + WhatsApp) |
| 7 | `PreFooterCTA` | Full-width dark CTA | Grain overlay + vignette + dual action buttons |

### Hero Section Detail (V9)

- **Video**: Lazy-loaded via IntersectionObserver, `preload="none"`, poster fallback
- **Parallax**: Video moves at `PARALLAX.hero * 500` px, scales 1→1.18
- **Content**: Opacity + Y + blur transitions on scroll (0→35%)
- **5-layer gradient overlay**: Left-to-right, top-to-bottom, brand tinting, warm vignette, edge darkening
- **Heading**: Per-character reveal with blur (`split="char"`) — "Connecting Global / Hair Innovation to / Indonesia's Professionals"
- **CTAs**: AnimatedButton (fill-sweep) + outline Button
- **Pillar cards**: 3 glass cards (Products/Education/Partnership) with stagger entrance
- **Scroll indicator**: Vertical line with glow pulse animation

---

## 11. Navigation System

### Desktop: Mega-Menu

**Component:** `SiteHeader` (V6)  
**Pattern:** Radix `NavigationMenu` with full-width viewport panels

| Trigger | Panel | Content |
|---------|-------|---------|
| Products | `ProductsPanel` | Featured showcase (dark bg, clipPath reveal) + 6 category grid with thumbnails |
| Brands | `BrandsPanel` | 4 brand cards (dark bg, brand image, 5-phase animation timeline) |
| Education | `EducationPanel` | 4 education items + CTA sidebar |
| Partnership | `PartnershipPanel` | 3 partnership types with icons |
| About | Direct link | — |
| Contact | Direct link | — |

**Behaviors:**
- Transparent-to-solid on scroll (threshold: 40px)
- Auto-hide on scroll down, reveal on scroll up
- Backdrop blur overlay (6px) when mega-menu open
- Lenis scroll lock when mega-menu or mobile menu is open
- Active indicator bar (scaleY 0→1 with crimson/white color)
- Menu closing state (pointer-events-none for 800ms)
- Header hover state (headerHovered flag)

### Mobile: Sheet Menu

**Component:** `MobileMenu`  
**Pattern:** Radix Sheet (slide-in from right)

- Expandable accordion sections (Products → 6 categories, Brands → 4 brands)
- Stagger entrance animation (blur + slide)
- WhatsApp CTA at bottom
- 3 pillar quick links

### Right Actions

- **WhatsApp button** — Desktop only, icon + text, solid/glass variants based on scroll
- **Mobile hamburger** — Menu icon, triggers Sheet

---

## 12. Page-by-Page Analysis

### `/about` — About Page

**8 sections:** Hero → Stats strip → Journey timeline → "More Than a Distributor" (3 pillars) → Mission & Vision → Brand portfolio (4 cards) → Meet the Team (4 placeholders) → CTA band

Key: **Journey timeline** with 5 milestones (2007–2025), alternating left/right desktop layout, vertical line connector. Team section uses placeholder avatars (Users icon) — no real photos.

### `/products` — Product Catalog

**Client Component** (`ProductsPageContent`) with:
- Filterable by: Category (7), Brand (3: CORE, Montibello, Gamma+), Audience (Salon/Barber)
- Product count: **24 products** (3 CORE, 2 Montibello, 19 Gamma+ Professional)
- URL-synced filters via `searchParams` and `router.replace`
- Card grid with image, brand badge, name, description
- "New" badge support for `isNew` flag
- WhatsApp CTA per product

### `/products/[id]` — Product Detail

**SSG via `generateStaticParams()`**  
Sections: Hero image + product name/brand/category → Gallery (with fullscreen lightbox) → Info slides carousel → Product description → WhatsApp CTA

### `/education` — Education Hub

6 content sections, filterable events:
- Articles (hardcoded array)
- Events (hardcoded array with dates, status: upcoming/past)
- Filters: Brand, type (training/workshop/masterclass/event)
- Event cards with date, location, brand badge

### `/partnership` — Partnership Form

Multi-step lead generation form:
- Fields: Business name, contact name, phone, email, city, salon type, chair count, specialization, current brands, monthly spend range, message
- Zod validation (server-side)
- Honeypot anti-spam
- Rate limiting (5/minute/IP)
- Supabase persistence → Resend email notification

### `/contact` — Contact Form

Simple contact form:
- Fields: Name, email, subject, message
- Same security pipeline (validation, honeypot, rate limit)
- Display: Phone, email, office hours, WhatsApp CTA

### `/privacy` + `/terms` — Legal

Server Components with hardcoded legal content. No interactivity.

---

## 13. Product Catalog System

### Data Architecture

All product data lives in `product-data.ts` as a TypeScript array:

```ts
export const products: Product[] = [ /* 24 products */ ];
```

**Product type fields:**
- `id`, `name`, `brand`, `category`, `audience` (salon/barber/both)
- `description`, `image`, `gallery[]`, `infoSlides[]` (with type: description/features/benefits/etc.)
- `heroImage`, `longDescription`, `keyBenefits`, `howToUse`, `recommendedFor`, `relatedIds`
- `variants[]`, `isNew`

**Product distribution:**

| Brand | Count | Category |
|-------|-------|----------|
| CORE | 3 | Hair Care (salon) |
| Montibello | 4 | Hair Care (salon) — Gold Oil Essence, Blonde Glow |
| Gamma+ Professional | 17 | Tools & Equipment (barber) — Clippers, Trimmers, Shavers, Dryers, Straighteners |

**Note:** Alfaparf Milano and Farmavita have 0 products listed.

### Helper Functions

```ts
getProductById(id: string): Product | undefined
getAllProductIds(): string[]
```

### Catalog Type

`ProductListItem` — lean Pick type for list views (excludes detail-only fields).

---

## 14. Education & Content System

### Data Architecture

`education-data.ts` contains hardcoded arrays:
- `articles[]` — Educational articles with title, excerpt, content, date, author, brand
- `events[]` — Training events with title, description, date, location, brand, status, capacity

### Content Constants

`education-constants.ts` — Category labels, filter options, brand tags for the education filter UI.

### Event Filter System

`education-events-filter.tsx` — Client-side filtering component:
- Filter by brand (Alfaparf, Farmavita, Montibello, Gamma+)
- Filter by type (Training, Workshop, Masterclass, Event)
- Date range filtering
- Status filtering (upcoming/past)

### Article/Event Detail Pages

Both use `generateStaticParams()` for SSG:
- `ArticleDetailContent` — Full article with date, author, reading time
- `EventDetailContent` — Event info with date, location, capacity, registration CTA

---

## 15. Form & Lead Generation System

### Architecture

```
Client Form Component → Server Action → Rate Limit → Honeypot → Zod Validate → Supabase Insert → Resend Email → Response
```

### Partnership Form (`PartnershipForm`)

**14 fields** validated by Zod schema:
- Required: business_name, contact_name, phone_whatsapp, city, salon_type, consent
- Optional: email, chair_count, specialization, current_brands_used, monthly_spend_range, message
- Honeypot: `company` field (hidden, must be empty)

### Contact Form (`ContactForm`)

**4 fields**: name, email, subject, message

### Security Pipeline

1. **Rate limiting** — 5 requests/minute/IP (in-memory sliding window with periodic cleanup)
2. **Honeypot** — Hidden `company` field; if filled → silent success (trick bots)
3. **Server-side Zod validation** — Allowlist validation, length limits
4. **HTML escaping** — `escapeHtml()` for email body (XSS prevention)
5. **Server-only guard** — `import "server-only"` on all server modules

### Data Flow

| Step | Tool | Output |
|------|------|--------|
| Persist | Supabase | `leads` / `contacts` table |
| Notify | Resend | Email to `LEAD_NOTIFICATION_EMAIL` |
| Export | API route | GET `/api/leads/export?token=<CSV_EXPORT_TOKEN>` |

---

## 16. Motion & Scroll Behavior

### Scroll Engine

**Lenis** (v1.3.18) with custom configuration:
- Duration: 1.4s
- Easing: `1.001 - 2^(-10t)` (exponential deceleration)
- Touch multiplier: 2.0
- Wheel multiplier: 1.0
- Respects `prefers-reduced-motion`
- **Stop/start** exposed via context for mega-menu scroll lock

### Parallax System

5-tier speed system:
| Tier | Speed | Usage |
|------|-------|-------|
| Micro | 0.04 | Subtle background elements |
| Subtle | 0.08 | Background images, wordmark |
| Default | 0.15 | Section images |
| Strong | 0.25 | Featured images |
| Hero | 0.35 | Hero video |

### Page Transitions

`PageTransition` — AnimatePresence `mode="wait"`:
- Enter: opacity 0→1, y 10→0, blur 6px→0, scale 0.992→1 (0.45s)
- Exit: opacity 1→0, y 0→-12, blur 0→6px, scale 1→0.992 (0.45s)

### Preloader

Split-wipe brand reveal (2.6s total):
1. Progress counter 0→100% (quintic ease, 1.6s)
2. Logo pulse animation
3. Split wipe — top/bottom panels scaleY→0
4. Session-skip via `sessionStorage`

### Scroll Indicator

Bottom-center pulse with glow:
- Vertical line with traveling segment (y: -100%→100%, 2.2s repeat)
- Box shadow glow: `0 0 6px 1px rgba(255,255,255,0.3)`
- Delayed entrance: `HERO_TIMING.scroll`

---

## 17. Performance Patterns

### Image Optimization

- `next/image` with `sharp` — AVIF + WebP format support
- `sizes` prop properly specified on all images
- `priority` only on logo and critical hero elements
- Carousel images use computed sizes based on slide width

### Video Optimization

- Hero video: `preload="none"`, lazy-loaded via IntersectionObserver
- Never auto-plays until section is 10% visible
- Poster image fallback (`/videos/hero-poster.jpg`)
- `disablePictureInPicture`, `disableRemotePlayback` attributes

### Animation Performance

- `will-change-filter` on hero content (blur animation)
- `will-change-backdrop` on glassmorphism cards
- `will-change-clip` on mega-menu background reveals
- `viewport={{ once: true }}` — All animations fire once only
- `prefers-reduced-motion: reduce` — Disables all transitions/animations

### Bundle

- Server Components by default — Client JavaScript only for interactive components
- Dynamic imports not used (could benefit product/education detail pages)
- No code splitting beyond Next.js automatic route-based splitting

---

## 18. SEO & Metadata Strategy

### Metadata Pattern

Every page exports `Metadata` with:
- `title` (uses template from layout: `%s — PT Alfa Beauty Cosmetica`)
- `description`
- `alternates.canonical`

### Dynamic Metadata

Product/article/event detail pages use `generateMetadata()`:
- Product: `{name} — {brand}`
- Article: `{title}` + `{excerpt}`
- Event: `{title}` + `{description}`

### Structured Data

- **JSON-LD Organization** in layout (name, URL, logo, contactPoint, sameAs)
- No Product, Article, or Event structured data

### Technical SEO

| Feature | Implementation |
|---------|----------------|
| Sitemap | Dynamic via `sitemap.ts` — 8 static + all products + events + articles |
| Robots | `robots.ts` — Allow all, sitemap URL |
| OG Image | Edge-generated (`opengraph-image.tsx`) — 1200×630 |
| Canonical | Set on every page |
| Manifest | PWA manifest with theme color and icons |
| Locale | `id_ID` |

---

## 19. Security Architecture

### Content Security Policy (Middleware)

**Nonce-based CSP** via `crypto.randomUUID()`:

```
default-src 'self'
script-src 'self' 'nonce-{uuid}' {GA domains}
style-src 'self' 'unsafe-inline'
img-src 'self' data: {Google domains}
connect-src 'self' {Google analytics}
frame-ancestors 'none'
base-uri 'none'
object-src 'none'
form-action 'self'
upgrade-insecure-requests
```

### Security Headers (next.config.ts)

| Header | Value |
|--------|-------|
| X-Content-Type-Options | nosniff |
| X-Frame-Options | DENY |
| Referrer-Policy | origin-when-cross-origin |
| Permissions-Policy | camera=(), microphone=(), geolocation=() |
| Strict-Transport-Security | max-age=63072000; includeSubDomains; preload |

### Form Security

- **Server-side validation** — Zod schemas with allowlists
- **Honeypot** — Hidden field bot trap
- **Rate limiting** — 5/min/IP sliding window
- **HTML escaping** — XSS prevention in email bodies
- **CSRF** — Next.js Server Actions have built-in CSRF protection
- **API token** — CSV export requires timing-safe token comparison

### Data Protection

- `import "server-only"` on all server modules (supabase, email, rate-limit, logger)
- Service role key never exposed to client
- Environment variable gating (analytics, email, database)

---

## 20. Backend Integration

### Supabase

**Usage:** Lead and contact form persistence  
**Client:** Singleton service-role client (server-only, lazy-init)  
**Tables:** `leads`, `contacts`  
**Auth:** Service role key (no user authentication needed)

### Resend (Email)

**Usage:** Internal notification emails  
**Pattern:** Lazy-cached client, HTML template with escaped user data  
**From:** `leads@alfabeauty.co.id` / `{SITE_NAME} Leads`  
**To:** `LEAD_NOTIFICATION_EMAIL` env var

### Analytics

| Platform | Integration |
|----------|-------------|
| GA4 | `@next/third-parties/google` + `window.gtag` events |
| Facebook Pixel | `window.fbq` (loaded via inline script) |
| Microsoft Clarity | `window.clarity` (loaded via inline script) |

**Tracked events:**
- `cta_whatsapp_click` — location, product_name (optional)
- `lead_form_submit` — salon_type, city

---

## 21. CSS Architecture (globals.css)

**~850 lines** organized into 15+ numbered utility sections.

### Layer Strategy

1. **Tailwind imports** — `@import "tailwindcss"` at top
2. **Theme tokens** — `@theme` block for all design tokens
3. **CSS variables** — `:root` block for shadcn compatibility
4. **Base styles** — `@layer base` for body, border defaults
5. **Utility classes** — Un-layered (higher specificity) for custom components

### Key Custom CSS Features

| Feature | Implementation |
|---------|----------------|
| Button fill sweep | `.btn-animated` + `.btn-fill` + `.btn-label` — CSS-only translateY 104%→0% |
| Text reveal (per-line) | `.reveal-text .reveal-line` — 6 nth-child stagger delays |
| Text reveal (per-word) | `.reveal-text-v3 .reveal-word` — CSS var `--word-index` × `--stagger-ms` |
| Link underline | `.link-animated::after` — scaleX 0→1 on hover |
| Image hover zoom | `.img-zoom-wrapper` — scale 1→1.08 |
| Grain texture | `.grain-overlay::after` — SVG noise filter (3%, 6%, 1.5%) |
| Gradient fade masks | `.fade-mask-x` — CSS mask-image linear-gradient |
| Glassmorphism | 5 variants: `.glass`, `.glass-dark`, `.glass-surface`, `.glass-warm`, `.glass-strong` |
| Animated border | `.border-grow-x` / `.border-grow-y` — scaleX/Y 0→1 |
| Marquee | `.marquee-track` — CSS keyframe infinite translateX |
| Reduced motion | `@media (prefers-reduced-motion)` — blanket disable |
| Ken Burns | `.ken-burns` — 18s infinite scale+translate drift |
| Vignette | `.vignette-warm` — radial-gradient overlay |
| Will-change | `.will-change-filter`, `.will-change-backdrop`, `.will-change-clip` |

---

## 22. Configuration & Constants

### `lib/config.ts` — Single Source of Truth

**All hardcoded values centralized:**

| Constant | Value |
|----------|-------|
| `SITE_NAME` | "PT Alfa Beauty Cosmetica" |
| `SITE_SHORT_NAME` | "Alfa Beauty" |
| `SITE_DOMAIN` | "https://alfabeauty.co.id" |
| `ESTABLISHED_YEAR` | 2007 |
| `YEARS_OF_EXPERIENCE` | Dynamic (2025 - 2007 = "18+") |
| `CONTACT_EMAIL` | "alfabeautycosmeticaa@gmail.com" |
| `WHATSAPP_NUMBER` | "628151168745" |
| `WHATSAPP_URL` | "https://wa.me/628151168745" |
| `INSTAGRAM_HANDLE` | "alfabeautycosmetica" |
| `NAV_LINKS` | 8 routes |
| `BRANDS` | 4 brands (Alfaparf, Farmavita, Montibello, Gamma+) |
| `PRODUCT_CATEGORIES` | 6 categories |
| `PILLARS` | 3 (Products, Education, Partnership) |
| `LEGAL_LINKS` | 3 (Contact, Privacy, Terms) |

---

## 23. Strengths

### Design & UX
1. **Cohesive visual identity** — Consistent warm-neutral palette, editorial typography, cinematic motion throughout
2. **Premium animation quality** — 30 animation variants, parallax, clip-path reveals, blur transitions, grain textures
3. **Yucca-inspired patterns** — Mega-menu 5-phase timeline, fixed reveal footer, announcement bar, pillar cards, trust badges
4. **Responsive design** — Mobile menu, responsive grids, fluid typography
5. **Accessibility basics** — Skip-to-content link, aria-labels, semantic HTML, sr-only text, reduced motion support

### Architecture
6. **Strong separation of concerns** — Config, motion, analytics, validation all centralized
7. **Server Components default** — Minimal client-side JS
8. **Full SSG** — 74 pre-rendered pages, excellent TTFB
9. **Type safety** — TypeScript throughout with properly typed variants, props, data

### Security
10. **Defense in depth** — CSP nonce, security headers, rate limiting, honeypot, server-side validation, HTML escaping
11. **Server-only guards** — Critical modules protected from client import

---

## 24. Weaknesses & Gaps

### Content & Data
1. **No CMS** — All content hardcoded in TypeScript; requires code deploy for any content change
2. **Incomplete product data** — 2 of 4 brands (Alfaparf Milano, Farmavita) have 0 products listed
3. **Placeholder team photos** — `Users` icon instead of actual team member photos
4. **Indonesian descriptions on products** — Product descriptions in Bahasa but site is in English
5. **Empty `infoSlides[]`** — Several products have empty info slide arrays

### Design & UX Gaps
6. **No dark mode** — Only light mode defined in CSS variables
7. **No search functionality** — No product search, site search, or search icon behavior
8. **No breadcrumbs** — Missing on product detail and article detail pages
9. **No loading states for images** — No skeleton/shimmer placeholders on product cards
10. **Single image per brand** — All brand sections use the same `alfaparf-milano.webp` placeholder

### Technical
11. **No dynamic imports** — Could benefit from lazy-loading heavy components (carousel, forms)
12. **No ISR/revalidation** — Purely static; any update needs full rebuild
13. **No error boundary per route** — Single top-level `error.tsx`
14. **No structured data for products** — Missing Product schema for rich search results
15. **Supabase admin client singleton pattern** — Could become an issue in serverless cold starts

### Animation Performance
16. **Heavy animation payload** — `motion.ts` exports 30+ variant objects always loaded
17. **CSS `will-change` overuse** — Applied broadly rather than selectively
18. **Grain overlay on many sections** — Pseudo-element with SVG filter on multiple sections

### SEO
19. **No FAQ structured data** — Missing for education/partnership pages
20. **No Article structured data** — Education articles lack Article schema
21. **OG image is generic** — Same OG image for all pages (no per-page variants)
22. **Single locale** — id_ID declared but content is in English

---

## 25. Summary Statistics

| Metric | Value |
|--------|-------|
| **Source files** | ~65 |
| **Build pages** | 74 static |
| **React components** | ~48 |
| **Public routes** | 13 (8 static + 3 dynamic + 1 API + special) |
| **Products** | 24 (3 CORE, 4 Montibello, 17 Gamma+) |
| **Brands configured** | 4 (2 have 0 products) |
| **CSS lines (globals)** | ~850 |
| **Motion variants** | 30 sections |
| **Easing curves** | 7 named |
| **Parallax tiers** | 5 |
| **UI components** | 11 (shadcn + custom) |
| **Form fields (lead)** | 14 |
| **Form fields (contact)** | 4 |
| **Analytics platforms** | 3 (GA4, Clarity, FB Pixel) |
| **Dependencies** | 31 (production) |
| **Build errors** | 0 |

---

*End of Frontend Deep Study — v1.0*
