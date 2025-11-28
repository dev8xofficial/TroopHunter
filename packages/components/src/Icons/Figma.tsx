'use client';

import React from 'react';

interface FigmaIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const FigmaIcon: React.FC<FigmaIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M21.3043 0H10.6522C4.76913 0 0 4.76913 0 10.6522C0 16.5352 4.76913 21.3043 10.6522 21.3043H21.3043V0Z" fill="currentcolor" />
      <path d="M24.3477 0H34.9998C40.8829 0 45.652 4.76913 45.652 10.6522C45.652 16.5352 40.8829 21.3043 34.9998 21.3043H24.3477V0Z" fill="currentcolor" />
      <path d="M21.3043 24.3477H10.6522C4.76913 24.3477 0 29.1168 0 34.9998C0 40.8829 4.76913 45.652 10.6522 45.652H21.3043V24.3477Z" fill="currentcolor" />
      <path d="M21.3043 48.6958H10.6522C4.76913 48.6958 0 53.4649 0 59.348C0 65.231 4.76913 70.0001 10.6522 70.0001C16.5352 70.0001 21.3043 65.231 21.3043 59.348V48.6958Z" fill="currentcolor" />
      <path d="M34.9998 45.652C40.8829 45.652 45.652 40.8829 45.652 34.9998C45.652 29.1168 40.8829 24.3477 34.9998 24.3477C29.1168 24.3477 24.3477 29.1168 24.3477 34.9998C24.3477 40.8829 29.1168 45.652 34.9998 45.652Z" fill="currentcolor" />
    </svg>
  );
};

export default FigmaIcon;
