import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisHorizontalIcon, ChevronUpDownIcon, MagnifyingGlassCircleIcon } from '@heroicons/react/20/solid';
import { ITableProps } from './Table.interfaces';
import Avatar from '../Avatar/Avatar';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const Table: React.FC<ITableProps> = ({ rows }: ITableProps): JSX.Element => {
  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Empty State */}
        <div className="col-span-12 hidden flex-col items-center justify-center rounded-md border py-20 shadow xl:col-span-8">
          <MagnifyingGlassCircleIcon className="-ml-0.5 h-20 w-20 text-indigo-600" aria-hidden="true" />
          <div className="text-center">
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No results</h3>
            <p className="mt-2 text-sm text-gray-500">Start your query by customizing your search criteria here</p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto rounded-md border shadow sm:mx-0">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col">
                  <div className="relative flex w-full items-start py-3.5 pl-4 pr-3 sm:pl-6">
                    <span className="sr-only">Select</span>
                    <div className="flex h-6 items-center">
                      <input id="select" name="select" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                    </div>
                  </div>
                </th>
                <th scope="col">
                  <button className="flex w-full items-center px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Name
                    <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Leads
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Owner
                </th>
                <th scope="col">
                  <button className="flex w-full items-center whitespace-nowrap px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Last Updated
                    <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rows.map((person: any) => (
                <tr key={person.email}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div className="relative flex w-full items-start">
                      <span className="sr-only">Select</span>
                      <div className="flex h-6 items-center">
                        <input id="select" name="select" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-sm">
                    <div className="font-medium text-gray-900">{person.name}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-sm text-gray-500">
                    <div className="text-gray-900">{person.leads}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="h-8 w-8 flex-shrink-0">
                        <Avatar image={person.imageUrl} firstName={person.name} size="small" border="border border-gray-900" />
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

export default Table;
