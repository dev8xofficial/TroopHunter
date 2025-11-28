'use client';

import React from 'react';

interface OpenBookIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const OpenBookIcon: React.FC<OpenBookIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 77 77" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M41.2812 72.3767C49.0996 65.7312 58.6729 61.5096 68.8369 60.2251C70.0346 60.0667 71.1343 59.4764 71.9302 58.5643C72.7268 57.6522 73.1657 56.4806 73.165 55.2677V8.21104C73.1657 7.49011 73.0131 6.7774 72.7163 6.12098C72.4195 5.46457 71.9855 4.8797 71.4444 4.40594C70.9033 3.93218 70.267 3.5805 69.5789 3.37472C68.8908 3.16887 68.1663 3.11374 67.4551 3.21294C57.7995 4.71419 48.7429 8.85937 41.2812 15.1927C40.3901 15.8836 39.2957 16.2585 38.1697 16.2585C37.0436 16.2585 35.9494 15.8836 35.0582 15.1927C27.5932 8.86007 18.5333 4.717 8.87466 3.21919C8.16395 3.12006 7.44036 3.17506 6.75261 3.38048C6.06486 3.58591 5.42898 3.93703 4.88788 4.41016C4.34678 4.88321 3.91299 5.46731 3.61577 6.12295C3.31862 6.77859 3.16489 7.49067 3.16504 8.21104V55.2677C3.16451 56.4806 3.60331 57.6522 4.39963 58.5643C5.19588 59.4764 6.29544 60.0667 7.49314 60.2251C17.6604 61.5078 27.2372 65.7295 35.0582 72.3767C35.9487 73.069 37.0432 73.445 38.1697 73.445C39.2962 73.445 40.3907 73.069 41.2812 72.3767Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="6.33"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path d="M38.165 17.221V73.445V17.221Z" fill="currentColor" />
      <path d="M38.165 17.221V73.445" stroke="currentColor" strokeWidth="6.33" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
};

export default OpenBookIcon;
