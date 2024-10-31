import { type IDayAttributes } from '@repo/validator';
import { type Transaction } from 'sequelize';

import { logger } from './logger';
import { Day } from '../models';

export const findOrCreateDay = async (day: string, transaction: Transaction): Promise<IDayAttributes | undefined> => {
  try {
    const [record, created] = await Day.findOrCreate({
      where: { day },
      transaction,
    });

    if (created) {
      logger.info(`Day created successfully: ${day}`);
      return record.toJSON();
    } else {
      logger.info(`Day already exists: ${day}`);
      return record.toJSON();
    }
  } catch (error) {
    logger.error('Failed to find or create opening hour: ', day, ', ', error);
  }
};

export const findAllDays = async (): Promise<IDayAttributes[] | undefined> => {
  try {
    const records = await Day.findAll();

    return records.map((record) => record.toJSON());
  } catch (error) {
    logger.error('Failed to fetch days.');
  }
};
