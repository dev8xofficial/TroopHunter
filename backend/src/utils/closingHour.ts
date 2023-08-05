import { Transaction } from 'sequelize';
import BusinessClosingHour from '../models/BusinessClosingHour/BusinessClosingHour.model';
import { IBusinessClosingHourResponseAttributes } from '../models/BusinessClosingHour/BusinessClosingHour.interface';
import logger from '../utils/logger';

export const findOrCreateBusinessClosingHour = async (time: string, transaction: Transaction): Promise<IBusinessClosingHourResponseAttributes | undefined> => {
  try {
    const [record, created] = await BusinessClosingHour.findOrCreate({
      where: { time },
      transaction,
    });

    if (created) {
      logger.info(`Business closing hour ${time} created successfully.`);
      return record.toJSON() as IBusinessClosingHourResponseAttributes;
    } else {
      logger.info(`Business closing hour ${time} already exists.`);
      return record.toJSON() as IBusinessClosingHourResponseAttributes;
    }
  } catch (error) {
    logger.error('Failed to find or create business closing hour:', error);
  }
};
