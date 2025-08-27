import React from 'react';

interface CardIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const CardIcon: React.FC<CardIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M56.2312 30.7538L39.2463 13.7689C36.9012 11.4238 33.0989 11.4238 30.7539 13.7689L13.769 30.7538C11.4238 33.0989 11.4238 36.9011 13.769 39.2462L30.7539 56.231C33.0989 58.5762 36.9012 58.5762 39.2463 56.231L56.2312 39.2462C58.5762 36.9011 58.5762 33.0989 56.2312 30.7538ZM47.7387 5.27651C40.7033 -1.75884 29.2967 -1.75884 22.2614 5.27651L5.27654 22.2614C-1.75885 29.2967 -1.75885 40.7033 5.27654 47.7386L22.2614 64.7234C29.2967 71.7589 40.7033 71.7589 47.7387 64.7234L64.7238 47.7386C71.7587 40.7033 71.7587 29.2967 64.7238 22.2614L47.7387 5.27651Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default CardIcon;
