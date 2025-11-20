'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const LenisContext = createContext<Lenis | null>(null);

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const router = useRouter();

  // Initialize Lenis once and manage RAF lifecycle safely
  useEffect(() => {
    const instance = new Lenis({ autoRaf: true });
    setLenis(instance);

    let rafId: number;
    const loop = (time: number) => {
      instance.raf(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    if (typeof window !== 'undefined') {
      try {
        gsap.registerPlugin(ScrollTrigger);
      } catch (e) {
        // ignore if already registered
      }
    }

    instance.on('scroll', ScrollTrigger.update);

    return () => {
      cancelAnimationFrame(rafId);
      try {
        instance.off('scroll', ScrollTrigger.update);
      } catch {}
      try {
        instance.destroy();
      } catch {}
      setLenis(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effect for showreel animation
  useEffect(() => {
    const element = document.querySelector('#showreel') as HTMLElement | null;
    const showreelInner = document.querySelector('#showreel-inner') as HTMLElement | null;

    if (element) {
      // Remove existing triggers related to this section
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === element) st.kill();
      });

      gsap.to(element, {
        '--progress': 1,
        scrollTrigger: {
          trigger: element,
          start: 'top 50%',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      ScrollTrigger.matchMedia({
        '(min-width: 769px)': function () {
          if (showreelInner) {
            // Kill duplicates for showreelInner
            ScrollTrigger.getAll().forEach((st) => {
              const vars = st.vars as any;
              if (st.trigger === element && vars?.targets?.includes(showreelInner)) {
                st.kill();
              }
            });

            gsap.to(showreelInner, {
              borderRadius: '0px',
              scrollTrigger: {
                trigger: element,
                start: 'top 50%',
                end: 'bottom bottom',
                scrub: true,
              },
            });
          }
        },
      });
    }

    ScrollTrigger.refresh();

    return () => {
      try {
        ScrollTrigger.getAll().forEach((st) => {
          const trig = st.trigger as HTMLElement | null;
          if (!trig) return;
          if (trig.id === 'showreel' || (showreelInner && trig === showreelInner)) st.kill();
        });
      } catch {
        try {
          ScrollTrigger.killAll();
        } catch {}
      }
    };
  }, [router.asPath]);

  // Effect for footer animation (page scale)
  useEffect(() => {
    const target = document.querySelector('#page-content') as HTMLElement | null;
    const trigger = document.querySelector('#footer-animation') as HTMLElement | null;

    if (target && trigger) {
      // Kill any previous triggers for this footer
      ScrollTrigger.getAll().forEach((st) => {
        const vars = st.vars as any;
        if (st.trigger === trigger && vars?.targets?.includes(target)) {
          st.kill();
        }
      });

      gsap.to(target, {
        scale: 0.95,
        scrollTrigger: {
          trigger: trigger,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        },
        transformOrigin: 'center bottom',
        ease: 'none',
      });
    }

    ScrollTrigger.refresh();

    return () => {
      try {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === trigger) st.kill();
        });
      } catch {
        try {
          ScrollTrigger.killAll();
        } catch {}
      }
    };
  }, [router.asPath]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
};

export const useLenis = () => useContext(LenisContext);
