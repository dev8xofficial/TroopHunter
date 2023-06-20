import Business from '../models/RBusiness';

export const createBusiness = async (
  id: number,
  name: string,
  description: string,
  category: string,
  address: string,
  city: string,
  state: string,
  country: string,
  postalCode: string,
  phone: string,
  email: string,
  website: string,
  rating: number,
  reviews: number,
  timezone: string,
  photos: string[],
  source: string,
  operatingStatus: 'open' | 'closed' | 'temporarily closed',
  socialMedia: string[],
  openingHour: string,
  closingHour: string
) => {
  const business = await Business.create({
    id: id,
    name,
    description,
    category,
    address,
    city,
    state,
    country,
    postalCode,
    phone,
    email,
    website,
    rating,
    reviews,
    timezone,
    photos,
    source,
    operatingStatus,
    socialMedia,
    openingHour,
    closingHour,
  });

  return business;
};

export const getBusinessById = async (businessId: number) => {
  const business = await Business.findByPk(businessId);

  return business;
};

export const updateBusiness = async (
  id: number,
  name: string,
  description: string,
  category: string,
  address: string,
  city: string,
  state: string,
  country: string,
  postalCode: string,
  phone: string,
  email: string,
  website: string,
  rating: number,
  reviews: number,
  timezone: string,
  photos: string[],
  source: string,
  operatingStatus: 'open' | 'closed' | 'temporarily closed',
  socialMedia: string[],
  openingHour: string,
  closingHour: string
) => {
  const business = await Business.findByPk(id);

  if (business) {
    business.id = id;
    business.name = name;
    business.description = description;
    business.category = category;
    business.address = address;
    business.city = city;
    business.state = state;
    business.country = country;
    business.postalCode = postalCode;
    business.phone = phone;
    business.email = email;
    business.website = website;
    business.rating = rating;
    business.reviews = reviews;
    business.timezone = timezone;
    (business.photos = photos), (business.source = source), (business.operatingStatus = operatingStatus), (business.socialMedia = socialMedia), (business.openingHour = openingHour), (business.closingHour = closingHour);

    await business.save();

    return business;
  }

  return null;
};

export const deleteBusiness = async (businessId: number) => {
  const business = await Business.findByPk(businessId);

  if (business) {
    await business.destroy();
  }

  return null;
};

// Add more service functions as needed
