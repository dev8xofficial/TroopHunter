/* eslint-disable prettier/prettier */
import React, { ReactNode } from 'react';
import { HelpMessage } from '../HelpMessage/HelpMessage';

import styles from './index.module.css';

type FieldWrappperProps = {
  children: ReactNode;
  className?: string;
  label?: string;
  messageId?: string;
  message?: string;
  error?: string;
};

export const FieldWrappper: React.FC<FieldWrappperProps> = ({ children, className, label, messageId, message, error }): JSX.Element => {
  return (
    <>
      <div className={`${styles['field']} ${error?.length > 0 && styles['field--error']} col-full ${className}`}>
        <div>
          <label className={styles['field__label']} htmlFor=":rp:">
            {label}
            {label && <span className={styles['field__asterisk']}>*</span>}
          </label>
          {message && <HelpMessage id={messageId}>{message}</HelpMessage>}
        </div>
        {children}
        <div className={styles['field__error']}>
          <p>{error}</p>
        </div>
      </div>
    </>
  );
};
