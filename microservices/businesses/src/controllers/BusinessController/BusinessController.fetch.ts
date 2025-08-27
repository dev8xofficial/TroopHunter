import { BusinessMessageKey, getBusinessMessage } from '@repo/messages';
import { logger } from '@repo/utils';
import { type ApiResponse, createApiResponse, type IBusinessFetchByIdRequestAttributes, type IBusinessFetchRequestAttributes, type IPaginationAttributes } from '@repo/validator';
import { type Request, type Response } from 'express';
import { type Point } from 'geojson';
import { type ParsedQs } from 'qs';
import { Op } from 'sequelize';
import { type IncludeOptions } from 'sequelize/types';

import sequelize from '../../config/database';
import { Business, BusinessPhone } from '../../models';
import { calculateRelevanceScore } from '../../utils';

export const getBusinessesByQuery = async (req: Request, res: Response): Promise<Response> => {
  const { name, businessDomain, address, cityId, stateId, countryId, longitude, latitude, email, website, sponsoredAd } = req.query as IBusinessFetchRequestAttributes;
  const { range, phone } = req.query as IBusinessFetchRequestAttributes;
  const { page, limit, sort } = req.query as ParsedQs & IPaginationAttributes;
  const pageNumber = parseInt(String(page)) ?? 1;
  const limitNumber = parseInt(String(limit)) ?? 10;
  let order: Array<[string, 'ASC' | 'DESC']> = [];
  const offset = (pageNumber - 1) * limitNumber;

  const whereClause: Record<string, unknown> = {};
  const whereClauseBusinessPhone: Record<string, unknown> = {};

  if (name != null) whereClause.name = { [Op.iLike]: `%${name}%` };
  if (businessDomain != null) whereClause.businessDomain = { [Op.iLike]: `%${businessDomain}%` };
  if (address != null) whereClause.address = { [Op.iLike]: `%${address}%` };
  if (cityId != null) whereClause.cityId = cityId;
  if (stateId != null) whereClause.stateId = stateId;
  if (countryId != null) whereClause.countryId = countryId;

  if (latitude != null && longitude != null && range != null) {
    const point: Point = {
      type: 'Point',
      coordinates: [parseFloat(longitude.toString()), parseFloat(latitude.toString())],
    };

    whereClause.geoPoint = sequelize.literal(`ST_DWithin("Business"."geoPoint", ST_SetSRID(ST_MakePoint(${point.coordinates[0]}, ${point.coordinates[1]}), 4326), ${range})`);
    whereClause.longitude = longitude;
    whereClause.latitude = latitude;
  }

  if (email != null) whereClause.email = { [Op.iLike]: `%${email}%` };
  if (website != null) whereClause.website = { [Op.iLike]: `%${website}%` };
  if (sponsoredAd != null) whereClause.sponsoredAd = sponsoredAd;

  if (phone != null && typeof phone === 'string') {
    const phoneNumberSearch = phone.replace(/\D/g, '');
    whereClauseBusinessPhone.number = { [Op.iLike]: `%${phoneNumberSearch}%` };
  }

  // Include clauses for phone search
  const includeClauseBusinessPhone: IncludeOptions[] = [
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

    const businessesWithRelevance: Array<{ business: Business; relevanceScore: number }> = businesses.map((business: Business) => {
      let relevanceScore = 0;

      if (name != null && business.name != null) {
        const nameStr = name;
        relevanceScore += calculateRelevanceScore(nameStr, business.name);
      }

      if (businessDomain != null && business.businessDomain != null) {
        const businessDomainStr = businessDomain;
        relevanceScore += calculateRelevanceScore(businessDomainStr, business.businessDomain);
      }

      if (address != null && business.address != null) {
        const addressStr = address;
        relevanceScore += calculateRelevanceScore(addressStr, business.address);
      }

      if (cityId != null && business.cityId != null) {
        const cityIdStr = cityId;
        relevanceScore += calculateRelevanceScore(cityIdStr, business.cityId);
      }

      if (stateId != null && business.stateId != null) {
        const stateIdStr = stateId;
        relevanceScore += calculateRelevanceScore(stateIdStr, business.stateId);
      }

      if (countryId != null && business.countryId != null) {
        const countryIdStr = countryId;
        relevanceScore += calculateRelevanceScore(countryIdStr, business.countryId);
      }

      if (email != null && business.email != null) {
        const emailStr = email;
        relevanceScore += calculateRelevanceScore(emailStr, business.email);
      }

      if (website != null && business.website != null) {
        const websiteStr = website;
        relevanceScore += calculateRelevanceScore(websiteStr, business.website);
      }

      if (sponsoredAd != null && business.sponsoredAd != null) {
        const sponsoredAdStr = sponsoredAd;
        relevanceScore += calculateRelevanceScore(String(sponsoredAdStr), String(business.sponsoredAd));
      }

      return { business, relevanceScore };
    });

    // Deep sort businessesWithRelevance based on relevance scores
    if (sort === 'relevance') {
      businessesWithRelevance.sort((a, b) => b.relevanceScore - a.relevanceScore);
    }

    const sortedBusinesses = businessesWithRelevance.map((item) => item.business);

    const objectOfBusinesses: Record<string, Business> = {};
    sortedBusinesses.forEach((business: Business) => {
      if (business.id != null) objectOfBusinesses[business.id] = business;
    });

    const response: ApiResponse<{ totalRecords: number; totalPages: number; businesses: Record<string, Business> }> = createApiResponse({ success: true, data: { totalRecords: count, totalPages, businesses: objectOfBusinesses }, message: getBusinessMessage(BusinessMessageKey.BUSINESSES_RETRIEVED).message, status: getBusinessMessage(BusinessMessageKey.BUSINESSES_RETRIEVED).code });
    return res.json(response);
  } catch (error) {
    logger.error('Error retrieving businesses:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.FAILED_TO_RETRIEVE_BUSINESSES).message, status: getBusinessMessage(BusinessMessageKey.FAILED_TO_RETRIEVE_BUSINESSES).code });
    return res.json(response);
  }
};

export const getBusinesses = async (req: Request, res: Response): Promise<Response> => {
  const { page, limit } = req.query as ParsedQs & IPaginationAttributes;

  const pageNumber = parseInt(String(page)) ?? 1;
  const limitNumber = parseInt(String(limit)) ?? 10;

  const offset = (pageNumber - 1) * limitNumber;

  try {
    const { count, rows: businesses } = await Business.findAndCountAll({
      offset,
      limit: limitNumber,
    });

    const totalPages = Math.ceil(count / limitNumber);

    const objectOfBusinesses: Record<string, Business> = {};
    businesses.forEach((business: Business) => {
      if (business.id.length > 0) objectOfBusinesses[business.id] = business;
    });

    logger.info('Successfully retrieved businesses');
    const response: ApiResponse<{ totalRecords: number; totalPages: number; businesses: Record<string, Business> }> = createApiResponse({ success: true, data: { totalRecords: count, totalPages, businesses: objectOfBusinesses }, message: getBusinessMessage(BusinessMessageKey.BUSINESSES_RETRIEVED).message, status: getBusinessMessage(BusinessMessageKey.BUSINESSES_RETRIEVED).code });
    return res.json(response);
  } catch (error) {
    logger.error('Error while retrieving businesses:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.FAILED_TO_RETRIEVE_BUSINESSES).message, status: getBusinessMessage(BusinessMessageKey.FAILED_TO_RETRIEVE_BUSINESSES).code });
    return res.json(response);
  }
};

export const getBusinessById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params as IBusinessFetchByIdRequestAttributes;

  try {
    const business = await Business.findOne({ where: { id } });

    if (business == null) {
      logger.warn(`Business with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.BUSINESS_NOT_FOUND).message, status: getBusinessMessage(BusinessMessageKey.BUSINESS_NOT_FOUND).code });
      return res.json(response);
    }

    const response: ApiResponse<{ business: Business }> = createApiResponse({ success: true, data: { business }, message: getBusinessMessage(BusinessMessageKey.BUSINESS_RETRIEVED).message, status: getBusinessMessage(BusinessMessageKey.BUSINESS_RETRIEVED).code });
    return res.json(response);
  } catch (error) {
    logger.error(`Error retrieving business with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.BUSINESS_NOT_FOUND).message, status: getBusinessMessage(BusinessMessageKey.BUSINESS_NOT_FOUND).code });
    return res.json(response);
  }
};
