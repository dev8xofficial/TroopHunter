import { ChangeEvent } from 'react';

export interface TableSortingMenuOption {
  title: string;
  description: string;
  current: boolean;
  value: string;
  name: string;
}

export interface TableSortingMenu {
  options: TableSortingMenuOption[];
  value: TableSortingMenuOption | undefined;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
