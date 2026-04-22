/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['Anton', 'sans-serif'],
                body: ['Manrope', 'sans-serif'],
                script: ['Caveat', 'cursive'],
            },
            colors: {
                brand: {
                    tan: '#C98A4B',
                    tanDark: '#A46D34',
                    tanLight: '#E4B584',
                    cream: '#FAF4EA',
                    creamDark: '#F1E7D3',
                    ink: '#1A140E',
                    muted: '#6B5A49',
                    line: '#E6D7BF',
                    // legacy aliases kept so nothing breaks during transition
                    red: '#C98A4B',
                    redDark: '#A46D34',
                    yellow: '#E4B584',
                    brown: '#6B5A49',
                    sky: '#E6D7BF',
                },
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
                'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
                'marquee': { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
                'pulse-brand': {
                    '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,138,75,0.55)' },
                    '50%': { boxShadow: '0 0 0 18px rgba(201,138,75,0)' },
                },
                'float-slow': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'marquee': 'marquee 30s linear infinite',
                'pulse-brand': 'pulse-brand 2.2s ease-in-out infinite',
                'float-slow': 'float-slow 6s ease-in-out infinite',
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
