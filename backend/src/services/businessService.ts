import Business from '../models/Business/Business';
import { BusinessAttributes } from '../models/Business/Business.interface';

export const createBusiness = async ({ name, businessDomain, categoryId, address, locationId, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, sourceId, socialMediaId, openingHourId, closingHourId }: BusinessAttributes) => {
  const business = await Business.create({ name, businessDomain, categoryId, address, locationId, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, sourceId, socialMediaId, openingHourId, closingHourId });

  return business;
};

export const getBusinessById = async (businessId: number) => {
  const business = await Business.findByPk(businessId);

  return business;
};

export const updateBusiness = async ({ id, name, businessDomain, categoryId, address, locationId, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, sourceId, socialMediaId, openingHourId, closingHourId }: BusinessAttributes) => {
  const business = await Business.findByPk(id);

  if (business) {
    business.name = name;
    business.businessDomain = businessDomain;
    business.categoryId = categoryId || '';
    business.address = address;
    business.locationId = locationId || '';
    business.postalCodeId = postalCodeId || '';
    business.phoneId = phoneId;
    business.email = email;
    business.website = website;
    business.ratingId = ratingId;
    business.reviews = reviews;
    business.timezoneId = timezoneId;
    business.sourceId = sourceId || '';
    business.socialMediaId = socialMediaId;
    business.openingHourId = openingHourId || '';
    business.closingHourId = closingHourId || '';

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
