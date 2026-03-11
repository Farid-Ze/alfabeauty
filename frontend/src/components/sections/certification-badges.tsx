"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion/fade-in";
import { cardStagger, cardFadeScale } from "@/lib/motion";

/* ─────────────────────────────────────────────────────────────────────
 * CertificationBadges — Trust signal row showing key certifications.
 *
 * GAP-SHARED-02: Yucca shows 14 certification badges (FDA, ISO, FSC, etc.)
 * on homepage and pillar pages. Alfa Beauty mirrors this with relevant
 * certifications from its brand partners (BPOM, Made in Italy, etc.).
 * ───────────────────────────────────────────────────────────────────── */

const CERTIFICATIONS = [
    {
        label: "BPOM Registered",
        description: "All products officially registered",
        icon: "🛡️",
    },
    {
        label: "100% Authentic",
        description: "Direct from brand manufacturers",
        icon: "✓",
    },
    {
        label: "Made in Italy",
        description: "Premium European formulations",
        icon: "🇮🇹",
    },
    {
        label: "Made in Spain",
        description: "Mediterranean hair science",
        icon: "🇪🇸",
    },
    {
        label: "Dermatologist Tested",
        description: "Clinically validated products",
        icon: "🔬",
    },
    {
        label: "Official Distributor",
        description: "Exclusive import & distribution",
        icon: "📋",
    },
];

export function CertificationBadges() {
    return (
        <section className="border-y border-border-warm/40 bg-surface py-16 lg:py-20">
            <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
                <FadeIn blur>
                    <p className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-text-muted/60 mb-10">
                        Trusted Certifications & Guarantees
                    </p>
                </FadeIn>

                <motion.div
                    className="grid grid-cols-2 gap-px bg-border-warm/30 sm:grid-cols-3 lg:grid-cols-6"
                    variants={cardStagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {CERTIFICATIONS.map((cert) => (
                        <motion.div
                            key={cert.label}
                            variants={cardFadeScale}
                            className="group flex flex-col items-center gap-3 bg-surface p-6 text-center transition-all duration-300 hover:shadow-sm"
                        >
                            <span className="text-2xl" aria-hidden="true">{cert.icon}</span>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.1em]">
                                    {cert.label}
                                </p>
                                <p className="mt-1 text-[11px] leading-relaxed text-text-muted/70">
                                    {cert.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
