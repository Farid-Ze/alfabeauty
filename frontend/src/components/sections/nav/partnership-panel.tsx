"use client";

import Link from "next/link";
import { ArrowRight, Handshake, Store, GraduationCap } from "lucide-react";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";

const PARTNERSHIP_ITEMS = [
    {
        title: "Salon Partnership",
        description: "Exclusive pricing, priority access to new products, and dedicated support for your salon.",
        href: "/partnership",
        icon: Store,
    },
    {
        title: "Distribution",
        description: "Become an authorized distributor in your region. Nationwide opportunities available.",
        href: "/partnership",
        icon: Handshake,
    },
    {
        title: "Education Partner",
        description: "Collaborate with Alfa Beauty Academy to host workshops and training programs.",
        href: "/partnership",
        icon: GraduationCap,
    },
];

export function PartnershipPanel() {
    return (
        <div className="mx-auto grid max-w-[1400px] grid-cols-[1fr_1fr_1fr_220px] gap-px bg-border-warm/20 px-8 py-10 lg:px-12">
            {PARTNERSHIP_ITEMS.map((item) => (
                <div key={item.title}>
                    <NavigationMenuLink asChild>
                        <Link
                            href={item.href}
                            className="group relative flex min-h-[200px] flex-col justify-between overflow-hidden bg-background p-7"
                        >
                            <div>
                                <div className="flex h-11 w-11 items-center justify-center bg-muted">
                                    <item.icon className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <h4 className="mt-5 text-[14px] font-bold leading-snug group-hover:underline underline-offset-4 decoration-foreground/30">{item.title}</h4>
                                <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground/60 transition-colors duration-300 group-hover:text-muted-foreground">
                                    {item.description}
                                </p>
                            </div>

                            <div className="mt-5">
                                <div className="mb-3 h-px bg-border-warm/40" />
                                <span className="inline-flex w-full items-center justify-between text-[11px] font-bold text-foreground/50 transition-colors duration-300 group-hover:text-foreground">
                                    Learn More
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </span>
                            </div>

                            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand-crimson transition-[width] duration-500 group-hover:w-full" />
                        </Link>
                    </NavigationMenuLink>
                </div>
            ))}

            {/* CTA column */}
            <div className="flex flex-col justify-between bg-background p-7">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
                        Ready to Partner?
                    </p>
                    <h4 className="mt-2 text-[15px] font-bold leading-snug">
                        Get Started Today
                    </h4>
                    <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground/60">
                        Contact our partnership team to discuss the best option for your business.
                    </p>
                </div>

                <div className="mt-6">
                    <div className="mb-4 h-px bg-border-warm/40" />
                    <NavigationMenuLink asChild>
                        <Link
                            href="/contact"
                            className="inline-flex w-full items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/60 transition-colors duration-300 hover:text-foreground"
                        >
                            Contact Us
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </NavigationMenuLink>
                </div>
            </div>
        </div>
    );
}
