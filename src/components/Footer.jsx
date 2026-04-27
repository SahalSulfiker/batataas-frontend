import React from 'react';
import { Instagram, Phone, MapPin } from 'lucide-react';

const LOGO = '/logo.png';

export default function Footer({ branches }) {
    return (
        <footer id="contact" data-testid="site-footer" className="relative bg-brand-ink text-brand-cream/90 pt-20 pb-8">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                    <div className="md:col-span-4">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full overflow-hidden ring-1 ring-brand-tan/50">
                                <img src={LOGO} alt="Batatas" className="h-full w-full object-cover"/>
                            </div>
                            <div>
                                <div className="font-display text-2xl text-brand-cream tracking-wider">BATAATAS</div>
                                <div className="font-script text-sm text-brand-tan -mt-0.5">potato luxury</div>
                            </div>
                        </div>
                        <p className="mt-5 font-body text-sm text-brand-cream/65 max-w-xs leading-relaxed">
                            Hand-crafted fries, fried chicken, burgers & house mojitos. Made fresh, made to order.
                        </p>
                        <a
                            href="https://instagram.com/bataatas_in"
                            target="_blank"
                            rel="noreferrer"
                            data-testid="footer-instagram-link"
                            className="mt-5 inline-flex items-center gap-2 text-sm text-brand-cream hover:text-brand-tan transition-colors"
                        >
                            <Instagram size={15}/> @bataatas.in
                        </a>
                    </div>

                    <div className="md:col-span-5">
                        <div className="font-body text-[11px] uppercase tracking-[0.3em] text-brand-tan font-bold mb-4">Branches</div>
                        <ul className="grid grid-cols-2 gap-5">
                            {(branches || []).map((b) => (
                                <li key={b.id} className="text-sm">
                                    <div className="font-display text-lg uppercase text-brand-cream tracking-wide">{b.name}</div>
                                    <div className="font-body text-brand-cream/60 mt-1 flex items-start gap-1.5 text-xs"><MapPin size={11} className="mt-0.5 shrink-0"/> {b.address}</div>
                                    {b.phone && <a href={`tel:${b.phone}`} className="font-body text-brand-tan mt-1 inline-flex items-center gap-1.5 hover:underline text-xs"><Phone size={11}/> {b.phone}</a>}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        <div className="font-body text-[11px] uppercase tracking-[0.3em] text-brand-tan font-bold mb-4">Get in touch</div>
                        <ul className="space-y-3 text-sm font-body">
                            <li><a href="tel:+918111980269" className="inline-flex items-center gap-2 text-brand-cream/85 hover:text-brand-tan"><Phone size={13}/> +91 81119 80269</a></li>
                            <li><a href="tel:+919061160269" className="inline-flex items-center gap-2 text-brand-cream/85 hover:text-brand-tan"><Phone size={13}/> +91 90611 60269</a></li>
                            <li><a href="tel:+918606470269" className="inline-flex items-center gap-2 text-brand-cream/85 hover:text-brand-tan"><Phone size={13}/> +91 86064 70269 <span className="text-brand-cream/50">· Franchise</span></a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-body text-brand-cream/55">
                    <div>© {new Date().getFullYear()} Bataatas. All rights reserved.</div>
                    <div className="font-body text-brand-cream/55">Savor the taste of potato luxury</div>
                </div>
            </div>
        </footer>
    );
}
