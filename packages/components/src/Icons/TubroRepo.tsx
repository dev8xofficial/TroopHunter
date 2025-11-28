'use client';

import React from 'react';

interface TubroRepoIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const TubroRepoIcon: React.FC<TubroRepoIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_667_112)">
        <path
          d="M34.9726 12.2375C22.4315 12.2375 12.2281 22.4487 12.2281 35C12.2281 47.5513 22.4315 57.7625 34.9726 57.7625C47.514 57.7625 57.7173 47.5513 57.7173 35C57.7173 22.4487 47.514 12.2375 34.9726 12.2375ZM34.9726 46.7795C28.4713 46.7795 23.2021 41.5065 23.2021 35C23.2021 28.4935 28.471 23.2205 34.9726 23.2205C41.4741 23.2205 46.7431 28.4935 46.7431 35C46.7431 41.5065 41.4741 46.7795 34.9726 46.7795ZM36.8783 8.49887V0C55.3368 0.987583 70 16.2814 70 35C70 53.7186 55.3368 69.0083 36.8783 70V61.5011C50.6354 60.5176 61.5288 49.0137 61.5288 35C61.5288 20.9863 50.6351 9.48208 36.8783 8.49887ZM14.9129 52.3792C11.2665 48.1658 8.91567 42.7995 8.49625 36.9075H0C0.440417 45.1518 3.73567 52.6333 8.89875 58.394L14.9088 52.3792H14.9129ZM33.0668 70V61.5011C27.1752 61.0814 21.8132 58.7332 17.603 55.0792L11.5929 61.0942C17.3533 66.2655 24.8287 69.559 33.0625 70H33.0668Z"
          fill="currentcolor"
        />
      </g>
      <defs>
        <clipPath id="clip0_667_112">
          <rect width="70" height="70" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default TubroRepoIcon;
