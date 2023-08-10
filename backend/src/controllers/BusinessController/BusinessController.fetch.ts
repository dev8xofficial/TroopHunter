import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Sequelize from '../../config/database';
import { ApiResponse } from 'validator/interfaces/Response';
import Business from '../../models/Business';
import { Point } from 'geojson';
import logger from '../../utils/logger';
import { createApiResponse } from 'validator/utils/response';
import BusinessPhone from '../../models/BusinessPhone';
import { BusinessMessageKey, getBusinessMessage } from '../../messages/Business';

export const getBusinessesByQuery = async (req: Request, res: Response) => {
  const { name, businessDomain, address, cityId, stateId, countryId, longitude, latitude, email, website, sponsoredAd } = req.query;
  const { range, phone } = req.query;
  const { page, limit } = req.query;
  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  const offset = (pageNumber - 1) * limitNumber;

  // Where clause
  const whereClause: { [key: string]: any } = {};
  const whereClauseBusinessPhone: { [key: string]: any } = {};

  if (name) whereClause.name = { [Op.iLike]: `%${name}%` };
  if (businessDomain) whereClause.businessDomain = { [Op.iLike]: `%${businessDomain}%` };
  if (address) whereClause.address = { [Op.iLike]: `%${address}%` };
  if (cityId) whereClause.cityId = cityId;
  if (stateId) whereClause.stateId = stateId;
  if (countryId) whereClause.countryId = countryId;

  if (latitude && longitude && range) {
    const point: Point = {
      type: 'Point',
      coordinates: [parseFloat(longitude.toString() as string), parseFloat(latitude.toString() as string)],
    };

    whereClause.geoPoint = Sequelize.literal(`ST_DWithin("Business"."geoPoint", ST_SetSRID(ST_MakePoint(${point.coordinates[0]}, ${point.coordinates[1]}), 4326), ${range})`);
    whereClause.longitude = longitude;
    whereClause.latitude = latitude;
  }

  if (email) whereClause.email = { [Op.iLike]: `%${email}%` };
  if (website) whereClause.website = { [Op.iLike]: `%${website}%` };
  if (sponsoredAd) whereClause.sponsoredAd = sponsoredAd;

  if (phone && typeof phone === 'string') {
    const phoneNumberSearch = phone.replace(/\D/g, '');
    whereClauseBusinessPhone.number = { [Op.iLike]: `%${phoneNumberSearch}%` };
  }

  // Include clauses for phone search
  const includeClauseBusinessPhone: any[] = [
    {
      model: BusinessPhone,
      where: whereClauseBusinessPhone,
    },
  ];

  try {
    const { count, rows: businesses } = await Business.findAndCountAll({
      where: whereClause,
      include: [...includeClauseBusinessPhone],
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
  const { page, limit } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  const offset = (pageNumber - 1) * limitNumber;

  try {
    const { count, rows: businesses } = await Business.findAndCountAll({
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
