import React, { useEffect } from 'react';

// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// import Scrollbar from 'smooth-scrollbar';
import Head from 'next/head';

import { ContentAsideImage, Footer, Header, Hero, IconCards, ModularBlocks } from '@repo/components';
import FooterRevealPageWrap from '../../../components/Surfaces/FooterRevealPageWrap';

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
  const stepsList = [
    {
      title: 'The Right Technolog',
      description: 'We spruik a core collection of robust technologies, chosen for maximum flexibility, useful for every occasion. Our preferred stack includes Swift, Java and React Native.',
      icon: (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4.2251 17.3658H7.72427C7.98427 17.3658 8.23342 17.4742 8.41759 17.6475L9.79344 19.0125C9.97761 19.1967 10.2268 19.2942 10.4868 19.2942H15.3293C15.6976 19.2942 16.0443 19.0884 16.1959 18.7634L16.6293 17.8967C16.7918 17.5717 17.1384 17.3658 17.4959 17.3658H21.7643C22.2951 17.3658 22.7393 17.7992 22.7393 18.33V19.2942C22.7393 20.9083 21.4284 22.1975 19.8143 22.1975H6.16427C4.5501 22.1975 3.23926 20.8975 3.23926 19.2942V18.33C3.23926 17.7992 3.68345 17.3658 4.21428 17.3658H4.2251Z"
            stroke="var(--theme-secondary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path d="M4.7124 17.3658V6.5108C4.7124 5.0158 6.09906 3.79163 7.82156 3.79163H18.1782C19.8899 3.79163 21.2874 5.00497 21.2874 6.5108V17.3658" stroke="var(--theme-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      )
    },
    {
      title: 'Handy Experience',
      description: '>We design engaging and immersive mobile experiences, delighting users while solving business problems and keeping your brand at the forefront.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.3599 14.84L11.0399 15.99C11.3399 16.49 11.7599 16.9 12.2699 17.19C12.7799 17.48 13.3499 17.63 13.9299 17.63H20.9899" stroke="var(--theme-secondary)" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round"></path> <path d="M3 6.37H3.35999C3.93999 6.37 4.50999 6.52 5.01999 6.81C5.52999 7.1 5.95 7.51001 6.25 8.01001L6.92001 9.13" stroke="var(--theme-secondary)" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round"></path>{' '}
          <path d="M3 17.63H3.35999C3.93999 17.63 4.50999 17.48 5.01999 17.19C5.52999 16.9 5.95 16.49 6.25 15.99L10.98 8.01001C11.28 7.51001 11.7 7.1 12.21 6.81C12.72 6.52 13.29 6.37 13.87 6.37H20.93" stroke="var(--theme-primary)" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round"></path> <path d="M17.6099 14.25L20.9799 17.62L17.6099 20.99" stroke="var(--theme-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M17.6099 3L20.9799 6.38L17.6099 9.75" stroke="var(--theme-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      )
    },
    {
      title: 'Not Just a Pretty Fac',
      description: 'As with any digital product, performance, accessibility and usability are paramount. We go to great lengths to ensure every app looks and functions well for all.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.1416 3.5H20.2999C22.6099 3.5 24.4999 5.39001 24.4999 7.70001V9.695" stroke="var(--theme-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M3.5 9.74167V7.70001C3.5 5.39001 5.39001 3.5 7.70001 3.5H9.70668" stroke="var(--theme-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M9.74167 24.5H7.70001C5.39001 24.5 3.5 22.61 3.5 20.3V18.2117" stroke="var(--theme-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M24.4998 18.2117V20.3C24.4998 22.61 22.6098 24.5 20.2998 24.5H18.2231" stroke="var(--theme-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M9.7998 8.8783V10.9783" stroke="var(--theme-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M18.1997 8.8783V10.9783" stroke="var(--theme-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M13.9997 10.4532V14.1399C13.9997 14.4666 13.848 14.7699 13.5914 14.9682L12.9497 15.4699" stroke="var(--theme-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M16.9048 18.69C16.2398 19.5416 15.2015 20.09 14.0465 20.09C12.8915 20.09 11.7598 19.495 11.1064 18.585" stroke="var(--theme-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      )
    },
    {
      title: 'Integrated',
      description: 'A mobile app is just one part of your digital ecosystem. We incorporate secure API integrations to ensure seamless operation across your business.',
      icon: (
        <svg width="28" height="14" viewBox="0 0 28 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.6252 3.36759C10.3692 2.57359 8.85336 1 6.90445 1C3.64181 1 1 3.58412 1 6.77457C1 9.96501 3.65625 12.5491 6.90445 12.5491C9.09878 12.5491 11.1344 11.4231 12.2748 9.57524L14.0072 6.77457L15.7252 3.9739C16.8512 2.14047 18.8867 1 21.0955 1C24.3581 1 27 3.58412 27 6.77457C27 9.96501 24.3437 12.5491 21.0955 12.5491C19.1466 12.5491 18.0782 11.1921 16.3747 10.1815" stroke="var(--theme-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      )
    }
  ];
  const stepInfo = [
    {
      title: 'From MVP to fully featured',
      paragraph: "Whether you're a startup looking to disrupt the market or an established enterprise seeking to expand your digital footprint, we can build a scalable, robust, and secure mobile app that serves and delights your users.",
      image: 'https://a-us.storyblok.com/f/1017006/1864x1314/29a2856a60/communityapp.jpeg'
    },
    {
      title: 'Tailored customer experiences',
      paragraph: 'Our apps are tailored to the needs of the audience, offering compelling journeys to match their behaviour and usage. With a focus on exceptional user experiences, we transform ideas into powerful tools for customer engagement and brand loyalty.',
      image: 'https://a-us.storyblok.com/f/1017006/3728x2628/a06188a927/talk-n-walk-1864-x-1314.jpg'
    },
    {
      title: 'iOS and Android',
      paragraph: 'Blending innovative design, robust functionality, and seamless UX thinking, we create create world-class iOS and Android apps, utilising both native technologies and mobile frameworks to suit the unique requirements of every product.',
      image: 'https://a-us.storyblok.com/f/1017006/1864x1314/633f43cde7/mideasttunes2.jpeg'
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
            <Hero tagText="Mobile Apps" heading="We design, build and ship awesome mobile apps" image="https://a-us.storyblok.com/f/1017006/3810x2036/6fe5a4bbe5/sussex-3810-x-2039.jpg" />
            <div>
              <ModularBlocks>
                <IconCards title="Built to touch" paragraph="Bespoke iOS and Android App Development – delivered entirely in-house." stepsList={stepsList} />
                <ContentAsideImage stepInfo={stepInfo} />
              </ModularBlocks>
            </div>
          </main>
        </FooterRevealPageWrap>
        <Footer mainContent={mainContent} footerContent={footerContent} socialLinks={socialLinks} />
      </FooterRevealPageWrap>
    </>
  );
};

export default Contact;
