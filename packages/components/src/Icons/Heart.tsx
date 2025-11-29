'use client';

import React from 'react';

interface HeartIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const HeartIcon: React.FC<HeartIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_642_104)">
        <path
          d="M51.0421 5.59125C47.7578 5.64233 44.5451 6.55915 41.7285 8.24912C38.9119 9.93909 36.5911 12.3424 35.0004 15.2162C33.4098 12.3424 31.089 9.93909 28.2724 8.24912C25.4558 6.55915 22.2431 5.64233 18.9588 5.59125C13.7232 5.81872 8.79042 8.10907 5.23815 11.9619C1.68587 15.8148 -0.197158 20.9169 0.000448009 26.1537C0.000448009 39.4158 13.9596 53.9 25.6671 63.7204C28.2811 65.917 31.5861 67.1213 35.0004 67.1213C38.4148 67.1213 41.7198 65.917 44.3338 63.7204C56.0413 53.9 70.0004 39.4158 70.0004 26.1537C70.1981 20.9169 68.315 15.8148 64.7627 11.9619C61.2105 8.10907 56.2777 5.81872 51.0421 5.59125Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_642_104">
          <rect width="70" height="70" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default HeartIcon;
