// pages/404.tsx
import React from 'react';

import Link from 'next/link';

const Custom404: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-6">Oops! Page Not Found</p>
      <p className="text-lg text-gray-500 mb-8">The page you’re looking for doesn’t exist or has been moved.</p>
      <Link href="/" className="b-0 m-0 inline-block appearance-none bg-none p-0 text-[clamp(.9375rem,.9920634921vw,1.246875rem)] text-[inherit] no-underline">
        <span className="var-text-icon-background-color-anchor relative inline-flex transform cursor-pointer items-center gap-[.5em] gap-y-[.6666666667em] whitespace-pre rounded-[6.25rem] bg-[var(--default-primary,--theme-secondary)] p-[.6666666667em_.8em] font-medium leading-[1] text-[var(--text-color,#fff)] no-underline transition-[color_.15s,background_.15s] ">
          Go Back Home
          <svg className="transition-[color .15s] block h-[.9333333333em] min-h-0 w-auto min-w-0 transform text-white" xmlns="http://www.w3.org/2000/svg" width="14" height="13" fill="none" strokeWidth="0.5" viewBox="0 0 14 13">
            <path fill="currentColor" stroke="currentColor" d="M1 5.816H.75v1.326h10.014l-4.008 3.907-.173.168.162.179.563.62.174.191.186-.18 5.506-5.37.184-.178-.184-.18L7.668.932l-.186-.18-.174.191-.563.62-.162.178.173.169 4.008 3.907H1Z" vectorEffect="non-scaling-stroke"></path>
          </svg>
        </span>
      </Link>
    </div>
  );
};

export default Custom404;
