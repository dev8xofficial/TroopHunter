export interface IActionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  submit?: (title: string) => void | undefined;
}
