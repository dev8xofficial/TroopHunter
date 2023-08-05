import { Transaction } from 'sequelize';
import PostalCode from '../models/PostalCode/PostalCode.model';
import { IPostalCodeResponseAttributes } from '../models/PostalCode/PostalCode.interface';
import logger from '../utils/logger';

export const findOrCreatePostalCode = async (code: string, transaction: Transaction): Promise<IPostalCodeResponseAttributes | undefined> => {
  try {
    const [record, created] = await PostalCode.findOrCreate({
      where: { code },
      transaction,
    });

    if (created) {
      logger.info(`Business postal code ${code} created successfully.`);
      return record.toJSON() as IPostalCodeResponseAttributes;
    } else {
      logger.info(`Business postal code ${code} already exists.`);
      return record.toJSON() as IPostalCodeResponseAttributes;
    }
  } catch (error) {
    logger.error('Failed to find or create business postal code:', error);
  }
};
