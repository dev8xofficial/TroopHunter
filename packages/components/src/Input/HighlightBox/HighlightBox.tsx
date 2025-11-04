'use client';

import React, { ReactNode } from 'react';
import clsx from 'clsx';

import styles from './index.module.css';

type HighlightBoxProps = {
  variant: 'outlined' | 'contained';
  children?: ReactNode;
};

export const HighlightBox: React.FC<HighlightBoxProps> = ({ variant, children }) => {
  const variantClassName = clsx(variant === "contained" ? styles['contained'] : styles['outlined']);
  return (
    <div className={`${styles['highlightBox']} ${variantClassName}`}>
      {children}
    </div>
  );
};
