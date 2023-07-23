import { Transaction } from 'sequelize';
import { SourceAttributes } from '../types/businessSource';
import BusinessSource from '../models/BusinessSource';
import logger from '../utils/logger';
import { Op } from 'sequelize';
import Business from '../models/Business';

export const findOrCreateBusinessSource = async (sourceName: string, transaction: Transaction): Promise<SourceAttributes | undefined> => {
  try {
    const [record, created] = await BusinessSource.findOrCreate({
      where: { sourceName },
      defaults: { createdAt: new Date(), updatedAt: new Date() },
      transaction,
    });

    if (created) {
      logger.info(`Business source ${sourceName} created successfully.`);
      return record.toJSON() as SourceAttributes;
    } else {
      logger.info(`Business source ${sourceName} already exists.`);
      return record.toJSON() as SourceAttributes;
    }
  } catch (error) {
    logger.error('Failed to find or create business source:', error);
  }
};

export const getBusinessesByQuery = async (name: string, address: string) => {
  const whereClause: { [key: string]: any } = {};

  if (name) {
    whereClause.name = { [Op.iLike]: `%${name}%` };
  }

  if (address) {
    whereClause.address = { [Op.iLike]: `%${address}%` };
  }

  try {
    const businesses = await Business.findAll({
      where: whereClause,
    });

    return businesses;
  } catch (error) {
    logger.error('Error retrieving businesses:', error);
    return undefined;
  }
};
