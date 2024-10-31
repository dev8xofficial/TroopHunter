import { type IBusinessOpeningHourAttributes } from '@repo/validator';
import { type Transaction } from 'sequelize';

import { logger } from './logger';
import { BusinessOpeningHour } from '../models';

export const findOrCreateBusinessOpeningHour = async (businessId: string, openingHourId: string, transaction: Transaction): Promise<IBusinessOpeningHourAttributes | undefined> => {
  try {
    const [record, created] = await BusinessOpeningHour.findOrCreate({
      where: { businessId, openingHourId },
      transaction,
    });

    if (created) {
      logger.info(`Business opening hour created successfully: ${businessId}, ${openingHourId}`);
      return record.toJSON();
    } else {
      logger.info(`Business opening hour already exists: ${businessId}, ${openingHourId}`);
      return record.toJSON();
    }
  } catch (error) {
    logger.error('Failed to find or create business opening hour: ', businessId, ', ', openingHourId, ', ', error);
  }
};
