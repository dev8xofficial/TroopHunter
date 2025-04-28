import { useEffect } from 'react';
import Head from 'next/head';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from 'lenis';
import { getDev8xPublicUrl } from '../utils/helpers';
// import Scrollbar from 'smooth-scrollbar';
import Hero from '../components/Feedback/Hero/Hero';
import Header from '../components/Surfaces/Header/Header';
import FeatureVideoResponsive from './home/FeatureVideo/FeatureVideoResponsive';
import TestimonialsLarge from './home/Testimonials/TestimonialsLarge';
import Problems from './home/Problems/Problems';
import Steps from './home/Steps/Steps';
import { Footer, WhyDev8X, WorkWithVideos } from '@repo/components';
import FooterRevealPageWrap from '../components/Surfaces/FooterRevealPageWrap';
import PurpleChange from '../components/Surfaces/PurpleChange/PurpleChange';

import styles from './index.module.css';

// type ScrollTriggerCallback = () => void;

// const createBackgroundScrollTrigger = (sectionId: string, startTrigger: string, endTrigger: string, onEnter: ScrollTriggerCallback = () => {}, onLeave: ScrollTriggerCallback = () => {}, onLeaveBack: ScrollTriggerCallback = () => {}, onEnterBack: ScrollTriggerCallback = () => {}) => {
//   ScrollTrigger.create({
//     trigger: sectionId,
//     scroller: '#smooth-scrollbar',
//     start: startTrigger,
//     end: endTrigger,
//     onEnter: () => {
//       onEnter();
//     },
//     onLeave: () => {
//       onLeave();
//     },
//     onLeaveBack: () => {
//       onLeaveBack();
//     },
//     onEnterBack: () => {
//       onEnterBack();
//     }
//   });
// };

