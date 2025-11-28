'use client';

import React from 'react';

interface CrossIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const CrossIcon: React.FC<CrossIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 79 79" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4.47559 74.476L74.4756 4.47598M74.4756 74.476L4.47559 4.47598" stroke="black" strokeWidth="6.33" stroke-linecap="square" stroke-linejoin="round" fill="currentColor" />
    </svg>
  );
};

export default CrossIcon;
