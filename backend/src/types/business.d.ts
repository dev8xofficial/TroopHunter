import { GeoPoint } from './geoPoint';

export interface BusinessAttributes {
  id?: string;
  name: string;
  description?: string;
  categoryId?: string;
  address?: string;
  locationId?: string;
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
  operatingStatusId?: string;
  socialMediaId?: string;
  openingHourId?: string;
  closingHourId?: string;
}
