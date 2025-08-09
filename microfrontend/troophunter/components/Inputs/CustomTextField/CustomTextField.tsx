import React, { useEffect, useState } from 'react';

import { XMarkIcon } from '@heroicons/react/20/solid';
import { AdjustmentsVerticalIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

import { type ITextFieldProps } from './CustomTextField.interfaces';
import FieldError from '../../Feedback/FieldError/FieldError';

const CustomTextField: React.FC<ITextFieldProps> = ({ error, helperText, className, onChange, handleFilters, id, noring, disabled, inputRef, type, value, required, placeholder, autoComplete, style, name, breakpoint }: ITextFieldProps): JSX.Element => {
  const [inputValue, setInputValue] = useState(value ?? '');

  // const handleClearInput = (): void => {
  //   setInputValue('');
  //   if (onChange != null) {
  //     const event: ChangeEvent<HTMLInputElement> = {
  //       target: {
  //         name: name ?? '',
  //         value: '' // Clear the value
  //       }
  //     };
  //     onChange(event);
  //   }
  // };

  useEffect(() => {
    setInputValue(value ?? '');
  }, [value]);

  return (
    <div className="relative w-full">
      <div className="flex rounded shadow-sm">
        <input
          id={id}
          name={name}
          type={type}
          style={style}
          value={inputValue}
          ref={inputRef}
          disabled={disabled}
          required={required}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={classNames('block w-full rounded-none rounded-l border-0 px-3 py-1.5 text-sm outline-none transition duration-200 placeholder:text-gray-400 dark:border-charcoal-700 dark:bg-charcoal-200 dark:text-white dark:focus:ring-offset-charcoal-700', (noring ?? false) ? '' : 'ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:ring-charcoal-700', (disabled ?? false) ? 'bg-gray-100 text-gray-400' : '', className)}
        />
        {/* <button type="button" className="group relative -ml-px inline-flex items-center gap-x-1.5 whitespace-nowrap rounded-r bg-white px-3 py-2 text-sm font-semibold capitalize text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-charcoal-400 dark:text-primary-text dark:ring-charcoal-700 dark:hover:bg-charcoal-300" onClick={typeof handleFilters === 'function' && breakpoint !== '2xl' && breakpoint !== 'xl' ? handleFilters : handleClearInput}> */}
        <button type="button" className="group relative -ml-px inline-flex items-center gap-x-1.5 whitespace-nowrap rounded-r bg-white px-3 py-2 text-sm font-semibold capitalize text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-charcoal-400 dark:text-primary-text dark:ring-charcoal-700 dark:hover:bg-charcoal-300">
          {typeof handleFilters === 'function' && breakpoint !== '2xl' && breakpoint !== 'xl' ? <AdjustmentsVerticalIcon className="-ml-0.5 h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" /> : <XMarkIcon className="-ml-0.5 h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />}
        </button>
      </div>
      {(error ?? false) ? <FieldError className="absolute mt-0.5">{helperText}</FieldError> : null}
    </div>
  );
};

export default CustomTextField;
