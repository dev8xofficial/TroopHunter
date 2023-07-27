export interface ICheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name?: string;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  defaultChecked?: boolean;
  className?: string;
}
