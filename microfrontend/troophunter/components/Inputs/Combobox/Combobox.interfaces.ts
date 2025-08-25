export interface ILocationComboboxProps {
  label?: string;
  type: 'country' | 'state' | 'city'; // New prop to specify the type of location
  value: string;
  onChange: (name: string, value: string) => void;
}

export interface ILocationComboboxOption {
  id: string;
  name: string;
  value: string;
  code: string;
}
