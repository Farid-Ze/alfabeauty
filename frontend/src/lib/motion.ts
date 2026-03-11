/* ─────────────────────────────────────────────────────────────────────
 * Shared Framer Motion variants & constants V4
 *
 * Centralizes ALL animation presets so every component animates
 * consistently. V4 adds: enhanced panel variants with blur+scale,
 * mobile-menu item variant, floating element entrance, section-level
 * reveal orchestrator, refined counter/card variants, numbered index
 * entrance, and scroll progress utilities.
 *
 *   import { smoothEase, cardStagger, imageReveal } from "@/lib/motion";
 * ───────────────────────────────────────────────────────────────────── */

import type { Variants } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────
 * §1  Easing Curves
 * ───────────────────────────────────────────────────────────────────── */

/** Smooth ease — default scroll reveals. Matches CSS `--ease` */
export const smoothEase = [0.22, 1, 0.36, 1] as const;

/** Cinematic ease — hero-level / dramatic reveals */
export const cinematicEase = [0.16, 1, 0.3, 1] as const;

/** Snappy ease — buttons, links, toggles, micro-interactions */
export const snappyEase = [0.25, 0.1, 0.25, 1] as const;

/** Decelerate ease — fast in, soft landing (counters, progress) */
export const decelerateEase = [0.0, 0.0, 0.2, 1] as const;

/** Anticipate ease — slight pull-back before snapping forward */
export const anticipateEase = [0.36, 0, 0.66, -0.56] as const;

/** Exit ease — tighter curve for exit/close animations */
export const exitEase = [0.4, 0, 0.7, 0.2] as const;

/** Elastic settle — slight overshoot for playful elements */
export const elasticSettle = [0.175, 0.885, 0.32, 1.1] as const;

/* ─────────────────────────────────────────────────────────────────────
 * §2  Parallax Constants
 * ───────────────────────────────────────────────────────────────────── */

export const PARALLAX = {
  micro: 0.04,
  subtle: 0.08,
  default: 0.15,
  strong: 0.25,
  hero: 0.35,
} as const;

/* ─────────────────────────────────────────────────────────────────────
 * §3  Orchestration Timing
 * ───────────────────────────────────────────────────────────────────── */

export const PRELOADER_DURATION = 2.6;

export const HERO_TIMING = {
  eyebrow: PRELOADER_DURATION + 0.15,
  heading: PRELOADER_DURATION * 1000 + 300,
  body: PRELOADER_DURATION + 0.85,
  cta: PRELOADER_DURATION + 1.1,
  scroll: PRELOADER_DURATION + 1.6,
} as const;

/* ─────────────────────────────────────────────────────────────────────
 * §4  Page-level stagger — section containers
 * ───────────────────────────────────────────────────────────────────── */

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: smoothEase },
  },
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: cinematicEase },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: smoothEase },
  },
};

/** Fade + blur for premium content reveals */
export const fadeInBlur: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: cinematicEase },
  },
};

/* ─────────────────────────────────────────────────────────────────────
 * §5  Card stagger — grids (carousel, partnership, footer pillars)
 * ───────────────────────────────────────────────────────────────────── */

export const cardStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

export const cardFadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: cinematicEase },
  },
};

export const cardFadeScale: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: cinematicEase },
  },
};

/* ─────────────────────────────────────────────────────────────────────
 * §6  List item stagger — bullet lists inside cards/sections
 * ───────────────────────────────────────────────────────────────────── */

export const listStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.25,
    },
  },
};

export const listItemFadeIn: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: smoothEase },
  },
};

/* ─────────────────────────────────────────────────────────────────────
 * §7  Panel variants — mega-menu / dropdown panels
 *
 * V4: panelFadeScale adds blur+scale for richer menu entrance.
 *     panelItemSlide for individual panel link items.
 * ───────────────────────────────────────────────────────────────────── */

const panelTransition = { duration: 0.45, ease: cinematicEase };

export const panelStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};

export const panelFadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: panelTransition },
};

export const panelFadeScale: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...panelTransition, duration: 0.55 },
  },
};

export const panelFadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: panelTransition },
};

/** Individual link items inside mega-menu panels */
export const panelItemSlide: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: smoothEase },
  },
};

/* ─────────────────────────────────────────────────────────────────────
 * §7b  Mobile menu — blur+slide item variant
 * ───────────────────────────────────────────────────────────────────── */

