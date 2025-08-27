import React from 'react';

interface FrameIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const FrameIcon: React.FC<FrameIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M35.0293 43.6333C32.3751 43.6333 30.2168 41.4166 30.2168 38.675V31.2666C30.2168 28.525 32.3751 26.3083 35.0293 26.3083C37.6835 26.3083 39.8418 28.525 39.8418 31.2666V38.675C39.8418 41.4166 37.6835 43.6333 35.0293 43.6333Z" stroke="currentColor" strokeWidth="5.33" strokeLinecap="round" />
      <path d="M49.5541 39.4042C48.9708 47.1334 42.6708 53.2 35.0291 53.2C26.9791 53.2 20.4458 46.4917 20.4458 38.2084V31.7917C20.4458 23.5084 26.9791 16.8 35.0291 16.8C42.5833 16.8 48.7958 22.7209 49.5249 30.275" stroke="currentColor" strokeWidth="5.33" strokeLinecap="round" />
      <path d="M15.5167 21.0583C19.1334 13.7667 26.5417 8.75 35 8.75C47.0167 8.75 56.875 18.8709 56.875 31.2375V38.7333C56.875 51.1 47.0458 61.2208 35 61.2208C22.9833 61.2208 13.125 51.1 13.125 38.7333V31.2375" stroke="currentColor" strokeWidth="5.33" strokeLinecap="round" />
    </svg>
  );
};

export default FrameIcon;
