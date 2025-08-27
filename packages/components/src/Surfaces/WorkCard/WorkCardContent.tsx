// WorkCardContent.tsx
import React from 'react';

import styles from './index.module.css';

interface WorkCardContentProps {
  title: string;
}

export const WorkCardContent: React.FC<WorkCardContentProps> = ({ title }) => {
  return (
    <div className={`${styles['work-card__content']} ${styles['work-card__content--white']}`}>
      <div className={styles['work-card__content-inner']}>
        <h3 className={styles['work-card__title']}>{title}</h3>
      </div>
    </div>
  );
};
