import React from 'react';

import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

import Table from '../components/DataDisplay/Table/TableLeads';
// import Search from '../components/Inputs/Search/Search';
import ActionBar from '../components/Surfaces/ActionBar/ActionBar';
import { type IHomePageState } from '../store/reducers/homePageReducer';

const Leads: React.FC = (): JSX.Element => {
  const home = useSelector((state: { home: IHomePageState }) => state.home);
  const isLeadPageLoading = home.isLoading;
  return (
    <>
      <Helmet>
        <title>Leads - TroopHunter</title>
        <meta name="description" content="View and manage your leads on TroopHunter to efficiently follow up and convert potential clients." />
        <link rel="canonical" href="https://www.app.troophunter.com/leads" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Leads - TroopHunter" />
        <meta property="og:description" content="View and manage your leads on TroopHunter to efficiently follow up and convert potential clients." />
        <meta property="og:url" content="https://www.app.troophunter.com/leads" />
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content="https://www.troophunter.com/logo-social.png" />
        <meta property="og:image:secure_url" content="https://www.troophunter.com/logo-social.png"></meta>
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="TroopHunter"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Leads - TroopHunter" />
        <meta name="twitter:description" content="View and manage your leads on TroopHunter to efficiently follow up and convert potential clients." />
        <meta name="twitter:image" content="https://www.troophunter.com/logo-social.png" />
        <meta name="twitter:site" content="@TroopHunter" />
      </Helmet>

      {/* Advanced Search */}
      {/* <header>
        <div className="hidden w-full items-center justify-center space-x-8 border-b bg-gray-800 xl:flex dark:border-charcoal-100 dark:bg-charcoal-500">
          <div className="mx-auto max-w-7xl flex-1 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-1 justify-center space-x-4">
              <Search />
              <span className="relative hidden whitespace-nowrap text-white md:inline-block">
                <button type="button" className="px-3.5 py-2.5 text-sm capitalize hover:text-indigo-600 dark:hover:text-white">
                  saved searches
                </button>
                <span className="absolute -right-4 top-0 rounded bg-red-600 px-1 text-xs">66+</span>
              </span>
            </div>
          </div>
        </div>
      </header> */}

      {/* Action tab */}
      <ActionBar title="Leads Results" isLoading={isLeadPageLoading} />

      {/* Content */}
      <Table />
    </>
  );
};

export default Leads;
