'use client';

import React from 'react';

interface DartIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const DartIcon: React.FC<DartIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_644_150)">
        <path
          d="M11.9729 11.9729C11.9729 11.9729 26.7108 4.60832 34.0783 0.921654C35.4193 0.260626 36.904 -0.0551725 38.3979 0.00290375C40.6321 0.139987 43.2892 2.30124 43.2892 2.30124L70 29.015V57.5662H57.5662V70H28.5512L2.30125 43.75C0.88375 42.2916 0 40.2354 0 38.2229C0 37.2925 0.525 35.8371 0.921667 35L11.9729 11.9729ZM13.9533 13.9533V48.3321C13.9592 49.9158 14.0146 51.3187 15.4058 52.7304L29.7617 67.0833H54.6496V54.6496L13.9533 13.9533ZM49.1138 11.9758C46.4917 9.36248 43.8375 6.78415 41.1221 4.26707C40.2413 3.48832 39.4683 2.90207 38.0013 2.91957C36.9221 2.9604 35.4638 3.48832 35.4638 3.48832L18.4946 11.9729L49.1138 11.9758Z"
          fill="currentcolor"
        />
      </g>
      <defs>
        <clipPath id="clip0_644_150">
          <rect width="70" height="70" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DartIcon;
