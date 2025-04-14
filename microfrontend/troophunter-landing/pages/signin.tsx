'use client';

import React, { lazy, Suspense } from 'react';

import dynamic from 'next/dynamic';
import Head from 'next/head';

import Loader from '../components/Feedback/Loader/Loader';
import { getTroopHunterPublicUrl } from '../utils/helpers';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const App = lazy(async () => await import('troophunter/App'));

// Dynamically import BrowserRouter only on the client side
const BrowserRouter = dynamic(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
  async () => (await import('react-router-dom')).BrowserRouter,
  { ssr: false } // Disable SSR for this component
);

export const SignIn: React.FC = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Sign In - TroopHunter</title>
        <meta name="description" content="Sign in to TroopHunter to access your account and manage your lead generation activities." />
        <link rel="canonical" href={`${getTroopHunterPublicUrl()}/signin`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Sign In - TroopHunter" />
        <meta property="og:description" content="Sign in to TroopHunter to access your account and manage your lead generation activities." />
        <meta property="og:url" content={`${getTroopHunterPublicUrl()}/signin`} />
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content={`${getTroopHunterPublicUrl()}/logo/logo-social.png`} />
        <meta property="og:image:secure_url" content={`${getTroopHunterPublicUrl()}/logo/logo-social.png`}></meta>
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="TroopHunter"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sign In - TroopHunter" />
        <meta name="twitter:description" content="Sign in to TroopHunter to access your account and manage your lead generation activities." />
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

export default SignIn;
