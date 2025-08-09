export interface IDrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  closeDrawer: () => void;
  draftLeadBusinessIds: string[] | undefined;
  leadPageRemoveSavedBusinesses: boolean;
  handleChange: (name: string, value: string) => void;
}
