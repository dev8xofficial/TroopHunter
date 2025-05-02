/* eslint-disable prettier/prettier */
import React from 'react';
import { Button } from '@repo/components';
import PictureStyles from '../Picture/index.module.css';

import styles from './index.module.css';

export const ExpertiseCard: React.FC = (): JSX.Element => {
  return (
    <>
      <section className={styles['expertise-card']} style={{ '--theme-primary': '#b488f1', '--theme-secondary': '#12032a', '--theme-background': '#efe3ff', '--theme-text': 'rgba(18,3,42,.7)' } as React.CSSProperties}>
        <div className={styles['expertise-card__content']}>
          <h2 className={styles['expertise-card__pill']}>Our Expertise</h2>
          <h3 className={styles['expertise-card__heading']}>Headless</h3>
          <p className={styles['expertise-card__body']}>Faster, better, stronger. Take advantage of headless to optimise your website and offer visitors an unparalleled experience.</p>
          <Button>Read more</Button>
        </div>
        <picture className={`${PictureStyles['picture ']} ${PictureStyles['picture--responsive']} ${styles['expertise-card__image']}`}>
          <source srcSet="https://a-us.storyblok.com/f/1017006/1864x1314/4a72965f86/headless_fgf.jpg/m/600x500/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/1864x1314/4a72965f86/headless_fgf.jpg/m/1200x1000/filters:quality(80) 2x" media="(min-width: 0px)" />
          <img src="https://a-us.storyblok.com/f/1017006/1864x1314/4a72965f86/headless_fgf.jpg/m/600x500/filters:quality(80)" loading="lazy" width="600" height="500" alt="" className="" draggable="false" />
        </picture>
      </section>
    </>
  );
};
