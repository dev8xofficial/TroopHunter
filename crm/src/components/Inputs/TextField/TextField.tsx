import React from 'react';

import classNames from 'classnames';

import { type ITextFieldProps } from './TextField.interfaces';
import FieldError from '../../Feedback/FieldError/FieldError';

const TextField: React.FC<ITextFieldProps> = ({ label, helperText, className, onChange, id, noring, disabled, inputRef, type, value, required, placeholder, autoComplete, style, name, max }: ITextFieldProps): JSX.Element => {
  return (
    <div className="relative w-full">
      {(label ?? '').length > 0 ? (
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
          {(helperText ?? '').length > 0 ? <FieldError className="">{helperText}</FieldError> : label}
        </label>
      ) : null}
      <div className="mt-2">
        <input
          id={id}
          name={name}
          type={type}
          style={style}
          value={value}
          ref={inputRef}
          disabled={disabled}
          max={max}
          required={required}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={classNames('dark:bg-black-900 dark:border-black-900 block w-full rounded border border-gray-300 px-3 py-1.5 placeholder-gray-400 shadow transition duration-200 focus:outline-none dark:text-white sm:text-sm', noring ?? false ? '' : 'focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-white', disabled ?? false ? 'bg-gray-100 text-gray-400' : '', className)}
        />
      </div>
    </div>
  );
};

export default TextField;
