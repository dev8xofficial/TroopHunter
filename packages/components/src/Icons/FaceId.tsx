'use client';

import React from 'react';

interface FaceIdIconProps {
  size?: number | string;
  className?: string;
}

const FaceIdIcon: React.FC<FaceIdIconProps> = ({ size = 24, className }) => {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.958 2.5H14.4997C16.1497 2.5 17.4997 3.85001 17.4997 5.50001V6.925" stroke="currentcolor" stroke-width="2.33" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M2.5 6.95834V5.50001C2.5 3.85001 3.85001 2.5 5.50001 2.5H6.93334" stroke="currentcolor" stroke-width="2.33" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M6.95834 17.5H5.50001C3.85001 17.5 2.5 16.15 2.5 14.5V13.0084" stroke="currentcolor" stroke-width="2.33" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M17.5 13.0084V14.5C17.5 16.15 16.15 17.5 14.5 17.5H13.0166" stroke="currentcolor" stroke-width="2.33" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M7 6.34164V7.84164" stroke="currentcolor" stroke-width="2.33" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M13 6.34164V7.84164" stroke="currentcolor" stroke-width="2.33" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M10 7.46658V10.0999C10 10.3333 9.89164 10.5499 9.70836 10.6916L9.25 11.0499" stroke="currentcolor" stroke-width="2.33" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M12.0753 13.35C11.6003 13.9583 10.8587 14.35 10.0337 14.35C9.20867 14.35 8.40031 13.925 7.93359 13.275" stroke="currentcolor" stroke-width="2.33" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
};

export default FaceIdIcon;
