'use client';

import React from 'react';

interface HeartIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const HeartIcon: React.FC<HeartIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.5815 3.5C15.6435 3.51411 14.726 3.76742 13.9215 4.23434C13.1171 4.70126 12.4543 5.36525 12 6.15927C11.5457 5.36525 10.8829 4.70126 10.0785 4.23434C9.27405 3.76742 8.35651 3.51411 7.41852 3.5C5.92324 3.56285 4.51444 4.19564 3.49991 5.26014C2.48539 6.32464 1.9476 7.7343 2.00403 9.18117C2.00403 12.8453 5.99076 16.8471 9.33441 19.5604C10.081 20.1673 11.0249 20.5 12 20.5C12.9751 20.5 13.919 20.1673 14.6656 19.5604C18.0092 16.8471 21.996 12.8453 21.996 9.18117C22.0524 7.7343 21.5146 6.32464 20.5001 5.26014C19.4856 4.19564 18.0768 3.56285 16.5815 3.5Z" fill="currentColor" />
    </svg>
  );
};

export default HeartIcon;
