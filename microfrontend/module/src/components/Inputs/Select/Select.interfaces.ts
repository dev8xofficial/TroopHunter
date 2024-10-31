export interface IOption {
  id: string;
  name: string;
  value: string;
}

export interface ISelectProps {
  label?: string;
  options: IOption[];
  value?: IOption | null;
  onChange?: (selectedOption: IOption) => void;
  disabled?: boolean;
}
