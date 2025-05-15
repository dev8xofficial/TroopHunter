import { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const LenisContext = createContext<Lenis | null>(null);

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true });
    setLenis(lenis);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const element = document.querySelector('#showreel') as HTMLElement;
    const showreelInner = document.querySelector('#showreel-inner') as HTMLElement;

    if (element) {
      gsap.to(element, {
        '--progress': 1,
        scrollTrigger: {
          trigger: element,
          start: 'top 50%',
          end: 'bottom bottom',
          scrub: true
        }
      });

      ScrollTrigger.matchMedia({
        '(min-width: 769px)': function () {
          gsap.to(showreelInner, {
            borderRadius: '0px',
            scrollTrigger: {
              trigger: element,
              start: 'top 50%',
              end: 'bottom bottom',
              scrub: true
            }
          });
        }
      });
    }

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  useEffect(() => {
    const target = document.querySelector('#page-content');
    const trigger = document.querySelector('#footer-animation');

    if (target && trigger) {
      gsap.to(target, {
        scale: 0.95,
        scrollTrigger: {
          trigger: trigger,
          start: 'top bottom',
          end: 'top center',
          scrub: true
        },
        transformOrigin: 'center bottom',
        ease: 'none'
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
};

export const useLenis = () => useContext(LenisContext);
