import { type IBusinessClosingHourAttributes } from '@repo/validator';
import { type Transaction } from 'sequelize';

import { logger } from './logger';
import { BusinessClosingHour } from '../models';

export const findOrCreateBusinessClosingHour = async (businessId: string, closingHourId: string, transaction: Transaction): Promise<IBusinessClosingHourAttributes | undefined> => {
  try {
    const [record, created] = await BusinessClosingHour.findOrCreate({
      where: { businessId, closingHourId },
      transaction,
    });

    if (created) {
      logger.info(`Business closing hour created successfully: ${businessId}, ${closingHourId}`);
      return record.toJSON();
    } else {
      logger.info(`Business closing hour already exists: ${businessId}, ${closingHourId}`);
      return record.toJSON();
    }
  } catch (error) {
    logger.error('Failed to find or create business closing hour: ', businessId, ', ', closingHourId, ', ', error);
  }
};
