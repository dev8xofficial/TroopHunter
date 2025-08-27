import { type IBusinessSourceAttributes, type IBusinessFetchForLeadRequestAttributes } from '@repo/validator';
import { type Transaction } from 'sequelize';
import { Op } from 'sequelize';

import { logger } from './logger';
import { Business, BusinessSource } from '../models';

export const findOrCreateBusinessSource = async (sourceName: string, transaction: Transaction): Promise<IBusinessSourceAttributes | undefined> => {
  try {
    const [record, created] = await BusinessSource.findOrCreate({
      where: { sourceName },
      transaction,
    });

    if (created) {
      logger.info(`Business source created successfully: ${sourceName}`);
      return record.toJSON();
    } else {
      logger.info(`Business source already exists: ${sourceName}`);
      return record.toJSON();
    }
  } catch (error) {
    logger.error('Failed to find or create business source:', error);
  }
};

export const getBusinessesByQuery = async ({ name, businessDomain, categoryId, address, cityId, stateId, countryId, phoneId, email, website, sponsoredAd }: IBusinessFetchForLeadRequestAttributes): Promise<Business[] | undefined> => {
  // Where clause
  const whereClause: Record<string, unknown> = {};

  if (name != null && typeof name === 'string') {
    whereClause.name = { [Op.iLike]: `%${name}%` };
  }

  if (businessDomain != null && typeof businessDomain === 'string') {
    whereClause.businessDomain = { [Op.iLike]: `%${businessDomain}%` };
  }

  if (categoryId != null) {
    whereClause.categoryId = categoryId;
  }

  if (address != null && typeof address === 'string') {
    whereClause.address = { [Op.iLike]: `%${address}%` };
  }

  if (cityId != null) {
    whereClause.cityId = cityId;
  }

  if (stateId != null) {
    whereClause.stateId = stateId;
  }

  if (countryId != null) {
    whereClause.countryId = countryId;
  }

  if (phoneId != null) {
    whereClause.phoneId = phoneId;
  }

  if (email != null && typeof email === 'string') {
    whereClause.email = { [Op.iLike]: `%${email}%` };
  }

  if (website != null && typeof website === 'string') {
    whereClause.website = {
      [Op.iLike]: `%${website}%`,
    };
  }

  if (sponsoredAd != null) {
    whereClause.sponsoredAd = sponsoredAd;
  }

  try {
    const businesses = await Business.findAll({ where: whereClause });

    return businesses;
  } catch (error) {
    logger.error('Error retrieving businesses:', error);
    return undefined;
  }
};

export const getBusinessesByQueryingIds = async ({ ids }: { ids: string[] }): Promise<Business[] | undefined> => {
  try {
    const businesses = await Business.findAll({ where: { id: ids } });

    return businesses;
  } catch (error) {
    logger.error('Error retrieving businesses:', error);
    return undefined;
  }
};

export const calculateRelevanceScore = (searchTerm: string, fieldValue: string): number => {
  const searchTermTokens = searchTerm.toLowerCase().split(' ');
  const fieldValueTokens = fieldValue.toLowerCase().split(' ');

  let relevanceScore = 0;

  searchTermTokens.forEach((token) => {
    if (fieldValueTokens.includes(token)) {
      relevanceScore += 10;
    }

    fieldValueTokens.forEach((fieldToken) => {
      if (fieldToken.includes(token)) {
        relevanceScore += 5;
      }
    });
  });

  return relevanceScore;
};