export const mobileMenuStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

export const mobileMenuItemFade: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: smoothEase },
  },
};

/* ─────────────────────────────────────────────────────────────────────
 * §8  Section-level variants — full-bleed dramatic entrances
 * ───────────────────────────────────────────────────────────────────── */

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: cinematicEase },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: cinematicEase },
  },
};

/* ─────────────────────────────────────────────────────────────────────
 * §9  ClipPath reveals — wipe animations for images & sections
 * ───────────────────────────────────────────────────────────────────── */

export const clipRevealUp: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.4, ease: cinematicEase },
  },
};

export const clipRevealLeft: Variants = {
  hidden: { clipPath: "inset(0% 100% 0% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.4, ease: cinematicEase },
  },
};

export const clipRevealRight: Variants = {
  hidden: { clipPath: "inset(0% 0% 0% 100%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.4, ease: cinematicEase },
  },
};

export const clipRevealDown: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.2, ease: cinematicEase },
  },
};

/* ─────────────────────────────────────────────────────────────────────
 * §10  Image reveal composite — clipPath + scale in one variant
 * ───────────────────────────────────────────────────────────────────── */

export const imageRevealContainer: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.5, ease: cinematicEase },
  },
};

export const imageRevealInner: Variants = {
  hidden: { scale: 1.15 },
  visible: {
    scale: 1,
    transition: { duration: 1.8, ease: smoothEase },
  },
};

/** Horizontal image reveal — wipe right to left */
export const imageRevealHorizontal: Variants = {
  hidden: { clipPath: "inset(0% 0% 0% 100%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.5, ease: cinematicEase },
  },
};

/* ─────────────────────────────────────────────────────────────────────
 * §11  Scale & rotation entrances
 * ───────────────────────────────────────────────────────────────────── */

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: smoothEase },
  },
};

/* ─────────────────────────────────────────────────────────────────────
 * §12  Glassmorphism — blur-in badge/overlay reveals
 * ───────────────────────────────────────────────────────────────────── */

export const glassBadgeReveal: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1, delay: 0.7, ease: smoothEase },
  },
};

/* ─────────────────────────────────────────────────────────────────────
 * §13  Counter section — cascading grid entrance with emphasis
 * ───────────────────────────────────────────────────────────────────── */

export const counterStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

export const counterFadeUp: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: cinematicEase },
  },
};

/* ─────────────────────────────────────────────────────────────────────
 * §14  Divider / line reveal — animated separator
 * ───────────────────────────────────────────────────────────────────── */

export const dividerReveal: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1, ease: cinematicEase },
  },
};

/* ─────────────────────────────────────────────────────────────────────
 * §15  Stagger presets — named timing for different contexts
 * ───────────────────────────────────────────────────────────────────── */

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } },
};

export const staggerMedium: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export const staggerSlow: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.15 } },
};

/* ─────────────────────────────────────────────────────────────────────
 * §16  Floating elements — FAB, tooltips, floating indicators
 * ───────────────────────────────────────────────────────────────────── */

export const floatingFadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: elasticSettle },
  },
};

/* ─────────────────────────────────────────────────────────────────────
 * §17  Numbered index — editorial badge/number entrance
 * ───────────────────────────────────────────────────────────────────── */

export const numberedIndexReveal: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: cinematicEase },
  },
};

/* ─────────────────────────────────────────────────────────────────────
 * §18  Enhanced mega-menu — item-level stagger with depth
 * ───────────────────────────────────────────────────────────────────── */

export const megaMenuStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } },
};

export const megaMenuItemReveal: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: smoothEase },
  },
};

/* ─────────────────────────────────────────────────────────────────────
 * §19  Hero char-level — character stagger for display headlines
 * ───────────────────────────────────────────────────────────────────── */

export const heroCharStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.025, delayChildren: 0.1 } },
};

export const heroCharReveal: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -45, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: cinematicEase },
  },
};

/* ─────────────────────────────────────────────────────────────────────
 * §20  Scroll indicator — pulsing glow with vertical travel
 * ───────────────────────────────────────────────────────────────────── */

export const scrollIndicatorReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: cinematicEase },
  },
};

/* ─────────────────────────────────────────────────────────────────────
 * §21  Counter completion — pulse glow on finish
 * ───────────────────────────────────────────────────────────────────── */

