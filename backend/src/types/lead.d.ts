// export interface UserAttributes {
//   id?: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   role?: string;
// }

// export interface BusinessAttributes {
//   id?: number;
//   name: string;
//   description?: string;
//   category?: string;
//   address?: string;
//   city?: string;
//   state?: string;
//   country?: string;
//   postalCode?: string;
//   phone?: string;
//   email?: string;
//   website?: string;
//   rating?: number;
//   reviews?: number;
//   timezone?: string;
//   photos?: string[];
//   source: string;
//   operatingStatus?: 'open' | 'closed' | 'temporarily closed';
//   socialMedia?: string[];
//   openingTime?: string;
//   closingTime?: string;
// }

// export interface LeadAttributes extends Omit<BusinessAttributes, 'name' | 'description' | 'photos' | 'source' | 'socialMedia'> {
//   id?: number;
//   title: string;
//   owner?: UserAttributes;
// }

export interface LeadAttributes extends Omit<BusinessAttributes, 'name' | 'description' | 'photos' | 'source' | 'socialMedia'> {
  id?: number;
  title: string;
  ownerId: number;
}
