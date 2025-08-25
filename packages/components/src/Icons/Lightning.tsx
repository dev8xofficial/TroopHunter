import React from 'react';

interface LightningIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const LightningIcon: React.FC<LightningIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 78 113" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M50.6683 4L4.69528 57.5266C4.3342 57.951 4.10229 58.4699 4.02686 59.0219C3.95142 59.574 4.0357 60.136 4.26971 60.6416C4.5038 61.1473 4.87774 61.5753 5.34741 61.8751C5.81709 62.1749 6.36282 62.3339 6.92009 62.3334H27.3317V109L73.3047 55.4734C73.6653 55.0495 73.8972 54.5313 73.9729 53.98C74.0486 53.4287 73.9649 52.8673 73.7319 52.3619C73.4988 51.8566 73.126 51.4284 72.6575 51.128C72.189 50.8276 71.6443 50.6676 71.0877 50.6666H50.6683V4Z" stroke="currentColor" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default LightningIcon;
