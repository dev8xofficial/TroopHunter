import React from 'react';
import Head from 'next/head';
import { useSetAtom, useAtom } from 'jotai';
import { isSmoothModalOpenAtom, toggleSmoothModalAtom } from '../../store/smoothModalAtom';

// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// import Scrollbar from 'smooth-scrollbar';

import { Header, FooterRevealPageWrap, FooterInternationalContents } from '@repo/components';
import SmoothModalWrapper from '../../components/Surfaces/SmoothModalWrapper/SmoothModalWrapper';
import RightArrowIcon from '@repo/components/src/Icons/RightArrow';
import PageData from '../../data/contact/index.d';

import PictureStyles from '../../components/Surfaces/Picture/index.module.css';
import TextStyles from '../../components/Surfaces/TextAnimateUp/index.module.css';
import ButtonStyles from '../../components/Surfaces/Button/index.module.css';
import ContactFormModalStyles from '../../components/Surfaces/ContactFormModal/index.module.css';
import styles from './index.module.css';

// type ScrollTriggerCallback = () => void;

// const createBackgroundScrollTrigger = (sectionId: string, startTrigger: string, endTrigger: string, onEnter?: ScrollTriggerCallback, onLeave?: ScrollTriggerCallback, onLeaveBack?: ScrollTriggerCallback, onEnterBack?: ScrollTriggerCallback): void => {
//   ScrollTrigger.create({
//     trigger: sectionId,
//     scroller: '#smooth-scrollbar',
//     start: startTrigger,
//     end: endTrigger,
//     onEnter:
//       onEnter != null
//         ? () => {
//             onEnter();
//           }
//         : undefined,
//     onLeave:
//       onLeave != null
//         ? () => {
//             onLeave();
//           }
//         : undefined,
//     onLeaveBack:
//       onLeaveBack != null
//         ? () => {
//             onLeaveBack();
//           }
//         : undefined,
//     onEnterBack:
//       onEnterBack != null
//         ? () => {
//             onEnterBack();
//           }
//         : undefined
//   });
// };

