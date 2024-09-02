import React, { useEffect, useState } from 'react';

import { EllipsisHorizontalIcon, ChevronUpDownIcon, MagnifyingGlassCircleIcon } from '@heroicons/react/20/solid';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { type ILeadAttributes, type IUserAttributes } from 'validator/interfaces';

import { HOME_URL } from '../../../routes/Urls';
import { setHomePageDraftLeadIdAction, setHomePageFiltersAction } from '../../../store/actions/homePageActions';
import { deleteLeadsAction } from '../../../store/actions/leadActions';
import { setLeadsPageSelectedLeadIds } from '../../../store/actions/leadsPageActions';
import { type IAuthState } from '../../../store/reducers/authReducer';
import { type IFilterAttributes, type IHomePageState } from '../../../store/reducers/homePageReducer';
import { type ILeadsState } from '../../../store/reducers/leadsPageReducer';
import { type IUserState } from '../../../store/reducers/userReducer';
import _Menu from '../../Navigation/Menu/Menu';
import { type IMenuOption } from '../../Navigation/Menu/Menu.interfaces';
import Avatar from '../Avatar/Avatar';

// Get the encryption key from the environment variable
const encryptionKey = import.meta.env.VITE_ENCRYPTION_KEY != null ? import.meta.env.VITE_ENCRYPTION_KEY : 'AgE34bNmLB9wOThIJ2WR79/cmtMdjqCbpk61w/ucZnviE1Te0IY7c1e2G5qi42h+';

