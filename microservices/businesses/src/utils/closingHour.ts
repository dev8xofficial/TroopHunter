import { type IClosingHourAttributes } from '@repo/validator';
import { type Transaction } from 'sequelize';

import { logger } from './logger';
import { ClosingHour } from '../models';

export const findOrCreateClosingHour = async (time: string, transaction: Transaction): Promise<IClosingHourAttributes | undefined> => {
  try {
    const [record, created] = await ClosingHour.findOrCreate({
      where: { time },
      transaction,
    });

    if (created) {
      logger.info(`Closing hour created successfully: ${time}`);
      return record.toJSON();
    } else {
      logger.info(`Closing hour already exists: ${time}`);
      return record.toJSON();
    }
  } catch (error) {
    logger.error('Failed to find or create closing hour: ', time, ', ', error);
  }
};

export const findAllClosingHours = async (): Promise<IClosingHourAttributes[] | undefined> => {
  try {
    const records = await ClosingHour.findAll();

    return records.map((record) => record.toJSON());
  } catch (error) {
    logger.error('Failed to fetch ClosingHours.');
  }
};
