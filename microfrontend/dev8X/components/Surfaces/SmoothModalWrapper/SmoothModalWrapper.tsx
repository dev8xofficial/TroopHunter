import React, { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import Lenis from 'lenis';
import { openSmoothModalAtom, ModalType } from '../../../store/smoothModalAtom';
import { createPortal } from 'react-dom';
import SmoothModal from '@repo/components/src/Surfaces/SmoothModal/SmoothModal';
import { useLenis } from '../../../hooks/LenisContext';

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

    return () => {
      document.body.classList.remove('overflow-hidden');
      modalLenis.destroy();
      lenis.start();
    };
  }, [isVisible]);

  if (!isMounted || !isVisible) return null;

  return createPortal(
    <SmoothModal toggle={toggle} modalRef={modalRef} modalInnerRef={modalInnerRef}>
      {children}
    </SmoothModal>,
    document.getElementById('smooth-modal')!
  );
};

export default SmoothModalWrapper;
