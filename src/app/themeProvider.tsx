'use client';

import { ThemeProvider } from 'next-themes';

export function Provider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider defaultTheme='dark' attribute='data-color-mode'>
            {children}
        </ThemeProvider>
    );
}
