import { IBusinessCreationResponseAttributes } from './business';

export interface ILeadCreationRequestAttributes extends Omit<IBusinessCreationResponseAttributes, 'name' | 'longitude' | 'latitude' | 'geoPoint' | 'phoneId' | 'photos' | 'sourceId' | 'socialMedia'> {
  userId: string;
  title: string;
  search: string;
  phone?: string;
  sponsoredAd?: boolean;
  businessCount: number;
}

export interface ILeadCreationResponseAttributes extends ILeadCreationRequestAttributes {
  id: string;
}
