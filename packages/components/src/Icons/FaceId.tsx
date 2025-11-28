'use client';

import React from 'react';

interface FaceIdIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const FaceIdIcon: React.FC<FaceIdIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M45.3535 8.75H50.7493C56.5243 8.75 61.2493 13.475 61.2493 19.25V24.2375" stroke="currentColor" strokeWidth="6.33" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M8.75 24.3542V19.25C8.75 13.475 13.475 8.75 19.25 8.75H24.2667" stroke="currentColor" strokeWidth="6.33" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M24.3542 61.25H19.25C13.475 61.25 8.75 56.525 8.75 50.75V45.5293" stroke="currentColor" strokeWidth="6.33" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M61.2494 45.5293V50.75C61.2494 56.525 56.5244 61.25 50.7494 61.25H45.5576" stroke="currentColor" strokeWidth="6.33" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M24.499 22.1957V27.4457" stroke="currentColor" strokeWidth="6.33" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M45.499 22.1957V27.4457" stroke="currentColor" strokeWidth="6.33" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M34.999 26.133V35.3498C34.999 36.1665 34.6198 36.9248 33.9783 37.4205L32.374 38.6748" stroke="currentColor" strokeWidth="6.33" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M42.2616 46.725C40.5991 48.854 38.0034 50.225 35.1159 50.225C32.2284 50.225 29.3991 48.7375 27.7656 46.4625" stroke="currentColor" strokeWidth="6.33" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
};

export default FaceIdIcon;
