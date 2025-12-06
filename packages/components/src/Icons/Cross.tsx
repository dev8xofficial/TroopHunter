'use client';

import React from 'react';

interface CrossIconProps {
  size?: number | string;
  className?: string;
}

const CrossIcon: React.FC<CrossIconProps> = ({ size = 24, className }) => {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.12109 22.1213L22.1211 2.12131M22.1211 22.1213L2.12109 2.12131" stroke="currentcolor" stroke-width="3" stroke-linecap="square" stroke-linejoin="round" />
    </svg>
  );
};

export default CrossIcon;
