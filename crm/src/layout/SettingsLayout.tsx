import React from 'react';

import { FingerPrintIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

import { classNames } from '../utils/helpers';

interface INavigationAttributes {
  href: string;
  icon: React.ElementType;
  description: string;
  name: string;
}

const SettingsLayout: React.FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => {
  const location = useLocation();
  const navigationItems: INavigationAttributes[] = [
    { href: '/settings/profile', icon: UserCircleIcon, name: 'Profile', description: 'This information will be displayed publicly so be careful what you share.' },
    { href: '/settings/security', icon: FingerPrintIcon, name: 'Security', description: 'This information will be applied quickly.' }
  ];

  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <div className="lg:flex lg:gap-x-16">
        <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0">
          <nav className="flex-none px-4 sm:px-6 lg:px-0">
            <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className={classNames(location.pathname === item.href ? 'bg-gray-50 text-indigo-600 dark:bg-charcoal-400 dark:text-indigo-500' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-primary-text dark:hover:bg-charcoal-500 dark:hover:text-primary-text', 'group flex w-full gap-x-3 rounded py-2 pl-2 pr-3 text-sm font-semibold leading-6')}>
                    <item.icon className={classNames(location.pathname === item.href ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600 dark:text-primary-text dark:hover:bg-charcoal-600 dark:group-hover:text-primary-text', 'h-6 w-6 shrink-0')} aria-hidden="true" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="w-full px-4 py-4 sm:px-6 lg:flex-auto lg:px-0">
          <div className={classNames('mx-auto w-full max-w-2xl lg:mx-0', location.pathname === '/settings/profile' ? 'space-y-16 sm:space-y-20' : '')}>
            {navigationItems.map((item, index) => (
              <div key={index} className={location.pathname === item.href ? 'block' : 'hidden'}>
                <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-primary-text">{item.name}</h2>
                <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-primary-text">{item.description}</p>

                {children}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsLayout;
