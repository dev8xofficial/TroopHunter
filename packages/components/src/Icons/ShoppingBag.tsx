import React from 'react';

interface ShoppingBagIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const ShoppingBagIcon: React.FC<ShoppingBagIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M23.6543 25.4042L24.7335 16.5083C25.3169 11.6958 29.8669 8.25413 34.9126 8.80831C39.9584 9.36246 43.5751 13.7083 42.9919 18.5208L42.0876 26.075" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M49.3498 21.875L46.783 61.25L12.5998 57.7208C11.0248 57.5458 9.9456 56.0875 10.2956 54.5417L17.4706 21.875H49.3498Z" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M58.6251 53.2293L46.7544 61.25L49.3209 21.875L57.2544 24.4125L59.7626 50.8082C59.8501 51.7707 59.4126 52.675 58.6251 53.2293Z" stroke="black" strokeWidth="6.33" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default ShoppingBagIcon;
