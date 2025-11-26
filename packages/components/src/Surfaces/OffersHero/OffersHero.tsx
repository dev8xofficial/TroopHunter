'use client';

import React from 'react';
import { useRouter } from 'next/router';
import { ExpertiseContent } from '../../Interfaces/Expertise/Expertise';
import { Pill } from '../Pill/Pill';
import { getBrandFromBaseURL, shouldShowOffersCategories, shouldShowOffersPill } from '../../../utils/helpers';
import { OffersCategories } from '../OffersCategories/OffersCategories';
import { WorkCard } from '../WorkCard/WorkCard';
import { LandscapeWorkCardProps } from '../../Interfaces/Work/WorkProjectTypes';

import LayoutStyles from '../Layout/layout.module.css';
import styles from './index.module.css';

interface OffersHeroProps extends Omit<ExpertiseContent, 'meta' | 'slug' | 'iconCards' | 'contentAsideImageItems' | 'footerMainContent' | 'footerData' | 'footerSocialLinks' | 'testimonials'> {
  activeCategory?: string;
  showHowToHireVideo?: boolean;
  paragraph?: string;
  handleCategorySelect?: any;
  openScheduleCallModal?: React.MouseEventHandler<HTMLButtonElement>;
  categories?: string[];
  howToHireVideoData?: LandscapeWorkCardProps;
}

export const OffersHero: React.FC<OffersHeroProps> = ({ tagText, heading, variant, activeCategory, showHowToHireVideo, paragraph, handleCategorySelect, openScheduleCallModal, categories, howToHireVideoData }): JSX.Element => {
  const router = useRouter();
  const brand = getBrandFromBaseURL();
  const shouldShowCategories = shouldShowOffersCategories(brand, router.pathname);
  const shouldDisplayPill = shouldShowOffersPill(brand);
  const defaultOffersData: LandscapeWorkCardProps = {
    variant: 'landscape',
    space: 'inner',
    bgColor: 'blue',
    title: 'How To Hire',
    images: [],
    placeholderImage: '/api/images/placeholder/1080-transparent.png',
    video: {
      originalFile: '/videos/work/troophunter/1080.mp4',
      sequences: []
    },
    path: ''
  };
  
  const offersData: LandscapeWorkCardProps = howToHireVideoData || defaultOffersData;

  return (
    <>
      <div>
        <div>
          <div className={styles['expertise-hero-container']} data-new-theme="false">
            <div className={styles['expertise-heading-container']} data-new-theme="false">
              <div style={{ opacity: 1, transform: 'translateY(0px)' }}>
                {shouldDisplayPill && <Pill variant={variant}>{tagText}</Pill>}
                <h2 className={styles['expertise-heading']}>
                  {heading && typeof heading === 'string'
                    ? heading.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))
                    : heading}
                </h2>
                <div style={{ opacity: 1, transform: 'translateY(0px)' }}>{paragraph && <p className={styles['expertise-paragraph']} dangerouslySetInnerHTML={{ __html: paragraph }} />}</div>

                {shouldShowCategories && (
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
