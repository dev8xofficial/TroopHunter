import React from 'react';

interface AsteriskIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const AsteriskIcon: React.FC<AsteriskIconProps> = ({ width = '', height = 'auto', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M38.8737 0.00621275H31.1263V25.6217L13.0221 7.51132L7.54238 12.991L25.6839 31.1263H0V38.8737H25.6776L7.54238 57.009L13.0221 62.4887L31.1201 44.3907V70H38.8675V44.3286L57.0276 62.4887L62.5073 57.009L44.3721 38.8737H70V31.1325H44.3907L62.526 12.9972L57.0462 7.51753L38.8737 25.6901V0.00621275Z" fill="currentColor" />
    </svg>
  );
};

export default AsteriskIcon;
