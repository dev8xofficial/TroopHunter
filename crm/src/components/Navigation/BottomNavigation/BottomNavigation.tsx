import React, { useEffect, useState } from 'react';

import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/20/solid';
import { ArrowLeftStartOnRectangleIcon, PresentationChartLineIcon, QueueListIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { useLocation, Link, useNavigate } from 'react-router-dom';

import { type IHomePageState } from '../../../store/reducers/homePageReducer';
import LeadSaveDialog from '../../Feedback/LeadSaveDialog/LeadSaveDialog';

interface DefaultLayoutProps {
  signOut: () => void;
}

const BottomNavigation: React.FC<DefaultLayoutProps> = ({ signOut }: DefaultLayoutProps): JSX.Element => {
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
      <div className="btm-nav z-20 h-16 bg-white text-sm shadow xl:hidden dark:bg-charcoal-700">
        <Link to="/" className={`active gap-1 border-t-2 ${isActive('/') ? 'border-indigo-600 pt-0.5 text-indigo-600' : 'border-gray-100 pt-0.5 hover:border-gray-900 dark:border-charcoal-100 dark:hover:border-primary-text dark:hover:text-primary-text'}`}>
          <PresentationChartLineIcon className="h-6 w-6" aria-hidden="true" />
          <span className="btm-nav-label">Home</span>
        </Link>
        <Link to="/leads" className={`active gap-1 border-t-2 ${isActive('/leads') ? 'border-indigo-600 pt-0.5 text-indigo-600' : 'border-gray-100 pt-0.5 hover:border-gray-900 dark:border-charcoal-100 dark:hover:border-primary-text dark:hover:text-primary-text'}`}>
          <QueueListIcon className="h-6 w-6" aria-hidden="true" />
          <span className="btm-nav-label">Leads</span>
        </Link>
        <button
          className="group border-t-2 border-gray-100 pt-0.5 dark:border-charcoal-100"
          onClick={() => {
            if (!isActive('/')) navigate('/');
            if (businessIds.length > 0) setIsOpenLeadSaveDialog(!isOpenLeadSaveDialog);
            else
              setTimeout(() => {
                document.getElementById('home-search')?.focus();
              }, 0);
          }}
        >
          <div className="inline-flex items-center rounded-full p-3 text-sm shadow-sm max-xl:bg-indigo-600 max-xl:text-white max-xl:group-hover:ring-2 max-xl:group-hover:ring-indigo-600 max-xl:group-hover:ring-offset-2 max-xl:group-hover:ring-offset-white xl:rounded-md xl:border xl:border-indigo-600 xl:px-3 xl:py-2 xl:text-indigo-600">
            {isActive('/') && businessIds.length > 0 ? <PlusIcon className="h-6 w-6" aria-hidden="true" /> : <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />}
            <span className="sr-only">Search</span>
          </div>
        </button>

        <LeadSaveDialog
          isOpen={isOpenLeadSaveDialog}
          closeModal={() => {
            setIsOpenLeadSaveDialog(!isOpenLeadSaveDialog);
          }}
        />
        <Link to="/settings/profile" className={`active gap-1 border-t-2 ${isActive('/settings/profile') || isActive('/settings/security') ? 'border-indigo-600 pt-0.5 text-indigo-600' : 'border-gray-100 pt-0.5 hover:border-gray-900 dark:border-charcoal-100 dark:hover:border-primary-text dark:hover:text-primary-text'}`}>
          <Cog6ToothIcon className="h-6 w-6" aria-hidden="true" />
          <span className="btm-nav-label">Settings</span>
        </Link>
        <Link to="#" onClick={signOut} className="border-t-2 border-gray-100 pt-0.5 hover:border-gray-900 dark:border-charcoal-100 dark:hover:border-primary-text dark:hover:text-primary-text">
          <ArrowLeftStartOnRectangleIcon className="h-6 w-6" aria-hidden="true" />
          <span className="btm-nav-label">Sign Out</span>
        </Link>
      </div>
    </>
  );
};
export default BottomNavigation;
