import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Sequelize from '../../config/database';
import { ApiResponse } from '../../types/Response.interface';
import Business from '../../models/Business/Business.model';
import { Point } from 'geojson';
import logger from '../../utils/logger';
import { createApiResponse } from '../../utils/response';
import BusinessPhone from '../../models/BusinessPhone/BusinessPhone.model';
import Country from '../../models/Country/Country.model';
import State from '../../models/State/State.model';
import City from '../../models/City/City.model';
import { BusinessMessageKey, getBusinessMessage } from '../../models/Business/Business.messages';
import { RequestMessageKey, getRequestMessage } from '../../messages/Request.messages';

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
