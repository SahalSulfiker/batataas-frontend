import React from 'react';
import { Phone, ArrowUpRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

export default function Franchise() {
    const ref = useReveal();
    return (
        <section ref={ref} data-testid="franchise-section" className="relative py-20 md:py-28 bg-brand-cream border-y border-brand-line">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-8">
                        <div className="font-body text-[11px] uppercase tracking-[0.3em] text-brand-tan font-bold mb-3">
                            Franchise enquiry
                        </div>
                        <h2 className="font-display uppercase text-brand-ink text-4xl md:text-5xl lg:text-6xl tracking-wide leading-[0.95]">
                            Own a <span className="text-brand-tan">Batatas</span> franchise.
                        </h2>
                        <p className="mt-5 font-body text-brand-muted max-w-xl text-base leading-relaxed">
                            A QSR brand obsessed with quality, craft and crazy-good fries. Partner with us to bring Batatas to your city.
                        </p>
                    </div>
                    <div className="md:col-span-4 flex md:justify-end">
                        <a
                            href="tel:+918606470269"
                            data-testid="franchise-call-btn"
                            className="group inline-flex items-center gap-3 px-6 py-4 rounded-full bg-brand-ink text-brand-cream font-body font-bold uppercase tracking-widest text-xs hover:bg-brand-tan transition-colors"
                        >
                            <Phone size={16}/>
                            <span>+91 86064 70269</span>
                            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
