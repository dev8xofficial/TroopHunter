'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.css';

interface WorkCardVideoProps {
  src: string;
}

export const WorkCardVideo: React.FC<WorkCardVideoProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // ✅ Play when visible
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch((err) => console.warn('Autoplay failed:', err));
          } else {
            // ⏸ Pause when out of view
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.25 } // 25% visibility threshold
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return <video ref={videoRef} className={styles['work-card__video']} src={src} preload="metadata" loop muted playsInline />;
};
