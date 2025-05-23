import React from 'react';
import { ExpertiseContent, Link } from '@repo/components';
import RightArrowIcon from '../../Icons/RightArrow';

import PictureStyles from '../Picture/index.module.css';
import styles from './index.module.css';

export const ExpertiseCard: React.FC<Omit<ExpertiseContent, 'image' | 'iconCards' | 'contentAsideImageItems' | 'footerMainContent' | 'footerForm' | 'footerSocialLinks' | 'testimonials'>> = ({ variant, tagText, heading, slug }): JSX.Element => {
  return (
    <>
      <section className={styles['expertise-card']} style={{ '--theme-primary': `var(--${variant}-primary)`, '--theme-secondary': `var(--${variant}-secondary)`, '--theme-background': `var(--${variant}-tertiary)`, '--theme-text': `var(--${variant}-text)` } as React.CSSProperties}>
        <div className={styles['expertise-card__content']}>
          <h2 className={styles['expertise-card__pill']}>Our Expertise</h2>
          <h3 className={styles['expertise-card__heading']}>{tagText}</h3>
          <p className={styles['expertise-card__body']}>{heading}</p>
          <Link variant="secondary" href={`/expertise/${slug}`} endIcon={<RightArrowIcon width="14" className={styles['button--icon']} />} spanClassName={styles['expertise-card__button']}>
            Read more
          </Link>
        </div>
        <picture className={`${PictureStyles['picture ']} ${PictureStyles['picture--responsive']} ${styles['expertise-card__image']}`}>
          <source srcSet="https://a-us.storyblok.com/f/1017006/1864x1314/4a72965f86/headless_fgf.jpg/m/600x500/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/1864x1314/4a72965f86/headless_fgf.jpg/m/1200x1000/filters:quality(80) 2x" media="(min-width: 0px)" />
          <img src="https://a-us.storyblok.com/f/1017006/1864x1314/4a72965f86/headless_fgf.jpg/m/600x500/filters:quality(80)" loading="lazy" width="600" height="500" alt="" className="" draggable="false" />
        </picture>
      </section>
    </>
  );
};
