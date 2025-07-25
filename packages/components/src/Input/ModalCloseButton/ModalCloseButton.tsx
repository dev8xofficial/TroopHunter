import React from 'react';

import SmoothModalStyles from '../../Modals/SmoothModal/index.module.css';
import styles from './index.module.css';

type ModalCloseButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({ onClick }): JSX.Element => {
  return (
    <>
      <button
        className={`${styles['modal-close-button']} ${SmoothModalStyles['modal-close']}`}
        aria-label="Close Dialog"
        data-faitracker-form-bind="true"
        style={{
          transform: 'translateX(0px) translateY(0px) translateZ(0px)'
        }}
        onClick={onClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18" className={styles['modal-close-button_svg']}>
          <path stroke="currentColor" strokeLinecap="square" strokeLinejoin="round" strokeWidth="2" d="M2.332 15.667 15.665 2.333m0 13.334L2.332 2.333" vectorEffect="non-scaling-stroke"></path>
        </svg>
      </button>
    </>
  );
};
