export interface ILead {
  id?: string;
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
  openingHourId?: string;
  closingHourId?: string;
}
