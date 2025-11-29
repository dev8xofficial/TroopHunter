'use client';

import React from 'react';

interface RestApiIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const RestApiIcon: React.FC<RestApiIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g clip-path="url(#clip0_710_429)">
        <path
          d="M18.6667 15.3889C17.2222 15.3889 16 16.2778 15.5556 17.6111H10.8889C10.8889 16.8333 10.6667 16.1667 10.3333 15.6111L18.2222 7.5C18.5556 7.5 18.8889 7.61111 19.2222 7.61111C20.7778 7.61111 22 6.38889 22 4.83334C22 3.27778 20.7778 2.05556 19.2222 2.05556C17.6667 2.05556 16.4444 3.27778 16.4444 4.83334C16.4444 5.16667 16.5556 5.61111 16.6667 5.94445L8.88889 13.9444C8.22222 13.3889 7.33333 13.1667 6.44444 13.1667V8.5C7.77778 8.05556 8.66667 6.83334 8.66667 5.38889C8.66667 3.5 7.22222 2.05556 5.33333 2.05556C3.44444 2.05556 2 3.5 2 5.38889C2 6.83334 2.88889 8.05556 4.22222 8.5V13.7222C2.88889 14.5 2 15.9444 2 17.5C2 19.9444 4 21.9444 6.44444 21.9444C8.11111 21.9444 9.55556 21.0556 10.2222 19.7222H15.4444C15.8889 20.9444 17.1111 21.9444 18.5556 21.9444C20.3333 21.9444 21.8889 20.5 21.8889 18.6111C22 16.8333 20.4444 15.3889 18.6667 15.3889Z"
          fill="currentcolor"
        />
      </g>
      <defs>
        <clipPath id="clip0_710_429">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default RestApiIcon;
