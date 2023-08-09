import { IBusinessPhoneResponseAttributes } from './BusinessPhone';
import { GeoPointAttributes } from './GeoPoint';
import { ITimezoneRequestAttributes } from './Timezone';

export interface IBusinessRequestAttributes {
  name: string;
  businessDomain?: string;
  categoryId?: string;
  address?: string;
  cityId: string;
  stateId: string;
  countryId: string;
  longitude: number;
  latitude: number;
  geoPoint?: GeoPointAttributes;
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
  BusinessPhone?: IBusinessPhoneResponseAttributes;
}

export interface IBusinessResponseAttributes extends IBusinessRequestAttributes {
  id: string;
}

export interface IBusinessCreationRequestAttributes extends Omit<IBusinessRequestAttributes, 'categoryId' | 'postalCodeId' | 'phoneId' | 'ratingId' | 'timezoneId' | 'sourceId' | 'openingHourId' | 'closingHourId'> {
  category?: string;
  postalCode?: string;
  phone?: string;
  rating?: number;
  timezone?: ITimezoneRequestAttributes;
  source?: string;
  openingHour?: string;
  closingHour?: string;
}

export interface IBusinessFetchRequestAttributes extends Omit<IBusinessRequestAttributes, 'name' | 'cityId' | 'stateId' | 'countryId' | 'longitude' | 'latitude' | 'sourceId' | 'openingHourId' | 'closingHourId'> {
  name?: string;
  cityId?: string;
  stateId?: string;
  countryId?: string;
  longitude?: number;
  latitude?: number;
  range?: string;
  phone?: string;
}
