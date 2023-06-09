export interface IMenuOption {
  name: string;
  href?: string;
  onClick?: () => void;
}

export interface IMenuProps extends React.MenuHTMLAttributes<HTMLMenuElement> {
  children?: JSX.Element | string;
  options: IMenuOption[];
  className?: string;
}
