import React, { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import Lenis from 'lenis';
import { openSmoothModalAtom, ModalType } from '../../../store/smoothModalAtom';
import { createPortal } from 'react-dom';
import SmoothModal from '@repo/components/src/Modals/SmoothModal/SmoothModal';
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

  const isVisible = currentModal.type === modalType;

  // Mounting flag
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Modal scroll + body scroll-lock
  useEffect(() => {
    if (!isVisible) return;

    // Stop global Lenis without locking body
    lenis.stop();

    // Create Lenis for modal content
    const modalLenis = new Lenis({
      autoRaf: true,
      wrapper: modalRef.current!,
      content: modalInnerRef.current!
    });
    modalLenis.on('scroll', ScrollTrigger.update);

    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    return () => {
      // Destroy modal Lenis first
      modalLenis.destroy();

      // Restart global Lenis without changing scroll
      lenis.start();
    };
  }, [isVisible]);

  // Modal ScrollTrigger animations
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
          scroller: modalRef.current
        }
      });

      gsap.to(modalInnerBg, {
        borderRadius: '0px',
        scrollTrigger: {
          trigger: element,
          start: 'top 20%',
          end: 'top top',
          scrub: true,
          scroller: modalRef.current
        }
      });

      gsap.to(modal, {
        padding: '0px',
        scrollTrigger: {
          trigger: element,
          start: 'top 20%',
          end: 'top top',
          scrub: true,
          scroller: modalRef.current
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isVisible]);

  if (!isMounted || !isVisible) return null;

  return createPortal(
    <SmoothModal toggle={toggle} modalRef={modalRef} modalInnerRef={modalInnerRef} modalBGClassName={modalType === 'contact' ? ContactFormModalStyles['modal-bg'] : ''}>
      {children}
    </SmoothModal>,
    document.getElementById('smooth-modal')!
  );
};

export default SmoothModalWrapper;
