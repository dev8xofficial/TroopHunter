import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Sequelize from '../config/database';
import { BusinessAttributes } from '../models/Business/Business.interface';
import { BusinessRatingAttributes } from '../models/BusinessRating/BusinessRating.interface';
import { BusinessSourceAttributes } from '../models/BusinessSource/BusinessSource.interface';
import { BusinessOpeningHourAttributes } from '../models/BusinessOpeningHour/BusinessOpeningHour.interface';
import { BusinessClosingHourAttributes } from '../models/BusinessClosingHour/BusinessClosingHour.interface';
import { PostalCodeAttributes } from '../models/PostalCode/PostalCode.interface';
import { BusinessPhoneAttributes } from '../models/BusinessPhone/BusinessPhone.interface';
import { TimezoneAttributes } from '../models/Timezone/Timezone.interface';
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
import { ApiResponse } from '../types/response';
import { getMessage } from '../utils/message';
import { CityAttributes } from '../models/City/City.interface';
import { StateAttributes } from '../models/State/State.interface';
import { CountryAttributes } from '../models/Country/Country.interface';
import BusinessPhone from '../models/BusinessPhone/BusinessPhone.model';
import Country from '../models/Country/Country.model';
import State from '../models/State/State.model';
import City from '../models/City/City.model';
import { BusinessCategoryAttributes } from '../models/BusinessCategory/BusinessCategory.interface';
// import BusinessPhoto from '../models/BusinessPhoto';

export const getBusinessesByQuery = async (req: Request, res: Response) => {
  const { name, businessDomain, categoryId, address, cityId, cityName, stateId, stateName, countryId, countryName, longitude, latitude, range, postalCodeId, phoneId, phone, email, website, ratingId, reviews, timezoneId, sourceId, socialMediaId, sponsoredAd, openingHourId, closingHourId, page, limit, include } = req.query;

  // Pagination
  if (!page || !limit) {
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('MISSING_PAGE_LIMIT').message, status: getMessage('MISSING_PAGE_LIMIT').code });
    return res.json(response);
  }

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('INVALID_PAGE_LIMIT').message, status: getMessage('INVALID_PAGE_LIMIT').code });
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

    const response: ApiResponse<{ totalRecords: number; totalPages: number; businesses: { [key: string]: Business } }> = createApiResponse({ success: true, data: { totalRecords: count, totalPages, businesses: objectOfBusinesses }, message: getMessage('BUSINESSES_RETRIEVED').message, status: getMessage('BUSINESSES_RETRIEVED').code });
    res.json(response);
  } catch (error) {
    logger.error('Error retrieving businesses:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_RETRIEVE_BUSINESSES').message, status: getMessage('FAILED_TO_RETRIEVE_BUSINESSES').code });
    res.json(response);
  }
};

export const getBusinesses = async (req: Request, res: Response) => {
  const { page, limit, include } = req.query;

  // Pagination
  if (!page || !limit) {
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('MISSING_PAGE_LIMIT').message, status: getMessage('MISSING_PAGE_LIMIT').code });
    return res.json(response);
  }

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('INVALID_PAGE_LIMIT').message, status: getMessage('INVALID_PAGE_LIMIT').code });
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
    const response: ApiResponse<{ totalRecords: number; totalPages: number; businesses: { [key: string]: Business } }> = createApiResponse({ success: true, data: { totalRecords: count, totalPages, businesses: objectOfBusinesses }, message: getMessage('BUSINESSES_RETRIEVED').message, status: getMessage('BUSINESSES_RETRIEVED').code });
    res.json(response);
  } catch (error) {
    logger.error('Error while retrieving businesses:', error);
    const response: ApiResponse<null> = createApiResponse({
      error: getMessage('FAILED_TO_RETRIEVE_BUSINESSES').message,
      status: getMessage('FAILED_TO_RETRIEVE_BUSINESSES').code,
    });
    res.json(response);
  }
};

