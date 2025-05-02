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
      <button className={styles['button-wrapper']} data-international-footer-cta="true" data-faitracker-form-bind="true">
        <span className={`${styles['button']} ${styles['button--icon']} ${styles['button--bg-secondary']} ${ContactFormModalStyles['contact-button']} ${ContactFormModalStyles['large-button']}`} style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
          {children}
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" fill="none" strokeWidth="0.5" viewBox="0 0 14 13" style={{ '--width': '14rem', '--height': '13rem' } as React.CSSProperties}>
            <path fill="currentColor" stroke="currentColor" d="M1 5.816H.75v1.326h10.014l-4.008 3.907-.173.168.162.179.563.62.174.191.186-.18 5.506-5.37.184-.178-.184-.18L7.668.932l-.186-.18-.174.191-.563.62-.162.178.173.169 4.008 3.907H1Z" vectorEffect="non-scaling-stroke"></path>
          </svg>
        </span>
      </button>
    </>
  );
};
