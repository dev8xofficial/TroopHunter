import { GeoPointAttributes } from '../../types/GeoPoint';

export interface BusinessAttributes {
  id?: string;
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
