import React, { useEffect } from 'react';

// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// import Scrollbar from 'smooth-scrollbar';
import Head from 'next/head';

import { Header, FooterRevealPageWrap, FooterInternationalContents } from '@repo/components';

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
  const mainContent = {
    link: '/contact',
    start: 'Let’s find',
    end: 'your next client!'
  };
  const footerContent = {
    logo: {
      src: '/logo.svg',
      alt: 'Dev8X'
    },
    privacy: {
      text: 'Privacy',
      href: '#'
    },
    button: {
      text: 'Acknowledgement of Country'
    }
  };
  const socialLinks = [
    {
      title: (
        <>
          <s>Twitter</s> X
        </>
      ),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" fill="none" viewBox="0 0 13 14" className="var-w-13 var-h-14">
          <path fill="currentColor" fillRule="evenodd" d="M7.121.87H5.874v4.123L2.96 2.078l-.882.882 2.92 2.919H.864v1.247h4.133l-2.919 2.919.882.882 2.913-2.913v4.122h1.247V8.004l2.923 2.923.882-.882-2.919-2.919h4.125V5.88H8.009l2.919-2.919-.882-.882-2.925 2.925V.869Z" clipRule="evenodd" />
        </svg>
      ),
      href: '#'
    },
    {
      title: 'Instagram',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" fill="none" viewBox="0 0 13 14" className="var-w-13 var-h-14">
          <path fill="currentColor" fillRule="evenodd" d="M7.121.87H5.874v4.123L2.96 2.078l-.882.882 2.92 2.919H.864v1.247h4.133l-2.919 2.919.882.882 2.913-2.913v4.122h1.247V8.004l2.923 2.923.882-.882-2.919-2.919h4.125V5.88H8.009l2.919-2.919-.882-.882-2.925 2.925V.869Z" clipRule="evenodd" />
        </svg>
      ),
      href: '#'
    },
    {
      title: 'LinkedIn',
      href: '#'
    }
  ];

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
          {/* Main container with smooth-scrollbar */}
          <main className={styles['contact-page']}>
            <div className={styles['contact-bg-desktop']}>
              <picture className={`${PictureStyles['picture']} ${styles['contact-image']}`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/3024x2000/8c579e2bc5/contact-video-frame.jpg/m/1512x1000/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/3024x2000/8c579e2bc5/contact-video-frame.jpg/m/2268x1500/filters:quality(80) 1.5x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/3024x2000/8c579e2bc5/contact-video-frame.jpg/m/1512x1000/filters:quality(80)" loading="eager" width="1512" height="1000" alt="" className="" draggable="false" />
              </picture>
              <video className={styles['contact-video']} src="https://player.vimeo.com/progressive_redirect/download/900999111/rendition/source/contact-video-2268-optim%20%28Original%29.mp4?loc=external&amp;signature=a6fbf829cabe7579d4163dd6f73e42f254934d5ef8b41213be671a0547004cf5" width="1512" height="1000" autoPlay loop playsInline></video>
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
                    <button className={ButtonStyles['button-wrapper']}>
                      <span className={`${ButtonStyles['button']} ${ButtonStyles['button--icon']} ${ButtonStyles['button--bg-secondary']} ${ContactFormModalStyles['contact-button']} ${styles['contact-button']}}`}>
                        Submit a brief
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" fill="none" stroke-width="0.5" viewBox="0 0 14 13" className={styles['button--icon']}>
                          <path fill="currentColor" stroke="currentColor" d="M1 5.816H.75v1.326h10.014l-4.008 3.907-.173.168.162.179.563.62.174.191.186-.18 5.506-5.37.184-.178-.184-.18L7.668.932l-.186-.18-.174.191-.563.62-.162.178.173.169 4.008 3.907H1Z" vector-effect="non-scaling-stroke"></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
                <div className="page_contact-bg-mobile__cCEP8">
                  <picture className="Picture_picture__X3Eos page_contact-image__TRw2w"></picture>
                </div>
              </div>
            </div>
            <footer className={styles['contact-footer']}>
              <FooterInternationalContents />
            </footer>
          </main>
        </FooterRevealPageWrap>
      </FooterRevealPageWrap>
    </>
  );
};

export default Contact;
