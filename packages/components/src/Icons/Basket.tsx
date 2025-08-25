import React from 'react';

interface BasketIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const BasketIcon: React.FC<BasketIconProps> = ({ width = '', height = '', className }) => {
  return (
    <svg {...(width ? { width } : {})} {...(height ? { height } : {})} {...(height ? { height } : {})} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M41.4924 8.17905C40.3318 5.0218 41.9639 1.5264 45.1379 0.371878C48.3119 -0.782647 51.8258 0.840897 52.9864 3.99816L59.3484 21.3046H63.8774C67.8586 21.3046 70.7799 25.0261 69.8143 28.8679L60.6354 65.3897C59.9544 68.099 57.5068 70 54.6989 70H15.3009C12.4931 70 10.0455 68.099 9.36448 65.3897L0.185718 28.8679C-0.779808 25.0261 2.14123 21.3046 6.12217 21.3046H9.87243L17.0886 3.78292C18.3699 0.672142 21.9436 -0.816527 25.0709 0.457905C28.1981 1.73234 29.6947 5.28725 28.4135 8.39805L23.098 21.3046H46.3175L41.4924 8.17905ZM13.9595 33.4785L20.0787 57.8261H49.9212L56.0404 33.4785H13.9595Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default BasketIcon;
