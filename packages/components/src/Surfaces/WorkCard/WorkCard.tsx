import React from 'react';
import { CommonWorkCardProps } from '../../Interfaces/Work/WorkProjectTypes';
import { WorkCardWrapper } from './WorkCardWrapper';
import { WorkCardThumbnail } from './WorkCardThumbnail';
import { WorkCardContent } from './WorkCardContent';
import { WorkCardPicture } from './WorkCardPicture';
import { WorkCardVideo } from './WorkCardVideo';

import styles from './index.module.css';

interface WorkCardProps extends Omit<CommonWorkCardProps, 'images'> {
  variant?: 'landscape' | 'portrait';
  image?: string;
  backgroundImage?: string;
  openModal?: (slug: string) => void;
  width?: string;
}

export const WorkCard: React.FC<WorkCardProps> = ({ variant, space, bgColor, title, image, backgroundImage, placeholderImage, video, path, openModal, width }: WorkCardProps): JSX.Element => {
  return (
    <>
      <WorkCardWrapper variant={variant}>
        <a
          className={`${styles['work-card']} ${variant === 'landscape' ? styles['work-card--landscape'] : styles['work-card--portrait']}`}
          href={path}
          onClick={(e) => {
            e.preventDefault();
            openModal?.(path);
          }}
        >
          <WorkCardThumbnail>
            <div className={`${styles['work-card__thumbnail-outer']} ${space === 'inner' ? `${styles[`bg--${bgColor}`]}` : ''}`} style={{ height: '100%' }}>
              {backgroundImage && <WorkCardPicture backgroundImage={backgroundImage} placeholderImage={placeholderImage} variant={variant} space={space} />}
              {space === 'outer' && video ? <WorkCardVideo src={video.originalFile} /> : <></>}
            </div>
            {space === 'inner' && (image || video) && (
              <div className={`${styles['work-card__thumbnail-inner']} ${width}`}>
                <WorkCardPicture backgroundImage={image} placeholderImage={placeholderImage} variant={variant} space={space} />
                {video ? <WorkCardVideo src={video.originalFile} /> : <></>}
              </div>
            )}
          </WorkCardThumbnail>
          <WorkCardContent title={title}></WorkCardContent>
        </a>
      </WorkCardWrapper>
    </>
  );
};
