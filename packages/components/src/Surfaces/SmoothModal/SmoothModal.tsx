import React, { CSSProperties, useEffect } from 'react';
import { ModalCloseButton } from '@repo/components';

import styles from './index.module.css';

type SmoothModalProps = {
  toggle: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  modalRef: React.Ref<HTMLDivElement>;
  modalInnerRef: React.Ref<HTMLDivElement>;
  modalBGClassName?: string;
};

const SmoothModal: React.FC<SmoothModalProps> = ({ toggle, children, modalRef, modalInnerRef, modalBGClassName = '' }): JSX.Element => {
  return (
    <>
      <div className={styles['modal-wrapper']}>
        <div className={styles['modal-backdrop']} style={{ opacity: 0.5, pointerEvents: 'all' }}></div>
        <div tabIndex={0}></div>
        <div className={styles['modal-tab-trap-start']} tabIndex={-1}></div>
        <div id="modal" className={`lenis lenis-smooth ${styles['modal']}`} style={{ opacity: 1 }} ref={modalRef}>
          <div className="lenis-content" ref={modalInnerRef}>
            <div id="modal-inner" className={styles['modal-inner']} style={{ '--progress': 0, transform: 'none' } as CSSProperties}>
              <div id="modal-inner-bg" className={`${styles['modal-inner__bg']} ${modalBGClassName}`} style={{ borderTopLeftRadius: '50px', borderTopRightRadius: '50px', left: '0px', right: '0px' }}></div>
              <ModalCloseButton onClick={toggle} />
              <main id="modal-content" className={styles['modal-content']}>
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmoothModal;
