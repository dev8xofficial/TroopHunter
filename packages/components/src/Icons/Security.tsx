'use client';

import React from 'react';

interface SecurityIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const SecurityIcon: React.FC<SecurityIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 59 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M0 53.7804L10.7625 45.5321C16.4821 52.9988 22.5575 56.4375 29.3212 56.4375C36.05 56.4375 41.9504 53.0367 47.4133 45.6342L58.3333 53.6813C50.4525 64.3563 40.6612 70 29.3212 70C18.0192 70 8.13167 64.3942 0 53.7804ZM29.2833 17.9375L10.1267 34.4458L1.27167 24.1792L29.3271 0L57.1608 24.1967L48.265 34.4313L29.2833 17.9375Z" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill='currentcolor' />
    </svg>
  );
};

export default SecurityIcon;
