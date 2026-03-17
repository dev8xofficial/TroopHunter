'use client';

import * as React from 'react';
import { InputHeadless, type InputHeadlessProps } from '@/shared/ui/headless';

type InputSize = 'sm' | 'md' | 'lg';
type InputState = 'default' | 'error' | 'disabled';

export interface InputProps
  extends Omit<InputHeadlessProps, 'disabled' | 'containerClassName' | 'labelClassName' | 'inputClassName'> {
  size?: InputSize;
  state?: InputState;
}

const sizeClasses: Record<InputSize, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-3.5 py-2.5 text-sm',
  lg: 'px-4 py-3 text-base'
};

const stateClasses: Record<InputState, string> = {
  default: 'border-[var(--color-input-border)] focus-visible:ring-[var(--color-input-ring)]',
  error: 'border-[var(--color-input-border-error)] focus-visible:ring-[var(--color-input-ring-error)]',
  disabled: 'border-[var(--color-input-border)]'
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ size = 'md', state = 'default', ...props }, ref) => {
  const disabled = state === 'disabled';

  return (
    <InputHeadless
      ref={ref}
      {...props}
      disabled={disabled}
      containerClassName="flex flex-col gap-1"
      labelClassName="text-sm font-medium text-[var(--color-text-primary)]"
      inputClassName={[
        'w-full rounded-xl border bg-[var(--color-input-bg)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none transition',
        'focus-visible:ring-2 focus-visible:ring-offset-2',
        sizeClasses[size],
        stateClasses[state],
        disabled ? 'pointer-events-none opacity-50' : ''
      ].join(' ')}
    />
  );
});

Input.displayName = 'Input';

