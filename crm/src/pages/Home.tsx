// import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
import ActionBar from '../components/Surfaces/ActionBar/ActionBar';
import _Menu from '../components/Navigation/Menu/Menu';
import CustomTextField from '../components/Inputs/CustomTextField/CustomTextField';
import Accordion from '../components/Surfaces/Accordion/Accordion';
import { IStats } from '../components/DataDisplay/Statistics/Statistics.interfaces';
import StatisticsMobile from '../components/DataDisplay/Statistics/StatisticsMobile';
import TableLead from '../components/DataDisplay/Table/TableLead';

const stats: IStats[] = [
  { name: 'Total Results', amount: 248 },
  { name: 'Changed jobs in past 90 days', amount: 7 },
  { name: 'Outstanding invoices', amount: 76 },
  { name: 'Expenses', amount: 20 },
];

const Lead = () => {
  // let [isLoading, setIsLoading] = useState(true);
  // const userToken = useSelector((state: any) => state.auth.token);

  // useEffect(() => {
  //   debugger;
  //   axios
  //     .get(`${process.env.BACKEND_URL}/users`, {
  //       headers: {
  //         Authorization: `Bearer ${userToken}`, // Attach the JWT token to the request
  //       },
  //     })
  //     .then((response: any) => {
  //       toast('User exits');
  //     })
  //     .catch((error: any) => {
  //       toast("User doesn't exit:");
  //     });
  // }, []);
  // useEffect(() => {
  //   setInterval(() => {
  //     setIsLoading(!isLoading);
  //   }, 1000);
  // }, []);

  return (
    <>
      {/* Action tab */}
      <ActionBar title="Lead" />

      {/* Statistics */}
      <StatisticsMobile statistics={stats} />

      {/* Content */}
      <div className="mx-auto max-w-7xl justify-between px-4 py-6 sm:px-6 lg:px-8 xl:flex">
        <div className="sticky top-20 h-fit w-full max-w-sm">
          {/* Keywords Filter */}
          <ul role="list" className="mr-6 hidden space-y-3 border shadow sm:rounded-md xl:col-span-4 xl:block">
            <li className="h-full overflow-hidden px-4 py-6 sm:px-6">
              <CustomTextField label="Keywords" placeholder="Marketing" />
            </li>
          </ul>

          {/* Filters */}
          <div className="hidden xl:col-span-4 xl:block">
            <div className="mr-6 mt-6 overflow-hidden border shadow sm:rounded-md">
              <ul role="list" className="divide-y">
                <li className="bg-gray-50 px-4 py-3 sm:px-6">Filters</li>
                <li>
                  <Accordion label="Your leads & accounts" />
                </li>
                <li>
                  <Accordion label="Relationship" />
                </li>
                <li>
                  <Accordion label="Company" />
                </li>
                <li>
                  <Accordion label="Industry" />
                </li>
                <li>
                  <Accordion label="Company headcount" />
                </li>
                <li>
                  <Accordion label="Function" />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <TableLead />
        </div>
      </div>
    </>
  );
};

export default Lead;
