import React from 'react';

import classNames from 'classnames';

import { type ITextFieldProps } from './TextField.interfaces';
import FieldError from '../../Feedback/FieldError/FieldError';

const TextField: React.FC<ITextFieldProps> = ({ label, helperText, className, onChange, onClick, id, noring, disabled, inputRef, type, value = '', required, placeholder, autoComplete, style, name }: ITextFieldProps): JSX.Element => {
  return (
    <div className="relative w-full">
      {(label ?? '').length > 0 ? (
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
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
          required={required}
          onChange={onChange}
          onClick={onClick}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={classNames('block w-full rounded border border-gray-300 px-3 py-1.5 text-sm placeholder-gray-400 shadow transition duration-200 focus:outline-none dark:border-charcoal-700 dark:bg-charcoal-200 dark:text-white', noring ?? false ? '' : 'focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-charcoal-700', disabled ?? false ? 'bg-gray-100 text-gray-400' : '', className)}
        />
      </div>
    </div>
  );
};

export default TextField;
