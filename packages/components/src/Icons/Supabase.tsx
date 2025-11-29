'use client';

import React from 'react';

interface SupabaseIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const SupabaseIcon: React.FC<SupabaseIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M64.0209 32.8125L40.1043 63.1458C38.3543 65.1875 35.0001 64.0208 35.0001 61.3958V43.75H9.62511C6.56261 43.75 4.81261 40.1042 6.70844 37.7708L30.1876 7.4375C31.7918 5.25 35.1459 6.41667 35.1459 9.1875V26.8333H60.9584C64.3126 26.8333 66.0626 30.3333 64.0209 32.8125Z" fill="currentColor" />
    </svg>
  );
};

export default SupabaseIcon;
