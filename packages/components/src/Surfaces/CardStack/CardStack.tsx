/* eslint-disable prettier/prettier */
import React, { CSSProperties, ReactNode } from 'react';

import styles from './index.module.css';

type CardStackProps = {
  children: ReactNode;
  variant: 'Stack' | 'Card';
  index?: number;
};

export const CardStack: React.FC<CardStackProps> = ({ children, variant, index }): JSX.Element => {
  return (
    <>
      {variant === 'Stack' ? (
        <div className={styles['card-stack']} style={{ gap: '50vh' }}>
          {children}
        </div>
      ) : (
        <>
          <div className={styles['card-twin']} data-index={`${index}`}></div>
          <div className={styles['card']} data-index={`${index}`} style={{ '--top': '10%', position: 'sticky', top: '10%', transformOrigin: 'center top', transform: 'translateY(0vh) scale(1) translateZ(0px)' } as CSSProperties}>
            {children}
          </div>
        </>
      )}
    </>
  );
};
