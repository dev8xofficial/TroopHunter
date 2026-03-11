import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/shared/providers/Providers';
import '@/shared/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: {
    default: 'Ferrari',
    template: '%s | Ferrari'
  },
  description: 'A production-ready Next.js 16 microfrontend built with Feature-Sliced Design.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_ASSET_HOST || 'http://localhost:3007'),
  openGraph: {
    title: 'Ferrari',
    description: 'A production-ready Next.js 16 microfrontend.',
    type: 'website',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ferrari',
    description: 'A production-ready Next.js 16 microfrontend.'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff'
};

export default function RootLayout({ children, modal }: { children: React.ReactNode; modal?: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>
          {children}
          {modal}
        </Providers>
        <div id="smooth-modal" />
      </body>
    </html>
  );
}
