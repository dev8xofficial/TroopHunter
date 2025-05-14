/* eslint-disable prettier/prettier */
import React, { ReactNode } from 'react';
import clsx from 'clsx';

import ContactFormModalStyles from '../ContactFormModal/index.module.css';
import styles from './index.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'white' | 'transparent';
type ButtonSize = 'default' | 'large';
type Page = 'contact';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: boolean;
  page?: Page;
  buttonClassName?: string;
  spanClassName?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, variant, size, icon, page, buttonClassName, spanClassName, onClick, type, disabled }): JSX.Element => {
  const spanClassNames = clsx(styles.button, icon && styles['button--icon'], styles[`button--bg-${variant}`], page === 'contact' && ContactFormModalStyles['contact-button'], size === 'large' && ContactFormModalStyles['large-button'], spanClassName);

  return (
    <button className={`${styles['button-wrapper']} ${buttonClassName}`} onClick={onClick} type={type} disabled={disabled}>
      <span className={spanClassNames}>{children}</span>
    </button>
  );
};
