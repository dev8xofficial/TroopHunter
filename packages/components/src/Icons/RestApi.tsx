'use client';

import React from 'react';

interface RestApiIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const RestApiIcon: React.FC<RestApiIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M52.5 42C47.95 42 44.1 44.8 42.7 49H28C28 46.55 27.3 44.45 26.25 42.7L51.1 17.15C52.15 17.15 53.2 17.5 54.25 17.5C59.15 17.5 63 13.65 63 8.75C63 3.85 59.15 0 54.25 0C49.35 0 45.5 3.85 45.5 8.75C45.5 9.8 45.85 11.2 46.2 12.25L21.7 37.45C19.6 35.7 16.8 35 14 35V20.3C18.2 18.9 21 15.05 21 10.5C21 4.55 16.45 0 10.5 0C4.55 0 0 4.55 0 10.5C0 15.05 2.8 18.9 7 20.3V36.75C2.8 39.2 0 43.75 0 48.65C0 56.35 6.3 62.65 14 62.65C19.25 62.65 23.8 59.85 25.9 55.65H42.35C43.75 59.5 47.6 62.65 52.15 62.65C57.75 62.65 62.65 58.1 62.65 52.15C63 46.55 58.1 42 52.5 42Z" fill="currentcolor" />
    </svg>
  );
};

export default RestApiIcon;
