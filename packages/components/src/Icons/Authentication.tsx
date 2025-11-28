'use client';

import React from 'react';

interface AuthenticationIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const AuthenticationIcon: React.FC<AuthenticationIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M26 35C32.6281 35 38 29.6281 38 23C38 16.3719 32.6281 11 26 11C19.3719 11 14 16.3719 14 23C14 29.6281 19.3719 35 26 35ZM34.4 38H32.8344C30.7531 38.9562 28.4375 39.5 26 39.5C23.5625 39.5 21.2562 38.9562 19.1656 38H17.6C10.6437 38 5 43.6437 5 50.6V54.5C5 56.9844 7.01562 59 9.5 59H42.5C44.9843 59 47 56.9844 47 54.5V50.6C47 43.6437 41.3562 38 34.4 38ZM64.6812 25.9625L62.075 23.3281C61.6437 22.8876 60.9406 22.8876 60.5 23.3181L50.675 33.0681L46.4093 28.7744C45.9781 28.3339 45.275 28.3339 44.8344 28.7644L42.2 31.38C41.7594 31.8115 41.7593 32.5144 42.1906 32.955L49.8499 40.6706C50.2812 41.1111 50.9843 41.1111 51.4249 40.6806L64.6718 27.5369C65.1031 27.0964 65.1123 26.3937 64.6812 25.9625Z"
        fill="currentcolor"
      />
    </svg>
  );
};

export default AuthenticationIcon;
