import React, { Fragment, useState } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { Bars3Icon, BarsArrowDownIcon, BarsArrowUpIcon, BookmarkIcon, CheckCircleIcon, CheckIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';

import { type ITableSortingMenuAttributes, type ITableSortingMenuOptionAttributes } from './TableSortingMenu.interfaces';
import { classNames } from '../../../utils/helpers';

const TableSortingMenu: React.FC<ITableSortingMenuAttributes> = ({ options, value, handleChange }: ITableSortingMenuAttributes): JSX.Element => {
  const [selected, setSelected] = useState(value != null ? value : options[0]);
  const [isAscending, setIsAscending] = useState(true);

  const onChange = (value: ITableSortingMenuOptionAttributes): void => {
    if (value.value === 'alphabetical' || value.value === 'newFirst') {
      handleChange(value.name, value.value + (isAscending ? 'Ascending' : 'Descending'));
      setIsAscending(!isAscending); // Toggle the isAscending value
    } else {
      handleChange(value.name, value.value);
    }
    setSelected(value);
  };

  const getOptionDescription = (option: ITableSortingMenuOptionAttributes): string => {
    switch (option.value) {
      case 'alphabetical':
        if (isAscending) return option.description + ' in ascending order';
        else return option.description + ' in descending order';
      case 'newFirst':
        if (isAscending) return option.description + ' newest businesses first';
        else return option.description + ' oldest businesses first';
      default:
        return option.description;
    }
  };

  const getOptionIcon = (option: ITableSortingMenuOptionAttributes): React.ReactElement => {
    switch (option.value) {
      case 'relevance':
        return <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />;
      case 'alphabetical':
        if (isAscending) return <BarsArrowUpIcon className="h-5 w-5" aria-hidden="true" />;
        else return <BarsArrowDownIcon className="h-5 w-5" aria-hidden="true" />;
      case 'newFirst':
        if (isAscending) return <BarsArrowUpIcon className="h-5 w-5" aria-hidden="true" />;
        else return <BarsArrowDownIcon className="h-5 w-5" aria-hidden="true" />;
      case 'all':
        return <Bars3Icon className="h-5 w-5" aria-hidden="true" />;
      case 'selected':
        return <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />;
      case 'saved':
        return <BookmarkIcon className="h-5 w-5" aria-hidden="true" />;
      default:
        return <CheckIcon className="h-5 w-5" aria-hidden="true" />;
    }
  };

  return (
    <Listbox value={selected} onChange={onChange}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">Change published status</Listbox.Label>
          <div className="relative">
            <div className="inline-flex divide-x rounded-md shadow-sm ring-1 ring-inset ring-gray-300">
              <div className="inline-flex items-center gap-x-1.5 rounded-l-md px-3 py-2 shadow-sm">
                {getOptionIcon(selected)}
                <p className="text-sm font-semibold">{selected.title}</p>
              </div>
              <Listbox.Button className="inline-flex items-center rounded-l-none rounded-r-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-gray-50">
                <span className="sr-only">Change published status</span>
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
              </Listbox.Button>
            </div>

            <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Listbox.Options className="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {options.map((option) => (
                  <Listbox.Option key={option.title} className={({ active }) => classNames(active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'cursor-default select-none p-4 text-sm')} value={option}>
                    {({ selected, active }) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p className={classNames(selected ? 'font-semibold' : 'font-normal', 'flex items-start justify-start space-x-2')}>
                            <span>{getOptionIcon(option)}</span>
                            <span>{option.title}</span>
                          </p>
                          {selected ? (
                            <span className={active ? 'text-white' : 'text-indigo-600'}>
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </div>
                        <p className={classNames(active ? 'text-indigo-200' : 'text-gray-500', 'mt-2')}>{getOptionDescription(option)}</p>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default TableSortingMenu;
