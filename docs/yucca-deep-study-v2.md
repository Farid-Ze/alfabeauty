# Studi Detail: yucca.co.za — Deep Technical & UX Analysis v2

> **Tanggal**: Juli 2025  
> **Sumber**: Fetch langsung (HTML + dist/main.js) + Browser live analysis  
> **Tujuan**: Memahami sepenuhnya arsitektur, design system, animasi, UX patterns, dan content strategy Yucca Packaging  
> **Dibuat oleh**: Zulik Digital (zulik.co)

---

## Daftar Isi

1. [Arsitektur Teknologi](#1-arsitektur-teknologi)
2. [Sitemap & Hierarki Halaman](#2-sitemap--hierarki-halaman)
3. [Design System](#3-design-system)
4. [Navigation System (Mega-Menu)](#4-navigation-system-mega-menu)
5. [Preloader & Brand Reveal](#5-preloader--brand-reveal)
6. [Page Transitions (Barba.js)](#6-page-transitions-barbajs)
7. [Smooth Scroll (Lenis)](#7-smooth-scroll-lenis)
8. [GSAP Animation Engine](#8-gsap-animation-engine)
9. [Homepage Deep-Dive](#9-homepage-deep-dive)
10. [About Page](#10-about-page)
11. [Industry Pillar Pages](#11-industry-pillar-pages)
12. [Custom Solutions Page](#12-custom-solutions-page)
13. [Shop / E-commerce](#13-shop--e-commerce)
14. [Programmes (Rewards & Direct)](#14-programmes-rewards--direct)
15. [Contact Page](#15-contact-page)
16. [Blog / Case Studies](#16-blog--case-studies)
17. [FAQ Page](#17-faq-page)
18. [Footer & CTA Patterns](#18-footer--cta-patterns)
19. [Content Strategy](#19-content-strategy)
20. [Responsive & Mobile Strategy](#20-responsive--mobile-strategy)
21. [SEO & Performance](#21-seo--performance)
22. [Key Takeaways untuk Alfa Beauty](#22-key-takeaways-untuk-alfa-beauty)

---

## 1. Arsitektur Teknologi

### Stack Utama
| Layer | Teknologi |
|-------|-----------|
| **CMS** | WordPress + WooCommerce |
| **Theme** | Custom theme "Yucca" oleh Zulik Digital (zulik.co) |
| **Animation** | GSAP 3 (GreenSock) — core library |
| **GSAP Plugins** | ScrollTrigger, SplitText, Observer |
| **Page Transitions** | Barba.js (SPA-like, `sync: true`) |
| **Smooth Scroll** | Lenis (quintic ease-out: `e => 1 - Math.pow(1-e, 5)`) |
| **Lazy Loading** | LazyLoad (vanilla-lazyload) |
| **Build System** | Webpack (dist/main.js bundle) |
| **JavaScript Pattern** | Class-based ES6+ modules |
| **Backend** | PHP (WordPress), WooCommerce REST API |
| **Payments** | PayFast gateway |
| **Analytics** | Google Analytics (implied) |
| **Hosting** | Traditional server (South Africa) |

### JS Bundle Architecture
```
dist/main.js (single bundle)
├── App (entry point)
│   ├── Header
│   ├── Nav
│   ├── Intro (Preloader)
│   └── Barba.js router
├── Pages (per-page classes)
│   ├── Home
│   ├── About
│   ├── FoodService
│   ├── FoodProcessing
│   ├── Agriculture
│   ├── CustomSolutions
│   ├── Shop
│   ├── Product (single)
│   ├── Contact
│   ├── Blog
│   ├── Post (single)
│   ├── Programmes
│   ├── Waitlist
│   ├── Cart
│   ├── FAQ
│   ├── Legal (Privacy, Terms)
│   └── Account
└── Utilities
    ├── Lenis instance
    ├── LazyLoad
    └── ScrollTrigger manager
```

### Key Architecture Decisions
1. **Single JS bundle** — semua page classes di-bundle dalam satu file (tidak code-split per route)
2. **Class-based page system** — setiap halaman punya class JS sendiri yang di-init oleh Barba.js `onEnter`
3. **GSAP timelines** — setiap komponen membuat GSAP timeline-nya sendiri, biasanya dengan ScrollTrigger
4. **No React/Vue** — vanilla JS murni dengan class syntax, manipulasi DOM langsung
5. **WordPress as CMS** — konten dikelola via WordPress admin, template PHP untuk markup

---

## 2. Sitemap & Hierarki Halaman

```
yucca.co.za/
├── / (Homepage)
├── /about
├── /food-service
├── /food-processing
├── /agriculture
├── /custom-solutions
├── /shop (WooCommerce catalog)
│   └── /product/[slug] (individual products)
├── /programmes (Yucca Rewards + Yucca Direct)
├── /waitlist
├── /blog
│   └── /[post-slug] (individual articles)
├── /faq
├── /contact
├── /cart
├── /checkout
├── /my-account
├── /privacy-policy
└── /terms-conditions
```

### Navigation Hierarchy (dari mega-menu):
```
Shop ─────────────────┐
  ├─ Promotions       │
  ├─ Coffee           │
  ├─ Smoothies        │
  ├─ Deli             │  + "Looking for something specific?"
  ├─ Takeout          │    CTA → Custom Solutions
  ├─ Cutlery          │
  ├─ Bags             │  + "Join loyalty programme 5% back"
  └─ Extras           │    CTA → Programmes
                      │
Packaging Solutions ──┤  + "Promotions return soon"
  ├─ Food Service     │    notice card
  ├─ Food Processing  │
  ├─ Agriculture      │  + "Looking for something specific?"
  └─ Custom Solutions*│    CTA → Custom Solutions
                      │
Resources ────────────┤
  ├─ Waitlist         │
  ├─ Yucca Rewards    │  + Resource image panel
  │   & Direct        │    (hover-swap images)
  ├─ Case Studies     │
  │   & Blogs         │
  └─ FAQs             │
```

---

## 3. Design System

### 3.1 Color Palette (Observed from live site)
| Token | Value | Usage |
|-------|-------|-------|
| **Primary Green** | ~`#1a3a2a` (deep forest green) | Headlines, primary text, accents |
| **Accent Gold** | ~`#c4a146` or warm brass | Buttons, highlights, hover states |
| **Background Light** | `#f5f2ed` (warm off-white/cream) | Page background, section fills |
| **Background Dark** | `#1a1a1a` → `#0d0d0d` (near black) | Footer, dark sections, preloader |
| **White** | `#ffffff` | Text on dark, cards |
| **Text Body** | `#3a3a3a` (warm gray) | Paragraphs, descriptions |
| **Border** | `rgba(0,0,0,0.08)` | Subtle dividers |
| **Sustainability Green** | Accent green for eco badges | Certification/sustainability areas |

### 3.2 Typography
| Role | Specs (Observed) |
|------|-------------------|
| **Display/H1** | Sans-serif (likely Inter/custom), ~60-80px desktop, bold/700, tight tracking (-0.02em) |
| **H2 Sections** | ~36-48px, medium/600, tight leading |
| **H3 Cards** | ~24-28px, medium/500 |
| **Body** | ~16-18px, regular/400, 1.6-1.7 line-height |
| **Caption/Label** | ~12-14px, uppercase, letter-spacing 0.05-0.1em, medium/500 |
| **Nav Links** | ~14-16px, medium, uppercase tracking |

### 3.3 Spacing & Layout
| Pattern | Value |
|---------|-------|
| **Max-width container** | ~1200-1400px |
| **Section padding-y** | ~120-160px desktop |
| **Grid system** | CSS Grid + Flexbox |
| **Border-radius** | Minimal (0-8px), mostly sharp edges |
| **Card treatment** | Subtle border, no heavy shadows |
| **Image aspect ratio** | 16:9 (hero/banner), 1:1 (products), 4:3 (cards) |

### 3.4 Visual Signature
- **Clean & minimal** — lots of whitespace, restrained palette
- **Dark/light contrast** — alternating dark and light sections for rhythm
- **Industrial-premium** — matte textures, deep green/black with gold accents
- **Oversized typography** — display headings feel editorial/magazine
- **Full-bleed imagery** — hero images stretch edge-to-edge
- **ClipPath reveals** — signature animation pattern throughout

---

## 4. Navigation System (Mega-Menu)

### 4.1 Header Structure
```
<header>
  ├─ .notice-bar (top announcement strip, dismissible)
  ├─ .header-inner
  │   ├─ Logo (SVG icon + "YUCCA" + "PACKAGING" text parts)
  │   ├─ <nav> Desktop navigation
  │   │   ├─ Shop (dropdown)
  │   │   ├─ Packaging Solutions (dropdown)
  │   │   ├─ Resources (dropdown)
  │   │   ├─ About (link)
  │   │   └─ Contact (link)
  │   └─ Actions
  │       ├─ Search icon
  │       ├─ Cart icon (with count badge)
  │       └─ Account icon
  └─ Mobile hamburger trigger
```

### 4.2 Desktop Mega-Menu (dari dist/main.js)

**Nav class** mengelola per-submenu GSAP timelines:

```javascript
// Simplified from dist/main.js analysis
class Nav {
  createCardTl(card) {
    const tl = gsap.timeline({ paused: true });
    // Background: clipPath reveal
    tl.fromTo(card.bg, 
      { clipPath: "inset(0% 0% 100% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power3.inOut" }
    );
    // Media: scale reveal
    tl.fromTo(card.media,
      { scale: 1.4 },
      { scale: 1, duration: 0.8, ease: "power2.out" },
      "<0.1"
    );
    // Text lines: stagger slide up  
    tl.fromTo(card.textLines,
      { yPercent: 100 },
      { yPercent: 0, stagger: 0.04, duration: 0.5, ease: "power2.out" },
      "<0.2"
    );
    // Border: scaleX grow
    tl.fromTo(card.border,
      { scaleX: 0, transformOrigin: "left" },
      { scaleX: 1, duration: 0.5, ease: "power2.out" },
      "<0.1"
    );
    // Link: slide up
    tl.fromTo(card.link,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.4, ease: "power2.out" },
      "<0.1"
    );
    return tl;
  }
}
```

**Setiap submenu (Shop, Packaging Solutions, Resources)** memiliki:
1. **Panel wrapper** dengan clipPath reveal dari atas ke bawah
2. **Card items** dengan `createCardTl()` — bg clipPath + media scale + text stagger
3. **Hover timers** (100-150ms debounce) untuk mencegah flickering
4. **Mouse tracking** — panel tetap terbuka selama mouse ada di area navigation

### 4.3 Resources Panel Special Behavior
```javascript
// Hover pada menu items → swap gambar di panel kanan
menuItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    images.forEach(img => img.classList.remove('active'));
    const targetImage = images[item.dataset.index];
    targetImage.classList.add('active');
  });
});
```

### 4.4 Header Scroll Behavior (dari dist/main.js)
```javascript
class Header {
  // Class-based state management:
  // - "scrolled"       → sudah scroll melewati threshold
  // - "scrolled-up"    → scroll ke atas → TAMPILKAN header
  // - "scrolled-down"  → scroll ke bawah → SEMBUNYIKAN header
  // - "header-active"  → menu terbuka
  // - "header-hovered" → hover pada header dengan 100ms timer
  
  onScroll() {
    if (scrollY > threshold) {
      header.classList.add('scrolled');
      if (direction === 'down') {
        header.classList.add('scrolled-down');
        header.classList.remove('scrolled-up');
      } else {
        header.classList.add('scrolled-up');
        header.classList.remove('scrolled-down');
      }
    }
  }
}
```

### 4.5 Mobile Menu
- **Breakpoint**: ≤1100px
- **Hamburger** → full-screen overlay dengan slide-in panel
- **Accordion submenus** — GSAP height animation untuk sub-item groups
- **Cart count** badge tetap visible

---

## 5. Preloader & Brand Reveal

### 5.1 Asset Structure
```
/wp-content/themes/yucca/src/assets/images/loader/
├── 1.webp   (frame 1)
├── 2.webp   (frame 2)
├── 3.webp   (frame 3)
├── 4.webp   (frame 4)
└── 5.webp   (frame 5)
```

### 5.2 Animation Sequence (dari dist/main.js)
```
Timeline:
┌─────────────────────────────────────────────────┐
│ Phase 1: Logo Entrance                           │
│ ├─ Logo icon:  scale 0 → 1  (power2.inOut)      │
│ ├─ "yucca":   y: 80 → 0    (power2.out)         │
│ └─ "packaging": y: 80 → 0   (power2.out, +0.1s) │
│                                                   │
│ Phase 2: Logo Packs                               │
│ ├─ Logo icon:  y → -100     (power2.inOut)       │
│ ├─ "yucca":   y → -120     (power2.inOut)       │
│ └─ "packaging": y → -120    (power2.inOut)       │
│                                                   │
│ Phase 3: Image Sequence                           │
│ ├─ Frame 1 visible (0.2s)                         │
│ ├─ Frame 2 visible (0.2s)                         │
│ ├─ Frame 3 visible (0.2s)                         │
│ ├─ Frame 4 visible (0.2s)                         │
│ └─ Frame 5 visible (0.2s)                         │
│   → opacity flip: current=1, previous=0           │
│                                                   │
│ Phase 4: Exit                                     │
│ ├─ Background: autoAlpha → 0                     │
│ └─ Loader container: display none                 │
│                                                   │
│ ► Total: ~2.5-3 seconds                          │
└─────────────────────────────────────────────────┘
```

### 5.3 Key Implementation Details
```javascript
// Logo parts animation
gsap.set(logoIcon, { scale: 0 });
gsap.set([textYucca, textPackaging], { y: 80 });

tl.to(logoIcon, { scale: 1, duration: 1.2, ease: "power2.inOut" })
  .to(textYucca, { y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
  .to(textPackaging, { y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
  // Pack up
  .to(logoIcon, { y: -100, duration: 0.6, ease: "power2.inOut" })
  .to([textYucca, textPackaging], { y: -120, duration: 0.6, ease: "power2.inOut" }, "<")
  // Image sequence
  .call(() => playImageSequence())
  // Exit
  .to(loaderBg, { autoAlpha: 0, duration: 0.8, ease: "power2.inOut" });
```

---

## 6. Page Transitions (Barba.js)

### 6.1 Configuration
```javascript
barba.init({
  sync: true,  // old + new page overlap during transition
  transitions: [{
    leave(data) {
      // Fade IN overlay
      return gsap.to(pageLoader, { autoAlpha: 1, duration: 0.5 });
    },
    enter(data) {
      // Fade OUT overlay
      return gsap.to(pageLoader, { autoAlpha: 0, duration: 0.5 });
    },
    afterEnter(data) {
      // Init new page class
      // Reset scroll to top
      // Reinit LazyLoad
      // Refresh ScrollTrigger
    }
  }]
});
```

### 6.2 Transition Flow
```
User clicks link
  → Barba intercepts
  → pageLoader overlay fades in (autoAlpha 0→1, 0.5s)
  → Old page DOM replaced with new page
  → Scroll reset to 0
  → New page class initialized
  → ScrollTrigger refreshed
  → LazyLoad reinitialized
  → pageLoader overlay fades out (autoAlpha 1→0, 0.5s)
  → Page-specific animations begin
```

### 6.3 Hal Penting
- **`sync: true`** berarti halaman lama dan baru hidup bersamaan saat transisi
- **`autoAlpha`** digunakan (bukan `opacity`) — set `visibility: hidden` saat alpha = 0 untuk performance
- Setiap page class punya method `init()` dan `destroy()` untuk lifecycle management
- ScrollTrigger di-`kill()` saat leave, di-`create()` ulang saat enter

---

## 7. Smooth Scroll (Lenis)

### 7.1 Configuration
```javascript
const lenis = new Lenis({
  easing: (e) => 1 - Math.pow(1 - e, 5),  // quintic ease-out
  // gestureOrientation: 'vertical'
  // smoothWheel: true
  // touchMultiplier: 2
});

// Prevent Lenis on embedded elements (video, iframe, etc.)
lenis.on('scroll', ScrollTrigger.update);

// Stop/restart pada modal/menu open
// lenis.stop() / lenis.start()
```

### 7.2 Integration Points
- **GSAP ScrollTrigger** — Lenis scroll events di-proxy ke ScrollTrigger
- **Barba.js** — Lenis di-stop sebelum transition, restart setelah
- **Modal/Overlay** — `lenis.stop()` saat mega-menu atau mobile menu terbuka
- **Embedded content** — prevent smooth scroll pada elemen yang butuh native scroll

---

## 8. GSAP Animation Engine

### 8.1 Registered Plugins
```javascript
gsap.registerPlugin(ScrollTrigger, SplitText, Observer);
```

### 8.2 Core Easings Used
| Easing | Code | Usage |
|--------|------|-------|
| **Power 2 InOut** | `"power2.inOut"` | Preloader, entrance animations |
| **Power 2 Out** | `"power2.out"` | Text reveals, card animations |
| **Power 3 InOut** | `"power3.inOut"` | ClipPath reveals, premium movements |
| **Power 3 Out** | `"power3.out"` | Hero entrances |
| **Quintic ease-out** | Custom `1-Math.pow(1-e,5)` | Lenis smooth scroll |

### 8.3 Signature Animation Patterns

#### Pattern 1: ClipPath Inset Reveal
```javascript
// Used: Navigation cards, section reveals, image masks
gsap.fromTo(element,
  { clipPath: "inset(0% 0% 100% 0%)" },    // hidden (bottom clipped)
  { clipPath: "inset(0% 0% 0% 0%)",         // fully visible
    duration: 0.6-0.8,
    ease: "power3.inOut"
  }
);

// Variants used:
// "inset(0% 0% 100% 0%)"  → reveal from top (bottom clips up)
// "inset(100% 0% 0% 0%)"  → reveal from bottom (top clips down)
// "inset(0% 100% 0% 0%)"  → reveal from left (right clips left)
// "inset(0% 0% 0% 100%)"  → reveal from right (left clips right)
```

#### Pattern 2: SplitText Line/Char Stagger
```javascript
// Used: Headlines, section titles
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

#### Pattern 3: Scale + Reveal Image
```javascript
// Used: Card images, hero backgrounds, gallery items
gsap.fromTo(image,
  { scale: 1.4 },
  { scale: 1,
    duration: 0.8-1.2,
    ease: "power2.out"
  }
);
// Seringkali dikombinasi dengan parent clipPath reveal
```

#### Pattern 4: Border ScaleX Grow
```javascript
// Used: Card dividers, section separators
gsap.fromTo(border,
  { scaleX: 0, transformOrigin: "left" },
  { scaleX: 1,
    duration: 0.5,
    ease: "power2.out"
  }
);
```

#### Pattern 5: yPercent Slide Up
```javascript
// Used: Text lines, CTA buttons, labels
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
// Used: Background images, section decorations
gsap.to(parallaxElement, {
  y: "-20%",
  ease: "none",
  scrollTrigger: {
    trigger: section,
    start: "top bottom",
    end: "bottom top",
    scrub: true        // Links to scroll position
  }
});
```

### 8.4 Animation Orchestration Pattern
```
Setiap section mengikuti pola yang sama:
1. ScrollTrigger detects section entering viewport
2. Timeline starts:
   a. Container/wrapper clipPath reveal or fade
   b. Heading SplitText stagger (lines/chars)
   c. Body text fade up (yPercent)
   d. Image scale+clipPath reveal
   e. CTA slide up
   f. Decorative elements (borders, icons) grow/fade
3. Stagger offset ~0.1-0.2s between phases
```

---

## 9. Homepage Deep-Dive

### 9.1 Section Map
```
Homepage Sections (scroll order):
┌─────────────────────────────────┐
│ [HEADER] Notice bar + Nav       │
├─────────────────────────────────┤
│ [PRELOADER] Image sequence      │
├─────────────────────────────────┤
│ [HERO] "Packaging that          │
│  Performs. Innovated for        │
│  Industry Leaders."             │
│  + 3 pillar CTAs                │
├─────────────────────────────────┤
│ [MARQUEE 1] Industry keywords   │
│  (dual direction)               │
├─────────────────────────────────┤
│ [MISSION/VISION] "Designing     │
│  the Future of Packaging"       │
│  + stats/description            │
├─────────────────────────────────┤
│ [MARQUEE 2] Capabilities        │
├─────────────────────────────────┤
│ [NEW PRODUCTS] "New Products"   │
│  carousel with 4 featured items │
├─────────────────────────────────┤
│ [CUSTOM CTA] "Brands that       │
│  thrive invest in custom..."    │
│  + rotating image carousel      │
│  + dual CTAs (Enquire/Find out) │
├─────────────────────────────────┤
│ [MARQUEE 3] More keywords       │
├─────────────────────────────────┤
│ [STANDARDS] "Factory & Product  │
│  Standards" — 14 certification  │
│  badges in horizontal scroll    │
├─────────────────────────────────┤
│ [FAQ] Accordion (5 items)       │
│  + "View all" link to /faq      │
├─────────────────────────────────┤
│ [FOOTER] Mega footer            │
└─────────────────────────────────┘
```

### 9.2 Hero Section Detail
**Headline**: "Packaging that Performs. Innovated for Industry Leaders."

**3 Industry Pillars** (CTA cards):
1. **Food Service** → `/food-service`
   - "Simplifying Large-scale Supply"
2. **Food Processing** → `/food-processing`
   - "Engineered to preserve."
3. **Agriculture** → `/agriculture`
   - "Your harvest is handled with care."

**4 Marquee Strips** yang berjalan bersamaan:
- Strip 1 (forward): "Agile · Fresh Produce · Growers · Ready Meal · Retailers..."
- Strip 2 (reverse): "Food Process Industries · Event Caterers · Restaurants..."
- Strip 3 (forward): "Takeout · Delis and Bakeries..."
- Strip 4 (reverse): variations

**Visual**: Background image (packaging product hero shot), gradient overlay

### 9.3 Mission/Vision Section
**Headline**: "Designing the Future of Packaging"

Content blocks:
- **Mission**: "Yucca Packaging provides world-class packaging solutions through innovative sourcing, custom design, and reliable regional supply — all backed by deep knowledge of local markets and global standards."
- **Vision**: "To set new benchmarks in South Africa's packaging industry, delivering custom solutions and dependable supply to become the preferred partner for businesses seeking quality, innovation, and value."

### 9.4 New Products Section
**4 featured products** ditampilkan dalam carousel/grid:
- "Food Service Range" products
- Each card: image + title + CTA
- Carousel navigation dots/arrows

### 9.5 Custom Packaging CTA Section
**Headline**: "Brands that thrive invest in custom-designed packaging. Let us help bring your vision to life."

**Dual CTA**:
- "Enquire now" (primary)
- "Not sure what's possible? Get in touch to find out." (secondary, rotating marquee)

**Visual**: Rotating image carousel showing custom packaging examples (4 images cycling)

### 9.6 Factory & Product Standards
**14 certifications** displayed horizontally:
1. FDA
2. EU 10/2011
3. BRCGS
4. FSC
5. GRS
6. BPI
7. DIN CERTCO
8. TÜV OK Compost Home
9. TÜV OK Compost Industrial
10. ISO 9001
11. ISO 14001
12. ISO 22000
13. ISO 45001
14. FSSC 22000

### 9.7 FAQ Section
5 accordion items dengan expand/collapse animation:
1. What types of packaging do you offer?
2. Do you deliver nationwide?
3. Do you deliver globally?
4. How do I place an order?
5. Do you offer sustainable packaging options?

+ "View all" link → `/faq`

---

## 10. About Page

### 10.1 Section Map
```
/about Sections:
┌─────────────────────────────────┐
│ [HERO] "About Yucca"            │
│  + company intro paragraph      │
├─────────────────────────────────┤
│ [TIMELINE] Company History      │
│  2002 → 2025 (5 milestones)    │
├─────────────────────────────────┤
│ [MISSION/VISION]                │
│  "Committed to Excellence"      │
├─────────────────────────────────┤
│ [TEAM] 5 team members           │
│  with photo + name + title      │
├─────────────────────────────────┤
│ [VALUES] 10 company values      │
│  carousel/grid                  │
├─────────────────────────────────┤
│ [OFFICE] Gallery (8 images)     │
│  workspace/office photos        │
├─────────────────────────────────┤
│ [SUSTAINABILITY] Stats          │
│  28% emissions decrease         │
├─────────────────────────────────┤
│ [FOOTER]                        │
└─────────────────────────────────┘
```

### 10.2 Company Timeline
| Year | Milestone |
|------|-----------|
| **2002** | Founded (original company start) |
| **~2010** | Growth phase |
| **~2018** | Expansion |
| **~2022** | Rebranding / modern era |
| **2025** | Current state — leading packaging supplier |

### 10.3 Leadership Team
| Name | Role |
|------|------|
| **Dirk Theart** | Managing Director |
| **Reynardt Bester** | General Manager |
| **Byron Clarke** | Operations |
| **Keith Hesketh** | Marketing |
| **Donovan Theart** | Business Development |

### 10.4 Company Values (10)
Ditampilkan sebagai carousel atau grid items, masing-masing dengan icon dan deskripsi.

### 10.5 Sustainability Stats
- **28%** decrease in Scope 3 emissions
- Commitment to recyclable, biodegradable, and compostable materials
- FSC-certified paper options
- Post-consumer recycled rPET

---

## 11. Industry Pillar Pages

### 11.1 Shared Page Template
Semua 3 halaman industri (**Food Service**, **Food Processing**, **Agriculture**) mengikuti template yang **identik**:

```
┌─────────────────────────────────┐
│ [HERO] Title + subtitle         │
│  + product image (right)        │
│  + marquee CTA strip            │
│  + background moody photo       │
├─────────────────────────────────┤
│ [MARQUEE] Industry keywords     │
│  (4 strips, dual direction)     │
├─────────────────────────────────┤
│ [VALUE PROP] "Simplifying..."   │
│  + partner intro (Multisteps)   │
│  + image gallery (5 photos)     │
│  + dual CTAs                    │
├─────────────────────────────────┤
│ [WHY CHOOSE] 4-6 feature cards  │
│  with icon + title + description│
├─────────────────────────────────┤
│ [PROCESS] "Our 5 Step Process"  │
│  → link to Custom Solutions     │
├─────────────────────────────────┤
│ [PRODUCT CAROUSEL] (optional)   │
│  featured products              │
├─────────────────────────────────┤
│ [INNOVATE CTA] Image carousel   │
│  + "Get in touch"               │
├─────────────────────────────────┤
│ [STANDARDS] 14 certifications   │
├─────────────────────────────────┤
│ [FAQ] 3-7 questions accordion   │
├─────────────────────────────────┤
│ [FOOTER]                        │
└─────────────────────────────────┘
```

### 11.2 Food Service
**Tagline**: "Simplifying Large-scale Supply"
**Target**: Hotels, restaurants, event caterers, takeout, delis, bakeries

**Why Choose Cards**:
1. Stock Packaging — ready-to-order ranges
2. Custom Packaging — bespoke solutions
3. Sustainable Options — eco materials
4. Reliable Supply — nationwide delivery

**Marquee keywords**: Hotels · Restaurants · Event Caterers · Takeout · Delis · Bakeries

### 11.3 Food Processing
**Tagline**: "Engineered to preserve."
**Focus**: Extend shelf life, minimise leaks, prevent wastage
**Target**: Ready meals, fresh cuts, frozen food, meal kits, high-speed lines

**Why Choose Cards**:
1. Modified Atmosphere Packaging (MAP) — PET MAP trays with PE sealing layer
2. Vacuum Seal Packaging (VSP) — airtight fit
3. Purge-Lock Open Cell Trays — moisture absorption, replace polystyrene foam
4. CPET Ready-Meal Trays — freezer to oven
5. Ready to Customise
6. Sustainable Options

### 11.4 Agriculture
**Tagline**: "Your harvest is handled with care."
**Focus**: Fresh produce, export packaging
**Partner**: Multisteps (official Africa partner)

**Why Choose Cards**:
1. Denesting — speed up production lines
2. Side Ventilation — regulate temperature, limit condensation
3. Automated Pad Inserts — extend shelf life
4. Custom Labels — brand storytelling
5. Precision Printing and Traceability
6. Sustainable Options

**Unique Element**: "Think Global Market Growth" section — partnership with Multisteps

### 11.5 Consistent CTA Pattern
Setiap pillar page memiliki **marquee CTA** yang berputar:
- "Have a question? Chat with a packaging specialist." (Food Service)
- "Interested? Contact us." (Food Processing)
- "Have a question? Chat with a packaging specialist." (Agriculture)

→ Semua mengarah ke `/contact`

---

## 12. Custom Solutions Page

### 12.1 Structure
```
/custom-solutions Sections:
┌─────────────────────────────────┐
│ [HERO] "Let your brand          │
│  personality shine."            │
│  + Tabs: Custom Packaging |     │
│          Branding               │
├─────────────────────────────────┤
│ [MARQUEE] target industries     │
├─────────────────────────────────┤
│ [CUSTOM PACKAGING PROCESS]      │
│  5-step process:                │
│  1. Brainstorm and briefing     │
│  2. Project planning & quotation│
│  3. Design and approval         │
│  4. Design and approval (repeat)│
│  5. Order confirmation          │
├─────────────────────────────────┤
│ [BRANDING PROCESS]              │
│  4-step numbered process:       │
│  01. Send Us Your Artwork       │
│  02. Virtual Fitting            │
│  03. Review and Approve         │
│  04. Confirm Order and Enjoy    │
├─────────────────────────────────┤
│ [GET INSPIRED] Gallery          │
│  + "Enquire Now" CTA            │
├─────────────────────────────────┤
│ [STANDARDS] 14 certifications   │
├─────────────────────────────────┤
│ [FAQ] 7 questions               │
├─────────────────────────────────┤
│ [FOOTER]                        │
└─────────────────────────────────┘
```

### 12.2 UX Pattern: Tab Navigation
- **2 tabs** di hero: "Custom Packaging" dan "Branding"
- Anchor link navigation (`#custom-packaging`, `#branding`)
- Smooth scroll ke section yang sesuai

### 12.3 Numbered Process Steps
Branding section menggunakan **numbered step cards** (01-04):
- Large number display (01, 02, 03, 04)
- Title + description text
- Visual consistency — same card treatment across all steps

---

## 13. Shop / E-commerce

### 13.1 WooCommerce Integration
```
/shop Features:
┌─────────────────────────────────┐
│ [HEADER] Shop title             │
├─────────────────────────────────┤
│ [FILTERS]                       │
│  ├─ Category (14):              │
│  │  Promotions, Coffee,         │
│  │  Smoothies, Deli, Takeout,   │
│  │  Cutlery, Bags, Extras,      │
│  │  Platters, Sushi, Bowls,     │
│  │  Containers, Cake, Straws    │
│  ├─ Material (9):               │
│  │  Bagasse, Bamboo, CPET,      │
│  │  Kraft, Paper, Plastic, PP,  │
│  │  PET, Wooden                 │
│  └─ Sort: Featured, Price ↑↓,   │
│         Newest, Rating          │
├─────────────────────────────────┤
│ [PRODUCT GRID]                  │
│  Cards: Image + Title + Price   │
│  "From R XX.XX" incl. VAT      │
├─────────────────────────────────┤
│ [PAGINATION]                    │
│  Numbered pages                 │
├─────────────────────────────────┤
│ [FOOTER]                        │
└─────────────────────────────────┘
```

### 13.2 Product Card Pattern
- Product image (1:1 ratio, white background)
- Product title
- Price: "From R XX.XX" (incl. VAT)
- Hover state: subtle transform
- Click → individual product page

### 13.3 E-commerce Flow
```
Browse Shop → Filter/Search → Select Product → View Details → Add to Cart
→ View Cart → Checkout (PayFast) → Order Confirmation → My Account tracking
```

**Loyalty Integration**: "Join our loyalty programme to earn 5% back" (banner in nav + shop page)

---

## 14. Programmes (Rewards & Direct)

### 14.1 Dual Programme Model
```
/programmes:
┌─────────────────────────────────────────┐
│ [HERO] "Partner Perks"                   │
│  Gold coins image + dual programme cards │
├──────────────────┬──────────────────────┤
│ YUCCA REWARDS    │ YUCCA DIRECT         │
│ (B2C/small biz)  │ (B2B/enterprise)     │
│                  │                      │
│ • 5% cashback    │ • Volume pricing     │
│ • Online store   │ • Dedicated consultant│
│ • Auto wallet    │ • Custom storefront  │
│ • Interactive    │ • One rate all       │
│   slider showing │   locations          │
│   estimated      │ • Personalised       │
│   rewards        │   catalogue          │
├──────────────────┴──────────────────────┤
│ [FAQ] Rewards (5Q) + Direct (6Q)        │
├─────────────────────────────────────────┤
│ [CTA] "Download Credit Application"     │
├─────────────────────────────────────────┤
│ [FOOTER]                                │
└─────────────────────────────────────────┘
```

### 14.2 Rewards Calculator
**Interactive slider**: "How much do you typically spend on packaging each month?"
- Default: R25,000
- Shows estimated cashback amount
- CTA: "Get rewards" → `/my-account/?register`

### 14.3 Yucca Direct Features
1. **Place orders quickly** — personalised storefront
2. **Dedicated Consultant** — direct point of call
3. **Exclusive Volume-based Pricing** — custom price lists
4. **One rate for all locations** — consistent pricing across branches
5. **Personalised Catalogue** — tailored product display

---

## 15. Contact Page

### 15.1 Structure
```
/contact:
┌─────────────────────────────────┐
│ [HERO] "Let's Chat"             │
│  "We're here to help"           │
├─────────────────────────────────┤
│ [FORM]                          │
│  ├─ Industry Type (dropdown)    │
│  │  Food Service / Food         │
│  │  Processing / Agriculture    │
│  ├─ First Name*                 │
│  ├─ Last Name*                  │
│  ├─ Email*                      │
│  ├─ Contact Number              │
│  ├─ Needs (checkboxes)          │
│  │  □ Customisation             │
│  │  □ Branding                  │
│  │  □ Other                     │
│  ├─ File attachment             │
│  ├─ Message textarea            │
│  └─ Submit enquiry button       │
├─────────────────────────────────┤
│ [MAP] Google Maps embed         │
│  Unit 1, Reserve 5, Capricorn   │
│  Way, Brackenfell, 7560, SA     │
├─────────────────────────────────┤
│ [DETAILS]                       │
│  ├─ Address: Brackenfell, SA    │
│  ├─ Phone: +27 21 949 2296     │
│  └─ Hours: Mon-Thu 8-4:30,     │
│       Fri 8-4, Weekend Closed   │
├─────────────────────────────────┤
│ [FAQ] 5 general questions       │
├─────────────────────────────────┤
│ [CTA BANNER]                    │
├─────────────────────────────────┤
│ [FOOTER]                        │
└─────────────────────────────────┘
```

### 15.2 Form Design Details
- **Industry-specific dropdown** — routes enquiry to correct team
- **Needs checkboxes** — multi-select (Customisation, Branding, Other)
- **File attachment** — allows artwork/briefs
- **Logo icon** beside submit button — brand reinforcement
- Validated fields marked with asterisk (*)

### 15.3 Contact Details
- **Address**: Unit 1, Reserve 5, Capricorn Way, Brackenfell, 7560, South Africa
- **Phone**: +27 21 949 2296
- **Operating Hours**: Mon–Thu 8:00–16:30, Fri 8:00–16:00, Weekends closed
- **WhatsApp**: +27 83 796 0416 (floating FAB button site-wide)

---

## 16. Blog / Case Studies

### 16.1 Structure
```
/blog:
┌─────────────────────────────────┐
│ [HERO/FEATURED] Latest article  │
│  with large image + excerpt     │
├─────────────────────────────────┤
│ [FILTERS]                       │
│  All | Agriculture | Blog |     │
│  Sustainability                 │
├─────────────────────────────────┤
│ [ARTICLE GRID]                  │
│  Cards: Image + Category badge  │
│  + Date + Title + Excerpt       │
├─────────────────────────────────┤
│ [CTA BANNER]                    │
├─────────────────────────────────┤
│ [FOOTER]                        │
└─────────────────────────────────┘
```

### 16.2 Content Types
| Category | Example Article |
|----------|----------------|
| **Agriculture** | "How Agricultural Packaging Drives Quality, Compliance, and Export Growth" |
| **Blog** | General packaging industry insights |
| **Sustainability** | "Navigating Sustainable Packaging In South Africa: Lessons from Europe" |

### 16.3 Article Card Pattern
- Category badge (colored tag)
- Publication date
- Title (linked)
- Excerpt (2-3 lines)
- Full-width card image (top)
- Click → individual post page

---

## 17. FAQ Page

### 17.1 Mega FAQ Structure
FAQ page mengorganisir **semua** FAQ dari seluruh site ke dalam **categories**:

| Category | # Questions |
|----------|-------------|
| **Home (General)** | 5 |
| **Agriculture** | 4 |
| **Food Service** | 5 |
| **Food Processing** | 3 |
| **Custom Solutions** | 7 |
| **Yucca Rewards** | 5 |
| **Yucca Direct** | 6 |
| **Total** | ~35 FAQ items |

### 17.2 Filter/Tab System
- Tabbed navigation di atas: All | Home | Agriculture | Food Service | Food Processing | Custom Solutions | Yucca Rewards | Yucca Direct
- Filter shows/hides relevant category sections
- Accordion expand/collapse per question

---

## 18. Footer & CTA Patterns

### 18.1 Pre-Footer CTA Banner
**Recurring section** muncul di hampir semua halaman:
- "Brands that thrive invest in custom-designed packaging. Let us help bring your vision to life."
- "Enquire now" primary CTA
- Rotating marquee: "Not sure what's possible? Get in touch to find out." (4× repeated, infinite scroll)
- Background image atau gradient

### 18.2 WhatsApp FAB (Floating Action Button)
- **Icon**: WhatsApp logo
- **Link**: `https://wa.me/+27837960416`
- **Position**: Fixed bottom-right corner
- **Present on**: Semua halaman
- **Visual**: Green WhatsApp brand color, slight shadow

### 18.3 Mega Footer Structure
```
Footer:
┌─────────────────────────────────┐
│ "Innovated for Industry Leaders"│
│  + Yucca logo                   │
│  + Certification badge row      │
├─────────────────────────────────┤
│ [PILLARS] 3 columns:            │
│  Food Service | Food Processing │
│  | Agriculture                  │
│  (each with image + link)       │
├─────────────────────────────────┤
│ [BOTTOM BAR]                    │
│  © Yucca 2026                   │
│  Social links: FB | IG | LinkedIn│
│  Contact Us | Privacy | Terms   │
├─────────────────────────────────┤
│ [ADDITIONAL LINKS]              │
│  Credit Application (PDF)       │
│  Shop | Company | Contact       │
└─────────────────────────────────┘
```

### 18.4 Social Media
- Facebook: `/yuccapackaging/`
- Instagram: `/yuccapackaging/`
- LinkedIn: `/company/yucca-packaging-supply/`

---

## 19. Content Strategy

### 19.1 Messaging Hierarchy
```
Level 1 (Brand):   "Innovated for Industry Leaders"
Level 2 (Promise): "Packaging that Performs"
Level 3 (Pillars): Food Service | Food Processing | Agriculture
Level 4 (Proof):   14 certifications, Multisteps partnership, 2002 heritage
Level 5 (Action):  Custom Solutions, Shop, Contact
```

### 19.2 Content Pillars
| Pillar | Focus | Pages |
|--------|-------|-------|
| **Industry Solutions** | B2B packaging for 3 verticals | food-service, food-processing, agriculture |
| **Customisation** | Bespoke packaging + branding | custom-solutions |
| **E-commerce** | Direct online purchasing | shop, programmes |
| **Thought Leadership** | Industry expertise | blog, faq |
| **Trust & Credibility** | Certifications, team, history | about, standards (repeated across pages) |

### 19.3 Recurring Content Patterns
| Pattern | Occurrence | Purpose |
|---------|------------|---------|
| **Marquee CTA strip** | Every pillar page hero | Urgency, contact push |
| **Standards section** | Homepage, all 3 pillars, custom solutions (5 pages) | Trust building |
| **FAQ accordion** | Homepage, all 3 pillars, custom solutions, contact, programmes (7 pages) | SEO + user support |
| **"Enquire now" CTA banner** | Nearly all pages | Lead generation |
| **"View all" link** | FAQ sections → /faq | Deep content discovery |

### 19.4 Key Messaging Themes
1. **World-class quality** — "world-class packaging solutions"
2. **Local + Global** — "deep knowledge of local markets and global standards"
3. **Innovation** — "Innovated for Industry Leaders"
4. **Sustainability** — 28% emissions reduction, recyclable/compostable options
5. **Partnership** — Multisteps Africa partner, "preferred partner"
6. **Custom-first** — every page pushes towards customisation

---

## 20. Responsive & Mobile Strategy

### 20.1 Breakpoint (dari dist/main.js)
```javascript
// Primary mobile breakpoint
const isMobile = window.innerWidth <= 1100;
```

### 20.2 Mobile Adaptations
| Feature | Desktop | Mobile (≤1100px) |
|---------|---------|------------------|
| **Navigation** | Hover-based mega-menu | Full-screen overlay with accordion submenus |
| **Hero** | Side-by-side content + image | Stacked (image → text) |
| **Marquee** | Full-speed infinite scroll | Reduced speed, smaller text |
| **Product grid** | 3-4 columns | 1-2 columns |
| **FAQ accordion** | Wide panels | Full-width |
| **Footer pillars** | 3-column grid | Stacked vertical |
| **WhatsApp FAB** | Fixed bottom-right | Same, adjusted size |
| **Process steps** | Horizontal timeline | Vertical stack |

### 20.3 Touch Considerations
- Lenis dengan `touchMultiplier` untuk smooth native feel
- Swipe gestures pada carousel/gallery
- Tap-to-expand pada FAQ accordion
- No hover-dependent features on mobile

---

## 21. SEO & Performance

### 21.1 SEO Patterns
| Feature | Implementation |
|---------|---------------|
| **Title tags** | Page-specific (e.g., "Food Service - Yucca Packaging") |
| **FAQ Schema** | Accordion FAQs on 7+ pages (rich snippet potential) |
| **Blog content** | Regular articles with categories |
| **URL structure** | Clean slugs (`/food-service`, `/custom-solutions`) |
| **Internal linking** | "View all" links, pillar ↔ custom solutions cross-links |
| **Sitemap** | WordPress auto-generated |

### 21.2 Performance Approach
| Technique | Detail |
|-----------|--------|
| **Lazy loading** | vanilla-lazyload for images |
| **WebP format** | Preloader images are .webp |
| **Image optimization** | WordPress responsive sizes (300, 768, 1024, 1200, 1536) |
| **Single JS bundle** | All JS in dist/main.js (pro: one request; con: no code splitting) |
| **CSS** | Compiled, likely PostCSS/SCSS → single bundle |
| **Barba.js SPA** | Only content area swaps, header/footer persistent (reduces re-renders) |
| **GSAP autoAlpha** | Uses `visibility: hidden` when alpha=0 for paint optimization |

### 21.3 Loading Strategy
```
Initial Load:
├─ HTML (PHP rendered, full content)
├─ CSS (compiled, critical path)
├─ JS (dist/main.js, deferred)
└─ Fonts (likely preloaded)

Subsequent Navigation (Barba.js):
├─ Fetch new page HTML via XHR
├─ Swap content container
├─ Init new page JS class
└─ Lazy load new images
→ No full page reload required
```

---

## 22. Key Takeaways untuk Alfa Beauty

### 22.1 Patterns yang Harus Diadopsi

| # | Pattern Yucca | Relevansi Alfa Beauty | Prioritas |
|---|---------------|----------------------|-----------|
| 1 | **Notification/announcement bar** di atas header | Promo produk baru, event, diskon | **HIGH** |
| 2 | **Industry-specific contact form** (dropdown untuk tipe industri) | Bisa jadi dropdown tipe bisnis (salon, barbershop, distributor) | **HIGH** |
| 3 | **Programmes/loyalty page** dengan calculator interaktif | Bisa jadi partnership tier calculator | **MEDIUM** |
| 4 | **Recurring FAQ sections** di tiap halaman layanan | SEO boost + user support | **HIGH** |
| 5 | **Standards/certification badges** section | Sertifikasi brand (BPOM, Halal, etc.) | **HIGH** |
| 6 | **Pre-footer CTA banner** dengan marquee rotating text | "Konsultasi gratis? Hubungi kami." repeated | **MEDIUM** |
| 7 | **Numbered process steps** (01, 02, 03, 04) | "Cara Order" atau "Cara Jadi Partner" | **MEDIUM** |
| 8 | **Tab navigation** pada halaman (Custom Solutions model) | Products bisa dibagi tab per brand | **LOW** |
| 9 | **Blog with category filters** | Education page sudah ada, bisa diperkaya | **LOW** |
| 10 | **WhatsApp FAB** (floating) yang site-wide | Sudah diimplementasi (product CTA) | ✅ Done |

### 22.2 Animation Patterns untuk Diadaptasi (Framer Motion equivalent)

| Yucca (GSAP) | Alfa Beauty (Framer Motion) Equivalent | Status |
|--------------|----------------------------------------|--------|
| ClipPath inset reveal | `clipPath` in Framer Motion `animate` | ⚠️ Bisa ditambahkan |
| SplitText line stagger | `TextReveal` component (sudah ada) | ✅ Done |
| Scale 1.4→1 image reveal | `kenBurnsIn` variant in motion.ts | ✅ Done |
| Border scaleX grow | `LineGrow` component | ✅ Done |
| yPercent slide up | `slideUp` variant | ✅ Done |
| ScrollTrigger parallax | `useParallax` hook | ✅ Done |
| autoAlpha fade | Framer Motion `whileInView` + opacity | ✅ Done |

### 22.3 Content Strategy Gaps

| Yucca Has | Alfa Beauty Status | Action Needed |
|-----------|-------------------|---------------|
| 35+ FAQ items across 7 categories | ❌ No FAQ page/section | Create FAQ data + section component |
| Blog with 3 categories | ⚠️ Education page exists (articles + events) | Expand with more content |
| Certification badges (14) | ❌ No certification display | Add brand certification section |
| Customer programmes (2 tiers) | ⚠️ Partnership page exists | Could add tier calculator |
| Interactive rewards calculator | ❌ Nothing similar | Consider for partnership page |
| Credit application PDF download | ❌ No downloadable resources | Add catalog/pricelist PDF |
| Google Maps embed on contact | ❌ Contact page has no map | Add map component |

### 22.4 Structural Takeaways

1. **Template consistency** — Yucca uses identical section ordering across industry pillar pages. Alfa Beauty should ensure product category pages follow consistent template.

2. **CTA saturation** — Yucca has multiple CTA touchpoints per page (hero CTA, marquee CTA, inline CTAs, pre-footer CTA, WhatsApp FAB). Minimum 4 CTA opportunities per page.

3. **FAQ everywhere** — Yucca places contextual FAQ on nearly every page, not just a dedicated FAQ page. Each page has 3-7 relevant questions. This is excellent for SEO.

4. **Standards as trust signal** — The 14 certification badges appear on 5+ pages. Repetition builds trust. Alfa Beauty should display relevant certifications prominently and repeatedly.

5. **Dual CTA pattern** — Primary action ("Enquire now") + secondary context ("Not sure what's possible? Get in touch."). Gives hesitant users a softer entry point.

6. **Pre-footer CTA banner** — Recurring section before footer acts as "last chance" conversion point on every page. Uses rotating marquee text for visual interest.

7. **Cross-linking strategy** — Every pillar page links to Custom Solutions, every FAQ section links to full FAQ page, navigation mega-menu includes promotional cards alongside links.

---

> **Catatan**: Analisis ini berdasarkan fetch langsung HTML + analisis dist/main.js bundle dari yucca.co.za pada Juli 2025. CSS styling details diinfer dari rendered output dan JavaScript animation code. Situs ini secara keseluruhan menunjukkan **production quality profesional** dengan perhatian tinggi pada animasi, content architecture, dan conversion optimization.
