import { ChangeEvent, Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { classNames } from '../../../utils/helpers';
import { TableSortingMenu, TableSortingMenuOption } from './TableSortingMenu.interfaces';

const TableSortingMenu: React.FC<TableSortingMenu> = ({ options, value, handleChange }: TableSortingMenu): JSX.Element => {
  const [selected, setSelected] = useState(value ? value : options[0]);

  const onChange = (value: TableSortingMenuOption) => {
    let selectedOptionEvent: ChangeEvent<HTMLInputElement> = {
      target: { value: '', name: '' },
    } as ChangeEvent<HTMLInputElement>;

    for (const option of options) {
      if (option.current) {
        selectedOptionEvent = {
          target: { value: value.value, name: value.name },
        } as ChangeEvent<HTMLInputElement>;
        break;
      }
    }
    handleChange(selectedOptionEvent);
    setSelected(value);
  };

  return (
    <Listbox value={selected} onChange={onChange}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">Change published status</Listbox.Label>
          <div className="relative">
            <div className="inline-flex divide-x rounded-md shadow-sm ring-1 ring-inset ring-gray-300">
              <div className="inline-flex items-center gap-x-1.5 rounded-l-md px-3 py-2 shadow-sm">
                <CheckIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
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
                          <p className={selected ? 'font-semibold' : 'font-normal'}>{option.title}</p>
                          {selected ? (
                            <span className={active ? 'text-white' : 'text-indigo-600'}>
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </div>
                        <p className={classNames(active ? 'text-indigo-200' : 'text-gray-500', 'mt-2')}>{option.description}</p>
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
