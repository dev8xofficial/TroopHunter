'use client';

import React from 'react';
import { useRouter } from 'next/router';
import { ExpertiseContent } from '../../Interfaces/Expertise/Expertise';
import { Pill } from '../Pill/Pill';
import { OffersCategories } from '../OffersCategories/OffersCategories';
import { WorkCard } from '../WorkCard/WorkCard';
import { OFFERS_GRID_DATA } from '../../Constants/Offers/OffersData';
import { LandscapeWorkCardProps } from '../../Interfaces/Work/WorkProjectTypes';

import LayoutStyles from '../Layout/layout.module.css';
import styles from './index.module.css';

interface OffersHeroProps extends Omit<ExpertiseContent, 'slug' | 'iconCards' | 'contentAsideImageItems' | 'footerMainContent' | 'footerForm' | 'footerSocialLinks' | 'testimonials'> {
  activeCategory?: string;
  showHowToHireVideo?: boolean;
  paragraph?: string;
  handleCategorySelect?: any;
  openScheduleCallModal?: React.MouseEventHandler<HTMLButtonElement>;
  categories?: string[];
}

export const OffersHero: React.FC<OffersHeroProps> = ({ tagText, heading, variant, activeCategory, showHowToHireVideo, paragraph, handleCategorySelect, openScheduleCallModal, categories }): JSX.Element => {
  const router = useRouter();
  const isOffersPage = router.pathname.includes('/offers');
  const offersData: LandscapeWorkCardProps = OFFERS_GRID_DATA[0] as LandscapeWorkCardProps;

  return (
    <>
      <div>
        <div>
          <div className={styles['expertise-hero-container']} data-new-theme="false">
            <div className={styles['expertise-heading-container']} data-new-theme="false">
              <div style={{ opacity: 1, transform: 'translateY(0px)' }}>
                <Pill variant={variant}>{tagText}</Pill>
                <h2 className={styles['expertise-heading']}>
                  {heading.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </h2>
                <div style={{ opacity: 1, transform: 'translateY(0px)' }}>{paragraph && <p className={styles['expertise-paragraph']} dangerouslySetInnerHTML={{ __html: paragraph }} />}</div>

                {isOffersPage && (
                  <div className={LayoutStyles['work-header']}>
                    <OffersCategories active={activeCategory} onSelect={handleCategorySelect} openScheduleCallModal={openScheduleCallModal} categories={categories} />
                  </div>
                )}
              </div>
            </div>

            {showHowToHireVideo && (
              <div className={`${styles['work-grid__row']} ${styles['work-grid__row--landscape']} col-sm-2`}>
                <WorkCard variant={offersData.variant} space={offersData.space} bgColor={offersData.bgColor} title={offersData.title} image="" placeholderImage={offersData.placeholderImage} video={offersData.video} path={offersData.path} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
