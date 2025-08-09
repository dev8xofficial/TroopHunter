/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useState } from 'react';

import { Combobox, Disclosure, Transition, Dialog } from '@headlessui/react';
import { ChevronDownIcon, MagnifyingGlassIcon, MinusIcon, PlusIcon, AdjustmentsVerticalIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { UsersIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { classNames } from '../../../utils/helpers';

interface IPersonAttributes {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: string;
  url: string;
  profileUrl: string;
  imageUrl: string;
}

const people = [
  {
    id: 1,
    name: 'Leslie Alexander',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 2,
    name: 'Arham Alexander',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

const recent = [people[0]];

const Search: React.FC = (): JSX.Element => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = (): void => {
    setIsOpen(false);
  };

  const openModal = (): void => {
    setIsOpen(true);
  };

  const filteredPeople =
    query === ''
      ? []
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <>
      <div className="relative z-20 w-full transform">
        <Combobox<IPersonAttributes>
          onChange={(person: IPersonAttributes) => {
            window.location.assign(person.profileUrl);
          }}
        >
          {({ activeOption }) => (
            <>
              <div className="group flex w-full rounded shadow-sm">
                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon className="text-gray-40 h-5 w-5 dark:text-white" aria-hidden="true" />
                  </div>
                  <Combobox.Input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Search Lead or Buinesses"
                    onChange={(event) => {
                      setQuery(event.target.value);
                    }}
                    className="block w-full rounded-none rounded-l border-0 px-3 py-1.5 pl-10 pr-3 text-sm shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 dark:border-charcoal-700 dark:bg-charcoal-200 dark:text-white dark:ring-charcoal-700 dark:focus:ring-offset-charcoal-700"
                  />
                </div>
                <button type="button" onClick={openModal} className="relative -ml-px inline-flex items-center gap-x-1.5 whitespace-nowrap rounded-r bg-white px-3 py-2 text-sm font-semibold capitalize text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-charcoal-400 dark:text-primary-text dark:ring-charcoal-700 dark:hover:bg-charcoal-300">
                  advanced search
                  <ChevronDownIcon className={`${isOpen ? 'rotate-180' : ''} -ml-0.5 h-5 w-5 text-gray-400 group-focus:text-indigo-600`} aria-hidden="true" />
                </button>
              </div>

              {(query !== '' || filteredPeople.length > 0) && (
                <Combobox.Options as="div" static hold className="fixed left-0 right-0 mt-2 flex divide-x divide-gray-100 rounded border bg-white shadow dark:divide-charcoal-100 dark:border-charcoal-100 dark:bg-charcoal-300">
                  <div className={classNames('max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4', activeOption != null ? 'sm:h-96' : '')}>
                    <div className="-mx-2 text-sm text-gray-700 dark:text-white">
                      {(query === '' ? recent : filteredPeople).map((person) => (
                        <Combobox.Option as="div" key={person.id} value={person} className={({ active }) => classNames('flex cursor-default select-none items-center rounded p-2', active ? 'bg-gray-100 text-gray-900 dark:bg-charcoal-400 dark:text-white dark:hover:bg-charcoal-400 dark:hover:text-white' : '')}>
                          {({ active }) => (
                            <>
                              <img src={person.imageUrl} alt="" className="h-6 w-6 flex-none rounded-full" />
                              <span className="ml-3 flex-auto truncate">{person.name}</span>
                              {active && <ChevronRightIcon className="ml-3 h-5 w-5 flex-none text-gray-400" aria-hidden="true" />}
                            </>
                          )}
                        </Combobox.Option>
                      ))}
                    </div>
                  </div>

                  {activeOption != null && (
                    <div className="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex dark:divide-charcoal-100 dark:bg-charcoal-300">
                      <div className="flex-none p-6 text-center">
                        <img src={(activeOption as IPersonAttributes).imageUrl} alt="" className="mx-auto h-16 w-16 rounded-full" />
                        <h2 className="mt-3 font-semibold text-gray-900 dark:text-white">{(activeOption as IPersonAttributes).name}</h2>
                        <p className="text-sm leading-6 text-gray-500 dark:text-white">{(activeOption as IPersonAttributes).role}</p>
                      </div>
                      <div className="flex flex-auto flex-col justify-between p-6">
                        <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700 dark:text-white">
                          <dt className="col-end-1 font-semibold text-gray-900 dark:text-white">Phone</dt>
                          <dd>{(activeOption as IPersonAttributes).phone}</dd>
                          <dt className="col-end-1 font-semibold text-gray-900 dark:text-white">URL</dt>
                          <dd className="truncate">
                            <a href={(activeOption as IPersonAttributes).url} className="text-indigo-600 underline dark:text-indigo-500">
                              {(activeOption as IPersonAttributes).url}
                            </a>
                          </dd>
                          <dt className="col-end-1 font-semibold text-gray-900 dark:text-white">Email</dt>
                          <dd className="truncate">
                            <a href={`mailto:${(activeOption as IPersonAttributes).email}`} className="text-indigo-600 underline dark:text-indigo-500">
                              {(activeOption as IPersonAttributes).email}
                            </a>
                          </dd>
                        </dl>
                        <button type="button" className="mt-6 w-full rounded bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                          Send message
                        </button>
                      </div>
                    </div>
                  )}
                </Combobox.Options>
              )}

              {query !== '' && filteredPeople.length === 0 && (
                <div className="fixed left-0 right-0 mt-2 rounded border bg-white px-6 py-14 text-center text-sm shadow sm:px-14 dark:border-charcoal-100 dark:bg-charcoal-300">
                  <UsersIcon className="mx-auto h-6 w-6 text-gray-400 dark:text-white" aria-hidden="true" />
                  <p className="mt-4 font-semibold text-gray-900 dark:text-white">No people found</p>
                  <p className="mt-2 text-gray-500 dark:text-white">We couldn&apos;t find anything with that term. Please try again.</p>
                </div>
              )}
            </>
          )}
        </Combobox>
      </div>

      {/* Advanced search filters */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={closeModal}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-white/10 backdrop-blur-md" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-5xl transform divide-y overflow-hidden rounded bg-white text-left align-middle shadow-xl transition-all dark:divide-charcoal-100">
                  <Dialog.Title as="h3" className="bg-gray-800 px-6 py-4 text-lg font-medium leading-6 text-white dark:bg-charcoal-600">
                    <div className="flex items-center justify-between">
                      <AdjustmentsVerticalIcon className="mr-3 h-5 w-5" aria-hidden="true" />
                      <div className="min-w-0 flex-1">
                        <h2 className="text-lg leading-7 sm:truncate sm:text-xl sm:tracking-tight">Search Filters</h2>
                        <p className="text-sm sm:hidden">0 results</p>
                      </div>
                      <div className="flex items-center space-x-3 md:ml-4">
                        <p className="hidden sm:block">0 results</p>
                        <button type="button" className="ml-3 inline-flex items-center rounded border bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-indigo-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-white dark:bg-transparent dark:text-primary-text dark:hover:border-indigo-600">
                          Search
                        </button>
                        <button onClick={closeModal} type="button" className="rounded-full p-2 shadow-sm hover:text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </Dialog.Title>
                  <div className="p-6 dark:bg-charcoal-500 dark:text-primary-text">
                    <h3>Top Filters</h3>
                    <div className="mr-6 mt-6 border shadow sm:rounded dark:border-charcoal-100">
                      <ul className="grid grid-cols-1 divide-x divide-y md:grid-cols-2 dark:divide-charcoal-100">
                        <li>
                          <Disclosure as="div">
                            {({ open }) => (
                              <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-6 text-left hover:bg-gray-50 focus:outline-none sm:px-6 dark:bg-charcoal-500 dark:text-primary-text dark:hover:bg-charcoal-600">
                                  <span>Your leads & accounts</span>
                                  {open ? <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                                </Disclosure.Button>
                                <Disclosure.Panel className="space-y-4 p-4 sm:px-6">
                                  <div>
                                    <span className="inline-flex items-center gap-x-0.5 rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 dark:bg-charcoal-500 dark:text-gray-300 dark:ring-gray-600">
                                      Badge
                                      <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded hover:bg-indigo-600/20 dark:bg-transparent dark:hover:bg-charcoal-700">
                                        <span className="sr-only">Remove</span>
                                        <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75 dark:stroke-white dark:group-hover:stroke-white">
                                          <path d="M4 4l6 6m0-6l-6 6" />
                                        </svg>
                                        <span className="absolute -inset-1" />
                                      </button>
                                    </span>
                                  </div>

                                  <div>
                                    <input type="email" name="email" id="email" className="block w-full rounded border border-gray-300 px-3 py-1.5 placeholder-gray-400 shadow transition duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm dark:border-charcoal-700 dark:bg-charcoal-200 dark:text-white dark:focus:ring-offset-charcoal-700" placeholder="you@example.com" />
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
                                <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-6 text-left hover:bg-gray-50 focus:outline-none sm:px-6 dark:bg-charcoal-500 dark:text-primary-text dark:hover:bg-charcoal-600">
                                  <span>Relationship</span>
                                  {open ? <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                                </Disclosure.Button>
                                <Disclosure.Panel className="space-y-4 p-4 sm:px-6">
                                  <div>
                                    <span className="inline-flex items-center gap-x-0.5 rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 dark:bg-charcoal-500 dark:text-gray-300 dark:ring-gray-600">
                                      Badge
                                      <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded hover:bg-indigo-600/20 dark:bg-transparent dark:hover:bg-charcoal-700">
                                        <span className="sr-only">Remove</span>
                                        <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75 dark:stroke-white dark:group-hover:stroke-white">
                                          <path d="M4 4l6 6m0-6l-6 6" />
                                        </svg>
                                        <span className="absolute -inset-1" />
                                      </button>
                                    </span>
                                  </div>

                                  <div>
                                    <input type="email" name="email" id="email" className="block w-full rounded border border-gray-300 px-3 py-1.5 placeholder-gray-400 shadow transition duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm dark:border-charcoal-700 dark:bg-charcoal-200 dark:text-white dark:focus:ring-offset-charcoal-700" placeholder="you@example.com" />
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
                                <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-6 text-left hover:bg-gray-50 focus:outline-none sm:px-6 dark:bg-charcoal-500 dark:text-primary-text dark:hover:bg-charcoal-600">
                                  <span>Company</span>
                                  {open ? <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                                </Disclosure.Button>
                                <Disclosure.Panel className="space-y-4 p-4 sm:px-6">
                                  <div>
                                    <span className="inline-flex items-center gap-x-0.5 rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 dark:bg-charcoal-500 dark:text-gray-300 dark:ring-gray-600">
                                      Badge
                                      <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded hover:bg-indigo-600/20 dark:bg-transparent dark:hover:bg-charcoal-700">
                                        <span className="sr-only">Remove</span>
                                        <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75 dark:stroke-white dark:group-hover:stroke-white">
                                          <path d="M4 4l6 6m0-6l-6 6" />
                                        </svg>
                                        <span className="absolute -inset-1" />
                                      </button>
                                    </span>
                                  </div>

                                  <div>
                                    <input type="email" name="email" id="email" className="block w-full rounded border border-gray-300 px-3 py-1.5 placeholder-gray-400 shadow transition duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm dark:border-charcoal-700 dark:bg-charcoal-200 dark:text-white dark:focus:ring-offset-charcoal-700" placeholder="you@example.com" />
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
                                <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-6 text-left hover:bg-gray-50 focus:outline-none sm:px-6 dark:bg-charcoal-500  dark:text-primary-text dark:hover:bg-charcoal-600">
                                  <span>Industry</span>
                                  {open ? <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                                </Disclosure.Button>
                                <Disclosure.Panel className="space-y-4 p-4 sm:px-6">
                                  <div>
                                    <span className="inline-flex items-center gap-x-0.5 rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 dark:bg-charcoal-500 dark:text-gray-300 dark:ring-gray-600">
                                      Badge
                                      <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded hover:bg-indigo-600/20 dark:bg-transparent dark:hover:bg-charcoal-700">
                                        <span className="sr-only">Remove</span>
                                        <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75 dark:stroke-white dark:group-hover:stroke-white">
                                          <path d="M4 4l6 6m0-6l-6 6" />
                                        </svg>
                                        <span className="absolute -inset-1" />
                                      </button>
                                    </span>
                                  </div>

                                  <div>
                                    <input type="email" name="email" id="email" className="block w-full rounded border border-gray-300 px-3 py-1.5 placeholder-gray-400 shadow transition duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm dark:border-charcoal-700 dark:bg-charcoal-200 dark:text-white dark:focus:ring-offset-charcoal-700" placeholder="you@example.com" />
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
                                <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-6 text-left hover:bg-gray-50 focus:outline-none sm:px-6 dark:bg-charcoal-500 dark:text-primary-text dark:hover:bg-charcoal-600">
                                  <span>Company headcount</span>
                                  {open ? <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                                </Disclosure.Button>
                                <Disclosure.Panel className="space-y-4 p-4 sm:px-6">
                                  <div>
                                    <span className="inline-flex items-center gap-x-0.5 rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 dark:bg-charcoal-500 dark:text-gray-300 dark:ring-gray-600">
                                      Badge
                                      <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded hover:bg-indigo-600/20 dark:bg-transparent dark:hover:bg-charcoal-700">
                                        <span className="sr-only">Remove</span>
                                        <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75 dark:stroke-white dark:group-hover:stroke-white">
                                          <path d="M4 4l6 6m0-6l-6 6" />
                                        </svg>
                                        <span className="absolute -inset-1" />
                                      </button>
                                    </span>
                                  </div>

                                  <div>
                                    <input type="email" name="email" id="email" className="block w-full rounded border border-gray-300 px-3 py-1.5 placeholder-gray-400 shadow transition duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm dark:border-charcoal-700 dark:bg-charcoal-200 dark:text-white dark:focus:ring-offset-charcoal-700" placeholder="you@example.com" />
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
                                <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-6 text-left hover:bg-gray-50 focus:outline-none sm:px-6 dark:bg-charcoal-500 dark:text-primary-text dark:hover:bg-charcoal-600">
                                  <span>Function</span>
                                  {open ? <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                                </Disclosure.Button>
                                <Disclosure.Panel className="space-y-4 p-4 sm:px-6">
                                  <div>
                                    <span className="inline-flex items-center gap-x-0.5 rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 dark:bg-charcoal-500 dark:text-gray-300 dark:ring-gray-600">
                                      Badge
                                      <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded hover:bg-indigo-600/20 dark:bg-transparent dark:hover:bg-charcoal-700">
                                        <span className="sr-only">Remove</span>
                                        <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75 dark:stroke-white dark:group-hover:stroke-white">
                                          <path d="M4 4l6 6m0-6l-6 6" />
                                        </svg>
                                        <span className="absolute -inset-1" />
                                      </button>
                                    </span>
                                  </div>

                                  <div>
                                    <input type="email" name="email" id="email" className="block w-full rounded border border-gray-300 px-3 py-1.5 placeholder-gray-400 shadow transition duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm dark:border-charcoal-700 dark:bg-charcoal-200 dark:text-white dark:focus:ring-offset-charcoal-700" placeholder="you@example.com" />
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
    </>
  );
};

export default Search;
