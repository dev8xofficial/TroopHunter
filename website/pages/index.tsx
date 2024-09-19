import { useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Surfaces/Header/Header';
import Hero from './Home/Hero/Hero';
import FeatureVideo from './Home/FeatureVideo/FeatureVideo';
import Testimonials from './Home/Testimonials/Testimonials';
import Work from './Home/Work/Work';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Scrollbar from 'smooth-scrollbar';
import About from './Home/About/About';
import Footer from './Home/Footer/Footer';

type ScrollTriggerCallback = () => void;

const createBackgroundScrollTrigger = (
  sectionId: string, // ID or class selector of the section
  startTrigger: string, // Scroll start point (e.g., 'top 50%')
  endTrigger: string, // Scroll end point (e.g., 'bottom 50%')
  onEnter: ScrollTriggerCallback = () => {}, // Callback when entering the section
  onLeave: ScrollTriggerCallback = () => {}, // Callback when leaving the section
  onLeaveBack: ScrollTriggerCallback = () => {}, // Callback when scrolling back and leaving
  onEnterBack: ScrollTriggerCallback = () => {} // Callback when scrolling back and entering
) => {
  ScrollTrigger.create({
    trigger: sectionId,
    scroller: '#smooth-scrollbar',
    start: startTrigger, // When the section enters the center of the viewport
    end: endTrigger, // When the next section reaches the center of the viewport
    onEnter: () => {
      onEnter(); // Custom enter callback
    },
    onLeave: () => {
      onLeave(); // Custom leave callback
    },
    onLeaveBack: () => {
      onLeaveBack(); // Custom leave back callback
    },
    onEnterBack: () => {
      onEnterBack(); // Custom enter back callback
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

      // Set up scroller proxy for smooth-scrollbar
      ScrollTrigger.scrollerProxy('#smooth-scrollbar', {
        scrollTop(value) {
          if (arguments.length) {
            scrollbar.scrollTop = value;
          }
          return scrollbar.scrollTop;
        }
      });

      // Update ScrollTrigger on scrollbar update
      scrollbar.addListener(ScrollTrigger.update);

      // Animate sections on scroll
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

      // Change background color of the main tag when Testimonials enter viewport
      const mainTag = document.querySelector('main');
      // Background change animation when feature-video is at the center of the viewport
      createBackgroundScrollTrigger(
        '#feature-video', // sectionId
        'top 10%', // startTrigger (at the center of the viewport)
        'top 10%', // endTrigger (when the work section reaches the center)
        () => {
          if (mainTag) {
            mainTag.style.backgroundColor = '#B488F1'; // Change background color on enter
          }
        },
        () => {
          if (mainTag) {
            mainTag.style.backgroundColor = '#B488F1'; // Reset background color on leave
          }
        },
        () => {
          if (mainTag) {
            mainTag.style.backgroundColor = ''; // Reset background color when leaving back
          }
        },
        () => {
          if (mainTag) {
            mainTag.style.backgroundColor = '#B488F1'; // Change background back on enter back
          }
        }
      );

      // Reset background when work section is at the center of the viewport
      createBackgroundScrollTrigger(
        '#work-section', // sectionId
        'top 50%', // startTrigger (work section reaches the center)
        'bottom top', // endTrigger
        () => {
          if (mainTag) {
            mainTag.style.backgroundColor = ''; // Reset background on work section enter
          }
        },
        () => {},
        () => {
          if (mainTag) {
            mainTag.style.backgroundColor = '#B488F1'; // Revert background when scrolling back to feature-video
          }
        }
      );

      // Cleanup
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        scrollbar.destroy();
      };
    }
  }, []);

  return (
    <>
      <Head>
        <link rel="preload" href="/fonts/light.otf" as="font" crossOrigin="" type="font/otf"></link>
        <link rel="preload" href="/fonts/light-italic.otf" as="font" crossOrigin="" type="font/otf"></link>
        <link rel="preload" href="/fonts/regular.otf" as="font" crossOrigin="" type="font/otf"></link>
        <link rel="preload" href="/fonts/bold.otf" as="font" crossOrigin="" type="font/otf"></link>
        <link rel="preload" href="/fonts/italic.otf" as="font" crossOrigin="" type="font/otf"></link>
        <link rel="preload" href="/fonts/medium.otf" as="font" crossOrigin="" type="font/otf"></link>
        <link rel="preload" href="/fonts/medium-italic.otf" as="font" crossOrigin="" type="font/otf"></link>
        <link rel="preload" href="/fonts/bold.otf" as="font" crossOrigin="" type="font/otf"></link>
        <link rel="preload" href="/fonts/bold-italic.otf" as="font" crossOrigin="" type="font/otf"></link>
        <title>TroopHunter - Find your next client!</title>
        <link rel="canonical" href="https://www.troophunter.com/" />
      </Head>
      {/* Main container with smooth-scrollbar */}
      <main className="relative min-h-screen leading-relaxed font-medium h-full max-h-screen transition-colors duration-500 ease-in-out" id="smooth-scrollbar">
        <Header />
        <section>
          <Hero />
        </section>
        <section id="feature-video">
          <FeatureVideo />
        </section>
        <section id="testimonials-section">
          <Testimonials />
        </section>
        <div className="grid">
          <section id="work-section">
            <Work />
          </section>
          <section>
            <About />
          </section>
          <section>
            <Footer />
          </section>
        </div>
      </main>
    </>
  );
}
