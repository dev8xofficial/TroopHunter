import React, { ReactNode } from 'react';

import styles from './index.module.css';

type WYSIWYGProps = {
  children: ReactNode;
};

export const WYSIWYG: React.FC<WYSIWYGProps> = ({ children }): JSX.Element => {
  return (
    <>
      <div className={styles['wysiwyg']}>{children}</div>
    </>
  );
};
