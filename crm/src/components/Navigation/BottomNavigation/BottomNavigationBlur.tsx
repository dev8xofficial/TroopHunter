import React, { useEffect, useState } from 'react';

import { MagnifyingGlassIcon, PlusIcon, ArrowLeftStartOnRectangleIcon, PresentationChartLineIcon, QueueListIcon, Cog6ToothIcon } from '@heroicons/react/20/solid';
import {} from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { useLocation, Link, useNavigate } from 'react-router-dom';

import { type IHomePageState } from '../../../store/reducers/homePageReducer';
import LeadSaveDialog from '../../Feedback/LeadSaveDialog/LeadSaveDialog';

interface DefaultLayoutProps {
  signOut: () => void;
}

const BottomNavigationBlur: React.FC<DefaultLayoutProps> = ({ signOut }: DefaultLayoutProps): JSX.Element => {
  const home = useSelector((state: { home: IHomePageState }) => state.home);

  const businessIds: string[] = home.businessIds;

  const [isOpenLeadSaveDialog, setIsOpenLeadSaveDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('/');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  const isActive = (path: string): boolean => {
    return activeTab === path;
  };

  return (
    <>
      {/* Mobile navigation */}
      <div className="fixed bottom-3 left-0 right-0 z-20 mx-auto flex max-w-fit flex-row items-center justify-around space-x-10 rounded-xl border border-gray-100 bg-gray-600/10 p-3 pb-7 text-sm shadow-2xl backdrop-blur-sm sm:mx-auto sm:max-w-fit xl:space-x-10 xl:p-3.5 xl:pb-7 dark:border-charcoal-100">
        <Link to="/" className="relative inline-block gap-1 rounded-xl bg-gray-50 p-2.5 dark:bg-charcoal-500 dark:text-gray-400 dark:hover:text-primary-text">
          <PresentationChartLineIcon className="h-5 w-5" aria-hidden="true" />
          {isActive('/') ? (
            <span className="absolute -bottom-3 right-1/2 block translate-x-1/2 translate-y-1/2 transform rounded-full border-2 border-white  dark:border-indigo-400">
              <span className="block h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-indigo-700" />
            </span>
          ) : (
            <></>
          )}
        </Link>
        <Link to="/leads" className="relative inline-block gap-1 rounded-xl bg-gray-50 p-2.5 dark:bg-charcoal-500 dark:text-gray-400 dark:hover:text-primary-text">
          <QueueListIcon className="h-5 w-5" aria-hidden="true" />
          {isActive('/leads') ? (
            <span className="absolute -bottom-3 right-1/2 block translate-x-1/2 translate-y-1/2 transform rounded-full border-2 border-white  dark:border-indigo-400">
              <span className="block h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-indigo-700" />
            </span>
          ) : (
            <></>
          )}
        </Link>
        <>
          <button
            className="active gap-1 rounded-xl bg-gray-50 p-2.5 text-indigo-600 dark:bg-charcoal-500 dark:text-indigo-300 dark:hover:text-primary-text"
            onClick={() => {
              if (!isActive('/')) navigate('/');
              if (businessIds.length > 0) setIsOpenLeadSaveDialog(!isOpenLeadSaveDialog);
              else
                setTimeout(() => {
                  document.getElementById('home-search')?.focus();
                }, 0);
            }}
          >
            {isActive('/') && businessIds.length > 0 ? <PlusIcon className="h-7 w-7" aria-hidden="true" /> : <MagnifyingGlassIcon className="h-7 w-7" aria-hidden="true" />}
          </button>
          <LeadSaveDialog
            isOpen={isOpenLeadSaveDialog}
            closeModal={() => {
              setIsOpenLeadSaveDialog(!isOpenLeadSaveDialog);
            }}
          />
        </>
        <Link to="/settings/profile" className="relative inline-block gap-1 rounded-xl bg-gray-50 p-2.5 dark:bg-charcoal-500 dark:text-gray-400 dark:hover:text-primary-text">
          <Cog6ToothIcon className="h-5 w-5" aria-hidden="true" />
          {isActive('/settings/profile') ? (
            <span className="absolute -bottom-3 right-1/2 block translate-x-1/2 translate-y-1/2 transform rounded-full border-2 border-white dark:border-indigo-400">
              <span className="block h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-indigo-700" />
            </span>
          ) : (
            <></>
          )}
        </Link>
        <Link to="#" onClick={signOut} className="relative inline-block gap-1 rounded-xl bg-gray-50 p-2.5 dark:bg-charcoal-500 dark:text-gray-400 dark:hover:text-primary-text">
          <ArrowLeftStartOnRectangleIcon className="h-5 w-5" aria-hidden="true" />
          {isActive('#') ? (
            <span className="absolute -bottom-3 right-1/2 block translate-x-1/2 translate-y-1/2 transform rounded-full border-2 border-white dark:border-indigo-400">
              <span className="block h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-indigo-700" />
            </span>
          ) : (
            <></>
          )}
        </Link>
      </div>
    </>
  );
};
export default BottomNavigationBlur;
