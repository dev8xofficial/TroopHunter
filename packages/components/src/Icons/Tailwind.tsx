'use client';

import React from 'react';

interface TailwindIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const TailwindIcon: React.FC<TailwindIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M12 6C9.33333 6 7.66667 7.33333 7 10C8 8.66667 9.16667 8.16667 10.5 8.5C11.2608 8.69 11.8042 9.24167 12.4067 9.85333C13.3875 10.8483 14.5217 12 17 12C19.6667 12 21.3333 10.6667 22 8C21 9.33333 19.8333 9.83333 18.5 9.5C17.7392 9.31 17.1958 8.75833 16.5933 8.14667C15.6133 7.15167 14.4792 6 12 6ZM7 12C4.33333 12 2.66667 13.3333 2 16C3 14.6667 4.16667 14.1667 5.5 14.5C6.26083 14.69 6.80417 15.2417 7.40667 15.8533C8.3875 16.8483 9.52167 18 12 18C14.6667 18 16.3333 16.6667 17 14C16 15.3333 14.8333 15.8333 13.5 15.5C12.7392 15.31 12.1958 14.7583 11.5933 14.1467C10.6133 13.1517 9.47917 12 7 12Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default TailwindIcon;
