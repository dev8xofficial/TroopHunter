'use client';

import Head from 'next/head';
import { useSetAtom } from 'jotai';
import { toggleSmoothModalAtom } from '@repo/components';
import { useProjectModal } from '../hooks/useProjectModal';
import Hero from '../components/Surfaces/Hero/Hero';
// import Problems from './home/Problems/Problems';
import { FooterRevealPageWrap, Header, HomepageShowreel, Footer, WorkGrid, WhyDev8X, ProjectsFormModal, ContactFormModal, WORK_PROJECTS } from '@repo/components';
import { AppearOnScroll } from '@repo/components/src/Animations/AppearOnScroll';
import { useBreakpoint } from '../hooks/useBreakpoint';
import SmoothModalWrapper from '../components/Surfaces/SmoothModalWrapper/SmoothModalWrapper';
import PageData from '../data/index.d';
import SubmenuData from '../data/navigation/index.d';
import { prefixed } from '../utils/helpers';

import TextAnimateStyles from '../components/Surfaces/TextAnimateUp/index.module.css';
import styles from './index.module.css';

export default function Home() {
  const toggleModal = useSetAtom(toggleSmoothModalAtom);
  const { modalSlug, openModal, closeProjectModal } = useProjectModal();
  const project = WORK_PROJECTS.find((project) => project.path === modalSlug) ?? WORK_PROJECTS[0];

  const getNextWorkProject = (currentSlug: string | null) => {
    if (!currentSlug) return null;

    const currentIndex = WORK_PROJECTS.findIndex((e) => e.slug === currentSlug);

    if (currentIndex === -1) return null;

    const nextIndex = (currentIndex + 1) % WORK_PROJECTS.length;
    return WORK_PROJECTS[nextIndex];
  };

  const nextWorkProject = getNextWorkProject(modalSlug);
  const isMobile = useBreakpoint();

  return (
    <>
      <Head>
        <title>{PageData.meta.title}</title>
        <meta name="description" content={PageData.meta.description}></meta>
        <link rel="canonical" href="/" />

        {/* Open Graph Tags */}
        <meta property="og:title" content={PageData.meta.title}></meta>
        <meta property="og:description" content={PageData.meta.description}></meta>
        <meta property="og:url" content="/"></meta>
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
            --theme-primary: var(--default-primary);
            --theme-primary-text: var(--default-primary-text);
            --theme-secondary: var(--default-secondary);
            --theme-text: var(--default-text);
            --theme-background: var(--default-tertiary);
            --theme-logo: var(--default-secondary);
            --theme-header-face: var(--default-primary);
          }
        `}</style>
        <Header submenuData={SubmenuData} />
        <FooterRevealPageWrap variant="page">
          {/* Main container with smooth-scrollbar */}
          <main className={styles['homepage']}>
            <Hero title={PageData.title} />
            <div className={styles['homepage__purple-change']}>
              <HomepageShowreel homepageShowreelCSSClass={styles['homepage__showreel']} src={PageData.video} isMobile={isMobile} />
            </div>
            {/* <Problems /> */}
            <section className={styles['showcase']}>
              <h2 className={styles['showcase__heading']} aria-label={PageData.paragraph}>
                {PageData.paragraph.split(' ').map((word, index) => (
                  <AppearOnScroll key={index} delay={0.2} duration={0.2} yOffset={20} as="span" className={TextAnimateStyles['word']}>
                    <span
                      aria-hidden="true"
                      style={{
                        display: 'inline-block',
                        whiteSpace: 'pre'
                      }}
                    >
                      {word + ' '}
                    </span>
                  </AppearOnScroll>
                ))}
              </h2>
              {/* <HomePageLogos /> */}
            </section>
            {/* <Hero />
            <FeatureVideoResponsive />
            <TestimonialsLarge /> */}
            <div className={styles['homepage__section']}>
              <WorkGrid workGridCSSClass={styles['work-grid']} openModal={openModal} />
              <WhyDev8X {...PageData.whyDev8XContent} />
              {/* <div className={styles['homepage__feed-wrapper']}>
                <div className={styles['homepage__feed-wrapper-inner']}>
                  <FeedSlider  />
                </div>
              </div> */}
            </div>
          </main>
        </FooterRevealPageWrap>
        <Footer footerMainContent={PageData.footerMainContent} footerData={PageData.footerData} footerSocialLinks={PageData.footerSocialLinks} onClick={() => toggleModal('contact')} />
      </FooterRevealPageWrap>
      <SmoothModalWrapper
        modalType="project"
        toggle={() => {
          toggleModal('project');
          closeProjectModal();
        }}
      >
        {modalSlug && <ProjectsFormModal {...project} nextWorkProject={nextWorkProject} />}
      </SmoothModalWrapper>
      <SmoothModalWrapper modalType="contact" toggle={() => toggleModal('contact')}>
        <ContactFormModal />
      </SmoothModalWrapper>
    </>
  );
}
