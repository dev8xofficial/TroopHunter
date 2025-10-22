'use client';

import React, { CSSProperties } from 'react';
import { ExpertiseOffersSliderItem, Link } from '@repo/components';
import RightArrowIcon from '../../Icons/RightArrow';

import PictureStyles from '../Picture/index.module.css';
import ButtonStyle from '../../Input/Button/index.module.css';
import FeedSilderStyles from '../FeedSilder/index.module.css';
import styles from './index.module.css';

export type Offer = {
  heading: string; // ✅ match data and other interfaces
  price: string;
  description: string;
  features: string[];
  categories: string[];
  href?: string;
  buttonText: string;
};

type OffersSliderProps = {
  offers: ExpertiseOffersSliderItem[];
  openDevelopersModal?: React.MouseEventHandler<HTMLButtonElement>;
  openMiniSquadsModal?: React.MouseEventHandler<HTMLButtonElement>;
};

interface Props {
  items: { id: string; imageUrl: string; title?: string }[];
}

export const OffersSlider: React.FC<OffersSliderProps> = ({ offers, openDevelopersModal, openMiniSquadsModal }): JSX.Element => {
  const handleClick = (e: React.MouseEvent, buttonOnClick) => {
    e.preventDefault();
    buttonOnClick?.();
  };

  return (
    <>
      <div className={`${FeedSilderStyles['feed']} homepage__feed`} data-new-theme="false">
        {/* <h2 className={FeedSilderStyles['feed__heading']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
          Offers
        </h2> */}

        <div
          className={FeedSilderStyles['feed__inner']}
          draggable={false}
          style={{
            userSelect: 'none',
            touchAction: 'pan-y',
            transform: 'translateX(15px) translateY(0px) translateZ(0px)'
          }}
        >
          {offers.map((offer) => (
            <article key={offer.id} className={FeedSilderStyles['feed__shrink-drag']}>
              <div className={FeedSilderStyles['feed__item']} style={{ opacity: 1, transform: 'translateX(0px)' }}>
                <h3 className={FeedSilderStyles['about-column__heading']}>{offer.heading}</h3>
                <h3 className={FeedSilderStyles['article-card__title']}>
                  <a href={offer.href}>{offer.price}</a>
                </h3>
                <p className={FeedSilderStyles['article-card__excerpt']}>{offer.description}</p>

                <Link
                  variant="secondary"
                  href={offer.href}
                  endIcon={<RightArrowIcon width="14" className={FeedSilderStyles['button--icon']} />}
                  spanClassName={FeedSilderStyles['expertise-card__button']}
                  onClick={(e) => handleClick(e, offer.package === "developers" ? openDevelopersModal : openMiniSquadsModal)}
                >
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
                  <div
                    className={FeedSilderStyles['categories-wrap']}
                    style={{ opacity: 1, transform: 'translateY(0px)' }}
                  >
                    {offer.categories.map((category) => (
                      <Link
                        key={category}
                        variant="secondary"
                        href={`/expertise/${category.toLowerCase().replace(/\s+/g, '-')}`}
                        spanClassName={FeedSilderStyles['expertise-card__button']}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
};
