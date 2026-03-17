'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

export type InputHeadlessProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  id: string;
  label?: React.ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
};

export const InputHeadless = React.forwardRef<HTMLInputElement, InputHeadlessProps>(
  ({ id, label, containerClassName, labelClassName, inputClassName, ...props }, ref) => {
  return (
    <div className={containerClassName}>
      {label != null ? (
        <LabelPrimitive.Root className={labelClassName} htmlFor={id}>
          {label}
        </LabelPrimitive.Root>
      ) : null}
      <input ref={ref} id={id} className={inputClassName} {...props} />
    </div>
  );
  }
);

InputHeadless.displayName = 'InputHeadless';

export const Label = LabelPrimitive.Root;

