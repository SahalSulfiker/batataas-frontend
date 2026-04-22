import { useEffect, useRef } from 'react';

export const useReveal = () => {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.classList.add('reveal');
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add('in');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
        io.observe(el);
        return () => io.disconnect();
    }, []);
    return ref;
};
