// src/.../OffersHero/OffersHero.tsx
import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { ExpertiseContent, ExpertiseOffersSliderItem } from '../../Interfaces/Expertise/Expertise';
import { ICON_MAP } from '../IconCards/IconMap';
import { Pill } from '../Pill/Pill';
import { OffersCategories } from '../OffersCategories/OffersCategories';
import { OffersSlider } from '../OffersSlider/OffersSlider';
import { WorkCard } from '../WorkCard/WorkCard';
import { OFFERS_GRID_DATA } from '../../Constants/Offers/OffersData';
import { WorkGridCard } from '../../Interfaces/Work/WorkProjectTypes';

import PictureStyles from '../../Surfaces/Picture/index.module.css';
import LayoutStyles from '../Layout/layout.module.css';
import styles from './index.module.css';

interface OffersHeroProps extends Omit<ExpertiseContent, 'slug' | 'iconCards' | 'contentAsideImageItems' | 'footerMainContent' | 'footerForm' | 'footerSocialLinks' | 'testimonials'> {
  icon?: { name: string; width: number };
  placeholder?: boolean;
  paragraph?: string;
  offers?: ExpertiseOffersSliderItem[];
  openDevelopersModal?: React.MouseEventHandler<HTMLButtonElement>;
  openMiniSquadsModal?: React.MouseEventHandler<HTMLButtonElement>;
  openScheduleCallModal?: React.MouseEventHandler<HTMLButtonElement>;
}

export const OffersHero: React.FC<OffersHeroProps> = ({
  tagText,
  heading,
  variant,
  icon,
  image,
  paragraph,
  offers = [],
  openScheduleCallModal,
  openDevelopersModal,
  openMiniSquadsModal
}): JSX.Element => {
  const router = useRouter();
  const isOffersPage = router.pathname.includes('/offers');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [showHowToHireVideo, setShowHowToHireVideo] = useState<boolean>(false);
  const offersData: WorkGridCard = OFFERS_GRID_DATA[0];

  const filteredOffers = useMemo<ExpertiseOffersSliderItem[]>(() => {
    if (activeCategory.toLowerCase() !== "all") {
      return offers.filter((o) => o.package.toLowerCase() === activeCategory.toLowerCase());
    }
    return offers;
  }, [activeCategory, offers]);

  const handleCategorySelect = (category: string) => {
    if (category === 'How to Hire') {
      setShowHowToHireVideo(true);
      setActiveCategory(category);
      return;
    }
    setActiveCategory(category);
    setShowHowToHireVideo(false);
  };

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
                <div style={{ opacity: 1, transform: 'translateY(0px)' }}>
                  {paragraph && (
                    <p className={styles['expertise-paragraph']}>
                      {paragraph}
                    </p>
                  )}
                </div>

                {isOffersPage && (
                  <div className={LayoutStyles['work-header']}>
                    <OffersCategories active={activeCategory} onSelect={handleCategorySelect} openScheduleCallModal={openScheduleCallModal} />
                  </div>
                )}

              </div>
            </div>

            {isOffersPage && !showHowToHireVideo ? (
              <div className={styles['homepage__section']}>
                <div className={styles['homepage__feed-wrapper']}>
                  <div className={styles['homepage__feed-wrapper-inner']}>
                    <OffersSlider offers={filteredOffers || []} openDevelopersModal={openDevelopersModal} openMiniSquadsModal={openMiniSquadsModal} />
                  </div>
                </div>
              </div>
            ) : (
              showHowToHireVideo && (
                <div className={`${styles['work-grid__row']} ${styles['work-grid__row--landscape']} col-sm-2`}>
                  <WorkCard variant={offersData.variant} space={offersData.space} bgColor={offersData.bgColor} title={offersData.title} image="" placeholderImage={offersData.placeholderImage} video={offersData.video} path={offersData.path} />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};
