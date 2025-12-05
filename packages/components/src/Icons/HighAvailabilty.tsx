'use client';

import React from 'react';

interface HighAvailabiltyIconProps {
  size?: number | string;
  className?: string;
}

const HighAvailabiltyIcon: React.FC<HighAvailabiltyIconProps> = ({ size = 24, className }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g clipPath="url(#clip0_713_127)">
        <path d="M12.8333 19.5C12.8333 16.5083 15.2583 14.0833 18.25 14.0833C19.4633 14.0833 20.5792 14.4867 21.4817 15.1608C21.8133 14.1667 22 13.1058 22 12C22 6.4775 17.5225 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C12.475 22 12.9383 21.9558 13.395 21.8917C13.0383 21.17 12.8333 20.36 12.8333 19.5Z" fill="currentcolor" />
        <path d="M17.7928 22C17.7836 22 17.7745 22 17.7653 22C17.3361 21.9925 16.9378 21.8167 16.6445 21.5033L15.047 19.9358C14.7253 19.6042 14.7345 19.075 15.067 18.755C15.3978 18.4375 15.9228 18.4458 16.242 18.775L17.7936 20.2942L20.5778 17.51C20.9028 17.185 21.4311 17.185 21.7561 17.51C22.0811 17.8358 22.0811 18.3633 21.7561 18.6883L18.9053 21.5392C18.607 21.8375 18.2128 22 17.7928 22Z" fill="currentcolor" />
        <path d="M10.0897 15.0892C9.9272 15.2517 9.71387 15.3333 9.50053 15.3333C9.2872 15.3333 9.07387 15.2517 8.91137 15.0892C8.58553 14.7633 8.58553 14.2367 8.91137 13.9108L11.1672 11.655V7.83333C11.1672 7.3725 11.5397 7 12.0005 7C12.4614 7 12.8339 7.3725 12.8339 7.83333V12C12.8339 12.2217 12.7464 12.4333 12.5897 12.5892L10.0897 15.0892Z" fill="white" />
      </g>
      <defs>
        <clipPath id="clip0_713_127">
          <rect width="20" height="20" fill="white" transform="translate(2 2)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default HighAvailabiltyIcon;
