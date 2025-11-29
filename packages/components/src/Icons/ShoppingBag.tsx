'use client';

import React from 'react';

interface ShoppingBagIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const ShoppingBagIcon: React.FC<ShoppingBagIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22 9.5C22 8.83696 21.7366 8.20107 21.2678 7.73223C20.7989 7.26339 20.163 7 19.5 7H17C17 5.67392 16.4732 4.40215 15.5355 3.46447C14.5979 2.52678 13.3261 2 12 2C10.6739 2 9.40215 2.52678 8.46447 3.46447C7.52678 4.40215 7 5.67392 7 7H4.5C3.83696 7 3.20107 7.26339 2.73223 7.73223C2.26339 8.20107 2 8.83696 2 9.5L2 17.8333C2.00132 18.938 2.44073 19.997 3.22185 20.7782C4.00296 21.5593 5.062 21.9987 6.16667 22H17.8333C18.938 21.9987 19.997 21.5593 20.7782 20.7782C21.5593 19.997 21.9987 18.938 22 17.8333V9.5ZM8.66667 7C8.66667 6.11594 9.01786 5.2681 9.64298 4.64298C10.2681 4.01786 11.1159 3.66667 12 3.66667C12.8841 3.66667 13.7319 4.01786 14.357 4.64298C14.9821 5.2681 15.3333 6.11594 15.3333 7H8.66667Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ShoppingBagIcon;
