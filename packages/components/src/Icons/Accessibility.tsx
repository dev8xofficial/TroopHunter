'use client';

import React from 'react';

interface AccessibilityIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const AccessibilityIcon: React.FC<AccessibilityIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_665_150)">
        <path
          d="M35 0C15.6917 0 0 15.6917 0 35C0 54.3083 15.6917 70 35 70C54.3083 70 70 54.3083 70 35C70 15.6917 54.3083 0 35 0ZM35 11.6667C38.2083 11.6667 40.8333 14.2917 40.8333 17.5C40.8333 20.7083 38.2083 23.3333 35 23.3333C31.7917 23.3333 29.1667 20.7083 29.1667 17.5C29.1667 14.2917 31.7917 11.6667 35 11.6667ZM50.8958 25.9292L40.8333 30.9458V41.2417L46.2875 51.0417C47.075 52.4417 46.5792 54.2208 45.15 55.0083C44.7125 55.2708 44.2167 55.3875 43.7208 55.3875C42.7 55.3875 41.7083 54.8333 41.1833 53.9L35.525 43.7208H34.4458L28.7875 53.9C28.2625 54.8625 27.2708 55.3875 26.25 55.3875C25.7542 55.3875 25.2875 55.2708 24.8208 55.0083C23.4208 54.2208 22.8958 52.4417 23.6833 51.0417L29.1375 41.2417V30.9458L19.075 25.9292C17.6458 25.2 17.0625 23.45 17.7625 22.0208C18.4917 20.5917 20.2417 20.0083 21.6708 20.7083L32.725 26.2208H37.1875L48.2417 20.7083C49.6708 19.9792 51.4208 20.5625 52.15 22.0208C52.8792 23.45 52.2958 25.2 50.8375 25.9292H50.8958Z"
          fill="currentcolor"
        />
      </g>
      <defs>
        <clipPath id="clip0_665_150">
          <rect width="70" height="70" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default AccessibilityIcon;
