import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { EllipsisVerticalIcon, ListBulletIcon, MagnifyingGlassCircleIcon } from '@heroicons/react/20/solid';
import { Menu, Switch } from '@headlessui/react';
import Avatar from '../../DataDisplay/Avatar/Avatar';
import _Menu from '../../Navigation/Menu/Menu';
import CustomMenu from '../../Navigation/CustomMenu/CustomMenu';
import Checkbox from '../../Inputs/Checkbox/Checkbox';
import { IBusinessAttributes } from 'validator/interfaces';
import { setHomePageBusinessIdsAction, setHomePagePaginationPageAction } from '../../../store/actions/homePageActions';
import { classNames } from '../../../utils/helpers';
import { IBusinessState } from '../../../store/reducers/businessReducer';
import { IHomePageState } from '../../../store/reducers/homePageReducer';
import { IOption } from '../../Inputs/Select/Select.interfaces';
import Select from '../../Inputs/Select/Select';

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

const cityOptions: IOption[] = [
  { id: '1', name: 'Relevance', value: '' },
  { id: '2', name: 'Alphabetical', value: 'San Francisco' },
  { id: '3', name: 'New First', value: 'Houston' },
  { id: '3', name: 'New Last', value: 'Houston' },
];

interface ITable {
  loadMoreBusinesses: ({ page, limit }: { page: number; limit: number }) => void;
}

