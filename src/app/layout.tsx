import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Provider } from 'jotai';
import { Provider as ThemeProvider } from './themeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Better Github Contribution Graph',
    description: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <Provider>
            <html lang='en' suppressHydrationWarning>
                <body className={`${inter.className}`}>
                    <ThemeProvider>{children}</ThemeProvider>
                </body>
            </html>
        </Provider>
    );
}
