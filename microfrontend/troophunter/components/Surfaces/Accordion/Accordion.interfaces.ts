export interface IAccordionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  name: string;
  value: string;
  handleChange: (name: string, value: string) => void;
}
