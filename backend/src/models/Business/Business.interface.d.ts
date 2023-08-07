import { GeoPointAttributes } from '../../types/GeoPoint.interface';

export interface IBusinessRequestAttributes {
  name: string;
  businessDomain?: string;
  categoryId?: string;
  address?: string;
  cityId?: string;
  stateId?: string;
  countryId?: string;
  longitude: number;
  latitude: number;
  geoPoint: GeoPointAttributes;
  postalCodeId?: string;
  phoneId?: string;
  email?: string;
  website?: string;
  ratingId?: string;
  reviews?: number;
  timezoneId?: string;
  sourceId?: string;
  socialMediaId?: string;
  sponsoredAd?: boolean;
  openingHourId?: string;
  closingHourId?: string;
}

export interface IBusinessResponseAttributes extends IBusinessRequestAttributes {
  id: string;
}

export interface IBusinessCreationRequestAttributes extends Omit<IBusinessRequestAttributes, 'categoryId' | 'cityId' | 'stateId' | 'countryId' | 'postalCodeId' | 'phoneId' | 'ratingId' | 'timezoneId' | 'sourceId' | 'openingHourId' | 'closingHourId'> {
  category?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  phone?: string;
  rating?: number;
  timezone?: ITimezoneRequestAttributes;
  source?: string;
  openingHour?: string;
  closingHour?: string;
}

export interface IBusinessFetchRequestAttributes extends IBusinessRequestAttributes {
  cityName?: string;
  stateName?: string;
  countryName?: string;
  range?: string;
  phone?: string;
}
