import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBusinessesAction } from '../store/actions/businessActions';
import ActionBar from '../components/Surfaces/ActionBar/ActionBar';
import _Menu from '../components/Navigation/Menu/Menu';
import CustomTextField from '../components/Inputs/CustomTextField/CustomTextField';
import Accordion from '../components/Surfaces/Accordion/Accordion';
import { IStats } from '../components/DataDisplay/Statistics/Statistics.interfaces';
import StatisticsMobile from '../components/DataDisplay/Statistics/StatisticsMobile';
import TableLead from '../components/DataDisplay/Table/TableLead';
import { createLeadAction } from '../store/actions/leadActions';
import { toast } from 'react-toastify';

interface IFilterAttributes {
  label: string;
  name: string;
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const stats: IStats[] = [
  { name: 'Total Results', amount: 248 },
  { name: 'Changed jobs in past 90 days', amount: 7 },
  { name: 'Outstanding invoices', amount: 76 },
  { name: 'Expenses', amount: 20 },
];

const Lead = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const [filters, setFilters] = useState<IFilterAttributes[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const newValue = event.target.value;
    // Handle the value change
    setFilters((prevFilters) =>
      prevFilters.map((filter) => {
        if (filter.name === name) {
          return { ...filter, value: newValue };
        }
        return filter;
      })
    );
  };

  const submitLead = (title: string) => {
    if (filters.length > 0 && filters.some((item) => item.name !== 'sponsoredAd' && item.value !== '')) {
      console.log('Submit Lead: ', title);
      const filtersObject: Record<string, string> = {};
      for (const filter of filters) {
        filtersObject[filter.name] = filter.value;
      }

      const requestData = {
        token: auth.token,
        userId: auth.userId,
        title, // Spread the properties of 'title' object into 'requestData'
        search: filtersObject.name,
        ...filtersObject, // Spread the properties of 'filtersObject' object into 'requestData'
      };
      dispatch(createLeadAction(requestData));
    } else {
      toast.info('You have searched nothing.');
    }
  };

  useEffect(() => {
    if (filters.length > 0) {
      const filtersObject: Record<string, string> = {};
      for (const filter of filters) {
        filtersObject[filter.name] = filter.value;
      }

      const requestData = {
        token: auth.token,
        ...filtersObject,
      };

      dispatch(fetchBusinessesAction(requestData));
    }
  }, [filters]);

  useEffect(() => {
    const initialFilters: IFilterAttributes[] = [
      { label: 'Business', name: 'name', value: '', handleChange: handleChange },
      { label: 'Business Domain', name: 'businessDomain', value: '', handleChange: handleChange },
      { label: 'Address', name: 'address', value: '', handleChange: handleChange },
      { label: 'Location', name: 'location', value: '', handleChange: handleChange },
      { label: 'Phone', name: 'phone', value: '', handleChange: handleChange },
      { label: 'Email', name: 'email', value: '', handleChange: handleChange },
      { label: 'Website', name: 'website', value: '', handleChange: handleChange },
      { label: 'Sponsored', name: 'sponsoredAd', value: 'false', handleChange: handleChange },
    ];
    setFilters(initialFilters);
  }, []);

  return (
    <>
      {/* Action tab */}
      <ActionBar title="Lead" submit={submitLead} />

      {/* Statistics */}
      <StatisticsMobile statistics={stats} />

      {/* Content */}
      <div className="mx-auto max-w-7xl justify-between px-4 py-6 sm:px-6 lg:px-8 xl:flex">
        <div className="sticky top-20 h-fit w-full max-w-sm">
          {/* Keywords Filter */}
          <ul role="list" className="mr-6 hidden space-y-3 border shadow sm:rounded-md xl:col-span-4 xl:block">
            <li className="h-full overflow-hidden px-4 py-6 sm:px-6">{filters[0] && <CustomTextField label={filters[0]?.label} name={filters[0]?.name} value={filters[0]?.value} onChange={filters[0]?.handleChange} placeholder={`Search ${filters[0].label.toLowerCase()} title...`} />}</li>
          </ul>

          {/* Filters */}
          <div className="hidden xl:col-span-4 xl:block">
            <div className="mr-6 mt-6 overflow-hidden border shadow sm:rounded-md">
              <ul role="list" className="divide-y">
                <li className="bg-gray-50 px-4 py-3 sm:px-6">Filters</li>
                {filters.map((filter) =>
                  filter.name !== 'name' ? (
                    <li key={filter.name}>
                      <Accordion label={filter.label} name={filter.name} value={filter.value} handleChange={filter.handleChange} />
                    </li>
                  ) : (
                    <React.Fragment key={filter.name} />
                  )
                )}
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
