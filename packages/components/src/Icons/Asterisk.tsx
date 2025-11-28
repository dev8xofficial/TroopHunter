'use client';

import React from 'react';

interface AsteriskIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const AsteriskIcon: React.FC<AsteriskIconProps> = ({ width = '', height = 'auto', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_642_120)" className={className}>
        <path
          d="M35 7.29167C37.4162 7.29167 39.375 9.25042 39.375 11.6667V27.4223L53.0198 19.5445C55.1125 18.3364 57.7882 19.0533 58.9963 21.1458C60.2044 23.2384 59.4875 25.9141 57.3948 27.1222L43.75 35L57.3948 42.8779C59.4872 44.086 60.2041 46.7618 58.996 48.8542C57.7879 50.9466 55.1122 51.6638 53.0198 50.4554L39.375 42.5778V58.3333C39.375 60.7495 37.4162 62.7083 35 62.7083C32.5839 62.7083 30.625 60.7495 30.625 58.3333V42.5778L16.9803 50.4554C14.8878 51.6638 12.2121 50.9466 11.004 48.8542C9.79585 46.7618 10.5128 44.086 12.6053 42.8779L26.2501 35L12.6052 27.1222C10.5127 25.9141 9.79573 23.2384 11.0039 21.1458C12.212 19.0533 14.8877 18.3364 16.9802 19.5445L30.625 27.4223V11.6667C30.625 9.25042 32.5839 7.29167 35 7.29167Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_642_120">
          <rect width="70" height="70" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default AsteriskIcon;
