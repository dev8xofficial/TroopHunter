import React, { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { Provider } from 'jotai';
import { LenisProvider, useLenis } from '../hooks/LenisContext';
import Layout from '../components/Surfaces/Layout';
import { useRouter } from 'next/router';
import Clarity from '@microsoft/clarity';

import '../styles/globals.css';

// ✅ Helper component to handle scroll-to-top on route change
const ScrollToTop: React.FC = () => {
  const router = useRouter();
  const lenis = useLenis(); // get Lenis instance

  useEffect(() => {
    const handleRouteChange = () => {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, lenis]);

  return null;
};

export default function App({ Component, pageProps }) {
  const getLayout = (Component as any).getLayout || ((page: React.ReactNode) => <Layout>{page}</Layout>);

  const isProduction = process.env.NODE_ENV === 'production';
  // const clarity = process.env.CLARITY;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Use HARD value instead of clarity variable due to unknown undefined problem in clarity api call */}
      {isProduction && Clarity.init("uedvnt67nj")}

      <LenisProvider>
        <Provider>
          <ScrollToTop /> {/* ✅ Scroll handler added */}
          {getLayout(<Component {...pageProps} />)}
        </Provider>
      </LenisProvider>
    </>
  );
}
