'use client';

import React from 'react';

interface EndTestingIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const EndTestingIcon: React.FC<EndTestingIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M8.25 5.75C8.25 7.13071 7.13071 8.25 5.75 8.25C4.36929 8.25 3.25 7.13071 3.25 5.75C3.25 4.36929 4.36929 3.25 5.75 3.25C7.13071 3.25 8.25 4.36929 8.25 5.75Z" fill="currentColor" />
      <path d="M20.75 18.25C20.75 19.6307 19.6307 20.75 18.25 20.75C16.8693 20.75 15.75 19.6307 15.75 18.25C15.75 16.8693 16.8693 15.75 18.25 15.75C19.6307 15.75 20.75 16.8693 20.75 18.25Z" fill="currentColor" />
      <path d="M13.25 7.625C13.25 6.58946 14.0895 5.75 15.125 5.75C16.1605 5.75 17 6.58946 17 7.625V13.25H19.5V7.625C19.5 5.20875 17.5413 3.25 15.125 3.25C12.7087 3.25 10.75 5.20875 10.75 7.625V16.375C10.75 17.4105 9.91054 18.25 8.875 18.25C7.83946 18.25 7 17.4105 7 16.375V10.75H4.5V16.375C4.5 18.7913 6.45875 20.75 8.875 20.75C11.2912 20.75 13.25 18.7913 13.25 16.375V7.625Z" fill="currentColor" />
    </svg>
  );
};

export default EndTestingIcon;
