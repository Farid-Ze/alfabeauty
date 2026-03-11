"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { BRANDS } from "@/lib/config";

export function BrandsPanel() {
    return (
        <div className="mx-auto grid min-h-[340px] max-w-[1400px] grid-cols-[1fr_1fr_1fr_1fr_220px] gap-4 px-8 py-10 lg:px-12">
            {BRANDS.map((brand) => (
                <NavigationMenuLink key={brand.name} asChild>
                    <Link
                        href={`/products?brand=${brand.name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden bg-charcoal text-white"
                    >
                        <div className="absolute inset-0">
                            <Image
                                src={brand.logo}
                                alt=""
                                fill
                                sizes="(max-width: 1400px) 25vw, 350px"
                                className="object-cover opacity-15 transition-opacity duration-300 group-hover:opacity-20"
                                aria-hidden="true"
                            />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />

                        <div className="relative z-10 p-7">
                            <div className="mb-4 flex h-10 items-center">
                                <Image
                                    src={brand.logo}
                                    alt={`${brand.name} logo`}
                                    width={120}
                                    height={36}
                                    className="h-8 w-auto object-contain brightness-200 invert opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                                />
                            </div>

                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 transition-colors duration-300 group-hover:text-white/60">
                                {brand.origin} {brand.flag}
                            </p>
                            <h4 className="mt-1.5 text-[1rem] font-bold leading-snug group-hover:underline underline-offset-4 decoration-white/30">
                                {brand.name}
                            </h4>
                            <p className="mt-2 text-[12px] leading-relaxed text-white/45 transition-colors duration-300 group-hover:text-white/60">
                                {brand.category}
                            </p>
                        </div>

                        <div className="relative z-10 p-7 pt-0">
                            <div className="mb-4 h-px bg-white/15" />
                            <span className="inline-flex w-full items-center justify-between text-[11px] font-bold text-white/50 transition-colors duration-300 group-hover:text-white">
                                Explore Brand
                                <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                        </div>

                        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand-crimson transition-[width] duration-500 group-hover:w-full" />
                    </Link>
                </NavigationMenuLink>
            ))}

            {/* CTA column */}
            <div className="flex flex-col justify-between border-l border-border-warm/30 pl-4">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
                        Looking for Something?
                    </p>
                    <h4 className="mt-2 text-[15px] font-bold leading-snug">
                        Need Help Choosing?
                    </h4>
                    <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground/60">
                        Our team can help you find the right brand and products for your salon.
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
