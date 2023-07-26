import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import Search from '../components/Inputs/Search/Search';
import BottomNavigation from '../components/Navigation/BottomNavigation/BottomNavigation';
import Avatar from '../components/DataDisplay/Avatar/Avatar';
import Menu from '../components/Navigation/Menu/Menu';

const user = {
  firstName: 'Tom',
  lastName: 'Cook',
  email: 'tom@example.com',
  imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const navigation = [
  { name: 'Lead', href: '/', current: true },
  { name: 'Lists', href: '/lists', current: false },
];

const userNavigation = [
  { name: 'Settings', href: '/settings' },
  { name: 'Sign out', href: '#' },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  // Use the useLocation hook to get the current URL pathname
  const location = useLocation();

  // Update the navigation array based on the current URL
  const updatedNavigation = navigation.map((item) => ({
    ...item,
    current: item.href === location.pathname,
  }));

  return (
    <>
      <div className="min-h-full">
        {/* Desktop navigation */}
        <Disclosure as="nav" className="hidden border-b border-gray-700 bg-gray-800 xl:block">
          {() => (
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
                        <Link key={item.name} to={item.href} className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium')} aria-current={item.current ? 'page' : undefined}>
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
          )}
        </Disclosure>

        <BottomNavigation />

        <header>
          <div className="hidden w-full items-center justify-center space-x-8 bg-gray-800 xl:flex">
            {/* Advanced Search */}
            <div className="mx-auto max-w-7xl flex-1 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex flex-1 justify-center space-x-4">
                <Search />
                <span className="relative hidden whitespace-nowrap text-white md:inline-block">
                  <button type="button" className="px-3.5 py-2.5 text-sm capitalize hover:text-indigo-600">
                    saved searches
                  </button>
                  <span className="absolute -right-4 top-0 rounded-md bg-red-600 px-1 text-xs">66+</span>
                </span>
              </div>
            </div>
          </div>
        </header>
        <main className="flex flex-col">{children}</main>
      </div>
    </>
  );
};

export default DefaultLayout;