export const getBusinessById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const business = await Business.findOne({ where: { id } });
    if (!business) {
      logger.warn(`Business with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('BUSINESS_NOT_FOUND').message, status: getMessage('BUSINESS_NOT_FOUND').code });
      return res.json(response);
    }
    const response: ApiResponse<{ business: Business }> = createApiResponse({ success: true, data: { business }, message: getMessage('BUSINESS_RETRIEVED').message, status: getMessage('BUSINESS_RETRIEVED').code });
    res.json(response);
  } catch (error) {
    logger.error(`Error retrieving business with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('BUSINESS_NOT_FOUND').message, status: getMessage('BUSINESS_NOT_FOUND').code });
    res.json(response);
  }
};

export const createBusiness = async (req: Request, res: Response) => {
  const transaction = await Sequelize.transaction(); // Start a transaction

  const { name, businessDomain, category, address, city, state, country, longitude, latitude, postalCode, phone, email, website, rating, reviews, timezone, source, socialMediaId, sponsoredAd, openingHour, closingHour } = req.body;

  try {
    const geoPoint = { type: 'Point', coordinates: [longitude, latitude], crs: { type: 'name', properties: { name: 'EPSG:4326' } } };
    let payload: BusinessAttributes = {
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
      logger.error(getMessage('MISSING_NAME').message);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('MISSING_NAME').message, status: getMessage('MISSING_NAME').code });
      return res.json(response);
    }

    // Check if address is missing
    if (!address) {
      logger.error(getMessage('MISSING_ADDRESS').message);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('MISSING_ADDRESS').message, status: getMessage('MISSING_ADDRESS').code });
      return res.json(response);
    }

    // Check if longitude is missing
    if (!longitude) {
      logger.error(getMessage('MISSING_LONGITUDE').message);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('MISSING_LONGITUDE').message, status: getMessage('MISSING_LONGITUDE').code });
      return res.json(response);
    }

    // Check if latitude is missing
    if (!latitude) {
      logger.error(getMessage('MISSING_LATITUDE').message);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('MISSING_LATITUDE').message, status: getMessage('MISSING_LATITUDE').code });
      return res.json(response);
    }

    // Check if source is missing
    if (!source) {
      logger.error(getMessage('MISSING_SOURCE').message);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('MISSING_SOURCE').message, status: getMessage('MISSING_SOURCE').code });
      return res.json(response);
    }

    if (category) {
      const categoryFromDB: BusinessCategoryAttributes | undefined = await findOrCreateBusinessCategory(category, transaction);
      payload.categoryId = categoryFromDB?.id;
    }

    if (city) {
      const cityFromDB: CityAttributes | undefined = await findCityByName(city, transaction);
      payload.cityId = cityFromDB?.id;
    }

    if (state) {
      const stateFromDB: StateAttributes | undefined = await findStateByName(state, transaction);
      payload.stateId = stateFromDB?.id;
    }

    if (country) {
      const countryFromDB: CountryAttributes | undefined = await findCountryByName(country, transaction);
      payload.countryId = countryFromDB?.id;
    }

    if (postalCode) {
      const postalCodeFromDB: PostalCodeAttributes | undefined = await findOrCreatePostalCode(postalCode, transaction);
      payload.postalCodeId = postalCodeFromDB?.id;
    }

    if (phone) {
      const phoneWithDetails = getPhoneWithDetails(phone);
      const phoneFromDB: BusinessPhoneAttributes | undefined = await findOrCreateBusinessPhone(phoneWithDetails, transaction);
      payload.phoneId = phoneFromDB?.id;
    }

    if (rating !== undefined && rating !== null) {
      const ratingFromDB: BusinessRatingAttributes | undefined = await findOrCreateBusinessRating(rating, transaction);
      payload.ratingId = ratingFromDB?.id;
    }

    if (source) {
      const sourceFromDB: BusinessSourceAttributes | undefined = await findOrCreateBusinessSource(source, transaction);
      payload.sourceId = sourceFromDB?.id;
    }

    if (timezone) {
      const timezoneFromDB: TimezoneAttributes | undefined = await findOrCreateTimezone(timezone, transaction);
      payload.timezoneId = timezoneFromDB?.id;
    }

    if (openingHour) {
      const openingHourFromDB: BusinessOpeningHourAttributes | undefined = await findOrCreateBusinessOpeningHour(openingHour, transaction);
      payload.openingHourId = openingHourFromDB?.id;
    }

    if (closingHour) {
      const closingHourFromDB: BusinessClosingHourAttributes | undefined = await findOrCreateBusinessClosingHour(closingHour, transaction);
      payload.closingHourId = closingHourFromDB?.id;
    }

    const business = await Business.create(payload, { transaction });

    await transaction.commit().then(() => {
      logger.info(`Business named ${name} created successfully.`);

      // updateBusinessPhone(payload.phoneId, business.id);

      return business;
    });

    const response: ApiResponse<{ business: Business }> = createApiResponse({ success: true, data: { business }, message: getMessage('BUSINESS_CREATED').message, status: getMessage('BUSINESS_CREATED').code });
    res.json(response);
  } catch (error) {
    logger.error(`Failed to create ${name}`);
    logger.error('Error creating business:', error);

    // Rollback the transaction if an error occurred
    await transaction.rollback();

    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_CREATE_BUSINESS').message, status: getMessage('FAILED_TO_CREATE_BUSINESS').code });
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
        logger.error(getMessage('MISSING_NAME').message);
        const response: ApiResponse<null> = createApiResponse({ error: getMessage('MISSING_NAME').message, status: getMessage('MISSING_NAME').code });
        return res.json(response);
      }

      // Check if address is missing
      if (!address) {
        logger.error(getMessage('MISSING_ADDRESS').message);
        const response: ApiResponse<null> = createApiResponse({ error: getMessage('MISSING_ADDRESS').message, status: getMessage('MISSING_ADDRESS').code });
        return res.json(response);
      }

      // Check if longitude is missing
      if (!longitude) {
        logger.error(getMessage('MISSING_LONGITUDE').message);
        const response: ApiResponse<null> = createApiResponse({ error: getMessage('MISSING_LONGITUDE').message, status: getMessage('MISSING_LONGITUDE').code });
        return res.json(response);
      }

      // Check if latitude is missing
      if (!latitude) {
        logger.error(getMessage('MISSING_LATITUDE').message);
        const response: ApiResponse<null> = createApiResponse({ error: getMessage('MISSING_LATITUDE').message, status: getMessage('MISSING_LATITUDE').code });
        return res.json(response);
      }

      // Check if source is missing
      if (!sourceId) {
        logger.error(getMessage('MISSING_SOURCE').message);
        const response: ApiResponse<null> = createApiResponse({ error: getMessage('MISSING_SOURCE').message, status: getMessage('MISSING_SOURCE').code });
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
      const response: ApiResponse<{ business: Business }> = createApiResponse({ success: true, data: { business }, message: getMessage('BUSINESS_UPDATED').message, status: getMessage('BUSINESS_UPDATED').code });
      res.json(response);
    } else {
      logger.warn(`Business with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('BUSINESS_NOT_FOUND').message, status: getMessage('BUSINESS_NOT_FOUND').code });
      res.json(response);
    }
  } catch (error) {
    logger.error(`Error updating business with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_UPDATE_BUSINESS').message, status: getMessage('FAILED_TO_UPDATE_BUSINESS').code });
    res.json(response);
  }
};

export const deleteBusiness = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const business = await Business.findByPk(id);
    if (!business) {
      logger.warn(`Business with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('BUSINESS_NOT_FOUND').message, status: getMessage('BUSINESS_NOT_FOUND').code });
      return res.json(response);
    }
    await business.destroy();
    logger.info(`Business with ID ${id} deleted successfully.`);
    const response: ApiResponse<null> = createApiResponse({ success: true, message: getMessage('BUSINESS_DELETED').message, status: getMessage('BUSINESS_DELETED').code });
    res.json(response);
  } catch (error) {
    logger.error(`Error deleting business with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_DELETE_BUSINESS').message, status: getMessage('FAILED_TO_DELETE_BUSINESS').code });
    res.json(response);
  }
};
