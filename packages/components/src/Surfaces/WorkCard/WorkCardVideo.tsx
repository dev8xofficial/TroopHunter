// WorkCardVideo.tsx
import React from 'react';

import styles from './index.module.css';

interface WorkCardVideoProps {
  src: string;
}

export const WorkCardVideo: React.FC<WorkCardVideoProps> = ({ src }) => {
  return <video className={styles['work-card__video']} autoPlay loop playsInline src={src}></video>;
};
