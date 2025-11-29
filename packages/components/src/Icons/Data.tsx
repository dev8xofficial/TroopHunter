'use client';

import React from 'react';

interface DataIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const DataIcon: React.FC<DataIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.56318 15.753L4.1123 18.146C5.24589 19.557 6.73163 20.6649 8.39472 21.3203L9.70444 17.3402C8.87294 16.988 8.14276 16.4339 7.56318 15.753Z" fill="currentColor" fill-opacity="0.8" />
      <path d="M10.7565 6.1061L9.92504 2C7.6077 2.67991 5.54238 4.19127 4.23145 6.15622L7.85841 8.24713C8.56492 7.26515 9.57276 6.50953 10.7565 6.1061Z" fill="currentColor" fill-opacity="0.2" />
      <path d="M6.18096 11.6523C6.18096 10.8209 6.35708 9.98944 6.71036 9.23377L3.0834 7.14285C2.37786 8.52826 2 10.0897 2 11.6512C2 13.5148 2.50381 15.3294 3.48585 16.8908L6.91229 14.4979C6.45767 13.6418 6.18096 12.6599 6.18096 11.6523Z" fill="currentColor" fill-opacity="0.5" />
      <path d="M12.5966 2C12.0672 2 11.5132 2.05018 10.9848 2.12595L11.8163 6.23205C12.0682 6.20646 12.3457 6.18186 12.5976 6.18186C15.8223 6.18186 18.4416 8.80104 18.4416 12.0255C18.4406 15.249 15.8213 17.8437 12.5966 17.8437C12.1686 17.8437 11.7405 17.7935 11.3115 17.6922L10.0264 21.6723C10.8579 21.8987 11.7139 22 12.5711 22C18.0874 22 22.5716 17.5161 22.5716 12.0001C22.5726 6.48419 18.1131 2 12.5966 2Z" fill="currentColor" />
    </svg>
  );
};

export default DataIcon;
