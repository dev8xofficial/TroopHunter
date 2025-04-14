export interface IIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: JSX.Element;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'text' | 'contained' | 'outlined';
  color?: 'primary' | 'indigo' | 'indigo-light' | 'red' | 'gray' | 'gray-light' | 'gray-dark' | 'white';
  ringOffset?: 'gray' | 'white';
  buttonRef?: React.RefObject<HTMLButtonElement>;
}
