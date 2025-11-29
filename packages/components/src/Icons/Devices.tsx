'use client';

import React from 'react';

interface DevicesIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const DevicesIcon: React.FC<DevicesIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.5 7.41666C19.9583 7.41666 20.3333 7.04166 20.3333 6.58332C20.3333 4.28332 18.4667 2.41666 16.1667 2.41666H6.16667C3.86667 2.41666 2 4.28332 2 6.58332V12.4167C2 14.7167 3.86667 16.5833 6.16667 16.5833H10.3333V18.25H7.83333C7.375 18.25 7 18.625 7 19.0833C7 19.5417 7.375 19.9167 7.83333 19.9167H11.1667C11.625 19.9167 12 19.5417 12 19.0833V12.4167C12 9.65832 14.2417 7.41666 17 7.41666H19.5ZM18.6667 9.08332H17C15.1583 9.08332 13.6667 10.575 13.6667 12.4167V18.25C13.6667 20.0917 15.1583 21.5833 17 21.5833H18.6667C20.5083 21.5833 22 20.0917 22 18.25V12.4167C22 10.575 20.5083 9.08332 18.6667 9.08332Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default DevicesIcon;
