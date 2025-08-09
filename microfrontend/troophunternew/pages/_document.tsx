import React from 'react';

import { Html, Head, Main, NextScript } from 'next/document';

const Document = (): JSX.Element => {
  return (
    <Html lang="en">
      <Head>
        {/* Progressive Web Application Settings */}
        <link rel="manifest" href="/webmanifest/site.webmanifest" />
        {/* PWA status bar color */}
        <meta name="theme-color" content="#f3f4f6" />

        {/* Apple icons */}
        {/* iPhone 6 Plus, iPhone 7, iPhone 8, etc. */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon/apple-touch-icon.png" />

        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      </Head>
      <body className="font-poppins text-zinc-700">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
