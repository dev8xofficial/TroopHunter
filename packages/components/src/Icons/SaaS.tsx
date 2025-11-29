'use client';

import React from 'react';

interface SaaSIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const SaaSIcon: React.FC<SaaSIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M17.4169 7.64251C16.4994 5.78313 14.5894 4.5 12.375 4.5C9.40687 4.5 6.98126 6.80123 6.77064 9.71561C4.58876 10.3375 3 12.2438 3 14.5C3 17.1625 5.2125 19.3469 8 19.5H17.375C20.4788 19.5 23 16.8419 23 13.5625C23 10.4025 20.5306 7.82688 17.4169 7.64251Z" fill="currentColor" />
    </svg>
  );
};

export default SaaSIcon;
