// import { useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import axios from 'axios';
import { XMarkIcon, PlusIcon, EllipsisVerticalIcon, MinusIcon, ListBulletIcon, MagnifyingGlassCircleIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import { Menu, Transition, Disclosure } from '@headlessui/react';
import ActionBar from '../components/DataDisplay/ActionBar/ActionBar';

const stats = [
  { name: 'Total Results', value: '248', changeType: 'positive', borderRight: true },
  { name: 'Changed jobs in past 90 days', value: '7', changeType: 'negative', borderRight: true },
  { name: 'Outstanding invoices', value: '76', changeType: 'positive', borderRight: true },
  { name: 'Expenses', value: '20', changeType: 'negative', borderRight: true },
];

const people = [
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Co-Founder / CEO',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Michael Foster',
    email: 'michael.foster@example.com',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Dries Vincent',
    email: 'dries.vincent@example.com',
    role: 'Business Relations',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: null,
  },
  {
    name: 'Lindsay Walton',
    email: 'lindsay.walton@example.com',
    role: 'Front-end Developer',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Courtney Henry',
    email: 'courtney.henry@example.com',
    role: 'Designer',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Tom Cook',
    email: 'tom.cook@example.com',
    role: 'Director of Product',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: null,
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const Lead = () => {
  // let [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.BACKEND_URL}/users`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`, // Attach the JWT token to the request
  //       },
  //     })
  //     .then((response: any) => {
  //       toast('User exits');
  //     })
  //     .catch((error: any) => {
  //       toast("User doesn't exit:");
  //     });
  // }, []);
  // useEffect(() => {
  //   setInterval(() => {
  //     setIsLoading(!isLoading);
  //   }, 1000);
  // }, []);
  return (
    <>
      {/* Action tab */}
      <ActionBar title="Lead" />

      {/* Statistics */}
      <div className="hidden overflow-hidden">
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

      {/* Content */}
      <div className="mx-auto max-w-7xl justify-between px-4 py-6 sm:px-6 lg:px-8 xl:flex">
        <div className="sticky top-20 h-fit w-full max-w-sm">
          {/* Keywords Filter */}
          <ul role="list" className="mr-6 hidden space-y-3 border shadow sm:rounded-md xl:col-span-4 xl:block">
            <li className="h-full overflow-hidden px-4 py-6 sm:px-6">
              <div>
                <label htmlFor="keyword" className="block text-sm font-medium leading-6 text-gray-900">
                  Keywords
                </label>
                <div className="mt-2 flex rounded-md shadow-sm">
                  <div className="relative flex flex-grow items-stretch focus-within:z-10">
                    <input type="keyword" name="keyword" id="keyword" placeholder="Marketing" className="block w-full rounded-none rounded-l-md border-0 px-3 py-1.5 text-gray-900 outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                  <button type="button" className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    <XMarkIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </li>
          </ul>

          {/* Filters */}
          <div className="hidden xl:col-span-4 xl:block">
            <div className="mr-6 mt-6 overflow-hidden border shadow sm:rounded-md">
              <ul role="list" className="divide-y">
                <li className="bg-gray-50 px-4 py-3 sm:px-6">Filters</li>
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
        </div>
        <div>
          <div>
            {/* Empty State */}
            <div className="col-span-12 hidden flex-col items-center justify-center rounded-md border py-20 shadow xl:col-span-8">
              <MagnifyingGlassCircleIcon className="-ml-0.5 h-20 w-20 text-indigo-600" aria-hidden="true" />
              <div className="text-center">
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No results</h3>
                <p className="mt-2 text-sm text-gray-500">Start your query by customizing your search criteria here</p>
              </div>
            </div>

            {/* Statistics */}
            <div className="z-10 col-span-12 rounded-t-md border border-b-0 shadow xl:col-span-8 xl:block">
              <dl className="mx-auto grid grid-cols-4 gap-px divide-x sm:grid-cols-4 lg:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.name} className="flex flex-wrap items-baseline justify-between px-3 py-4 sm:px-4 xl:px-6">
                    <dd className="w-full flex-none text-xl font-medium leading-10 tracking-tight text-gray-900 md:text-2xl xl:text-3xl">{stat.value}</dd>
                    <dt className="text-xs font-medium text-gray-500 md:text-sm md:leading-6">{stat.name}</dt>
                  </div>
                ))}
              </dl>
            </div>

            {/* Table */}
            <div className="col-span-12 rounded-md rounded-t-none border shadow xl:col-span-8 xl:border-t-0">
              <ul role="list" className="divide-y overflow-hidden shadow-sm">
                {/* Table Head */}
                <li key={1}>
                  <div className="flex w-full items-center justify-between divide-x text-sm">
                    <div className="flex items-center">
                      <div className="relative flex w-full items-start py-3 pl-6">
                        <div className="flex h-6 items-center">
                          <input id="selectAll" name="selectAll" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                        </div>
                        <label htmlFor="selectAll" className="px-4 leading-6 text-gray-900 sm:px-6">
                          Select all
                        </label>
                      </div>
                      <Menu as="div" className="relative inline-block text-left">
                        <div>
                          <Menu.Button className="inline-flex w-full justify-center whitespace-nowrap px-3 py-2 text-sm text-gray-500 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white" disabled={true}>
                            <ListBulletIcon className="mr-0.5 h-5 w-5" aria-hidden="true" />
                            Save to list
                          </Menu.Button>
                        </div>

                        <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                          <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="relative flex items-center justify-center px-4 py-3">
                              <p className="text-sm">Save to a list</p>
                              <button type="button" className="absolute right-2 rounded-full p-1 hover:bg-indigo-600 hover:text-white">
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              </button>
                            </div>
                            <div className="py-1">
                              <Menu.Item>
                                <a href="#" className="block px-4 py-2 text-sm capitalize">
                                  Recently Used
                                </a>
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a href="#" className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>
                                    Support
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a href="#" className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>
                                    License
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                            <div className="py-1">
                              <Menu.Item>
                                <a href="#" className="block px-4 py-2 text-sm capitalize">
                                  Your Custom Lists
                                </a>
                              </Menu.Item>
                              <form method="POST" action="#">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button type="submit" className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm')}>
                                      Sign out
                                    </button>
                                  )}
                                </Menu.Item>
                              </form>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                    <div className="h-full whitespace-nowrap px-6 py-3">365 results</div>
                  </div>
                </li>

                {/* Table Body */}
                {people.map((person) => (
                  <li key={person.email} className="hover:bg-gray-50 ">
                    <div className="relative flex w-full items-start px-6 py-5">
                      <div className="mt-6 flex h-6 items-center">
                        <input id={person.name} name={person.name} type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                      </div>
                      <div className="w-full text-sm leading-6">
                        <label htmlFor={person.name} className="relative flex cursor-pointer justify-between gap-x-6 px-4 sm:px-6">
                          <div className="flex gap-x-4">
                            <img className="h-16 w-16 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
                            <div className="min-w-0 flex-auto">
                              <p className="text-lg font-semibold leading-6 text-gray-900">
                                <a href={person.href}>{person.name}</a>
                              </p>
                              <div className="hidden sm:flex sm:flex-col">
                                <p className="text-sm leading-6 text-gray-900">{person.role}</p>
                                {person.lastSeen ? (
                                  <p className="mt-1 text-xs leading-5 text-gray-500">
                                    Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                                  </p>
                                ) : (
                                  <div className="mt-1 flex items-center gap-x-1.5">
                                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    </div>
                                    <p className="text-xs leading-5 text-gray-500">Online</p>
                                  </div>
                                )}
                              </div>
                              <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                <a href={`mailto:${person.email}`} className="relative truncate hover:underline">
                                  {person.email}
                                </a>
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-x-4">
                            <div className="flex flex-none items-center gap-x-4">
                              <Menu as="div" className="relative inline-block text-left">
                                <div>
                                  <Menu.Button className="rounded-full px-2.5 py-1 text-xs font-semibold text-indigo-600 shadow-sm ring-1 ring-inset ring-indigo-600 hover:bg-indigo-600 hover:text-white">Save</Menu.Button>
                                </div>

                                <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="relative flex items-center justify-center px-4 py-3">
                                      <p className="text-sm">Save to a list</p>
                                      <button type="button" className="absolute right-2 rounded-full p-1 hover:bg-indigo-600 hover:text-white">
                                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                      </button>
                                    </div>
                                    <div className="py-1">
                                      <Menu.Item>
                                        <a href="#" className="block px-4 py-2 text-sm capitalize">
                                          Recently Used
                                        </a>
                                      </Menu.Item>
                                      <Menu.Item>
                                        {({ active }) => (
                                          <a href="#" className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>
                                            Support
                                          </a>
                                        )}
                                      </Menu.Item>
                                      <Menu.Item>
                                        {({ active }) => (
                                          <a href="#" className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>
                                            License
                                          </a>
                                        )}
                                      </Menu.Item>
                                    </div>
                                    <div className="py-1">
                                      <Menu.Item>
                                        <a href="#" className="block px-4 py-2 text-sm capitalize">
                                          Your Custom Lists
                                        </a>
                                      </Menu.Item>
                                      <form method="POST" action="#">
                                        <Menu.Item>
                                          {({ active }) => (
                                            <button type="submit" className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm')}>
                                              Sign out
                                            </button>
                                          )}
                                        </Menu.Item>
                                      </form>
                                    </div>
                                  </Menu.Items>
                                </Transition>
                              </Menu>
                              <Menu as="div" className="relative flex-none">
                                <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                  <span className="sr-only">Open options</span>
                                  <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                                </Menu.Button>
                                <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                                  <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a href="#" className={classNames(active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900')}>
                                          Message<span className="sr-only">, {person.name}</span>
                                        </a>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a href="#" className={classNames(active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900')}>
                                          Remove<span className="sr-only">, {person.name}</span>
                                        </a>
                                      )}
                                    </Menu.Item>
                                  </Menu.Items>
                                </Transition>
                              </Menu>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lead;
