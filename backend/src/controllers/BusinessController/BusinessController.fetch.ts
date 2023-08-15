import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Sequelize from '../../config/database';
import { ApiResponse } from 'validator/interfaces';
import { createApiResponse } from 'validator/utils';
import Business from '../../models/Business';
import { Point } from 'geojson';
import logger from '../../utils/logger';
import BusinessPhone from '../../models/BusinessPhone';
import { BusinessMessageKey, getBusinessMessage } from '../../messages/Business';
import { calculateRelevanceScore } from '../../utils/business';

export const getBusinessesByQuery = async (req: Request, res: Response) => {
  const { name, businessDomain, address, cityId, stateId, countryId, longitude, latitude, email, website, sponsoredAd } = req.query;
  const { range, phone } = req.query;
  const { page, limit, sort } = req.query;
  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);
  let order: [string, 'ASC' | 'DESC'][] = [];
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

  // Sorting
  if (sort === 'alphabeticalAscending') {
    order = [['name', 'ASC']];
  }
  if (sort === 'alphabeticalDescending') {
    order = [['name', 'DESC']];
  }
  if (sort === 'newFirstAscending') {
    order = [['createdAt', 'ASC']];
  }

  try {
    const { count, rows: businesses } = await Business.findAndCountAll({
      where: whereClause,
      include: [...includeClauseBusinessPhone],
      order,
      offset,
      limit: limitNumber,
    });

    const totalPages = Math.ceil(count / limitNumber);

    const businessesWithRelevance: { business: Business; relevanceScore: number }[] = businesses.map((business: Business) => {
      let relevanceScore = 0;

      if (name && business.name) {
        const nameStr = name as string;
        relevanceScore += calculateRelevanceScore(nameStr, business.name);
      }

      if (businessDomain && business.businessDomain) {
        const businessDomainStr = businessDomain as string;
        relevanceScore += calculateRelevanceScore(businessDomainStr, business.businessDomain);
      }

      if (address && business.address) {
        const addressStr = address as string;
        relevanceScore += calculateRelevanceScore(addressStr, business.address);
      }

      if (cityId && business.cityId) {
        const cityIdStr = cityId as string;
        relevanceScore += calculateRelevanceScore(cityIdStr, business.cityId);
      }

      if (stateId && business.stateId) {
        const stateIdStr = stateId as string;
        relevanceScore += calculateRelevanceScore(stateIdStr, business.stateId);
      }

      if (countryId && business.countryId) {
        const countryIdStr = countryId as string;
        relevanceScore += calculateRelevanceScore(countryIdStr, business.countryId);
      }

      if (email && business.email) {
        const emailStr = email as string;
        relevanceScore += calculateRelevanceScore(emailStr, business.email);
      }

      if (website && business.website) {
        const websiteStr = website as string;
        relevanceScore += calculateRelevanceScore(websiteStr, business.website);
      }

      if (sponsoredAd && business.sponsoredAd) {
        const sponsoredAdStr = sponsoredAd as string;
        relevanceScore += calculateRelevanceScore(sponsoredAdStr, `${business.sponsoredAd}`);
      }

      return { business, relevanceScore };
    });

    // Deep sort businessesWithRelevance based on relevance scores
    if (sort === 'relevance') {
      businessesWithRelevance.sort((a, b) => b.relevanceScore - a.relevanceScore);
    }

    const sortedBusinesses = businessesWithRelevance.map((item) => item.business);

    const objectOfBusinesses: { [key: string]: Business } = {};
    sortedBusinesses.forEach((business: Business) => {
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
