import React, { useEffect, useRef, useState, Fragment, type ChangeEvent } from 'react';

import { Transition, Dialog, Disclosure } from '@headlessui/react';
import { XMarkIcon, PlusIcon, MinusIcon, AdjustmentsVerticalIcon, ChevronLeftIcon } from '@heroicons/react/20/solid';
import { useSelector, useDispatch } from 'react-redux';
import { type IUserAttributes, type ILeadAttributes } from 'validator/interfaces';

import { type IBusinessesFetchPayload } from 'store/sagas/business/business.fetch';

import TableLead from '../components/DataDisplay/Table/TableLead';
import LeadDeletionDialog from '../components/Feedback/LeadDeletionDialog/LeadDeletionDialog';
import LeadSaveDialog from '../components/Feedback/LeadSaveDialog/LeadSaveDialog';
import Button from '../components/Inputs/Button/Button';
import CustomTextField from '../components/Inputs/CustomTextField/CustomTextField';
import IconButton from '../components/Inputs/IconButton/IconButton';
import Accordion from '../components/Surfaces/Accordion/Accordion';
import ActionBar from '../components/Surfaces/ActionBar/ActionBar';
import { fetchBusinessesAction } from '../store/actions/businessActions';
import { resetHomePageFiltersAction, restoreHomePageFiltersAction, setHomePageFiltersAction, setHomePageLoadingSuccessAction, setHomePagePaginationPageAction } from '../store/actions/homePageActions';
import { type IAuthState } from '../store/reducers/authReducer';
import { type IFilterAttributes, type IHomePageState, initialValue, type IFilterOptionAttributes } from '../store/reducers/homePageReducer';
import { type IUserState } from '../store/reducers/userReducer';
import { classNames, compareFiltersAndLead, isFiltersChanged } from '../utils/helpers';

const tabs = [{ name: 'Filters', href: '#', current: true }];

