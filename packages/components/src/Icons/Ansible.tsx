import React from 'react';

interface AnsibleIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const AnsibleIcon: React.FC<AnsibleIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 77" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g clipPath="url(#clip0_4_811)">
        <path d="M35.1612 14.9962L53.8855 59.6872L25.6821 38.2261L35.1612 14.9962ZM68.3968 70.064L39.6082 2.96863C37.9728 -0.960574 32.2907 -1.01841 30.5972 2.96863L-1 76.4316H9.76644L22.2883 46.1266L59.6198 75.3703C63.8513 79.3921 70.7376 75.3391 68.3968 70.064Z" fill="currentColor" />
      </g>
      <defs>
        <clipPath id="clip0_4_811">
          <rect width="70" height="77" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default AnsibleIcon;