const Contact: React.FC = (): JSX.Element => {
  const toggleModal = useSetAtom(toggleSmoothModalAtom);
  const [show] = useAtom(isSmoothModalOpenAtom);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     gsap.registerPlugin(ScrollTrigger);

  //     const scrollbar = Scrollbar.init(document.querySelector('#smooth-scrollbar') as HTMLElement, {
  //       damping: 0.05
  //     });

  //     ScrollTrigger.scrollerProxy('#smooth-scrollbar', {
  //       scrollTop(value) {
  //         if (arguments.length) {
  //           scrollbar.scrollTop = value;
  //         }
  //         return scrollbar.scrollTop;
  //       },
  //       getBoundingClientRect() {
  //         return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  //       }
  //     });

  //     scrollbar.addListener(ScrollTrigger.update);

  //     const sections = document.querySelectorAll('section');
  //     sections.forEach((section) => {
  //       gsap.fromTo(
  //         section,
  //         { y: 50 },
  //         {
  //           y: 0,
  //           scrollTrigger: {
  //             trigger: section,
  //             scroller: '#smooth-scrollbar',
  //             start: 'top 80%',
  //             end: 'bottom 20%',
  //             scrub: 2
  //           },
  //           ease: 'power2.in',
  //           duration: 2
  //         }
  //       );
  //     });

  //     const mainTag = document.querySelector('main') as HTMLElement;

  //     // Code for FeatureVideo
  //     // const triggerElment = document.getElementById('hero-section');
  //     // const featureVideoWrapperElement = document.getElementById('feature-video-wrapper');
  //     // let featureVideoElement = document.getElementById('feature-video');

  //     // scrollbar.addListener(function (status) {
  //     //   var offset = status.offset;

  //     //   console.log('offset.y: ', offset.y);
  //     //   featureVideoElement.style.top = `calc(${offset.y + 'px' + ' - 5vh'})`;
  //     // });

  //     // ScrollTrigger.create({
  //     //   trigger: featureVideoElement,
  //     //   scroller: '#smooth-scrollbar',
  //     //   start: 'top 50%',
  //     //   end: 'bottom bottom',
  //     //   scrub: true, // Enable smooth scrubbing (this will automatically reverse the animation on scroll up)
  //     //   onUpdate: (self) => {
  //     //     featureVideoElement.style.setProperty('--progress', self.progress.toString());
  //     //   }
  //     // });

  //     // createBackgroundScrollTrigger(
  //     //   '#feature-video-section',
  //     //   'top 10%',
  //     //   'top 10%',
  //     //   () => {
  //     //     if (mainTag != null) {
  //     //       mainTag.style.backgroundColor = '#f3f3e9';
  //     //     }
  //     //   },
  //     //   () => {
  //     //     if (mainTag != null) {
  //     //       mainTag.style.backgroundColor = '#f3f3e9';
  //     //     }
  //     //   },
  //     //   () => {
  //     //     if (mainTag != null) {
  //     //       mainTag.style.backgroundColor = '';
  //     //     }
  //     //   },
  //     //   () => {
  //     //     if (mainTag != null) {
  //     //       mainTag.style.backgroundColor = '#f3f3e9';
  //     //     }
  //     //   }
  //     // );

  //     // createBackgroundScrollTrigger(
  //     //   '#about-section',
  //     //   'top top',
  //     //   'bottom top',
  //     //   () => {
  //     //     if (mainTag != null) {
  //     //       mainTag.style.backgroundColor = '';
  //     //     }
  //     //   },
  //     //   () => {},
  //     //   () => {
  //     //     if (mainTag != null) {
  //     //       mainTag.style.backgroundColor = '#f3f3e9';
  //     //     }
  //     //   }
  //     // );

  //     return () => {
  //       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  //       scrollbar.destroy();
  //     };
  //   }
  // }, []);

  return (
    <>
      <Head>
        <title>Dev8X - Solutions Made Simple!</title>
        <meta name="description" content="Dev8X simplifies finding and connecting with businesses around the world."></meta>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DEV8X_URL}`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Dev8X - Solutions Made Simple!"></meta>
        <meta property="og:description" content="Dev8X simplifies finding and connecting with businesses around the world."></meta>
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_DEV8X_URL}`}></meta>
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_DEV8X_URL}/logo/logo-social.png`}></meta>
        <meta property="og:image:secure_url" content={`${process.env.NEXT_PUBLIC_DEV8X_URL}/logo/logo-social.png`}></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:site_name" content="Dev8X"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content="Dev8X - Solutions Made Simple!"></meta>
        <meta name="twitter:description" content="Dev8X simplifies finding and connecting with businesses around the world."></meta>
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_DEV8X_URL}/logo/logo-social.png`}></meta>
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
          <main className={styles['contact-page']}>
            <div className={styles['contact-bg-desktop']}>
              <picture className={`${PictureStyles['picture']} ${styles['contact-image']}`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/3024x2000/8c579e2bc5/contact-video-frame.jpg/m/1512x1000/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/3024x2000/8c579e2bc5/contact-video-frame.jpg/m/2268x1500/filters:quality(80) 1.5x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/3024x2000/8c579e2bc5/contact-video-frame.jpg/m/1512x1000/filters:quality(80)" loading="eager" width="1512" height="1000" alt="" className="" draggable="false" />
              </picture>
              <video className={styles['contact-video']} src="https://player.vimeo.com/progressive_redirect/download/900999111/rendition/source/contact-video-2268-optim%20%28Original%29.mp4?loc=external&amp;signature=a6fbf829cabe7579d4163dd6f73e42f254934d5ef8b41213be671a0547004cf5" width="1512" height="1000" autoPlay muted loop playsInline></video>
            </div>
            <div className={styles['contact-container']}>
              <div className={styles['contact-content']}>
                <h1 className={styles['contact-heading']} aria-label="We've got a great feeling about this">
                  <span className={`${TextStyles['word']}`} aria-hidden="true">
                    <span aria-hidden="true">We've {''}</span>
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
                <div className={styles['contact-bg-mobile']}>
                  <picture className={`${PictureStyles['picture']} ${styles['contact-image']}`}>
                    <source srcSet="https://a-us.storyblok.com/f/1017006/900x900/9298fb8569/contact-video-frame-square-mobile.jpg/m/450x450/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/900x900/9298fb8569/contact-video-frame-square-mobile.jpg/m/900x900/filters:quality(80) 2x" media="(min-width: 0px) and (max-width: 479px)" />
                    <source srcSet="https://a-us.storyblok.com/f/1017006/900x900/9298fb8569/contact-video-frame-square-mobile.jpg/m/900x900/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/900x900/9298fb8569/contact-video-frame-square-mobile.jpg/m/1800x1800/filters:quality(80) 2x" media="(min-width: 480px)" />
                    <img src="https://a-us.storyblok.com/f/1017006/900x900/9298fb8569/contact-video-frame-square-mobile.jpg/m/450x450/filters:quality(80)" loading="eager" width="450" height="450" alt="" className="" draggable="false" />
                  </picture>
                </div>
                {/* <video className={styles['contact-video']} src="https://player.vimeo.com/progressive_redirect/download/900999010/rendition/source/contact-video-square-900-optim%20%28Original%29.mp4?loc=external&amp;signature=9ddaa105361e9d771885fde1b0e756156e958c058d7a2523f32cf8a7bea4895a" width="900" height="900" autoPlay muted  loop playsInline></video> */}
              </div>
            </div>
            <footer className={styles['contact-footer']}>
              <FooterInternationalContents footerForm={PageData.footerForm} footerSocialLinks={PageData.footerSocialLinks} />
            </footer>
          </main>
        </FooterRevealPageWrap>
      </FooterRevealPageWrap>
      {show && <SmoothModalWrapper toggle={toggleModal} />}
    </>
  );
};

export default Contact;
