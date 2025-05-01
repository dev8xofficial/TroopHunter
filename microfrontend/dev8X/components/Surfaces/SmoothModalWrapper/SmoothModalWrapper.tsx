import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { isSmoothModalOpenAtom } from '../../../store/smoothModalAtom';
import { createPortal } from 'react-dom';
import SmoothModal from '@repo/components/src/Surfaces/SmoothModal/SmoothModal';

type SmoothModalWrapperProps = {
  toggle: React.MouseEventHandler<HTMLButtonElement>;
};

const SmoothModalWrapper: React.FC<SmoothModalWrapperProps> = ({ toggle }): JSX.Element => {
  const [isMounted, setIsMounted] = useState(false);
  const [show] = useAtom(isSmoothModalOpenAtom);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (show) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [show]);

  if (!isMounted || !show) return null;

  return createPortal(
    <>
      <SmoothModal toggle={toggle} />
    </>,
    document.getElementById('smooth-modal')!
  );
};

export default SmoothModalWrapper;
