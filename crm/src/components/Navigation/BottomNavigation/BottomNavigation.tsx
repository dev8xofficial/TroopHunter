import React from 'react';

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { ClockIcon, PresentationChartLineIcon, QueueListIcon, UserIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const BottomNavigation: React.FC = (): JSX.Element => {
  return (
    <>
      {/* Mobile navigation */}
      <div className="btm-nav z-20 h-16 bg-white text-sm shadow xl:hidden dark:bg-charcoal-700">
        <Link to="/" className="active gap-1 border-t-2 border-indigo-600 hover:bg-indigo-600 pt-0.5 hover:text-white text-indigo-600 hover:border-indigo-600">
          <PresentationChartLineIcon className="h-5 w-5" aria-hidden="true" />
          <span className="btm-nav-label">Home</span>
        </Link>
        <Link to="/leads" className="dark:border-charcoal-100 border-t-2 border-gray-100 pt-0.5 hover:border-gray-900 dark:hover:border-primary-text dark:hover:text-primary-text">
          <QueueListIcon className="h-5 w-5" aria-hidden="true" />
          <span className="btm-nav-label">Leads</span>
        </Link>
        <button className="dark:border-charcoal-100 group border-t-2 border-gray-100 pt-0.5">
          <div className="inline-flex items-center rounded-full p-3 text-sm shadow-sm max-xl:bg-indigo-600 max-xl:text-white max-xl:group-hover:ring-2 max-xl:group-hover:ring-indigo-600 max-xl:group-hover:ring-offset-4 max-xl:group-hover:ring-offset-white xl:rounded-md xl:border xl:border-indigo-600 xl:px-3 xl:py-2 xl:text-indigo-600">
            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Search</span>
          </div>
        </button>
        <Link to="/settings" className="dark:border-charcoal-100 border-t-2 border-gray-100 pt-0.5 hover:border-gray-900 dark:hover:border-primary-text dark:hover:text-primary-text">
          <UserIcon className="h-5 w-5" aria-hidden="true" />
          <span className="btm-nav-label">Profile</span>
        </Link>
        <Link to="#" className="dark:border-charcoal-100 border-t-2 border-gray-100 pt-0.5 hover:border-gray-900 dark:hover:border-primary-text dark:hover:text-primary-text">
          <ClockIcon className="h-5 w-5" aria-hidden="true" />
          <span className="btm-nav-label">History</span>
        </Link>
      </div>
    </>
  );
};
export default BottomNavigation;
