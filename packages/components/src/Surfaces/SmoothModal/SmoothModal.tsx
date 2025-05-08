import React from 'react';
import { ContactFormModal, ModalCloseButton, ProjectsFormModal } from '@repo/components';

import ContactFormModalStyles from '../ContactFormModal/index.module.css';
import styles from './index.module.css';

type SmoothModalProps = {
  toggle: React.MouseEventHandler<HTMLButtonElement>;
};

const SmoothModal: React.FC<SmoothModalProps> = ({ toggle }): JSX.Element => {
  return (
    <>
      <div className={styles['modal-wrapper']}>
        <div className={styles['modal-backdrop']} style={{ opacity: 0.5, pointerEvents: 'all' }}></div>
        <div tabIndex={0}></div>
        <div className={styles['modal-tab-trap-start']} tabIndex={-1}></div>
        <div className={`lenis lenis-smooth ${styles['modal']}`} style={{ opacity: 1 }}>
          <div className="lenis-content">
            <div className={styles['modal-inner']} style={{ transform: 'none' }}>
              <div className={`${styles['modal-inner__bg']} ${ContactFormModalStyles['modal-bg']}`} style={{ borderTopLeftRadius: '50px', borderTopRightRadius: '50px', left: '0px', right: '0px' }}></div>
              <ModalCloseButton onClick={toggle} />
              <main className={styles['modal-content']}>
                <ContactFormModal />
                {/* <ProjectsFormModal /> */}
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmoothModal;
