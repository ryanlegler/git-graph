import type { Config } from 'tailwindcss';

const config = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },

        extend: {
            colors: {
                github: {
                    '100': 'var(--github-100)',
                    '200': 'var(--github-200)',
                    '300': 'var(--github-300)',
                    '400': 'var(--github-400)',
                    '500': 'var(--github-500)',
                },
                border: 'var(--border)',
                ring: 'var(--github-300)',
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primary: {
                    DEFAULT: 'var(--foreground)',
                    foreground: 'var(--background)',
                    background: 'var(--github-000)',
                },
                secondary: {
                    DEFAULT: 'var(--github-100)',
                    foreground: 'var(--github-400)',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'var(--muted)',
                    foreground: 'var(--muted-foreground)',
                },
                accent: {
                    DEFAULT: 'var(--github-400)',
                    foreground: 'var(--foreground)',
                    highlight: 'var(--github-500)',
                    secondary: 'var(--github-200)',
                },
                popover: {
                    DEFAULT: 'var(--background)',
                    foreground: 'var(--foreground)',
                },

                // New tokens
                // Is this primary?
                interactive: {
                    DEFAULT: 'var(--github-400)',
                    foreground: 'var(--background)',
                    highlight: 'var(--github-500)',
                    secondary: 'var(--github-300)',
                },

                // is this just muted? not a great name
                hollow: {
                    DEFAULT: 'var(--background)',
                    foreground: 'var(--github-400)', // interactive-defualt
                    highlight: 'var(--github-100)',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
