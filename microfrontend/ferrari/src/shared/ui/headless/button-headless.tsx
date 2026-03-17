'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

export interface ButtonHeadlessProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const ButtonHeadless = React.forwardRef<HTMLButtonElement, ButtonHeadlessProps>(({ asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp ref={ref} {...props} />;
});

ButtonHeadless.displayName = 'ButtonHeadless';

