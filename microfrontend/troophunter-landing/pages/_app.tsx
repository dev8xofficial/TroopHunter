// import { Analytics } from '@vercel/analytics/react';
import React from 'react';

import type { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
      {/* <Analytics /> */}
    </>
  );
};

export default App;
