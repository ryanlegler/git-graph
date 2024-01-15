import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { css } from 'styled-system/css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Better Github Contribution Graph',
    description: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const bodyStyles = css({
        color: '#fff',
    });
    return (
        <html lang='en'>
            <body className={`${inter.className} ${bodyStyles}`}>{children}</body>
        </html>
    );
}
