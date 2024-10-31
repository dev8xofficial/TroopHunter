'use client';

import React, { useEffect } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Scrollbar from 'smooth-scrollbar';

import About from './Home/About/About';
import FeatureVideoResponsive from './Home/FeatureVideo/FeatureVideoResponsive';
import Footer from './Home/Footer/Footer';
import Hero from './Home/Hero/Hero';
import TestimonialsLarge from './Home/Testimonials/TestimonialsLarge';
import WorkWithVideos from './Home/Work/WorkWithVideos';
import Header from '../components/Navigation/Header/Header';

import './page.css';

type ScrollTriggerCallback = () => void;

const createBackgroundScrollTrigger = (sectionId: string, startTrigger: string, endTrigger: string, onEnter?: ScrollTriggerCallback, onLeave?: ScrollTriggerCallback, onLeaveBack?: ScrollTriggerCallback, onEnterBack?: ScrollTriggerCallback): void => {
  ScrollTrigger.create({
    trigger: sectionId,
    scroller: '#smooth-scrollbar',
    start: startTrigger,
    end: endTrigger,
    onEnter:
      onEnter != null
        ? () => {
            onEnter();
          }
        : undefined,
    onLeave:
      onLeave != null
        ? () => {
            onLeave();
          }
        : undefined,
    onLeaveBack:
      onLeaveBack != null
        ? () => {
            onLeaveBack();
          }
        : undefined,
    onEnterBack:
      onEnterBack != null
        ? () => {
            onEnterBack();
          }
        : undefined
  });
};

const Home: React.FC = (): JSX.Element => {
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

      createBackgroundScrollTrigger(
        '#feature-video-section',
        'top 10%',
        'top 10%',
        () => {
          if (mainTag != null) {
            mainTag.style.backgroundColor = '#f3f3e9';
          }
        },
        () => {
          if (mainTag != null) {
            mainTag.style.backgroundColor = '#f3f3e9';
          }
        },
        () => {
          if (mainTag != null) {
            mainTag.style.backgroundColor = '';
          }
        },
        () => {
          if (mainTag != null) {
            mainTag.style.backgroundColor = '#f3f3e9';
          }
        }
      );

      createBackgroundScrollTrigger(
        '#about-section',
        'top top',
        'bottom top',
        () => {
          if (mainTag != null) {
            mainTag.style.backgroundColor = '';
          }
        },
        () => {},
        () => {
          if (mainTag != null) {
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
      {/* Main container with smooth-scrollbar */}
      <main className="relative h-full max-h-screen min-h-screen font-medium leading-relaxed transition-colors duration-500 ease-in-out dark:bg-white" id="smooth-scrollbar">
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
};

export default Home;
