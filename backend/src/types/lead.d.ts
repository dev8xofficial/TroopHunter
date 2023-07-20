import { BusinessAttributes } from './rbusiness';

export interface LeadAttributes extends Omit<BusinessAttributes, 'name' | 'photos' | 'source' | 'socialMedia'> {
  id?: string;
  userId: string;
  search?: string;
}
