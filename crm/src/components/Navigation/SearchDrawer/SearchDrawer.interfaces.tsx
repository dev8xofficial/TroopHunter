export interface ISearchDrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  closeSearchDrawer: () => void;
  handleChange: (name: string, value: string) => void;
}
