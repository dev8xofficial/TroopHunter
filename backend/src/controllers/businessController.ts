import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Sequelize from '../config/database';
import { IBusinessResponseAttributes } from '../models/Business/Business.interface';
import { IBusinessRatingResponseAttributes } from '../models/BusinessRating/BusinessRating.interface';
import { IBusinessSourceResponseAttributes } from '../models/BusinessSource/BusinessSource.interface';
import { IBusinessOpeningHourResponseAttributes } from '../models/BusinessOpeningHour/BusinessOpeningHour.interface';
import { IBusinessClosingHourResponseAttributes } from '../models/BusinessClosingHour/BusinessClosingHour.interface';
import { IPostalCodeResponseAttributes } from '../models/PostalCode/PostalCode.interface';
import { IBusinessPhoneResponseAttributes } from '../models/BusinessPhone/BusinessPhone.interface';
import { ITimezoneResponseAttributes } from '../models/Timezone/Timezone.interface';
import { ApiResponse } from '../types/Response.interface';
import { ICityResponseAttributes } from '../models/City/City.interface';
import { IStateResponseAttributes } from '../models/State/State.interface';
import { ICountryResponseAttributes } from '../models/Country/Country.interface';
import { IBusinessCategoryResponseAttributes } from '../models/BusinessCategory/BusinessCategory.interface';
import Business from '../models/Business/Business.model';
import { Point } from 'geojson';
import { findOrCreateBusinessPhone, getPhoneWithDetails } from '../utils/phone';
import { findOrCreateBusinessSource } from '../utils/business';
import { findOrCreateBusinessCategory } from '../utils/category';
import { findCityByName, findCountryByName, findStateByName } from '../utils/location';
import { findOrCreatePostalCode } from '../utils/postalCode';
import { findOrCreateBusinessRating } from '../utils/rating';
import { findOrCreateTimezone } from '../utils/timezone';
import { findOrCreateBusinessOpeningHour } from '../utils/openingHour';
import { findOrCreateBusinessClosingHour } from '../utils/closingHour';
import logger from '../utils/logger';
import { createApiResponse } from '../utils/response';
import BusinessPhone from '../models/BusinessPhone/BusinessPhone.model';
import Country from '../models/Country/Country.model';
import State from '../models/State/State.model';
import City from '../models/City/City.model';
import { BusinessMessageKey, getBusinessMessage } from '../models/Business/Business.messages';
import { RequestMessageKey, getRequestMessage } from '../messages/Request.messages';
// import BusinessPhoto from '../models/BusinessPhoto';
import { v4 as uuidv4 } from 'uuid';

