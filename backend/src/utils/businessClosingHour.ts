import { Transaction } from 'sequelize';
import BusinessClosingHour from '../models/BusinessClosingHour';
import { IBusinessClosingHourAttributes } from 'validator/interfaces';
import logger from './logger';

export const findOrCreateBusinessClosingHour = async (businessId: string, closingHourId: string, transaction: Transaction): Promise<IBusinessClosingHourAttributes | undefined> => {
  try {
    const [record, created] = await BusinessClosingHour.findOrCreate({
      where: { businessId, closingHourId },
      transaction,
    });

    if (created) {
      logger.info(`Business closing hour created successfully: ${businessId}, ${closingHourId}`);
      return record.toJSON() as IBusinessClosingHourAttributes;
    } else {
      logger.info(`Business closing hour already exists: ${businessId}, ${closingHourId}`);
      return record.toJSON() as IBusinessClosingHourAttributes;
    }
  } catch (error) {
    logger.error('Failed to find or create business closing hour: ', businessId, ", ", closingHourId, ", ", error);
  }
};
