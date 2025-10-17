// WorkCardVideo.tsx
import React from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import styles from './index.module.css';

interface WorkCardVideoProps {
  src: string;
}

export const WorkCardVideo: React.FC<WorkCardVideoProps> = ({ src }) => {
  const isHls = src.endsWith('.m3u8');
  if (isHls) {
    return (
      <div className={styles['work-card__video']}>
        <VideoPlayer src={src} hideQualityControls hideFullscreen hidePlayControls hideMuteControls />
      </div>
    );
  }
  return <video className={styles['work-card__video']} autoPlay loop playsInline src={src}></video>;
};
