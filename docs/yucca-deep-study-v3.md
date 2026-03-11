# Studi Detail: yucca.co.za — Comprehensive Analysis v3

> **Tanggal**: Januari 2026  
> **Sumber**: Fetch langsung semua halaman (10 pages) + browser live analysis + perbandingan v2  
> **Tujuan**: Analisis menyeluruh arsitektur, design system, konten, animasi, UX patterns, & evolusi dari versi sebelumnya  
> **Konteks**: Update dari yucca-deep-study-v2.md (Juli 2025) — mencatat perubahan dan temuan baru

---

## Daftar Isi

1. [Ringkasan Perubahan dari v2](#1-ringkasan-perubahan-dari-v2)
2. [Arsitektur Teknologi](#2-arsitektur-teknologi)
3. [Sitemap & Navigasi Lengkap](#3-sitemap--navigasi-lengkap)
4. [Design System](#4-design-system)
5. [Mega-Menu System](#5-mega-menu-system)
6. [Preloader & Brand Reveal](#6-preloader--brand-reveal)
7. [Animation Engine & Patterns](#7-animation-engine--patterns)
8. [Homepage — Section-by-Section](#8-homepage--section-by-section)
9. [About Page](#9-about-page)
10. [Industry Pillar Pages (Template Analisis)](#10-industry-pillar-pages)
11. [Custom Solutions Page](#11-custom-solutions-page)
12. [Shop / E-commerce](#12-shop--e-commerce)
13. [Programmes (Rewards & Direct)](#13-programmes-rewards--direct)
14. [Contact Page](#14-contact-page)
15. [Blog / Case Studies](#15-blog--case-studies)
16. [FAQ — Mega Hub](#16-faq--mega-hub)
17. [Footer, CTA & Conversion Patterns](#17-footer-cta--conversion-patterns)
18. [Content Strategy & Information Architecture](#18-content-strategy--information-architecture)
19. [Responsive & Mobile Strategy](#19-responsive--mobile-strategy)
20. [SEO Patterns](#20-seo-patterns)
21. [Key Takeaways untuk Alfa Beauty](#21-key-takeaways-untuk-alfa-beauty)
22. [Gap Analysis: Apa yang Alfa Beauty Belum Punya](#22-gap-analysis)

---

## 1. Ringkasan Perubahan dari v2

### Apa yang Berubah (Juli 2025 → Januari 2026)

| Area | v2 (Juli 2025) | v3 (Januari 2026) | Status |
|------|----------------|-------------------|--------|
| **Copyright** | "Yucca 2025" | "Yucca 2026. All Rights Reserved" | Updated |
| **About Timeline** | Approximate dates (~2010, ~2018, ~2022) | Exact: 2002, 2008, 2015, 2020, 2025 | Corrected |
| **About Hero** | "About Yucca" | "Adaptable and Resilient like the Yucca Plant." | New headline |
| **Shop Categories** | 14 categories | 14 categories (refined: Bags(2), Bowls(12), Boxes(12), Chip Holders(3), etc.) | Count labels added |
| **Shop Materials** | 9 materials | 9 updated (Birchwood, HIPS added; CPET, Kraft removed from filter) | Refined |
| **Shop Products** | Uncounted | Tab counts: Coffee(12), Smoothies(9), Deli(37), Takeout(56), Extras(8) | Data |
| **Delivery Banner** | Not documented | "Free delivery for orders over R2000 incl. vat" | New |
| **Sort Options** | Featured, Price, Newest, Rating | Latest, Price low→high, Price high→low | Simplified |
| **Blog Categories** | Agriculture, Blog, Sustainability | Same — confirmed | Same |
| **Footer Links** | Basic | Added "Credit Application" PDF download | New |
| **Sustainability** | General | "28% Decreased scope 3 emissions as per GCX Sustainability Report 2024" | Specific |
| **Homepage Marquee** | Industry keywords | Now: "Yucca Rewards / Yucca Direct (B2B)" + "Quality Branding" + "Custom Packaging Sustainable" + "Innovation Partnerships" | Changed focus |
| **Mission/Vision** | "Designing the Future of Packaging" | "Committed to Excellence, always Innovating" | Changed headline |
| **Food Service CTA** | "Have a question?" | "Need to restock? Order now" | More direct |
| **New Products** | Generic | 4 specific: Matte Black Coffee Cup R1.09, Paper Pulp Cup Holder R1.55, Dessert Cup R1.38, Dessert Cup Flat Lid R0.63 | Priced |
| **Agriculture PET stat** | Not documented | "PET 0%" in sustainability card | New |

### Apa yang TIDAK Berubah (Stable Foundation)
- Core tech stack (WordPress + WooCommerce + GSAP + Barba.js + Lenis)
- 14 certification badges across pages
- Mega-menu structure (3 panels: Shop, Packaging Solutions, Resources)
- WhatsApp FAB (wa.me/+27837960416)
- Contact form structure
- Industry pillar page template
- Pre-footer CTA banner pattern
- Dual programme model (Rewards + Direct)

---

## 2. Arsitektur Teknologi

### Stack Lengkap (Confirmed)
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

### JS Bundle Architecture (Confirmed dari dist/main.js)
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
│   ├── Product (single product gallery + add to cart)
│   ├── Contact (form + Google Maps init)
│   ├── Blog (category filters + article grid)
│   ├── Post (single article)
│   ├── Programmes (rewards calculator + Direct features)
│   ├── Waitlist (sign-up form)
│   ├── Cart (WooCommerce cart)
│   ├── FAQ (tabbed accordion categories)
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
├── /shop (WooCommerce catalog)
│   ├── ?product_cat=promo (Promotions)
│   ├── ?product_cat=coffee (Coffee)
│   ├── ?product_cat=smoothies (Smoothies)
│   ├── ?product_cat=deli (Deli)
│   ├── ?product_cat=takeout (Takeout)
│   ├── ?packaging_type=cutlery (Cutlery)
│   ├── ?packaging_type=bags (Bags)
│   ├── ?product_cat=extras (Extras)
│   └── /product/[slug] (individual products)
├── /programmes (Yucca Rewards + Yucca Direct)
│   ├── #loyalty (Rewards section anchor)
│   └── #direct (Direct section anchor)
├── /waitlist
├── /blog
│   ├── /agricultural-packaging-for-export/
│   └── /sustainable-packaging-south-africa/
├── /faq
├── /contact
├── /cart
├── /checkout
├── /my-account
│   └── ?register=true (Registration)
├── /privacy-policy
├── /terms-conditions
└── /wp-content/uploads/2025/09/Credit-Application-YUCCA.pdf (downloadable)
```

### 3.2 Mega-Menu Info Architecture
```
┌─ SHOP ─────────────────────────────────────────────────┐
│  Promotions  Coffee  Smoothies  Deli  Takeout          │
│  Cutlery     Bags    Extras                             │
│                                                         │
│  ┌─ CTA Card ─────────────────────────────────────────┐ │
│  │ "Looking for something specific?"                   │ │
│  │  We can customise your packaging to fit your needs  │ │
│  │  → /custom-solutions                                │ │
│  └─────────────────────────────────────────────────────┘ │
│  ┌─ CTA Card ─────────────────────────────────────────┐ │
│  │ "Join our loyalty programme to earn 5% back"        │ │
│  │  → /programmes                                      │ │
│  └─────────────────────────────────────────────────────┘ │
│  ┌─ Promo Notice ────────────────────────────────────┐   │
│  │ "Promotions return soon" — fair pricing notice    │   │
│  │  → /shop (Promotions) | Shop all products         │   │
│  └───────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘

┌─ PACKAGING SOLUTIONS ──────────────────────────────────┐
│  Food Service →    /food-service                       │
│  Food Processing → /food-processing                    │
│  Agriculture →     /agriculture                        │
│                                                         │
│  ┌─ CTA Card ─────────────────────────────────────────┐ │
│  │ "Looking for something specific?"                   │ │
│  │  → /custom-solutions                                │ │
│  └─────────────────────────────────────────────────────┘ │
│  ┌─ Featured Image ──────────────────────────────────┐   │
│  │ Product imagery panel (hover-switchable)           │   │
│  └───────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘

┌─ RESOURCES ────────────────────────────────────────────┐
│  Waitlist →              /waitlist                      │
│  Yucca Rewards & Direct → /programmes                  │
│  Case Studies & Blogs →  /blog                         │
│  FAQs →                  /faq                          │
│                                                         │
│  ┌─ Resource Image Panel ────────────────────────────┐  │
│  │ Hover-swap images based on active menu item       │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘

┌─ TOP BAR ──────────────────────────────────────────────┐
│  Home  |  Cart (badge count)  |  Account                │
└─────────────────────────────────────────────────────────┘
```

### 3.3 Cross-Linking Map
```
Homepage
├→ /food-service (hero pillar CTA)
├→ /food-processing (hero pillar CTA)
├→ /agriculture (hero pillar CTA)
├→ /about ("About us" link)
├→ /shop (products carousel)
├→ /contact ("Enquire now" CTA)
└→ /faq ("View all" from FAQ section)

Each Pillar Page (food-service, food-processing, agriculture)
├→ /contact (marquee CTA + "Get in touch")
├→ /custom-solutions ("See Custom Solutions" link)
├→ /shop (product carousel links)
└→ /faq ("View all" FAQs link)

Custom Solutions
├→ /contact ("Enquire now")
└→ /faq ("View all")

Shop
├→ /custom-solutions (nav CTA)
├→ /programmes (loyalty banner)
├→ /product/[slug] (each product card)
└→ /my-account?register=true (Yucca Rewards sign up)

Programmes
├→ /my-account?register=true ("Get rewards")
├→ /faq ("View FAQs")
└→ Credit Application PDF download

Blog
├→ /[article-slug] (each article)
├→ /contact ("Enquire now" pre-footer)
└→ Filter: All | Agriculture | Blog | Sustainability

ALL PAGES (common)
├→ WhatsApp (wa.me/+27837960416) — floating button
├→ /contact (pre-footer "Enquire now" CTA)
├→ Footer pillar links (food-service, food-processing, agriculture)
└→ Footer utility links (/contact, /privacy-policy, /terms-conditions)
```

---

## 4. Design System

### 4.1 Color Palette
| Token | Value (Estimated) | Usage |
|-------|-------------------|-------|
| **Primary (Deep Forest Green)** | `~#1a3a2a` | Headlines, primary text, nav, accents |
| **Gold/Brass Accent** | `~#c4a146` | Buttons, highlights, hover states, rewards imagery |
| **Background Warm Cream** | `~#f5f2ed` | Page backgrounds, light section fills |
| **Background Dark** | `~#1a1a1a` → `#0d0d0d` | Footer, dark sections, preloader overlay |
| **White** | `#ffffff` | Text on dark, card backgrounds, product shots |
| **Body Text Gray** | `~#3a3a3a` | Paragraphs, descriptions |
| **Subtle Border** | `rgba(0,0,0,0.08)` | Card dividers, section separators |
| **Eco/Sustainability Green** | Accent green-teal | Certification badges, sustainability highlights |
| **Error/Stock Status** | Red/warm | "OUT OF STOCK" badges |
| **New Badge** | Green/brand color | "NEW" product badges |

### 4.2 Typography System
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

### 4.3 Spacing & Layout Grid
| Pattern | Value |
|---------|-------|
| **Max-width container** | ~1200-1400px |
| **Section padding-y** | ~120-160px desktop, ~60-80px mobile |
| **Card padding** | ~24-32px internal |
| **Grid gaps** | ~16-32px |
| **Border-radius** | 0-8px (minimal, mostly sharp edges) |
| **Image ratios** | 16:9 (hero/banner), 1:1 (products on white bg), 4:3 (cards), 3:2 (gallery) |

### 4.4 Visual Identity
- **Clean & minimal**: generous whitespace, restrained palette
- **Dark/light rhythm**: alternating dark (deep green/black) and light (cream/white) sections
- **Industrial-premium**: matte textures, deep forest green + gold/brass accents
- **Editorial typography**: oversized display headings with tight tracking
- **Full-bleed imagery**: hero images stretch viewport width
- **ClipPath reveals**: signature animation pattern throughout the site
- **Product photography**: white/neutral background, consistent lighting
- **Moody atmospheric images**: dark, artistic food/produce photography for backgrounds

---

## 5. Mega-Menu System

### 5.1 Header States
```
Default (top of page):
┌──────────────────────────────────────────────────┐
│ [Logo]  Shop  Packaging Solutions  Resources     │
│         About  Contact                            │
│                            [Search] [Cart] [User] │
└──────────────────────────────────────────────────┘

Scrolled Down (hiding):
→ header.classList.add('scrolled-down')
→ translateY(-100%) — slides up out of view

Scrolled Up (revealing):
→ header.classList.add('scrolled-up')
→ translateY(0) — slides back into view (sticky)

Menu Active:
→ header.classList.add('header-active')
→ Full mega-menu panel visible below
→ Lenis.stop() — scroll locked
```

### 5.2 Mega-Menu Animation (GSAP per-panel)
```javascript
// Setiap card di mega-menu animated with:
class Nav {
  createCardTl(card) {
    const tl = gsap.timeline({ paused: true });
    
    // 1. Background: clipPath inset reveal (top→bottom)
    tl.fromTo(card.bg,
      { clipPath: "inset(0% 0% 100% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power3.inOut" }
    );
    
    // 2. Media: scale zoom-in settle
    tl.fromTo(card.media,
      { scale: 1.4 },
      { scale: 1, duration: 0.8, ease: "power2.out" },
      "<0.1"
    );
    
    // 3. Text lines: stagger slide up from below
    tl.fromTo(card.textLines,
      { yPercent: 100 },
      { yPercent: 0, stagger: 0.04, duration: 0.5, ease: "power2.out" },
      "<0.2"
    );
    
    // 4. Border: horizontal grow from left
    tl.fromTo(card.border,
      { scaleX: 0, transformOrigin: "left" },
      { scaleX: 1, duration: 0.5, ease: "power2.out" },
      "<0.1"
    );
    
    // 5. Link CTA: slide up
    tl.fromTo(card.link,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.4, ease: "power2.out" },
      "<0.1"
    );
    
    return tl;
  }
}
```

### 5.3 Key UX Details
- **100-150ms hover debounce** — mencegah accidental submenu open/close
- **Mouse area tracking** — panel tetap open selama cursor di area navigation
- **Resource panel image swap** — hover pada menu item → image di panel kanan berubah
- **Mobile (≤1100px)** — hamburger → full-screen overlay + accordion submenus
- **Scroll lock** — `lenis.stop()` saat mega-menu dibuka, `lenis.start()` saat ditutup

---

## 6. Preloader & Brand Reveal

### 6.1 Frame Assets
```
/wp-content/themes/yucca/src/assets/images/loader/
├── 1.webp  (product frame 1)
├── 2.webp  (product frame 2)
├── 3.webp  (product frame 3)
├── 4.webp  (product frame 4)
└── 5.webp  (product frame 5)

/wp-content/themes/yucca/src/assets/images/logo-icon.svg  (Yucca logomark)
```

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
├─ Frame 1: opacity 0 → 1   (0.2s hold)
├─ Frame 2: opacity 0 → 1   (0.2s hold, frame 1 → 0)
├─ Frame 3: opacity 0 → 1   (0.2s hold, frame 2 → 0)
├─ Frame 4: opacity 0 → 1   (0.2s hold, frame 3 → 0)
└─ Frame 5: opacity 0 → 1   (0.2s hold, frame 4 → 0)

Phase 4: Exit (~3.1s → ~3.9s)
├─ Loader background: autoAlpha 1 → 0   (0.8s, power2.inOut)
└─ Container: display: none
```

### 6.3 Session Handling
- Preloader berjalan pada **setiap page load** (no session skip built-in)
- Barba.js memastikan preloader hanya muncul saat initial load, bukan saat navigasi internal
- Navigasi internal menggunakan page transition overlay (lebih cepat, ~1s total)

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
```javascript
// Digunakan: Nav cards, section reveals, image masks, hero media
gsap.fromTo(element,
  { clipPath: "inset(0% 0% 100% 0%)" },  // clipped from bottom
  { clipPath: "inset(0% 0% 0% 0%)",       // fully revealed
    duration: 0.6-0.8,
    ease: "power3.inOut"
  }
);

// Variasi directional:
// "inset(0% 0% 100% 0%)"  → reveal top-to-bottom (bottom is hidden)
// "inset(100% 0% 0% 0%)"  → reveal bottom-to-top (top is hidden)
// "inset(0% 100% 0% 0%)"  → reveal left-to-right (right is hidden)
// "inset(0% 0% 0% 100%)"  → reveal right-to-left (left is hidden)
```

#### Pattern 2: SplitText Stagger
```javascript
// Digunakan: Headlines, section titles, hero text
const split = new SplitText(element, { type: "lines,chars" });
gsap.fromTo(split.lines,
  { yPercent: 100, opacity: 0 },
  { yPercent: 0, opacity: 1,
    stagger: 0.04,
    duration: 0.5-0.8,
    ease: "power2.out",
    scrollTrigger: { trigger: element, start: "top 80%" }
  }
);
```

#### Pattern 3: Scale + Parent Clip Image Reveal
```javascript
// Digunakan: Card images, hero backgrounds, gallery
// Parent: clipPath reveal  |  Child: scale compensate
gsap.fromTo('.image-wrapper', 
  { clipPath: "inset(0% 0% 100% 0%)" },
  { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power3.inOut" }
);
gsap.fromTo('.image', 
  { scale: 1.4 }, 
  { scale: 1, duration: 1.2, ease: "power2.out" }
);
// Combined: wrapper reveals while image zooms in → premium Ken Burns feel
```

#### Pattern 4: Border ScaleX Grow
```javascript
// Digunakan: Card separators, section dividers, timeline markers
gsap.fromTo(border,
  { scaleX: 0, transformOrigin: "left" },
  { scaleX: 1, duration: 0.5, ease: "power2.out" }
);
```

#### Pattern 5: yPercent Slide Up (Staggered)
```javascript
// Digunakan: Text lines, CTA buttons, labels, menu items
gsap.fromTo(elements,
  { yPercent: 100 },
  { yPercent: 0,
    stagger: 0.04-0.08,
    duration: 0.4-0.6,
    ease: "power2.out"
  }
);
```

#### Pattern 6: ScrollTrigger Parallax
```javascript
// Digunakan: Section background images, decorative elements
gsap.to(parallaxElement, {
  y: "-20%",
  ease: "none",
  scrollTrigger: {
    trigger: section,
    start: "top bottom",
    end: "bottom top",
    scrub: true  // directly linked to scroll position
  }
});
```

### 7.4 Animation Orchestration Formula
```
Setiap section mengikuti pola orchestration yang konsisten:

1. ScrollTrigger mendeteksi section masuk viewport (start: "top 80%")
2. Master timeline dimulai:
   a. Container/wrapper → clipPath reveal atau opacity fade    (0s)
   b. Heading → SplitText stagger per line                    (+0.1s)
   c. Body text → yPercent slide up                           (+0.2s)
   d. Image → scale 1.4→1 + parent clipPath reveal            (+0.15s)
   e. CTA button → slide up                                   (+0.3s)
   f. Decorative (borders, icons) → scaleX grow / fade        (+0.2s)
3. Total stagger offset antara phases: ~0.1-0.2s
4. Total section reveal: ~0.8-1.2s from trigger
```

### 7.5 Barba.js Page Transition
```
User clicks internal link
  → Barba.js intercepts click
  → lenis.stop()
  → Page loader overlay: autoAlpha 0 → 1 (0.5s)
  → Fetch new page HTML via XHR
  → Once loaded: swap content container DOM
  → Scroll position: reset to 0
  → New page class: init()
  → ScrollTrigger: refresh all
  → LazyLoad: reinitialize
  → Page loader overlay: autoAlpha 1 → 0 (0.5s)
  → lenis.start()
  → New page animations begin
Total transition time: ~1 second
```

---

## 8. Homepage — Section-by-Section

### 8.1 Complete Section Map
```
┌─────────────────────────────────────────────┐
│ [COOKIE CONSENT] Privacy banner overlay     │
│ Accept All | Customise | Reject All         │
├─────────────────────────────────────────────┤
│ [PRELOADER] 5-frame image sequence          │
│ (only on initial load)                      │
├─────────────────────────────────────────────┤
│ [HEADER] Search, Nav links, Cart, Account   │
│ + Mega-menu (3 panels)                      │
├─────────────────────────────────────────────┤
│ [HERO]                                      │
│ "Packaging that Performs. Innovated         │
│  for Industry Leaders."                     │
│                                             │
│ ┌─────────┬──────────────┬─────────────┐   │
│ │ Food    │ Food         │ Agriculture │   │
│ │ Service │ Processing   │             │   │
│ │ Explore→│ Explore→     │ Explore→    │   │
│ └─────────┴──────────────┴─────────────┘   │
│                                             │
│ Background: Hero product photo              │
│ (iced coffee cups on pedestal — desktop)    │
│ (mobile: separate mobile-optimized image)   │
├─────────────────────────────────────────────┤
│ [MARQUEE × 4 STRIPS]                       │
│ Row 1 →: Yucca Rewards · Yucca Direct (B2B)│
│ Row 2 ←: Quality · Branding                │
│ Row 3 →: Custom Packaging · Sustainable     │
│ Row 4 ←: Innovation · Partnerships          │
├─────────────────────────────────────────────┤
│ [ABOUT INTRO]                               │
│ "Committed to Excellence, always Innovating"│
│ Body: "Remarkable packaging is our promise  │
│ to you. What doesn't meet Yucca standards   │
│ is refined until it does."                  │
│ CTA: "About us" → /about                   │
│                                             │
│ ┌─────────────┐  ┌──────────────┐          │
│ │ Our Mission  │  │ Our Vision   │          │
│ │ We provide   │  │ To be the    │          │
│ │ world-class, │  │ trusted,     │          │
│ │ compliant... │  │ industry-... │          │
│ └─────────────┘  └──────────────┘          │
├─────────────────────────────────────────────┤
│ [NEW PRODUCTS CAROUSEL]                     │
│ "New Products"                              │
│                                             │
│ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐   │
│ │ Matte │ │ Paper │ │Dessert│ │Dessert│   │
│ │ Black │ │ Pulp  │ │ Cup   │ │ Flat  │   │
│ │Coffee │ │ Cup   │ │(90mm) │ │ Lid   │   │
│ │ Cup   │ │Holder │ │       │ │(90mm) │   │
│ │R1.09  │ │R1.55  │ │R1.38  │ │R0.63  │   │
│ │ NEW   │ │ NEW   │ │ NEW   │ │ NEW   │   │
│ └───────┘ └───────┘ └───────┘ └───────┘   │
├─────────────────────────────────────────────┤
│ [PRE-FOOTER CTA BANNER]                    │
│ "Brands that thrive invest in custom-      │
│  designed packaging. Let us help bring     │
│  your vision to life."                     │
│                                             │
│ [Enquire now] → /contact                   │
│ ← "Not sure what's possible? Get in touch  │
│    to find out." → (marquee, infinite)      │
├─────────────────────────────────────────────┤
│ [TRUST: FACTORY & PRODUCT STANDARDS]       │
│ "Our partners share our commitment to       │
│ responsible practices..."                   │
│                                             │
│ FDA | EU 10/2011 | BRCGS | FSC | GRS |     │
│ BPI | DIN CERTCO | TÜV OK Compost Home |   │
│ TÜV OK Compost Industrial | ISO 9001 |     │
│ ISO 14001 | ISO 22000 | ISO 45001 |        │
│ FSSC 22000                                  │
│ (14 badges, horizontal scroll)              │
├─────────────────────────────────────────────┤
│ [FAQ ACCORDION] (5 items)                   │
│ Q: What types of packaging do you offer?    │
│ Q: Do you deliver nationwide?               │
│ Q: Do you deliver globally?                 │
│ Q: How do I place an order?                 │
│ Q: Do you offer sustainable options?        │
│ CTA: "View all" → /faq                     │
├─────────────────────────────────────────────┤
│ [WHATSAPP FAB] (floating, fixed bottom-right)│
│ → wa.me/+27837960416                        │
├─────────────────────────────────────────────┤
│ [MEGA FOOTER]                               │
│ See Section 17 for detail                   │
└─────────────────────────────────────────────┘
```

### 8.2 Hero Analysis
- **Headline**: Split into 2 lines for visual impact — "Packaging that Performs." (line 1) + "Innovated for Industry Leaders." (line 2)
- **3 Pillar CTAs**: Each card = title + "Explore [Pillar]" link, stacked side by side
- **Hero Image**: Desktop uses full studio product shot (pedestal display of cups); Mobile has separate optimized crop
- **Separate Images**: 
  - Desktop: `yucca-packaging-homepage-intro-plastic-cups-for-iced-chilled-drinks.jpg`  
  - Mobile: `..._mobile.jpg`
- **Product Preview Image**: Plastic divider ready meal tray (`.webp`) — positioned as secondary visual

### 8.3 Marquee Strategy (4 rows)
Yucca menggunakan **4 marquee strips** yang berjalan secara bersamaan:
- Row 1 (forward): "Yucca Rewards" + "Yucca Direct (B2B)" — **programme promotion**
- Row 2 (reverse): "Quality" + "Branding" — **capability keywords**
- Row 3 (forward): "Custom Packaging" + "Sustainable" — **value props**
- Row 4 (reverse): "Innovation" + "Partnerships" — **positioning keywords**

**Pola**: Setiap row mengulangi content 4× untuk seamless infinite loop. Alternating left→right direction menciptakan **visual tension** yang menarik mata.

### 8.4 New Products Section
4 produk „NEW" ditampilkan dengan:
- Product image (1:1, white background)
- Product name (linked to product page)
- Price: "From R X.XX incl. vat"
- "NEW" badge overlay

---

## 9. About Page

### 9.1 Section Map
```
┌─────────────────────────────────────────┐
│ [HERO] "Adaptable and Resilient like    │
│  the Yucca Plant."                      │
│                                         │
│ Body: "Packaging is universal, and we   │
│ use it every day..."                    │
├─────────────────────────────────────────┤
│ [TIMELINE] "The Journey of Yucca        │
│  Packaging"                             │
│                                         │
│ 2002 ─── 2008 ─── 2015 ─── 2020 ─── 2025│
│ Founded  Expand   Partner   Booms    Now │
│ (Paarl)  Global   Multi-    Lock-    New │
│          Partners steps     down     Web │
├─────────────────────────────────────────┤
│ [MISSION/VISION]                        │
│ Same cards as homepage                  │
├─────────────────────────────────────────┤
│ [TEAM] "Meet the Team"                  │
│ ┌──────┬──────┬──────┬──────┬──────┐   │
│ │Dirk  │Reyn- │Byron │Keith │Dono- │   │
│ │Theart│ardt  │Clarke│Hesk- │van   │   │
│ │ MD   │Bester│Ops   │eth   │Theart│   │
│ │      │ GM   │Mgr   │Mktg  │Biz   │   │
│ │      │      │      │& eCom│Dev   │   │
│ └──────┴──────┴──────┴──────┴──────┘   │
├─────────────────────────────────────────┤
│ [VALUES MARQUEE]                        │
│ Quality Assurance · Efficiency ·        │
│ Customer Focus · Safety ·               │
│ Sustainability · Collaboration ·        │
│ Integrity · Compliance ·                │
│ Innovation · Reliability                │
│ (10 values, infinite scroll)            │
├─────────────────────────────────────────┤
│ [GALLERY] "Our Space" (8 images)        │
│ Office/workspace carousel               │
├─────────────────────────────────────────┤
│ [SUSTAINABILITY]                        │
│ "28% Decreased scope 3 emissions as per │
│  GCX Sustainability Report 2024"        │
├─────────────────────────────────────────┤
│ [CTA] "Let's work together — With your  │
│ vision and our skills, we can reshape   │
│ the future of packaging."               │
├─────────────────────────────────────────┤
│ [FOOTER]                                │
└─────────────────────────────────────────┘
```

### 9.2 Timeline Detail (Updated)
| Tahun | Milestone | Detail |
|-------|-----------|--------|
| **2002** | Founded | Masuk ke dunia packaging, berbasis di Paarl, South Africa |
| **2008** | Global Expansion | Memperluas jaringan partner global |
| **2015** | Multisteps Partnership | Partner dengan Multisteps Manufacturing |
| **2020** | Business Booms | Bisnis melonjak selama masa lockdown COVID |
| **2025** | New Era | Menjadi trusted packaging supplier, peluncuran website baru |

### 9.3 Company Values (10)
1. Quality Assurance
2. Efficiency
3. Customer Focus
4. Safety
5. Sustainability
6. Collaboration
7. Integrity
8. Compliance
9. Innovation
10. Reliability

Ditampilkan sebagai **continuous marquee** yang bergerak horizontal — bukan static grid.

### 9.4 Team Leadership
| Name | Title | Focus |
|------|-------|-------|
| **Dirk Theart** | Managing Director | Strategic leadership |
| **Reynardt Bester** | General Manager | Operations oversight |
| **Byron Clarke** | Operations Manager | Day-to-day operations |
| **Keith Hesketh** | Marketing & eCommerce | Digital presence, online shop |
| **Donovan Theart** | Business Development | Growth, partnerships |

---

## 10. Industry Pillar Pages

### 10.1 SHARED TEMPLATE (Identik di 3 halaman)
Semua industry pillar pages (Food Service, Food Processing, Agriculture) menggunakan **template yang persis sama** dengan content berbeda:

```
┌─────────────────────────────────────────┐
│ [HERO]                                  │
│ Title + tagline/subtitle                │
│ CTA marquee strip (rolling)             │
│ Hero product image (right side)         │
│ Dark moody background photograph        │
├─────────────────────────────────────────┤
│ [INDUSTRY MARQUEE × 3 ROWS]            │
│ Target industry keywords                │
│ (dual-direction, infinite scroll)       │
├─────────────────────────────────────────┤
│ [VALUE PROPOSITION]                     │
│ Headline + body text                    │
│ Partner mention (Multisteps)            │
│ Image gallery (5 photos)               │
│ Dual CTAs (production process + contact)│
├─────────────────────────────────────────┤
│ [SHOP PRODUCTS] (optional, Food Service)│
│ 4 featured products with prices         │
│ "Get 5% cashback" Rewards banner        │
├─────────────────────────────────────────┤
│ [WHY CHOOSE YUCCA] Feature cards        │
│ 4-6 cards: icon + title + description   │
├─────────────────────────────────────────┤
│ [PROCESS] "Our 5 Step Process"          │
│ CTA → /custom-solutions                 │
├─────────────────────────────────────────┤
│ [INNOVATE CTA] Image rotating carousel  │
│ + "Get in touch" → /contact             │
├─────────────────────────────────────────┤
│ [STANDARDS] 14 certification badges     │
├─────────────────────────────────────────┤
│ [FAQ ACCORDION] 3-5 questions           │
│ "View all" → /faq                       │
├─────────────────────────────────────────┤
│ [FOOTER]                                │
└─────────────────────────────────────────┘
```

### 10.2 Per-Pillar Content Comparison

| Element | Food Service | Food Processing | Agriculture |
|---------|-------------|----------------|-------------|
| **Hero Title** | "Food Service" | "Food Processing" | "Agriculture" |
| **Tagline** | "Serving up exceptional packaging." | "Engineered to preserve." | "Your harvest is handled with care." |
| **CTA Marquee** | "Need to restock? Order now" | "Interested? Contact us." | "Have a question? Chat with a packaging specialist." |
| **Hero Product** | Kraft salad bowl with lid | MAP plastic tray | Blueberry punnet tub and lid |
| **Background** | Food service environment | Food factory/lab | Strawberries & blueberries (dark, artistic) |

### 10.3 Industry Keywords (Marquee)

**Food Service (3 rows):**
- Row 1: Hotels · Event Catering · Restaurants
- Row 2: Food Deliveries · Cafés · Bakeries
- Row 3: Delis · Juice Bars · Food Trucks · Market Stalls

**Food Processing (3 rows):**
- Row 1: Ready Meals · Fresh Cuts · Frozen Food
- Row 2: Meal Kits · High-Speed Lines · Automation-Ready
- Row 3: Wholesale Processors · Supermarket Suppliers · Private Label Brands

**Agriculture (4 marquee strips):**
- Custom Design · Advanced Printing Techniques
- In-line Labelling · In-line Padding
- Traceability · Scalable Production
- Sustainable Materials · Global Supply

### 10.4 "Why Choose" Cards Comparison

**Food Service (4 cards):**
1. One-of-a-kind Designs
2. Certified Food Safety
3. Sustainable Options
4. Dependable Quality

**Food Processing (6 cards):**
1. MAP (Modified Atmosphere Packaging)
2. VSP (Vacuum Seal Packaging)
3. Purge-Lock Open Cell
4. CPET Ready-Meal (freezer to oven)
5. Ready to Customise
6. Sustainable Options

**Agriculture (6 cards):**
1. Denesting — speed up production
2. Side Ventilation — regulate temperature, limit condensation
3. Automated Pad Inserts — extend shelf life
4. Custom Labels — brand storytelling
5. Precision Printing and Traceability
6. Sustainable Options (PET 0% stat)

### 10.5 Food Service EXCLUSIVE: Product Showcase
Hanya halaman Food Service yang menampilkan section produk dengan harga:
- Double Wall Kraft Coffee Cup — R2.07
- Smoothie Cup — R1.55
- Bagasse 1000ml Clamshell — R3.80
- Kraft Paper Square Salad Bowl — R2.65
- + "Get 5% cashback on every online store purchase" rewards banner

### 10.6 Multisteps Partnership
Semua pillar pages menyebutkan **Multisteps** sebagai manufacturing partner:
- Food Service: "Simplifying Large-scale Supply" — warehouse image
- Food Processing: "Your Product, Our Protection" — Multisteps partnership
- Agriculture: "Think Global Market Growth" — "As an official Multisteps partner for Africa and beyond"
  - CTAs: "View production process" → multisteps.com | "Get in touch" → /contact

---

## 11. Custom Solutions Page

### 11.1 Section Map
```
┌─────────────────────────────────────────┐
│ [HERO]                                  │
│ "Let your brand personality shine.      │
│  Bespoke packaging solutions..."        │
│                                         │
│ Anchor tabs: [Custom Packaging] [Branding]│
├─────────────────────────────────────────┤
│ [INDUSTRY MARQUEE]                      │
│ Agile Fresh Produce Growers ·           │
│ Ready Meal Retailers ·                  │
│ Food Process Industries ·               │
│ Event Caterers · Restaurants ·          │
│ Takeout Delis and Bakeries              │
├─────────────────────────────────────────┤
│ [CUSTOM PACKAGING PROCESS] (5 steps)    │
│ 1. Brainstorm and briefing              │
│ 2. Project planning and quotation       │
│ 3. Design and approval                  │
│ 4. Design and approval (phase 2)        │
│ 5. Order Confirmation and management    │
├─────────────────────────────────────────┤
│ [BRANDING PROCESS] (4 numbered steps)   │
│ 01 Send Us Your Artwork                 │
│ 02 Virtual Fitting                      │
│ 03 Review and Approve                   │
│ 04 Confirm Order and Enjoy              │
├─────────────────────────────────────────┤
│ [GET INSPIRED] Gallery + "Enquire Now"  │
├─────────────────────────────────────────┤
│ [STANDARDS] 14 certifications           │
├─────────────────────────────────────────┤
│ [FAQ] 7 questions                       │
│ "View all" → /faq                       │
├─────────────────────────────────────────┤
│ [FOOTER]                                │
└─────────────────────────────────────────┘
```

### 11.2 Tab Navigation UX
- 2 anchor tabs di hero section
- Click → smooth scroll ke section yang relevan (`#custom-packaging`, `#branding`)
- Tab state mencerminkan posisi scroll saat ini

### 11.3 Custom Packaging Process (5 Steps)
1. **Brainstorm and briefing** — initial consultation
2. **Project planning and quotation** — specs + quote
3. **Design and approval** — first design review
4. **Design and approval** — refined design review
5. **Order Confirmation and management** — production start

### 11.4 Branding Process (4 Steps — Numbered)
| Step | Title | Description |
|------|-------|-------------|
| **01** | Send Us Your Artwork | Submit original artwork or design brief |
| **02** | Virtual Fitting | See your design on packaging mockup |
| **03** | Review and Approve | Final adjustments |
| **04** | Confirm Order and Enjoy | Production begins |

### 11.5 FAQ (7 Questions)
1. What are the minimum order quantities (MOQs)?
2. Can I provide my own packaging artwork?
3. How long does the custom packaging process take?
4. Do you have sustainable custom packaging options?
5. Can you print directly onto your products?
6. What type of printing techniques do you use?
7. What type of printing ink do you use?

---

## 12. Shop / E-commerce

### 12.1 Shop Page Structure
```
┌─────────────────────────────────────────┐
│ [SEARCH BAR] "Search products"          │
├─────────────────────────────────────────┤
│ [TAB NAVIGATION]                        │
│ All Products | Coffee(12) | Smoothies(9)│
│ Deli(37) | Takeout(56) | Extras(8)      │
├─────────────────────────────────────────┤
│ [SORT] Latest | Price ↑ | Price ↓       │
├─────────────────────────────────────────┤
│ [FILTERS SIDEBAR]                       │
│ ┌─ Categories (14) ──────────────────┐  │
│ │ All, Bags(2), Bowls(12), Boxes(12),│  │
│ │ Chip Holders(3), Clamshells(7),    │  │
│ │ Cup holders(1), Cups(14),          │  │
│ │ Cutlery(4), Inserts(1), Lids(22), │  │
│ │ Plates(2), Straws(1), Trays(8),   │  │
│ │ Tubs(5)                            │  │
│ └────────────────────────────────────┘  │
│ ┌─ Material (9) ─────────────────────┐  │
│ │ All, Bagasse(12), Bamboo(2),       │  │
│ │ Birchwood(2), HIPS(1), Paper(38),  │  │
│ │ PET(24), PLA(1), PP(4), PS(2)     │  │
│ └────────────────────────────────────┘  │
│ [Clear All] [Apply Filters]             │
├─────────────────────────────────────────┤
│ [DELIVERY BANNER]                       │
│ "We offer nationwide delivery."         │
│ Free delivery for orders over R2000     │
│ incl. vat                               │
├─────────────────────────────────────────┤
│ [PRODUCT GRID]                          │
│ ┌────────┐ ┌────────┐ ┌────────┐      │
│ │ [IMG]  │ │ [IMG]  │ │ [IMG]  │      │
│ │ [NEW]  │ │ [NEW]  │ │        │      │
│ │ Title  │ │ Title  │ │ Title  │      │
│ │From    │ │From    │ │From    │      │
│ │R0.75   │ │R0.63   │ │R3.45   │      │
│ └────────┘ └────────┘ └────────┘      │
│ ...                                     │
│ [OUT OF STOCK] badges on some items     │
├─────────────────────────────────────────┤
│ [REWARDS BANNER] (inline)               │
│ "Get 5% back on every purchase*"        │
│ "Sign up now" → /my-account?register    │
├─────────────────────────────────────────┤
│ [VIEW MORE] Load more button            │
├─────────────────────────────────────────┤
│ [PRE-FOOTER CTA]                        │
├─────────────────────────────────────────┤
│ [FOOTER]                                │
└─────────────────────────────────────────┘
```

### 12.2 Product Card Anatomy
```
┌──────────────────────┐
│      [PRODUCT IMAGE]  │  ← 1:1 ratio, white background
│      [NEW BADGE]      │  ← green "NEW" overlay (optional)
│      [OUT OF STOCK]   │  ← red badge (optional)
├──────────────────────┤
│  Product Title         │  ← linked to /product/[slug]
│  From R X.XX           │  ← "incl. vat" suffix
│  incl. vat             │
└──────────────────────┘
```

### 12.3 Sample Products (Observed)
| Product | Price | Status |
|---------|-------|--------|
| Dome Lid Cross Hole (95mm) | From R0.75 | NEW |
| Dessert Cup Dome Lid (90mm) | From R0.63 | NEW |
| Yellow Lunch Box | From R3.45 | In Stock |
| PET Salad Bowl With Dome Lid | From R5.75 | OUT OF STOCK |
| PET Salad Bowl With Flat Lid | From R2.76 | OUT OF STOCK |
| Confectionery Tray | From R3.68 | OUT OF STOCK |
| Bagasse Gourmet Burger Box | From R2.65 | OUT OF STOCK |
| Bagasse 1200ml 3-Comp Clamshell | From R4.95 | In Stock |
| Kraft Lunch Box Divided | From R6.56 | In Stock |
| PET Insert (98mm) | From R0.69 | In Stock |
| Sauce Tub Flat Lid | From R0.20 | In Stock |
| Dessert Cup (90mm) | From R1.38 | NEW |
| Dessert Cup Flat Lid (90mm) | From R0.63 | NEW |
| Round Tub (95mm) | From R1.61 | In Stock |
| Round Tub Lid (95mm) | From R0.58 | In Stock |
| Bubble Tea Cup (95mm) | From R1.61 | In Stock |
| Flat Lid With Cross Hole | From R0.52 | In Stock |
| 250ml PET Cup (78mm) | From R1.15 | OUT OF STOCK |
| Dome Lid With Cross Hole (78mm) | From R0.52 | In Stock |
| Smoothie Cup (98mm) | From R1.55 | In Stock |
| Dome Lid With Cross Hole (98mm) | From R0.69 | In Stock |
| Dome Lid With Open Hole (98mm) | From R0.69 | In Stock |

### 12.4 Filter UX Pattern
- **Dual filter system**: Categories (product type) + Materials (material composition)
- **Count indicators**: setiap filter option menampilkan jumlah produk
- **Clear All / Apply Filters**: explicit action buttons
- **Tab-level quick filters**: Coffee, Smoothies, Deli, Takeout, Extras di atas
- **Sort options**: Latest, Price ascending, Price descending

### 12.5 E-commerce Flow
```
Browse /shop → Tab filter or Sidebar filter → Search bar → Select product
→ /product/[slug] (detail page, quantity select, add to cart)
→ /cart (review, update quantities)
→ /checkout (PayFast payment gateway)
→ Order confirmation
→ /my-account (order tracking, Yucca Rewards wallet)
```

---

## 13. Programmes (Rewards & Direct)

### 13.1 Page Hero
**Title**: "Partner Perks"

Dual programme cards di hero:
- **Left**: Yucca Rewards — "Earn 5% cash back on every online store purchase and use what you earn for your next order."
- **Right**: Yucca Direct — "Join Yucca Direct for a personalised dashboard that saves your supply requirements, recommends relevant products and materials and tailors pricing to your order volume and frequency."

### 13.2 Yucca Rewards (B2C/Small Business)

**Interactive Calculator Slider**:
- Label: "How much do you typically spend on packaging each month?"
- Default value: R25,000
- Shows estimated cashback in real-time
- Note: "Estimated cashback applies to purchases made through the online store by registered Yucca Rewards customers. Purchases made via Yucca Direct and Yucca Holdings (Pty) Ltd do not qualify."
- CTA: "Get rewards" → `/my-account/?register`

**Rewards FAQ (5 questions)**:
1. How is cashback calculated? → 5% of order value, excl. VAT and delivery
2. Can I transfer cashback to bank? → No, only usable for online orders
3. Do rewards expire? → Yes, annually on 30 June. Reset to R0.00 from 01 July
4. How to check balance? → Login → Profile
5. What if I return a product? → Refer to return policy

### 13.3 Yucca Direct (B2B/Enterprise)

**Headline**: "Yucca Direct is built for Volume."

**5 Feature Cards**:
1. **Place orders quickly** — personalised storefront, easy navigation
2. **Dedicated Consultant** — direct point of call for all packaging needs
3. **Exclusive Volume-based Pricing** — custom price lists per business
4. **One rate for all locations** — same pricing across all branches
5. **Personalised Catalogue** — tailored storefront showing relevant products

**CTA**: "Download credit application" → PDF

**Direct FAQ (6 questions)**:
1. Who is Yucca Direct for? → Vetted and approved businesses
2. How differs from online store? → Exclusive storefront, custom pricing, payment terms
3. How to access negotiated pricing? → Login to Direct storefront
4. Can I switch between store and Direct? → Yes, but pricing differs
5. How to join? → Ask Yucca Account Manager or contact us
6. Can I request customisation in Direct? → Yes, custom branding options

### 13.4 Hero Visual
- **Gold coins** with Yucca logomark — rewards imagery
- **Phone mockup** showing Yucca ecommerce shop — modern digital feel

---

## 14. Contact Page

### 14.1 Complete Structure
```
┌─────────────────────────────────────────┐
│ [HERO] "Let's Chat"                     │
│ "We're here to help"                    │
├─────────────────────────────────────────┤
│ [FORM]                                  │
│                                         │
│ Industry Type: [dropdown]               │
│   ├─ Food Service                       │
│   ├─ Food Processing                    │
│   └─ Agriculture                        │
│                                         │
│ First Name*  │  Last Name*              │
│ Email*       │  Contact Number          │
│                                         │
│ What are you looking for?               │
│ □ Customisation                         │
│ □ Branding                              │
│ □ Other                                 │
│                                         │
│ [File Attachment] (artwork/briefs)      │
│ [Message] (textarea)                    │
│                                         │
│ [Submit Enquiry] + [Yucca logo icon]    │
├─────────────────────────────────────────┤
│ [MAP] "Meet Us"                         │
│ Google Maps embed (interactive)         │
├─────────────────────────────────────────┤
│ [DETAILS]                               │
│ Address: Unit 1, Reserve 5, Capricorn   │
│  Way, Brackenfell, 7560, South Africa   │
│ Phone: +27 21 949 2296                  │
│ Hours:                                  │
│  Mon-Thu: 8:00 — 4:30                   │
│  Fri:     8:00 — 4:00                   │
│  Weekend: Closed                        │
├─────────────────────────────────────────┤
│ [FOOTER]                                │
└─────────────────────────────────────────┘
```

### 14.2 Form UX Details
- **Industry dropdown** routes enquiry to correct team/specialist
- **Required fields** marked with asterisk (*): First Name, Last Name, Email
- **Multi-select checkboxes**: user can select multiple needs (Customisation AND Branding)
- **File attachment**: allows uploading artwork, briefs, or product photos
- **Logo icon** appears beside submit button — subtle brand reinforcement
- **No CAPTCHA visible** — form may use honeypot or server-side spam protection

### 14.3 Contact Information
| Channel | Detail |
|---------|--------|
| **Address** | Unit 1, Reserve 5, Capricorn Way, Brackenfell, 7560, SA |
| **Phone** | +27 21 949 2296 |
| **WhatsApp** | +27 83 796 0416 (site-wide FAB) |
| **Hours** | Mon–Thu 8:00–16:30, Fri 8:00–16:00, Weekend Closed |
| **Email** | Not publicly listed (form-only approach) |

---

## 15. Blog / Case Studies

### 15.1 Structure
```
┌─────────────────────────────────────────┐
│ [HERO/FEATURED] Latest article          │
│ Full-width card with image + excerpt    │
├─────────────────────────────────────────┤
│ [CATEGORY FILTER]                       │
│ All | Agriculture | Blog | Sustainability│
├─────────────────────────────────────────┤
│ [ARTICLE GRID]                          │
│ ┌────────────────────┐                  │
│ │ [CATEGORY BADGE]   │                  │
│ │ [IMAGE]            │                  │
│ │ DATE               │                  │
│ │ TITLE (linked)     │                  │
│ │ EXCERPT (2-3 lines)│                  │
│ └────────────────────┘                  │
├─────────────────────────────────────────┤
│ [PRE-FOOTER CTA]                        │
├─────────────────────────────────────────┤
│ [FOOTER]                                │
└─────────────────────────────────────────┘
```

### 15.2 Published Articles (Observed)

| Article | Category | Date |
|---------|----------|------|
| "How Agricultural Packaging Drives Quality, Compliance, and Export Growth" | Agriculture | 9 Sep 2025 |
| "Navigating Sustainable Packaging In South Africa: Lessons from Europe" | Blog | 8 Dec 2025 |

### 15.3 Content Strategy
- **Low volume, high quality** — hanya 2 artikel terdeteksi
- **Category mix**: Industry-specific (Agriculture) + thought leadership (Sustainability)
- **SEO-optimized slugs**: `/agricultural-packaging-for-export/`, `/sustainable-packaging-south-africa/`
- **Featured article**: terbaru ditampilkan prominent di hero area
- **Yucca logo icon** digunakan sebagai loading placeholder saat article grid loads

---

## 16. FAQ — Mega Hub

### 16.1 Tabbed Category System
```
┌─────────────────────────────────────────┐
│ [TAB NAV]                               │
│ All | Home | Agriculture | Food Service │
│ | Food Processing | Custom Solutions    │
│ | Yucca Rewards | Yucca Direct          │
├─────────────────────────────────────────┤
│ [ACCORDION PER CATEGORY]                │
│                                         │
│ ## Home (5 questions)                   │
│ ## Agriculture (4 questions)            │
│ ## Food Service (5 questions)           │
│ ## Food Processing (3 questions)        │
│ ## Custom Solutions (7 questions)       │
│ ## Yucca Rewards (5 questions)          │
│ ## Yucca Direct (6 questions)           │
│                                         │
│ TOTAL: ~35 FAQ items                    │
├─────────────────────────────────────────┤
│ [PRE-FOOTER CTA]                        │
├─────────────────────────────────────────┤
│ [FOOTER]                                │
└─────────────────────────────────────────┘
```

### 16.2 Complete FAQ by Category

**Home / General (5)**:
1. What types of packaging do you offer?
2. Do you deliver nationwide?
3. Do you deliver globally?
4. How do I place an order?
5. Do you offer sustainable packaging options?

**Agriculture (4)**:
1. What types of agricultural packaging solutions do you offer?
2. What is your order lead time? → 4 weeks production
3. Can I track the progress of my order?
4. Do you offer sustainable material options? → rPET, FSC paper

**Food Service (5)**:
1. Which divisions of the Food Service Industry do you cater to?
2. Do you have sustainable food packaging options?
3. Can I order in bulk or for multiple branches?
4. How long will it take to receive my order? → Custom: 4 weeks; Standard: 1-3 business days
5. Can I track the progress of my order?

**Food Processing (3)**:
1. What packaging sizes and formats are available?
2. What is your lead time? → 4 weeks
3. What is your minimum order quantity?

**Custom Solutions (7)**:
1. What are the minimum order quantities (MOQs)?
2. Can I provide my own packaging artwork?
3. How long does the custom packaging process take?
4. Do you have sustainable custom packaging options?
5. Can you print directly onto your products?
6. What type of printing techniques do you use? → offset, digital, flexo
7. What type of printing ink do you use? → water-based (food safety + recyclability)

**Yucca Rewards (5)**:
1. How is cashback calculated? → 5% excl. VAT/delivery
2. Can I transfer cashback to bank? → No
3. Do cashback rewards expire? → Yes, reset 1 July annually
4. How can I check my cashback balance?
5. What happens if I return a product?

**Yucca Direct (6)**:
1. Who is Yucca Direct for? → vetted/approved businesses
2. How does Direct differ from online store?
3. How do I access negotiated product list?
4. Can I switch between store and Direct?
5. How do I join Yucca Direct?
6. Can I request customisation in Direct?

### 16.3 FAQ UX Pattern
- **Tab filter** di atas: selecting tab shows only that category's questions
- **Accordion** expand/collapse per question — GSAP height animation
- **"View all"** link dari setiap page-level FAQ section → mengarah ke /faq
- **Contextual**: FAQ di pillar pages ONLY menampilkan pertanyaan terkait pillar tersebut
- **Centralized**: /faq menampilkan SEMUA FAQ dari semua kategori sekaligus

---

## 17. Footer, CTA & Conversion Patterns

### 17.1 Pre-Footer CTA Banner (Recurring)
Muncul di **hampir semua halaman** (homepage, pillar pages, custom solutions, shop, blog, FAQ):

```
┌────────────────────────────────────────────────────────┐
│ "Brands that thrive invest in custom-designed         │
│  packaging. Let us help bring your vision to life."   │
│                                                        │
│ [Enquire now] → /contact                              │
│                                                        │
│ ← "Not sure what's possible? Get in touch." ← →      │
│    (marquee text, infinite loop, 4× repeated)         │
│                                                        │
│ [Background image or gradient]                         │
└────────────────────────────────────────────────────────┘
```

### 17.2 WhatsApp FAB
```
Position: fixed, bottom-right corner
Icon: WhatsApp logo (green brand color)
Link: https://wa.me/+27837960416
Shadow: subtle drop shadow
Present: ALL pages
```

### 17.3 Mega Footer Structure
```
┌────────────────────────────────────────────────────────┐
│ "Innovated for Industry Leaders."                      │
│ [Yucca Logo]                                           │
│ [Certification Badge Row — 14 badges horizontal]       │
├──────────────────┬───────────────┬─────────────────────┤
│  Food Service    │ Food Processing│ Agriculture         │
│  [Image card]    │ [Image card]   │ [Image card]        │
│  → /food-service │ → /food-proc.  │ → /agriculture      │
├──────────────────┴───────────────┴─────────────────────┤
│ [Social Icons]                                          │
│ Facebook · Instagram · LinkedIn                         │
│                                                         │
│ © Yucca 2026. All Rights Reserved                       │
│ Contact Us · Privacy Policy · Terms & Conditions        │
├─────────────────────────────────────────────────────────┤
│ Additional Links (hidden/footer bottom):                │
│ Credit Application (PDF) · Shop · Company · Contact Us  │
└─────────────────────────────────────────────────────────┘
```

### 17.4 CTA Density per Page (Conversion Touchpoints)
| Page | CTA Count | Types |
|------|-----------|-------|
| **Homepage** | 8+ | Hero pillars ×3, marquee, about link, products ×4, pre-footer, FAQ view-all, WhatsApp |
| **Pillar Pages** | 6+ | Marquee CTA, value prop CTAs ×2, products, process link, innovate CTA, WhatsApp |
| **Custom Solutions** | 5+ | Industry marquee, process links, "Enquire Now", FAQ view-all, WhatsApp |
| **Shop** | 4+ | Rewards banner, product links, sign-up, pre-footer, WhatsApp |
| **Programmes** | 4+ | Rewards sign-up, Direct credit app, FAQ view-all, WhatsApp |
| **Contact** | 2+ | Form submit, WhatsApp, phone number |
| **Blog** | 3+ | Article links, pre-footer, WhatsApp |
| **FAQ** | 3+ | Pre-footer, contact us link, WhatsApp |

**Key Insight**: Minimum **4 CTA touchpoints per page**, dengan halaman utama mencapai **8+ touchpoints**. CTA saturation yang tinggi tanpa terasa overwhelming karena visual hierarchy yang baik.

---

## 18. Content Strategy & Information Architecture

### 18.1 Messaging Hierarchy
```
Level 1 (Brand Essence):    "Innovated for Industry Leaders"
Level 2 (Promise):          "Packaging that Performs"
Level 3 (Pillars):          Food Service | Food Processing | Agriculture
Level 4 (Proof):            14 certifications, Multisteps partnership, 2002 heritage
Level 5 (Action):           Custom Solutions, Shop, Contact, Programmes
Level 6 (Engagement):       Blog, FAQ, WhatsApp, Waitlist
```

### 18.2 Content Pillars
| Pillar | Purpose | Pages |
|--------|---------|-------|
| **Industry Solutions** | B2B trust per vertical | food-service, food-processing, agriculture |
| **Customisation** | High-margin bespoke services | custom-solutions |
| **E-commerce** | Self-serve purchase channel | shop, programmes |
| **Thought Leadership** | SEO + expertise | blog, faq |
| **Trust & Credibility** | Social proof | about, standards (repeated ×5) |

### 18.3 Recurring Content Patterns
| Pattern | Occurrences | Purpose |
|---------|-------------|---------|
| **Marquee CTA strip** | Every pillar page hero | Urgency, direct contact push |
| **Marquee keyword rows** | Homepage (4), Pillar pages (3-4), Custom Solutions (1), About values (1) | SEO keywords, visual rhythm, brand reinforcement |
| **Standards section** | Homepage + 3 pillars + custom solutions = **5 pages** | Trust signal repetition |
| **FAQ accordion** | Homepage + 3 pillars + custom solutions + contact + programmes = **7 pages** | SEO long-tail, user support |
| **Pre-footer CTA banner** | Nearly all pages | "Last chance" conversion |
| **"View all" link** | FAQ sections → /faq | Content hub strategy |
| **Process steps** | Pillar pages ("Our 5 Step Process") + Custom Solutions (5+4 steps) | Service transparency |
| **Multisteps partnership** | All 3 pillar pages | Partnership credibility |
| **Rewards/loyalty banner** | Shop, nav, pillar pages | Programme uptake |

### 18.4 Conversion Funnel
```
Awareness:    Blog articles, SEO (FAQ), Social media
Interest:     Pillar pages (industry-specific), About page, Standards
Consideration: Custom Solutions, Shop browsing, Programmes
Decision:     Contact form, WhatsApp, Product page → Cart
Retention:    Yucca Rewards (5% cashback), Yucca Direct (personalised B2B)
Advocacy:     Loyalty programme flywheel, testimonials (not yet visible)
```

### 18.5 Missing Content (Opportunities)
- ❌ **No testimonials/case studies** (blog mentions "Case Studies" but none visible)
- ❌ **No video content** (all static images)
- ❌ **No pricing page** (prices only on shop product pages)
- ❌ **No comparison tables** (e.g., materials comparison)
- ❌ **No newsletter signup** (waitlist page exists but separate)
- ⚠️ **Very few blog posts** (only 2 articles published)

---

## 19. Responsive & Mobile Strategy

### 19.1 Primary Breakpoint
```javascript
const isMobile = window.innerWidth <= 1100;
```

### 19.2 Mobile Adaptations
| Feature | Desktop | Mobile (≤1100px) |
|---------|---------|------------------|
| **Navigation** | Hover mega-menu (3 panels) | Full-screen overlay + accordion submenus |
| **Hero** | Side-by-side layout | Stacked (image → text), separate mobile image |
| **Marquee** | Full-speed, large text | Reduced speed, smaller text |
| **Product grid** | 3-4 columns | 1-2 columns |
| **FAQ** | Wide accordion panels | Full-width |
| **Footer pillars** | 3-column grid | Stacked vertical |
| **WhatsApp FAB** | Fixed bottom-right | Same position, adjusted sizing |
| **Process steps** | Horizontal timeline/grid | Vertical stack |
| **Filters (shop)** | Sidebar | Collapsible drawer |
| **Team section** | 5-column grid | 2-column or carousel |
| **Timeline** | Horizontal timeline | Vertical timeline |
| **Tab navigation** | Inline tabs | Scrollable tabs or dropdown |

### 19.3 Mobile-Specific Assets
Homepage hero menggunakan **separate mobile image**:
- Desktop: `yucca-packaging-homepage-intro-plastic-cups-for-iced-chilled-drinks.jpg`
- Mobile: `..._mobile.jpg`

→ Optimized cropping dan loading ukuran yang tepat per viewport.

### 19.4 Touch Behavior
- Lenis dengan `touchMultiplier` untuk native-feeling smooth scroll
- Swipe gestures pada carousel/gallery components
- Tap-to-expand FAQ accordion
- No hover-dependent critical functionality on mobile

---

## 20. SEO Patterns

### 20.1 On-Page SEO
| Element | Implementation |
|---------|---------------|
| **Title tags** | Page-specific ("Food Service - Yucca Packaging") |
| **URL structure** | Clean slugs (`/food-service`, `/custom-solutions`) |
| **Internal linking** | Dense cross-linking (see Section 3.3) |
| **FAQ Schema** | Accordion FAQs on 7+ pages → rich snippet potential |
| **Blog** | Keyword-rich titles, category taxonomy |
| **Image alt text** | Descriptive ("Blueberry punnet tub and lid", "Kraft salad bowl with lid") |
| **WordPress sitemap** | Auto-generated XML sitemap |

### 20.2 Content SEO Strategy
- **FAQ everywhere**: 35+ unique questions across 7 categories, duplicated contextually
- **Long-tail keywords**: FAQ answers contain detailed, keyword-rich responses
- **Industry-specific pages**: dedicated pages for each vertical → topical authority
- **Blog content**: limited but keyword-targeted ("agricultural packaging for export", "sustainable packaging south africa")
- **Product pages**: individual URLs per product with WooCommerce structured data

### 20.3 Technical SEO
- **Barba.js consideration**: SPA-like navigation may affect crawling (content is server-rendered initially)
- **Lazy loading**: images lazy-loaded → important for Core Web Vitals
- **Single JS bundle**: no code splitting → larger initial load
- **WebP images**: modern format for preloader → good performance signal

---

## 21. Key Takeaways untuk Alfa Beauty

### 21.1 Pattern Adoption Matrix

| # | Yucca Pattern | Relevansi Alfa Beauty | Status | Priority |
|---|--------------|----------------------|--------|----------|
| 1 | **Announcement bar** (dismissible top strip) | Promo produk, event, diskon | ✅ Implemented (Phase 8) | Done |
| 2 | **Pre-footer CTA banner** dengan rotating marquee | "Konsultasi gratis?" | ✅ Implemented (Phase 8) | Done |
| 3 | **Dual-row marquee** (alternating direction) | Brand keywords | ✅ Implemented (Phase 8) | Done |
| 4 | **Pillar CTA cards** in hero | Link ke kategori/brand | ✅ Implemented (Phase 8) | Done |
| 5 | **Session-aware preloader** | Skip on return visits | ✅ Implemented (Phase 8) | Done |
| 6 | **Industry-specific contact form** dropdown | Tipe bisnis (salon, barbershop, distributor) | ⚠️ Partially (form exists, no dropdown) | HIGH |
| 7 | **FAQ sections per page** (contextual FAQ) | SEO boost + user support per product/service | ❌ Not implemented | HIGH |
| 8 | **Certification/trust badges** section (repeated) | BPOM, Halal, brand certifications | ❌ Not implemented | HIGH |
| 9 | **Numbered process steps** (01, 02, 03) | "Cara Order" / "Cara Jadi Partner" | ❌ Not implemented | MEDIUM |
| 10 | **Interactive calculator/slider** | Partnership tier calculator | ❌ Not implemented | MEDIUM |
| 11 | **Tabbed FAQ hub** (/faq page with category tabs) | Centralized FAQ page | ❌ Not implemented | MEDIUM |
| 12 | **Blog category filtering** | Education page filter | ⚠️ Partially (has tabs) | LOW |
| 13 | **Google Maps embed** on contact | Office/showroom location | ❌ Not implemented | LOW |
| 14 | **Product "OUT OF STOCK" / "NEW" badges** | Stock status indicators | ❌ Not relevant (no e-commerce) | N/A |
| 15 | **Rewards programme** with wallet | Partnership rewards | ❌ Not planned currently | N/A |

### 21.2 Animation Patterns Adoption Status

| Yucca (GSAP) | Alfa Beauty (Framer Motion) Equivalent | Status |
|--------------|----------------------------------------|--------|
| ClipPath inset reveal | `clipPath` in Framer Motion | ⚠️ Can add to hero/sections |
| SplitText line stagger | `TextReveal` component | ✅ Implemented |
| Scale 1.4→1 image reveal | `kenBurnsIn` variant | ✅ Implemented |
| Border scaleX grow | `LineGrow` component | ✅ Implemented |
| yPercent slide up | `slideUp` variant | ✅ Implemented |
| ScrollTrigger parallax | `whileInView` + transform | ✅ Implemented |
| autoAlpha (visibility+opacity) | Framer Motion `animate` | ✅ Implemented |
| 5-frame preloader sequence | Session-aware preloader | ✅ Implemented |
| 4-row marquee (dual direction) | Dual-row marquee | ✅ Implemented |
| Barba.js page transitions | Next.js page transitions | ✅ Implemented |
| Mega-menu GSAP timelines | Mega-menu animation | ✅ Implemented (Phase 8) |

### 21.3 Content Architecture Lessons

| Lesson | Detail | Applicability |
|--------|--------|---------------|
| **Template consistency** | Yucca's 3 pillar pages use IDENTICAL template with different content | Product category pages harus konsisten |
| **CTA saturation** | Min 4 CTA touchpoints per page, max 8+ | Ensure every page has multiple conversion paths |
| **FAQ everywhere** | Contextual FAQ on 7 of 10 major pages | Add FAQ to product pages, about, partnership |
| **Standards repetition** | Trust badges on 5 pages | Repeat certification info frequently |
| **Dual CTA** | Primary action + softer secondary option | Give hesitant users an easier entry point |
| **Cross-linking density** | Every page links to ≥3 other pages | Strengthen internal navigation |
| **Process transparency** | Numbered steps explain how services work | Add process steps to partnership/contact |
| **Programme value** | Rewards calculator shows tangible benefits | Make partnership benefits calculable/concrete |

---

## 22. Gap Analysis: Apa yang Alfa Beauty Belum Punya

### HIGH Priority Gaps

| # | Gap | Yucca Reference | Recommended Action |
|---|-----|----------------|-------------------|
| **G1** | No FAQ sections on individual pages | FAQ on 7/10 pages | Add contextual FAQ data to product pages, about, partnership, contact |
| **G2** | No centralized FAQ page | /faq with 35+ questions, 7 category tabs | Create /faq route with tabbed accordion |
| **G3** | No certification/trust badge section | 14 badges on 5+ pages | Create TrustBadges component, add to homepage + key pages |
| **G4** | Contact form lacks industry/business type dropdown | Industry Type dropdown routes to specialist | Add business type selector to contact form |
| **G5** | No "Why Choose Us" feature cards per service | 4-6 cards per pillar page | Add feature cards to relevant pages |

### MEDIUM Priority Gaps

| # | Gap | Yucca Reference | Recommended Action |
|---|-----|----------------|-------------------|
| **G6** | No numbered process steps | Custom Solutions 5-step + 4-step branding | Add "Cara Jadi Partner" or "Cara Order" numbered steps |
| **G7** | No interactive calculator/slider | Rewards calculator showing cashback estimate | Consider partnership benefits calculator |
| **G8** | No sustainability stats | "28% Decreased scope 3 emissions" with source | Add brand sustainability/quality metrics with verifiable data |
| **G9** | No company timeline | 5-milestone timeline (2002-2025) | Add timeline to about page |
| **G10** | No team/leadership section | 5 team members with photo + role | Add team section to about page |

### LOW Priority Gaps

| # | Gap | Yucca Reference | Recommended Action |
|---|-----|----------------|-------------------|
| **G11** | No Google Maps on contact | Map embed with exact address | Add map component if physical location is relevant |
| **G12** | No downloadable resources (PDF) | Credit Application PDF in footer | Add product catalog/pricelist PDF downloads |
| **G13** | No cookie consent banner | GDPR-style tripartite consent | Add cookie consent management |
| **G14** | No blog category filtering | 3 categories with filter tabs | Enhance education page filtering |
| **G15** | No waitlist/coming-soon page | /waitlist for upcoming features | Consider for new product launches |

---

## Lampiran A: Yucca Technical Reference Cheat Sheet

### Easings Quick Reference
```
power2.out    → Standard reveals, text, cards
power2.inOut  → Preloader, symmetrical movements
power3.inOut  → ClipPath reveals, premium feel
power3.out    → Hero entrances, large elements
none          → Parallax scrub (linear)
quintic       → 1-Math.pow(1-e,5) — Lenis scroll
```

### Animation Timing Reference
```
Text reveal:     0.5-0.8s, stagger 0.04
ClipPath reveal: 0.6-0.8s
Image scale:     0.8-1.2s
Border grow:     0.5s
Slide up:        0.4-0.6s, stagger 0.04-0.08
Preloader:       ~3s total
Page transition: ~1s total
Hover debounce:  100-150ms
```

### Content Recurring Sections Checklist
```
Per-page recurring sections di Yucca:
□ Hero with headline + CTA(s)
□ Marquee keyword strips (2-4 rows)
□ Main content (unique per page)
□ Why Choose / Feature cards
□ Process steps (numbered)
□ Trust badges (14 certifications)
□ FAQ accordion (3-7 contextual questions)
□ Pre-footer CTA banner with marquee
□ WhatsApp FAB (floating)
□ Mega footer with pillar cards + social links
```

---

## Lampiran B: Yucca URL & Asset Reference

### Key URLs
| URL | Purpose |
|-----|---------|
| `yucca.co.za/` | Homepage |
| `yucca.co.za/about` | Company info, team, timeline |
| `yucca.co.za/food-service` | Food service industry pillar |
| `yucca.co.za/food-processing` | Food processing industry pillar |
| `yucca.co.za/agriculture` | Agriculture industry pillar |
| `yucca.co.za/custom-solutions` | Bespoke packaging + branding process |
| `yucca.co.za/shop` | WooCommerce product catalog |
| `yucca.co.za/programmes` | Yucca Rewards + Yucca Direct |
| `yucca.co.za/blog` | Case studies + articles |
| `yucca.co.za/faq` | Centralized FAQ hub (7 categories) |
| `yucca.co.za/contact` | Contact form + map + details |
| `yucca.co.za/waitlist` | Upcoming features waitlist |
| `yucca.co.za/cart` | Shopping cart |
| `yucca.co.za/my-account` | User account / Yucca Rewards wallet |
| `yucca.co.za/privacy-policy` | Privacy policy |
| `yucca.co.za/terms-conditions` | Terms & conditions |

### Key Assets
| Asset | Path |
|-------|------|
| Logo Icon SVG | `/wp-content/themes/yucca/src/assets/images/logo-icon.svg` |
| Loader Frame 1-5 | `/wp-content/themes/yucca/src/assets/images/loader/[1-5].webp` |
| Homepage Hero (Desktop) | `/wp-content/uploads/2025/09/yucca-packaging-homepage-intro-plastic-cups-for-iced-chilled-drinks.jpg` |
| Homepage Hero (Mobile) | `/wp-content/uploads/2025/09/...._mobile.jpg` |
| Agriculture Hero | `/wp-content/uploads/2025/05/agriculture-img-1536x1536.png` |
| Agriculture Background | `/wp-content/uploads/2025/09/yucca-packaging-in-agriculture-strawberries-blueberries-1-1200x750.jpg` |
| Rewards Gold Coins | `/wp-content/uploads/2025/05/Food-Packaging.H03.2k.png` |
| Programmes Mockup | `/wp-content/uploads/2025/08/mockup-1200x800.webp` |
| Credit Application | `/wp-content/uploads/2025/09/Credit-Application-YUCCA.pdf` |

---

> **Catatan**: Analisis v3 ini berdasarkan fetch langsung dari 10 halaman utama yucca.co.za pada Januari 2026, dibandingkan dengan deep-study-v2.md (Juli 2025). Situs tetap menggunakan fondasi teknis yang sama (WordPress + GSAP + Barba.js + Lenis) dengan pembaruan konten dan refinement. Layout dan UX patterns konsisten dan profesional, menunjukkan design system yang matang dan content strategy yang well-executed.
