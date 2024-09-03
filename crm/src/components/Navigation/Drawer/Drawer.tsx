import React, { Fragment, useEffect } from 'react';

import { Transition, Dialog, Switch } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';

import { type IFilterAttributes, type IHomePageState } from 'store/reducers/homePageReducer';

import { type IDrawerProps } from './Drawer.interfaces';
import { setHomePageRemoveSavedBusinessAction } from '../../../store/actions/homePageActions';
import { classNames } from '../../../utils/helpers';
import TableSortingMenu from '../../DataDisplay/Menu/TableSortingMenu';

const viewOptions = [
  { title: 'All', description: 'This job posting can be viewed by anyone who has the link.', current: true, value: 'all', name: 'view' },
  { title: 'Selected', description: 'This job posting will no longer be publicly accessible.', current: false, value: 'selected', name: 'view' },
  { title: 'Saved', description: 'This job posting will no longer be publicly accessible.', current: false, value: 'saved', name: 'view' }
];

const sortOptions = [
  { title: 'Relevance', description: 'Sort by relevance score', current: true, value: 'relevance', name: 'sort' },
  { title: 'Alphabetical', description: 'Sort by name', current: false, value: 'alphabetical', name: 'sort' },
  { title: 'New First', description: 'Sort by', current: false, value: 'newFirst', name: 'sort' }
];

interface ISortOption {
  title: string;
  description: string;
  current: boolean;
  value: string;
  name: string;
}

const Drawer: React.FC<IDrawerProps> = ({ isOpen, closeDrawer, leadPageRemoveSavedBusinesses, draftLeadBusinessIds, handleChange }: IDrawerProps): JSX.Element => {
  const dispatch = useDispatch();
  const home = useSelector((state: { home: IHomePageState }) => state.home);

  const leadPageFilters: IFilterAttributes = home.filters;

  const getSortValue = (sortOptions: ISortOption[]): ISortOption | undefined => {
    return sortOptions.find((option) => (option.value === 'alphabetical' || option.value === 'newFirst' ? option.value === leadPageFilters.sort.value.replace('Ascending', '').replace('Descending', '') : option.value === leadPageFilters.sort.value));
  };

  useEffect(() => {
    console.log('View: ', home.filters.view);
    console.log('Sort: ', home.filters.sort);
  }, [home]);

  return (
    <>
      {/* Mobile navigation */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={closeDrawer} className="relative z-30">
          <Transition.Child as={Fragment} enter="ease-out duration-500" leave="ease-in duration-500">
            <div className="fixed inset-0 bg-white/10 backdrop-blur-md" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="translate-x-full sm:duration-700" enterTo="translate-x-0" leave="ease-in duration-200" leaveFrom="translate-x-0" leaveTo="translate-x-full sm:duration-500">
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700">
                    <form className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl dark:bg-charcoal-200">
                      <div className="flex-1">
                        {/* Header */}
                        <div className="bg-gray-50 px-4 py-6 xl:px-6 dark:bg-charcoal-300">
                          <div className="flex items-start justify-between space-x-3">
                            <div className="space-y-1">
                              <Dialog.Title className="text-base font-semibold leading-6 text-gray-900 dark:text-primary-text">Filters</Dialog.Title>
                              <p className="text-sm text-gray-500 dark:text-secondary-text">Apply filters to alter the table rows.</p>
                            </div>
                            <div className="flex h-7 items-center">
                              <button type="button" onClick={closeDrawer} className="relative text-gray-400 hover:text-gray-500 dark:hover:text-primary-text">
                                <span className="absolute -inset-2.5" />
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Divider container */}
                        <div className="divide-y divide-gray-200 border-b border-b-gray-200 sm:py-0 dark:divide-charcoal-100 dark:border-b-charcoal-100">
                          {/* Saved Businesses */}
                          {draftLeadBusinessIds !== undefined && draftLeadBusinessIds?.length > 0 && (
                            <>
                              <div className="flex items-center justify-between px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 xl:px-6">
                                <div>
                                  <label htmlFor="project-name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-secondary-text">
                                    Saved Businesses:
                                  </label>
                                </div>
                                <div className="flex justify-end sm:col-span-2">
                                  <div className="inline-flex">
                                    <Switch
                                      checked={leadPageRemoveSavedBusinesses}
                                      onChange={(checked: boolean) => {
                                        dispatch(setHomePageRemoveSavedBusinessAction(checked));
                                      }}
                                      className={classNames(leadPageRemoveSavedBusinesses ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-26 flex-shrink-0 cursor-pointer rounded border-2 border-transparent transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2')}
                                    >
                                      <span className="sr-only">Use setting</span>
                                      <span className={classNames(leadPageRemoveSavedBusinesses ? 'translate-x-14' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-12 transform rounded bg-white shadow ring-0 transition duration-200 ease-in-out')}>
                                        <span className={classNames(leadPageRemoveSavedBusinesses ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity')} aria-hidden="true">
                                          <span className="text-xxs">Keep</span>
                                        </span>
                                        <span className={classNames(leadPageRemoveSavedBusinesses ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity')} aria-hidden="true">
                                          <span className="text-xxs">Remove</span>
                                        </span>
                                      </span>
                                    </Switch>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          {/* Business: */}
                          <div className="flex items-center justify-between px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 xl:px-6">
                            <div>
                              <label htmlFor="project-description" className="block text-sm font-medium leading-6 text-gray-900 dark:text-secondary-text">
                                Business:
                              </label>
                            </div>
                            <div className="flex justify-end sm:col-span-2">
                              <div className="inline-flex">
                                <TableSortingMenu options={viewOptions} value={viewOptions.find((option) => option.value === leadPageFilters.view.value)} handleChange={handleChange} />
                              </div>
                            </div>
                          </div>

                          {/* Sort: */}
                          <div className="flex items-center justify-between px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 xl:px-6">
                            <div>
                              <label htmlFor="project-description" className="block text-sm font-medium leading-6 text-gray-900 dark:text-secondary-text">
                                Sort:
                              </label>
                            </div>
                            <div className="flex justify-end sm:col-span-2">
                              <div className="inline-flex">
                                <TableSortingMenu options={sortOptions} value={getSortValue(sortOptions)} handleChange={handleChange} />
                              </div>
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

export default Drawer;
