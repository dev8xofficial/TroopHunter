import React, { type ChangeEvent, Fragment } from 'react';

import { Transition, Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { type IUserAttributes, type ILeadAttributes } from 'validator/interfaces';

import { type ISearchDrawerProps } from './SearchDrawer.interfaces';
import { type IAuthState } from '../../../store/reducers/authReducer';
import { type IBusinessState } from '../../../store/reducers/businessReducer';
import { type IHomePageState, type IFilterAttributes, type IFilterOptionAttributes } from '../../../store/reducers/homePageReducer';
import { type IUserState } from '../../../store/reducers/userReducer';
import TextField from '../../Inputs/TextField/TextField';
import Accordion from '../../Surfaces/Accordion/Accordion';

const SearchDrawer: React.FC<ISearchDrawerProps> = ({ isOpen, closeSearchDrawer, handleChange }: ISearchDrawerProps): JSX.Element => {
  const businesses = useSelector((state: { businesses: IBusinessState }) => state.businesses);
  const home = useSelector((state: { home: IHomePageState }) => state.home);
  const auth = useSelector((state: { auth: IAuthState }) => state.auth);
  const users = useSelector((state: { users: IUserState }) => state.users);

  const businessesTotalRecords: number = businesses.data.totalRecords;
  const leadPageFilters: IFilterAttributes = home.filters;
  const leadPageBusinessIds: string[] = home.businessIds;
  const leadPageDraftLeadId: string = home.draftLeadId;
  const leadPageRemoveSavedBusinesses: boolean = home.removeSavedBusinesses;
  const authUserId: string = auth.userId;
  const usersLoggedIn: IUserAttributes = users.data[authUserId];
  const userLeads: ILeadAttributes[] = usersLoggedIn.Leads;
  const draftLeadIndex: number = userLeads.findIndex((lead) => lead.id === leadPageDraftLeadId);
  const draftLead: ILeadAttributes = userLeads[draftLeadIndex];
  const draftLeadBusinessIds: string[] | undefined = draftLead?.businessIds;
  return (
    <>
      {/* Mobile navigation */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={closeSearchDrawer} className="relative z-30">
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 bottom-0 flex max-w-full">
                <Transition.Child as={Fragment} enter="ease-out duration-150" enterFrom="translate-y-full sm:duration-300" enterTo="translate-y-0" leave="ease-in duration-100" leaveFrom="translate-y-0" leaveTo="translate-y-full sm:duration-300">
                  <Dialog.Panel className="pointer-events-auto w-screen transform transition duration-500 ease-in-out data-[closed]:translate-y-full sm:duration-700">
                    <form className="flex h-full flex-col overflow-y-scroll bg-white/10 shadow-xl backdrop-blur-md dark:bg-charcoal-200">
                      <div className="flex-1">
                        {/* Header */}
                        <div className="px-4 py-6 xl:px-6 dark:bg-charcoal-300">
                          <div className="flex items-start justify-between space-x-3">
                            <div className="w-full">
                              {leadPageFilters.name !== undefined && (
                                <TextField
                                  type="text"
                                  name={leadPageFilters.name?.name}
                                  value={leadPageFilters.name?.value !== null ? leadPageFilters.name?.value : ''}
                                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    handleChange(event.target.name, event.target.value);
                                  }}
                                  placeholder={`Search ${leadPageFilters.name.label.toLowerCase()} title...`}
                                  className="border-none bg-transparent shadow-none ring-0 ring-offset-0 focus:outline-none focus:ring-0 focus:ring-offset-0"
                                />
                              )}
                              {businessesTotalRecords !== null && (
                                <>
                                  <div className="mt-2 h-full px-3 py-1.5 text-xs text-gray-400">
                                    {draftLeadBusinessIds !== undefined && draftLeadBusinessIds?.length > 0 ? (
                                      <>
                                        {leadPageRemoveSavedBusinesses ? 'Removed' : 'Saved'}:<span className="font-semibold text-gray-500">{draftLeadBusinessIds?.length}</span> |
                                      </>
                                    ) : null}
                                    Selected: <span className="font-semibold text-gray-500">{leadPageBusinessIds.length}</span> | Filtered: <span className="font-semibold text-gray-500">{businessesTotalRecords}</span>
                                  </div>
                                </>
                              )}
                            </div>
                            <div className="mt-2.5 flex h-7 items-center">
                              <button type="button" onClick={closeSearchDrawer} className="relative text-gray-400 hover:text-gray-500 dark:hover:text-primary-text">
                                <span className="absolute -inset-2.5" />
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Divider container */}
                        <div className="divide-y divide-gray-200 sm:py-0 dark:divide-charcoal-100">
                          <div className="p-4 pb-24 xl:col-span-4 dark:bg-charcoal-300">
                            <div>
                              <ul role="list" className="divide-y rounded border bg-gray-100 shadow dark:divide-charcoal-100 dark:border-charcoal-100 dark:bg-charcoal-500">
                                {Object.entries(leadPageFilters).map(([_, filter]) => {
                                  const typedFilter = filter as IFilterOptionAttributes;
                                  return typedFilter.name !== 'name' && typedFilter.name !== 'view' && typedFilter.name !== 'sort' ? (
                                    <li key={typedFilter.name}>
                                      <Accordion label={typedFilter.label} name={typedFilter.name} value={typedFilter.value ?? ''} handleChange={handleChange} />
                                    </li>
                                  ) : (
                                    <React.Fragment key={typedFilter.name} />
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SearchDrawer;
