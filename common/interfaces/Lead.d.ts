import { IBusinessResponseAttributes } from './Business';

export interface ILeadAttributesRequestAttributes extends Omit<IBusinessResponseAttributes, 'name' | 'longitude' | 'latitude' | 'geoPoint' | 'phoneId' | 'sourceId'> {
  userId: string;
  businessIds?: string[];
  title: string;
  search: string;
  phone?: string;
  sponsoredAd?: boolean;
  businessCount: number;
}

export interface ILeadAttributesResponseAttributes extends ILeadAttributesRequestAttributes {
  id: string;
}
