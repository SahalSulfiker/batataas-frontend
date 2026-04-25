import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function FloatingCart() {
    const { count, setIsOpen, total, isOpen } = useCart();
    
    if (isOpen) return null;
    
    return (
        <button
            data-testid="cart-toggle-btn"
            onClick={() => setIsOpen(true)}
            className={`fixed bottom-24 right-6 md:bottom-8 md:right-8 z-[80] inline-flex items-center gap-3 pl-4 pr-5 py-3 rounded-full bg-brand-red text-white shadow-[0_15px_40px_rgba(194,24,7,0.45)] hover:bg-brand-redDark active:scale-95 transition-all ${count > 0 ? 'animate-pulse-brand' : ''}`}
            aria-label="Open cart"
        >
            <div className="relative">
                <ShoppingBag size={22} />
                {count > 0 && (
                    <span data-testid="cart-count" className="absolute -top-2 -right-2 h-5 min-w-[20px] px-1 grid place-items-center rounded-full bg-brand-yellow text-brand-ink text-[10px] font-bold">
                        {count}
                    </span>
                )}
            </div>
            <span className="font-body text-sm font-bold uppercase tracking-widest hidden sm:inline">
                {count > 0 ? `₹${total}` : 'Cart'}
            </span>
        </button>
    );
}