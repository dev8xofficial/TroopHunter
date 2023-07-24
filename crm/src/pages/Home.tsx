import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBusinessesAction } from '../store/actions/businessActions';
import ActionBar from '../components/Surfaces/ActionBar/ActionBar';
import CustomTextField from '../components/Inputs/CustomTextField/CustomTextField';
import Accordion from '../components/Surfaces/Accordion/Accordion';
import { IStats } from '../components/DataDisplay/Statistics/Statistics.interfaces';
import StatisticsMobile from '../components/DataDisplay/Statistics/StatisticsMobile';
import TableLead from '../components/DataDisplay/Table/TableLead';
import { setLeadFiltersAction } from '../store/actions/leadPageActions';
import { IFilterAttributes } from '../store/reducers/leadPageReducer';

const stats: IStats[] = [
  { name: 'Total Results', amount: 248 },
  { name: 'Changed jobs in past 90 days', amount: 7 },
  { name: 'Outstanding invoices', amount: 76 },
  { name: 'Expenses', amount: 20 },
];

const Lead = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const leadFilters: IFilterAttributes[] = useSelector((state: any) => state.lead.leadFilters);
  const [debouncedFilters, setDebouncedFilters] = useState<IFilterAttributes[]>(leadFilters);
  const isLoading = useSelector((state: any) => state.lead.isLoading);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.name;
    const newValue = event.target.value;

    dispatch(setLeadFiltersAction(leadFilters.map((filter) => (filter.name === name ? { ...filter, value: newValue } : filter))));
  };

  useEffect(() => {
    // Set a timeout to update the debouncedFilters after 500ms
    const delay = 500;
    const timeoutId = setTimeout(() => {
      setDebouncedFilters(leadFilters);
    }, delay);

    // Clear the timeout if the component is unmounted or if leadFilters change before the timeout is reached
    return () => {
      clearTimeout(timeoutId);
    };
  }, [leadFilters]);

  useEffect(() => {
    if (debouncedFilters.length > 0) {
      const filtersObject: Record<string, string> = {};
      for (const filter of debouncedFilters) {
        filtersObject[filter.name] = filter.value;
      }

      const requestData = {
        token: auth.token,
        ...filtersObject,
      };

      dispatch(fetchBusinessesAction(requestData));
    }
  }, [debouncedFilters]);

  return (
    <>
      {/* Action tab */}
      <ActionBar title="Lead" isLoading={isLoading} />

      {/* Statistics */}
      <StatisticsMobile statistics={stats} />

      {/* Content */}
      <div className="mx-auto max-w-7xl justify-between px-4 py-6 sm:px-6 lg:px-8 xl:flex">
        <div className="sticky top-20 h-fit w-full max-w-sm">
          {/* Keywords Filter */}
          <ul role="list" className="mr-6 hidden space-y-3 border shadow sm:rounded-md xl:col-span-4 xl:block">
            <li className="h-full overflow-hidden px-4 py-6 sm:px-6">{leadFilters[0] && <CustomTextField label={leadFilters[0]?.label} name={leadFilters[0]?.name} value={leadFilters[0]?.value} onChange={handleChange} placeholder={`Search ${leadFilters[0].label.toLowerCase()} title...`} />}</li>
          </ul>

          {/* Filters */}
          <div className="hidden xl:col-span-4 xl:block">
            <div className="mr-6 mt-6 overflow-hidden border shadow sm:rounded-md">
              <ul role="list" className="divide-y">
                <li className="bg-gray-50 px-4 py-3 sm:px-6">Filters</li>
                {leadFilters.map((filter) =>
                  filter.name !== 'name' ? (
                    <li key={filter.name}>
                      <Accordion label={filter.label} name={filter.name} value={filter.value} handleChange={handleChange} />
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
