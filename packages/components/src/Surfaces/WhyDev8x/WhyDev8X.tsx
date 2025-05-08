import React from 'react';
import { HomepageStat, HomepageStats } from '../HomepageStats/HomepageStats';

import TextAnimateStyles from '../TextAnimateUp/index.module.css';
import PictureStyle from '../Picture/index.module.css';
import WYSIWYGStyle from '../WYSIWYG/index.module.css';
import styles from './index.module.css';

type WhyProps = {
  heading: string;
  para1: string;
  para2: string;
  image: string;
  stats: HomepageStat[];
};

export const WhyDev8X: React.FC<WhyProps> = ({ heading, para1, para2, image, stats }): JSX.Element => {
  return (
    <div className={styles['homepage-bottom']}>
      <span
        className={styles['homepage-bottom__heading']}
        aria-label="Great work for great people."
        style={{
          opacity: 1,
          transform: 'translateY(0px)',
          transition: 'all 0.8s ease'
        }}
      >
        <span
          className={TextAnimateStyles['word']}
          aria-hidden="true"
          style={{
            display: 'inline-block',
            whiteSpace: 'pre',
            transform: 'translate3d(0px, 0%, 0px)'
          }}
        >
          {heading}
        </span>
      </span>

      <div
        className={styles['homepage-bottom__content']}
        style={{
          opacity: 1,
          transform: 'translateY(0px)',
          transition: 'all 0.8s ease 0.2s'
        }}
      >
        <div className={`${WYSIWYGStyle['wysiwyg']} ${styles['homepage-bottom__wysiwyg']}`}>
          <p>{para1}</p>
          <p>{para2}</p>
        </div>
      </div>

      <div
        className={styles['homepage-bottom__image-wrapper']}
        style={{
          opacity: 1,
          transform: 'translateY(0px)',
          transition: 'all 0.8s ease 0.4s'
        }}
      >
        <picture className={`${PictureStyle['picture']} ${PictureStyle['picture--responsive']} ${styles['homepage-bottom__image']}`}>
          <img src={image} loading="lazy" width="450" height="548" alt="" draggable="false" />
        </picture>
      </div>

      <div
        className={styles['homepage-bottom__stats']}
        style={{
          opacity: 1,
          transform: 'translateY(0px)',
          transition: 'all 0.8s ease 0.6s'
        }}
      >
        <HomepageStats stats={stats} />
      </div>
    </div>
  );
};
