import { type ITimezoneAttributes, type ITimezoneCreateRequestAttributes } from '@repo/validator';
import { type Transaction } from 'sequelize';

import { logger } from './logger';
import { Timezone } from '../models';

export const findOrCreateTimezone = async (timezone: ITimezoneCreateRequestAttributes, transaction: Transaction): Promise<ITimezoneAttributes | undefined> => {
  try {
    const { timezoneName, utcOffset, dst, dstOffset, countryCode } = timezone;
    const [record, created] = await Timezone.findOrCreate({
      where: { timezoneName, utcOffset, dst, dstOffset, countryCode },
      transaction,
    });

    if (created) {
      logger.info(`Timezone created successfully: ${timezoneName}`);
      return record.toJSON();
    } else {
      logger.info(`Timezone already exists: ${timezoneName}`);
      return record.toJSON();
    }
  } catch (error) {
    logger.error('Failed to find or create business timezone:', error);
    // Handle the error gracefully
    throw new Error('Failed to find or create business timezone');
  }
};
