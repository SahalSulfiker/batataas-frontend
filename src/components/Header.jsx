import React, { useEffect, useState } from 'react';
import { Phone, Instagram, Menu as MenuIcon, X } from 'lucide-react';

const LOGO = '/logo.png';

const NAV = [
    { label: 'Home', href: '#home' },
    { label: 'Menu', href: '#menu' },
    { label: 'About', href: '#about' },
    { label: 'Branches', href: '#branches' },
    { label: 'Contact', href: '#contact' },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <header
                data-testid="site-header"
                className={`fixed top-0 inset-x-0 z-[90] transition-all duration-500 ${
                    scrolled ? 'bg-brand-cream/90 backdrop-blur-xl border-b border-brand-line py-2' : 'bg-transparent py-4'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
                    <a href="#home" data-testid="logo-link" className="flex items-center gap-3 group">
                        <div className="h-12 w-12 md:h-14 md:w-14 rounded-full overflow-hidden bg-brand-ink ring-1 ring-brand-tan/60 transition-transform duration-500 group-hover:scale-105">
                            <img src={LOGO} alt="Batatas" className="h-full w-full object-cover" loading="eager" />
                        </div>
                        <div className="hidden sm:block leading-none">
                            <div style={{fontFamily: "'Yellowtail', cursive"}} className="text-2xl text-brand-ink">Bataatas</div>
                            <div className="font-script text-sm text-brand-tan -mt-0.5">potato luxury</div>
                        </div>
                    </a>

                    <nav className="hidden lg:flex items-center gap-1">
                        {NAV.map((n) => (
                            <a
                                key={n.href}
                                href={n.href}
                                data-testid={`nav-${n.label.toLowerCase()}-link`}
                                className="relative px-4 py-2 font-body font-semibold text-sm uppercase tracking-widest text-brand-ink hover:text-brand-tan transition-colors"
                            >
                                <span>{n.label}</span>
                                <span className="absolute left-4 right-4 bottom-1 h-[2px] bg-brand-tan scale-x-0 origin-left transition-transform duration-300 hover:scale-x-100"></span>
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2 md:gap-3">
                        <a
                            href="tel:+918111980269"
                            data-testid="call-manjeri-btn"
                            className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-full bg-brand-tan text-white text-[11px] font-bold uppercase tracking-wider hover:bg-brand-tanDark transition-colors"
                        >
                            <Phone size={13} /> Manjeri
                        </a>
                        <a
                            href="tel:+919061160269"
                            data-testid="call-wandoor-btn"
                            className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-brand-ink/15 text-brand-ink text-[11px] font-bold uppercase tracking-wider hover:border-brand-tan hover:text-brand-tan transition-colors"
                        >
                            <Phone size={13} /> Wandoor
                        </a>
                        <a
                            href="https://instagram.com/bataatas_in"
                            target="_blank"
                            rel="noreferrer"
                            data-testid="instagram-link"
                            className="h-10 w-10 grid place-items-center rounded-full bg-brand-ink text-brand-cream hover:bg-brand-tan transition-colors"
                        >
                            <Instagram size={17} />
                        </a>
                        <button
                            className="lg:hidden h-10 w-10 grid place-items-center rounded-full bg-brand-ink text-brand-cream"
                            onClick={() => setOpen(true)}
                            data-testid="mobile-menu-open-btn"
                            aria-label="Open menu"
                        >
                            <MenuIcon size={20} />
                        </button>
                    </div>
                </div>
            </header>

            <div
                className={`fixed inset-0 z-[95] bg-brand-cream text-brand-ink transition-all duration-500 lg:hidden ${
                    open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            >
                <button
                    className="absolute top-4 right-4 h-12 w-12 grid place-items-center rounded-full bg-brand-ink text-brand-cream"
                    onClick={() => setOpen(false)}
                    data-testid="mobile-menu-close-btn"
                    aria-label="Close menu"
                >
                    <X size={22} />
                </button>
                <div className="h-full flex flex-col justify-center items-start px-10 gap-5">
                    {NAV.map((n) => (
                        <a
                            key={n.href}
                            href={n.href}
                            data-testid={`mobile-nav-${n.label.toLowerCase()}-link`}
                            onClick={() => setOpen(false)}
                            className="font-display text-5xl uppercase tracking-wider hover:text-brand-tan transition-colors"
                        >
                            {n.label}
                        </a>
                    ))}
                    <div className="mt-8 flex flex-col gap-3 w-full">
                        <a href="tel:+918111980269" className="px-5 py-3 rounded-full bg-brand-tan text-white font-bold flex items-center gap-2"><Phone size={16}/> Manjeri · +91 81119 80269</a>
                        <a href="tel:+919061160269" className="px-5 py-3 rounded-full bg-white border border-brand-line text-brand-ink font-bold flex items-center gap-2"><Phone size={16}/> Wandoor · +91 90611 60269</a>
                    </div>
                </div>
            </div>
        </>
    );
}
