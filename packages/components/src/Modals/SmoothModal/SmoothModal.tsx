'use client';

import React, { CSSProperties, useLayoutEffect, useRef, createContext, useContext } from 'react';
import { ModalCloseButton } from '@repo/components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import styles from './index.module.css';

gsap.registerPlugin(ScrollTrigger);

// --- 1. Context for Child-to-Parent Communication ---
type SmoothModalContextType = {
  closeWithCallback: (callback: () => void) => void;
};

export const SmoothModalContext = createContext<SmoothModalContextType>({
  closeWithCallback: () => {},
});

export const useSmoothModalContext = () => useContext(SmoothModalContext);

type SmoothModalProps = {
  toggle: React.MouseEventHandler<HTMLButtonElement> | ((e?: any) => void);
  children: React.ReactNode;
  modalRef: React.RefObject<HTMLDivElement>;
  modalInnerRef: React.RefObject<HTMLDivElement>;
  modalBGClassName?: string;
};

const SmoothModal: React.FC<SmoothModalProps> = ({ toggle, children, modalRef, modalInnerRef, modalBGClassName = '' }) => {
  const modalBackdropRef = useRef<HTMLDivElement>(null);

  // -------------------------
  // INIT SCROLLTRIGGER
  // -------------------------
  const initScrollTriggers = () => {
    const element = document.querySelector('#modal-inner') as HTMLElement;
    const modalInnerBg = document.querySelector('#modal-inner-bg') as HTMLElement;
    const modal = document.querySelector('#modal') as HTMLElement;

    if (!element || !modalInnerBg || !modal || !modalRef.current) return;

    ScrollTrigger.getAll().forEach(t => t.kill());

    gsap.to(element, {
      '--progress': 1,
      scrollTrigger: {
        trigger: element,
        start: 'top 20%',
        end: 'top top',
        scrub: true,
        scroller: modalRef.current,
      },
    });

    gsap.to(modalInnerBg, {
      borderRadius: '0px',
      scrollTrigger: {
        trigger: element,
        start: 'top 20%',
        end: 'top top',
        scrub: true,
        scroller: modalRef.current,
      },
    });

    gsap.to(modal, {
      padding: '0px',
      scrollTrigger: {
        trigger: element,
        start: 'top 20%',
        end: 'top top',
        scrub: true,
        scroller: modalRef.current,
      },
    });
  };

  // OPEN MODAL ANIMATION
  // -------------------------
  useLayoutEffect(() => {
    const el = modalInnerRef.current;
    const backdrop = modalBackdropRef.current;
    if (!el || !backdrop) return;

    // OPTIMIZATION: Prepare GPU
    gsap.set(el, { willChange: 'transform, opacity' });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(el, { clearProps: 'willChange' });
        requestAnimationFrame(() => initScrollTriggers());
      },
    });

    tl.set(backdrop, { opacity: 0 });
    
    // OPTIMIZATION: Enable force3D to prevent "paint stutter" on large monitors
    tl.set(el, { y: '60%', opacity: 0.8, scale: 1, force3D: true });

    // ORIGINAL TIMING PRESERVED (0.5, 0.7, 0.45)
    // OPTIMIZATION: Switched easing to 'expo.out' for smoother visual flow
    tl.to(backdrop, { opacity: 0.55, duration: 0.5, ease: 'power2.out' }, 0);
    
    // Step 1: Slide up to 30%
    tl.to(el, { 
      y: '30%', 
      opacity: 1, 
      duration: 0.7, 
      ease: 'expo.out', // Smoother than original bezier
      force3D: true 
    }, 0);

    // Step 2: Slide to 0% (Final Position)
    tl.to(el, { 
      y: '0%', 
      opacity: 1, 
      scale: 1, 
      duration: 0.45, 
      ease: 'expo.out', // Smoother than original bezier
      force3D: true 
    }, '-=0.2');

  }, [modalInnerRef]);

  // -------------------------
  // CLOSE LOGIC
  // -------------------------
  const performClose = (e?: any, onCompleteCallback?: () => void) => {
    const el = modalInnerRef.current;
    const backdrop = modalBackdropRef.current;
    if (!el || !backdrop) return;

    const isSequential = !!onCompleteCallback;

    // Original durations logic maintained
    const mainDuration = isSequential ? 0.35 : 0.8; // Kept the optimized close speed for responsiveness
    const backdropDuration = isSequential ? 0.2 : 0.5;
    const easeType = isSequential ? 'power3.in' : 'power3.inOut';
    const overlap = isSequential ? '-=0.1' : '-=0.4';

    ScrollTrigger.getAll().forEach(t => t.kill());
    gsap.set(el, { willChange: 'transform' });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(el, { clearProps: 'willChange' });
        
        toggle(e);

        if (onCompleteCallback) {
          onCompleteCallback();
        }
      },
    });

    tl.to(el, { scrollTop: 0, duration: 0 });
    
    tl.to(el, { 
      y: '100%', 
      duration: mainDuration, 
      ease: easeType,
      force3D: true 
    });
    
    tl.to(backdrop, { 
      opacity: 0, 
      duration: backdropDuration, 
      ease: 'power2.inOut' 
    }, overlap);
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement> | MouseEvent) => {
    performClose(e);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose(e.nativeEvent);
  };

  const closeWithCallback = (cb: () => void) => {
    performClose(undefined, cb);
  };

  return (
    <SmoothModalContext.Provider value={{ closeWithCallback }}>
      <div className={styles['modal-wrapper']}>
        <div
          className={styles['modal-backdrop']}
          ref={modalBackdropRef}
          onClick={handleBackdropClick}
        ></div>

        <div tabIndex={0}></div>
        <div className={styles['modal-tab-trap-start']} tabIndex={-1}></div>

        <div
          id="modal"
          className={`lenis lenis-smooth ${styles['modal']}`}
          style={{ opacity: 1 }}
          ref={modalRef}
          onClick={handleBackdropClick}
        >
          <div className="lenis-content" ref={modalInnerRef} onClick={handleBackdropClick}>
            <div
              id="modal-inner"
              className={styles['modal-inner']}
              style={
                {
                  '--progress': 0,
                  transform: 'none',
                } as CSSProperties
              }
            >
              <div
                id="modal-inner-bg"
                className={`${styles['modal-inner__bg']} ${modalBGClassName}`}
                style={{
                  borderTopLeftRadius: '50px',
                  borderTopRightRadius: '50px',
                  left: '0px',
                  right: '0px',
                }}
              ></div>

              <ModalCloseButton onClick={handleClose} />

              <main id="modal-content" className={styles['modal-content']}>
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>
    </SmoothModalContext.Provider>
  );
};

export default SmoothModal;