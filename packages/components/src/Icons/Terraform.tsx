'use client';

import React from 'react';

interface TerraformIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const TerraformIcon: React.FC<TerraformIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.89041 5.52462L15.1027 8.67984V14.9972L8.89041 11.8382V5.52462ZM15.7846 8.67984V14.9972L22 11.8382V5.52462L15.7846 8.67984ZM2 2V8.3142L8.21228 11.4726V5.15836L2 2ZM8.89041 18.841L15.1027 22V15.6889L8.89041 12.5306V18.841Z" fill="currentColor" />
    </svg>
  );
};

export default TerraformIcon;
