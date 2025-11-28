'use client';

import React from 'react';

interface TerraformIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const TerraformIcon: React.FC<TerraformIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M24.0494 12.2938L45.7319 23.2991V45.3337L24.0494 34.3153V12.2938ZM48.1119 23.2991V45.3337L69.8053 34.3153V12.2938L48.1119 23.2991ZM0 0V22.0237L21.6825 33.04V11.0163L0 0ZM24.0494 58.7409L45.7319 69.7594V47.7466L24.0494 36.7303V58.7409Z" fill="currentcolor" />
    </svg>
  );
};

export default TerraformIcon;
