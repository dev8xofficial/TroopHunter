'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { Proposal } from '../../Interfaces/Proposal/Proposal';

import 'swiper/css';
import 'swiper/css/free-mode';

import ButtonStyle from '../../Input/Button/index.module.css';
import FeedSliderStyles from '../FeedSilder/index.module.css';
import styles from './index.module.css';

export interface ProposalSilderProps {
  heading: string;
  feedSliderItems: Proposal[];
  homePageFeed?: string;
  homePageFeedOverflow?: string;
}

export const ProposalSilder: React.FC<ProposalSilderProps> = ({ heading, feedSliderItems, homePageFeed, homePageFeedOverflow }): JSX.Element => {
  if (!feedSliderItems?.length) {
    return <></>;
  }

  return (
    <>
      <div className={`${styles['feed__section']} homepage__feed`} data-new-theme="false">
        <h2 className={`${styles['feed__heading']} ${FeedSliderStyles['feed__heading']}`} style={{ opacity: 1, transform: 'translateY(0px)' }}>
          {heading}
        </h2>

        <Swiper
          modules={[FreeMode]}
          freeMode={{ enabled: true, momentum: true }}
          slidesPerView="auto"
          spaceBetween={30}
          grabCursor={true}
          className={`${FeedSliderStyles['feed']} ${homePageFeed ?? ''} ${homePageFeedOverflow ?? ''}`.trim()}
          wrapperClass={`${FeedSliderStyles['feed__inner']} ${styles['feed__inner']}`}
          onTouchStart={(swiper) => {
            swiper.slides.forEach((slide) => {
              slide.classList.add(FeedSliderStyles['feed__shrink-drag--dragging']);
              slide.classList.add(styles['feed__shrink-drag--dragging']);
            });
          }}
          onTouchEnd={(swiper) => {
            swiper.slides.forEach((slide) => slide.classList.remove(FeedSliderStyles['feed__shrink-drag--dragging']));
            swiper.slides.forEach((slide) => slide.classList.remove(styles['feed__shrink-drag--dragging']));
          }}
        >
          {feedSliderItems.map((item, index) => (
            <SwiperSlide key={index} className={`${FeedSliderStyles['feed__shrink-drag']} ${styles['feed__shrink-drag']}`}>
              <article className={FeedSliderStyles['feed__item']} style={{ opacity: 1, transform: 'translateX(0px)' }}>
                <div className={FeedSliderStyles['feed__image']}>
                  <div className={`${FeedSliderStyles['feed__picture']} ${styles['feed__video-wrapper']}`}>
                    <VideoPlayer src={item.videoSrc} poster={item.poster} autoplay={false} hideQualityControls />
                  </div>
                  <span
                    className={FeedSliderStyles['feed__tag']}
                    style={{
                      backgroundColor: item.tag.backgroundColor,
                      color: item.tag.color
                    }}
                  >
                    {item.tag.text}
                  </span>
                </div>

                <span className={FeedSliderStyles['feed__date']}>{item.date}</span>

                <div className={FeedSliderStyles['feed__content']}>
                  <h3 className={FeedSliderStyles['feed__title']}>{item.title}</h3>
                  {item.description}
                </div>

                <a className={`${ButtonStyle['button-wrapper']}`} href={item.link.href} target="_blank" rel="noopener noreferrer">
                  <span
                    className={`${ButtonStyle['button']} ${ButtonStyle['button--bg-transparent']} ${FeedSliderStyles['feed__link']}`}
                    style={{
                      transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)'
                    }}
                  >
                    {item.link.label}
                  </span>
                </a>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
