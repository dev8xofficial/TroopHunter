'use client';

import React, { CSSProperties, useEffect } from 'react';
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

const SmoothModal: React.FC<SmoothModalProps> = ({ toggle, children, modalRef, modalInnerRef, modalBGClassName = '' }): JSX.Element => {
  useEffect(() => {
    const el = modalInnerRef.current;
    if (!el) return;

    const tl = gsap.timeline();

    tl.set(el, { y: '50%', opacity: 0.8, scale: 1 })
      // 🌊 Smooth acceleration up to mid-point
      .to(el, {
        y: '30%',
        opacity: 1,
        duration: 0.65,
        ease: 'cubic-bezier(0.35, 0.25, 0.75, 0.9)' // balanced & fluid
      })
      // 🧈 Continue seamlessly — no stop, no bump
      .to(
        el,
        {
          y: '0%',
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'cubic-bezier(0.8, 0, 0.2, 1)' // smooth accel → gentle stop
        },
        '-=0.22'
      ); // increased overlap for perfect flow
  }, [modalInnerRef]);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = modalInnerRef.current;
    if (!el) return;

    // ✅ Disable scrolling immediately
    // if (modalRef.current) {
    //   modalRef.current.style.overflow = 'hidden'; // hide scrollbar
    // }

    const tl = gsap.timeline({
      onComplete: () => toggle(e)
    });

    tl.to(el, {
      y: '75%',
      opacity: 1,
      duration: 0.5,
      ease: 'cubic-bezier(0.7, 0.05, 0.25, 1)'
    });
  };

  return (
    <div className={styles['modal-wrapper']}>
      <div className={styles['modal-backdrop']} style={{ opacity: 0.5, pointerEvents: 'all' }}></div>
      <div tabIndex={0}></div>
      <div className={styles['modal-tab-trap-start']} tabIndex={-1}></div>
      <div id="modal" className={`lenis lenis-smooth ${styles['modal']}`} style={{ opacity: 1 }} ref={modalRef}>
        <div className="lenis-content" ref={modalInnerRef}>
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
