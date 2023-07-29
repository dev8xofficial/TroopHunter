export interface ILeadCreationRequestAttributes {
  userId: string;
  title: string;
  search?: string;
  categoryId?: string;
  address?: string;
  locationId?: string;
  postalCodeId?: string;
  phoneId?: string;
  email?: string;
  website?: string;
  ratingId?: string;
  reviews?: number;
  timezoneId?: string;
  sponsoredAd?: boolean;
  businessCount: number;
  openingHourId?: string;
  closingHourId?: string;
}

export interface ILeadCreationResponseAttributes extends ILeadCreationRequestAttributes {
  id: string;
}
