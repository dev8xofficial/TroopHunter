'use client';

import React from 'react';

interface ShuffleIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const ShuffleIcon: React.FC<ShuffleIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M30.2168 43.2833L32.2001 46.6375C33.0751 48.0958 34.3001 49.2917 35.7876 50.1375C37.2751 50.9833 38.9376 51.4208 40.6293 51.4208H61.221" stroke="currentColor" strokeWidth="6.33" stroke-miterlimit="10" stroke-linecap="round" />
      <path d="M8.75 18.5792H9.79997C11.4916 18.5792 13.1541 19.0167 14.6416 19.8625C16.1291 20.7083 17.3542 21.9042 18.2292 23.3625L20.1834 26.6292" stroke="currentColor" strokeWidth="6.33" stroke-miterlimit="10" stroke-linecap="round" />
      <path d="M8.75 51.4208H9.79997C11.4916 51.4208 13.1541 50.9833 14.6416 50.1375C16.1291 49.2917 17.3542 48.0958 18.2292 46.6375L32.025 23.3625C32.9 21.9042 34.125 20.7083 35.6125 19.8625C37.1 19.0167 38.7625 18.5792 40.4542 18.5792H61.0458" stroke="currentColor" strokeWidth="6.33" stroke-miterlimit="10" stroke-linecap="round" />
      <path d="M51.3623 41.5625L61.1915 51.3917L51.3623 61.2208" stroke="currentColor" strokeWidth="6.33" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M51.3623 8.75L61.1915 18.6083L51.3623 28.4375" stroke="currentColor" strokeWidth="6.33" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
};

export default ShuffleIcon;
