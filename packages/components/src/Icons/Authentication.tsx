'use client';

import React from 'react';

interface AuthenticationIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const AuthenticationIcon: React.FC<AuthenticationIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 60 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M21 24C27.6281 24 33 18.6281 33 12C33 5.37185 27.6281 0 21 0C14.3719 0 8.99999 5.37185 8.99999 12C8.99999 18.6281 14.3719 24 21 24ZM29.4 27H27.8344C25.7531 27.9562 23.4375 28.4999 21 28.4999C18.5625 28.4999 16.2562 27.9562 14.1656 27H12.6C5.64375 27 0 32.6437 0 39.5999V43.4999C0 45.9843 2.01562 48 4.5 48H37.5C39.9843 48 42 45.9843 42 43.4999V39.5999C42 32.6437 36.3562 27 29.4 27ZM59.6812 14.9624L57.075 12.3281C56.6437 11.8876 55.9406 11.8876 55.5 12.3181L45.675 22.0681L41.4093 17.7744C40.9781 17.3339 40.275 17.3338 39.8344 17.7643L37.2 20.3799C36.7594 20.8114 36.7593 21.5143 37.1906 21.9549L44.8499 29.6706C45.2812 30.1111 45.9843 30.1111 46.4249 29.6806L59.6718 16.5368C60.1031 16.0963 60.1123 15.3937 59.6812 14.9624Z"
        fill="currentcolor"
      />
    </svg>
  );
};

export default AuthenticationIcon;
