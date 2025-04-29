import React, { useEffect } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Scrollbar from 'smooth-scrollbar';
import Head from 'next/head';

import Footer from './Footer/Footer';
import Header from '../../contact/Header/Header';
import { Hero } from '@repo/components';
import { Problems } from '@repo/components';
import { Steps } from '@repo/components';

// import './index.css';

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

const WebApplications: React.FC = (): JSX.Element => {
  const stepsList = [
    {
      title: 'Insight Rich',
      description: 'Once the problem has been defined, we validate the proposed solutions in the form of user journeys, IA, wireframing and prototyping.',
      icon: (
        <svg className="block m-h-0 min-w-0 left-0 top-0 absolute var-w-22 var-h-22" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 3.00001C8 4.65834 9.34169 6 11 6C12.6584 6 14 4.65834 14 3.00001C14 1.34167 12.6584 -5.86451e-08 11 -1.31133e-07C9.34169 -2.03621e-07 8 1.34167 8 3.00001Z" fill="var(--theme-primary)"></path> <path d="M8 18.9997C8 20.6581 9.34164 21.9998 11 21.9998C12.6583 21.9998 14 20.6581 14 18.9997C14 17.3414 12.6583 15.9998 11 15.9998C9.34164 15.9998 8 17.3414 8 18.9997Z" fill="var(--theme-primary)"></path>{' '}
          <path fillRule="evenodd" clipRule="evenodd" d="M17.8013 7.25C19.9376 7.25 21.75 8.88285 21.75 11C21.75 13.1171 19.9376 14.75 17.8013 14.75C15.6649 14.75 13.8525 13.1171 13.8525 11C13.8525 8.88284 15.6649 7.25 17.8013 7.25ZM20.25 11C20.25 9.80047 19.2013 8.75 17.8013 8.75C16.4012 8.75 15.3525 9.80048 15.3525 11C15.3525 12.1995 16.4012 13.25 17.8013 13.25C19.2013 13.25 20.25 12.1995 20.25 11Z" fill="var(--theme-secondary)"></path>{' '}
          <path fillRule="evenodd" clipRule="evenodd" d="M4.19875 7.4928C6.33511 7.4928 8.14755 9.12565 8.14755 11.2428C8.14755 13.36 6.33511 14.9928 4.19875 14.9928C2.06237 14.9928 0.250001 13.3599 0.250001 11.2428C0.250001 9.12567 2.06237 7.4928 4.19875 7.4928ZM6.64755 11.2428C6.64755 10.0433 5.5988 8.9928 4.19875 8.9928C2.79871 8.9928 1.75 10.0433 1.75 11.2428C1.75 12.4423 2.79871 13.4928 4.19875 13.4928C5.59881 13.4928 6.64755 12.4423 6.64755 11.2428Z" fill="var(--theme-secondary)"></path>{' '}
        </svg> 
      )
    },
    {
      title: 'Structured Foundations',
      description: 'We combine audience insights with our strategic expertise to fuel intensive periods of conceptual thinking, creating solutions that keep your brand moving forward.',
      icon: (
        <svg className="block m-h-0 min-w-0 left-0 top-0 absolute var-w-26 var-h-26" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.0616 6.14248V3.25" stroke="var(--theme-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M19.8575 11.9166H22.75" stroke="var(--theme-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M20.2042 18.0483L18.1567 16.0009" stroke="var(--theme-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9.97751 7.82164L7.92999 5.78503" stroke="var(--theme-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{' '}
          <path d="M18.1567 7.81082L20.2042 5.76331" stroke="var(--theme-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14.0942 14.9824C14.9392 14.1374 14.9392 12.7616 14.0942 11.9166C13.2383 11.0716 11.8733 11.0716 11.0175 11.9166L3.88919 19.0558C3.03336 19.9008 3.03336 21.2766 3.88919 22.1216C4.73419 22.9666 6.10998 22.9666 6.95498 22.1216L14.0942 14.9824Z" stroke="var(--theme-secondary)" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"></path>{' '}
        </svg> 
      )
    },
    {
      title: 'Strategic Execution',
      description: 'Our strategic solutions unlock opportunities and solve business problems. We create the best possible experience and the right conditions to deliver.',
      icon: (
        <svg className="block m-h-0 min-w-0 left-0 top-0 absolute var-w-24 var-h-24" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.95999 5.49005L12.03 6.32006C12.57 6.54006 12.57 6.89004 12.03 7.11004L9.95999 7.94006L9.12999 10.02C8.90999 10.54 8.55999 10.54 8.33999 10.02L7.50999 7.94006L5.43999 7.11004C4.91999 6.89004 4.91999 6.54006 5.43999 6.32006L7.50999 5.49005L8.33999 3.41006C8.55999 2.86006 8.90999 2.86006 9.12999 3.41006L9.95999 5.49005Z" stroke="var(--theme-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{' '}
          <path d="M17.52 11.8401L19.59 12.6702C20.13 12.8902 20.13 13.2401 19.59 13.4601L17.52 14.2902L16.69 16.3701C16.47 16.8901 16.12 16.8901 15.9 16.3701L15.07 14.2902L13 13.4601C12.48 13.2401 12.48 12.8902 13 12.6702L15.07 11.8401L15.9 9.76016C16.12 9.21016 16.47 9.21016 16.69 9.76016L17.52 11.8401Z" fill="var(--theme-primary)" stroke="var(--theme-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{' '}
          <path d="M8.21 16.78L9.99 17.49C10.46 17.68 10.46 17.98 9.99 18.17L8.21 18.88L7.5 20.66C7.31 21.11 7.01 21.11 6.82 20.66L6.11 18.88L4.33 18.17C3.89 17.98 3.89 17.68 4.33 17.49L6.11 16.78L6.82 15C7.01 14.53 7.31 14.53 7.5 15L8.21 16.78Z" stroke="var(--theme-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{' '}
        </svg> 
      )
    },
    {
      title: 'Integrated',
      description: 'We put your website at the heart of your digital ecosystem, providing secure API integrations and automated solutions across your business systems',
      icon: (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.8793 14.43C19.8793 19.0233 16.1526 22.75 11.5593 22.75C6.96595 22.75 3.23926 19.0233 3.23926 14.43C3.23926 9.83666 6.96595 6.10999 11.5593 6.10999" stroke="var(--theme-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>{' '}
          <path d="M21.7642 11.0066H15.9684C15.4267 11.0066 14.9934 10.5733 14.9934 10.0316V4.23579C14.9934 3.63995 15.5242 3.17411 16.1092 3.26078C19.5434 3.74828 22.2517 6.46745 22.7501 9.90161C22.8367 10.4866 22.3709 11.0174 21.7751 11.0174L21.7642 11.0066Z" stroke="var(--theme-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      )
    }
  ];
    const stepInfo = [
      {
        title: 'Ready for scale',
        paragraph: 'As your business evolves, so will your technological requirements. We implement a practical blend of proven solutions and latest technologies to produce applications that effortlessly adapt and expand. Be relevant now, stay relevant in the future.',
        image: 'https://a-us.storyblok.com/f/1017006/1864x1314/68a40c6f0e/trails2-1864-x-1316.jpg'
      },
      {
        title: 'From startups to enterprise',
        paragraph: 'We work with clients of all size, from startups poised for rapid growth or established enterprises looking to enhance their digital infrastructure. Our custom-designed and purpose-built web applications support and drive business success at every stage.',
        image: 'https://a-us.storyblok.com/f/1017006/1864x1314/828a82ab3e/growag.jpg'
      },
      {
        title: 'Entirely bespoke',
        paragraph: 'Unique businesses demand unique solutions. From marketplaces to automation, we work with each partner to strategise, design and execute web applications that are built to spec and integrate with your existing business systems.',
        image: 'https://a-us.storyblok.com/f/1017006/1864x1314/828a82ab3e/growag.jpg'
      }
    ];
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      const scrollbar = Scrollbar.init(document.querySelector('#smooth-scrollbar') as HTMLElement, {
        damping: 0.05
      });

      ScrollTrigger.scrollerProxy('#smooth-scrollbar', {
        scrollTop(value) {
          if (arguments.length) {
            scrollbar.scrollTop = value;
          }
          return scrollbar.scrollTop;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        }
      });

      scrollbar.addListener(ScrollTrigger.update);

      const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { y: 50 },
          {
            y: 0,
            scrollTrigger: {
              trigger: section,
              scroller: '#smooth-scrollbar',
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 2
            },
            ease: 'power2.in',
            duration: 2
          }
        );
      });

      const mainTag = document.querySelector('main') as HTMLElement;

      // Code for FeatureVideo
      // const triggerElment = document.getElementById('hero-section');
      // const featureVideoWrapperElement = document.getElementById('feature-video-wrapper');
      // let featureVideoElement = document.getElementById('feature-video');

      // scrollbar.addListener(function (status) {
      //   var offset = status.offset;

      //   console.log('offset.y: ', offset.y);
      //   featureVideoElement.style.top = `calc(${offset.y + 'px' + ' - 5vh'})`;
      // });

      // ScrollTrigger.create({
      //   trigger: featureVideoElement,
      //   scroller: '#smooth-scrollbar',
      //   start: 'top 50%',
      //   end: 'bottom bottom',
      //   scrub: true, // Enable smooth scrubbing (this will automatically reverse the animation on scroll up)
      //   onUpdate: (self) => {
      //     featureVideoElement.style.setProperty('--progress', self.progress.toString());
      //   }
      // });

      // createBackgroundScrollTrigger(
      //   '#feature-video-section',
      //   'top 10%',
      //   'top 10%',
      //   () => {
      //     if (mainTag != null) {
      //       mainTag.style.backgroundColor = '#f3f3e9';
      //     }
      //   },
      //   () => {
      //     if (mainTag != null) {
      //       mainTag.style.backgroundColor = '#f3f3e9';
      //     }
      //   },
      //   () => {
      //     if (mainTag != null) {
      //       mainTag.style.backgroundColor = '';
      //     }
      //   },
      //   () => {
      //     if (mainTag != null) {
      //       mainTag.style.backgroundColor = '#f3f3e9';
      //     }
      //   }
      // );

      // createBackgroundScrollTrigger(
      //   '#about-section',
      //   'top top',
      //   'bottom top',
      //   () => {
      //     if (mainTag != null) {
      //       mainTag.style.backgroundColor = '';
      //     }
      //   },
      //   () => {},
      //   () => {
      //     if (mainTag != null) {
      //       mainTag.style.backgroundColor = '#f3f3e9';
      //     }
      //   }
      // );

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        scrollbar.destroy();
      };
    }
  }, []);

  return (
    <>
      <Head>
        <title>TroopHunter - Find your next client!</title>
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
      {/* Main container with smooth-scrollbar */}
      <main className="relative h-full max-h-screen min-h-screen font-medium leading-relaxed transition-colors duration-500 ease-in-out bg-[#ffffff]" id="smooth-scrollbar">
        <Header />
        <section id="hero-section">
          <Hero tagBgColor="#fd589e" tagText="Web Applications" heading={['Custom', 'digital', 'platforms,', 'idea', 'to', 'execution']} image="https://a-us.storyblok.com/f/1017006/3810x2036/e3c7f6fa18/strategyux.jpg" />
        </section>
        <section id="problems-section">
          <Problems title="Built to spec" paragraph="We design and build bespoke web-based applications to meet the needs of business operations." stepsList={stepsList} />
        </section>
        <section id="steps-section">
          <Steps  stepInfo={stepInfo}/>
        </section>
        <div className="grid">
          <section id="footer-section">
            <Footer />
          </section>
        </div>
      </main>
    </>
  );
};

export default WebApplications;
