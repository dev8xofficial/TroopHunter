'use client';

import React from 'react';

interface StarIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const StarIcon: React.FC<StarIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M254.6 32.2C253.7 53.7 251.4 87.7 249.5 107C239.7 205.9 215.7 234.4 131.8 246.5C107.5 249.9 43.6 255 23.3 255C19.8 255 17 255.4 17 255.9C17 256.3 24.3 257 33.3 257.4C55.4 258.3 89.3 260.7 107.5 262.5C148.3 266.7 171.4 272 191.5 282C227.2 299.8 242.2 331.7 249.5 405C251.4 424.3 253.7 458.3 254.6 479.7C255 488.7 255.6 496 256 496C256.4 496 257 488.7 257.4 479.7C258.3 457.5 260.7 422.6 262.6 404.5C272.6 305.5 296.1 277.7 380.5 265.6C406.3 261.8 467.5 257 489.8 257C493.2 257 496 256.6 496 256.1C496 255.7 488.7 255 479.8 254.6C443.1 253 400.2 249.5 379.5 246.4C295.7 233.7 272.6 206.2 262.6 107.5C260.7 89.4 258.3 54.5 257.4 32.2C257 23.3 256.4 16 256 16C255.6 16 255 23.3 254.6 32.2Z"
        fill="currentcolor"
      />
    </svg>
  );
};

export default StarIcon;
