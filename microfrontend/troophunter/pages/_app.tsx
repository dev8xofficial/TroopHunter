/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState, type ReactElement, type ReactNode } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { ToastContainer, Flip } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '../store';
import { initializeGA, logPageView } from '../utils/analytics';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page);

  // Preloader
  useEffect(() => {
    const preloader = preloaderRef.current;
    if (preloader != null) {
      setTimeout(() => {
        preloader.classList.add('hidden');
        setLoading(false);
      }, 2000);
    } else {
      setLoading(false);
    }
  }, []);

  // Google Analytics initialization
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS != null) {
      initializeGA(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS);
    }
  }, []);

  // Log page views on route change
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handleRouteChange = (url: string) => {
      logPageView(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>

        {loading && (
          <div className="fixed left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-white" ref={preloaderRef}>
            <img className="mx-auto h-8 lg:h-10 2xl:h-12" src="/logo/logo.svg" alt="TroopHunter" />
          </div>
        )}

        {getLayout(<Component {...pageProps} />)}

        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover transition={Flip} />
      </PersistGate>
    </Provider>
  );
};

export default App;
