import { BusinessAttributes } from './business';

export interface LeadAttributes extends Omit<BusinessAttributes, 'name' | 'longitude' | 'latitude' | 'geoPoint' | 'photos' | 'source' | 'socialMedia'> {
  id?: string;
  userId: string;
  title: string;
  search: string;
  sponsoredAd?: boolean;
  businessCount: number;
}
