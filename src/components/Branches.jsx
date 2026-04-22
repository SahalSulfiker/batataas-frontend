import React from 'react';
import { MapPin, Phone, ExternalLink, Clock } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

export default function Branches({ branches }) {
    const ref = useReveal();
    return (
        <section id="branches" ref={ref} data-testid="branches-section" className="relative py-20 md:py-32 bg-brand-ink text-brand-cream overflow-hidden">
            {/* decorative */}
            <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-red/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-yellow/10 blur-3xl pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex items-center gap-3 mb-3">
                    <span className="font-script text-brand-yellow text-3xl rotate-[-4deg]">find us</span>
                    <span className="inline-block h-[2px] w-16 bg-brand-yellow" />
                </div>
                <h2 className="font-display uppercase text-5xl md:text-7xl tracking-wide leading-[0.9] mb-10 md:mb-14">
                    Our <span className="text-brand-yellow">Branches</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {(branches || []).map((b) => {
                        const soon = b.status === 'coming_soon';
                        return (
                            <div
                                key={b.id}
                                data-testid={`branch-card-${b.id}`}
                                className={`group relative rounded-3xl p-6 border transition-all duration-500 hover:-translate-y-2 ${
                                    soon
                                        ? 'bg-brand-brown/30 border-brand-yellow/20'
                                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-brand-yellow'
                                }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="h-11 w-11 rounded-full bg-brand-red grid place-items-center text-brand-cream">
                                        <MapPin size={18} />
                                    </div>
                                    {soon && (
                                        <span className="px-2.5 py-1 rounded-full bg-brand-yellow text-brand-ink text-[10px] font-bold uppercase tracking-widest">
                                            <Clock size={10} className="inline mr-1 -mt-0.5" /> Soon
                                        </span>
                                    )}
                                </div>
                                <div className="mt-5">
                                    <div className="font-display text-3xl uppercase tracking-wide text-brand-yellow">{b.name}</div>
                                    <div className="mt-2 font-body text-sm text-brand-cream/80">{b.address}</div>
                                </div>
                                <div className="mt-5 space-y-2">
                                    {b.phone && (
                                        <a
                                            href={`tel:${b.phone}`}
                                            data-testid={`branch-call-${b.id}`}
                                            className="inline-flex items-center gap-2 font-body text-sm text-brand-cream hover:text-brand-yellow"
                                        >
                                            <Phone size={14}/> {b.phone}
                                        </a>
                                    )}
                                    {b.map && (
                                        <a
                                            href={b.map}
                                            target="_blank"
                                            rel="noreferrer"
                                            data-testid={`branch-map-${b.id}`}
                                            className="block w-full mt-3 text-center px-4 py-2.5 rounded-full bg-brand-red text-white font-body font-bold uppercase text-xs tracking-widest hover:bg-brand-redDark transition-colors"
                                        >
                                            Get Directions <ExternalLink size={12} className="inline -mt-0.5 ml-1"/>
                                        </a>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
