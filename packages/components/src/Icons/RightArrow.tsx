'use client';

import React from 'react';

interface RightArrowIconProps {
  size?: number | string;
  className?: string;
}

const RightArrowIcon: React.FC<RightArrowIconProps> = ({ size = 24, className }) => {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.39657 10.9574H2V13.041H17.8852L11.5273 19.1804L11.2529 19.4443L11.5098 19.7256L12.4029 20.6999L12.6789 21L12.974 20.7172L21.7081 12.2789L22 11.9992L21.7081 11.7164L12.974 3.28285L12.6789 3L12.4029 3.30013L11.5098 4.27438L11.2529 4.55408L11.5273 4.81964L17.8852 10.959L2.39657 10.9574Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
};

export default RightArrowIcon;
