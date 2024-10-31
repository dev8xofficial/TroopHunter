import { Transaction } from 'sequelize';
import Timezone from '../models/Timezone';
import { ITimezoneAttributes, ITimezoneCreateRequestAttributes } from '@repo/validator';
import logger from '../utils/logger';

export const findOrCreateTimezone = async (timezone: ITimezoneCreateRequestAttributes, transaction: Transaction): Promise<ITimezoneAttributes | undefined> => {
  try {
    const { timezoneName, utcOffset, dst, dstOffset, countryCode } = timezone;
    const [record, created] = await Timezone.findOrCreate({
      where: { timezoneName, utcOffset, dst, dstOffset, countryCode },
      transaction,
    });

    if (created) {
      logger.info(`Timezone created successfully: ${timezoneName}`);
      return record.toJSON() as ITimezoneAttributes;
    } else {
      logger.info(`Timezone already exists: ${timezoneName}`);
      return record.toJSON() as ITimezoneAttributes;
    }
  } catch (error) {
    logger.error('Failed to find or create business timezone:', error);
    // Handle the error gracefully
    throw new Error('Failed to find or create business timezone');
  }
};
