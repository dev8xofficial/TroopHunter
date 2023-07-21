import { Fragment, useState } from 'react';
import { XMarkIcon, PlusIcon, MinusIcon, AdjustmentsVerticalIcon as AdjustmentsVerticalIconSolid, TrashIcon as TrashIconSolid, DocumentTextIcon as DocumentTextIconSolid } from '@heroicons/react/20/solid';
import { TrashIcon, DocumentTextIcon, AdjustmentsVerticalIcon } from '@heroicons/react/24/outline';
import { Transition, Dialog, Disclosure } from '@headlessui/react';
import Button from '../../Inputs/Button/Button';
import IconButton from '../../Inputs/IconButton/IconButton';
import { IActionBarProps } from './ActionBar.interfaces';
import Avatar from '../../DataDisplay/Avatar/Avatar';
import LeadDialog from '../../Feedback/LeadDialog/LeadDialog';

const people = [
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    leads: 250,
    updatedAt: '4/4/2022',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Michael Foster',
    email: 'michael.foster@example.com',
    leads: 250,
    updatedAt: '4/4/2022',
    imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Dries Vincent',
    email: 'dries.vincent@example.com',
    leads: 250,
    updatedAt: '4/4/2022',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: null,
  },
  {
    name: 'Lindsay Walton',
    email: 'lindsay.walton@example.com',
    leads: 250,
    updatedAt: '4/4/2022',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Courtney Henry',
    email: 'courtney.henry@example.com',
    leads: 250,
    updatedAt: '4/4/2022',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Tom Cook',
    email: 'tom.cook@example.com',
    leads: 250,
    updatedAt: '4/4/2022',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: null,
  },
];

const ActionBar: React.FC<IActionBarProps> = ({ title = 'lead' }: IActionBarProps): JSX.Element => {
  let [isOpen, setIsOpen] = useState(false);
  let [isOpenSaveSearchModal, setIsOpenSaveSearchModal] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      {/* Action tab */}
      <div className="sticky top-0 z-10 h-fit bg-white">
        <div className="flex h-16 items-center justify-between border-b shadow">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-lg leading-7 sm:truncate sm:text-xl sm:tracking-tight">{title} results</h2>
              </div>
              <div className="flex items-center text-sm">
                {title.toLowerCase() === 'lead' && (
                  <>
                    <div>
                      <span className="hidden xl:inline-block">
                        <Button variant="contained" color="indigo" onClick={() => setIsOpenSaveSearchModal(!isOpenSaveSearchModal)}>
                          Save search
                        </Button>
                        <LeadDialog isOpen={isOpenSaveSearchModal} closeModal={() => setIsOpenSaveSearchModal(!isOpenSaveSearchModal)} />
                      </span>
                      <span className="xl:flex">
                        <IconButton className="xl:hidden" variant="contained" color="indigo" ringOffset="white">
                          <>
                            <DocumentTextIcon className="h-5 w-5 group-hover:hidden group-focus:hidden xl:hidden" aria-hidden="true" />
                            <DocumentTextIconSolid className="hidden h-5 w-5 max-xl:group-hover:inline-block max-xl:group-focus:inline-block xl:hidden" aria-hidden="true" />
                          </>
                        </IconButton>
                      </span>
                    </div>
                    <div className="mx-6 my-0 flex h-auto flex-col items-center self-stretch whitespace-nowrap border-r"></div>
                    <div>
                      <span className="hidden xl:inline-block">
                        <Button variant="outlined" color="red">
                          Delete
                        </Button>
                      </span>
                      <span className="xl:flex">
                        <IconButton className="xl:hidden" variant="contained" color="red" ringOffset="white">
                          <>
                            <TrashIcon className="h-5 w-5 group-hover:hidden group-focus:hidden xl:hidden" aria-hidden="true" />
                            <TrashIconSolid className="hidden h-5 w-5 max-xl:group-hover:inline-block max-xl:group-focus:inline-block xl:hidden" aria-hidden="true" />
                          </>
                        </IconButton>
                      </span>
                    </div>
                    <div className="mx-6 my-0 flex h-auto flex-col items-center self-stretch whitespace-nowrap border-r xl:hidden"></div>
                    <div className="xl:hidden">
                      <IconButton className="xl:hidden" variant="outlined" color="red" ringOffset="white" onClick={openModal}>
                        <>
                          <AdjustmentsVerticalIcon className="h-5 w-5 group-hover:hidden group-focus:hidden xl:hidden" aria-hidden="true" />
                          <AdjustmentsVerticalIconSolid className="hidden h-5 w-5 max-xl:group-hover:inline-block max-xl:group-focus:inline-block xl:hidden" aria-hidden="true" />
                        </>
                      </IconButton>

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
                                  <Dialog.Title as="h3" className="px-6 py-4 text-lg font-medium leading-6 text-indigo-600">
                                    <div className="flex items-center justify-between">
                                      <AdjustmentsVerticalIcon className="mr-3 h-5 w-5" aria-hidden="true" />
                                      <div className="min-w-0 flex-1">
                                        <h2 className="text-lg leading-7 sm:truncate sm:text-xl sm:tracking-tight">Lead Filters</h2>
                                      </div>
                                      <div className="flex items-center space-x-3 md:ml-4">
                                        <p className="hidden text-sm sm:block">0 results</p>
                                        <button type="button" className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                          Search
                                        </button>
                                        <button onClick={closeModal} type="button" className="rounded-full p-2 shadow-sm hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
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
                  </>
                )}
                {title.toLowerCase() === 'lists' && (
                  <>
                    <div className="flex items-center">
                      <div className="hidden -space-x-0.5 sm:flex">
                        {people.map((person: any) => (
                          <Avatar image={person.imageUrl} firstName={person.name} size="xsmall" border="border border-gray-900" className="bg-gray-50 ring-2 ring-white" />
                        ))}
                      </div>
                      <span className="ml-3 capitalize text-indigo-600">my saved leads(50)</span>
                    </div>
                    <div className="mx-6 my-0 flex h-auto flex-col items-center self-stretch whitespace-nowrap border-r"></div>{' '}
                    <div>
                      <span className="hidden xl:inline-block">
                        <Button variant="outlined" color="red">
                          Delete
                        </Button>
                      </span>
                      <span className="xl:flex">
                        <IconButton className="xl:hidden" variant="contained" color="red" ringOffset="white">
                          <>
                            <TrashIcon className="h-5 w-5 group-hover:hidden group-focus:hidden xl:hidden" aria-hidden="true" />
                            <TrashIconSolid className="hidden h-5 w-5 max-xl:group-hover:inline-block max-xl:group-focus:inline-block xl:hidden" aria-hidden="true" />
                          </>
                        </IconButton>
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionBar;
