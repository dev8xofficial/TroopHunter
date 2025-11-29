'use client';

import React from 'react';

interface ResponsiveIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const ResponsiveIcon: React.FC<ResponsiveIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 70 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M61.25 17.5C62.8542 17.5 64.1667 16.1875 64.1667 14.5833C64.1667 6.53333 57.6333 0 49.5833 0H14.5833C6.53333 0 0 6.53333 0 14.5833V35C0 43.05 6.53333 49.5833 14.5833 49.5833H29.1667V55.4167H20.4167C18.8125 55.4167 17.5 56.7292 17.5 58.3333C17.5 59.9375 18.8125 61.25 20.4167 61.25H32.0833C33.6875 61.25 35 59.9375 35 58.3333V35C35 25.3458 42.8458 17.5 52.5 17.5H61.25ZM58.3333 23.3333H52.5C46.0542 23.3333 40.8333 28.5542 40.8333 35V55.4167C40.8333 61.8625 46.0542 67.0833 52.5 67.0833H58.3333C64.7792 67.0833 70 61.8625 70 55.4167V35C70 28.5542 64.7792 23.3333 58.3333 23.3333Z"
        fill="currentcolor"
      />
    </svg>
  );
};

export default ResponsiveIcon;
