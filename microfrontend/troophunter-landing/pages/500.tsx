// pages/500.tsx
import React from 'react';

import Link from 'next/link';

const Custom500: React.FC = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div>
        <p className="text-base font-semibold text-red-600">500</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Server Error</h1>
        <p className="mt-6 text-base leading-7 text-gray-600">Something went wrong on our end. Please try again later.</p>
        <div className="mt-10">
          <Link href="/" className="text-sm font-semibold text-indigo-600">
            <span className="mr-2" aria-hidden="true">
              &larr;
            </span>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Custom500;
