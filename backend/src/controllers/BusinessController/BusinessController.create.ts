import { Request, Response } from 'express';
import Sequelize from '../../config/database';
import { IBusinessCreationRequestAttributes, IBusinessResponseAttributes } from '../../models/Business/Business.interface';
import { IBusinessRatingResponseAttributes } from '../../models/BusinessRating/BusinessRating.interface';
import { IBusinessSourceResponseAttributes } from '../../models/BusinessSource/BusinessSource.interface';
import { IBusinessOpeningHourResponseAttributes } from '../../models/BusinessOpeningHour/BusinessOpeningHour.interface';
import { IBusinessClosingHourResponseAttributes } from '../../models/BusinessClosingHour/BusinessClosingHour.interface';
import { IPostalCodeResponseAttributes } from '../../models/PostalCode/PostalCode.interface';
import { IBusinessPhoneResponseAttributes } from '../../models/BusinessPhone/BusinessPhone.interface';
import { ITimezoneResponseAttributes } from '../../models/Timezone/Timezone.interface';
import { ApiResponse } from '../../types/Response.interface';
import { ICityResponseAttributes } from '../../models/City/City.interface';
import { IStateResponseAttributes } from '../../models/State/State.interface';
import { ICountryResponseAttributes } from '../../models/Country/Country.interface';
import { IBusinessCategoryResponseAttributes } from '../../models/BusinessCategory/BusinessCategory.interface';
import Business from '../../models/Business/Business.model';
import { findOrCreateBusinessPhone, getPhoneWithDetails } from '../../utils/phone';
import { findOrCreateBusinessSource } from '../../utils/business';
import { findOrCreateBusinessCategory } from '../../utils/category';
import { findCityByName, findCountryByName, findStateByName } from '../../utils/location';
import { findOrCreatePostalCode } from '../../utils/postalCode';
import { findOrCreateBusinessRating } from '../../utils/rating';
import { findOrCreateTimezone } from '../../utils/timezone';
import { findOrCreateBusinessOpeningHour } from '../../utils/openingHour';
import { findOrCreateBusinessClosingHour } from '../../utils/closingHour';
import { createApiResponse } from '../../utils/response';
import { BusinessMessageKey, getBusinessMessage } from '../../models/Business/Business.messages';
import { v4 as uuidv4 } from 'uuid';
import logger from '../../utils/logger';

export const createBusiness = async (req: Request, res: Response) => {
  const transaction = await Sequelize.transaction();

  const { name, businessDomain, category, address, city, state, country, longitude, latitude, postalCode, phone, email, website, rating, reviews, timezone, source, socialMediaId, sponsoredAd, openingHour, closingHour }: IBusinessCreationRequestAttributes = req.body;

  const geoPoint = { type: 'Point', coordinates: [longitude, latitude], crs: { type: 'name', properties: { name: 'EPSG:4326' } } };
  let payload: IBusinessResponseAttributes = {
    id: uuidv4(),
    name,
    businessDomain,
    address,
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
      const categoryFromDB: IBusinessCategoryResponseAttributes | undefined = await findOrCreateBusinessCategory(category, transaction);
      payload.categoryId = categoryFromDB?.id;
    }

    if (city) {
      const cityFromDB: ICityResponseAttributes | undefined = await findCityByName(city, transaction);
      payload.cityId = cityFromDB?.id;
    }

    if (state) {
      const stateFromDB: IStateResponseAttributes | undefined = await findStateByName(state, transaction);
      payload.stateId = stateFromDB?.id;
    }

    if (country) {
      const countryFromDB: ICountryResponseAttributes | undefined = await findCountryByName(country, transaction);
      payload.countryId = countryFromDB?.id;
    }

    if (postalCode) {
      const postalCodeFromDB: IPostalCodeResponseAttributes | undefined = await findOrCreatePostalCode(postalCode, transaction);
      payload.postalCodeId = postalCodeFromDB?.id;
    }

    if (phone) {
      const phoneWithDetails = getPhoneWithDetails(phone);
      const phoneFromDB: IBusinessPhoneResponseAttributes | undefined = await findOrCreateBusinessPhone(phoneWithDetails, transaction);
      payload.phoneId = phoneFromDB?.id;
    }

    if (rating !== undefined && rating !== null) {
      const ratingFromDB: IBusinessRatingResponseAttributes | undefined = await findOrCreateBusinessRating(rating, transaction);
      payload.ratingId = ratingFromDB?.id;
    }

    if (source) {
      const sourceFromDB: IBusinessSourceResponseAttributes | undefined = await findOrCreateBusinessSource(source, transaction);
      payload.sourceId = sourceFromDB?.id;
    }

    if (timezone) {
      const timezoneFromDB: ITimezoneResponseAttributes | undefined = await findOrCreateTimezone(timezone, transaction);
      payload.timezoneId = timezoneFromDB?.id;
    }

    if (openingHour) {
      const openingHourFromDB: IBusinessOpeningHourResponseAttributes | undefined = await findOrCreateBusinessOpeningHour(openingHour, transaction);
      payload.openingHourId = openingHourFromDB?.id;
    }

    if (closingHour) {
      const closingHourFromDB: IBusinessClosingHourResponseAttributes | undefined = await findOrCreateBusinessClosingHour(closingHour, transaction);
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
