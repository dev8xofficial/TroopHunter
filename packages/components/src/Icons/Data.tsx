import React from 'react';

interface DataIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const DataIcon: React.FC<DataIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M28.6484 15.6018L25.7381 1.23047C17.6274 3.61014 10.3988 8.8999 5.81055 15.7772L18.5049 23.0954C20.9777 19.6585 24.5052 17.0138 28.6484 15.6018Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M14.6334 35.0031C14.6334 32.0931 15.2498 29.183 16.4863 26.5382L3.79191 19.22C1.32251 24.0689 0 29.5341 0 34.9993C0 41.5219 1.76335 47.8727 5.20047 53.3379L17.193 44.9625C15.6018 41.9664 14.6334 38.5297 14.6334 35.0031Z" fill="currentColor" fillOpacity="0.5" />
      <path d="M19.4726 48.1355L7.39453 56.5109C11.3621 61.4496 16.5622 65.3269 22.383 67.6211L26.967 53.6906C24.0567 52.4578 21.5011 50.5186 19.4726 48.1355Z" fill="currentColor" fillOpacity="0.8" />
      <path d="M35.0877 0C33.2347 0 31.2958 0.175637 29.4464 0.440811L32.3566 14.8122C33.2383 14.7226 34.2095 14.6365 35.0912 14.6365C46.3775 14.6365 55.5452 23.8036 55.5452 35.0892C55.5417 46.3714 46.374 55.453 35.0877 55.453C33.5895 55.453 32.0914 55.2774 30.5897 54.9227L26.0918 68.8532C29.002 69.6453 31.9983 70 34.9984 70C54.3054 70 70.0002 54.3062 70.0002 35.0005C70.0037 15.6947 54.3954 0 35.0877 0Z" fill="currentColor" />
    </svg>
  );
};

export default DataIcon;
