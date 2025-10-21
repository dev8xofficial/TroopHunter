import React from 'react';
import { Field, Label } from '@headlessui/react';

import InputStyles from '../TextField/index.module.css';
import TextAreastyles from '../Textarea/index.module.css';
import styles from './index.module.css';

interface ToggleFieldProps {
  label: string;
  secondaryLabel?: string;
  checked: boolean;
  setChecked: (value: boolean) => void;
}

export const ToggleField: React.FC<ToggleFieldProps> = ({ label, secondaryLabel, checked, setChecked }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;

    if (typeof setChecked !== 'function') {
      console.error('setChecked is not a function:', setChecked);
      return;
    }

    setChecked(newValue);
  };

  return (
    <div>
      <Field>
        <Label className="sr-only">{label}</Label>
        <div className={styles['wrapper']}>
          <input type="checkbox" checked={checked} onChange={handleChange} className={styles['hiddenInput']} />

          <div className={`${TextAreastyles['textarea']} ${InputStyles['input']} ${styles['toggleBox']} ${checked ? styles.checked : styles.unchecked}`}>
            <span>{label}</span>
            <span>{secondaryLabel}</span>
          </div>
        </div>
      </Field>
    </div>
  );
};
