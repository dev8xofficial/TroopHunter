import { Transaction } from 'sequelize';
import { IBusinessSourceResponseAttributes } from '../models/BusinessSource/BusinessSource.interface';
import BusinessSource from '../models/BusinessSource/BusinessSource.model';
import logger from '../utils/logger';
import { Op } from 'sequelize';
import Business from '../models/Business/Business.model';

export const findOrCreateBusinessSource = async (sourceName: string, transaction: Transaction): Promise<IBusinessSourceResponseAttributes | undefined> => {
  try {
    const [record, created] = await BusinessSource.findOrCreate({
      where: { sourceName },
      transaction,
    });

    if (created) {
      logger.info(`Business source ${sourceName} created successfully.`);
      return record.toJSON() as IBusinessSourceResponseAttributes;
    } else {
      logger.info(`Business source ${sourceName} already exists.`);
      return record.toJSON() as IBusinessSourceResponseAttributes;
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
