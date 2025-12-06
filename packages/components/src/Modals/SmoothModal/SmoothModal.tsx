'use client';

import React, { CSSProperties, useLayoutEffect, useRef } from 'react';
import { ModalCloseButton } from '@repo/components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import styles from './index.module.css';

gsap.registerPlugin(ScrollTrigger);

type SmoothModalProps = {
  toggle: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  modalRef: React.RefObject<HTMLDivElement>;
  modalInnerRef: React.RefObject<HTMLDivElement>;
  modalBGClassName?: string;
};

const SmoothModal: React.FC<SmoothModalProps> = ({ toggle, children, modalRef, modalInnerRef, modalBGClassName = '' }) => {
  const modalBackdropRef = useRef<HTMLDivElement>(null);

  // -------------------------
  // INIT SCROLLTRIGGER AFTER OPEN ANIMATION
  // -------------------------
  const initScrollTriggers = () => {
    const element = document.querySelector('#modal-inner') as HTMLElement;
    const modalInnerBg = document.querySelector('#modal-inner-bg') as HTMLElement;
    const modal = document.querySelector('#modal') as HTMLElement;

    if (!element || !modalInnerBg || !modal || !modalRef.current) return;

    // Kill old triggers if any
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

  // -------------------------
  // OPEN MODAL ANIMATION
  // -------------------------
  useLayoutEffect(() => {
    const el = modalInnerRef.current;
    const backdrop = modalBackdropRef.current;
    if (!el || !backdrop) return;

    const tl = gsap.timeline({
      onComplete: () => {
        // Delay ScrollTrigger initialization to next frame
        requestAnimationFrame(() => initScrollTriggers());
      },
    });

    tl.set(backdrop, { opacity: 0 });
    tl.set(el, { y: '60%', opacity: 0.8, scale: 1 });

    tl.to(backdrop, { opacity: 0.55, duration: 0.5, ease: 'power2.out' }, 0);
    tl.to(el, { y: '30%', opacity: 1, duration: 0.7, ease: 'cubic-bezier(0.55,0.1,0.9,1)' }, 0);
    tl.to(el, { y: '0%', opacity: 1, scale: 1, duration: 0.45, ease: 'cubic-bezier(0.85,0.05,0.2,1)' }, '-=0.2');
  }, [modalInnerRef]);

  // -------------------------
  // CLOSE MODAL
  // -------------------------
  const handleClose = (e: React.MouseEvent<HTMLButtonElement> | MouseEvent) => {
    const el = modalInnerRef.current;
    const backdrop = modalBackdropRef.current;
    if (!el || !backdrop) return;

    // Kill scroll triggers immediately on close
    ScrollTrigger.getAll().forEach(t => t.kill());

    gsap.set(el, { willChange: 'transform' });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(el, { clearProps: 'willChange' });
        toggle(e as any);
      },
    });

    tl.to(el, { scrollTop: 0, duration: 0 });
    tl.to(el, { y: '100%', duration: 0.9, ease: 'power3.inOut' });
    tl.to(backdrop, { opacity: 0, duration: 0.6, ease: 'power4.inOut' }, '-=0.4');
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose(e.nativeEvent);
  };

  return (
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
  );
};

export default SmoothModal;
