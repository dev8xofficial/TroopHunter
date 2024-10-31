'use client';

import React, { lazy, Suspense } from 'react';

import { BrowserRouter } from 'react-router-dom';

const App = lazy(async () => await import('module/src/App'));

const Signup: React.FC = (): JSX.Element => {
  return (
    <>
      <BrowserRouter>
        <Suspense>
          <App />
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default Signup;
