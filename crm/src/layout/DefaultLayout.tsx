import React, { type ReactNode } from 'react';

import { Disclosure } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

import Avatar from '../components/DataDisplay/Avatar/Avatar';
import BottomNavigation from '../components/Navigation/BottomNavigation/BottomNavigation';
import Menu from '../components/Navigation/Menu/Menu';
import { classNames } from '../utils/helpers';

const user = {
  firstName: 'Tom',
  lastName: 'Cook',
  email: 'tom@example.com',
  imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
};

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Leads', href: '/leads', current: false }
];

const userNavigation = [
  { name: 'Settings', href: '/settings' },
  { name: 'Sign out', href: '#' }
];

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }: DefaultLayoutProps): JSX.Element => {
  // Use the useLocation hook to get the current URL pathname
  const location = useLocation();

  // Update the navigation array based on the current URL
  const updatedNavigation = navigation.map((item) => ({
    ...item,
    current: item.href === location.pathname
  }));

  return (
    <>
      <div className="min-h-full">
        {/* Desktop navigation */}
        <Disclosure as="nav" className="hidden border-b border-gray-700 bg-gray-800 xl:block">
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img className="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                  </div>
                </div>
                <div>
                  <div className="ml-20 flex items-baseline space-x-4">
                    {updatedNavigation.map((item) => (
                      <Link key={item.name} to={item.href} className={classNames(item.current ? 'text-white' : 'text-gray-400 hover:text-white', 'px-3 py-2 text-sm font-medium')} aria-current={item.current ? 'page' : undefined}>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="ml-4 flex items-center md:ml-6">
                    <button type="button" className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu options={userNavigation} className="focus:ring-white focus:ring-offset-gray-800">
                      <Avatar image={user.imageUrl} firstName={user.firstName} size="small" border="border" />
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
          </>
        </Disclosure>

        <BottomNavigation />

        {/* Content */}
        <main className="flex flex-col">{children}</main>
      </div>
    </>
  );
};

export default DefaultLayout;
