import React from 'react';
import { HomepageStat, HomepageStats } from '../HomepageStats/HomepageStats';
import { AppearOnScroll } from '../../Animations/AppearOnScroll';
import { Link } from '../Link/Link';
import RightArrowIcon from '../../Icons/RightArrow';

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

export const WhyDev8X: React.FC<WhyProps> = ({ heading, para1, para2, image, stats }) => {
  return (
    <div className={styles['homepage-bottom']}>
      {/* Animate each word of heading */}
      <span className={styles['homepage-bottom__heading']} aria-label={heading}>
        {heading.split(' ').map((word, index) => (
          <AppearOnScroll
            key={index}
            delay={index * 0.05} // stagger words nicely
            duration={0.6}
            yOffset={10}
            as="span"
            className={TextAnimateStyles['word']}
          >
            <span aria-hidden="true">{word + ' '}</span>
          </AppearOnScroll>
        ))}
      </span>

      <div className={styles['homepage-bottom__content']}>
        <div className={`${WYSIWYGStyle['wysiwyg']} ${styles['homepage-bottom__wysiwyg']}`}>
          {/* Animate paragraphs and link with delays */}
          <AppearOnScroll delay={0.1} as="div">
            <p>{para1}</p>
          </AppearOnScroll>
          <AppearOnScroll delay={0.3} as="div">
            <p>{para2}</p>
          </AppearOnScroll>
          <AppearOnScroll delay={0.5} as="div">
            <Link variant="secondary" href="/about" endIcon={<RightArrowIcon width="14" className={styles['button--icon']} />} anchorClassName={styles['homepage-bottom__link']}>
              About Us
            </Link>
          </AppearOnScroll>
        </div>
      </div>

      {/* Animate image wrapper only */}
      <AppearOnScroll delay={0.2} as="div" className={styles['homepage-bottom__image-wrapper']}>
        <picture className={`${PictureStyle['picture']} ${PictureStyle['picture--responsive']} ${styles['homepage-bottom__image']}`}>
          <img src={image} loading="lazy" width="450" height="548" alt="" draggable="false" />
        </picture>
      </AppearOnScroll>

      {/* Animate stats */}
      <AppearOnScroll delay={0.3} as="div">
        <div className={styles['homepage-bottom__stats']}>
          <HomepageStats stats={stats} />
        </div>
      </AppearOnScroll>
    </div>
  );
};
