import { Transaction } from 'sequelize';
import BusinessOpeningHour from '../models/BusinessOpeningHour';
import { IBusinessOpeningHourAttributes } from 'validator/interfaces';
import logger from '../utils/logger';

export const findOrCreateBusinessOpeningHour = async (time: string, transaction: Transaction): Promise<IBusinessOpeningHourAttributes | undefined> => {
  try {
    const [record, created] = await BusinessOpeningHour.findOrCreate({
      where: { time },
      transaction,
    });

    if (created) {
      logger.info(`Business opening hour ${time} created successfully.`);
      return record.toJSON() as IBusinessOpeningHourAttributes;
    } else {
      logger.info(`Business opening hour ${time} already exists.`);
      return record.toJSON() as IBusinessOpeningHourAttributes;
    }
  } catch (error) {
    logger.error('Failed to find or create business opening hour:', error);
  }
};
