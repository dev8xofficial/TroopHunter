'use client';

import React from 'react';

interface FlutterIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const FlutterIcon: React.FC<FlutterIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 54 66" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32.8781 30.2663L15.19 47.9194L32.8759 65.6053H53.0316L35.3719 47.9238L53.0316 30.2641H32.8803L32.8781 30.2663ZM32.8409 0L0 32.8037L10.115 42.9188L52.9878 0.0371877H32.8759L32.8409 0Z" fill="currentcolor" />
    </svg>
  );
};

export default FlutterIcon;
