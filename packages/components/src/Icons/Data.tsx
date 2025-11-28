'use client';

import React from 'react';

interface DataIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const DataIcon: React.FC<DataIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M19.4726 48.1356L7.39453 56.511C11.3621 61.4497 16.5622 65.327 22.383 67.6212L26.967 53.6907C24.0567 52.4578 21.5011 50.5187 19.4726 48.1356Z" fill="currentcolor" fill-opacity="0.8" />
    </svg>
  );
};

export default DataIcon;
