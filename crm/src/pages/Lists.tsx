import { PlusIcon, EllipsisHorizontalIcon, ChevronUpDownIcon, MagnifyingGlassCircleIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

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

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const Lists = () => {
  return (
    <>
      {/* Action tab */}
      <div className="border-b shadow">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-lg leading-7 sm:truncate sm:text-xl sm:tracking-tight">Lead results</h2>
            </div>
            <div className="flex items-center text-sm">
              <div className="hidden items-center lg:flex">
                <div className="flex -space-x-0.5">
                  <div>
                    <img className="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white" src="https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Emma Dorsey" />
                  </div>
                  <div>
                    <img className="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Tom Cook" />
                  </div>
                  <div>
                    <img className="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Lindsay Walton" />
                  </div>
                  <div>
                    <img className="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Benjamin Russel" />
                  </div>
                </div>
                <span className="ml-3 capitalize text-indigo-600">my saved leads(50)</span>
              </div>
              <div className="mx-6 my-0 hidden h-auto flex-col items-center self-stretch whitespace-nowrap border-r lg:flex"></div>
              <div className="hidden sm:block">
                <button type="button" className="inline-flex items-center py-2 capitalize text-gray-500 hover:text-indigo-600">
                  <PlusIcon className="mr-0.5 h-5 w-5" aria-hidden="true" />
                  Create lead list
                </button>
              </div>
              <div className="mx-6 my-0 hidden h-auto flex-col items-center self-stretch whitespace-nowrap border-r sm:flex"></div>
              <div>
                <button type="button" className="inline-flex items-center rounded-md border border-indigo-600 px-3 py-2 text-sm text-indigo-600 shadow-sm hover:bg-indigo-600 hover:text-white">
                  Save search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        {/* Empty State */}
        <div className="col-span-12 hidden flex-col items-center justify-center rounded-md border py-20 shadow xl:col-span-8">
          <MagnifyingGlassCircleIcon className="-ml-0.5 h-20 w-20 text-indigo-600" aria-hidden="true" />
          <div className="text-center">
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No results</h3>
            <p className="mt-2 text-sm text-gray-500">Start your query by customizing your search criteria here</p>
          </div>
        </div>

        {/* Table */}
        <div className="-mx-4 mt-4 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col">
                  <button className="flex w-full items-center py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Name
                    <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </th>
                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                  Leads
                </th>
                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                  Owner
                </th>
                <th scope="col">
                  <button className="flex w-full items-center px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Last Updated
                    <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Select</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {people.map((person) => (
                <tr key={person.email}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div className="font-medium text-gray-900">{person.name}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-sm text-gray-500">
                    <div className="text-gray-900">{person.leads}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="h-8 w-8 flex-shrink-0">
                        <img className="h-8 w-8 rounded-full" src={person.imageUrl} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{person.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-sm text-gray-500">{person.updatedAt}</td>
                  <td className="relative flex justify-end whitespace-nowrap py-3.5 pl-3 pr-4 text-sm font-medium sm:pr-6">
                    <Menu as="div" className="relative flex-none">
                      <Menu.Button className="block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">Open options</span>
                        <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
                      </Menu.Button>
                      <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 text-left shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a href="#" className={classNames(active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900')}>
                                Edit<span className="sr-only">, {person.name}</span>
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a href="#" className={classNames(active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900')}>
                                Delete<span className="sr-only">, {person.name}</span>
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Lists;
