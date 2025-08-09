import React from 'react';

import { FingerPrintIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';

import ActionBar from '../components/Surfaces/ActionBar/ActionBar';
import { classNames } from '../utils/helpers';

interface INavigationAttributes {
  href: string;
  icon: React.ElementType;
  description: string;
  name: string;
}

const SettingsLayout: React.FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => {
  const router = useRouter();
  const { pathname } = router;
  const navigationItems: INavigationAttributes[] = [
    { href: '/settings/profile', icon: UserCircleIcon, name: 'Profile', description: 'This information will be displayed publicly so be careful what you share.' },
    { href: '/settings/security', icon: FingerPrintIcon, name: 'Security', description: 'Securely update your account password for enhanced protection. This information will be applied quickly.' }
  ];

  return (
    <>
      {/* Action tab */}
      <div>
        <ActionBar title="Settings" isLoading={false} />
      </div>

      <div className="flex flex-1 flex-col bg-gray-100 p-4 xl:pb-4 dark:bg-charcoal-200 lg:dark:bg-charcoal-300">
        <div className="flex flex-1 flex-col sm:max-w-7xl lg:p-4 xl:mx-auto dark:bg-charcoal-300">
          <div className="lg:flex lg:gap-x-16">
            <aside className="flex flex-col overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 dark:border-charcoal-100">
              <nav className="flex-none px-4 sm:px-6 lg:px-0">
                <ul className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
                  {navigationItems.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className={classNames(pathname === item.href ? 'bg-gray-50 text-indigo-600 dark:bg-charcoal-400 dark:text-indigo-300' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-primary-text dark:hover:bg-charcoal-500 dark:hover:text-primary-text', 'group flex w-full gap-x-3 rounded py-2 pl-2 pr-3 text-sm font-semibold leading-6')}>
                        <item.icon className={classNames(pathname === item.href ? 'text-indigo-600 dark:text-indigo-300' : 'text-gray-400 group-hover:text-indigo-600 dark:text-primary-text dark:hover:bg-charcoal-600 dark:group-hover:text-primary-text', 'h-6 w-6 shrink-0')} aria-hidden="true" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              {navigationItems.map((item, index) => (
                <div key={index} className={classNames('block lg:hidden', pathname === item.href ? 'block' : 'hidden', 'px-6 pt-2 lg:px-0')}>
                  <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-primary-text">{item.description}</p>
                </div>
              ))}
            </aside>
            <main className="px-4 py-4 sm:px-6 lg:flex-auto lg:px-0 xl:max-w-md">
              <div className={classNames('mx-auto w-full lg:mx-0 xl:max-w-2xl', pathname === '/settings/profile' ? 'space-y-16 sm:space-y-20' : '')}>
                {navigationItems.map((item, index) => (
                  <div key={index} className={pathname === item.href ? 'block' : 'hidden'}>
                    <h2 className={'hidden text-base font-semibold leading-7 text-gray-900 lg:block dark:text-primary-text'}>{item.name}</h2>
                    <p className="mt-1 hidden text-sm leading-6 text-gray-500 lg:block dark:text-primary-text">{item.description}</p>

                    {children}
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsLayout;
