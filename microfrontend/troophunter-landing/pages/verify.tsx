'use client';

import React, { lazy, Suspense } from 'react';

import dynamic from 'next/dynamic';
import Head from 'next/head';

import { getTroopHunterPublicUrl } from '../utils/helpers';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const App = lazy(async () => await import('troophunter/src/App'));

// Dynamically import BrowserRouter only on the client side
const BrowserRouter = dynamic(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
  async () => (await import('react-router-dom')).BrowserRouter,
  { ssr: false } // Disable SSR for this component
);

export const Lead: React.FC = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Account Verified - TroopHunter</title>
        <meta name="description" content="Your account has been successfully verified. You can now access all features of TroopHunter." />
        <link rel="canonical" href={`${getTroopHunterPublicUrl()}/verify/:id/:token`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Account Verified - TroopHunter" />
        <meta property="og:description" content="Your account has been successfully verified. You can now access all features of TroopHunter." />
        <meta property="og:url" content={`${getTroopHunterPublicUrl()}`} />
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content={`${getTroopHunterPublicUrl()}/logo/logo-social.png`} />
        <meta property="og:image:secure_url" content={`${getTroopHunterPublicUrl()}/logo/logo-social.png`}></meta>
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="TroopHunter"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Account Verified - TroopHunter" />
        <meta name="twitter:description" content="Your account has been successfully verified. You can now access all features of TroopHunter." />
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

export default Lead;
