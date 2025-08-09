/* eslint-disable @next/next/no-img-element */
import React from 'react';

import Link from 'next/link';

const Header: React.FC = (): JSX.Element => {
  return (
    <>
      <header className="col-start-1 col-end-auto row-start-1 row-end-auto transform bg-transparent transition-[background_.4s_ease-in-out]">
        <div className="grid-template-columns-auto-1fr-auto grid h-[5.3125rem] w-full items-center gap-[3.75rem] px-[var(--container-gutter)]">
          <Link className="z-10 transform text-[var(--theme-logo,var(--theme-secondary))] transition-[color_.4s_ease-in-out]" aria-hidden="true" tabIndex={-1} href="/">
            <span className="hidden">Home</span>
            <img className="mx-auto !h-6 lg:!h-8" src="/logo/logo.svg" alt="TroopHunter" width={50} height={50} style={{ width: 'auto', height: 'auto' }} />
          </Link>
          <div></div>
          <div className="color-[var(--theme-header-face,var(--theme-secondary))] relative z-10 col-start-3 col-end-auto h-[50px] w-[50px] transform touch-none transition-[color_.4s_ease-in-out]">
            <div className="absolute right-0 top-2/4">
              <div className="-translate-y-2/4 transform">
                <Link className="b-0 m-0 inline-block appearance-none bg-none p-0 text-[clamp(.9375rem,.9920634921vw,1.246875rem)] text-[inherit] no-underline" target="" href="/signin">
                  <span className="var-text-icon-background-color-anchor relative inline-flex transform cursor-pointer items-center gap-[.5em] gap-y-[.6666666667em] whitespace-pre rounded-[6.25rem] bg-[var(--default-primary,--theme-secondary)] p-[.6666666667em_.8em] font-medium leading-[1] text-[var(--text-color,#fff)] no-underline transition-[color_.15s,background_.15s] ">
                    Signin
                    <svg className="transition-[color .15s] block h-[.9333333333em] min-h-0 w-auto min-w-0 transform text-white" xmlns="http://www.w3.org/2000/svg" width="14" height="13" fill="none" strokeWidth="0.5" viewBox="0 0 14 13">
                      <path fill="currentColor" stroke="currentColor" d="M1 5.816H.75v1.326h10.014l-4.008 3.907-.173.168.162.179.563.62.174.191.186-.18 5.506-5.37.184-.178-.184-.18L7.668.932l-.186-.18-.174.191-.563.62-.162.178.173.169 4.008 3.907H1Z" vectorEffect="non-scaling-stroke"></path>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
