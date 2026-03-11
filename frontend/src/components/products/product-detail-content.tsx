import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductWhatsAppCTA } from "./product-whatsapp-cta";
import type { Product } from "./product-data";

export function ProductDetailContent({ product }: { product: Product }): React.JSX.Element {
    return (
        <main id="main-content" className="relative z-10 min-h-screen bg-background pt-[var(--header-height)]">
            {/* ─── Breadcrumb / Back ─── */}
            <nav aria-label="Breadcrumb" className="mx-auto max-w-[1400px] px-6 py-4 sm:py-8 sm:px-8 lg:px-12">
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted transition-colors hover:text-foreground"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Products
                </Link>
            </nav>

            {/* ─── Hero Section ─── */}
            <section className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
                <div className="grid gap-6 sm:gap-12 lg:grid-cols-2 lg:gap-20">
                    {/* Left: Main Image */}
                    <div className="relative aspect-[3/4] sm:aspect-square overflow-hidden bg-surface lg:aspect-[4/5]">
                        {product.image ? (
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain p-8"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-text-muted">
                                No image available
                            </div>
                        )}
                        {product.isNew && (
                            <Badge className="absolute right-6 top-6 bg-foreground px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-white hover:bg-foreground">
                                New Arrival
                            </Badge>
                        )}
                    </div>

                    {/* Right: Details */}
                    <div className="flex flex-col justify-center py-4 sm:py-8">
                        <div className="mb-6 flex items-center gap-4">
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted">
                                {product.brand}
                            </span>
                            <Badge variant="outline" className="border-border-warm/60 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                                {product.category}
                            </Badge>
                        </div>

                        <h1 className="mb-6 heading-display text-foreground">
                            {product.name}
                        </h1>

                        <p className="mb-8 text-[16px] leading-relaxed text-text-muted md:text-[18px]">
                            {product.longDescription || product.description}
                        </p>

                        {/* Key Benefits */}
                        {product.keyBenefits && product.keyBenefits.length > 0 && (
                            <div className="mb-10 space-y-4">
                                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground">
                                    Key Benefits
                                </h3>
                                <ul className="space-y-3">
                                    {product.keyBenefits.map((benefit, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <Check className="mt-1 h-4 w-4 shrink-0 text-foreground" />
                                            <span className="text-[14px] text-text-muted">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="mt-auto">
                            <ProductWhatsAppCTA
                                productName={product.name}
                                brandName={product.brand}
                            />
                            <p className="mt-4 text-[12px] text-text-muted">
                                Professional pricing available for registered partners.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Info Slides (Horizontal Scroll) ─── */}
            {product.infoSlides && product.infoSlides.length > 0 && (
                <section className="border-t border-border-warm/40 bg-surface-elevated py-12 mt-12 sm:py-20 sm:mt-20">
                    <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
                        <h2 className="mb-12 heading-section text-foreground">
                            Product Features & Technology
                        </h2>
                        <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide">
                            {product.infoSlides.map((slide, i) => (
                                <div key={i} className="relative aspect-[4/5] w-[75vw] max-w-[320px] shrink-0 overflow-hidden bg-background shadow-sm md:w-[320px]">
                                    <Image
                                        src={slide.src}
                                        alt={`${product.name} feature ${i + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="320px"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 text-white backdrop-blur-sm">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em]">
                                            {slide.type}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── Gallery Grid ─── */}
            {product.gallery && product.gallery.length > 0 && (
                <section className="py-20">
                    <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
                        <h2 className="mb-12 heading-section text-foreground">
                            Gallery
                        </h2>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                            {product.gallery.map((img, i) => (
                                <div key={i} className="relative aspect-square cursor-pointer overflow-hidden bg-surface group">
                                    <Image
                                        src={img}
                                        alt={`${product.name} gallery ${i + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── Application & Recommendations ─── */}
            {(product.howToUse || (product.recommendedFor && product.recommendedFor.length > 0)) && (
                <section className="border-t border-border-warm/40 py-20">
                    <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
                        <div className="grid gap-12 md:grid-cols-2">
                            {product.howToUse && (
                                <div>
                                    <h3 className="mb-6 text-[14px] font-bold uppercase tracking-[0.2em] text-foreground">
                                        Application
                                    </h3>
                                    <p className="text-[15px] leading-relaxed text-text-muted">
                                        {product.howToUse}
                                    </p>
                                </div>
                            )}

                            {product.recommendedFor && product.recommendedFor.length > 0 && (
                                <div>
                                    <h3 className="mb-6 text-[14px] font-bold uppercase tracking-[0.2em] text-foreground">
                                        Recommended For
                                    </h3>
                                    <ul className="space-y-3">
                                        {product.recommendedFor.map((rec, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-foreground" />
                                                <span className="text-[15px] text-text-muted">{rec}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            <Separator className="bg-border-warm/40" />
        </main>
    );
}
