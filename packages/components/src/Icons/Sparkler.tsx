import React from 'react';

interface SparklerIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const SparklerIcon: React.FC<SparklerIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M29.0498 16.0127L35.0874 18.4335C36.6624 19.0752 36.6624 20.096 35.0874 20.7377L29.0498 23.1585L26.629 29.225C25.9873 30.7417 24.9665 30.7417 24.3248 29.225L21.904 23.1585L15.8665 20.7377C14.3498 20.096 14.3498 19.0752 15.8665 18.4335L21.904 16.0127L24.3248 9.94605C24.9665 8.34188 25.9873 8.34188 26.629 9.94605L29.0498 16.0127Z" stroke="black" strokeWidth="3.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M51.1001 34.5335L57.1376 36.9547C58.7126 37.5963 58.7126 38.6169 57.1376 39.2585L51.1001 41.6797L48.6793 47.746C48.0376 49.2627 47.0168 49.2627 46.3751 47.746L43.9543 41.6797L37.9168 39.2585C36.4001 38.6169 36.4001 37.5963 37.9168 36.9547L43.9543 34.5335L46.3751 28.467C47.0168 26.8629 48.0376 26.8629 48.6793 28.467L51.1001 34.5335Z" fill="currentColor" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23.9457 48.9417L29.1373 51.0125C30.5082 51.5667 30.5082 52.4417 29.1373 52.9959L23.9457 55.0667L21.8748 60.2584C21.3207 61.5709 20.4457 61.5709 19.8915 60.2584L17.8207 55.0667L12.629 52.9959C11.3457 52.4417 11.3457 51.5667 12.629 51.0125L17.8207 48.9417L19.8915 43.75C20.4457 42.3792 21.3207 42.3792 21.8748 43.75L23.9457 48.9417Z" stroke="black" strokeWidth="3.33" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default SparklerIcon;
