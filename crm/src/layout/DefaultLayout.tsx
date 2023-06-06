import { ReactNode, Fragment, useState } from 'react';
import { Disclosure, Menu, Transition, Dialog } from '@headlessui/react';
import { ChevronDownIcon, MinusIcon, PlusIcon, AdjustmentsVerticalIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Lists', href: '/lists', current: false },
];
const userNavigation = [
  { name: 'Settings', href: '/settings' },
  { name: 'Sign out', href: '#' },
];

const stats = [
  { name: 'Total Results', value: '248', changeType: 'positive', borderRight: true },
  { name: 'Changed jobs in past 90 days', value: '7', changeType: 'negative', borderRight: true },
  { name: 'Outstanding invoices', value: '76', changeType: 'positive', borderRight: true },
  { name: 'Expenses', value: '20', changeType: 'negative', borderRight: true },
  { name: 'Total Result', value: '248', changeType: 'positive', borderRight: true },
  { name: 'Changed jobs in past 90 day', value: '7', changeType: 'negative', borderRight: true },
  { name: 'Outstanding invoice', value: '76', changeType: 'positive', borderRight: true },
  { name: 'Expense', value: '20', changeType: 'negative', borderRight: true },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="min-h-full">
        {/* Navigation */}
        <Disclosure as="nav" className="border-b border-gray-700 bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                  <div className="hidden md:block">
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
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile navigation menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              {/* Mobile navigation menu */}
              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button key={item.name} as="a" href={item.href} className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium')} aria-current={item.current ? 'page' : undefined}>
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-white">{user.name}</div>
                      <div className="text-sm font-medium text-gray-400">{user.email}</div>
                    </div>
                    <button type="button" className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button key={item.name} as="a" href={item.href} className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="">
          <div className="flex w-full items-center justify-center space-x-8 bg-gray-800">
            {/* Advanced Search */}
            <div className="mx-auto max-w-7xl flex-1 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex flex-1 justify-center space-x-4">
                <div className="flex w-full rounded-md shadow-sm">
                  <div className="relative flex flex-grow items-stretch focus-within:z-10">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input type="email" name="email" id="email" placeholder="Search Lead or Buinesses" className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 pr-3 text-gray-900 outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                  <button type="button" onClick={openModal} className="relative -ml-px inline-flex items-center gap-x-1.5 whitespace-nowrap rounded-r-md bg-white px-3 py-2 text-sm font-semibold capitalize text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    advanced search
                    <ChevronDownIcon className={`${isOpen ? 'rotate-180' : ''} -ml-0.5 h-5 w-5 text-gray-400`} aria-hidden="true" />
                  </button>
                </div>
                <span className="relative hidden whitespace-nowrap text-white md:inline-block">
                  <button type="button" className="px-3.5 py-2.5 text-sm capitalize hover:text-indigo-500">
                    saved searches
                  </button>
                  <span className="absolute -right-4 top-0 rounded-md bg-red-600 px-1 text-xs">66+</span>
                </span>
              </div>
            </div>

            {/* Advanced search filters */}
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                      <Dialog.Panel className="w-full max-w-5xl transform divide-y overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
                        <Dialog.Title as="h3" className="px-6 py-4 text-lg font-medium leading-6 text-gray-900">
                          <div className="flex items-center justify-between">
                            <AdjustmentsVerticalIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <div className="min-w-0 flex-1">
                              <h2 className="text-lg leading-7 sm:truncate sm:text-xl sm:tracking-tight">Filter your search</h2>
                              <p className="text-sm sm:hidden">0 results</p>
                            </div>
                            <div className="flex items-center space-x-3 md:ml-4">
                              <p className="hidden sm:block">0 results</p>
                              <button type="button" className="ml-3 inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                                Search
                              </button>
                              <button onClick={closeModal} type="button" className="rounded-full p-2 shadow-sm hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </Dialog.Title>
                        <div className="p-6">
                          <h3>Top Filters</h3>
                          <div className="mr-6 mt-6 border shadow sm:rounded-md">
                            <ul role="list" className="grid grid-cols-1 divide-x divide-y md:grid-cols-2">
                              <li>
                                <Disclosure as="div">
                                  {({ open }) => (
                                    <>
                                      <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-6 text-left hover:bg-gray-50 focus:outline-none sm:px-6">
                                        <span>Your leads & accounts</span>
                                        {open ? <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                                      </Disclosure.Button>
                                      <Disclosure.Panel className="space-y-4 p-4 sm:px-6">
                                        <div>
                                          <span className="inline-flex items-center gap-x-0.5 rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                                            Badge
                                            <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-indigo-600/20">
                                              <span className="sr-only">Remove</span>
                                              <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75">
                                                <path d="M4 4l6 6m0-6l-6 6" />
                                              </svg>
                                              <span className="absolute -inset-1" />
                                            </button>
                                          </span>
                                        </div>
                                        <div>
                                          <input type="email" name="email" id="email" className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="you@example.com" />
                                        </div>
                                      </Disclosure.Panel>
                                    </>
                                  )}
                                </Disclosure>
                              </li>
                              <li>
                                <Disclosure as="div">
                                  {({ open }) => (
                                    <>
                                      <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-6 text-left hover:bg-gray-50 focus:outline-none sm:px-6">
                                        <span>Relationship</span>
                                        {open ? <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                                      </Disclosure.Button>
                                      <Disclosure.Panel className="space-y-4 p-4 sm:px-6">
                                        <div>
                                          <span className="inline-flex items-center gap-x-0.5 rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                                            Badge
                                            <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-indigo-600/20">
                                              <span className="sr-only">Remove</span>
                                              <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75">
                                                <path d="M4 4l6 6m0-6l-6 6" />
                                              </svg>
                                              <span className="absolute -inset-1" />
                                            </button>
                                          </span>
                                        </div>
                                        <div>
                                          <input type="email" name="email" id="email" className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="you@example.com" />
                                        </div>
                                      </Disclosure.Panel>
                                    </>
                                  )}
                                </Disclosure>
                              </li>
                              <li>
                                <Disclosure as="div">
                                  {({ open }) => (
                                    <>
                                      <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-6 text-left hover:bg-gray-50 focus:outline-none sm:px-6">
                                        <span>Company</span>
                                        {open ? <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                                      </Disclosure.Button>
                                      <Disclosure.Panel className="space-y-4 p-4 sm:px-6">
                                        <div>
                                          <span className="inline-flex items-center gap-x-0.5 rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                                            Badge
                                            <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-indigo-600/20">
                                              <span className="sr-only">Remove</span>
                                              <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75">
                                                <path d="M4 4l6 6m0-6l-6 6" />
                                              </svg>
                                              <span className="absolute -inset-1" />
                                            </button>
                                          </span>
                                        </div>
                                        <div>
                                          <input type="email" name="email" id="email" className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="you@example.com" />
                                        </div>
                                      </Disclosure.Panel>
                                    </>
                                  )}
                                </Disclosure>
                              </li>
                              <li>
                                <Disclosure as="div">
                                  {({ open }) => (
                                    <>
                                      <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-6 text-left hover:bg-gray-50 focus:outline-none sm:px-6">
                                        <span>Industry</span>
                                        {open ? <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                                      </Disclosure.Button>
                                      <Disclosure.Panel className="space-y-4 p-4 sm:px-6">
                                        <div>
                                          <span className="inline-flex items-center gap-x-0.5 rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                                            Badge
                                            <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-indigo-600/20">
                                              <span className="sr-only">Remove</span>
                                              <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75">
                                                <path d="M4 4l6 6m0-6l-6 6" />
                                              </svg>
                                              <span className="absolute -inset-1" />
                                            </button>
                                          </span>
                                        </div>
                                        <div>
                                          <input type="email" name="email" id="email" className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="you@example.com" />
                                        </div>
                                      </Disclosure.Panel>
                                    </>
                                  )}
                                </Disclosure>
                              </li>
                              <li>
                                <Disclosure as="div">
                                  {({ open }) => (
                                    <>
                                      <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-6 text-left hover:bg-gray-50 focus:outline-none sm:px-6">
                                        <span>Company headcount</span>
                                        {open ? <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                                      </Disclosure.Button>
                                      <Disclosure.Panel className="space-y-4 p-4 sm:px-6">
                                        <div>
                                          <span className="inline-flex items-center gap-x-0.5 rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                                            Badge
                                            <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-indigo-600/20">
                                              <span className="sr-only">Remove</span>
                                              <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75">
                                                <path d="M4 4l6 6m0-6l-6 6" />
                                              </svg>
                                              <span className="absolute -inset-1" />
                                            </button>
                                          </span>
                                        </div>
                                        <div>
                                          <input type="email" name="email" id="email" className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="you@example.com" />
                                        </div>
                                      </Disclosure.Panel>
                                    </>
                                  )}
                                </Disclosure>
                              </li>
                              <li>
                                <Disclosure as="div">
                                  {({ open }) => (
                                    <>
                                      <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-6 text-left hover:bg-gray-50 focus:outline-none sm:px-6">
                                        <span>Function</span>
                                        {open ? <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                                      </Disclosure.Button>
                                      <Disclosure.Panel className="space-y-4 p-4 sm:px-6">
                                        <div>
                                          <span className="inline-flex items-center gap-x-0.5 rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                                            Badge
                                            <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-indigo-600/20">
                                              <span className="sr-only">Remove</span>
                                              <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75">
                                                <path d="M4 4l6 6m0-6l-6 6" />
                                              </svg>
                                              <span className="absolute -inset-1" />
                                            </button>
                                          </span>
                                        </div>
                                        <div>
                                          <input type="email" name="email" id="email" className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="you@example.com" />
                                        </div>
                                      </Disclosure.Panel>
                                    </>
                                  )}
                                </Disclosure>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>

          {/* Statistics */}
          <div className="overflow-hidden xl:hidden">
            <div className="overflow-auto">
              <ol role="list" className="mb-1 grid w-full grid-flow-col grid-rows-1 divide-x bg-white">
                {stats.map((stat) => (
                  <li key={stat.name} className="w-fit border-b px-6 py-4">
                    <div className="flex items-center justify-center">
                      <div className="ml-4 whitespace-nowrap text-sm font-medium text-gray-500 hover:text-gray-700">
                        {stat.value} {stat.name}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </>
  );
};

export default DefaultLayout;
