import React from 'react';

interface UserIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const UserIcon: React.FC<UserIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 62" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g clipPath="url(#clip0_2_680)">
        <path d="M26.893 24.2835C33.1575 24.2835 38.2359 19.4258 38.2359 13.4334C38.2359 7.44103 33.1575 2.58325 26.893 2.58325C20.6286 2.58325 15.5503 7.44103 15.5503 13.4334C15.5503 19.4258 20.6286 24.2835 26.893 24.2835Z" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M48.9453 4.1333C52.2392 6.0319 54.4424 9.48656 54.4424 13.4334C54.4424 17.3802 52.2392 20.8349 48.9453 22.7335" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M29.4264 36.6838H24.3708C23.4077 36.6838 22.9261 36.6838 22.519 36.6999C11.7038 37.1233 3.03383 45.7624 2.60877 56.5388C2.59277 56.9447 2.59277 57.4244 2.59277 58.3841H51.2044C51.2044 57.4244 51.2044 56.9447 51.1886 56.5388C50.7634 45.7624 42.0935 37.1233 31.2783 36.6999C30.8712 36.6838 30.3895 36.6838 29.4264 36.6838Z" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M67.4062 58.3838V56.5238C67.4062 49.579 67.4062 46.1068 65.9932 43.4542C64.7506 41.1209 62.7675 39.224 60.3281 38.0352" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_2_680">
          <rect width="70" height="62" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default UserIcon;