export default function Home() {
  const mainContent = {
    link: '/contact',
    start: 'Let’s find',
    svgIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" fill="none" strokeWidth="0.5" viewBox="0 0 14 13" className="block min-h-0 min-w-0 stroke-1 transform translate-y-[10%] h-[.65em] transition-[color_.4s,transform_.15s] text-[var(--theme-primary)] w-auto var-w-14 var-h-13 lg:stroke-2">
        <path fill="currentColor" stroke="currentColor" d="M1 5.816H.75v1.326h10.014l-4.008 3.907-.173.168.162.179.563.62.174.191.186-.18 5.506-5.37.184-.178-.184-.18L7.668.932l-.186-.18-.174.191-.563.62-.162.178.173.169 4.008 3.907H1Z" vectorEffect="non-scaling-stroke"></path>
      </svg>
    ),
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
  const whyDev = {
    heading: 'Why Dev8X',

    para1: 'Dev8X is your trusted IT partner, here to help your business succeed in the digital world. We create custom solutions for websites, backend systems, and mobile apps that make your work easier, improve customer experiences, and help you reach your goals.',
    para2: 'By working with Dev8X, you gain access to smart solutions that make a real difference. We help you save time with automation, grow faster with reliable systems, and stay ahead of your competition. Whatever challenges you face, we’re here to help you succeed today and in the future.',
    image: 'https://a-us.storyblok.com/f/1017006/1200x1400/dc71890964/humaanpeople.jpg/m/450x548/filters:quality(80)',
    whyinfo: [
      { title: '100+', paragraph: 'In-house & independent' },
      { title: '5', paragraph: 'Years revolutionizing lead generation' },
      { title: '50+', paragraph: 'Success stories and counting' }
    ]
  };
  const headVideo = [
    {
      title: 'Total Health Dental Care',
      bgColor: '#dcf5f2',

      video: (
        <>
          <picture className="max-w-full leading-[0] block rounded-2xl row-start-1 -col-start-1 row-end-auto col-end-auto absolute">
            <img className="max-w-full m-0 object-cover w-full h-full rounded-[inherit]" src="/images/placeholder/1080.png"></img>
          </picture>
          <video className="rounded-inherit z-0 aspect-square row-start-1 col-start-1 row-end-auto col-end-auto w-auto object-center object-contain" src="/videos/work/crm.mp4" preload="none" loop controls={false} autoPlay muted playsInline></video>
        </>
      )
    },
    {
      title: 'Honeydu',
      bgColor: '#efe3ff',

      video: (
        <>
          <picture className="max-w-full leading-[0] block rounded-2xl row-start-1 -col-start-1 row-end-auto col-end-auto absolute">
            <img className="max-w-full m-0 object-cover w-full h-full rounded-[inherit]" src="/images/placeholder/1080.png"></img>
          </picture>
          <video className="rounded-inherit z-0 aspect-square row-start-1 col-start-1 row-end-auto col-end-auto w-auto object-center object-contain" src="/videos/work/honeydu.mp4" preload="none" loop controls={false} autoPlay muted playsInline></video>
        </>
      )
    },
    {
      title: 'Coral',
      bgColor: '#d8e7ee',

      video: (
        <>
          <picture className="max-w-full leading-[0] block rounded-2xl row-start-1 -col-start-1 row-end-auto col-end-auto absolute">
            <img className="max-w-full m-0 object-cover w-full h-full rounded-[inherit]" src="/images/placeholder/1080.png"></img>
          </picture>
          <video className="rounded-inherit z-0 aspect-square row-start-1 col-start-1 row-end-auto col-end-auto w-auto object-center object-contain" src="/videos/work/coral.mp4" preload="none" loop controls={false} autoPlay muted playsInline></video>
        </>
      )
    },
    {
      title: 'Golden Dao',
      bgColor: '#dcf5f2',

      video: (
        <>
          <picture className="max-w-full leading-[0] block rounded-2xl row-start-1 -col-start-1 row-end-auto col-end-auto absolute">
            <img className="max-w-full m-0 object-cover w-full h-full rounded-[inherit]" src="/images/placeholder/1080.png"></img>
          </picture>
          <video className="rounded-inherit z-0 aspect-square row-start-1 col-start-1 row-end-auto col-end-auto w-auto object-center object-contain" src="/videos/work/golden-dao.mp4" preload="none" loop controls={false} autoPlay muted playsInline></video>
        </>
      )
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

  //     // const sections = document.querySelectorAll('div[id$="-section"]');
  //     // sections.forEach((section) => {
  //     //   gsap.fromTo(
  //     //     section,
  //     //     { y: 0 }, // This would give text and other items move up animation for 50px.
  //     //     {
  //     //       y: 0,
  //     //       scrollTrigger: {
  //     //         trigger: section,
  //     //         scroller: '#smooth-scrollbar',
  //     //         start: 'top 80%',
  //     //         end: 'bottom 20%',
  //     //         scrub: 2
  //     //       },
  //     //       ease: 'power2.in',
  //     //       duration: 2
  //     //     }
  //     //   );
  //     // });

  //     const mainTag = document.querySelector('main');

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
  //       '#feature-video-section',
  //       'top 10%',
  //       'top 10%',
  //       () => {
  //         if (mainTag) {
  //           mainTag.style.backgroundColor = '#f3f3e9';
  //         }
  //       },
  //       () => {
  //         if (mainTag) {
  //           mainTag.style.backgroundColor = '#f3f3e9';
  //         }
  //       },
  //       () => {
  //         if (mainTag) {
  //           mainTag.style.backgroundColor = '';
  //         }
  //       },
  //       () => {
  //         if (mainTag) {
  //           mainTag.style.backgroundColor = '#f3f3e9';
  //         }
  //       }
  //     );

  //     createBackgroundScrollTrigger(
  //       '#about-section',
  //       'top top',
  //       'bottom top',
  //       () => {
  //         if (mainTag) {
  //           mainTag.style.backgroundColor = '';
  //         }
  //       },
  //       () => {},
  //       () => {
  //         if (mainTag) {
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

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      <Head>
        <title>Dev8X - Solutions Made Simple!</title>
        <meta name="description" content="Dev8X simplifies finding and connecting with businesses around the world."></meta>
        <link rel="canonical" href={`${getDev8xPublicUrl()}`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Dev8X - Solutions Made Simple!"></meta>
        <meta property="og:description" content="Dev8X simplifies finding and connecting with businesses around the world."></meta>
        <meta property="og:url" content={`${getDev8xPublicUrl()}`}></meta>
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
          {/* Main container with smooth-scrollbar */}
          <main className={styles['homepage']}>
            <Hero />
            <PurpleChange />
            <Problems />
            {/* <Hero />
            <FeatureVideoResponsive />
            <TestimonialsLarge /> */}
            <div className="grid">
              <WorkWithVideos headVideo={headVideo} />
              <WhyDev8X {...whyDev} />
            </div>
            <Footer mainContent={mainContent} footerContent={footerContent} socialLinks={socialLinks} />
          </main>
        </FooterRevealPageWrap>
      </FooterRevealPageWrap>
    </>
  );
}
