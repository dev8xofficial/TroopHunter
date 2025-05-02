import React, { useEffect } from 'react';

// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// import Scrollbar from 'smooth-scrollbar';
import Head from 'next/head';
import { FooterRevealPageWrap, ContentAsideImage, Footer, Header, Hero, IconCards, ModularBlocks, Button, ExpertiseCard } from '@repo/components';
import { PageData } from './index.d';

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

  //     createBackgroundScrollTrigger(
  //       '#footer-section',
  //       'top 10%',
  //       'top 10%',
  //       () => {
  //         if (mainTag != null) {
  //           mainTag.style.backgroundColor = '#dcf5f2';
  //         }
  //       },
  //       () => {
  //         if (mainTag != null) {
  //           mainTag.style.backgroundColor = '#dcf5f2';
  //         }
  //       },
  //       () => {
  //         if (mainTag != null) {
  //           mainTag.style.backgroundColor = '';
  //         }
  //       },
  //       () => {
  //         if (mainTag != null) {
  //           mainTag.style.backgroundColor = '#dcf5f2';
  //         }
  //       }
  //     );

  //     createBackgroundScrollTrigger(
  //       '#footer-section',
  //       'top top',
  //       'bottom top',
  //       () => {
  //         if (mainTag != null) {
  //           mainTag.style.backgroundColor = '';
  //         }
  //       },
  //       () => {},
  //       () => {
  //         if (mainTag != null) {
  //           mainTag.style.backgroundColor = '#f3f3e9';
  //         }
  //       }
  //     );

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
        <meta name="description" content="TroopHunter simplifies finding and connecting with businesses around the world."></meta>
        <link rel="canonical" href={`${process.env.VITE_TROOPHUNTER_PUBLIC_URL}`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content="TroopHunter - Find your next client!"></meta>
        <meta property="og:description" content="TroopHunter simplifies finding and connecting with businesses around the world."></meta>
        <meta property="og:url" content={`${process.env.VITE_TROOPHUNTER_PUBLIC_URL}`}></meta>
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content={`${process.env.VITE_TROOPHUNTER_PUBLIC_URL}/logo/logo-social.png`}></meta>
        <meta property="og:image:secure_url" content={`${process.env.VITE_TROOPHUNTER_PUBLIC_URL}/logo/logo-social.png`}></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:site_name" content="TroopHunter"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content="TroopHunter - Find your next client!"></meta>
        <meta name="twitter:description" content="TroopHunter simplifies finding and connecting with businesses around the world."></meta>
        <meta name="twitter:image" content={`${process.env.VITE_TROOPHUNTER_PUBLIC_URL}/logo/logo-social.png`}></meta>
        <meta name="twitter:site" content="@TroopHunter"></meta>
      </Head>
      <FooterRevealPageWrap variant="frame">
        <Header />
        <FooterRevealPageWrap variant="page">
          {/* Main container with smooth-scrollbar */}
          <main className={`${styles['expertise-single']} container-full`}>
            <Hero tagText="User Experience Design" heading="Engage, empower, delight" image="https://a-us.storyblok.com/f/1017006/3810x2036/6fe5a4bbe5/sussex-3810-x-2039.jpg" />
            <div>
              <ModularBlocks>
                <IconCards title="Award-winning digital experiences" paragraph="User Experience Design is central to our approach. Every decision we make across strategy, information architecture and underlying workflows aims to help every user achieve their goal as easily and delightfully as possible." IconCardsItems={PageData.IconCardsItems} />
                <ContentAsideImage ContentAsideImageItems={PageData.ContentAsideImageItems} />
              </ModularBlocks>
              <div className={styles['expertise-container']}>
                <footer className={styles['expertise-cta']}>
                  <h2 className={styles['expertise-cta__content']}>
                    <span>Extraordinary Digital Experiences</span>
                  </h2>
                  <div>
                    <Button>Submit a brief</Button>
                  </div>
                </footer>
                <ExpertiseCard />
              </div>
            </div>
          </main>
        </FooterRevealPageWrap>
        <Footer footerMainContent={PageData.footerMainContent} footerForm={PageData.footerForm} footerSocialLinks={PageData.footerSocialLinks} />
      </FooterRevealPageWrap>
    </>
  );
};

export default Contact;
