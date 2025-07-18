import React, { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import Lenis from 'lenis';
import { openSmoothModalAtom, ModalType } from '../../../store/smoothModalAtom';
import { createPortal } from 'react-dom';
import SmoothModal from '@repo/components/src/Surfaces/SmoothModal/SmoothModal';
import { useLenis } from '../../../hooks/LenisContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import ContactFormModalStyles from '../ContactFormModal/index.module.css';

type SmoothModalWrapperProps = {
  modalType: ModalType;
  toggle: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

const SmoothModalWrapper: React.FC<SmoothModalWrapperProps> = ({ modalType, toggle, children }): JSX.Element | null => {
  const [isMounted, setIsMounted] = useState(false);
  const [currentModal] = useAtom(openSmoothModalAtom);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalInnerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const isVisible = currentModal === modalType;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    document.body.classList.add('overflow-hidden');
    lenis.stop();

    const modalLenis = new Lenis({
      autoRaf: true,
      wrapper: modalRef.current!,
      content: modalInnerRef.current!
    });

    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    modalLenis.on('scroll', ScrollTrigger.update);

    return () => {
      document.body.classList.remove('overflow-hidden');
      modalLenis.destroy();
      lenis.start();
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    const element = document.querySelector('#modal-inner') as HTMLElement;
    const modalInnerBg = document.querySelector('#modal-inner-bg') as HTMLElement;
    const modal = document.querySelector('#modal') as HTMLElement;

    if (element) {
      gsap.to(element, {
        '--progress': 1,
        scrollTrigger: {
          trigger: element,
          start: 'top 20%',
          end: 'top top',
          scrub: true,
          scroller: modalRef.current // <-- Add this!
        }
      });

      gsap.to(modalInnerBg, {
        borderRadius: '0px',
        scrollTrigger: {
          trigger: element,
          start: 'top 20%',
          end: 'top top',
          scrub: true,
          scroller: modalRef.current // <-- Add this!
        }
      });

      gsap.to(modal, {
        padding: '0px',
        scrollTrigger: {
          trigger: element,
          start: 'top 20%',
          end: 'top top',
          scrub: true,
          scroller: modalRef.current // <-- Add this!
        }
      });
    }

    return () => {
      ScrollTrigger.killAll();
    };
  }, [isVisible]);

  if (!isMounted || !isVisible) return null;

  return createPortal(
    <SmoothModal toggle={toggle} modalRef={modalRef} modalBGClassName={modalType === 'contact' ? ContactFormModalStyles['modal-bg'] : ''} modalInnerRef={modalInnerRef}>
      {children}
    </SmoothModal>,
    document.getElementById('smooth-modal')!
  );
};

export default SmoothModalWrapper;
