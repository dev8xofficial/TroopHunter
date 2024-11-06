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

export const SettingsProfile: React.FC = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Profile Settings - TroopHunter</title>
        <meta name="description" content="Update your profile settings on TroopHunter to keep your account information up to date." />
        <link rel="canonical" href={`${getTroopHunterPublicUrl()}/settings/profile`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Profile Settings - TroopHunter" />
        <meta property="og:description" content="Update your profile settings on TroopHunter to keep your account information up to date." />
        <meta property="og:url" content={`${getTroopHunterPublicUrl()}/settings/profile`} />
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content={`${getTroopHunterPublicUrl()}/logo/logo-social.png`} />
        <meta property="og:image:secure_url" content={`${getTroopHunterPublicUrl()}/logo/logo-social.png`}></meta>
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="TroopHunter"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Profile Settings - TroopHunter" />
        <meta name="twitter:description" content="Update your profile settings on TroopHunter to keep your account information up to date." />
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

export default SettingsProfile;
