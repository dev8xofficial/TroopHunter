import React from 'react';
import { Pill } from '../Pill/Pill';
import { ExpertiseContent } from '../../Interfaces/Expertise/Expertise';

import styles from './index.module.css';

interface HeroProps extends Omit<ExpertiseContent, 'slug' | 'iconCards' | 'contentAsideImageItems' | 'footerMainContent' | 'footerForm' | 'footerSocialLinks' | 'testimonials'> {
  image?: string;
  icon?: React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({ tagText, heading, variant, icon, image }): JSX.Element => {
  return (
    <>
      <div>
        <div>
          <div className={styles['expertise-hero-container']} data-new-theme="false">
            <div className={styles['expertise-heading-container']} data-new-theme="false">
              <div style={{ opacity: 1, transform: 'translateY(0px)' }}>
                <Pill variant={variant}>{tagText}</Pill>
                <h2 className={styles['expertise-heading']}>{heading}</h2>
              </div>
            </div>
            {/* <div className={styles['expertise-image']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
              <picture className={`${PictureStyles['picture']} ${PictureStyles['picture--responsive']} ${styles['expertise-image__picture']}`}>
                <source srcSet={`${image}/m/450x240/filters:quality(80) 1x, ${image}/m/900x480/filters:quality(80) 2x`} media="(min-width: 0px) and (max-width: 479px)" />
                <source srcSet={`${image}/m/932x498/filters:quality(80) 1x, ${image}/m/1864x996/filters:quality(80) 2x`} media="(min-width: 480px) and (max-width: 991px)" />
                <source srcSet={`${image}/m/1432x765/filters:quality(80) 1x, ${image}/m/2864x1530/filters:quality(80) 2x`} media="(min-width: 992px) and (max-width: 1512px)" />
                <source srcSet={`${image}/m/1905x1018/filters:quality(80) 1x, ${image}/m/3810x2036/filters:quality(80) 2x`} media="(min-width: 1513px)" />
                <img src={`${image}/m/450x240/filters:quality(80)`} loading="eager" width="450" height="240" alt="Sussex Image" className="max-w-full h-auto w-full" draggable="false" />
              </picture>
            </div> */}
            <div className={styles['expertise-icon']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
              <div className={styles['icon-wrapper']}>{icon} </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
