'use client';

import React from 'react';

interface ShoppingBagIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const ShoppingBagIcon: React.FC<ShoppingBagIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g clipPath="url(#clip0_638_176)">
        <path
          d="M70 26.25C70 23.9294 69.0781 21.7038 67.4372 20.0628C65.7962 18.4219 63.5706 17.5 61.25 17.5H52.5C52.5 12.8587 50.6563 8.40752 47.3744 5.12563C44.0925 1.84374 39.6413 0 35 0C30.3587 0 25.9075 1.84374 22.6256 5.12563C19.3437 8.40752 17.5 12.8587 17.5 17.5H8.75C6.42936 17.5 4.20376 18.4219 2.56282 20.0628C0.921872 21.7038 0 23.9294 0 26.25L0 55.4167C0.00463125 59.283 1.54257 62.9896 4.27647 65.7235C7.01038 68.4574 10.717 69.9954 14.5833 70H55.4167C59.283 69.9954 62.9896 68.4574 65.7235 65.7235C68.4574 62.9896 69.9954 59.283 70 55.4167V26.25ZM23.3333 17.5C23.3333 14.4058 24.5625 11.4383 26.7504 9.25042C28.9383 7.0625 31.9058 5.83333 35 5.83333C38.0942 5.83333 41.0617 7.0625 43.2496 9.25042C45.4375 11.4383 46.6667 14.4058 46.6667 17.5H23.3333Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_638_176">
          <rect width="70" height="70" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ShoppingBagIcon;
