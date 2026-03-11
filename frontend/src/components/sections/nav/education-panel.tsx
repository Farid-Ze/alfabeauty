"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Calendar } from "lucide-react";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";

const EDUCATION_ITEMS = [
    {
        title: "Technical Training",
        description: "Hands-on workshops with industry professionals covering cutting, colouring, and styling techniques.",
        href: "/education",
        icon: BookOpen,
    },
    {
        title: "Product Knowledge",
        description: "Deep-dive sessions on product formulations, application methods, and salon consultation skills.",
        href: "/education",
        icon: BookOpen,
    },
    {
        title: "Business Development",
        description: "Strategic workshops on salon management, marketing, and client retention strategies.",
        href: "/education",
        icon: BookOpen,
    },
    {
        title: "Events & Seminars",
        description: "Industry events, brand launches, and networking opportunities for beauty professionals.",
        href: "/education/events",
        icon: Calendar,
    },
];

export function EducationPanel() {
    return (
        <div className="mx-auto grid min-h-[340px] max-w-[1400px] grid-cols-[1fr_auto] gap-10 px-8 py-10 lg:px-12">
            {/* Left: Education items */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                {EDUCATION_ITEMS.map((item) => (
                    <NavigationMenuLink key={item.title} asChild>
                        <Link
                            href={item.href}
                            className="group flex gap-4 p-3"
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-muted">
                                <item.icon className="h-4.5 w-4.5 text-muted-foreground" />
                            </div>
                            <div>
                                <h4 className="text-[13px] font-bold leading-snug group-hover:underline underline-offset-4 decoration-foreground/30">{item.title}</h4>
                                <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground/70 transition-colors duration-300 group-hover:text-muted-foreground">
                                    {item.description}
                                </p>
                            </div>
                        </Link>
                    </NavigationMenuLink>
                ))}
            </div>

            {/* Right: CTA column */}
            <div className="flex w-[220px] flex-col justify-between border-l border-border-warm/30 pl-8">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
                        Alfa Beauty Academy
                    </p>
                    <h4 className="mt-2 text-[15px] font-bold leading-snug">
                        Elevate Your Craft
                    </h4>
                    <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground/60">
                        Professional education programs designed for growth.
                    </p>
                </div>

                <div className="mt-6">
                    <div className="mb-4 h-px bg-border-warm/40" />
                    <NavigationMenuLink asChild>
                        <Link
                            href="/education"
                            className="inline-flex w-full items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/60 transition-colors duration-300 hover:text-foreground"
                        >
                            Explore Programs
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </NavigationMenuLink>
                </div>
            </div>
        </div>
    );
}
