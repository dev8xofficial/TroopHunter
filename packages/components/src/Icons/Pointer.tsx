'use client';

import React from 'react';

interface PointerIconProps {
  size?: number | string;
  className?: string;
}

const PointerIcon: React.FC<PointerIconProps> = ({ size = 24, className }) => {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.6713 22C10.8621 22 11.0505 21.9825 11.233 21.9492C12.4555 21.7266 13.6889 20.7297 13.6889 19.0051V13.6754H19.0048C20.7307 13.6762 21.7274 12.4417 21.9499 11.2181C22.1724 9.99526 21.674 8.48987 20.0598 7.88138L6.39787 2.2191C5.17034 1.75648 3.85865 2.03906 2.95113 2.94762C2.04194 3.85619 1.75944 5.16736 2.21278 6.36933L7.90456 20.087C8.41374 21.4382 9.58127 22 10.6713 22Z" fill="currentColor" />
    </svg>
  );
};

export default PointerIcon;
