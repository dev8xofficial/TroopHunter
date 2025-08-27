export interface IStats {
  name: string;
  amount: number;
}

export interface IStatisticsProps extends React.InputHTMLAttributes<HTMLInputElement> {
  statistics: IStats[];
}
