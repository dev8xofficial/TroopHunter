import { type IOpeningHourAttributes } from '@repo/validator';
import { type Transaction } from 'sequelize';

import { logger } from './logger';
import { OpeningHour } from '../models';

export const findOrCreateOpeningHour = async (time: string, transaction: Transaction): Promise<IOpeningHourAttributes | undefined> => {
  try {
    const [record, created] = await OpeningHour.findOrCreate({
      where: { time },
      transaction,
    });

    if (created) {
      logger.info(`Opening hour created successfully: ${time}`);
      return record.toJSON();
    } else {
      logger.info(`Opening hour already exists: ${time}`);
      return record.toJSON();
    }
  } catch (error) {
    logger.error('Failed to find or create opening hour: ', time, ', ', error);
  }
};

export const findAllOpeningHours = async (): Promise<IOpeningHourAttributes[] | undefined> => {
  try {
    const records = await OpeningHour.findAll();

    return records.map((record) => record.toJSON());
  } catch (error) {
    logger.error('Failed to fetch OpeningHours.');
  }
};
