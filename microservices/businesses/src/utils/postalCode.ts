import { type IPostalCodeAttributes } from '@repo/validator';
import { type Transaction } from 'sequelize';

import { logger } from './logger';
import { PostalCode } from '../models';

export const findOrCreatePostalCode = async (code: string, transaction: Transaction): Promise<IPostalCodeAttributes | undefined> => {
  try {
    const [record, created] = await PostalCode.findOrCreate({
      where: { code },
      transaction,
    });

    if (created) {
      logger.info(`Business postal code created successfully: ${code}`);
      return record.toJSON();
    } else {
      logger.info(`Business postal code already exists: ${code}`);
      return record.toJSON();
    }
  } catch (error) {
    logger.error('Failed to find or create business postal code:', error);
  }
};
