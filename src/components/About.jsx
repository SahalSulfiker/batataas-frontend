import React from 'react';
import { useReveal } from '../hooks/useReveal';

const DIRECTORS = [
    { name: 'Inthisham Usman', role: 'Co-Founder & Director', img: '/images/usman.jpeg' },
];

export default function About() {
    const ref = useReveal();
    return (
        <section id="about" ref={ref} data-testid="about-section" className="relative py-20 md:py-32 bg-brand-cream overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
                    {/* Left: headline */}
                    <div className="md:col-span-5">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="font-script text-brand-red text-3xl rotate-[-4deg]">our story</span>
                            <span className="inline-block h-[2px] w-14 bg-brand-red" />
                        </div>
                        <h2 className="font-display uppercase text-5xl md:text-7xl tracking-wide leading-[0.9] text-brand-ink">
                            From humble <span className="text-brand-red">potatoes,</span><br/>
                            to <span className="text-brand-brown">pure luxury.</span>
                        </h2>
                        <p className="mt-6 font-body text-brand-brown/85 text-base md:text-lg leading-relaxed">
                            Batatas was born from a simple obsession — the perfect fry. Hand-cut, double-fried, seasoned in small batches and loaded with bold flavour. Every recipe is tested, every sauce house-made, every box built to make you grin.
                        </p>
                        <p className="mt-4 font-body text-brand-brown/75 text-base leading-relaxed">
                            Today, Batatas serves up crispy joy across Kerala — and we're just getting started.
                        </p>

                        <div className="mt-8 grid grid-cols-3 gap-4">
                            <div>
                                <div className="font-display text-4xl text-brand-red">3+</div>
                                <div className="font-body text-xs uppercase tracking-widest text-brand-brown/70">Branches</div>
                            </div>
                            <div>
                                <div className="font-display text-4xl text-brand-red">30+</div>
                                <div className="font-body text-xs uppercase tracking-widest text-brand-brown/70">Menu Items</div>
                            </div>
                            <div>
                                <div className="font-display text-4xl text-brand-red">2025</div>
                                <div className="font-body text-xs uppercase tracking-widest text-brand-brown/70">Established</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: directors bento */}
                    <div className="md:col-span-7 grid grid-cols-2 gap-5">
                        {DIRECTORS.map((d, i) => (
                            <div
                                key={d.name}
                                data-testid={`director-card-${i}`}
                                className={`relative group rounded-3xl overflow-hidden bg-brand-ink aspect-[3/4] ${i === 0 ? 'md:translate-y-6' : ''}`}
                            >
                                <img src={d.img} alt={d.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/40 to-transparent" />
                                <div className="absolute inset-x-0 bottom-0 p-5">
                                    <div className="font-script text-brand-yellow text-xl rotate-[-3deg]">{d.role}</div>
                                    <div className="font-display text-2xl md:text-3xl uppercase text-brand-cream tracking-wide leading-tight">{d.name}</div>
                                </div>
                                <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-brand-red text-white grid place-items-center font-bold text-xs">
                                    {String(i + 1).padStart(2, '0')}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
