import Head from 'next/head';
import { getDev8xPublicUrl } from '../utils/helpers';
import { useSetAtom } from 'jotai';
import { toggleSmoothModalAtom } from '../store/smoothModalAtom';
import { useProjectModal } from '../hooks/useProjectModal';
import Hero from '../components/Surfaces/Hero/Hero';
// import Problems from './home/Problems/Problems';
import { FooterRevealPageWrap, Header, HomepageShowreel, Footer, WorkGrid, WhyDev8X, ProjectsFormModal, ContactFormModal, WORK_PROJECTS } from '@repo/components';
import { AppearOnScroll } from '@repo/components/src/Animations/AppearOnScroll';
import { useBreakpoint } from '../hooks/useBreakpoint';
import SmoothModalWrapper from '../components/Surfaces/SmoothModalWrapper/SmoothModalWrapper';
import PageData from '../data/index.d';

import TextAnimateStyles from '../components/Surfaces/TextAnimateUp/index.module.css';
import styles from './index.module.css';

export default function Home() {
  const toggleModal = useSetAtom(toggleSmoothModalAtom);
  const { modalSlug, openModal } = useProjectModal();
  const project = WORK_PROJECTS.find((project) => project.path === modalSlug) ?? WORK_PROJECTS[0];
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
  const headingText = 'We design, build and ship world-class digital products for forward-thinking brands.';
  const isMobile = useBreakpoint();

  return (
    <>
      <Head>
        <title>{PageData.meta.title}</title>
        <meta name="description" content={PageData.meta.description}></meta>
        <link rel="canonical" href={`${getDev8xPublicUrl()}`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={PageData.meta.title}></meta>
        <meta property="og:description" content={PageData.meta.description}></meta>
        <meta property="og:url" content={`${getDev8xPublicUrl()}`}></meta>
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content={`${getDev8xPublicUrl()}/logo-social.png`}></meta>
        <meta property="og:image:secure_url" content={`${getDev8xPublicUrl()}/logo-social.png`}></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:site_name" content="Dev8X"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content={PageData.meta.title}></meta>
        <meta name="twitter:description" content={PageData.meta.description}></meta>
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
              <HomepageShowreel homepageShowreelCSSClass={styles['homepage__showreel']} src="/videos/header/header.mp4" isMobile={isMobile} />
            </div>
            {/* <Problems /> */}
            <section className={styles['showcase']}>
              <h2 className={styles['showcase__heading']} aria-label={headingText}>
                {headingText.split(' ').map((word, index) => (
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
              <WhyDev8X {...whyDev} />
              {/* <div className={styles['homepage__feed-wrapper']}>
                <div className={styles['homepage__feed-wrapper-inner']}>
                  <FeedSlider  />
                </div>
              </div> */}
            </div>
          </main>
        </FooterRevealPageWrap>
        <Footer footerMainContent={PageData.footerMainContent} footerForm={PageData.footerForm} footerSocialLinks={PageData.footerSocialLinks} onClick={() => toggleModal('contact')} />
      </FooterRevealPageWrap>
      <SmoothModalWrapper modalType="project" toggle={() => toggleModal('project')}>
        {modalSlug && <ProjectsFormModal {...project} />}
      </SmoothModalWrapper>
      <SmoothModalWrapper modalType="contact" toggle={() => toggleModal('contact')}>
        <ContactFormModal />
      </SmoothModalWrapper>
    </>
  );
}
