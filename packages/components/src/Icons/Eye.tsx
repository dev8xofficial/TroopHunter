'use client';

import React from 'react';

interface EyeIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const EyeIcon: React.FC<EyeIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.0001 15.332C13.8403 15.332 15.3321 13.8402 15.3321 12C15.3321 10.1597 13.8403 8.66788 12.0001 8.66788C10.1598 8.66788 8.66797 10.1597 8.66797 12C8.66797 13.8402 10.1598 15.332 12.0001 15.332Z" fill="currentColor" />
      <path d="M21.389 9.84995C20.097 7.74573 17.1581 4.21536 12 4.21536C6.84189 4.21536 3.90299 7.74573 2.61096 9.84995C1.79635 11.1675 1.79635 12.8324 2.61096 14.15C3.90299 16.2543 6.84189 19.7846 12 19.7846C17.1581 19.7846 20.097 16.2543 21.389 14.15C22.2036 12.8324 22.2036 11.1675 21.389 9.84995ZM12 16.9981C9.2396 16.9981 7.00183 14.7604 7.00183 12C7.00183 9.23959 9.2396 7.00183 12 7.00183C14.7604 7.00183 16.9981 9.23959 16.9981 12C16.9954 14.7592 14.7592 16.9953 12 16.9981Z" fill="currentColor" />
    </svg>
  );
};

export default EyeIcon;
