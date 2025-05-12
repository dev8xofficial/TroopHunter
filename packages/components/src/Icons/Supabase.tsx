import React from 'react';

interface SupabaseIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const SupabaseIcon: React.FC<SupabaseIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M64.0209 32.8124L40.1043 63.1457C38.3543 65.1874 35.0001 64.0207 35.0001 61.3957V43.7499H9.62511C6.56261 43.7499 4.81261 40.1041 6.70844 37.7707L30.1876 7.43741C31.7918 5.24991 35.1459 6.41658 35.1459 9.18741V26.8332H60.9584C64.3126 26.8332 66.0626 30.3332 64.0209 32.8124Z" fill="currentColor" />
    </svg>
  );
};

export default SupabaseIcon;
