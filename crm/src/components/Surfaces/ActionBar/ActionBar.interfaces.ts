export interface IActionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  leadSubmit?: (title: string) => void | undefined;
}
