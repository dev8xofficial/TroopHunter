'use client';

import React from 'react';

interface DataIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const DataIcon: React.FC<DataIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 72 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M19.4726 48.1356L7.39453 56.511C11.3621 61.4497 16.5622 65.327 22.383 67.6212L26.967 53.6907C24.0567 52.4578 21.5011 50.5187 19.4726 48.1356Z" fill="currentcolor" fill-opacity="0.8" />
      <path d="M30.6484 14.3714L27.7381 0C19.6274 2.37967 12.3988 7.66943 7.81055 14.5468L20.5049 21.865C22.9777 18.428 26.5052 15.7833 30.6484 14.3714Z" fill="currentcolor" fill-opacity="0.2" />
      <path d="M14.6334 33.7832C14.6334 30.8731 15.2498 27.9631 16.4863 25.3182L3.79191 18C1.32251 22.8489 0 28.3141 0 33.7793C0 40.3019 1.76335 46.6527 5.20047 52.118L17.193 43.7425C15.6018 40.7464 14.6334 37.3098 14.6334 33.7832Z" fill="currentcolor" fill-opacity="0.5" />
      <path d="M37.0877 0C35.2347 0 33.2958 0.175637 31.4464 0.440811L34.3566 14.8122C35.2383 14.7226 36.2095 14.6365 37.0912 14.6365C48.3775 14.6365 57.5452 23.8036 57.5452 35.0892C57.5417 46.3714 48.374 55.453 37.0877 55.453C35.5895 55.453 34.0914 55.2774 32.5897 54.9227L28.0918 68.8532C31.002 69.6453 33.9983 70 36.9984 70C56.3054 70 72.0002 54.3062 72.0002 35.0005C72.0037 15.6947 56.3954 0 37.0877 0Z" fill="currentcolor" />
    </svg>
  );
};

export default DataIcon;
