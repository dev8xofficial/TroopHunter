import React, { ReactNode } from 'react';
import { HelpMessage } from '../HelpMessage/HelpMessage';

import styles from './index.module.css';

type FieldWrapperProps = {
  children?: ReactNode;
  className?: string;
  label?: string;
  id?: string;
  messageId?: string;
  message?: string;
  error?: string;
  required?: boolean;
};

export const FieldWrapper: React.FC<FieldWrapperProps> = ({ children, className = '', label, id, messageId, message, error, required = false }) => {
  const hasError = !!error?.length;
  const wrapperClass = `${styles['field']} ${hasError ? styles['field--error'] : ''} col-full ${className}`.trim();

  return (
    <div className={wrapperClass}>
      {label && (
        <label className={styles['field__label']} htmlFor={id}>
          {label}
          {required && <span className={styles['field__asterisk']}>*</span>}
        </label>
      )}

      {message && <HelpMessage id={messageId}>{message}</HelpMessage>}

      {children}

      {hasError && (
        <div className={styles['field__error']}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};
