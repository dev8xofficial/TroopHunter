import React, { type KeyboardEvent, useEffect, useRef, useState, type ChangeEvent } from 'react';

import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { type IUserAttributes, type ILeadAttributes } from 'validator/interfaces';

import { type IBusinessesFetchPayload } from 'store/sagas/business/business.fetch';

import TableLead from '../components/DataDisplay/Table/TableLead';
import LeadDeletionDialog from '../components/Feedback/LeadDeletionDialog/LeadDeletionDialog';
import LeadSaveDialog from '../components/Feedback/LeadSaveDialog/LeadSaveDialog';
import Button from '../components/Inputs/Button/Button';
import TextField from '../components/Inputs/TextField/TextField';
import SearchDrawer from '../components/Navigation/SearchDrawer/SearchDrawer';
import Accordion from '../components/Surfaces/Accordion/Accordion';
// import ActionBar from '../components/Surfaces/ActionBar/ActionBar';
import { fetchBusinessesAction } from '../store/actions/businessActions';
import { resetHomePageFiltersAction, restoreHomePageFiltersAction, setHomePageFiltersAction, setHomePageLoadingSuccessAction, setHomePagePaginationPageAction } from '../store/actions/homePageActions';
import { type IAuthState } from '../store/reducers/authReducer';
import { type IBusinessState } from '../store/reducers/businessReducer';
import { type IFilterAttributes, type IHomePageState, initialValue, type IFilterOptionAttributes } from '../store/reducers/homePageReducer';
import { type IUserState } from '../store/reducers/userReducer';
import { classNames, compareFiltersAndLead, isFiltersChanged } from '../utils/helpers';

const tabs = [{ name: 'Filters', href: '#', current: true }];

