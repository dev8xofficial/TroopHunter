import { Transaction } from 'sequelize';
import BusinessCategory from '../models/BusinessCategory';
import { BusinessCategoryAttributes } from '../types/businessCategory';
import logger from '../utils/logger';

export const findOrCreateBusinessCategory = async (name: string, transaction: Transaction): Promise<BusinessCategoryAttributes | undefined> => {
  try {
    const [record, created] = await BusinessCategory.findOrCreate({
      where: { name },
      defaults: { createdAt: new Date(), updatedAt: new Date() },
      transaction,
    });

    if (created) {
      logger.info(`Business category ${name} created successfully.`);
      return record.toJSON() as BusinessCategoryAttributes;
    } else {
      logger.info(`Business category ${name} already exists.`);
      return record.toJSON() as BusinessCategoryAttributes;
    }
  } catch (error) {
    logger.error('Failed to find or create business category:', error);
  }
};
