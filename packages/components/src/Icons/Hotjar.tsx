'use client';

import React from 'react';

interface HotjarIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const HotjarIcon: React.FC<HotjarIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 62 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M57.4108 22.7908C47.0799 4.095 16.7612 0 16.7612 0C16.7612 0 30.7553 15.575 12.8703 27.9038C1.56825 35.6796 -2.90884 45.7829 1.93283 56.8196C5.637 65.275 13.4828 68.7079 21.9441 70C19.7712 65.8175 19.2257 59.7771 20.8328 53.585C20.9932 52.9667 21.1712 52.3192 21.3753 51.7329C23.7466 55.4021 27.6374 57.4088 31.4349 56.4813C36.6353 55.2446 39.6862 48.9533 38.2657 42.4871C37.942 41.0842 37.4141 39.7367 36.7024 38.4854C36.9066 38.535 37.1107 38.5525 37.3207 38.6225C43.8103 40.4746 46.9487 50.1783 44.3295 60.3079C43.5537 63.3763 42.2441 66.2842 40.462 68.8975C51.6037 65.31 59.0149 56.3238 61.0537 48.3175C63.2033 39.9846 61.5728 30.275 57.4108 22.7908Z"
        fill="currentcolor"
      />
    </svg>
  );
};

export default HotjarIcon;
