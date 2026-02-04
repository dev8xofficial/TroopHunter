'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { toggleSmoothModalAtom, openSmoothModalAtom, Hero, HomepageShowreel, WorkGridRowLandscape } from '@repo/components';
import { useSetAtom, useAtomValue } from 'jotai';
import { FooterRevealPageWrap, Footer, Header, AwardsBlock, SubmitApplicationModal, ContactFormModal, Button, IconCards, ContentAsideImage, ModularBlocks, DevelopersModal, MiniSquadsModal, ScheduleCallContent, OffersContent } from '@repo/components';
import SmoothModalWrapper from '../../components/Surfaces/SmoothModalWrapper/SmoothModalWrapper';
import RightArrowIcon from '@repo/components/src/Icons/RightArrow';
import SubmenuData from '../../data/navigation/index.d';
import PROPOSALS from '../../data/proposals/proposals.d';
import { prefixed } from '../../utils/helpers';

import HomePageStyles from '../index.module.css';
import HeroStyles from '../../components/Surfaces/Hero/index.module.css';
import PictureStyles from '../../components/Surfaces/Picture/index.module.css';
import ExpertiseStyles from '../expertise/index.module.css';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import VideoPlayer from '@repo/components/src/Surfaces/VideoPlayer/VideoPlayer';

const ProposalPage: React.FC = ({ slug, variant, ...PageData }: OffersContent): JSX.Element => {
  const toggleModal = useSetAtom(toggleSmoothModalAtom);
  const currentModal = useAtomValue(openSmoothModalAtom);

  // Get the first offers data item since PageData is an array
  const getNextExpertise = (currentSlug: string) => {
    const currentIndex = PROPOSALS.findIndex((e) => e.slug === currentSlug);

    if (currentIndex === -1) return null; // if slug not found

    const nextIndex = (currentIndex + 1) % PROPOSALS.length;
    return PROPOSALS[nextIndex];
  };

  const nextExpertise = getNextExpertise(slug);

  const isMobile = useBreakpoint();

  return (
    <>
      <Head>
        <title>{PageData.meta.title}</title>
        <meta name="description" content={PageData.meta.description}></meta>
        <link rel="canonical" href={prefixed(`/offers/${slug}`)} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={PageData.meta.title}></meta>
        <meta property="og:description" content={PageData.meta.description}></meta>
        <meta property="og:url" content={prefixed(`/offers/${slug}`)}></meta>
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
          <main className={`${ExpertiseStyles['expertise-single']} container-full`}>
            <Hero variant={variant} tagText={PageData.tagText} heading={PageData.heading} image="" />
            <div className={ExpertiseStyles['homepage__purple-change']}>
              <HomepageShowreel homepageShowreelCSSClass={ExpertiseStyles['homepage__showreel']} src={prefixed('/videos/work/crm.mp4')} isMobile={isMobile}>
                <div className={`${ExpertiseStyles['work-grid']} ${HomePageStyles['work-grid']}`}>
                  <WorkGridRowLandscape>
                    {/* <OffersReel bgColor="cyan" title={PageData.tagText} image={prefixed("/images/placeholder/1080-transparent.png")} poster={prefixed("/videos/dev8x/thumbnail.jpg")} src={prefixed("/videos/dev8x/master.m3u8")} /> */}
                    <VideoPlayer src={prefixed(`/videos/proposals/${slug}/master.m3u8`)} poster={prefixed(`/videos/proposals/${slug}/thumbnail.jpg`)} />
                  </WorkGridRowLandscape>
                </div>
              </HomepageShowreel>
            </div>
            <div>
              <ModularBlocks>
                <IconCards title={PageData.iconCards?.title} paragraph={PageData.iconCards?.paragraph} items={PageData.iconCards?.items} />
                <ContentAsideImage contentAsideImageItems={PageData.contentAsideImageItems} />
              </ModularBlocks>

              <div className={ExpertiseStyles['expertise-container']}>
                <AwardsBlock />

                <div className={ExpertiseStyles['expertise-container']}>
                  <h2 className="hidden">Testimonials:</h2>
                  {/* <CardStack variant="Stack">
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
                  </CardStack> */}

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
                  {/* <FAQs faqs={PageData.faqs} /> */}
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
        <DevelopersModal selectedOffer={currentModal.data?.selectedOffer} variant={variant} plansItems={PageData?.primaryPlansItems} />
      </SmoothModalWrapper>
      <SmoothModalWrapper modalType="minisquads" toggle={() => toggleModal('minisquads')}>
        <MiniSquadsModal selectedOffer={currentModal.data?.selectedOffer} variant={variant} plansItems={PageData?.secondaryPlansItems} />
      </SmoothModalWrapper>
      <SmoothModalWrapper modalType="schedulecall" toggle={() => toggleModal('schedulecall')}>
        <ScheduleCallContent />
      </SmoothModalWrapper>
    </>
  );
};

export default ProposalPage;

export async function getStaticPaths() {
  const paths = PROPOSALS.map((project) => ({
    params: { slug: project.slug }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const PageData = PROPOSALS.find((p) => p.slug === params.slug);
  const { variant, tagText, heading, paragraph, image, iconCards, contentAsideImageItems, meta, footerMainContent, footerData, footerSocialLinks, testimonials } = PageData;

  if (!PageData) {
    return { notFound: true };
  }

  const props = { slug: params.slug, variant, tagText, heading, paragraph, image, iconCards, contentAsideImageItems, meta, footerMainContent, footerData, footerSocialLinks, testimonials };

  // Remove undefined values to prevent serialization errors
  Object.keys(props).forEach((key) => {
    if (props[key] === undefined) {
      delete props[key];
    }
  });

  return {
    props
  };
}
