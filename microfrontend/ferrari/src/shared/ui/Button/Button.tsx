import * as React from 'react';
import { ButtonHeadless, type ButtonHeadlessProps } from '@/shared/ui/headless';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ButtonHeadlessProps, 'className'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[var(--color-btn-primary-bg)] text-[var(--color-btn-primary-text)] hover:opacity-90',
  secondary:
    'bg-[var(--color-btn-secondary-bg)] text-[var(--color-btn-secondary-text)] border border-[var(--color-btn-secondary-border)] hover:bg-[var(--color-btn-secondary-hover-bg)]',
  ghost: 'bg-transparent text-[var(--color-btn-ghost-text)] hover:bg-[var(--color-btn-ghost-hover-bg)]'
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base'
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ variant = 'primary', size = 'md', ...props }, ref) => {
  return (
    <ButtonHeadless
      ref={ref}
      {...props}
      className={[
        'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size]
      ].join(' ')}
    />
  );
});

Button.displayName = 'Button';
