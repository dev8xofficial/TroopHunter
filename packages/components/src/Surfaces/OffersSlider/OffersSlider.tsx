'use client';

import React, { CSSProperties } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { Button, ExpertiseOffersSliderItem, Link } from '@repo/components';
import RightArrowIcon from '../../Icons/RightArrow';
import StarIcon from '../../Icons/StarIcon';

import 'swiper/css';
import 'swiper/css/free-mode';

import FeedSilderStyles from '../FeedSilder/index.module.css';
import WorkCategoriesStyles from '../WorkCategories/index.module.css';
import ButtonStyles from '../../Input/Button/index.module.css';
import styles from './index.module.css';

export type Offer = {
  id: string;
  heading: string;
  price?: string;
  description?: string;
  features?: string[];
  categories?: string[];
  href?: string;
  buttonText?: string;
  package?: string;
};

type OffersSliderProps = {
  homePageFeed?: string;
  homePageFeedWrapperInnerOverflow?: string;
  homePageFeedOverflow?: string;
  offers: ExpertiseOffersSliderItem[];
  openDevelopersModal?: (selectedPlan: ExpertiseOffersSliderItem) => void;
  openMiniSquadsModal?: (selectedOffer: ExpertiseOffersSliderItem) => void;
};

export const OffersSlider: React.FC<OffersSliderProps> = ({ homePageFeed, homePageFeedWrapperInnerOverflow, homePageFeedOverflow, offers, openDevelopersModal, openMiniSquadsModal }): JSX.Element => {
  const handleClick = (e: React.MouseEvent, buttonOnClick?: () => void) => {
    e.preventDefault();
    buttonOnClick?.();
  };

  return (
    <>
      <Swiper
        modules={[FreeMode]}
        freeMode={{ enabled: true, momentum: true }}
        slidesPerView={'auto'}
        spaceBetween={30}
        grabCursor={true}
        className={`${FeedSilderStyles['feed']} ${homePageFeed} ${homePageFeedOverflow}`}
        wrapperClass={FeedSilderStyles['feed__inner']}
        onTouchStart={(swiper) => {
          swiper.slides.forEach((slide) => slide.classList.add(FeedSilderStyles['feed__shrink-drag--dragging']));
        }}
        onTouchEnd={(swiper) => {
          swiper.slides.forEach((slide) => slide.classList.remove(FeedSilderStyles['feed__shrink-drag--dragging']));
        }}
      >
        {offers.map((offer) => (
          <SwiperSlide key={offer.id} className={FeedSilderStyles['feed__shrink-drag']}>
            <article className={FeedSilderStyles['feed__item']}>
              <h2 className={FeedSilderStyles['about-column__heading']}>{offer.heading}</h2>
              <div>
                <span className={FeedSilderStyles['article-card__title']}>{offer.price}</span>
                <span className={FeedSilderStyles['article-card__subtitle']}>/months</span>
              </div>
              <p className={FeedSilderStyles['article-card__excerpt']}>{offer.description}</p>
              <div className={styles['expertise-footer']}>
                <Button variant="secondary" endIcon={<RightArrowIcon width="14" className={FeedSilderStyles['button--icon']} />} className={`${ButtonStyles['button']} ${ButtonStyles['button--icon']} ${ButtonStyles['button--bg-secondary']}`} spanClassName={FeedSilderStyles['expertise-card__button']} onClick={(e) => { e.preventDefault(); if (offer.package === 'Developers') { openDevelopersModal?.(offer); } else { openMiniSquadsModal?.(offer); } }}>
                  {offer.buttonText}
                </Button>
              </div>
              <div className={FeedSilderStyles['divider']}>
                <div className={FeedSilderStyles['divider__line']}></div>
                <StarIcon width={30} height={30} className={FeedSilderStyles['divider__star']} />
                <div className={FeedSilderStyles['divider__line']}></div>
              </div>
              {offer.features?.length > 0 && (
                <ul className={FeedSilderStyles['custom-icon-list']}>
                  {offer.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              )}
              {offer.categories?.length > 0 && (
                <div className={FeedSilderStyles['categories-wrap']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
                  <ul className={WorkCategoriesStyles['categories']}>
                    {offer.categories.map((category) => (
                      <li key={category}>{category}</li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
