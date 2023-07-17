import { Transaction } from 'sequelize';
import BusinessClosingHour from '../models/BusinessClosingHour';
import { ClosingTimeAttributes } from '../types/businessClosingHour';
import logger from '../utils/logger';

export const findOrCreateBusinessClosingHour = async (time: string, transaction: Transaction): Promise<ClosingTimeAttributes | undefined> => {
  try {
    const [record, created] = await BusinessClosingHour.findOrCreate({
      where: { time },
      transaction,
    });

    if (created) {
      logger.info(`Business closing hour ${time} created successfully.`);
      return record.toJSON() as ClosingTimeAttributes;
    } else {
      logger.info(`Business closing hour ${time} already exists.`);
      return record.toJSON() as ClosingTimeAttributes;
    }
  } catch (error) {
    logger.error('Failed to find or create business closing hour:', error);
  }
};
