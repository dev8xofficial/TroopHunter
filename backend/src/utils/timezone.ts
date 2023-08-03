import { Transaction } from 'sequelize';
import Timezone from '../models/Timezone/Timezone';
import { TimezoneAttributes } from '../models/Timezone/Timezone.interface';
import logger from '../utils/logger';

export const findOrCreateTimezone = async (timezone: TimezoneAttributes, transaction: Transaction): Promise<TimezoneAttributes | undefined> => {
  try {
    const { timezoneName, utcOffset, dst, dstOffset, countryCode } = timezone;
    const [record, created] = await Timezone.findOrCreate({ transaction });

    if (created) {
      logger.info(`Timezone ${timezoneName} created successfully.`);
      return record.toJSON() as TimezoneAttributes;
    } else {
      logger.info(`Timezone ${timezoneName} already exists.`);
      return record.toJSON() as TimezoneAttributes;
    }
  } catch (error) {
    logger.error('Failed to find or create business timezone:', error);
    // Handle the error gracefully
    throw new Error('Failed to find or create business timezone');
  }
};
