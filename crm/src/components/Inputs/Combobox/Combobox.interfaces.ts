import { type ChangeEvent } from 'react';

export interface ILocationComboboxProps {
  label?: string;
  type: 'country' | 'state' | 'city'; // New prop to specify the type of location
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface ILocationComboboxOption {
  id: string;
  name: string;
  value: string;
  code: string;
}
