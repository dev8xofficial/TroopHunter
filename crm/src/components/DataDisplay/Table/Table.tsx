import { useState } from 'react';
import { useSelector } from 'react-redux';
import { EllipsisHorizontalIcon, ChevronUpDownIcon, MagnifyingGlassCircleIcon } from '@heroicons/react/20/solid';
import Avatar from '../Avatar/Avatar';
import _Menu from '../../Navigation/Menu/Menu';
import { ILead } from '../../../types/lead';
import { IUser } from '../../../types/user';
import moment from 'moment';

const listsItemMenu = [
  { name: 'Edit', href: '#', onClick: () => console.log('Message') },
  { name: 'Delete', href: '#', onClick: () => console.log('Remove') },
];

const Table: React.FC = (): JSX.Element => {
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const userId: string = useSelector((state: any) => state.auth.userId);
  const user: IUser = useSelector((state: any) => state.users.data[userId]);
  const leads: ILead[] | undefined = user.Leads;

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, leadId: string) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedLeadIds((prevSelected) => [...prevSelected, leadId]);
    } else {
      setSelectedLeadIds((prevSelected) => prevSelected.filter((id) => id !== leadId));
    }
  };

  const handleSelectAllCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      const leadIds = leads?.map((_, index) => index.toString()) || [];
      setSelectedLeadIds(leadIds);
    } else {
      setSelectedLeadIds([]);
    }
  };

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
                      <input id="select-all" name="select-all" type="checkbox" checked={selectedLeadIds.length === (leads?.length || 0)} onChange={handleSelectAllCheckboxChange} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
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
              {leads &&
                leads.map((lead: any, index: number) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div className="relative flex w-full items-start">
                        <span className="sr-only">Select</span>
                        <div className="flex h-6 items-center">
                          <input
                            type="checkbox"
                            id={`select-${index}`} // Use index as the unique identifier
                            name={`select-${index}`} // Use index as the unique identifier
                            checked={selectedLeadIds.includes(index.toString())} // Convert index to string and check if it exists in selectedLeadIds
                            onChange={(e) => handleCheckboxChange(e, index.toString())}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3.5 text-sm">
                      <div className="font-medium text-gray-900">{`${user.firstName} ${user.lastName}`}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3.5 text-sm text-gray-500">
                      {/* This tells how many businesses are in this lead. */}
                      <div className="text-gray-900">{lead.leads}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3.5 text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="h-8 w-8 flex-shrink-0">
                          <Avatar image="" firstName={user.firstName} size="small" border="border border-gray-900" />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{`${user.firstName} ${user.lastName}`}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3.5 text-sm text-gray-500">{moment(lead.updatedAt).format('YYYY-MM-DD')}</td>
                    <td className="relative flex justify-end whitespace-nowrap py-3.5 pl-3 pr-4 text-sm font-medium sm:pr-6">
                      <_Menu options={listsItemMenu} className="block p-1.5 text-gray-500 hover:text-gray-900 focus:border focus:border-gray-900 focus:ring-gray-900 focus:ring-offset-white">
                        <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
                      </_Menu>
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
