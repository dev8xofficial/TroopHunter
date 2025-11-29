'use client';

import React from 'react';

interface UserIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const UserIcon: React.FC<UserIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M35 35C44.665 35 52.5 27.165 52.5 17.5C52.5 7.83502 44.665 0 35 0C25.335 0 17.5 7.83502 17.5 17.5C17.5 27.165 25.335 35 35 35Z" fill="currentColor" />
      <path d="M35 40.8334C20.5092 40.8495 8.76613 52.5926 8.75 67.0834C8.75 68.6942 10.0558 70 11.6666 70H58.3332C59.9441 70 61.2499 68.6942 61.2499 67.0834C61.2339 52.5926 49.4908 40.8494 35 40.8334Z" fill="currentColor" />
    </svg>
  );
};

export default UserIcon;
