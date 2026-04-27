import React, { useState, useMemo } from 'react';
import MenuCard from './MenuCard';
import { useReveal } from '../hooks/useReveal';

export default function Menu({ menuData }) {
    const categories = useMemo(() => menuData?.categories || [], [menuData]);
    const items = useMemo(() => menuData?.items || {}, [menuData]);
    const [active, setActive] = useState('All');
    const ref = useReveal();

    const tabs = useMemo(() => ['All', ...categories], [categories]);

    const visibleGroups = useMemo(() => {
        if (active === 'All') {
            return categories.map((c) => ({ category: c, items: items[c] || [] }));
        }
        return [{ category: active, items: items[active] || [] }];
    }, [active, categories, items]);

    return (
        <section id="menu" ref={ref} data-testid="menu-section" className="relative py-20 md:py-32 bg-brand-cream">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Heading */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="font-script text-brand-red text-3xl rotate-[-4deg]">the menu</span>
                            <span className="inline-block h-[2px] w-16 bg-brand-red" />
                        </div>
                        <h2 className="font-display text-brand-ink uppercase text-5xl md:text-7xl tracking-wide leading-[0.9]">
                            Crispy. <span className="text-brand-red">Golden.</span><br/>
                            <span className="text-brand-brown">Obsessed over.</span>
                        </h2>
                    </div>
                    <p className="font-body text-brand-brown/80 max-w-md text-base md:text-lg">
                        From signature loaded fries to hand-breaded fried chicken and icy mojitos — every bite is made to order, the Bataatas way.
                    </p>
                </div>

                {/* Tabs */}
                <div data-testid="menu-tabs" className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2 mb-10 snap-x">
                    {tabs.map((t) => (
                        <button
                            key={t}
                            data-testid={`menu-tab-${t.toLowerCase().replace(/\s+/g, '-')}`}
                            onClick={() => setActive(t)}
                            className={`whitespace-nowrap px-5 py-2.5 rounded-full font-body font-bold text-sm uppercase tracking-widest transition-all snap-start ${
                                active === t
                                    ? 'bg-brand-ink text-brand-yellow shadow-[0_8px_20px_rgba(11,11,12,0.25)]'
                                    : 'bg-white text-brand-brown hover:bg-brand-yellow/30 border border-brand-brown/15'
                            }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                {/* Groups */}
                <div className="space-y-16">
                    {visibleGroups.map((g) => (
                        <div key={g.category}>
                            <div className="flex items-baseline gap-4 mb-6">
                                <h3 className="font-display text-3xl md:text-5xl uppercase tracking-wide text-brand-ink">{g.category}</h3>
                                <span className="font-body text-xs uppercase tracking-[0.3em] text-brand-red font-bold">{g.items.length} items</span>
                                <span className="flex-1 h-[2px] bg-brand-brown/15" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
                                {g.items.map((it) => (
                                    <MenuCard key={it.id} item={it} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
