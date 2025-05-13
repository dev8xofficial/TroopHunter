import React from 'react';
import Head from 'next/head';
import { FooterRevealPageWrap, Footer, Header, WorkGrid, ProjectsFormModal, WORK_PROJECTS } from '@repo/components';
import { getDev8xPublicUrl } from '../../utils/helpers';
import { useProjectModal } from '../../hooks/useProjectModal';
import SmoothModalWrapper from '../../components/Surfaces/SmoothModalWrapper/SmoothModalWrapper';
import PageData from '../../data/work/index.d';

import TextAnimateUpStyles from '../../components/Surfaces/TextAnimateUp/index.module.css';
import LayoutStyles from '../../components/Surfaces/Layout/layout.module.css';
import WorkGridStyles from '../../components/Surfaces/WorkGrid/index.module.css';

const Work: React.FC = (): JSX.Element => {
  const { modalSlug, openModal, closeModal } = useProjectModal();
  const project = WORK_PROJECTS.find((project) => project.path === modalSlug) ?? WORK_PROJECTS[0];

  return (
    <>
      <Head>
        <title>Dev8X - Solutions Made Simple!</title>
        <meta name="description" content="Dev8X simplifies finding and connecting with businesses around the world."></meta>
        <link rel="canonical" href={`${getDev8xPublicUrl()}/work`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Dev8X - Solutions Made Simple!"></meta>
        <meta property="og:description" content="Dev8X simplifies finding and connecting with businesses around the world."></meta>
        <meta property="og:url" content={`${getDev8xPublicUrl()}/work`}></meta>
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
        <Header />
        <FooterRevealPageWrap variant="page">
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
          {/* Main container with smooth-scrollbar */}
          <main className={LayoutStyles['work-page']}>
            <div className={LayoutStyles['work-header']}>
              <h1 className={LayoutStyles['work-header__heading']} aria-label="World-class digital products, idea to execution.">
                <span className={`${TextAnimateUpStyles['word']}`} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)', animation: '0.8s cubic-bezier(0, 0.55, 0.45, 1) 0s 1 normal forwards running TextAnimateUp_mask-down__TzvI8' }}>
                  World-class{' '}
                </span>
                <span className={`${TextAnimateUpStyles['word']}`} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)', animation: '0.8s cubic-bezier(0, 0.55, 0.45, 1) 0s 1 normal forwards running TextAnimateUp_mask-down__TzvI8' }}>
                  digital{' '}
                </span>
                <span className={`${TextAnimateUpStyles['word']}`} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)', animation: '0.8s cubic-bezier(0, 0.55, 0.45, 1) 0s 1 normal forwards running TextAnimateUp_mask-down__TzvI8' }}>
                  products,{' '}
                </span>
                <span className={`${TextAnimateUpStyles['word']}`} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)', animation: '0.8s cubic-bezier(0, 0.55, 0.45, 1) 0s 1 normal forwards running TextAnimateUp_mask-down__TzvI8' }}>
                  idea{' '}
                </span>
                <span className={`${TextAnimateUpStyles['word']}`} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)', animation: '0.8s cubic-bezier(0, 0.55, 0.45, 1) 0s 1 normal forwards running TextAnimateUp_mask-down__TzvI8' }}>
                  to{' '}
                </span>
                <span className={`${TextAnimateUpStyles['word']}`} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)', animation: '0.8s cubic-bezier(0, 0.55, 0.45, 1) 0s 1 normal forwards running TextAnimateUp_mask-down__TzvI8' }}>
                  execution.
                </span>
              </h1>
            </div>
            {/* <WorkCategories /> */}
            <div>
              <h2 className="hidden">Featured</h2>
              <WorkGrid workGridCSSClass={WorkGridStyles['work-grid']} openModal={openModal} />
            </div>
          </main>
        </FooterRevealPageWrap>
        <Footer footerMainContent={PageData.footerMainContent} footerForm={PageData.footerForm} footerSocialLinks={PageData.footerSocialLinks} />
      </FooterRevealPageWrap>
      <SmoothModalWrapper toggle={closeModal}>{modalSlug && <ProjectsFormModal {...project} />}</SmoothModalWrapper>
    </>
  );
};

export default Work;
