'use client';

import React, { Suspense } from 'react';

import dynamic from 'next/dynamic';
import Head from 'next/head';

import NoSSR from '../components/NoSSR';
import { getTroopHunterPublicUrl } from '../utils/helpers';

// Create a client-side only component that wraps the remote app
const RemoteApp = dynamic(async () => await import('troophunter/src/App'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

// Create a client-side only component that wraps BrowserRouter
const BrowserRouterWrapper = dynamic(
  async () =>
    await import('react-router-dom').then((mod) => {
      const { BrowserRouter } = mod;
      return function BrowserRouterComponent({ children }: { children: React.ReactNode }) {
        return <BrowserRouter>{children}</BrowserRouter>;
      };
    }),
  { ssr: false }
);

const ResetPassword = (): JSX.Element => {
  return (
    <NoSSR>
      <Head>
        <title>Reset Password - TroopHunter</title>
        <meta name="description" content="Reset your password to access your TroopHunter account securely." />
        <link rel="canonical" href={`${getTroopHunterPublicUrl()}/reset-password/:id/:token`} />
        <meta property="og:title" content="Reset Password - TroopHunter" />
        <meta property="og:description" content="Reset your password to access your TroopHunter account securely." />
        <meta property="og:url" content={`${getTroopHunterPublicUrl()}`} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content={`${getTroopHunterPublicUrl()}/logo/logo-social.png`} />
        <meta property="og:image:secure_url" content={`${getTroopHunterPublicUrl()}/logo/logo-social.png`} />
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="TroopHunter" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Reset Password - TroopHunter" />
        <meta name="twitter:description" content="Reset your password to access your TroopHunter account securely." />
        <meta name="twitter:image" content={`${getTroopHunterPublicUrl()}/logo/logo-social.png`} />
        <meta name="twitter:site" content="@TroopHunter" />
      </Head>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouterWrapper>
          <RemoteApp />
        </BrowserRouterWrapper>
      </Suspense>
    </NoSSR>
  );
};

export default ResetPassword;