export const getBusinessesByQuery = async (req: Request, res: Response) => {
  const { name, businessDomain, categoryId, address, cityId, cityName, stateId, stateName, countryId, countryName, longitude, latitude, range, postalCodeId, phoneId, phone, email, website, ratingId, reviews, timezoneId, sourceId, socialMediaId, sponsoredAd, openingHourId, closingHourId, page, limit, include } = req.query;

  // Pagination
  if (!page || !limit) {
    const response: ApiResponse<null> = createApiResponse({ error: getRequestMessage(RequestMessageKey.MISSING_REQUEST_LIMIT).message, status: getRequestMessage(RequestMessageKey.MISSING_REQUEST_LIMIT).code });
    return res.json(response);
  }

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
    const response: ApiResponse<null> = createApiResponse({ error: getRequestMessage(RequestMessageKey.INVALID_REQUEST_LIMIT).message, status: getRequestMessage(RequestMessageKey.INVALID_REQUEST_LIMIT).code });
    return res.json(response);
  }

  const offset = (pageNumber - 1) * limitNumber;

  // Where clause
  const whereClause: { [key: string]: any } = {};
  const whereClauseCountry: { [key: string]: any } = {};
  const whereClauseState: { [key: string]: any } = {};
  const whereClauseCity: { [key: string]: any } = {};
  const whereClauseBusinessPhone: { [key: string]: any } = {};

  if (name) {
    whereClause.name = { [Op.iLike]: `%${name}%` };
  }

  if (businessDomain) {
    whereClause.businessDomain = { [Op.iLike]: `%${businessDomain}%` };
  }

  if (categoryId) {
    whereClause.categoryId = categoryId;
  }

  if (address) {
    whereClause.address = { [Op.iLike]: `%${address}%` };
  }

  if (cityId) {
    whereClause.cityId = cityId;
  }

  if (stateId) {
    whereClause.stateId = stateId;
  }

  if (countryId) {
    whereClause.countryId = countryId;
  }

  if (latitude && longitude && range) {
    const point: Point = {
      type: 'Point',
      coordinates: [parseFloat(longitude as string), parseFloat(latitude as string)],
    };

    whereClause.geoPoint = Sequelize.literal(`ST_DWithin("Business"."geoPoint", ST_SetSRID(ST_MakePoint(${point.coordinates[0]}, ${point.coordinates[1]}), 4326), ${range})`);
    whereClause.longitude = longitude;
    whereClause.latitude = latitude;
  }

  if (postalCodeId) {
    whereClause.postalCodeId = postalCodeId;
  }

  if (phoneId) {
    whereClause.phoneId = phoneId;
  }

  if (email) {
    whereClause.email = { [Op.iLike]: `%${email}%` };
  }

  if (website) {
    whereClause.website = {
      [Op.iLike]: `%${website}%`,
    };
  }

  if (timezoneId) {
    whereClause.timezoneId = timezoneId;
  }

  if (sponsoredAd) {
    whereClause.sponsoredAd = sponsoredAd;
  }

  if (openingHourId) {
    whereClause.openingHourId = openingHourId;
  }

  if (closingHourId) {
    whereClause.closingHourId = closingHourId;
  }

  if (countryName) {
    whereClauseCountry.name = { [Op.iLike]: `%${countryName}%` };
  }

  if (stateName) {
    whereClauseState.name = { [Op.iLike]: `%${stateName}%` };
  }

  if (cityName) {
    whereClauseCity.name = { [Op.iLike]: `%${cityName}%` };
  }

  if (phone && typeof phone === 'string') {
    const phoneNumberSearch = phone.replace(/\D/g, '');
    whereClauseBusinessPhone.number = { [Op.iLike]: `%${phoneNumberSearch}%` };
  }

  // Include clauses for country, state, and city search
  const includeClauseCountry: any[] = [
    {
      model: Country,
      where: whereClauseCountry,
    },
  ];

  const includeClauseState: any[] = [
    {
      model: State,
      where: whereClauseState,
    },
  ];

  const includeClauseCity: any[] = [
    {
      model: City,
      where: whereClauseCity,
    },
  ];

  const includeClauseBusinessPhone: any[] = [
    {
      model: BusinessPhone,
      where: whereClauseBusinessPhone,
    },
  ];

  try {
    const { count, rows: businesses } = await Business.findAndCountAll({
      where: whereClause,
      include: [...includeClauseCountry, ...includeClauseState, ...includeClauseCity, ...includeClauseBusinessPhone],
      offset,
      limit: limitNumber,
    });

    const totalPages = Math.ceil(count / limitNumber);

    const objectOfBusinesses: { [key: string]: Business } = {};
    businesses.forEach((business: Business) => {
      if (business.id) objectOfBusinesses[business.id] = business;
    });

    const response: ApiResponse<{ totalRecords: number; totalPages: number; businesses: { [key: string]: Business } }> = createApiResponse({ success: true, data: { totalRecords: count, totalPages, businesses: objectOfBusinesses }, message: getBusinessMessage(BusinessMessageKey.BUSINESSES_RETRIEVED).message, status: getBusinessMessage(BusinessMessageKey.BUSINESSES_RETRIEVED).code });
    res.json(response);
  } catch (error) {
    logger.error('Error retrieving businesses:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.FAILED_TO_RETRIEVE_BUSINESSES).message, status: getBusinessMessage(BusinessMessageKey.FAILED_TO_RETRIEVE_BUSINESSES).code });
    res.json(response);
  }
};

