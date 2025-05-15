import React from 'react';

import PictureStyles from '../Picture/index.module.css';
import styles from './index.module.css';

interface OffersReelProps {
  bgColor: 'cyan' | 'pink' | 'blue' | 'green' | 'purple' | 'yellow';
  title: string;
  image: string;
  video: string;
}

export const OffersReel: React.FC<OffersReelProps> = ({ bgColor, title, image, video }: OffersReelProps): JSX.Element => {
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
              {video ? <video className={styles['work-card__video']} autoPlay loop playsInline src={video}></video> : <></>}
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
