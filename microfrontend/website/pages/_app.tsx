import Head from 'next/head';
import '../styles/globals.css';
import { Analytics } from '@vercel/analytics/react';

import './Home/index.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
