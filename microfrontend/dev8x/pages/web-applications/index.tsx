'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { toggleSmoothModalAtom, openSmoothModalAtom } from '@repo/components';
import { useSetAtom, useAtomValue } from 'jotai';
import { FooterRevealPageWrap, Footer, Header, AwardsBlock, SubmitApplicationModal, ContactFormModal, Button, IconCards, ContentAsideImage, ModularBlocks, OffersHero, CardStack, FAQs, ScheduleCallModal, DevelopersModal, MiniSquadsModal, ScheduleCallContent, OffersSlider, OffersSliderItem, WorkCard, HeroCore } from '@repo/components';
import Capabilities from '@repo/components/src/surfaces/Capabilities/Capabilities';
import { AppearOnScroll } from '@repo/components/src/Animations/AppearOnScroll';
import SmoothModalWrapper from '../../components/Surfaces/SmoothModalWrapper/SmoothModalWrapper';
import RightArrowIcon from '@repo/components/src/Icons/RightArrow';
import EXPERTISES from '../../data/expertise/index.d';
import { prefixed } from '../../utils/helpers';

import SubmenuData from '../../data/navigation/index.d';
import WEBSITE from '../../data/web-applications/index.d';

import HomePageStyles from '../index.module.css';
import HeroStyles from '../../components/Surfaces/Hero/index.module.css';
import PictureStyles from '../../components/Surfaces/Picture/index.module.css';
import TextAnimateStyles from '../../components/Surfaces/TextAnimateUp/index.module.css';
import ExpertiseStyles from '../expertise/index.module.css';

const Website: React.FC = (): JSX.Element => {
  const toggleModal = useSetAtom(toggleSmoothModalAtom);
  const currentModal = useAtomValue(openSmoothModalAtom);

  // Get the first offers data item since PageData is an array
  const PageData = WEBSITE[0];
  const variant = PageData.variant;

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
    if (!PageData.offersSlider) return [];
    const uniquePackages = new Set<string>();
    PageData.offersSlider.forEach((offer) => {
      if (offer.package && typeof offer.package === 'string') {
        uniquePackages.add(offer.package);
      }
    });
    return Array.from(uniquePackages).sort();
  }, [PageData.offersSlider]);

  const filteredOffers = useMemo<OffersSliderItem[]>(() => {
    if (!PageData.offersSlider) return [];
    if (activeCategory.toLowerCase() !== 'all') {
      return PageData.offersSlider.filter((o) => o.package === activeCategory);
    }
    return PageData.offersSlider;
  }, [activeCategory, PageData.offersSlider]);

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
        <title>{PageData.meta.title}</title>
        <meta name="description" content={PageData.meta.description}></meta>
        <link rel="canonical" href={prefixed('/offers')} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={PageData.meta.title}></meta>
        <meta property="og:description" content={PageData.meta.description}></meta>
        <meta property="og:url" content={prefixed('/offers')}></meta>
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content={prefixed('/logo-social.png')}></meta>
        <meta property="og:image:secure_url" content={prefixed('/logo-social.png')}></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:site_name" content="Dev8X"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content={PageData.meta.title}></meta>
        <meta name="twitter:description" content={PageData.meta.description}></meta>
        <meta name="twitter:image" content={prefixed('/logo-social.png')}></meta>
        <meta name="twitter:site" content="@Dev8X"></meta>
      </Head>
      <FooterRevealPageWrap variant="frame">
        <style jsx global>{`
          :root {
            --theme-primary: var(--${variant}-primary);
            --theme-primary-text: var(--${variant}-primary-text);
            --theme-secondary: var(--${variant}-secondary);
            --theme-text: var(--${variant}-text);
            --theme-background: var(--${variant}-tertiary);
            --theme-logo: var(--${variant}-secondary);
            --theme-header-face: var(--${variant}-primary);
          }
        `}</style>
        <Header submenuData={SubmenuData} />
        <FooterRevealPageWrap variant="page">
          <div className={`${HeroStyles['homepage__hero']} ${HeroStyles['homepage__hero--slider-override']} ${HeroStyles['mb-0']}`}>
            <HeroCore variant={variant} tagText={PageData.tagText} heading={PageData.heading} image={PageData.image} paragraph={PageData.paragraph} heroButtons={PageData.heroButtons} />
          </div>
          {isOffersPage && !showHowToHireVideo && (
            <div style={{ display: 'grid' }}>
              <div className={`${HomePageStyles['homepage__feed-wrapper']} ${HomePageStyles['homepage__feed-wrapper-inner--overflow']}`}>
                <div className={`${HomePageStyles['homepage__feed-wrapper-inner']}`}>
                  <OffersSlider homePageFeed={HomePageStyles['homepage__feed']} homePageFeedOverflow={HomePageStyles['homepage__feed--overflow']} offers={filteredOffers || []} openDevelopersModal={(selectedOffer) => toggleModal('developers', selectedOffer)} openMiniSquadsModal={(selectedOffer) => toggleModal('minisquads', { selectedOffer, primaryPlansItems: PageData.primaryPlansItems })} />
                </div>
              </div>
            </div>
          )}

          <main className={`${ExpertiseStyles['expertise-single']} container-full`}>
            <div>
              <ModularBlocks>
                <IconCards title={PageData.iconCards?.title} paragraph={PageData.iconCards?.paragraph} items={PageData.iconCards?.items} />
                <ContentAsideImage contentAsideImageItems={PageData.contentAsideImageItems} />
              </ModularBlocks>

              <div className={ExpertiseStyles['expertise-container']}>
                {PageData.capabilities && PageData.capabilities.length > 0 && <Capabilities className={ExpertiseStyles['padding-0']} capabilitiesHeading={PageData.capabilitiesHeading} capabilitiesContent={PageData.capabilities} />}{' '}
                <footer className={ExpertiseStyles['expertise-cta']}>
                  <h2 className={ExpertiseStyles['expertise-cta__content']}>
                    <span>{PageData.footerCta?.heading || "Got questions? We're here to help"}</span>
                  </h2>
                  <div>
                    <Button variant="secondary" context="contact" size="large" endIcon={<RightArrowIcon size={14} className={ExpertiseStyles['button--icon']} />} spanClassName={ExpertiseStyles['contact-button']} onClick={() => toggleModal('contact')}>
                      {PageData.footerCta?.buttonText || 'Schedule Call'}
                    </Button>
                  </div>
                </footer>
                <div className={ExpertiseStyles['expertise-container']}>
                  <h2 className="hidden">Testimonials:</h2>
                  <CardStack variant="Stack">
                    {PageData?.testimonials?.map((item, index) => (
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
                  <FAQs faqs={PageData.faqs} />
                </div>
              </div>
            </div>
          </main>
        </FooterRevealPageWrap>
        <Footer footerMainContent={PageData.footerMainContent} footerData={PageData.footerData} footerSocialLinks={PageData.footerSocialLinks} onClick={() => toggleModal('contact')} />
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

export default Website;
