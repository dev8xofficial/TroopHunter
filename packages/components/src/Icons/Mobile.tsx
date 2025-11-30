'use client';

import React from 'react';

interface MobileIconProps {
  size?: number | string;
  className?: string;
}

const MobileIcon: React.FC<MobileIconProps> = ({ size = 24, className }) => {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.4375 2H5.5625C3.32244 2 1.5 3.86917 1.5 6.16667V17.8333C1.5 20.1308 3.32244 22 5.5625 22H10.4375C12.6776 22 14.5 20.1308 14.5 17.8333V6.16667C14.5 3.86917 12.6776 2 10.4375 2ZM8.8125 19.5H7.1875C6.739 19.5 6.375 19.1267 6.375 18.6667C6.375 18.2067 6.739 17.8333 7.1875 17.8333H8.8125C9.261 17.8333 9.625 18.2067 9.625 18.6667C9.625 19.1267 9.261 19.5 8.8125 19.5Z" fill="currentColor" />
    </svg>
  );
};

export default MobileIcon;
