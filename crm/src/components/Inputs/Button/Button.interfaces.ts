export interface IButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  rounded?: boolean;
  className?: string;
  loading?: boolean;
  variant?: 'text' | 'contained' | 'outlined';
  color?: 'indigo' | 'red';
  disabled?: boolean;
  onClick?: () => void;
  style?: {};
  children?: React.ReactNode;
}
