/* eslint-disable prettier/prettier */
import React, { ReactNode } from 'react';
import { HelpMessage } from '../HelpMessage/HelpMessage';

import styles from './index.module.css';

type FieldWrappperProps = {
  children: ReactNode;
  style?: string;
  label?: string;
  messageId?: string;
  message?: string;
};

export const FieldWrappper: React.FC<FieldWrappperProps> = ({ children, style, label, messageId, message }): JSX.Element => {
  return (
    <>
      <div className={`${styles['field']} col-full ${style}`}>
        <div>
          <label className={styles['field__label']} htmlFor=":rp:">
            {label}
            {label && <span className={styles['field__asterisk']}>*</span>}
          </label>
          {message && <HelpMessage id={messageId}>{message}</HelpMessage>}
        </div>
        {children}
      </div>
    </>
  );
};
