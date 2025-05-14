import React from 'react';
import Head from 'next/head';
import { useSetAtom } from 'jotai';
import { toggleSmoothModalAtom } from '../../store/smoothModalAtom';

import { Header, FooterRevealPageWrap, FooterInternationalContents, ContactFormModal } from '@repo/components';
import SmoothModalWrapper from '../../components/Surfaces/SmoothModalWrapper/SmoothModalWrapper';
import RightArrowIcon from '@repo/components/src/Icons/RightArrow';
import { getDev8xPublicUrl } from '../../utils/helpers';

import PageData from '../../data/contact/index.d';

import PictureStyles from '../../components/Surfaces/Picture/index.module.css';
import TextStyles from '../../components/Surfaces/TextAnimateUp/index.module.css';
import ButtonStyles from '../../components/Surfaces/Button/index.module.css';
import ContactFormModalStyles from '../../components/Surfaces/ContactFormModal/index.module.css';
import styles from './index.module.css';
import { useBreakpoint } from '../../hooks/useBreakpoint';

const Contact: React.FC = (): JSX.Element => {
  const toggleModal = useSetAtom(toggleSmoothModalAtom);
  const isMobile = useBreakpoint();

  return (
    <>
      <Head>
        <title>Dev8X - Solutions Made Simple!</title>
        <meta name="description" content="Dev8X simplifies finding and connecting with businesses around the world."></meta>
        <link rel="canonical" href={`${getDev8xPublicUrl()}/contact`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Dev8X - Solutions Made Simple!"></meta>
        <meta property="og:description" content="Dev8X simplifies finding and connecting with businesses around the world."></meta>
        <meta property="og:url" content={`${getDev8xPublicUrl()}/contact`}></meta>
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
              --theme-primary: var(--purple-primary);
              --theme-primary-text: var(--purple-primary-text);
              --theme-secondary: var(--purple-secondary);
              --theme-text: var(--purple-text);
              --theme-background: #b8afc6;
              --theme-logo: #ffffff;
              --theme-header-face: #ffd9b6;
            }
          `}</style>
          {/* Main container with smooth-scrollbar */}
          <main className={`${styles['contact-page']}`}>
            {isMobile ? (
              <div className={styles['contact-bg-mobile']}>
                <picture className={`${PictureStyles['picture']} ${styles['contact-image']}`}>
                  <source srcSet="https://a-us.storyblok.com/f/1017006/900x900/9298fb8569/contact-video-frame-square-mobile.jpg/m/450x450/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/900x900/9298fb8569/contact-video-frame-square-mobile.jpg/m/900x900/filters:quality(80) 2x" media="(min-width: 0px) and (max-width: 479px)" />
                  <source srcSet="https://a-us.storyblok.com/f/1017006/900x900/9298fb8569/contact-video-frame-square-mobile.jpg/m/900x900/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/900x900/9298fb8569/contact-video-frame-square-mobile.jpg/m/1800x1800/filters:quality(80) 2x" media="(min-width: 480px)" />
                  <img src="https://a-us.storyblok.com/f/1017006/900x900/9298fb8569/contact-video-frame-square-mobile.jpg/m/450x450/filters:quality(80)" loading="eager" width="450" height="450" alt="" draggable="false" />
                </picture>
                <video className={styles['contact-video']} src="https://player.vimeo.com/progressive_redirect/download/900999010/rendition/source/contact-video-square-900-optim%20%28Original%29.mp4?loc=external&amp;signature=..." width="900" height="900" autoPlay muted loop playsInline />
              </div>
            ) : (
              <div className={styles['contact-bg-desktop']}>
                <picture className={`${PictureStyles['picture']} ${styles['contact-image']}`}>
                  <source srcSet="https://a-us.storyblok.com/f/1017006/3024x2000/8c579e2bc5/contact-video-frame.jpg/m/1512x1000/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/3024x2000/8c579e2bc5/contact-video-frame.jpg/m/2268x1500/filters:quality(80) 1.5x" media="(min-width: 0px)" />
                  <img src="https://a-us.storyblok.com/f/1017006/3024x2000/8c579e2bc5/contact-video-frame.jpg/m/1512x1000/filters:quality(80)" loading="eager" width="1512" height="1000" alt="" draggable="false" />
                </picture>
                <video className={styles['contact-video']} src="https://player.vimeo.com/progressive_redirect/download/900999111/rendition/source/contact-video-2268-optim%20%28Original%29.mp4?loc=external&amp;signature=..." width="1512" height="1000" autoPlay muted loop playsInline />
              </div>
            )}
            <div className={styles['contact-container']}>
              <div className={styles['contact-content']}>
                <h1 className={styles['contact-heading']} aria-label="We've got a great feeling about this">
                  <span
                    className={`${TextStyles['word']}`}
                    aria-hidden="true"
                    style={{
                      display: 'inline-block',
                      whiteSpace: 'pre',
                      transform: 'translate3d(0px, ' + '0%' + ', 0px)',
                      animation: 'mask-down 0.8s cubic-bezier(0, 0.55, 0.45, 1) 0s 1 normal forwards'
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        display: 'inline-block',
                        whiteSpace: 'pre',
                        transform: 'translate3d(0px, ' + '0%' + ', 0px)',
                        animation: 'mask-down 0.8s cubic-bezier(0, 0.55, 0.45, 1) 0s 1 normal forwards'
                      }}
                    >
                      We've {''}
                    </span>
                  </span>
                  <span className={`${TextStyles['word']}`} aria-hidden="true">
                    <span aria-hidden="true">got a</span>
                  </span>
                  <span className={`${TextStyles['word']}`} aria-hidden="true">
                    <span aria-hidden="true">great {''}feeling</span>
                  </span>
                  <span className={`${TextStyles['word']}`} aria-hidden="true">
                    <span aria-hidden="true">about {''}this</span>
                  </span>
                </h1>
                <div>
                  <div>
                    <button className={ButtonStyles['button-wrapper']} onClick={toggleModal}>
                      <span className={`${ButtonStyles['button']} ${ButtonStyles['button--icon']} ${ButtonStyles['button--bg-secondary']} ${ContactFormModalStyles['contact-button']} ${styles['contact-button']}}`}>
                        Submit a brief
                        <RightArrowIcon width="14" className={styles['button--icon']} />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <footer className={styles['contact-footer']}>
              <FooterInternationalContents footerForm={PageData.footerForm} footerSocialLinks={PageData.footerSocialLinks} />
            </footer>
          </main>
        </FooterRevealPageWrap>
      </FooterRevealPageWrap>
      <SmoothModalWrapper toggle={toggleModal}>
        <ContactFormModal />
      </SmoothModalWrapper>
    </>
  );
};

export default Contact;
