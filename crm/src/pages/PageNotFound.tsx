import React from 'react';

import { Helmet } from 'react-helmet-async';

const PageNotFound: React.FC = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - TroopHunter</title>
        <meta name="description" content="The page you are looking for does not exist on TroopHunter. Return to the homepage or contact support." />
        <link rel="canonical" href={`${import.meta.env.VITE_TROOPHUNTER_PUBLIC_URL}/page-not-found`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Page Not Found - TroopHunter" />
        <meta property="og:description" content="The page you are looking for does not exist on TroopHunter. Return to the homepage or contact support." />
        <meta property="og:url" content={`${import.meta.env.VITE_TROOPHUNTER_PUBLIC_URL}`} />
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content={`${import.meta.env.VITE_TROOPHUNTER_PUBLIC_URL}/logo-social.png`} />
        <meta property="og:image:secure_url" content={`${import.meta.env.VITE_TROOPHUNTER_PUBLIC_URL}/logo-social.png`}></meta>
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="TroopHunter"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Page Not Found - TroopHunter" />
        <meta name="twitter:description" content="The page you are looking for does not exist on TroopHunter. Return to the homepage or contact support." />
        <meta name="twitter:image" content={`${import.meta.env.VITE_TROOPHUNTER_PUBLIC_URL}/logo-social.png`} />
        <meta name="twitter:site" content="@TroopHunter" />
      </Helmet>

      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div>
          <p className="text-base font-semibold text-red-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="mt-10">
            <a href="/signIn" className="text-sm font-semibold text-indigo-600">
              <span className="mr-2" aria-hidden="true">
                &larr;
              </span>
              Back to home
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default PageNotFound;
