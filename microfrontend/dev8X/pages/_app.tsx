import Head from 'next/head';
import Script from 'next/script';
import { Provider } from 'jotai';
import { LenisProvider } from '../hooks/LenisContext';

import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Script
        id="microsoft-clarity"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                  (function(c,l,a,r,i,t,y){
                      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                  })(window, document, "clarity", "script", "turxdn6oca");
                `
        }}
      />

      <LenisProvider>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </LenisProvider>
    </>
  );
}
