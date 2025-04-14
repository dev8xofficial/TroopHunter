import React, { Fragment, useEffect, useState } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

import { type IOption, type ISelectProps } from './Select.interfaces';
import { classNames } from '../../../utils/helpers';

const Select: React.FC<ISelectProps> = ({ label, options, value, onChange, disabled }: ISelectProps): JSX.Element => {
  const initialValue = value != null ? value : options[0];
  const [selectedOption, setSelectedOption] = useState<IOption>(initialValue);

  const handleChange = (selectedOption: IOption): void => {
    setSelectedOption(selectedOption);
    if (onChange != null) onChange(selectedOption);
  };

  useEffect(() => {
    if (value != null) setSelectedOption(value);
  }, [value]);

  return (
    <Listbox value={selectedOption} onChange={handleChange} disabled={disabled}>
      {({ open }) => (
        <>
          {label != null && <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">{label}</Listbox.Label>}
          <div className={classNames(label != null ? 'mt-2' : '', 'relative')}>
            <Listbox.Button className="relative w-full cursor-default rounded border border-gray-300 bg-white py-1.5 pl-3 pr-10 text-left text-sm text-gray-900 shadow outline-none transition duration-200 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:leading-6 dark:focus:ring-offset-white">
              <span className="block truncate">{selectedOption.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option key={option.id} className={({ active }) => classNames(active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9')} value={option}>
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>{option.name}</span>

                        {selected ? (
                          <span className={classNames(active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4')}>
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
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

export default Select;
