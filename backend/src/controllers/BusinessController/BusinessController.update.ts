import { Request, Response } from 'express';
import { ApiResponse } from 'common/interfaces/Response';
import Business from '../../models/Business';
import logger from '../../utils/logger';
import { createApiResponse } from 'common/utils/response';
import { BusinessMessageKey, getBusinessMessage } from '../../messages/Business';
import { IBusinessRequestAttributes } from 'common/interfaces/Business';

export const updateBusiness = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { name, businessDomain, categoryId, address, cityId, stateId, countryId, longitude, latitude, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, sourceId, socialMediaId, sponsoredAd, openingHourId, closingHourId }: IBusinessRequestAttributes = req.body;
    const geoPoint = { type: 'Point', coordinates: [longitude, latitude], crs: { type: 'name', properties: { name: 'EPSG:4326' } } };

    const business = await Business.findByPk(id);

    if (business) {
      if (name) business.name = name;
      if (businessDomain) business.businessDomain = businessDomain;
      if (categoryId) business.categoryId = categoryId;
      if (address) business.address = address;
      if (cityId) business.cityId = cityId;
      if (stateId) business.stateId = stateId;
      if (countryId) business.countryId = countryId;
      if (longitude) business.longitude = longitude;
      if (latitude) business.latitude = latitude;
      if (geoPoint) business.geoPoint = geoPoint;
      if (postalCodeId) business.postalCodeId = postalCodeId;
      if (phoneId) business.phoneId = phoneId;
      if (email) business.email = email;
      if (website) business.website = website;
      if (ratingId) business.ratingId = ratingId;
      if (reviews) business.reviews = reviews;
      if (timezoneId) business.timezoneId = timezoneId;
      if (sourceId) business.sourceId = sourceId;
      if (sponsoredAd) business.sponsoredAd = sponsoredAd;
      if (socialMediaId) business.socialMediaId = socialMediaId;
      if (openingHourId) business.openingHourId = openingHourId;
      if (closingHourId) business.closingHourId = closingHourId;

      await business.save();

      logger.info(`Business with ID ${id} updated successfully.`);
      const response: ApiResponse<{ business: Business }> = createApiResponse({ success: true, data: { business }, message: getBusinessMessage(BusinessMessageKey.BUSINESS_UPDATED).message, status: getBusinessMessage(BusinessMessageKey.BUSINESS_UPDATED).code });
      res.json(response);
    } else {
      logger.warn(`Business with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.BUSINESS_NOT_FOUND).message, status: getBusinessMessage(BusinessMessageKey.BUSINESS_NOT_FOUND).code });
      res.json(response);
    }
  } catch (error) {
    logger.error(`Error updating business with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.FAILED_TO_UPDATE_BUSINESS).message, status: getBusinessMessage(BusinessMessageKey.FAILED_TO_UPDATE_BUSINESS).code });
    res.json(response);
  }
};
