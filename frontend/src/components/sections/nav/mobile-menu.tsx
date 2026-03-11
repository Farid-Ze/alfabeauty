"use client";

import * as React from "react";
import Link from "next/link";
import { X, ChevronRight, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { BRANDS, WHATSAPP_URL, PRODUCT_CATEGORIES, PILLARS, NAV_LINKS } from "@/lib/config";
import { mobileMenuStagger, mobileMenuItemFade, smoothEase } from "@/lib/motion";
import { trackEvent } from "@/lib/analytics";

interface MobileMenuProps {
    onClose: () => void;
}

const NAV_SECTIONS = [
    {
        label: "Products",
        href: NAV_LINKS.products,
        children: PRODUCT_CATEGORIES.map((cat) => ({
            label: cat,
            href: `/products?category=${cat.toLowerCase().replace(/\s+&?\s*/g, "-")}`,
        })),
    },
    {
        label: "Brands",
        href: NAV_LINKS.products,
        children: BRANDS.map((b) => ({
            label: `${b.name} ${b.flag}`,
            href: `/products?brand=${b.name.toLowerCase().replace(/\s+/g, "-")}`,
        })),
    },
    {
        label: "Education",
        href: NAV_LINKS.education,
    },
    {
        label: "Partnership",
        href: NAV_LINKS.partnership,
    },
    {
        label: "About",
        href: NAV_LINKS.about,
    },
    {
        label: "Contact",
        href: NAV_LINKS.contact,
    },
];

export function MobileMenu({ onClose }: MobileMenuProps) {
    const [expandedSection, setExpandedSection] = React.useState<string | null>(null);

    const toggleSection = (label: string) => {
        setExpandedSection((prev) => (prev === label ? null : label));
    };

    return (
        <motion.nav
            variants={mobileMenuStagger}
            initial="hidden"
            animate="visible"
            className="flex h-full flex-col"
            aria-label="Mobile navigation"
        >
            {/* Header */}
            <div className="flex h-[var(--header-height)] items-center justify-between border-b border-border-warm/30 px-6">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Menu</span>
                <button
                    onClick={onClose}
                    className="flex h-11 w-11 items-center justify-center text-foreground/60 transition-colors duration-300 hover:text-foreground"
                    aria-label="Close menu"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            {/* Links */}
            <div className="flex-1 overflow-y-auto overscroll-contain py-4">
                {NAV_SECTIONS.map((section) => (
                    <motion.div key={section.label} variants={mobileMenuItemFade}>
                        {section.children ? (
                            <div>
                                <button
                                    onClick={() => toggleSection(section.label)}
                                    className="flex w-full items-center justify-between px-6 py-4 text-left text-[13px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 hover:bg-muted/40"
                                >
                                    {section.label}
                                    <ChevronRight
                                        className={cn(
                                            "h-4 w-4 text-muted-foreground transition-transform duration-300",
                                            expandedSection === section.label && "rotate-90"
                                        )}
                                    />
                                </button>
                                <AnimatePresence>
                                    {expandedSection === section.label && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: smoothEase }}
                                            className="overflow-hidden"
                                        >
                                            <div className="border-l border-border-warm/30 ml-6 pl-4 pb-2">
                                                {section.children.map((child) => (
                                                    <Link
                                                        key={child.label}
                                                        href={child.href}
                                                        onClick={onClose}
                                                        className="block py-3 text-[13px] text-muted-foreground transition-colors duration-300 hover:text-foreground"
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link
                                href={section.href}
                                onClick={onClose}
                                className="flex items-center px-6 py-4 text-[13px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 hover:bg-muted/40"
                            >
                                {section.label}
                            </Link>
                        )}
                        <div className="mx-6 h-px bg-border-warm/20" />
                    </motion.div>
                ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
                variants={mobileMenuItemFade}
                className="border-t border-border-warm/30 p-6"
            >
                <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                        trackEvent("cta_whatsapp_click", { location: "mobile_menu" });
                        onClose();
                    }}
                    className="flex w-full items-center justify-center gap-2.5 bg-foreground py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-foreground/90"
                >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Us
                </a>

                {/* Three pillars */}
                <div className="mt-5 grid grid-cols-3 gap-3">
                    {PILLARS.map((pillar) => (
                        <Link
                            key={pillar.label}
                            href={pillar.href}
                            onClick={onClose}
                            className="py-3.5 text-center text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground/60 transition-colors duration-300 hover:text-foreground"
                        >
                            {pillar.label}
                        </Link>
                    ))}
                </div>
            </motion.div>
        </motion.nav>
    );
}
