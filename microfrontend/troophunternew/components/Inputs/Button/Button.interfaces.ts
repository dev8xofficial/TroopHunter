export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: React.RefObject<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset' | undefined;
  rounded?: boolean;
  className?: string;
  loading?: boolean;
  variant?: 'text' | 'contained' | 'outlined';
  color?: 'indigo' | 'red' | 'gray';
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
