import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState(() => {
        try {
            const raw = localStorage.getItem('batatas_cart');
            return raw ? JSON.parse(raw) : [];
        } catch { return []; }
    });
    const [orderType, setOrderType] = useState('delivery');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('batatas_cart', JSON.stringify(items));
    }, [items]);

    const add = useCallback((item) => {
        setItems((prev) => {
            const i = prev.findIndex((p) => p.id === item.id);
            if (i >= 0) {
                const next = [...prev];
                next[i] = { ...next[i], qty: next[i].qty + 1 };
                return next;
            }
            return [...prev, { id: item.id, name: item.name, price: item.price, image: item.image, qty: 1 }];
        });
    }, []);

    const inc = useCallback((id) => {
        setItems((prev) => prev.map((p) => p.id === id ? { ...p, qty: Math.min(p.qty + 1, 99) } : p));
    }, []);

    const dec = useCallback((id) => {
        setItems((prev) => prev.flatMap((p) => {
            if (p.id !== id) return [p];
            if (p.qty <= 1) return [];
            return [{ ...p, qty: p.qty - 1 }];
        }));
    }, []);

    const remove = useCallback((id) => {
        setItems((prev) => prev.filter((p) => p.id !== id));
    }, []);

    const clear = useCallback(() => setItems([]), []);

    const total = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);
    const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);

    const value = { items, add, inc, dec, remove, clear, total, count, orderType, setOrderType, isOpen, setIsOpen };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
};
