import { Transaction } from 'sequelize';
import BusinessClosingHour from '../models/BusinessClosingHour/BusinessClosingHour.model';
import { BusinessClosingHourAttributes } from '../models/BusinessClosingHour/BusinessClosingHour.interface';
import logger from '../utils/logger';

export const findOrCreateBusinessClosingHour = async (time: string, transaction: Transaction): Promise<BusinessClosingHourAttributes | undefined> => {
  try {
    const [record, created] = await BusinessClosingHour.findOrCreate({
      where: { time },
      transaction,
    });

    if (created) {
      logger.info(`Business closing hour ${time} created successfully.`);
      return record.toJSON() as BusinessClosingHourAttributes;
    } else {
      logger.info(`Business closing hour ${time} already exists.`);
      return record.toJSON() as BusinessClosingHourAttributes;
    }
  } catch (error) {
    logger.error('Failed to find or create business closing hour:', error);
  }
};
