'use client';

import React from 'react';

interface DevicesIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const DevicesIcon: React.FC<DevicesIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g clipPath="url(#clip0_642_148)">
        <path
          d="M61.25 20.4167C62.8542 20.4167 64.1667 19.1042 64.1667 17.5C64.1667 9.45001 57.6333 2.91667 49.5833 2.91667H14.5833C6.53333 2.91667 0 9.45001 0 17.5V37.9167C0 45.9667 6.53333 52.5 14.5833 52.5H29.1667V58.3333H20.4167C18.8125 58.3333 17.5 59.6458 17.5 61.25C17.5 62.8542 18.8125 64.1667 20.4167 64.1667H32.0833C33.6875 64.1667 35 62.8542 35 61.25V37.9167C35 28.2625 42.8458 20.4167 52.5 20.4167H61.25ZM58.3333 26.25H52.5C46.0542 26.25 40.8333 31.4708 40.8333 37.9167V58.3333C40.8333 64.7792 46.0542 70 52.5 70H58.3333C64.7792 70 70 64.7792 70 58.3333V37.9167C70 31.4708 64.7792 26.25 58.3333 26.25Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_642_148">
          <rect width="70" height="70" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DevicesIcon;
