/* eslint-disable prettier/prettier */
import React from 'react';

const Header: React.FC = (): JSX.Element => {
  return (
    <>
      <header className="col-start-1 col-end-auto row-start-1 row-end-auto transform bg-transparent transition-[background_.4s_ease-in-out]">
        <div className="grid-template-columns-auto-1fr-auto grid h-[5.3125rem] w-full items-center gap-[3.75rem] px-[var(--container-gutter)]">
          <a className="z-10 transform text-[var(--theme-logo,var(--theme-secondary))] transition-[color_.4s_ease-in-out]" aria-hidden="true" tabIndex={-1} href="/">
            <span className="hidden">Home</span>
            <img className="mx-auto h-6 lg:h-8" src="/logo.svg" alt="Dev8X" />

          </a>

            <div>
              <div className="text-[rgba(18,3,42,.7)] mb-[5rem] items-center gap-[3.75rem] w-full h-[5.3125rem] px-[clamp(2.5rem,2.6455026455vw,3.325rem)]">
                {/* <nav className="fixed left-1/2 transform -translate-x-1/2 top-[1.25rem] z-[101] md:bottom-auto rounded-full shadow-lg bg-[hsla(0,0%,100%,.7)] bg-t p-[.4375rem]">
                  <ul className="flex justify-center items-center gap-[1.5rem] list-none m-0">
                    <li>
                      <a href="http://localhost:5173/" className="text-[#12032a] font-medium text-[1rem] p-[.5rem_.75rem] block transition-colors duration-300 ease-linear hover:text-[#b488f1]">
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="http://localhost:5173/about" className="text-[#12032a] font-medium text-[.9375rem] p-[.5rem_.75rem] block transition-colors duration-300 ease-linear hover:text-[#b488f1]">
                        About
                      </a>
                    </li>
                    <li>
                      <a href="http://localhost:5173/work" className="text-[#12032a] font-medium text-[1rem] p-[.5rem_.75rem] block transition-colors duration-300 ease-linear hover:text-[#b488f1]">
                        Work
                      </a>
                    </li>
                    <li className="rounded-[inherit]  p-[.4375rem] grid-flow-col grid m-0  row-start-1 -col-start-1 row-end-auto col-end-auto">
                      <div className="rounded-[inherit] relative transition-shadow duration-150 shadow-lg hover:shadow-xl p-[.5rem]">
                        <button className="z-[2] cursor-pointer leading-none relative no-underline font-medium text-[1rem] p-[.5rem_.75rem] block appearance-none  bg-none rounded-full text-black hover:text-[#9b62e2]">
                          Expertise
                        </button>
                      </div>
                    </li>
                    <li>
                      <a href="http://localhost:5173/" className="text-[#12032a] font-medium text-[1rem] p-[.5rem_.75rem] block transition-colors duration-300 ease-linear hover:text-[#b488f1]">
                        Contact
                      </a>
                    </li>
                  </ul>
                </nav> */}
              </div>
            </div>

          <div className="color-[var(--theme-header-face,var(--theme-secondary))] relative z-10 col-start-3 col-end-auto h-[50px] w-[50px] transform touch-none transition-[color_.4s_ease-in-out]">
            <div className="absolute right-0 top-2/4">
              <div className="-translate-y-2/4 transform">
                {/* <a className="b-0 m-0 inline-block appearance-none  p-0 text-[clamp(.9375rem,.9920634921vw,1.246875rem)] text-[inherit] no-underline" target="" href="/signin">
                  <span className="var-text-icon-background-color-anchor relative inline-flex transform cursor-pointer items-center gap-[.5em] gap-y-[.6666666667em] whitespace-pre rounded-[6.25rem] bg-[var(--default-primary,--theme-secondary)] p-[.6666666667em_.8em] font-medium leading-[1] text-[var(--text-color,#fff)] no-underline transition-[color_.15s,background_.15s] ">
                    Signin
                    <svg className="transition-[color .15s] block h-[.9333333333em] min-h-0 w-auto min-w-0 transform text-white" xmlns="http://www.w3.org/2000/svg" width="14" height="13" fill="none" strokeWidth="0.5" viewBox="0 0 14 13">
                      <path fill="currentColor" stroke="currentColor" d="M1 5.816H.75v1.326h10.014l-4.008 3.907-.173.168.162.179.563.62.174.191.186-.18 5.506-5.37.184-.178-.184-.18L7.668.932l-.186-.18-.174.191-.563.62-.162.178.173.169 4.008 3.907H1Z" vectorEffect="non-scaling-stroke"></path>
                    </svg>
                  </span>
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
