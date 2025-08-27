import React from 'react';
import Head from 'next/head';
import { toggleSmoothModalAtom } from '../../store/smoothModalAtom';
import { useSetAtom } from 'jotai';
import RightArrowIcon from '@repo/components/src/Icons/RightArrow';
import OFFERS from '../../data/offers/index.d';
import { FooterRevealPageWrap, ContentAsideImage, Footer, Header, Hero, ModularBlocks, IconCards, Button, ExpertiseCard, AwardsBlock, CardStack, WorkDetail, ExpertiseContent, ContactFormModal, HomepageShowreel, WorkGridRowLandscape, WorkCard, OffersReel } from '@repo/components';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import SmoothModalWrapper from '../../components/Surfaces/SmoothModalWrapper/SmoothModalWrapper';
import VideoPlayer from '@repo/components/src/Surfaces/VideoPlayer/VideoPlayer';

// import PictureStyles from '../../components/Surfaces/Picture/index.module.css';
import HomePageStyles from '../../pages//index.module.css';
import styles from './index.module.css';

const Websites: React.FC = ({ slug, variant, ...PageData }: ExpertiseContent): JSX.Element => {
  const toggleModal = useSetAtom(toggleSmoothModalAtom);
  const isMobile = useBreakpoint();

  const getNextExpertise = (currentSlug: string) => {
    const currentIndex = OFFERS.findIndex((e) => e.slug === currentSlug);

    if (currentIndex === -1) return null; // if slug not found

    const nextIndex = (currentIndex + 1) % OFFERS.length;
    return OFFERS[nextIndex];
  };

  const nextExpertise = getNextExpertise(slug);

  return (
    <>
      <Head>
        <title>{PageData.meta.title.replace('Offer', PageData.heading.split('\n')[0])}</title>
        <meta name="description" content={PageData.meta.description}></meta>
        <link rel="canonical" href="/offers/${slug}" />

        {/* Open Graph Tags */}
        <meta property="og:title" content={PageData.meta.title.replace('Offer', PageData.heading.split('\n')[0])}></meta>
        <meta property="og:description" content={PageData.meta.description}></meta>
        <meta property="og:url" content="/offers/${slug}"></meta>
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content="/logo-social.png"></meta>
        <meta property="og:image:secure_url" content="/logo-social.png"></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:site_name" content="Dev8X"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content={PageData.meta.title.replace('Offer', PageData.heading.split('\n')[0])}></meta>
        <meta name="twitter:description" content={PageData.meta.description}></meta>
        <meta name="twitter:image" content="/logo-social.png"></meta>
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
        <Header />
        <FooterRevealPageWrap variant="page">
          <main className={`${styles['expertise-single']} container-full`}>
            <Hero variant={variant} tagText={PageData.tagText} heading={PageData.heading} image="" />

            <div className={styles['homepage__purple-change']}>
              <HomepageShowreel homepageShowreelCSSClass={styles['homepage__showreel']} src="/videos/work/crm.mp4" isMobile={isMobile}>
                <div className={`${styles['work-grid']} ${HomePageStyles['work-grid']}`}>
                  <WorkGridRowLandscape>
                    {/* <OffersReel bgColor="cyan" title={PageData.tagText} image="/images/placeholder/1080-transparent.png" poster="/videos/dev8x/thumbnail.jpg" src="/videos/dev8x/master.m3u8" /> */}
                    <VideoPlayer src={`/videos/offers/${slug}/master.m3u8`} poster={`/videos/offers/${slug}/thumbnail.jpg`} />
                  </WorkGridRowLandscape>
                </div>
              </HomepageShowreel>
            </div>

            <div>
              <ModularBlocks>
                <IconCards title={PageData.iconCards?.title} paragraph={PageData.iconCards?.paragraph} items={PageData.iconCards?.items} />
                <ContentAsideImage contentAsideImageItems={PageData.contentAsideImageItems} />
              </ModularBlocks>

              <div className={styles['expertise-container']}>
                <AwardsBlock />

                <div className={styles['expertise-container']}>
                  {/* <h2 className="hidden">Testimonials:</h2>
                <CardStack variant="Stack">
                  {PageData?.testimonials?.map((item, index) => (
                    <CardStack variant="Card" index={index} key={index}>
                      <figure className={styles['testimonial-card']} style={{ backgroundColor: item.bgColor, color: item.color }}>
                        <picture className={`${PictureStyles['picture']} ${PictureStyles['picture--responsive']} ${styles['testimonial-card__image']}`}>
                          <source srcSet={`${item.image}/m/390x360/filters:quality(80) 1x, ${item.image}/m/780x720/filters:quality(80) 2x`} media="(min-width: 0px) and (max-width: 479px)" />
                          <source srcSet={`${item.image}/m/872x806/filters:quality(80) 1x, ${item.image}/m/1744x1612/filters:quality(80) 2x`} media="(min-width: 480px) and (max-width: 991px)" />
                          <source srcSet={`${item.image}/m/667x609/filters:quality(80) 1x, ${item.image}/m/1334x1218/filters:quality(80) 2x`} media="(min-width: 992px)" />
                          <img src={`${item.image}/m/390x360/filters:quality(80)`} loading="lazy" width={390} height={360} alt="" draggable={false} />
                        </picture>

                        <blockquote className={styles['testimonial-card__quote']}>{`“${item.comment}”`}</blockquote>

                        <figcaption className={styles['testimonial-card__author']}>
                          <dl className={styles['testimonial-card__author-details']}>
                            <dt className={styles['testimonial-card__author-name']}>{item.name}</dt>
                            <dd className={styles['testimonial-card__author-title']}>{item.company}</dd>
                          </dl>
                        </figcaption>
                      </figure>
                    </CardStack>
                  ))}
                </CardStack> */}

                  <footer className={styles['expertise-cta']}>
                    <h2 className={styles['expertise-cta__content']}>
                      <span>Extraordinary Digital Experiences</span>
                    </h2>
                    <div>
                      <Button variant="secondary" context="contact" size="large" endIcon={<RightArrowIcon width="14" className={styles['button--icon']} />} spanClassName={styles['contact-button']} onClick={() => toggleModal('contact')}>
                        Submit a brief
                      </Button>
                    </div>
                  </footer>

                  <ExpertiseCard variant={nextExpertise.variant} tagText={nextExpertise.tagText} heading={nextExpertise.iconCards.paragraph} slug={nextExpertise.slug} image={nextExpertise.image} />
                </div>
              </div>
            </div>
          </main>
        </FooterRevealPageWrap>

        <Footer footerMainContent={PageData.footerMainContent} footerForm={PageData.footerForm} footerSocialLinks={PageData.footerSocialLinks} onClick={() => toggleModal('contact')} />
      </FooterRevealPageWrap>
      <SmoothModalWrapper modalType="contact" toggle={() => toggleModal('contact')}>
        <ContactFormModal />
      </SmoothModalWrapper>
    </>
  );
};

export default Websites;

export async function getStaticPaths() {
  const paths = OFFERS.map((project) => ({
    params: { slug: project.slug }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const PageData = OFFERS.find((p) => p.slug === params.slug);
  const { slug, variant, tagText, heading, iconCards, contentAsideImageItems, meta, footerMainContent, footerForm, footerSocialLinks, testimonials } = PageData;

  if (!PageData) {
    return { notFound: true };
  }

  return {
    props: { slug, variant, tagText, heading, iconCards, contentAsideImageItems, meta, footerMainContent, footerForm, footerSocialLinks, testimonials }
  };
}