const Table: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: { auth: IAuthState }) => state.auth);
  const users = useSelector((state: { users: IUserState }) => state.users);
  const home = useSelector((state: { home: IHomePageState }) => state.home);
  const leads = useSelector((state: { leads: ILeadsState }) => state.leads);

  const authUserId: string = auth.userId;
  const usersLoggedIn: IUserAttributes = users.data[authUserId];
  const selectedLeadIds: string[] = leads.selectedLeadIds;
  const userLeads: ILeadAttributes[] = usersLoggedIn.Leads;
  const leadPageFilters: IFilterAttributes = home.filters;

  const [localSelectedLeadIds, setLocalSelectedLeadIds] = useState<string[]>(selectedLeadIds);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const isChecked = e.target.checked;
    const id = e.target.id;
    const bytes = CryptoJS.AES.decrypt(id, encryptionKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) as string;
    if (isChecked) {
      setLocalSelectedLeadIds((prevSelected) => [...prevSelected, decryptedData]);
    } else {
      setLocalSelectedLeadIds((prevSelected) => prevSelected.filter((id) => id !== decryptedData));
    }
  };

  const handleSelectAllCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const isChecked = e.target.checked;
    if (isChecked) {
      const leadIds = userLeads.map((currentLead) => currentLead.id) ?? [];
      setLocalSelectedLeadIds(leadIds);
    } else {
      setLocalSelectedLeadIds([]);
    }
  };

  const handleEdit = async (index: number): Promise<void> => {
    try {
      if (!Array.isArray(userLeads)) return;

      const selectedLead: ILeadAttributes = userLeads[index];
      if (selectedLead !== undefined && selectedLead !== null) {
        const updatedFilters: IFilterAttributes = {
          name: { label: 'Business', name: 'name', value: selectedLead.search },
          view: { label: 'Business', name: 'view', value: leadPageFilters.view.value },
          sort: { label: 'Sort', name: 'sort', value: leadPageFilters.sort.value },
          businessDomain: { label: 'Business Domain', name: 'businessDomain', value: selectedLead.businessDomain },
          address: { label: 'Address', name: 'address', value: selectedLead.address },
          cityId: { label: 'City', name: 'cityId', value: selectedLead.cityId },
          stateId: { label: 'State', name: 'stateId', value: selectedLead.stateId },
          countryId: { label: 'Country', name: 'countryId', value: selectedLead.countryId },
          phone: { label: 'Phone', name: 'phone', value: selectedLead.phone },
          email: { label: 'Email', name: 'email', value: selectedLead.email },
          website: { label: 'Website', name: 'website', value: selectedLead.website },
          sponsoredAd: { label: 'Sponsored', name: 'sponsoredAd', value: selectedLead.sponsoredAd }
        };

        const dispatchActionPromise = new Promise<void>((resolve) => {
          dispatch(setHomePageFiltersAction(updatedFilters));
          dispatch(setHomePageDraftLeadIdAction(selectedLead.id));
          resolve();
        });

        await dispatchActionPromise.then(() => {
          navigate(HOME_URL);
        });
      } else {
        toast.error('Lead not found.');
      }
    } catch (error) {
      console.error('Error during dispatch:', error);
    }
  };

  const handleDelete = (index: number): void => {
    if (userLeads !== undefined && userLeads !== null) {
      const selectedLead: ILeadAttributes = userLeads[index]; // Specify index as number here
      const leadId: string = selectedLead !== null && selectedLead !== undefined ? selectedLead.id : '';
      if (leadId.length > 0) dispatch(deleteLeadsAction({ accessToken: auth.accessToken, userId: authUserId, selectedLeadIds: [leadId] }));
      else toast.error('Failed to delete lead. Lead not found.');
    }
  };

  const getLeadsItemMenuOptions = (index: number): IMenuOption[] => {
    const options: IMenuOption[] = [
      {
        name: 'Edit',
        href: '#',
        onClick: () => {
          void handleEdit(index);
        }
      },
      {
        name: 'Delete',
        href: '#',
        onClick: () => {
          handleDelete(index);
        }
      }
    ];
    return options;
  };

  useEffect(() => {
    if (!Array.isArray(userLeads)) return;

    dispatch(setLeadsPageSelectedLeadIds(localSelectedLeadIds));
  }, [dispatch, localSelectedLeadIds, userLeads]);

  return (
    <>
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col bg-gray-100 px-4 py-4 pb-20 xl:bg-transparent xl:px-8 xl:pb-4 dark:bg-transparent">
        {/* Table */}
        {userLeads.length > 0 ? (
          <div className="overflow-x-auto rounded-sm border bg-white shadow sm:mx-0 dark:border-charcoal-100 dark:bg-charcoal-200">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-charcoal-100">
              <thead>
                <tr>
                  <th scope="col">
                    <div className="relative flex w-full items-start py-3.5 pl-4 pr-3 sm:pl-6">
                      <span className="sr-only">Select</span>
                      <div className="flex h-6 items-center">
                        <input id="select-all" name="select-all" type="checkbox" checked={localSelectedLeadIds.length > 0 && localSelectedLeadIds.length === userLeads?.length} onChange={handleSelectAllCheckboxChange} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                      </div>
                    </div>
                  </th>
                  <th scope="col">
                    <button className="flex w-full items-center px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-primary-text">
                      Name
                      <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-primary-text">
                    Leads
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-primary-text">
                    Owner
                  </th>
                  <th scope="col">
                    <button className="flex w-full items-center whitespace-nowrap px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-primary-text">
                      Last Updated
                      <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-charcoal-100">
                {userLeads?.map((lead: ILeadAttributes, index: number) => (
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
                      <div className="font-medium text-gray-900 dark:text-primary-text">{lead.title}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3.5 text-sm text-gray-500 dark:text-secondary-text">
                      <div className="text-gray-900 dark:text-primary-text">{lead.businessCount}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3.5 text-sm text-gray-500 dark:text-secondary-text">
                      <div className="flex items-center">
                        <div className="h-8 w-8 flex-shrink-0">
                          <Avatar image="" firstName={usersLoggedIn.firstName} size="small" border="border border-gray-900 dark:border-secondary-text" className="dark:text-secondary-text" />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900 dark:text-primary-text">{`${usersLoggedIn.firstName} ${usersLoggedIn.lastName}`}</div>
                        </div>
                      </div>
                    </td>
                    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */}
                    <td className="whitespace-nowrap px-3 py-3.5 text-sm text-gray-500 dark:text-secondary-text">{moment(lead?.updatedAt).format('YYYY-MM-DD')}</td>
                    <td className="relative flex justify-end whitespace-nowrap py-3.5 pl-3 pr-4 text-sm font-medium sm:pr-6">
                      <_Menu options={getLeadsItemMenuOptions(index)} className="block p-1.5 text-gray-500 hover:text-gray-900 focus:border focus:border-gray-900 focus:ring-gray-900 focus:ring-offset-white dark:text-primary-text dark:hover:text-secondary-text dark:focus:border-charcoal-700 dark:focus:ring-charcoal-700 dark:focus:ring-offset-charcoal-200">
                        <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
                      </_Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex h-full flex-1 flex-col bg-white dark:bg-charcoal-200">
            <div className="flex h-full flex-1 flex-col items-center justify-center bg-white dark:bg-charcoal-200">
              <MagnifyingGlassCircleIcon className="-ml-0.5 h-32 w-32 text-indigo-600 dark:text-primary-text" aria-hidden="true" />
              <div className="text-center">
                <h3 className="mt-2 text-lg font-normal text-gray-900 dark:text-primary-text">Apply filters to find leads</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-secondary-text">Leads matching your search criteria will be displayed here</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Table;
