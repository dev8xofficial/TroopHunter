import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import moment from 'moment';
import { EllipsisHorizontalIcon, ChevronUpDownIcon, MagnifyingGlassCircleIcon } from '@heroicons/react/20/solid';
import Avatar from '../Avatar/Avatar';
import _Menu from '../../Navigation/Menu/Menu';
import { ILead } from '../../../types/lead';
import { IUser } from '../../../types/user';
import { IFilterAttributes } from '../../../store/reducers/leadPageReducer';
import { setDraftLeadIdAction, setLeadFiltersAction } from '../../../store/actions/leadPageActions';
import { deleteLeadsAction, setSelectedLeadIds } from '../../../store/actions/leadActions';
import { IMenuOption } from '../../Navigation/Menu/Menu.interfaces';
import CryptoJS from 'crypto-js';

// Create a custom type to define valid filter keys
type ValidFilterKeys = keyof Omit<ILead, 'userId' | 'title' | 'id' | 'categoryId' | 'postalCodeId' | 'ratingId' | 'reviews' | 'timezoneId' | 'openingHourId' | 'closingHourId'>;
// Get the encryption key from the environment variable
const encryptionKey = process.env.ENCRYPTION_KEY ? process.env.ENCRYPTION_KEY : 'AgE34bNmLB9wOThIJ2WR79/cmtMdjqCbpk61w/ucZnviE1Te0IY7c1e2G5qi42h+';

const Table: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token: string = useSelector((state: any) => state.auth.token);
  const leadFilters: IFilterAttributes[] = useSelector((state: any) => state.leadPage.leadFilters);
  const userId: string = useSelector((state: any) => state.auth.userId);
  const user: IUser = useSelector((state: any) => state.users.data[userId]);
  const selectedLeadIds: string[] = useSelector((state: any) => state.lead.selectedLeadIds);
  const [localSelectedLeadIds, setLocalSelectedLeadIds] = useState<string[]>(selectedLeadIds);
  const userLeads: ILead[] | undefined = user.Leads;

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const id = e.target.id;
    const bytes = CryptoJS.AES.decrypt(id, encryptionKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if (isChecked) {
      setLocalSelectedLeadIds((prevSelected) => [...prevSelected, decryptedData]);
    } else {
      setLocalSelectedLeadIds((prevSelected) => prevSelected.filter((id) => id !== decryptedData));
    }
  };

  const handleSelectAllCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      const leadIds = userLeads?.map((_, index) => index.toString()) || [];
      setLocalSelectedLeadIds(leadIds);
    } else {
      setLocalSelectedLeadIds([]);
    }
  };

  const handleEdit = async (index: number) => {
    try {
      if (!Array.isArray(userLeads)) return;

      const lead: ILead = userLeads[index];
      const updatedFilters: IFilterAttributes[] = leadFilters.map((filter) => {
        if (filter.name === 'name' && lead?.hasOwnProperty('search')) {
          return { ...filter, value: `${lead['search']}` }; // Create a new object with updated value
        } else if (lead?.hasOwnProperty(filter.name)) {
          const validFilterName = filter.name as ValidFilterKeys;
          const { userId, title, id, categoryId, postalCodeId, ratingId, reviews, timezoneId, openingHourId, closingHourId, ...rest } = lead;
          return { ...filter, value: `${rest[validFilterName]}` }; // Create a new object with updated value
        }
        return filter;
      });

      const dispatchActionPromise = new Promise<void>((resolve) => {
        dispatch(setLeadFiltersAction(updatedFilters));
        dispatch(setDraftLeadIdAction(`${lead.id}`));
        resolve();
      });

      dispatchActionPromise.then(() => {
        navigate('/');
      });
    } catch (error) {
      console.error('Error during dispatch:', error);
    }
  };

  const handleDelete = (index: number) => {
    if (userLeads) {
      const lead = userLeads[index]; // Specify index as number here
      const leadId: string = lead && lead.id ? lead.id : '';
      if (leadId) dispatch(deleteLeadsAction({ token, user, selectedLeadIds: [leadId] }));
      else toast.error('Failed to delete lead. Lead not found.');
    }
    console.log('Deleting lead with ID:', index);
  };

  const getLeadsItemMenuOptions = (index: number): IMenuOption[] => {
    const options: IMenuOption[] = [
      { name: 'Edit', href: '#', onClick: () => handleEdit(index) },
      { name: 'Delete', href: '#', onClick: () => handleDelete(index) },
    ];
    return options;
  };

  useEffect(() => {
    if (!Array.isArray(userLeads)) return;

    dispatch(setSelectedLeadIds(localSelectedLeadIds));
  }, [localSelectedLeadIds]);

  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Empty State */}
        <div className="col-span-12 hidden flex-col items-center justify-center rounded-sm border py-20 shadow xl:col-span-8">
          <MagnifyingGlassCircleIcon className="-ml-0.5 h-20 w-20 text-indigo-600" aria-hidden="true" />
          <div className="text-center">
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No results</h3>
            <p className="mt-2 text-sm text-gray-500">Start your query by customizing your search criteria here</p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto rounded-sm border shadow sm:mx-0">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col">
                  <div className="relative flex w-full items-start py-3.5 pl-4 pr-3 sm:pl-6">
                    <span className="sr-only">Select</span>
                    <div className="flex h-6 items-center">
                      <input id="select-all" name="select-all" type="checkbox" checked={localSelectedLeadIds.length === (userLeads?.length || 0)} onChange={handleSelectAllCheckboxChange} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
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
              {userLeads &&
                userLeads.map((lead: any, index: number) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div className="relative flex w-full items-start">
                        <span className="sr-only">Select</span>
                        <div className="flex h-6 items-center">
                          <input type="checkbox" id={CryptoJS.AES.encrypt(JSON.stringify(lead.id), encryptionKey).toString()} checked={localSelectedLeadIds.includes(lead.id)} onChange={handleCheckboxChange} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3.5 text-sm">
                      <div className="font-medium text-gray-900">{`${lead.title}`}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3.5 text-sm text-gray-500">
                      {/* This tells how many businesses are in this lead. */}
                      <div className="text-gray-900">0</div>
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
                      <_Menu options={getLeadsItemMenuOptions(index)} className="block p-1.5 text-gray-500 hover:text-gray-900 focus:border focus:border-gray-900 focus:ring-gray-900 focus:ring-offset-white">
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
