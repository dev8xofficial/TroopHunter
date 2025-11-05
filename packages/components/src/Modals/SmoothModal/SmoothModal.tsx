'use client';

import React, { CSSProperties, useEffect, useRef } from 'react';
import { ModalCloseButton } from '@repo/components';
import { gsap } from 'gsap';

import styles from './index.module.css';

type SmoothModalProps = {
  toggle: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  modalRef: React.RefObject<HTMLDivElement>;
  modalInnerRef: React.RefObject<HTMLDivElement>;
  modalBGClassName?: string;
};

const SmoothModal: React.FC<SmoothModalProps> = ({ toggle, children, modalRef, modalInnerRef, modalBGClassName = '' }) => {
  const modalBackdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = modalInnerRef.current;
    const backdrop = modalBackdropRef.current;
    if (!el || !backdrop) return;

    const tl = gsap.timeline();

    // 🏁 Initial states
    tl.set(backdrop, { opacity: 0 });
    tl.set(el, { y: '60%', opacity: 0.8, scale: 1 });

    // 🌫️ Backdrop fade-in
    tl.to(
      backdrop,
      {
        opacity: 0.55,
        duration: 0.5,
        ease: 'power2.out'
      },
      0
    );

    // 🌊 Smooth modal motion (your style)
    tl.to(
      el,
      {
        y: '30%',
        opacity: 1,
        duration: 0.7,
        ease: 'cubic-bezier(0.55, 0.1, 0.9, 1)'
      },
      0
    );

    // 🌊 Gentle final landing — soft deceleration
    tl.to(
      el,
      {
        y: '0%',
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: 'cubic-bezier(0.85, 0.05, 0.2, 1)'
      },
      '-=0.2'
    );
  }, [modalInnerRef]);


  const handleClose = (e: React.MouseEvent<HTMLButtonElement> | MouseEvent) => {
    const el = modalInnerRef.current;
    const backdrop = modalBackdropRef.current;
    if (!el || !backdrop) return;

 
    gsap.set(el, { willChange: 'transform' });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(el, { clearProps: 'willChange' });
        toggle(e as any);
      }
    });

    tl.to(el, {
      scrollTop: 0,
      duration: 0,
      ease: 'power2.out'
    });

    tl.to(el, {
      y: '100%',
      duration: 0.9,
      ease: 'power3.inOut'
    });

   
    tl.to(
      backdrop,
      {
        opacity: 0,
        duration: 0.6,
        ease: 'power4.inOut'
      },
      '-=0.4'
    );
  };


  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose(e.nativeEvent);
  };

  return (
    <div className={styles['modal-wrapper']}>
      <div className={styles['modal-backdrop']} ref={modalBackdropRef} onClick={handleBackdropClick}></div>

      {/* Modal body */}
      <div tabIndex={0}></div>
      <div className={styles['modal-tab-trap-start']} tabIndex={-1}></div>

      <div id="modal" className={`lenis lenis-smooth ${styles['modal']}`} style={{ opacity: 1 }} ref={modalRef} onClick={handleBackdropClick}>
        <div className="lenis-content" ref={modalInnerRef} onClick={handleBackdropClick}>
          <div
            id="modal-inner"
            className={styles['modal-inner']}
            style={
              {
                '--progress': 0,
                transform: 'none'
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
                right: '0px'
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
