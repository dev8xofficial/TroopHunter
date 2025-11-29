'use client';

import React from 'react';

interface SaaSIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const SaaSIcon: React.FC<SaaSIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M50.4591 19.7488C47.2478 13.241 40.5628 8.75 32.8125 8.75C22.4241 8.75 13.9344 16.8043 13.1972 27.0046C5.56067 29.1812 0 35.8531 0 43.75C0 53.0688 7.74375 60.7141 17.5 61.25H50.3125C61.1756 61.25 70 51.9466 70 40.4688C70 29.4087 61.3572 20.3941 50.4591 19.7488Z" fill="currentColor" />
    </svg>
  );
};

export default SaaSIcon;
