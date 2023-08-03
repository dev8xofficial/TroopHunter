import { BusinessAttributes } from '../Business/Business.interface';

export interface LeadAttributes extends Omit<BusinessAttributes, 'name' | 'longitude' | 'latitude' | 'geoPoint' | 'phoneId' | 'photos' | 'sourceId' | 'socialMedia'> {
  id?: string;
  userId: string;
  businessIds?: string[];
  title: string;
  search: string;
  phone?: string;
  sponsoredAd?: boolean;
  businessCount: number;
}
