import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function MenuCard({ item }) {
    const { add } = useCart();
    const [just, setJust] = useState(false);

    const handleAdd = (e) => {
        // Ripple origin
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--rx', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--ry', `${e.clientY - rect.top}px`);
        add(item);
        setJust(true);
        setTimeout(() => setJust(false), 900);
    };

    return (
        <article
            data-testid={`menu-item-${item.id}`}
            className="group relative bg-white border border-brand-brown/10 rounded-[1.75rem] p-4 md:p-5 flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(194,24,7,0.15)] hover:border-brand-yellow"
        >
            {/* Image */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-brand-cream mb-4 relative">
                <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 bg-brand-ink text-brand-yellow font-body text-[10px] uppercase tracking-[0.25em] font-bold px-2.5 py-1 rounded-full">
                    ₹{item.price}
                </div>
            </div>

            {/* Body */}
            <div className="flex-1 flex flex-col">
                <h4 className="font-display text-xl md:text-2xl uppercase tracking-wide text-brand-ink leading-tight">
                    {item.name}
                </h4>
                {item.desc && (
                    <p className="mt-2 font-body text-sm text-brand-brown/75 leading-relaxed line-clamp-2">{item.desc}</p>
                )}

                <div className="mt-4 flex items-center justify-between gap-3">
                    <div>
                        <div className="font-body text-[10px] uppercase tracking-[0.25em] text-brand-brown/60">Price</div>
                        <div className="font-display text-2xl text-brand-red leading-none">₹{item.price}</div>
                    </div>
                    <button
                        onClick={handleAdd}
                        data-testid={`add-to-cart-btn-${item.id}`}
                        className={`ripple inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-body font-bold text-xs uppercase tracking-widest transition-all active:scale-95 ${
                            just ? 'bg-brand-yellow text-brand-ink' : 'bg-brand-red text-white hover:bg-brand-redDark'
                        }`}
                    >
                        {just ? <><Check size={14}/> Added</> : <><Plus size={14}/> Add</>}
                    </button>
                </div>
            </div>
        </article>
    );
}
