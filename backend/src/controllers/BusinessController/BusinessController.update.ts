import { Request, Response } from 'express';
import { ApiResponse } from '../../types/Response.interface';
import Business from '../../models/Business/Business.model';
import logger from '../../utils/logger';
import { createApiResponse } from '../../utils/response';
import { BusinessMessageKey, getBusinessMessage } from '../../models/Business/Business.messages';

export const updateBusiness = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { name, businessDomain, categoryId, address, cityId, stateId, countryId, longitude, latitude, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, sourceId, socialMediaId, sponsoredAd, openingHourId, closingHourId } = req.body;
    const geoPoint = { type: 'Point', coordinates: [longitude, latitude], crs: { type: 'name', properties: { name: 'EPSG:4326' } } };

    const business = await Business.findByPk(id);

    if (business) {
      // Check if name is missing
      if (!name) {
        logger.error(getBusinessMessage(BusinessMessageKey.MISSING_NAME).message);
        const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.MISSING_NAME).message, status: getBusinessMessage(BusinessMessageKey.MISSING_NAME).code });
        return res.json(response);
      }

      // Check if address is missing
      if (!address) {
        logger.error(getBusinessMessage(BusinessMessageKey.MISSING_ADDRESS).message);
        const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.MISSING_ADDRESS).message, status: getBusinessMessage(BusinessMessageKey.MISSING_ADDRESS).code });
        return res.json(response);
      }

      // Check if longitude is missing
      if (!longitude) {
        logger.error(getBusinessMessage(BusinessMessageKey.MISSING_LONGITUDE).message);
        const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.MISSING_LONGITUDE).message, status: getBusinessMessage(BusinessMessageKey.MISSING_LONGITUDE).code });
        return res.json(response);
      }

      // Check if latitude is missing
      if (!latitude) {
        logger.error(getBusinessMessage(BusinessMessageKey.MISSING_LATITUDE).message);
        const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.MISSING_LATITUDE).message, status: getBusinessMessage(BusinessMessageKey.MISSING_LATITUDE).code });
        return res.json(response);
      }

      // Check if source is missing
      if (!sourceId) {
        logger.error(getBusinessMessage(BusinessMessageKey.MISSING_SOURCE).message);
        const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.MISSING_SOURCE).message, status: getBusinessMessage(BusinessMessageKey.MISSING_SOURCE).code });
        return res.json(response);
      }

      business.name = name;
      business.businessDomain = businessDomain;
      business.categoryId = categoryId;
      business.address = address;
      business.cityId = cityId;
      business.stateId = stateId;
      business.countryId = countryId;
      business.longitude = longitude;
      business.latitude = latitude;
      business.geoPoint = geoPoint;
      business.postalCodeId = postalCodeId;
      business.phoneId = phoneId;
      business.email = email;
      business.website = website;
      business.ratingId = ratingId;
      business.reviews = reviews;
      business.timezoneId = timezoneId;
      business.sourceId = sourceId;
      business.sponsoredAd = sponsoredAd;
      business.socialMediaId = socialMediaId;
      business.openingHourId = openingHourId;
      business.closingHourId = closingHourId;

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
