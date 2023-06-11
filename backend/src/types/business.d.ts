export interface BusinessAttributes {
  id?: string;
  name: string;
  description?: string;
  category?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  website?: string;
  rating?: number;
  reviews?: number;
  timezone?: string;
  photos?: string[];
  source: string;
  operatingStatus?: 'open' | 'closed' | 'temporarily closed';
  socialMedia?: string[];
  openingTime?: string;
  closingTime?: string;
}
