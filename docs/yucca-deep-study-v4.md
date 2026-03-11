# Studi Detail: yucca.co.za — Comprehensive Analysis v4

> **Tanggal**: Januari 2026 (refresh)  
> **Sumber**: Fetch langsung semua halaman (12+ pages) + browser live analysis + perbandingan v3  
> **Tujuan**: Analisis menyeluruh terkini arsitektur, design system, konten, animasi, UX patterns, e-commerce, dan conversion funnels  
> **Konteks**: Refresh dari yucca-deep-study-v3.md — memvalidasi data, menambah temuan baru, memperdalam analisis  

---

## Daftar Isi

1. [Ringkasan Eksekutif](#1-ringkasan-eksekutif)
2. [Arsitektur Teknologi](#2-arsitektur-teknologi)
3. [Sitemap & Navigasi Lengkap](#3-sitemap--navigasi-lengkap)
4. [Mega-Menu System](#4-mega-menu-system)
5. [Design System](#5-design-system)
6. [Preloader & Brand Reveal](#6-preloader--brand-reveal)
7. [Animation Engine & Patterns](#7-animation-engine--patterns)
8. [Homepage — Section-by-Section](#8-homepage--section-by-section)
9. [About Page](#9-about-page)
10. [Industry Pillar Pages](#10-industry-pillar-pages)
11. [Custom Solutions Page](#11-custom-solutions-page)
12. [Shop / E-commerce](#12-shop--e-commerce)
13. [Product Detail Page](#13-product-detail-page)
14. [Programmes (Rewards & Direct)](#14-programmes-rewards--direct)
15. [Contact Page](#15-contact-page)
16. [Blog / Case Studies](#16-blog--case-studies)
17. [FAQ — Mega Hub](#17-faq--mega-hub)
18. [Footer, CTA & Conversion Patterns](#18-footer-cta--conversion-patterns)
19. [Page Template Shared Components](#19-page-template-shared-components)
20. [Content Strategy & Information Architecture](#20-content-strategy--information-architecture)
21. [Responsive & Mobile Strategy](#21-responsive--mobile-strategy)
22. [SEO Patterns](#22-seo-patterns)
23. [Key Takeaways untuk Alfa Beauty](#23-key-takeaways-untuk-alfa-beauty)

---

## 1. Ringkasan Eksekutif

Yucca.co.za adalah website B2B packaging supply company dari Cape Town, South Africa, yang dibangun di atas WordPress + WooCommerce dengan custom theme "Yucca" oleh Zulik Digital. Situs ini menggabungkan motion design premium (GSAP 3 + Barba.js + Lenis) dengan fungsi e-commerce, menghasilkan pengalaman browsing yang sangat polished sambil tetap fungsional untuk ordering.

### Key Metrics (Saat Ini)
- **Total halaman utama**: 12+ (homepage, about, 3 industry pillars, custom solutions, shop, product detail, programmes, contact, blog, FAQ)
- **Product catalog**: 90+ produk aktif, 14 kategori, 9 material filter
- **Certification badges**: 14 (FDA, EU 10/2011, BRCGS, FSC, GRS, BPI, DIN CERTCO, TÜV OK ×2, ISO ×4, FSSC 22000)
- **Copyright**: "Yucca 2026. All Rights Reserved"
- **Social channels**: Facebook, Instagram, LinkedIn
- **WhatsApp**: +27 83 796 0416 (floating button di semua halaman)

### Apa yang Membuat Situs Ini Menonjol
1. **Cohesive motion identity** — 6 signature animation patterns yang konsisten di seluruh situs
2. **Mega-menu sebagai discovery hub** — bukan sekadar nav, tapi mini-landing page
3. **Dual e-commerce model** — public shop (Rewards) + gated B2B portal (Direct)
4. **Content density** — setiap halaman memiliki 6-10 sections, tidak ada "thin" pages
5. **Trust engineering** — 14 certification badges, FAQ di setiap halaman, team profiles, sustainability stats
6. **Visual storytelling** — dark/moody product photography kontras dengan clean white product shots

---

## 2. Arsitektur Teknologi

### 2.1 Stack Lengkap (Confirmed)

| Layer | Teknologi | Detail |
|-------|-----------|--------|
| **CMS** | WordPress + WooCommerce | Product catalog, cart, checkout, accounts |
| **Theme** | Custom "Yucca" by Zulik Digital | `/wp-content/themes/yucca/` |
| **Animation** | GSAP 3 (GreenSock) | Core animation library |
| **GSAP Plugins** | ScrollTrigger, SplitText, Observer | Scroll-linked + text animations |
| **Page Transitions** | Barba.js (`sync: true`) | SPA-like navigation tanpa full reload |
| **Smooth Scroll** | Lenis | Quintic ease-out: `e => 1 - Math.pow(1-e, 5)` |
| **Lazy Loading** | vanilla-lazyload | Progressive image loading |
| **Build** | Webpack → `dist/main.js` | Single bundle |
| **JS Architecture** | Class-based ES6+ | Per-page class system |
| **Backend** | PHP (WordPress) | Template rendering + REST API |
| **Payments** | PayFast gateway | South African payment processor |
| **Maps** | Google Maps API | Contact page embed |
| **Cookies** | Custom consent banner | GDPR-style "Accept All / Customise / Reject All" |
| **Images** | .webp (loader), .jpg/.png (content) | WordPress responsive sizes |
| **Logo** | SVG | `/wp-content/themes/yucca/src/assets/images/logo-icon.svg` |

### 2.2 JS Bundle Architecture
```
dist/main.js (single bundle)
├── App (entry point)
│   ├── Header (scroll-aware show/hide)
│   ├── Nav (mega-menu timelines per panel)
│   ├── Intro (Preloader sequence builder)
│   └── Barba.js router (page class dispatcher)
├── Pages/
│   ├── Home (hero + marquees + product carousel + standards)
│   ├── About (timeline + team + values + gallery)
│   ├── FoodService (pillar template)
│   ├── FoodProcessing (pillar template)
│   ├── Agriculture (pillar template)
│   ├── CustomSolutions (tabs + process steps)
│   ├── Shop (filters + product grid + infinite scroll)
│   ├── Product (single product gallery + add to cart + pairings)
│   ├── Contact (form + Google Maps init)
│   ├── Blog (category filters + article grid)
│   ├── Post (single article)
│   ├── Programmes (rewards calculator slider + Direct features)
│   ├── Waitlist (sign-up form)
│   ├── Cart (WooCommerce cart)
│   ├── FAQ (tabbed accordion categories — 7 tabs)
│   ├── Legal (Privacy, Terms — static pages)
│   └── Account (WooCommerce my-account)
└── Utilities
    ├── Lenis instance (start/stop control)
    ├── LazyLoad (reinit on Barba transitions)
    └── ScrollTrigger manager (kill/create on navigation)
```

---

## 3. Sitemap & Navigasi Lengkap

### 3.1 Full Sitemap
```
yucca.co.za/
├── / (Homepage)
├── /about
├── /food-service
├── /food-processing
├── /agriculture
├── /custom-solutions
│   ├── #custom-packaging (anchor)
│   └── #branding (anchor)
├── /shop (WooCommerce catalog)
│   ├── ?product_cat=promo (Promotions)
│   ├── ?product_cat=coffee (Coffee — 12 items)
│   ├── ?product_cat=smoothies (Smoothies — 9 items)
│   ├── ?product_cat=deli (Deli — 37 items)
│   ├── ?product_cat=takeout (Takeout — 56 items)
│   ├── ?packaging_type=cutlery (Cutlery)
│   ├── ?packaging_type=bags (Bags)
│   ├── ?product_cat=extras (Extras — 8 items)
│   └── /product/[slug] (individual products)
├── /programmes
│   ├── #loyalty (Yucca Rewards section)
│   └── #direct (Yucca Direct B2B section)
├── /waitlist
├── /blog
│   ├── /agricultural-packaging-for-export/ (Agriculture, 9 Sep 2025)
│   └── /sustainable-packaging-south-africa/ (Blog, 8 Dec 2025)
├── /faq (7 tabbed categories)
├── /contact
├── /cart
├── /checkout
├── /my-account
│   └── ?register=true (Registration for Rewards)
├── /privacy-policy
├── /terms-conditions
└── /wp-content/uploads/2025/09/Credit-Application-YUCCA.pdf
```

### 3.2 Navigation Top Bar (Persistent)
```
[Home]  |  0 [Cart badge]  |  [Account]
```
Selalu ada di atas header, memberikan quick access ke utilitas tanpa membuka menu.

### 3.3 Primary Navigation Triggers
```
Shop ↓          Packaging Solutions ↓          Resources ↓          About          Contact
```
3 item pertama memiliki dropdown mega-menu panels. "About" dan "Contact" adalah direct links.

### 3.4 Cross-Linking Strategy (Pola Cohesive)
Yucca menerapkan **contextual cross-linking** yang sangat konsisten:
- **Setiap halaman** memiliki: FAQ section + Pre-footer CTA + WhatsApp FAB + Footer pillar cards
- **Industry pages** → /contact (specialist CTA), /custom-solutions (5-step process), /shop (product carousel)
- **Shop** → /custom-solutions (nav CTA), /programmes (loyalty banner), /my-account?register (Rewards signup)
- **Homepage** → semua 3 pilar + /about + /shop + /contact + /faq
- **Product detail** → "Pair it with" cross-sells + "You might also be interested in" recommendations

---

## 4. Mega-Menu System

### 4.1 Struktur 3 Panel

#### Panel 1: Shop (Product Categories)
```
┌──────────────────────────────────────────────────┐
│  Promotions  Coffee  Smoothies  Deli  Takeout    │
│  Cutlery     Bags    Extras                       │
│                                                    │
│  ┌─ CTA Card 1 ────────────────────────────────┐ │
│  │ "Looking for something specific?"             │ │
│  │  We can customise your packaging              │ │
│  │  to fit your needs → /custom-solutions        │ │
│  └───────────────────────────────────────────────┘ │
│  ┌─ CTA Card 2 ────────────────────────────────┐ │
│  │ "Join our loyalty programme to earn 5% back"  │ │
│  │  → /programmes                                │ │
│  └───────────────────────────────────────────────┘ │
│  ┌─ Promo Notice ───────────────────────────────┐ │
│  │ "Promotions return soon"                      │ │
│  │  We believe in fair, transparent pricing.     │ │
│  │  From time to time, we'll introduce limited   │ │
│  │  offers on select ranges.                     │ │
│  │  → [Promotions return soon] [Shop all]        │ │
│  └───────────────────────────────────────────────┘ │
│  [Featured Image Panel]                            │
└──────────────────────────────────────────────────┘
```

#### Panel 2: Packaging Solutions (Industry Pillars)
```
┌──────────────────────────────────────────────────┐
│  Food Service →       /food-service               │
│  Food Processing →    /food-processing             │
│  Agriculture →        /agriculture                 │
│                                                    │
│  ┌─ CTA Card ──────────────────────────────────┐ │
│  │ "Looking for something specific?"             │ │
│  │  → /custom-solutions                          │ │
│  └───────────────────────────────────────────────┘ │
│  [Featured Image Panel — hover-switchable]         │
│  (image changes based on hovered menu item)        │
└──────────────────────────────────────────────────┘
```

#### Panel 3: Resources
```
┌──────────────────────────────────────────────────┐
│  Waitlist →                  /waitlist             │
│  Yucca Rewards & Direct →   /programmes           │
│  Case Studies & Blogs →     /blog                  │
│  FAQs →                     /faq                   │
│                                                    │
│  [Featured Image Panel — hover-switchable]         │
└──────────────────────────────────────────────────┘
```

### 4.2 Mega-Menu UX Mechanics
- **100-150ms hover debounce** — mencegah accidental submenu open/close
- **Mouse area tracking** — panel tetap open selama cursor di area navigation
- **Image swap on hover** — pada panel 2 & 3, gambar featured berubah sesuai item yang di-hover
- **Active state indicator** — item yang sedang di-hover mendapat visual emphasis
- **Scroll lock** — `lenis.stop()` saat mega-menu dibuka, `lenis.start()` saat ditutup
- **Mobile (≤1100px)** — hamburger → full-screen overlay + accordion submenus
- **Background overlay** — halaman di bawah mendapat dark overlay saat menu terbuka

### 4.3 Mega-Menu Card Animation (GSAP Timeline)
```javascript
// Per-card animation timeline (5 phases):
Phase 1: Background clipPath inset reveal (top→bottom)
  clipPath: "inset(0% 0% 100% 0%)" → "inset(0% 0% 0% 0%)"
  duration: 0.6s, ease: power3.inOut

Phase 2: Media scale zoom-in settle
  scale: 1.4 → 1
  duration: 0.8s, ease: power2.out, offset: +0.1s

Phase 3: Text lines stagger slide up
  yPercent: 100 → 0
  stagger: 0.04, duration: 0.5s, ease: power2.out, offset: +0.2s

Phase 4: Border horizontal grow
  scaleX: 0 → 1, transformOrigin: "left"
  duration: 0.5s, ease: power2.out, offset: +0.1s

Phase 5: Link CTA slide up
  yPercent: 100 → 0
  duration: 0.4s, ease: power2.out, offset: +0.1s
```

### 4.4 Key Design Pattern: CTA dalam Menu
Yucca menyematkan **conversion opportunities langsung di dalam navigasi**:
- "Looking for something specific? We can customise..." → /custom-solutions
- "Join our loyalty programme to earn 5% back" → /programmes  
- "Promotions return soon" + "Shop all products" → /shop

Ini mengubah navigasi dari sekadar wayfinding menjadi **active selling tool**.

---

## 5. Design System

### 5.1 Color Palette
| Token | Estimated Value | Usage |
|-------|----------------|-------|
| **Primary Deep Forest Green** | `~#1a3a2a` | Headlines, primary text, nav, accents |
| **Gold/Brass Accent** | `~#c4a146` | Buttons, highlights, hover states, rewards imagery |
| **Background Warm Cream** | `~#f5f2ed` | Page backgrounds, light section fills |
| **Background Dark** | `~#1a1a1a` → `#0d0d0d` | Footer, dark sections, preloader overlay |
| **White** | `#ffffff` | Text on dark, card backgrounds, product shots |
| **Body Text Gray** | `~#3a3a3a` | Paragraphs, descriptions |
| **Subtle Border** | `rgba(0,0,0,0.08)` | Card dividers, section separators |
| **Eco/Sustainability Green** | Teal accent | Certification badges, sustainability highlights |
| **Error/Stock Status** | Red/warm | "OUT OF STOCK" badges |
| **New Badge** | Green/brand | "NEW" product badges |

### 5.2 Typography System
| Role | Specs |
|------|-------|
| **Display/H1** | Sans-serif, ~60-80px desktop, bold/700, tracking -0.02em |
| **H2 Section** | ~36-48px, semibold/600, tight leading |
| **H3 Card Title** | ~24-28px, medium/500 |
| **Body** | ~16-18px, regular/400, line-height 1.6-1.7 |
| **Caption/Label** | ~12-14px, uppercase, letter-spacing 0.05-0.1em, medium/500 |
| **Price** | ~14-16px, medium, "From R X.XX" format |
| **Nav Links** | ~14-16px, medium, uppercase tracking |
| **FAQ Question** | ~18-20px, semibold/600, clickable |
| **Marquee Text** | ~16-24px, medium, continuous scroll |
| **Badge Text** | ~10-12px, bold/semibold, uppercase |

### 5.3 Spacing & Layout Grid
| Pattern | Value |
|---------|-------|
| **Max-width container** | ~1200-1400px |
| **Section padding-y** | ~120-160px desktop, ~60-80px mobile |
| **Card padding** | ~24-32px internal |
| **Grid gaps** | ~16-32px |
| **Border-radius** | 0-8px (minimal, mostly sharp edges) |
| **Image ratios** | 16:9 (hero/banner), 1:1 (products on white bg), 4:3 (cards), 3:2 (gallery) |

### 5.4 Visual Identity Pillars
1. **Clean & minimal**: generous whitespace, restrained muted palette
2. **Dark/light rhythm**: alternating dark (deep green/black) and light (cream/white) sections
3. **Industrial-premium**: matte textures, deep forest green + gold/brass accents
4. **Editorial typography**: oversized display headings with tight tracking on clean backgrounds
5. **Full-bleed imagery**: hero images stretch viewport width
6. **ClipPath reveals**: signature animation pattern throughout the site
7. **Product photography**: white/neutral background, consistent lighting, 1:1 ratio
8. **Moody atmospheric images**: dark, artistic food/produce photography for hero backgrounds

### 5.5 Iconography & Badges
- **14 certification badges** (FDA, EU, BRCGS, FSC, GRS, BPI, DIN CERTCO, TÜV ×2, ISO ×4, FSSC) muncul di Homepage, semua Industry pages, dan Custom Solutions
- **SVG logo-icon** digunakan sebagai loading state indicator di dalam UI elements
- **Product feature icons**: "Branding Compatible", "Recyclable", "Compostable" badges on product cards
- **Social icons**: Facebook, Instagram, LinkedIn di footer

---

## 6. Preloader & Brand Reveal

### 6.1 Frame Assets
```
/wp-content/themes/yucca/src/assets/images/loader/
├── 1.webp, 2.webp, 3.webp, 4.webp, 5.webp
└── logo-icon.svg
```
Preloader menampilkan **5 product photography frames** yang bergantian cepat, memberikan "flash" berbagai produk sebelum situs terungkap.

### 6.2 Full Timeline (~2.5-3 seconds)
```
Phase 1: Logo Entrance (0s → ~1.5s)
├─ Logo icon:      scale: 0 → 1         (1.2s, power2.inOut)
├─ "YUCCA" text:   y: 80 → 0            (0.8s, power2.out, overlap -0.6s)
└─ "PACKAGING":    y: 80 → 0            (0.8s, power2.out, overlap -0.6s)

Phase 2: Logo Pack Up (~1.5s → ~2.1s)
├─ Logo icon:      y: 0 → -100          (0.6s, power2.inOut)
├─ "YUCCA":        y: 0 → -120          (0.6s, power2.inOut, simultaneous)
└─ "PACKAGING":    y: 0 → -120          (0.6s, power2.inOut, simultaneous)

Phase 3: Product Image Sequence (~2.1s → ~3.1s)
├─ Frame 1→5: rapid crossfade (0.2s each hold)
└─ Creates a "flip-book" product montage effect

Phase 4: Exit (~3.1s → ~3.9s)
├─ Loader background: autoAlpha 1 → 0   (0.8s, power2.inOut)
└─ Container: display: none
```

### 6.3 Session Handling
- Preloader berjalan pada **setiap page load** (no session skip)
- Barba.js memastikan preloader hanya muncul saat initial load
- Navigasi internal menggunakan page transition overlay (~1s)

---

## 7. Animation Engine & Patterns

### 7.1 Registered GSAP Plugins
```javascript
gsap.registerPlugin(ScrollTrigger, SplitText, Observer);
```

### 7.2 Core Easings
| Easing | Code | Where Used |
|--------|------|------------|
| Power 2 InOut | `"power2.inOut"` | Preloader, general transitions |
| Power 2 Out | `"power2.out"` | Text reveals, card animations, slide-ups |
| Power 3 InOut | `"power3.inOut"` | ClipPath reveals, premium movements |
| Power 3 Out | `"power3.out"` | Hero entrances, large-scale movements |
| Quintic | `1 - Math.pow(1-e, 5)` | Lenis smooth scroll easing |
| None (linear) | `"none"` | ScrollTrigger scrub parallax |

### 7.3 Six Signature Animation Patterns

#### Pattern 1: ClipPath Inset Reveal ⭐ (Most Used)
```
Transform: clipPath: "inset(0% 0% 100% 0%)" → "inset(0% 0% 0% 0%)"
Duration: 0.6-0.8s | Ease: power3.inOut
Used: Nav cards, section reveals, image masks, hero media
Directional variants: top→bottom, bottom→top, left→right, right→left
```
Ini adalah "tanda tangan" Yucca — hampir setiap element menggunakan clipPath reveal.

#### Pattern 2: SplitText Stagger
```
Transform: yPercent 100 → 0 per line (atau per char)
Duration: 0.5-0.8s | Stagger: 0.04 | Ease: power2.out
Trigger: ScrollTrigger start: "top 80%"
Used: Headlines, section titles, hero text
```

#### Pattern 3: Scale + Parent Clip Image Reveal
```
Parent wrapper: clipPath reveal (pattern 1)
Child image: scale 1.4 → 1 (during clip reveal)
Combined: Ken Burns zoom-in yang terungkap dari dalam mask
Duration: 0.8-1.2s | Ease: power2.out (scale) + power3.inOut (clip)
```

#### Pattern 4: Border ScaleX Grow
```
Transform: scaleX 0 → 1, transformOrigin: "left"
Duration: 0.5s | Ease: power2.out
Used: Card separators, section dividers, timeline markers
```

#### Pattern 5: yPercent Slide Up (Staggered)
```
Transform: yPercent 100 → 0
Duration: 0.4-0.6s | Stagger: 0.04-0.08 | Ease: power2.out
Used: Text lines, CTA buttons, labels, menu items
```

#### Pattern 6: ScrollTrigger Parallax
```
Transform: y "-20%"
Ease: "none" (linear) | scrub: true
Trigger: start "top bottom", end "bottom top"
Used: Section backgrounds, decorative elements
```

### 7.4 Animation Orchestration Formula
Setiap section mengikuti pola orchestration **hierarchy-based**:
```
1. ScrollTrigger detect section → viewport (start: "top 80%")
2. Master timeline fires:
   a. Container/wrapper → clipPath reveal atau opacity     (0s base)
   b. Heading → SplitText stagger per line                 (+0.1s)
   c. Body text → yPercent slide up                        (+0.2s)
   d. Image → scale 1.4→1 + parent clipPath reveal        (+0.15s)
   e. CTA button → slide up                               (+0.3s)
   f. Decorative (borders, icons) → scaleX grow / fade    (+0.2s)
3. Total stagger offset inter-phase: ~0.1-0.2s
4. Total section reveal: ~0.8-1.2s from trigger
```

### 7.5 Barba.js Page Transition
```
User clicks link → Barba intercepts
→ lenis.stop()
→ Loader overlay: autoAlpha 0 → 1 (0.5s)
→ XHR fetch new page
→ DOM swap content container
→ ScrollTrigger.refresh(), LazyLoad reinit
→ Loader overlay: autoAlpha 1 → 0 (0.5s)
→ lenis.start()
→ New page animations begin
Total: ~1 second
```

### 7.6 Marquee Animation System
Yucca menggunakan **CSS-driven infinite marquee** yang diulang secara konsisten:
- Setiap row duplikasi konten 4× untuk seamless loop
- Alternating direction (→, ←, →, ←) menciptakan visual counter-rhythm
- Speed: consistent, moderate pace (~60-80px/second estimated)
- Appear on: Homepage (4 strips value props), Industry pages (sub-industry terms), About (10 values)

---

## 8. Homepage — Section-by-Section

### 8.1 Section Flow (Top to Bottom)
```
 1. Cookie Consent Banner
 2. Preloader (initial load only)
 3. Header + Mega-Menu
 4. Hero ("Packaging that Performs. Innovated for Industry Leaders.")
    └─ 3 Pillar CTA cards (Food Service, Food Processing, Agriculture)
    └─ Background hero image (iced coffee cups on pedestal)
 5. Marquee Band (4 rows)
    └─ Row 1→: "Yucca Rewards · Yucca Direct (B2B)"
    └─ Row 2←: "Quality · Branding"
    └─ Row 3→: "Custom Packaging · Sustainable"
    └─ Row 4←: "Innovation · Partnerships"
 6. About Intro ("Committed to Excellence, always Innovating")
    └─ Mission card + Vision card
 7. New Products Carousel (4 products with prices + NEW badge)
 8. Pre-Footer CTA ("Brands that thrive invest in custom-designed packaging...")
    └─ [Enquire now] + rolling marquee "Not sure what's possible?"
 9. Factory & Product Standards (14 certification badges)
10. FAQ Accordion (5 questions + "View all" → /faq)
11. WhatsApp FAB (fixed bottom-right)
12. Mega Footer
```

### 8.2 Hero Deep Analysis
- **Headline**: "Packaging that Performs. Innovated for Industry Leaders." — split across 2 lines
- **3 Pillar Cards**: stacked horizontal (desktop), each with title + "Explore [Pillar]" CTA
  - Food Service → /food-service
  - Food Processing → /food-processing
  - Agriculture → /agriculture
- **Hero Image Strategy**:
  - Desktop: `yucca-packaging-homepage-intro-plastic-cups-for-iced-chilled-drinks.jpg` — studio shot of iced coffee cups on pedestal
  - Mobile: `..._mobile.jpg` — separate mobile-optimized crop
  - Secondary visual: plastic divider ready meal tray (`.webp`) — positioned as floating product element
- **Animation**: SplitText headline reveal + pillar cards stagger clipPath reveal

### 8.3 Marquee Strategy
4 marquee strips running simultaneously:
| Row | Direction | Content | Purpose |
|-----|-----------|---------|---------|
| 1 | → right | "Yucca Rewards · Yucca Direct (B2B)" | Programme promotion |
| 2 | ← left | "Quality · Branding" | Capability keywords |
| 3 | → right | "Custom Packaging · Sustainable" | Value propositions |
| 4 | ← left | "Innovation · Partnerships" | Positioning keywords |

Alternating left/right = **visual tension** yang menarik mata dan mengurangi monotoni.

### 8.4 About Intro Section
- Headline: "Committed to Excellence, always Innovating"
- Body: "Remarkable packaging is our promise to you. What doesn't meet Yucca standards is refined until it does."
- CTA: "About us" → /about
- 2 cards: Mission + Vision (identical styling to About page, creating visual consistency)

### 8.5 New Products Carousel
| Product | Price | Badge |
|---------|-------|-------|
| Single Wall Matte Black Coffee Cup | From R1.09 | NEW |
| Paper Pulp Cup Holder | From R1.55 | NEW |
| Dessert Cup (90mm) | From R1.38 | NEW |
| Dessert Cup Flat Lid (90mm) | From R0.63 | NEW |

**Catatan**: harga selalu "From R X.XX incl. vat" — menunjukkan variable pricing berdasarkan packing type/quantity.

---

## 9. About Page

### 9.1 Section Flow
```
 1. Hero ("Adaptable and Resilient like the Yucca Plant.")
    └─ Body: "Packaging is universal, and we use it every day..."
 2. Journey Timeline (5 milestones: 2002, 2008, 2015, 2020, 2025)
 3. Mission/Vision Cards
 4. Team Section ("Meet the Team" — 5 members)
 5. Values Marquee (10 values, infinite horizontal scroll)
 6. Gallery ("Our Space" — 8 images carousel)
 7. Sustainability Stat ("28% Decreased scope 3 emissions")
 8. CTA ("Let's work together")
 9. Footer
```

### 9.2 Timeline Milestones
| Year | Event | Detail |
|------|-------|--------|
| **2002** | Founded | Masuk ke dunia packaging di Paarl, South Africa |
| **2008** | Global Expansion | Memperluas jaringan partner global |
| **2015** | Multisteps Partnership | Partner dengan Multisteps Manufacturing (custom mould & production partner) |
| **2020** | Business Boom | Bisnis melonjak selama COVID lockdown |
| **2025** | New Era | Trusted packaging supplier, peluncuran website baru |

### 9.3 Team
| Name | Title |
|------|-------|
| Dirk Theart | Managing Director |
| Reynardt Bester | General Manager |
| Byron Clarke | Operations Manager |
| Keith Hesketh | Marketing & eCommerce |
| Donovan Theart | Business Development |

### 9.4 Ten Company Values (Marquee)
Quality Assurance · Efficiency · Customer Focus · Safety · Sustainability · Collaboration · Integrity · Compliance · Innovation · Reliability

### 9.5 Sustainability Data
- "28% Decreased scope 3 emissions as per GCX Sustainability Report 2024"
- Ini merupakan **data-driven trust signal** yang memperkuat brand credibility

---

## 10. Industry Pillar Pages

### 10.1 Shared Template Structure
Semua 3 industry pages (Food Service, Food Processing, Agriculture) menggunakan **template identik** dengan content berbeda:

```
 1. Hero with Product Image
    └─ Large product cutout image (floating)
    └─ Headline + Tagline
    └─ CTA link to /contact
 2. Sub-Industry Marquee (4 rows)
    └─ Rolling text showing sub-verticals served
 3. "Your Product, Our Protection" / "Simplifying Large-scale Supply" / "Think Global Market Growth"
    └─ Partnership mention (Multisteps)
    └─ 5 product gallery images
 4. Product Carousel (4 featured products with prices)
 5. Loyalty CTA ("5% cashback" — Food Service only)
 6. "Why choose Yucca" (4-6 feature cards)
 7. "Our 5 Step Process" → /custom-solutions
 8. Factory & Product Standards (14 badges)
 9. FAQ Accordion (3-5 questions + "View all")
10. WhatsApp FAB
11. Footer
```

### 10.2 Page-Specific Content

#### Food Service
- **Hero**: "Serving up exceptional packaging."
- **Product image**: Kraft salad bowl
- **Marquee**: Hotels · Event Catering · Restaurants · Food Deliveries · Cafés · Bakeries · Delis · Juice Bars · Food Trucks · Market Stalls
- **Featured products**: Double Wall Kraft Coffee Cup R2.07, Smoothie Cup R1.55, Bagasse Clamshell R3.80, Kraft Paper Square Salad Bowl R2.65
- **Unique**: "Need to restock? Order now" CTA (direct-to-shop approach)
- **Feature cards**: One-of-a-kind Designs, Certified Food Safety, Sustainable Options, Dependable Quality
- **CTA**: "5% cashback" loyalty programme

#### Food Processing
- **Hero**: "Engineered to preserve."
- **Product image**: Black punnet (MAP tray)
- **Marquee**: Ready Meals · Fresh Cuts · Frozen Food · Meal Kits · High-Speed Lines · Automation-Ready · Wholesale Processors · Supermarket Suppliers · Private Label Brands
- **Partnership**: "As Africa's Multisteps partner, Yucca is setting a new standard..."
- **Feature cards**: Modified Atmosphere Packaging (MAP), Vacuum Seal Packaging (VSP), Purge-Lock Open Cell Trays, CPET Ready-Meal Trays, Ready to Customise, Sustainable Options
- **Unique**: 6 feature cards (vs 4 on other pages) — most technical content

#### Agriculture
- **Hero**: "Your harvest is handled with care."
- **Product image**: Blueberry punnet tub and lid
- **Marquee**: Custom Design · Advanced Printing Techniques · In-line Labelling · In-line Padding · Traceability · Scalable Production · Sustainable Materials · Global Supply
- **Partnership**: "As an official Multisteps' partner for Africa and beyond..."
- **Feature cards**: Denesting, Side Ventilation, Automated Pad Inserts, Custom Labels, Precision Printing and Traceability, Sustainable Options
- **Unique**: "PET 0%" sustainability stat in one card + "Innovate with Us" gallery carousel (6 images, 01/06 counter indicator)

### 10.3 Hero Product Images (Key Visual Strategy)
Setiap pillar memiliki **product cutout image** yang "floats" di hero section — produk terlihat seolah melayang di atas background gelap. Ini menciptakan:
- Visual hierarchy yang jelas (produk = hero)
- Clean presentation ala catalog
- Consistency across 3 pages

---

## 11. Custom Solutions Page

### 11.1 Section Flow
```
 1. Hero ("Let your brand personality shine.")
    └─ Sub-tagline: "Bespoke packaging solutions remind customers..."
    └─ 2 anchor links: [Custom Packaging] [Branding]
 2. Sub-Industry Marquee
    └─ Agile Fresh Produce Growers · Ready Meal Retailers
    └─ Food Process Industries · Event Caterers · Restaurants
    └─ Takeout Delis and Bakeries
 3. Custom Packaging Process (5 steps)
    └─ Brainstorm → Planning → Design → Approval → Confirmation
 4. Branding Process (4 steps)
    └─ Send Artwork → Virtual Fitting → Review → Confirm
 5. "Get Inspired" Gallery
 6. Factory & Product Standards (14 badges)
 7. FAQ Accordion (7 questions)
 8. Pre-footer CTA
 9. Footer
```

### 11.2 Two Distinct Service Tracks
Halaman ini memisahkan 2 jenis customization:

**Custom Packaging** (5 steps — structural):
1. Brainstorm and briefing
2. Project planning and quotation
3. Design and approval
4. Design and approval (validation step)
5. Order Confirmation and management

**Branding** (4 steps — visual):
1. Send Us Your Artwork (sizing/placement brief)
2. Virtual Fitting (adapt to product)
3. Review and Approve (preview branded packaging)
4. Confirm Order and Enjoy

### 11.3 FAQ Topics (7 questions)
- MOQs, artwork submission, timeline, sustainable options, direct printing capabilities, printing techniques (offset/digital/flexo), ink type (water-based for food safety)

---

## 12. Shop / E-commerce

### 12.1 Shop Page Structure
```
┌─ Search Bar ────────────────────────┐
│ "Search products"                    │
├─ Tab Filters ───────────────────────┤
│ All Products | Coffee(12) |          │
│ Smoothies(9) | Deli(37) |            │
│ Takeout(56) | Extras(8)             │
├─ Side Filters ──────────────────────┤
│ Categories: 14 types                 │
│ Material: 9 types                    │
│ Sort: Latest | Price ↑ | Price ↓    │
├─ Delivery Banner ───────────────────┤
│ "We offer nationwide delivery."      │
│ "Free delivery for orders >R2000"    │
├─ Product Grid ──────────────────────┤
│ [product cards with image, name,     │
│  price, NEW/OUT OF STOCK badge]      │
├─ Load More Button ──────────────────┤
│ "View more"                          │
├─ Yucca Rewards CTA Card ───────────┤
│ "Get 5% back on every purchase"      │
│ → /my-account?register=true          │
├─ Pre-footer CTA ───────────────────┤
├─ FAQ Section ───────────────────────┤
└─ Footer ────────────────────────────┘
```

### 12.2 Product Categories (14)
| Category | Count |
|----------|-------|
| Bags | 2 |
| Bowls | 12 |
| Boxes | 12 |
| Chip Holders | 3 |
| Clamshells | 7 |
| Cup Holders | 1 |
| Cups | 14 |
| Cutlery | 4 |
| Inserts | 1 |
| Lids | 22 |
| Plates | 2 |
| Straws | 1 |
| Trays | 8 |
| Tubs | 5 |

### 12.3 Material Filters (9)
Bagasse(12), Bamboo(2), Birchwood(2), HIPS(1), Paper(38), PET(24), PLA(1), PP(4), PS(2)

### 12.4 Shop UX Patterns
- **Inline Rewards CTA**: Yucca Rewards card muncul mid-grid ("Get 5% back on every purchase")
- **Stock status badges**: "NEW" (green/brand) + "OUT OF STOCK" (red) — jelas dan prominent
- **Price format**: "From R X.XX incl. vat" — consistent, transparent
- **Free delivery threshold**: R2000 — sticky banner at top of product grid
- **Sort options**: Latest, Price low→high, Price high→low (simplified dari sebelumnya)
- **Load more**: infinite scroll via "View more" button (bukan traditional pagination)
- **Search**: top search bar untuk direct product search

---

## 13. Product Detail Page

### 13.1 Page Structure (Smoothie Cup 98mm sebagai contoh)
```
┌─ Breadcrumb ────────────────────────┐
│ Shop / Smoothie Cup (98mm)           │
├─ Product Gallery ───────────────────┤
│ [Multiple images — 3-4 product shots]│
│ [Image carousel with thumbnail nav]  │
├─ Product Info ──────────────────────┤
│ Title: "Smoothie Cup (98mm)"         │
│                                      │
│ Volume variants:                     │
│  350ml — R1.55                       │
│  500ml — R1.78                       │
│                                      │
│ Packing type:                        │
│  Sleeve | Box                        │
│                                      │
│ Quantity: [1] [-] [+]                │
│ Total: R0.00 incl. vat              │
│ [Add to cart]                        │
├─ "Pair it with" Cross-Sells ────────┤
│ Dome Lid With Cross Hole (98mm)      │
│ Dome Lid With Open Hole (98mm)       │
│ Flat Lid With Cross Hole             │
│ PET Insert (98mm)                    │
├─ Delivery Info ─────────────────────┤
│ Central hubs: 1-3 Business days      │
│ Outlying areas: 3-5 Business days    │
│ Collect: Cape Town office Mon-Fri    │
│ Free delivery >R2000                 │
├─ Details Accordion/Tabs ────────────┤
│ ▸ Description                        │
│   (PET, iced drinks, recyclable)     │
│ ▸ Additional Information             │
│   (construction, applications,       │
│    performance, customisation)        │
│ ▸ Details and Dimensions             │
│   (colour, material, product code,   │
│    weight, dimensions, carton info)   │
│ ▸ Storage                            │
│   (temp, humidity, FIFO)             │
├─ "You might also be interested in" ─┤
│ [4 related product cards]            │
├─ Pre-footer CTA ───────────────────┤
├─ FAQ Section ───────────────────────┤
└─ Footer ────────────────────────────┘
```

### 13.2 Key Product Page UX Patterns

#### "Pair it with" Cross-Sell System ⭐
Ini adalah pattern yang sangat cerdas:
- Setiap produk menampilkan **compatible accessories** (misalnya cup → matching lids)
- Masing-masing "pair" item memiliki thumbnail + link langsung ke produk tersebut
- Ini meningkatkan AOV (Average Order Value) + mengurangi confusion tentang kompatibilitas

#### Product Variants
- **Volume selector**: 350ml / 500ml (each with different price)
- **Packing type selector**: Sleeve / Box
- **Quantity input**: numeric with +/- buttons
- **Total**: calculated real-time based on selections

#### Delivery Transparency
Informasi delivery langsung di product page — tidak perlu cari di FAQ:
- Central hubs: 1-3 business days
- Outlying areas: 3-5 business days
- Collection option: Cape Town office
- Free delivery threshold: R2000

#### Detail Tabs System
4 expandable sections memberikan comprehensive product info:
1. **Description**: ringkasan + feature badges (Branding Compatible, Recyclable)
2. **Additional Information**: construction details, applications, performance, customisation options
3. **Details and Dimensions**: tabel spesifikasi (colour, material, code, weight, dimensions, carton info)
4. **Storage**: handling dan penyimpanan instructions

---

## 14. Programmes (Rewards & Direct)

### 14.1 Page Structure: Dual Programme Model
```
┌─ Hero: "Partner Perks" ─────────────┐
│                                       │
│ ┌─ Yucca Rewards ──────────────────┐ │
│ │ Earn 5% cash back on every       │ │
│ │ online store purchase             │ │
│ │ [More about Yucca Rewards]       │ │
│ │ Illustration: Gold coins         │ │
│ └──────────────────────────────────┘ │
│                                       │
│ ┌─ Yucca Direct ───────────────────┐ │
│ │ Personalised dashboard that saves│ │
│ │ supply requirements + pricing    │ │
│ │ [More about Yucca Direct]        │ │
│ │ Image: Phone with ecommerce shop │ │
│ └──────────────────────────────────┘ │
├─────────────────────────────────────┤
│ YUCCA REWARDS Section:               │
│ ┌─ Interactive Cashback Calculator ─┐│
│ │ "How much do you spend monthly?"  ││
│ │ [SLIDER] → R25,000               ││
│ │ Estimated cashback: R X,XXX       ││
│ │ [Get rewards]                     ││
│ └───────────────────────────────────┘│
│ FAQ Rewards (5 questions)            │
├─────────────────────────────────────┤
│ YUCCA DIRECT Section:                │
│ "Built for Volume"                   │
│ ┌─ 5 Feature Cards ────────────────┐│
│ │ Place orders quickly              ││
│ │ Dedicated Consultant              ││
│ │ Exclusive Volume-based Pricing    ││
│ │ One rate for all locations        ││
│ │ Personalised Catalogue            ││
│ └───────────────────────────────────┘│
│ [Download credit application PDF]    │
│ FAQ Direct (6 questions)             │
├─────────────────────────────────────┤
│ Pre-footer CTA + Footer              │
└─────────────────────────────────────┘
```

### 14.2 Yucca Rewards Detail
- **Mechanic**: 5% cashback on online store purchases → wallet balance → use on next order
- **Exclusions**: VAT, delivery charges, Yucca Direct purchases
- **Expiry**: Annual reset on 30 June
- **Signup**: /my-account?register=true
- **Interactive element**: Cashback calculator slider (R0 → R25,000+ monthly spend)

### 14.3 Yucca Direct Detail (B2B Portal)
5 key benefits:
1. **Quick ordering**: personalised storefront with relevant products
2. **Dedicated consultant**: direct point of contact
3. **Volume-based pricing**: custom price lists
4. **Uniform pricing**: same rates for all branch locations
5. **Personalised catalogue**: tailored product display

**Onboarding**: Existing customers → ask Account Manager. New customers → contact form.

### 14.4 Dual Model Strategy Insight
Yucca menjalankan **strategi dual-channel** yang cerdas:
- **Rewards** (public) = self-serve, small-medium orders, cashback incentive
- **Direct** (gated) = large volume, negotiated pricing, dedicated support
- Ini memungkinkan satu platform melayani **dua segmen** pasar yang sangat berbeda

---

## 15. Contact Page

### 15.1 Page Structure
```
┌─ Hero: "Let's Chat" ─────────────────┐
│ "We're here to help. Have a packaging │
│  question? That's our favourite topic."│
├─ Contact Form ───────────────────────┤
│ Industry Type (dropdown):             │
│   Food Service | Food Processing |    │
│   Agriculture                         │
│ First Name* | Last Name*              │
│ Email* | Contact Number               │
│ Interest checkboxes:                  │
│   Customisation | Branding | Other    │
│ File attachment                       │
│ Message textarea                      │
│ [Submit enquiry]                      │
├─ "Meet Us" Section ──────────────────┤
│ Google Maps embed                     │
│ Address: Unit 1, Reserve 5,           │
│   Capricorn Way, Brackenfell, 7560    │
│ Phone: +27 21 949 2296                │
│ Hours: Mon-Thu 8:00-16:30             │
│        Fri 8:00-16:00                 │
│        Weekends: Closed               │
├─ FAQ Section (5 questions) ──────────┤
├─ Pre-footer CTA ─────────────────────┤
└─ Footer ─────────────────────────────┘
```

### 15.2 Form Design Insights
- **Industry Type dropdown** sebagai field pertama → langsung memberi context ke sales team
- **Interest checkboxes** (Customisation / Branding / Other) → pre-qualify lead intent
- **File attachment** → memungkinkan upload artwork/specs langsung
- **Minimal required fields** (hanya First Name, Last Name, Email) → low friction
- **Tone**: "That's our favourite topic" — warm, approachable, not corporate

### 15.3 Physical Presence
- **Address**: Brackenfell, Cape Town area (industrial zone)
- **Phone**: +27 21 949 2296 (landline)
- **WhatsApp**: +27 83 796 0416 (mobile — via floating button)
- **Hours**: Standard business hours, weekday only
- **Maps**: Google Maps embed with pin

---

## 16. Blog / Case Studies

### 16.1 Structure
```
┌─ Hero: "Latest articles" ────────────┐
│ Featured article (large card):        │
│ "How Agricultural Packaging Drives    │
│  Quality, Compliance, and Export      │
│  Growth" (9 Sep 2025)                 │
├─ Category Filter ────────────────────┤
│ All | Agriculture | Blog |            │
│ Sustainability                        │
├─ Article Grid ───────────────────────┤
│ "Navigating Sustainable Packaging     │
│  In South Africa: Lessons from        │
│  Europe" (8 Dec 2025, Blog)           │
├─ Pre-footer CTA ─────────────────────┤
└─ Footer ─────────────────────────────┘
```

### 16.2 Blog Observations
- **Masih sangat baru**: hanya 2 articles published (Sep & Dec 2025)
- **Category taxonomy**: Agriculture, Blog (generic), Sustainability
- **Featured article** mendapat layout besar, yang lain thumbnail grid
- **Content strategy**: educational/thought leadership (bukan news releases)

---

## 17. FAQ — Mega Hub

### 17.1 Structure: 7-Tab Categorized FAQ
```
Tab: Home | Agriculture | Food Service | Food Processing | 
     Custom Solutions | Yucca Rewards | Yucca Direct

Each tab → accordion questions
```

### 17.2 Question Distribution
| Tab | Questions |
|-----|-----------|
| **Home** | 5 (general packaging, delivery, ordering, sustainability) |
| **Agriculture** | 4 (solutions types, lead time, tracking, sustainable materials) |
| **Food Service** | 5 (divisions, sustainability, bulk, lead time, tracking) |
| **Food Processing** | 3 (sizes/formats, lead time, MOQ) |
| **Custom Solutions** | 7 (MOQ, artwork, timeline, sustainable, printing, techniques, ink) |
| **Yucca Rewards** | 5 (cashback, transfer, expiry, balance, returns) |
| **Yucca Direct** | 6 (access, difference, pricing, switching, joining, customisation) |
| **Total** | **35 questions** |

### 17.3 FAQ Strategy
- FAQ **juga tersedia inline** di setiap halaman kontekstual (3-5 questions each)
- Halaman /faq = **aggregated master hub** dengan semua questions grouped by topic
- "View all" link dari setiap halaman mengarah ke /faq dengan tab yang sesuai
- Ini menciptakan pola dimana user bisa menemukan jawaban baik di halaman kontekstual maupun di dedicated FAQ page

---

## 18. Footer, CTA & Conversion Patterns

### 18.1 Mega Footer Structure
```
┌─ Tagline ────────────────────────────┐
│ "Innovated for Industry Leaders."     │
│ [Product image 1] [Product image 2]  │
├─ Industry Pillar Cards (3) ──────────┤
│ ┌──────────┬────────────┬──────────┐ │
│ │ Food     │ Food       │ Agri-    │ │
│ │ Service  │ Processing │ culture  │ │
│ │ [link]   │ [link]     │ [link]   │ │
│ └──────────┴────────────┴──────────┘ │
├─ Legal & Social ─────────────────────┤
│ [Yucca logo]                          │
│ Yucca 2026. All Rights Reserved       │
│ 🔗 Facebook | Instagram | LinkedIn   │
│ Contact Us | Privacy Policy | T&C     │
├─ Additional Links ───────────────────┤
│ Credit Application (PDF download)     │
│ Shop | Company | Contact Us           │
└──────────────────────────────────────┘
```

### 18.2 Pre-Footer CTA Banner (Appears on Every Page)
```
"Brands that thrive invest in custom-designed 
 packaging. Let us help bring your vision to life."

[Enquire now] → /contact

Rolling marquee: "Not sure what's possible? Get in touch to find out."
(4× repetition, infinite scroll)
```
Ini muncul di **setiap halaman** situs — conversion opportunity yang persistent.

### 18.3 WhatsApp Floating Action Button
- Posisi: fixed bottom-right
- Link: `wa.me/+27837960416`
- Always visible: ya, di semua halaman
- Design: circular green WhatsApp icon

### 18.4 Conversion Funnel Strategy
Yucca memiliki **multiple conversion touchpoints** di setiap halaman:

| Touchpoint | Type | Location |
|------------|------|----------|
| Mega-menu CTA cards | Soft | Navigation |
| Hero CTA | Hard | Top of page |
| Product carousel links | Soft | Mid-page |
| Loyalty CTA ("5% cashback") | Soft | Mid-page (pillar pages) |
| Custom Solutions link | Soft | "Our 5 Step Process" section |
| Pre-footer CTA | Hard | Before footer |
| WhatsApp FAB | Hard | Fixed, always visible |
| FAQ "View all" | Soft | After FAQ section |
| Footer pillar links | Soft | Footer |
| "Pair it with" | Soft | Product detail page |
| "Enquire now" | Hard | Multiple locations |

---

## 19. Page Template Shared Components

### 19.1 Components yang Muncul di Setiap Halaman
Yucca memiliki **6 shared components** yang ada di SEMUA halaman:

| Component | Description |
|-----------|-------------|
| **Header + Mega-Menu** | Scroll-aware sticky header, 3-panel mega-menu |
| **Pre-Footer CTA** | "Brands that thrive invest..." + [Enquire now] + rolling marquee |
| **FAQ Section** | 3-7 contextual questions + "View all" link to /faq |
| **WhatsApp FAB** | Fixed bottom-right floating button |
| **Mega Footer** | Pillar cards, social links, legal, additional links |
| **Cookie Consent** | "Accept All / Customise / Reject All" |

### 19.2 Components per Page Type

| Component | Home | About | Pillar×3 | Custom | Shop | Product | Programmes | Contact | Blog | FAQ |
|-----------|------|-------|----------|--------|------|---------|------------|---------|------|-----|
| Hero | ✅ | ✅ | ✅ | ✅ | — | — | ✅ | ✅ | ✅ | — |
| Marquee | ✅(4) | ✅(values) | ✅(subs) | ✅(subs) | — | — | — | — | — | — |
| Product Carousel | ✅ | — | ✅ | — | Grid | Detail | — | — | — | — |
| Mission/Vision | ✅ | ✅ | — | — | — | — | — | — | — | — |
| Standards Badges | ✅ | — | ✅ | ✅ | — | — | — | — | — | — |
| "Our Process" ref | — | — | ✅ | ✅(own) | — | — | — | — | — | — |
| Google Maps | — | — | — | — | — | — | — | ✅ | — | — |
| Team Grid | — | ✅ | — | — | — | — | — | — | — | — |
| Rewards CTA | — | — | ✅(FS) | — | ✅ | — | Own | — | — | — |
| Cross-sell | — | — | — | — | — | ✅ | — | — | — | — |

---

## 20. Content Strategy & Information Architecture

### 20.1 Content Hierarchy (Breadth vs Depth)
```
Level 1 — Homepage (the hub)
  ↓ teasers + CTAs ke semua Level 2
  
Level 2 — Industry Pages (3) + About + Shop + Programmes
  ↓ deep-dive per industry/topic
  ↓ cross-links ke Level 2 siblings
  
Level 3 — Product Detail + Blog Articles + Custom Solutions + Contact + FAQ
  ↓ most granular content
  ↓ conversion-focused
```

### 20.2 Content Density per Page
| Page | Sections | Word Count Est. | Rich Media |
|------|----------|----------------|------------|
| Homepage | 10 | ~400 | Hero image, product carousel, certification badges |
| About | 8 | ~600 | Timeline, team photos, gallery carousel |
| Food Service | 10 | ~500 | Product image, carousel, certification |
| Food Processing | 10 | ~600 | Product image, gallery, certification (most technical) |
| Agriculture | 10 | ~550 | Product image, gallery carousel, certification |
| Custom Solutions | 8 | ~450 | Process steps, gallery, certification |
| Shop | 6 | ~200 | Product grid (90+ items), filters |
| Product Detail | 8 | ~500 | Gallery, specs table, cross-sells, FAQ |
| Programmes | 6 | ~500 | Calculator slider, feature cards |
| Contact | 5 | ~200 | Form, Google Maps, minimal prose |
| Blog | 3 | ~150 | Article cards, category filter |
| FAQ | 2 | ~1200 | 35 Q&A pairs across 7 tabs |

### 20.3 Tone of Voice
- **Professional but warm**: "That's our favourite topic", "let's work together"
- **Confident authority**: "setting a new standard", "world-class compliant"
- **Action-oriented**: "Explore", "Shop all", "Get in touch", "Enquire now"
- **Transparency**: harga "incl. vat", delivery timeframes, sustainability stats

### 20.4 Keyword Strategy (Observed)
Primary terms baked into seluruh situs:
- "packaging" (core), "food service", "food processing", "agriculture"
- "custom packaging", "branding", "sustainable packaging"
- "South Africa", "nationwide delivery", "global delivery"
- Product-specific: "MAP trays", "PET cups", "bagasse clamshell", "punnet"
- Trust: "FDA compliant", "ISO certified", "FSC", "recyclable"

---

## 21. Responsive & Mobile Strategy

### 21.1 Breakpoint Behavior
| Breakpoint | Layout Changes |
|------------|---------------|
| ≤1100px | Mega-menu → hamburger + full-screen overlay |
| ≤768px | 2-column → 1-column, reduced padding |
| ≤480px | Mobile-optimized hero images, compact cards |

### 21.2 Mobile-First Elements
- **Separate hero images**: Desktop vs mobile crops (e.g., homepage `_mobile.jpg`)
- **Hamburger menu**: Full-screen overlay with accordion submenus
- **Stacked layouts**: All grids collapse to single column
- **Touch targets**: Generous padding on interactive elements
- **WhatsApp FAB**: Remains visible and accessible on mobile

---

## 22. SEO Patterns

### 22.1 Technical SEO
- **URL structure**: clean, hierarchical (`/food-service`, `/product/smoothie-cup-98mm`)
- **Image alt text**: descriptive product-focused ("Modified atmosphere packaging plastic tray")
- **Breadcrumbs**: product pages have `Shop / [Product Name]` breadcrumb
- **Internal linking**: extensive (see cross-linking strategy in Section 3.4)
- **Page speed**: Lenis + lazy loading + Webpack bundling for optimization

### 22.2 Content SEO
- **H1 per page**: setiap halaman memiliki unique H1
- **Meta content**: likely WordPress Yoast/RankMath for meta management
- **Blog**: educational content targeting long-tail keywords
- **FAQ schema**: 35 Q&A pairs potentially rich-snippet eligible
- **Product schema**: WooCommerce generates product structured data

---

## 23. Key Takeaways untuk Alfa Beauty

### 23.1 Pola yang Bisa Diadaptasi

#### A. Navigation as Sales Tool
Yucca menyematkan CTA cards langsung di mega-menu. Alfa Beauty bisa menambahkan educational content atau "Konsultasi Gratis" CTA di dalam mega-menu panel.

#### B. "Pair it with" Cross-Sell Pattern
Pada halaman produk, Yucca menampilkan compatible accessories. Alfa Beauty bisa menerapkan ini untuk hair care routine: sampo → conditioner → treatment → styling.

#### C. Dual-Channel Programme Model
Yucca Rewards (public) + Yucca Direct (B2B). Alfa Beauty bisa mengembangkan salon partnership programme + end-consumer loyalty programme.

#### D. FAQ Everywhere Strategy
FAQ muncul di setiap halaman (contextual 3-5 + master hub 35 Q&A). Ini membangun trust DAN improves SEO. Alfa Beauty bisa menambahkan product-specific FAQ di setiap produk detail page.

#### E. Certification/Trust Badge Row
14 badges yang konsisten muncul di banyak halaman. Alfa Beauty bisa mengumpulkan certification dari brand partners (ISO, dermatologist tested, etc.) dan menampilkan secara konsisten.

#### F. Pre-Footer CTA Persistence
"Brands that thrive invest in custom-designed packaging" muncul di SETIAP halaman. Alfa Beauty bisa memiliki persistent CTA yang berubah per konteks halaman.

#### G. Interactive Calculator (Programmes)
Cashback calculator slider di Rewards page. Alfa Beauty bisa membuat "Hair Treatment Budget Calculator" atau "Which Package Suits You?"

#### H. Industry Pillar Template
3 pages menggunakan template identik dengan content berbeda. Alfa Beauty bisa menggunakan ini untuk brand pages (Alfaparf, Montibello, Gamma+, etc.)

#### I. Product Detail Richness
4 expandable detail tabs (Description, Additional Info, Dimensions, Storage) + "Pair it with" + delivery info + FAQ. Ini mengubah product page menjadi mini-landing page.

#### J. Marquee as Brand Voice
4 marquee rows di homepage bukan sekadar dekorasi — mereka menyampaikan value propositions dalam format yang eye-catching dan non-intrusive.

### 23.2 Yang TIDAK Perlu Ditiru
- **WooCommerce complexity** — Alfa Beauty tidak butuh full e-commerce; WhatsApp CTA sudah cukup
- **Preloader** — hanya berguna jika brand memiliki image sequence; Framer Motion tidak mudah meniru frame-based loader
- **Google Maps embed** — tidak relevan kecuali ada showroom fisik
- **Payment gateway** — bukan prioritas untuk distribution model

### 23.3 Priority Action Items (Berdasarkan GAP Analysis Sebelumnya)
1. ✅ Mega-menu 5-phase card animation — sudah diimplementasi Phase 12
2. ✅ Pre-footer CTA rolling marquee — sudah diimplementasi Phase 12
3. ✅ Mega-footer product images on pillar cards — sudah diimplementasi Phase 12
4. 🔲 "Pair it with" cross-sell pattern pada product detail pages
5. 🔲 FAQ section di setiap halaman (contextual + master hub)
6. 🔲 Certification/trust badge row (brand certifications)
7. 🔲 Interactive element (treatment calculator / quiz)
8. 🔲 Blog/education content category filter
9. 🔲 Product detail tabs (description, specs, usage, ingredients)
10. 🔲 Persistent conversion CTA yang berubah per konteks

---

> **Catatan Akhir**: Studi ini merupakan snapshot terkini (Januari 2026). Yucca terus berkembang — 
> copyright sudah "2026", hanya 2 blog articles, dan Promotions masih "return soon" menunjukkan 
> situs masih dalam fase content ramp-up setelah redesign 2025. Banyak fitur yang bisa dipelajari 
> terutama dari sisi content architecture, conversion funnel design, dan animation consistency.
