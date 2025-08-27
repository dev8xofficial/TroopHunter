import Head from 'next/head';
import { Provider } from 'jotai';
import { LenisProvider } from '../hooks/LenisContext';

import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <LenisProvider>
        <Provider>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </Head>
          <Component {...pageProps} />
        </Provider>
      </LenisProvider>
    </>
  );
}
