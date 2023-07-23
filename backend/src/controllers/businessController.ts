import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Sequelize from '../config/database';
import { BusinessAttributes } from '../types/business';
import { BusinessCategoryAttributes } from '../types/businessCategory';
import { LocationAttributes } from '../types/location';
import { RatingAttributes } from '../types/businessRating';
import { SourceAttributes } from '../types/businessSource';
import { OpeningTimeAttributes } from '../types/businessOpeningHour';
import { ClosingTimeAttributes } from '../types/businessClosingHour';
import { PostalCodeAttributes } from '../types/postalCode';
import { PhoneAttributes } from '../types/businessPhone';
import { TimezoneAttributes } from '../types/timezone';
import Business from '../models/Business';
import { Point } from 'geojson';
import { findOrCreateBusinessPhone, getPhoneWithDetails } from '../utils/phone';
import { findOrCreateBusinessSource } from '../utils/business';
import { findOrCreateBusinessCategory } from '../utils/category';
import { findOrCreateLocation } from '../utils/location';
import { findOrCreatePostalCode } from '../utils/postalCode';
import { findOrCreateBusinessRating } from '../utils/rating';
import { findOrCreateTimezone } from '../utils/timezone';
import { findOrCreateBusinessOpeningHour } from '../utils/openingHour';
import { findOrCreateBusinessClosingHour } from '../utils/closingHour';
import logger from '../utils/logger';
import { createApiResponse } from '../utils/response';
import { ApiResponse } from '../types/response';
import { getMessage } from '../utils/message';
// import BusinessPhoto from '../models/BusinessPhoto';

export const getBusinessesByQuery = async (req: Request, res: Response) => {
  const { name, businessDomain, categoryId, address, locationId, longitude, latitude, range, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, sourceId, socialMediaId, sponsoredAd, openingHourId, closingHourId, page, limit, includes } = req.query;

  const whereClause: { [key: string]: any } = {};

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

  if (locationId) {
    whereClause.locationId = locationId;
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

  const paginationOptions: { [key: string]: number } = {};

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  if (!isNaN(pageNumber) && pageNumber > 0) {
    paginationOptions.offset = (pageNumber - 1) * limitNumber;
  }

  if (!isNaN(limitNumber) && limitNumber > 0) {
    paginationOptions.limit = limitNumber;
  }

  try {
    const { count, rows: businesses } = await Business.findAndCountAll({
      where: whereClause,
      include: includes,
      ...paginationOptions,
    });

    const totalPages = Math.ceil(count / limitNumber);

    const response: ApiResponse<{ totalRecords: number; totalPages: number; businesses: Business[] }> = createApiResponse({ success: true, data: { totalRecords: count, totalPages, businesses }, message: getMessage('BUSINESSES_RETRIEVED').message, status: getMessage('BUSINESSES_RETRIEVED').code });
    res.json(response);
  } catch (error) {
    logger.error('Error retrieving businesses:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_RETRIEVE_BUSINESSES').message, status: getMessage('FAILED_TO_RETRIEVE_BUSINESSES').code });
    res.json(response);
  }
};

export const getBusinesses = async (req: Request, res: Response) => {
  try {
    const businesses = await Business.findAll();
    logger.info('Successfully retrieved businesses');
    const response: ApiResponse<{ businesses: Business[] }> = createApiResponse({ success: true, data: { businesses }, message: getMessage('BUSINESSES_RETRIEVED').message, status: getMessage('BUSINESSES_RETRIEVED').code });
    res.json(response);
  } catch (error) {
    logger.error('Error while retrieving businesses:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_RETRIEVE_BUSINESSES').message, status: getMessage('FAILED_TO_RETRIEVE_BUSINESSES').code });
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
    const response: ApiResponse<{ business: Business }> = createApiResponse({ success: true, data: { business }, message: getMessage('BUSINESS_RETRIEVED_SUCCESSFULLY').message, status: getMessage('BUSINESS_RETRIEVED_SUCCESSFULLY').code });
    res.json(response);
  } catch (error) {
    logger.error(`Error retrieving business with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('BUSINESS_NOT_FOUND').message, status: getMessage('BUSINESS_NOT_FOUND').code });
    res.json(response);
  }
};

export const createBusiness = async (req: Request, res: Response) => {
  const transaction = await Sequelize.transaction(); // Start a transaction

  const { name, businessDomain, category, address, location, longitude, latitude, postalCode, phone, email, website, rating, reviews, timezone, source, socialMediaId, sponsoredAd, openingHour, closingHour } = req.body;

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

    if (location) {
      const locationFromDB: LocationAttributes | undefined = await findOrCreateLocation(location, transaction);
      payload.locationId = locationFromDB?.id;
    }

    if (postalCode) {
      const postalCodeFromDB: PostalCodeAttributes | undefined = await findOrCreatePostalCode(postalCode, transaction);
      payload.postalCodeId = postalCodeFromDB?.id;
    }

    if (phone) {
      const phoneWithDetails = getPhoneWithDetails(phone);
      const phoneFromDB: PhoneAttributes | undefined = await findOrCreateBusinessPhone(phoneWithDetails, transaction);
      payload.phoneId = phoneFromDB?.id;
    }

    if (rating !== undefined && rating !== null) {
      const ratingFromDB: RatingAttributes | undefined = await findOrCreateBusinessRating(rating, transaction);
      payload.ratingId = ratingFromDB?.id;
    }

    if (source) {
      const sourceFromDB: SourceAttributes | undefined = await findOrCreateBusinessSource(source, transaction);
      payload.sourceId = sourceFromDB?.id;
    }

    if (timezone) {
      const timezoneFromDB: TimezoneAttributes | undefined = await findOrCreateTimezone(timezone, transaction);
      payload.timezoneId = timezoneFromDB?.id;
    }

    if (openingHour) {
      const openingHourFromDB: OpeningTimeAttributes | undefined = await findOrCreateBusinessOpeningHour(openingHour, transaction);
      payload.openingHourId = openingHourFromDB?.id;
    }

    if (closingHour) {
      const closingHourFromDB: ClosingTimeAttributes | undefined = await findOrCreateBusinessClosingHour(closingHour, transaction);
      payload.closingHourId = closingHourFromDB?.id;
    }

    const business = await Business.create(payload, { transaction });

    await transaction.commit().then(() => {
      logger.info(`Business named ${name} created successfully.`);
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
    const { name, businessDomain, categoryId, address, locationId, longitude, latitude, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, sourceId, socialMediaId, sponsoredAd, openingHourId, closingHourId } = req.body;
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
      business.locationId = locationId;
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
    const response: ApiResponse<null> = createApiResponse({ success: true, message: getMessage('BUSINESS_DELETED_SUCCESSFULLY').message, status: getMessage('BUSINESS_DELETED_SUCCESSFULLY').code });
    res.json(response);
  } catch (error) {
    logger.error(`Error deleting business with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_DELETE_BUSINESS').message, status: getMessage('FAILED_TO_DELETE_BUSINESS').code });
    res.json(response);
  }
};
