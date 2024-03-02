import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Twitter } from 'next/dist/lib/metadata/types/twitter-types';

const inter = Inter({ subsets: ['latin'] });

const siteName = 'Gitgraph.dev';
const title = 'Embeddable Github Contribution Graph';
const description =
    'Get a personal view of your Github contribution history in just a few clicks. Customize the look and feel as you see fit, and embed it on your site in minutes.';

const ogImage = 'https://www.gitgraph.dev/og-image.png';

const twitter: Twitter = {
    card: 'summary_large_image',
    description,
    site: '@site',
    title,
    images: [ogImage],
};

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://www.gitgraph.dev/',
        siteName,
        images: [ogImage],
    },
    twitter,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' className='dark' style={{ colorScheme: 'dark' }}>
            <body className={`graphPaper bg-primary-background h-full ${inter}`}>{children}</body>
        </html>
    );
}
