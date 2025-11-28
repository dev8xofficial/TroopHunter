'use client';

import React from 'react';

interface EndTestingIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const EndTestingIcon: React.FC<EndTestingIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.875 13.125C21.875 17.9575 17.9575 21.875 13.125 21.875C8.29251 21.875 4.375 17.9575 4.375 13.125C4.375 8.29251 8.29251 4.375 13.125 4.375C17.9575 4.375 21.875 8.29251 21.875 13.125Z" fill="currentcolor" />
      <path d="M65.625 56.875C65.625 61.7076 61.7076 65.625 56.875 65.625C52.0424 65.625 48.125 61.7076 48.125 56.875C48.125 52.0424 52.0424 48.125 56.875 48.125C61.7076 48.125 65.625 52.0424 65.625 56.875Z" fill="currentcolor" />
      <path d="M39.375 19.6875C39.375 16.0631 42.3131 13.125 45.9375 13.125C49.5618 13.125 52.5 16.0631 52.5 19.6875V39.375H61.25V19.6875C61.25 11.2306 54.3944 4.375 45.9375 4.375C37.4806 4.375 30.625 11.2306 30.625 19.6875V50.3125C30.625 53.9368 27.6869 56.875 24.0625 56.875C20.4381 56.875 17.5 53.9368 17.5 50.3125V30.625H8.75V50.3125C8.75 58.7694 15.6056 65.625 24.0625 65.625C32.5194 65.625 39.375 58.7694 39.375 50.3125V19.6875Z" fill="currentcolor" />
    </svg>
  );
};

export default EndTestingIcon;
