import React, { Fragment } from 'react';

import { Menu, Transition } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

import { type ICustomMenuProps } from './CustomMenu.interfaces';
import { classNames } from '../../../utils/helpers';
const CustomMenu: React.FC<ICustomMenuProps> = ({ children }: ICustomMenuProps): JSX.Element => {
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>{children}</div>

        <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-charcoal-100 dark:bg-charcoal-300 dark:text-white">
            <div className="relative flex items-center justify-center px-4 py-3">
              <p className="text-sm">Save to a list</p>
              <button type="button" className="absolute right-2 rounded-full p-1 hover:bg-indigo-600 hover:text-white dark:hover:bg-charcoal-400">
                <PlusIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="py-1">
              <Menu.Item>
                <Link href="#" className="block px-4 py-2 text-sm capitalize">
                  Recently Used
                </Link>
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link href="#" className={classNames(active ? 'bg-gray-100 text-gray-900 dark:bg-charcoal-300 dark:text-white dark:hover:bg-charcoal-400 dark:hover:text-primary-text' : 'text-gray-700 dark:text-white', 'block px-4 py-2 text-sm')}>
                    Support
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link href="#" className={classNames(active ? 'bg-gray-100 text-gray-900 dark:bg-charcoal-300 dark:text-white dark:hover:bg-charcoal-400 dark:hover:text-primary-text' : 'text-gray-700 dark:text-white', 'block px-4 py-2 text-sm')}>
                    License
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="py-1">
              <Menu.Item>
                <Link href="#" className="block px-4 py-2 text-sm capitalize">
                  Your Custom Lists
                </Link>
              </Menu.Item>
              <form method="POST" action="#">
                <Menu.Item>
                  {({ active }) => (
                    <button type="submit" className={classNames(active ? 'bg-gray-100 text-gray-900 dark:bg-charcoal-300 dark:text-white dark:hover:bg-charcoal-400 dark:hover:text-white' : 'text-gray-700 dark:text-white', 'block w-full px-4 py-2 text-left text-sm')}>
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </form>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};
export default CustomMenu;
