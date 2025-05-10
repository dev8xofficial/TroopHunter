import React from 'react';

interface AnalysisIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const AnalysisIcon: React.FC<AnalysisIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M39.4623 39.6085L30.3623 30.3916" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M61.25 26.1914L48.125 39.3165" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.75 43.7794L22.225 30.3044" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M49.5834 8.75H20.4167C13.9733 8.75 8.75 13.9733 8.75 20.4167V49.5834C8.75 56.0267 13.9733 61.25 20.4167 61.25H49.5834C56.0267 61.25 61.25 56.0267 61.25 49.5834V20.4167C61.25 13.9733 56.0267 8.75 49.5834 8.75Z" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M31.0625 27.1249C31.0625 28.2333 30.6543 29.2833 29.9834 30.0415C29.1668 31.0915 27.9125 31.7333 26.4542 31.7333C24.85 31.7333 23.4792 30.9458 22.6626 29.7208C22.1376 28.9915 21.875 28.0874 21.875 27.154C21.875 24.6166 23.9167 22.575 26.4834 22.575C29.05 22.575 31.0625 24.6166 31.0625 27.154V27.1249Z" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M48.125 42.8747C48.125 45.4122 46.0832 47.4541 43.5166 47.4541C40.95 47.4541 38.9375 45.4122 38.9375 42.8747C38.9375 41.8541 39.2875 40.9207 39.8707 40.1625C40.6875 39.025 42 38.2957 43.5457 38.2957C45.0916 38.2957 46.5207 39.0832 47.3375 40.3082C47.8625 41.0375 48.125 41.9416 48.125 42.8747Z" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default AnalysisIcon;