const TableLead: React.FC<ITable> = ({ loadMoreBusinesses }) => {
  const dispatch = useDispatch();
  const businesses = useSelector((state: { businesses: IBusinessState }) => state.businesses);
  const home = useSelector((state: { home: IHomePageState }) => state.home);

  const businessesDataBusinesses: { [key: string]: IBusinessAttributes } = businesses.data.businesses;
  const businessesTotalRecords: number = businesses.data.totalRecords;
  const isLeadPageLoading = home.isLoading;
  const leadPageBusinessIds: string[] = home.businessIds;
  const leadPagePaginationPage: number = home.page;
  const leadPagePaginationLimit: number = home.pageLimit;

  const [tableHeight, setTableHeight] = useState<number | undefined>(undefined);
  const [selectedBusinessIds, setSelectedBusinessIds] = useState<string[]>([]);
  const [isSwitch, setIsSwitch] = useState<boolean>(false);

  const handleCheckboxChange = (businessId: string) => {
    setSelectedBusinessIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(businessId)) {
        return prevSelectedIds.filter((id) => id !== businessId);
      } else {
        return [...prevSelectedIds, businessId];
      }
    });
  };

  const isBusinessSelected = (businessId: string) => {
    return selectedBusinessIds.includes(businessId);
  };

  const isAllBusinessesSelected = () => {
    return Object.keys(businessesDataBusinesses).every((businessId) => selectedBusinessIds.includes(businessId));
  };

  const handleSelectAllChange = () => {
    if (isAllBusinessesSelected()) {
      setSelectedBusinessIds([]);
    } else {
      setSelectedBusinessIds(Object.keys(businessesDataBusinesses));
    }
  };

  useEffect(() => {
    dispatch(setHomePageBusinessIdsAction(selectedBusinessIds));
  }, [selectedBusinessIds]);

  useEffect(() => {
    const calculateTableHeight = () => {
      const container = document.getElementById('table-lead-container');

      if (container) {
        const remainingSpace = window.innerHeight - container.getBoundingClientRect().top;
        setTableHeight(remainingSpace);
      }
    };

    calculateTableHeight();

    const handleResize = () => {
      calculateTableHeight();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const onNext = () => {
    const nextPage = leadPagePaginationPage + 1;
    dispatch(setHomePagePaginationPageAction(nextPage));
    loadMoreBusinesses({ page: nextPage, limit: leadPagePaginationLimit });
  };

  return (
    <>
      {/* Table */}
      <div className="flex w-full items-center bg-white text-sm shadow">
        <div className="mr-auto flex items-center">
          <div className="relative flex w-full items-start py-4 pl-10">
            <div className="flex h-6 items-center">
              <Checkbox id="selectAll" name="selectAll" checked={isAllBusinessesSelected()} onChange={handleSelectAllChange} />
            </div>
            <label htmlFor="selectAll" className="px-4 leading-6 text-gray-900 sm:px-6">
              Select all
            </label>
          </div>

          <div className="mx-6 my-0 flex h-auto flex-col items-center self-stretch whitespace-nowrap border-r"></div>

          <CustomMenu>
            <Menu.Button disabled={true} className="inline-flex w-full justify-center whitespace-nowrap px-3 py-2 text-sm text-gray-500 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white">
              <ListBulletIcon className="mr-0.5 h-5 w-5" aria-hidden="true" />
              Save to list
            </Menu.Button>
          </CustomMenu>
        </div>
        <div className="mx-6 my-0 flex h-auto flex-col items-center self-stretch whitespace-nowrap border-r"></div>
        <div className="inline-flex items-center space-x-2">
          <label>Business:</label>
          <Switch checked={isSwitch} onChange={(checked: boolean) => setIsSwitch(checked)} className={classNames(isSwitch ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-26 flex-shrink-0 cursor-pointer rounded border-2 border-transparent transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2')}>
            <span className="sr-only">Use setting</span>
            <span className={classNames(isSwitch ? 'translate-x-14' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-12 transform rounded bg-white shadow ring-0 transition duration-200 ease-in-out')}>
              <span className={classNames(isSwitch ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity')} aria-hidden="true">
                <span className="text-xxs">Recent</span>
              </span>
              <span className={classNames(isSwitch ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity')} aria-hidden="true">
                <span className="text-xxs">Saved</span>
              </span>
            </span>
          </Switch>
        </div>
        <div className="mx-6 my-0 flex h-auto flex-col items-center self-stretch whitespace-nowrap border-r"></div>
        <div className="inline-flex items-center space-x-2">
          <label>Sort: </label>
          <Select options={cityOptions} />
        </div>
        {businessesTotalRecords !== null && (
          <>
            <div className="mx-6 my-0 flex h-auto flex-col items-center self-stretch whitespace-nowrap border-r"></div>
            <div className="h-full whitespace-nowrap pr-14">{`Selected: ${leadPageBusinessIds.length} | Total: ${businessesTotalRecords}`}</div>
          </>
        )}
      </div>
      {/* Empty State */}
      <div className={classNames(Object.values(businessesDataBusinesses).length > 0 && 'hidden', 'h-full rounded p-4')}>
        <div className="flex h-full flex-col items-center justify-center bg-white">
          <MagnifyingGlassCircleIcon className="-ml-0.5 h-32 w-32 text-indigo-600" aria-hidden="true" />
          <div className="text-center">
            <h3 className="mt-2 text-lg font-normal text-gray-900">Apply filters to find leads</h3>
            <p className="mt-2 text-sm text-gray-500">Leads matching your search criteria will be displayed here</p>
          </div>
        </div>
      </div>

      {/* Table Body */}
      <div id="table-lead-container" style={{ height: tableHeight, overflowY: 'auto' }} className={classNames(Object.values(businessesDataBusinesses).length < 1 && 'hidden', 'p-4')}>
        <InfiniteScroll dataLength={Object.keys(businessesDataBusinesses).length} next={onNext} hasMore={Object.keys(businessesDataBusinesses).length < (businessesTotalRecords || 0)} loader={<></>} scrollableTarget="table-lead-container">
          {/* Existing code for TableLead */}
          <ul role="list" className={classNames(isLeadPageLoading && 'group animate-pulse', 'divide-y rounded border bg-white shadow')}>
            {Object.values(businessesDataBusinesses).map((business: IBusinessAttributes, index) => (
              <li key={index} className={classNames(index === 0 && 'hover:rounded-t', index === Object.values(businessesDataBusinesses).length - 1 && 'hover:rounded-b', 'hover:bg-gray-100')}>
                <div className="relative flex w-full items-start px-6 py-5">
                  <div className="mt-2 flex h-6 items-center md:mt-3 xl:mt-6">
                    <div className="group-block hidden h-5 w-5 rounded bg-slate-300"></div>
                    <Checkbox id={business.name} name={business.name} checked={isBusinessSelected(business.id)} onChange={() => handleCheckboxChange(`${business.id}`)} className="group-hidden" />
                  </div>
                  <div className="w-full text-sm leading-6">
                    <label htmlFor={business.name} className="relative flex cursor-pointer justify-between gap-x-6 px-4 sm:px-6">
                      <div className="flex gap-x-4">
                        <div className="group-block hidden h-10 w-10 rounded-full bg-slate-300 md:h-12 md:w-12 xl:h-16 xl:w-16"></div>
                        <Avatar image={images[Math.floor(Math.random() * images.length)]} firstName={business.name} size="large" border="border border-gray-900" className="group-hidden" />
                        <div className="min-w-0 flex-auto">
                          <div className="group-block mb-1 hidden h-6 w-40 rounded bg-slate-300"></div>
                          <p className="text-lg font-semibold leading-6 text-gray-900">
                            <a href="#" className="group-hidden">
                              {business.name}
                            </a>
                          </p>
                          <div className="hidden sm:flex sm:flex-col">
                            <div className="group-block mb-3 hidden h-4 w-24 rounded bg-slate-300"></div>
                            <p className="group-hidden text-sm leading-6 text-gray-900">{business.businessDomain?.toUpperCase()}</p>
                            {'3h ago' ? (
                              <p className="group-hidden mt-1 text-xs leading-5 text-gray-500">
                                Last seen <time dateTime="2023-01-23T13:23Z">3h ago</time>
                              </p>
                            ) : (
                              <div className="group-hidden mt-1 flex items-center gap-x-1.5">
                                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                </div>
                                <p className="text-xs leading-5 text-gray-500">Online</p>
                              </div>
                            )}
                            <div className="group-block hidden h-3 w-24 rounded bg-slate-300"></div>
                          </div>
                          <div className="group-block mt-3 hidden h-3 w-24 rounded bg-slate-300"></div>
                          <p className="mt-1 flex text-xs leading-5 text-gray-500">
                            {business?.BusinessPhone && (
                              <a href={`mailto:${business.BusinessPhone.numberNationalFormatted}`} className="group-hidden relative truncate hover:underline">
                                {business.BusinessPhone.numberNationalFormatted}
                              </a>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-x-4">
                        <div className="flex flex-none items-center gap-x-4">
                          <div className="group-block hidden h-5 w-16 rounded-full bg-slate-300"></div>
                          <CustomMenu>
                            <Menu.Button className="group-hidden flex items-center justify-center rounded-full border border-indigo-600 px-2.5 py-0.5 text-xs font-semibold text-indigo-600 ring-indigo-600 transition duration-200 hover:bg-indigo-50 hover:bg-opacity-70 focus:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-white">Save</Menu.Button>
                          </CustomMenu>
                          <div className="group-block -mr-3.5 hidden h-4 w-1 rounded bg-slate-300"></div>
                          <_Menu options={leadItemMenu} className="group-hidden block p-1.5 text-gray-500 hover:text-gray-900 focus:border focus:border-gray-900 focus:ring-gray-900 focus:ring-offset-white">
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
        </InfiniteScroll>
      </div>
    </>
  );
};

export default TableLead;
