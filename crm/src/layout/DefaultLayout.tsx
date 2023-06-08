import { ReactNode, Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { BellIcon, ClockIcon, PresentationChartLineIcon, QueueListIcon, UserIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import Search from '../components/Inputs/Search/Search';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const navigation = [
  { name: 'Leads', href: '/', current: true },
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
  return (
    <>
      <div className="min-h-full">
        {/* Navigation */}
        <Disclosure as="nav" className="border-b border-gray-700 bg-gray-800">
          {() => (
            <>
              <div className="mx-auto hidden max-w-7xl px-4 sm:px-6 lg:px-8 xl:block">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                      <img className="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                    </div>
                  </div>
                  {/* Desktop navigation */}
                  <div className="hidden md:block">
                    <div className="ml-20 flex items-baseline space-x-4">
                      {navigation.map((item) => (
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
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                          </Menu.Button>
                        </div>
                        <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link to={item.href} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile navigation menu */}
              <div className="btm-nav z-20 h-16 bg-white text-sm shadow xl:hidden">
                <button className="active gap-1 border-t-2 border-indigo-600 pt-0.5 hover:border-indigo-600 hover:text-indigo-600">
                  <PresentationChartLineIcon className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                  <span className="btm-nav-label text-indigo-600">Leads</span>
                </button>
                <button className="border-t-2 border-gray-100 pt-0.5 hover:border-gray-900">
                  <QueueListIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="btm-nav-label">Lists</span>
                </button>
                <button className="group border-t-2 border-gray-100 pt-0.5">
                  <div className="inline-flex items-center rounded-full p-3 text-sm shadow-sm max-xl:bg-indigo-600 max-xl:text-white max-xl:group-hover:ring-2 max-xl:group-hover:ring-indigo-600 max-xl:group-hover:ring-offset-4 max-xl:group-hover:ring-offset-white xl:rounded-md xl:border xl:border-indigo-600 xl:px-3 xl:py-2 xl:text-indigo-600">
                    <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">Search</span>
                  </div>
                </button>
                <Menu as="div" className="relative">
                  <Menu.Button className="flex h-full w-full flex-col items-center justify-center gap-1 border-t-2 border-gray-100 pt-0.5 hover:border-gray-900">
                    <span className="sr-only">Open user menu</span>
                    <UserIcon className="h-5 w-5" aria-hidden="true" />
                    <span className="btm-nav-label">Profile</span>
                  </Menu.Button>
                  <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                    <Menu.Items className="absolute bottom-full right-1/2 z-10 mt-2 w-48 origin-bottom-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link to={item.href} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
                <button className="border-t-2 border-gray-100 pt-0.5 hover:border-gray-900">
                  <ClockIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="btm-nav-label">History</span>
                </button>
              </div>
            </>
          )}
        </Disclosure>

        <header className="">
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
        <main>{children}</main>
      </div>
    </>
  );
};

export default DefaultLayout;
