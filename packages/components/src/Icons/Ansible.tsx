'use client';

import React from 'react';

interface AnsibleIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const AnsibleIcon: React.FC<AnsibleIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.3503 5.28464L17.7001 18.0535L9.642 11.9217L12.3503 5.28464ZM21.8462 21.0183L13.6209 1.84818C13.1536 0.72555 11.5302 0.709027 11.0463 1.84818L2.01855 22.8376H5.09468L8.67235 14.179L19.3385 22.5344C20.5475 23.6834 22.515 22.5255 21.8462 21.0183Z" fill="currentColor" />
    </svg>
  );
};

export default AnsibleIcon;
