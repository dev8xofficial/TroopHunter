'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { toggleSmoothModalAtom, openSmoothModalAtom } from '@repo/components';
import { useSetAtom, useAtomValue } from 'jotai';
import { FooterRevealPageWrap, Footer, Header, AwardsBlock, SubmitApplicationModal, ContactFormModal, Button, IconCards, ContentAsideImage, ModularBlocks, OffersHero, CardStack, FAQs, ScheduleCallModal, DevelopersModal, MiniSquadsModal, ScheduleCallContent, OffersSlider, OffersSliderItem, WorkCard } from '@repo/components';
import SmoothModalWrapper from '../../components/Surfaces/SmoothModalWrapper/SmoothModalWrapper';
import RightArrowIcon from '@repo/components/src/Icons/RightArrow';
import SubmenuData from '../../data/navigation/index.d';
import EXPERTISES from '../../data/expertise/index.d';
import { prefixed } from '../../utils/helpers';

import OFFERS from '../../data/offers/index.d';

import HomePageStyles from '../index.module.css';
import HeroStyles from '../../components/Surfaces/Hero/index.module.css';
import PictureStyles from '../../components/Surfaces/Picture/index.module.css';
import ExpertiseStyles from '../expertise/index.module.css';

const OffersPage: React.FC = (): JSX.Element => {
  const toggleModal = useSetAtom(toggleSmoothModalAtom);
  const currentModal = useAtomValue(openSmoothModalAtom);

  // Get the first offers data item since PageData is an array
  const offersData = OFFERS[1];
  const variant = offersData.variant;

  const router = useRouter();
  const isOffersPage = router.pathname.includes('/offers');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [showHowToHireVideo, setShowHowToHireVideo] = useState<boolean>(false);

  const getNextExpertise = (currentSlug: string) => {
    const currentIndex = EXPERTISES.findIndex((e) => e.slug === currentSlug);

    if (currentIndex === -1) return null; // if slug not found

    const nextIndex = (currentIndex + 1) % EXPERTISES.length;
    return EXPERTISES[nextIndex];
  };

  const nextExpertise = getNextExpertise('web-applications');

  const availableCategories = useMemo<string[]>(() => {
    if (!offersData.offersSlider) return [];
    const uniquePackages = new Set<string>();
    offersData.offersSlider.forEach((offer) => {
      if (offer.package && typeof offer.package === 'string') {
        uniquePackages.add(offer.package);
      }
    });
    return Array.from(uniquePackages).sort();
  }, [offersData.offersSlider]);

  const filteredOffers = useMemo<OffersSliderItem[]>(() => {
    if (!offersData.offersSlider) return [];
    if (activeCategory.toLowerCase() !== 'all') {
      return offersData.offersSlider.filter((o) => o.package === activeCategory);
    }
    return offersData.offersSlider;
  }, [activeCategory, offersData.offersSlider]);

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
      <Head>
        <title>{offersData.meta.title}</title>
        <meta name="description" content={offersData.meta.description}></meta>
        <link rel="canonical" href={'/offers'} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={offersData.meta.title}></meta>
        <meta property="og:description" content={offersData.meta.description}></meta>
        <meta property="og:url" content={'/offers'}></meta>
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content={prefixed('/logo-social.png')}></meta>
        <meta property="og:image:secure_url" content={prefixed('/logo-social.png')}></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:site_name" content="Dev8X"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content={offersData.meta.title}></meta>
        <meta name="twitter:description" content={offersData.meta.description}></meta>
        <meta name="twitter:image" content={prefixed('/logo-social.png')}></meta>
        <meta name="twitter:site" content="@Dev8X"></meta>
      </Head>
      <FooterRevealPageWrap variant="frame">
        <Header submenuData={SubmenuData} />
        <FooterRevealPageWrap variant="page">
          <div className={`${HeroStyles['homepage__hero']} ${HeroStyles['homepage__hero--slider-override']} ${HeroStyles['mb-0']}`}>
            <OffersHero activeCategory={activeCategory} showHowToHireVideo={showHowToHireVideo} variant={variant} tagText={offersData.tagText} heading={offersData.heading} image={offersData.image} paragraph={offersData.paragraph} handleCategorySelect={handleCategorySelect} openScheduleCallModal={() => toggleModal('schedulecall')} categories={availableCategories} />
          </div>
          {isOffersPage && !showHowToHireVideo && (
            <div style={{ display: 'grid' }}>
              <div className={`${HomePageStyles['homepage__feed-wrapper']} ${HomePageStyles['homepage__feed-wrapper-inner--overflow']}`}>
                <div className={`${HomePageStyles['homepage__feed-wrapper-inner']}`}>
                  <OffersSlider homePageFeed={HomePageStyles['homepage__feed']} homePageFeedOverflow={HomePageStyles['homepage__feed--overflow']} offers={filteredOffers || []} openDevelopersModal={(selectedOffer) => toggleModal('developers', selectedOffer)} openMiniSquadsModal={(selectedOffer) => toggleModal('minisquads', { selectedOffer, primaryPlansItems: offersData.primaryPlansItems })} />
                </div>
              </div>
            </div>
          )}

          <main className={`${ExpertiseStyles['expertise-single']} container-full`}>
            <div>
              <ModularBlocks>
                <IconCards title={offersData.iconCards?.title} paragraph={offersData.iconCards?.paragraph} items={offersData.iconCards?.items} />
                <ContentAsideImage contentAsideImageItems={offersData.contentAsideImageItems} />
              </ModularBlocks>

              <div className={ExpertiseStyles['expertise-container']}>
                <AwardsBlock />

                <div className={ExpertiseStyles['expertise-container']}>
                  <h2 className="hidden">Testimonials:</h2>
                  <CardStack variant="Stack">
                    {offersData?.testimonials?.map((item, index) => (
                      <CardStack variant="Card" index={index} key={index}>
                        <figure className={ExpertiseStyles['testimonial-card']} style={{ backgroundColor: item.bgColor, color: item.color }}>
                          <picture className={`${PictureStyles['picture']} ${PictureStyles['picture--responsive']} ${ExpertiseStyles['testimonial-card__image']}`}>
                            <source srcSet={`${item.image}/m/390x360/filters:quality(80) 1x, ${item.image}/m/780x720/filters:quality(80) 2x`} media="(min-width: 0px) and (max-width: 479px)" />
                            <source srcSet={`${item.image}/m/872x806/filters:quality(80) 1x, ${item.image}/m/1744x1612/filters:quality(80) 2x`} media="(min-width: 480px) and (max-width: 991px)" />
                            <source srcSet={`${item.image}/m/667x609/filters:quality(80) 1x, ${item.image}/m/1334x1218/filters:quality(80) 2x`} media="(min-width: 992px)" />
                            <img src={`${item.image}/m/390x360/filters:quality(80)`} loading="lazy" width={390} height={360} alt="" draggable={false} />
                          </picture>

                          <blockquote className={ExpertiseStyles['testimonial-card__quote']}>{`“${item.comment}”`}</blockquote>

                          <figcaption className={ExpertiseStyles['testimonial-card__author']}>
                            <dl className={ExpertiseStyles['testimonial-card__author-details']}>
                              <dt className={ExpertiseStyles['testimonial-card__author-name']}>{item.name}</dt>
                              <dd className={ExpertiseStyles['testimonial-card__author-title']}>{item.company}</dd>
                            </dl>
                          </figcaption>
                        </figure>
                      </CardStack>
                    ))}
                  </CardStack>

                  <footer className={ExpertiseStyles['expertise-cta']}>
                    <h2 className={ExpertiseStyles['expertise-cta__content']}>
                      <span>Got questions? We’re here to help</span>
                    </h2>
                    <div>
                      <Button variant="secondary" context="contact" size="large" endIcon={<RightArrowIcon size={14} className={ExpertiseStyles['button--icon']} />} spanClassName={ExpertiseStyles['contact-button']} onClick={() => toggleModal('contact')}>
                        Schedule Call
                      </Button>
                    </div>
                  </footer>
                  <FAQs faqs={offersData.faqs} />
                </div>
              </div>
            </div>
          </main>
        </FooterRevealPageWrap>
        <Footer footerMainContent={offersData.footerMainContent} footerData={offersData.footerData} footerSocialLinks={offersData.footerSocialLinks} onClick={() => toggleModal('contact')} />
      </FooterRevealPageWrap>
      <SmoothModalWrapper modalType="career" toggle={() => toggleModal('career')}>
        <SubmitApplicationModal />
      </SmoothModalWrapper>
      <SmoothModalWrapper modalType="contact" toggle={() => toggleModal('contact')}>
        <ContactFormModal />
      </SmoothModalWrapper>
      <SmoothModalWrapper modalType="developers" toggle={() => toggleModal('developers')}>
        <DevelopersModal selectedOffer={currentModal.data} variant={variant} plansItems={currentModal.data?.primaryPlansItems} />
      </SmoothModalWrapper>
      <SmoothModalWrapper modalType="minisquads" toggle={() => toggleModal('minisquads')}>
        <MiniSquadsModal selectedOffer={currentModal.data?.selectedOffer} variant={variant} plansItems={currentModal.data?.secondaryPlansItems} />
      </SmoothModalWrapper>
      <SmoothModalWrapper modalType="schedulecall" toggle={() => toggleModal('schedulecall')}>
        <ScheduleCallContent />
      </SmoothModalWrapper>
    </>
  );
};

export default OffersPage;
