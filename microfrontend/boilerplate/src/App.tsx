import React, { useEffect, useRef, useState } from 'react';

import { useLocation } from 'react-router-dom';

// import AppRouter from './routes/AppRouter';
import { initializeGA, logPageView } from './utils/analytics';
// import { getTroopHunterPublicUrl } from './utils/helpers';

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
    if (process.env.GOOGLE_ANALYTICS != null) initializeGA(process.env.GOOGLE_ANALYTICS);
  }, []);

  useEffect(() => {
    logPageView(location.pathname + location.search);
  }, [location]);

  return loading ? (
    <p className="text-danger text-center"></p>
  ) : (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="relative mx-auto w-full max-w-3xl">
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="floating h-96 w-96 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-30 blur-3xl"></div>
          </div>

          <h1 className="bg-transparent bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-5xl font-bold sm:text-7xl">🚀 Dev8X</h1>
          <p className="mt-6 text-lg text-gray-300 sm:text-xl">Expert solutions in app, web, and backend development. Empowering your digital transformation journey.</p>
        </div>

        <div id="countdown" className="mt-12 text-2xl font-semibold text-gray-300 sm:text-4xl">
          Launching in <span id="timer" className="text-purple-400"></span>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          <div className="rounded-lg bg-gray-800 p-6 shadow-lg transition hover:bg-gray-700">
            <h3 className="text-lg font-semibold text-purple-400">App Development</h3>
            <p className="mt-2 text-gray-300">Cutting-edge mobile app solutions tailored to your needs.</p>
          </div>
          <div className="rounded-lg bg-gray-800 p-6 shadow-lg transition hover:bg-gray-700">
            <h3 className="text-lg font-semibold text-purple-400">Web Development</h3>
            <p className="mt-2 text-gray-300">Stunning websites that deliver exceptional user experiences.</p>
          </div>
          <div className="rounded-lg bg-gray-800 p-6 shadow-lg transition hover:bg-gray-700">
            <h3 className="text-lg font-semibold text-purple-400">Backend Systems</h3>
            <p className="mt-2 text-gray-300">Robust backend architecture for unparalleled performance.</p>
          </div>
        </div>

        <div className="mt-12 flex space-x-6">
          <a href="/" className="text-gray-400 hover:text-purple-500">
            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.46 6c-.77.35-1.59.59-2.46.7a4.18 4.18 0 001.84-2.3c-.81.48-1.7.83-2.66 1a4.15 4.15 0 00-7.11 3.77A11.75 11.75 0 012 5.14a4.16 4.16 0 001.29 5.53 4.12 4.12 0 01-1.88-.52v.05a4.15 4.15 0 003.32 4.07 4.15 4.15 0 01-1.87.07 4.17 4.17 0 003.88 2.88A8.32 8.32 0 012 18.05a11.72 11.72 0 006.29 1.85c7.54 0 11.67-6.25 11.67-11.67l-.01-.53A8.33 8.33 0 0024 4.56a8.26 8.26 0 01-2.54.7z" />
            </svg>
          </a>
          <a href="/" className="text-gray-400 hover:text-purple-500">
            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.99 3.657 9.12 8.438 9.878V14.89H7.898v-2.89h2.54V9.843c0-2.506 1.493-3.89 3.776-3.89 1.095 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.563v1.89h2.773l-.443 2.89h-2.33v6.99C18.344 21.12 22 16.99 22 12z" />
            </svg>
          </a>
        </div>

        <footer className="mt-12 text-sm text-gray-500">&copy; 2024 [Your Tech Company]. All rights reserved.</footer>
      </div>
    </>
  );
};

export default App;

// import React, { useEffect, useRef, useState } from 'react';

// import { HelmetProvider } from 'react-helmet-async';
// import { Provider } from 'react-redux';
// import { useLocation } from 'react-router-dom';
// import { ToastContainer, Flip } from 'react-toastify';
// import { PersistGate } from 'redux-persist/integration/react';

// import AppRouter from './routes/AppRouter';
// import { store, persistor } from './store';
// import { initializeGA, logPageView } from './utils/analytics';
// import { getTroopHunterPublicUrl } from './utils/helpers';

// import 'react-toastify/dist/ReactToastify.css';
// // import './index.css';
// import './css/website.css';

// const App: React.FC = () => {
//   const [loading, setLoading] = useState<boolean>(true);
//   const preloaderRef = useRef<HTMLDivElement>(null);
//   const location = useLocation();

//   useEffect(() => {
//     const preloader = preloaderRef.current;
//     if (preloader != null) {
//       setTimeout(() => {
//         preloader.classList.toggle('hidden');
//         setLoading(false);
//       }, 1000);
//     } else {
//       setLoading(false);
//     }
//   }, [loading]);

//   useEffect(() => {
//     if (process.env.GOOGLE_ANALYTICS != null) initializeGA(process.env.GOOGLE_ANALYTICS);
//   }, []);

//   useEffect(() => {
//     logPageView(location.pathname + location.search);
//   }, [location]);

//   return loading ? (
//     <p className="text-danger text-center"></p>
//   ) : (
//     <>
//       <div className="fixed left-0 top-0 z-50 flex h-screen w-screen touch-none flex-col items-center justify-center bg-white" ref={preloaderRef}>
//         <img className="mx-auto h-8 lg:h-10 2xl:h-12" src={`${getTroopHunterPublicUrl()}/logo/logo.svg`} alt="TroopHunter" />
//       </div>
//       <Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//           <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover transition={Flip} />

//           <HelmetProvider>
//             <AppRouter />
//           </HelmetProvider>
//         </PersistGate>
//       </Provider>
//     </>
//   );
// };

// export default App;
