'use client';

import React from 'react';

interface MobileIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const MobileIcon: React.FC<MobileIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 47 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M32.0833 0H14.5833C6.54208 0 0 6.54208 0 14.5833V55.4167C0 63.4579 6.54208 70 14.5833 70H32.0833C40.1246 70 46.6667 63.4579 46.6667 55.4167V14.5833C46.6667 6.54208 40.1246 0 32.0833 0ZM26.25 61.25H20.4167C18.8067 61.25 17.5 59.9433 17.5 58.3333C17.5 56.7233 18.8067 55.4167 20.4167 55.4167H26.25C27.86 55.4167 29.1667 56.7233 29.1667 58.3333C29.1667 59.9433 27.86 61.25 26.25 61.25Z" fill="currentcolor" />
    </svg>
  );
};

export default MobileIcon;
