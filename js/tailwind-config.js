tailwind.config = {
    theme: {
        extend: {
            animation: {
                'marquee': 'marquee 28s linear infinite',
                'marquee-r': 'marquee-r 34s linear infinite',
            },
            keyframes: {
                marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
                'marquee-r': { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0)' } },
            }
        }
    }
};