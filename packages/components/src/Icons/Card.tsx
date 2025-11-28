'use client';

import React from 'react';

interface CardIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const CardIcon: React.FC<CardIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M69.4079 23.7742L59.4533 54.1017C58.1496 58.5321 54.8742 61.8542 50.8433 63.4438C51.9079 60.9734 52.5 58.2551 52.5 55.3996V26.2359C52.5 14.9776 43.3388 5.81923 32.0833 5.81923H27.2271C30.8117 1.09714 37.1029 -1.20411 43.1083 0.630477L59.6925 5.72298C67.2875 8.05631 71.645 16.153 69.4079 23.7742ZM46.6667 26.2359V55.4026C46.6667 63.4438 40.1246 69.9859 32.0833 69.9859H14.5833C6.54208 69.9859 0 63.4438 0 55.4026V26.2359C0 18.1946 6.54208 11.6526 14.5833 11.6526H32.0833C40.1246 11.6526 46.6667 18.1946 46.6667 26.2359Z" fill="currentcolor" />
    </svg>
  );
};

export default CardIcon;
