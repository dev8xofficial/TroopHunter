import React, { useEffect, useRef, useState } from 'react';

import { useLocation } from 'react-router-dom';

import AppRouter from './routes/AppRouter';
import { initializeGA, logPageView } from './utils/analytics';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const preloader = preloaderRef.current;
    if (preloader != null) {
      setTimeout(() => {
        preloader.classList.toggle('hidden');
        setLoading(false);
      }, 2000);
    } else {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    initializeGA(import.meta.env.VITE_GOOGLE_ANALYTICS);
  }, []);

  useEffect(() => {
    logPageView(location.pathname + location.search);
  }, [location]);

  return loading ? (
    <p className="text-danger text-center"></p>
  ) : (
    <>
      <div className="fixed left-0 top-0 z-50 flex h-screen w-screen touch-none flex-col items-center justify-center bg-white" ref={preloaderRef}>
        <img className="mx-auto h-8 lg:h-10 2xl:h-12" src={`${import.meta.env.VITE_TROOPHUNTER_PUBLIC_URL}/logo/logo.svg`} alt="TroopHunter" />
      </div>
      <AppRouter />
    </>
  );
};

export default App;
