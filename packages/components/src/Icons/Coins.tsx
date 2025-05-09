import React from 'react';

interface CoinsIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const CoinsIcon: React.FC<CoinsIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M61.25 35V50.75C61.25 56.525 56.525 61.25 50.75 61.25H19.2499C13.4749 61.25 8.75 56.525 8.75 50.75V19.25C8.75 13.475 13.4749 8.75 19.2499 8.75H35" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M53.9578 26.7457L41.9996 38.7042C41.4746 39.2292 40.8621 39.5207 40.1328 39.5792L32.9871 40.25C31.1203 40.425 29.5453 38.8207 29.7203 36.9542L30.3621 30.0125C30.4203 29.2832 30.7121 28.6417 31.2371 28.1457L43.3121 16.0708L53.9578 26.7457Z" stroke="black" strokeWidth="6.33" strokeLinejoin="round" />
      <path d="M60.374 20.3584L53.9575 26.746L43.3115 16.0709L49.699 9.68336C50.8658 8.51668 52.7908 8.51668 53.9575 9.68336L60.374 16.0709C61.5115 17.2375 61.5115 19.1917 60.374 20.3584Z" stroke="black" strokeWidth="6.33" strokeLinejoin="round" />
    </svg>
  );
};

export default CoinsIcon;
