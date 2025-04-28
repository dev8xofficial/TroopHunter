import { useEffect } from 'react';
import Head from 'next/head';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Scrollbar from 'smooth-scrollbar';
import Hero from './home/Hero/Hero';
import Header from '../components/Surfaces/Header/Header';
import FeatureVideoResponsive from './home/FeatureVideo/FeatureVideoResponsive';
import TestimonialsLarge from './home/Testimonials/TestimonialsLarge';
import About from './home/About/About';
import Footer from './home/Footer/Footer';
import Problems from './home/Problems/Problems';
import Steps from './home/Steps/Steps';
import { getDev8xPublicUrl } from '../utils/helpers';
import { WorkWithVideos } from '@repo/components';

type ScrollTriggerCallback = () => void;

const createBackgroundScrollTrigger = (sectionId: string, startTrigger: string, endTrigger: string, onEnter: ScrollTriggerCallback = () => {}, onLeave: ScrollTriggerCallback = () => {}, onLeaveBack: ScrollTriggerCallback = () => {}, onEnterBack: ScrollTriggerCallback = () => {}) => {
  ScrollTrigger.create({
    trigger: sectionId,
    scroller: '#smooth-scrollbar',
    start: startTrigger,
    end: endTrigger,
    onEnter: () => {
      onEnter();
    },
    onLeave: () => {
      onLeave();
    },
    onLeaveBack: () => {
      onLeaveBack();
    },
    onEnterBack: () => {
      onEnterBack();
    }
  });
};

export default function Home() {
  const headVideo = [
    {
      title: 'Find Businesses Quickly',
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
      title: 'Find Businesses Quickly',
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
      title: 'Find Businesses Quickly',
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
      title: 'Find Businesses Quickly',
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

      const mainTag = document.querySelector('main');

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

      createBackgroundScrollTrigger(
        '#feature-video-section',
        'top 10%',
        'top 10%',
        () => {
          if (mainTag) {
            mainTag.style.backgroundColor = '#f3f3e9';
          }
        },
        () => {
          if (mainTag) {
            mainTag.style.backgroundColor = '#f3f3e9';
          }
        },
        () => {
          if (mainTag) {
            mainTag.style.backgroundColor = '';
          }
        },
        () => {
          if (mainTag) {
            mainTag.style.backgroundColor = '#f3f3e9';
          }
        }
      );

      createBackgroundScrollTrigger(
        '#about-section',
        'top top',
        'bottom top',
        () => {
          if (mainTag) {
            mainTag.style.backgroundColor = '';
          }
        },
        () => {},
        () => {
          if (mainTag) {
            mainTag.style.backgroundColor = '#f3f3e9';
          }
        }
      );

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        scrollbar.destroy();
      };
    }
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
      {/* Main container with smooth-scrollbar */}
      <main className="relative min-h-screen leading-relaxed font-medium h-full max-h-screen transition-colors duration-500 ease-in-out" id="smooth-scrollbar">
        <header className="relative w-full h-screen overflow-hidden">
          <Header />
        </header>
        <section id="problems-section">
          <Problems />
        </section>
        {/* <section id="hero-section">
          <Hero />
        </section>
        <section id="feature-video-section">
          <FeatureVideoResponsive />
        </section> */}
        {/* <section id="testimonials-section">
          <TestimonialsLarge />
        </section> */}
        <div className="grid">
          <section id="work-section">
            <WorkWithVideos headVideo={headVideo} />
          </section>
          <section id="about-section">
            <About />
          </section>
          <section id="footer-section">
            <Footer />
          </section>
        </div>
      </main>
    </>
  );
}
