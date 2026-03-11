"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { TextReveal } from "@/components/motion/text-reveal";
import { LineGrow } from "@/hooks/use-animations";
import { smoothEase } from "@/lib/motion";

/* ─────────────────────────────────────────────────────────────────────
 * FAQSection — Inline FAQ accordion for every page.
 *
 * GAP-SHARED-01: Yucca displays 3–7 contextual FAQ on every page.
 * Alfa Beauty now mirrors this pattern with an accordion component
 * that accepts optional per-page questions or falls back to defaults.
 * ───────────────────────────────────────────────────────────────────── */

export interface FAQItem {
    question: string;
    answer: string;
}

const DEFAULT_FAQ: FAQItem[] = [
    {
        question: "What brands does Alfa Beauty distribute?",
        answer: "We are the exclusive Indonesian importer and distributor of Alfaparf Milano Professional, Farmavita, Montibello, and Gamma+ Professional — leading Italian and Spanish professional haircare brands trusted by salons worldwide.",
    },
    {
        question: "How can my salon become a partner?",
        answer: "Visit our Partnership page or contact us via WhatsApp. We offer exclusive pricing, priority product access, dedicated support, and professional education programs for salon and barbershop partners across Indonesia.",
    },
    {
        question: "Do you provide product training?",
        answer: "Yes. Through Alfa Beauty Academy, we offer hands-on technical workshops covering colouring, cutting, styling techniques, product knowledge, and salon business development. Training is available for all partner salons.",
    },
    {
        question: "Are all products officially imported?",
        answer: "Every product is 100% officially imported with full BPOM registration. We guarantee authenticity — no grey market, no counterfeit products. All items come with proper documentation and brand-backed warranties.",
    },
    {
        question: "What areas do you cover?",
        answer: "Alfa Beauty serves professional salons and barbershops across all 34 provinces of Indonesia. Our distribution network ensures timely delivery nationwide, supported by regional account managers.",
    },
];

function FAQAccordionItem({ item, index, isOpen, onToggle }: {
    item: FAQItem;
    index: number;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <FadeIn delay={index * 0.08} blur>
            <div className="border-b border-border-warm/60">
                <button
                    onClick={onToggle}
                    className="group flex w-full items-center justify-between gap-4 py-6 text-left transition-colors duration-300"
                    aria-expanded={isOpen}
                >
                    <span className="text-sm font-semibold tracking-tight sm:text-base">
                        {item.question}
                    </span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-border-warm/60 transition-all duration-500 ease-[var(--ease)] group-hover:border-foreground/30 group-hover:bg-muted/30">
                        {isOpen ? (
                            <Minus className="h-3.5 w-3.5" />
                        ) : (
                            <Plus className="h-3.5 w-3.5" />
                        )}
                    </span>
                </button>
                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: smoothEase }}
                            className="overflow-hidden"
                        >
                            <p className="pb-6 text-sm leading-relaxed text-text-muted pr-12">
                                {item.answer}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </FadeIn>
    );
}

interface FAQSectionProps {
    items?: FAQItem[];
    heading?: string;
    eyebrow?: string;
}

export function FAQSection({
    items = DEFAULT_FAQ,
    heading = "Frequently Asked Questions",
    eyebrow = "Have Questions?",
}: FAQSectionProps) {
    const [openIndex, setOpenIndex] = React.useState<number | null>(null);

    return (
        <section className="bg-background py-12 sm:py-16 lg:py-32">
            <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-16">
                    {/* Left — heading */}
                    <div className="lg:col-span-4">
                        <FadeIn blur scale>
                            <p className="eyebrow">{eyebrow}</p>
                        </FadeIn>
                        <div className="mt-3">
                            <TextReveal
                                as="h2"
                                className="heading-section"
                                split="word"
                                blur
                                lines={heading.split(" ").reduce<string[]>((acc, word, i) => {
                                    if (i < 2) {
                                        acc[0] = acc[0] ? `${acc[0]} ${word}` : word;
                                    } else {
                                        acc[1] = acc[1] ? `${acc[1]} ${word}` : word;
                                    }
                                    return acc;
                                }, [])}
                            />
                        </div>
                        <FadeIn delay={0.3} blur>
                            <p className="body-prose mt-4 max-w-sm">
                                Everything you need to know about our products,
                                partnership, and services.
                            </p>
                        </FadeIn>
                    </div>

                    {/* Right — accordion */}
                    <div className="lg:col-span-8">
                        <LineGrow className="h-px bg-border-warm mb-0 lg:hidden" />
                        <div>
                            {items.map((item, index) => (
                                <FAQAccordionItem
                                    key={item.question}
                                    item={item}
                                    index={index}
                                    isOpen={openIndex === index}
                                    onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
