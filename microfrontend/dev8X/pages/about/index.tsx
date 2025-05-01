import React, { useEffect } from 'react';

// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// import Scrollbar from 'smooth-scrollbar';
import Head from 'next/head';
import { AboutGallery, Footer, FooterRevealPageWrap, Header, LogoGrid } from '@repo/components';
import Capabilities from './Capabilities/Capabilities';
import { PageData } from './index.d';

import AboutHeroStyles from '../../components/Surfaces/AboutHero/index.module.css';
import TextAnimateStyles from '../../components/Surfaces/TextAnimateUp/index.module.css';
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
          <main className={styles['about']}>
            <div className={AboutHeroStyles['about-hero']} style={{ '--scrollY': '0' } as React.CSSProperties}>
              <div>
                <div className={AboutHeroStyles['about-hero__hero-wrapper']}>
                  {/* Mobile Heading */}
                  <h1 className={`${AboutHeroStyles['about-hero__heading']} ${['about-hero__heading--mobile']}`} aria-label="Digital Products. Human Experiences.">
                    <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 80%, 0px)' }}>
                      <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 0 }}>
                        Digital{' '}
                      </span>
                    </span>
                    <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 80%, 0px)' }}>
                      <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 0 }}>
                        Products.{' '}
                      </span>
                    </span>
                    <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 80%, 0px)' }}>
                      <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 0 }}>
                        Human{' '}
                      </span>
                    </span>
                    <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 80%, 0px)' }}>
                      <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 0 }}>
                        Experiences.
                      </span>
                    </span>
                  </h1>
                  {/* Desktop Heading */}
                  <h1 className={`${AboutHeroStyles['about-hero__heading']} ${['about-hero__heading--desktop']}`}>
                    <span aria-label="Digital Products.">
                      <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                        <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                          Digital{' '}
                        </span>
                      </span>
                      <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                        <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                          Products.{' '}
                        </span>
                      </span>
                    </span>
                    <span className="AboutHero_about-hero__heading-opacity__BrOA2">
                      <span aria-label="Human Experiences.">
                        <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                          <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                            Human{' '}
                          </span>
                        </span>
                        <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                          <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                            Experiences.
                          </span>
                        </span>
                      </span>
                    </span>
                  </h1>
                </div>
                <div className={AboutHeroStyles['about-hero__container']}>
                  <p className={AboutHeroStyles['about-hero__intro']} aria-label="[Human experiences] are the foundation of everything we do – client relationships, team collaboration and an unwavering focus on the end user. This philosophy is in our name, our core values and underpins our approach to every engagement.">
                    <span className={styles['format']}>
                      <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                        <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                          Human experiences{' '}
                        </span>
                      </span>
                    </span>
                    <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                      <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                        are the foundation of everything
                      </span>
                    </span>
                    <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                      <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                        we do – client relationships, team collaboration and an{' '}
                      </span>
                    </span>
                    <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                      <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                        unwavering focus on the end user. This philosophy is{' '}
                      </span>
                    </span>
                    <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                      <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                        in our name, our core values and underpins our{' '}
                      </span>
                    </span>
                    <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                      <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                        approach to every engagement.
                      </span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              <AboutGallery />
              <div className={styles['about-logos']}>
                <h2 className={styles['about-logos__intro']} aria-label="Since 2010 we’ve been working with amazing [clients] to create meaningful impact and compelling experiences.">
                  <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                    <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                      Since 2010 we’ve been working with
                    </span>
                  </span>
                  <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                    <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                      amazing{' '}
                    </span>
                  </span>
                  <span className={styles['format']}>
                    <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                      <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                        clients{' '}
                      </span>
                    </span>
                  </span>
                  <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                    <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                      to create meaningful
                    </span>
                  </span>
                  <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                    <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                      impact and compelling experiences.
                    </span>
                  </span>
                </h2>
                <LogoGrid />
              </div>
              <div className={styles['about-capabilities']}>
                <h2 className={styles['about-capabilities__intro']} aria-label="Our [capabilities] are centred around our ability to deliver world-className websites and apps. We’re 100% in-house and work end-to-end, ensuring each project is delivered to the highest standard.">
                  <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                    <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                      Our{' '}
                    </span>
                  </span>
                  <span className={styles['format']}>
                    <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                      <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                        capabilities{' '}
                      </span>
                    </span>
                  </span>
                  <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                    <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                      are centred around our
                    </span>
                  </span>
                  <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                    <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                      ability to deliver world-className websites and
                    </span>
                  </span>
                  <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                    <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                      apps. We’re 100% in-house and work
                    </span>
                  </span>
                  <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                    <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                      end-to-end,{''} ensuring each project is
                    </span>
                  </span>
                  <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                    <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                      delivered to the highest standard.
                    </span>
                  </span>
                </h2>
                <Capabilities />
              </div>
            </div>
            <div className="">
              <div className={styles['about-dos-donts']}>
                <h2 className={styles['about-dos-donts__intro']} aria-label="Above all, we believe in human relationships, exceptional outcomes, and having fun along the way.">
                  <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                    <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                      Above{''} all,
                    </span>
                  </span>
                  <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                    <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                      we believe in human{''}
                    </span>
                  </span>
                  <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                    <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                      relationships, exceptional outcomes, and {''}
                    </span>
                  </span>
                  <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                    <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                      having fun along the way.
                    </span>
                  </span>
                </h2>
                <div className={styles['about-dos-donts__grid']}>
                  <section className={styles['about-column']} style={{ opacity: 1, transform: 'translateX(0px)' }}>
                    <h3 className={styles['about-column__heading']}>What we do</h3>
                    <ul className={styles['about-column__list']}>
                      <li>World-className </li>
                      <li>Expect creativity</li>
                      <li>Celebrate success</li>
                      <li>Obsess over detail</li>
                      <li>Pub lunch Fridays</li>
                      <li>Embrace change</li>
                      <li>Unlock potential</li>
                      <li>High-five</li>
                      <li>Outstanding service</li>
                      <li>Value relationships</li>
                      <li>Exceed expectations</li>
                      <li>Party</li>
                    </ul>
                  </section>
                  <section className={styles['about-column']} style={{ opacity: 1, transform: 'translateX(0px)' }}>
                    <h3 className={styles['about-column__heading']}>
                      <span>What we don't</span>
                    </h3>
                    <ul className={styles['about-column__list']}>
                      <li>Work weekends</li>
                      <li>Outsource</li>
                      <li>Resist cake</li>
                      <li>Lose at Mario Kart</li>
                      <li>‘Make it pop’</li>
                      <li>Free pitches</li>
                      <li>Sacrifice quality</li>
                      <li>Egos</li>
                      <li>Overpromise</li>
                      <li>Cut corners</li>
                      <li>Accept mediocrity</li>
                      <li>Decaf</li>
                    </ul>
                  </section>
                </div>
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
