import { Transaction } from 'sequelize';
import BusinessOpeningHour from '../models/BusinessOpeningHour';
import { IBusinessOpeningHourAttributes } from 'validator/interfaces';
import logger from './logger';

export const findOrCreateBusinessOpeningHour = async (businessId: string, openingHourId: string, transaction: Transaction): Promise<IBusinessOpeningHourAttributes | undefined> => {
  try {
    const [record, created] = await BusinessOpeningHour.findOrCreate({
      where: { businessId, openingHourId },
      transaction,
    });

    if (created) {
      logger.info(`Business opening hour created successfully: ${businessId}, ${openingHourId}`);
      return record.toJSON() as IBusinessOpeningHourAttributes;
    } else {
      logger.info(`Business opening hour already exists: ${businessId}, ${openingHourId}`);
      return record.toJSON() as IBusinessOpeningHourAttributes;
    }
  } catch (error) {
    logger.error('Failed to find or create business opening hour: ', businessId, ", ", openingHourId, ", ", error);
  }
};
