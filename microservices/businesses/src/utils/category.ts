import { type IBusinessCategoryAttributes } from '@repo/validator';
import { type Transaction } from 'sequelize';

import { logger } from './logger';
import { BusinessCategory } from '../models';

export const findOrCreateBusinessCategory = async (name: string, transaction: Transaction): Promise<IBusinessCategoryAttributes | undefined> => {
  try {
    const [record, created] = await BusinessCategory.findOrCreate({
      where: { name },
      transaction,
    });

    if (created) {
      logger.info(`Business category ${name} created successfully.`);
      return record.toJSON();
    } else {
      logger.info(`Business category ${name} already exists.`);
      return record.toJSON();
    }
  } catch (error) {
    logger.error('Failed to find or create business category:', error);
  }
};
