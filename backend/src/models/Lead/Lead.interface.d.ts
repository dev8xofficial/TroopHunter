import { BusinessAttributes } from '../Business/Business.interface';

export interface LeadAttributes extends Omit<BusinessAttributes, 'name' | 'longitude' | 'latitude' | 'geoPoint' | 'phoneId' | 'sourceId'> {
  id?: string;
  userId: string;
  businessIds?: string[];
  title: string;
  search: string;
  phone?: string;
  sponsoredAd?: boolean;
  businessCount: number;
}
