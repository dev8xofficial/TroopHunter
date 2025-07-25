/* eslint-disable prettier/prettier */
import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { Magnet } from '../../Animations/Magnet';

import ContactFormModalStyles from '../../Modals/ContactFormModal/index.module.css';
import styles from './index.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'white' | 'transparent';
type ButtonSize = 'default' | 'large';
type Page = 'contact';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  context?: Page;
  fullWidth?: boolean;
  buttonClassName?: string;
  spanClassName?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, variant, size, startIcon, endIcon, context, fullWidth, buttonClassName, spanClassName, onClick, type = 'button', disabled, isLoading }): JSX.Element => {
  const buttonWrapperClassNames = clsx(styles['button-wrapper'], fullWidth && 'col-full', buttonClassName);
  const spanClassNames = clsx(styles.button, (startIcon || endIcon) && styles['button--icon'], styles[`button--bg-${variant}`], context === 'contact' && (type === 'submit' ? ContactFormModalStyles['contact-submit'] : ContactFormModalStyles['contact-button']), size === 'large' && ContactFormModalStyles['large-button'], spanClassName);

  return (
    <button className={buttonWrapperClassNames} onClick={onClick} type={type} disabled={disabled}>
      <Magnet className={spanClassNames} disabled={fullWidth || disabled}>
        {isLoading ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150" width="40">
            <path fill="none" stroke="currentColor" strokeWidth="15" strokeLinecap="round" strokeDasharray="300 385" strokeDashoffset="0" d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z">
              <animate attributeName="stroke-dashoffset" calcMode="spline" dur="2s" values="685;-685" keySplines="0 0 1 1" repeatCount="indefinite" />
            </path>
          </svg>
        ) : (
          <>
            {startIcon && startIcon}
            {children}
            {endIcon && endIcon}
          </>
        )}
      </Magnet>
    </button>
  );
};
