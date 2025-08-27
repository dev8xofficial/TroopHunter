import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

import PictureStyles from '../Picture/index.module.css';
import styles from './index.module.css';

interface OffersReelProps {
  bgColor: 'cyan' | 'pink' | 'blue' | 'green' | 'purple' | 'yellow';
  title: string;
  image: string;
  poster?: string;
  src: string;
}

export const OffersReel: React.FC<OffersReelProps> = ({ bgColor, title, image, poster, src }: OffersReelProps): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    } else if (video?.canPlayType('application/vnd.apple.mpegurl')) {
      // For Safari (which supports HLS natively)
      video.src = src;
    }
  }, [src]);

  return (
    <>
      <div className={styles['work-card-wrapper']} style={{ '--aspect-x': 1452, '--aspect-y': 890, opacity: 1, transform: 'translateY(0px)' } as React.CSSProperties}>
        <div className={`${styles['work-card']} ${styles['work-card--landscape']} ${styles[`bg--${bgColor}`]}`}>
          <div className={styles['work-card__thumbnail-wrapper']}>
            <div className={styles['work-card__thumbnail-inner']}>
              <picture className={`${PictureStyles['picture']} ${styles['work-card__picture']}`}>
                <source srcSet={`${image} 1x, ${image} 2x`} media="(min-width: 0px) and (max-width: 479px)" />
                <source srcSet={`${image} 1x, ${image} 2x`} media="(min-width: 480px) and (max-width: 991px)" />
                <source srcSet={`${image} 1x, ${image} 2x`} media="(min-width: 992px) and (max-width: 1512px)" />
                <source srcSet={`${image} 1x, ${image} 2x`} media="(min-width: 1513px)" />
                <img src={`${image}`} loading="lazy" width="312" height="178" alt="" className="" draggable="false" />
              </picture>
              {src ? <video className={styles['work-card__video']} ref={videoRef} controls autoPlay loop playsInline muted poster={poster} src={src}></video> : <></>}
            </div>
          </div>
          <div className={`${styles['work-card__content']} ${styles['work-card__content--white']}`}>
            <div className={styles['work-card__content-inner']}>
              <h3 className={styles['work-card__title']}>{title}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
