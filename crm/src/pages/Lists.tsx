import { useSelector } from 'react-redux';
import Table from '../components/DataDisplay/Table/Table';
import Search from '../components/Inputs/Search/Search';
import ActionBar from '../components/Surfaces/ActionBar/ActionBar';

const Lists = () => {
  const isLoading = useSelector((state: any) => state.lead.isLoading);
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
      <ActionBar title="Lists" isLoading={isLoading} />

      {/* Content */}
      <Table />
    </>
  );
};

export default Lists;
