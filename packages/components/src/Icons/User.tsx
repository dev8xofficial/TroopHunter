'use client';

import React from 'react';

interface UserIconProps {
  size?: number | string;
  className?: string;
}

const UserIcon: React.FC<UserIconProps> = ({ size = 24, className }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_710_304)">
        <path d="M12.001 12C16.4193 12 20.001 9.31371 20.001 6C20.001 2.68629 16.4193 0 12.001 0C7.58271 0 4.00098 2.68629 4.00098 6C4.00098 9.31371 7.58271 12 12.001 12Z" fill="currentcolor" />
        <path d="M12 14.0001C5.37564 14.0057 0.00737502 18.0318 0 23.0001C0 23.5524 0.596939 24.0001 1.33332 24.0001H22.6667C23.4031 24.0001 24 23.5524 24 23.0001C23.9927 18.0318 18.6244 14.0056 12 14.0001Z" fill="currentcolor" />
      </g>
      <defs>
        <clipPath id="clip0_710_304">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default UserIcon;
