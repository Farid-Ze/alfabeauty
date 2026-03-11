"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { PRODUCT_CATEGORIES } from "@/lib/config";

const CATEGORY_IMAGES: Record<string, string> = {
    "Hair Colour": "/images/brands/alfaparf-milano.webp",
    "Hair Care": "/images/products/montibello-hop/ULTRA REPAIR SHAMPOO/hero.webp",
    "Styling": "/images/products/montibello-hop/FULL VOLUME DRY SHAMPOO/hero.webp",
    "Treatments": "/images/products/montibello-hop/PURIFYING BALANCE SCALP TREATMENT/hero.webp",
    "Tools & Equipment": "/images/products/gamma-plus/XCELL CLIPPER/hero.webp",
    "Barber Essentials": "/images/products/gamma-plus/ABSOLUTE HITTER TRIMMER/hero.webp",
};

const DEFAULT_IMAGE = "/images/products/gamma-plus/XCELL CLIPPER/hero.webp";

export function ProductsPanel() {
    const [hoveredImage, setHoveredImage] = React.useState(DEFAULT_IMAGE);

    return (
        <div className="mx-auto grid max-w-[1400px] grid-cols-[1.1fr_1fr] gap-0 px-8 py-10 lg:px-12">
            {/* Left: Featured product showcase */}
            <div className="relative flex flex-col justify-between overflow-hidden bg-charcoal pr-10 p-8">
                <div className="absolute inset-0">
                    <Image
                        src={hoveredImage}
                        alt=""
                        fill
                        sizes="50vw"
                        className="object-cover opacity-20 transition-opacity duration-500"
                        aria-hidden="true"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <div className="relative z-10">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                        Professional Range
                    </p>
                    <h3 className="mt-2 text-[1.6rem] font-bold leading-tight text-white">
                        Explore Our<br />Product Collection
                    </h3>
                    <p className="mt-3 max-w-[320px] text-[13px] leading-relaxed text-white/50">
                        Curated professional-grade products from the world&apos;s most trusted salon brands.
                    </p>
                </div>

                <div className="relative z-10 mt-auto pt-6">
                    <div className="mb-4 h-px bg-white/15" />
                    <NavigationMenuLink asChild>
                        <Link
                            href="/products"
                            className="inline-flex w-full items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 transition-colors duration-300 hover:text-white"
                        >
                            View All Products
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </NavigationMenuLink>
                </div>
            </div>

            {/* Right: Category grid */}
            <div className="grid grid-cols-2 gap-px bg-border-warm/20">
                {PRODUCT_CATEGORIES.map((cat) => (
                    <NavigationMenuLink key={cat} asChild>
                        <Link
                            href={`/products?category=${cat.toLowerCase().replace(/\s+&?\s*/g, "-")}`}
                            className="group relative flex min-h-[120px] flex-col justify-end overflow-hidden bg-background p-5"
                            onMouseEnter={() => setHoveredImage(CATEGORY_IMAGES[cat] ?? DEFAULT_IMAGE)}
                            onMouseLeave={() => setHoveredImage(DEFAULT_IMAGE)}
                        >
                            <Image
                                src={CATEGORY_IMAGES[cat] ?? "/images/brands/alfaparf-milano.webp"}
                                alt=""
                                width={64}
                                height={64}
                                className="absolute right-3 top-3 h-14 w-14 rounded-sm object-cover opacity-15 transition-opacity duration-300 group-hover:opacity-30"
                                aria-hidden="true"
                            />

                            <h4 className="text-[13px] font-bold leading-snug group-hover:underline underline-offset-4 decoration-foreground/30">{cat}</h4>
                            <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-muted-foreground/60 transition-colors duration-300 group-hover:text-foreground">
                                Browse
                                <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                            </span>

                            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand-crimson transition-[width] duration-500 group-hover:w-full" />
                        </Link>
                    </NavigationMenuLink>
                ))}
            </div>
        </div>
    );
}
