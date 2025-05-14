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
      <span className={styles['homepage-bottom__heading']} aria-label="Great work for great people.">
        <span className={TextAnimateStyles['word']} aria-hidden="true">
          {heading}
        </span>
      </span>
      <div className={styles['homepage-bottom__content']}>
        <div className={`${WYSIWYGStyle['wysiwyg']} ${styles['homepage-bottom__wysiwyg']}`}>
          <p>{para1}</p>
          <p>{para2}</p>
        </div>
      </div>
      <div className={styles['homepage-bottom__image-wrapper']}>
        <picture className={`${PictureStyle['picture']} ${PictureStyle['picture--responsive']} ${styles['homepage-bottom__image']}`}>
          <img src={image} loading="lazy" width="450" height="548" alt="" draggable="false" />
        </picture>
      </div>
      <div className={styles['homepage-bottom__stats']}>
        <HomepageStats stats={stats} />
      </div>
    </div>
  );
};
