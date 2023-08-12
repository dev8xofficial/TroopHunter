import { type ChangeEvent, useEffect, useState } from 'react';

import { XMarkIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';

import { type ITextFieldProps } from './CustomTextField.interfaces';
import FieldError from '../../Feedback/FieldError/FieldError';

const CustomTextField: React.FC<ITextFieldProps> = ({ error, helperText, className, onChange, id, noring, disabled, inputRef, type, value, required, placeholder, autoComplete, style, name, max }: ITextFieldProps): JSX.Element => {
  const [inputValue, setInputValue] = useState(value ?? '');

  const handleClearInput = (): void => {
    setInputValue('');
    if (onChange != null) {
      const event: ChangeEvent<HTMLInputElement> = {
        target: {
          name: name ?? '',
          value: '' // Clear the value
        }
      };
      onChange(event);
    }
  };

  useEffect(() => {
    setInputValue(value ?? '');
  }, [value]);

  return (
    <div className="relative w-full">
      <div className="flex rounded shadow-sm">
        <input id={id} name={name} type={type} style={style} value={inputValue} ref={inputRef} disabled={disabled} max={max} required={required} onChange={onChange} placeholder={placeholder} autoComplete={autoComplete} className={classNames('dark:bg-black-900 block w-full rounded-none rounded-l border-0 px-3 py-1.5 outline-none transition duration-200 placeholder:text-gray-400 dark:text-white sm:text-sm', noring ?? false ? '' : 'ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600', disabled ?? false ? 'bg-gray-100 text-gray-400' : '', className)} />
        <button type="button" className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50" onClick={handleClearInput}>
          <XMarkIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>
      </div>
      {error ?? false ? <FieldError className="absolute mt-0.5">{helperText}</FieldError> : null}
    </div>
  );
};

export default CustomTextField;
