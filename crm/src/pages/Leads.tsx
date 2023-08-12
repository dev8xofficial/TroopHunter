import { useSelector } from 'react-redux';

import Table from '../components/DataDisplay/Table/TableLeads';
import Search from '../components/Inputs/Search/Search';
import ActionBar from '../components/Surfaces/ActionBar/ActionBar';
import { type IHomePageState } from '../store/reducers/homePageReducer';

const Leads: React.FC = (): JSX.Element => {
  const home = useSelector((state: { home: IHomePageState }) => state.home);
  const isLeadPageLoading = home.isLoading;
  return (
    <>
      <header>
        <div className="hidden w-full items-center justify-center space-x-8 bg-gray-800 xl:flex">
          {/* Advanced Search */}
          <div className="mx-auto max-w-7xl flex-1 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-1 justify-center space-x-4">
              <Search />
              <span className="relative hidden whitespace-nowrap text-white md:inline-block">
                <button type="button" className="px-3.5 py-2.5 text-sm capitalize hover:text-indigo-600">
                  saved searches
                </button>
                <span className="absolute -right-4 top-0 rounded bg-red-600 px-1 text-xs">66+</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Action tab */}
      <ActionBar title="Leads" isLoading={isLeadPageLoading} />

      {/* Content */}
      <Table />
    </>
  );
};

export default Leads;
