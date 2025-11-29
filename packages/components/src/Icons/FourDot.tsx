'use client';

import React from 'react';

interface FourDotIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const FourDotIcon: React.FC<FourDotIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_710_531)">
        <path d="M9.27246 4.72728C9.27246 6.23485 10.4922 7.45455 11.9997 7.45455C13.5074 7.45455 14.727 6.23485 14.727 4.72728C14.727 3.2197 13.5074 2 11.9997 2C10.4922 2 9.27246 3.2197 9.27246 4.72728Z" fill="currentColor" />
        <path d="M9.27246 19.2725C9.27246 20.7801 10.4921 21.9998 11.9997 21.9998C13.5073 21.9998 14.727 20.7801 14.727 19.2725C14.727 17.7649 13.5073 16.5453 11.9997 16.5453C10.4921 16.5453 9.27246 17.7649 9.27246 19.2725Z" fill="currentColor" />
        <path fillRule="evenodd" clipRule="evenodd" d="M18.1826 8.59091C20.1247 8.59091 21.7723 10.0753 21.7723 12C21.7723 13.9246 20.1247 15.4091 18.1826 15.4091C16.2404 15.4091 14.5928 13.9246 14.5928 12C14.5928 10.0753 16.2404 8.59091 18.1826 8.59091ZM20.4087 12C20.4087 10.9095 19.4553 9.95455 18.1826 9.95455C16.9098 9.95455 15.9564 10.9095 15.9564 12C15.9564 13.0905 16.9098 14.0455 18.1826 14.0455C19.4553 14.0455 20.4087 13.0905 20.4087 12Z" fill="currentColor" />
        <path fillRule="evenodd" clipRule="evenodd" d="M5.81731 8.81165C7.75946 8.81165 9.40713 10.2961 9.40713 12.2207C9.40713 14.1455 7.75946 15.6298 5.81731 15.6298C3.87515 15.6298 2.22754 14.1454 2.22754 12.2207C2.22754 10.2961 3.87515 8.81165 5.81731 8.81165ZM8.04349 12.2207C8.04349 11.1303 7.09008 10.1753 5.81731 10.1753C4.54455 10.1753 3.59117 11.1303 3.59117 12.2207C3.59117 13.3112 4.54455 14.2662 5.81731 14.2662C7.09009 14.2662 8.04349 13.3112 8.04349 12.2207Z" fill="currentColor" />
      </g>
      <defs>
        <clipPath id="clip0_710_531">
          <rect width="20" height="20" fill="white" transform="translate(2 2)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FourDotIcon;
