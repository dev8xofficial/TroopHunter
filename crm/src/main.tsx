import React from 'react';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer, Flip } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import { store, persistor } from './store';

// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover transition={Flip} />
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