export const getBusinesses = async (req: Request, res: Response) => {
  const { page, limit, include } = req.query;

  // Pagination
  if (!page || !limit) {
    const response: ApiResponse<null> = createApiResponse({ error: getRequestMessage(RequestMessageKey.MISSING_REQUEST_LIMIT).message, status: getRequestMessage(RequestMessageKey.MISSING_REQUEST_LIMIT).code });
    return res.json(response);
  }

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
    const response: ApiResponse<null> = createApiResponse({ error: getRequestMessage(RequestMessageKey.INVALID_REQUEST_LIMIT).message, status: getRequestMessage(RequestMessageKey.INVALID_REQUEST_LIMIT).code });
    return res.json(response);
  }

  const offset = (pageNumber - 1) * limitNumber;

  try {
    const { count, rows: businesses } = await Business.findAndCountAll({
      include,
      offset,
      limit: limitNumber,
    });

    const totalPages = Math.ceil(count / limitNumber);

    const objectOfBusinesses: { [key: string]: Business } = {};
    businesses.forEach((business: Business) => {
      if (business.id) objectOfBusinesses[business.id] = business;
    });

    logger.info('Successfully retrieved businesses');
    const response: ApiResponse<{ totalRecords: number; totalPages: number; businesses: { [key: string]: Business } }> = createApiResponse({ success: true, data: { totalRecords: count, totalPages, businesses: objectOfBusinesses }, message: getBusinessMessage(BusinessMessageKey.BUSINESSES_RETRIEVED).message, status: getBusinessMessage(BusinessMessageKey.BUSINESSES_RETRIEVED).code });
    res.json(response);
  } catch (error) {
    logger.error('Error while retrieving businesses:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.FAILED_TO_RETRIEVE_BUSINESSES).message, status: getBusinessMessage(BusinessMessageKey.FAILED_TO_RETRIEVE_BUSINESSES).code });
    res.json(response);
  }
};

export const getBusinessById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const business = await Business.findOne({ where: { id } });
    if (!business) {
      logger.warn(`Business with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.BUSINESS_NOT_FOUND).message, status: getBusinessMessage(BusinessMessageKey.BUSINESS_NOT_FOUND).code });
      return res.json(response);
    }
    const response: ApiResponse<{ business: Business }> = createApiResponse({ success: true, data: { business }, message: getBusinessMessage(BusinessMessageKey.BUSINESS_RETRIEVED).message, status: getBusinessMessage(BusinessMessageKey.BUSINESS_RETRIEVED).code });
    res.json(response);
  } catch (error) {
    logger.error(`Error retrieving business with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.BUSINESS_NOT_FOUND).message, status: getBusinessMessage(BusinessMessageKey.BUSINESS_NOT_FOUND).code });
    res.json(response);
  }
};

export const createBusiness = async (req: Request, res: Response) => {
  const transaction = await Sequelize.transaction(); // Start a transaction

  const { name, businessDomain, category, address, city, state, country, longitude, latitude, postalCode, phone, email, website, rating, reviews, timezone, source, socialMediaId, sponsoredAd, openingHour, closingHour } = req.body;

  try {
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

    logger.debug('Creating a new business:', payload);

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
    if (!source) {
      logger.error(getBusinessMessage(BusinessMessageKey.MISSING_SOURCE).message);
      const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.MISSING_SOURCE).message, status: getBusinessMessage(BusinessMessageKey.MISSING_SOURCE).code });
      return res.json(response);
    }

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

      // updateBusinessPhone(payload.phoneId, business.id);

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

export const deleteBusiness = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const business = await Business.findByPk(id);
    if (!business) {
      logger.warn(`Business with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.BUSINESS_NOT_FOUND).message, status: getBusinessMessage(BusinessMessageKey.BUSINESS_NOT_FOUND).code });
      return res.json(response);
    }
    await business.destroy();
    logger.info(`Business with ID ${id} deleted successfully.`);
    const response: ApiResponse<null> = createApiResponse({ success: true, message: getBusinessMessage(BusinessMessageKey.BUSINESS_DELETED).message, status: getBusinessMessage(BusinessMessageKey.BUSINESS_DELETED).code });
    res.json(response);
  } catch (error) {
    logger.error(`Error deleting business with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.FAILED_TO_DELETE_BUSINESS).message, status: getBusinessMessage(BusinessMessageKey.FAILED_TO_DELETE_BUSINESS).code });
    res.json(response);
  }
};
