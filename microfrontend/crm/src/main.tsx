import React from 'react';

import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, Flip } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import { store, persistor } from './store';

// Import css files
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover transition={Flip} />

        <HelmetProvider>
          <Router>
            <App />
          </Router>
        </HelmetProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
