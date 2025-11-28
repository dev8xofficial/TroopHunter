'use client';

import React from 'react';

interface RestApiIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const RestApiIcon: React.FC<RestApiIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_644_155)">
        <path
          d="M56 45.5C51.45 45.5 47.6 48.3 46.2 52.5H31.5C31.5 50.05 30.8 47.95 29.75 46.2L54.6 20.65C55.65 20.65 56.7 21 57.75 21C62.65 21 66.5 17.15 66.5 12.25C66.5 7.35 62.65 3.5 57.75 3.5C52.85 3.5 49 7.35 49 12.25C49 13.3 49.35 14.7 49.7 15.75L25.2 40.95C23.1 39.2 20.3 38.5 17.5 38.5V23.8C21.7 22.4 24.5 18.55 24.5 14C24.5 8.05 19.95 3.5 14 3.5C8.05 3.5 3.5 8.05 3.5 14C3.5 18.55 6.3 22.4 10.5 23.8V40.25C6.3 42.7 3.5 47.25 3.5 52.15C3.5 59.85 9.8 66.15 17.5 66.15C22.75 66.15 27.3 63.35 29.4 59.15H45.85C47.25 63 51.1 66.15 55.65 66.15C61.25 66.15 66.15 61.6 66.15 55.65C66.5 50.05 61.6 45.5 56 45.5Z"
          fill="currentcolor"
        />
      </g>
      <defs>
        <clipPath id="clip0_644_155">
          <rect width="70" height="70" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default RestApiIcon;
