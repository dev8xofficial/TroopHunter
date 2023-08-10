import { Transaction } from 'sequelize';
import BusinessOpeningHour from '../models/BusinessOpeningHour';
import { IBusinessOpeningHourResponseAttributes } from 'validator/interfaces/BusinessOpeningHour';
import logger from '../utils/logger';

export const findOrCreateBusinessOpeningHour = async (time: string, transaction: Transaction): Promise<IBusinessOpeningHourResponseAttributes | undefined> => {
  try {
    const [record, created] = await BusinessOpeningHour.findOrCreate({
      where: { time },
      transaction,
    });

    if (created) {
      logger.info(`Business opening hour ${time} created successfully.`);
      return record.toJSON() as IBusinessOpeningHourResponseAttributes;
    } else {
      logger.info(`Business opening hour ${time} already exists.`);
      return record.toJSON() as IBusinessOpeningHourResponseAttributes;
    }
  } catch (error) {
    logger.error('Failed to find or create business opening hour:', error);
  }
};
