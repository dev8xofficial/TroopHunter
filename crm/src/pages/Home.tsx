import React, { ChangeEvent, useEffect, useRef, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { XMarkIcon, PlusIcon, MinusIcon, AdjustmentsVerticalIcon as AdjustmentsVerticalIconSolid } from '@heroicons/react/20/solid';
import { AdjustmentsVerticalIcon } from '@heroicons/react/24/outline';
import IconButton from '../components/Inputs/IconButton/IconButton';
import { Transition, Dialog, Disclosure } from '@headlessui/react';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { fetchBusinessesAction } from '../store/actions/businessActions';
import CustomTextField from '../components/Inputs/CustomTextField/CustomTextField';
import Accordion from '../components/Surfaces/Accordion/Accordion';
import TableLead from '../components/DataDisplay/Table/TableLead';
import { setLeadFiltersAction, setLeadPageAction } from '../store/actions/leadPageActions';
import { IFilterAttributes } from '../store/reducers/leadPageReducer';
import Button from '../components/Inputs/Button/Button';
import ActionBar from '../components/Surfaces/ActionBar/ActionBar';
import LeadSaveDialog from '../components/Feedback/LeadSaveDialog/LeadSaveDialog';
import LeadDeletionDialog from '../components/Feedback/LeadDeletionDialog/LeadDeletionDialog';

const tabs = [{ name: 'Filters', href: '#', current: true }];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const Lead = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.lead.isLoading);
  const auth = useSelector((state: any) => state.auth);
  const leadFilters: IFilterAttributes[] = useSelector((state: any) => state.lead.leadFilters);
  const leadPage: number = useSelector((state: any) => state.lead.leadPage);
  const leadPageLimit: number = useSelector((state: any) => state.lead.leadPageLimit);
  const draftLeadId: string = useSelector((state: any) => state.lead?.draftLeadId);
  const [debouncedFilters, setDebouncedFilters] = useState<IFilterAttributes[]>(leadFilters);
  const [filtersPanelWidth, setFiltersPanelWidth] = useState<boolean>(true);
  let [isOpenLeadSaveDialog, setIsOpenLeadSaveDialog] = useState(false);
  let [isOpenLeadLeadDeletionDialog, setIsOpenLeadDeletionDialog] = useState(false);
  let [isOpenMobileFiltersDialog, setIsOpenMobileFiltersDialog] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const [mainHeight, setMainHeight] = useState<number | undefined>(undefined);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.name;
    const newValue = event.target.value;

    if (name === 'name' && leadPage !== 1) {
      dispatch(setLeadPageAction(1));
    }

    dispatch(setLeadFiltersAction(leadFilters.map((filter) => (filter.name === name ? { ...filter, value: newValue } : filter))));
  };

  const loadMoreBusinesses = ({ leadPage, leadPageLimit }: { leadPage: number; leadPageLimit: number }) => {
    const filtersObject: Record<string, string> = {};
    for (const filter of debouncedFilters) {
      filtersObject[filter.name] = filter.value;
    }

    const requestData = {
      token: auth.token,
      page: leadPage,
      limit: leadPageLimit,
      ...filtersObject,
    };
    dispatch(fetchBusinessesAction(requestData));
  };

  useEffect(() => {
    // Set a timeout to update the debouncedFilters after 500ms
    const delay = 500;
    const timeoutId = setTimeout(() => {
      setDebouncedFilters(leadFilters);
    }, delay);

    // Clear the timeout if the component is unmounted or if leadFilters change before the timeout is reached
    return () => {
      clearTimeout(timeoutId);
    };
  }, [leadFilters]);

  useEffect(() => {
    if (debouncedFilters.length > 0) {
      loadMoreBusinesses({ leadPage, leadPageLimit });
    }
  }, [debouncedFilters]);

  useEffect(() => {
    const resizeHandler = () => {
      if (mainRef.current) {
        const docHeight = document.documentElement.clientHeight;
        const mainTop = mainRef.current.getBoundingClientRect().top;
        const remainingHeight = docHeight - mainTop;
        setMainHeight(remainingHeight);
      }
    };

    resizeHandler();
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return (
    <>
      {/* Action tab */}
      <div className="xl:hidden">
        <ActionBar title="Lead" isLoading={isLoading} />
      </div>

      <div className="bg-gray-100">
        {/* Filters Head */}
        <div className="flex divide-x border-b border-gray-200 bg-white">
          {/* Filters Tab */}
          <div className={classNames(filtersPanelWidth && 'xl:max-w-lg 2xl:max-w-xl', 'hidden w-full max-w-sm xl:block', 'transition-all duration-500 ease-in-out')}>
            <div className="hidden sm:block">
              <div className="flex items-center justify-between px-4">
                <nav className="-mb-px -ml-4 flex space-x-8" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <a key={tab.name} href={tab.href} className={classNames(tab.current ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'whitespace-nowrap border-b-2 px-10 py-5 text-sm font-medium')} aria-current={tab.current ? 'page' : undefined}>
                      {tab.name}
                    </a>
                  ))}
                </nav>
                <a className="inline-flex cursor-pointer items-center text-sm font-semibold" onClick={() => setFiltersPanelWidth(!filtersPanelWidth)}>
                  <ChevronLeftIcon className={classNames(!filtersPanelWidth && '-rotate-180', 'h-5 w-5 transform transition duration-300')} aria-hidden="true" />
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
                  <div className="max-w-md flex-grow">{leadFilters[0] && <CustomTextField label={leadFilters[0]?.label} name={leadFilters[0]?.name} value={leadFilters[0]?.value} onChange={handleChange} placeholder={`Search ${leadFilters[0].label.toLowerCase()} title...`} />}</div>

                  <a className="inline-flex items-center whitespace-nowrap text-sm font-semibold">Saved searches</a>
                </div>
                {/* Mobile advanced search filters */}
                <div className="xl:hidden">
                  <IconButton className="xl:hidden" variant="outlined" color="red" ringOffset="white" onClick={() => setIsOpenMobileFiltersDialog(true)}>
                    <>
                      <AdjustmentsVerticalIcon className="h-5 w-5 group-hover:hidden group-focus:hidden xl:hidden" aria-hidden="true" />
                      <AdjustmentsVerticalIconSolid className="hidden h-5 w-5 max-xl:group-hover:inline-block max-xl:group-focus:inline-block xl:hidden" aria-hidden="true" />
                    </>
                  </IconButton>

                  <Transition appear show={isOpenMobileFiltersDialog} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={() => setIsOpenMobileFiltersDialog(false)}>
                      <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                      </Transition.Child>

                      <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-5xl transform divide-y overflow-hidden rounded bg-white text-left align-middle shadow-xl transition-all">
                              <Dialog.Title as="h3" className="px-6 py-4 text-lg font-medium leading-6 text-indigo-600">
                                <div className="flex items-center justify-between">
                                  <AdjustmentsVerticalIcon className="mr-3 h-5 w-5" aria-hidden="true" />
                                  <div className="min-w-0 flex-1">
                                    <h2 className="text-lg leading-7 sm:truncate sm:text-xl sm:tracking-tight">Lead Filters</h2>
                                  </div>
                                  <div className="flex items-center space-x-3 md:ml-4">
                                    <p className="hidden text-sm sm:block">0 results</p>
                                    <button type="button" className="ml-3 inline-flex items-center rounded bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                      Search
                                    </button>
                                    <button onClick={() => setIsOpenMobileFiltersDialog(false)} type="button" className="rounded-full p-2 shadow-sm hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                  </div>
                                </div>
                              </Dialog.Title>
                              <div className="p-6">
                                <h3>Top Filters</h3>
                                <div className="mr-6 mt-6 border shadow sm:rounded">
                                  <ul role="list" className="grid grid-cols-1 divide-x divide-y md:grid-cols-2">
                                    <li>
                                      <Disclosure as="div">
                                        {({ open }) => (
                                          <>
                                            <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-6 text-left hover:bg-gray-50 focus:outline-none sm:px-6">
                                              <span>Your leads & accounts</span>
                                              {open ? <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="space-y-4 p-4 sm:px-6">
                                              <div>
                                                <span className="inline-flex items-center gap-x-0.5 rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                                                  Badge
                                                  <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded hover:bg-indigo-600/20">
                                                    <span className="sr-only">Remove</span>
                                                    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75">
                                                      <path d="M4 4l6 6m0-6l-6 6" />
                                                    </svg>
                                                    <span className="absolute -inset-1" />
                                                  </button>
                                                </span>
                                              </div>
                                              <div>
                                                <input type="email" name="email" id="email" className="block w-full rounded border-0 px-3 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="you@example.com" />
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
                                            <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-6 text-left hover:bg-gray-50 focus:outline-none sm:px-6">
                                              <span>Relationship</span>
                                              {open ? <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="space-y-4 p-4 sm:px-6">
                                              <div>
                                                <span className="inline-flex items-center gap-x-0.5 rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                                                  Badge
                                                  <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded hover:bg-indigo-600/20">
                                                    <span className="sr-only">Remove</span>
                                                    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75">
                                                      <path d="M4 4l6 6m0-6l-6 6" />
                                                    </svg>
                                                    <span className="absolute -inset-1" />
                                                  </button>
                                                </span>
                                              </div>
                                              <div>
                                                <input type="email" name="email" id="email" className="block w-full rounded border-0 px-3 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="you@example.com" />
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
                                            <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-6 text-left hover:bg-gray-50 focus:outline-none sm:px-6">
                                              <span>Company</span>
                                              {open ? <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="space-y-4 p-4 sm:px-6">
                                              <div>
                                                <span className="inline-flex items-center gap-x-0.5 rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                                                  Badge
                                                  <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded hover:bg-indigo-600/20">
                                                    <span className="sr-only">Remove</span>
                                                    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75">
                                                      <path d="M4 4l6 6m0-6l-6 6" />
                                                    </svg>
                                                    <span className="absolute -inset-1" />
                                                  </button>
                                                </span>
                                              </div>
                                              <div>
                                                <input type="email" name="email" id="email" className="block w-full rounded border-0 px-3 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="you@example.com" />
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
                                            <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-6 text-left hover:bg-gray-50 focus:outline-none sm:px-6">
                                              <span>Industry</span>
                                              {open ? <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="space-y-4 p-4 sm:px-6">
                                              <div>
                                                <span className="inline-flex items-center gap-x-0.5 rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                                                  Badge
                                                  <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded hover:bg-indigo-600/20">
                                                    <span className="sr-only">Remove</span>
                                                    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75">
                                                      <path d="M4 4l6 6m0-6l-6 6" />
                                                    </svg>
                                                    <span className="absolute -inset-1" />
                                                  </button>
                                                </span>
                                              </div>
                                              <div>
                                                <input type="email" name="email" id="email" className="block w-full rounded border-0 px-3 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="you@example.com" />
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
                                            <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-6 text-left hover:bg-gray-50 focus:outline-none sm:px-6">
                                              <span>Company headcount</span>
                                              {open ? <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="space-y-4 p-4 sm:px-6">
                                              <div>
                                                <span className="inline-flex items-center gap-x-0.5 rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                                                  Badge
                                                  <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded hover:bg-indigo-600/20">
                                                    <span className="sr-only">Remove</span>
                                                    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75">
                                                      <path d="M4 4l6 6m0-6l-6 6" />
                                                    </svg>
                                                    <span className="absolute -inset-1" />
                                                  </button>
                                                </span>
                                              </div>
                                              <div>
                                                <input type="email" name="email" id="email" className="block w-full rounded border-0 px-3 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="you@example.com" />
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
                                            <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-6 text-left hover:bg-gray-50 focus:outline-none sm:px-6">
                                              <span>Function</span>
                                              {open ? <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="space-y-4 p-4 sm:px-6">
                                              <div>
                                                <span className="inline-flex items-center gap-x-0.5 rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                                                  Badge
                                                  <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded hover:bg-indigo-600/20">
                                                    <span className="sr-only">Remove</span>
                                                    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75">
                                                      <path d="M4 4l6 6m0-6l-6 6" />
                                                    </svg>
                                                    <span className="absolute -inset-1" />
                                                  </button>
                                                </span>
                                              </div>
                                              <div>
                                                <input type="email" name="email" id="email" className="block w-full rounded border-0 px-3 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="you@example.com" />
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
        <div className="mb-3 justify-between divide-x pb-20 xl:mb-0 xl:flex">
          {/* Filters Menu */}
          <div className={classNames(filtersPanelWidth && 'xl:max-w-lg 2xl:max-w-xl', 'relative hidden w-full max-w-sm bg-white xl:block', 'transition-all duration-500 ease-in-out')}>
            <div className="flex w-full items-center justify-between border-b bg-white px-4 py-4 text-sm shadow">
              <label htmlFor="selectAll" className="leading-6 text-gray-900">
                0 filters applied
              </label>
            </div>
            <div className="mb-2 hidden overflow-y-scroll p-4 pb-24 xl:col-span-4 xl:block" ref={mainRef} style={{ height: mainHeight }}>
              <div>
                <ul role="list" className="divide-y rounded border bg-gray-100 shadow">
                  {leadFilters.map((filter) =>
                    filter.name !== 'name' ? (
                      <li key={filter.name}>
                        <Accordion label={filter.label} name={filter.name} value={filter.value} handleChange={handleChange} />
                      </li>
                    ) : (
                      <React.Fragment key={filter.name} />
                    )
                  )}
                </ul>
              </div>
            </div>
            {/* Action buttons */}
            <div className={classNames(filtersPanelWidth && 'xl:max-w-lg 2xl:max-w-xl', 'fixed bottom-0 w-full flex-shrink-0 border-t border-gray-200 bg-white px-4 py-5 sm:px-6')}>
              <div className="flex items-center justify-between">
                {draftLeadId && (
                  <>
                    <Button variant="outlined" color="red" onClick={() => setIsOpenLeadDeletionDialog(!isOpenLeadLeadDeletionDialog)}>
                      Delete
                    </Button>
                    <LeadDeletionDialog isOpen={isOpenLeadLeadDeletionDialog} closeModal={() => setIsOpenLeadDeletionDialog(!isOpenLeadLeadDeletionDialog)} />
                  </>
                )}
                <div className="ml-auto flex justify-end space-x-3">
                  {/* {!draftLeadId && <a className="inline-flex cursor-pointer items-center text-sm font-semibold">Clear all</a>}
                  {draftLeadId && <a className="inline-flex cursor-pointer items-center text-sm font-semibold">Go back</a>} */}
                  <>
                    <Button variant="contained" color="indigo" onClick={() => setIsOpenLeadSaveDialog(!isOpenLeadSaveDialog)}>
                      {draftLeadId ? 'Update' : 'Save'} search
                    </Button>
                    <LeadSaveDialog isOpen={isOpenLeadSaveDialog} closeModal={() => setIsOpenLeadSaveDialog(!isOpenLeadSaveDialog)} />
                  </>
                </div>
              </div>
            </div>
          </div>
          {/* Filters Table */}
          <div className="flex-grow">
            <TableLead loadMoreBusinesses={loadMoreBusinesses} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Lead;
