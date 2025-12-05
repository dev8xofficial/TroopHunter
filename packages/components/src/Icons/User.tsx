'use client';

import React from 'react';

interface UserIconProps {
  size?: number | string;
  className?: string;
}

const UserIcon: React.FC<UserIconProps> = ({ size = 24, className }) => {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" fill="cuurentcolor" />
      <path d="M12 12.6667C7.85977 12.6714 4.50461 16.0265 4.5 20.1667C4.5 20.627 4.87309 21.0001 5.33332 21.0001H18.6667C19.1269 21.0001 19.5 20.627 19.5 20.1667C19.4954 16.0265 16.1403 12.6713 12 12.6667Z" fill="cuurentcolor" />
    </svg>
  );
};

export default UserIcon;
