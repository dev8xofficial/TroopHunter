import React, { useEffect, useState } from 'react';

import { ArrowLeftStartOnRectangleIcon as ArrowLeftStartOnRectangleIconSolid, HomeIcon as HomeIconSolid, Bars3CenterLeftIcon as Bars3CenterLeftIconSolid, Cog6ToothIcon as Cog6ToothIconSolid } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon, PlusIcon, ArrowLeftStartOnRectangleIcon, HomeIcon, Bars3CenterLeftIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
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
      <div className="fixed bottom-2 left-0 right-0 z-20 mx-auto flex max-w-fit flex-row items-center justify-around space-x-6 rounded-xl border border-gray-100 bg-gray-600/10 px-2 py-1 text-sm shadow-2xl backdrop-blur-sm sm:mx-auto sm:max-w-fit xl:space-x-10 xl:px-2.5 xl:py-1.5 dark:border-charcoal-100">
        <Link to="/" className={`relative inline-block gap-1 rounded-xl bg-transparent p-2.5 ${isActive('/') ? 'dark:text-primary-text' : 'dark:text-gray-400'} dark:hover:text-primary-text`}>
          {isActive('/') ? (
            <>
              <HomeIconSolid className="h-6 w-6 xl:h-7 xl:w-7" aria-hidden="true" />
              <span className="absolute right-1/2 block translate-x-1/2 translate-y-1/2 transform rounded-full border border-white dark:border-transparent">
                <span className="block h-1 w-1 rounded-full bg-indigo-500 dark:bg-white" />
              </span>
            </>
          ) : (
            <HomeIcon className="h-6 w-6 xl:h-7 xl:w-7" aria-hidden="true" />
          )}
        </Link>
        <Link to="/leads" className={`relative inline-block gap-1 rounded-xl bg-transparent p-2.5 ${isActive('/leads') ? 'dark:text-primary-text' : 'dark:text-gray-400'} dark:hover:text-primary-text`}>
          {isActive('/leads') ? (
            <>
              <Bars3CenterLeftIconSolid className="h-6 w-6 xl:h-7 xl:w-7" aria-hidden="true" />
              <span className="absolute right-1/2 block translate-x-1/2 translate-y-1/2 transform rounded-full border border-white dark:border-transparent">
                <span className="block h-1 w-1 rounded-full bg-indigo-500 dark:bg-white" />
              </span>
            </>
          ) : (
            <Bars3CenterLeftIcon className="h-6 w-6 xl:h-7 xl:w-7" aria-hidden="true" />
          )}
        </Link>
        <>
          <button
            className="active gap-1 rounded-xl p-2.5 text-indigo-600 dark:text-indigo-300 dark:hover:text-primary-text"
            onClick={() => {
              if (!isActive('/')) navigate('/');
              if (businessIds.length > 0) setIsOpenLeadSaveDialog(!isOpenLeadSaveDialog);
              else
                setTimeout(() => {
                  document.getElementById('home-search')?.focus();
                }, 0);
            }}
          >
            {isActive('/') && businessIds.length > 0 ? <PlusIcon className="h-7 w-7 xl:h-8 xl:w-8" aria-hidden="true" /> : <MagnifyingGlassIcon className="h-7 w-7 xl:h-8 xl:w-8" aria-hidden="true" />}
          </button>
          <LeadSaveDialog
            isOpen={isOpenLeadSaveDialog}
            closeModal={() => {
              setIsOpenLeadSaveDialog(!isOpenLeadSaveDialog);
            }}
          />
        </>
        <Link to="/settings/profile" className={`relative inline-block gap-1 rounded-xl bg-transparent p-2.5 ${isActive('/settings/profile') ? 'dark:text-primary-text' : 'dark:text-gray-400'} dark:hover:text-primary-text`}>
          {isActive('/settings/profile') ? (
            <>
              <Cog6ToothIconSolid className="h-6 w-6 xl:h-7 xl:w-7" aria-hidden="true" />
              <span className="absolute right-1/2 block translate-x-1/2 translate-y-1/2 transform rounded-full border border-white dark:border-transparent">
                <span className="block h-1 w-1 rounded-full bg-indigo-500 dark:bg-white" />
              </span>
            </>
          ) : (
            <Cog6ToothIcon className="h-6 w-6 xl:h-7 xl:w-7" aria-hidden="true" />
          )}
        </Link>
        <Link to="#" onClick={signOut} className="relative inline-block gap-1 rounded-xl bg-transparent p-2.5 dark:text-gray-400 dark:hover:text-primary-text">
          {isActive('#') ? (
            <>
              <ArrowLeftStartOnRectangleIconSolid className="h-6 w-6 xl:h-7 xl:w-7" aria-hidden="true" />
              <span className="absolute right-1/2 block translate-x-1/2 translate-y-1/2 transform rounded-full border border-white dark:border-transparent">
                <span className="block h-1 w-1 rounded-full bg-indigo-500 dark:bg-white" />
              </span>
            </>
          ) : (
            <ArrowLeftStartOnRectangleIcon className="h-6 w-6 xl:h-7 xl:w-7" aria-hidden="true" />
          )}
        </Link>
      </div>
    </>
  );
};
export default BottomNavigationBlur;