export const counterPulse: Variants = {
  idle: { scale: 1, textShadow: "0 0 0 transparent" },
  pulse: {
    scale: [1, 1.08, 1],
    textShadow: [
      "0 0 0px transparent",
      "0 0 20px rgba(164, 22, 26, 0.3)",
      "0 0 0px transparent",
    ],
    transition: { duration: 0.6, ease: elasticSettle },
  },
};

/* ─────────────────────────────────────────────────────────────────────
 * §22  Image pan — slow Ken Burns effect for ambient movement
 * ───────────────────────────────────────────────────────────────────── */

export const kenBurnsVariant: Variants = {
  initial: { scale: 1.12, x: "0%", y: "0%" },
  animate: {
    scale: [1.12, 1.18, 1.14],
    x: ["0%", "-2%", "1%"],
    y: ["0%", "1%", "-1%"],
    transition: {
      duration: 20,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

/* ─────────────────────────────────────────────────────────────────────
 * §23  Carousel card depth — enhanced drag/swipe feedback
 * ───────────────────────────────────────────────────────────────────── */

export const carouselCardHover = {
  rest: { y: 0, scale: 1, filter: "brightness(1)" },
  hover: {
    y: -8,
    scale: 1.015,
    filter: "brightness(1.02)",
    transition: { duration: 0.5, ease: smoothEase },
  },
} satisfies Record<string, object>;

/* ─────────────────────────────────────────────────────────────────────
 * §24  Glassmorphism depth — enhanced frosted-glass reveals
 * ───────────────────────────────────────────────────────────────────── */

export const glassPanelReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.1, delay: 0.5, ease: cinematicEase },
  },
};

/* ─────────────────────────────────────────────────────────────────────
 * §25  CTA dramatic — button entrance with magnetic hover
 * ───────────────────────────────────────────────────────────────────── */

export const ctaDramaticReveal: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: cinematicEase },
  },
};

/* ─────────────────────────────────────────────────────────────────────
 * §26  Split section reveal — asymmetric left/right wipe
 * ───────────────────────────────────────────────────────────────────── */

export const splitImageReveal: Variants = {
  hidden: { clipPath: "inset(0% 0% 0% 100%)", filter: "brightness(0.7)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    filter: "brightness(1)",
    transition: { duration: 1.6, ease: cinematicEase },
  },
};

export const splitTextCascade: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

export const splitTextItem: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: smoothEase },
  },
};

/* ─────────────────────────────────────────────────────────────────────
 * §27  Mega-menu 5-phase card timeline (Yucca createCardTl pattern)
 *
 * Reproduces Yucca's per-card orchestrated timeline:
 *   Phase 1: Background clipPath reveal
 *   Phase 2: Media image scale 1.4→1
 *   Phase 3: Text lines yPercent stagger
 *   Phase 4: Border scaleX 0→1
 *   Phase 5: Link CTA slide up
 * ───────────────────────────────────────────────────────────────────── */

export const megaMenuCardStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0 } },
};

export const megaMenuCardBgReveal: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: smoothEase },
  },
};

export const megaMenuCardMediaScale: Variants = {
  hidden: { scale: 1.35, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: smoothEase, delay: 0.1 },
  },
};

export const megaMenuCardTextLine: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.5, ease: smoothEase },
  },
};

export const megaMenuCardTextStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } },
};

export const megaMenuCardBorderGrow: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: smoothEase, delay: 0.25 },
  },
};

export const megaMenuCardLinkSlide: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.4, ease: smoothEase, delay: 0.3 },
  },
};

/* ─────────────────────────────────────────────────────────────────────
 * §28  Announcement bar — slide down entrance
 * ───────────────────────────────────────────────────────────────────── */

export const announcementSlide: Variants = {
  hidden: { y: "-100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.5, ease: smoothEase },
  },
  exit: {
    y: "-100%",
    opacity: 0,
    transition: { duration: 0.3, ease: exitEase },
  },
};

/* ─────────────────────────────────────────────────────────────────────
 * §29  Pre-footer CTA — dramatic section entrance
 * ───────────────────────────────────────────────────────────────────── */

export const preFooterReveal: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.2, ease: cinematicEase },
  },
};

/* ─────────────────────────────────────────────────────────────────────
 * §30  Pillar hero cards — stagger with scale depth
 * ───────────────────────────────────────────────────────────────────── */

export const pillarCardStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

export const pillarCardReveal: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: cinematicEase },
  },
};
