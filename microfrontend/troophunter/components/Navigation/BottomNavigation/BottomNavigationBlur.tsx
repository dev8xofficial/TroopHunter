import React, { useEffect, useState } from 'react';

import { ArrowLeftStartOnRectangleIcon as ArrowLeftStartOnRectangleIconSolid, HomeIcon as HomeIconSolid, Bars3CenterLeftIcon as Bars3CenterLeftIconSolid, Cog6ToothIcon as Cog6ToothIconSolid } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon, ArrowLeftStartOnRectangleIcon, HomeIcon, Bars3CenterLeftIcon, Cog6ToothIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { resetHomePageDraftLeadIdAction, resetHomePageFiltersAction, resetHomePageBusinessIdsAction } from '../../../store/actions/homePageActions';
import { type IHomePageState } from '../../../store/reducers/homePageReducer';
import LeadSaveDialog from '../../Feedback/LeadSaveDialog/LeadSaveDialog';

interface DefaultLayoutProps {
  signOut: () => void;
}

const BottomNavigationBlur: React.FC<DefaultLayoutProps> = ({ signOut }: DefaultLayoutProps): JSX.Element => {
  const [isOpenLeadSaveDialog, setIsOpenLeadSaveDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('/lead');
  const router = useRouter();
  const dispatch = useDispatch();
  const home = useSelector((state: { home: IHomePageState }) => state.home);

  useEffect(() => {
    if (router.pathname.length > 0) {
      setActiveTab(router.pathname);
    }
  }, [router.pathname]);

  const isActive = (path: string): boolean => {
    return activeTab === path;
  };

  const isEditingLead = home.draftLeadId.length > 0;

  const handleClearLead = (): void => {
    dispatch(resetHomePageDraftLeadIdAction(''));
    dispatch(resetHomePageFiltersAction());
    dispatch(resetHomePageBusinessIdsAction());
  };

  return (
    <>
      {/* Mobile navigation */}
      <div className="fixed bottom-2 left-0 right-0 z-20 mx-auto flex max-w-fit flex-row items-center justify-around space-x-6 rounded-xl border border-gray-100 bg-gray-600/10 px-2 py-1 text-sm shadow-2xl backdrop-blur-sm sm:mx-auto sm:max-w-fit xl:space-x-10 xl:px-2.5 xl:py-1.5 dark:border-charcoal-100">
        <Link href="/lead" className={`relative inline-block gap-1 rounded-xl bg-transparent p-2.5 ${isActive('/lead') ? 'dark:text-primary-text' : 'dark:text-gray-400'} dark:hover:text-primary-text`}>
          {isActive('/lead') ? (
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
        <Link href="/leads" className={`relative inline-block gap-1 rounded-xl bg-transparent p-2.5 ${isActive('/leads') ? 'dark:text-primary-text' : 'dark:text-gray-400'} dark:hover:text-primary-text`}>
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
          {isEditingLead ? (
            <button className="group active gap-1 rounded-xl p-2.5" onClick={handleClearLead}>
              <XMarkIcon className="h-6 w-6 text-red-600 xl:h-7 xl:w-7 dark:text-red-400 dark:group-hover:text-red-300" aria-hidden="true" />
            </button>
          ) : (
            <button
              className="group active gap-1 rounded-xl p-2.5"
              onClick={() => {
                if (!isActive('/lead')) void router.push('/lead');
                else
                  setTimeout(() => {
                    document.getElementById('home-search')?.focus();
                    document.getElementById('home-search')?.click();
                  }, 0);
              }}
            >
              <MagnifyingGlassIcon className="h-6 w-6 text-indigo-600 xl:h-7 xl:w-7 dark:text-indigo-300 dark:group-hover:text-primary-text" aria-hidden="true" />
            </button>
          )}
          <LeadSaveDialog
            isOpen={isOpenLeadSaveDialog}
            closeModal={() => {
              setIsOpenLeadSaveDialog(!isOpenLeadSaveDialog);
            }}
          />
        </>
        <Link href="/settings/profile" className={`relative inline-block gap-1 rounded-xl bg-transparent p-2.5 ${isActive('/settings/profile') || isActive('/settings/security') ? 'dark:text-primary-text' : 'dark:text-gray-400'} dark:hover:text-primary-text`}>
          {isActive('/settings/profile') || isActive('/settings/security') ? (
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
        <Link href="#" onClick={signOut} className="relative inline-block gap-1 rounded-xl bg-transparent p-2.5 dark:text-gray-400 dark:hover:text-primary-text">
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
