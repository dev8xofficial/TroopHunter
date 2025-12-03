import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { Provider } from 'jotai';
import { LenisProvider } from '../hooks/LenisContext';
import Layout from '../components/Surfaces/Layout';
import { useCountry } from '../hooks/useCountry';

import '../styles/globals.css';

const CountryBootstrapper: React.FC = () => {
  useCountry();
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

      {/* ✅ Only load Microsoft Clarity in production */}
      {isProduction && (
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    })(window, document, "clarity", "script", "${process.env.CLARITY}");`
          }}
        />
      )}

      <LenisProvider>
        <Provider>
          <CountryBootstrapper />
          {getLayout(<Component {...pageProps} />)}
        </Provider>
      </LenisProvider>
    </>
  );
}
