import React, { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { Provider } from 'jotai';
import { LenisProvider, useLenis } from '../hooks/LenisContext';
import Layout from '../components/Surfaces/Layout';
import { useRouter } from 'next/router';

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
  const getLayout =
    (Component as any).getLayout || ((page: React.ReactNode) => <Layout>{page}</Layout>);

  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {isProduction && (
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    })(window, document, "clarity", "script", "${process.env.CLARITY}");`,
          }}
        />
      )}

      <LenisProvider>
        <Provider>
          <ScrollToTop /> {/* ✅ Scroll handler added */}
          {getLayout(<Component {...pageProps} />)}
        </Provider>
      </LenisProvider>
    </>
  );
}
