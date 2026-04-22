import React, { useEffect, useState } from 'react';
import { ArrowRight, UtensilsCrossed } from 'lucide-react';

const SLIDES = [
    {
        img: 'https://images.pexels.com/photos/20535803/pexels-photo-20535803.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1400',
        label: 'Chicken Loaded Fries',
        price: '₹180',
    },
    {
        img: 'https://images.pexels.com/photos/33037756/pexels-photo-33037756.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1400',
        label: 'Fried Chicken',
        price: 'from ₹160',
    },
    {
        img: 'https://images.pexels.com/photos/36741809/pexels-photo-36741809.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1400',
        label: 'Beef Smash Burger',
        price: '₹170',
    },
    {
        img: 'https://images.pexels.com/photos/7491891/pexels-photo-7491891.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1400',
        label: 'House Mojitos',
        price: '₹90',
    },
];

export default function Hero() {
    const [i, setI] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 5500);
        return () => clearInterval(t);
    }, []);

    return (
        <section id="home" data-testid="hero-section" className="relative w-full bg-brand-cream pt-24 md:pt-32 pb-10 md:pb-20 md:min-h-[100svh] flex items-center">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 grid grid-cols-12 gap-3 sm:gap-5 md:gap-10 lg:gap-12 items-center w-full">
                {/* Left: Text (6 cols on mobile too) */}
                <div className="col-span-6 relative z-10">
                    <div className="flex items-center gap-2 mb-3 md:mb-5">
                        <span className="inline-block h-[1px] w-5 md:w-10 bg-brand-tan" />
                        <span className="font-body text-[8px] md:text-[11px] uppercase tracking-[0.25em] md:tracking-[0.35em] text-brand-tan font-bold">
                            Est. 2025 · Kerala
                        </span>
                    </div>

                    <div className="font-script text-brand-tan text-lg sm:text-2xl md:text-4xl -rotate-2 mb-1 md:mb-3">
                        Savor the taste of
                    </div>

                    <h1 className="font-display text-brand-ink uppercase leading-[0.88] tracking-wide text-[clamp(2rem,8vw,7.5rem)]">
                        Potato <br/>
                        <span className="text-brand-tan">Luxury.</span>
                    </h1>

                    <p className="mt-3 md:mt-6 max-w-md font-body text-[11px] sm:text-sm md:text-lg text-brand-muted leading-snug md:leading-relaxed">
                        Hand-cut fries, hand-breaded chicken, smash-pressed burgers and icy house mojitos — crafted in small batches, built for big appetites.
                    </p>

                    <div className="mt-4 md:mt-8 flex flex-wrap items-center gap-2 md:gap-3">
                        <a
                            href="#menu"
                            data-testid="hero-order-now-btn"
                            className="ripple inline-flex items-center gap-1.5 md:gap-2 px-4 sm:px-5 md:px-7 py-2.5 md:py-4 rounded-full bg-brand-tan text-white font-body font-bold uppercase tracking-wider md:tracking-widest text-[10px] md:text-[12px] hover:bg-brand-tanDark active:scale-95 transition-all shadow-[0_10px_30px_rgba(201,138,75,0.35)]"
                        >
                            Order Now <ArrowRight size={14} />
                        </a>
                        <a
                            href="#menu"
                            data-testid="hero-explore-menu-btn"
                            className="ripple inline-flex items-center gap-1.5 md:gap-2 px-4 sm:px-5 md:px-7 py-2.5 md:py-4 rounded-full bg-transparent text-brand-ink font-body font-bold uppercase tracking-wider md:tracking-widest text-[10px] md:text-[12px] border border-brand-ink/20 hover:border-brand-tan hover:text-brand-tan active:scale-95 transition-all"
                        >
                            <UtensilsCrossed size={14} /> Explore
                        </a>
                    </div>

                    {/* Trust row */}
                    <div className="mt-5 md:mt-10 flex items-center gap-3 sm:gap-5 md:gap-10">
                        <div>
                            <div className="font-display text-xl sm:text-2xl md:text-4xl text-brand-ink leading-none">30+</div>
                            <div className="font-body text-[8px] md:text-[10px] uppercase tracking-[0.18em] md:tracking-[0.25em] text-brand-muted mt-0.5 md:mt-1">Items</div>
                        </div>
                        <div className="h-6 md:h-10 w-[1px] bg-brand-line" />
                        <div>
                            <div className="font-display text-xl sm:text-2xl md:text-4xl text-brand-ink leading-none">3</div>
                            <div className="font-body text-[8px] md:text-[10px] uppercase tracking-[0.18em] md:tracking-[0.25em] text-brand-muted mt-0.5 md:mt-1">Branches</div>
                        </div>
                        <div className="h-6 md:h-10 w-[1px] bg-brand-line" />
                        <div>
                            <div className="font-display text-xl sm:text-2xl md:text-4xl text-brand-ink leading-none">&lt;5<span className="text-xs md:text-lg">km</span></div>
                            <div className="font-body text-[8px] md:text-[10px] uppercase tracking-[0.18em] md:tracking-[0.25em] text-brand-muted mt-0.5 md:mt-1">Delivery</div>
                        </div>
                    </div>
                </div>

                {/* Right: Big food photo (6 cols on mobile too) */}
                <div className="col-span-6 relative">
                    <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-xl sm:rounded-2xl md:rounded-[2rem] overflow-hidden bg-brand-creamDark">
                        {SLIDES.map((s, idx) => (
                            <div
                                key={idx}
                                className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${i === idx ? 'opacity-100' : 'opacity-0'}`}
                                aria-hidden={i !== idx}
                            >
                                <img
                                    src={s.img}
                                    alt={s.label}
                                    className={`h-full w-full object-cover transition-transform duration-[7000ms] ease-out ${i === idx ? 'scale-100' : 'scale-110'}`}
                                    loading={idx === 0 ? 'eager' : 'lazy'}
                                />
                            </div>
                        ))}

                        {/* Bottom fade with label */}
                        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 md:p-6 bg-gradient-to-t from-black/55 via-black/20 to-transparent">
                            <div className="flex items-end justify-between gap-2">
                                <div className="min-w-0">
                                    <div className="font-body text-[8px] sm:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/80">Featured</div>
                                    <div className="font-display text-xs sm:text-base md:text-3xl uppercase tracking-wide text-white truncate">
                                        {SLIDES[i].label}
                                    </div>
                                </div>
                                <div className="rounded-full bg-white/95 backdrop-blur px-2 py-1 md:px-4 md:py-2 font-display text-[11px] sm:text-sm md:text-lg text-brand-ink shrink-0">
                                    {SLIDES[i].price}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Made-to-order chip — hidden on small mobile */}
                    <div className="hidden sm:flex absolute -top-3 -left-3 md:-top-4 md:-left-4 items-center gap-2 bg-white rounded-full pl-2 pr-3 md:pr-4 py-1.5 md:py-2 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
                        <span className="h-5 w-5 md:h-7 md:w-7 rounded-full bg-brand-tan grid place-items-center">
                            <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-white animate-pulse" />
                        </span>
                        <span className="font-body text-[9px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.25em] text-brand-ink font-bold">Made to order</span>
                    </div>

                    {/* Slide indicators */}
                    <div className="mt-3 md:mt-5 flex items-center justify-center gap-1.5 md:gap-2">
                        {SLIDES.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setI(idx)}
                                data-testid={`hero-slide-indicator-${idx}`}
                                aria-label={`Go to slide ${idx + 1}`}
                                className={`h-1 md:h-1.5 rounded-full transition-all duration-500 ${
                                    i === idx ? 'w-6 md:w-10 bg-brand-tan' : 'w-3 md:w-5 bg-brand-line hover:bg-brand-tanLight'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
