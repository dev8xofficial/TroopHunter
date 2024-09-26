/* eslint-disable prettier/prettier */
import React from 'react';

import { Link } from 'react-router-dom';

const Header: React.FC = (): JSX.Element => {
  return (
    <>
      <header className="row-start-1 row-end-auto col-start-1 col-end-auto transform transition-[background_.4s_ease-in-out] bg-transparent">
        <div className="items-center gap-[3.75rem] grid-template-columns-auto-1fr-auto grid px-[var(--container-gutter)] w-full h-[5.3125rem]">
          <a className="transform transition-[color_.4s_ease-in-out] z-10 text-[var(--theme-logo,var(--theme-secondary))]" aria-hidden="true" tabIndex={-1} href="/">
            <span className="hidden">Home</span>
            <img className="mx-auto h-6 lg:h-8" src={`${import.meta.env.VITE_TROOPHUNTER_PUBLIC_URL}/logo.svg`} alt="TroopHunter" />
          </a>
          <div></div>
          <div className="transform transition-[color_.4s_ease-in-out] z-10 color-[var(--theme-header-face,var(--theme-secondary))] col-start-3 col-end-auto h-[50px] w-[50px] touch-none relative">
            <div className="right-0 top-2/4 absolute">
              <div className="transform -translate-y-2/4">
                <Link className="bg-none appearance-none p-0 m-0 b-0 text-[inherit] no-underline inline-block text-[clamp(.9375rem,.9920634921vw,1.246875rem)]" target="" to="/signin">
                  <span className="relative cursor-pointer transform transition-[color_.15s,background_.15s] whitespace-pre no-underline rounded-[6.25rem] text-[var(--text-color,#fff)] bg-[var(--default-primary,--theme-secondary)] font-medium leading-[1] p-[.6666666667em_.8em] gap-[.5em] var-text-icon-background-color-anchor gap-y-[.6666666667em] items-center inline-flex ">
                    Signin
                    <svg className="block min-h-0 min-w-0 transform transition-[color .15s] text-white w-auto h-[.9333333333em]" xmlns="http://www.w3.org/2000/svg" width="14" height="13" fill="none" strokeWidth="0.5" viewBox="0 0 14 13">
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
