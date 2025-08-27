import React from 'react';

interface NextjsIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const NextjsIcon: React.FC<NextjsIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g clipPath="url(#clip0_3_779)">
        <path
          d="M21 21L22.8916 19.6338C22.299 18.8134 21.2451 18.4685 20.2821 18.7798C19.3191 19.0912 18.6667 19.9879 18.6667 21H21ZM35 65.3333C18.2474 65.3333 4.66667 51.7529 4.66667 35H0C0 54.3298 15.67 70 35 70V65.3333ZM65.3333 35C65.3333 51.7529 51.7529 65.3333 35 65.3333V70C54.3298 70 70 54.3298 70 35H65.3333ZM35 4.66667C51.7529 4.66667 65.3333 18.2474 65.3333 35H70C70 15.67 54.3298 0 35 0V4.66667ZM35 0C15.67 0 0 15.67 0 35H4.66667C4.66667 18.2474 18.2474 4.66667 35 4.66667V0ZM23.3333 56V21H18.6667V56H23.3333ZM19.1084 22.3662L49.4419 64.3659L53.2247 61.6341L22.8916 19.6338L19.1084 22.3662ZM46.6667 18.6667V46.6667H51.3333V18.6667H46.6667Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_3_779">
          <rect width="70" height="70" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default NextjsIcon;
