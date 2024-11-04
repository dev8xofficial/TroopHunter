import type { Metadata } from 'next';

export const viewport = 'width=device-width, initial-scale=1';
export const themeColor = '#000000';

export const metadata: Metadata = {
  charset: 'utf-8',

  // Progressive Web Application Settings
  manifest: `${process.env.NEXT_PUBLIC_TROOPHUNTER_URL}/webmanifest/site.webmanifest`,

  // Icons for various devices and browsers
  icons: {
    icon: [
      { rel: 'icon', type: 'image/x-icon', url: `${process.env.NEXT_PUBLIC_TROOPHUNTER_URL}/favicon/favicon.ico` },
      { rel: 'icon', type: 'image/png', sizes: '32x32', url: `${process.env.NEXT_PUBLIC_TROOPHUNTER_URL}/favicon/favicon-32x32.png` },
      { rel: 'icon', type: 'image/png', sizes: '16x16', url: `${process.env.NEXT_PUBLIC_TROOPHUNTER_URL}/favicon/favicon-16x16.png` }
    ],
    appleTouchIcon: `${process.env.NEXT_PUBLIC_TROOPHUNTER_URL}/apple-touch-icon/apple-touch-icon.png`
  },

  title: 'Sign In - TroopHunter',
  description: 'Sign in to TroopHunter to access your account and manage your lead generation activities.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_TROOPHUNTER_URL}/signin`
  },
  openGraph: {
    title: 'Sign In - TroopHunter',
    description: 'Sign in to TroopHunter to access your account and manage your lead generation activities.',
    url: `${process.env.NEXT_PUBLIC_TROOPHUNTER_URL}/signin`,
    locale: 'en_US',
    type: 'website',
    siteName: 'TroopHunter',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_TROOPHUNTER_URL}/logo/logo-social.png`,
        secureUrl: `${process.env.NEXT_PUBLIC_TROOPHUNTER_URL}/logo/logo-social.png`,
        alt: 'TroopHunter Logo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign In - TroopHunter',
    description: 'Sign in to TroopHunter to access your account and manage your lead generation activities.',
    images: [`${process.env.NEXT_PUBLIC_TROOPHUNTER_URL}/logo/logo-social.png`],
    site: '@TroopHunter'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
