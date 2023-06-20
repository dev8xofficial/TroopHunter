import Business from '../models/Business';
import { BusinessAttributes } from '../business';

export const createBusiness = async ({ name, description, categoryId, address, locationId, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, sourceId, operatingStatusId, socialMediaId, openingHourId, closingHourId }: BusinessAttributes) => {
  const business = await Business.create({ name, description, categoryId, address, locationId, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, sourceId, operatingStatusId, socialMediaId, openingHourId, closingHourId });

  return business;
};

export const getBusinessById = async (businessId: number) => {
  const business = await Business.findByPk(businessId);

  return business;
};

export const updateBusiness = async ({ id, name, description, categoryId, address, locationId, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, sourceId, operatingStatusId, socialMediaId, openingHourId, closingHourId }: BusinessAttributes) => {
  const business = await Business.findByPk(id);

  if (business) {
    business.name = name;
    business.description = description;
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
    business.operatingStatusId = operatingStatusId;
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
