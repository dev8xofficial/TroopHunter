import { Transaction } from 'sequelize';
import BusinessCategory from '../models/BusinessCategory';
import logger from '../utils/logger';
import { IBusinessCategoryResponseAttributes } from 'common/interfaces/BusinessCategory';

export const findOrCreateBusinessCategory = async (name: string, transaction: Transaction): Promise<IBusinessCategoryResponseAttributes | undefined> => {
  try {
    const [record, created] = await BusinessCategory.findOrCreate({
      where: { name },
      transaction,
    });

    if (created) {
      logger.info(`Business category ${name} created successfully.`);
      return record.toJSON() as IBusinessCategoryResponseAttributes;
    } else {
      logger.info(`Business category ${name} already exists.`);
      return record.toJSON() as IBusinessCategoryResponseAttributes;
    }
  } catch (error) {
    logger.error('Failed to find or create business category:', error);
  }
};
