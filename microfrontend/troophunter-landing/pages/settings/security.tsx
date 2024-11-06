'use client';

import React, { lazy, Suspense } from 'react';

import dynamic from 'next/dynamic';
import Head from 'next/head';

import { getTroopHunterPublicUrl } from '../../utils/helpers';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const App = lazy(async () => await import('troophunter/src/App'));

// Dynamically import BrowserRouter only on the client side
const BrowserRouter = dynamic(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
  async () => (await import('react-router-dom')).BrowserRouter,
  { ssr: false } // Disable SSR for this component
);

export const SettingsSecurity: React.FC = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Security Settings - TroopHunter</title>
        <meta name="description" content="Manage your security settings on TroopHunter to protect your account and data." />
        <link rel="canonical" href={`${getTroopHunterPublicUrl()}/settings/security`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Security Settings - TroopHunter" />
        <meta property="og:description" content="Manage your security settings on TroopHunter to protect your account and data." />
        <meta property="og:url" content={`${getTroopHunterPublicUrl()}/settings/security`} />
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content={`${getTroopHunterPublicUrl()}/logo/logo-social.png`} />
        <meta property="og:image:secure_url" content={`${getTroopHunterPublicUrl()}/logo/logo-social.png`}></meta>
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="TroopHunter"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Security Settings - TroopHunter" />
        <meta name="twitter:description" content="Manage your security settings on TroopHunter to protect your account and data." />
        <meta name="twitter:image" content={`${getTroopHunterPublicUrl()}/logo/logo-social.png`} />
        <meta name="twitter:site" content="@TroopHunter" />
      </Head>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default SettingsSecurity;
