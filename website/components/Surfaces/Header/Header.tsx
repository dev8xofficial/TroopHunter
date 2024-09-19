// import { Menu, Transition } from '@headlessui/react';
// import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
// import { Bars2Icon, Bars3Icon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid';
// import { classNames } from '../../../utils/helpers';

const Header = () => {
  const [open, setOpen] = useState(false);

  const [headerFixed, setHeaderFixed] = useState(false);

  useEffect(() => {
    const handleScroll = (e) => {
      if (window.scrollY > 0) {
        setHeaderFixed(true);
      } else {
        setHeaderFixed(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuButtonClick = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <>
      {/* <header className={`${headerFixed ? 'py-2 md:py-4 shadow' : 'py-4 md:py-6'} transition-all z-20 fixed w-full bg-white`}>
        <div className="max-w-5xl 2xl:max-w-6xl px-8 lg:px-6 mx-auto flex justify-between items-center">
          <Link href="/" className="text-3xl md:text-4xl inline-block font-extrabold text-teal-600 hover:text-teal-700 transition">
            AR.
          </Link>
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-7">
              <li>
                <Link className="inline-block transform hover:-translate-y-0.5 text-base lg:text-[17px] py-1 px-0.5 transition duration-200" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-zinc-700 text-zinc-600 inline-block transform hover:-translate-y-0.5 text-base lg:text-[17px] py-1 px-0.5 transition duration-200" href="#about">
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:text-zinc-700 text-zinc-600 inline-block transform hover:-translate-y-0.5 text-base lg:text-[17px] py-1 px-0.5 transition duration-200" href="#projects">
                  Projects
                </Link>
              </li>
              <li>
                <Link className="hover:text-zinc-700 text-zinc-600 inline-block transform hover:-translate-y-0.5 text-base lg:text-[17px] py-1 px-0.5 transition duration-200" href="#contact">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <div className="relative inline-block text-left md:hidden">
            <div>
              <button className="inline-block transform translate-y-1 group relative rounded-full hover:bg-transparent" onClick={handleMenuButtonClick}>
                <div className={classNames('transform bg-white scale-100 transition-all duration-[400ms] w-full p-2.5 rounded-full h-full', open ? 'rotate-90' : '')}>
                  <Bars2Icon className="w-6 h-6 duration-500"></Bars2Icon>
                </div>
              </button>
            </div>

            <Transition show={open} as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
              <div className="absolute right-0 z-10 mt-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-zinc-600 ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <div>
                    <Link onClick={() => setOpen(false)} href="/" className={classNames('hover:bg-zinc-100 hover:text-zinc-900 text-zinc-700 block px-4 py-2 text-sm')}>
                      Home
                    </Link>
                  </div>

                  <div>
                    <Link onClick={() => setOpen(false)} href="#about" className={classNames('hover:bg-zinc-100 hover:text-zinc-900 text-zinc-700 block px-4 py-2 text-sm')}>
                      About
                    </Link>
                  </div>
                  <div>
                    <Link onClick={() => setOpen(false)} href="#projects" className={classNames('hover:bg-zinc-100 hover:text-zinc-900 text-zinc-700 block px-4 py-2 text-sm')}>
                      Projects
                    </Link>
                  </div>
                  <div>
                    <Link onClick={() => setOpen(false)} href="#contact" className={classNames('hover:bg-zinc-100 hover:text-zinc-900 text-zinc-700 block px-4 py-2 text-sm')}>
                      Contact
                    </Link>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </header> */}
      <header className="row-start-1 row-end-auto col-start-1 col-end-auto transform transition-[background_.4s_ease-in-out] bg-transparent">
        <div className="items-center gap-[3.75rem] grid-template-columns-auto-1fr-auto grid px-[var(--container-gutter)] w-full h-[5.3125rem]">
          <a className="transform transition-[color_.4s_ease-in-out] z-10 text-[var(--theme-logo,var(--theme-secondary))]" aria-hidden="true" tabIndex={-1} href="/">
            <span className="hidden">Home</span>
            <img className="mx-auto h-8" src="/logo/TroopHunter-style.svg" alt="TroopHunter" />
          </a>
          <div></div>
          <div className="transform transition-[color_.4s_ease-in-out] z-10 color-[var(--theme-header-face,var(--theme-secondary))] col-start-3 col-end-auto h-[50px] w-[50px] touch-none relative">
            <div className="right-0 top-2/4 absolute">
              <div className="transform -translate-y-2/4">
                <a className="bg-none appearance-none p-0 m-0 b-0 text-[inherit] no-underline inline-block text-[clamp(.9375rem,.9920634921vw,1.246875rem)]" target="_tab" href="https://www.app.troophunter.com">
                  <span className="relative cursor-pointer transform transition-[color_.15s,background_.15s] whitespace-pre no-underline rounded-[6.25rem] text-[var(--text-color,#fff)] bg-[var(--default-primary,--theme-secondary)] font-medium leading-[1] p-[.6666666667em_.8em] gap-[.5em] var-text-icon-background-color-anchor gap-y-[.6666666667em] items-center inline-flex ">
                    Signin
                    <svg className="block min-h-0 min-w-0 transform transition-[color .15s] text-white w-auto h-[.9333333333em]" xmlns="http://www.w3.org/2000/svg" width="14" height="13" fill="none" strokeWidth="0.5" viewBox="0 0 14 13">
                      <path fill="currentColor" stroke="currentColor" d="M1 5.816H.75v1.326h10.014l-4.008 3.907-.173.168.162.179.563.62.174.191.186-.18 5.506-5.37.184-.178-.184-.18L7.668.932l-.186-.18-.174.191-.563.62-.162.178.173.169 4.008 3.907H1Z" vectorEffect="non-scaling-stroke"></path>
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
