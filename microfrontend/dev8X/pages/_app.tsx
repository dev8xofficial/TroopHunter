import Head from 'next/head';
import { Provider } from 'jotai';
import { Analytics } from '@vercel/analytics/react';
import { usePageAnimations } from '../hooks/usePageAnimations';
import { LenisProvider } from '../hooks/LenisContext';

import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  usePageAnimations();

  return (
    <>
      <LenisProvider>
        <Provider>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </Head>
          <Component {...pageProps} />
          <Analytics />
        </Provider>
      </LenisProvider>
    </>
  );
}
