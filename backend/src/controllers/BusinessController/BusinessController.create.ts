import { Request, Response } from 'express';
import Sequelize from '../../config/database';
import { IBusinessCreateRequestAttributes, IBusinessAttributes } from 'validator/interfaces/Business';
import { IBusinessRatingAttributes } from 'validator/interfaces/BusinessRating';
import { IBusinessSourceAttributes } from 'validator/interfaces/BusinessSource';
import { IBusinessOpeningHourAttributes } from 'validator/interfaces/BusinessOpeningHour';
import { IBusinessClosingHourAttributes } from 'validator/interfaces/BusinessClosingHour';
import { IPostalCodeAttributes } from 'validator/interfaces/PostalCode';
import { IBusinessPhoneAttributes } from 'validator/interfaces/BusinessPhone';
import { ITimezoneAttributes } from 'validator/interfaces/Timezone';
import { ApiResponse } from 'validator/interfaces/Response';
import { IBusinessCategoryAttributes } from 'validator/interfaces/BusinessCategory';
import Business from '../../models/Business';
import { findOrCreateBusinessPhone, getPhoneWithDetails } from '../../utils/phone';
import { findOrCreateBusinessSource } from '../../utils/business';
import { findOrCreateBusinessCategory } from '../../utils/category';
import { findOrCreatePostalCode } from '../../utils/postalCode';
import { findOrCreateBusinessRating } from '../../utils/rating';
import { findOrCreateTimezone } from '../../utils/timezone';
import { findOrCreateBusinessOpeningHour } from '../../utils/openingHour';
import { findOrCreateBusinessClosingHour } from '../../utils/closingHour';
import { createApiResponse } from 'validator/utils/response';
import { BusinessMessageKey, getBusinessMessage } from '../../messages/Business';
import { v4 as uuidv4 } from 'uuid';
import logger from '../../utils/logger';

export const createBusiness = async (req: Request, res: Response) => {
  const transaction = await Sequelize.transaction();

  const { name, businessDomain, category, address, cityId, stateId, countryId, longitude, latitude, postalCode, phone, email, website, rating, reviews, timezone, source, socialMediaId, sponsoredAd, openingHour, closingHour }: IBusinessCreateRequestAttributes = req.body;

  const geoPoint = { type: 'Point', coordinates: [longitude, latitude], crs: { type: 'name', properties: { name: 'EPSG:4326' } } };
  let payload: IBusinessAttributes = {
    id: uuidv4(),
    name,
    businessDomain: businessDomain?.toLocaleLowerCase(),
    address,
    cityId,
    stateId,
    countryId,
    geoPoint,
    longitude,
    latitude,
    email,
    website,
    reviews,
    socialMediaId,
    sponsoredAd,
  };

  try {
    logger.debug('Creating a new business:', payload);

    if (category) {
      const categoryFromDB: IBusinessCategoryAttributes | undefined = await findOrCreateBusinessCategory(category, transaction);
      payload.categoryId = categoryFromDB?.id;
    }

    if (postalCode) {
      const postalCodeFromDB: IPostalCodeAttributes | undefined = await findOrCreatePostalCode(postalCode, transaction);
      payload.postalCodeId = postalCodeFromDB?.id;
    }

    if (phone) {
      const phoneWithDetails = getPhoneWithDetails(phone);
      const phoneFromDB: IBusinessPhoneAttributes | undefined = await findOrCreateBusinessPhone(phoneWithDetails, transaction);
      payload.phoneId = phoneFromDB?.id;
    }

    if (rating !== undefined && rating !== null) {
      const ratingFromDB: IBusinessRatingAttributes | undefined = await findOrCreateBusinessRating(rating, transaction);
      payload.ratingId = ratingFromDB?.id;
    }

    if (source) {
      const sourceFromDB: IBusinessSourceAttributes | undefined = await findOrCreateBusinessSource(source, transaction);
      payload.sourceId = sourceFromDB?.id;
    }

    if (timezone) {
      const timezoneFromDB: ITimezoneAttributes | undefined = await findOrCreateTimezone(timezone, transaction);
      payload.timezoneId = timezoneFromDB?.id;
    }

    if (openingHour) {
      const openingHourFromDB: IBusinessOpeningHourAttributes | undefined = await findOrCreateBusinessOpeningHour(openingHour, transaction);
      payload.openingHourId = openingHourFromDB?.id;
    }

    if (closingHour) {
      const closingHourFromDB: IBusinessClosingHourAttributes | undefined = await findOrCreateBusinessClosingHour(closingHour, transaction);
      payload.closingHourId = closingHourFromDB?.id;
    }

    const business = await Business.create(payload, { transaction });

    await transaction.commit().then(() => {
      logger.info(`Business named ${name} created successfully.`);
      return business;
    });

    const response: ApiResponse<{ business: Business }> = createApiResponse({ success: true, data: { business }, message: getBusinessMessage(BusinessMessageKey.BUSINESS_CREATED).message, status: getBusinessMessage(BusinessMessageKey.BUSINESS_CREATED).code });
    res.json(response);
  } catch (error) {
    logger.error(`Failed to create ${name}`);
    logger.error('Error creating business:', error);

    // Rollback the transaction if an error occurred
    await transaction.rollback();

    const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.FAILED_TO_CREATE_BUSINESS).message, status: getBusinessMessage(BusinessMessageKey.FAILED_TO_CREATE_BUSINESS).code });
    res.json(response);
  }
};
