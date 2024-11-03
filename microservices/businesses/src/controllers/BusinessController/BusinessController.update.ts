import { BusinessMessageKey, getBusinessMessage } from '@repo/messages';
import { logger } from '@repo/utils';
import { type ApiResponse, createApiResponse, type IBusinessAttributes, type IBusinessFetchByIdRequestAttributes } from '@repo/validator';
import { type Request, type Response } from 'express';

import { Business } from '../../models';

export const updateBusiness = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params as IBusinessFetchByIdRequestAttributes;
  try {
    const { name, businessDomain, placeId, categoryId, address, cityId, stateId, countryId, longitude, latitude, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, sourceId, socialMediaId, sponsoredAd } = req.body as IBusinessAttributes;
    // const geoPoint = { type: 'Point', coordinates: [longitude, latitude], crs: { type: 'name', properties: { name: 'EPSG:4326' } } };

    const business = await Business.findByPk(id);

    if (business != null) {
      if (name != null) business.name = name;
      if (businessDomain != null) business.businessDomain = businessDomain;
      if (placeId != null) business.placeId = placeId;
      if (categoryId != null) business.categoryId = categoryId;
      if (address != null) business.address = address;
      if (cityId != null) business.cityId = cityId;
      if (stateId != null) business.stateId = stateId;
      if (countryId != null) business.countryId = countryId;
      if (longitude != null) business.longitude = longitude;
      if (latitude != null) business.latitude = latitude;
      // if (geoPoint != null) business.geoPoint = geoPoint;
      if (postalCodeId != null) business.postalCodeId = postalCodeId;
      if (phoneId != null) business.phoneId = phoneId;
      if (email != null) business.email = email;
      if (website != null) business.website = website;
      if (ratingId != null) business.ratingId = ratingId;
      if (reviews != null) business.reviews = reviews;
      if (timezoneId != null) business.timezoneId = timezoneId;
      if (sourceId != null) business.sourceId = sourceId;
      if (sponsoredAd != null) business.sponsoredAd = sponsoredAd;
      if (socialMediaId != null) business.socialMediaId = socialMediaId;

      await business.save();

      logger.info(`Business with ID ${id} updated successfully.`);
      const response: ApiResponse<{ business: Business }> = createApiResponse({ success: true, data: { business }, message: getBusinessMessage(BusinessMessageKey.BUSINESS_UPDATED).message, status: getBusinessMessage(BusinessMessageKey.BUSINESS_UPDATED).code });
      return res.json(response);
    } else {
      logger.warn(`Business with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.BUSINESS_NOT_FOUND).message, status: getBusinessMessage(BusinessMessageKey.BUSINESS_NOT_FOUND).code });
      return res.json(response);
    }
  } catch (error) {
    logger.error(`Error updating business with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.FAILED_TO_UPDATE_BUSINESS).message, status: getBusinessMessage(BusinessMessageKey.FAILED_TO_UPDATE_BUSINESS).code });
    return res.json(response);
  }
};
