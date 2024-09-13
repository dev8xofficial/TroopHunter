import React from 'react';

const PageNotFound: React.FC = (): JSX.Element => {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div>
          <p className="text-base font-semibold text-red-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="mt-10">
            <a href="/signIn" className="text-sm font-semibold text-indigo-600">
              <span className="mr-2" aria-hidden="true">
                &larr;
              </span>
              Back to home
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default PageNotFound;