const Lead: React.FC = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: { auth: IAuthState }) => state.auth);
  const businesses = useSelector((state: { businesses: IBusinessState }) => state.businesses);
  const home = useSelector((state: { home: IHomePageState }) => state.home);
  const users = useSelector((state: { users: IUserState }) => state.users);

  // const isLeadLoading = home.isLoading;
  const businessesTotalRecords: number = businesses.data.totalRecords;
  const leadPageFilters: IFilterAttributes = home.filters;
  const leadPageBusinessIds: string[] = home.businessIds;
  const leadPagePaginationPage: number = home.page;
  const leadPagePaginationLimit: number = home.pageLimit;
  const leadPageDraftLeadId: string = home.draftLeadId;
  const leadPageRemoveSavedBusinesses: boolean = home.removeSavedBusinesses;
  const usersLoggedIn: IUserAttributes = users.data[auth.userId];
  const userLeads: ILeadAttributes[] = usersLoggedIn.Leads;
  const draftLeadIndex: number = userLeads.findIndex((lead) => lead.id === leadPageDraftLeadId);
  const draftLead: ILeadAttributes = userLeads[draftLeadIndex];
  const draftLeadBusinessIds: string[] | undefined = draftLead?.businessIds;

  const [debouncedFilters, setDebouncedFilters] = useState<IFilterAttributes>(leadPageFilters);
  const [filtersPanelWidth, setFiltersPanelWidth] = useState<boolean>(false);
  const [isOpenLeadSaveDialog, setIsOpenLeadSaveDialog] = useState(false);
  const [isOpenLeadLeadDeletionDialog, setIsOpenLeadDeletionDialog] = useState(false);
  const [isOpenMobileFiltersDialog, setIsOpenMobileFiltersDialog] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const [mainHeight, setMainHeight] = useState<number | undefined>(undefined);
  const prevLeadPageFilters = useRef<IFilterAttributes>(leadPageFilters);
  const isXLScreen = useMediaQuery({ query: '(min-width: 1280px)' });
  const isSmScreen = useMediaQuery({ query: '(min-width: 640px)' });

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

  const handleChange = (name: string, value: string): void => {
    // const name = name;
    let newValue: string | boolean = value;

    if (name === 'sponsoredAd') {
      newValue = JSON.parse(newValue) as string | boolean;
    }

    if (name === 'name' && leadPagePaginationPage !== 1) {
      dispatch(setHomePagePaginationPageAction(1));
    }

    const newFilters: IFilterAttributes = Object.fromEntries(
      Object.entries(leadPageFilters).map(([key, filter]) => {
        const typedFilter = filter as IFilterOptionAttributes;
        if (typedFilter.name === name) {
          return [key, { ...typedFilter, value: newValue }];
        }
        return [key, typedFilter];
      })
    ) as IFilterAttributes;
    dispatch(setHomePageFiltersAction(newFilters));
  };

  const handleReset = (event?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>): void => {
    event?.preventDefault();
    dispatch(resetHomePageFiltersAction());
  };

  const loadMoreBusinesses = ({ page, limit }: { page: number; limit: number }): void => {
    const requestData: IBusinessesFetchPayload = {
      accessToken: auth.accessToken,
      page,
      limit,
      name: leadPageFilters.name.value !== null ? leadPageFilters.name.value : undefined,
      sort: leadPageFilters.sort.value !== null ? leadPageFilters.sort.value : undefined,
      businessDomain: leadPageFilters.businessDomain.value !== undefined ? leadPageFilters.businessDomain.value : undefined,
      address: leadPageFilters.address.value !== undefined ? leadPageFilters.address.value : undefined,
      cityId: leadPageFilters.cityId.value !== undefined ? leadPageFilters.cityId.value : undefined,
      stateId: leadPageFilters.stateId.value !== undefined ? leadPageFilters.stateId.value : undefined,
      countryId: leadPageFilters.countryId.value !== undefined ? leadPageFilters.countryId.value : undefined,
      phone: leadPageFilters.phone.value !== undefined ? leadPageFilters.phone.value : undefined,
      email: leadPageFilters.email.value !== undefined ? leadPageFilters.email.value : undefined,
      website: leadPageFilters.website.value !== undefined ? leadPageFilters.website.value : undefined,
      sponsoredAd: leadPageFilters.sponsoredAd.value !== undefined ? leadPageFilters.sponsoredAd.value : undefined
    };
    dispatch(fetchBusinessesAction(requestData));
  };

  const countChangedFilters = (filters: IFilterAttributes, defaultValues: Partial<IFilterAttributes>): number => {
    let changedCount = 0;
    const { view, sort, ...filteredFilters } = filters;

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
    // Set a timeout to update the debouncedFilters after 500ms
    const delay = 500;
    const timeoutId = setTimeout(() => {
      setDebouncedFilters(leadPageFilters);
    }, delay);

    // Clear the timeout if the component is unmounted or if leadPageFilters change before the timeout is reached
    return () => {
      clearTimeout(timeoutId);
    };
  }, [leadPageFilters]);

  useEffect(() => {
    if (Object.keys(debouncedFilters).length > 0) {
      if (prevLeadPageFilters.current.view === debouncedFilters.view) {
        loadMoreBusinesses({ page: leadPagePaginationPage, limit: leadPagePaginationLimit });
      } else {
        dispatch(setHomePageLoadingSuccessAction());
      }
      prevLeadPageFilters.current = debouncedFilters;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFilters]);

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
  }, []);

  return (
    <>
      <Helmet>
        <title>Home - TroopHunter</title>
        <meta name="description" content="Welcome to TroopHunter, your go-to tool for lead generation and finding the right clients." />
        <link rel="canonical" href="https://www.troophunter.com/" />
      </Helmet>

      {/* Action tab */}
      {/* <div className="xl:hidden">
        <ActionBar title="Lead" isLoading={isLeadLoading} />
      </div> */}

      <div className="flex flex-1 flex-col bg-gray-100">
        {/* Filters Head */}
        <div className="flex divide-x border-b border-gray-200 bg-white dark:divide-charcoal-100 dark:border-charcoal-100 dark:bg-charcoal-500">
          {/* Filters Tab */}
          <div className={classNames(filtersPanelWidth ? 'xl:max-w-lg 2xl:max-w-xl' : '', 'hidden w-full max-w-sm xl:block', 'transition-all duration-500 ease-in-out')}>
            <div className="hidden sm:block">
              <div className="flex items-center justify-between px-4">
                <nav className="-mb-px -ml-4 flex space-x-8" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <a key={tab.name} href={tab.href} className={classNames(tab.current ? 'border-indigo-500 text-indigo-600 dark:border-indigo-300 dark:text-indigo-300' : 'border-transparent text-gray-500 hover:border-gray-300  hover:text-gray-700', 'whitespace-nowrap border-b-2 px-10 py-5 text-sm font-medium')} aria-current={tab.current ? 'page' : undefined}>
                      {tab.name}
                    </a>
                  ))}
                </nav>
                <a
                  className="inline-flex cursor-pointer items-center text-sm font-semibold"
                  onClick={() => {
                    setFiltersPanelWidth(!filtersPanelWidth);
                  }}
                >
                  <ChevronLeftIcon className={classNames(!filtersPanelWidth ? '-rotate-180' : '', 'h-5 w-5 transform transition duration-300')} aria-hidden="true" />
                  {filtersPanelWidth ? 'Collapse' : 'Expand'}
                </a>
              </div>
            </div>
          </div>
          {/* Filters Search */}
          <div className="w-full py-3">
            <div>
              <div className="flex items-center justify-between px-4">
                <div className="relative flex flex-grow items-center justify-between space-x-6 sm:justify-start">
                  <div className="relative flex-grow sm:max-w-md">
                    {leadPageFilters.name !== undefined && (
                      <>
                        <TextField
                          id="home-search"
                          name={leadPageFilters.name?.name}
                          value={leadPageFilters.name?.value !== null ? leadPageFilters.name?.value : ''}
                          onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            if (!isXLScreen) setIsOpenMobileFiltersDialog(true);
                            handleChange(event.target.name, event.target.value);
                          }}
                          onClick={() => {
                            if (!isXLScreen) setIsOpenMobileFiltersDialog(true);
                          }}
                          onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                            if (event.key === 'Enter' && !isXLScreen) {
                              setIsOpenMobileFiltersDialog(true);
                            }
                          }}
                          placeholder={`Search ${leadPageFilters.name.label.toLowerCase()} title...`}
                          className="pr-44 sm:pr-3"
                        />
                        {!isSmScreen && businessesTotalRecords !== null && (
                          <>
                            <a
                              className="absolute right-0 top-4 z-10 h-full pr-3 text-xs text-gray-400 outline-none focus:outline-none dark:text-secondary-text"
                              onClick={() => {
                                if (!isXLScreen) setIsOpenMobileFiltersDialog(true);
                              }}
                            >
                              {draftLeadBusinessIds !== undefined && draftLeadBusinessIds?.length > 0 ? (
                                <>
                                  {leadPageRemoveSavedBusinesses ? 'Removed' : 'Saved'}:<span className="font-semibold text-gray-500 dark:text-primary-text">{draftLeadBusinessIds?.length}</span> |
                                </>
                              ) : null}
                              <span>
                                Selected: <span className="font-semibold text-gray-500 dark:text-indigo-300">{leadPageBusinessIds.length}</span>
                              </span>
                              <span className="mx-1">|</span>
                              <span>
                                Filtered: <span className="font-semibold text-gray-500 dark:text-primary-text">{businessesTotalRecords}</span>
                              </span>
                            </a>
                          </>
                        )}
                        {isXLScreen ? (
                          <></>
                        ) : (
                          countChangedFilters(leadPageFilters, defaultFilterValues) > 0 && (
                            <span className="absolute -right-2 top-0 block transform">
                              <span className="relative flex h-4 w-4">
                                <span className="absolute z-10 inline-flex h-full w-full items-center justify-center rounded-full bg-indigo-500 text-xxs text-white">{countChangedFilters(leadPageFilters, defaultFilterValues)}</span>
                                <span className="relative inline-flex h-4 w-4 animate-ping rounded-full bg-indigo-400 transition duration-700 ease-in-out"></span>
                              </span>
                            </span>
                          )
                        )}
                      </>
                    )}
                  </div>

                  <a className="hidden items-center whitespace-nowrap text-sm font-semibold">Saved searches</a>
                </div>
                {/* Mobile advanced search filters */}
                <div className="xl:hidden">
                  <SearchDrawer
                    isOpen={isOpenMobileFiltersDialog}
                    handleReset={handleReset}
                    closeSearchDrawer={() => {
                      setIsOpenMobileFiltersDialog(!isOpenMobileFiltersDialog);
                    }}
                    handleChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Filters Body */}
        <div className="flex flex-1 flex-row justify-between divide-x dark:divide-charcoal-100">
          {/* Filters Menu */}
          <div className={classNames(filtersPanelWidth ? 'xl:max-w-lg 2xl:max-w-xl' : '', 'relative hidden w-full max-w-sm bg-white xl:block', 'transition-all duration-500 ease-in-out')}>
            <div className="flex w-full items-center justify-between border-b bg-white px-4 py-4 text-sm shadow dark:border-charcoal-100 dark:bg-charcoal-500">
              <label htmlFor="selectAll" className="leading-6 text-gray-900 dark:text-white">
                0 filters applied
              </label>
            </div>
            <div className="hidden overflow-y-scroll p-4 pb-24 xl:col-span-4 xl:block dark:bg-charcoal-300" ref={mainRef} style={{ height: mainHeight }}>
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
            {/* Action buttons */}
            <div className={classNames(filtersPanelWidth ? 'xl:max-w-lg 2xl:max-w-xl' : '', 'fixed bottom-0 w-full max-w-sm flex-shrink-0 border-t border-gray-200 bg-white   px-4 py-5 sm:px-6 dark:border-charcoal-100 dark:bg-charcoal-300', 'transition-all duration-500 ease-in-out')}>
              <div className="flex items-center justify-between">
                {leadPageDraftLeadId.length > 0 && (
                  <>
                    <Button
                      variant="outlined"
                      color="red"
                      onClick={() => {
                        setIsOpenLeadDeletionDialog(!isOpenLeadLeadDeletionDialog);
                      }}
                    >
                      Delete
                    </Button>
                    <LeadDeletionDialog
                      isOpen={isOpenLeadLeadDeletionDialog}
                      closeModal={() => {
                        setIsOpenLeadDeletionDialog(!isOpenLeadLeadDeletionDialog);
                      }}
                    />
                  </>
                )}
                <div className="ml-auto flex justify-end space-x-3">
                  {leadPageDraftLeadId.length === 0 && isFiltersChanged(leadPageFilters, initialValue) && (
                    <a
                      className="inline-flex cursor-pointer items-center text-sm font-semibold"
                      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                        handleReset(event);
                      }}
                    >
                      Clear all
                    </a>
                  )}
                  {leadPageDraftLeadId.length > 0 && !compareFiltersAndLead(leadPageFilters, draftLead) && (
                    <a className="inline-flex cursor-pointer items-center text-sm font-semibold" onClick={() => dispatch(restoreHomePageFiltersAction(draftLead))}>
                      Restore
                    </a>
                  )}
                  <>
                    <Button
                      variant="contained"
                      color="indigo"
                      onClick={() => {
                        setIsOpenLeadSaveDialog(!isOpenLeadSaveDialog);
                      }}
                    >
                      {leadPageDraftLeadId.length > 0 ? 'Update' : 'Save'} search
                    </Button>
                    <LeadSaveDialog
                      isOpen={isOpenLeadSaveDialog}
                      closeModal={() => {
                        setIsOpenLeadSaveDialog(!isOpenLeadSaveDialog);
                      }}
                    />
                  </>
                </div>
              </div>
            </div>
          </div>
          {/* Filters Table */}
          <div className="relative flex flex-1 flex-col">
            <TableLead loadMoreBusinesses={loadMoreBusinesses} handleChange={handleChange} handleReset={handleReset} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Lead;
