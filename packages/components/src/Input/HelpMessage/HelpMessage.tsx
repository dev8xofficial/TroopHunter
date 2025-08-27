/* eslint-disable prettier/prettier */
import React, { ReactNode } from 'react';

import styles from './index.module.css';

type HelpMessageProps = {
  children: ReactNode;
  id: string;
};

export const HelpMessage: React.FC<HelpMessageProps> = ({ children, id }): JSX.Element => {
  return (
    <>
      <span className={styles['help']} id={id}>
        {children}
      </span>
    </>
  );
};
