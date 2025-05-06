/* eslint-disable prettier/prettier */
import React, { ReactNode } from 'react';

import ContactFormModalStyles from '../ContactFormModal/index.module.css';
import styles from './index.module.css';

type ButtonProps = {
  children: ReactNode;
  bgClass?: string;
  iconType?: 'svg' | 'i';
  icon?: ReactNode;
};

export const Button: React.FC<ButtonProps> = ({ children, bgClass, iconType, icon }): JSX.Element => {
  return (
    <button className={`${styles['button-wrapper']} col-full`} data-international-footer-cta="true" data-faitracker-form-bind="true">
      <span
        className={`
          ${styles['button']}
          ${styles['button--icon']}
          ${bgClass ? bgClass : styles['button--bg-primary']}
          ${ContactFormModalStyles['contact-button']}
          ${ContactFormModalStyles['large-button']}
        `}
        style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}
      >
        {iconType === 'i' && <i className={styles['awards-block__button-icon']}>{icon}</i>}
        {children}
        {iconType === 'svg' && icon}
      </span>
    </button>
  );
};
