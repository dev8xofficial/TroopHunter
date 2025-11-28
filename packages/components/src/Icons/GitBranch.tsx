'use client';

import React from 'react';

interface GitBranchIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const GitBranchIcon: React.FC<GitBranchIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M70 11.6667C70 5.2325 64.7675 0 58.3333 0C51.8992 0 46.6667 5.2325 46.6667 11.6667C46.6667 17.0917 50.3913 21.665 55.4167 22.9629V23.3333C55.4167 28.1575 51.4908 32.0833 46.6667 32.0833H23.3333C20.0521 32.0833 17.0217 33.1742 14.5833 35.0058V22.9629C19.6088 21.665 23.3333 17.0917 23.3333 11.6667C23.3333 5.2325 18.1008 0 11.6667 0C5.2325 0 0 5.2325 0 11.6667C0 17.0917 3.72458 21.665 8.75 22.9629V47.0342C3.72458 48.3321 0 52.9054 0 58.3304C0 64.7646 5.2325 69.9971 11.6667 69.9971C18.1008 69.9971 23.3333 64.7646 23.3333 58.3304C23.3333 52.9054 19.6088 48.3321 14.5833 47.0342V46.6638C14.5833 41.8396 18.5092 37.9137 23.3333 37.9137H46.6667C54.7079 37.9137 61.25 31.3717 61.25 23.3304V22.96C66.2754 21.6621 70 17.0917 70 11.6667Z"
        fill="currentcolor"
      />
    </svg>
  );
};

export default GitBranchIcon;
