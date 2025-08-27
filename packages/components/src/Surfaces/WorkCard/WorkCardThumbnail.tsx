// WorkCardThumbnail.tsx
import React from 'react';

import styles from './index.module.css';

interface WorkCardThumbnailProps {
  children: React.ReactNode;
}

export const WorkCardThumbnail: React.FC<WorkCardThumbnailProps> = ({ children }) => {
  return <div className={styles['work-card__thumbnail-wrapper']}>{children}</div>;
};
