'use client';

import React from 'react';

interface EndTestingIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const EndTestingIcon: React.FC<EndTestingIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 53 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30.625 15.3125C30.625 11.6881 33.5631 8.75 37.1875 8.75C40.8117 8.75 43.75 11.6881 43.75 15.3125V35H52.5V15.3125C52.5 6.85563 45.6444 0 37.1875 0C28.7306 0 21.875 6.85563 21.875 15.3125V45.9375C21.875 49.5617 18.9369 52.5 15.3125 52.5C11.6881 52.5 8.75 49.5617 8.75 45.9375V26.25H0V45.9375C0 54.3944 6.85563 61.25 15.3125 61.25C23.7694 61.25 30.625 54.3944 30.625 45.9375V15.3125Z" fill="currentcolor" />
    </svg>
  );
};

export default EndTestingIcon;
