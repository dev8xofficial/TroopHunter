import { Transaction } from 'sequelize';
import BusinessOpeningHour from '../models/BusinessOpeningHour/BusinessOpeningHour.model';
import { BusinessOpeningHourAttributes } from '../models/BusinessOpeningHour/BusinessOpeningHour.interface';
import logger from '../utils/logger';

export const findOrCreateBusinessOpeningHour = async (time: string, transaction: Transaction): Promise<BusinessOpeningHourAttributes | undefined> => {
  try {
    const [record, created] = await BusinessOpeningHour.findOrCreate({
      where: { time },
      transaction,
    });

    if (created) {
      logger.info(`Business opening hour ${time} created successfully.`);
      return record.toJSON() as BusinessOpeningHourAttributes;
    } else {
      logger.info(`Business opening hour ${time} already exists.`);
      return record.toJSON() as BusinessOpeningHourAttributes;
    }
  } catch (error) {
    logger.error('Failed to find or create business opening hour:', error);
  }
};
