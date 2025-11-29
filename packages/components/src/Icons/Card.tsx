'use client';

import React from 'react';

interface CardIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const CardIcon: React.FC<CardIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M21.8324 8.79401L18.988 17.4608C18.6154 18.7268 17.6795 19.6762 16.5278 20.1305C16.832 19.4245 17.0012 18.6477 17.0012 17.8317V9.49748C17.0012 6.28017 14.3835 3.66297 11.1674 3.66297H9.77976C10.804 2.31353 12.6016 1.6559 14.3176 2.18017L19.0563 3.63547C21.2265 4.30227 22.4716 6.61607 21.8324 8.79401ZM15.3344 9.49748V17.8325C15.3344 20.1305 13.465 22 11.1674 22H6.16699C3.86931 22 2 20.1305 2 17.8325V9.49748C2 7.19952 3.86931 5.32997 6.16699 5.32997H11.1674C13.465 5.32997 15.3344 7.19952 15.3344 9.49748Z" fill="currentcolor" />
    </svg>
  );
};

export default CardIcon;
