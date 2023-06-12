import { BusinessAttributes } from './business';

export interface LeadAttributes extends Omit<BusinessAttributes, 'name' | 'description' | 'photos' | 'source' | 'socialMedia'> {
  id?: string;
  title?: string;
  ownerId: string;
  search?: string;
  keywords?: string;
}
