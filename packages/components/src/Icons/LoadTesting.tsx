'use client';

import React from 'react';

interface LoadTestingIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const LoadTestingIcon: React.FC<LoadTestingIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_665_148)">
        <path
          d="M58.3333 46.6667H11.6667C5.2325 46.6667 0 51.8992 0 58.3333C0 64.7675 5.2325 70 11.6667 70H58.3333C64.7675 70 70 64.7675 70 58.3333C70 51.8992 64.7675 46.6667 58.3333 46.6667ZM58.3333 64.1667H46.6667V52.5H58.3333C61.5504 52.5 64.1667 55.1163 64.1667 58.3333C64.1667 61.5504 61.5504 64.1667 58.3333 64.1667ZM35 0C23.7417 0 14.5833 9.16125 14.5833 20.4167C14.5833 31.6721 23.7417 40.8333 35 40.8333C46.2583 40.8333 55.4167 31.6721 55.4167 20.4167C55.4167 9.16125 46.2583 0 35 0ZM42.2917 27.7083C41.7229 28.2771 40.9763 28.5629 40.2296 28.5629C39.4829 28.5629 38.7363 28.2771 38.1675 27.7083L32.9379 22.4788C32.3896 21.9304 32.0833 21.1925 32.0833 20.4167V11.6667C32.0833 10.0538 33.39 8.75 35 8.75C36.61 8.75 37.9167 10.0538 37.9167 11.6667V19.2092L42.2917 23.5842C43.4321 24.7246 43.4321 26.5679 42.2917 27.7083Z"
          fill="currentcolor"
        />
      </g>
      <defs>
        <clipPath id="clip0_665_148">
          <rect width="70" height="70" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LoadTestingIcon;
