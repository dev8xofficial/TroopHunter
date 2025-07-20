import React from 'react';
import { Field, Label, Select } from '@headlessui/react';

import TextAreastyles from '../../Surfaces/Textarea/index.module.css';
import InputStyles from '../../Surfaces/Input/index.module.css';

export interface ListboxOptionType {
  id: number;
  name: string;
  value: string | number;
}

interface ListboxProps {
  options: ListboxOptionType[];
  selected: ListboxOptionType;
  setSelected: (value: ListboxOptionType) => void;
}

export const ListboxField: React.FC<ListboxProps> = ({ options, selected, setSelected }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const found = options.find((opt) => String(opt.value) === selectedValue);

    if (found) {
      if (options) {
        console.log(`ListboxField ${options}: Setting selected to`, found);
      }

      if (typeof setSelected !== 'function') {
        console.error('setSelected is not a function:', setSelected);
        return;
      }
      if (found) setSelected(found);
    }
  };

  return (
    <div>
      <Field>
        <Label className="sr-only">Select an option</Label>
        <div className="relative">
          <Select
            value={selected && selected.value ? String(selected.value) : ''}
            onChange={handleChange}
            className={`${TextAreastyles['textarea']} ${InputStyles['input']}`}
            style={{ background: 'transparent' }}
          >
            <option value="" disabled hidden>
              Select an option
            </option>
            {options.map((option) => (
              <option key={option.id} value={option.value}>
                {option.name}
              </option>
            ))}
          </Select>
        </div>
      </Field>
    </div>
  );
};
