/* eslint-disable prettier/prettier */
import React, { ReactNode } from 'react';

import styles from './index.module.css';

type PillProps = {
  children: ReactNode;
  variant?: 'cyan' | 'pink' | 'blue' | 'green' | 'purple' | 'yellow';
};

export const Pill: React.FC<PillProps> = ({ children, variant }): JSX.Element => {
  return (
    <>
      <h1 className={`${styles['pill']} ${styles[`pill--${variant}`]}`}>{children}</h1>
    </>
  );
};
