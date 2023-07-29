import { IBusinessPhoneCreationResponseAttributes } from './businessPhone';

export interface IBusinessCreationRequestAttributes {
  name: string;
  businessDomain?: string;
  categoryId?: string;
  address?: string;
  locationId?: string;
  longitude?: number;
  latitude?: number;
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
  BusinessPhone?: IBusinessPhoneCreationResponseAttributes;
}

export interface IBusinessCreationResponseAttributes extends IBusinessCreationRequestAttributes {
  id: string;
}
