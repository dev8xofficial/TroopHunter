// WorkCardWrapper.tsx
import React from 'react';

import styles from './index.module.css';

interface WorkCardWrapperProps {
  variant?: 'landscape' | 'portrait';
  children: React.ReactNode;
}

export const WorkCardWrapper: React.FC<WorkCardWrapperProps> = ({ variant, children }) => {
  const style: React.CSSProperties = variant === 'landscape' ? ({ '--aspect-x': 1452, '--aspect-y': 890, opacity: 1, transform: 'translateY(0px)' } as React.CSSProperties) : ({ '--aspect-x': 710, '--aspect-y': 890, opacity: 1, transform: 'translateY(0px)' } as React.CSSProperties);

  return (
    <div className={styles['work-card-wrapper']} style={style}>
      {children}
    </div>
  );
};
