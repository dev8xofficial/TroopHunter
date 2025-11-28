'use client';

import React from 'react';

interface IntegrationsIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const IntegrationsIcon: React.FC<IntegrationsIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_667_132)">
        <path
          d="M23.3333 35C13.6821 35 5.83333 27.1513 5.83333 17.5C5.83333 7.84875 13.6821 0 23.3333 0C32.9846 0 40.8333 7.84875 40.8333 17.5C40.8333 27.1513 32.9846 35 23.3333 35ZM53.9613 70C53.515 70 53.0658 69.8979 52.6575 69.6938L52.0713 69.3992C48.7492 67.7396 37.9167 61.5125 37.9167 51.1058V42.1079C37.9167 38.3308 40.3258 34.9942 43.9104 33.8013L53.0425 30.7738C53.6346 30.5783 54.285 30.5783 54.8771 30.7738L64.0062 33.8013C67.5908 34.9912 70.0029 38.3308 70.0029 42.1079V51.1058C70.0029 62.8658 59.0246 68.1917 55.6617 69.545L55.0521 69.79C54.7021 69.93 54.3317 70 53.9642 70H53.9613ZM32.0833 51.1029V45.1471C32.0833 43.5138 30.9954 42.0642 29.4175 41.6383C26.6292 40.8829 23.6338 40.635 20.5392 40.9967C8.66542 42.3879 0 52.9871 0 64.9425V67.0833C0 68.6933 1.30667 70 2.91667 70H42.2858C37.3596 66.0363 32.0833 59.7683 32.0833 51.1029Z"
          fill="currentcolor"
        />
      </g>
      <defs>
        <clipPath id="clip0_667_132">
          <rect width="70" height="70" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IntegrationsIcon;
