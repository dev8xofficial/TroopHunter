import { useEffect } from 'react';
import Head from 'next/head';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Scrollbar from 'smooth-scrollbar';
import Hero from './Home/Hero/Hero';
import Header from '../components/Surfaces/Header/Header';
import FeatureVideoResponsive from './Home/FeatureVideo/FeatureVideoResponsive';
import TestimonialsLarge from './Home/Testimonials/TestimonialsLarge';
import WorkWithVideos from './Home/Work/WorkWithVideos';
import About from './Home/About/About';
import Footer from './Home/Footer/Footer';

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
        <title>TroopHunter - Find your next client!</title>
        <meta name="description" content="TroopHunter simplifies finding and connecting with businesses around the world."></meta>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_TROOPHUNTER_URL}`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content="TroopHunter - Find your next client!"></meta>
        <meta property="og:description" content="TroopHunter simplifies finding and connecting with businesses around the world."></meta>
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_TROOPHUNTER_URL}`}></meta>
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_TROOPHUNTER_URL}/logo-social.png`}></meta>
        <meta property="og:image:secure_url" content={`${process.env.NEXT_PUBLIC_TROOPHUNTER_URL}/logo-social.png`}></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:site_name" content="TroopHunter"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content="TroopHunter - Find your next client!"></meta>
        <meta name="twitter:description" content="TroopHunter simplifies finding and connecting with businesses around the world."></meta>
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_TROOPHUNTER_URL}/logo-social.png`}></meta>
        <meta name="twitter:site" content="@TroopHunter"></meta>
      </Head>
      {/* Main container with smooth-scrollbar */}
      <main className="relative min-h-screen leading-relaxed font-medium h-full max-h-screen transition-colors duration-500 ease-in-out" id="smooth-scrollbar">
        <Header />
        <section id="hero-section">
          <Hero />
        </section>
        <section id="feature-video-section">
          <FeatureVideoResponsive />
        </section>
        <section id="testimonials-section">
          <TestimonialsLarge />
        </section>
        <div className="grid">
          <section id="work-section">
            <WorkWithVideos />
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
