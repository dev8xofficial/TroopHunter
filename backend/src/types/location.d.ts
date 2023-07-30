export interface LocationAttributes {
  id?: string;
  city: string;
  state: string;
  country: string;
  importance: 'Low' | 'Medium' | 'High';
}
