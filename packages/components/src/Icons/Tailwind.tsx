'use client';

import React from 'react';

interface TailwindIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const TailwindIcon: React.FC<TailwindIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g clip-path="url(#clip0_654_110)">
        <path
          d="M35.0029 14C25.6696 14 19.8363 18.6667 17.5029 28C21.0029 23.3333 25.0863 21.5833 29.7529 22.75C32.4158 23.415 34.3175 25.3458 36.4263 27.4867C39.8592 30.9692 43.8288 35 52.5029 35C61.8363 35 67.6696 30.3333 70.0029 21C66.5029 25.6667 62.4196 27.4167 57.7529 26.25C55.09 25.585 53.1884 23.6542 51.0796 21.5133C47.6496 18.0308 43.68 14 35.0029 14ZM17.5029 35C8.1696 35 2.33626 39.6667 0.00292969 49C3.50293 44.3333 7.58626 42.5833 12.2529 43.75C14.9158 44.415 16.8175 46.3458 18.9263 48.4867C22.3592 51.9692 26.3288 56 35.0029 56C44.3363 56 50.1696 51.3333 52.5029 42C49.0029 46.6667 44.9196 48.4167 40.2529 47.25C37.59 46.585 35.6883 44.6542 33.5796 42.5133C30.1496 39.0308 26.18 35 17.5029 35Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_654_110">
          <rect width="70" height="70" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default TailwindIcon;
