import { Transaction } from 'sequelize';
import BusinessDay from '../models/BusinessDay';
import { IBusinessDayAttributes } from 'validator/interfaces';
import logger from './logger';

export const findOrCreateBusinessDay = async (businessId: string, dayId: string, transaction: Transaction): Promise<IBusinessDayAttributes | undefined> => {
  try {
    const [record, created] = await BusinessDay.findOrCreate({
      where: { businessId, dayId },
      transaction,
    });

    if (created) {
      logger.info(`Business day created successfully: ${businessId}, ${dayId}`);
      return record.toJSON() as IBusinessDayAttributes;
    } else {
      logger.info(`Business day already exists: ${businessId}, ${dayId}`);
      return record.toJSON() as IBusinessDayAttributes;
    }
  } catch (error) {
    logger.error('Failed to find or create business day: ', businessId, ", ", dayId, ", ", error);
  }
};
