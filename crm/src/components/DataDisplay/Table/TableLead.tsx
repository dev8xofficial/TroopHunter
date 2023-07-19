import { useSelector } from 'react-redux';
import { EllipsisVerticalIcon, ListBulletIcon, MagnifyingGlassCircleIcon } from '@heroicons/react/20/solid';
import { Menu } from '@headlessui/react';
import Avatar from '../../DataDisplay/Avatar/Avatar';
import _Menu from '../../Navigation/Menu/Menu';
import CustomMenu from '../../Navigation/CustomMenu/CustomMenu';
import Checkbox from '../../Inputs/Checkbox/Checkbox';
import Statistics from '../Statistics/Statistics';
import { IStats } from '../Statistics/Statistics.interfaces';
import { IBusiness } from '../../../types/business';

const stats: IStats[] = [
  { name: 'Total Results', amount: 248 },
  { name: 'Changed jobs in past 90 days', amount: 7 },
  { name: 'Outstanding invoices', amount: 76 },
  { name: 'Expenses', amount: 20 },
];

const images = [
  'https://plus.unsplash.com/premium_photo-1673408622902-8c1126555f29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudCUyMGxvZ298ZW58MHx8MHx8fDA%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1609994263270-82dbf0b283e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGxvZ298ZW58MHx8MHx8fDA%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1527025047-354c31c26312?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdGF1cmFudCUyMGxvZ298ZW58MHx8MHx8fDA%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1595633013926-15dd888ef02d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJlc3RhdXJhbnQlMjBsb2dvfGVufDB8fDB8fHww&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1612222869049-d8ec83637a3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWNjb3VudGFudCUyMGxvZ298ZW58MHx8MHx8fDA%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1615915468538-0fbd857888ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWNjb3VudGFudCUyMGxvZ298ZW58MHx8MHx8fDA%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1560311225-6a3038e96820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
];

const leadItemMenu = [
  { name: 'Settings', href: '#', onClick: () => console.log('Message') },
  { name: 'Sign out', href: '#', onClick: () => console.log('Remove') },
];

const TableLead: React.FC = () => {
  const businesses: IBusiness[] = useSelector((state: any) => state.businesses.data.businesses);
  const totalRecords: number | null = useSelector((state: any) => state.businesses.data.totalRecords);

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
                <div className="h-full whitespace-nowrap px-6 py-3">{totalRecords && `${totalRecords} results`}</div>
              </div>
            </li>

            {/* Table Body */}
            {businesses.map((business, index) => (
              <li key={index} className="hover:bg-gray-50 ">
                <div className="relative flex w-full items-start px-6 py-5">
                  <div className="mt-2 flex h-6 items-center md:mt-3 xl:mt-6">
                    <Checkbox id={business.name} name={business.name} />
                  </div>
                  <div className="w-full text-sm leading-6">
                    <label htmlFor={business.name} className="relative flex cursor-pointer justify-between gap-x-6 px-4 sm:px-6">
                      <div className="flex gap-x-4">
                        <Avatar image={images[Math.floor(Math.random() * images.length)]} firstName={business.name} size="large" border="border border-gray-900" />
                        <div className="min-w-0 flex-auto">
                          <p className="text-lg font-semibold leading-6 text-gray-900">
                            <a href="#">{business.name}</a>
                          </p>
                          <div className="hidden sm:flex sm:flex-col">
                            <p className="text-sm leading-6 text-gray-900">{business.businessDomain?.toUpperCase()}</p>
                            {'3h ago' ? (
                              <p className="mt-1 text-xs leading-5 text-gray-500">
                                Last seen <time dateTime="2023-01-23T13:23Z">3h ago</time>
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
                            {business?.BusinessPhone && (
                              <a href={`mailto:${business.BusinessPhone.numberNationalFormatted}`} className="relative truncate hover:underline">
                                {business.BusinessPhone.numberNationalFormatted}
                              </a>
                            )}
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
