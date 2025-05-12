import React, { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import Lenis from 'lenis';
import { isSmoothModalOpenAtom } from '../../../store/smoothModalAtom';
import { createPortal } from 'react-dom';
import SmoothModal from '@repo/components/src/Surfaces/SmoothModal/SmoothModal';
import { useLenis } from '../../../hooks/LenisContext';

type SmoothModalWrapperProps = {
  toggle: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

const SmoothModalWrapper: React.FC<SmoothModalWrapperProps> = ({ toggle, children }): JSX.Element => {
  const [isMounted, setIsMounted] = useState(false);
  const [show] = useAtom(isSmoothModalOpenAtom);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalInnerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    console.log('Show: ', show);
    if (show) {
      document.body.classList.toggle('overflow-hidden');
      lenis.stop();
    }

    if (!show) return;

    const modalLenis = new Lenis({
      autoRaf: true,
      wrapper: modalRef?.current,
      content: modalInnerRef?.current
    });

    return () => {
      document.body.classList.toggle('overflow-hidden');
      modalLenis?.destroy();
      lenis.start();
    };
  }, [show]);

  if (!isMounted || !show) return null;

  return createPortal(
    <>
      <SmoothModal toggle={toggle} modalRef={modalRef} modalInnerRef={modalInnerRef}>
        {children}
      </SmoothModal>
    </>,
    document.getElementById('smooth-modal')!
  );
};

export default SmoothModalWrapper;
