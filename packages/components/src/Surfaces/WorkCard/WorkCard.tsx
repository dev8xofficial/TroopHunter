import React from 'react';
import { CommonWorkCardProps } from '../../Interfaces/Work/WorkProjectTypes';

import PictureStyles from '../Picture/index.module.css';
import styles from './index.module.css';

interface WorkCardProps extends Omit<CommonWorkCardProps, 'images'> {
  variant?: 'landscape' | 'portrait';
  image?: string;
  openModal?: (slug: string) => void;
}

export const WorkCard: React.FC<WorkCardProps> = ({ variant, space, bgColor, title, image, video, path, openModal }: WorkCardProps): JSX.Element => {
  const getWorkCardWrapperStyle = () => {
    if (variant === 'landscape') {
      return { '--aspect-x': 1452, '--aspect-y': 890, opacity: 1, transform: 'translateY(0px)' };
    } else {
      return { '--aspect-x': 710, '--aspect-y': 890, opacity: 1, transform: 'translateY(0px)' };
    }
  };

  return (
    <>
      <div className={styles['work-card-wrapper']} style={getWorkCardWrapperStyle() as React.CSSProperties}>
        <a
          className={`${styles['work-card']} ${variant === 'landscape' ? styles['work-card--landscape'] : styles['work-card--portrait']}`}
          href={path}
          onClick={(e) => {
            e.preventDefault();
            openModal?.(path);
          }}
        >
          <div className={styles['work-card__thumbnail-wrapper']}>
            <div className={`${styles['work-card__thumbnail-outer']} ${space === 'inner' ? `${styles[`bg--${bgColor}`]}` : ''}`} style={{ height: '100%' }}>
              {space === 'outer' && (
                <picture className={`${PictureStyles['picture']} ${styles['work-card__picture']}`} style={{ height: '100%' }}>
                  <source srcSet={`${image} 1x, ${image} 2x`} media="(min-width: 0px) and (max-width: 479px)" />
                  <source srcSet={`${image} 1x, ${image} 2x`} media="(min-width: 480px) and (max-width: 991px)" />
                  <source srcSet={`${image} 1x, ${image} 2x`} media="(min-width: 992px) and (max-width: 1512px)" />
                  <source srcSet={`${image} 1x, ${image} 2x`} media="(min-width: 1513px)" />
                  <img src={`${image}`} loading="lazy" width="450" height={variant === 'landscape' ? '330' : '677'} alt="" className="" draggable="false" />
                </picture>
              )}
              {video && space === 'outer' ? <video className={styles['work-card__video']} autoPlay loop playsInline src={video.originalFile}></video> : <></>}
            </div>
            {space === 'inner' && (
              <div className={styles['work-card__thumbnail-inner']}>
                <picture className={`${PictureStyles['picture']} ${styles['work-card__picture']}`}>
                  <source srcSet={`${image} 1x, ${image} 2x`} media="(min-width: 0px) and (max-width: 479px)" />
                  <source srcSet={`${image} 1x, ${image} 2x`} media="(min-width: 480px) and (max-width: 991px)" />
                  <source srcSet={`${image} 1x, ${image} 2x`} media="(min-width: 992px) and (max-width: 1512px)" />
                  <source srcSet={`${image} 1x, ${image} 2x`} media="(min-width: 1513px)" />
                  <img src={`${image}`} loading="lazy" width={variant === 'landscape' ? '312' : '171'} height={variant === 'landscape' ? '178' : '369'} alt="" className="" draggable="false" />
                </picture>
                {video ? <video className={styles['work-card__video']} autoPlay loop playsInline src={video.originalFile}></video> : <></>}
              </div>
            )}
          </div>
          <div className={`${styles['work-card__content']} ${styles['work-card__content--white']}`}>
            <div className={styles['work-card__content-inner']}>
              <h3 className={styles['work-card__title']}>{title}</h3>
            </div>
          </div>
        </a>
      </div>
    </>
  );
};
