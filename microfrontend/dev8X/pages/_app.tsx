import Head from 'next/head';
import { ReactLenis, LenisRef } from '../utils/lenis';
import { Provider } from 'jotai';
import { Analytics } from '@vercel/analytics/react';

import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <ReactLenis
        root
        autoRaf={true}
        options={{
          prevent: (node) => node === document.body
        }}
      >
        <Provider>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </Head>
          <Component {...pageProps} />
          <Analytics />
        </Provider>
      </ReactLenis>
    </>
  );
}
