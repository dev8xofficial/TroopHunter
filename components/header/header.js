import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import {
  Bars2Icon,
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { classNames } from "../../utils/helpers";

const Header = () => {
  const [open, setOpen] = useState(false);

  const [headerFixed, setHeaderFixed] = useState(false);

  useEffect(() => {
    const handleScroll = (e) => {
      console.log(window.scrollY);
      if (window.scrollY > 0) {
        setHeaderFixed(true);
      } else {
        setHeaderFixed(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuButtonClick = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <header
      className={`${
        headerFixed ? "py-2 md:py-4 shadow" : "py-4 md:py-6"
      } transition-all z-20 fixed w-full bg-white`}
    >
      <div className="max-w-5xl 2xl:max-w-6xl px-8 lg:px-6 mx-auto flex justify-between items-center">
        <Link
          href="/"
          class="text-3xl md:text-4xl inline-block font-extrabold text-teal-600 hover:text-teal-700 transition"
        >
          AR.
        </Link>
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-7">
            <li>
              <Link
                class="inline-block transform hover:-translate-y-0.5 text-base lg:text-[17px] py-1 px-0.5 transition duration-200"
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                class="hover:text-zinc-700 text-zinc-600 inline-block transform hover:-translate-y-0.5 text-base lg:text-[17px] py-1 px-0.5 transition duration-200"
                href="#about"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                class="hover:text-zinc-700 text-zinc-600 inline-block transform hover:-translate-y-0.5 text-base lg:text-[17px] py-1 px-0.5 transition duration-200"
                href="#projects"
              >
                Projects
              </Link>
            </li>
            {/* 
            <li>
              <Link
                class="hover:text-zinc-700 text-zinc-600 inline-block transform hover:-translate-y-0.5 text-base lg:text-[17px] py-1 px-0.5 transition duration-200"
                href="#"
              >
                Services
              </Link>
            </li> */}

            <li>
              <Link
                class="hover:text-zinc-700 text-zinc-600 inline-block transform hover:-translate-y-0.5 text-base lg:text-[17px] py-1 px-0.5 transition duration-200"
                href="#contact"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="relative inline-block text-left md:hidden">
          <div>
            <button
              className="inline-block transform translate-y-1 group relative rounded-full hover:bg-transparent"
              onClick={handleMenuButtonClick}
            >
              <div
                className={classNames(
                  "transform bg-white scale-100 transition-all duration-[400ms] w-full p-2.5 rounded-full h-full",
                  open ? "rotate-90" : ""
                )}
              >
                <Bars2Icon className="w-6 h-6 duration-500"></Bars2Icon>
              </div>
            </button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div className="absolute right-0 z-10 mt-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-zinc-600 ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <div>
                  <Link
                    onClick={() => setOpen(false)}
                    href="/"
                    className={classNames(
                      "hover:bg-zinc-100 hover:text-zinc-900 text-zinc-700 block px-4 py-2 text-sm"
                    )}
                  >
                    Home
                  </Link>
                </div>

                <div>
                  <Link
                    onClick={() => setOpen(false)}
                    href="#about"
                    className={classNames(
                      "hover:bg-zinc-100 hover:text-zinc-900 text-zinc-700 block px-4 py-2 text-sm"
                    )}
                  >
                    About
                  </Link>
                </div>
                <div>
                  <Link
                    onClick={() => setOpen(false)}
                    href="#projects"
                    className={classNames(
                      "hover:bg-zinc-100 hover:text-zinc-900 text-zinc-700 block px-4 py-2 text-sm"
                    )}
                  >
                    Projects
                  </Link>
                </div>
                {/* <div>
                  <Link
                    href="#"
                    className={classNames(
                      "hover:bg-zinc-100 hover:text-zinc-900 text-zinc-700 block px-4 py-2 text-sm"
                    )}
                  >
                    Services
                  </Link>
                </div> */}

                <div>
                  <Link
                    onClick={() => setOpen(false)}
                    href="#contact"
                    className={classNames(
                      "hover:bg-zinc-100 hover:text-zinc-900 text-zinc-700 block px-4 py-2 text-sm"
                    )}
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </header>
  );
};

export default Header;
