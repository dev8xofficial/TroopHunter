import { type IBusinessDayAttributes } from '@repo/validator';
import { type Transaction } from 'sequelize';

import { logger } from './logger';
import { BusinessDay } from '../models';

export const findOrCreateBusinessDay = async (businessId: string, dayId: string, transaction: Transaction): Promise<IBusinessDayAttributes | undefined> => {
  try {
    const [record, created] = await BusinessDay.findOrCreate({
      where: { businessId, dayId },
      transaction,
    });

    if (created) {
      logger.info(`Business day created successfully: ${businessId}, ${dayId}`);
      return record.toJSON();
    } else {
      logger.info(`Business day already exists: ${businessId}, ${dayId}`);
      return record.toJSON();
    }
  } catch (error) {
    logger.error('Failed to find or create business day: ', businessId, ', ', dayId, ', ', error);
  }
};
