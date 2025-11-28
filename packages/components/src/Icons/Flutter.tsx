'use client';

import React from 'react';

interface FlutterIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const FlutterIcon: React.FC<FlutterIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32.8781 34.2663L15.19 51.9194L32.8759 69.6053H53.0316L35.3719 51.9238L53.0316 34.2641H32.8803L32.8781 34.2663ZM32.8409 4L0 36.8037L10.115 46.9188L52.9878 4.03719H32.8759L32.8409 4Z" fill="currentcolor" />
    </svg>
  );
};

export default FlutterIcon;