const Lead: React.FC = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: { auth: IAuthState }) => state.auth);
  const home = useSelector((state: { home: IHomePageState }) => state.home);
  const users = useSelector((state: { users: IUserState }) => state.users);

  const isLeadLoading = home.isLoading;
  const leadPageFilters: IFilterAttributes = home.filters;
  const leadPagePaginationPage: number = home.page;
  const leadPagePaginationLimit: number = home.pageLimit;
  const leadPageDraftLeadId: string = home.draftLeadId;
  const usersLoggedIn: IUserAttributes = users.data[auth.userId];
  const userLeads: ILeadAttributes[] = usersLoggedIn.Leads;
  const draftLeadIndex: number = userLeads.findIndex((lead) => lead.id === leadPageDraftLeadId);
  const draftLead: ILeadAttributes = userLeads[draftLeadIndex];

  const [debouncedFilters, setDebouncedFilters] = useState<IFilterAttributes>(leadPageFilters);
  const [filtersPanelWidth, setFiltersPanelWidth] = useState<boolean>(false);
  const [isOpenLeadSaveDialog, setIsOpenLeadSaveDialog] = useState(false);
  const [isOpenLeadLeadDeletionDialog, setIsOpenLeadDeletionDialog] = useState(false);
  const [isOpenMobileFiltersDialog, setIsOpenMobileFiltersDialog] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const [mainHeight, setMainHeight] = useState<number | undefined>(undefined);
  const prevLeadPageFilters = useRef<IFilterAttributes>(leadPageFilters);

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

  const handleReset = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault();
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
      {/* Action tab */}
      <div className="xl:hidden">
        <ActionBar title="Lead" isLoading={isLeadLoading} />
      </div>

      <div className="flex flex-1 flex-col bg-gray-100">
        {/* Filters Head */}
        <div className="flex divide-x border-b border-gray-200 bg-white dark:divide-charcoal-100 dark:border-charcoal-100 dark:bg-charcoal-500">
          {/* Filters Tab */}
          <div className={classNames(filtersPanelWidth ? 'xl:max-w-lg 2xl:max-w-xl' : '', 'hidden w-full max-w-sm xl:block', 'transition-all duration-500 ease-in-out')}>
            <div className="hidden sm:block">
              <div className="flex items-center justify-between px-4">
                <nav className="-mb-px -ml-4 flex space-x-8" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <a key={tab.name} href={tab.href} className={classNames(tab.current ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300  hover:text-gray-700', 'whitespace-nowrap border-b-2 px-10 py-5 text-sm font-medium')} aria-current={tab.current ? 'page' : undefined}>
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
              <div className="flex items-center justify-between space-x-6 pl-4 pr-4 sm:pr-6 lg:pr-8">
                <div className="flex flex-grow items-center space-x-6">
                  <div className="max-w-md flex-grow">
                    {leadPageFilters.name !== undefined && (
                      <CustomTextField
                        label={leadPageFilters.name?.label}
                        name={leadPageFilters.name?.name}
                        value={leadPageFilters.name?.value !== null ? leadPageFilters.name?.value : ''}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          handleChange(event.target.name, event.target.value);
                        }}
                        placeholder={`Search ${leadPageFilters.name.label.toLowerCase()} title...`}
                      />
                    )}
                  </div>

                  <a className="inline-flex items-center whitespace-nowrap text-sm font-semibold">Saved searches</a>
                </div>
                {/* Mobile advanced search filters */}
                <div className="xl:hidden">
                  <IconButton
                    className="xl:hidden"
                    variant="contained"
                    color="indigo"
                    ringOffset="white"
                    onClick={() => {
                      setIsOpenMobileFiltersDialog(true);
                    }}
                  >
                    <>
                      <AdjustmentsVerticalIcon className="h-6 w-6" aria-hidden="true" />
                    </>
                  </IconButton>

                  <Transition appear show={isOpenMobileFiltersDialog} as={Fragment}>
                    <Dialog
                      as="div"
                      className="relative z-10"
                      onClose={() => {
                        setIsOpenMobileFiltersDialog(false);
                      }}
                    >
                      <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                      </Transition.Child>

                      <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-5xl transform divide-y overflow-hidden rounded bg-white text-left align-middle shadow-xl transition-all dark:divide-charcoal-100">
                              <Dialog.Title as="h3" className="px-6 py-4 text-lg font-medium leading-6 text-indigo-600 dark:bg-charcoal-600 dark:text-primary-text">
                                <div className="flex items-center justify-between">
                                  <AdjustmentsVerticalIcon className="mr-3 h-5 w-5" aria-hidden="true" />
                                  <div className="min-w-0 flex-1">
                                    <h2 className="text-lg leading-7 sm:truncate sm:text-xl sm:tracking-tight">Lead Filters</h2>
                                  </div>
                                  <div className="flex items-center space-x-3 md:ml-4">
                                    <p className="hidden text-sm sm:block">0 results</p>
                                    <button type="button" className="ml-3 inline-flex items-center rounded border bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-indigo-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-white dark:bg-transparent dark:text-white dark:hover:border-indigo-600">
                                      Search
                                    </button>
                                    <button
                                      onClick={() => {
                                        setIsOpenMobileFiltersDialog(false);
                                      }}
                                      type="button"
                                      className="rounded-full p-2 shadow-sm hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                  </div>
                                </div>
                              </Dialog.Title>
                              <div className="p-6 dark:bg-charcoal-400 dark:text-primary-text">
                                <h3>Top Filters</h3>
                                <div className="mr-6 mt-6 border shadow sm:rounded dark:border-charcoal-100">
                                  <ul role="list" className="grid grid-cols-1 divide-x divide-y md:grid-cols-2 dark:divide-charcoal-100">
                                    <li>
                                      <Disclosure as="div">
                                        {({ open }) => (
                                          <>
                                            <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-6 text-left hover:bg-gray-50 focus:outline-none sm:px-6 dark:bg-charcoal-500 dark:text-primary-text dark:hover:bg-charcoal-600">
                                              <span>Your leads & accounts</span>
                                              {open ? <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="space-y-4 p-4 sm:px-6">
                                              <div>
                                                <span className="inline-flex items-center gap-x-0.5 rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 dark:bg-charcoal-500 dark:text-gray-300 dark:ring-gray-600">
                                                  Badge
                                                  <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded hover:bg-indigo-600/20 dark:bg-transparent dark:hover:bg-charcoal-700">
                                                    <span className="sr-only">Remove</span>
                                                    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75 dark:stroke-white dark:group-hover:stroke-white">
                                                      <path d="M4 4l6 6m0-6l-6 6" />
                                                    </svg>
                                                    <span className="absolute -inset-1" />
                                                  </button>
                                                </span>
                                              </div>

                                              <div>
                                                <input type="email" name="email" id="email" className="block w-full rounded border border-gray-300 px-3 py-1.5 placeholder-gray-400 shadow transition duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm dark:border-charcoal-700 dark:bg-charcoal-200 dark:text-white dark:focus:ring-offset-charcoal-700" placeholder="you@example.com" />
                                              </div>
                                            </Disclosure.Panel>
                                          </>
                                        )}
                                      </Disclosure>
                                    </li>
                                    <li>
                                      <Disclosure as="div">
                                        {({ open }) => (
                                          <>
                                            <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-6 text-left hover:bg-gray-50 focus:outline-none sm:px-6 dark:bg-charcoal-500 dark:text-primary-text dark:hover:bg-charcoal-600">
                                              <span>Relationship</span>
                                              {open ? <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="space-y-4 p-4 sm:px-6">
                                              <div>
                                                <span className="inline-flex items-center gap-x-0.5 rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 dark:bg-charcoal-500 dark:text-gray-300 dark:ring-gray-600">
                                                  Badge
                                                  <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded hover:bg-indigo-600/20 dark:bg-transparent dark:hover:bg-charcoal-700">
                                                    <span className="sr-only">Remove</span>
                                                    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75 dark:stroke-white dark:group-hover:stroke-white">
                                                      <path d="M4 4l6 6m0-6l-6 6" />
                                                    </svg>
                                                    <span className="absolute -inset-1" />
                                                  </button>
                                                </span>
                                              </div>

                                              <div>
                                                <input type="email" name="email" id="email" className="block w-full rounded border border-gray-300 px-3 py-1.5 placeholder-gray-400 shadow transition duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm dark:border-charcoal-700 dark:bg-charcoal-200 dark:text-white dark:focus:ring-offset-charcoal-700" placeholder="you@example.com" />
                                              </div>
                                            </Disclosure.Panel>
                                          </>
                                        )}
                                      </Disclosure>
                                    </li>
                                    <li>
                                      <Disclosure as="div">
                                        {({ open }) => (
                                          <>
                                            <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-6 text-left hover:bg-gray-50 focus:outline-none sm:px-6 dark:bg-charcoal-500 dark:text-primary-text dark:hover:bg-charcoal-600">
                                              <span>Company</span>
                                              {open ? <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="space-y-4 p-4 sm:px-6">
                                              <div>
                                                <span className="inline-flex items-center gap-x-0.5 rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 dark:bg-charcoal-500 dark:text-gray-300 dark:ring-gray-600">
                                                  Badge
                                                  <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded hover:bg-indigo-600/20 dark:bg-transparent dark:hover:bg-charcoal-700">
                                                    <span className="sr-only">Remove</span>
                                                    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75 dark:stroke-white dark:group-hover:stroke-white">
                                                      <path d="M4 4l6 6m0-6l-6 6" />
                                                    </svg>
                                                    <span className="absolute -inset-1" />
                                                  </button>
                                                </span>
                                              </div>
                                              <div>
                                                <input type="email" name="email" id="email" className="block w-full rounded border border-gray-300 px-3 py-1.5 placeholder-gray-400 shadow transition duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm dark:border-charcoal-700 dark:bg-charcoal-200 dark:text-white dark:focus:ring-offset-charcoal-700" placeholder="you@example.com" />
                                              </div>
                                            </Disclosure.Panel>
                                          </>
                                        )}
                                      </Disclosure>
                                    </li>
                                    <li>
                                      <Disclosure as="div">
                                        {({ open }) => (
                                          <>
                                            <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-6 text-left hover:bg-gray-50 focus:outline-none sm:px-6 dark:bg-charcoal-500 dark:text-primary-text dark:hover:bg-charcoal-600">
                                              <span>Industry</span>
                                              {open ? <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="space-y-4 p-4 sm:px-6">
                                              <div>
                                                <span className="inline-flex items-center gap-x-0.5 rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 dark:bg-charcoal-500 dark:text-gray-300 dark:ring-gray-600">
                                                  Badge
                                                  <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded hover:bg-indigo-600/20 dark:bg-transparent dark:hover:bg-charcoal-700">
                                                    <span className="sr-only">Remove</span>
                                                    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75 dark:stroke-white dark:group-hover:stroke-white">
                                                      <path d="M4 4l6 6m0-6l-6 6" />
                                                    </svg>
                                                    <span className="absolute -inset-1" />
                                                  </button>
                                                </span>
                                              </div>

                                              <div>
                                                <input type="email" name="email" id="email" className="block w-full rounded border border-gray-300 px-3 py-1.5 placeholder-gray-400 shadow transition duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm dark:border-charcoal-700 dark:bg-charcoal-200 dark:text-white dark:focus:ring-offset-charcoal-700" placeholder="you@example.com" />
                                              </div>
                                            </Disclosure.Panel>
                                          </>
                                        )}
                                      </Disclosure>
                                    </li>
                                    <li>
                                      <Disclosure as="div">
                                        {({ open }) => (
                                          <>
                                            <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-6 text-left hover:bg-gray-50 focus:outline-none sm:px-6 dark:bg-charcoal-500 dark:text-primary-text dark:hover:bg-charcoal-600">
                                              <span>Company headcount</span>
                                              {open ? <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="space-y-4 p-4 sm:px-6">
                                              <div>
                                                <span className="inline-flex items-center gap-x-0.5 rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 dark:bg-charcoal-500 dark:text-gray-300 dark:ring-gray-600">
                                                  Badge
                                                  <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded hover:bg-indigo-600/20 dark:bg-transparent dark:hover:bg-charcoal-700">
                                                    <span className="sr-only">Remove</span>
                                                    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75 dark:stroke-white dark:group-hover:stroke-white">
                                                      <path d="M4 4l6 6m0-6l-6 6" />
                                                    </svg>
                                                    <span className="absolute -inset-1" />
                                                  </button>
                                                </span>
                                              </div>

                                              <div>
                                                <input type="email" name="email" id="email" className="block w-full rounded border border-gray-300 px-3 py-1.5 placeholder-gray-400 shadow transition duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm dark:border-charcoal-700 dark:bg-charcoal-200 dark:text-white dark:focus:ring-offset-charcoal-700" placeholder="you@example.com" />
                                              </div>
                                            </Disclosure.Panel>
                                          </>
                                        )}
                                      </Disclosure>
                                    </li>
                                    <li>
                                      <Disclosure as="div">
                                        {({ open }) => (
                                          <>
                                            <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-6 text-left hover:bg-gray-50 focus:outline-none sm:px-6 dark:bg-charcoal-500 dark:text-primary-text dark:hover:bg-charcoal-600">
                                              <span>Function</span>
                                              {open ? <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="space-y-4 p-4 sm:px-6">
                                              <div>
                                                <span className="inline-flex items-center gap-x-0.5 rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 dark:bg-charcoal-500 dark:text-gray-300 dark:ring-gray-600">
                                                  Badge
                                                  <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded hover:bg-indigo-600/20 dark:bg-transparent dark:hover:bg-charcoal-700">
                                                    <span className="sr-only">Remove</span>
                                                    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75 dark:stroke-white dark:group-hover:stroke-white">
                                                      <path d="M4 4l6 6m0-6l-6 6" />
                                                    </svg>
                                                    <span className="absolute -inset-1" />
                                                  </button>
                                                </span>
                                              </div>

                                              <div>
                                                <input type="email" name="email" id="email" className="block w-full rounded border border-gray-300 px-3 py-1.5 placeholder-gray-400 shadow transition duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm dark:border-charcoal-700 dark:bg-charcoal-200 dark:text-white dark:focus:ring-offset-charcoal-700" placeholder="you@example.com" />
                                              </div>
                                            </Disclosure.Panel>
                                          </>
                                        )}
                                      </Disclosure>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition>
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
            <div className={classNames(filtersPanelWidth ? 'xl:max-w-lg 2xl:max-w-xl' : '', 'fixed bottom-0 w-full max-w-sm flex-shrink-0 border-t border-gray-200 bg-white   px-4 py-5 sm:px-6 dark:border-charcoal-100 dark:bg-charcoal-700', 'transition-all duration-500 ease-in-out')}>
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
            <TableLead loadMoreBusinesses={loadMoreBusinesses} handleChange={handleChange} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Lead;
