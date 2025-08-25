import React from 'react';

interface WandIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const WandIcon: React.FC<WandIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M37.8584 16.5374V8.75" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M53.4624 32.0833H61.2499" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M54.3958 48.5916L48.8833 43.0793" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26.8627 21.0584L21.3501 15.5752" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M48.8833 21.0291L54.3958 15.5166" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M37.9458 40.3373C40.2208 38.0623 40.2208 34.3582 37.9458 32.0832C35.6415 29.8082 31.9665 29.8082 29.6624 32.0832L10.4708 51.3041C8.16664 53.5791 8.16664 57.2832 10.4708 59.5582C12.7458 61.8332 16.4498 61.8332 18.7248 59.5582L37.9458 40.3373Z" stroke="black" strokeWidth="6.33" strokeMiterlimit="10" strokeLinecap="round" />
    </svg>
  );
};

export default WandIcon;
