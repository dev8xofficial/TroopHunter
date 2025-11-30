// components/PieChartIcon.tsx
'use client';

import React from 'react';

interface PieChartIconProps {
  size?: number | string;
  className?: string;
}

const PieChartIcon: React.FC<PieChartIconProps> = ({ size = 24, className }) => {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_710_527)">
        <path d="M17.5946 12H13.6671C12.7466 12 12.0004 11.2538 12.0004 10.3333V6.395C12.0027 5.61805 11.6436 4.88414 11.0287 4.40918C10.4461 3.94777 9.68208 3.78332 8.96122 3.96418C4.06161 5.18043 1.07563 10.1384 2.29192 15.038C3.14883 18.49 5.9304 21.1316 9.42207 21.8092C14.192 22.7222 18.8462 19.7566 20.0338 15.0475C20.2153 14.3257 20.0511 13.5605 19.5896 12.9767C19.1091 12.3629 18.374 12.003 17.5946 12Z" fill="currentColor" />
        <path d="M21.709 8.205C21.5188 7.49789 21.2355 6.81918 20.8665 6.18668C19.7568 4.28285 17.9439 2.89078 15.8182 2.31C15.6782 2.27223 15.3648 2.25 15.3648 2.25C15.2529 2.25004 14.7707 2.25 14.389 2.55918C13.828 3.00062 13.7398 3.5025 13.7315 3.54168C13.7024 3.66457 13.6873 3.79039 13.6865 3.91668V7.83336C13.6865 9.21406 14.8058 10.3334 16.1865 10.3334H20.119C20.6407 10.3348 21.1318 10.0871 21.4407 9.66668C21.6691 9.35867 21.7866 8.98242 21.774 8.59918C21.7674 8.46574 21.7456 8.33348 21.709 8.205Z" fill="currentColor" />
      </g>
      <defs>
        <clipPath id="clip0_710_527">
          <rect width="20" height="20" fill="white" transform="translate(2 2)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PieChartIcon;
