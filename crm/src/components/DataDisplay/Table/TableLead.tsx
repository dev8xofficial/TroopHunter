import { EllipsisVerticalIcon, ListBulletIcon, MagnifyingGlassCircleIcon } from '@heroicons/react/20/solid';
import { Menu } from '@headlessui/react';
import Avatar from '../../DataDisplay/Avatar/Avatar';
import _Menu from '../../Navigation/Menu/Menu';
import CustomMenu from '../../Navigation/CustomMenu/CustomMenu';
import Checkbox from '../../Inputs/Checkbox/Checkbox';
import Statistics from '../Statistics/Statistics';
import { IStats } from '../Statistics/Statistics.interfaces';

const stats: IStats[] = [
  { name: 'Total Results', amount: 248 },
  { name: 'Changed jobs in past 90 days', amount: 7 },
  { name: 'Outstanding invoices', amount: 76 },
  { name: 'Expenses', amount: 20 },
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

const leadItemMenu = [
  { name: 'Settings', href: '#', onClick: () => console.log('Message') },
  { name: 'Sign out', href: '#', onClick: () => console.log('Remove') },
];

const TableLead = () => {
  return (
    <>
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
        <Statistics statistics={stats} />

        {/* Table */}
        <div className="col-span-12 rounded-md rounded-t-none border shadow xl:col-span-8 xl:border-t-0">
          <ul role="list" className="divide-y overflow-hidden shadow-sm">
            {/* Table Head */}
            <li key={1}>
              <div className="flex w-full items-center justify-between divide-x text-sm">
                <div className="flex items-center">
                  <div className="relative flex w-full items-start py-3 pl-6">
                    <div className="flex h-6 items-center">
                      <Checkbox id="selectAll" name="selectAll" />
                    </div>
                    <label htmlFor="selectAll" className="px-4 leading-6 text-gray-900 sm:px-6">
                      Select all
                    </label>
                  </div>

                  <CustomMenu>
                    <Menu.Button disabled={true} className="inline-flex w-full justify-center whitespace-nowrap px-3 py-2 text-sm text-gray-500 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white">
                      <ListBulletIcon className="mr-0.5 h-5 w-5" aria-hidden="true" />
                      Save to list
                    </Menu.Button>
                  </CustomMenu>
                </div>
                <div className="h-full whitespace-nowrap px-6 py-3">365 results</div>
              </div>
            </li>

            {/* Table Body */}
            {people.map((person) => (
              <li key={person.email} className="hover:bg-gray-50 ">
                <div className="relative flex w-full items-start px-6 py-5">
                  <div className="mt-2 flex h-6 items-center md:mt-3 xl:mt-6">
                    <Checkbox id={person.name} name={person.name} />
                  </div>
                  <div className="w-full text-sm leading-6">
                    <label htmlFor={person.name} className="relative flex cursor-pointer justify-between gap-x-6 px-4 sm:px-6">
                      <div className="flex gap-x-4">
                        <Avatar image={person.imageUrl} firstName={person.name} size="large" border="border border-gray-900" />
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
                          <CustomMenu>
                            <Menu.Button className="flex items-center justify-center rounded-full border border-indigo-600 px-2.5 py-0.5 text-xs font-semibold text-indigo-600 ring-indigo-600 transition duration-200 hover:bg-indigo-50 hover:bg-opacity-70 focus:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-white">Save</Menu.Button>
                          </CustomMenu>
                          <_Menu options={leadItemMenu} className="block p-1.5 text-gray-500 hover:text-gray-900 focus:border focus:border-gray-900 focus:ring-gray-900 focus:ring-offset-white">
                            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                          </_Menu>
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
    </>
  );
};

export default TableLead;
