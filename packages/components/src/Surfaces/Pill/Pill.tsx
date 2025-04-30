/* eslint-disable prettier/prettier */
import React, { ReactNode } from 'react';

import styles from './index.module.css';

type PillProps = {
  children: ReactNode;
};

export const Pill: React.FC<PillProps> = ({ children }): JSX.Element => {
  return (
    <>
      <h1 className={`${styles['pill']} ${styles['pill--cyan']}`}>{children}</h1>
    </>
  );
};
