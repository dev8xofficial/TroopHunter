export interface ISearchDrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  handleReset: () => void;
  closeSearchDrawer: () => void;
  handleChange: (name: string, value: string) => void;
}
