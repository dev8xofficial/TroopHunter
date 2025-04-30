/* eslint-disable prettier/prettier */
import React, { ReactNode } from 'react';

import ContactFormModalStyles from '../ContactFormModal/index.module.css';
import styles from './index.module.css';

type ButtonProps = {
  children: ReactNode;
};

export const Button: React.FC<ButtonProps> = ({ children }): JSX.Element => {
  return (
    <>
      <button className={`${styles['button-wrapper']} col-full`} data-faitracker-form-bind="true">
        <span className={`${styles['button']} ${styles['button--bg-primary']} ${ContactFormModalStyles['contact-submit']}`} style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px);' }}>
          {children}
        </span>
      </button>
    </>
  );
};
