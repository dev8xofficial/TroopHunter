'use client';

import React from 'react';

interface ClickUpIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const ClickUpIcon: React.FC<ClickUpIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 19.2073L5.69 16.2615C7.651 18.9281 9.734 20.1562 12.053 20.1562C14.36 20.1562 16.383 18.9417 18.256 16.2979L22 19.1719C19.298 22.9844 15.941 25 12.053 25C8.178 25 4.788 22.9979 2 19.2073ZM12.04 6.40625L5.472 12.3021L2.436 8.63542L12.055 0L21.598 8.64167L18.548 12.2969L12.04 6.40625Z" fill="currentColor" />
    </svg>
  );
};

export default ClickUpIcon;
