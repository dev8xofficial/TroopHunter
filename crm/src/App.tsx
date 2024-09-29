import React, { useEffect, useRef, useState } from 'react';

import AppRouter from './routes/AppRouter';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const preloaderRef = useRef<HTMLDivElement>(null);

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

  return loading ? (
    <p className="text-danger text-center">Failed to load app</p>
  ) : (
    <>
      <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-white" ref={preloaderRef}>
        <img className="mx-auto h-8 animate-bounce lg:h-10" src={`${import.meta.env.VITE_TROOPHUNTER_PUBLIC_URL}/logo/logo.svg`} alt="TroopHunter" />
      </div>
      <AppRouter />
    </>
  );
};

export default App;
