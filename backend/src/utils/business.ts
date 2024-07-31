import { Transaction } from 'sequelize';
import { IBusinessSourceAttributes } from 'validator/interfaces';
import BusinessSource from '../models/BusinessSource';
import logger from '../utils/logger';
import { Op } from 'sequelize';
import Business from '../models/Business';

export const findOrCreateBusinessSource = async (sourceName: string, transaction: Transaction): Promise<IBusinessSourceAttributes | undefined> => {
  try {
    const [record, created] = await BusinessSource.findOrCreate({
      where: { sourceName },
      transaction,
    });

    if (created) {
      logger.info(`Business source created successfully: ${sourceName}`);
      return record.toJSON() as IBusinessSourceAttributes;
    } else {
      logger.info(`Business source already exists: ${sourceName}`);
      return record.toJSON() as IBusinessSourceAttributes;
    }
  } catch (error) {
    logger.error('Failed to find or create business source:', error);
  }
};

export const getBusinessesByQuery = async ({ name, businessDomain, categoryId, address, cityId, stateId, countryId, phoneId, email, website, sponsoredAd }: any) => {
  // Where clause
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

  if (cityId) {
    whereClause.cityId = cityId;
  }

  if (stateId) {
    whereClause.stateId = stateId;
  }

  if (countryId) {
    whereClause.countryId = countryId;
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

  if (sponsoredAd) {
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

export const getBusinessesByQueryingIds = async ({ ids }: { ids: string[] }) => {
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
