import React, { Fragment, useEffect, useRef, useState } from 'react';

import { Menu, Transition } from '@headlessui/react';
// import { ArrowDownTrayIcon, CheckIcon, EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { ListBulletIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { FunnelIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector, useDispatch } from 'react-redux';
import { type IBusinessAttributes, type ILeadAttributes, type IUserAttributes } from 'validator/interfaces';

import { setHomePageBusinessIdsAction, setHomePagePaginationPageAction } from '../../../store/actions/homePageActions';
import { type IAuthState } from '../../../store/reducers/authReducer';
import { type IBusinessState } from '../../../store/reducers/businessReducer';
import { type IFilterAttributes, type IHomePageState } from '../../../store/reducers/homePageReducer';
import { type IUserState } from '../../../store/reducers/userReducer';
import { classNames } from '../../../utils/helpers';
import LeadSaveDialog from '../../Feedback/LeadSaveDialog/LeadSaveDialog';
import Checkbox, { checkboxColors } from '../../Inputs/Checkbox/Checkbox';
import IconButton from '../../Inputs/IconButton/IconButton';
import CustomMenu from '../../Navigation/CustomMenu/CustomMenu';
import Drawer from '../../Navigation/Drawer/Drawer';
// import _Menu from '../../Navigation/Menu/Menu';

// const leadItemMenu = [
//   {
//     name: 'Settings',
//     href: '#',
//     onClick: () => {
//       console.log('Message');
//     }
//   },
//   {
//     name: 'Sign out',
//     href: '#',
//     onClick: () => {
//       console.log('Remove');
//     }
//   }
// ];

interface ITable {
  loadMoreBusinesses: ({ page, limit }: { page: number; limit: number }) => void;
  handleChange: (name: string, value: string) => void;
  handleReset?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const renderRows = (businessesDataBusinesses: Record<string, IBusinessAttributes>, leadPageFilters: IFilterAttributes, leadPageBusinessIds: string[], draftLeadBusinessIds: string[] | undefined): Record<string, IBusinessAttributes> => {
  const updatedBusinessesData: Record<string, IBusinessAttributes> = {};

  switch (leadPageFilters.view.value) {
    case 'selected':
      for (const businessId of Object.keys(businessesDataBusinesses)) {
        if (leadPageBusinessIds.includes(businessId)) {
          updatedBusinessesData[businessId] = businessesDataBusinesses[businessId];
        }
      }
      break;
    case 'saved':
      for (const businessId of Object.keys(businessesDataBusinesses)) {
        if (draftLeadBusinessIds?.includes(businessId) === true) {
          updatedBusinessesData[businessId] = businessesDataBusinesses[businessId];
        }
      }
      break;
    default:
      // If the default case, keep all businesses
      return businessesDataBusinesses;
  }

  return updatedBusinessesData;
};

const TableLead: React.FC<ITable> = ({ loadMoreBusinesses, handleChange, handleReset }) => {
  const dispatch = useDispatch();
  const businesses = useSelector((state: { businesses: IBusinessState }) => state.businesses);
  const home = useSelector((state: { home: IHomePageState }) => state.home);
  const auth = useSelector((state: { auth: IAuthState }) => state.auth);
  const users = useSelector((state: { users: IUserState }) => state.users);

  const businessesDataBusinesses: Record<string, IBusinessAttributes> = businesses.data.businesses;
  const businessesTotalRecords: number = businesses.data.totalRecords;
  const leadPageFilters: IFilterAttributes = home.filters;
  const isLeadPageLoading = home.isLoading;
  const leadPageBusinessIds: string[] = home.businessIds;
  const leadPagePaginationPage: number = home.page;
  const leadPagePaginationLimit: number = home.pageLimit;
  const leadPageDraftLeadId: string = home.draftLeadId;
  const leadPageRemoveSavedBusinesses: boolean = home.removeSavedBusinesses;
  const authUserId: string = auth.userId;
  const usersLoggedIn: IUserAttributes = users.data[authUserId];
  const userLeads: ILeadAttributes[] = usersLoggedIn.Leads;
  const draftLeadIndex: number = userLeads.findIndex((lead) => lead.id === leadPageDraftLeadId);
  const draftLead: ILeadAttributes = userLeads[draftLeadIndex];
  const draftLeadBusinessIds: string[] | undefined = draftLead?.businessIds;

  const mainRef = useRef<HTMLDivElement>(null);
  const [mainHeight, setMainHeight] = useState<number | undefined>(undefined);
  const [selectedBusinessIds, setSelectedBusinessIds] = useState<string[]>(leadPageBusinessIds);
  const tableRowsData = renderRows(businessesDataBusinesses, leadPageFilters, leadPageBusinessIds, draftLeadBusinessIds);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isOpenLeadSaveDialog, setIsOpenLeadSaveDialog] = useState(false);
  const [delayedShow, setDelayedShow] = useState(false);

