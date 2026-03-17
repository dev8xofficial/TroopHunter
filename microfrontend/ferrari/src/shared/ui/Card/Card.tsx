'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

type CardRootProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> & {
  asChild?: boolean;
};

const CardRoot = React.forwardRef<HTMLDivElement, CardRootProps>(({ asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      ref={ref}
      {...props}
      className={[
        'rounded-2xl border border-[var(--color-border-muted)] bg-[var(--color-surface-primary)] shadow-[var(--shadow-card)]',
        'text-[var(--color-text-primary)]',
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
});
CardRoot.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
  return <div ref={ref} {...props} className={['px-6 pt-6', props.className].filter(Boolean).join(' ')} />;
});
CardHeader.displayName = 'Card.Header';

const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
  return <div ref={ref} {...props} className={['px-6 py-5', props.className].filter(Boolean).join(' ')} />;
});
CardBody.displayName = 'Card.Body';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
  return <div ref={ref} {...props} className={['px-6 pb-6', props.className].filter(Boolean).join(' ')} />;
});
CardFooter.displayName = 'Card.Footer';

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter
});

