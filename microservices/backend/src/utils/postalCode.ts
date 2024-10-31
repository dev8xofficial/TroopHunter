import { Transaction } from 'sequelize';
import PostalCode from '../models/PostalCode';
import { IPostalCodeAttributes } from '@repo/validator';
import logger from '../utils/logger';

export const findOrCreatePostalCode = async (code: string, transaction: Transaction): Promise<IPostalCodeAttributes | undefined> => {
  try {
    const [record, created] = await PostalCode.findOrCreate({
      where: { code },
      transaction,
    });

    if (created) {
      logger.info(`Business postal code created successfully: ${code}`);
      return record.toJSON() as IPostalCodeAttributes;
    } else {
      logger.info(`Business postal code already exists: ${code}`);
      return record.toJSON() as IPostalCodeAttributes;
    }
  } catch (error) {
    logger.error('Failed to find or create business postal code:', error);
  }
};
