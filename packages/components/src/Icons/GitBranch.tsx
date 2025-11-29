'use client';

import React from 'react';

interface GitBranchIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const GitBranchIcon: React.FC<GitBranchIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M21.5 5.33347C21.5 3.49506 20.005 2 18.1667 2C16.3283 2 14.8333 3.49506 14.8333 5.33347C14.8333 6.88354 15.8975 8.19026 17.3333 8.56111V8.66694C17.3333 10.0453 16.2117 11.167 14.8333 11.167H8.16667C7.22917 11.167 6.36333 11.4787 5.66667 12.0021V8.56111C7.1025 8.19026 8.16667 6.88354 8.16667 5.33347C8.16667 3.49506 6.67167 2 4.83333 2C2.995 2 1.5 3.49506 1.5 5.33347C1.5 6.88354 2.56417 8.19026 4 8.56111V15.4389C2.56417 15.8097 1.5 17.1165 1.5 18.6665C1.5 20.5049 2.995 22 4.83333 22C6.67167 22 8.16667 20.5049 8.16667 18.6665C8.16667 17.1165 7.1025 15.8097 5.66667 15.4389V15.3331C5.66667 13.9547 6.78833 12.833 8.16667 12.833H14.8333C17.1308 12.833 19 10.9637 19 8.66611V8.56027C20.4358 8.18942 21.5 6.88354 21.5 5.33347Z"
        fill="currentcolor"
      />
    </svg>
  );
};

export default GitBranchIcon;
