import { Transaction } from 'sequelize';
import Timezone from '../models/Timezone';
import { ITimezoneAttributes } from 'validator/interfaces';
import logger from '../utils/logger';

export const findOrCreateTimezone = async (timezone: ITimezoneAttributes, transaction: Transaction): Promise<ITimezoneAttributes | undefined> => {
  try {
    const { timezoneName, utcOffset, dst, dstOffset, countryCode } = timezone;
    const [record, created] = await Timezone.findOrCreate({
      where: { timezoneName, utcOffset, dst, dstOffset, countryCode },
      transaction,
    });

    if (created) {
      logger.info(`Timezone ${timezoneName} created successfully.`);
      return record.toJSON() as ITimezoneAttributes;
    } else {
      logger.info(`Timezone ${timezoneName} already exists.`);
      return record.toJSON() as ITimezoneAttributes;
    }
  } catch (error) {
    logger.error('Failed to find or create business timezone:', error);
    // Handle the error gracefully
    throw new Error('Failed to find or create business timezone');
  }
};
