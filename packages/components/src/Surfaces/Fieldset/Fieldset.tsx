/* eslint-disable prettier/prettier */
import React, { ReactNode } from 'react';

import styles from './index.module.css';

type FieldsetProps = {
  children: ReactNode;
  style?: string;
  label?: string;
  error?: string;
};

export const Fieldset: React.FC<FieldsetProps> = ({ children, style, label, error }): JSX.Element => {
  console.log('error: ', error);
  return (
    <>
      <div className={`${styles['fieldset']} ${error?.length > 0 && styles['fieldset--error']} col-full ${style}`} role="group" aria-labelledby=":rh:">
        <div>
          <span className={styles['fieldset__legend']} id=":rh:">
            {label}
            {label && <span className={styles['fieldset__asterisk']}>*</span>}
          </span>
        </div>
        <div className={`${styles['fieldset__inner']} grid-cols-2`}>{children}</div>
      </div>
    </>
  );
};
