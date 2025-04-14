import React, { useEffect, useRef, useState } from 'react';

import { useLocation } from 'react-router-dom';

import AppRouter from './routes/AppRouter';
import { initializeGA, logPageView } from './utils/analytics';
import { getTroopHunterPublicUrl } from './utils/helpers';

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
      <div className="fixed left-0 top-0 z-50 flex h-screen w-screen touch-none flex-col items-center justify-center bg-white" ref={preloaderRef}>
        <img className="mx-auto h-8 lg:h-10 2xl:h-12" src={`${getTroopHunterPublicUrl()}/logo/logo.svg`} alt="TroopHunter" />
      </div>
      <AppRouter />
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
