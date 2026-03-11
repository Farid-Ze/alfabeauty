import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { AboutSection } from "@/components/sections/about";
import { BrandCarousel } from "@/components/sections/brand-carousel";
import { FeatureSplit } from "@/components/sections/feature-split";
import { PartnershipSection } from "@/components/sections/partnership";
import { FAQSection } from "@/components/sections/faq-section";
import { CertificationBadges } from "@/components/sections/certification-badges";
import { PreFooterCTA } from "@/components/sections/pre-footer-cta";

export const metadata: Metadata = {
  title: {
    absolute: "PT Alfa Beauty Cosmetica — Professional Haircare Distribution",
  },
  description:
    "Exclusive importer and distributor of leading Italian and Spanish professional haircare brands, serving Indonesia's salon and barber industry for over 18 years.",
  alternates: { canonical: "/" },
};

export default function HomePage(): React.JSX.Element {
  return (
    <>
      <main id="main-content" className="relative z-10 bg-background">
        {/* Section B: Hero — Cinematic with pillar CTA cards */}
        <HeroSection />

        {/* Section: Marquee — Quad-row scrolling keywords (GAP-MRQ-01) */}
        <section className="border-y border-border-warm/40 bg-surface py-5 lg:py-6">
          <Marquee
            speed={45}
            gap={3}
            rows={2}
            pauseOnHover
            className="text-base sm:text-h4 font-semibold sm:font-bold tracking-tight text-foreground/80"
          >
            <span>Innovation</span>
            <span>Alfaparf Milano</span>
            <span>Education</span>
            <span>Farmavita</span>
            <span>Partnership</span>
            <span>Montibello</span>
            <span>Quality</span>
            <span>Gamma+ Professional</span>
            <span>Distribution</span>
            <span>Excellence</span>
          </Marquee>
        </section>

        {/* Section: About — Company Introduction */}
        <AboutSection />

        {/* Section C: Brand Portfolio — Horizontal Scroll */}
        <BrandCarousel />

        {/* Section D: Feature Split — Education / "More Than a Distributor" */}
        <FeatureSplit />

        {/* Section: Partnership — Why Partner With Us */}
        <PartnershipSection />

        {/* Shared sections — FAQ, Certifications, CTA */}
        <FAQSection />
        <CertificationBadges />
        <PreFooterCTA />
      </main>
    </>
  );
}

