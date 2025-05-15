import Head from 'next/head';
import { getDev8xPublicUrl } from '../utils/helpers';
import { useProjectModal } from '../hooks/useProjectModal';
import Hero from '../components/Surfaces/Hero/Hero';
import Problems from './home/Problems/Problems';
import { FooterRevealPageWrap, Header, HomepageShowreel, Footer, WorkGrid, WhyDev8X, ProjectsFormModal } from '@repo/components';
import { useBreakpoint } from '../hooks/useBreakpoint';
// import SmoothModalWrapper from '../components/Surfaces/SmoothModalWrapper/SmoothModalWrapper';
import PageData from '../data/index.d';

import styles from './index.module.css';

export default function Home() {
  const { modalSlug, openModal, closeModal } = useProjectModal();
  const whyDev = {
    heading: 'Why Dev8X',
    para1: 'We believe that meaningful design starts with empathy. Every product we create is centered around improving real lives—helping people achieve more with less friction.',
    para2: 'By combining strategy, creativity, and technology, we unlock opportunities, transform businesses, and make experiences that truly matter. As an independent team, our agility and passion shape every project into something exceptional.',
    image: 'https://a-us.storyblok.com/f/1017006/1200x1400/dc71890964/humaanpeople.jpg/m/450x548/filters:quality(80)',
    stats: [
      { title: '100%', span: ['In-house ', '& ', 'independent'] },
      { title: '6+', span: ['Years ', 'crafting ', 'digital ', 'experiences'] },
      { title: '20+', span: ['Digital ', 'solutions ', 'launched ', 'worldwide'] }
    ]
  };
  const isMobile = useBreakpoint();

  return (
    <>
      <Head>
        <title>Dev8X - Solutions Made Simple!</title>
        <meta name="description" content="Dev8X simplifies finding and connecting with businesses around the world."></meta>
        <link rel="canonical" href={`${getDev8xPublicUrl()}`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Dev8X - Solutions Made Simple!"></meta>
        <meta property="og:description" content="Dev8X simplifies finding and connecting with businesses around the world."></meta>
        <meta property="og:url" content={`${getDev8xPublicUrl()}`}></meta>
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content={`${getDev8xPublicUrl()}/logo-social.png`}></meta>
        <meta property="og:image:secure_url" content={`${getDev8xPublicUrl()}/logo-social.png`}></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:site_name" content="Dev8X"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content="Dev8X - Solutions Made Simple!"></meta>
        <meta name="twitter:description" content="Dev8X simplifies finding and connecting with businesses around the world."></meta>
        <meta name="twitter:image" content={`${getDev8xPublicUrl()}/logo-social.png`}></meta>
        <meta name="twitter:site" content="@Dev8X"></meta>
      </Head>
      <FooterRevealPageWrap variant="frame">
        <style jsx global>{`
          :root {
            --theme-primary: var(--default-primary);
            --theme-primary-text: var(--default-primary-text);
            --theme-secondary: var(--default-secondary);
            --theme-text: var(--default-text);
            --theme-background: var(--default-tertiary);
            --theme-logo: var(--default-secondary);
            --theme-header-face: var(--default-primary);
          }
        `}</style>
        <Header />
        <FooterRevealPageWrap variant="page">
          {/* Main container with smooth-scrollbar */}
          <main className={styles['homepage']}>
            <Hero />
            <div className={styles['homepage__purple-change']}>
              <HomepageShowreel homepageShowreelCSSClass={styles['homepage__showreel']} isMobile={isMobile} />
            </div>
            <Problems />
            {/* <Hero />
            <FeatureVideoResponsive />
            <TestimonialsLarge /> */}
            <div className={styles['homepage__section']}>
              <WorkGrid workGridCSSClass={styles['work-grid']} openModal={openModal} />
              <WhyDev8X {...whyDev} />
              {/* <a class="Button_button-wrapper__2Ps4h page_homepage-bottom__link__bpR9a" target="_self" href="/about">
                <span class="Button_button__lQZdm Button_button--icon__Me_aL Button_button--bg-secondary__6flN1" style="transform: translateX(0%) translateY(0%) rotate(0deg) translateZ(0px);">
                  About Us
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" fill="none" stroke-width="0.5" viewBox="0 0 14 13" class="" style="--width: 14; --height: 13;">
                    <path fill="currentColor" stroke="currentColor" d="M1 5.816H.75v1.326h10.014l-4.008 3.907-.173.168.162.179.563.62.174.191.186-.18 5.506-5.37.184-.178-.184-.18L7.668.932l-.186-.18-.174.191-.563.62-.162.178.173.169 4.008 3.907H1Z" vector-effect="non-scaling-stroke"></path>
                  </svg>
                </span>
              </a>
              <a class="Button_button-wrapper__2Ps4h" href="/expertise/headless">
                <span class="Button_button__lQZdm Button_button--icon__Me_aL Button_button--bg-secondary__6flN1 ExpertiseCard_expertise-card__button__DdE04" style="transform: translateX(0%) translateY(0%) rotate(0deg) translateZ(0px);">
                  Read more
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" fill="none" stroke-width="0.5" viewBox="0 0 14 13" class="" style="--width: 14; --height: 13;">
                    <path fill="currentColor" stroke="currentColor" d="M1 5.816H.75v1.326h10.014l-4.008 3.907-.173.168.162.179.563.62.174.191.186-.18 5.506-5.37.184-.178-.184-.18L7.668.932l-.186-.18-.174.191-.563.62-.162.178.173.169 4.008 3.907H1Z" vector-effect="non-scaling-stroke"></path>
                  </svg>
                </span>
              </a>
              <a class="Button_button-wrapper__2Ps4h" target="_blank" href="https://sussextaps.com.au">
                <span class="Button_button__lQZdm Button_button--icon__Me_aL Button_button--bg-secondary__6flN1" style="transform: translateX(0%) translateY(0%) rotate(0deg) translateZ(0px);">
                  Visit Website
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" fill="none" stroke-width="0.5" viewBox="0 0 14 13" class="" style="--width: 14; --height: 13;">
                    <path fill="currentColor" stroke="currentColor" d="M1 5.816H.75v1.326h10.014l-4.008 3.907-.173.168.162.179.563.62.174.191.186-.18 5.506-5.37.184-.178-.184-.18L7.668.932l-.186-.18-.174.191-.563.62-.162.178.173.169 4.008 3.907H1Z" vector-effect="non-scaling-stroke"></path>
                  </svg>
                </span>
              </a> */}
            </div>
          </main>
        </FooterRevealPageWrap>
        <Footer footerMainContent={PageData.footerMainContent} footerForm={PageData.footerForm} footerSocialLinks={PageData.footerSocialLinks} />
      </FooterRevealPageWrap>
      {/* <SmoothModalWrapper toggle={closeModal}>{modalSlug && <ProjectsFormModal />}</SmoothModalWrapper> */}
    </>
  );
}
