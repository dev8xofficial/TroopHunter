import React, { Fragment } from 'react';

import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';

import { type IMenuOption, type IMenuProps } from './Menu.interfaces';
import { classNames } from '../../../utils/helpers';

const _Menu: React.FC<IMenuProps> = ({ children, options, className = '' }: IMenuProps): JSX.Element => {
  return (
    <>
      {/* Mobile navigation */}
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className={`flex items-center justify-center rounded-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-4 ${className}`}>
            <span className="sr-only">Open user menu</span>
            {children}
          </Menu.Button>
        </div>
        <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
          <Menu.Items className="absolute right-0 z-30 mt-2 w-48 origin-top-right rounded bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-charcoal-300">
            {options.map((item: IMenuOption) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <Link to={item.href ?? '#'} onClick={item.onClick} className={classNames(active ? 'bg-gray-100 dark:bg-charcoal-300 dark:text-white dark:hover:bg-charcoal-500 dark:hover:text-white' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-white')}>
                    {item.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};
export default _Menu;
