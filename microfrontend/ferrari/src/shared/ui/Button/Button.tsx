import { cn } from '@/shared/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const variants = {
  primary: 'bg-[var(--ferrari-dark)] text-white hover:opacity-90',
  secondary: 'bg-white text-[var(--ferrari-dark)] border border-black/10 hover:bg-black/5',
  ghost: 'bg-transparent text-[var(--ferrari-dark)] hover:bg-black/5'
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base'
};

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button className={cn('inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ferrari-dark)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none', variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