  const defaultFilterValues: Partial<IFilterAttributes> = {
    name: { label: 'Business', name: 'name', value: '' },
    view: { label: 'Business', name: 'view', value: 'all' },
    sort: { label: 'Sort', name: 'sort', value: 'relevance' },
    businessDomain: { label: 'Business Domain', name: 'businessDomain', value: '' },
    address: { label: 'Address', name: 'address', value: '' },
    cityId: { label: 'City', name: 'cityId', value: '' },
    stateId: { label: 'State', name: 'stateId', value: '' },
    countryId: { label: 'Country', name: 'countryId', value: '' },
    phone: { label: 'Phone', name: 'phone', value: '' },
    email: { label: 'Email', name: 'email', value: '' },
    website: { label: 'Website', name: 'website', value: '' },
    sponsoredAd: { label: 'Sponsored', name: 'sponsoredAd', value: false }
  };

  const handleCheckboxChange = (businessId: string): void => {
    setSelectedBusinessIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(businessId)) {
        return prevSelectedIds.filter((id) => id !== businessId);
      } else {
        return [...prevSelectedIds, businessId];
      }
    });
  };

  const isBusinessSelected = (businessId: string): boolean => {
    return selectedBusinessIds.includes(businessId);
  };

  const isAllBusinessesSelected = (): boolean => {
    return Object.keys(businessesDataBusinesses).every((businessId) => selectedBusinessIds.includes(businessId));
  };

  const handleSelectAllChange = (): void => {
    if (isAllBusinessesSelected()) {
      setSelectedBusinessIds([]);
    } else {
      setSelectedBusinessIds(Object.keys(businessesDataBusinesses));
    }
  };

  const countChangedFilters = (filters: IFilterAttributes, defaultValues: Partial<IFilterAttributes>): number => {
    let changedCount = 0;
    const { name, businessDomain, address, cityId, stateId, countryId, phone, email, website, sponsoredAd, ...filteredFilters } = filters;

    Object.keys(filteredFilters).forEach((key) => {
      const filterKey = key as keyof IFilterAttributes;
      const currentValue = filters[filterKey].value;
      const defaultValue = defaultValues[filterKey]?.value;

      // Check if the current value differs from the default value
      if (currentValue !== defaultValue) {
        changedCount++;
      }
    });

    return changedCount;
  };

  useEffect(() => {
    dispatch(setHomePageBusinessIdsAction({ businessIds: selectedBusinessIds, draftLeadBusinessIds: draftLeadBusinessIds != null ? draftLeadBusinessIds : [] }));
  }, [dispatch, draftLeadBusinessIds, selectedBusinessIds]);

  useEffect(() => {
    const resizeHandler = (): void => {
      if (mainRef.current != null) {
        const docHeight = document.documentElement.clientHeight;
        const mainTop = mainRef.current.getBoundingClientRect().top;
        const remainingHeight = docHeight - mainTop;
        setMainHeight(remainingHeight);
      }
    };

    resizeHandler();
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [tableRowsData]);

  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        setDelayedShow(leadPageBusinessIds.length > 0);
      },
      leadPageBusinessIds.length > 0 ? 300 : 0
    );

    return () => {
      clearTimeout(timeoutId);
    };
  }, [leadPageBusinessIds]);

  const onNext = (): void => {
    const nextPage = leadPagePaginationPage + 1;
    dispatch(setHomePagePaginationPageAction(nextPage));
    loadMoreBusinesses({ page: nextPage, limit: leadPagePaginationLimit });
  };

  return (
    <>
      {/* Table Actions */}
      <div className="flex w-full items-center bg-white text-sm shadow dark:border-b dark:border-charcoal-100 dark:bg-charcoal-500">
        <div className="mr-auto flex items-center">
          <div className="relative flex w-full items-start py-4 pl-9">
            <div className="flex h-6 items-center">
              <Checkbox id="selectAll" name="selectAll" checked={isAllBusinessesSelected()} onChange={handleSelectAllChange} />
            </div>
            <label htmlFor="selectAll" className="inline-flex w-full justify-center whitespace-nowrap pl-4 leading-6 text-gray-900 sm:px-6 dark:text-white">
              Select all
            </label>
          </div>

          <div className="mx-4 my-0 flex h-auto flex-col items-center self-stretch whitespace-nowrap border-r dark:border-charcoal-100"></div>

          <CustomMenu>
            <Menu.Button disabled={true} className="inline-flex w-full justify-center whitespace-nowrap py-2 pr-4 text-sm text-gray-500 disabled:cursor-not-allowed disabled:opacity-30  disabled:hover:bg-white sm:px-6 dark:text-gray-100 disabled:dark:hover:bg-transparent">
              <ListBulletIcon className="mr-0.5 h-5 w-5" aria-hidden="true" />
              Save to list
            </Menu.Button>
          </CustomMenu>
        </div>
        {businessesTotalRecords !== null && (
          <>
            <div className="mx-4 my-0 hidden h-auto flex-col items-center self-stretch whitespace-nowrap border-r sm:flex dark:border-charcoal-100"></div>
            {/* <div className="hidden h-full items-center justify-center whitespace-nowrap sm:flex">{`${draftLeadBusinessIds !== undefined && draftLeadBusinessIds?.length > 0 ? `${leadPageRemoveSavedBusinesses ? 'Removed' : 'Saved'}: ${draftLeadBusinessIds?.length} | ` : ''}Selected: ${leadPageBusinessIds.length} | Total: ${businessesTotalRecords}`}</div> */}
            <div className="hidden h-full items-center justify-center whitespace-nowrap text-gray-400 sm:flex dark:text-secondary-text">
              {draftLeadBusinessIds !== undefined && draftLeadBusinessIds?.length > 0 ? (
                <>
                  <span>
                    {leadPageRemoveSavedBusinesses ? 'Removed' : 'Saved'}: <span className="font-semibold text-gray-500 dark:text-primary-text">{draftLeadBusinessIds?.length}</span>
                  </span>
                  <span className="mx-1">|</span>
                </>
              ) : null}
              <span>
                Selected: <span className="font-semibold text-gray-500 dark:text-primary-text">{leadPageBusinessIds.length}</span>
              </span>
              <span className="mx-1">|</span>
              <span>
                Filtered: <span className="font-semibold text-gray-500 dark:text-primary-text">{businessesTotalRecords}</span>
              </span>
            </div>
          </>
        )}
        <div className="mx-4 my-0 flex h-auto flex-col items-center self-stretch whitespace-nowrap border-r dark:border-r-charcoal-100"></div>
        <div className="pr-4 sm:pr-6 lg:pr-8">
          <span className="relative inline-block">
            <IconButton
              variant="contained"
              ringOffset="white"
              onClick={() => {
                setIsOpenDrawer(!isOpenDrawer);
              }}
            >
              <>
                <FunnelIcon className="h-6 w-6" aria-hidden="true" />
              </>
            </IconButton>
            {countChangedFilters(leadPageFilters, defaultFilterValues) < 1 ? (
              <></>
            ) : (
              <span className="absolute right-0 top-0 block -translate-y-3 translate-x-3 transform">
                <span className="relative flex h-4 w-4">
                  <span className="absolute z-10 inline-flex h-full w-full items-center justify-center rounded-full bg-indigo-500 text-xxs text-white">{countChangedFilters(leadPageFilters, defaultFilterValues)}</span>
                  <span className="relative inline-flex h-4 w-4 animate-ping rounded-full bg-indigo-400 transition duration-700 ease-in-out"></span>
                </span>
              </span>
            )}
          </span>
        </div>
      </div>
      <Drawer
        isOpen={isOpenDrawer}
        closeDrawer={() => {
          setIsOpenDrawer(!isOpenDrawer);
        }}
        leadPageRemoveSavedBusinesses={leadPageRemoveSavedBusinesses}
        draftLeadBusinessIds={draftLeadBusinessIds}
        handleChange={handleChange}
      />
      {/* Empty State */}
      <div className={classNames(Object.values(tableRowsData).length > 0 ? 'hidden' : '', 'h-full p-4 xl:pb-4 dark:bg-charcoal-300')}>
        <div className="flex h-full flex-col items-center justify-center bg-white dark:bg-charcoal-200">
          <MagnifyingGlassIcon className="-ml-0.5 mb-5 h-16 w-16 dark:text-primary-text" aria-hidden="true" />
          <div className="text-center">
            <h3 className="mt-2 text-lg font-normal text-gray-900 dark:text-primary-text">Apply filters to find leads</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-secondary-text">Leads matching your search criteria will be displayed here</p>
          </div>
        </div>
      </div>

      {/* Table Body */}
      <div id="table-lead-container" ref={mainRef} style={{ height: mainHeight }} className={classNames(Object.values(tableRowsData).length < 1 ? 'hidden' : '', 'block overflow-y-scroll p-4 xl:pb-4 dark:bg-charcoal-300')}>
        <InfiniteScroll dataLength={Object.keys(tableRowsData).length} next={onNext} hasMore={businessesTotalRecords !== undefined && Object.keys(tableRowsData).length < businessesTotalRecords} loader={<></>} scrollableTarget="table-lead-container" scrollThreshold={0.6}>
          {/* Existing code for TableLead */}
          <ul role="list" className={classNames(isLeadPageLoading ? 'group animate-pulse' : '', 'divide-y rounded border bg-white shadow dark:divide-charcoal-100 dark:border-charcoal-100 dark:bg-charcoal-200')}>
            {Object.values(tableRowsData).map((business: IBusinessAttributes, index) => {
              const isSaved = Array.isArray(draftLeadBusinessIds) && draftLeadBusinessIds?.includes(business.id);
              return (
                <li key={index} className={classNames(index === 0 ? 'hover:rounded-t' : '', index === Object.values(tableRowsData).length - 1 ? 'hover:rounded-b' : '', 'hover:bg-gray-100 dark:hover:bg-charcoal-400')}>
                  <label htmlFor={business.name} className="relative flex w-full items-start px-5 py-4 md:px-6 md:py-5">
                    <div className="mt-2 flex h-6 items-center md:mt-3 xl:mt-6">
                      <div className="group-block hidden h-5 w-5 rounded bg-slate-300"></div>
                      <Checkbox
                        id={business.name}
                        name={business.name}
                        checked={isBusinessSelected(business.id)}
                        onChange={() => {
                          handleCheckboxChange(`${business.id}`);
                        }}
                        className="group-hidden"
                        color={isSaved ? checkboxColors.green : checkboxColors.indigo}
                      />
                    </div>
                    <div className="w-full text-sm leading-6">
                      <div className="relative flex w-full cursor-pointer justify-between gap-x-6 pl-4 sm:px-6">
                        <div className="flex w-full gap-x-4">
                          <div className="group-block hidden h-10 w-10 rounded-full bg-slate-300 md:h-12 md:w-12 xl:h-16 xl:w-16"></div>
                          <div className="min-w-0 flex-auto">
                            <div className="group-block mb-1 hidden h-6 w-40 rounded bg-slate-300"></div>
                            <p className="text-md font-semibold leading-6 text-gray-900 md:text-lg dark:text-primary-text">
                              <span className="group-hidden uppercase">{business.name}</span>
                            </p>
                            <div className="flex flex-col">
                              <div className="group-block mb-3 hidden h-4 w-24 rounded bg-slate-300"></div>
                              <p className="group-hidden text-sm uppercase leading-6 text-gray-900 dark:text-primary-text">{business.businessDomain}</p>
                              {'3h ago'.length > 0 ? (
                                <p className="group-hidden mt-1 text-xs leading-5 text-gray-500 dark:text-primary-text">
                                  Last seen <time dateTime="2023-01-23T13:23Z">3h ago</time>
                                </p>
                              ) : (
                                <div className="group-hidden mt-1 flex items-center gap-x-1.5">
                                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                  </div>
                                  <p className="text-xs leading-5 text-gray-500 dark:text-primary-text">Online</p>
                                </div>
                              )}
                              <div className="group-block hidden h-3 w-24 rounded bg-slate-300"></div>
                            </div>
                            <div className="group-block mt-3 hidden h-3 w-24 rounded bg-slate-300"></div>
                            <div className="flex items-center justify-between gap-x-4">
                              <p className="mt-1 flex text-xs leading-5 text-gray-500 dark:text-primary-text">
                                {business?.BusinessPhone !== undefined && (
                                  <a href={`mailto:${business.BusinessPhone.numberNationalFormatted}`} className="group-hidden relative truncate hover:underline">
                                    {business.BusinessPhone.numberNationalFormatted}
                                  </a>
                                )}
                              </p>
                              {/* <div className="flex items-center gap-x-4 sm:hidden">
                                <div className="flex flex-none items-center">
                                  <div className="group-block hidden h-5 w-16 rounded-full bg-slate-300"></div>
                                  <CustomMenu>
                                    <>
                                      {isSaved ? (
                                        <Menu.Button className="group-hidden flex items-center justify-center rounded-full border border-green-600 bg-green-600 px-2.5 py-1 text-xs font-semibold text-white ring-green-600 transition duration-200 hover:bg-green-700 focus:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white">
                                          <CheckIcon className="mr-0.5 h-4 w-4" aria-hidden="true" />
                                          Saved
                                        </Menu.Button>
                                      ) : (
                                        <Menu.Button className="group-hidden flex items-center justify-center rounded-full border border-indigo-600 px-2.5 py-1 text-xs font-semibold text-indigo-600 ring-indigo-600 transition duration-200 hover:bg-indigo-50 hover:bg-opacity-70 focus:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:border-charcoal-500 dark:text-primary-text dark:hover:bg-charcoal-200 dark:focus:bg-charcoal-300 dark:focus:ring-offset-charcoal-200">
                                          <ArrowDownTrayIcon className="mr-0.5 h-4 w-4" aria-hidden="true" />
                                          Save
                                        </Menu.Button>
                                      )}
                                    </>
                                  </CustomMenu>
                                  <div className="group-block -mr-3.5 hidden h-4 w-1 rounded bg-slate-300"></div>
                                  <_Menu options={leadItemMenu} className="group-hidden block p-1.5 text-gray-500 hover:text-gray-900 dark:text-secondary-text dark:hover:text-primary-text" menuItemsClassName="-translate-x-[90%]">
                                    <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                                  </_Menu>
                                </div>
                              </div> */}
                            </div>
                          </div>
                        </div>
                        {/* <div className="hidden items-center gap-x-4 sm:flex">
                          <div className="flex flex-none items-center">
                            <div className="group-block hidden h-5 w-16 rounded-full bg-slate-300"></div>
                            <CustomMenu>
                              <>
                                {isSaved ? (
                                  <Menu.Button className="group-hidden flex items-center justify-center rounded-full border border-green-600 bg-green-600 px-2.5 py-1 text-xs font-semibold text-white ring-green-600 transition duration-200 hover:bg-green-700 focus:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white">
                                    <CheckIcon className="mr-0.5 h-4 w-4" aria-hidden="true" />
                                    Saved
                                  </Menu.Button>
                                ) : (
                                  <Menu.Button className="group-hidden flex items-center justify-center rounded-full border border-indigo-600 px-2.5 py-1 text-xs font-semibold text-indigo-600 ring-indigo-600 transition duration-200 hover:bg-indigo-50 hover:bg-opacity-70 focus:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:border-charcoal-500 dark:text-primary-text dark:hover:bg-charcoal-200 dark:focus:bg-charcoal-300 dark:focus:ring-offset-charcoal-200">
                                    <ArrowDownTrayIcon className="mr-0.5 h-4 w-4" aria-hidden="true" />
                                    Save
                                  </Menu.Button>
                                )}
                              </>
                            </CustomMenu>
                            <div className="group-block -mr-3.5 hidden h-4 w-1 rounded bg-slate-300"></div>
                            <_Menu options={leadItemMenu} className="group-hidden block p-1.5 text-gray-500 hover:text-gray-900 dark:text-secondary-text dark:hover:text-primary-text" menuItemsClassName="-translate-x-[90%]">
                              <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                            </_Menu>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </label>
                </li>
              );
            })}
          </ul>
        </InfiniteScroll>
        <div className="xl:hidden">
          <Transition appear show={delayedShow} as={Fragment}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-150"
              enterFrom="translate-x-[200%]" // Start off the screen
              enterTo="translate-x-0" // Move into view
              leave="ease-in duration-150"
              leaveFrom="translate-x-0" // Start from in view
              leaveTo="translate-x-[200%]" // Move far to the right, off the screen
            >
              <div className="pointer-events-auto fixed bottom-32 right-8 z-10 mb-3 mr-0.5 transition-transform duration-500 ease-in-out">
                <IconButton
                  variant="contained"
                  ringOffset="white"
                  onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    if (handleReset != null) handleReset(event); // Pass the event correctly
                    setSelectedBusinessIds([]);
                  }}
                  className="group bg-gray-200 !p-2 dark:bg-charcoal-300"
                >
                  <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-gray-600 dark:text-secondary-text dark:group-hover:text-primary-text" aria-hidden="true" />
                </IconButton>
              </div>
            </Transition.Child>
          </Transition>

          <Transition appear show={leadPageBusinessIds.length > 0} as={Fragment}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-150"
              enterFrom="translate-x-[200%]" // Start far off-screen to the right
              enterTo="translate-x-0" // Move into view
              leave="ease-in duration-150"
              leaveFrom="translate-x-0" // Start from in view
              leaveTo="translate-x-[200%]" // Move far off-screen to the right
            >
              <div className="pointer-events-auto fixed bottom-20 right-8 z-10 transition-transform duration-500 ease-in-out">
                <IconButton
                  variant="contained"
                  ringOffset="white"
                  onClick={() => {
                    setIsOpenLeadSaveDialog(!isOpenLeadSaveDialog);
                  }}
                  className="group bg-indigo-600 !p-2 hover:bg-indigo-700"
                >
                  <PlusIcon className="h-7 w-7 text-white xl:h-8 xl:w-8 dark:text-white" aria-hidden="true" />
                </IconButton>
              </div>
            </Transition.Child>
          </Transition>
        </div>
        <LeadSaveDialog
          isOpen={isOpenLeadSaveDialog}
          closeModal={() => {
            setIsOpenLeadSaveDialog(!isOpenLeadSaveDialog);
          }}
        />
      </div>
    </>
  );
};

export default TableLead;
