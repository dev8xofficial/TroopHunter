'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { ExpertiseOffersSliderItem, Link } from '@repo/components';
import RightArrowIcon from '../../Icons/RightArrow';

import 'swiper/css';
import 'swiper/css/free-mode';

import FeedSilderStyles from '../FeedSilder/index.module.css';

export type Offer = {
  heading: string; // :white_check_mark: match data and other interfaces
  price: string;
  description: string;
  features: string[];
  categories: string[];
  href?: string;
  buttonText: string;
};

type OffersSliderProps = {
  homePageFeed?: string;
  homePageFeedWrapperInnerOverflow?: string;
  homePageFeedOverflow?: string;
  offers: ExpertiseOffersSliderItem[];
  openDevelopersModal?: React.MouseEventHandler<HTMLButtonElement>;
  openMiniSquadsModal?: React.MouseEventHandler<HTMLButtonElement>;
};

interface Props {
  items: { id: string; imageUrl: string; title?: string }[];
}

export const OffersSlider: React.FC<OffersSliderProps> = ({ homePageFeed, homePageFeedWrapperInnerOverflow, homePageFeedOverflow, offers, openDevelopersModal, openMiniSquadsModal }): JSX.Element => {
  const handleClick = (e: React.MouseEvent, buttonOnClick) => {
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
              <h3 className={FeedSilderStyles['about-column__heading']}>{offer.heading}</h3>
              <h3 className={FeedSilderStyles['article-card__title']}>{offer.price}</h3>
              <p className={FeedSilderStyles['article-card__excerpt']}>{offer.description}</p>
              <Link variant="secondary" href="#" endIcon={<RightArrowIcon width="14" className={FeedSilderStyles['button--icon']} />} spanClassName={FeedSilderStyles['expertise-card__button']} onClick={(e) => handleClick(e, offer.package === 'developers' ? openDevelopersModal : openMiniSquadsModal)}>
                {offer.buttonText}
              </Link>
              <hr className={FeedSilderStyles['hr-line']} />
              {offer.features?.length > 0 && (
                <ul className={FeedSilderStyles['custom-icon-list']}>
                  {offer.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              )}
              {offer.categories?.length > 0 && (
                <div className={FeedSilderStyles['categories-wrap']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
                  {offer.categories.map((category) => (
                    <Link key={category} variant="secondary" href={`/expertise/${category.toLowerCase().replace(/\s+/g, '-')}`} spanClassName={FeedSilderStyles['expertise-card__button']}>
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
