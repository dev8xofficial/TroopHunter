'use client';

import React, { lazy, Suspense } from 'react';

import dynamic from 'next/dynamic';
import Head from 'next/head';

import Loader from '../components/Feedback/Loader/Loader';
import { getTroopHunterPublicUrl } from '../utils/helpers';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const App = lazy(async () => await import('troophunter/src/App'));

// Dynamically import BrowserRouter only on the client side
const BrowserRouter = dynamic(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
  async () => (await import('react-router-dom')).BrowserRouter,
  { ssr: false } // Disable SSR for this component
);

export const ForgotPassword: React.FC = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Forgot Password - TroopHunter</title>
        <meta name="description" content="Forgot your password? Recover it here and regain access to your TroopHunter account." />
        <link rel="canonical" href={`${getTroopHunterPublicUrl()}/forgot-password}`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Forgot Password - TroopHunter" />
        <meta property="og:description" content="Forgot your password? Recover it here and regain access to your TroopHunter account." />
        <meta property="og:url" content={`${getTroopHunterPublicUrl()}/forgot-password}`} />
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content={`${getTroopHunterPublicUrl()}/logo/logo-social.png`} />
        <meta property="og:image:secure_url" content={`${getTroopHunterPublicUrl()}/logo/logo-social.png`}></meta>
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="TroopHunter"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Forgot Password - TroopHunter" />
        <meta name="twitter:description" content="Forgot your password? Recover it here and regain access to your TroopHunter account." />
        <meta name="twitter:image" content={`${getTroopHunterPublicUrl()}/logo/logo-social.png`} />
        <meta name="twitter:site" content="@TroopHunter" />
      </Head>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <App />
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default ForgotPassword;
