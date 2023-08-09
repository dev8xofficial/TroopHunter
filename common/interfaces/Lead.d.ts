import { IBusinessResponseAttributes } from './Business';

export interface ILeadRequestAttributes extends Omit<IBusinessResponseAttributes, 'name' | 'cityId' | 'stateId' | 'countryId' | 'longitude' | 'latitude' | 'geoPoint' | 'phoneId' | 'sourceId'> {
  userId: string;
  businessIds?: string[];
  title: string;
  search: string;
  phone?: string;
  cityId?: string;
  stateId?: string;
  countryId?: string;
  sponsoredAd?: boolean;
  businessCount: number;
}

export interface ILeadResponseAttributes extends ILeadRequestAttributes {
  id: string;
}
